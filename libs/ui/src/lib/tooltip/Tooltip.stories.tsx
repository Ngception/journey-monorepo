import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TooltipContainer } from './TooltipContainer';
import { Tooltip } from './components';
import { COLOR_KEYS as COLORS } from '../constants';
import { Button } from '../button';

const positions = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

export default {
  title: 'Tooltip',
  component: Tooltip,
  argTypes: {
    color: {
      options: COLORS,
      control: 'select',
    },
    children: {
      name: 'content',
      control: 'text',
    },
    position: {
      options: positions,
      control: 'select',
    },
  },
} as ComponentMeta<typeof Tooltip>;

export const Default: ComponentStory<typeof Tooltip> = (args) => (
  <div className="mt-5">
    <TooltipContainer>
      <Button
        color="link"
        clickHandler={() => {
          return;
        }}
      >
        Link
      </Button>
      <Tooltip {...args} />
    </TooltipContainer>
  </div>
);

Default.args = {
  color: 'dark',
  children: 'Tooltip',
  position: 'bottom-left',
};
