import { useState, SyntheticEvent } from 'react';
import {
  isScreenDesktop,
  isUserAgentAppleMobilePlatform,
  useMediaQueryMatchesOnDesktop,
} from '../useMediaQuery/useMediaQuery.hooks';
import { PopoverPosition } from '../../common-types/popover.types';

export const POPOVER_ANIMATION_DURATION = 300;
export const MOBILE_VIRTUAL_KEYBOARD_HEIGHT = '240px';
const BOTTOM_TRANSITION_VALUE = 'bottom 0.15s ease-in-out 0.15s';

type PopoverHandlers = {
  anchorEl: HTMLElement | null;
  handlePopoverOpen: (
    e: SyntheticEvent | null,
    el?: HTMLElement | null,
    emulate?: boolean,
    immediate?: boolean
  ) => void;
  handlePopoverClose: () => void;
};

type PopoverHandlersProps = {
  open?: () => void;
  close?: () => void;
};

export const getBottomStyleValue = (
  mobileVirtualKeyboardOn: boolean
): string | null => {
  return !isScreenDesktop() &&
    isUserAgentAppleMobilePlatform() &&
    mobileVirtualKeyboardOn
    ? MOBILE_VIRTUAL_KEYBOARD_HEIGHT
    : null;
};

export const usePopoverHandlers = (
  { open, close }: PopoverHandlersProps = {
    open: null,
    close: null,
  }
): PopoverHandlers => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [hasAnimation, setHasAnimation] = useState<boolean>(true);
  const isDesktop = useMediaQueryMatchesOnDesktop();

  const handlePopoverOpen = (
    e: SyntheticEvent<HTMLElement> | null,
    el?: HTMLElement | null,
    emulate?: boolean,
    immediate = false
  ) => {
    let reference = e?.currentTarget ? e.currentTarget : el;
    setHasAnimation(!immediate);

    if (emulate) {
      reference = document.body;
    }

    setAnchorEl(reference);
    typeof open === 'function' && open();
  };

  const closePopover = () => {
    setAnchorEl(null);
    typeof close === 'function' && close();
  };

  const handlePopoverClose = () => {
    if (!anchorEl) return;

    setTimeout(
      () => closePopover(),
      isDesktop && hasAnimation ? POPOVER_ANIMATION_DURATION : 0
    );
  };

  return { anchorEl, handlePopoverOpen, handlePopoverClose };
};

export const getPopoverPosition = (
  anchorEl: HTMLElement | null,
  mobileVirtualKeyboardOn: boolean,
  position: PopoverPosition,
  sticky: boolean,
  stickyWrapper: boolean
) => {
  if (anchorEl === null) return null;
  let frameLeft = 0;

  // In case a Popover opens inside an iframe
  if (window !== window.top && anchorEl && anchorEl.closest('body')) {
    const frameRect = anchorEl.closest('body').getBoundingClientRect();

    frameLeft = frameRect.left;
  }

  const extraOffsetLinkButton = 4;
  const extraOffsetIconButton = 8;
  const extraOffsetTransparentButton = 10;

  const rect = anchorEl.getBoundingClientRect();
  const scrolledTopPos =
    rect.top + (stickyWrapper ? 0 : window.pageYOffset) - (sticky ? 1 : 0);
  const anchorHalfHeight = rect.height / 2;
  const anchorHalfWidth = rect.width / 2;
  const transparentButtonOffset = (() => {
    const anchorClassList = anchorEl.classList;

    if (anchorClassList.contains('as-a-btn--icon-button')) {
      return extraOffsetIconButton;
    }
    if (anchorClassList.contains('as-a-btn--button-as-link')) {
      return extraOffsetLinkButton;
    }
    if (
      anchorClassList.contains('as-a-btn--transparent') ||
      anchorClassList.contains('as-a-btn--subtle')
    ) {
      return extraOffsetTransparentButton;
    }

    return 0;
  })();
  let styles = {};

  switch (position) {
    case PopoverPosition.BOTTOM:
      styles = {
        top: `${scrolledTopPos + rect.height - transparentButtonOffset}px`,
        left: `${rect.left + anchorHalfWidth + frameLeft}px`,
      };
      break;

    case PopoverPosition.BOTTOM_LEFT:
      styles = {
        top: `${scrolledTopPos + rect.height - transparentButtonOffset}px`,
        left: `${rect.left + anchorHalfWidth + frameLeft}px`,
      };
      break;

    case PopoverPosition.LEFT:
      styles = {
        top: `${scrolledTopPos + anchorHalfHeight}px`,
        left: `${rect.left + frameLeft}px`,
      };
      break;

    case PopoverPosition.RIGHT:
      styles = {
        top: `${scrolledTopPos + anchorHalfHeight}px`,
        left: `${rect.right + frameLeft}px`,
      };
      break;

    case PopoverPosition.TOP:
      styles = {
        top: `${scrolledTopPos + transparentButtonOffset}px`,
        left: `${rect.left + anchorHalfWidth + frameLeft}px`,
      };
      break;
  }

  if (sticky) {
    styles = { ...styles, width: `${Math.floor(rect.width)}px` };
  }

  if (stickyWrapper) {
    styles = { ...styles, position: 'fixed' };
  }

  const bottomStyleValue = getBottomStyleValue(mobileVirtualKeyboardOn);
  if (bottomStyleValue) {
    styles = {
      ...styles,
      transition: BOTTOM_TRANSITION_VALUE,
      bottom: bottomStyleValue,
    };
  }

  return styles;
};
