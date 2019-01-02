import { Directive, ElementRef, Input, HostBinding, AfterViewInit, Renderer2, ViewContainerRef } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { TooltipDirective, TooltipConfig, ComponentLoaderFactory } from 'ngx-bootstrap';

declare let $: any;

@Directive({
  selector: '[appValidate]',
})
export class ValidateDirective extends TooltipDirective implements AfterViewInit {

  @Input() public validateFormControl: FormControl;

  private hover: boolean;

  constructor(
    _viewContainerRef: ViewContainerRef,
    _renderer: Renderer2,
    private el: ElementRef,
    cis: ComponentLoaderFactory,
    config: TooltipConfig
  ) {
    super(_viewContainerRef, _renderer, el, cis, config);
    this.container = 'body';
    this.containerClass = 'error';
  }

  @HostBinding('class.is-invalid') get hasInvalid(): boolean {
    if (this.validateFormControl == null) {
      return false;
    }
    const result = this.validateFormControl.invalid && (this.validateFormControl.dirty || this.validateFormControl.touched);
    if (result) {
      this.setMessage(this.validateFormControl.errors);
    } else {
      this.clearMessage();
    }
    return result;
  }

  ngAfterViewInit(): void {
    $(this.el.nativeElement).hover(() => {
      this.hover = true;
    }, () => {
      this.hover = false;
    });
  }

  private clearMessage() {
    if (this.tooltip) {
      this.tooltip = null;
    }
  }

  private setMessage(errors: ValidationErrors) {
    const msg = this.getMessage(errors)[0].message;
    if (msg !== this.tooltip) {
      this.tooltip = msg;
      if (this.hover) {
        if (this.isOpen) {
          this.hide();
        }
        setTimeout(() => {
          this.show();
        }, 500);
      }
    }
  }

  private getMessage(errors: ValidationErrors): Array<any> {
    return Object.keys(errors).map((val) => {
      return errors[val];
    });
  }

}
