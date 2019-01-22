// tslint:disable-next-line:max-line-length
import { IServerSideDatasource, IServerSideGetRowsParams, IServerSideGetRowsRequest, GridApi, ColumnApi, SetFilterValuesFuncParams, IFilterComp, ColDef } from 'ag-grid-community';
import { BaseService } from './base.service';
import { isFunction, isNullOrUndefined } from 'util';
import { AppUtils } from './app-utils';
import { SetFilter } from 'ag-grid-enterprise';

export class AppServerSideDatasourceInfo {
    public baseService: BaseService;
    public dataUrl: string;
    public filterValuesUrl: string;
    public postCallbackFunc?: (result: any) => void;
    public gridApi: GridApi;
    public columnApi: ColumnApi;
    public gridState: any;
}

export class AppServerSideDatasource implements IServerSideDatasource {

    public total = 0;

    private isSetting = false;

    private setting: any[][];

    constructor(
        private info: AppServerSideDatasourceInfo
    ) {
        if (this.info && this.info.gridApi) {
            this.info.gridApi.addEventListener('rangeSelectionChanged', (event) => {
                // const cells = this.info.gridApi.getEditingCells();
                // if (cells && cells.length > 0) {
                //     return;
                // }
                // if (event.ctrlKey || event.metaKey) {
                //     switch (event.which) {
                //         case 65: return this.onCtrlAndA(event);
                //     }
                // }
                if (event.finished) {
                    let isSelectAll = false;
                    (this.info.gridApi.getRangeSelections() || []).forEach(val => {
                        if (val.end.rowIndex > this.info.gridApi.getLastDisplayedRow() ||
                            val.start.rowIndex < this.info.gridApi.getFirstDisplayedRow()) {
                            isSelectAll = true;
                        }
                    });
                    if (isSelectAll) {
                        this.onCtrlAndA(event);
                    }
                }
            });
            if (this.info.gridState && this.info.gridState.paginationPageSize) {
                this.info.gridApi.paginationSetPageSize(this.info.gridState.paginationPageSize);
            }
        }
    }

    getRows(params: IServerSideGetRowsParams): void {

        if (this.setting != null) {
            setTimeout(() => {
                const func = this.setting[0][0];
                const val = this.setting[0][1];
                this.setting.splice(0, 1);
                if (this.setting.length === 0) {
                    this.setting = null;
                }
                this.waitFilterValues(func, val, () => {
                    if (func !== 'paginationGoToPage') {
                        params.successCallback([], this.total = Number.MAX_SAFE_INTEGER);
                        this.info.gridApi[func](val);
                    } else {
                        this._getData(params).then(result => {
                            if (result.MessageId.length === 0) {
                                this.info.gridApi[func](val);
                            }
                        });
                    }
                });
            });
            return;
        }

        if (this.info.gridState) {
            const state = this.info.gridState;
            this.info.gridState = null;
            params.successCallback([], this.total = Number.MAX_SAFE_INTEGER);
            this.setting = [];
            if (!AppUtils.equals(state.filterModel, this.info.gridApi.getFilterModel())) {
                this.setting.push(['setFilterModel', state.filterModel]);
            }
            if (!AppUtils.equals(state.sortModel, this.info.gridApi.getSortModel())) {
                this.setting.push(['setSortModel', state.sortModel]);
            }
            if (state.currentPage !== this.info.gridApi.paginationGetCurrentPage()) {
                this.setting.push(['paginationGoToPage', state.currentPage]);
            }
            if (this.setting.length === 0) {
                this.setting = null;
            }
            this.info.columnApi.setColumnState(state.columnState);
            return;
        }
        this._getData(params);
    }

    // tslint:disable-next-line:member-ordering
    static getFilterValues(params: SetFilterValuesFuncParams, datasource: AppServerSideDatasource, gridApi: GridApi): void {
        if (datasource instanceof AppNoSearchServerSideDatasource) {
            setTimeout(() => {
                params.success([]);
                AppServerSideDatasource.loadedSetFilter(params.colDef, gridApi);
            });
            return;
        }
        if (datasource) {
            datasource._getFilterValues([params]);
        } else {
            setTimeout(() => {
                params.success([]);
                AppServerSideDatasource.loadedSetFilter(params.colDef, gridApi);
            });
        }
    }

    resetFilterValues() {
        setTimeout(() => {
            this._resetFilterValues();
        });
    }

    private checkFilterInfo(request: IServerSideGetRowsRequest): boolean {
        let result = true;
        // tslint:disable-next-line:forin
        for (const colId in request.filterModel) {
            const filterInfo = request.filterModel[colId];
            if (filterInfo && filterInfo.filterType === 'set') {
                result = filterInfo.values.length <= 1000;
            }
            if (!result) {
                setTimeout(() => {
                    const filterModel = Object.assign({}, request.filterModel);
                    filterModel[colId] = undefined;
                    this.info.gridApi.setFilterModel(filterModel);
                });
                break;
            }
        }
        return result;
    }

    private onCtrlAndA(event) {
        this.info.gridApi.clearRangeSelection();

        let rowStart: number;
        let rowEnd: number;
        let floatingStart: string;
        let floatingEnd: string;

        if (this.info.gridApi.getPinnedTopRowCount() === 0) {
            floatingStart = null;
            rowStart = this.info.gridApi.getFirstDisplayedRow();
        } else {
            floatingStart = 'top';
            rowStart = 0;
        }

        if (this.info.gridApi.getPinnedBottomRowCount() === 0) {
            floatingEnd = null;
            rowEnd = this.info.gridApi.getLastDisplayedRow();
        } else {
            floatingEnd = 'bottom';
            rowEnd = this.info.gridApi.getPinnedBottomRowCount();
        }

        const allDisplayedColumns = this.info.columnApi.getAllDisplayedColumns();
        if (!allDisplayedColumns || allDisplayedColumns.length === 0) { return; }
        this.info.gridApi.addRangeSelection({
            rowStart: rowStart,
            floatingStart: floatingStart,
            rowEnd: rowEnd,
            floatingEnd: floatingEnd,
            columnStart: allDisplayedColumns[0],
            columnEnd: allDisplayedColumns[allDisplayedColumns.length - 1]
        });
    }

    private _resetFilterValues() {
        const params: SetFilterValuesFuncParams[] = [];
        this.info.columnApi.getAllColumns().forEach(col => {
            if (col.getColDef().suppressFilter) { return; }
            const filter = AppServerSideDatasource.getSetFilterInstance(col.getColId(), this.info.gridApi);
            if (filter instanceof SetFilter && filter.filterParams.context && filter.filterParams.context.loaded) {
                params.push({
                    success: (values) => { filter.setFilterValues(values, true, false, values); },
                    colDef: col.getColDef()
                });
            }
        });
        if (params.length > 0) {
            this._getFilterValues(params);
        }
    }

    private _getData(params: IServerSideGetRowsParams): Promise<any> {

        if (!this.checkFilterInfo(params.request)) {
            this.info.baseService.showMessage('error', this.info.baseService.getMessage('E1017'));
            params.failCallback();
            return;
        }

        return this.info.baseService.post(this.info.dataUrl, params.request).then((result) => {
            if (result.MessageId.length === 0) {
                this.total = result.Total;
                params.successCallback(result.Data, this.total);
            } else {
                params.failCallback();
            }
            if (isFunction(this.info.postCallbackFunc)) {
                this.info.postCallbackFunc(result);
            }
            this.info.gridApi.hidePopupMenu();
            return result;
        });
    }

    private _getFilterValues(params: SetFilterValuesFuncParams[]): Promise<any> {
        if (!params || params.length === 0) { return Promise.resolve({ MessageId: '' }); }

        const colIdList = [];
        params.forEach(val => {
            const colId = val.colDef.colId || val.colDef.field;
            if (colId) {
                colIdList.push(colId);
            } else {
                setTimeout(() => {
                    val.success([]);
                });
            }
        });

        if (colIdList.length === 0) { return Promise.resolve({ MessageId: '' }); }

        return this.info.baseService.post(this.info.filterValuesUrl, params).then((result) => {
            params.forEach(val => {
                const colId = val.colDef.colId || val.colDef.field;
                if (colId) {
                    if (result.MessageId.length === 0) {
                        val.success(result.Values[colId] || []);
                    } else {
                        val.success([]);
                    }
                    AppServerSideDatasource.loadedSetFilter(val.colDef, this.info.gridApi);
                }
            });
            return result;
        });
    }

    // tslint:disable-next-line:member-ordering
    private static loadedSetFilter(colDef: ColDef, gridApi: GridApi) {
        if (colDef.suppressFilter) { return; }
        const colId = colDef.colId || colDef.field;
        if (colId) {
            const filter = AppServerSideDatasource.getSetFilterInstance(colId, gridApi);
            if (filter instanceof SetFilter) {
                filter.filterParams.context = { loaded: true };
            }
        }
    }

    // tslint:disable-next-line:member-ordering
    private static getSetFilterInstance(colId: string, gridApi: GridApi): SetFilter {
        let filter: IFilterComp = null;
        try {
            filter = gridApi.getFilterInstance(colId);
        } catch {

        }
        if (filter instanceof SetFilter) {
            return <SetFilter>filter;
        }
        return null;
    }

    private waitFilterValues(func, val, exec) {
        let run = true;
        if (func === 'setFilterModel') {
            // tslint:disable-next-line:forin
            for (const key in val) {
                const info = val[key];
                if (info.filterType !== 'set') { continue; }
                const filter = <any>this.info.gridApi.getFilterInstance(key);
                if (!filter.model.displayedValues || filter.model.displayedValues.length === 0) {
                    run = false;
                    break;
                }
            }
        }
        if (run) {
            if (exec) {
                exec();
            }
        } else {
            setTimeout(() => {
                this.waitFilterValues(func, val, exec);
            }, 100);
        }
    }

    private convertRequest(request: IServerSideGetRowsRequest): any {
        return {
            StartRow: request.startRow,
            EndRow: request.endRow,
            FilterModel: this.convertFilterModel(request.filterModel),
            SortModel: this.convertSortModel(request.sortModel)
        };
    }

    private convertSortModel(sortModel: any[]): any[] {
        if (!sortModel) { return []; }
        return sortModel.map((val) => {
            return {
                ColId: val.colId,
                Sort: val.sort
            };
        });
    }

    private convertFilterModel(filterModel: any): any[] {
        if (!filterModel) { return []; }
        const result = [];
        // tslint:disable-next-line:forin
        for (const colId in filterModel) {
            const filterInfo = filterModel[colId];
            const filter = {
                ColId: colId,
                FilterType: filterInfo.filterType,
                condition: [],
                Operator: null
            };
            if (filterInfo.condition1) {
                filter.Operator = filterInfo.operator;
                filter.condition.push(this.convertFilterInfo(filterInfo.condition1));
                filter.condition.push(this.convertFilterInfo(filterInfo.condition2));
            } else {
                filter.condition.push(this.convertFilterInfo(filterInfo));
            }
            result.push(filter);
        }
        return result;
    }

    private convertFilterInfo(filterInfo: any): any {
        const result = { Values: [], Type: '' };
        switch (filterInfo.filterType) {
            case 'date':
                if (filterInfo.dateFrom) { result.Values.push(filterInfo.dateFrom); }
                if (filterInfo.dateTo) { result.Values.push(filterInfo.dateTo); }
                break;
            case 'set':
                if (filterInfo.values.length > 0) {
                    (<any[]>filterInfo.values).forEach(val => {
                        result.Values.push(val);
                    });
                }
                break;
            case 'text':
            case 'number':
                if (!isNullOrUndefined(filterInfo.filter)) { result.Values.push(filterInfo.filter); }
                if (!isNullOrUndefined(filterInfo.filterTo)) { result.Values.push(filterInfo.filterTo); }
                break;
        }
        result.Type = filterInfo.type;
        return result;
    }
}

export class AppNoSearchServerSideDatasource extends AppServerSideDatasource {
    getRows(params: IServerSideGetRowsParams) {
        params.successCallback([], 0);
    }
}
