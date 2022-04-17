import * as React from 'react';
import { FunctionComponent, MouseEvent, Ref } from 'react';
import cn from 'classnames';

export enum BoxTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SECONDARY_LIGHT = 'secondary-light',
  TERTIARY = 'tertiary',
  TERTIARY_LIGHT = 'tertiary-light',
  QUATERNARY = 'quaternary',
  EXTERNAL = 'external',
  WHITE = 'white',
  NOTICE = 'notice',
  NONE = 'none',
}

export type BoxOpacity = 0 | 0.25 | 0.5 | 0.75;

export type SpacingScaleMap =
  | 0
  | 0.25
  | 0.5
  | 1
  | 1.5
  | 2
  | 2.5
  | 3
  | 3.5
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 12
  | 16;

export type SpacingProps = {
  margin?: SpacingScaleMap;
  marginTop?: SpacingScaleMap;
  marginBottom?: SpacingScaleMap;
  marginLeft?: SpacingScaleMap;
  marginRight?: SpacingScaleMap;
  padding?: SpacingScaleMap;
  paddingTop?: SpacingScaleMap;
  paddingBottom?: SpacingScaleMap;
  paddingLeft?: SpacingScaleMap;
  paddingRight?: SpacingScaleMap;
};

type BoxViewportProps = {
  spacing?: SpacingProps;
  theme?: BoxTheme;
};

export type FlexObject = {
  shrink?: number;
  grow?: number;
  basis?: number | string;
};

type BoxFlexProps = number | string | FlexObject;

export type BoxProps = {
  analyticsAreaName?: string;
  className?: string;
  dataQA?: string;
  mobile?: BoxViewportProps;
  tablet?: BoxViewportProps;
  desktop?: BoxViewportProps;
  mobileBleed?: boolean;
  tabletBleed?: boolean;
  withShadow?: boolean;
  flex?: BoxFlexProps;
  hidden?: boolean;
  opacity?: BoxOpacity;
  interactive?: boolean;
  tabIndex?: number;
  role?: string;
  id?: string;
  innerRef?: Ref<HTMLDivElement>;
  onClick?: (e?: MouseEvent<HTMLElement>) => void;
};

export const dashed = (s: string) => s.replace(/[A-Z]/g, '-$&').toLowerCase();
export const dotToUnderscore = (s?: number) =>
  s?.toString().replace(/\./g, '_');

export const getCssProperties = (
  viewport?: BoxViewportProps,
  state = ''
): string => {
  if (!viewport || !(viewport.spacing || viewport.theme)) return '';

  const classNames: string[] = [];
  const entries = viewport?.spacing ? Object.entries(viewport.spacing) : [];
  const theme = viewport?.theme;

  if (entries.length > 0) {
    for (const space of entries) {
      const [property, value] = space;

      classNames.push(`${dashed(property)}-${state}${dotToUnderscore(value)}`);
    }
  }
  if (theme) {
    classNames.push(`as-t-box-${state}-${theme}`);
  }

  return classNames.join(' ');
};

const getFlexProperties = (flex?: BoxFlexProps) => {
  if (!flex) {
    return undefined;
  }

  if (typeof flex !== 'object') {
    return { flex };
  }

  return Object.keys(flex).reduce((properties, flexKey) => {
    const flexProperty = `flex${
      flexKey[0].toUpperCase() + flexKey.slice(1).toLowerCase()
    }`;
    return {
      ...properties,
      [flexProperty]: flex[flexKey],
    };
  }, {});
};

export const Box: FunctionComponent<BoxProps> = ({
  analyticsAreaName,
  children,
  className,
  dataQA,
  mobile,
  tablet,
  desktop,
  mobileBleed,
  tabletBleed,
  withShadow,
  flex,
  hidden,
  opacity,
  interactive,
  role,
  tabIndex,
  id,
  innerRef,
  onClick,
}) => (
  <div
    className={cn(
      'as-t-box',
      {
        [`as-t-box--opacity-${dotToUnderscore(opacity)}`]: opacity,
        [`as-t-box--mobile-bleed`]: mobileBleed,
        'as-t-box--tablet-bleed': tabletBleed,
        'as-t-box--with-shadow': withShadow,
        'as-t-box--hidden': hidden,
        'as-t-box--interactive': interactive,
      },
      getCssProperties(mobile, 'mobile-'),
      getCssProperties(tablet, 'tablet-'),
      getCssProperties(desktop, 'desktop-'),
      className
    )}
    style={getFlexProperties(flex)}
    data-qa={dataQA}
    data-analytics-bannerid={analyticsAreaName}
    role={role}
    tabIndex={tabIndex}
    id={id}
    ref={innerRef}
    onClick={onClick}>
    {children}
  </div>
);
