import { FC } from 'react';

export const Loader: FC = () => {
  return (
    <div className="container section">
      <progress className="progress is-primary" max={100} />
    </div>
  );
};
