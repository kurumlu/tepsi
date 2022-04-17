//Source: https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/useMediaQuery/useMediaQuery.js
import { useEffect, useState } from 'react';
import * as screenWidthConstants from '../../components/00-helpers/constants/ScreenWidthConstants';

export interface UseMediaQueryOptions {
  defaultMatches?: boolean;
  noSsr?: boolean;
  ssrMatchMedia?: (query: string) => MediaQueryList;
}

export interface MediaQueryListEvent {
  matches: boolean;
}

export type MediaQueryListListener = (event: MediaQueryListEvent) => void;

export interface MediaQueryList {
  matches: boolean;
  addListener: (listener: MediaQueryListListener) => void;
  removeListener: (listener: MediaQueryListListener) => void;
}

let hydrationCompleted = false;
export const useMediaQuery = (
  queryInput: string,
  options: UseMediaQueryOptions = {}
): boolean => {
  const query = queryInput.replace(/^@media( ?)/m, '');

  // Wait for jsdom to support the match media feature.
  // All the browsers Material-UI support have this built-in.
  // This defensive check is here for simplicity.
  // Most of the time, the match media logic isn't central to people tests.
  const supportMatchMedia =
    typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined';

  const { defaultMatches = false, noSsr = false, ssrMatchMedia = null } = {
    ...options,
  };

  const [match, setMatch] = useState(() => {
    if ((hydrationCompleted || noSsr) && supportMatchMedia) {
      return window.matchMedia(query).matches;
    }
    if (ssrMatchMedia) {
      return ssrMatchMedia(query).matches;
    }

    // Once the component is mounted, we rely on the
    // event listeners to return the correct matches value.
    return defaultMatches;
  });

  useEffect(() => {
    let active = true;
    hydrationCompleted = true;

    if (!supportMatchMedia) {
      return undefined;
    }

    const queryList = window.matchMedia(query);
    const updateMatch = () => {
      // Workaround Safari wrong implementation of matchMedia
      // TODO can we remove it?
      // https://github.com/mui-org/material-ui/pull/17315#issuecomment-528286677
      if (active) {
        setMatch(queryList.matches);
      }
    };
    updateMatch();
    queryList.addListener(updateMatch);
    return () => {
      active = false;
      queryList.removeListener(updateMatch);
    };
  }, [query, supportMatchMedia]);

  return match;
};

export const useMediaQueryMatchesOnDesktopLarge = (): boolean =>
  useMediaQuery(
    `(min-width:${screenWidthConstants.MIN_SCREEN_WIDTH_DESKTOP_LARGE}px)`
  );

export const useMediaQueryMatchesOnDesktop = (): boolean =>
  useMediaQuery(
    `(min-width:${screenWidthConstants.MIN_SCREEN_WIDTH_DESKTOP}px)`
  );

export const useMediaQueryMatchesOnMobile = (): boolean =>
  useMediaQuery(
    `(max-width:${screenWidthConstants.MAX_SCREEN_WIDTH_TABLET_SMALL}px)`
  );

export const isScreenTablet = (): boolean =>
  window.matchMedia(
    `(max-width: ${screenWidthConstants.MAX_SCREEN_WIDTH_TABLET}px)`
  ).matches;

export const isScreenDesktop = (): boolean =>
  window.matchMedia(
    `(min-width:${screenWidthConstants.MIN_SCREEN_WIDTH_DESKTOP}px)`
  ).matches;

export const isUserAgentAppleMobilePlatform = (): boolean => {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
};
