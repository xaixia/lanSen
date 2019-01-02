import { ToastOptions } from 'ng2-toastr';

export class CustomToastOptions extends ToastOptions {
    toastLife = 10 * 1000;
    dismiss = 'auto';
    newestOnTop = false;
    showCloseButton = true;
    maxShown = 5;
    positionClass = 'toast-top-center';
    animate = 'fade';
}
