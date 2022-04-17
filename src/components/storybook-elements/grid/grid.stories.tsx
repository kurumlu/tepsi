import * as React from 'react';

import { storiesOf } from '@storybook/react';
import {
  withPageContainerAndPadding,
  withStyleGrid,
} from '../../../storybook_addons/storyWrapperDecorator';
import { grid1, grid12, grid2, grid3, grid4, grid6 } from './template';

storiesOf('Design system/Style/Grid', module)
  .addDecorator(withStyleGrid)
  .addDecorator(withPageContainerAndPadding)
  .add('all', () => (
    <>
      {grid1}
      {grid2}
      {grid3}
      {grid4}
      {grid6}
      {grid12}
    </>
  ))
  .add('grid 1', () => grid1)
  .add('grid 2', () => grid2)
  .add('grid 3', () => grid3)
  .add('grid 4', () => grid4)
  .add('grid 6', () => grid6)
  .add('grid 12', () => grid12);
