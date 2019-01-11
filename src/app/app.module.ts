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

import { UserComponent } from './components/systemManage/user/user.component';
import { RoleListComponent } from './components/userManage/role-list/role-list.component';
import { JurisdictionComponent } from './components/systemManage/jurisdiction/jurisdiction.component';
import { WebsiteComponent } from './components/systemManage/website/website.component';
import { SystemComponent } from './components/systemManage/system/system.component';
import { CoreComponent } from './components/systemManage/core/core.component';
import { ModuleManageComponent } from './components/systemManage/module-manage/module-manage.component';
import { RegisterLogComponent } from './components/logManage/register-log/register-log.component';
import { OperationLogComponent } from './components/logManage/operation-log/operation-log.component';
import { DatabaseLogComponent } from './components/logManage/database-log/database-log.component';
import { UserLogComponent } from './components/logManage/user-log/user-log.component';
import { QueryComponent } from './components/queryManage/query/query.component';
import { SystemUserListComponent } from './components/userManage/system-user-list/system-user-list.component';
import { EmployeListComponent } from './components/userManage/employe-list/employe-list.component';
import { OrderListComponent } from './components/businessManage/order-list/order-list.component';
import { OrderUnitComponent } from './components/businessManage/order-unit/order-unit.component';
import { PriceUnitComponent } from './components/businessManage/price-unit/price-unit.component';
import { LabelAttributeComponent } from './components/businessManage/label-attribute/label-attribute.component';
import { BillingComponent } from './components/businessManage/billing/billing.component';
import { BillingModuleComponent } from './components/businessManage/billing-module/billing-module.component';
import { NewsComponent } from './components/newsAndNotice/news/news.component';
import { NoticeComponent } from './components/newsAndNotice/notice/notice.component';
import { AdComponent } from './components/newsAndNotice/ad/ad.component';
import { ContractComponent } from './components/newsAndNotice/contract/contract.component';
import { AgreementComponent } from './components/newsAndNotice/agreement/agreement.component';
import { BusinessOverviewComponent } from './components/finaceManage/business-overview/business-overview.component';
import { CashComponent } from './components/finaceManage/cash/cash.component';
import { CardComponent } from './components/cardManage/card/card.component';
import { CustomerMessageComponent } from './components/messageManage/customer-message/customer-message.component';
import { SuggestionComponent } from './components/messageManage/suggestion/suggestion.component';
import { IndexComponent } from './components/indexManage/index/index.component';
import { OrderCommentComponent } from './components/evaluateManagement/order-comment/order-comment.component';
import { UserLevelComponent } from './components/evaluateManagement/user-level/user-level.component';
import { PasswordComponent } from './components/indexManage/password/password.component';
import { UserinfoComponent } from './components/indexManage/userinfo/userinfo.component';
import { RoleEditComponent } from './components/userManage/role-edit/role-edit.component';
import { AuthorityListComponent } from './components/userManage/authority-list/authority-list.component';
import { AuthorityEditComponent } from './components/userManage/authority-edit/authority-edit.component';
import { OrdinaryUserListComponent } from './components/userManage/ordinary-user-list/ordinary-user-list.component';

const appRoutes: Routes = [
  { path: 'SD10D07', component: Sd010D07Component },
  { path: 'design', component: DesignComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent }, // 首页
  { path: 'resetpwd', component: PasswordComponent }, // 重置密码
  { path: 'customerinfo', component: UserinfoComponent }, // 设置用户信息

  { path: 'user/systemUserList', component: SystemUserListComponent }, // 系统用户管理
  { path: 'user/ordinaryUserList', component: OrdinaryUserListComponent }, // 普通用户管理
  { path: 'user/roleList', component: RoleListComponent }, // 角色管理
  { path: 'user/authorityList', component: AuthorityListComponent }, // 权限管理

  { path: 'system', component: SystemComponent },
  { path: 'log', component: UserLogComponent },
  { path: 'query', component: QueryComponent },
  { path: 'business', component: BusinessOverviewComponent },
  { path: 'news', component: NewsComponent },
  { path: 'finace', component: OrderListComponent },
  { path: 'card', component: CardComponent },
  { path: 'message', component: CustomerMessageComponent },
  { path: 'level', component: UserLevelComponent },
];

@NgModule({
  entryComponents: [
    ConfirmWindowComponent,
    PopwindowComponent,
    RoleEditComponent,
    AuthorityEditComponent,
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
    UserComponent,
    RoleListComponent,
    JurisdictionComponent,
    WebsiteComponent,
    SystemComponent,
    CoreComponent,
    ModuleManageComponent,
    RegisterLogComponent,
    OperationLogComponent,
    DatabaseLogComponent,
    UserLogComponent,
    QueryComponent,
    SystemUserListComponent,
    EmployeListComponent,
    OrderListComponent,
    OrderUnitComponent,
    PriceUnitComponent,
    LabelAttributeComponent,
    BillingComponent,
    BillingModuleComponent,
    NewsComponent,
    NoticeComponent,
    AdComponent,
    ContractComponent,
    AgreementComponent,
    BusinessOverviewComponent,
    CashComponent,
    CardComponent,
    CustomerMessageComponent,
    SuggestionComponent,
    OrderCommentComponent,
    UserLevelComponent,
    RoleEditComponent,
    PasswordComponent,
    AuthorityListComponent,
    OrdinaryUserListComponent,
    AuthorityEditComponent,
    UserinfoComponent,
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
    AgGridModule.withComponents([])
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
