import { SyntheticEvent } from 'react';
import {
  getBottomStyleValue,
  MOBILE_VIRTUAL_KEYBOARD_HEIGHT,
  usePopoverHandlers,
  getPopoverPosition,
} from './popover.util';
import { PopoverPosition } from '../../common-types/popover.types';

const isScreenDesktop = jest.fn();
const isUserAgentAppleMobilePlatform = jest.fn();
const useMediaQueryMatchesOnDesktopMock = jest.fn();
const useStateMock = jest.fn();

const expectedPositions = {
  BOTTOM: { left: '400px', top: '60px' },
  BOTTOM_LEFT: { left: '400px', top: '60px' },
  LEFT: { left: '300px', top: '40px' },
  RIGHT: { left: '500px', top: '40px' },
  TOP: { left: '400px', top: '20px' },
};

jest.mock('../useMediaQuery/useMediaQuery.hooks', () => ({
  isScreenDesktop: () => isScreenDesktop(),
  isUserAgentAppleMobilePlatform: () => isUserAgentAppleMobilePlatform(),
  useMediaQueryMatchesOnDesktop: () => useMediaQueryMatchesOnDesktopMock(),
}));

jest.mock('react', () => ({ useState: value => useStateMock(value) }));

describe('popover.util', () => {
  describe('getBottomStyleValue', () => {
    it('Should return MOBILE_VIRTUAL_KEYBOARD_HEIGHT', () => {
      isScreenDesktop.mockReturnValue(false);
      isUserAgentAppleMobilePlatform.mockReturnValue(true);
      expect(getBottomStyleValue(true)).toBe(MOBILE_VIRTUAL_KEYBOARD_HEIGHT);
    });

    it('Should return null', () => {
      isScreenDesktop.mockReturnValue(false);
      isUserAgentAppleMobilePlatform.mockReturnValue(true);
      expect(getBottomStyleValue(false)).toBeNull();
    });
  });

  describe('usePopoverHandlers', () => {
    let setAnchorElMock;
    let setHasAnimation;

    beforeEach(() => {
      jest.useFakeTimers();
      useStateMock.mockClear();
      setAnchorElMock = jest.fn();
      setHasAnimation = jest.fn();
    });

    it('should return PopoverHandlers', () => {
      useStateMock.mockReturnValue([null]);
      useMediaQueryMatchesOnDesktopMock.mockReturnValue(false);

      const {
        anchorEl,
        handlePopoverOpen,
        handlePopoverClose,
      } = usePopoverHandlers();

      expect(anchorEl).toBe(null);
      expect(handlePopoverOpen).toEqual(expect.any(Function));
      expect(handlePopoverClose).toEqual(expect.any(Function));
    });

    it('should set anchorEl on open', () => {
      const fakeEvent = {
        currentTarget: {},
      } as SyntheticEvent<HTMLElement>;

      useStateMock
        .mockReturnValueOnce([null, setAnchorElMock])
        .mockReturnValueOnce([false, setHasAnimation]);
      useMediaQueryMatchesOnDesktopMock.mockReturnValue(false);

      const { handlePopoverOpen } = usePopoverHandlers();
      handlePopoverOpen(fakeEvent, null, true, false);

      expect(setHasAnimation).toHaveBeenCalledWith(true);
      expect(setAnchorElMock).toHaveBeenCalledWith(document.body);
    });

    it('should remove anchorEl on close', () => {
      useStateMock
        .mockReturnValueOnce([{}, setAnchorElMock])
        .mockReturnValueOnce([false, setHasAnimation]);
      useMediaQueryMatchesOnDesktopMock.mockReturnValue(false);

      const { handlePopoverClose } = usePopoverHandlers();
      handlePopoverClose();
      jest.runAllTimers();

      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 0);
      expect(setAnchorElMock).toHaveBeenCalledWith(null);
    });

    it('should call "close" callback on close', () => {
      const closeMock = jest.fn();
      useStateMock
        .mockReturnValueOnce([{}, setAnchorElMock])
        .mockReturnValueOnce([false, setHasAnimation]);
      useMediaQueryMatchesOnDesktopMock.mockReturnValue(false);

      const { handlePopoverClose } = usePopoverHandlers({ close: closeMock });
      handlePopoverClose();
      jest.runAllTimers();

      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 0);
      expect(closeMock).toHaveBeenCalled();
    });

    it('should closed with animation', () => {
      const closeMock = jest.fn();
      useStateMock
        .mockReturnValueOnce([{}, setAnchorElMock])
        .mockReturnValueOnce([true, setHasAnimation]);
      useMediaQueryMatchesOnDesktopMock.mockReturnValue(true);

      const { handlePopoverClose } = usePopoverHandlers({ close: closeMock });
      handlePopoverClose();
      jest.runAllTimers();

      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 300);
      expect(closeMock).toHaveBeenCalled();
    });
  });

  describe('getPopoverPosition', () => {
    const anchorEl = document.createElement('div');
    let getBoundingClientRectMock;
    const getPopoverPositionWithBindParams = position =>
      getPopoverPosition(anchorEl, false, position, false, false);

    beforeAll(() => {
      getBoundingClientRectMock = jest
        .spyOn(window.HTMLElement.prototype, 'getBoundingClientRect')
        .mockImplementation(() => ({
          bottom: 50,
          height: 40,
          left: 300,
          right: 500,
          top: 20,
          width: 200,
          x: 300,
          y: 20,
          toJSON: jest.fn(),
        }));
    });

    afterAll(() => {
      getBoundingClientRectMock.mockRestore();
    });

    it('should return "null" if anchorEl is not passed', () => {
      expect(
        getPopoverPosition(null, false, PopoverPosition.BOTTOM, false, false)
      ).toBe(null);
    });

    Object.entries(PopoverPosition).forEach(([key, value]) => {
      it(`should return popover ${key} position`, () => {
        expect(getPopoverPositionWithBindParams(value)).toEqual(
          expectedPositions[key]
        );
      });
    });

    it('should return popover position for "sticky"', () => {
      expect(
        getPopoverPosition(anchorEl, false, PopoverPosition.BOTTOM, true, false)
      ).toEqual({ left: '400px', top: '59px', width: '200px' });
    });

    it('should return popover position for "stickyWrapper"', () => {
      expect(
        getPopoverPosition(anchorEl, false, PopoverPosition.BOTTOM, false, true)
      ).toEqual({ left: '400px', top: '60px', position: 'fixed' });
    });

    it('should return popover position for "mobileVirtualKeyboardOn"', () => {
      expect(
        getPopoverPosition(anchorEl, true, PopoverPosition.BOTTOM, false, false)
      ).toEqual({
        left: '400px',
        top: '60px',
        bottom: '240px',
        transition: 'bottom 0.15s ease-in-out 0.15s',
      });
    });
  });
});
