import { ErrorHandler, Injectable, } from '@angular/core';
import { MESSAGE_UTIL } from '../configuration/message.config';
import { environment } from '../../environments/environment';
import { Toast } from 'ng2-toastr';

declare let $: any;

export class AppErrorHandler implements ErrorHandler {

  // サーバーURL
  private server_url: string = environment.server;

  handleError(error: Error) {
    if (confirm(MESSAGE_UTIL.getMessage('E0009', []))) {
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
        alert(MESSAGE_UTIL.getMessage(result.MessageId, result.ParamList || []));
      }
    }).fail(() => {
      // alert('出错啦！');
    });
  }

  private getPostUrl(action: string): string {
    return `${this.server_url}/${action}`;
  }
}
