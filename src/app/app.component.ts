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
  private isLogin = true;
  loginForm: FormGroup;
  loginStep: number;
  isResetPass: boolean;
  get loginButtonText() {
    if (this.loginStep === 0) {
      return '继续';
    } else {
      if (this.isResetPass) {
        return '参数设置';
      } else {
        return '登录';
      }
    }
  }

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
    this.loadLoginFunc();
    this.loadShowConfirmFunc();
    this.loadReflashUserInfoFunc();
  }

  @HostListener('window:beforeunload') beforeunload() {
    this.baseService.saveData();
  }

  ngOnInit(): void {
  }

  logOut() {
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
    if (!this.baseService.hasError(this.el, this.loginForm)) {
      if (this.loginStep === 1) {
        if (this.isResetPass) {
          this.resetPass();
        } else {
          this._login();
        }
      } else {
        this.checkUserStatus();
      }
    }
  }

  backForLogin(): void {
    this.loginStep = 0;
    this.isResetPass = false;
  }

  private checkUserStatus() {
    const postData = Object.assign({}, {
      NiceTanCd: this.loginForm.value.NiceTanCd
    });
    this.baseService.post('Common/GetUserStatus', postData).then(result => {
      if (result.MessageId.length === 0) {
        this.loginStep = 1;
        if (result.PasswordStatus === 2) {
          this.isResetPass = true;
        }
      }
    });
  }

  private resetPass() {
    const postData = Object.assign({}, this.loginForm.value);
    this.baseService.post('Common/SetUserPass', postData).then(result => {
      if (result.MessageId.length === 0) {
        this._login();
      } else {
        this.loginStep = 0;
        this.isResetPass = false;
        this.loginForm.reset();
      }
    });
  }

  private _login() {
    const postData = Object.assign({}, this.loginForm.value);
    console.log(postData);
    this.baseService.post('login', postData).then((result) => {
      console.log(typeof postData);
      console.log(result);
      // if (result.MessageId.length === 0) {
      //   this.modalRef.hide();
      //   this.modalRef = null;
      //   this.loadUserInfo().then(() => {
      //     this.loginComp(true);
      //   });
      // }
    });
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

  private loadLoginFunc(): void {
    this.baseService.loginFunc = (noRouter?: boolean) => {
      this.baseService.post('Common/IsLogin').then((result) => {
        if (result.MessageId.length === 0) {
          if (result.EscoTntId) {
            this.loadUserInfo().then(() => {
              this.loginComp(true);
            });
          } else {
            this.isLogin = false;
          }
        } else {
          this.loginComp(false);
        }
      });
      if (!noRouter) {

        return new Promise<boolean>((paramResolve, paramReject) => {
          this.loginComp = paramResolve;
        });
      }
    };
  }

  private loadReflashUserInfoFunc(): void {
    this.baseService.reflashUserInfoFunc = () => {
      this.loadUserInfo();
    };
  }

  private loadUserInfo(changeUserFlg?: boolean): Promise<any> {
    const myComponent = this;
    return this.baseService.getUserInfo().then((result) => {
      if (result.MessageId.length === 0) {
        // myComponent.escoTntNm = result.EscoTntNm;
      }
    });
  }
}

