import * as React from 'react';
import { FunctionComponent } from 'react';
import cn from 'classnames';
import { COUNTER_OVERFLOW } from '../../00-helpers/constants/Characters';

export enum BadgeColor {
  SECONDARY = 'secondary',
  SUBTLE = 'subtle',
}

export enum BadgeSize {
  LARGE = 'l',
}

export type BadgeProps = {
  count: number;
  max?: number;
  color?: BadgeColor;
  size?: BadgeSize;
  className?: string;
  dataQA?: string;
};

export const Badge: FunctionComponent<BadgeProps> = ({
  count,
  max = 99,
  color,
  size,
  className,
  dataQA,
}) => (
  <div
    className={cn(
      'as-a-badge',
      {
        [`as-a-badge--${color}`]: color,
        [`as-a-badge--${size}`]: size,
      },
      className
    )}
    data-qa={dataQA}>
    {count > max ? `${max}${COUNTER_OVERFLOW}` : `${count}`}
  </div>
);
