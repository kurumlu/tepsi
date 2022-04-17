import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { Spinner, SpinnerSize, SpinnerProps } from './Spinner';

describe('renders <Spinner />', () => {
  const component: ShallowWrapper<SpinnerProps> = shallow(<Spinner />);

  it('renders <Spinner /> component', () => {
    expect(component).toMatchSnapshot('default');
  });

  it('has specific class dependant on size', () => {
    const SmallSpinner: ShallowWrapper<SpinnerProps> = shallow(
      <Spinner size={SpinnerSize.SMALL} />
    );
    expect(SmallSpinner).toMatchSnapshot('small');
    expect(
      SmallSpinner.hasClass(`as-a-spinner--${SpinnerSize.SMALL}`)
    ).toBeTruthy();
  });
});
