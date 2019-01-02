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
  selector: 'app-rf010-d01',
  templateUrl: './rf010-d01.component.html',
  styleUrls: ['./rf010-d01.component.scss'],
  animations: [AppAnimations.openClose],
})
export class Rf010D01Component implements OnInit {

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
    this.gridApi.setRowData([]);
  }

  createGridData(): any[] {
    const result = [];
    let index = 100001;
    for (let i = 0; i < 30; i++) {
      result.push(
        // tslint:disable-next-line:max-line-length
        { OrderNumber: '2017/09/30', OrderPurpose: 1111, ECJuchu: '○○商事', JuchuYMD: '20,000', Nohinsaki: '東京支店' },
        // tslint:disable-next-line:max-line-length
        { OrderNumber: '2017/09/30', OrderPurpose: 1111, ECJuchu: '××商事', JuchuYMD: '20,000', Nohinsaki: '東京支店' },
        // tslint:disable-next-line:max-line-length
        { OrderNumber: '2017/09/30', OrderPurpose: 2222, ECJuchu: '△△商社', JuchuYMD: '30,000', Nohinsaki: '東京支店' },
        // tslint:disable-next-line:max-line-length
        { OrderNumber: '2017/09/30', OrderPurpose: 3333, ECJuchu: '○○商社', JuchuYMD: '20,000', Nohinsaki: '大阪支店' },
        // tslint:disable-next-line:max-line-length
        { OrderNumber: '2017/09/30', OrderPurpose: 4444, ECJuchu: '○○産業', JuchuYMD: '10,000', Nohinsaki: '名古屋支店' },
        // tslint:disable-next-line:max-line-length
      );
    }
    return result;
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '支払日',
        width: 100,
        field: 'OrderNumber',
        suppressMenu: true,
        pinned: 'left',
        editable: false
      },
      {
        headerName: '紹介元コード',
        suppressMenu: true,
        width: 100,
        field: 'OrderPurpose',
      },
      {
        headerName: '紹介元',
        suppressMenu: true,
        width: 130,
        field: 'ECJuchu',
      },
      {
        headerName: '紹介料',
        suppressMenu: true,
        width: 130,
        field: 'JuchuYMD',
      },
      {
        headerName: '管轄支店名',
        suppressMenu: true,
        width: 130,
        field: 'Nohinsaki',
      },

      {
        headerName: '',
        width: 120,
        suppressFilter: false,
        suppressMenu: true,
        suppressMovable: true,
        suppressSorting: false,
        cellClass: 'justify-content-md-center',
        editable: false,
        cellRenderer: (param) => {
          const root = $('<div/>');
          // tslint:disable-next-line:max-line-length
          const eidtInforBtn = $('<div ><button class=\'btn btn-primary\' type=\'button\'><i class=\'fa fa-info-circle\'></i> 明細一覧</button></div>');
          eidtInforBtn.click(() => {
          });
          root.append(eidtInforBtn);
          return root[0];
        },
        suppressToolPanel: true,
      },
      {
        headerName: '',
        width: 120,
        suppressFilter: false,
        suppressMenu: true,
        suppressMovable: true,
        suppressSorting: false,
        cellClass: 'justify-content-md-center',
        editable: false,
        cellRenderer: (param) => {
          const root = $('<div/>');
          // tslint:disable-next-line:max-line-length
          const eidtInforBtn = $('<div><button class=\'btn btn-success\' type=\'button\'> <img src=\'./assets/images/icon/download.png\' /> 支払通知書</button></div>');
          eidtInforBtn.click(() => {
          });
          root.append(eidtInforBtn);
          return root[0];
        },
        suppressToolPanel: true,
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
