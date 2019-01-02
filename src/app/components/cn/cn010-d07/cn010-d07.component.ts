import { Component, OnInit } from '@angular/core';
import { AppAnimations } from '../../../common/app-animations';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { BaseService } from '../../../common/base.service';
declare const $: any;
@Component({
  selector: 'app-cn010-d07',
  templateUrl: './cn010-d07.component.html',
  styleUrls: ['./cn010-d07.component.scss'],
  animations: [ AppAnimations.openClose ],

})
export class Cn010D07Component implements OnInit {
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
        headerName: 'ファイル種別',
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
        headerName: 'ﾊﾞｰｼﾞｮﾝ',
        width: 100,
        field: 'ProductNm',
        cellClass: 'justify-content-md-end',
        editable: false,
        suppressSorting: true,
        suppressMenu: true,
        suppressFilter: true
      },
      {
        headerName: '関連ファイル',
        width: 200,
        field: 'JuchuYMD',
        editable: false,
        suppressSorting: true,
        suppressMenu: true,
        suppressFilter: true,
        cellRenderer: (params) => {
          return `<a href='./'>${params.value}</a>`;
        },
      },
      {
        headerName: '変換前ファイル',
        width: 200,
        editable: false,
        field: 'OrderPurpose',
        suppressSorting: true,
        cellRenderer: (params) => {
          return `<a href='./'>${params.value}</a>`;
        },
        suppressMenu: true,
        suppressFilter: true,

      },
      {
        headerName: '備考',
        width: 400,
        field: 'Nohinsaki',
        suppressSorting: true,
        editable: false,
        suppressMenu: true,
        suppressFilter: true
      },
    ];
  }
  createGridData(): any[] {
    const result = [];
    for (let i = 0; i < 30; i++) {
      result.push(
        // tslint:disable-next-line:max-line-length
        {OrderPurpose: '', OrderNumber: '見積関連',  DepoNm: '37020', Nohinsaki: '建屋図面１', JuchuZanSum: 9876543, CommitInfo: '3000', ProductNm: '1', ECJuchu: '1', JuchuYMD: '見積資料0001.pdf', Seikyusaki: '3.0', TntNm: '××　太郎'},
        // tslint:disable-next-line:max-line-length
        {OrderPurpose: '', OrderNumber: '代行店見積',  DepoNm: '21595', Nohinsaki: '施工見積書(2018/05/12版)', JuchuZanSum: 9876543, CommitInfo: '4000', ProductNm: '2', ECJuchu: '1', JuchuYMD: '施工見積書0002.pdf', Seikyusaki: '3.0', TntNm: '××　太郎'},
        // tslint:disable-next-line:max-line-length
        {OrderPurpose: '', OrderNumber: '代行店見積',  DepoNm: '12541', Nohinsaki: '施工見積書(2018/05/06版)', JuchuZanSum: 9876543, CommitInfo: '5000', ProductNm: '1', JuchuYMD: '施工見積書0002.pdf', Seikyusaki: '4.0', TntNm: '××　太郎'},
        // tslint:disable-next-line:max-line-length
        {OrderPurpose: 'THC用年間管理スケジュール表③.xlsx', OrderNumber: 'THC用年間管理スケジュール表',  DepoNm: '42125', Nohinsaki: 'THC用年間管理スケジュール表(＊＊バージョン)', JuchuZanSum: 9876543, CommitInfo: '', ProductNm: '3', ECJuchu: '', JuchuYMD: 'THC用年間管理スケジュール表③.pdf ', Seikyusaki: '', TntNm: '××　太郎'},
        // tslint:disable-next-line:max-line-length
        {OrderPurpose: 'THC用年間管理スケジュール表.xlsx', OrderNumber: 'THC用年間管理スケジュール表',  DepoNm: '321564', Nohinsaki: 'THC用年間管理スケジュール表(＊＊バージョン)', JuchuZanSum: 9876543, CommitInfo: '6000', ProductNm: '1', ECJuchu: '', JuchuYMD: 'THC用年間管理スケジュール表.pdf', Seikyusaki: '3.0', TntNm: '××　太郎'},
        // tslint:disable-next-line:max-line-length
        {OrderPurpose: '契約書0001.docx', OrderNumber: '契約書(対得意先)', DepoNm: '521451', Nohinsaki: '契約書加工版', JuchuZanSum: 9876543, CommitInfo: '', ProductNm: '1', JuchuYMD: '契約書0001.pdf', Seikyusaki: '', TntNm: '××　太郎'},
        // tslint:disable-next-line:max-line-length
        {OrderPurpose: '注文書0001.docx', OrderNumber: '注文書(対得意先)', DepoNm: '41521', Nohinsaki: '注文書加工版', JuchuZanSum: 9876543, CommitInfo: '', ProductNm: '1', JuchuYMD: '契約管理請書0001.pdf', Seikyusaki: '3.0', TntNm: '××　太郎'},
        );
    }
    return result;
  }
  changeSearchForm() {
    this.searchFormOpend = !this.searchFormOpend;
  }

  changeInfoArea() {
    this.infoAreaOpend = !this.infoAreaOpend;
  }
}
