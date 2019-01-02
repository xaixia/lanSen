import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../common/base.service';
import { AppAnimations } from '../../../common/app-animations';
@Component({
  selector: 'app-bu020-d04',
  templateUrl: './bu020-d04.component.html',
  styleUrls: ['./bu020-d04.component.scss'],
  animations: [AppAnimations.openClose],
})
export class Bu020D04Component implements OnInit {
  public form: FormGroup;
  // グリッド列Api
  private gridColumnApi;
  // フォームを設定する
  public gridOptions: GridOptions;
  // グリッドApi
  public gridApi: GridApi;
  public opencontraction = true;
  public SearcBtnContent = '検索条件+';
  public ChangeBikoKbnList = [{ Kbn: '1', KbnVal: '会社', ValidFlg: 0 }, { Kbn: '2', KbnVal: '取引先', ValidFlg: 1 }];
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
    private router: Router,
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
      editable: false,
    };
    this.gridOptions.popupParent = document.querySelector('body');
    // enterprise対応：メニュー非表示
    this.gridOptions.suppressContextMenu = true;
    this.gridOptions.columnDefs = this.getGridColumnDefs();
    this.localeText = this.baseService.getGridLocaleText();
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
  rowDoubleClickedEvent(path: string, param?: any) {
    const url = this.router.routerState.snapshot.url;
    if (url !== path) {
      this.baseService.clearAllData();
      this.baseService.navigate(path, param);
    }
  }
  createGridData(): any[] {
    const result = [];
    for (let i = 0; i < 30; i++) {
      result.push(
        // tslint:disable-next-line:max-line-length
        { companylbc: '1212', companyname: '△△建設', customerlbc: '0202', customername: 'どこそこ支店' },
        // tslint:disable-next-line:max-line-length
        { companylbc: '1212', companyname: '△△建設', customerlbc: '0203', customername: 'あっち支店', },
        // tslint:disable-next-line:max-line-length
        { companylbc: '1214', companyname: '○○管理', customerlbc: '2200', customername: 'なんとか事業部', },
        // tslint:disable-next-line:max-line-length
        { companylbc: '1215', companyname: '☆☆工場', customerlbc: '2300', customername: '第一課', },
      );
    }
    return result;
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '会社LBC',
        width: 120,
        field: 'companylbc',
        pinned: 'left',
      },
      {
        headerName: '会社名',
        width: 120,
        field: 'companyname',
      },
      {
        headerName: '取引先LBC',
        width: 120,
        field: 'customerlbc',
      },
      {
        headerName: '取引先名',
        width: 150,
        field: 'customername',
      },
    ];
  }
  searchData() {

    this.gridApi.setRowData(this.createGridData());

  }
}
