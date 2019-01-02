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
  selector: 'app-ar010-d03',
  templateUrl: './ar010-d03.component.html',
  styleUrls: ['./ar010-d03.component.scss'],
  animations: [ AppAnimations.openClose ],
})
export class Ar010D03Component implements OnInit {

  public form: FormGroup;
  // 受注目的
  public Tejishixiang = [];
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
      OrderYmdFrom: [null, []],
      OrderYmdTo: [null, []],
      OrderNumber: ['', []],
    });
  }

  setKbnList() {
    this.Tejishixiang = [{ Kbn: '01001', KbnVal: '有', ValidFlg: 0 }, { Kbn: '01002', KbnVal: '無', ValidFlg: 0 }];
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
    for (let i = 0; i < 30; i++) {
      result.push(
        // tslint:disable-next-line:max-line-length
        {Seikyusofusaki: '送付先００１', Seikyukingaku: '9,999', Groupbango: '0001', Seikyushimebi: 'YYYY/MM/DD', Seikyushohakkobi: 'YYYY/MM/DD', Tokukijiko: '１２３４５６７８９０'},
        // tslint:disable-next-line:max-line-length
        {Seikyusofusaki: '送付先００２', Seikyukingaku: '9,999', Groupbango: '0001', Seikyushimebi: 'YYYY/MM/DD', Seikyushohakkobi: 'YYYY/MM/DD', Tokukijiko: '１２３４５６７８９０'},
        // tslint:disable-next-line:max-line-length
        {Seikyusofusaki: '送付先００３', Seikyukingaku: '9,999', Groupbango: '0001', Seikyushimebi: 'YYYY/MM/DD', Seikyushohakkobi: 'YYYY/MM/DD', Tokukijiko: '１２３４５６７８９０'},
        // tslint:disable-next-line:max-line-length
        {Seikyusofusaki: '送付先００４', Seikyukingaku: '9,999', Groupbango: '0001', Seikyushimebi: 'YYYY/MM/DD', Seikyushohakkobi: 'YYYY/MM/DD', Tokukijiko: '１２３４５６７８９０'},
        // tslint:disable-next-line:max-line-length
        {Seikyusofusaki: '送付先００５', Seikyukingaku: '9,999', Groupbango: '0001', Seikyushimebi: 'YYYY/MM/DD', Seikyushohakkobi: 'YYYY/MM/DD', Tokukijiko: '１２３４５６７８９０'},
        // tslint:disable-next-line:max-line-length
        {Seikyusofusaki: '送付先００６', Seikyukingaku: '9,999', Groupbango: '0001', Seikyushimebi: 'YYYY/MM/DD', Seikyushohakkobi: 'YYYY/MM/DD', Tokukijiko: '１２３４５６７８９０'},
        // tslint:disable-next-line:max-line-length
        {Seikyusofusaki: '送付先００７', Seikyukingaku: '9,999', Groupbango: '0001', Seikyushimebi: 'YYYY/MM/DD', Seikyushohakkobi: 'YYYY/MM/DD', Tokukijiko: '１２３４５６７８９０'},
        );
    }
    return result;
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '',
        checkboxSelection: true,
                suppressMenu: true,
        suppressMovable: true,
        suppressSorting: true,
        headerCheckboxSelection: true,
        width: 42,
        // pinned: 'left',f
        editable: false,
        suppressToolPanel: true,
      },
      {
        headerName: '請求送付先',
        suppressMenu: true,
        width: 120,
        field: 'Seikyusofusaki',
        cellRenderer: (params) => {
        return `<a href='./'>${params.value}</a>`;
        },
        // pinned: 'left',
        editable: false
      },
      {
        headerName: 'グループ番号',
        suppressMenu: true,
        width: 100,
        field: 'Groupbango',
      },
      {
        headerName: '請求金額',
        suppressMenu: true,
        width: 100,
        field: 'Seikyukingaku',
        cellClass: 'justify-content-md-end',
      },
      {
        headerName: '請求締日',
        suppressMenu: true,
        width: 120,
        field: 'Seikyushimebi',
      },
      {
        headerName: '請求書発行日',
        suppressMenu: true,
        field: 'Seikyushohakkobi',
        width: 120,
        headerClass: 'text-center'
      },
      {
        headerName: '特記事項',
        suppressMenu: true,
        width: 180,
        field: 'Tokukijiko',
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
