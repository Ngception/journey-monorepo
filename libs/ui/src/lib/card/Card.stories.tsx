import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Card } from './Card';
import { CardContent } from './components';

export default {
  title: 'Card',
  component: Card,
  argTypes: {
    children: {
      name: 'content',
      control: 'text',
    },
  },
} as ComponentMeta<typeof Card>;

export const Default: ComponentStory<typeof Card> = (args) => (
  <Card {...args}>
    <CardContent>{args.children}</CardContent>
  </Card>
);

Default.args = {
  children: 'Content goes here',
};
