import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { BaseService } from '../../../common/base.service';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { AppAnimations } from '../../../common/app-animations';

declare let $: any;

@Component({
  selector: 'app-bu120-d03',
  templateUrl: './bu120-d03.component.html',
  styleUrls: ['./bu120-d03.component.scss'],
  animations: [AppAnimations.openClose],
})
export class Bu120D03Component implements OnInit {

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
    this.gridApi.setRowData(this.createGridData());
    this.gridApi.refreshCells();
    console.log(params);
  }

  createGridData(): any[] {
    const res = [];
    for (let i = 0; i < 30; i++) {
      res.push(
        { ingredientCode: '110000', ingredientName: '成分A', ingredientNum: '514-10 - 3', prtr: '対象', positive: '対象外', method: '対象', },
        { ingredientCode: '20000', ingredientName: '成分B', ingredientNum: 'XXX - XXX - XX', prtr: '対象', positive: '対象外', method: '対象', },
        { ingredientCode: '30000', ingredientName: '成分C', ingredientNum: 'AAA - AA - XX', prtr: '対象', positive: '対象外', method: '対象', },
        { ingredientCode: '40000', ingredientName: '成分D', ingredientNum: 'YYY - HH - XX', prtr: '対象', positive: '対象外', method: '対象', },
      );
      return res;
    }
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '成分コード',
        width: 100,
        field: 'ingredientCode',
        suppressMenu: true,
        cellRenderer: (params) => {
          return '<a href="">' + params.value + '<a/>';
        }
      },
      {
        headerName: '成分名',
        width: 150,
        field: 'ingredientName',
        suppressMenu: true,
      },
      {
        headerName: 'CAS番号',
        field: 'ingredientNum',
        width: 200,
        suppressMenu: true,
      },
      {
        headerName: 'PRTR',
        width: 150,
        field: 'prtr',
        suppressMenu: true,
      },
      {
        headerName: 'ポジティブ',
        width: 150,
        field: 'positive',
        suppressMenu: true,
      },
      {
        headerName: '安衛法',
        width: 150,
        field: 'method',
        suppressMenu: true,
      }
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
