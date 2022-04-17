import { action } from '@storybook/addon-actions';
import { ClickPointProps } from './ClickPoint';

export const clickPointOnClickMock = () => action('click');

export const clickPointMock: ClickPointProps = {
  x: '25%',
  y: '40%',
  onClick: clickPointOnClickMock,
};
