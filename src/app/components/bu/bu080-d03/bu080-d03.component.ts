import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../common/base.service';
import { AppAnimations } from '../../../common/app-animations';
declare let $: any;

@Component({
  selector: 'app-bu080-d03',
  templateUrl: './bu080-d03.component.html',
  styleUrls: ['./bu080-d03.component.scss'],
  animations: [AppAnimations.openClose],
})
export class Bu080D03Component implements OnInit {

  public form: FormGroup;
  // グリッド列Api
  private gridColumnApi;
  // フォームを設定する
  public gridOptions: GridOptions;
  // グリッドApi
  public gridApi: GridApi;
  public opencontraction = true;
  public SearcBtnContent = '検索条件+';
  // ロケールテキスト
  public localeText;
  //入金口座リスト
  public items1 = ['', 'AAAAA', '  BBBB', 'CCCCC', 'DDDD'];
  //請求発行形態リスト
  public items2 = ['', '通常', '電子請求', '専用伝票'];
  //
  public myvalue1 = "xxxxx物品コード";
  //
  public myvalue2 = "xxxxx物品コード";
  //
  public myvalue3 = "xxxxx物品コード";
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
    this.gridApi.setRowData([]);
  }

  createGridData(): any[] {
    const result = [];
    for (let i = 0; i < 30; i++) {
      result.push(
        // tslint:disable-next-line:max-line-length
        { OrderPurpose: 'KKKK', OrderNumber: 'テスト物品K', Nohinsaki: 'XXカテゴリー', DepoNm: '' },
        // tslint:disable-next-line:max-line-length
        { OrderPurpose: 'WWWWWW', OrderNumber: 'テスト物品W', Nohinsaki: 'XXカテゴリー', DepoNm: '' },
        // tslint:disable-next-line:max-line-length
        { OrderPurpose: 'ooooo', OrderNumber: 'テスト物品o', Nohinsaki: 'XXカテゴリー', DepoNm: '' },
        // tslint:disable-next-line:max-line-length
        { OrderPurpose: 'QQQQQ', OrderNumber: 'テスト物品Q', Nohinsaki: 'XXカテゴリー', DepoNm: '' },
        // tslint:disable-next-line:max-line-length
        { OrderPurpose: 'PPPPP', OrderNumber: 'テスト物品P', Nohinsaki: 'XXカテゴリー', DepoNm: '' },
      );
    }
    return result;
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '物品コード',
        width: 120,
        field: 'OrderPurpose',
        pinned: 'left',
        cellRenderer: (params) => {
          return `<a href='./'>${params.value}</a>`;
        },
      },
      {
        headerName: '名称',
        width: 150,
        field: 'OrderNumber',
      },
      {
        headerName: '物品カテゴリー',
        width: 150,
        field: 'Nohinsaki',
      },
      {
        headerName: '……',
        width: 350,
        field: 'DepoNm',
      },
    ];
  }
  searchData() {

    this.gridApi.setRowData(this.createGridData());

  }

}
