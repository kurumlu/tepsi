import * as React from 'react';
import {
  Heading,
  HeadingPriority,
  HeadingSize,
} from '../../05-atoms/heading/Heading';

export const headingTemplate = (
  <>
    <Heading>Heading H1</Heading>
    <Heading priority={HeadingPriority.H2} size={HeadingSize.L}>
      Heading H2
    </Heading>
    <Heading priority={HeadingPriority.H3} size={HeadingSize.M}>
      Heading H3
    </Heading>
    <Heading priority={HeadingPriority.H4} size={HeadingSize.S}>
      Heading H4
    </Heading>
    <Heading priority={HeadingPriority.H5} size={HeadingSize.XS}>
      Heading H5
    </Heading>
  </>
);

export const stringTemplate =
  'We believe there’s no substitute for experience. That’s why we pride ourselves on the fact that we love spending time outdoors, so when you ask us for advice, you know it comes from our real-world experiences.';

export const alignedStringTemplate = (className, bodySize) => (
  <div className="storybook-font">
    <Heading priority={HeadingPriority.H5} size={HeadingSize.XS}>
      Bodytext {bodySize}
    </Heading>
    <p className={`${className} left`}>{stringTemplate}</p>
    <p className={`${className} center`}>{stringTemplate}</p>
    <p className={`${className} right`}>{stringTemplate}</p>
  </div>
);

export const basicEmphasized = alignedStringTemplate(
  'sd-a-text--emp',
  'M Emphasized'
);
export const basicSubtle = alignedStringTemplate(
  'sd-a-text--subtle',
  'M Subtle'
);
export const basicStrike = alignedStringTemplate(
  'sd-a-text--strike',
  'M Strike'
);
export const basicPositive = alignedStringTemplate(
  'sd-a-text--positive',
  'M Positive'
);
export const basicNegative = alignedStringTemplate(
  'sd-a-text--negative',
  'M Negative'
);

export const basic = (
  <>
    {basicEmphasized}
    {basicSubtle}
    {basicStrike}
    {basicPositive}
    {basicNegative}
  </>
);
