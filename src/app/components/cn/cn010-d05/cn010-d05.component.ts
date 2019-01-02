import { Component, OnInit } from '@angular/core';
import { AppAnimations } from '../../../common/app-animations';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { BaseService } from '../../../common/base.service';
declare const $: any;
@Component({
  selector: 'app-cn010-d05',
  templateUrl: './cn010-d05.component.html',
  styleUrls: ['./cn010-d05.component.scss'],
  animations: [ AppAnimations.openClose ],

})
export class Cn010D05Component implements OnInit {
  infoAreaOpend = true;
  searchFormOpend = true;
   // グリッド列Api
   private gridColumnApi;
   // フォームを設定する
   public gridOptions: GridOptions;
   // グリッドApi
   public gridApi: GridApi;
   // ロケールテキスト
   public localeText;
  constructor(
    public baseService: BaseService,

  ) { }

  ngOnInit() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.rowHeight = 24;
    this.gridOptions.headerHeight = 24;
    this.gridOptions.rowSelection = 'multiple';
    this.gridOptions.defaultColDef = {
      menuTabs: ['filterMenuTab'],
      editable: true
    };
    // enterprise対応：メニュー非表示
    this.gridOptions.suppressContextMenu = true;
    this.gridOptions.columnDefs = this.getGridColumnDefs();
    this.localeText = this.baseService.getGridLocaleText();
    this.gridOptions.popupParent = document.querySelector('body');
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData(this.createGridData());
  }
  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '選択',
        checkboxSelection: true,
        suppressFilter: true,
        suppressMenu: true,
        suppressMovable: true,
        suppressSorting: true,
        headerCheckboxSelection: true,
        width: 68,
        editable: false,
        suppressToolPanel: true,
      },
      {
        headerName: '紹介元',
        width: 300,
        field: 'OrderNumber',
        suppressSorting: true,
        suppressMenu: true,
        suppressFilter: true,
        // cellRenderer: (params) => {
        //   return `<a href='./' target='_blank'>${params.value}</a>`;
        // },
        editable: false
      },
      {
        headerName: '無期限',
        width: 150,
        editable: false,
        suppressSorting: true,
        suppressMenu: true,
        suppressFilter: true
      },
      {
        headerName: '支払期間(ヶ月)',
        width: 150,
        cellClass: 'justify-content-md-end',
        field: 'JuchuYMD',
        suppressSorting: true,
        suppressMenu: true,
        suppressFilter: true,
        editable: (param) => param.data.JuchuYMD !== ''

      },
      {
        headerName: '紹介料対象期間',
        width: 170,
        editable: false,
        field: 'OrderPurpose',
        suppressSorting: true,
        suppressMenu: true,
        suppressFilter: true,

      },
      {
        headerName: '紹介手数料設定',
        width: 150,
        field: 'Nohinsaki',
        suppressSorting: true,
        suppressMenu: true,
        suppressFilter: true
      },
      {
        headerName: '紹介手数料率(%)',
        width: 150,
        field: 'Seikyusaki',
        cellClass: 'justify-content-md-end',
        suppressSorting: true,
        suppressMenu: true,
        suppressFilter: true,
        editable: (param) => param.data.Seikyusaki !== ''
      },
      {
        headerName: '紹介手数料月額',
        width: 150,
        cellClass: 'justify-content-md-end',
        field: 'CommitInfo',
        cellRenderer: (param) =>  param.value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'),
        suppressSorting: true,
        suppressMenu: true,
        suppressFilter: true,
        editable: (param) => param.data.CommitInfo !== ''
      },
      {
        headerName: '紹介手数料合計金額',
        width: 150,
        cellClass: 'justify-content-md-end',
        field: 'DepoNm',
        editable: false,
        cellRenderer: (param) =>  (param.value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'),
        suppressSorting: true,
        suppressMenu: true,
        suppressFilter: true
      },
      {
        width: 150,
        cellClass: 'justify-content-md-center',
        editable: false,
        cellRenderer: (param) => {
          const root = $('<div/>');
          // tslint:disable-next-line:max-line-length
          const eidtInforBtn = $('<div style=\'text-align: center\'><button class=\'btn btn-info\' type=\'button\' style=\'width:100px;\'><i class=\'fa fa-copy\'></i> 支払管理</button></div>');
          eidtInforBtn.click(() => {
          });
          root.append(eidtInforBtn);
          return root[0];
        },
        suppressSorting: true,
        suppressMenu: true,
        suppressFilter: true
      },
    ];
  }

  changeSearchForm() {
    this.searchFormOpend = !this.searchFormOpend;
  }

  changeInfoArea() {
    this.infoAreaOpend = !this.infoAreaOpend;
  }
  createGridData(): any[] {
    const result = [];
    let index = 100001;
    for (let i = 0; i < 30; i++) {
      result.push(
        // tslint:disable-next-line:max-line-length
        {OrderPurpose: '2017/10/01～2018/09/30', OrderNumber: index++,  DepoNm: '37020', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '3000', ProductNm: '物品A', ECJuchu: '1', JuchuYMD: '12', Seikyusaki: '3.0', TntNm: '××　太郎'},
        // tslint:disable-next-line:max-line-length
        {OrderPurpose: '2017/10/01～2018/03/31', OrderNumber: index++,  DepoNm: '21595', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '4000', ProductNm: '物品A', ECJuchu: '1', JuchuYMD: '6', Seikyusaki: '3.0', TntNm: '××　太郎'},
        // tslint:disable-next-line:max-line-length
        {OrderPurpose: '2017/10/01～2018/09/30', OrderNumber: index++,  DepoNm: '12541', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '5000', ProductNm: '物品A', JuchuYMD: '12', Seikyusaki: '4.0', TntNm: '××　太郎'},
        // tslint:disable-next-line:max-line-length
        {OrderPurpose: '2017/10/01～2018/09/30', OrderNumber: index++,  DepoNm: '42125', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '', ProductNm: '物品A', ECJuchu: '', JuchuYMD: '12', Seikyusaki: '', TntNm: '××　太郎'},
        // tslint:disable-next-line:max-line-length
        {OrderPurpose: '2017/10/01～2018/09/30', OrderNumber: index++,  DepoNm: '321564', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '6000', ProductNm: '物品A', ECJuchu: '', JuchuYMD: '', Seikyusaki: '3.0', TntNm: '××　太郎'},
        // tslint:disable-next-line:max-line-length
        {OrderPurpose: '2017/10/01～2018/09/30', OrderNumber: index++, DepoNm: '521451', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '', ProductNm: '物品A', JuchuYMD: '12', Seikyusaki: '', TntNm: '××　太郎'},
        // tslint:disable-next-line:max-line-length
        {OrderPurpose: '2017/10/01～2018/09/30', OrderNumber: index++, DepoNm: '41521', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '', ProductNm: '物品A', JuchuYMD: '6', Seikyusaki: '3.0', TntNm: '××　太郎'},
        );
    }
    return result;
  }
}
