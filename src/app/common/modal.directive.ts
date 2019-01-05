import { Directive, Input, TemplateRef, Output, EventEmitter, HostListener } from '@angular/core';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { isFunction } from 'util';

@Directive({
  selector: 'button[appModal]'
})
export class ModalDirective {

  private static shown: () => void;

  @Input() config: AppModalConfig;

  @Input() data: any;

  @Output() done: EventEmitter<AppModalResult> = new EventEmitter<AppModalResult>();

  private modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) {
    if (ModalDirective.shown == null) {
      this.modalService.onShown.asObservable().subscribe(ModalDirective.shown = () => {
        const loaders = (<any>this.modalService).loaders;
        if (loaders && loaders.length > 0) {
          const component = loaders[loaders.length - 1].getInnerComponent();
          if (component && isFunction(component.onModalShown)) {
            component.onModalShown();
          }
        }
      });
    }
  }

  @HostListener('click', ['$event'])
  onClick() {
    this.modalRef = this.modalService.show(this.config.component, Object.assign({}, this.config.modalOptions, {
      initialState: {
        data: this.data,
        done: (cancel, result?) => {
          this.modalRef.hide();
          this.done.emit(<AppModalResult>{ cancel: cancel, data: result, config: this.config });
        }
      }
    }));
  }

  hide() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }
}

export class AppModalConfig {
  modalOptions?: ModalOptions;
  component: any;
}

export class AppModalResult {
  cancel: boolean;
  data: any;
  config: AppModalConfig;
}

export interface AppModalComponent {
  data: any;
  done: (cancel: boolean, result?: any) => void;
  onModalShown?(): void;
}
