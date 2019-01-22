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
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  searchFormOpend = true;
  status = 1;
  infoAreaOpend = true;
  tabContentArea = false;

  public form: FormGroup;
  public OrderPurposeKbnList = [];
  public SendKbnList = [];
  public ChangeBikoKbnList = [];
  public CEOrdersKbnList = [];
  public SaleRecordKbnList = [];
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
    this.gridOptions.rowHeight = 160;
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
    for (let i = 0; i < 300; i++) {
      res.push(
        { img: 'http://image.uboworks.com/12.jpg', title: '小偷盗窃太专注 警察在其身后站了10秒都未发觉', time: '2019/01/12 11:23:45', },
      );
    }
    return res;
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '图片',
        width: 100,
        field: 'img',
        suppressSorting: false,
        cellRenderer: (param) => {
          const root = $('<div class="news-thumb">');
          const newsImg = $(`<img src='${param.value}' />`);
          root.append(newsImg);
          return root[0];
        }
      },
      {
        headerName: '标题',
        width: 300,
        field: 'title',
        suppressSorting: false,
      },
      {
        headerName: '时间',
        width: 150,
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
          const resetBtn = $(`<button type="button" class="btn btn-info ml-3"> <i class="fa fa-info-circle"></i> 详情</button>`);
          resetBtn.click(() => {
            this.baseService.insert('content/news-edit');
          });
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

