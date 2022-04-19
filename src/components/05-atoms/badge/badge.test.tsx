import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { Badge, BadgeProps, BadgeColor } from './Badge';
import { mockBadgeDefault } from './badge.mock';
import { COUNTER_OVERFLOW } from '../../00-helpers/constants/Characters';

describe('<Badge />', () => {
  const component: ShallowWrapper<BadgeProps> = shallow(
    <Badge {...mockBadgeDefault} />
  );

  it('renders <Badge /> component', () => {
    expect(component).toMatchSnapshot();
  });

  it('has default max value is 99', () => {
    const BadgeWithDefaultMaxValue: ShallowWrapper<BadgeProps> = shallow(
      <Badge count={100} />
    );
    expect(BadgeWithDefaultMaxValue).toMatchSnapshot();
    expect(BadgeWithDefaultMaxValue.text()).toBe(`99${COUNTER_OVERFLOW}`);
  });

  it(`shows max ${mockBadgeDefault.max}${COUNTER_OVERFLOW} in case count is higher then max value`, () => {
    const BadgeWithMaxCount: ShallowWrapper<BadgeProps> = shallow(
      <Badge {...mockBadgeDefault} count={100} />
    );
    expect(BadgeWithMaxCount).toMatchSnapshot();
    expect(BadgeWithMaxCount.text()).toBe(
      `${mockBadgeDefault.max}${COUNTER_OVERFLOW}`
    );
  });

  it(`adds classname 'sd-a-badge--${BadgeColor.SECONDARY}' if "color" props passed`, () => {
    expect(component.hasClass(`sd-a-badge--${BadgeColor.SECONDARY}`)).toEqual(
      true
    );
  });
});
