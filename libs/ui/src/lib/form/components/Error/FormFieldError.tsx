import { FC, ReactNode } from 'react';

interface FormFieldErrorProps {
  children: ReactNode;
  isErrorActive: boolean;
  id?: string;
  testId?: string;
}

export const FormFieldError: FC<FormFieldErrorProps> = (
  props: FormFieldErrorProps
) => {
  return (
    <div aria-live="polite" id={props.id || undefined}>
      {props.isErrorActive && (
        <p data-testid={props.testId} className="help is-danger">
          {props.children}
        </p>
      )}
    </div>
  );
};
