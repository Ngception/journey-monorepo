import { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LayoutHeaderProps {}

export const LayoutHeader: FC<LayoutHeaderProps> = (
  props: LayoutHeaderProps
) => {
  return (
    <div data-testid="layout-header">
      <h2>LayoutHeader works!</h2>
    </div>
  );
};
