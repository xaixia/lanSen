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
  selector: 'app-gm030-d01',
  templateUrl: './gm030-d01.component.html',
  styleUrls: ['./gm030-d01.component.scss'],
  animations: [ AppAnimations.openClose ],
})
export class Gm030D01Component implements OnInit {
  public form: FormGroup;
  // 受注目的
  newCount = 1;
  searchFormOpend = true;
  infoAreaOpend = true;
  @ViewChild('conditonPanel')
  public conditonPanel: ElementRef;
  @ViewChild('searchArea')
  searchArea: ElementRef;
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
  }

  /**
   * createForm
   */
  createForm(): void {
    this.form = this.fb.group({
    });
  }

}
