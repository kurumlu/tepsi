import { useHandleClickOutside } from './click-outside.util';
import { renderHook } from '@testing-library/react-hooks';

describe('useHandleClickOutside', () => {
  const nodeOutside = document.createElement('p');
  const nodeToWatch = document.createElement('p');

  const event = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  });

  const callback = jest.fn();
  const isOpen = true;
  let node;

  beforeAll((): void => {
    document.body.appendChild(nodeOutside);
    document.body.appendChild(nodeToWatch);

    renderHook((): void => {
      node = useHandleClickOutside(isOpen, callback);

      node.current = nodeToWatch;
    });
  });

  beforeEach((): void => {
    jest.clearAllMocks();
  });

  it('calls the callback when the click is outside', (): void => {
    nodeOutside.dispatchEvent(event);
    expect(callback).toHaveBeenCalled();
  });
});
