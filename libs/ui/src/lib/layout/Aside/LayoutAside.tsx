import { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LayoutAsideProps {}

export const LayoutAside: FC<LayoutAsideProps> = (props: LayoutAsideProps) => {
  return (
    <div data-testid="layout-aside">
      <h2>LayoutAside works!</h2>
    </div>
  );
};
