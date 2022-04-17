import { storiesOf } from '@storybook/react';
import { Icons } from './template';
import { withPageContainerAndPadding } from '../../../storybook_addons/storyWrapperDecorator';

storiesOf('Design system/Style/Icons', module)
  .addDecorator(withPageContainerAndPadding)
  .add('all', () => Icons);
