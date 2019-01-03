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
import { Bu120D01Component } from './components/bu/bu120-d01/bu120-d01.component';
import { Gm010D01Component } from './components/gm/gm010-d01/gm010-d01.component';
import { Gm010D02Component } from './components/gm/gm010-d02/gm010-d02.component';
import { Ar010D02Component } from './components/ar/ar010-d02/ar010-d02.component';
import { Bu040D01Component } from './components/bu/bu040-d01/bu040-d01.component';
import { Rf010D01Component } from './components/rf/rf010-d01/rf010-d01.component';
import { Cn010D01Component } from './components/cn/cn010-d01/cn010-d01.component';
import { Cn010D04Component } from './components/cn/cn010-d04/cn010-d04.component';
import { Cn010D05Component } from './components/cn/cn010-d05/cn010-d05.component';
import { Cn010D07Component } from './components/cn/cn010-d07/cn010-d07.component';
import { Cn010D18Component } from './components/cn/cn010-d18/cn010-d18.component';
import { Bu030D03Component } from './components/bu/bu030-d03/bu030-d03.component';
import { Ap010D01Component } from './components/ap/ap010-d01/ap010-d01.component';
import { Ap010D02Component } from './components/ap/ap010-d02/ap010-d02.component';
import { Ar010D03Component } from './components/ar/ar010-d03/ar010-d03.component';
import { Ar010D04Component } from './components/ar/ar010-d04/ar010-d04.component';
import { Bu110D02Component } from './components/bu/bu110-d02/bu110-d02.component';
import { Bu110D03Component } from './components/bu/bu110-d03/bu110-d03.component';
import { Bu010D01Component } from './components/bu/bu010-d01/bu010-d01.component';
import { Bu130D03Component } from './components/bu/bu130-d03/bu130-d03.component';
import { Cn020D01Component } from './components/cn/cn020-d01/cn020-d01.component';
import { Cn020D02Component } from './components/cn/cn020-d02/cn020-d02.component';
import { Cn020D03Component } from './components/cn/cn020-d03/cn020-d03.component';
import { Cn020D04Component } from './components/cn/cn020-d04/cn020-d04.component';
import { Ar010D05Component } from './components/ar/ar010-d05/ar010-d05.component';
import { Ar010D06Component } from './components/ar/ar010-d06/ar010-d06.component';
import { Ar020D01Component } from './components/ar/ar020-d01/ar020-d01.component';
import { Cn010D11Component } from './components/cn/cn010-d11/cn010-d11.component';
import { Ap020D01Component } from './components/ap/ap020-d01/ap020-d01.component';
import { Ap020D02Component } from './components/ap/ap020-d02/ap020-d02.component';
import { Ap030D01Component } from './components/ap/ap030-d01/ap030-d01.component';
import { Ap030D02Component } from './components/ap/ap030-d02/ap030-d02.component';
import { Cn010D02Component } from './components/cn/cn010-d02/cn010-d02.component';
import { Cn010D03Component } from './components/cn/cn010-d03/cn010-d03.component';
import { Cn010D06Component } from './components/cn/cn010-d06/cn010-d06.component';
import { Cn010D08Component } from './components/cn/cn010-d08/cn010-d08.component';
import { Cn010D09Component } from './components/cn/cn010-d09/cn010-d09.component';
import { Cn010D10Component } from './components/cn/cn010-d10/cn010-d10.component';
import { Cn010D12Component } from './components/cn/cn010-d12/cn010-d12.component';
import { Cn010D13Component } from './components/cn/cn010-d13/cn010-d13.component';
import { Cn010D14Component } from './components/cn/cn010-d14/cn010-d14.component';
import { Cn010D15Component } from './components/cn/cn010-d15/cn010-d15.component';
import { Cn010D16Component } from './components/cn/cn010-d16/cn010-d16.component';
import { Cn010D17Component } from './components/cn/cn010-d17/cn010-d17.component';
import { Cn010D19Component } from './components/cn/cn010-d19/cn010-d19.component';
import { Cn010D20Component } from './components/cn/cn010-d20/cn010-d20.component';
import { Cn020D05Component } from './components/cn/cn020-d05/cn020-d05.component';
import { Cn020D06Component } from './components/cn/cn020-d06/cn020-d06.component';
import { Cn030D01Component } from './components/cn/cn030-d01/cn030-d01.component';
import { Cn030D02Component } from './components/cn/cn030-d02/cn030-d02.component';
import { Cn040D01Component } from './components/cn/cn040-d01/cn040-d01.component';
import { Cn010D21Component } from './components/cn/cn010-d21/cn010-d21.component';
import { Rf010D02Component } from './components/rf/rf010-d02/rf010-d02.component';
import { Gm020D01Component } from './components/gm/gm020-d01/gm020-d01.component';
import { Gm020D02Component } from './components/gm/gm020-d02/gm020-d02.component';
import { Gm030D01Component } from './components/gm/gm030-d01/gm030-d01.component';
import { Bu010D02Component } from './components/bu/bu010-d02/bu010-d02.component';
import { Bu010D03Component } from './components/bu/bu010-d03/bu010-d03.component';
import { Bu020D03Component } from './components/bu/bu020-d03/bu020-d03.component';
import { Bu020D04Component } from './components/bu/bu020-d04/bu020-d04.component';
import { Bu020D05Component } from './components/bu/bu020-d05/bu020-d05.component';
import { Bu020D06Component } from './components/bu/bu020-d06/bu020-d06.component';
import { Bu030D01Component } from './components/bu/bu030-d01/bu030-d01.component';
import { Bu030D02Component } from './components/bu/bu030-d02/bu030-d02.component';
import { Bu040D02Component } from './components/bu/bu040-d02/bu040-d02.component';
import { Bu080D01Component } from './components/bu/bu080-d01/bu080-d01.component';
import { Bu080D02Component } from './components/bu/bu080-d02/bu080-d02.component';
import { Bu080D03Component } from './components/bu/bu080-d03/bu080-d03.component';
import { Bu090D01Component } from './components/bu/bu090-d01/bu090-d01.component';
import { Bu090D02Component } from './components/bu/bu090-d02/bu090-d02.component';
import { Bu100D01Component } from './components/bu/bu100-d01/bu100-d01.component';
import { Bu100D02Component } from './components/bu/bu100-d02/bu100-d02.component';
import { Bu110D01Component } from './components/bu/bu110-d01/bu110-d01.component';
import { Bu120D02Component } from './components/bu/bu120-d02/bu120-d02.component';
import { Bu120D03Component } from './components/bu/bu120-d03/bu120-d03.component';
import { Bu130D01Component } from './components/bu/bu130-d01/bu130-d01.component';
import { Bu130D02Component } from './components/bu/bu130-d02/bu130-d02.component';
import { Bu140D01Component } from './components/bu/bu140-d01/bu140-d01.component';
import { Bu140D02Component } from './components/bu/bu140-d02/bu140-d02.component';
import { Sd040D03Component } from './components/sd/sd040-d03/sd040-d03.component';
import { Sd040D02Component } from './components/sd/sd040-d02/sd040-d02.component';
import { Sd040D01Component } from './components/sd/sd040-d01/sd040-d01.component';
import { Sd050D01Component } from './components/sd/sd050-d01/sd050-d01.component';
import { Sd050D02Component } from './components/sd/sd050-d02/sd050-d02.component';
import { Sd020D01Component } from './components/sd/sd020-d01/sd020-d01.component';
import { Sd020D02Component } from './components/sd/sd020-d02/sd020-d02.component';
import { Sd030D01Component } from './components/sd/sd030-d01/sd030-d01.component';
import { Sd030D02Component } from './components/sd/sd030-d02/sd030-d02.component';
import { Sd040D04Component } from './components/sd/sd040-d04/sd040-d04.component';
import { Sd060D01Component } from './components/sd/sd060-d01/sd060-d01.component';
import { Sd060D02Component } from './components/sd/sd060-d02/sd060-d02.component';
import { Sd090D01Component } from './components/sd/sd090-d01/sd090-d01.component';
import { Sd050D03Component } from './components/sd/sd050-d03/sd050-d03.component';
import { Sd050D04Component } from './components/sd/sd050-d04/sd050-d04.component';
import { Sd080D02Component } from './components/sd/sd080-d02/sd080-d02.component';
import { Sd080D01Component } from './components/sd/sd080-d01/sd080-d01.component';
import { Sd070D03Component } from './components/sd/sd070-d03/sd070-d03.component';
import { Sd070D05Component } from './components/sd/sd070-d05/sd070-d05.component';
import { Sd070D02Component } from './components/sd/sd070-d02/sd070-d02.component';
import { Sd070D01Component } from './components/sd/sd070-d01/sd070-d01.component';
import { Sd110D01Component } from './components/sd/sd110-d01/sd110-d01.component';
import { Op010D01Component } from './components/op/op010-d01/op010-d01.component';
import { Op010D02Component } from './components/op/op010-d02/op010-d02.component';
import { Op010D03Component } from './components/op/op010-d03/op010-d03.component';
import { Op010D04Component } from './components/op/op010-d04/op010-d04.component';
import { Op020D01Component } from './components/op/op020-d01/op020-d01.component';
import { Op020D02Component } from './components/op/op020-d02/op020-d02.component';
import { Op020D03Component } from './components/op/op020-d03/op020-d03.component';
import { Op020D04Component } from './components/op/op020-d04/op020-d04.component';
import { Op020D05Component } from './components/op/op020-d05/op020-d05.component';
import { UserComponent } from './components/systemManagement/user/userComponent';
import { IndexComponent } from './components/index/indexComponent';
import { RegisterComponent } from './components/register/registerComponent';

const appRoutes: Routes = [
  { path: 'BU010D01', component: Bu010D01Component },
  { path: 'RF010D01', component: Rf010D01Component },
  { path: 'BU120D01', component: Bu120D01Component },
  { path: 'BU110D02', component: Bu110D02Component },
  { path: 'BU110D03', component: Bu110D03Component },
  { path: 'SD010D07', component: Sd0101D07AgGridComponent },
  { path: 'BU040D01', component: Bu040D01Component },
  { path: 'design', component: DesignComponent },
  { path: 'GM010D01', component: Gm010D01Component },
  { path: 'GM010D02', component: Gm010D02Component },
  { path: 'AP010D01', component: Ap010D01Component },
  { path: 'AP010D02', component: Ap010D02Component },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'CN010D01', component: Cn010D01Component },
  { path: 'CN010D04', component: Cn010D04Component },
  { path: 'CN010D05', component: Cn010D05Component },
  { path: 'CN010D07', component: Cn010D07Component },
  { path: 'CN010D11', component: Cn010D11Component },
  { path: 'CN010D18', component: Cn010D18Component },
  { path: 'AR010D02', component: Ar010D02Component },
  { path: 'AR010D03', component: Ar010D03Component },
  { path: 'AR010D04', component: Ar010D04Component },
  { path: 'BU030D03', component: Bu030D03Component },
  { path: 'BU130D03', component: Bu130D03Component },
  { path: 'CN020D01', component: Cn020D01Component },
  { path: 'CN020D02', component: Cn020D02Component },
  { path: 'CN020D03', component: Cn020D03Component },
  { path: 'CN020D04', component: Cn020D04Component },
  { path: 'AR010D05', component: Ar010D05Component },
  { path: 'AR010D06', component: Ar010D06Component },
  { path: 'AR020D01', component: Ar020D01Component },
  { path: 'AP020D01', component: Ap020D01Component },
  { path: 'AP020D02', component: Ap020D02Component },
  { path: 'AP030D01/:id', component: Ap030D01Component },
  { path: 'AP030D02/:id', component: Ap030D02Component },
  { path: 'CN010D02', component: Cn010D02Component },
  { path: 'CN010D03', component: Cn010D03Component },
  { path: 'CN010D06', component: Cn010D06Component },
  { path: 'CN010D08', component: Cn010D08Component },
  { path: 'CN010D09', component: Cn010D09Component },
  { path: 'CN010D10', component: Cn010D10Component },
  { path: 'CN010D12', component: Cn010D12Component },
  { path: 'CN010D13', component: Cn010D13Component },
  { path: 'CN010D14', component: Cn010D14Component },
  { path: 'CN010D15', component: Cn010D15Component },
  { path: 'CN010D16', component: Cn010D16Component },
  { path: 'CN010D17', component: Cn010D17Component },
  { path: 'CN010D19', component: Cn010D19Component },
  { path: 'CN010D20', component: Cn010D20Component },
  { path: 'CN020D05', component: Cn020D05Component },
  { path: 'CN020D06', component: Cn020D06Component },
  { path: 'CN030D01', component: Cn030D01Component },
  { path: 'CN030D02', component: Cn030D02Component },
  { path: 'CN040D01', component: Cn040D01Component },
  { path: 'CN010D21', component: Cn010D21Component },
  { path: 'RF010D02', component: Rf010D02Component },
  { path: 'GM020D01', component: Gm020D01Component },
  { path: 'GM020D02', component: Gm020D02Component },
  { path: 'GM030D01', component: Gm030D01Component },
  { path: 'BU010D02', component: Bu010D02Component },
  { path: 'BU010D03', component: Bu010D03Component },
  { path: 'BU020D03', component: Bu020D03Component },
  { path: 'BU020D04', component: Bu020D04Component },
  { path: 'BU020D05', component: Bu020D05Component },
  { path: 'BU020D06', component: Bu020D06Component },
  { path: 'BU030D01', component: Bu030D01Component },
  { path: 'BU030D02', component: Bu030D02Component },
  { path: 'BU040D02', component: Bu040D02Component },
  { path: 'BU080D01', component: Bu080D01Component },
  { path: 'BU080D02', component: Bu080D02Component },
  { path: 'BU080D03', component: Bu080D03Component },
  { path: 'BU090D01', component: Bu090D01Component },
  { path: 'BU090D02', component: Bu090D02Component },
  { path: 'BU100D01', component: Bu100D01Component },
  { path: 'BU100D02', component: Bu100D02Component },
  { path: 'BU110D01', component: Bu110D01Component },
  { path: 'BU120D02', component: Bu120D02Component },
  { path: 'BU120D03', component: Bu120D03Component },
  { path: 'BU130D01', component: Bu130D01Component },
  { path: 'BU130D02', component: Bu130D02Component },
  { path: 'BU140D01', component: Bu140D01Component },
  { path: 'BU140D02', component: Bu140D02Component },
  { path: 'SD040D03', component: Sd040D03Component },
  { path: 'SD040D02', component: Sd040D02Component },
  { path: 'SD040D01', component: Sd040D01Component },
  { path: 'SD050D01', component: Sd050D01Component },
  { path: 'SD050D02', component: Sd050D02Component },
  { path: 'SD020D01', component: Sd020D01Component },
  { path: 'SD020D02', component: Sd020D02Component },
  { path: 'SD030D01', component: Sd030D01Component },
  { path: 'SD030D02', component: Sd030D02Component },
  { path: 'SD040D04', component: Sd040D04Component },
  { path: 'SD060D01', component: Sd060D01Component },
  { path: 'SD060D02', component: Sd060D02Component },
  { path: 'SD090D01', component: Sd090D01Component },
  { path: 'SD050D03', component: Sd050D03Component },
  { path: 'SD050D04', component: Sd050D04Component },
  { path: 'SD080D02', component: Sd080D02Component },
  { path: 'SD080D01', component: Sd080D01Component },
  { path: 'SD070D03', component: Sd070D03Component },
  { path: 'SD070D05', component: Sd070D05Component },
  { path: 'SD070D02', component: Sd070D02Component },
  { path: 'SD070D01', component: Sd070D01Component },
  { path: 'SD110D01', component: Sd110D01Component },
  { path: 'OP010D01', component: Op010D01Component },
  { path: 'OP010D02', component: Op010D02Component },
  { path: 'OP010D03', component: Op010D03Component },
  { path: 'OP010D04', component: Op010D04Component },
  { path: 'OP020D01', component: Op020D01Component },
  { path: 'OP020D02', component: Op020D02Component },
  { path: 'OP020D03', component: Op020D03Component },
  { path: 'OP020D04', component: Op020D04Component },
  { path: 'OP020D05', component: Op020D05Component },
  { path: 'user', component: UserComponent },
  { path: 'index', component: IndexComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  entryComponents: [
    ConfirmWindowComponent,
    PopwindowComponent,
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
    Bu120D01Component,
    ModalDirective,
    PopwindowComponent,
    Ap010D01Component,
    Ap010D02Component,
    Bu040D01Component,
    Bu110D02Component,
    Bu110D03Component,
    Rf010D01Component,
    Cn010D01Component,
    Cn010D04Component,
    Cn010D05Component,
    Cn010D07Component,
    Cn010D18Component,
    Gm010D01Component,
    Gm010D02Component,
    Ar010D02Component,
    Bu030D03Component,
    Ap010D01Component,
    Ap010D02Component,
    Ar010D03Component,
    Ar010D04Component,
    Bu010D01Component,
    Bu130D03Component,
    Cn020D01Component,
    Cn020D02Component,
    Cn020D03Component,
    Cn020D04Component,
    Ar010D06Component,
    Ar010D05Component,
    Ar020D01Component,
    Cn010D11Component,
    Ap020D01Component,
    Ap020D02Component,
    Ap030D01Component,
    Ap030D02Component,
    Cn010D02Component,
    Cn010D03Component,
    Cn010D06Component,
    Cn010D08Component,
    Cn010D09Component,
    Cn010D10Component,
    Cn010D12Component,
    Cn010D13Component,
    Cn010D14Component,
    Cn010D15Component,
    Cn010D16Component,
    Cn010D17Component,
    Cn010D19Component,
    Cn010D20Component,
    Cn020D05Component,
    Cn020D06Component,
    Cn030D01Component,
    Cn030D02Component,
    Cn040D01Component,
    Cn010D21Component,
    Rf010D02Component,
    Gm020D01Component,
    Gm020D02Component,
    Gm030D01Component,
    Bu010D02Component,
    Bu010D03Component,
    Bu020D03Component,
    Bu020D04Component,
    Bu020D05Component,
    Bu020D06Component,
    Bu030D01Component,
    Bu030D02Component,
    Bu040D02Component,
    Bu080D01Component,
    Bu080D02Component,
    Bu080D03Component,
    Bu090D01Component,
    Bu090D02Component,
    Bu100D01Component,
    Bu100D02Component,
    Bu110D01Component,
    Bu120D02Component,
    Bu120D03Component,
    Bu130D01Component,
    Bu130D02Component,
    Bu140D01Component,
    Bu140D02Component,
    Sd040D03Component,
    Sd040D02Component,
    Sd040D01Component,
    Sd050D01Component,
    Sd050D02Component,
    Sd020D01Component,
    Sd020D02Component,
    Sd030D01Component,
    Sd030D02Component,
    Sd040D04Component,
    Sd060D01Component,
    Sd060D02Component,
    Sd090D01Component,
    Sd050D03Component,
    Sd050D04Component,
    Sd080D02Component,
    Sd080D01Component,
    Sd070D03Component,
    Sd070D05Component,
    Sd070D02Component,
    Sd070D01Component,
    Sd110D01Component,
    Op010D01Component,
    Op010D02Component,
    Op010D03Component,
    Op010D04Component,
    Op020D01Component,
    Op020D02Component,
    Op020D03Component,
    Op020D04Component,
    Op020D05Component,
    UserComponent,
    IndexComponent,
    RegisterComponent
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
