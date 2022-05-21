import { FC, ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LayoutBodyProps {
  children?: ReactNode;
}

export const LayoutBody: FC<LayoutBodyProps> = (props: LayoutBodyProps) => {
  return (
    <div data-testid="layout-body" className="section">
      <h2>{props.children}</h2>
    </div>
  );
};
