import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Group, GroupProps, GroupWrap } from './Group';
import { mockGroupProps } from './group.mock';

describe('<Group />', () => {
  it('renders with default props', () => {
    const component: ShallowWrapper<GroupProps> = shallow(<Group />);

    expect(component).toMatchSnapshot();
  });

  it('renders with props', () => {
    const component: ShallowWrapper<GroupProps> = shallow(
      <Group {...mockGroupProps} />
    );

    expect(component).toMatchSnapshot();
  });

  it('renders with children', () => {
    const component: ShallowWrapper<GroupProps> = shallow(
      <Group>
        <div>Children</div>
      </Group>
    );

    expect(component).toMatchSnapshot();
  });

  it('renders with column prop', () => {
    const component: ShallowWrapper<GroupProps> = shallow(<Group column />);

    expect(component.hasClass('sd-m-group--column')).toBe(true);
    expect(component).toMatchSnapshot('with column prop');
  });

  it('renders with equalSize prop', () => {
    const component: ShallowWrapper<GroupProps> = shallow(<Group equalSize />);

    expect(component.hasClass('sd-m-group--equal-size')).toBeTruthy();
    expect(component).toMatchSnapshot('with inlineUniform prop');
  });

  it('renders with wrap prop', () => {
    const component: ShallowWrapper<GroupProps> = shallow(
      <Group wrap={GroupWrap.REVERSE} />
    );

    expect(component.hasClass('sd-m-group--wrap-wrap-reverse')).toBe(true);
    expect(component).toMatchSnapshot('with wrap prop');
  });
});
