import React from 'react';
import { render } from '@testing-library/react';

import { useMediaQuery } from './useMediaQuery.hooks';
import '../../__mocks__/matchMedia.mock';

const TestComponent = ({ query }) =>
  useMediaQuery(query) ? <>narrow</> : <>wide</>;

describe('useMediaQueryHook', () => {
  it('should create mediaQueryList for corresponding query', () => {
    render(<TestComponent query="(min-width: 320) and (max-width: 526px)" />);

    expect(matchMedia).toBeCalledWith(
      '(min-width: 320) and (max-width: 526px)'
    );
    expect(matchMedia).toBeCalledTimes(1);
  });
});
