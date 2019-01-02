import { Pipe, PipeTransform } from '@angular/core';
import { AppUtils } from './app-utils';

@Pipe({
  name: 'convertStringFormDate'
})
export class ConvertStringFormDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) { return ''; }

    const settings = Object.assign({}, {
      convertFormat: 'YYYYMMDDhhmmss',
      format: 'YYYY/MM/DD'
    }, this.getSettings(args));

    return AppUtils.dateFormatFromString(value, settings.convertFormat, settings.format);
  }

  private getSettings(args: any) {
    if (!args) { return {}; }
    if (typeof(args) === 'string') { return { format: args }; }
    return args;
  }

}
