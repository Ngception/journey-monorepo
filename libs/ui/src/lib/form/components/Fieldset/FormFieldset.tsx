import { FC, ReactNode } from 'react';

interface FormFieldsetProps {
  children: ReactNode;
  isDisabled?: boolean;
}

export const FormFieldset: FC<FormFieldsetProps> = (
  props: FormFieldsetProps
) => {
  return <fieldset disabled={props.isDisabled}>{props.children}</fieldset>;
};
