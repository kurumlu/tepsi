import { FunctionComponent, createElement } from 'react';
import cn from 'classnames';

import { GLOSSARY_HIGHLIGHT_CLASS } from '../../00-helpers/constants/GlossaryConstants';
import { ItemProp } from '../../00-helpers/enums/ItemProp';

export enum TextColor {
  NEGATIVE = 'negative',
  POSITIVE = 'positive',
  SUBTLE = 'subtle',
  DISCOUNT = 'discount',
  INHERIT = 'inherit',
  INFO = 'info',
  NOTICE = 'notice',
}

export enum TextSize {
  XLARGE = 'xl',
  LARGE = 'l',
  MEDIUM = 'm',
  SMALL = 's',
  XSMALL = 'xs',
  INHERIT = 'none',
}

export enum TextType {
  EXTRA_LARGE_CONTENT = 'extra-large-content',
  EXTRA_CONTENT = 'extra-content',
  CONTENT = 'content',
  SUB_CONTENT = 'sub-content',
  TITLE = 'title',
}

export enum TextAlign {
  CENTER = 'center',
  RIGHT = 'right',
}

export enum TextSemanticTag {
  DEL = 'del',
  PARAGRAPH = 'p',
  STRONG = 'strong',
  SPAN = 'span',
  DIV = 'div',
}

export enum TextFeature {
  PRODUCT_TECHNICAL_FEATURES_ODD = 'product-technical-features-odd',
  PRODUCT_TECHNICAL_FEATURES_EVEN = 'product-technical-features-even',
  PRODUCT_DETAILS = 'product-details',
  PRODUCT_TECHNICAL_DESCRIPTION = 'product-technical-description',
}

export type TextProps = {
  size?: TextSize;
  type?: TextType;
  color?: TextColor;
  strike?: boolean;
  paragraph?: boolean;
  emphasized?: boolean;
  align?: TextAlign;
  className?: string;
  dataQA?: string;
  withGlossary?: boolean;
  feature?: TextFeature;
  isClipped?: boolean;
  isUppercase?: boolean;
  inline?: boolean;
  html?: string;
  lineClamp?: 1 | 2 | 3 | 4 | 5;
  itemProp?: ItemProp;
  itemContent?: string;
};

export const Text: FunctionComponent<TextProps> = ({
  size,
  type,
  color,
  strike,
  paragraph,
  emphasized,
  align,
  className,
  children,
  dataQA,
  withGlossary,
  feature,
  isClipped,
  isUppercase,
  inline,
  html,
  lineClamp,
  itemProp,
  itemContent,
}) => {
  const getType = () =>
    paragraph
      ? TextSemanticTag.PARAGRAPH
      : strike && emphasized
      ? TextSemanticTag.STRONG
      : inline
      ? TextSemanticTag.SPAN
      : TextSemanticTag.DIV;

  const getClassName = () =>
    cn(
      'as-a-text',
      {
        [`as-a-text--${color}`]: color,
        [`as-a-text--${size}`]: size,
        [`as-a-text--${type}`]: type,
        [`as-a-text--${align}`]: align,
        [`as-a-text--${feature}`]: feature,
        [`as-a-text--line-clamp-${lineClamp}`]: lineClamp,
        [GLOSSARY_HIGHLIGHT_CLASS]: withGlossary,
        'as-a-text--html': html,
        'as-a-text--clipped': isClipped,
        'as-a-text--uppercase': isUppercase,
      },
      className
    );

  const getProps = () => ({
    className: getClassName(),
    'data-qa': dataQA,
    itemProp,
    content: itemContent,
  });

  const getChildren = () =>
    strike || emphasized
      ? createElement(
          strike ? TextSemanticTag.DEL : TextSemanticTag.STRONG,
          null,
          children
        )
      : children;

  if (html) {
    return createElement(getType(), {
      ...getProps(),
      dangerouslySetInnerHTML: {
        __html: html,
      },
    });
  }

  return createElement(getType(), getProps(), getChildren());
};
