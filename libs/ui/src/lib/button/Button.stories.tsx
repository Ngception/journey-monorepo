import { ComponentMeta, ComponentStory } from '@storybook/react';
import { COLOR_KEYS as COLORS, SIZE_KEYS as SIZES } from '../constants/bulma';
import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
  parameters: {
    controls: {
      include: [
        'content',
        'color',
        'size',
        'outline',
        'inverted',
        'loading',
        'disabled',
        'full width',
      ],
    },
  },
  argTypes: {
    children: {
      name: 'content',
    },
    color: {
      options: COLORS,
      control: 'select',
    },
    size: {
      options: ['default', ...SIZES],
      control: 'select',
    },
    outline: {
      control: 'boolean',
    },
    inverted: {
      control: 'boolean',
    },
    isLoading: {
      name: 'loading',
      control: 'boolean',
    },
    isDisabled: {
      name: 'disabled',
      control: 'boolean',
    },
    fullWidth: {
      name: 'full width',
      control: 'boolean',
    },
  },
} as ComponentMeta<typeof Button>;

export const Default: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>{args.children}</Button>
);

Default.args = {
  children: 'Click',
  color: 'link',
  size: 'default',
  outline: false,
  inverted: false,
  isLoading: false,
  isDisabled: false,
  fullWidth: false,
};
