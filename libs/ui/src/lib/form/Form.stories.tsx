import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from '../button';
import { Icon } from '../icon';
import {
  FormControl,
  FormField,
  FormFieldError,
  FormIcon,
  FormInput,
  FormLabel,
} from './components';
import { Form } from './Form';

export default {
  title: 'Form',
  component: Form,
  parameters: {
    controls: {
      include: [],
    },
  },
  argTypes: {
    error: {
      name: 'Show field error',
      control: 'boolean',
    },
  },
} as ComponentMeta<typeof Form>;

export const Default: ComponentStory<typeof Form> = (args) => (
  <Form {...args}>
    <FormField>
      <FormLabel controlId="field-one">Label One</FormLabel>
      <FormControl>
        <FormInput
          hasErrors={false}
          id="field-one"
          type="text"
          placeholder="placeholder"
          name="input"
          changeHandler={args.submitHandler}
          isInvalid={false}
        />
      </FormControl>
    </FormField>
    <FormField>
      <FormLabel controlId="field-two">Label Two</FormLabel>
      <FormControl>
        <FormInput
          hasErrors={true}
          errorMessageId="error"
          id="field-two"
          type="text"
          placeholder="placeholder"
          name="input"
          changeHandler={args.submitHandler}
          isInvalid={true}
        />
      </FormControl>
      <FormFieldError id="error" isErrorActive={true}>
        Field error
      </FormFieldError>
    </FormField>
    <FormLabel controlId="field-three">Label Three</FormLabel>
    <FormField>
      <FormControl isExpanded={true} hasIconsLeft={true}>
        <FormInput
          hasErrors={false}
          type="text"
          placeholder="placeholder"
          id="field-three"
          name="field-three"
          required={true}
          changeHandler={args.submitHandler}
        />
        <FormIcon size="small" position="left">
          <Icon type="solid" name="envelope" />
        </FormIcon>
      </FormControl>
    </FormField>
    <FormLabel controlId="field-four">Label Four</FormLabel>
    <FormField>
      <FormField hasAddons={true}>
        <FormControl hasIconsLeft={true} hasIconsRight={true} isExpanded={true}>
          <FormInput
            name="field-four"
            type="text"
            placeholder="placeholder"
            required={true}
            isInvalid={false}
            changeHandler={args.submitHandler}
          />
          <FormIcon size="small" position="left">
            <Icon type="solid" name="lock" />
          </FormIcon>
        </FormControl>
        <FormControl>
          <Button>
            <Icon type="solid" name="eye" />
          </Button>
        </FormControl>
      </FormField>
    </FormField>
    <FormField>
      <FormControl>
        <Button>Submit</Button>
      </FormControl>
    </FormField>
  </Form>
);

Default.args = {
  submitHandler: () => {
    return;
  },
};
