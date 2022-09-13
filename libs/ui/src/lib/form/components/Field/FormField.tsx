import { FC, ReactNode } from 'react';

interface FormFieldProps {
  children: ReactNode;
  testId?: string;
  hasAddons?: boolean;
}

export const FormField: FC<FormFieldProps> = (props: FormFieldProps) => {
  const setFieldClasses = (): string => {
    let classes = 'field';

    if (props.hasAddons) {
      classes += ' has-addons';
    }

    return classes;
  };

  return (
    <div data-testid={props.testId} className={setFieldClasses()}>
      {props.children}
    </div>
  );
};
