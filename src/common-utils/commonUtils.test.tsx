import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { isTouchScreen } from './screen.util';
import { concatSearchItemsSubtitles } from './search.util';
import {
  EmailChangeHandler,
  EmailChangeHandlerProps,
} from './email-change-handler.util';
import { isValidDate } from './date.util';

describe('screen.util.ts', () => {
  it('is ontouchstart', () => {
    expect(isTouchScreen()).toBeFalsy();
  });
});

describe('search.util.ts', () => {
  it('concatSearchItemsSubtitles', () => {
    expect(concatSearchItemsSubtitles(['one', 'two', 'three', 'four'])).toBe(
      'one, two'
    );
  });
});

describe('<EmailChangeHandler />', () => {
  it('should call onChange', () => {
    const onChange = jest.fn();
    const email = 'test';
    const component: ReactWrapper<EmailChangeHandlerProps> = mount(
      <EmailChangeHandler onChange={onChange} email="" />
    );

    component.setProps({ email });

    expect(onChange).toHaveBeenCalledWith(email);
  });
});

describe('date.util.ts', () => {
  it('isValidDate', () => {
    expect(isValidDate('')).toBeFalsy();
    expect(isValidDate('123')).toBeFalsy();
    expect(isValidDate('x/x/x')).toBeFalsy();
    expect(isValidDate('1.1.1900', '/')).toBeFalsy();
    expect(isValidDate('1/2')).toBeFalsy();
    expect(isValidDate('1/2/3/4')).toBeFalsy();
    expect(isValidDate('31/2/2021')).toBeFalsy();
    expect(isValidDate('/1/1900')).toBeFalsy();

    expect(isValidDate('31/7/1996')).toBeTruthy();
    expect(isValidDate('31.7.1996', '.')).toBeTruthy();
  });
});
