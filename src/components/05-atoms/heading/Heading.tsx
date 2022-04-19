import { FunctionComponent, createElement } from 'react';
import cn from 'classnames';

export enum HeadingSize {
  XL = 'xl',
  L = 'l',
  M = 'm',
  S = 's',
  XS = 'xs',
}

export enum HeadingPriority {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
}

export enum HeadingType {
  EXTRA_TITLE = 'extra-title',
  TITLE = 'title',
  SUBTITLE = 'subtitle',
  SMALL_TITLE = 'small-title',
  EXTRA_SMALL_TITLE = 'extra-small-title',
}

export enum HeadingAlignment {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

export enum HeadingColor {
  INHERIT = 'inherit',
}

export type HeadingProps = {
  priority?: HeadingPriority;
  size?: HeadingSize;
  type?: HeadingType;
  alignment?: HeadingAlignment;
  className?: string;
  dataQA?: string;
  color?: HeadingColor;
};

export const Heading: FunctionComponent<HeadingProps> = ({
  size = HeadingSize.XL,
  priority = HeadingPriority.H2,
  type,
  alignment,
  children,
  className,
  dataQA,
  color,
}) =>
  createElement(
    `${priority}`,
    {
      className: cn(
        'sd-a-heading',
        {
          [`sd-a-heading--${size}`]: size && !type,
          [`sd-a-heading--${type}`]: type,
          [`sd-a-heading--${alignment}`]: alignment,
          [`sd-a-heading--${color}`]: color,
        },
        className
      ),
      'data-qa': dataQA,
    },
    children
  );
