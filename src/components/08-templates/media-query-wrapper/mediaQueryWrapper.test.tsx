import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import {
  MediaQueryWrapper,
  MediaQueryWrapperProps,
  MediaQueryWrapperQuery,
} from './MediaQueryWrapper';

describe('<MediaQueryWrapper />', () => {
  it('renders <MediaQueryWrapper /> with default props', () => {
    const component: ShallowWrapper<MediaQueryWrapperProps> = shallow(
      <MediaQueryWrapper>Content</MediaQueryWrapper>
    );
    expect(component.prop('className')).toEqual(
      'sd-t-media-query-wrapper sd-t-media-query-wrapper--mobile-block'
    );
    expect(component).toMatchSnapshot('Default props');
  });

  it('renders <MediaQueryWrapper /> with desktop query prop', () => {
    const component: ShallowWrapper<MediaQueryWrapperProps> = shallow(
      <MediaQueryWrapper query={MediaQueryWrapperQuery.DESKTOP}>
        Content
      </MediaQueryWrapper>
    );
    expect(component.prop('className')).toEqual(
      'sd-t-media-query-wrapper sd-t-media-query-wrapper--desktop-block'
    );
    expect(component).toMatchSnapshot('desktop query prop');
  });

  it('renders <MediaQueryWrapper /> with tablet query prop and flex', () => {
    const component: ShallowWrapper<MediaQueryWrapperProps> = shallow(
      <MediaQueryWrapper query={MediaQueryWrapperQuery.TABLET} flex>
        Content
      </MediaQueryWrapper>
    );
    expect(component.prop('className')).toEqual(
      'sd-t-media-query-wrapper sd-t-media-query-wrapper--tablet-flex'
    );
    expect(component).toMatchSnapshot('tablet query prop and flex');
  });

  it('renders <MediaQueryWrapper /> with complex query prop', () => {
    const component: ShallowWrapper<MediaQueryWrapperProps> = shallow(
      <MediaQueryWrapper
        query={[
          MediaQueryWrapperQuery.MOBILE,
          MediaQueryWrapperQuery.TABLET_SMALL,
        ]}>
        Content
      </MediaQueryWrapper>
    );
    expect(component.prop('className')).toEqual(
      'sd-t-media-query-wrapper sd-t-media-query-wrapper--mobile-block sd-t-media-query-wrapper--tablet-small-block'
    );
    expect(component).toMatchSnapshot('complex query prop');
  });
});
