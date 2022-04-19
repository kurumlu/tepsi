import React from 'react';
import { shallow, ShallowWrapper, mount } from 'enzyme';

import { Text, TextProps, TextColor, TextSemanticTag } from './Text';
import { mockText, MockChildren } from './text.mock';

describe('<Text />', () => {
  const component: ShallowWrapper<TextProps> = shallow(<Text inline></Text>);

  it('renders <Text /> component', () => {
    expect(component).toMatchSnapshot('default');
  });

  it('renders <Text /> with HTML if "html" prop passed component', () => {
    const componentWithHTML: ShallowWrapper<TextProps> = shallow(
      <Text html="<b>bold</b>" />
    );
    expect(componentWithHTML).toMatchSnapshot('text with html');
  });

  it(`adds classname 'sd-a-text--${TextColor.NEGATIVE}' if "color" props passed`, () => {
    const componentWithColor: ShallowWrapper<TextProps> = shallow(
      <Text inline color={TextColor.NEGATIVE}>
        {mockText}
      </Text>
    );

    expect(componentWithColor).toMatchSnapshot('color');
    expect(
      componentWithColor.hasClass(`sd-a-text--${TextColor.NEGATIVE}`)
    ).toBeTruthy();
  });

  it(`adds ${TextSemanticTag.DEL} tag if "strike" prop was passed`, () => {
    const componentWithStrike: ShallowWrapper<TextProps> = shallow(
      <Text inline strike>
        {mockText}
      </Text>
    );

    expect(componentWithStrike).toMatchSnapshot('strike');
    expect(componentWithStrike.find(TextSemanticTag.DEL)).toBeTruthy();
  });

  it(`adds ${TextSemanticTag.STRONG} tag if "emphasized" prop was passed`, () => {
    const componentWithEmphasized: ShallowWrapper<TextProps> = shallow(
      <Text inline emphasized>
        {mockText}
      </Text>
    );

    expect(componentWithEmphasized).toMatchSnapshot('emphasized');
    expect(componentWithEmphasized.find(TextSemanticTag.STRONG)).toBeTruthy();
  });

  it(`replace span tag to ${TextSemanticTag.PARAGRAPH} if "paragraph" prop was passed`, () => {
    const componentWithParagraph: ShallowWrapper<TextProps> = shallow(
      <Text paragraph>{mockText}</Text>
    );

    expect(componentWithParagraph).toMatchSnapshot('paragraph');
    expect(
      componentWithParagraph.exists(TextSemanticTag.PARAGRAPH)
    ).toBeTruthy();
    expect(
      componentWithParagraph
        .find(TextSemanticTag.PARAGRAPH)
        .hasClass('sd-a-text')
    ).toBeTruthy();
  });

  it(`renders <Text /> component with children`, () => {
    const componentWithChildren = mount(
      <Text>
        <MockChildren />
      </Text>
    );

    expect(componentWithChildren).toMatchSnapshot('children');
    expect(componentWithChildren.find('ul')).toHaveLength(1);
  });

  it('should have "sd-a-text--clipped" class if isClipped prop was passed', () => {
    const componentIsClipped: ShallowWrapper<TextProps> = shallow(
      <Text isClipped inline>
        {mockText}
      </Text>
    );

    expect(componentIsClipped.hasClass('sd-a-text--clipped')).toBeTruthy();
  });

  it('should have "sd-a-text--line-clamp-X" class if lineClamp prop was passed', () => {
    const lineClamp = 2;
    const componentLineClamp: ShallowWrapper<TextProps> = shallow(
      <Text lineClamp={lineClamp}>{mockText}</Text>
    );

    expect(
      componentLineClamp.hasClass(`sd-a-text--line-clamp-${lineClamp}`)
    ).toBeTruthy();
  });
});
