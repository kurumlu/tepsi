import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Icon, IconProps, IconName } from './Icon';
import { mockIconProps } from './icon.mock';

describe('<Icon />', () => {
  it('renders with default props', () => {
    const component: ShallowWrapper<IconProps> = shallow(
      <Icon name={IconName.HEART} />
    );

    expect(component).toMatchSnapshot();
  });

  it('renders with props', () => {
    const component: ShallowWrapper<IconProps> = shallow(
      <Icon {...mockIconProps} />
    );

    expect(component).toMatchSnapshot();
  });
});
