import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

declare const $: any;

@Component({
  selector: 'app-confirm-window',
  templateUrl: './confirm-window.component.html',
  styleUrls: ['./confirm-window.component.scss']
})
export class ConfirmWindowComponent implements AfterViewInit {
  title: string;
  message: string;
  messages: string;
  buttons: { name: string, css?: string }[];

  public get dispButtons(): { name: string, css?: string }[] {
    if (this.buttons && this.buttons.length) {
      return this.buttons;
    }
    return this.buttons = [ { name: 'はい', css: 'btn-orange' }, { name: 'いいえ' } ];
  }

  public done: (value?: number | PromiseLike<number | null> | null) => void;

  @ViewChild('footer')
  public footerElem: ElementRef;

  constructor(
    private bsModalRef: BsModalRef
  ) { }

  ngAfterViewInit(): void {
    $(this.footerElem.nativeElement.firstElementChild).attr('autofocus', 'autofocus');
  }

  convertCss(css): string {
    if (css && css.length) {
      return 'btn ' + css;
    } else {
      return 'btn btn-default';
    }
  }

  close(button) {
    let result: number = null;
    if (button) {
      result = this.dispButtons.indexOf(button);
    }
    this.done(result);
    this.bsModalRef.hide();
  }

}
