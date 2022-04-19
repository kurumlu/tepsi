import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { StepProps, Steps, StepsProps } from './Steps';

describe('<Steps />', () => {
  it('renders empty <Steps /> component', () => {
    const component: ShallowWrapper<StepsProps> = shallow(<Steps />);
    expect(component).toMatchSnapshot('empty');
  });

  it('renders <Steps /> component with 3 Steps', () => {
    const component: ShallowWrapper<StepsProps> = shallow(
      <Steps>
        <Steps.Step title="Aflevering" passed />
        <Steps.Step title="Betaling" current />
        <Steps.Step title="Bevestiging" />
      </Steps>
    );
    expect(component).toMatchSnapshot('with 3 steps');
  });
});

describe('<Step />', () => {
  it('renders <Step /> component', () => {
    const component: ShallowWrapper<StepProps> = shallow(
      <Steps.Step title="title" />
    );
    expect(component).toMatchSnapshot('one step');
  });

  it('renders <Step /> component with passed state', () => {
    const component: ShallowWrapper<StepProps> = shallow(
      <Steps.Step title="title" passed />
    );
    expect(component.hasClass('sd-m-step--passed')).toBeTruthy();
  });
});
