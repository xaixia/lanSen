import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { AgGridModule } from 'ag-grid-angular';

import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';

import { StorageServiceModule } from 'ngx-webstorage-service';

import { PaginationModule, BsDropdownModule, TabsModule, ModalModule, ButtonsModule, TooltipModule } from 'ngx-bootstrap';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { FileUploadModule } from 'ng2-file-upload';

import { ClipboardModule } from 'ngx-clipboard';

import { NgSelectModule } from '@ng-select/ng-select';

import { QuillModule } from 'ngx-quill';

import { BaseService, AppCanActivate, CanDeactivateGuard } from './common/base.service';
import { ValidateDirective } from './common/validate.directive';
import { PaginationComponent } from './components/common/pagination/pagination.component';
import { ConfirmWindowComponent } from './components/common/confirm-window/confirm-window.component';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CustomToastOptions } from './common/custom-toast-options';
import { ConvertStringFormDatePipe } from './common/convert-string-form-date.pipe';
import { DatetimePickerDirective } from './common/datetime-picker.directive';
import { AppErrorHandler } from './common/app-error-handler';

import { Sd010D07Component } from './components/sd010-d07/sd010-d07.component';
import { Sd0101D07AgGridComponent } from './components/sd0101-d07.ag-grid/sd0101-d07.ag-grid.component';
import { DesignComponent } from './components/design/design.component';
import { ModalDirective } from './common/modal.directive';
import { PopwindowComponent } from './components/design/popwindow/popwindow.component';
import { AppLocales } from './configuration/app-locales';

import { RoleListComponent } from './components/userManage/role-list/role-list.component';
import { BillingListComponent } from './components/businessManage/billing-list/billing-list.component';
import { RegisterLogComponent } from './components/systemManage/register-log/register-log.component';
import { OperationLogComponent } from './components/systemManage/operation-log/operation-log.component';
import { SystemUserListComponent } from './components/userManage/system-user-list/system-user-list.component';
import { EmployeListComponent } from './components/staffManage/employe-list/employe-list.component';
import { OrderListComponent } from './components/businessManage/order-list/order-list.component';
import { IndexComponent } from './components/indexManage/index/index.component';
import { PasswordComponent } from './components/indexManage/password/password.component';
import { UserinfoComponent } from './components/indexManage/userinfo/userinfo.component';
import { RoleEditComponent } from './components/userManage/role-edit/role-edit.component';
import { AuthorityListComponent } from './components/userManage/authority-list/authority-list.component';
import { AuthorityEditComponent } from './components/userManage/authority-edit/authority-edit.component';
import { OrdinaryUserListComponent } from './components/staffManage/ordinary-user-list/ordinary-user-list.component';
import { EmployeEditComponent } from './components/staffManage/employe-edit/employe-edit.component';
import { OrderEditComponent } from './components/businessManage/order-edit/order-edit.component';
import { CommissionComponent } from './components/businessManage/commission/commission.component';
import { OrderEndComponent } from './components/businessManage/order-end/order-end.component';
import { ChangeWorkerComponent } from './components/businessManage/change-worker/change-worker.component';
import { RefuseModalComponent } from './components/staffManage/refuse-modal/refuse-modal.component';
import { NewsEditComponent } from './components/contentManage/news-edit/news-edit.component';
import { NewsListComponent } from './components/contentManage/news-list/news-list.component';

const appRoutes: Routes = [
  { path: 'SD10D07', component: Sd010D07Component },
  { path: 'design', component: DesignComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent }, // 首页
  { path: 'resetpwd', component: PasswordComponent }, // 重置密码
  { path: 'customer-info', component: UserinfoComponent }, // 设置用户信息

  { path: 'staff/system-user-list', component: SystemUserListComponent }, // 系统用户管理
  { path: 'staff/role-list', component: RoleListComponent }, // 角色管理
  { path: 'staff/authority-list', component: AuthorityListComponent }, // 权限管理

  { path: 'system/system-register-log', component: RegisterLogComponent }, // 登录日志
  { path: 'system/system-operation-log', component: OperationLogComponent }, // 操作日志

  { path: 'user/ordinary-user-list', component: OrdinaryUserListComponent }, // 普通用户管理
  { path: 'user/employe-list', component: EmployeListComponent }, // 雇工管理
  { path: 'user/employe-edit', component: EmployeEditComponent }, // 雇工详情

  { path: 'business/order-list', component: OrderListComponent }, // 工单列表
  { path: 'business/order-edit', component: OrderEditComponent }, // 工单详情
  { path: 'business/billing-list', component: BillingListComponent }, // 业务列表

  { path: 'content/news-list', component: NewsListComponent }, // 新闻列表
  { path: 'content/news-edit', component: NewsEditComponent }, // 新闻编辑
];

@NgModule({
  entryComponents: [
    ConfirmWindowComponent,
    PopwindowComponent,
    RoleEditComponent,
    AuthorityEditComponent,
    EmployeEditComponent,
    CommissionComponent,
    OrderEndComponent,
    ChangeWorkerComponent,
    RefuseModalComponent,
  ],
  declarations: [
    ValidateDirective,
    DatetimePickerDirective,
    PaginationComponent,
    ConfirmWindowComponent,
    AppComponent,
    ConvertStringFormDatePipe,
    Sd010D07Component,
    Sd0101D07AgGridComponent,
    DesignComponent,
    ModalDirective,
    PopwindowComponent,
    IndexComponent,
    RoleListComponent,
    RegisterLogComponent,
    OperationLogComponent,
    SystemUserListComponent,
    EmployeListComponent,
    OrderListComponent,
    BillingListComponent,
    RoleEditComponent,
    PasswordComponent,
    AuthorityListComponent,
    OrdinaryUserListComponent,
    CommissionComponent,
    OrderEditComponent,
    OrderEndComponent,
    RefuseModalComponent,
    ChangeWorkerComponent,
    EmployeEditComponent,
    AuthorityEditComponent,
    UserinfoComponent,
    NewsListComponent,
    NewsEditComponent,

  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ToastModule.forRoot(),
    PaginationModule.forRoot(),
    StorageServiceModule,
    FileUploadModule,
    Ng4LoadingSpinnerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    ClipboardModule,
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: !environment.production
      } // <-- debugging purposes only
    ),
    AgGridModule.withComponents([]),
    QuillModule
  ],
  providers: [
    AppLocales,
    BaseService,
    AppCanActivate,
    CanDeactivateGuard,
    { provide: ToastOptions, useClass: CustomToastOptions },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
