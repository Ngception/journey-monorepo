import { AnimateMotion, setFadeOptions } from '@journey-monorepo/ui';
import { FC } from 'react';
import { SecurityEditPassword } from './components';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SecurityContainerProps {}

export const SecurityContainer: FC<SecurityContainerProps> = (
  props: SecurityContainerProps
) => {
  return (
    <AnimateMotion options={setFadeOptions('security', 0.5)}>
      <div>
        <div className="container column is-4">
          <h1 className="title">Security</h1>
          <div>
            <SecurityEditPassword />
          </div>
        </div>
      </div>
    </AnimateMotion>
  );
};
