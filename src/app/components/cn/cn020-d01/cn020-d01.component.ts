import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../common/base.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { AppValidators } from '../../../common/app-validators';
import { AppAnimations } from '../../../common/app-animations';

@Component({
  selector: 'app-cn020-d01',
  templateUrl: './cn020-d01.component.html',
  styleUrls: ['./cn020-d01.component.scss'],
  animations: [ AppAnimations.openClose ],
})
export class Cn020D01Component implements OnInit {
public formData: any;
public form: FormGroup;
searchFormOpend = true;
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
      WorkMajorClassificationId: 1,
      WorkClassificationId: 1
    };
    this.form.patchValue(this.formData);
  }
    /**
   * createForm
   */
  createForm(): void {
    this.form = this.fb.group({

      WorkMajorClassificationId: [null, [ ]],

      WorkClassificationId: [null, [ ]],
    });
  }
  changeSearchForm() {
    this.searchFormOpend = !this.searchFormOpend;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData([]);
  }
  createGridData(): any[] {
    const result = [];
    const index = 100001;
    for (let i = 0; i < 30; i++) {
      result.push(
        // tslint:disable-next-line:max-line-length
        {WorkMajorClassification: '調査', WorkClassification: '目視調査・確認', WorkCode: '1111', WorkName: '目視点検', Remarks: ''},
        // tslint:disable-next-line:max-line-length
        {WorkMajorClassification: '調査', WorkClassification: '目視調査・確認', WorkCode: '2222', WorkName: '飛翔昆虫モニタリング',  Remarks: ''},
        // tslint:disable-next-line:max-line-length
        {WorkMajorClassification: '調査', WorkClassification: '目視調査・確認', WorkCode: '3333', WorkName: '歩行昆虫モニタリング',  Remarks: ''},
        // tslint:disable-next-line:max-line-length
        {WorkMajorClassification: '調査', WorkClassification: '目視調査・確認', WorkCode: '4444', WorkName: 'トラップによる昆虫の殺虫、捕獲', Remarks: ''},
        // tslint:disable-next-line:max-line-length
        {WorkMajorClassification: '調査', WorkClassification: '目視調査・確認', WorkCode: '5555', WorkName: 'トラップによるそ族の捕獲・殺そ', Remarks: ''},
        // tslint:disable-next-line:max-line-length
        {WorkMajorClassification: '調査', WorkClassification: '目視調査・確認', WorkCode: '6666', WorkName: '異物検定', Remarks: ''},
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
        headerName: '作業大分類',
        width: 150,
        field: 'WorkMajorClassification',
        suppressFilter: true,
        suppressMenu: true,
        suppressSorting: true,
      },
      {
        headerName: '作業分類',
        width: 150,
        field: 'WorkClassification',
        suppressFilter: true,
        suppressMenu: true,
        suppressSorting: true,
      },
      {
        headerName: '作業コード',
        width: 150,
        field: 'WorkCode',
        cellRenderer: (params) => {
          return `<a href='./'>${params.value}</a>`;
        },
        suppressFilter: true,
        suppressMenu: true,
        suppressSorting: true,
      },
      {
        headerName: '作業名',
        width: 300,
        field: 'WorkName',
        suppressFilter: true,
        suppressMenu: true,
        suppressSorting: true,
      },
      {
        headerName: '備考',
        width: 300,
        field: 'Remarks',
        suppressFilter: true,
        suppressMenu: true,
        suppressSorting: true,
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
   * 検索
   */
  searchData() {
    this.gridApi.setRowData(this.createGridData());
  }
}
