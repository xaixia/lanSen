import { Component, OnInit, ElementRef } from '@angular/core';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../common/base.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cn020-d03',
  templateUrl: './cn020-d03.component.html',
  styleUrls: ['./cn020-d03.component.scss']
})
export class Cn020D03Component implements OnInit {
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
paginationApi: PaginationApi;
  constructor(
    private route: ActivatedRoute,
    public baseService: BaseService,
    private fb: FormBuilder,
    private el: ElementRef
  ) { this.paginationApi = new PaginationApi();
      this.paginationApi.loadPaginationInfo(100, 10);
  }

  ngOnInit() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.rowHeight = 24;
    this.gridOptions.headerHeight = 24;
    this.gridOptions.animateRows = true;
       // this.gridOptions.sideBar = {
    //   toolPanels: [
    //     {
    //       id: 'columns',
    //       labelDefault: 'columns',
    //       labelKey: 'columns',
    //       iconKey: 'columns',
    //       toolPanel: 'agColumnsToolPanel',
    //       toolPanelParams: {
    //         suppressRowGroups: true,
    //         suppressValues: true,
    //         suppressPivots: true,
    //         suppressPivotMode: true,
    //         suppressSideButtons: true,
    //         suppressColumnExpandAll: true
    //       }
    //     }
    //   ],
    //   defaultToolPanel: ''
    // };

    // this.gridOptions.defaultColDef = {
    //   menuTabs: ['filterMenuTab'],
    //   editable: true
    // };
    // this.gridOptions.popupParent = document.querySelector('body');

    // enterprise対応：メニュー非表示
    // this.gridOptions.suppressContextMenu = true;
    this.gridOptions.columnDefs = this.getGridColumnDefs();
    this.localeText = this.baseService.getGridLocaleText();
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
       // headerCheckboxSelection: true,
        width: 68,
        pinned: 'left',
        editable: false,
        suppressToolPanel: true,
      },
      {
        headerName: '作業',
        width: 150,
        field: 'Work',
        cellRenderer: (params) => {
          return `<a href='./'>${params.value}</a>`;
        },
        suppressFilter: true,
        suppressMenu: true,
        suppressSorting: true,
      },
      {
        headerName: '作業名',
        width: 250,
        field: 'WorkName',
        suppressFilter: true,
        suppressMenu: true,
        suppressSorting: true,
      },
      {
        headerName: '備考',
        width: 300,
        field: 'Remarks',
        suppressFilter: true,
        suppressMenu: true,
        suppressSorting: true,
      }
    ];
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData([]);
    this.gridApi.setRowData(this.createGridData());
  }
  createGridData(): any[] {
    const result = [];
    const index = 100001;
    for (let i = 0; i < 10; i++) {
      result.push(
        // tslint:disable-next-line:max-line-length
        {Work: '1111', WorkName: '目視点検', Remarks: ''},
        // tslint:disable-next-line:max-line-length
        {Work: '2222', WorkName: '飛翔昆虫モニタリング',  Remarks: ''},
        // tslint:disable-next-line:max-line-length
        {Work: '3333', WorkName: '歩行昆虫モニタリング',  Remarks: ''},
        // tslint:disable-next-line:max-line-length
        { Work: '4444', WorkName: 'トラップによる昆虫の殺虫、捕獲', Remarks: ''},
        // tslint:disable-next-line:max-line-length
        { Work: '5555', WorkName: 'トラップによるそ族の捕獲・殺そ', Remarks: ''},
        // tslint:disable-next-line:max-line-length
        { Work: '6666', WorkName: '異物検定', Remarks: ''},
        );
    }
    return result;
  }
  select() {}

  NoSelect() {}
}
