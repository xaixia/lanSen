import * as moment from 'moment';
declare let $: any;
export class AppUtils {

    public static clone(obj: any): any {
        return $.parseJSON(JSON.stringify(obj));
    }

    public static dateFormat(date: Date, format: string): string {
        return moment(date).format(format);
    }

    public static dateFormatFromString(str: string, convertFormat: string, format: string): string {
        return AppUtils.dateFormat(AppUtils.convertDate(str, convertFormat), format);
    }

    public static convertDate(str: string, format: string): Date {
        return moment(str, format).toDate();
    }

    public static equals(arg0: any, arg1: any): boolean {
        return JSON.stringify(arg0) === JSON.stringify(arg1);
    }
}
