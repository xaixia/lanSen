import { ErrorHandler } from '@angular/core';
import { BaseService } from './base.service';
import { MESSAGE_UTIL } from '../configuration/message.config';
import { environment } from '../../environments/environment';

declare let $: any;

export class AppErrorHandler implements ErrorHandler {
  // サーバーURL
  private server_url: string = environment.server;
  private baseService: BaseService;

  handleError(error: Error) {
    if (confirm(MESSAGE_UTIL.getMessage('E9996', []))) {
      this.uploadError(error);
    }
    console.error(error);
  }

  private uploadError(error: Error) {
    const errorLog = error.stack || error.message;
    $.ajax({
      url: this.getPostUrl('Common/UploadError'),
      method: 'POST',
      data: JSON.stringify({ Text: errorLog, Url: window.location.href }),
      contentType: 'application/json',
      dataType: 'json',
      cache: false,
    }).done((result) => {
      if (result.MessageId.length > 0) {
        this.baseService.showMessage(MESSAGE_UTIL.getMessage(result.MessageId, result.ParamList || []), '错误');
      }
    }).fail(() => {
      this.baseService.showMessage('出错啦', '错误');
    });
  }

  private getPostUrl(action: string): string {
    return `${this.server_url}/${action}`;
  }
}
