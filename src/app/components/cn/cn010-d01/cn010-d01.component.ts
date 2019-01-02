import { Component, OnInit } from '@angular/core';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { BaseService } from '../../../common/base.service';
import { AppAnimations } from '../../../common/app-animations';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppValidators } from '../../../common/app-validators';

@Component({
  selector: 'app-cn010-d01',
  templateUrl: './cn010-d01.component.html',
  styleUrls: ['./cn010-d01.component.scss'],
  animations: [ AppAnimations.openClose ],
})
export class Cn010D01Component implements OnInit {

  public form: FormGroup;
  infoAreaOpend = true;
  infoAreaOpend2 = true;
  // 商品区分リスト
  public shouhinKbnList = [];
  // グリッド列Api
  private gridColumnApi;
  // フォームを設定する
  public gridOptions: GridOptions;
  // グリッドApi
  public gridApi: GridApi;
  // ロケールテキスト
  public localeText;
  constructor(
    public baseService: BaseService,
    private fb: FormBuilder,
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.rowHeight = 24;
    this.gridOptions.headerHeight = 24;
    this.gridOptions.rowSelection = 'multiple';

    this.gridOptions.defaultColDef = {
      menuTabs: ['filterMenuTab'],
      editable: true
    };
    // enterprise対応：メニュー非表示
    this.gridOptions.suppressContextMenu = true;
    this.gridOptions.columnDefs = this.getGridColumnDefs();
    this.localeText = this.baseService.getGridLocaleText();
    this.gridOptions.popupParent = document.querySelector('body');

    // 商品区分リスト
    this.shouhinKbnList.push(
      // tslint:disable-next-line:max-line-length
      {ShouhinKbn: '1', ShouhinKbnNm: '年契-管理契約'},
      // tslint:disable-next-line:max-line-length
      {ShouhinKbn: '2', ShouhinKbnNm: '年契-作業契約'},
      // tslint:disable-next-line:max-line-length
      {ShouhinKbn: '3', ShouhinKbnNm: 'スポット'},
      // tslint:disable-next-line:max-line-length
      {ShouhinKbn: '4', ShouhinKbnNm: 'スポット(建設工事)'},
      // tslint:disable-next-line:max-line-length
      {ShouhinKbn: '5', ShouhinKbnNm: 'スポット-管理契約'},
      // tslint:disable-next-line:max-line-length
      {ShouhinKbn: '6', ShouhinKbnNm: 'スポット-作業契約'},
      // tslint:disable-next-line:max-line-length
      {ShouhinKbn: '7', ShouhinKbnNm: 'スポット(検査)'},
    );
  }

  /**
   * createForm
   */
  createForm(): void {
    this.form = this.fb.group({
      // 商品区分
      ShouhinKbn: ['1', []],
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData(this.createGridData());
  }

  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '選択',
        checkboxSelection: true,
        suppressMenu: true,
        suppressMovable: true,
        headerCheckboxSelection: true,
        width: 40,
        editable: false,
        suppressToolPanel: true,
      },
      {
        headerName: '見積番号',
        width: 100,
        field: 'MitsumoriNo',
        editable: false
      },
      {
        headerName: '見積書発行日',
        width: 120,
        field: 'HakouBi',
        editable: false
      },
      {
        headerName: 'ステータス',
        width: 100,
        field: 'Kbn',
        editable: false
      },
      {
        headerName: '',
        width: 100,
        field: 'Status',
        editable: false
      },
      {
        headerName: '見積書',
        width: 150,
        field: 'MitsumoriSho',
        editable: false
      },
      {
        headerName: '契約番号',
        width: 120,
        field: 'KeiyakuNo',
        editable: false
      },
      {
        headerName: '代行店',
        width: 220,
        field: 'Daikou',
        editable: false
      },
      {
        headerName: 'デポ',
        width: 100,
        field: 'Depot',
        editable: false
      },
      {
        headerName: '施工先',
        width: 220,
        field: 'SekoSaki',
        editable: false
      },
      {
        headerName: '請求先',
        width: 220,
        field: 'SeikyuSaki',
        editable: false
      },
      {
        headerName: 'ESCO担当者',
        width: 120,
        field: 'Tantou',
        editable: false
      },
      {
        headerName: '商品区分',
        width: 100,
        field: 'ShouhinKbn',
        editable: false
      },
      {
        headerName: '契約型区分',
        width: 160,
        field: 'KeiyakuKbn',
        editable: false
      },
      {
        headerName: '契約開始日',
        width: 120,
        field: 'KeiyakuFrom',
        editable: false
      },
      {
        headerName: '契約終了日',
        width: 120,
        field: 'KeiyakuTo',
        editable: false
      },
      {
        headerName: '見積・契約金額',
        width: 140,
        field: 'KeiyakuKin',
        editable: false,
        cellClass: 'justify-content-md-end',
        cellRenderer: (param) => param.value ? (param.value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : '0'
      },
    ];
  }

  changeInfoArea2() {
    this.infoAreaOpend2 = !this.infoAreaOpend2;
  }

  changeInfoArea() {
    this.infoAreaOpend = !this.infoAreaOpend;
  }

  createGridData(): any[] {
    const result = [];
    result.push(
      // tslint:disable-next-line:max-line-length
      {MitsumoriNo: '12000010', HakouBi: '2017/12/15', Kbn: '見積',  Status: '承認依頼中', MitsumoriSho: '総合環境衛生管理', KeiyakuNo: '00200001-01', Daikou: '〇〇サービス株式会社', Depot: '東京第一', SekoSaki: '○○○工業　○工場', SeikyuSaki: '○Ｘ△工業　管理部', Tantou: '××　太郎', ShouhinKbn: '年契', KeiyakuKbn: 'THC-総合衛星管理', KeiyakuFrom: '2018/01/01', KeiyakuTo: '2018/12/31', KeiyakuKin: '1000000'},
      // tslint:disable-next-line:max-line-length
      {MitsumoriNo: '13000010', HakouBi: '2017/12/15', Kbn: '見積',  Status: '承認済', MitsumoriSho: '総合環境衛生管理', KeiyakuNo: '00200001-01', Daikou: '○○ビルメンテナンス株式会社', Depot: '東京第一', SekoSaki: '△○Ｘ工業　○工場', SeikyuSaki: '○○○食品　管理部', Tantou: '××　太郎', ShouhinKbn: '年契', KeiyakuKbn: 'THC-総合衛星管理', KeiyakuFrom: '2018/01/01', KeiyakuTo: '2018/12/31', KeiyakuKin: '1000000'},
      // tslint:disable-next-line:max-line-length
      {MitsumoriNo: '14000010', HakouBi: '2017/12/11', Kbn: '契約',  Status: '承認依頼中', MitsumoriSho: '総合環境衛生管理', KeiyakuNo: '00200001-01', Daikou: '〇〇サービス株式会社', Depot: '東京第一', SekoSaki: 'ＸＸＸ食品　○工場', SeikyuSaki: '○○△食品　管理部', Tantou: '××　太郎', ShouhinKbn: '年契', KeiyakuKbn: 'THC-総合衛星管理', KeiyakuFrom: '2018/01/01', KeiyakuTo: '2018/12/31', KeiyakuKin: '2000000'},
      // tslint:disable-next-line:max-line-length
      {MitsumoriNo: '15000010', HakouBi: '2017/12/11', Kbn: '見積',  Status: '作成中', MitsumoriSho: '総合環境衛生管理', KeiyakuNo: '00200001-01', Daikou: '○○ビルメンテナンス株式会社', Depot: '東京第一', SekoSaki: '○Ｘ△食品　○工場', SeikyuSaki: '○Ｘ△株式会社　管理部', Tantou: '××　太郎', ShouhinKbn: '年契', KeiyakuKbn: 'THC-総合衛星管理', KeiyakuFrom: '2018/01/01', KeiyakuTo: '2018/12/31', KeiyakuKin: '2000000'},
      // tslint:disable-next-line:max-line-length
      {MitsumoriNo: '16000010', HakouBi: '2017/12/15', Kbn: '契約',  Status: '承認依頼中', MitsumoriSho: '総合環境衛生管理', KeiyakuNo: '00200001-01', Daikou: '○○環境株式会社', Depot: '東京第一', SekoSaki: '○○株式会社　○工場', SeikyuSaki: '○○○株式会社　管理部', Tantou: '××　太郎', ShouhinKbn: '年契', KeiyakuKbn: 'THC-総合衛星管理', KeiyakuFrom: '2018/01/01', KeiyakuTo: '2018/12/31', KeiyakuKin: '3000000'},
      );
    return result;
  }

  // 組織区分Change
  public onShouhinKbnChange($event: any) {

  }

}
