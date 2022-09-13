import { FC, FormEvent, ReactNode } from 'react';

interface FormProps {
  testId?: string;
  children: ReactNode;
  submitHandler: (event: FormEvent) => void;
}

export const Form: FC<FormProps> = (props: FormProps) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    props.submitHandler(event);
  };

  return (
    <form data-testid={props.testId} onSubmit={handleSubmit}>
      {props.children}
    </form>
  );
};
