import * as React from 'react';
import { HTMLProps } from 'react';
import cn from 'classnames';
import { Sources, IconName } from '../../00-helpers/icons/icons';

export enum IconSize {
  EXTRA_MINOR = 'extra-minor',
  MINOR = 'minor',
  MEDIUM = 'medium',
  MAJOR = 'major',
  EXTRA_MAJOR = 'extra-major',
}

export enum IconColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  ACTION = 'action',
  ACTION_NAV = 'action-nav',
  NEGATIVE = 'negative',
  POSITIVE = 'positive',
  SUBTLE = 'subtle',
  NOTICE = 'notice',
}

export enum IconAnimation {
  BOP = 'bop',
  HEART_PULSE = 'heart-pulse',
  SPIN = 'spin',
}

export type IconProps = {
  name: IconName;
  id?: string;
  className?: string;
  title?: string;
  color?: IconColor;
  size?: IconSize;
  animation?: IconAnimation;
  dynamicContent?: string;
  ariaLabel?: string;
  ariaHidden?: boolean;
  inline?: boolean;
} & Pick<
  HTMLProps<HTMLSpanElement>,
  'onClick' | 'onMouseEnter' | 'onMouseLeave'
>;

export function Icon({
  name,
  id,
  className,
  title,
  color,
  size = IconSize.MEDIUM,
  animation,
  dynamicContent,
  ariaLabel,
  ariaHidden,
  inline,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: IconProps) {
  const isInteractive =
    !!dynamicContent || !!onClick || !!onMouseEnter || !!onMouseLeave;

  const classes = cn(
    'sd-a-icon',
    { [`sd-a-icon--${name}`]: name },
    { [`sd-a-icon--${color}`]: color },
    { [`sd-a-icon--${size}`]: size },
    { [`sd-a-icon--animation-${animation}`]: animation },
    {
      [`sd-a-icon--interactive`]: isInteractive,
    },
    { [`sd-a-icon--inline`]: !!inline },
    className
  );

  const SourceComponent = Sources[name];

  return (
    <span
      role="img"
      id={id}
      className={classes}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      title={title}
      data-dynamiccontent={dynamicContent}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <SourceComponent
        focusable="false"
        aria-hidden="true"
        className="sd-a-icon__svg"
      />
    </span>
  );
}
export { IconName };
