import { Component, OnInit, ElementRef } from '@angular/core';
import { AppAnimations } from '../../../common/app-animations';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../common/base.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cn010-d18',
  templateUrl: './cn010-d18.component.html',
  styleUrls: ['./cn010-d18.component.scss'],
  animations: [AppAnimations.openClose],
})
export class Cn010D18Component implements OnInit {

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

  searchFormOpend = true;
  infoAreaOpend = true;

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
      EscoTntNm: ['', []],
      OrderNumber: ['', []],
      Nohinsaki: ['', []],
      DepoNm: ['', []],
      JuchuSum: ['', []],
    });
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
      { EscoTntNm: '123456', OrderNumber: '技術　太郎', Nohinsaki: '札幌', DepoNm: '2017/04', JuchuSum: '2017/09' },
      { EscoTntNm: '123457', OrderNumber: '技術　次郎', Nohinsaki: '旭川', DepoNm: '2017/10', JuchuSum: '2018/03' },
      { EscoTntNm: '', OrderNumber: '', Nohinsaki: '', DepoNm: '', JuchuSum: '' },
    );
    return result;
  }


  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '削除',
        checkboxSelection: (params) => {
          if (params.data.EscoTntNm === '') {
            return true;
          }
        },
        width: 150,
        field: '',
        suppressMenu: true,
        suppressSorting: true,
      },
      {
        headerName: 'ESCO担当者',
        width: 150,
        field: 'EscoTntNm',
        suppressMenu: true,
        suppressSorting: true,
      },
      {
        headerName: '',
        width: 150,
        field: 'OrderNumber',
        suppressMenu: true,
        suppressSorting: true,
      },
      {
        headerName: 'デポ',
        width: 150,
        field: 'Nohinsaki',
        suppressMenu: true,
        suppressSorting: true,
      },
      {
        headerName: '担当開始年月',
        width: 150,
        field: 'DepoNm',
        suppressMenu: true,
        suppressSorting: true,
      },
      {
        headerName: '担当終了年月',
        width: 150,
        field: 'JuchuSum',
        suppressMenu: true,
        suppressSorting: true,
      },
    ];
  }

  changeSearchForm() {
    this.searchFormOpend = !this.searchFormOpend;
  }

  changeInfoArea() {
    this.infoAreaOpend = !this.infoAreaOpend;
  }

}
