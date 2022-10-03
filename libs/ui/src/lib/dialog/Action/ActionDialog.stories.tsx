import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Animate } from '../../animate';
import { COLOR_KEYS as COLORS } from '../../constants';
import { ActionDialog } from './ActionDialog';

export default {
  title: 'Dialog',
  component: ActionDialog,
  parameters: {
    controls: {
      include: [
        'title',
        'show dialog',
        'loading',
        'disable action button',
        'content',
        'action button label',
        'action button color',
        'cancel button label',
      ],
    },
  },
  argTypes: {
    isDialogOpen: {
      name: 'show dialog',
      control: 'boolean',
    },
    title: {
      control: 'text',
    },
    isLoading: {
      name: 'loading',
      control: 'boolean',
    },
    isActionDisabled: {
      name: 'disable action button',
      control: 'boolean',
    },
    children: {
      name: 'content',
      control: 'text',
    },
    actionButtonLabel: {
      name: 'action button label',
      control: 'text',
    },
    actionButtonColor: {
      name: 'action button color',
      options: COLORS,
      control: 'select',
    },
    cancelButtonLabel: {
      name: 'cancel button label',
      control: 'text',
    },
  },
} as ComponentMeta<typeof ActionDialog>;

export const Action: ComponentStory<typeof ActionDialog> = (args) => (
  <Animate>
    {args.isDialogOpen && (
      <ActionDialog {...args}>{args.children}</ActionDialog>
    )}
  </Animate>
);

Action.args = {
  isDialogOpen: false,
  title: 'Title',
  isLoading: false,
  isActionDisabled: false,
  children: 'Dialog content',
  actionButtonLabel: 'Action',
  actionButtonColor: 'primary',
  cancelButtonLabel: 'Cancel',
  actionHandler: () => {
    return;
  },
  cancelHandler: () => {
    return;
  },
};
