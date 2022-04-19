import * as React from 'react';
import { FunctionComponent } from 'react';
import cn from 'classnames';

export enum GridBlockVariant {
  // Single item
  BLOCK = '',
  ROW = 'row',
  COLUMN = 'col',

  // Two items
  BLOCKS = 'blocks',
  ROWS = 'rows',
  COLUMNS = 'cols',

  // Three items
  ROW_PLUS_COLUMNS = 'row-cols',
  ROWS_PLUS_COLUMN = 'rows-col',
  COLUMN_PLUS_ROWS = 'col-rows',
  COLUMNS_PLUS_ROW = 'cols-row',
}

export type GridBlockProps = {
  variant?: GridBlockVariant;
};

export const GridBlock: FunctionComponent<GridBlockProps> = ({
  variant = GridBlockVariant.BLOCK,
}) => {
  const getGridItemAmount = () => {
    switch (variant) {
      case GridBlockVariant.BLOCK:
      case GridBlockVariant.ROW:
      case GridBlockVariant.COLUMN:
        return 1;
      case GridBlockVariant.BLOCKS:
      case GridBlockVariant.ROWS:
      case GridBlockVariant.COLUMNS:
        return 2;
      default:
        return 3;
    }
  };
  const gridItemAmount = getGridItemAmount();

  return (
    <div
      className={cn('sd-t-grid-block', {
        [`sd-t-grid-block--${variant}`]: variant,
      })}>
      <div className="sd-t-grid-block__inner">
        {[...Array(gridItemAmount)].map((_, index) => (
          <div className="sd-t-grid-block__item" key={index}>
            <div className="sd-t-grid-block__item-content-placeholder"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
