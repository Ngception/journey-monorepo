import { ComponentMeta, ComponentStory } from '@storybook/react';
import { COLOR_KEYS as COLORS } from '../../../constants';
import { SkipLink } from './SkipLink';

export default {
  title: 'Button',
  component: SkipLink,
  parameters: {
    controls: {
      include: ['content', 'color'],
    },
  },
  argTypes: {
    children: {
      name: 'content',
      control: 'text',
    },
    color: {
      options: COLORS,
      control: 'select',
    },
  },
} as ComponentMeta<typeof SkipLink>;

export const AsSkipLink: ComponentStory<typeof SkipLink> = (args) => (
  <>
    <SkipLink {...args}>{args.children}</SkipLink>
    <div>
      <label className="label" htmlFor="input">
        Label
      </label>
      <input
        className="input"
        id="input"
        type="text"
        placeholder="placeholder"
      />
    </div>
  </>
);

const skipToContent = () => {
  const input = document.querySelector('.input') as HTMLElement;

  input.focus();
};

AsSkipLink.args = {
  children: 'Skip to main content',
  color: 'link',
  clickHandler: skipToContent,
};
