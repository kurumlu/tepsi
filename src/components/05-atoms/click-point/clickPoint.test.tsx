import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ClickPoint, ClickPointProps } from './ClickPoint';
import { clickPointMock } from './clickPoint.mock';

describe('<ClickPoint />', () => {
  it('renders with default props', () => {
    const onClick = jest.fn();
    const component: ShallowWrapper<ClickPointProps> = shallow(
      <ClickPoint onClick={onClick} />
    );

    expect(component).toMatchSnapshot('default props');
  });

  it('renders with props', () => {
    const component: ShallowWrapper<ClickPointProps> = shallow(
      <ClickPoint {...clickPointMock} />
    );

    expect(component).toMatchSnapshot('with props');
  });

  it('renders as active', () => {
    const component: ShallowWrapper<ClickPointProps> = shallow(
      <ClickPoint {...clickPointMock} isActive />
    );

    expect(component.hasClass('as-a-click-point--is-active')).toBeTruthy();
  });

  it('calls onClick callback by clicking', () => {
    const onClick = jest.fn();
    const component: ShallowWrapper<ClickPointProps> = shallow(
      <ClickPoint onClick={onClick} />
    );

    component.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
