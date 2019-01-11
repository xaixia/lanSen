import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { LicenseManager } from 'ag-grid-enterprise';

if (environment.production) {
  enableProdMode();
}

LicenseManager.setLicenseKey('Realsys_Co.,Ltd._MultiApp_1Devs12_September_2019__MTU2ODI0MjgwMDAwMA==4455ef54e058cd49c428df07487bb417');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
