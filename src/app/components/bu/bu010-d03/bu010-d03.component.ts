import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Route, ActivatedRouteSnapshot, Router } from '@angular/router';
import { BaseService } from '../../../common/base.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColGroupDef, ColDef } from 'ag-grid-community';
import { AppValidators } from '../../../common/app-validators';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { AppAnimations } from '../../../common/app-animations';
declare let $: any;

@Component({
  selector: 'app-bu010-d03',
  templateUrl: './bu010-d03.component.html',
  styleUrls: ['./bu010-d03.component.scss'],
  animations: [AppAnimations.openClose],
})
export class Bu010D03Component implements OnInit {
  searchFormOpend = true;
  infoAreaOpend = true;

  public form: FormGroup;

  @ViewChild('conditonPanel')
  public conditonPanel: ElementRef;
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
    //this.createForm();
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

    this.gridOptions.defaultColDef = {
      menuTabs: ['filterMenuTab'],
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
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '会社コード',
        field: 'CompanyCode',
        width: 100,
        suppressMenu: true,
        cellRenderer: (params) => {
          return `<a href='./'>${params.value}</a>`;
        },
      },
      {
        headerName: '会社名',
        field: 'CompanyName',
        suppressMenu: true,
      },
      {
        headerName: '会社カナ',
        field: 'CompanyKana',
        suppressMenu: true,
      },
      {
        headerName: '有効期間(自)',
        field: 'EffectiveDateStart',
        suppressMenu: true,
        width: 120,
      },
      {
        headerName: '有効期間(至)',
        field: 'EffectiveDateEnd',
        suppressMenu: true,
        width: 160,
        cellRenderer: (params) => {
          const root = $('<div/>');
          // tslint:disable-next-line:max-line-length
          const eidtInforBtn = $('<div style=\'text-align: center\'>' + params.value + '&nbsp;&nbsp;&nbsp;&nbsp;<button class=\'btn btn-primary\' type=\'button\'><i class=\'fa fa-arrow-circle-right\'></i> 分割</button></div>');
          eidtInforBtn.click(() => {
          });
          root.append(eidtInforBtn);
          return root[0];
        },
      },
      {
        headerName: "会社グループ",
        openByDefault: false,
        children: [
          {
            headerName: "会社グループa",
            field: "CompanyGroup1",
            suppressMenu: true,
            width: 120,
          },
          {
            headerName: "会社グループb",
            columnGroupShow: "open",
            field: "CompanyGroup2",
            suppressMenu: true,
            width: 120,
          },
          {
            headerName: "会社グループc",
            columnGroupShow: "open",
            field: "CompanyGroup3",
            suppressMenu: true,
            width: 120,
          },
        ]
      },
      {
        headerName: '会社カテゴリ',
        openByDefault: false,
        children: [
          {
            headerName: "会社カテゴリa",
            field: "CompanyCategory1",
            suppressMenu: true,
            width: 120,
          },
          {
            headerName: "会社カテゴリb",
            columnGroupShow: "open",
            field: "CompanyCategory2",
            suppressMenu: true,
            width: 120,
          },
          {
            headerName: "会社カテゴリc",
            columnGroupShow: "open",
            field: "CompanyCategory3",
            suppressMenu: true,
            width: 120,
          },
        ]
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

  createGridData(): any[] {
    return [
      { CompanyCode: 'COM01', CompanyName: '会社01', CompanyKana: 'ｶｲｼｬ01', EffectiveDateStart: '1900/01/01', EffectiveDateEnd: '2999/12/31', CompanyGroup1: 'company1', CompanyGroup2: 'as', CompanyGroup3: 'sd', CompanyCategory1: 'abc', CompanyCategory2: 'qwe', CompanyCategory3: 'zxz' },
      { CompanyCode: 'COM02', CompanyName: '会社02', CompanyKana: 'ｶｲｼｬ02', EffectiveDateStart: '1900/01/01', EffectiveDateEnd: '2999/12/31', CompanyGroup1: 'company1', CompanyGroup2: 'a2', CompanyCategory1: 'bcx', CompanyCategory2: 'qwe', CompanyCategory3: 'zxz' },
      { CompanyCode: 'COM03', CompanyName: '会社03', CompanyKana: 'ｶｲｼｬ03', EffectiveDateStart: '1900/01/01', EffectiveDateEnd: '2999/12/31', CompanyGroup1: 'company1', CompanyGroup2: 'as', CompanyCategory1: 'avv', CompanyCategory2: 'qwe', CompanyCategory3: 'zxz' },
      { CompanyCode: 'COM04', CompanyName: '会社04', CompanyKana: 'ｶｲｼｬ04', EffectiveDateStart: '1900/01/01', EffectiveDateEnd: '2999/12/31', CompanyGroup1: 'company1', CompanyGroup2: 'as', CompanyCategory1: 'abc', CompanyCategory2: 'qwe', CompanyCategory3: 'zxz' },
      { CompanyCode: 'COM05', CompanyName: '会社05', CompanyKana: 'ｶｲｼｬ05', EffectiveDateStart: '1900/01/01', EffectiveDateEnd: '2999/12/31', CompanyGroup1: 'company1', CompanyGroup2: 'as', CompanyCategory1: 'abc', CompanyCategory2: 'qwe', CompanyCategory3: 'zxz' },
      { CompanyCode: 'COM06', CompanyName: '会社06', CompanyKana: 'ｶｲｼｬ06', EffectiveDateStart: '1900/01/01', EffectiveDateEnd: '2999/12/31', CompanyGroup1: 'company1', CompanyGroup2: 'as', CompanyCategory1: 'abc', CompanyCategory2: 'qwe', CompanyCategory3: 'zxz' },
      { CompanyCode: 'COM07', CompanyName: '会社07', CompanyKana: 'ｶｲｼｬ07', EffectiveDateStart: '1900/01/01', EffectiveDateEnd: '2999/12/31', CompanyGroup1: 'company1', CompanyGroup2: 'as', CompanyCategory1: 'abc', CompanyCategory2: 'qwe', CompanyCategory3: 'zxz' },
      { CompanyCode: 'COM08', CompanyName: '会社08', CompanyKana: 'ｶｲｼｬ08', EffectiveDateStart: '1900/01/01', EffectiveDateEnd: '2999/12/31', CompanyGroup1: 'company1', CompanyGroup2: 'as', CompanyCategory1: 'abc', CompanyCategory2: 'qwe', CompanyCategory3: 'zxz' },
    ];
  }

  searchData() {
    this.gridApi.setRowData(this.createGridData());
  }

  changeSearchForm() {
    this.searchFormOpend = !this.searchFormOpend;
  }

  changeInfoArea() {
    this.infoAreaOpend = !this.infoAreaOpend;
  }

}
