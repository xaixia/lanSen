import { AppModalResult, AppModalConfig } from '../../../common/modal.directive';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../common/base.service';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { AppAnimations } from '../../../common/app-animations';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridColumn } from 'ag-grid-angular';
import { PasswordComponent } from '../../indexManage/password/password.component';
import { MESSAGE_UTIL } from '../../../configuration/message.config';
import { UserinfoComponent } from '../../indexManage/userinfo/userinfo.component';

declare let $: any;

@Component({
  selector: 'app-ordinary-user-list',
  templateUrl: './ordinary-user-list.component.html',
  styleUrls: ['./ordinary-user-list.component.scss'],
  animations: [AppAnimations.openClose],
})
export class OrdinaryUserListComponent implements OnInit {
  searchFormOpend = true;
  status = 1;
  infoAreaOpend = true;
  tabContentArea = false;
  passwordModalConfig = <AppModalConfig>{
    component: PasswordComponent,
    modalOptions: {
      class: 'app-modal-pwd'
    }
  };
  userInfoModalConfig = <AppModalConfig>{
    component: UserinfoComponent,
    modalOptions: {
      class: 'app-modal-user'
    }
  };

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
  // グリッド列Api
  private gridColumnApi: AgGridColumn;
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

    this.gridOptions.gridAutoHeight = true;

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
    this.conditionPanelOpenOrClose();
  }

  /**
   * createForm
   */
  createForm(): void {
    this.form = this.fb.group({});
  }

  /**
   *
   */
  conditionPanelOpenOrClose() {
    if (this.opencontraction) {
      this.opencontraction = false;
      this.SearcBtnContent = '検索条件+';
    } else {
      this.opencontraction = true;
      this.SearcBtnContent = '検索条件-';
    }
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
        { number: index++, name: '张三', authentication: '已认证', release: 10, resolve: 8 },
        { number: index++, name: '李四', authentication: '未认证', release: 10, resolve: 8 },
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
        headerName: '账号',
        width: 100,
        field: 'number',
        suppressSorting: false,
      },
      {
        headerName: '姓名',
        width: 100,
        field: 'name',
        suppressSorting: false,
      },
      {
        headerName: '实名认证',
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
        headerName: '编辑',
        width: 180,
        suppressResize: true,
        cellClass: 'justify-content-md-center',
        suppressMenu: true,
        cellRenderer: (param) => {
          const root = $('<div/>');
          // tslint:disable-next-line:max-line-length
          const editBtn = $(`<button type="button" class="btn btn-primary"> <i class="fa fa-cogs"></i> 编辑</button>`);
          const resetBtn = $(`<button type="button" class="btn btn-info ml-3"> <i class="fa fa-info-circle"></i> 详情</button>`);
          editBtn.click(() => {
            this.baseService.showModal(this.userInfoModalConfig);
          });
          resetBtn.click(() => {
            this.baseService.showModal(this.passwordModalConfig);
          });
          root.append(editBtn);
          root.append(resetBtn);
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
    } else {
      if (!this.opencontraction) {
        this.conditionPanelOpenOrClose();
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

