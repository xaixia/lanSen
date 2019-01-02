
import * as moment from 'moment';
import { isObject, isUndefined, isNullOrUndefined } from 'util';

/**
 * Converts path to FormData name
 * @param {Array} path
 * @returns {String}
 */
function toName(path: Array<any>): string {
    const array = path.map((part) => /^[0-9]+$/.test(part) ? `[${part}]` : `.${part}`);
    array[0] = path[0];
    return array.join('');
}

/**
 * Converts object to FormData
 * @param {Object} object
 * @returns {FormData}
 */
export default function(object: any, formdata?: boolean): FormData | {key: string, value: any}[] {
    if (!isObject(object)) {
        throw new TypeError('Argument must be object');
    }


    const form = formdata ? new FormData() : [];
    const iterator = new Iterator(object);

    const appendToForm = function(path, node, filename?) {
        const name = toName(path);
        if (isNullOrUndefined(node)) { return; }
        if (form instanceof FormData) {
            if (isUndefined(filename)) {
                if (node instanceof Date) {
                    form.append(name, moment(node).format());
                } else {
                    form.append(name, node);
                }
            } else {
                form.append(name, node, filename);
            }
        } else if (form instanceof Array) {
            form.push({
                key: name,
                value: node ? (node instanceof Date ? moment(node).format() : node.toString()) : ''
            });
        }
    };

    iterator.forEach((node) => {
        appendToForm(node.path, node.value);
    });

    return form;

}


 export class Iterator {

    private iterated: object;

    private path: any[];

    /**
     * @param {Object} iterated
     */
    constructor(iterated: object, path?: any[]) {
        this.iterated = iterated;
        this.path = path || [];
    }

    forEach(callBack: (node) => void): void {
        // tslint:disable-next-line:forin
        for (const key in this.iterated) {
            let _path = this.path.filter(() => true);
            _path.push(key);
            const node = {
                value: this.iterated[key],
                path: _path
            };
            if (node.value instanceof Array) {
                node.value.forEach((val, idx) => {
                    _path = node.path.filter(() => true);
                    _path.push(idx);
                    new Iterator(val, _path).forEach(callBack);
                });
            } else if (node.value instanceof Blob) {
                callBack(node);
            } else if (node.value instanceof Date) {
                callBack(node);
            } else if (node.value instanceof Object) {
                new Iterator(node.value, node.path).forEach(callBack);
            } else {
                callBack(node);
            }
        }
    }
}
