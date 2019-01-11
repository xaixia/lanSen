import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { LicenseManager } from 'ag-grid-enterprise';

if (environment.production) {
  enableProdMode();
}

LicenseManager.setLicenseKey('');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
