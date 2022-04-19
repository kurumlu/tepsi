import React from 'react';
import {
  useLockBodyScroll,
  useLockBodyScrollOnTablet,
} from './useLockBodyScroll.hooks';
import { mount } from 'enzyme';

const globalAny: any = global; // eslint-disable-line @typescript-eslint/no-explicit-any

jest.mock('../getScrollbarSize/getScrollbarSize', () => ({
  getScrollbarSize: jest.fn().mockReturnValue(30),
}));

jest.mock('../useMediaQuery/useMediaQuery.hooks', () => ({
  isScreenTablet: jest.fn().mockReturnValue(true),
}));

describe('lockBodyScroll', () => {
  const TestComponent = ({ shouldUseLockBodyScroll }) => {
    useLockBodyScroll(shouldUseLockBodyScroll);
    return <div>Scroll lock div</div>;
  };

  beforeEach(() => {
    document.body.style.overflow = 'auto';
  });

  it('adds hidden overflow style to body when shouldLock is true', () => {
    const wrapper = mount(<TestComponent shouldUseLockBodyScroll />);
    globalAny.scrollTo = jest.fn();
    expect(document.body.style.overflow).toBe('hidden');

    wrapper.unmount();
    expect(document.body.style.overflow).toBe('auto');
    expect(globalAny.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('update styles of html elements on mount/unmount', () => {
    const bodyWrapper = document.createElement('div');
    const stickyBar = document.createElement('div');
    const zEWidget = document.createElement('div');
    const comparePopup = document.createElement('div');
    bodyWrapper.id = 'body-wrapper';
    stickyBar.className = 'sd-t-sticky-bar';
    zEWidget.className = 'zEWidget-launcher';
    comparePopup.className = 'sd-m-compare-popup';

    document.body.append(bodyWrapper, stickyBar, zEWidget, comparePopup);

    const wrapper = mount(<TestComponent shouldUseLockBodyScroll />);

    expect(bodyWrapper.style.overflowX).toBe('hidden');
    expect(stickyBar.style.right).toBe('30px');
    expect(zEWidget.style.right).toBe('30px');
    expect(comparePopup.style.marginRight).toBe('30px');

    wrapper.unmount();

    expect(bodyWrapper.style.overflowX).toBeFalsy();
    expect(stickyBar.style.right).toBe('0px');
    expect(zEWidget.style.right).toBe('0px');
    expect(comparePopup.style.marginRight).toBe('0px');
  });

  describe('useLockBodyScrollOnTablet', () => {
    const TestComponent = () => {
      useLockBodyScrollOnTablet();
      return <div>Scroll lock for tablet</div>;
    };

    it('add hidden for body and scroll to top', () => {
      const wrapper = mount(<TestComponent />);
      globalAny.scrollTo = jest.fn();
      expect(document.body.style.overflow).toBe('hidden');

      wrapper.unmount();

      expect(document.body.style.overflow).toBe('auto');
      expect(globalAny.scrollTo).toHaveBeenCalledWith(0, 0);
    });
  });
});
