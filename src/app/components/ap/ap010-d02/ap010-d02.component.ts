import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { BaseService } from '../../../common/base.service';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { AppAnimations } from '../../../common/app-animations';
import { AppModalComponent } from '../../../common/modal.directive';

declare let $: any;

@Component({
  selector: 'app-ap010-d02',
  templateUrl: './ap010-d02.component.html',
  styleUrls: ['./ap010-d02.component.scss'],
  animations: [AppAnimations.openClose]
})
export class Ap010D02Component implements AppModalComponent, OnInit {

  public form: FormGroup;
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

  data: any;
  done: (cancel: boolean, result?: any) => void;

  paginationApi: PaginationApi;

  constructor(
    public baseService: BaseService,
    private fb: FormBuilder,
    private el: ElementRef
  ) {
    this.createForm();
    this.paginationApi = new PaginationApi();
    this.paginationApi.loadPaginationInfo(100, 10);
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
      editable: false
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
    this.form = this.fb.group({});
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData(this.createGridData());
    this.gridApi.refreshCells();
    console.log(params);
  }

  createGridData(): any[] {
    return [
      { sortNumber: '1', approvalMethod: '10チームリーダー承認', shoinPerson: '利井田　次郎', shoinDate: '2018/5/8 10:03' },
      { sortNumber: '2', approvalMethod: 'デポ長承認', shoinPerson: '出保　三郎', shoinDate: '2018/5/8 11:11' },
      { sortNumber: '3', approvalMethod: '管理課承認', shoinPerson: '甘利　花子\t菅　里香\t試験　史郎', shoinDate: '' },
      { sortNumber: '4', approvalMethod: '支店長承認', shoinPerson: '店長　吾郎\t(副点　長次郎)', shoinDate: '' },
      { sortNumber: '5', approvalMethod: '施工技術責任者承認', shoinPerson: '瀬古　六郎', shoinDate: '' },
      { sortNumber: '6', approvalMethod: '営業副本部長承認', shoinPerson: '福保　菜々美', shoinDate: '' },
      { sortNumber: '7', approvalMethod: '営業本部長承認', shoinPerson: '本部　八郎', shoinDate: '' }
    ];
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: 'ルート順',
        width: 100,
        field: 'sortNumber',
        cellClass: 'justify-content-center',
        suppressMenu: true,
      },
      {
        headerName: '承認方法',
        width: 150,
        field: 'approvalMethod',
        suppressMenu: true,
      },
      {
        headerName: '承認者',
        width: 200,
        field: 'shoinPerson',
        suppressMenu: true,
      },
      {
        headerName: '承認日',
        width: 150,
        field: 'shoinDate',
        suppressMenu: true,
      }
    ];
  }
}
