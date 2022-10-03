import { ComponentMeta, ComponentStory } from '@storybook/react';
import { COLOR_KEYS as COLORS } from '../constants';
import { Dropdown } from './Dropdown';

export default {
  title: 'Dropdown',
  component: Dropdown,
  parameters: {
    controls: {
      include: ['items', 'text', 'button color', 'disabled'],
    },
  },
  argTypes: {
    items: {
      control: 'object',
    },
    text: {
      control: 'text',
    },
    triggerColor: {
      name: 'button color',
      options: COLORS,
      control: 'select',
    },
    isDisabled: {
      name: 'disabled',
      control: 'boolean',
    },
  },
} as ComponentMeta<typeof Dropdown>;

export const Default: ComponentStory<typeof Dropdown> = (args) => (
  <div style={{ margin: '0 auto', width: '25%' }}>
    <Dropdown {...args} />
  </div>
);

Default.args = {
  items: [
    {
      label: 'Label 1',
      clickHandler: () => {
        return;
      },
    },
    {
      label: 'Label 2',
      clickHandler: () => {
        return;
      },
    },
    {
      label: 'Label 3',
      clickHandler: () => {
        return;
      },
    },
  ],
  text: 'Dropdown',
  triggerColor: 'info',
  isDisabled: false,
};
