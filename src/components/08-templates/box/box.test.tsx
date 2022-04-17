import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { mockText } from './box.mock';

import {
  Box,
  BoxProps,
  dashed,
  dotToUnderscore,
  getCssProperties,
} from './Box';

describe('<Box />', () => {
  const component: ShallowWrapper<BoxProps> = shallow(<Box>{mockText}</Box>);

  it('renders <Box /> component', () => {
    expect(component.prop('className')).toEqual('as-t-box');
    expect(component.text()).toEqual(mockText);
    expect(component).toMatchSnapshot();
  });

  it('renders <Box /> component with `desktop` and `mobile` properties', () => {
    const componentWithSpacing: ShallowWrapper<BoxProps> = shallow(
      <Box
        desktop={{ spacing: { marginLeft: 2 } }}
        mobile={{ spacing: { marginLeft: 1 } }}>
        {mockText}
      </Box>
    );

    expect(componentWithSpacing.prop('className')).toEqual(
      'as-t-box margin-left-mobile-1 margin-left-desktop-2'
    );
    expect(componentWithSpacing).toMatchSnapshot('with props');
  });

  describe('<Box /> component util methods', () => {
    it('cals `dashed` util, replace all letters in capital to dashes', () => {
      expect(dashed('marginX')).toEqual('margin-x');
      expect(dashed('marginXYZ')).toEqual('margin-x-y-z');
    });

    it('cals `dotToUnderscore` util, replace all dots to underscore sign', () => {
      expect(dotToUnderscore(0.25)).toEqual('0_25');
    });
  });

  describe('getCssProperties', () => {
    it('renders default if state path not taken', () => {
      expect(getCssProperties({})).toEqual('');
    });
  });

  it('renders <Box /> component with flex properties', () => {
    const componentWithFlex: ShallowWrapper<BoxProps> = shallow(
      <Box flex={1}>{mockText}</Box>
    );

    expect(componentWithFlex.prop('style')).toEqual({
      flex: 1,
    });
    expect(componentWithFlex).toMatchSnapshot('flex');
  });

  it('renders <Box /> component with flex properties', () => {
    const componentWithFlex: ShallowWrapper<BoxProps> = shallow(
      <Box flex={{ grow: 1, shrink: 1, basis: '0%' }}>{mockText}</Box>
    );

    expect(componentWithFlex.prop('style')).toEqual({
      flexBasis: '0%',
      flexGrow: 1,
      flexShrink: 1,
    });
    expect(componentWithFlex).toMatchSnapshot('flex object');
  });

  it('renders <Box /> with hidden prop', () => {
    const component: ShallowWrapper<BoxProps> = shallow(
      <Box hidden>{mockText}</Box>
    );

    expect(component.hasClass('as-t-box--hidden')).toBe(true);
    expect(component).toMatchSnapshot('with hidden');
  });

  it('renders <Box /> with interactive prop', () => {
    const component: ShallowWrapper<BoxProps> = shallow(
      <Box interactive>{mockText}</Box>
    );

    expect(component.hasClass('as-t-box--interactive')).toBe(true);
  });

  it('renders <Box /> with tabIndex prop', () => {
    const component: ShallowWrapper<BoxProps> = shallow(
      <Box tabIndex={0}>{mockText}</Box>
    );

    expect(component.prop('tabIndex')).toBe(0);
  });

  it('renders <Box /> with role prop', () => {
    const component: ShallowWrapper<BoxProps> = shallow(
      <Box role="button">{mockText}</Box>
    );

    expect(component.prop('role')).toBe('button');
  });
});
