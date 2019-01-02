import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Route, ActivatedRouteSnapshot, Router } from '@angular/router';
import { BaseService } from '../../../common/base.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColGroupDef, ColDef } from 'ag-grid-community';
import { AppValidators } from '../../../common/app-validators';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { AppAnimations } from '../../../common/app-animations';
declare let $: any;


@Component({
  selector: 'app-bu010-d02',
  templateUrl: './bu010-d02.component.html',
  styleUrls: ['./bu010-d02.component.scss'],
  animations: [AppAnimations.openClose],
})
export class Bu010D02Component implements OnInit {

  searchFormOpend = true;
  infoAreaOpend = true;

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
    //this.createForm();
    this.paginationApi = new PaginationApi();
    this.paginationApi.loadPaginationInfo(100, 10);
  }

  ngOnInit() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.rowHeight = 24;
    this.gridOptions.headerHeight = 24;
    this.gridOptions.animateRows = true;

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
        headerName: '会社名',
        field: 'CompanyName',
        suppressMenu: true,
      },
      {
        headerName: '会社カナ',
        field: 'CompanyKana',
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

  createGridData(): any[] {
    return [
      { CompanyName: '会社06', CompanyKana: 'ｶｲｼｬ06' },
      { CompanyName: '会社07', CompanyKana: 'ｶｲｼｬ07' },
      { CompanyName: '会社08', CompanyKana: 'ｶｲｼｬ08' },
    ];
  }

  searchData() {
    this.gridApi.setRowData(this.createGridData());
  }

  changeSearchForm() {
    this.searchFormOpend = !this.searchFormOpend;
  }

  changeInfoArea() {
    this.infoAreaOpend = !this.infoAreaOpend;
  }

}

