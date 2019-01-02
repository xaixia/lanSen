import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, ActivatedRouteSnapshot, Router } from '@angular/router';
import { BaseService } from '../../../common/base.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColGroupDef, ColDef } from 'ag-grid-community';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { AppAnimations } from '../../../common/app-animations';
declare let $: any;

@Component({
  selector: 'app-bu110-d03',
  templateUrl: './bu110-d03.component.html',
  styleUrls: ['./bu110-d03.component.scss'],
  animations: [ AppAnimations.openClose ]
})
export class Bu110D03Component implements OnInit {

  public form: FormGroup;
  public supplierCode: string;

  @ViewChild('searchArea')
  searchArea: ElementRef;
  public opencontraction = true;
  public SearcBtnContent = '検索条件+';
   // フォームを設定する
  public gridOptions: GridOptions;
  // グリッド列Api
  private gridColumnApi;
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

  ngOnInit() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.rowHeight = 24;
    this.gridOptions.headerHeight = 24;
    this.gridOptions.animateRows = true;

    const data = this.getRouterData();
    if (data && data.scrollBar === 1) {
      this.gridOptions.gridAutoHeight = true;
    }
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

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData([]);
  }

  supplierCodeChange(event: any) {
      this.supplierCode = event.target.value;
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: 'SDSコード',
        width: 100,
        field: 'SDSCode',
        suppressMenu: true,
        pinned: 'left',
        cellRenderer: (params) => {
          return `<a href='BU110D03'>${params.value}</a>`;
        },
        editable: false
      },
      {
        headerName: '製品コード',
        field: 'ProductCode',
        suppressMenu: true,
        width: 150,
      },
      {
        headerName: '製品名',
        field: 'ProductName',
        suppressMenu: true,
        width: 150,
      },
      {
        headerName: '最終発行・改定日',
        field: 'FinalPublishDate',
        suppressMenu: true,
        width: 150,
      },
      {
        headerName: '確認日',
        field: 'ConfirmedDate',
        suppressMenu: true,
        width: 150,
      },
      {
        headerName: 'SDS',
        width: 150,
        field: 'SDS',
        suppressMenu: true,
        cellRenderer: (params) => {
          return `<a href='BU110D03'>${params.value}</a>`;
        },
        editable: false
      },
      {
        headerName: '備考',
        width: 200,
        field: 'Remarks',
        suppressMenu: true,
      },
    ];
  }


  getRouterData() {
    let data = null;
    this.route.data.forEach((val) => {
      data = val;
    });
    return data;
  }
    /**
   * createForm
   */
  createForm(): void {
    this.form = this.fb.group({
    });
  }

  createGridData(): any[] {
    const result = [];
    for (let i = 0; i < 50; i++) {
      result.push(
        {SDSCode: '00012', ProductCode: '10000', ProductName: 'なんとか酸', FinalPublishDate: '2016/01/01',ConfirmedDate: '2016/10/15',SDS: '10000.pdf',Remarks: ''},
        {SDSCode: '00013', ProductCode: '20000', ProductName: '〇〇混合物', FinalPublishDate: '2015/08/11',ConfirmedDate: '2017/01/25',SDS: '20000.pdf',Remarks: ''},
        {SDSCode: '00014', ProductCode: '30000', ProductName: 'ペケペケセイブン', FinalPublishDate: '2015/08/11',ConfirmedDate: '2018/03/01',SDS: '30000.pdf',Remarks: ''},
        {SDSCode: '00015', ProductCode: '40000', ProductName: 'ヒドロナントカプロピル', FinalPublishDate: '2017/09/20',ConfirmedDate: '2017/12/10',SDS: '40000.pdf',Remarks: ''},
        );
    }
    return result;
  }

    /**
   *
   */
  conditionPanelOpenOrClose() {
    if (this.opencontraction) {
      // $(this.conditonPanel.nativeElement).slideUp(500);
      this.opencontraction = false;
      this.SearcBtnContent = '検索条件+';
    } else {
      // $(this.conditonPanel.nativeElement).slideDown(500);
      this.opencontraction = true;
      this.SearcBtnContent = '検索条件-';
    }
  }

  searchData() {
    if (!this.baseService.hasError(this.el, this.form)) {
      if (this.gridApi) {
        this.gridApi.setRowData(this.createGridData());
      }
    }
  }

}
