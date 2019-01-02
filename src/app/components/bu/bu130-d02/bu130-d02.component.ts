import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../common/base.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi } from 'ag-grid-community';

declare let $: any;

@Component({
  selector: 'app-bu130-d02',
  templateUrl: './bu130-d02.component.html',
  styleUrls: ['./bu130-d02.component.scss']
})
export class Bu130D02Component implements OnInit {

  public form: FormGroup;

  @ViewChild('conditonPanel')
  public conditonPanel: ElementRef;
  public opencontraction = true;
  public SearcBtnContent = '検索条件+';
   // フォームを設定する
  public gridOptions: GridOptions;

  // グリッドApi
  public gridApi: GridApi;

  constructor(
    private route: ActivatedRoute,
    public baseService: BaseService,
    private fb: FormBuilder,
    private el: ElementRef
  ) {
    this.createForm();
  }

  ngOnInit() {
    // $(this.conditonPanel.nativeElement).hide();
    this.gridOptions = <GridOptions>{};
    this.gridOptions.rowHeight = 24;
    this.gridOptions.headerHeight = 24;
    this.gridOptions.animateRows = true;

    const data = this.getRouterData();
    if (data && data.scrollBar === 1) {
      this.gridOptions.gridAutoHeight = true;
    }

    this.gridOptions.popupParent = document.querySelector('body');
    // enterprise対応：メニュー非表示
    this.gridOptions.suppressContextMenu = true;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.setRowData([]);
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
}
