import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Icon } from './Icon';

export default {
  title: 'Icon',
  component: Icon,
  argTypes: {
    type: {
      options: ['solid', 'regular'],
      control: 'select',
    },
    name: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof Icon>;

export const Default: ComponentStory<typeof Icon> = (args) => (
  <span className="is-size-1">
    <Icon {...args} />
  </span>
);

Default.args = {
  type: 'regular',
  name: 'check-double',
};
