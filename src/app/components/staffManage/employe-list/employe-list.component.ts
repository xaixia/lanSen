import { AppModalResult, AppModalConfig } from '../../../common/modal.directive';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../common/base.service';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { AppAnimations } from '../../../common/app-animations';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridColumn } from 'ag-grid-angular';
import { MESSAGE_UTIL } from '../../../configuration/message.config';
import { EmployeEditComponent } from '../employe-edit/employe-edit.component';

declare let $: any;

@Component({
  selector: 'app-employe-list',
  templateUrl: './employe-list.component.html',
  styleUrls: ['./employe-list.component.scss'],
  animations: [AppAnimations.openClose],
})

export class EmployeListComponent implements OnInit {
  searchFormOpend = true;
  status = 1;
  infoAreaOpend = true;
  tabContentArea = false;

  public form: FormGroup;
  // 受注目的
  public OrderPurposeKbnList = [];
  public SendKbnList = [];
  public ChangeBikoKbnList = [];
  public CEOrdersKbnList = [];
  public SaleRecordKbnList = [];
  public SearcBtnContent = '検索条件+';
  @ViewChild('conditonPanel')
  public conditonPanel: ElementRef;
  public opencontraction = true;
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
    private route: ActivatedRoute,
    public baseService: BaseService,
    private fb: FormBuilder,
    private el: ElementRef
  ) {
    this.createForm();
    this.paginationApi = new PaginationApi();
    this.paginationApi.loadPaginationInfo(100, 10);
    this.route.params.subscribe((params) => {
      const id = Number.parseInt(params['status']);
      this.status = id;
    });
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
    this.gridOptions.domLayout = 'autoHeight';

    this.gridOptions.defaultColDef = {
      menuTabs: ['filterMenuTab'],
    };
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
        { number: index++, sName: '小飞猪', name: '张三', tel: '18899990000', money: '1035472', time: '2019/01/12', authentication: '未上传', release: 10, resolve: 8 },
        // tslint:disable-next-line:max-line-length
        { number: index++, sName: '小飞猪', name: '张三', tel: '18899990000', money: '1035472', time: '2019/01/12', authentication: '待审核', release: 10, resolve: 8 },
        // tslint:disable-next-line:max-line-length
        { number: index++, sName: '小飞猪', name: '李四', tel: '18899990000', money: '1035472', time: '2019/01/12', authentication: '审核通过', release: 10, resolve: 8 },
        // tslint:disable-next-line:max-line-length
        { number: index++, sName: '小飞猪', name: '李四', tel: '18899990000', money: '1035472', time: '2019/01/12', authentication: '审核不通过', release: 10, resolve: 8 },
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
        cellRenderer: (params) => {
          const root = $('<div/>');
          // tslint:disable-next-line:max-line-length
          const banBtn = $(`<input type="checkbox" name="ban" />`);
          banBtn[0].onchange = (() => {
            this.baseService.showMessage('error', MESSAGE_UTIL.getMessage('E0010', []), '错误');
          });
          root.append(banBtn);
          return root[0];
        },
      },
      {
        headerName: 'id',
        width: 100,
        field: 'number',
        suppressSorting: false,
      },
      {
        headerName: '昵称',
        width: 100,
        field: 'sName',
        suppressSorting: false,
      },
      {
        headerName: '电话',
        width: 100,
        field: 'tel',
      },
      {
        headerName: '姓名',
        width: 100,
        field: 'name',
      },
      {
        headerName: '实名状态',
        width: 100,
        field: 'authentication',
        suppressSorting: false,
      },
      {
        headerName: '已发布工单数',
        width: 100,
        field: 'release',
      },
      {
        headerName: '已完成工单数',
        width: 100,
        field: 'resolve',
      },
      {
        headerName: '账户余额',
        width: 100,
        field: 'money',
        cellRenderer: (param) => param.value ? (param.value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : '0'
      },
      {
        headerName: '注册时间',
        width: 100,
        field: 'time',
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
          const editBtn = $(`<button type="button" class="btn btn-info ml-3"> <i class="fa fa-info-circle"></i> 详情</button>`);
          editBtn.click(() => {
            this.baseService.insert('user/employe-edit');
          });
          root.append(editBtn);
          return root[0];
        },
      },
    ];

  }

  searchData() {
    if (!this.baseService.hasError(this.el, this.form)) {
      if (this.gridApi) {
        this.gridApi.setRowData(this.createGridData());
      }
    }
  }

  changeInfoArea() {
    this.infoAreaOpend = !this.infoAreaOpend;
    this.searchFormOpend = !this.searchFormOpend;
  }

  done(event: AppModalResult) {
    console.log(event);
  }
}


