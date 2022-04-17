import { withContexts } from '@storybook/addon-contexts/react';
import { withTranslation } from '../src/storybook_addons/translationDecorator';
import { contexts } from './configs/contexts';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import 'element-closest-polyfill';
import 'lazysizes';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: { viewports: INITIAL_VIEWPORTS },
  options: {
    showPanel: true,
    panelPosition: 'bottom',
    storySort: (a, b) =>
      ['design-system-intro--storybookdocsonly'].indexOf(a[1].id) !== -1
        ? -1
        : a[1].id.localeCompare(b[1].id),
  },
  docsContainer: DocsContainer,
  controls: { expanded: true },
};

export const decorators = [withTranslation, withContexts(contexts)];
