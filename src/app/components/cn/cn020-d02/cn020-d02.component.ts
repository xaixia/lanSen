import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../common/base.service';

@Component({
  selector: 'app-cn020-d02',
  templateUrl: './cn020-d02.component.html',
  styleUrls: ['./cn020-d02.component.scss']
})
export class Cn020D02Component implements OnInit {
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
  public formData: any;
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
        WorkMajorClassificationId: '1',
        WorkClassificationId: '1',
        WorkCode: '1101',
        Interval: '1',
        Chiefcharge: '1',
        WorkBreakdown: '捕虫器(ライトトラップ)を使用し、製造作業所内に侵入した昆虫の調査と捕獲を計画します。',
      };
      this.form.patchValue(this.formData);
    }
      /**
     * createForm
     */
    createForm(): void {
      this.form = this.fb.group({
        /**
         * 作業大分類
         */
        WorkMajorClassificationId: [null, [ ]],
        /**
         * 作業分類
         */
        WorkClassificationId: [null, [ ]],
        /**
         * 作業コード
         */
        WorkCode: ['', [ ]],
        /**
         * 作業名
         */
        WorkName: ['', [ ]],
        /**
         * 実施間隔
         */
        Interval: ['', [ ]],
        /**
         * 従量制フラグ
         */
        QuotaFlag: ['', [ ]],
        /**
         * 作業名変更フラグ
         */
        WorkNameChangeFlg: ['', [ ]],
        /**
         * 主担当
         */
        Chiefcharge: ['', [ ]],
        /**
         * 作業内訳
         */
        WorkBreakdown: ['', [ ]],
        /**
         * 備考
         */
        Remarks: ['', [ ]]
      });
    }
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      this.gridApi.setRowData([]);
      this.gridApi.setRowData(this.createGridData());
    }
    createGridData(): any[] {
      const result = [];
      const index = 100001;
      for (let i = 0; i < 5; i++) {
        result.push(
          // tslint:disable-next-line:max-line-length
          {WorkingProcess: 'トラップ設置・回収', WorkClassification: '目視調査・確認', WorkCode: '1111', WorkName: '目視点検', Remarks: ''},
          // tslint:disable-next-line:max-line-length
          {WorkingProcess: '=作業', WorkClassification: '目視調査・確認', WorkCode: '2222', WorkName: '飛翔昆虫モニタリング',  Remarks: ''},
          // tslint:disable-next-line:max-line-length
          {WorkingProcess: '・・・', WorkClassification: '目視調査・確認', WorkCode: '3333', WorkName: '歩行昆虫モニタリング',  Remarks: ''},
          // tslint:disable-next-line:max-line-length
          {WorkingProcess: '報告書提出', WorkClassification: '目視調査・確認', WorkCode: '4444', WorkName: 'トラップによる昆虫の殺虫、捕獲', Remarks: ''},
          );
      }
      return result;
    }

    getGridColumnDefs(): (ColDef | ColGroupDef)[] {
      return [
        {
          headerName: '作業工程',
          width: 150,
          field: 'WorkingProcess',
          rowDrag: true,
          suppressFilter: true,
          suppressMenu: true,
          suppressSorting: true,
        },
        {
          headerName: '実施（貴社／弊社',
          width: 150,
          field: 'WorkClassification',
          suppressFilter: true,
          suppressMenu: true,
          suppressSorting: true,
        },
        {
          headerName: '作業コード対象フラグ',
          width: 200,
          field: 'WorkCode',
          suppressFilter: true,
          suppressMenu: true,
          suppressSorting: true,
        },
        {
          headerName: 'トラップ受取・同定・カウント',
          width: 250,
          field: 'WorkName',
          suppressFilter: true,
          suppressMenu: true,
          suppressSorting: true,
        },
        {
          headerName: '翌月作業',
          width: 150,
          field: 'Remarks',
          suppressFilter: true,
          suppressMenu: true,
          suppressSorting: true,
        },
      ];
    }
    rowInsert() {
    //  this.gridApi.updateRowData({
    //   add: [{}]
    //  });
    }
    /**
     * 新規登録
     */
    InsertBtn() {
    }
    /**
     * キャンセル
     */
    backBtn() {
    }
  }
