import { useEffect, useRef, useCallback } from 'react';

// Array of selectors clicking inside them
// Popover will not be closed
const IGNORE_POPOVER_SELECTORS = [
  '.sd-m-popover',
  '.sd-m-popover--sticky',
  '.sd-a-input-searchbox-wrapper',
  '.cookie-message',
  '.cookie-message__button',
  '.sd-m-image-zoom__zoom-image',
];

export const useHandleClickOutside = (
  isOpen: boolean,
  setIsOpen: (state: boolean) => void,
  disabled?: boolean
) => {
  const node = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event): void => {
      const e = event.target;
      const filteredSelectors = IGNORE_POPOVER_SELECTORS.filter(
        (selector: string) =>
          e.classList.contains(selector.replace(/./i, '')) ||
          Array.from(
            document.querySelectorAll(selector)
          ).some((el: HTMLElement) => el.contains(e))
      );

      if (
        (node.current && node.current.contains(e)) ||
        filteredSelectors.length > 0
      ) {
        // inside click
        return;
      }

      // outside click
      setIsOpen(false);
    },
    [setIsOpen]
  );

  useEffect(() => {
    if (disabled) {
      return () => false;
    } else {
      if (isOpen) {
        document.addEventListener('click', handleClickOutside, false);
      } else {
        document.removeEventListener('click', handleClickOutside, false);
      }

      return () => {
        document.removeEventListener('click', handleClickOutside, false);
      };
    }
  }, [disabled, handleClickOutside, isOpen]);

  return node;
};
