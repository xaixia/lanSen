import { Pipe, PipeTransform } from '@angular/core';
import { BaseService } from './base.service';

@Pipe({
  name: 'appLocaleText'
})
export class AppLocaleTextPipe implements PipeTransform {

  constructor(private baseService: BaseService) {}

  transform(value: any, args?: any): any {
    if ('string' === typeof value) {
      return this.baseService.getLocaleText(value);
    }
    return '';
  }

}
