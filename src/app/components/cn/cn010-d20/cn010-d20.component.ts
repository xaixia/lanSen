import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../common/base.service';

@Component({
  selector: 'app-cn010-d20',
  templateUrl: './cn010-d20.component.html',
  styleUrls: ['./cn010-d20.component.scss']
})
export class Cn010D20Component implements OnInit {

  public form: FormGroup;
  // グリッド列Api
  private gridColumnApi;
  // フォームを設定する
  public gridOptions: GridOptions;
  public gridOptions1: GridOptions;
  public gridOptions2: GridOptions;
  // グリッドApi
  public gridApi: GridApi;
  // ロケールテキスト
  public localeText;
  public style = {
    width: '100%',
    height: '100%',
  };

  constructor(
    private route: ActivatedRoute,
    public baseService: BaseService,
    private fb: FormBuilder,
    private el: ElementRef
  ) {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({

    });
  }

  ngOnInit() {
    // 紹介元変更
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

    // 紹介元変更1
    this.gridOptions1 = <GridOptions>{};
    this.gridOptions1.rowHeight = 24;
    this.gridOptions1.headerHeight = 24;
    this.gridOptions1.animateRows = true;

    this.gridOptions1.rowSelection = 'multiple';

    this.gridOptions1.defaultColDef = {
      menuTabs: ['filterMenuTab'],
      editable: true
    };
    this.gridOptions1.popupParent = document.querySelector('body');
    // enterprise対応：メニュー非表示
    this.gridOptions1.suppressContextMenu = true;
    this.gridOptions1.columnDefs = this.getGridColumnDefs1();
    this.localeText = this.baseService.getGridLocaleText();

    // 紹介元変更1
    this.gridOptions2 = <GridOptions>{};
    this.gridOptions2.rowHeight = 24;
    this.gridOptions2.headerHeight = 24;
    this.gridOptions2.animateRows = true;

    this.gridOptions2.rowSelection = 'multiple';

    this.gridOptions2.defaultColDef = {
      menuTabs: ['filterMenuTab'],
      editable: true
    };
    this.gridOptions2.popupParent = document.querySelector('body');
    // enterprise対応：メニュー非表示
    this.gridOptions2.suppressContextMenu = true;
    this.gridOptions2.columnDefs = this.getGridColumnDefs2();
    this.localeText = this.baseService.getGridLocaleText();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData([]);
    this.gridApi.setRowData(this.createGridData());
  }

  onGridReady1(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData([]);
    this.gridApi.setRowData(this.createGridData());
  }

  onGridReady2(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData([]);
    this.gridApi.setRowData(this.createGridData());
  }

  createGridData(): any[] {
    const result = [];
    result.push(
      // tslint:disable-next-line:max-line-length
      { a: '100001', b: '○○産業', c: '2017/10', d: '2018/09', e: 'マスター設定', f: '3.0', g: '', h: '2017/10', i: '2018/09', j: 'マスター設定', k: '3.0', l: '' },
      // tslint:disable-next-line:max-line-length
      { a: '100002', b: '○○商事', c: '2017/10', d: '2018/09', e: '料率入力', f: '3.5', g: '', h: '2017/10', i: '2018/09', j: '料率入力', k: '3.5', l: '' },
      // tslint:disable-next-line:max-line-length
      { a: '100003', b: '○○工業', c: '2017/10', d: '2018/09', e: '金額入力', f: '', g: '5,000', h: '2017/10', i: '2018/09', j: '金額入力', k: '', l: '5,000' },
      // tslint:disable-next-line:max-line-length
      { a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '', i: '', j: '', k: '', l: '' },
    );
    return result;
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '紹介元',
        width: 100,
        field: 'a',
        suppressMenu: true,
        suppressSorting: true,
      },
      {
        headerName: '',
        width: 130,
        field: 'b',
        suppressMenu: true,
        suppressSorting: true,
      },
    ];
  }

  getGridColumnDefs1(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '支払期間',
        width: 90,
        field: 'c',
        suppressMenu: true,
        suppressSorting: true,
      },
      {
        headerName: '',
        width: 90,
        field: 'd',
        suppressMenu: true,
        suppressSorting: true,
      },
      {
        headerName: '手数料設定',
        width: 110,
        field: 'e',
        suppressMenu: true,
        suppressSorting: true,
      },
      {
        headerName: '手数料率(%)',
        width: 110,
        field: 'f',
        suppressMenu: true,
        suppressSorting: true,
      },
      {
        headerName: '手数料金額',
        width: 100,
        field: 'g',
        suppressMenu: true,
        suppressSorting: true,
      },
    ];
  }

  getGridColumnDefs2(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '支払期間',
        width: 90,
        field: 'h',
        suppressMenu: true,
        suppressSorting: true,
      },
      {
        headerName: '',
        width: 90,
        field: 'i',
        suppressMenu: true,
        suppressSorting: true,
      },
      {
        headerName: '手数料設定',
        width: 110,
        field: 'j',
        suppressMenu: true,
        suppressSorting: true,
      },
      {
        headerName: '手数料率(%)',
        width: 110,
        field: 'k',
        suppressMenu: true,
        suppressSorting: true,
      },
      {
        headerName: '手数料金額',
        width: 100,
        field: 'l',
        suppressMenu: true,
        suppressSorting: true,
      },
    ];
  }

}
