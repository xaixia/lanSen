import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, ActivatedRouteSnapshot, Router } from '@angular/router';
import { BaseService } from '../../../common/base.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColGroupDef, ColDef } from 'ag-grid-community';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { AppAnimations } from '../../../common/app-animations';
declare let $: any;

@Component({
  selector: 'app-bu110-d02',
  templateUrl: './bu110-d02.component.html',
  styleUrls: ['./bu110-d02.component.scss'],
  animations: [ AppAnimations.openClose ]
})
export class Bu110D02Component implements OnInit {

  public form: FormGroup;

  @ViewChild('searchArea')
  searchArea: ElementRef;
  public opencontraction = true;
  public SearcBtnContent = '検索条件+';
   // フォームを設定する
  public gridOptions: GridOptions;
  // グリッド列Api
  private gridColumnApi;
  // グリッドApi
  public gridApi: GridApi;
  // ロケールテキスト
  public localeText;
  public style = {
    width: '100%',
    height: '100%',
  };

  paginationApi: PaginationApi;

  constructor(
    private route: ActivatedRoute,
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

    const data = this.getRouterData();
    if (data && data.scrollBar === 1) {
      this.gridOptions.gridAutoHeight = true;
    }
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
      editable: true
    };
    this.gridOptions.popupParent = document.querySelector('body');
    // enterprise対応：メニュー非表示
    this.gridOptions.suppressContextMenu = true;
    this.gridOptions.columnDefs = this.getGridColumnDefs();
    this.localeText = this.baseService.getGridLocaleText();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData([]);
    this.searchData();
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '表示',
        checkboxSelection: true,
        suppressFilter: true,
        suppressMenu: true,
        suppressMovable: true,
        suppressSorting: true,
        headerCheckboxSelection: false,
        width: 70,
        pinned: 'left',
        editable: false,
        suppressToolPanel: true,
      },
      {
        headerName: '発行・改定日',
        field: 'PublishDate',
        suppressMenu: true,
        width: 150,
      },
      {
        headerName: 'ファイル名',
        field: 'FileName',
        suppressMenu: true,
        width: 150,
        cellRenderer: (params) => {
          return `<a href='BU110D02'>${params.value}</a>`;
        },
        editable: false
      },
      {
        headerName: '登録者',
        field: 'Register',
        suppressMenu: true,
        width: 150,
      },
      {
        headerName: '登録日',
        field: 'RegisterDate',
        suppressMenu: true,
        width: 150,
      },
      {
        headerName: '',
        width: 50,
        field: 'DeleteNum',
        pinned: '',
        editable: false,
        suppressMenu: true,
        cellRenderer: (params) => {
          return `<a href='BU110D02'>削除</a>`;
        },
      }
    ];
  }


  getRouterData() {
    let data = null;
    this.route.data.forEach((val) => {
      data = val;
    });
    return data;
  }
    /**
   * createForm
   */
  createForm(): void {
    this.form = this.fb.group({
    });
  }

  createGridData(): any[] {
    const result = [];
    let index = 10001;
    for (let i = 0; i < 50; i++) {
      result.push(
        {PublishDate: '2018/04/05', FileName: '取扱説明書_1804.pdf', Register: 'XXX　XX', RegisterDate: 'yyyy/mm/dd'},
        {PublishDate: '2017/08/01', FileName: '取扱説明書_1708.pdf', Register: 'XXX　XX', RegisterDate: 'yyyy/mm/dd'},
        {PublishDate: '2017/01/15', FileName: '取扱説明書_1701.pdf', Register: 'XXX　XX', RegisterDate: 'yyyy/mm/dd'},
        {PublishDate: '2016/01/20', FileName: '取扱説明書_1601.pdf', Register: 'XXX　XX', RegisterDate: 'yyyy/mm/dd'},
      );
    }
    return result;
  }

  searchData() {
    if (!this.baseService.hasError(this.el, this.form)) {
      if (this.gridApi) {
        this.gridApi.setRowData(this.createGridData());
      }
    }
  }

}
