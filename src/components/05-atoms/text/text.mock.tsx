import * as React from 'react';
import { FunctionComponent } from 'react';

export const mockText =
  'We believe there’s no substitute for experience. That’s why we pride ourselves on the fact that we love spending time outdoors, so when you ask us for advice, you know it comes from our real-world experiences.';

export const MockChildren: FunctionComponent = () => (
  <ul>
    <li>Test text 1</li>
    <li>Test text 2</li>
    <li>Test text 3</li>
  </ul>
);

export const mockHtml =
  "<div class='sd-a-text--test-classname'>Some <strong>HTML</strong> text";
