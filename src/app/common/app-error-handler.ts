import { ErrorHandler, Injectable, } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {

  handleError(error: Error) {
    console.error(error);
  }

}
