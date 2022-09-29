import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TooltipButton } from './TooltipButton';
import { COLOR_KEYS as COLORS } from '../../../constants';

export default {
  parameters: {
    controls: {
      include: [
        'text',
        'color',
        'size',
        'outline',
        'inverted',
        'loading',
        'disabled',
        'full width',
        'tooltip',
        'tooltip color',
        'tooltip size',
        'tooltip position',
      ],
    },
  },
  title: 'Button',
  component: TooltipButton,
  argTypes: {
    children: {
      name: 'text',
    },
    color: {
      options: COLORS,
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
    tooltipColor: {
      name: 'tooltip color',
      options: COLORS,
      control: 'select',
    },
    tooltipSize: {
      name: 'tooltip size',
      options: ['small', 'medium', 'large'],
      control: 'select',
    },
    tooltipPosition: {
      name: 'tooltip position',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
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
  tooltip: 'tooltip',
  tooltipColor: 'dark',
  tooltipSize: 'default',
  tooltipPosition: 'bottom',
};
