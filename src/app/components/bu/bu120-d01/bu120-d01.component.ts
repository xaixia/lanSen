import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, ActivatedRouteSnapshot, Router } from '@angular/router';
import { map } from 'rxjs/operator/map';
import { BaseService } from '../../../common/base.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColGroupDef, ColDef } from 'ag-grid-community';
import { AppValidators } from '../../../common/app-validators';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { AppAnimations } from '../../../common/app-animations';
declare let $: any;
@Component({
  selector: 'app-bu120-d01',
  templateUrl: './bu120-d01.component.html',
  styleUrls: ['./bu120-d01.component.scss'],
  animations: [ AppAnimations.openClose ],
})
export class Bu120D01Component implements OnInit {

  public form: FormGroup;
  public componentCode: string;

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

  showComponentCode(event: any) {
      this.componentCode = event.target.value;
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '成分コード',
        width: 100,
        field: 'ComponentCode',
        suppressMenu: true,
        pinned: 'left',
        cellRenderer: (params) => {
          return `<a href='BU120D01'>${params.value}</a>`;
        },
        editable: false
      },
      {
        headerName: '成分名',
        field: 'ComponentName',
        suppressMenu: true,
        width: 150,
      },
      {
        headerName: 'CAS番号',
        field: 'CasNum',
        suppressMenu: true,
        width: 150,
      },
      {
        headerName: 'PRTR',
        field: 'PRTR',
        suppressMenu: true,
        width: 150,
      },
      {
        headerName: 'ポジティブ',
        field: 'Positive',
        suppressMenu: true,
        width: 150,
      },
      {
        headerName: '安衛法',
        field: 'SafetyLaw',
        suppressMenu: true,
        width: 150,
      }
    ];
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
      // 受注年月日From
      ComponentCode: [null],
      // 受注年月日To
      ComponentName: [null],
      // 受注No.
      CasCode: [null],
    });
  }


  createGridData(): any[] {
    const result = [];
    let index = 10001;
    for (let i = 0; i < 30; i++) {
      result.push(
        {ComponentCode: index++, ComponentName: '成分A', CasNum: '514-10-3', PRTR: '対象', Positive: '対象外', SafetyLaw: '対象'},
        {ComponentCode: index++, ComponentName: '成分B', CasNum: 'XXX-XXX-XX', PRTR: '対象外', Positive: '対象外', SafetyLaw: '対象'},
        {ComponentCode: index++, ComponentName: '成分C', CasNum: 'AAA-AA-XX', PRTR: '対象外', Positive: '対象', SafetyLaw: '対象'},
        {ComponentCode: index++, ComponentName: '成分D', CasNum: 'YYY-HH-XX', PRTR: '対象外', Positive: '対象', SafetyLaw: '対象'},
      );
    }
    return result;
  }

  searchData() {
    if (!this.baseService.hasError(this.el, this.form)) {
      if (this.gridApi) {
        this.gridApi.setRowData(this.createGridData());
      }
    }
  }

}
