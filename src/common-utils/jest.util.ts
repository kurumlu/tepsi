import { ReactWrapper, ShallowWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

// Async unit testing
// Uses for Formik components
export const waitForComponent = async <T>(
  wrapper: ReactWrapper<T> | ShallowWrapper<T>
) => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
    wrapper.update();
  });
};

export const delay = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time));

// Helper utils for Touch events
const _createClientXY = (x: number, y: number) => ({ clientX: x, clientY: y });

export const createStartTouchEventObject = ({ x = 0, y = 0 }) => ({
  touches: [_createClientXY(x, y)],
});

export const createMoveTouchEventObject = ({ x = 0, y = 0 }) => ({
  touches: [_createClientXY(x, y)],
  changedTouches: [_createClientXY(x, y)],
});

export const getSelector = (id: string) => `[data-qa="${id}"]`;
