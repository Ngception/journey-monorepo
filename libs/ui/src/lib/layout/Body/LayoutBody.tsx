import { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LayoutBodyProps {}

export const LayoutBody: FC<LayoutBodyProps> = (props: LayoutBodyProps) => {
  return (
    <div data-testid="layout-body">
      <h2>LayoutBody works!</h2>
    </div>
  );
};
