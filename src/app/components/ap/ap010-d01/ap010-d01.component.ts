import { AppModalResult, AppModalConfig } from '../../../common/modal.directive';
import { Ap010D02Component } from '../ap010-d02/ap010-d02.component';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../common/base.service';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { AppAnimations } from '../../../common/app-animations';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridColumn } from 'ag-grid-angular';
import { PopwindowComponent } from '../../design/popwindow/popwindow.component';

declare let $: any;

@Component({
  selector: 'app-ap010-d01',
  templateUrl: './ap010-d01.component.html',
  styleUrls: ['./ap010-d01.component.scss'],
  animations: [AppAnimations.openClose],
})
export class Ap010D01Component implements OnInit {

  searchFormOpend = true;
  status = 1;
  infoAreaOpend = true;
  tabContentArea = false;
  AP010D02ModalConfig = <AppModalConfig>{
    component: Ap010D02Component,
    modalOptions: {
      class: 'app-modal-xl'
    }
  };

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
  public opencontraction = true;
  // グリッド列Api
  private gridColumnApi: AgGridColumn;
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
    this.gridOptions = <GridOptions>{};
    this.gridOptions.rowHeight = 24;
    this.gridOptions.headerHeight = 24;
    this.gridOptions.animateRows = true;

    const data = this.getRouterData();
    if (data && data.scrollBar === 1) {
      this.gridOptions.gridAutoHeight = true;
    }

    this.gridOptions.defaultColDef = {
      menuTabs: ['filterMenuTab'],
    };
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
    this.gridOptions.popupParent = document.querySelector('body');
    // enterprise対応：メニュー非表示
    this.gridOptions.suppressContextMenu = true;
    this.localeText = this.baseService.getGridLocaleText();
    this.gridOptions.columnDefs = this.getGridColumnDefs();
    this.conditionPanelOpenOrClose();
  }

  /**
   * createForm
   */
  createForm(): void {
    this.form = this.fb.group({});
  }

  /**
   *
   */
  conditionPanelOpenOrClose() {
    if (this.opencontraction) {
      this.opencontraction = false;
      this.SearcBtnContent = '検索条件+';
    } else {
      this.opencontraction = true;
      this.SearcBtnContent = '検索条件-';
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData(this.createGridData());
    this.gridOptions.columnApi.setColumnVisible('checkbox', this.tabContentArea);
  }

  createGridData(): any[] {
    const res = [];
    for (let i = 0; i < 10; i++) {
      res.push(
        // tslint:disable-next-line:max-line-length
        { OrderPurpose: '2018/04/01', OrderNumber: '物販', Nohinsaki: '特価申請', DepoNm: '承認待ち', JuchuSum: '×××株式会社', ProductNm: '個別価格：￥100', ECJuchu: '申請時に入力した承認者へのコメントを表示する。', JuchuYMD: '×××　太郎' },
        // tslint:disable-next-line:max-line-length
        { OrderPurpose: '2018/04/02', OrderNumber: '見積・契約', Nohinsaki: '値引き', DepoNm: '承認待ち', JuchuSum: '×××商事', ProductNm: '値引き：￥12,000', ECJuchu: '申請時に入力した承認者へのコメントを表示する。', JuchuYMD: '×××　太郎' },
        // tslint:disable-next-line:max-line-length
        { OrderPurpose: '2018/04/03', OrderNumber: 'マスター', Nohinsaki: '見積申請', DepoNm: '承認待ち', JuchuSum: '×××A工場', ProductNm: '契約金額：￥300,000', ECJuchu: '承認よろしくおねがいします。', JuchuYMD: '×××　太郎' },
        // tslint:disable-next-line:max-line-length
        { OrderPurpose: '2018/04/05', OrderNumber: '汎用計上', Nohinsaki: '契約申請', DepoNm: '承認待ち', JuchuSum: '××xクリニック', ProductNm: '個別価格：￥100', ECJuchu: '申請時に入力した承認者へのコメントを表示する。', JuchuYMD: '×××　太郎' },
        // tslint:disable-next-line:max-line-length
        { OrderPurpose: '2018/04/08', OrderNumber: 'マスター', Nohinsaki: '売上・原価変更申請', DepoNm: '承認待ち', JuchuSum: '×××B工場', ProductNm: '見積金額：￥80,000', ECJuchu: '急ぎの承認お願いします。', JuchuYMD: '×××　太郎' },
        // tslint:disable-next-line:max-line-length
        { OrderPurpose: '2018/04/08', OrderNumber: '見積・契約', Nohinsaki: '解約申請', DepoNm: '承認待ち', JuchuSum: '×××株式会社', ProductNm: '見積金額：￥80,000', ECJuchu: '急ぎの承認お願いします。', JuchuYMD: '×××　太郎' },
        // tslint:disable-next-line:max-line-length
        { OrderPurpose: '2018/04/08', OrderNumber: '物販', Nohinsaki: '代行店変更申請', DepoNm: '承認待ち', JuchuSum: '×××商事', ProductNm: '見積金額：￥80,000', ECJuchu: '急ぎの承認お願いします。', JuchuYMD: '×××　太郎' },
        // tslint:disable-next-line:max-line-length
        { OrderPurpose: '2018/04/08', OrderNumber: '汎用計上', Nohinsaki: '注文書未回収売上申請', DepoNm: '承認待ち', JuchuSum: '×××B工場', ProductNm: '見積金額：￥80,000', ECJuchu: '急ぎの承認お願いします。', JuchuYMD: '×××　太郎' },
        // tslint:disable-next-line:max-line-length
        { OrderPurpose: '2018/04/08', OrderNumber: 'マスター', Nohinsaki: '棚卸結果申請', DepoNm: '承認待ち', JuchuSum: '××xクリニック', ProductNm: '見積金額：￥80,000', ECJuchu: '急ぎの承認お願いします。', JuchuYMD: '×××　太郎' },
      );
    }
    return res;
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '承認',
        checkboxSelection: true,
        suppressFilter: true,
        suppressMenu: true,
        suppressMovable: true,
        suppressSorting: true,
        headerCheckboxSelection: true,
        width: 68,
        pinned: 'left',
        editable: false,
        colId: 'checkbox',
      },
      {
        headerName: '申請日',
        width: 100,
        field: 'OrderPurpose',
        suppressMenu: false,
      },
      {
        headerName: '業務区分',
        width: 100,
        field: 'OrderNumber',
        suppressMenu: false,
      },
      {
        headerName: '承認区分',
        width: 150,
        field: 'Nohinsaki',
        suppressMenu: false,
      },
      {
        headerName: 'ステータス',
        width: 100,
        field: 'DepoNm',
        suppressMenu: false,
      },
      {
        headerName: '取引先',
        width: 150,
        field: 'JuchuSum',
        suppressMenu: true,
      },
      {
        headerName: '申請内容',
        width: 250,
        field: 'ProductNm',
        suppressMenu: true,
      },
      {
        headerName: '申請コメント',
        width: 300,
        field: 'ECJuchu',
        suppressMenu: true,
      },
      {
        headerName: '担当者(担当技術営業)',
        width: 150,
        field: 'JuchuYMD',
        cellClass: 'justify-content-center',
        suppressMenu: true,
      },
      {
        headerName: '承認担当者',
        width: 150,
        cellClass: 'justify-content-md-center',
        suppressMenu: true,
        cellRenderer: (param) => {
          const root = $('<div/>');
          // tslint:disable-next-line:max-line-length
          const eidtInforBtn = $('<button type="button" class="btn btn-primary spacer"> <i class="fa fa-info-circle"></i> 詳細</button>&nbsp;&nbsp;<button type="button" class="btn btn-primary"> <i class="fa fa-info-circle"></i> 状況</button>');
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
    } else {
      if (!this.opencontraction) {
        this.conditionPanelOpenOrClose();
      }
    }
  }

  changeInfoArea() {
    this.infoAreaOpend = !this.infoAreaOpend;
    this.searchFormOpend = !this.searchFormOpend;
  }

  changeTabContent() {
    this.tabContentArea = !this.tabContentArea;
    this.gridOptions.columnApi.setColumnVisible('checkbox', this.tabContentArea);
  }

  changeStatus(e) {
    if (e.target.nodeName === 'A') {
      this.status = e.target.getAttribute('value');
    }
  }

  done(event: AppModalResult) {
    console.log(event);
  }
}
