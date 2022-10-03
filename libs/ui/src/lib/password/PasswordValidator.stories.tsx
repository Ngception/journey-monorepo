import { ComponentMeta, ComponentStory } from '@storybook/react';
import { PasswordValidator } from './PasswordValidator';

export default {
  title: 'Password',
  component: PasswordValidator,
  parameters: {
    controls: {
      include: ['password'],
    },
  },
} as ComponentMeta<typeof PasswordValidator>;

export const Default: ComponentStory<typeof PasswordValidator> = (args) => (
  <PasswordValidator {...args} />
);

Default.args = {
  password: 'password',
  onValidPasswordHandler: () => {
    return;
  },
};
