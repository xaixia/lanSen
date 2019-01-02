import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { BaseService } from '../../../common/base.service';

@Component({
  selector: 'app-bu020-d06',
  templateUrl: './bu020-d06.component.html',
  styleUrls: ['./bu020-d06.component.scss']
})
export class Bu020D06Component implements OnInit {

  public form: FormGroup;
  public ChangeBikoKbnList = [{ Kbn: '1', KbnVal: '日数計算', ValidFlg: 1 }, { Kbn: '2', KbnVal: '月数＋日数', ValidFlg: 0 }];
  public items1 = ['施工先', '請求先', '仕入先', '紹介元', '代行店', 'まとめ支払先', 'まとめ回収先'];
  public items2 = ['全額振込', '金利引振込（10万円以上）', '期日振込（10万円以上）', '相殺', '全額振込（紹介料）'];
  public items3 = ['普通', '当座'];
  public myvalue1 = 'みずほ';
  public myvalue2 = '早稲田支店';
  //
  public myvalue3 = "支払先A";
  paginationApi: PaginationApi;
  // グリッド列Api
  private gridColumnApi;
  // フォームを設定する
  public gridOptions: GridOptions;
  // グリッドApi
  public gridApi: GridApi;
  // ロケールテキスト
  public localeText;
  constructor(
    private fb: FormBuilder,
    public baseService: BaseService,
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

    this.gridOptions.defaultColDef = {
      menuTabs: [],
      editable: false,
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
    this.form = this.fb.group({
    });
  }
  onAddRow() {
    const newItem = createNewRowData();
    this.gridApi.updateRowData({ add: [newItem] });
  }
  onRemoveSelected() {
    const selectedData = this.gridApi.getSelectedRows();
    this.gridApi.updateRowData({ remove: selectedData });
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData([
      { transactiontype: '代行店', expirationdate: '20日', paymonth: '1ヵ月後', payday: '20日', paymethod: '全額振込', paysite: '', bank: '三菱UFJ', branch: '新宿', accounttype: '普通', accountcode: '12345678', namekana: 'ﾒｲｷﾞｲﾁ' },
      { transactiontype: '仕入先', expirationdate: '15日', paymonth: '1ヵ月後', payday: '20日', paymethod: '金利引振込', paysite: '90日', bank: 'みずほ', branch: '渋谷', accounttype: '普通', accountcode: '23456781', namekana: 'ﾒｲｷﾞﾆ' },
      { transactiontype: '紹介元', expirationdate: '20日', paymonth: '1ヵ月後', payday: '末日', paymethod: '期日振込', paysite: '1ヵ月後20日', bank: 'りそな', branch: '新丸子', accounttype: '当座', accountcode: '34567812', namekana: 'ﾒｲｷﾞｻﾝ' },
      { transactiontype: '未払先', expirationdate: '末日', paymonth: '1ヵ月後', payday: '末日', paymethod: '相殺', paysite: '', bank: '横浜', branch: '馬車道', accounttype: '普通', accountcode: '45678123', namekana: 'ﾒｲｷﾞﾖﾝ' },
    ]);
  }
  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '取引種別',
        width: 100,
        field: 'transactiontype',
        pinned: 'left',
      },
      {
        headerName: '締日',
        width: 100,
        field: 'expirationdate',
      },
      {
        headerName: '支払月',
        width: 100,
        field: 'paymonth',
      },
      {
        headerName: '支払日',
        width: 100,
        field: 'payday',
      },
      {
        headerName: '支払方法',
        width: 120,
        field: 'paymethod',
      },
      {
        headerName: '支払サイト',
        width: 120,
        field: 'paysite',
      },
      {
        headerName: '銀行',
        width: 120,
        field: 'bank',
      },
      {
        headerName: '支店',
        width: 120,
        field: 'branch',
      },
      {
        headerName: '口座種別',
        width: 100,
        field: 'accounttype',
      },
      {
        headerName: '口座番号',
        width: 160,
        field: 'accountcode',
      },
      {
        headerName: '名義人カナ',
        width: 160,
        field: 'namekana',
      }
    ];
  }
}
let newCount = 1;
function createNewRowData() {
  const newData = {
    transactiontype: '施工先',
    expirationdate: '99',
    paymonth: 1,
    payday: '20',
    paymethod: '全額振込',
    paysite: '1ヵ月後20日',
    bank: 1,
    branch: 68,
    accounttype: '普通',
    accountcode: '0034567',
    namekana: 'ﾃｽﾄﾒｲｷﾞﾆﾝ'
  };
  newCount++;
  return newData;
}