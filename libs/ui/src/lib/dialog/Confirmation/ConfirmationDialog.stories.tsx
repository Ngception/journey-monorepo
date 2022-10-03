import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Animate } from '../../animate';
import { COLOR_KEYS as COLORS } from '../../constants';
import { ConfirmationDialog } from './ConfirmationDialog';

export default {
  title: 'Dialog',
  component: ConfirmationDialog,
  parameters: {
    controls: {
      include: [
        'title',
        'show warning message',
        'show danger message',
        'show dialog',
        'loading',
        'disable confirmation button',
        'content',
        'confirm button label',
        'confirm button color',
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
    showWarning: {
      name: 'show warning message',
      control: 'boolean',
    },
    showDanger: {
      name: 'show danger message',
      control: 'boolean',
    },
    isLoading: {
      name: 'loading',
      control: 'boolean',
    },
    isConfirmationDisabled: {
      name: 'disable confirmation button',
      control: 'boolean',
    },
    children: {
      name: 'content',
      control: 'text',
    },
    ConfirmationButtonLabel: {
      name: 'confirmation button label',
      control: 'text',
    },
    ConfirmationButtonColor: {
      name: 'confirmation button color',
      options: COLORS,
      control: 'select',
    },
    cancelButtonLabel: {
      name: 'cancel button label',
      control: 'text',
    },
  },
} as ComponentMeta<typeof ConfirmationDialog>;

export const Confirmation: ComponentStory<typeof ConfirmationDialog> = (
  args
) => (
  <Animate>
    {args.isDialogOpen && (
      <ConfirmationDialog {...args}>{args.children}</ConfirmationDialog>
    )}
  </Animate>
);

Confirmation.args = {
  isDialogOpen: false,
  title: 'Title',
  showWarning: true,
  showDanger: true,
  isLoading: false,
  children: 'Confirmation message content',
  confirmButtonLabel: 'Confirm',
  confirmButtonColor: 'danger',
  cancelButtonLabel: 'Cancel',
  confirmHandler: () => {
    return;
  },
  cancelHandler: () => {
    return;
  },
};
