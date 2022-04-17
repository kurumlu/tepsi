import * as React from 'react';
import { FunctionComponent } from 'react';
import cn from 'classnames';

export enum ContainerType {
  FULL_WIDTH = 'grid-full-width-no-gutters',
  FLUID = 'fluid-container',
}

export type ContainerProps = {
  gutter?: boolean;
  type?: ContainerType;
  className?: string;
};

export const Container: FunctionComponent<ContainerProps> = ({
  children,
  gutter = true,
  type,
  className,
}) => (
  <div
    className={cn(
      { container: type !== ContainerType.FLUID },
      { [type]: type },
      { 'grid-full-width': !gutter },
      className
    )}>
    {children}
  </div>
);
