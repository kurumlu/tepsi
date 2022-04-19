import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import {
  Heading,
  HeadingProps,
  HeadingPriority,
  HeadingSize,
  HeadingAlignment,
} from './Heading';

describe('<Heading />', () => {
  it('Default', () => {
    const component: ShallowWrapper<HeadingProps> = shallow(
      <Heading>Default heading</Heading>
    );

    expect(component).toMatchSnapshot();
  });

  it('Priority h1', () => {
    const component: ShallowWrapper<HeadingProps> = shallow(
      <Heading priority={HeadingPriority.H1}>Priority H1</Heading>
    );
    const elem = component.find('h1');
    expect(component).toMatchSnapshot();
    expect(elem.length).toBe(1);
  });

  it('Priority h2', () => {
    const component: ShallowWrapper<HeadingProps> = shallow(
      <Heading priority={HeadingPriority.H2}>Priority H2</Heading>
    );
    const elem = component.find('h2');
    expect(component).toMatchSnapshot();
    expect(elem.length).toBe(1);
  });

  it('Priority h3', () => {
    const component: ShallowWrapper<HeadingProps> = shallow(
      <Heading priority={HeadingPriority.H3}>Priority H3</Heading>
    );
    const elem = component.find('h3');
    expect(component).toMatchSnapshot();
    expect(elem.length).toBe(1);
  });

  it('Priority h4', () => {
    const component: ShallowWrapper<HeadingProps> = shallow(
      <Heading priority={HeadingPriority.H4}>Priority H4</Heading>
    );
    const elem = component.find('h4');
    expect(component).toMatchSnapshot();
    expect(elem.length).toBe(1);
  });

  it('Priority h5', () => {
    const component: ShallowWrapper<HeadingProps> = shallow(
      <Heading priority={HeadingPriority.H5}>Priority H5</Heading>
    );
    const elem = component.find('h5');
    expect(component).toMatchSnapshot();
    expect(elem.length).toBe(1);
  });

  it('Size XL', () => {
    const component: ShallowWrapper<HeadingProps> = shallow(
      <Heading size={HeadingSize.XL}>Size XL</Heading>
    );

    expect(component).toMatchSnapshot();
    expect(component.hasClass('sd-a-heading--xl')).toBeTruthy();
  });

  it('Size L', () => {
    const component: ShallowWrapper<HeadingProps> = shallow(
      <Heading size={HeadingSize.L}>Size L</Heading>
    );

    expect(component).toMatchSnapshot();
    expect(component.hasClass('sd-a-heading--l')).toBeTruthy();
  });

  it('Size M', () => {
    const component: ShallowWrapper<HeadingProps> = shallow(
      <Heading size={HeadingSize.M}>Size M</Heading>
    );

    expect(component).toMatchSnapshot();
    expect(component.hasClass('sd-a-heading--m')).toBeTruthy();
  });

  it('Size S', () => {
    const component: ShallowWrapper<HeadingProps> = shallow(
      <Heading size={HeadingSize.S}>Size S</Heading>
    );

    expect(component).toMatchSnapshot();
    expect(component.hasClass('sd-a-heading--s')).toBeTruthy();
  });

  it('Size XS', () => {
    const component: ShallowWrapper<HeadingProps> = shallow(
      <Heading size={HeadingSize.XS}>Size XS</Heading>
    );

    expect(component).toMatchSnapshot();
    expect(component.hasClass('sd-a-heading--xs')).toBeTruthy();
  });

  it('Alignment Left', () => {
    const component: ShallowWrapper<HeadingProps> = shallow(
      <Heading alignment={HeadingAlignment.LEFT}>Alignment Left</Heading>
    );

    expect(component).toMatchSnapshot();
  });

  it('Alignment Center', () => {
    const component: ShallowWrapper<HeadingProps> = shallow(
      <Heading alignment={HeadingAlignment.CENTER}>Alignment Center</Heading>
    );

    expect(component).toMatchSnapshot();
    expect(component.hasClass('sd-a-heading--center')).toBeTruthy();
  });

  it('Alignment Right', () => {
    const component: ShallowWrapper<HeadingProps> = shallow(
      <Heading alignment={HeadingAlignment.RIGHT}>Alignment Right</Heading>
    );

    expect(component).toMatchSnapshot();
    expect(component.hasClass('sd-a-heading--right')).toBeTruthy();
  });

  it('Component accepts extra class', () => {
    const component: ShallowWrapper<HeadingProps> = shallow(
      <Heading className="testClassName">Component accepts extra class</Heading>
    );

    expect(component).toMatchSnapshot();
    expect(component.hasClass('testClassName')).toBeTruthy();
  });
});
