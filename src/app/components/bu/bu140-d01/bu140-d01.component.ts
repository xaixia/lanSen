import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, ActivatedRouteSnapshot, Router } from '@angular/router';
import { map } from 'rxjs/operator/map';
import { BaseService } from '../../../common/base.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColGroupDef, ColDef } from 'ag-grid-community';
import { AppValidators } from '../../../common/app-validators';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { AppAnimations } from '../../../common/app-animations';

declare let $: any;

@Component({
  selector: 'app-bu140-d01',
  templateUrl: './bu140-d01.component.html',
  styleUrls: ['./bu140-d01.component.scss']
})
export class Bu140D01Component implements OnInit {

  public form: FormGroup;

  @ViewChild('conditonPanel')
  public conditonPanel: ElementRef;
  public opencontraction = true;
  public SearcBtnContent = '検索条件+';
   // フォームを設定する
  public gridOptions: GridOptions;
  // グリッド列Api
  private gridColumnApi;
  // グリッドApi
  public gridApi: GridApi;
  // ロケールテキスト

  public ComponentCode: string;
  public CasPartment: string;
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

  ngOnInit() {
    // $(this.conditonPanel.nativeElement).hide();
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

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData([]);
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '倉庫コード',
        width: 100,
        field: 'ComponentCode',
        suppressMenu: true,
        cellRenderer: (params) => {
          return `<a href='./'>${params.value}</a>`;
        },
      },
      {
        headerName: '倉庫名',
        width: 200,
        field: 'ComponentName',
        suppressMenu: true,
      },
      {
        headerName: '物品コード',
        width: 100,
        field: 'GoodsCode',
        suppressMenu: true,
      },
      {
        headerName: '物品名',
        width: 200,
        field: 'GoodsName',
        suppressMenu: true,
      },
      {
        headerName: '適正在庫数量(上限)',
        width: 100,
        field: 'LeftoverNumUp',
        suppressMenu: true,
      },
      {
        headerName: '適正在庫数量(下限)',
        width: 100,
        field: 'LeftoverNumDown',
        suppressMenu: true,
      },
      {
        headerName: '発注数量',
        width: 100,
        field: 'OrderNum',
        suppressMenu: true,
      },
    ];
  }

  getRouterData() {
    let data = null;
    this.route.data.forEach((val) => {
      data = val;
    });
    return data;
  }

  /**
   * createForm
   */
  createForm(): void {
    this.form = this.fb.group({
      // 受注年月日From
      ComponentCode: [null],
      // 受注年月日To
      ComponentName: [null],
      // 受注No.
      CasCode: [null],
    });
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

  createGridData(): any[] {
    const result = [];
    let index = 12929;
    for (let i = 0; i < 30; i++) {
      result.push(
        {
          ComponentCode: index++,
          ComponentName: '札幌倉庫',
          GoodsCode: index++,
          GoodsName: 'テスト物品１',
          LeftoverNumUp: 500,
          LeftoverNumDown: 100,
          OrderNum: 50
        },
        {
          ComponentCode: index++,
          ComponentName: '札幌倉庫',
          GoodsCode: index++,
          GoodsName: 'テスト物品2',
          LeftoverNumUp: 100,
          LeftoverNumDown: 30,
          OrderNum: 26
        },
        {
          ComponentCode: index++,
          ComponentName: '札幌倉庫',
          GoodsCode: index++,
          GoodsName: 'テスト物品3',
          LeftoverNumUp: 100,
          LeftoverNumDown: 30,
          OrderNum: 30
        },
        {
          ComponentCode: index++,
          ComponentName: '札幌倉庫',
          GoodsCode: index++,
          GoodsName: 'テスト物品4',
          LeftoverNumUp: 560,
          LeftoverNumDown: 65,
          OrderNum: 30
        },
        {
          ComponentCode: index++,
          ComponentName: '札幌倉庫',
          GoodsCode: index++,
          GoodsName: 'テスト物品5',
          LeftoverNumUp: 560,
          LeftoverNumDown: 65,
          OrderNum: 30
        },
      );
    }
    return result;
  }

  searchData() {
    if (!this.baseService.hasError(this.el, this.form)) {
      if (this.gridApi) {
        this.gridApi.setRowData(this.createGridData());
      }
    }
  }
}
