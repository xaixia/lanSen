import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../common/base.service';
import { AppAnimations } from '../../../common/app-animations';
declare let $: any;
@Component({
  selector: 'app-cn020-d04',
  templateUrl: './cn020-d04.component.html',
  styleUrls: ['./cn020-d04.component.scss'],
  animations: [ AppAnimations.openClose ],
})
export class Cn020D04Component implements OnInit {
  searchFormOpend = true;
/**
 *
 */
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
  ) { this.paginationApi = new PaginationApi();
      this.paginationApi.loadPaginationInfo(100, 10);
      this.createForm();
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

    this.formData = {
      PointCount1: 30,
      PointCount2: 50
    };
    this.form.patchValue(this.formData);
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
       * 作業コード
       */
      WorkCode: ['', [ ]],
      /**
       * 作業名
       */
      WorkName: ['', [ ]],
      /**
       * 作業テンプレート名
       */
      WorkTemplateNm: ['', [ ]],
      /**
       * ポイント数1
       */
      PointCount1: ['', [ ]],
      /**
       * ポイント数2
       */
      PointCount2: ['', [ ]],

    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData([]);
  }
  /**
   *
   */
  changeSearchForm() {
    this.searchFormOpend = !this.searchFormOpend;
  }
  createGridData(): any[] {
    const result = [];
    const index = 100001;
    for (let i = 0; i < 30; i++) {
      result.push(
        // tslint:disable-next-line:max-line-length
        {WorkTemplateNm: '飛翔昆虫モニタリング（30pt.まで)', PointCount: '30pt.', ESCOstandard1: '120000', ESCOstandard2: '150000', Remarks: ''},
        // tslint:disable-next-line:max-line-length
        {WorkTemplateNm: '飛翔昆虫モニタリング（50pt.まで)', PointCount: '50pt.', ESCOstandard1: '200000', ESCOstandard2: '250000',  Remarks: ''},
        // tslint:disable-next-line:max-line-length
        {WorkTemplateNm: 'そ族捕獲モニタリング（20pt.まで)', PointCount: '30pt.', ESCOstandard1: '80000', ESCOstandard2: '100000',  Remarks: ''},
        // tslint:disable-next-line:max-line-length
        {WorkTemplateNm: 'そ族捕獲モニタリング（50pt.まで)', PointCount: '30pt.', ESCOstandard1: '250000', ESCOstandard2: '300000', Remarks: ''},
        // tslint:disable-next-line:max-line-length
        {WorkTemplateNm: 'そ族捕獲モニタリング（100pt.まで)', PointCount: '30pt.', ESCOstandard1: '400000', ESCOstandard2: '500000', Remarks: ''}
        );
    }
    return result;
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '選択',
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
        headerName: '作業テンプレート名',
        width: 300,
        field: 'WorkTemplateNm',
        cellRenderer: (params) => {
          return `<a href='./'>${params.value}</a>`;
        },
        suppressFilter: true,
        suppressMenu: true,
        suppressSorting: true,
        editable: false,
      },
      {
        headerName: 'ポイント数',
        width: 100,
        field: 'PointCount',
        suppressFilter: true,
        suppressMenu: true,
        suppressSorting: true,
        editable: false,
      },
      {
        headerName: 'ESCO標準原価',
        width: 150,
        field: 'ESCOstandard1',
        cellRenderer: (param) =>  (param.value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'),
        suppressFilter: true,
        suppressMenu: true,
        suppressSorting: true,
        editable: false,
      },
      {
        headerName: 'ESCO標準売価',
        width: 150,
        field: 'ESCOstandard2',
        cellRenderer: (param) =>  (param.value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'),
        suppressFilter: true,
        suppressMenu: true,
        suppressSorting: true,
        editable: false,
      },
      {
        headerName: '',
        width: 80,
        field: '',
        cellRenderer: (params) => {
          return $(`<button type="button" class="btn btn-info"><i class="fa fa-copy"></i>複製</button>`).click(() => {
            this.Copy(params.data);
          })[0];
        },
        suppressFilter: true,
        suppressMenu: true,
        suppressSorting: true,
        editable: false,
      },
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
   * クリア
   */
  clearSelect() {
    this.form.reset();
  }
  /**
   *  新規登録
   */
  insert() {

  }
  /**
   * 複製
   * @param data
   */
  private Copy(data) {

  }
  /**
   * 検索
   */
  searchData() {
    this.gridApi.setRowData(this.createGridData());
  }
}
