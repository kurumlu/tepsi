import React from 'react';
import { mount, shallow, ShallowWrapper } from 'enzyme';

import { Tag, TagColor, TagProps } from './Tag';
import { MockChildren } from './tag.mock';

describe('renders <Tag />', () => {
  const component: ShallowWrapper<TagProps> = shallow(<Tag>-30%</Tag>);

  it('renders <Tag /> component', () => {
    expect(component).toMatchSnapshot('default');
  });

  it('has specific class depends on color', () => {
    const TagWithSecondColor: ShallowWrapper<TagProps> = shallow(
      <Tag color={TagColor.SECONDARY}>-30%</Tag>
    );
    expect(TagWithSecondColor).toMatchSnapshot('color');
    expect(
      TagWithSecondColor.hasClass(`sd-a-tag--${TagColor.SECONDARY}`)
    ).toBeTruthy();
  });

  it(`has data-qa attr`, () => {
    const TagWithDataAttr: ShallowWrapper<TagProps> = shallow(
      <Tag dataQA={'123'}>-30%</Tag>
    );
    expect(TagWithDataAttr).toMatchSnapshot('data-qa');
    expect(TagWithDataAttr.prop('data-qa')).toEqual('123');
  });

  it(`renders <Tag /> component with children`, () => {
    const componentWithChildren = mount(
      <Tag>
        <MockChildren />
      </Tag>
    );

    expect(componentWithChildren).toMatchSnapshot('children');
    expect(componentWithChildren.find('svg')).toHaveLength(1);
  });
});
