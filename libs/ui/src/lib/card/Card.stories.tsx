import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CardContent } from './components/Content';
import { Card } from './Card';

const text =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

export default {
  title: 'Card',
  component: Card,
  parameters: {
    controls: {
      include: ['content'],
    },
  },
  argTypes: {
    children: {
      name: 'content',
    },
  },
} as ComponentMeta<typeof Card>;

export const Default: ComponentStory<typeof Card> = (args) => (
  <Card>
    <CardContent>{args.children}</CardContent>
  </Card>
);

Default.args = {
  children: text,
};
