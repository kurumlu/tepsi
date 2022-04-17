import * as React from 'react';
import { FunctionComponent, MouseEvent } from 'react';
import cn from 'classnames';

const CLICK_POINT_RADIUS = 16;
const CLICK_POINT_STROKE = 2;
const CLICK_POINT_PLUS_LENGTH = 10;

export type ClickPointProps = {
  x?: string | number;
  y?: string | number;
  onClick: (e?: MouseEvent) => void;
  isActive?: boolean;
};

export const ClickPoint: FunctionComponent<ClickPointProps> = ({
  x = '50%',
  y = '50%',
  onClick,
  isActive,
}) => (
  <svg
    className={cn('as-a-click-point', {
      'as-a-click-point--is-active': isActive,
    })}
    x={x}
    y={y}
    onClick={onClick}
    tabIndex={0}>
    <circle
      className="as-a-click-point__circle"
      cx="0"
      cy="0"
      r={CLICK_POINT_RADIUS}
      strokeWidth={CLICK_POINT_STROKE}
    />
    <rect
      x={-1 * (CLICK_POINT_PLUS_LENGTH / 2)}
      y={-1 * (CLICK_POINT_STROKE / 2)}
      width={CLICK_POINT_PLUS_LENGTH}
      height={CLICK_POINT_STROKE}
      strokeWidth="0"
    />
    <rect
      x={-1 * (CLICK_POINT_STROKE / 2)}
      y={-1 * (CLICK_POINT_PLUS_LENGTH / 2)}
      width={CLICK_POINT_STROKE}
      height={CLICK_POINT_PLUS_LENGTH}
      strokeWidth="0"
    />
  </svg>
);
