import * as React from 'react';
import { FunctionComponent } from 'react';
import cn from 'classnames';
import { Heading, HeadingPriority } from '../05-atoms/heading/Heading';

export enum ExampleColor {
  NEGATIVE = 'NEGATIVE',
  POSITIVE = 'positive',
}

export enum ExampleSize {
  X_SMALL = 'x-small',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  X_LARGE = 'x-large',
}

export type ExampleHeader = {
  title: string;
  subtitle?: string;
};

export type ExampleProps = {
  color: ExampleColor;
  dataQA?: string;
  header?: ExampleHeader;
  id: string;
  isDisabled?: boolean;
  onClick?: () => void;
  size?: ExampleSize;
};

export const Example: FunctionComponent<ExampleProps> = ({
  children,
  color,
  dataQA,
  header,
  id,
  isDisabled,
  onClick,
  size = ExampleSize.MEDIUM,
}) => {
  const handleClick = () => {
    if (!isDisabled) {
      onClick();
    }
  };

  return (
    <div
      id={id}
      className={cn('sd-x-example', {
        [`sd-x-example--color-${color}`]: color,
        'sd-x-example--disabled': isDisabled,
        [`sd-x-example--size-${size}`]: size,
      })}
      onClick={!!onClick && handleClick}
      data-qa={dataQA}>
      {!!header && (
        <div className="sd-x-example__header">
          <Heading>{header.title}</Heading>
          {!!header.subtitle && (
            <Heading priority={HeadingPriority.H3}>{header.subtitle}</Heading>
          )}
        </div>
      )}
      <div className="sd-x-example__content">{children}</div>
    </div>
  );
};
