import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../common/base.service';
import { AppAnimations } from '../../../common/app-animations';

declare let $: any;

@Component({
  selector: 'app-ap020-d02',
  templateUrl: './ap020-d02.component.html',
  styleUrls: ['./ap020-d02.component.scss'],
  animations: [AppAnimations.openClose],
})

export class Ap020D02Component implements OnInit {

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
    this.searchData();
    this.paginationApi = new PaginationApi();
    this.paginationApi.loadPaginationInfo(100, 10);
  }

  changeSearchForm() {
    this.searchFormOpend = !this.searchFormOpend;
  }

  changeInfoArea() {
    this.infoAreaOpend = !this.infoAreaOpend;
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
    this.gridApi.setRowData(this.createGridData());
  }

  createGridData(): any[] {
    const result = [];
    let index = 1;
    for (let i = 0; i < 2; i++) {
      result.push(
        // tslint:disable-next-line:max-line-length
        { SortNum: index++, ApprovalMethod: 'チームリーダー承認' },
        { SortNum: index++, ApprovalMethod: 'デポ長承認' },
        { SortNum: index++, ApprovalMethod: '管理課承認' },
        { SortNum: index++, ApprovalMethod: '支店長承認' },
        { SortNum: index++, ApprovalMethod: '施工技術責任者承認' },
        { SortNum: index++, ApprovalMethod: '営業副本部長承認' },
        { SortNum: index++, ApprovalMethod: '営業本部長承認' },
      );
    }
    return result;
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
        headerCheckboxSelection: false,
        width: 68,
        editable: false,
        colId: 'checkbox',
      },
      {
        headerName: 'ルート順',
        field: 'SortNum',
        width: 100,
        suppressMenu: true,
        editable: false,
      },
      {
        headerName: '承認方法',
        field: 'ApprovalMethod',
        suppressFilter: true,
        checkboxSelection: false,
        suppressMenu: true,
        suppressMovable: true,
        suppressSorting: true,
        width: 200,
        editable: false,
        cellRenderer: (param) => {
          const root = $('<div/>');
          // tslint:disable-next-line:max-line-length
          const eidtInforBtn = $('<div style="width: 10rem"><select class="form-control"><option value="">' + param.value + '</option></select></div>');
          root.append(eidtInforBtn);
          return root[0];
        },
        suppressToolPanel: true,
      },
      {
        headerName: 'スキップ不可',
        checkboxSelection: true,
        suppressFilter: true,
        suppressMenu: true,
        suppressMovable: true,
        suppressSorting: true,
        headerCheckboxSelection: false,
        width: 150,
        editable: false,
      },
      {
        headerName: '更新可能',
        checkboxSelection: true,
        suppressFilter: true,
        suppressMenu: true,
        suppressMovable: true,
        suppressSorting: true,
        headerCheckboxSelection: false,
        width: 150,
        editable: false,
      },
      {
        headerName: '押印',
        checkboxSelection: true,
        suppressFilter: true,
        suppressMenu: true,
        suppressMovable: true,
        suppressSorting: true,
        headerCheckboxSelection: false,
        width: 150,
        editable: false,
      },
      {
        headerName: '',
        width: 80,
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

  searchData() {
    if (this.gridApi) {
      this.gridApi.setRowData(this.createGridData());
    }
  }

}
let sortNum = 15;
function createNewRowData() {
  const newData = {
    SortNum: sortNum++,
    ApprovalMethod: '営業本部長承認',
  };
  return newData;
}

