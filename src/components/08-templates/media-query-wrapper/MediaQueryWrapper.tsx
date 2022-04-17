import * as React from 'react';
import cn from 'classnames';
import { FunctionComponent } from 'react';

export enum MediaQueryWrapperQuery {
  MOBILE = 'mobile',
  DESKTOP = 'desktop',
  TABLET = 'tablet',
  TABLET_SMALL = 'tablet-small',
}

export type MediaQueryWrapperProps = {
  flex?: boolean;
  query?: MediaQueryWrapperQuery[] | MediaQueryWrapperQuery;
};

const isQueryActiveCheck = (queryProp, queryToCompare) => {
  if (typeof queryProp === 'string') {
    return queryProp === queryToCompare;
  } else {
    return queryProp.indexOf(queryToCompare) !== -1;
  }
};

export const MediaQueryWrapper: FunctionComponent<MediaQueryWrapperProps> = ({
  children,
  flex,
  query = MediaQueryWrapperQuery.MOBILE,
}) => {
  const postfix = flex ? '-flex' : '-block';

  return (
    <div
      className={cn('as-t-media-query-wrapper', {
        [`as-t-media-query-wrapper--mobile${postfix}`]: isQueryActiveCheck(
          query,
          MediaQueryWrapperQuery.MOBILE
        ),
        [`as-t-media-query-wrapper--tablet${postfix}`]: isQueryActiveCheck(
          query,
          MediaQueryWrapperQuery.TABLET
        ),
        [`as-t-media-query-wrapper--tablet-small${postfix}`]: isQueryActiveCheck(
          query,
          MediaQueryWrapperQuery.TABLET_SMALL
        ),
        [`as-t-media-query-wrapper--desktop${postfix}`]: isQueryActiveCheck(
          query,
          MediaQueryWrapperQuery.DESKTOP
        ),
      })}>
      {children}
    </div>
  );
};
