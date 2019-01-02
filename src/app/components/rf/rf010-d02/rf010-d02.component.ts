import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../common/base.service';
import { AppValidators } from '../../../common/app-validators';
import { AppAnimations } from '../../../common/app-animations';

declare let $: any;

@Component({
  selector: 'app-rf010-d02',
  templateUrl: './rf010-d02.component.html',
  styleUrls: ['./rf010-d02.component.scss'],
  animations: [AppAnimations.openClose],
})
export class Rf010D02Component implements OnInit {

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
  @ViewChild('searchArea')
  searchArea: ElementRef;
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
      editable: true
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
      OrderYmdFrom: [null, [AppValidators.required('E0005', '受注年月日From')]],
      // 受注年月日To
      OrderYmdTo: [null, []],
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
      // $(this.conditonPanel.nativeElement).slideUp(500);
      this.opencontraction = false;
      this.SearcBtnContent = '検索条件+';
    } else {
      // $(this.conditonPanel.nativeElement).slideDown(500);
      this.opencontraction = true;
      this.SearcBtnContent = '検索条件-';
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData(this.createGridData());
  }

  createGridData(): any[] {
    const result = [];
    let index = 100001;
    for (let i = 0; i < 30; i++) {
      result.push(
        // tslint:disable-next-line:max-line-length
        { OrderNumber: '1234567-01', OrderPurpose: '総合環境衛生管理', ECJuchu: '年契', JuchuYMD: '○○工場', Nohinsaki: '2017/4/1', Nohinsaki1: '2018/3/31', Nohinsaki2: '500,000', Nohinsaki3: '', Nohinsaki4: '￥10,000' },
        // tslint:disable-next-line:max-line-length
        { OrderNumber: '3456789-01', OrderPurpose: '防虫管理', ECJuchu: '年契', JuchuYMD: '△△工場', Nohinsaki: '2017/4/1', Nohinsaki1: '2018/3/31', Nohinsaki2: '400,000', Nohinsaki3: '0.05%', Nohinsaki4: '￥20,000' },
        // tslint:disable-next-line:max-line-length
        { OrderNumber: '5555555-01', OrderPurpose: '窓ガラス清掃', ECJuchu: 'スポット', JuchuYMD: '○○病院', Nohinsaki: '2017/4/13', Nohinsaki1: '2017/4/15', Nohinsaki2: '30,000', Nohinsaki3: '0.05%', Nohinsaki4: '￥1,500' },
        // tslint:disable-next-line:max-line-length
        { OrderNumber: '12345678', OrderPurpose: '23456789', ECJuchu: '物販', JuchuYMD: '×××株式会社', Nohinsaki: '2017/4/1', Nohinsaki1: '2018/3/31', Nohinsaki2: '500,000', Nohinsaki3: '0.05%', Nohinsaki4: '￥25,000' },

      );
    }
    return result;
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: "契約番号",
        width: 100,
        suppressMenu: true,
        pinned: 'left',
        editable: false,
        children: [
          {
            headerName: "売上番号",
            field: "OrderNumber",
            suppressMenu: true,
            width: 100,
          },
        ]
      },
      {
        headerName: '契約名',
        suppressMenu: true,
        width: 140,
        children: [
          {
            headerName: "受注番号",
            field: "OrderPurpose",
            suppressMenu: true,
            width: 140,
          },
        ]
      },
      {
        headerName: '区分',
        suppressMenu: true,
        width: 130,
        children: [
          {
            headerName: "",
            field: "OrderPurpose",
            suppressMenu: true,
            width: 130,
          },
        ]
      },
      {
        headerName: '施工先',
        suppressMenu: true,
        width: 130,
        children: [
          {
            headerName: "納品先",
            field: 'JuchuYMD',
            suppressMenu: true,
            width: 130,
          },
        ]
      },
      {
        headerName: '契約開始日',
        suppressMenu: true,
        width: 130,
        children: [
          {
            headerName: "受注年月日",
            field: 'Nohinsaki',
            suppressMenu: true,
            cellClass: "justify-content-md-center",
            width: 130,
          },
        ]
      },
      {
        headerName: '契約終了日',
        suppressMenu: true,
        width: 130,
        children: [
          {
            headerName: "納品予定日",
            field: 'Nohinsaki1',
            suppressMenu: true,
            cellClass: "justify-content-md-center",
            width: 130,
          },
        ]
      },
      {
        headerName: '売上金額',
        suppressMenu: true,
        width: 130,
        children: [
          {
            headerName: "",
            field: 'Nohinsaki2',
            cellClass: "justify-content-md-end",
            suppressMenu: true,
            width: 130,
          },
        ]
      },
      {
        headerName: '紹介料率(%)',
        suppressMenu: true,
        width: 130,
        children: [
          {
            headerName: "",
            field: 'Nohinsaki3',
            suppressMenu: true,
            cellClass: "justify-content-md-center",
            width: 130,
          },
        ]
      },
      {
        headerName: '紹介手数料',
        suppressMenu: true,
        width: 130,
        children: [
          {
            headerName: "",
            field: 'Nohinsaki4',
            cellClass: "justify-content-md-center",
            suppressMenu: true,
            width: 130,
          },
        ]
      },
    ];
  }

  searchData() {
    // if (!this.baseService.hasError(this.el, this.form)) {
    //  if (this.gridApi) {
    this.gridApi.setRowData(this.createGridData());
    //  }
    // } else {
    //   if (!this.opencontraction) {
    //    this.conditionPanelOpenOrClose();
    //   }
    // }
  }

}
