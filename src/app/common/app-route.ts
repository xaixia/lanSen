import { Routes, Route } from '@angular/router';

export class AppRoute {
  private static _routes: Routes = [];
  static append(pathes: (String | Route)[], route: Route): AppRoute {
    if (pathes) {
      pathes.forEach(val => {
        if ('string' === typeof val) {
          AppRoute._routes.push(Object.assign({}, route, { path: val }));
        } else {
          AppRoute._routes.push(Object.assign({}, route, val));
        }
      });
    }
    return this;
  }

  static routes(): Routes {
    return AppRoute._routes;
  }
}
