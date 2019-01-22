import { Injectable, Inject, ElementRef } from '@angular/core';
import { Headers, Http, ResponseContentType } from '@angular/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate, NavigationExtras } from '@angular/router';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Location } from '@angular/common';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

import { ToastsManager } from 'ng2-toastr';

declare const $: any;

import 'rxjs/add/operator/toPromise';

import { MESSAGE_UTIL } from '../configuration/message.config';
import { PageData } from './page-data';
import { CustomToastOptions } from './custom-toast-options';
import toFormData, { Iterator } from './to-form-data';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../environments/environment';
import { GridApi, ColumnApi } from 'ag-grid-community';
import { isFunction, isNullOrUndefined } from 'util';
import { BsModalService } from 'ngx-bootstrap';
import { CodeConstant } from './code-constant';
import { AppLocales } from '../configuration/app-locales';
import { AppModalConfig, AppModalResult, ModalDirective } from './modal.directive';

const STORAGE_KEY_PAGE = 'STORAGE_KEY_PAGE';
const STORAGE_KEY_NAVIGATE = 'STORAGE_KEY_NAVIGATE';
@Injectable()
export class BaseService {

  // server URL
  private server_url: string = environment.server;

  // HTTP  header
  private headers = new Headers();

  // 页面跳转数据
  private navigateData: PageData;

  // 页面data
  private pageData: PageData;

  private spinnerCnt = 0;

  public loginFunc: ((noRouter?: boolean) => Promise<boolean>);

  public reflashUserInfoFunc: (() => void);

  public showConfirm: ((state: {
    title?: string,
    message?: string,
    messages?: string[],
    buttons?: { name: string, css?: string }[],
  }) => Promise<number | null>);

  constructor(
    private http: Http,
    public toastr: ToastsManager,
    private router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    public location: Location,
    private spinnerService: Ng4LoadingSpinnerService,
    private modalService: BsModalService,
    private appLocales: AppLocales,
  ) {
    this.navigateData = new PageData(STORAGE_KEY_NAVIGATE, storage);
    this.pageData = new PageData(STORAGE_KEY_PAGE, storage);
  }

  back(): void {
    this.toastr.clearAllToasts();
    this.location.back();
  }

  public isHistory(): boolean {
    const lg: Number = window.history.length - 1;
    return lg > 0;
  }

  complete(path: string): void {
    this.location.replaceState(path);
    this.toastr.clearAllToasts();
    this.navigate(path);
  }

  navigate(path: string, data?: any): void {
    const navData = data || {};
    this.navigateData.set(path, navData);
    this.toastr.clearAllToasts();
    this.router.navigate([path]);
  }

  getNavigateData(): any {
    const url = this.router.routerState.snapshot.url;
    return this.navigateData.get(url);
  }

  setPageData(data: any, extend: boolean = false): void {
    const url = this.router.routerState.snapshot.url;
    let pageData = data || {};
    if (extend) {
      pageData = Object.assign(this.pageData.get(url), pageData);
    }
    this.pageData.set(url, pageData);
  }

  clearPageData() {
    const url = this.router.routerState.snapshot.url;
    this.pageData.remove(url);
  }

  clearNavigateData() {
    const url = this.router.routerState.snapshot.url;
    this.navigateData.remove(url);
  }

  getPageData(): any {
    const url = this.router.routerState.snapshot.url;
    return this.pageData.get(url);
  }

  hasPageData(): boolean {
    const pageData = this.getPageData();
    return pageData != null && typeof (pageData) !== undefined;
  }

  saveData(): void {
    this.navigateData.saveToSessionStorage();
    this.pageData.saveToSessionStorage();
  }

  public getKarteUrl(url): string {
    let origin = location.origin;
    if (environment.production) {
      origin = origin + location.pathname.substring(0, location.pathname.indexOf('/', 1));
    }
    return origin + url;
  }

  public WindowsOpen(url) {
    window.open(this.getKarteUrl(url));
  }

  clearAllData(): void {
    this.navigateData.clear();
    this.pageData.clear();
  }

  getGridState(gridApi: GridApi, gridColumnApi: ColumnApi): any {
    return {
      currentPage: gridApi.paginationGetCurrentPage(),
      columnState: gridColumnApi.getColumnState(),
      filterModel: gridApi.getFilterModel(),
      sortModel: gridApi.getSortModel(),
      paginationPageSize: gridApi.paginationGetPageSize()
    };
  }

  setGridState(gridApi: GridApi, gridColumnApi: ColumnApi, state: any) {
    gridApi.paginationGoToPage(state.currentPage);
    gridColumnApi.setColumnState(state.columnState);
    gridApi.setFilterModel(state.filterModel);
    gridApi.setSortModel(state.sortModel);
    gridApi.paginationSetPageSize(state.paginationPageSize);
  }

  hasError(elRef: ElementRef, ...formGroups: FormGroup[]): boolean {
    let result = false;
    const messages = [];
    formGroups.forEach((val: FormGroup) => {
      // tslint:disable-next-line:forin
      for (const key in val.controls) {
        const ctl = val.controls[key];
        ctl.markAsDirty();
        ctl.updateValueAndValidity();
        if (ctl.invalid) {
          messages.push(this.getValidationErrorMessage(ctl.errors));
        }
      }
      result = result || val.invalid;
    });

    if (result) {
      this.showConfirm({
        title: '错误',
        messages: messages,
        buttons: [{ name: 'OK', css: 'btn btn-primary' }]
      });
    }

    return result;
  }

  private getValidationErrorMessage(errors: ValidationErrors): Array<string> {
    return Object.keys(errors).map((val) => {
      return errors[val].message;
    });
  }

  showModal(config: AppModalConfig, data?: any): Promise<AppModalResult> {
    return new Promise<AppModalResult>(resolve => {
      const directive = new ModalDirective(this.modalService);
      directive.config = config;
      directive.data = data;
      directive.done.asObservable().subscribe((result) => {
        resolve(result);
      });
      directive.onClick();
    });
  }

  getUserInfo(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.post('Common/GetUserInfo').then((result) => {
        if (result.MessageId.length === 0) {
          resolve(result);
        }
      });
    });
  }

  spinnerShow() {
    this.spinnerCnt++;
    this.spinnerService.show();
  }

  spinnerHide() {
    this.spinnerCnt--;
    if (this.spinnerCnt <= 0) {
      this.spinnerService.hide();
    }
  }

  getPostUrl(action: string): string {
    return `${this.server_url}/${action}`;
  }

  post(action: string, data?: any): Promise<any> {
    const url = this.getPostUrl(action);

    this.headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(url, {
      headers: this.headers,
      withCredentials: true,
      params: JSON.stringify(data)
    }).toPromise()
      .then((res) => {
        if (res) {
          this.spinnerHide();
        }
      })
      .catch((error) => {
        this.spinnerHide();
        console.error('An error occurred', error);
        this.showMessage('error', this.getMessage('E9999'));
      });
  }

  showMessage(level: string, message: string, title: string = null) {
    this.toastr[level](message, title);
  }

  getMessage(messageId: string, ...params: string[]): string {
    return MESSAGE_UTIL.getMessage(messageId, params);
  }

  insert(path: string, param?: any) {
    this.clearAllData();
    this.navigate(path, param);
  }

  getLocaleText(key: string): string {
    if (!key) {
      return key;
    }

    const path = key.split('.');
    let result = key;
    let val: any = this.appLocales.ja;

    for (let index = 0; index < path.length; index++) {
      const p = path[index];
      if (val && val[p]) {
        val = val[p];
      } else {
        val = null;
        break;
      }
    }

    if (val) {
      result = `${val}`;
    }
    return result;
  }

  // Grid 文字列
  getGridLocaleText() {
    return {
      // for filter panel
      page: '页',
      more: '更多',
      to: '至',
      of: '的',
      next: '下一页',
      previous: '前一页',
      loadingOoo: '数据加载中',

      // for set filter
      selectAll: '全选择',
      searchOoo: '检索中...',
      blanks: '空白',

      // for number filter and text filter
      filterOoo: '过滤',
      applyFilter: '筛选',
      clearFilter: '清除',

      // for number filter
      equals: '相同',
      notEqual: '不相同',
      lessThan: '小于',
      lessThanOrEqual: '小于等于',
      greaterThan: '大于',
      greaterThanOrEqual: '大于等于',
      notContains: '不包括',
      inRange: '包括',

      // for text filter
      contains: '包括',
      startsWith: '指定值开始',
      endsWith: '指定值结束',

      // the header of the default group column
      group: '组',

      // tool panel
      columns: '列設定',
      rowGroupColumns: 'laPivot Cols',
      rowGroupColumnsEmptyMessage: 'la drag cols to group',
      valueColumns: 'laValue Cols',
      pivotMode: 'laPivot-Mode',
      groups: 'laGroups',
      values: 'laValues',
      pivots: 'laPivots',
      valueColumnsEmptyMessage: 'la drag cols to aggregate',
      pivotColumnsEmptyMessage: 'la drag here to pivot',

      // other
      noRowsToShow: '没有查询到数据！',

      // enterprise menu
      pinColumn: 'laPin Column',
      valueAggregation: 'laValue Agg',
      autosizeThiscolumn: 'laAutosize Diz',
      autosizeAllColumns: 'laAutsoie em All',
      groupBy: 'laGroup by',
      ungroupBy: 'laUnGroup by',
      resetColumns: 'laReset Those Cols',
      expandAll: 'laOpen-em-up',
      collapseAll: 'laClose-em-up',
      toolPanel: 'laTool Panelo',
      export: 'laExporto',
      csvExport: 'la CSV Exportp',
      excelExport: 'la Excel Exporto',

      // enterprise menu pinning
      pinLeft: 'laPin <<',
      pinRight: 'laPin >>',
      noPin: 'laDontPin <>',

      // enterprise menu aggregation and status panel
      sum: 'laSum',
      min: 'laMin',
      max: 'laMax',
      first: 'laFirst',
      last: 'laLast',
      none: 'laNone',
      count: 'laCount',
      average: 'laAverage',

      // standard menu
      copy: '复制',
      copyWithHeaders: 'laCopy Wit hHeaders',
      ctrlC: 'ctrl + C',
      paste: '粘贴',
      ctrlV: 'ctrl + V'
    };
  }

  private getMessageLevel(messageId: string): string {
    let result = 'error';
    if (messageId && messageId.length > 0) {
      switch (messageId[0]) {
        case 'I':
          result = 'info';
          break;
        case 'W':
          result = 'warning';
          break;
        case 'S':
          result = 'success';
          break;
        default:
          result = 'error';
          break;
      }
    }
    return result;
  }

}

@Injectable()
export class AppCanActivate implements CanActivate {
  constructor(private baseService: BaseService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.baseService.loginFunc();
  }
}

export interface CanComponentDeactivate {
  canDeactivate: () => Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
