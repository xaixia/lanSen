import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, ActivatedRouteSnapshot, Router } from '@angular/router';
import { map } from 'rxjs/operator/map';
import { BaseService } from '../../common/base.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColGroupDef, ColDef } from 'ag-grid-community';
import { AppValidators } from '../../common/app-validators';
import { PaginationApi } from '../common/pagination/pagination.component';
declare let $: any;

@Component({
  selector: 'app-sd010-d07',
  templateUrl: './sd010-d07.component.html',
  styleUrls: ['./sd010-d07.component.scss']
})
export class Sd010D07Component implements OnInit {

  public form: FormGroup;
  // 受注目的
  public OrderPurposeKbnList = [];
  public SendKbnList = [];
  public ChangeBikoKbnList = [];
  public CEOrdersKbnList = [];
  public SaleRecordKbnList = [];
  public SearcBtnContent = '検索条件+';
  @ViewChild('conditonPanel')
  public conditonPanel: ElementRef;
  public opencontraction = false;
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
  ) {
    this.createForm();
    this.setKbnList();
    this.paginationApi = new PaginationApi();
    this.paginationApi.loadPaginationInfo(100, 10);
  }

  getRouterData() {
    let data = null;
    this.route.data.forEach((val) => {
      data = val;
    });
    return data;
  }

  ngOnInit() {
    $(this.conditonPanel.nativeElement).hide();
    this.gridOptions = <GridOptions>{};
    this.gridOptions.rowHeight = 40;
    this.gridOptions.headerHeight = 50;
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

  /**
   * createForm
   */
  createForm(): void {
    this.form = this.fb.group({
      // 受注年月日From
      OrderYmdFrom: [null, [ AppValidators.required('E0005', '受注年月日From') ]],
      // 受注年月日To
      OrderYmdTo: [null, []],
      // 受注No.
      OrderNumber: ['', [ AppValidators.required('E0005', '受注No') ]],
    });
  }

  setKbnList() {
    // tslint:disable-next-line:max-line-length
    this.OrderPurposeKbnList = [{ Kbn: '01001', KbnVal: '売上', ValidFlg: 0 }, { Kbn: '01002', KbnVal: '施工', ValidFlg: 0 }, { Kbn: '01003', KbnVal: '見本', ValidFlg: 0 }, { Kbn: '01004', KbnVal: '倉庫補充', ValidFlg: 0 }];
    this.SendKbnList = [{ Kbn: '02001', KbnVal: '送付', ValidFlg: 0 }, { Kbn: '02002', KbnVal: '持参', ValidFlg: 0 }];
    this.ChangeBikoKbnList = [{ Kbn: '03001', KbnVal: '変更', ValidFlg: 0 }, { Kbn: '03002', KbnVal: '変更有', ValidFlg: 0 }];
    this.CEOrdersKbnList = [{ Kbn: '04001', KbnVal: '対象', ValidFlg: 0 }, { Kbn: '04002', KbnVal: '対象外', ValidFlg: 0 }];
    this.SaleRecordKbnList = [{ Kbn: '05001', KbnVal: '計上済', ValidFlg: 0 }, { Kbn: '05002', KbnVal: '未計上あり', ValidFlg: 0 }];
  }

  /**
   *
   */
  conditionPanelOpenOrClose() {
    if (this.opencontraction) {
      $(this.conditonPanel.nativeElement).slideUp('normal');
      this.opencontraction = false;
      this.SearcBtnContent = '検索条件+';
    } else {
      $(this.conditonPanel.nativeElement).slideDown('normal');
      this.opencontraction = true;
      this.SearcBtnContent = '検索条件-';
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData([]);
  }

  createGridData(): any[] {
    return [
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '売上・送付', OrderNumber: '100001', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', ECJuchu: '〇', JuchuYMD: '2999/12/31', Seikyusaki: '×××商事', TntNm: '××　太郎'},
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '施工・持参', OrderNumber: '100002', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', ECJuchu: '〇', JuchuYMD: '2019/12/31', Seikyusaki: '×××商事', TntNm: '××　太郎'},
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '見本・持参', OrderNumber: '100003', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', JuchuYMD: '2018/12/31', Seikyusaki: '×××商事', TntNm: '××　太郎'},
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '倉庫補充', OrderNumber: '100004', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', ECJuchu: '〇', JuchuYMD: '2018/11/25', Seikyusaki: '×××商事', TntNm: '××　太郎'},
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '売上・送付', OrderNumber: '100005', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', ECJuchu: '〇', JuchuYMD: '2022/11/25', Seikyusaki: '×××商事', TntNm: '××　太郎'},
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '施工・持参', OrderNumber: '100006', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', JuchuYMD: '2018/11/29', Seikyusaki: '×××商事', TntNm: '××　太郎'},
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '見本・持参', OrderNumber: '100007', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', JuchuYMD: '2018/11/25', Seikyusaki: '×××商事', TntNm: '××　太郎'},
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '売上・送付', OrderNumber: '100001', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', ECJuchu: '〇', JuchuYMD: '2999/12/31', Seikyusaki: '×××商事', TntNm: '××　太郎'},
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '施工・持参', OrderNumber: '100002', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', ECJuchu: '〇', JuchuYMD: '2019/12/31', Seikyusaki: '×××商事', TntNm: '××　太郎'},
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '見本・持参', OrderNumber: '100003', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', JuchuYMD: '2018/12/31', Seikyusaki: '×××商事', TntNm: '××　太郎'},
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '倉庫補充', OrderNumber: '100004', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', ECJuchu: '〇', JuchuYMD: '2018/11/25', Seikyusaki: '×××商事', TntNm: '××　太郎'},
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '売上・送付', OrderNumber: '100005', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', ECJuchu: '〇', JuchuYMD: '2022/11/25', Seikyusaki: '×××商事', TntNm: '××　太郎'},
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '施工・持参', OrderNumber: '100006', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', JuchuYMD: '2018/11/29', Seikyusaki: '×××商事', TntNm: '××　太郎'},
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '見本・持参', OrderNumber: '100007', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', JuchuYMD: '2018/11/25', Seikyusaki: '×××商事', TntNm: '××　太郎'},
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '売上・送付', OrderNumber: '100001', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', ECJuchu: '〇', JuchuYMD: '2999/12/31', Seikyusaki: '×××商事', TntNm: '××　太郎'},
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '施工・持参', OrderNumber: '100002', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', ECJuchu: '〇', JuchuYMD: '2019/12/31', Seikyusaki: '×××商事', TntNm: '××　太郎'},
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '見本・持参', OrderNumber: '100003', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', JuchuYMD: '2018/12/31', Seikyusaki: '×××商事', TntNm: '××　太郎'},
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '倉庫補充', OrderNumber: '100004', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', ECJuchu: '〇', JuchuYMD: '2018/11/25', Seikyusaki: '×××商事', TntNm: '××　太郎'},
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '売上・送付', OrderNumber: '100005', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', ECJuchu: '〇', JuchuYMD: '2022/11/25', Seikyusaki: '×××商事', TntNm: '××　太郎'},
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '施工・持参', OrderNumber: '100006', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', JuchuYMD: '2018/11/29', Seikyusaki: '×××商事', TntNm: '××　太郎'},
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '見本・持参', OrderNumber: '100007', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', JuchuYMD: '2018/11/25', Seikyusaki: '×××商事', TntNm: '××　太郎'},
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '売上・送付', OrderNumber: '100001', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', ECJuchu: '〇', JuchuYMD: '2999/12/31', Seikyusaki: '×××商事', TntNm: '××　太郎'},
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '施工・持参', OrderNumber: '100002', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', ECJuchu: '〇', JuchuYMD: '2019/12/31', Seikyusaki: '×××商事', TntNm: '××　太郎'},
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '見本・持参', OrderNumber: '100003', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', JuchuYMD: '2018/12/31', Seikyusaki: '×××商事', TntNm: '××　太郎'},
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '倉庫補充', OrderNumber: '100004', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', ECJuchu: '〇', JuchuYMD: '2018/11/25', Seikyusaki: '×××商事', TntNm: '××　太郎'},
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '売上・送付', OrderNumber: '100005', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', ECJuchu: '〇', JuchuYMD: '2022/11/25', Seikyusaki: '×××商事', TntNm: '××　太郎'},
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '施工・持参', OrderNumber: '100006', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', JuchuYMD: '2018/11/29', Seikyusaki: '×××商事', TntNm: '××　太郎'},
      // tslint:disable-next-line:max-line-length
      {OrderPurpose: '見本・持参', OrderNumber: '100007', Nohinsaki: '×××株式会社', DepoNm: '123', JuchuSum: 9876543, JuchuZanSum: 9876543, CommitInfo: '社内連絡事項XXXXXXXXXX', ProductNm: '物品A', JuchuYMD: '2018/11/25', Seikyusaki: '×××商事', TntNm: '××　太郎'},
    ];
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '',
        checkboxSelection: true,
        width: 40,
        pinned: 'left',
      },
      {
        headerName: '受注目的',
        width: 150,
        field: 'OrderPurpose',
      },
      {
        headerName: '受注No.',
        width: 150,
        field: 'OrderNumber',
      },
      {
        headerName: '納品先',
        width: 150,
        field: 'Nohinsaki',
      },
      {
        headerName: 'デポ',
        width: 150,
        field: 'DepoNm',
      },
      {
        headerName: '受注合計金額',
        width: 150,
        field: 'JuchuSum',
        cellClass: 'justify-content-md-end',
        cellRenderer: (param) => param.value ? (param.value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : '0'
      },
      {
        headerName: '受注残合計金額',
        width: 150,
        field: 'JuchuZanSum',
        cellClass: 'justify-content-md-end',
        cellRenderer: (param) => param.value ? (param.value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : '0'
      },
      {
        headerName: '社内連絡事項',
        width: 200,
        field: 'CommitInfo',
      },
      {
        headerName: '物品名',
        width: 150,
        field: 'ProductNm',
      },
      {
        headerName: 'EC受注',
        width: 150,
        field: 'ECJuchu',
      },
      {
        headerName: '受注年月日',
        width: 150,
        field: 'JuchuYMD',
      },
      {
        headerName: '請求先',
        width: 150,
        field: 'Seikyusaki',
      },
      {
        headerName: '技術営業担当者',
        width: 150,
        field: 'TntNm',
      },
      {
        headerName: '',
        width: 100,
        cellClass: 'justify-content-md-center',
        cellRenderer: (param) => {
          const root = $('<div/>');
          // tslint:disable-next-line:max-line-length
          const eidtInforBtn = $('<div style=\'text-align: center\'><button class=\'btn btn-defulat btn-sm\' type=\'button\' style=\'width:70px;\'>複製</button></div>');
          eidtInforBtn.click(() => {
          });
          root.append(eidtInforBtn);
          return root[0];
        },
      },
    ];
  }

  searchData() {
    if (!this.baseService.hasError(this.el, this.form)) {
      if (this.gridApi) {
        this.gridApi.setRowData(this.createGridData());
      }
    }
  }
}
