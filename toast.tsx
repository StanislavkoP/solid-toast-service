import { toast, ToastOptions } from 'react-toastify';
import * as React from 'react';
import { ToastContentProps } from 'react-toastify/dist/types';
import { Toast, TOAST_VARIANTS, ToastProps } from '@masterblaster/components';

type ToastId = React.ReactText;
type ToastContent =
  | React.ReactNode
  | ((props: ToastContentProps) => React.ReactNode);

type ToastBaseOptions = ToastOptions;
type SpecificToastOptions = Omit<ToastProps, 'variant'>;

interface UpdateOptions extends ToastBaseOptions {
  render: React.Component;
}

abstract class ToastServiceAbstract {
  abstract show: (content: ToastContent, options?: ToastBaseOptions) => ToastId;
  abstract update: (toastId: ToastId, options?: UpdateOptions) => void;

  abstract closeOne: (toastId: ToastId) => void;
  abstract closeAll: () => void;

  abstract isActive: (toastId: ToastId) => boolean;
}

class ToastifyService implements ToastServiceAbstract {
  show(content: ToastContent, options?: ToastBaseOptions): ToastId {
    return toast(content, options);
  }

  update(toastId: ToastId, options?: UpdateOptions) {
    toast.update(toastId, options);
  }

  closeOne(toastId: ToastId) {
    toast.dismiss(toastId);
  }

  closeAll() {
    toast.dismiss();
  }

  isActive(toastId: ToastId) {
    return toast.isActive(toastId);
  }
}


class ToastBaseService {
  protected readonly toastService: ToastServiceAbstract;

  constructor(toastService: ToastServiceAbstract) {
    this.toastService = toastService;
  }

  show(content: ToastContent, options?: ToastBaseOptions): ToastId {
    return this.toastService.show(content, options);
  }

  update(toastId: ToastId, options?: UpdateOptions) {
    this.toastService.update(toastId, options);
  }

  closeOne(toastId: ToastId) {
    this.toastService.closeOne(toastId);
  }

  closeAll() {
    this.toastService.closeAll();
  }

  isActive(toastId: ToastId) {
    return this.toastService.isActive(toastId);
  }
}

class ToastFacade extends ToastBaseService {
  showInfoPrimary(options: SpecificToastOptions) {
    return this.toastService.show(({ closeToast }) => (
      <Toast
        variant={TOAST_VARIANTS.INFO_PRIMARY}
        onClose={options.onClose || closeToast}
        {...options}
      />
    ));
  }

  showInfoSecondary(options: SpecificToastOptions) {
    return this.toastService.show(({ closeToast }) => (
      <Toast
        variant={TOAST_VARIANTS.INFO_SECONDARY}
        onClose={options.onClose || closeToast}
        {...options}
      />
    ));
  }

  showWarningPrimary(options: SpecificToastOptions) {
    return this.toastService.show(({ closeToast }) => (
      <Toast
        variant={TOAST_VARIANTS.WARNING_PRIMARY}
        onClose={options.onClose || closeToast}
        {...options}
      />
    ));
  }

  showWarningSecondary(options: SpecificToastOptions) {
    return this.toastService.show(({ closeToast }) => (
      <Toast
        variant={TOAST_VARIANTS.WARNING_SECONDARY}
        onClose={options.onClose || closeToast}
        {...options}
      />
    ));
  }

  showErrorPrimary(options: SpecificToastOptions) {
    return this.toastService.show(({ closeToast }) => (
      <Toast
        variant={TOAST_VARIANTS.ERROR_PRIMARY}
        onClose={options.onClose || closeToast}
        {...options}
      />
    ));
  }

  showErrorSecondary(options: SpecificToastOptions) {
    return this.toastService.show(({ closeToast }) => (
      <Toast
        variant={TOAST_VARIANTS.ERROR_SECONDARY}
        onClose={options.onClose || closeToast}
        {...options}
      />
    ));
  }

  showSuccessPrimary(options: SpecificToastOptions) {
    return this.toastService.show(({ closeToast }) => (
      <Toast
        variant={TOAST_VARIANTS.SUCCESS_PRIMARY}
        onClose={options.onClose || closeToast}
        {...options}
      />
    ));
  }

  showSuccessSecondary(options: SpecificToastOptions) {
    return this.toastService.show(({ closeToast }) => (
      <Toast
        variant={TOAST_VARIANTS.SUCCESS_SECONDARY}
        onClose={options.onClose || closeToast}
        {...options}
      />
    ));
  }

}

export const ToastService = new ToastFacade(new ToastifyService());
