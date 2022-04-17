import * as React from 'react';
import { FunctionComponent } from 'react';
import cn from 'classnames';

export enum ButtonSize {
  DEFAULT = 'default',
  BIG = 'big',
}

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
}

export type ButtonProps = {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  dark?: boolean;
  disabled?: boolean;
};

export const Button: FunctionComponent<ButtonProps> = ({
  label,
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.DEFAULT,
  dark = false,
  disabled = false,
}) => (
  <button
    type="button"
    className={cn('sd-button', {
      'sd-button--disabled': disabled,
      'sd-button--dark': dark,
      [`sd-button--${variant}`]: variant,
      [`sd-button--${size}`]: size,
    })}>
    {label}
  </button>
);
