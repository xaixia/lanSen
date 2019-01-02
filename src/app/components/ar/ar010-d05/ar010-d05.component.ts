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
  selector: 'app-ar010-d05',
  templateUrl: './ar010-d05.component.html',
  styleUrls: ['./ar010-d05.component.scss'],
  animations: [ AppAnimations.openClose ],
})
export class Ar010D05Component implements OnInit {

  public form: FormGroup;
  // 受注目的
  public Hakkojokyo = [];
  public Sakujokubun = [];
  public Kaikeirenkeijokyo = [];
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
    this.Hakkojokyo = [{ Kbn: '01001', KbnVal: '未発行', ValidFlg: 1 }, { Kbn: '01002', KbnVal: '発行済', ValidFlg: 0 }];
    this.Sakujokubun = [{ Kbn: '01001', KbnVal: '削除済も含む', ValidFlg: 0 }];
    this.Kaikeirenkeijokyo = [{ Kbn: '01001', KbnVal: '未連携', ValidFlg: 1 }, { Kbn: '01002', KbnVal: '連携済', ValidFlg: 1 }];
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
        {Seikyushobango: '000000001', Depo: 'デポ００１', Seikyusofusaki: '送付先００１', Seikyukingaku: '9,999', Tokukijiko: '１２３４５６７８９０', Seikyushohakkokeitai: '電子請求', Seikyushohakkojokyo: '済', Kaikeirenkeijokyo: '済', Shikirishoshutsuryokukubun: '要', Shikirishohakkojokyo: '済', Nohinshoshutsuryokukubun: '不要', Nohinshohakkojokyo: '対象外', Seikyushoshutsuryokubi: 'YYYY/MM/DD'},
        // tslint:disable-next-line:max-line-length
        {Seikyushobango: '000000002', Depo: 'デポ００１', Seikyusofusaki: '送付先００１', Seikyukingaku: '9,999', Tokukijiko: '１２３４５６７８９０', Seikyushohakkokeitai: '電子請求', Seikyushohakkojokyo: '済', Kaikeirenkeijokyo: '済', Shikirishoshutsuryokukubun: '要', Shikirishohakkojokyo: '未', Nohinshoshutsuryokukubun: '不要', Nohinshohakkojokyo: '対象外', Seikyushoshutsuryokubi: 'YYYY/MM/DD'},
        // tslint:disable-next-line:max-line-length
        {Seikyushobango: '000000003', Depo: 'デポ００１', Seikyusofusaki: '送付先００１', Seikyukingaku: '9,999', Tokukijiko: '１２３４５６７８９０', Seikyushohakkokeitai: '電子請求', Seikyushohakkojokyo: '済', Kaikeirenkeijokyo: '済', Shikirishoshutsuryokukubun: '要', Shikirishohakkojokyo: '一部済', Nohinshoshutsuryokukubun: '不要', Nohinshohakkojokyo: '対象外', Seikyushoshutsuryokubi: '-'},
        // tslint:disable-next-line:max-line-length
        {Seikyushobango: '000000004', Depo: 'デポ００１', Seikyusofusaki: '送付先００２', Seikyukingaku: '9,999', Tokukijiko: '１２３４５６７８９０', Seikyushohakkokeitai: '電子請求', Seikyushohakkojokyo: '-', Kaikeirenkeijokyo: '済', Shikirishoshutsuryokukubun: '不要', Shikirishohakkojokyo: '一部済', Nohinshoshutsuryokukubun: '不要', Nohinshohakkojokyo: '対象外', Seikyushoshutsuryokubi: 'YYYY/MM/DD'},
        // tslint:disable-next-line:max-line-length
        {Seikyushobango: '000000005', Depo: 'デポ００１', Seikyusofusaki: '送付先００２', Seikyukingaku: '9,999', Tokukijiko: '１２３４５６７８９０', Seikyushohakkokeitai: '通常', Seikyushohakkojokyo: '-', Kaikeirenkeijokyo: '未', Shikirishoshutsuryokukubun: '不要', Shikirishohakkojokyo: '一部済', Nohinshoshutsuryokukubun: '要', Nohinshohakkojokyo: '済', Seikyushoshutsuryokubi: '-'},
        // tslint:disable-next-line:max-line-length
        {Seikyushobango: '000000006', Depo: 'デポ００１', Seikyusofusaki: '送付先００３', Seikyukingaku: '9,999', Tokukijiko: '１２３４５６７８９０', Seikyushohakkokeitai: '通常', Seikyushohakkojokyo: '未', Kaikeirenkeijokyo: '未', Shikirishoshutsuryokukubun: '不要', Shikirishohakkojokyo: '対象外', Nohinshoshutsuryokukubun: '要', Nohinshohakkojokyo: '済', Seikyushoshutsuryokubi: '-'},
        // tslint:disable-next-line:max-line-length
        {Seikyushobango: '000000007', Depo: 'デポ００１', Seikyusofusaki: '送付先００３', Seikyukingaku: '9,999', Tokukijiko: '１２３４５６７８９０', Seikyushohakkokeitai: '通常', Seikyushohakkojokyo: '未', Kaikeirenkeijokyo: '未', Shikirishoshutsuryokukubun: '不要', Shikirishohakkojokyo: '対象外', Nohinshoshutsuryokukubun: '要', Nohinshohakkojokyo: '済', Seikyushoshutsuryokubi: 'YYYY/MM/DD'},
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
        headerName: '請求書番号',
        suppressMenu: true,
        width: 140,
        field: 'Seikyushobango',
        // pinned: 'left',
        editable: false,
        cellRenderer: (params) => {
          return `<a href='./'>${params.value}</a>`;
        },
      },
      {
        headerName: 'デポ',
        suppressMenu: true,
        width: 140,
        field: 'Depo',
      },
      {
        headerName: '請求送付先',
        suppressMenu: true,
        width: 140,
        field: 'Seikyusofusaki',
      },
      {
        headerName: '請求金額',
        suppressMenu: true,
        width: 140,
        field: 'Seikyukingaku',
      },
      {
        headerName: '特記事項',
        suppressMenu: true,
        field: 'Tokukijiko',
        width: 200,
        headerClass: 'text-center',
      },
      {
        headerName: '請求書発行形態',
        suppressMenu: true,
        field: 'Seikyushohakkokeitai',
        width: 100,
        headerClass: 'text-center',
      },
      {
        headerName: '請求書発行状況',
        suppressMenu: true,
        field: 'Seikyushohakkojokyo',
        width: 100,
        headerClass: 'text-center',
      },
      {
        headerName: '会計連携状況',
        suppressMenu: true,
        field: 'Kaikeirenkeijokyo',
        width: 100,
        headerClass: 'text-center',
      },
      {
        headerName: '仕切書出力区分',
        suppressMenu: true,
        field: 'Shikirishoshutsuryokukubun',
        width: 100,
        headerClass: 'text-center',
      },
      {
        headerName: '仕切書発行状況',
        suppressMenu: true,
        field: 'Shikirishohakkojokyo',
        width: 100,
        headerClass: 'text-center',
      },
      {
        headerName: '納品書出力区分',
        suppressMenu: true,
        field: 'Nohinshoshutsuryokukubun',
        width: 100,
        headerClass: 'text-center',
      },
      {
        headerName: '納品書発行状況',
        suppressMenu: true,
        field: 'Nohinshohakkojokyo',
        width: 100,
        headerClass: 'text-center',
      },
      {
        headerName: '請求書出力日',
        suppressMenu: true,
        field: 'Seikyushoshutsuryokubi',
        width: 140,
        headerClass: 'text-center',
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
