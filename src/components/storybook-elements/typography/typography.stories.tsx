import { storiesOf } from '@storybook/react';
import { headingTemplate, basic } from './template';
import { withPageContainerAndPadding } from '../../../storybook_addons/storyWrapperDecorator';

storiesOf('Design system/Style/Typography', module)
  .addDecorator(withPageContainerAndPadding)
  .add('heading', () => headingTemplate)
  .add('body', () => basic);
