import { FC, ReactNode } from 'react';

interface FormLabelProps {
  children: ReactNode;
  controlId: string;
}

export const FormLabel: FC<FormLabelProps> = (props: FormLabelProps) => {
  return (
    <label className="label" htmlFor={props.controlId}>
      {props.children}
    </label>
  );
};
