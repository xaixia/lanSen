import { AppModalConfig } from '../../../common/modal.directive';
import { BaseService } from '../../../common/base.service';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { AppAnimations } from '../../../common/app-animations';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridColumn } from 'ag-grid-angular';
import { RoleEditComponent } from '../role-edit/role-edit.component';

declare let $: any;

@Component({
  selector: 'app-role',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
  animations: [AppAnimations.openClose],
})
export class RoleListComponent implements OnInit {

  roleEditModalConfig = <AppModalConfig>{
    component: RoleEditComponent,
    modalOptions: {
      class: 'app-modal-lg'
    }
  };

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
    // this.gridOptions.rowSelection = 'multiple';

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
    let index = 1000;
    for (let i = 0; i < 30; i++) {
      res.push(
        { number: index++, intro: '拥有全部权限，网站主要管理人员', name: '超级管理员', time: '2018/12/23 12:00:00' },
        { number: index++, intro: '', name: '管理员', time: '2018/12/23 12:00:00' },
        { number: index++, intro: '', name: '客服', time: '2018/12/23 12:00:00' },
        { number: index++, intro: '', name: '工程师', time: '2018/12/23 12:00:00' },
        { number: index++, intro: '', name: '测试', time: '2018/12/23 12:00:00' },
        { number: index++, intro: '负责财务工作，处置财务事项', name: '财务', time: '2018/12/23 12:00:00' },
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
        width: 100,
        field: 'number',
        suppressSorting: false,
      },
      {
        headerName: '角色名称',
        width: 100,
        field: 'name',
        suppressSorting: false,
      },
      {
        headerName: '角色说明',
        width: 250,
        field: 'intro',
        suppressSorting: false,
      },
      {
        headerName: '时间',
        width: 150,
        field: 'time',
        suppressSorting: false,
      },
      {
        headerName: '编辑',
        field: 'number',
        width: 170,
        suppressResize: true,
        cellClass: 'justify-content-around',
        suppressMenu: true,
        cellRenderer: (param) => {
          const root = $('<div/>');
          const editBtn = $(`<button type="button" class="btn btn-primary"> <i class="fa fa-cogs"></i> 编辑</button>`);
          const deleteBtn = $(`<button type="button" class="btn btn-warning ml-10"><i class="fa fa-remove"></i> 削除</button>`);
          editBtn.click(() => {
            this.baseService.showModal(this.roleEditModalConfig);
          });
          deleteBtn.click((e) => {
            let flag = false;
            const rowData = this.gridApi.getRenderedNodes().map(function (rowNode) {
              if (rowNode.data.number === param.value) {
                flag = true;
                return rowNode.data;
              }
            });
            if (flag) {
              this.gridApi.updateRowData({ remove: rowData });
            }
          });
          root.append(editBtn);
          root.append(deleteBtn);
          return root[0];
        },
      },
    ];
  }
}

