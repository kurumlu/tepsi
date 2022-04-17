/* BASED ON:
 * ! iNoBounce - v0.2.0
 * https://github.com/lazd/iNoBounce/
 * Copyright (c) 2013 Larry Davis <lazdnet@gmail.com>; Licensed BSD
 *
 * NOTE: CODE HAS BEEN REMOVED OR CHANGED FOR OUR SPECIFIC USE CASE */

// Stores the Y position where the touch started
let startY = 0;
let startX = 0;

// Store enabled status
let enabled = false;

let supportsPassiveOption = false;
try {
  const opts = Object.defineProperty({}, 'passive', {
    // eslint-disable-next-line getter-return
    get: function () {
      supportsPassiveOption = true;
    },
  });
  window.addEventListener('test', null, opts);
} catch (e) {}

const handleTouchmove = function (evt) {
  // Get the element that was scrolled upon
  let el = evt.target;

  // Allow zooming
  const zoom = window.innerWidth / window.document.documentElement.clientWidth;
  if (evt.touches.length > 1 || zoom !== 1) {
    return;
  }

  // Check all parent elements for scrollability
  while (el !== document.body && el !== document) {
    // Get some style properties
    const style = window.getComputedStyle(el);

    if (!style) {
      // If we've encountered an element we can't compute the style for, get out
      break;
    }

    // Ignore range input element
    if (el.nodeName === 'INPUT' && el.getAttribute('type') === 'range') {
      return;
    }

    // const scrolling = style.getPropertyValue('-webkit-overflow-scrolling'); // NOTE: PROPERTY NO LONGER USED, SEE https://developer.apple.com/documentation/safari_release_notes/safari_13_release_notes
    const overflowY = style.getPropertyValue('overflow-y');
    const height = parseInt(style.getPropertyValue('height'), 10);
    const width = parseInt(style.getPropertyValue('width'), 10);

    // Determine if the element should scroll
    const isScrollable =
      // scrolling === 'touch' && // NOTE: PROPERTY NO LONGER USED ^
      overflowY === 'auto' || overflowY === 'scroll';
    const canScroll =
      el.scrollHeight > el.offsetHeight || el.scrollWidth > el.offsetWidth;

    if (isScrollable && canScroll) {
      // Get the current Y position of the touch
      const curY = evt.touches ? evt.touches[0].screenY : evt.screenY;
      const curX = evt.touches ? evt.touches[0].screenX : evt.screenX;

      // Determine if we are scrolling vertical or horizontal
      const isVertical = Math.abs(startY - curY) > Math.abs(startX - curX);

      if (isVertical) {
        // Determine if the user is trying to scroll past the top or bottom
        // In this case, the window will bounce, so we have to prevent scrolling completely
        const isAtTop = startY <= curY && el.scrollTop === 0;
        const isAtBottom =
          startY >= curY && el.scrollHeight - el.scrollTop === height;

        // Stop a bounce bug when at the bottom or top of the scrollable element
        if (isAtTop || isAtBottom) {
          if (evt.cancelable) {
            evt.preventDefault();
          }
        }
      } else {
        const isAtLeft = startX <= curX && el.scrollLeft === 0;
        const isAtRight =
          startX >= curX && el.scrollWidth - el.scrollLeft === width;

        // Stop a bounce bug when at the bottom or top of the scrollable element
        if (isAtLeft || isAtRight) {
          if (evt.cancelable) {
            evt.preventDefault();
          }
        }
      }

      // No need to continue up the DOM, we've done our job
      return;
    }

    // Test the next parent
    el = el.parentNode;
  }

  // Stop the bouncing -- no parents are scrollable
  if (evt.cancelable) {
    evt.preventDefault();
  }
};

const handleTouchstart = function (evt) {
  // Store the first Y position of the touch
  startY = evt.touches ? evt.touches[0].screenY : evt.screenY;
  startX = evt.touches ? evt.touches[0].screenX : evt.screenX;
};

const enable = function () {
  // Listen to a couple key touch events
  window.addEventListener(
    'touchstart',
    handleTouchstart,
    supportsPassiveOption ? { passive: false } : false
  );
  window.addEventListener(
    'touchmove',
    handleTouchmove,
    supportsPassiveOption ? { passive: false } : false
  );
  enabled = true;
};

const disable = function () {
  // Stop listening
  window.removeEventListener('touchstart', handleTouchstart, false);
  window.removeEventListener('touchmove', handleTouchmove, false);
  enabled = false;
};

const isEnabled = function () {
  return enabled;
};

export default {
  enable: enable,
  disable: disable,
  isEnabled: isEnabled,
};
