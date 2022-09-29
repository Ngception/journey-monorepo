import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
  parameters: {
    controls: {
      include: [
        'children',
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
      name: 'text',
    },
    color: {
      options: [
        'primary',
        'link',
        'info',
        'success',
        'warning',
        'danger',
        'light',
        'white',
        'dark',
        'text',
      ],
      control: 'select',
    },
    size: {
      options: ['default', 'small', 'medium', 'large'],
      control: 'select',
    },
    isLoading: {
      name: 'loading',
    },
    isDisabled: {
      name: 'disabled',
    },
    fullWidth: {
      name: 'full width',
    },
  },
} as ComponentMeta<typeof Button>;

export const Primary: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>{args.children}</Button>
);

Primary.args = {
  children: 'Click',
  color: 'link',
  size: 'default',
  outline: false,
  inverted: false,
  isLoading: false,
  isDisabled: false,
  fullWidth: false,
};
