import { Component, OnInit } from '@angular/core';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { BaseService } from '../../../common/base.service';

@Component({
  selector: 'app-cn010-d11',
  templateUrl: './cn010-d11.component.html',
  styleUrls: ['./cn010-d11.component.scss']
})
export class Cn010D11Component implements OnInit {
  // グリッド列Api
  private gridColumnApi;
  // フォームを設定する
  public gridOptions: GridOptions;
  // グリッドApi
  public gridApi: GridApi;
  // ロケールテキスト
  public localeText;
  public pinnedBottomRowData;
  public frameworkComponents;
  constructor(
    public baseService: BaseService,
  ) {

   }

  ngOnInit() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.rowHeight = 24;
    this.gridOptions.headerHeight = 24;
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

  createGridData(): any[] {
    const result = [];
      result.push(
        // tslint:disable-next-line:max-line-length
        {OrderNumber: '2018/05/31', Nohinsaki: 117400,  CommitInfo: '×', ProductNm: 117400, ECJuchu: '', JuchuYMD: 19900, Seikyusaki: 19900, TntNm: '×', OrderPurpose: ''},
        // tslint:disable-next-line:max-line-length
        {OrderNumber: '2018/06/30', Nohinsaki: 116600,  CommitInfo: '×', ProductNm: 116600, ECJuchu: '', JuchuYMD: 19100, Seikyusaki: 19100, TntNm: '×', OrderPurpose: ''},
        // tslint:disable-next-line:max-line-length
        {OrderNumber: '2018/07/31', Nohinsaki: 112000, CommitInfo: '×', ProductNm: 118000, JuchuYMD: 19100, OrderPurpose: '',  Seikyusaki: 19100, TntNm: '×'},
        // tslint:disable-next-line:max-line-length
        { OrderNumber: '2018/08/31',  Nohinsaki: 106000, CommitInfo: '●', ProductNm: 166000, ECJuchu: '●', OrderPurpose: '●', JuchuYMD: 19100 , Seikyusaki: 18500, TntNm: '●'},
        // tslint:disable-next-line:max-line-length
        { OrderNumber: '2018/09/30', Nohinsaki: 125000,  CommitInfo: '●', ProductNm: 116600, ECJuchu: '●', OrderPurpose: '●', JuchuYMD: 19100, Seikyusaki: 16500, TntNm: '●'},
        // tslint:disable-next-line:max-line-length
        {OrderNumber: '2018/10/31', Nohinsaki: 100000,  CommitInfo: '●', ProductNm: 116600, ECJuchu: '●', OrderPurpose: '●', JuchuYMD: 19100, Seikyusaki: 20300, TntNm: '●'},
        // tslint:disable-next-line:max-line-length
        {OrderNumber: '2018/11/30',  Nohinsaki: '',  CommitInfo: '解約', ProductNm: 116600,  ECJuchu: '', OrderPurpose: '', JuchuYMD: 19100, Seikyusaki: '', TntNm: '解約'},
        );
    return result;
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData(this.createGridData());
    let Nohinsaki = 0;
    let ProductNm = 0;
    let JuchuYMD = 0;
    let Seikyusaki = 0;
    const result = this.createGridData();
     console.log(result);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    for (let i = 0; i < result.length; i++) {
      if (i + 1 < result.length) {
        Nohinsaki += result[i].Nohinsaki;
        ProductNm += result[i].ProductNm;
        JuchuYMD += result[i].JuchuYMD;
        Seikyusaki += result[i].Seikyusaki;
      }
    }
    console.log(Nohinsaki);
    this.pinnedBottomRowData = [{OrderNumber: '合計',
    Nohinsaki: Nohinsaki , ProductNm: ProductNm, JuchuYMD: JuchuYMD, Seikyusaki: Seikyusaki}];
  }
  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '計上予定日',
        width: 300,
        field: 'OrderNumber',
        suppressSorting: true,
        suppressMenu: true,
        suppressFilter: true,
        pinnedRowCellRenderer: 'customPinnedRowRenderer',
        // cellRenderer: (params) => {
        //   return `<a href='./' target='_blank'>${params.value}</a>`;
        // },
        editable: false
      },
      {
        headerName: '売上',
        children: [
          {
            headerName: '契約金額',
            width: 100,
            field: 'ProductNm',
          cellRenderer: (param) => param.value ? '￥' + param.value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : null,
          cellClass: 'justify-content-md-end',
            editable: false,
            suppressSorting: true,
            suppressMenu: true,
            suppressFilter: true
          },
          {
            headerName: '計上金額',
            width: 100,
            field: 'Nohinsaki',
          cellRenderer: (param) => param.value ? '￥' + param.value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : null,
            cellClass: 'justify-content-md-end',
            editable: false,
            suppressSorting: true,
            suppressMenu: true,
            suppressFilter: true
          },
          {
            headerName: '計上',
            width: 100,
            field: 'CommitInfo',
            editable: false,
            suppressSorting: true,
            suppressMenu: true,
            suppressFilter: true
          },
          {
            headerName: '訂正',
            width: 100,
            field: 'ECJuchu',
            editable: false,
            suppressSorting: true,
            suppressMenu: true,
            suppressFilter: true
          },
        ],

      },
     {
      headerName: '原価',
      children: [
        {
          headerName: '契約金額',
          width: 100,
          field: 'JuchuYMD',
          cellRenderer: (param) => param.value ? '￥' + param.value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : null,
            cellClass: 'justify-content-md-end',
          editable: false,
          suppressSorting: true,
          suppressMenu: true,
          suppressFilter: true
        },
        {
          headerName: '計上金額',
          width: 100,
          field: 'Seikyusaki',
          cellRenderer: (param) => param.value ? '￥' + param.value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : null,
          cellClass: 'justify-content-md-end',
          editable: false,
          suppressSorting: true,
          suppressMenu: true,
          suppressFilter: true
        },
        {
          headerName: '計上',
          width: 100,
          field: 'TntNm',
          editable: false,
          suppressSorting: true,
          suppressMenu: true,
          suppressFilter: true
        },
        {
          headerName: '訂正',
          width: 100,
          field: 'OrderPurpose',
          editable: false,
          suppressSorting: true,
          suppressMenu: true,
          suppressFilter: true
        },
      ],
    },
    ];
  }
}
