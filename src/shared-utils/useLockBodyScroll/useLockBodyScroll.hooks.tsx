import useIsomorphicLayoutEffect from '../../common-utils/use-effect.util';
import { isScreenTablet } from '../useMediaQuery/useMediaQuery.hooks';
import { getScrollbarSize } from '../getScrollbarSize/getScrollbarSize';
import iNoBounce from './iNoBounce';

type OriginalStyles = {
  overflow: string;
  width: string;
  height: string;
  documentHeight: string;
  position: string;
  top: string;
  boxSizing: string;
  scrollY: number;
  previewItemTop?: string;
  previewItemPosition?: string;
};

const lockState = {
  originalStyles: {} as OriginalStyles,
  lockScrollIDs: new Set<string>(),
};

const _lockBodyScroll = () => {
  let lockEvent = new Event('SCROLL_LOCKED', {
    bubbles: true,
    cancelable: true,
  });
  const scrollbarSize = getScrollbarSize();
  const lockScrollID = Math.random().toString().slice(2, 8);
  const bodyWrapper = document.getElementById('body-wrapper');
  const stickyBar = document.querySelector('.sd-t-sticky-bar') as HTMLElement;
  const zEWidget = document.querySelector('.zEWidget-launcher') as HTMLElement;
  const comparePopup = document.querySelector(
    '.sd-m-compare-popup'
  ) as HTMLElement;
  const previewItemPDPSticky = document.querySelector(
    '.sd-t-pdp-layout--preview-item-sticky .sd-t-pdp-layout__item--preview'
  ) as HTMLElement;
  const shouldLockScroll = lockState.lockScrollIDs.size === 0;
  lockState.lockScrollIDs.add(lockScrollID);

  if (shouldLockScroll) {
    lockState.originalStyles.overflow = document.body.style.overflow;
    lockState.originalStyles.width = document.body.style.width;
    lockState.originalStyles.height = document.body.style.height;
    lockState.originalStyles.position = document.body.style.position;
    lockState.originalStyles.top = document.body.style.top;
    lockState.originalStyles.boxSizing = document.body.style.boxSizing;
    lockState.originalStyles.scrollY = window.scrollY || window.pageYOffset;
    lockState.originalStyles.documentHeight =
      document.documentElement.style.height;

    if (previewItemPDPSticky) {
      const { top, position } = getComputedStyle(previewItemPDPSticky);
      lockState.originalStyles.previewItemTop = top;
      lockState.originalStyles.previewItemPosition = position;
    }

    document.body.style.overflow = 'hidden';
    document.body.style.width = `calc(100% - ${scrollbarSize}px)`;
    document.body.style.height = '100%';
    document.body.style.position = 'fixed';
    document.body.style.boxSizing = 'border-box';

    document.body.style.top = `-${lockState.originalStyles.scrollY}px`;

    document.documentElement.style.height = '100vh';

    if (bodyWrapper) {
      bodyWrapper.style.overflowX = 'hidden';
    }

    if (stickyBar) {
      stickyBar.style.right = `${scrollbarSize}px`;
    }
    if (zEWidget) {
      zEWidget.style.right = `${scrollbarSize}px`;
    }
    if (comparePopup) {
      comparePopup.style.marginRight = `${scrollbarSize}px`;
    }
    if (
      previewItemPDPSticky &&
      lockState.originalStyles.previewItemPosition === 'sticky'
    ) {
      previewItemPDPSticky.style.top = `${
        lockState.originalStyles.scrollY +
        parseFloat(lockState.originalStyles.previewItemTop)
      }px`;
    }

    document.dispatchEvent(lockEvent);

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 200);

    iNoBounce.enable();
  }

  return () => {
    lockState.lockScrollIDs.delete(lockScrollID);
    const shouldUnlockScroll = lockState.lockScrollIDs.size === 0;

    if (shouldUnlockScroll) {
      lockEvent = null;
      document.body.style.overflow = lockState.originalStyles.overflow;
      document.body.style.width = lockState.originalStyles.width;
      document.body.style.height = lockState.originalStyles.height;
      document.body.style.position = lockState.originalStyles.position;
      document.body.style.top = lockState.originalStyles.top;
      document.body.style.boxSizing = lockState.originalStyles.boxSizing;
      document.documentElement.style.height =
        lockState.originalStyles.documentHeight;

      if (bodyWrapper) {
        bodyWrapper.style.overflowX = null;
      }

      if (stickyBar) {
        stickyBar.style.right = '0';
      }
      if (zEWidget) {
        zEWidget.style.right = '0';
      }
      if (comparePopup) {
        comparePopup.style.marginRight = '0';
      }
      if (
        previewItemPDPSticky &&
        lockState.originalStyles.previewItemPosition === 'sticky'
      ) {
        previewItemPDPSticky.style.top =
          lockState.originalStyles.previewItemTop;
      }

      window.scrollTo(0, lockState.originalStyles.scrollY);

      iNoBounce.disable();
    }
  };
};

export const useLockBodyScroll = (enabled = true) =>
  useIsomorphicLayoutEffect(() => (enabled ? _lockBodyScroll() : undefined), [
    enabled,
  ]);

// isScreenTablet - can't use a hook in conditional case
export const useLockBodyScrollOnTablet = (enabled = true) =>
  useIsomorphicLayoutEffect(
    () => (enabled && isScreenTablet() ? _lockBodyScroll() : undefined),
    [enabled]
  );
