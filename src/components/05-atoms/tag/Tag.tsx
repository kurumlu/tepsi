import * as React from 'react';
import { FunctionComponent } from 'react';
import cn from 'classnames';

export enum TagColor {
  PRIMARY = 'primary', // 1st
  SECONDARY = 'secondary', // 2nd
  TERTIARY = 'tertiary', // 3rd
  QUATERNARY = 'quaternary', // 4th
  QUINARY = 'quinary', // 5th
  SENARY = 'senary', // 6th
  SEPTENARY = 'septenary', // 7th
  GENERAL = 'general',
  DISCOUNT = 'discount',
  SUSTAINABLE = 'sustainable',
}

export type TagProps = {
  color?: TagColor;
  dataQA?: string;
  className?: string;
};

export const Tag: FunctionComponent<TagProps> = ({
  children,
  color,
  dataQA,
  className,
}) => (
  <div
    className={cn('sd-a-tag', { [`sd-a-tag--${color}`]: color }, className)}
    data-qa={dataQA}>
    {children}
  </div>
);
