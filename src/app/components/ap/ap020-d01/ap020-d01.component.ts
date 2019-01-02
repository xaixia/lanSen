import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { BaseService } from '../../../common/base.service';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { AppAnimations } from '../../../common/app-animations';

@Component({
  selector: 'app-ap020-d01',
  templateUrl: './ap020-d01.component.html',
  styleUrls: ['./ap020-d01.component.scss'],
  animations: [AppAnimations.openClose]
})
export class Ap020D01Component implements OnInit {

  infoAreaOpend = true;
  searchFormOpend = true;
  public form: FormGroup;
  public opencontraction = true;
  // グリッド列Api
  private gridColumnApi;
  // フォームを設定する
  public gridOptions: GridOptions;
  // グリッドApi
  public gridApi: GridApi;
  // ロケールテキスト
  public localeText;
  public style = {
    width: '100%',
    height: '100%',
  };

  data: any;
  done: (cancel: boolean, result?: any) => void;

  paginationApi: PaginationApi;

  constructor(
    public baseService: BaseService,
    private fb: FormBuilder,
    private el: ElementRef
  ) {
    this.createForm();
    this.paginationApi = new PaginationApi();
    this.paginationApi.loadPaginationInfo(100, 10);
  }

  ngOnInit() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.rowHeight = 24;
    this.gridOptions.headerHeight = 24;
    this.gridOptions.animateRows = true;

    this.gridOptions.rowSelection = 'multiple';
    this.gridOptions.sideBar = {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
          toolPanelParams: {
            suppressRowGroups: true,
            suppressValues: true,
            suppressPivots: true,
            suppressPivotMode: true,
            suppressSideButtons: true,
            suppressColumnExpandAll: true
          }
        }
      ],
      defaultToolPanel: ''
    };

    this.gridOptions.defaultColDef = {
      menuTabs: ['filterMenuTab'],
      editable: false
    };
    this.gridOptions.popupParent = document.querySelector('body');
    // enterprise対応：メニュー非表示
    this.gridOptions.suppressContextMenu = true;
    this.gridOptions.columnDefs = this.getGridColumnDefs();
    this.localeText = this.baseService.getGridLocaleText();
  }

  /**
   * createForm
   */
  createForm(): void {
    this.form = this.fb.group({});
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData([]);
    this.gridApi.refreshCells();
  }

  createGridData(): any[] {
    const result = [];
    for (let i = 0; i < 30; i++) {
      result.push(
        { sortId: 'D002', approval: '特価申請', remarks: '特価申請', },
        { sortId: 'M001', approval: '値引き', remarks: '値引き（100万円以上）', },
        { sortId: 'T001', approval: '契約申請', remarks: '契約申請' },
      );
    }
    return result;
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: 'ルートID',
        width: 100,
        field: 'sortId',
        cellRenderer: (param) => {
          return '<a href="#">' + param.value + '<a/>';
        },
        suppressMenu: true,
      },
      {
        headerName: '承認区分',
        width: 150,
        field: 'approval',
        suppressMenu: true,
      },
      {
        headerName: '備考',
        width: 200,
        field: 'remarks',
        suppressMenu: true,
      },
    ];
  }

  searchData() {
    if (!this.baseService.hasError(this.el, this.form)) {
      if (this.gridApi) {
        this.gridApi.setRowData(this.createGridData());
      }
    }
  }

  changeInfoArea() {
    this.infoAreaOpend = !this.infoAreaOpend;
    this.searchFormOpend = !this.searchFormOpend;
  }
}
