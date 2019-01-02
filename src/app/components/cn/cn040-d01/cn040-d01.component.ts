import { Component, OnInit } from '@angular/core';
import { ColGroupDef, ColDef, GridOptions, GridApi } from 'ag-grid-community';
import { BaseService } from '../../../common/base.service';

@Component({
  selector: 'app-cn040-d01',
  templateUrl: './cn040-d01.component.html',
  styleUrls: ['./cn040-d01.component.scss']
})
export class Cn040D01Component implements OnInit {
// グリッド列Api
private gridColumnApi;
private OneCostgridColumnApi;
// フォームを設定する
public gridOptions: GridOptions;
public OneCostgridOptions: GridOptions;
// グリッドApi
public gridApi: GridApi;
public OneCostgridApi: GridApi;
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

  this.OneCostgridOptions = <GridOptions>{};
  this.OneCostgridOptions.rowHeight = 24;
  this.OneCostgridOptions.headerHeight = 24;


  // enterprise対応：メニュー非表示
  this.gridOptions.suppressContextMenu = true;
  this.gridOptions.columnDefs = this.getGridColumnDefs();
  this.localeText = this.baseService.getGridLocaleText();
  this.gridOptions.popupParent = document.querySelector('body');

  this.OneCostgridOptions.suppressContextMenu = true;
  this.OneCostgridOptions.columnDefs = this.getOneCostGridColumnDefs();
  this.OneCostgridOptions.popupParent = document.querySelector('body');
}

createGridData(): any[] {
  const result = [];
    result.push(
      // tslint:disable-next-line:max-line-length
      {OrderNumber: '2018/04/31', ProductNm: 100000,  CommitInfo: 0, Nohinsaki: 100000, ECJuchu: '●', JuchuYMD: 0, Seikyusaki: 0, TntNm: '●'},
      // tslint:disable-next-line:max-line-length
      {OrderNumber: '2018/05/31', ProductNm: 100000,  CommitInfo: 0, Nohinsaki: 100000, ECJuchu: '●', JuchuYMD: 0, Seikyusaki: 0, TntNm: '●', },
      // tslint:disable-next-line:max-line-length
      {OrderNumber: '2018/06/30', ProductNm: 100000,  CommitInfo: 0, Nohinsaki: 75000, ECJuchu: '●', JuchuYMD: 300000, Seikyusaki: 267000, TntNm: '●'},
      // tslint:disable-next-line:max-line-length
      {OrderNumber: '2018/07/31', ProductNm: 100000, CommitInfo: 0, Nohinsaki: 92000, ECJuchu: '●', JuchuYMD: 0,  Seikyusaki: 0, TntNm: '●'},
      // tslint:disable-next-line:max-line-length
      { OrderNumber: '2018/08/31',  ProductNm: 100000, CommitInfo: 0, Nohinsaki: 100000, ECJuchu: '●', JuchuYMD: 0 , Seikyusaki: 0, TntNm: '●'},
      // tslint:disable-next-line:max-line-length
      { OrderNumber: '2018/09/30', ProductNm: 100000,  CommitInfo: 0, Nohinsaki: 106000, ECJuchu: '●',  JuchuYMD: 300000, Seikyusaki: 306000, TntNm: '●'},
      // tslint:disable-next-line:max-line-length
      {OrderNumber: '2018/10/31', ProductNm: 100000,  CommitInfo: 0, Nohinsaki: 100000, ECJuchu: '',  JuchuYMD: 0, Seikyusaki: 0, TntNm: ''},
       // tslint:disable-next-line:max-line-length
       {OrderNumber: '2018/11/30', ProductNm: 100000,  CommitInfo: 0, Nohinsaki: 90500, ECJuchu: '',  JuchuYMD: 0, Seikyusaki: 0, TntNm: ''},
        // tslint:disable-next-line:max-line-length
      {OrderNumber: '2018/12/31', ProductNm: 100000,  CommitInfo: 190500, Nohinsaki: 100000, ECJuchu: '解約', JuchuYMD: 0, Seikyusaki: 0, TntNm: '解約'},
       // tslint:disable-next-line:max-line-length
       {OrderNumber: '2018/1/31', ProductNm: 100000,  CommitInfo: 0, Nohinsaki: '', ECJuchu: '解約',  JuchuYMD: 0, Seikyusaki: 0, TntNm: '解約'},
        // tslint:disable-next-line:max-line-length
      {OrderNumber: '2018/02/28', ProductNm: 100000,  CommitInfo: 0, Nohinsaki: '', ECJuchu: '解約',  JuchuYMD: 0, Seikyusaki: 0, TntNm: '解約'},
       // tslint:disable-next-line:max-line-length
       {OrderNumber: '2018/03/31', ProductNm: 100000,  CommitInfo: 0, Nohinsaki: '', ECJuchu: '解約',  JuchuYMD: 0, Seikyusaki: 0, TntNm: '解約'},
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
  let CommitInfo = 0;
  const result = this.createGridData();
   console.log(result);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  for (let i = 0; i < result.length; i++) {
    if (i < result.length) {
      Nohinsaki += result[i].Nohinsaki;
      ProductNm += result[i].ProductNm;
      JuchuYMD += result[i].JuchuYMD;
      Seikyusaki += result[i].Seikyusaki;
      CommitInfo += result[i].CommitInfo;
    }
  }
  console.log(Nohinsaki);
  this.pinnedBottomRowData = [{OrderNumber: '合計',
  Nohinsaki: Nohinsaki , ProductNm: ProductNm, CommitInfo: CommitInfo, JuchuYMD: JuchuYMD, Seikyusaki: Seikyusaki, }];
}
getGridColumnDefs(): (ColDef | ColGroupDef)[] {
  return [
    {
      headerName: '計上予定日',
      width: 100,
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
          headerName: '契約時予定額',
          width: 100,
          field: 'ProductNm',
          cellRenderer: (param) => param.value ? '￥' + param.value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : '',
          cellClass: 'justify-content-md-end',
          editable: false,
          suppressSorting: true,
          suppressMenu: true,
          suppressFilter: true
        },
        {
          headerName: '解約時予定額',
          width: 100,
          field: 'Nohinsaki',
          cellRenderer: (param) => param.value ? '￥' + param.value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : '',
          cellClass: 'justify-content-md-end',
          editable: false,
          suppressSorting: true,
          suppressMenu: true,
          suppressFilter: true
        },
        {
          headerName: '請求差額',
          width: 100,
          field: 'CommitInfo',
          editable: false,
          cellRenderer: (param) => param.value ? '(' + '￥' + param.value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + ')' : '' ,
          suppressSorting: true,
          suppressMenu: true,
          suppressFilter: true
        },
        {
          headerName: '計上',
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
    headerName: '請求',
    children: [
      {
        headerName: '契約時予定額',
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
        headerName: '解約時予定額',
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
        headerName: '発行',
        width: 100,
        field: 'TntNm',
        editable: false,
        suppressSorting: true,
        suppressMenu: true,
        suppressFilter: true
      },
    ],
  },
  ];
}
getOneCostGridColumnDefs(): (ColDef | ColGroupDef)[] {
  return [
    {
      headerName: '計上予定日',
      width: 100,
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
          headerName: '契約時予定額',
          width: 100,
          field: 'ProductNm',
          cellRenderer: (param) => param.value ? '￥' + param.value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : '',
          cellClass: 'justify-content-md-end',
          editable: false,
          suppressSorting: true,
          suppressMenu: true,
          suppressFilter: true
        },
        {
          headerName: '解約時予定額',
          width: 100,
          field: 'Nohinsaki',
          cellRenderer: (param) => param.value ? '￥' + param.value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : '',
          cellClass: 'justify-content-md-end',
          editable: false,
          suppressSorting: true,
          suppressMenu: true,
          suppressFilter: true
        },
        {
          headerName: '請求差額',
          width: 100,
          field: 'CommitInfo',
          editable: false,
          cellRenderer: (param) => param.value ? '(' + '￥' + param.value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + ')' : '' ,
          suppressSorting: true,
          suppressMenu: true,
          suppressFilter: true
        },
        {
          headerName: '計上',
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
    headerName: '請求',
    children: [
      {
        headerName: '契約時予定額',
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
        headerName: '解約時予定額',
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
    ],
  },
  ];
}
}

