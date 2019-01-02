import { Directive, Input, ElementRef, forwardRef, AfterViewInit, Renderer2, OnInit } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '../../../node_modules/@angular/forms';
import { isNullOrUndefined, isString } from 'util';
import { isDate } from '../../../node_modules/moment';
import * as moment from 'moment';

declare let $: any;

const APP_DATEPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line
  useExisting: forwardRef(() => DatetimePickerDirective),
  multi: true
};

const APP_DATEPICKER_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => DatetimePickerDirective),
  multi: true
};

@Directive({
  selector: 'input[appDatetimePicker]',
  providers: [ APP_DATEPICKER_VALUE_ACCESSOR, APP_DATEPICKER_VALIDATOR ],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '(change)': 'onChange($event)',
    '(blur)': 'onBlur($event)'
  }
})
export class DatetimePickerDirective implements ControlValueAccessor, AfterViewInit, Validator, OnInit {

  @Input() config: DatetimePickerConfig;

  @Input('startDate') set startDate(value: Date) {
    if (this._startDate !== value) {
      this._startDate = value || new Date(-Infinity);
      if (this.datetimepicker) {
        this.datetimepicker.datetimepicker('setStartDate', this._startDate);
      }
    }
  }

  @Input('endDate') set endDate(value: Date) {
    if (this._endDate !== value) {
      this._endDate = value || new Date(Infinity);
      if (this.datetimepicker) {
        this.datetimepicker.datetimepicker('setEndDate', this._endDate);
      }
    }
  }

  private _startDate: any;
  private _endDate: any;

  private innerValue: Date;
  private datetimepicker: any;
  private settings: any;
  private isShow: boolean;
  private onTouchedCallback: () => void = function() {};
  private onChangeCallback: (_: any) => void = function() {};
  private onValidatorChange: () => void = function() {};

  constructor(
    private input: ElementRef,
    private _renderer: Renderer2
  ) {
    moment.locale('ja');
  }

  ngOnInit() {
    this.settings = Object.assign({}, this.defaultConfig(), this.config, {
      initialDate: this.innerValue ? this.innerValue : null,
      startDate: this._startDate ? this._startDate : null,
      endDate: this._endDate ? this._endDate : null,
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const pickerPosition = this.getPickerPosition();
      this.datetimepicker = $(this.input.nativeElement)
      .datetimepicker(Object.assign(this.settings, {
        pickerPosition: pickerPosition
      })).on('show', () => { this.isShow = true; } ).on('hide', () => { this.isShow = false; } )
      .on('changeDate', ev => {
        this.changeValue(ev.date);
        this.input.nativeElement.focus();
      }).on('changeMonth', ev => {
        if (this.settings.minView === 3) {
          this.changeValue(ev.date);
          this.input.nativeElement.focus();
        }
      }).on('changeYear', ev => {
        if (this.settings.minView === 4) {
          this.changeValue(ev.date);
          this.input.nativeElement.focus();
        }
      });
      this.refreshValue();
      this.datetimepicker.next().click(() => { this.datetimepicker.focus(); });
    });
  }

  onChange(event) {
    this.changeValue(event.target.value);
  }

  writeValue(value: Date | string): void {
    if (!value) {
      this.innerValue = null;
    } else {
      this.innerValue = this.parseDate(value);
    }
    this.refreshValue();
  }

  onBlur(event) {
    this.changeValue(event.target.value);
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this._renderer.setProperty(this.input.nativeElement, 'disabled', isDisabled);
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  hide(): void {
    if (this.isShow && this.datetimepicker) {
      this.datetimepicker.datetimepicker('hide');
    }
  }

  private getPickerPosition(): string {
    const bodyHeight = document.body.clientHeight || window.innerHeight;
    const bodyWidth = document.body.clientWidth || window.innerWidth;
    const elementHeight = $(this.input.nativeElement).outerHeight();
    const elementWidth = $(this.input.nativeElement).outerWidth();
    const offset = $(this.input.nativeElement).offset();
    let x = 'bottom';
    let y = 'right';
    if (bodyHeight < (offset.top + elementHeight + 300)) {
      x = 'top';
    }
    if (bodyWidth < (offset.left + elementWidth + 300)) {
      y = 'left';
    }
    return `${x}-${y}`;
  }

  private changeValue(value: Date|string) {
    const temp = this.innerValue;
    this.writeValue(value);
    if (temp !== this.innerValue) { this.onChangeCallback(this.innerValue); }
    this.onTouchedCallback();
  }

  private parseDate(value: Date|string): Date {
    let result: Date;
    if (isDate(value)) { result = value; }
    if (isString(value)) {
      const date = moment(value, this.convertFormat(this.settings.format));
      result = date.isValid() ? date.toDate() : null;
    }
    if (result) {
      if (this._endDate && moment(result).isAfter(moment(this._endDate))) {
        result = this._endDate;
      }
      if (this._startDate && moment(result).isBefore(moment(this._startDate))) {
        result = this._startDate;
      }
    }
    return result;
  }

  private defaultConfig(): DatetimePickerConfig {
    return <DatetimePickerConfig>{
      format: 'yyyy/mm/dd',
      weekStart: 0,
      autoclose: true,
      startView: 2,
      minView: 2,
      todayHighlight: true,
      keyboardNavigation: false,
      language: 'ja',
      forceParse: true,
      minuteStep: 5,
    };
  }

  private convertFormat(format: string) {
    if (!format) { return null; }
    return format.toUpperCase();
  }

  private refreshValue() {
    if (!isNullOrUndefined(this.innerValue)) {
      this.input.nativeElement.value = moment(this.innerValue).format(this.convertFormat(this.settings.format));
    } else {
      this.input.nativeElement.value = null;
    }
  }

}

export interface DatetimePickerConfig {
  format?: string;
  weekStart?: 0|1|2|3|4|5|6;
  daysOfWeekDisabled?: string|((0|1|2|3|4|5|6)[]);
  autoclose?: boolean;
  startView?: 0|1|2|3|4;
  minView?: 0|1|2|3|4;
  maxView?: 0|1|2|3|4;
  todayBtn?: boolean;
  todayHighlight?: boolean;
  keyboardNavigation?: boolean;
  forceParse?: boolean;
  minuteStep?: number;
}
