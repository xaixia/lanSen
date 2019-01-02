import { Component, OnInit, ElementRef } from '@angular/core';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../common/base.service';

@Component({
  selector: 'app-cn010-d19',
  templateUrl: './cn010-d19.component.html',
  styleUrls: ['./cn010-d19.component.scss']
})
export class Cn010D19Component implements OnInit {

  public form: FormGroup;

  // グリッド列Api
  private gridColumnApi;
  // フォームを設定する
  public gridOptions: GridOptions;
  public gridOptions1: GridOptions;
  public gridOptionsTwo: GridOptions;
  public gridOptionsTwo1: GridOptions;
  public gridOptionsTwo2: GridOptions;
  public gridOptionsTwo3: GridOptions;
  public gridOptionsTwo4: GridOptions;
  public gridOptionsTwo5: GridOptions;
  public gridHiddenNum = 0;
  // グリッドApi
  public gridApi: GridApi;
  // ロケールテキスト
  public localeText;
  public isGetOne = false;
  public isGetTwo = false;
  public style = {
    width: '100%',
    height: '100%',
  };

  constructor(
    private route: ActivatedRoute,
    public baseService: BaseService,
    private fb: FormBuilder,
    private el: ElementRef
  ) {
    this.createForm();
  }

  /**
   * createForm
   */
  createForm(): void {
    this.form = this.fb.group({

    });
  }
  onBtnClick(param: number) {
    this.gridHiddenNum = param;
  }
  ngOnInit() {
    // 代行店変更
    this.gridOptions = <GridOptions>{};
    this.gridOptions.rowHeight = 24;
    this.gridOptions.headerHeight = 24;
    this.gridOptions.animateRows = true;

    this.gridOptions.rowSelection = 'multiple';

    this.gridOptions.defaultColDef = {
      menuTabs: ['filterMenuTab'],
      editable: true
    };
    this.gridOptions.popupParent = document.querySelector('body');
    // enterprise対応：メニュー非表示
    this.gridOptions.suppressContextMenu = true;
    this.gridOptions.columnDefs = this.getGridColumnDefs();
    this.localeText = this.baseService.getGridLocaleText();

    // 代行店変更1
    this.gridOptions1 = <GridOptions>{};
    this.gridOptions1.rowHeight = 24;
    this.gridOptions1.headerHeight = 24;
    this.gridOptions1.animateRows = true;

    this.gridOptions1.rowSelection = 'multiple';

    this.gridOptions1.defaultColDef = {
      menuTabs: ['filterMenuTab'],
      editable: true
    };
    this.gridOptions1.popupParent = document.querySelector('body');
    // enterprise対応：メニュー非表示
    this.gridOptions1.suppressContextMenu = true;
    this.gridOptions1.columnDefs = this.getGridColumnDefs1();
    this.localeText = this.baseService.getGridLocaleText();

    // 工程担当変更
    this.gridOptionsTwo = <GridOptions>{};
    this.gridOptionsTwo.rowHeight = 24;
    this.gridOptionsTwo.headerHeight = 24;
    this.gridOptionsTwo.animateRows = true;

    this.gridOptionsTwo.rowSelection = 'multiple';

    this.gridOptionsTwo.defaultColDef = {
      menuTabs: ['filterMenuTab'],
      editable: true
    };
    this.gridOptionsTwo.popupParent = document.querySelector('body');
    // enterprise対応：メニュー非表示
    this.gridOptionsTwo.suppressContextMenu = true;
    this.gridOptionsTwo.columnDefs = this.getGridColumnDefsTwo();
    this.localeText = this.baseService.getGridLocaleText();

    // 工程担当変更1
    this.gridOptionsTwo1 = <GridOptions>{};
    this.gridOptionsTwo1.rowHeight = 24;
    this.gridOptionsTwo1.headerHeight = 24;
    this.gridOptionsTwo1.animateRows = true;

    this.gridOptionsTwo1.rowSelection = 'multiple';

    this.gridOptionsTwo1.defaultColDef = {
      menuTabs: ['filterMenuTab'],
      editable: true
    };
    this.gridOptionsTwo1.popupParent = document.querySelector('body');
    // enterprise対応：メニュー非表示
    this.gridOptionsTwo1.suppressContextMenu = true;
    this.gridOptionsTwo1.columnDefs = this.getGridColumnDefsTwo1();
    this.localeText = this.baseService.getGridLocaleText();

    // 工程担当変更2
    this.gridOptionsTwo2 = <GridOptions>{};
    this.gridOptionsTwo2.rowHeight = 24;
    this.gridOptionsTwo2.headerHeight = 24;
    this.gridOptionsTwo2.animateRows = true;

    this.gridOptionsTwo2.rowSelection = 'multiple';

    this.gridOptionsTwo2.defaultColDef = {
      menuTabs: ['filterMenuTab'],
      editable: true
    };
    this.gridOptionsTwo2.popupParent = document.querySelector('body');
    // enterprise対応：メニュー非表示
    this.gridOptionsTwo2.suppressContextMenu = true;
    this.gridOptionsTwo2.columnDefs = this.getGridColumnDefsTwo2();
    this.localeText = this.baseService.getGridLocaleText();

    // 工程担当変更3
    this.gridOptionsTwo3 = <GridOptions>{};
    this.gridOptionsTwo3.rowHeight = 24;
    this.gridOptionsTwo3.headerHeight = 24;
    this.gridOptionsTwo3.animateRows = true;

    this.gridOptionsTwo3.rowSelection = 'multiple';

    this.gridOptionsTwo3.defaultColDef = {
      menuTabs: ['filterMenuTab'],
      editable: true
    };
    this.gridOptionsTwo3.popupParent = document.querySelector('body');
    // enterprise対応：メニュー非表示
    this.gridOptionsTwo3.suppressContextMenu = true;
    this.gridOptionsTwo3.columnDefs = this.getGridColumnDefsTwo3();
    this.localeText = this.baseService.getGridLocaleText();

    // 工程担当変4
    this.gridOptionsTwo4 = <GridOptions>{};
    this.gridOptionsTwo4.rowHeight = 24;
    this.gridOptionsTwo4.headerHeight = 24;
    this.gridOptionsTwo4.animateRows = true;

    this.gridOptionsTwo4.rowSelection = 'multiple';

    this.gridOptionsTwo4.defaultColDef = {
      menuTabs: ['filterMenuTab'],
      editable: true
    };
    this.gridOptionsTwo4.popupParent = document.querySelector('body');
    // enterprise対応：メニュー非表示
    this.gridOptionsTwo4.suppressContextMenu = true;
    this.gridOptionsTwo4.columnDefs = this.getGridColumnDefsTwo4();
    this.localeText = this.baseService.getGridLocaleText();

    // 工程担当変5
    this.gridOptionsTwo5 = <GridOptions>{};
    this.gridOptionsTwo5.rowHeight = 24;
    this.gridOptionsTwo5.headerHeight = 24;
    this.gridOptionsTwo5.animateRows = true;

    this.gridOptionsTwo5.rowSelection = 'multiple';

    this.gridOptionsTwo5.defaultColDef = {
      menuTabs: ['filterMenuTab'],
      editable: true
    };
    this.gridOptionsTwo5.popupParent = document.querySelector('body');
    // enterprise対応：メニュー非表示
    this.gridOptionsTwo5.suppressContextMenu = true;
    this.gridOptionsTwo5.columnDefs = this.getGridColumnDefsTwo5();
    this.localeText = this.baseService.getGridLocaleText();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData([]);
    this.gridApi.setRowData(this.createGridData());
  }
  onGridReady1(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData([]);
    this.gridApi.setRowData(this.createGridData());
  }
  onGridReady2(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData([]);
    this.gridApi.setRowData(this.createGridDataTwo());
  }
  onGridReady3(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData([]);
    this.gridApi.setRowData(this.createGridDataTwo());
  }
  onGridReady4(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData([]);
    this.gridApi.setRowData(this.createGridDataTwo2());
  }
  onGridReady5(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData([]);
    this.gridApi.setRowData(this.createGridDataTwo2());
  }

  onGridReady6(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData([]);
    this.gridApi.setRowData(this.createGridDataTwo4());
  }
  onGridReady7(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData([]);
    this.gridApi.setRowData(this.createGridDataTwo4());
  }
  createGridData(): any[] {
    const result = [];
    result.push(
      // tslint:disable-next-line:max-line-length
      { Esco: 'A社', Name: '○○サービス', Sum1: '0', Sum2: '100,000', Sum3: '120,000', Form: '2017/10/1', To: '2018/9/30', Sum4: '120,000', Form2: '2017/10/1', To2: '2018/9/30', End: '' },
      { Esco: '', Name: '', Sum1: '', Sum2: '', Sum3: '', Form: '', To: '', Sum4: '', Form2: '', To2: '', End: '' },
    );
    return result;
  }

  createGridDataTwo(): any[] {
    const result = [];
    result.push(
      // tslint:disable-next-line:max-line-length
      { Esco: 'A社', Name: '○○サービス', Sum1: '0', Sum2: '150,000', Sum3: '132,000', Form: '2017/10/1', To: '2018/9/30', Sum4: '132,000', Form2: '2017/10/1', To2: '2018/9/30', End: '' },
      // tslint:disable-next-line:max-line-length
      { Esco: 'B社', Name: '○○ビルメンテ', Sum1: '0', Sum2: '110,000', Sum3: '120,000', Form: '2017/10/1', To: '2018/9/30', Sum4: '120,000', Form2: '2017/10/1', To2: '2018/9/30', End: '' },
      // tslint:disable-next-line:max-line-length
      { Esco: 'C社', Name: '', Sum1: '', Sum2: '', Sum3: '', Form: '2017/10/1', To: '2018/9/30', Sum4: '', Form2: '', To2: '', End: '' },
    );
    return result;
  }

  createGridDataTwo2(): any[] {
    const result = [];
    result.push(
      { Esco: '飛翔昆虫モニタリング（30pt.まで）', Name: 'トラップ設置・回収', Sum1: '代行店A', Sum2: '○○サービス', Sum3: '代行店A', Sum4: '○○サービス', Form: '' },
      { Esco: '', Name: '報告書提出', Sum1: '自社', Sum2: '自社' , Sum3: '自社', Sum4: '自社', Form: ''},
      { Esco: '歩行昆虫モニタリング（30pt.まで）', Name: 'トラップ設置・回収', Sum1: '代行店B', Sum2: '○○ビルメンテ' , Sum3: '代行店B', Sum4: '○○ビルメンテ', Form: '' },
      { Esco: '', Name: '報告書提出', Sum1: '自社', Sum2: '自社' , Sum3: '自社', Sum4: '自社', Form: ''},
    );
    return result;
  }

  createGridDataTwo4(): any[] {
    const result = [];
    result.push(
      // tslint:disable-next-line:max-line-length
      { a: '2017/10', b: '100,000', c: '', d: '●', e: '50,000', f: '100,000', g: '' , h: '●', i: '10,000', j: '', k: '●', l: '3,000', m: '', n: '●' },
      // tslint:disable-next-line:max-line-length
      { a: '2017/11', b: '100,000', c: '', d: '●', e: '50,000', f: '100,000', g: '' , h: '●', i: '10,000', j: '', k: '●', l: '3,000', m: '', n: '●' },
      // tslint:disable-next-line:max-line-length
      { a: '2017/12', b: '100,000', c: '', d: '●', e: '50,000', f: '100,000', g: '' , h: '●', i: '10,000', j: '', k: '●' , l: '3,000', m: '', n: '●'},
      // tslint:disable-next-line:max-line-length
      { a: '2018/01', b: '100,000', c: '●', d: '●', e: '50,000', f: '100,000', g: '' , h: '△', i: '10,000', j: '●', k: '●', l: '3,000', m: '●', n: '●' },
      // tslint:disable-next-line:max-line-length
      { a: '2018/02', b: '100,000', c: '', d: '●', e: '50,000', f: '100,000', g: '●' , h: '', i: '10,000', j: '●', k: '', l: '3,000', m: '●', n: '' },
      // tslint:disable-next-line:max-line-length
      { a: '2018/03', b: '100,000', c: '', d: '', e: '50,000', f: '100,000', g: '' , h: '', i: '10,000', j: '', k: '' , l: '3,000', m: '', n: ''},
      // tslint:disable-next-line:max-line-length
      { a: '2018/04', b: '100,000', c: '', d: '', e: '50,000', f: '100,000', g: '' , h: '', i: '10,000', j: '', k: '' , l: '3,000', m: '', n: ''},
      // tslint:disable-next-line:max-line-length
      { a: '2018/05', b: '100,000', c: '', d: '', e: '50,000', f: '100,000', g: '' , h: '', i: '10,000', j: '', k: '' , l: '3,000', m: '', n: ''},
      // tslint:disable-next-line:max-line-length
      { a: '2018/06', b: '100,000', c: '', d: '', e: '50,000', f: '100,000', g: '' , h: '', i: '10,000', j: '', k: '' , l: '3,000', m: '', n: ''},
      // tslint:disable-next-line:max-line-length
      { a: '2018/07', b: '100,000', c: '', d: '', e: '50,000', f: '100,000', g: '' , h: '', i: '10,000', j: '', k: '' , l: '3,000', m: '', n: ''},
      // tslint:disable-next-line:max-line-length
      { a: '2018/08', b: '100,000', c: '', d: '', e: '50,000', f: '100,000', g: '' , h: '', i: '10,000', j: '', k: '' , l: '3,000', m: '', n: ''},
      // tslint:disable-next-line:max-line-length
      { a: '2018/09', b: '100,000', c: '', d: '', e: '50,000', f: '100,000', g: '' , h: '', i: '10,000', j: '', k: '' , l: '3,000', m: '', n: ''},
      // tslint:disable-next-line:max-line-length
      { a: '合計金額', b: '1,200,000', c: '', d: '', e: '600,000', f: '1,200,000', g: '' , h: '', i: '280,000', j: '', k: '' , l: '36，000', m: '', n: ''},
    );
    return result;
  }

  // 代行店変更
  getGridColumnDefs(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: 'ESCO',
        children: [
          {
            headerName: '',
            field: 'Esco',
            suppressMenu: true,
            suppressSorting: true,
            width: 60,
          },
          {
            headerName: '代行店',
            field: 'Name',
            suppressMenu: true,
            suppressSorting: true,
            width: 120,
          },
          {
            headerName: '標準原価合計',
            field: 'Sum1',
            suppressMenu: true,
            suppressSorting: true,
            width: 115,
          },
          {
            headerName: '代行店見積金額',
            field: 'Sum2',
            suppressMenu: true,
            suppressSorting: true,
            width: 125,
          },
          {
            headerName: '代行店見積金額',
            field: 'Sum3',
            suppressMenu: true,
            suppressSorting: true,
            width: 125,
          },
          {
            headerName: '代行店委託期間',
            field: 'Form',
            suppressMenu: true,
            suppressSorting: true,
            width: 125,
          },
          {
            headerName: '',
            field: 'To',
            suppressMenu: true,
            suppressSorting: true,
            width: 100,
          },
        ],
        suppressMenu: true,
        suppressSorting: true,
      },
    ];
  }
  // 代行店変更1
  getGridColumnDefs1(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '工程担当変更後',
        children: [
          {
            headerName: '代行店契約金額',
            field: 'Sum4',
            suppressMenu: true,
            suppressSorting: true,
            width: 130,
          },
          {
            headerName: '代行店委託期間',
            field: 'Form2',
            suppressMenu: true,
            suppressSorting: true,
            width: 130,
          },
          {
            headerName: '',
            field: 'To2',
            suppressMenu: true,
            suppressSorting: true,
            width: 120,
          },
          {
            headerName: '承認状況',
            field: 'End',
            suppressMenu: true,
            suppressSorting: true,
            width: 110,
          }
        ]
      }
    ];
  }

  // 工程担当変更
  getGridColumnDefsTwo(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: 'ESCO',
        children: [
          {
            headerName: '',
            field: 'Esco',
            suppressMenu: true,
            suppressSorting: true,
            width: 60,
          },
          {
            headerName: '代行店',
            field: 'Name',
            suppressMenu: true,
            suppressSorting: true,
            width: 120,
          },
          {
            headerName: '標準原価合計',
            field: 'Sum1',
            suppressMenu: true,
            suppressSorting: true,
            width: 120,
          },
          {
            headerName: '代行店見積金額',
            field: 'Sum2',
            suppressMenu: true,
            suppressSorting: true,
            width: 130,
          },
          {
            headerName: '代行店見積金額',
            field: 'Sum3',
            suppressMenu: true,
            suppressSorting: true,
            width: 130,
          },
          {
            headerName: '代行店委託期間',
            field: 'Form',
            suppressMenu: true,
            suppressSorting: true,
            width: 130,
          },
          {
            headerName: '',
            field: 'To',
            suppressMenu: true,
            suppressSorting: true,
            width: 100,
          },
        ],
        suppressMenu: true,
        suppressSorting: true,
      },
    ];
  }

  // 工程担当変更1
  getGridColumnDefsTwo1(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '工程担当変更後',
        children: [
          {
            headerName: '代行店契約金額',
            field: 'Sum4',
            suppressMenu: true,
            suppressSorting: true,
            width: 130,
          },
          {
            headerName: '代行店委託期間',
            field: 'Form2',
            suppressMenu: true,
            suppressSorting: true,
            width: 130,
          },
          {
            headerName: '',
            field: 'To2',
            suppressMenu: true,
            suppressSorting: true,
            width: 120,
          },
          {
            headerName: '承認状況',
            field: 'End',
            suppressMenu: true,
            suppressSorting: true,
            width: 110,
          }
        ]
      }
    ];
  }

  // 工程担当変更2
  getGridColumnDefsTwo2(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '作業',
        field: 'Esco',
        suppressMenu: true,
        suppressSorting: true,
        width: 240,
      },
      {
        headerName: '工程',
        field: 'Name',
        suppressMenu: true,
        suppressSorting: true,
        width: 200,
      },
      {
        headerName: '現担当',
        field: 'Sum1',
        suppressMenu: true,
        suppressSorting: true,
        width: 150,
      },
      {
        headerName: '',
        field: 'Sum2',
        suppressMenu: true,
        suppressSorting: true,
        width: 190,
      },
    ];
  }

  // 工程担当変更3
  getGridColumnDefsTwo3(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '新担当',
        field: 'Sum3',
        suppressMenu: true,
        suppressSorting: true,
        width: 140,
      },
      {
        headerName: '',
        field: 'Sum4',
        suppressMenu: true,
        suppressSorting: true,
        width: 160,
      },
      {
        headerName: '年月',
        field: 'Form',
        suppressMenu: true,
        suppressSorting: true,
        width: 190,
      },
    ];
  }

  // 工程担当変更4
  getGridColumnDefsTwo4(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '',
        children: [
          {
            headerName: '契約年月',
            field: 'a',
            suppressMenu: true,
            suppressSorting: true,
            width: 100,
          },
        ]
      },
      {
        headerName: '売上',
        children: [
          {
            headerName: '売上金額',
            field: 'b',
            suppressMenu: true,
            suppressSorting: true,
            width: 110,
          },
          {
            headerName: '訂正分',
            field: 'c',
            suppressMenu: true,
            suppressSorting: true,
            width: 80,
          },
          {
            headerName: '計上済',
            field: 'd',
            suppressMenu: true,
            suppressSorting: true,
            width: 80,
          },
        ]
      },
      {
        headerName: '原価',
        children: [
          {
            headerName: '原価金額',
            field: 'e',
            suppressMenu: true,
            suppressSorting: true,
            width: 110,
          },
        ]
      },
      {
        headerName: '請求',
        children: [
          {
            headerName: '請求金額',
            field: 'f',
            suppressMenu: true,
            suppressSorting: true,
            width: 110,
          },
          {
            headerName: '訂正分',
            field: 'g',
            suppressMenu: true,
            suppressSorting: true,
            width: 80,
          },
          {
            headerName: '処理済',
            field: 'h',
            suppressMenu: true,
            suppressSorting: true,
            width: 80,
          },
        ]
      },
      {
        headerName: '支払',
        children: [
          {
            headerName: '支払金額',
            field: 'i',
            suppressMenu: true,
            suppressSorting: true,
            width: 110,
          },
          {
            headerName: '訂正分',
            field: 'j',
            suppressMenu: true,
            suppressSorting: true,
            width: 80,
          },
          {
            headerName: '計上済',
            field: 'k',
            suppressMenu: true,
            suppressSorting: true,
            width: 80,
          },
        ]
      },
    ];
  }

  // 工程担当変更5
  getGridColumnDefsTwo5(): (ColDef | ColGroupDef)[] {
    return [
      {
        headerName: '紹介料支払',
        children: [
          {
            headerName: '支払金額',
            field: 'l',
            suppressMenu: true,
            suppressSorting: true,
            width: 100,
          },
          {
            headerName: '訂正分',
            field: 'm',
            suppressMenu: true,
            suppressSorting: true,
            width: 80,
          },
          {
            headerName: '計上済',
            field: 'n',
            suppressMenu: true,
            suppressSorting: true,
            width: 80,
          },
        ]
      }
    ];
  }

}
