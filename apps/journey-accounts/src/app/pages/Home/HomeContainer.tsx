import { FC } from 'react';
import { HomeLogin } from './components/Login/HomeLogin';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomeContainerProps {}

export const HomeContainer: FC<HomeContainerProps> = (
  props: HomeContainerProps
) => {
  return (
    <div>
      <div className="section">
        <h1>Login to start planning</h1>
        <HomeLogin />
      </div>
    </div>
  );
};
