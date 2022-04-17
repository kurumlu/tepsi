import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { PlaceholderTile } from './PlaceholderTile';

describe('<PlaceholderTile />', () => {
  const component: ShallowWrapper = shallow(<PlaceholderTile />);

  it('renders <PlaceholderTile /> component', () => {
    expect(component).toMatchSnapshot();
  });
});
