import * as React from 'react';
import { FunctionComponent } from 'react';
import cn from 'classnames';

export type ColumnGridProps = {
  span: number;
  pull?: number;
  push?: number;
};

export type ColumnProps = {
  parent?: boolean;
  gutter?: boolean;
  gutterLeft?: boolean;
  gutterRight?: boolean;
  gutterBottom?: boolean;
  gutterTop?: boolean;
  noGutterLeft?: boolean;
  noGutterRight?: boolean;
  grid?: number | ColumnGridProps;
  mobile?: number | ColumnGridProps;
  mobileLarge?: number | ColumnGridProps;
  tabletSmall?: number | ColumnGridProps;
  tablet?: number | ColumnGridProps;
  desktop?: number | ColumnGridProps;
  desktopSpecific?: number | ColumnGridProps;
  desktopLarge?: number | ColumnGridProps;
  className?: string;
  dataQA?: string;
};

const calcGridProps = (grid: number | ColumnGridProps, state = ''): string => {
  if (typeof grid === 'number') return `grid-${state}${grid}`;

  const gridClassName: string[] = [];

  if (typeof grid === 'object') {
    if (grid.span) {
      gridClassName.push(`grid-${state}${grid.span}`);
    }

    if (grid.pull) {
      gridClassName.push(`pull-${state}${grid.pull}`);
    }

    if (grid.push) {
      gridClassName.push(`push-${state}${grid.push}`);
    }
  }

  return gridClassName.join(' ');
};

export const Column: FunctionComponent<ColumnProps> = ({
  children,
  parent,
  gutter = true,
  gutterLeft,
  gutterRight,
  gutterBottom,
  gutterTop,
  noGutterLeft,
  noGutterRight,
  grid = 12,
  mobile,
  mobileLarge,
  tabletSmall,
  tablet,
  desktop,
  desktopSpecific,
  desktopLarge,
  className,
  dataQA,
}) => (
  <div
    className={cn(
      { parent },
      { 'no-gutter': !gutter },
      { 'gutter-left': gutterLeft },
      { 'gutter-right': gutterRight },
      { 'gutter-bottom': gutterBottom },
      { 'gutter-top': gutterTop },
      { 'no-gutter-left': noGutterLeft },
      { 'no-gutter-right': noGutterRight },
      calcGridProps(grid),
      calcGridProps(mobile, 'mobile-'),
      calcGridProps(mobileLarge, 'mobile-large-'),
      calcGridProps(tabletSmall, 'tablet-small-'),
      calcGridProps(tablet, 'tablet-'),
      calcGridProps(desktop, 'desktop-'),
      calcGridProps(desktopSpecific, 'desktop-specific-'),
      calcGridProps(desktopLarge, 'desktop-large-'),
      className
    )}
    data-qa={dataQA}>
    {children}
  </div>
);
