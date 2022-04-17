import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Button, ButtonProps, ButtonSize, ButtonVariant } from './Button';
import { mockButtonDefault } from './Button.mock';

describe('<Button />', () => {
  const component: ShallowWrapper<ButtonProps> = shallow(
    <Button {...mockButtonDefault} />
  );
  const componentSecondVariant: ShallowWrapper<ButtonProps> = shallow(
    <Button {...mockButtonDefault} variant={ButtonVariant.SECONDARY} />
  );

  const componentnBigSize: ShallowWrapper<ButtonProps> = shallow(
    <Button {...mockButtonDefault} size={ButtonSize.BIG} />
  );

  const componentDisabled: ShallowWrapper<ButtonProps> = shallow(
    <Button {...mockButtonDefault} disabled />
  );

  const componentDark: ShallowWrapper<ButtonProps> = shallow(
    <Button {...mockButtonDefault} dark />
  );

  it('renders <Button /> component', () => {
    expect(component).toMatchSnapshot();
  });

  it('renders with variant secondary', () => {
    expect(componentSecondVariant).toMatchSnapshot();
    expect(
      component.hasClass(`sd-another-button--${ButtonVariant.SECONDARY}`)
    ).toEqual(true);
  });

  it('renders with size big ', () => {
    expect(componentnBigSize).toMatchSnapshot();
    expect(component.hasClass(`sd-another-button--${ButtonSize.BIG}`)).toEqual(
      true
    );
  });

  it('renders disabled ', () => {
    expect(componentDisabled).toMatchSnapshot();
    expect(component.hasClass(`sd-another-button--disabled`)).toEqual(true);
  });

  it('renders dark ', () => {
    expect(componentDark).toMatchSnapshot();
    expect(component.hasClass(`sd-another-button--dark`)).toEqual(true);
  });
});
