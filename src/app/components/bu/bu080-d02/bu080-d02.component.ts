import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../common/base.service';
import { AppValidators } from '../../../common/app-validators';
import { AppAnimations } from '../../../common/app-animations';
declare let $: any;

@Component({
  selector: 'app-bu080-d02',
  templateUrl: './bu080-d02.component.html',
  styleUrls: ['./bu080-d02.component.scss'],
  animations: [AppAnimations.openClose],
})
export class Bu080D02Component implements OnInit {
  public form: FormGroup;


  searchFormOpend = true;
  infoAreaOpend = true;
  infoAreaOpend2 = true;
  infoAreaOpend3 = true;
  infoAreaOpend4 = true;
  infoAreaOpend5 = true;

  4 = true;
  // 受注目的
  public opencontraction = true;
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
      menuTabs: ['filterMenuTab'],
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
      // 受注年月日From
      OrderYmdFrom: [null, [AppValidators.required('E0005', '受注年月日From')]],
      // 受注年月日To
      OrderYmdTo: [null, []],
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData(this.createGridData());
  }

  createGridData(): any[] {
    const result = [];
    let index = 100001;
    for (let i = 0; i < 30; i++) {
      result.push(
        // tslint:disable-next-line:max-line-length
        { OrderNumber: '2017/09/30', OrderPurpose: 1111, ECJuchu: '○○商事', JuchuYMD: '20,000', Nohinsaki: '東京支店' },
        // tslint:disable-next-line:max-line-length
        { OrderNumber: '2017/09/30', OrderPurpose: 1111, ECJuchu: '××商事', JuchuYMD: '20,000', Nohinsaki: '東京支店' },
        // tslint:disable-next-line:max-line-length
        { OrderNumber: '2017/09/30', OrderPurpose: 2222, ECJuchu: '△△商社', JuchuYMD: '30,000', Nohinsaki: '東京支店' },
        // tslint:disable-next-line:max-line-length
        { OrderNumber: '2017/09/30', OrderPurpose: 3333, ECJuchu: '○○商社', JuchuYMD: '20,000', Nohinsaki: '大阪支店' },
        // tslint:disable-next-line:max-line-length
        { OrderNumber: '2017/09/30', OrderPurpose: 4444, ECJuchu: '○○産業', JuchuYMD: '10,000', Nohinsaki: '名古屋支店' },
        // tslint:disable-next-line:max-line-length
      );
    }
    return result;
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '支払日',
        width: 100,
        field: 'OrderNumber',
        suppressMenu: true,
        pinned: 'left',
        editable: false
      },
      {
        headerName: '紹介元コード',
        suppressMenu: true,
        width: 100,
        field: 'OrderPurpose',
      },
      {
        headerName: '紹介元',
        suppressMenu: true,
        width: 130,
        field: 'ECJuchu',
      },
      {
        headerName: '紹介料',
        suppressMenu: true,
        width: 130,
        field: 'JuchuYMD',
      },
      {
        headerName: '管轄支店名',
        suppressMenu: true,
        width: 130,
        field: 'Nohinsaki',
      },

      {
        headerName: '',
        width: 120,
        suppressFilter: false,
        suppressMenu: true,
        suppressMovable: true,
        suppressSorting: false,
        cellClass: 'justify-content-md-center',
        editable: false,
        cellRenderer: (param) => {
          const root = $('<div/>');
          // tslint:disable-next-line:max-line-length
          const eidtInforBtn = $('<div ><button class=\'btn btn-primary\' type=\'button\'><i class=\'fa fa-info-circle\'></i> 明細一覧</button></div>');
          eidtInforBtn.click(() => {
          });
          root.append(eidtInforBtn);
          return root[0];
        },
        suppressToolPanel: true,
      },
    ];
  }

  changeSearchForm() {
    this.searchFormOpend = !this.searchFormOpend;
  }

  changeInfoArea() {
    this.infoAreaOpend = !this.infoAreaOpend;
  }
  changeInfoArea2() {
    this.infoAreaOpend2 = !this.infoAreaOpend2;
  }
  changeInfoArea3() {
    this.infoAreaOpend3 = !this.infoAreaOpend3;
  }
  changeInfoArea4() {
    this.infoAreaOpend4 = !this.infoAreaOpend4;
  }
  changeInfoArea5() {
    this.infoAreaOpend5 = !this.infoAreaOpend5;
  }

}
