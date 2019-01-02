import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { AppAnimations } from '../../../common/app-animations';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../common/base.service';

declare let $: any;

@Component({
  selector: 'app-bu040-d01',
  templateUrl: './bu040-d01.component.html',
  styleUrls: ['./bu040-d01.component.scss'],
  animations: [ AppAnimations.openClose ]
})
export class Bu040D01Component implements OnInit {

  searchFormOpend = true;
  public form: FormGroup;

  @ViewChild('conditonPanel')
  public conditonPanel: ElementRef;
  public opencontraction = false;
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
    private router: Router,
    public baseService: BaseService,
    private fb: FormBuilder,
    private el: ElementRef
  ) {
    this.createForm();
    this.paginationApi = new PaginationApi();
    this.paginationApi.loadPaginationInfo(100, 10);
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
      menuTabs: [],
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

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData([]);
  }

  createGridData(): any[] {
    const result = [];
    for (let i = 0; i < 30; i++) {
      result.push(
        // tslint:disable-next-line:max-line-length
        {IntroductionFromNM: 'テスト取引先01', IntroductionFromNo: 'CUSTOMER01', SeikoToCode: 'SEKOU01', SeikoToNM: '施工先01', YukoFromYMD: '1900/01/01', YukoToYMD: '2018/05/01'},
        // tslint:disable-next-line:max-line-length
        {IntroductionFromNM: 'テスト取引先02', IntroductionFromNo: 'CUSTOMER01', SeikoToCode: 'SEKOU02', SeikoToNM: '施工先01', YukoFromYMD: '2016/01/01', YukoToYMD: '2018/05/01'},
        // tslint:disable-next-line:max-line-length
        {IntroductionFromNM: 'テスト取引先03', IntroductionFromNo: 'CUSTOMER01', SeikoToCode: 'SEKOU03', SeikoToNM: '施工先01', YukoFromYMD: '2017/08/01', YukoToYMD: '2018/05/01'},
        // tslint:disable-next-line:max-line-length
        {IntroductionFromNM: 'テスト取引先04', IntroductionFromNo: 'CUSTOMER02', SeikoToCode: 'SEKOU04', SeikoToNM: '施工先01', YukoFromYMD: '2017/08/01', YukoToYMD: '2018/05/01'},
        // tslint:disable-next-line:max-line-length
        {IntroductionFromNM: 'テスト取引先05', IntroductionFromNo: 'CUSTOMER03', SeikoToCode: 'SEKOU05', SeikoToNM: '施工先01', YukoFromYMD: '2018/01/01', YukoToYMD: ''},
        );
    }
    return result;
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '紹介元コード',
        width: 150,
        field: 'IntroductionFromNo',
        pinned: 'left',
        editable: false
      },
      {
        headerName: '紹介元名称',
        width: 150,
        field: 'IntroductionFromNM',
        editable: false
      },
      {
        headerName: '施工先コード',
        width: 150,
        field: 'SeikoToCode',
        editable: false
      },
      {
        headerName: '施工先名称',
        width: 150,
        field: 'SeikoToNM',
        editable: false
      },
      {
        headerName: '有効期間(自)',
        width: 150,
        field: 'YukoFromYMD',
        editable: false
      },
      {
        headerName: '有効期間(至)',
        width: 150,
        field: 'YukoToYMD',
        editable: false
      }
    ];
  }

  searchData() {
    if (!this.baseService.hasError(this.el, this.form)) {
      if (this.gridApi) {
        this.gridApi.setRowData(this.createGridData());
      }
    }
  }

  changeSearchForm() {
    this.searchFormOpend = !this.searchFormOpend;
  }

  rowDoubleClickedEvent(path: string, param?: any) {
    const url = this.router.routerState.snapshot.url;
    if (url !== path) {
      this.baseService.clearAllData();
      this.baseService.navigate(path, param);
    }
  }
}
