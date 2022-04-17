import * as React from 'react';
import { FunctionComponent, useRef } from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

const NAV_ELEMENT = '.navigation-horizontal';
const MODIFIER_CLASS = 'navigation-horizontal--collapse';
const MIN_SCROLL_DISTANCE = -100;
const WAIT = 10;

export type MobileNavScrollObserverProps = {
  forceNavToBeShown: boolean;
};

export const MobileNavScrollObserver: FunctionComponent<MobileNavScrollObserverProps> = ({
  forceNavToBeShown,
}) => {
  const observeEl = useRef(null);
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const navEl = observeEl ? observeEl.current.closest(NAV_ELEMENT) : null;
      if (navEl && forceNavToBeShown) {
        navEl.classList.remove(MODIFIER_CLASS);
      } else if (
        navEl &&
        (currPos.y > MIN_SCROLL_DISTANCE || currPos.y > prevPos.y)
      ) {
        navEl.classList.remove(MODIFIER_CLASS);
      } else if (navEl && currPos.y !== prevPos.y) {
        navEl.classList.add(MODIFIER_CLASS);
      }
    },
    [observeEl, forceNavToBeShown],
    null,
    false,
    WAIT
  );

  return <span ref={observeEl} style={{ display: 'none' }} />;
};
