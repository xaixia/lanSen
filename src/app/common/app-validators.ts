import { AbstractControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';

import { MESSAGE_UTIL } from '../configuration/message.config';

export interface AppValidatorFn {
    // tslint:disable-next-line:callable-types
    (c: AbstractControl): boolean;
}

export class AppValidators {

    static required(id?: string, ...params: string[]): ValidatorFn {
        const messageId = id || 'E0001';
        const messageParams = params.length === 0 ? [] : params;
        return (control: AbstractControl): { [key: string]: any } => {
            const errors: ValidationErrors = Validators.required(control);
            return errors == null ? null : {
                error: {
                    result: errors.required,
                    message: MESSAGE_UTIL.getMessage(messageId, messageParams)
                }
            };
        };
    }

    static maxLength(maxLength: number, id?: string, ...params: string[]): ValidatorFn {
        const messageId = id || 'E0002';
        const messageParams = params.length === 0 ? [maxLength.toString()] : params;
        return (control: AbstractControl): { [key: string]: any } => {
            const errors: ValidationErrors = Validators.maxLength(maxLength)(control);
            return errors == null ? null : {
                error: {
                    result: errors.maxLength, message: MESSAGE_UTIL.getMessage(messageId, messageParams)
                }
            };
        };
    }

    static minLength(minLength: number, id?: string, ...params: string[]): ValidatorFn {
        const messageId = id || 'E0003';
        const messageParams = params.length === 0 ? [minLength.toString()] : params;
        return (control: AbstractControl): { [key: string]: any } => {
            const errors: ValidationErrors = Validators.minLength(minLength)(control);
            return errors == null ? null : {
                error: {
                    result: errors.minLength, message: MESSAGE_UTIL.getMessage(messageId, messageParams)
                }
            };
        };
    }

    static pattern(pattern: string | RegExp, id: string, ...params: string[]): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const errors: ValidationErrors = Validators.pattern(pattern)(control);
            return errors == null ? null : { error: { result: errors.pattern, message: MESSAGE_UTIL.getMessage(id, params) } };
        };
    }

    static other(fn: (control: AbstractControl) => string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const message = fn(control);
            return message && message.length > 0 ? { error: { result: true, message: message } } : null;
        };
    }
}
