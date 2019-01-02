import { Component, OnInit, ElementRef } from '@angular/core';
import { GridOptions, GridApi, ColGroupDef, ColDef } from 'ag-grid-community';
import { BaseService } from '../../../common/base.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppValidators } from '../../../common/app-validators';

@Component({
  selector: 'app-cn010-d12',
  templateUrl: './cn010-d12.component.html',
  styleUrls: ['./cn010-d12.component.scss']
})
export class Cn010D12Component implements OnInit {
  public Hakkojokyo = [];
  public OrderPurposeKbnList = [];
  public money;
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
  constructor(
    public baseService: BaseService,
    private fb: FormBuilder,
    private el: ElementRef
  ) {
    this.setKbnList();
    this.createForm();
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
    this.gridApi.setRowData(this.createGridData());

    let sum = 0;
    this.money = '';
    this.gridApi.getRenderedNodes().forEach(a => {
      sum = sum + a.data.JuchuSum;
    });
    this.money = sum ? (sum || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : '0';
  }

    /**
   * createForm
   */
  createForm(): void {
    this.form = this.fb.group({
      // 契約番号
      aa: [null, []],
      // 契約名年月表示
      bb: [null, []],
      // 締日・回収日
      cc: ['', []],
      // 送付先一括変更
      dd: ['', []],
    });
  }

  setKbnList() {
    // tslint:disable-next-line:max-line-length
    this.OrderPurposeKbnList = [{ Kbn: '01001', KbnVal: '表示する', ValidFlg: 0 }];
    this.Hakkojokyo = [{ Kbn: '01001', KbnVal: '期間均等割り', ValidFlg: 1 }, { Kbn: '01002', KbnVal: '作業ボリューム割り', ValidFlg: 0 }];
  }

  createGridData(): any[] {
    const result = [];
    const index = 100001;
    for (let i = 0; i < 2; i++) {
      result.push(
        // tslint:disable-next-line:max-line-length
        {OrderPurpose: '2018/01/02', OrderNumber: '2018/06/02', Nohinsaki: '', DepoNm: '', JuchuSum: 1345235, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', ECJuchu: '', JuchuYMD: '○○食品　大崎工場', Seikyusaki: '', TntNm: ''},
        // tslint:disable-next-line:max-line-length
        {OrderPurpose: '2018/01/02', OrderNumber: '2018/06/02', Nohinsaki: '', DepoNm: '', JuchuSum: 12435345, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', ECJuchu: '', JuchuYMD: '○○食品　大崎工場', Seikyusaki: '', TntNm: ''},
        // tslint:disable-next-line:max-line-length
        {OrderPurpose: '2018/01/02', OrderNumber: '2018/06/02', Nohinsaki: '', DepoNm: '', JuchuSum: 323535, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', JuchuYMD: '○○食品　大崎工場', Seikyusaki: '', TntNm: ''},
        // tslint:disable-next-line:max-line-length
        {OrderPurpose: '2018/01/02', OrderNumber: '2018/06/02', Nohinsaki: '', DepoNm: '', JuchuSum: 3252346, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', ECJuchu: '', JuchuYMD: '○○食品　大崎工場', Seikyusaki: '', TntNm: ''},
        // tslint:disable-next-line:max-line-length
        {OrderPurpose: '2018/01/02', OrderNumber: '2018/06/02', Nohinsaki: '', DepoNm: '', JuchuSum: 432353, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', ECJuchu: '', JuchuYMD: '○○食品　大崎工場', Seikyusaki: '', TntNm: ''},
        // tslint:disable-next-line:max-line-length
        {OrderPurpose: '2018/01/02', OrderNumber: '2018/06/02', Nohinsaki: '', DepoNm: '', JuchuSum: 8345634, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', JuchuYMD: '○○食品　大崎工場', Seikyusaki: '', TntNm: ''},
        // tslint:disable-next-line:max-line-length
        {OrderPurpose: '2018/01/02', OrderNumber: '2018/06/02', Nohinsaki: '', DepoNm: '', JuchuSum: 211111, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', JuchuYMD: '○○食品　大崎工場', Seikyusaki: '', TntNm: ''},
        );
    }
    return result;
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
        headerName: '請求予定日',
        width: 150,
        field: 'OrderNumber',
        editable: (params) => this.getnewdata(params.data)
      },
      {
        headerName: '入金管理',
        width: 150,
        field: 'OrderPurpose',
        editable: (params) => this.getnewdata(params.data)
      },
      {
        headerName: '請求金額',
        width: 150,
        field: 'JuchuSum',
        cellClass: 'justify-content-md-end',
        cellRenderer: (param) => param.value ? (param.value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : '0',
        editable: (params) => this.getnewdata(params.data)
      },
      {
        headerName: '請求書送付先宛名',
        width: 150,
        field: 'JuchuYMD',
        editable: (params) => this.getnewdata(params.data)
      },
      {
        headerName: '請求書明細摘要',
        width: 150,
        field: 'Nohinsaki',
        editable: (params) => this.getnewdata(params.data)
      },
      {
        headerName: '請求担当者向けコメント',
        width: 150,
        field: 'Seikyusaki',
        editable: (params) => this.getnewdata(params.data)
      },
      {
        headerName: '請求確定',
        width: 150,
        field: 'DepoNm',
      },
      {
        headerName: '請求締',
        width: 150,
        field: 'ECJuchu',
      },
      {
        headerName: '請求計上',
        width: 150,
        field: 'TntNm',
      }
    ];
  }

  private getnewdata(data): any {
    if (data.New) {
      return true;
    } else {
      return false;
    }
  }

  add() {
    this.gridApi.updateRowData({
      add: [{
        OrderNumber: null,
        OrderPurpose: null,
        JuchuSum: null,
        JuchuYMD: null,
        Nohinsaki: null,
        Seikyusaki: null,
        DepoNm: null,
        ECJuchu: null,
        TntNm: null,
        New: true
      }]
    });
  }

  delete() {
    const rows = this.gridApi.getSelectedRows();
    if (!rows || rows.length === 0) { return; }
    this.gridApi.updateRowData({
      remove: rows
    });
  }
}
