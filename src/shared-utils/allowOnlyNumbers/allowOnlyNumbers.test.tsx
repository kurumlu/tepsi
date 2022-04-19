import React from 'react';
import { allowOnlyNumbers } from './allowOnlyNumbers';
import { mockNotPreventEvent, mockPreventEvent } from './allowOnlyNumbers.mock';
import { Input } from '../../components/05-atoms/input/Input';
import { mount } from 'enzyme';
import { waitForComponent } from '../../common-utils/jest.util';

describe('allowOnlyNumbers', () => {
  it('preventDefault should not to be called', () => {
    const wrapper = mount(
      <Input id="test" onKeyDown={allowOnlyNumbers} name="test" />
    );
    wrapper.find('.sd-a-input__input').simulate('keydown', mockNotPreventEvent);
    waitForComponent(wrapper);

    expect(mockNotPreventEvent.preventDefault).not.toHaveBeenCalled();
  });

  it('preventDefault should be called ', () => {
    const wrapper = mount(
      <Input id="test" onKeyDown={allowOnlyNumbers} name="test" />
    );
    wrapper.find('.sd-a-input__input').simulate('keydown', mockPreventEvent);
    waitForComponent(wrapper);

    expect(mockPreventEvent.preventDefault).toHaveBeenCalled();
  });
});
