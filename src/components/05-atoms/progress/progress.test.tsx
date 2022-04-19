import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Progress, ProgressProps } from './Progress';

describe('<Progress />', () => {
  it('should render with default props', () => {
    const wrapper: ShallowWrapper<ProgressProps> = shallow(
      <Progress progress={25} />
    );

    expect(wrapper).toMatchSnapshot('default');
  });

  it('should set 100% progress if passed value is greater than 100', () => {
    const wrapper: ShallowWrapper<ProgressProps> = shallow(
      <Progress progress={110} />
    );

    expect(wrapper.find('.sd-a-progress__bar').props().style.width).toBe(
      '100%'
    );
  });

  it('should set 0% progress if passed value is less than 0', () => {
    const wrapper: ShallowWrapper<ProgressProps> = shallow(
      <Progress progress={-10} />
    );

    expect(wrapper.find('.sd-a-progress__bar').props().style.width).toBe('0%');
  });
});
