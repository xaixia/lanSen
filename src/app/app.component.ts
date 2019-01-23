import { Component, OnInit, HostListener, ViewContainerRef, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BaseService } from './common/base.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppValidators } from './common/app-validators';
import { ConfirmWindowComponent } from './components/common/confirm-window/confirm-window.component';
import { isFunction } from 'util';
import { AppAnimations } from './common/app-animations';
import { AppLocales } from './configuration/app-locales';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [AppAnimations.openClose],
})
export class AppComponent implements OnInit {

  private modalRef: BsModalRef;
  private loginComp: (value?: boolean | PromiseLike<boolean>) => void;
  private subComponent: any;
  private isLogin = false;
  private token = 'TOKEN';
  loginForm: FormGroup;
  loginStep: number;
  isResetPass: boolean;

  title: string;

  get menuStep(): number {
    if (this.subComponent && isFunction(this.subComponent.getRouterData)) {
      const data = this.subComponent.getRouterData();
      if (data) {
        return data.menu;
      }
    }
    return 0;
  }

  get appLocales() {
    return this.locales.ja;
  }

  get breadcrumbArray(): string[] {
    const url = this.router.routerState.snapshot.url;
    const breadArr = [];
    if (url.length > 1) {
      const temp = url.substring(1).split('/');
      const firstMenu = temp[0];
      breadArr.push(this.locales.ja.COMMON.MENU[firstMenu]);
      if (temp.length > 1) {
        // 把下划线命名的URL（二级菜单）转为驼峰命名
        const secondMenu = temp[1].replace(/-([a-z])/g, function (all, letter) { return letter.toUpperCase(); });
        breadArr.push(this.locales.ja[secondMenu].title);
      }
      return breadArr;
    }
    return [];
  }

  lastBreadcrumb: string;

  constructor(
    public baseService: BaseService,
    private router: Router,
    private vcr: ViewContainerRef,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private el: ElementRef,
    public locales: AppLocales,
  ) {
    this.loginStep = 0;
    this.baseService.toastr.setRootViewContainerRef(this.vcr);
    this.createForm();
    this.loadShowConfirmFunc();
  }

  @HostListener('window:beforeunload') beforeunload() {
    console.log(this.router.routerState.snapshot.url);
  }

  ngOnInit(): void {
  }

  logOut() {
    this.baseService.clearAllData();
    this.isLogin = false;
  }

  isActive(cls: string): boolean {
    const url = this.router.routerState.snapshot.url;
    return url.indexOf(cls + '/') !== -1;
  }

  onRouterOutletActivate(event: any) {
    if (event) {
      this.subComponent = event;
      this.lastBreadcrumb = null;
      this.subComponent.changeLastBreadcrumb = (text) => {
        this.lastBreadcrumb = text;
      };
    }
  }

  onMenuClick(path: string, param?: any): void {
    const url = this.router.routerState.snapshot.url;
    if (url !== path) {
      this.baseService.clearAllData();
      this.baseService.navigate(path, param);
    }
  }

  login(): void {
    const postData = Object.assign({}, this.loginForm.value);
    this.baseService.post('login', postData).then((result) => {
      if (result.ok) {
        const data = result._body;
        this.baseService.setPageData(this.token, data.access_token);
        this.isLogin = true;
      }
    });
  }

  backForLogin(): void {
    this.loginStep = 0;
    this.isResetPass = false;
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      // 用户名
      username: [null, [AppValidators.required('E0005', '用户名')]],
      // 密码
      password: [null, [AppValidators.required('E0005', '密码')]],
    });
  }

  private loadShowConfirmFunc(): void {

    this.baseService.showConfirm = (paramState) => {
      let done = null;
      const result = new Promise<number | null>((paramResolve, paramReject) => {
        done = paramResolve;
      });
      const initialState = Object.assign({
        done: done
      }, paramState);
      this.modalService.show(ConfirmWindowComponent, {
        keyboard: false,
        ignoreBackdropClick: true,
        initialState: initialState
      });
      return result;
    };
  }
}

