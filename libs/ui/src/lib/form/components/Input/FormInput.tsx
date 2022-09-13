/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';

interface FormInputProps {
  testId?: string;
  type: string;
  name: string;
  id?: string;
  placeholder: string;
  required?: boolean;
  hasErrors?: boolean;
  isInvalid?: boolean;
  errorMessageId?: string;
  changeHandler: (event: any) => void;
}

export const FormInput: FC<FormInputProps> = (props: FormInputProps) => {
  const setInputClasses = (): string => {
    let classes = 'input ';

    if (props.isInvalid) {
      classes += ' is-danger';
    }

    return classes;
  };

  const handleChange = (event: any) => {
    event.preventDefault();

    props.changeHandler(event);
  };

  return (
    <input
      data-testid={props.testId}
      className={setInputClasses()}
      id={props.id || undefined}
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
      aria-required={props.required}
      aria-invalid={props.isInvalid}
      aria-describedby={props.errorMessageId || undefined}
      onChange={handleChange}
    />
  );
};
