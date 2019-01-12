import { AppModalConfig } from '../../../common/modal.directive';
import { BaseService } from '../../../common/base.service';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { AppAnimations } from '../../../common/app-animations';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridColumn } from 'ag-grid-angular';

declare let $: any;

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  animations: [AppAnimations.openClose],
})
export class OrderListComponent implements OnInit {
  public form: FormGroup;
  private gridColumnApi: AgGridColumn;
  public gridOptions: GridOptions;
  public gridApi: GridApi;
  public localeText;
  public style = {
    width: '100%',
    height: '100%',
  };

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

    this.gridOptions.domLayout = 'autoHeight';

    this.gridOptions.defaultColDef = {
      menuTabs: ['filterMenuTab'],
    };
    this.gridOptions.popupParent = document.querySelector('body');
    this.gridOptions.suppressContextMenu = true;
    this.localeText = this.baseService.getGridLocaleText();
    this.gridOptions.columnDefs = this.getGridColumnDefs();
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
  }

  createGridData(): any[] {
    const res = [];
    let index = 1;
    for (let i = 0; i < 300; i++) {
      res.push(
        // tslint:disable-next-line:max-line-length
        { number: index++, order: '574246546545454242', orderFrom: '张三', status: '待接单', money: '已付款', time: '2019/1/12 12:00:23', add: '自贡市檀木林大街', orderTo: '李四' },
        // tslint:disable-next-line:max-line-length
        { number: index++, order: '574246546545454242', orderFrom: '张三', status: '待接单', money: '已付款', time: '2019/1/12 12:00:23', add: '自贡市檀木林大街', orderTo: '李四' },
        // tslint:disable-next-line:max-line-length
        { number: index++, order: '574246546545454242', orderFrom: '张三', status: '待接单', money: '已付款', time: '2019/1/12 12:00:23', add: '自贡市檀木林大街', orderTo: '李四' },
        // tslint:disable-next-line:max-line-length
        { number: index++, order: '574246546545454242', orderFrom: '张三', status: '待接单', money: '已付款', time: '2019/1/12 12:00:23', add: '自贡市檀木林大街', orderTo: '李四' },
      );
    }
    return res;
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '启用/禁用',
        suppressFilter: true,
        suppressMenu: true,
        suppressResize: true,
        suppressMovable: true,
        suppressSorting: true,
        width: 100,
        pinned: 'left',
        editable: false,
        colId: 'checkbox',
        cellRenderer: () => {
          const root = $('<div/>');
          const banBtn = $(`<input type="checkbox" name="ban" />`);
          banBtn[0].onchange = (() => { });
          root.append(banBtn);
          return root[0];
        },
      },

      {
        headerName: '编号',
        width: 80,
        field: 'number',
        suppressSorting: false,
      },
      {
        headerName: '单号',
        width: 150,
        field: 'order',
        suppressSorting: false,
      },
      {
        headerName: '下单方',
        width: 100,
        field: 'orderFrom',
        suppressSorting: false,
      },
      {
        headerName: '状态',
        width: 100,
        field: 'status',
        suppressSorting: false,
      },
      {
        headerName: '付款状态',
        width: 100,
        field: 'money',
        suppressSorting: false,
      },
      {
        headerName: '下单时间',
        width: 150,
        field: 'time',
        suppressSorting: false,
      },
      {
        headerName: '地址',
        width: 200,
        field: 'add',
        suppressSorting: false,
      },
      {
        headerName: '接单方',
        width: 100,
        field: 'orderTo',
        suppressSorting: false,
      },
      {
        headerName: '操作',
        width: 90,
        suppressResize: true,
        cellClass: 'justify-content-md-center',
        suppressMenu: true,
        cellRenderer: (param) => {
          const root = $('<div/>');
          // tslint:disable-next-line:max-line-length
          const editBtn = $(`<button type="button" class="btn btn-primary"> <i class="fa fa-cogs"></i> 操作</button>`);
          editBtn.click(() => {
            this.baseService.clearAllData();
            this.baseService.navigate('business/orderEdit');
          });
          root.append(editBtn);
          return root[0];
        },
      },
    ];
  }
}
