import * as React from 'react';
import { FunctionComponent } from 'react';
import cn from 'classnames';

export enum SpinnerSize {
  LARGE = 'large', // 48px
  SMALL = 'small', // 24px
}

export type SpinnerProps = {
  size?: SpinnerSize;
};

export const Spinner: FunctionComponent<SpinnerProps> = ({
  size = SpinnerSize.LARGE,
}) => (
  <svg
    className={cn('sd-a-spinner', `sd-a-spinner--${size}`)}
    viewBox="0 0 40 40"
    xmlns="http://www.w3.org/2000/svg">
    <circle
      className="sd-a-spinner__ring"
      fill="none"
      strokeLinecap="round"
      strokeWidth="3"
      cx="20"
      cy="20"
      r="18"></circle>
  </svg>
);
