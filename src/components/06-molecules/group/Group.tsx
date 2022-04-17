import * as React from 'react';
import cn from 'classnames';
import { FunctionComponent, Ref } from 'react';

export enum GroupAlign {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
  SPACE_AROUND = 'space-around',
  SPACE_BETWEEN = 'space-between',
}

export enum GroupVerticalAlign {
  TOP = 'top',
  CENTER = 'center',
  BOTTOM = 'bottom',
  BASELINE = 'baseline',
}

export enum GroupGutter {
  NONE = '',
  XSMALL = 'xs',
  SMALL = 's',
  MEDIUM = 'm',
  LARGE = 'l',
  XLARGE = 'xl',
}

export enum GroupWrap {
  NOWRAP = 'nowrap',
  WRAP = 'wrap',
  REVERSE = 'wrap-reverse',
}

export type GroupProps = {
  align?: GroupAlign;
  className?: string;
  column?: boolean;
  dataAnalyticsBannerid?: string;
  dataQA?: string;
  equalSize?: boolean;
  gutter?: GroupGutter;
  gutterX?: GroupGutter;
  gutterY?: GroupGutter;
  inline?: boolean;
  valign?: GroupVerticalAlign;
  fullHeight?: boolean;
  innerRef?: Ref<HTMLDivElement>;
  wrap?: GroupWrap;
};

export const Group: FunctionComponent<GroupProps> = ({
  align = GroupAlign.LEFT,
  children,
  className,
  column,
  dataAnalyticsBannerid,
  dataQA,
  equalSize,
  gutter = GroupGutter.XSMALL,
  gutterX,
  gutterY,
  inline,
  valign,
  fullHeight,
  innerRef,
  wrap,
}) => (
  <div
    ref={innerRef}
    data-qa={dataQA}
    data-analytics-bannerid={dataAnalyticsBannerid}
    className={cn(
      'as-m-group',
      {
        [`as-m-group--${gutter}`]: gutterX || gutterY ? null : gutter,
        [`as-m-group--x-${gutterX}`]: gutterX,
        [`as-m-group--y-${gutterY}`]: gutterY,
        'as-m-group--inline': inline,
        'as-m-group--equal-size': equalSize,
        [`as-m-group--align-${align}`]: align,
        [`as-m-group--valign-${valign}`]: valign,
        [`as-m-group--wrap-${wrap}`]: wrap,
        'as-m-group--column': column,
        'as-m-group--full-height': fullHeight,
      },
      className
    )}>
    {children}
  </div>
);
