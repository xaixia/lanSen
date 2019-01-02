import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../common/base.service';
declare let $: any;
@Component({
  selector: 'app-cn020-d05',
  templateUrl: './cn020-d05.component.html',
  styleUrls: ['./cn020-d05.component.scss']
})
export class Cn020D05Component implements OnInit {
public formData: any;
  /**
 *
 */
public form: FormGroup;
// グリッド列Api
private gridColumnApi;
// フォームを設定する
public gridOptions: GridOptions;
// グリッドApi
public gridApi: GridApi;
// ロケールテキスト
public localeText;

private data: any[];

paginationApi: PaginationApi;
  constructor(
    private route: ActivatedRoute,
    public baseService: BaseService,
    private fb: FormBuilder,
    private el: ElementRef
  ) { this.paginationApi = new PaginationApi();
      this.paginationApi.loadPaginationInfo(100, 10);
      this.createForm();
  }

  ngOnInit() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.rowHeight = 24;
    this.gridOptions.headerHeight = 24;
    this.gridOptions.animateRows = true;

   // this.gridOptions.rowSelection = 'multiple';
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

    this.formData = {
      TemplateNm: '飛翔昆虫モニタリング（30pt.まで）',
      PointCount: '30',
      WorkName: '飛翔昆虫モニタリング',
      WorkBreakdown: '捕虫器(ライトトラップ)を使用し、製造作業所内に侵入した昆虫の調査と捕獲を計画します。'
    };
    this.form.patchValue(this.formData);

    this.gridOptions.autoGroupColumnDef = {
      headerName: '工程',
      editable: false,
      suppressFilter: true,
      suppressMenu: true,
      suppressMovable: true,
      suppressSorting: true,
      cellRenderer: (params) => {
        if (params.node.field === 'kbn') {
          return params.value === '1' ? 'トラップ設置・回収' : '報告書提出';
        } else if (params.node.field === 'subKbn') {
          // tslint:disable-next-line:max-line-length
          return $(`<div class='ml-25'><button class="btn btn-info" type="button"><i class="fa fa-plus"></i></button> ${params.value === '1' ? '人件費' : '資材'}</div>`).click(() => {
            const row = this.gridApi.getDisplayedRowAtIndex(params.node.rowIndex + 1);
            const obj = <any> {};
            obj[params.node.field] = row.data[params.node.field];
            obj[params.node.parent.field] = row.data[params.node.parent.field];
            this.gridApi.updateRowData({ add: [ obj ], addIndex: params.node.rowIndex + 1 });
            // this.gridApi.group
          })[0];
        }
        return '';
      },
    };
    this.gridOptions.groupDefaultExpanded = -1;
    this.gridOptions.suppressAggFuncInHeader = true;
    this.gridOptions.rememberGroupStateWhenNewData = true;
  }
    /**
   * createForm
   */
  createForm(): void {
    this.form = this.fb.group({
      /**
       * カテゴリー
       */
      Category: ['', [ ]],
       /**
       * テンプレート名
       */
      TemplateNm: ['', [ ]],
      /**
       * 作業名
       */
      WorkName: ['', [ ]],
      /**
       * ポイント数
       */
      PointCount: ['', [ ]],
      /**
       * 作業内訳
       */
      WorkBreakdown: ['', [ ]]

    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData(this.data = this.createGridData());
  }
  createGridData(): any[] {
    return [
      // tslint:disable-next-line:max-line-length
      { kbn: '1', subKbn: '1', tanto: '代行店', workTime: 1.5, unit: '時間', ninsu: 1.0, escoGenkaTaka: 2500, escoHyoujunTanka: 3000 },
      // tslint:disable-next-line:max-line-length
      { kbn: '1', subKbn: '1', tanto: '自社(支店)', workTime: 1.0, unit: '時間', ninsu: 1.0, escoGenkaTaka: 3000, escoHyoujunTanka: 5000 },
      // tslint:disable-next-line:max-line-length
      { kbn: '1', subKbn: '2', genkaMeisai: '６４１シート', tanto: '代行店', workTime: 20, unit: '個', escoGenkaTaka: 385, escoHyoujunTanka: 550 },
      // tslint:disable-next-line:max-line-length
      { kbn: '1', subKbn: '2', genkaMeisai: 'ピオニー', tanto: '代行店', workTime: 0.5, unit: '個',  escoGenkaTaka: 117, escoHyoujunTanka: 200 },
      // tslint:disable-next-line:max-line-length
      { kbn: '1', subKbn: '2', genkaMeisai: 'ホイコ（二色刷り）', tanto: '代行店', workTime: 0, unit: '個',  escoGenkaTaka: 45, escoHyoujunTanka: 55 },
      // tslint:disable-next-line:max-line-length
      { kbn: '1', subKbn: '2', genkaMeisai: 'Pホイコ', tanto: '代行店', workTime: 0, unit: '個',  escoGenkaTaka: 70, escoHyoujunTanka: 90 },
      // tslint:disable-next-line:max-line-length
      { kbn: '1', subKbn: '2', genkaMeisai: 'Nホイコ', tanto: '代行店', workTime: 0, unit: '個',  escoGenkaTaka: 75, escoHyoujunTanka: 95 },
      // tslint:disable-next-line:max-line-length
      { kbn: '1', subKbn: '2', genkaMeisai: 'ムシポン', tanto: '代行店', workTime: 10, unit: '個',  escoGenkaTaka: 240, escoHyoujunTanka: 400 },
      // tslint:disable-next-line:max-line-length
      { kbn: '2', subKbn: '1', tanto: '自社(支店)', workTime: 1.5, unit: '時間', ninsu: 1.0, escoGenkaTaka: 3000, escoHyoujunTanka: 5000 },
    ];
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '削除',
        checkboxSelection: true,
        suppressFilter: true,
        suppressMenu: true,
        suppressMovable: true,
        suppressSorting: true,
        headerCheckboxSelection: true,
        width: 68,
        pinned: 'left',
        editable: false,
        suppressToolPanel: true,
      },
      {
        headerName: 'kbn',
        field: 'kbn',
        hide: true,
        suppressFilter: true,
        suppressMenu: true,
        suppressSorting: true,
        editable: false,
        suppressToolPanel: true,
        rowGroup: true,
      },
      {
        headerName: 'subKbn',
        hide: true,
        field: 'subKbn',
        suppressFilter: true,
        suppressMenu: true,
        suppressSorting: true,
        editable: false,
        suppressToolPanel: true,
        rowGroup: true,
      },
      {
        headerName: '原価明細',
        width: 200,
        field: 'genkaMeisai',
        suppressFilter: true,
        suppressMenu: true,
        suppressSorting: true,
        editable: (params) => params && params.data && params.data.subKbn === '2',
      },
      {
        headerName: '担当',
        width: 100,
        field: 'tanto',
        suppressFilter: true,
        suppressMenu: true,
        suppressSorting: true,
        editable: true,
      },
      {
        headerName: '作業時間',
        width: 100,
        field: 'workTime',
        suppressFilter: true,
        suppressMenu: true,
        suppressSorting: true,
        editable: true,
        cellRenderer: (params) => {
          if (params.data) {
            return `${params.value} ${params.data.unit}`;
          }
        }
      },
      {
        headerName: '人数',
        width: 100,
        field: 'ninsu',
        suppressFilter: true,
        suppressMenu: true,
        suppressSorting: true,
        editable: (params) => params && params.data && params.data.subKbn === '1',
        cellRenderer: (params) => {
          if (params.data && params.value) {
            return `${params.value} 人`;
          }
        }
      },
      {
        headerName: 'ESCO原価単価',
        width: 100,
        field: 'escoGenkaTaka',
        suppressFilter: true,
        suppressMenu: true,
        suppressSorting: true,
        editable: false,
        aggFunc: 'sum',
        cellRenderer: (params) => this.formatNumber(params.value)
      },
      {
        headerName: 'ESCO原価合計',
        width: 100,
        suppressFilter: true,
        suppressMenu: true,
        suppressSorting: true,
        editable: false,
        aggFunc: 'sum',
        valueGetter: (params) => {
          if (params.data && params.data.subKbn) {
            if (params.data.subKbn === '1') {
              return (params.data.escoGenkaTaka || 0) * (params.data.workTime) * (params.data.ninsu);
            } else {
              return (params.data.escoGenkaTaka || 0) * (params.data.workTime);
            }
          }
          return 0;
        },
        cellRenderer: (params) => this.formatNumber(params.value)
      },
      {
        headerName: 'ESCO標準単価',
        width: 100,
        field: 'escoHyoujunTanka',
        suppressFilter: true,
        suppressMenu: true,
        suppressSorting: true,
        editable: false,
        aggFunc: 'sum',
        cellRenderer: (params) => this.formatNumber(params.value)
      },
      {
        headerName: 'ESCO標準合計',
        width: 150,
        suppressFilter: true,
        suppressMenu: true,
        suppressSorting: true,
        editable: false,
        aggFunc: 'sum',
        valueGetter: (params) => {
          if (params.data && params.data.subKbn) {
            if (params.data.subKbn === '1') {
              return (params.data.escoHyoujunTanka || 0) * (params.data.workTime) * (params.data.ninsu);
            } else {
              return (params.data.escoHyoujunTanka || 0) * (params.data.workTime);
            }
          }
          return 0;
        },
        cellRenderer: (params) => this.formatNumber(params.value)
      }
    ];
  }
  /**
   * 削除
   */
  delete() {
    const rows = this.gridApi.getSelectedRows();
    if (!rows || rows.length === 0) { return; }
    this.gridApi.updateRowData({
      remove: rows
    });
  }
  /**
   * キャンセル
   */
  backBtn () {

  }
  /**
   * クリア
   */
  clearSelect() {
    this.form.reset();
  }
  /**
   *  登録
   */
  insertBtn() {
  }
  private Copy(data) {

  }
  addRows(data) {
     this.gridApi.updateRowData({
      add: [{}]
     });
  }

  private formatNumber(number) {
    return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
}
