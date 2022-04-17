import * as React from 'react';

export const withPageContainerAndPadding = story => (
  <div className="storybook-wrapper">{story()}</div>
);

export const withPageContainerAndPaddingGray = story => (
  <div className="storybook-wrapper storybook-wrapper--color-gray">
    {story()}
  </div>
);

export const withStyleGrid = story => (
  <div className="storybook-style-grid">{story()}</div>
);

export const iconShowCase = story => (
  <div className="storybook-icon-showcase">{story()}</div>
);
