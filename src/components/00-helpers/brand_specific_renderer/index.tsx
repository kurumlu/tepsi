import * as React from 'react';
import { FunctionComponent, Fragment, ReactElement } from 'react';
import { ThemeContext } from '../../../storybook_addons/tepsiThemeInclude';
import { Brands } from '../enums/brand';

export type BrandSpecificComponents = {
  name: Brands;
  template: ReactElement | null;
};

export const BrandSpecificRenderer: FunctionComponent<{
  components: BrandSpecificComponents[];
}> = ({ components }) => (
  <ThemeContext.Consumer>
    {selectedTheme =>
      !!selectedTheme &&
      components
        .filter(component => component.name === selectedTheme.brand)
        .map(component => (
          <Fragment key={component.name}>{component.template}</Fragment>
        ))
    }
  </ThemeContext.Consumer>
);
