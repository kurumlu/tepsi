import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { StepperSimple, StepperSimpleProps } from './StepperSimple';

describe('<StepperSimple />', () => {
  const component: ShallowWrapper<StepperSimpleProps> = shallow(
    <StepperSimple size={4} />
  );

  it('renders <StepperSimple /> component', () => {
    expect(component).toMatchSnapshot('default');
  });

  it('renders 4 stepper items', () => {
    expect(component.find('.as-m-stepper-simple__item')).toHaveLength(4);
  });

  it('adds active className for the first item if no prop "activeStep" provided', () => {
    expect(
      component.find('.as-m-stepper-simple__item').first().prop('className')
    ).toMatch(/as-m-stepper-simple__item--active/i);
  });

  it('adds active className for the last item if "activeStep" equals size', () => {
    const componentWithLastActiveStep: ShallowWrapper<StepperSimpleProps> = shallow(
      <StepperSimple size={4} activeStep={4} />
    );

    expect(
      componentWithLastActiveStep
        .find('.as-m-stepper-simple__item')
        .last()
        .prop('className')
    ).toMatch(/as-m-stepper-simple__item--active/i);
  });
});
