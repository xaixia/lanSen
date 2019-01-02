import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../common/base.service';

@Component({
  selector: 'app-cn030-d01',
  templateUrl: './cn030-d01.component.html',
  styleUrls: ['./cn030-d01.component.scss']
})
export class Cn030D01Component implements OnInit {

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

  onGridReady(params) {
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

}
