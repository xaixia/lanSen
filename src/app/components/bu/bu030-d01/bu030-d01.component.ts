import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { BaseService } from '../../../common/base.service';
import { AppAnimations } from '../../../common/app-animations';
import { Router, ActivatedRoute } from '@angular/router';
declare let $: any;
@Component({
  selector: 'app-bu030-d01',
  templateUrl: './bu030-d01.component.html',
  styleUrls: ['./bu030-d01.component.scss'],
  animations: [AppAnimations.openClose],
})
export class Bu030D01Component implements OnInit {

  public form: FormGroup;
  // グリッド列Api
  private gridColumnApi;
  // フォームを設定する
  public gridOptions: GridOptions;
  // グリッドApi
  public gridApi: GridApi;
  public opencontraction = true;
  public SearcBtnContent = '検索条件+';
  // ロケールテキスト
  public localeText;
  //入金口座リスト
  public items1 = ['', 'AAAAA', '  BBBB', 'CCCCC', 'DDDD'];
  //請求発行形態リスト
  public items2 = ['', '通常', '電子請求', '専用伝票'];
  //
  public myvalue1 = "テスト会社Y";
  //
  public myvalue2 = "テスト会社Y";
  //
  public myvalue3 = "テスト会社Y";
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
  btninfoclick(path: string) {
    const url = this.router.routerState.snapshot.url;
    if (url !== path) {
      this.baseService.clearAllData();
      this.baseService.navigate(path);
    }
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
    this.gridApi.setRowData([{ destinationcode: '12455', OrderPurpose: '4564', OrderNumber: '○○○会社', Nohinsaki: '87878', DepoNm: 'ぺけぺけ工場', JuchuSum: '○○○会社', JuchuZanSum: 'XXX営業所', CommitInfo: '〇〇会社　Aライン向け', ProductNm: 'XXX-XXXX', ECJuchu: '東京都・・・', JuchuYMD: '東京', Seikyusaki: 'AAAA', TntNm: '通常' },
    // tslint:disable-next-line:max-line-length
    { destinationcode: '12456', OrderPurpose: '4565', OrderNumber: '△△△会社', Nohinsaki: '55154', DepoNm: 'ほげほげ支店', JuchuSum: '△△△会社', JuchuZanSum: 'AAA支店', CommitInfo: '△会社　東日本', ProductNm: 'XXX-XXXX', ECJuchu: '大阪府・・・', JuchuYMD: '大阪', Seikyusaki: 'BBBB', TntNm: '通常' },
    // tslint:disable-next-line:max-line-length
    { destinationcode: '12457', OrderPurpose: '8812', OrderNumber: 'どこそこ会社', Nohinsaki: '98555', DepoNm: '関西営業所', JuchuSum: 'どこそこ会社', JuchuZanSum: 'BBB支店', CommitInfo: 'どこそこ会社　関西', ProductNm: 'XXX-XXXX', ECJuchu: '大阪府・・・', JuchuYMD: '福岡', Seikyusaki: 'CCCC', TntNm: '通常' },
    // tslint:disable-next-line:max-line-length
    { destinationcode: '12458', OrderPurpose: '9899', OrderNumber: 'あっちこっち会社', Nohinsaki: '14252', DepoNm: '西日本事業本部', JuchuSum: 'あっちこっち会社', JuchuZanSum: 'CCC支店', CommitInfo: 'あっち会社　西日本', ProductNm: 'XXX-XXXX', ECJuchu: '北海道・・・', JuchuYMD: '福岡', Seikyusaki: 'DDDD', TntNm: '通常' },
    // tslint:disable-next-line:max-line-length
    { destinationcode: '12459', OrderPurpose: '4568', OrderNumber: '□□□会社', Nohinsaki: '33654', DepoNm: 'まるまる営業所', JuchuSum: '□□□会社', JuchuZanSum: '123事業所', CommitInfo: 'あっち会社　西日本', ProductNm: 'XXX-XXXX', ECJuchu: '東京都・・・', JuchuYMD: '東京', Seikyusaki: 'EEEE', TntNm: '専用伝票' },]);
  }

  createGridData(): any[] {
    const result = [];
    for (let i = 0; i < 30; i++) {
      result.push(
        // tslint:disable-next-line:max-line-length
        { destinationcode: '12455', OrderPurpose: '4564', OrderNumber: '○○○会社', Nohinsaki: '87878', DepoNm: 'ぺけぺけ工場', JuchuSum: '○○○会社', JuchuZanSum: 'XXX営業所', CommitInfo: '〇〇会社　Aライン向け', ProductNm: 'XXX-XXXX', ECJuchu: '東京都・・・', JuchuYMD: '東京', Seikyusaki: 'AAAA', TntNm: '通常' },
        // tslint:disable-next-line:max-line-length
        { destinationcode: '12456', OrderPurpose: '4565', OrderNumber: '△△△会社', Nohinsaki: '55154', DepoNm: 'ほげほげ支店', JuchuSum: '△△△会社', JuchuZanSum: 'AAA支店', CommitInfo: '△会社　東日本', ProductNm: 'XXX-XXXX', ECJuchu: '大阪府・・・', JuchuYMD: '大阪', Seikyusaki: 'BBBB', TntNm: '通常' },
        // tslint:disable-next-line:max-line-length
        { destinationcode: '12457', OrderPurpose: '8812', OrderNumber: 'どこそこ会社', Nohinsaki: '98555', DepoNm: '関西営業所', JuchuSum: 'どこそこ会社', JuchuZanSum: 'BBB支店', CommitInfo: 'どこそこ会社　関西', ProductNm: 'XXX-XXXX', ECJuchu: '大阪府・・・', JuchuYMD: '福岡', Seikyusaki: 'CCCC', TntNm: '通常' },
        // tslint:disable-next-line:max-line-length
        { destinationcode: '12458', OrderPurpose: '9899', OrderNumber: 'あっちこっち会社', Nohinsaki: '14252', DepoNm: '西日本事業本部', JuchuSum: 'あっちこっち会社', JuchuZanSum: 'CCC支店', CommitInfo: 'あっち会社　西日本', ProductNm: 'XXX-XXXX', ECJuchu: '北海道・・・', JuchuYMD: '福岡', Seikyusaki: 'DDDD', TntNm: '通常' },
        // tslint:disable-next-line:max-line-length
        { destinationcode: '12459', OrderPurpose: '4568', OrderNumber: '□□□会社', Nohinsaki: '33654', DepoNm: 'まるまる営業所', JuchuSum: '□□□会社', JuchuZanSum: '123事業所', CommitInfo: 'あっち会社　西日本', ProductNm: 'XXX-XXXX', ECJuchu: '東京都・・・', JuchuYMD: '東京', Seikyusaki: 'EEEE', TntNm: '専用伝票' },
      );
    }
    return result;
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '送付先コード',
        width: 70,
        pinned: 'left',
        field: 'destinationcode',
        cellRenderer: (params) => {
          return `<a href='./BU030D02'>${params.value}</a>`;
        },
      },
      {
        headerName: '作成元会社コード',
        width: 120,
        field: 'OrderPurpose',
        pinned: 'left',
      },
      {
        headerName: '作成元会社名',
        width: 120,
        field: 'OrderNumber',
      },
      {
        headerName: '作成元取引先コード',
        width: 150,
        field: 'Nohinsaki',
      },
      {
        headerName: '作成元取引先名',
        width: 150,
        field: 'DepoNm',
      },
      {
        headerName: '送付先会社名',
        width: 120,
        field: 'JuchuSum',
      },
      {
        headerName: '送付先取引先名',
        width: 150,
        field: 'JuchuZanSum',
      },
      {
        headerName: '請求書送付先略称',
        width: 150,
        field: 'CommitInfo',
      },
      {
        headerName: '郵便番号',
        width: 120,
        field: 'ProductNm',
      },
      {
        headerName: '住所１',
        width: 150,
        field: 'ECJuchu',
      },
      {
        headerName: '請求管轄組織',
        width: 120,
        field: 'JuchuYMD',
      },
      {
        headerName: '入金口座',
        width: 120,
        field: 'Seikyusaki',
      },
      {
        headerName: '請求発行形態',
        width: 120,
        field: 'TntNm',
      },
    ];
  }
  searchData() {

    this.gridApi.setRowData(this.createGridData());

  }
}

