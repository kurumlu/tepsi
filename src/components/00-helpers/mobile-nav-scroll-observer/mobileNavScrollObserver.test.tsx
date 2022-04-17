import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import {
  MobileNavScrollObserver,
  MobileNavScrollObserverProps,
} from './MobileNavScrollObserver';

describe('<MobileNavScrollObserver />', () => {
  it('renders with default props', () => {
    const component: ShallowWrapper<MobileNavScrollObserverProps> = shallow(
      <MobileNavScrollObserver forceNavToBeShown />
    );

    expect(component).toMatchSnapshot('default');
  });
});
