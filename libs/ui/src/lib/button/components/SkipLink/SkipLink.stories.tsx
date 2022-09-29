import { ComponentMeta, ComponentStory } from '@storybook/react';
import { COLOR_KEYS as COLORS } from '../../../constants';
import { SkipLink } from './SkipLink';

export default {
  title: 'Button',
  component: SkipLink,

  parameters: {
    controls: {
      include: ['text', 'color'],
    },
  },
  argTypes: {
    color: {
      options: COLORS,
      control: 'select',
    },
    children: {
      name: 'text',
    },
  },
} as ComponentMeta<typeof SkipLink>;

export const AsSkipLink: ComponentStory<typeof SkipLink> = (args) => (
  <>
    <SkipLink {...args}>{args.children}</SkipLink>
    <p className="my-3">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
    <div className="field">
      <label className="label" htmlFor="input">
        Name
      </label>
      <div className="control">
        <input
          className="input"
          id="input"
          type="text"
          placeholder="Text input"
        />
      </div>
    </div>
  </>
);

const skipToContent = () => {
  const inputField = document.querySelector('.input') as HTMLElement;
  inputField.focus();
};

AsSkipLink.args = {
  children: 'Skip to main content',
  color: 'link',
  clickHandler: skipToContent,
};
