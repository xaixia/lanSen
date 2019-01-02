import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../common/base.service';
import { AppValidators } from '../../../common/app-validators';
import { AppAnimations } from '../../../common/app-animations';

declare let $: any;

@Component({
  selector: 'app-gm010-d02',
  templateUrl: './gm010-d02.component.html',
  styleUrls: ['./gm010-d02.component.scss'],
  animations: [ AppAnimations.openClose ],
})

export class Gm010D02Component implements OnInit {
  public form: FormGroup;
  // 受注目的
  newCount = 1;
  searchFormOpend = true;
  infoAreaOpend = true;
  @ViewChild('conditonPanel')
  public conditonPanel: ElementRef;
  @ViewChild('searchArea')
  searchArea: ElementRef;
  public opencontraction = true;
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
  ) {
    this.createForm();
    this.paginationApi = new PaginationApi();
    this.paginationApi.loadPaginationInfo(100, 10);
  }

  getRouterData() {
    let data = null;
    this.route.data.forEach((val) => {
      data = val;
    });
    return data;
  }

  ngOnInit() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.rowHeight = 24;
    this.gridOptions.headerHeight = 24;
    this.gridOptions.animateRows = true;

    this.gridOptions.rowSelection = 'single';
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

  /**
   * createForm
   */
  createForm(): void {
    this.form = this.fb.group({
    });
  }

  onAddRow() {
    const newItem = createNewRowData();
    this.gridApi.updateRowData({ add: [newItem] });
  }

  onRemoveSelected() {
    const selectedData = this.gridApi.getSelectedRows();
    this.gridApi.updateRowData({ remove: selectedData });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData([]);
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '行',
        field: 'Row',
        width: 100,
        editable: false,
        suppressMenu: true,
      },
      {
        headerName: '品名・作業内容',
        field: 'WorkContent',
        width: 300,
        headerClass: 'required-column',
        suppressMenu: true,
      },
      {
        headerName: '明細金額',
        field: 'DetailedAmount',
        width: 150,
        cellClass: 'justify-content-md-end',
        cellRenderer: (param) => param.value ? (param.value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : '0',
        suppressMenu: true,
      },
      {
        headerName: '明細税区分',
        field: 'ItemTax',
        width: 200,
        suppressMenu: true,
      },
      {
        headerName: '明細税込区分',
        field: 'ItemTaxIncluded',
        width: 200,
        suppressMenu: true,
      },
      {
        headerName: '明細消費税率',
        field: 'ItemConsumption',
        width: 200,
        suppressMenu: true,
      },
      {
        headerName: '',
        width: 90,
        suppressFilter: true,
        suppressMenu: true,
        suppressMovable: true,
        suppressSorting: true,
        cellClass: 'justify-content-md-center',
        editable: false,
        cellRenderer: (param) => {
          const root = $('<div/>');
          // tslint:disable-next-line:max-line-length
          const eidtInforBtn = $('<div style=\'text-align: center\'><button class=\'btn btn-warning\' type=\'button\' style=\'width:70px;\'><i class=\'fa fa-remove\'></i> 削除</button></div>');
          eidtInforBtn.click(() => {
            param.node.setSelected(true);
            this.onRemoveSelected();
          });
          root.append(eidtInforBtn);
          return root[0];
        },
        suppressToolPanel: true,
      },
    ];
  }

}

let newCount = 1;
function createNewRowData() {
  const newData = {
    Row: newCount,
    WorkContent: '品名・作業内容' + newCount,
    DetailedAmount: 9999,
    ItemTax: '内税',
    ItemTaxIncluded: '内税入力',
    ItemConsumption: '5%'
  };
  newCount++;
  return newData;
}
