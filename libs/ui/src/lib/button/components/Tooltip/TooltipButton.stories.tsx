import { ComponentMeta, ComponentStory } from '@storybook/react';
import {
  COLOR_KEYS as COLORS,
  SIZE_KEYS as SIZES,
} from '../../../constants/bulma';
import { TooltipButton } from './TooltipButton';

const positions = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

export default {
  title: 'Button',
  component: TooltipButton,
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
        'tooltip color',
        'tooltip position',
        'tooltip',
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
    tooltip: {
      control: 'text',
    },
    tooltipPosition: {
      name: 'tooltip position',
      options: positions,
      control: 'select',
    },
    tooltipColor: {
      name: 'tooltip color',
      options: COLORS,
      control: 'select',
    },
  },
} as ComponentMeta<typeof TooltipButton>;

export const WithTooltip: ComponentStory<typeof TooltipButton> = (args) => (
  <TooltipButton {...args}>{args.children}</TooltipButton>
);

WithTooltip.args = {
  children: 'Click',
  color: 'link',
  size: 'default',
  outline: false,
  inverted: false,
  isLoading: false,
  isDisabled: false,
  fullWidth: false,
  tooltip: 'Tooltip',
  tooltipColor: 'dark',
  tooltipPosition: 'top-left',
};
