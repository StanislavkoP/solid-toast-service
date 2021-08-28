import * as React from 'react';
import { toast } from 'react-toastify';
import { Toast, TOAST_VARIANTS } from '@masterblaster/components';

class ToastifyService {
  show(content, options) {
    return toast(content, options);
  }

  update(toastId, options) {
    toast.update(toastId, options);
  }

  closeOne(toastId) {
    toast.dismiss(toastId);
  }

  closeAll() {
    toast.dismiss();
  }

  isActive(toastId) {
    return toast.isActive(toastId);
  }
}

class ToastBaseFacade {
  constructor(toastService) {
    this.toastService = toastService;
  }

  show(content, options) {
    return this.toastService.show(content, options);
  }

  update(toastId, options) {
    this.toastService.update(toastId, options);
  }

  closeOne(toastId) {
    this.toastService.closeOne(toastId);
  }

  closeAll() {
    this.toastService.closeAll();
  }

  isActive(toastId) {
    return this.toastService.isActive(toastId);
  }
}

class ToastFacade extends ToastBaseFacade {
  constructor(toastService) {
    super(toastService)
  }

  showInfoPrimary(options) {
    return this.toastService.show(({ closeToast }) => (
      <Toast
        variant={TOAST_VARIANTS.INFO_PRIMARY}
        onClose={options.onClose || closeToast}
        {...options}
      />
    ));
  }

  showInfoSecondary(options) {
    return this.toastService.show(({ closeToast }) => (
      <Toast
        variant={TOAST_VARIANTS.INFO_SECONDARY}
        onClose={options.onClose || closeToast}
        {...options}
      />
    ));
  }

  showWarningPrimary(options) {
    return this.toastService.show(({ closeToast }) => (
      <Toast
        variant={TOAST_VARIANTS.WARNING_PRIMARY}
        onClose={options.onClose || closeToast}
        {...options}
      />
    ));
  }

  showWarningSecondary(options) {
    return this.toastService.show(({ closeToast }) => (
      <Toast
        variant={TOAST_VARIANTS.WARNING_SECONDARY}
        onClose={options.onClose || closeToast}
        {...options}
      />
    ));
  }

  showErrorPrimary(options) {
    return this.toastService.show(({ closeToast }) => (
      <Toast
        variant={TOAST_VARIANTS.ERROR_PRIMARY}
        onClose={options.onClose || closeToast}
        {...options}
      />
    ));
  }

  showErrorSecondary(options) {
    return this.toastService.show(({ closeToast }) => (
      <Toast
        variant={TOAST_VARIANTS.ERROR_SECONDARY}
        onClose={options.onClose || closeToast}
        {...options}
      />
    ));
  }

  showSuccessPrimary(options) {
    return this.toastService.show(({ closeToast }) => (
      <Toast
        variant={TOAST_VARIANTS.SUCCESS_PRIMARY}
        onClose={options.onClose || closeToast}
        {...options}
      />
    ));
  }

  showSuccessSecondary(options) {
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
