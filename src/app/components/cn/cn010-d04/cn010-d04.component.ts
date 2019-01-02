import { Component, OnInit } from '@angular/core';
import { AppAnimations } from '../../../common/app-animations';
import { GridApi, GridOptions, ColDef, ColGroupDef } from 'ag-grid-community';
import { BaseService } from '../../../common/base.service';
@Component({
  selector: 'app-cn010-d04',
  templateUrl: './cn010-d04.component.html',
  styleUrls: ['./cn010-d04.component.scss'],
  animations: [ AppAnimations.openClose ],

})
export class Cn010D04Component implements OnInit {
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
    // this.gridOptions.popupParent = document.querySelector('body');


  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData(this.createGridData());
  }
  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '行',
        width: 68,
        field: 'rowIndex',
        rowDrag: true,
        cellRenderer: (param) =>  param.data.rowIndex = param.node.rowIndex + 1,
        suppressSorting: true,
        suppressMenu: true,
        editable : false,
        suppressFilter: true
      },
      {
        headerName: '削除',
        checkboxSelection: true,
        suppressFilter: true,
        suppressMenu: true,
        suppressMovable: true,
        suppressSorting: true,
        // headerCheckboxSelection: true,
        width: 68,
        editable: false,
        suppressToolPanel: true,
      },
      {
        headerName: '件名',
        width: 550,
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
        headerName: '数量',
        cellClass: 'justify-content-md-end',
        width: 150,
        field: 'ECJuchu',
        suppressSorting: true,
        suppressMenu: true,
        suppressFilter: true
      },
      {
        headerName: '単位',
        width: 150,
        field: 'JuchuYMD',
        editable: false,
        suppressSorting: true,
        suppressMenu: true,
        suppressFilter: true
      },
      {
        headerName: '単価',
        cellClass: 'justify-content-md-end',
        width: 150,
        field: 'OrderPurpose',
        cellRenderer: (param) =>  (param.value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'),
        suppressSorting: true,
        suppressMenu: true,
        suppressFilter: true
      },
      {
        headerName: '小計',
        cellClass: 'justify-content-md-end',
        width: 150,
        field: 'Nohinsaki',
        suppressSorting: true,
        cellRenderer: (param) =>  {
          if ( param.data.ECJuchu ) {
              param.data.Nohinsaki = param.data.ECJuchu * param.data.OrderPurpose;
              return param.data.Nohinsaki.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
          } else {
            return param.data.Nohinsaki = null;
          }
        },
        suppressMenu: true,
        suppressFilter: true
      },
      // {
      //   headerName: ' 表示順序',
      //   width: 150,
      //   field: 'Seikyusaki',
      //   suppressSorting: true,
      //   suppressMenu: true,
      //   suppressFilter: true
      // },
    ];
  }

  changeSearchForm() {
    this.searchFormOpend = !this.searchFormOpend;
  }

  changeInfoArea() {
    this.infoAreaOpend = !this.infoAreaOpend;
  }

  /**
   * 行追加
   */
  // onRowAdd() {
  //   this.gridOptions.api.updateRowData({add:
  //     [{
  //     OrderNumber: '',
  //     ECJuchu: '',
  //     JuchuYMD: '',
  //     OrderPurpose: ''
  //   }]
  //   });
  // }

  createGridData(): any[] {
    const result = [];
    for (let i = 0; i < 30; i++) {
      result.push(
        // tslint:disable-next-line:max-line-length
        {OrderPurpose: '10000', OrderNumber: '年間管理費用',  DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', ECJuchu: '1', JuchuYMD: '式', Seikyusaki: '×××商事', TntNm: '××　太郎'},
        // tslint:disable-next-line:max-line-length
        {OrderPurpose: '10000', OrderNumber: '捕虫器調査費用',  DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', ECJuchu: '1', JuchuYMD: 'ケ月', Seikyusaki: '×××商事', TntNm: '××　太郎'},
        // tslint:disable-next-line:max-line-length
        {OrderPurpose: '50000', OrderNumber: '鼠族トラップ調査費用',  DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', JuchuYMD: 'ケ月', Seikyusaki: '×××商事', TntNm: '××　太郎'},
        // tslint:disable-next-line:max-line-length
        {OrderPurpose: '70000', OrderNumber: '年間管理費用',  DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', ECJuchu: '1', JuchuYMD: 'ケ月', Seikyusaki: '×××商事', TntNm: '××　太郎'},
        // tslint:disable-next-line:max-line-length
        {OrderPurpose: '0', OrderNumber: '年間管理費用',  DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', ECJuchu: '1', JuchuYMD: 'ケ月', Seikyusaki: '×××商事', TntNm: '××　太郎'},
        );
    }
    return result;
  }
}
