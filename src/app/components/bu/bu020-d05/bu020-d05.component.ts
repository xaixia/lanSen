import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { BaseService } from '../../../common/base.service';
@Component({
  selector: 'app-bu020-d05',
  templateUrl: './bu020-d05.component.html',
  styleUrls: ['./bu020-d05.component.scss']
})
export class Bu020D05Component implements OnInit {
  public form: FormGroup;
  public ChangeBikoKbnList = [{ Kbn: '1', KbnVal: '日数計算', ValidFlg: 1 }, { Kbn: '2', KbnVal: '月数＋日数', ValidFlg: 0 }, { Kbn: '3', KbnVal: '割引早期現金化', ValidFlg: 0 }];
  public items1 = ['銀行振込', '手形', ' 小切手', '現金', 'でんさい', '電子決済サービス'];
  //
  public myvalue1 = "取引先A";
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
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData([
      { displayname: '末日締　翌月20日払', expirationdate: '15日', reqday: '16日', recoverysite: '1ヵ月後20日', recoverymethod: '手形', site: '180日', recoverymonth: '3月', recoveryday: '20日', recoveryreqday: '20日' },
      // tslint:disable-next-line:max-line-length
      { displayname: '末日締　翌月20日払', expirationdate: '末日', reqday: '末日', recoverysite: '1ヵ月後末日', recoverymethod: 'FB' },
    ]);
  }
  onAddRow() {
    const newItem = createNewRowData();
    this.gridApi.updateRowData({ add: [newItem] });
  }
  onRemoveSelected() {
    const selectedData = this.gridApi.getSelectedRows();
    this.gridApi.updateRowData({ remove: selectedData });
  }
  createGridData(): any[] {
    const result = [];
    for (let i = 0; i < 30; i++) {
      result.push(
        // tslint:disable-next-line:max-line-length
        { displayname: '末日締　翌月20日払', expirationdate: '15日', reqday: '16日', recoverysite: '1ヵ月後20日', recoverymethod: '手形', customsiteername: '180日', recoverymonth: '3月', recoveryday: '20日', recoveryreqday: '20日' },
        // tslint:disable-next-line:max-line-length
        { displayname: '末日締　翌月20日払', expirationdate: '末日', reqday: '末日', recoverysite: '1ヵ月後末日', recoverymethod: 'FB' },
      );
    }
    return result;
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '表示名',
        width: 150,
        field: 'displayname',
        pinned: 'left',
      },
      {
        headerName: '締日',
        width: 120,
        field: 'expirationdate',
      },
      {
        headerName: '請求書発行',
        width: 120,
        field: 'reqday',
      },
      {
        headerName: '回収サイト',
        width: 120,
        field: 'recoverysite',
      },
      {
        headerName: '回収方法',
        width: 120,
        field: 'recoverymethod',
      },
      {
        headerName: '決済サイト',
        width: 120,
        field: 'site',
      },
      {
        headerName: '変則回収月',
        width: 120,
        field: 'recoverymonth',
      },
      {
        headerName: '変則回収締日',
        width: 120,
        field: 'recoveryday',
      },
      {
        headerName: '変則回収請求書発効日',
        width: 160,
        field: 'recoveryreqday',
      },
    ];
  }
}

let newCount = 1;
function createNewRowData() {
  const newData = {
    displayname: '',
    expirationdate: '',
    reqday: 9999,
    recoverysite: '',
    recoverymethod: '',
    site: '180日'
  };
  newCount++;
  return newData;
}