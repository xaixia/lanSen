import { BaseService } from '../../../common/base.service';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { AppAnimations } from '../../../common/app-animations';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridColumn } from 'ag-grid-angular';

declare let $: any;
@Component({
  selector: 'app-register-log',
  templateUrl: './register-log.component.html',
  styleUrls: ['./register-log.component.scss'],
  animations: [AppAnimations.openClose],
})
export class RegisterLogComponent implements OnInit {

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
    let index = 10000001;
    for (let i = 0; i < 300; i++) {
      res.push(
        // tslint:disable-next-line:max-line-length
        { number: index++, role: '超级管理员', name: '张三', intro: '登陆成功', status: '在线', count: 12, address: '四川省自贡市檀木林大街', resIp: '10.11.12.119', time: '2019/01/01 12:00:00', phoneNum: '18899990000' },
        // tslint:disable-next-line:max-line-length
        { number: index++, role: '管理员', name: '李四', intro: '登陆成功', status: '不在线', count: 22, address: '四川省自贡市檀木林大街', resIp: '10.11.12.119', time: '2019/01/01 12:00:00', phoneNum: '18899990000' },
        // tslint:disable-next-line:max-line-length
        { number: index++, role: '客服', name: '王二', intro: '登陆成功', status: '在线', count: 17, address: '四川省自贡市檀木林大街', resIp: '10.11.12.119', time: '2019/01/01 12:00:00', phoneNum: '18899990000' },
        // tslint:disable-next-line:max-line-length
        { number: index++, role: '财务', name: '罗五', intro: '登陆成功', status: '在线', count: 34, address: '四川省自贡市檀木林大街', resIp: '10.11.12.119', time: '2019/01/01 12:00:00', phoneNum: '18899990000' },
      );
    }
    return res;
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '选择',
        checkboxSelection: true,
        headerCheckboxSelection: true,
        suppressFilter: true,
        suppressMenu: true,
        suppressResize: true,
        suppressMovable: true,
        suppressSorting: true,
        width: 100,
        pinned: 'left',
        editable: false,
        colId: 'checkbox',
      },
      {
        headerName: '编号',
        width: 100,
        field: 'number',
        suppressSorting: false,
      },
      {
        headerName: '用户名',
        width: 80,
        field: 'name',
        suppressSorting: false,
      },
      {
        headerName: '说明',
        width: 130,
        field: 'intro',
        suppressSorting: false,
      },
      {
        headerName: '登录地点',
        width: 250,
        field: 'address',
        suppressSorting: false,
      },
      {
        headerName: '登录IP',
        width: 100,
        field: 'resIp',
      },
      {
        headerName: '日期',
        width: 150,
        field: 'time',
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
          const editBtn = $(`<button type="button" class="btn btn-warning"> <i class="fa fa-remove"></i> 删除</button>`);
          editBtn.click(() => { });
          root.append(editBtn);
          return root[0];
        },
      },
    ];

  }
}

