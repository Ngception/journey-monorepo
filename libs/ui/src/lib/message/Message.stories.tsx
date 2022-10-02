import { ComponentMeta, ComponentStory } from '@storybook/react';
import { COLOR_KEYS as COLORS, SIZE_KEYS as SIZES } from '../constants';
import { MessageBody, MessageHeader } from './components';
import { Message } from './Message';

export default {
  title: 'Message',
  component: Message,
  parameters: {
    controls: {
      include: ['color', 'size'],
    },
  },
  argTypes: {
    color: {
      options: COLORS,
      control: 'select',
    },
    size: {
      options: ['default', ...SIZES],
      control: 'select',
    },
  },
} as ComponentMeta<typeof Message>;

export const Default: ComponentStory<typeof Message> = (args) => (
  <Message {...args}>
    <MessageHeader>Header content</MessageHeader>
    <MessageBody>Body content</MessageBody>
  </Message>
);

export const WithoutHeader: ComponentStory<typeof Message> = (args) => (
  <Message {...args}>
    <MessageBody>Body Content</MessageBody>
  </Message>
);

Default.args = {
  color: 'success',
  size: 'default',
};
