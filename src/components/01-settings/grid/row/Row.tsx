import * as React from 'react';
import { FunctionComponent } from 'react';
import cn from 'classnames';

export type RowProps = {
  parent?: boolean;
  clear?: boolean;
  className?: string;
};

export const Row: FunctionComponent<RowProps> = ({
  children,
  parent,
  clear,
  className,
}) => (
  <div className={cn('grid-row', { parent }, { clear }, className)}>
    {children}
  </div>
);
