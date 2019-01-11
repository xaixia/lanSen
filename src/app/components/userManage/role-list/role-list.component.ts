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
      class: 'app-modal-role'
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
    for (let i = 0; i < 300; i++) {
      res.push(
        { number: 1, name: '超级管理员', power: '所有权限' },
        { number: 2, name: '管理员', power: '高级权限' },
        { number: 3, name: '用户', power: '普通权限' },
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
        headerName: '名称',
        width: 100,
        field: 'name',
        suppressSorting: false,
      },
      {
        headerName: '权限',
        width: 100,
        field: 'power',
        suppressSorting: false,
      },
      {
        headerName: '编辑',
        width: 90,
        suppressResize: true,
        cellClass: 'justify-content-md-center',
        suppressMenu: true,
        cellRenderer: (param) => {
          const root = $('<div/>');
          // tslint:disable-next-line:max-line-length
          const editBtn = $(`<button type="button" class="btn btn-primary"> <i class="fa fa-cogs"></i> 编辑</button>`);
          editBtn.click(() => {
            this.baseService.showModal(this.roleEditModalConfig);
          });
          root.append(editBtn);
          return root[0];
        },
      },
    ];
  }
}
