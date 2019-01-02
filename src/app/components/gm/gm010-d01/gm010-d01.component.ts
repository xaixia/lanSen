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
  selector: 'app-gm010-d01',
  templateUrl: './gm010-d01.component.html',
  styleUrls: ['./gm010-d01.component.scss'],
  animations: [ AppAnimations.openClose ],
})

export class Gm010D01Component implements OnInit {
  public form: FormGroup;
  // 受注目的
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
    });
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
        {InputSectionKbn: '物販', SlipNumber: index++, CreditTypeKbn: '-', BranchNumber: '001', ContractTypeKbn: 'SPOT（物品販売）', ApprovalStatusKbn: '-', Depot: 'デポ００１', TechnicalUser: '担当者００００１', RecordingDate: '2018/11/25', plannedDate: '2018/11/25', ConstructionSite: '納品先００１', RequestSite: '請求先００１', DetailedAmount: '9999'},
        // tslint:disable-next-line:max-line-length
        {InputSectionKbn: 'サービス', SlipNumber: index++, CreditTypeKbn: '-', BranchNumber: '002', ContractTypeKbn: '年契（THC）', ApprovalStatusKbn: '-', Depot: 'デポ００１', TechnicalUser: '担当者００００１', RecordingDate: '2018/11/25', plannedDate: '2018/11/25', ConstructionSite: '納品先００１', RequestSite: '請求先００１', DetailedAmount: '9999'},
        // tslint:disable-next-line:max-line-length
        {InputSectionKbn: '汎用売上', SlipNumber: index++, CreditTypeKbn: '売上', BranchNumber: '003', ContractTypeKbn: '-', ApprovalStatusKbn: '-', Depot: 'デポ００１', TechnicalUser: '担当者００００１', RecordingDate: '2018/12/31', plannedDate: '2018/11/25', ConstructionSite: '納品先００１', RequestSite: '請求先００１', DetailedAmount: '9999'},
        // tslint:disable-next-line:max-line-length
        {InputSectionKbn: '物販', SlipNumber: index++, CreditTypeKbn: '-', BranchNumber: '004', ContractTypeKbn: 'SPOT（物品販売）', ApprovalStatusKbn: '-', Depot: 'デポ００１', TechnicalUser: '担当者００００１', RecordingDate: '2018/11/25', plannedDate: '2018/11/25', ConstructionSite: '納品先００１', RequestSite: '請求先００１', DetailedAmount: '9999'},
        // tslint:disable-next-line:max-line-length
        {InputSectionKbn: 'サービス', SlipNumber: index++, CreditTypeKbn: '-', BranchNumber: '005', ContractTypeKbn: '年契（PC）', ApprovalStatusKbn: '-', Depot: 'デポ００１', TechnicalUser: '担当者００００１', RecordingDate: '2018/11/25', plannedDate: '2018/11/25', ConstructionSite: '納品先００１', RequestSite: '請求先００１', DetailedAmount: '9999'},
        // tslint:disable-next-line:max-line-length
        {InputSectionKbn: '汎用売上', SlipNumber: index++, CreditTypeKbn: '未収入金', BranchNumber: '006', ContractTypeKbn: '-', ApprovalStatusKbn: '-', Depot: 'デポ００１', TechnicalUser: '担当者００００１', RecordingDate: '2018/11/29', plannedDate: '2018/11/25', ConstructionSite: '納品先００１', RequestSite: '請求先００１', DetailedAmount: '9999'},
        // tslint:disable-next-line:max-line-length
        {InputSectionKbn: '汎用売上', SlipNumber: index++, CreditTypeKbn: 'セミナー売上', BranchNumber: '007', ContractTypeKbn: '-', ApprovalStatusKbn: '申請中', Depot: 'デポ００１', TechnicalUser: '担当者００００１', RecordingDate: '2018/11/25', plannedDate: '2018/11/25', ConstructionSite: '納品先００１', RequestSite: '請求先００１', DetailedAmount: '9999'},
        );
    }
    return result;
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '伝票番号',
        width: 150,
        field: 'SlipNumber',
        suppressMenu: true,
        pinned: 'left',
        cellRenderer: (params) => {
          return `<a href='./'>${params.value}</a>`;
        },
        editable: false
      },
      {
        headerName: '枝番',
        width: 80,
        field: 'BranchNumber',
        suppressMenu: true,
      },
      {
        headerName: '入力画面区分',
        width: 150,
        field: 'InputSectionKbn',
        suppressMenu: true,
      },
      {
        headerName: '債権種別',
        width: 100,
        field: 'CreditTypeKbn',
        suppressMenu: true,
      },
      {
        headerName: '契約型区分',
        width: 150,
        field: 'ContractTypeKbn',
        suppressMenu: true,
      },
      {
        headerName: '承認ステータス',
        width: 150,
        field: 'ApprovalStatusKbn',
        suppressMenu: true,
      },
      {
        headerName: '計上日',
        width: 150,
        field: 'RecordingDate',
        suppressMenu: true,
      },
      {
        headerName: '入金予定日',
        width: 150,
        field: 'plannedDate',
        suppressMenu: true,
      },
      {
        headerName: 'デポ',
        width: 150,
        field: 'Depot',
        suppressMenu: true,
      },
      {
        headerName: '技術営業担当者',
        width: 150,
        field: 'TechnicalUser',
        suppressMenu: true,
      },
      {
        headerName: '施工先／納品先',
        width: 150,
        field: 'ConstructionSite',
        suppressMenu: true,
      },
      {
        headerName: '請求先',
        width: 150,
        field: 'RequestSite',
        suppressMenu: true,
      },
      {
        headerName: '明細金額',
        width: 150,
        field: 'DetailedAmount',
        suppressMenu: true,
        cellClass: 'justify-content-md-end',
        cellRenderer: (param) => param.value ? (param.value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : '0'
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

}
