import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { GridBlock, GridBlockProps, GridBlockVariant } from './GridBlock';

describe('<GridBlock />', () => {
  it('renders default GridBlock component', () => {
    const component: ShallowWrapper<GridBlockProps> = shallow(<GridBlock />);
    expect(component.find('.sd-t-grid-block__item')).toHaveLength(1);
    expect(component).toMatchSnapshot('default');
  });

  it('renders row GridBlock component', () => {
    const component: ShallowWrapper<GridBlockProps> = shallow(
      <GridBlock variant={GridBlockVariant.ROW} />
    );
    expect(component.find('.sd-t-grid-block__item')).toHaveLength(1);
    expect(component).toMatchSnapshot('row');
  });

  it('renders column GridBlock component', () => {
    const component: ShallowWrapper<GridBlockProps> = shallow(
      <GridBlock variant={GridBlockVariant.COLUMN} />
    );
    expect(component.find('.sd-t-grid-block__item')).toHaveLength(1);
    expect(component).toMatchSnapshot('column');
  });

  it('renders rows GridBlock component', () => {
    const component: ShallowWrapper<GridBlockProps> = shallow(
      <GridBlock variant={GridBlockVariant.ROWS} />
    );
    expect(component.find('.sd-t-grid-block__item')).toHaveLength(2);
    expect(component).toMatchSnapshot('rows');
  });

  it('renders columns GridBlock component', () => {
    const component: ShallowWrapper<GridBlockProps> = shallow(
      <GridBlock variant={GridBlockVariant.COLUMNS} />
    );
    expect(component.find('.sd-t-grid-block__item')).toHaveLength(2);
    expect(component).toMatchSnapshot('columns');
  });

  it('renders blocks GridBlock component', () => {
    const component: ShallowWrapper<GridBlockProps> = shallow(
      <GridBlock variant={GridBlockVariant.BLOCKS} />
    );
    expect(component.find('.sd-t-grid-block__item')).toHaveLength(2);
    expect(component).toMatchSnapshot('blocks');
  });

  it('renders row + columns GridBlock component', () => {
    const component: ShallowWrapper<GridBlockProps> = shallow(
      <GridBlock variant={GridBlockVariant.ROW_PLUS_COLUMNS} />
    );
    expect(component.find('.sd-t-grid-block__item')).toHaveLength(3);
    expect(component).toMatchSnapshot('row + columns');
  });

  it('renders rows + column GridBlock component', () => {
    const component: ShallowWrapper<GridBlockProps> = shallow(
      <GridBlock variant={GridBlockVariant.ROWS_PLUS_COLUMN} />
    );
    expect(component.find('.sd-t-grid-block__item')).toHaveLength(3);
    expect(component).toMatchSnapshot('rows + column');
  });

  it('renders column + rows GridBlock component', () => {
    const component: ShallowWrapper<GridBlockProps> = shallow(
      <GridBlock variant={GridBlockVariant.COLUMN_PLUS_ROWS} />
    );
    expect(component.find('.sd-t-grid-block__item')).toHaveLength(3);
    expect(component).toMatchSnapshot('column + rows');
  });

  it('renders columns + row GridBlock component', () => {
    const component: ShallowWrapper<GridBlockProps> = shallow(
      <GridBlock variant={GridBlockVariant.COLUMNS_PLUS_ROW} />
    );
    expect(component.find('.sd-t-grid-block__item')).toHaveLength(3);
    expect(component).toMatchSnapshot('columns + row');
  });
});
