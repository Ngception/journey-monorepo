import { FC } from 'react';
import { SecurityEditPassword } from './components';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SecurityContainerProps {}

export const SecurityContainer: FC<SecurityContainerProps> = (
  props: SecurityContainerProps
) => {
  return (
    <div>
      <div className="container column is-half">
        <h1 className="title">Security</h1>
        <div>
          <SecurityEditPassword />
        </div>
      </div>
    </div>
  );
};
