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
      'sd-m-group',
      {
        [`sd-m-group--${gutter}`]: gutterX || gutterY ? null : gutter,
        [`sd-m-group--x-${gutterX}`]: gutterX,
        [`sd-m-group--y-${gutterY}`]: gutterY,
        'sd-m-group--inline': inline,
        'sd-m-group--equal-size': equalSize,
        [`sd-m-group--align-${align}`]: align,
        [`sd-m-group--valign-${valign}`]: valign,
        [`sd-m-group--wrap-${wrap}`]: wrap,
        'sd-m-group--column': column,
        'sd-m-group--full-height': fullHeight,
      },
      className
    )}>
    {children}
  </div>
);
