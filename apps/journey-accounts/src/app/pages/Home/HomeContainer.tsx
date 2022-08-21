import { FC } from 'react';
import {
  AnimateMotion,
  Card,
  CardContent,
  setFadeOptions,
} from '@journey-monorepo/ui';
import {
  CompletedTasks,
  JourneyBrand,
  ScrumBoard,
} from '@journey-monorepo/assets';
import { HomeLogin } from './components/Login/HomeLogin';

import styles from './HomeContainer.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomeContainerProps {}

export const HomeContainer: FC<HomeContainerProps> = (
  props: HomeContainerProps
) => {
  return (
    <AnimateMotion options={setFadeOptions('login', 0.5)}>
      <div
        data-testid="home-container"
        className={`${styles['home-container']} is-flex is-flex-direction-column is-justify-content-space-between`}
      >
        <div
          data-testid="home-login"
          className={`${styles['home-login']} section`}
        >
          <div className={styles['brand']}>
            <JourneyBrand />
          </div>
          <div className={`${styles['login-card']}`}>
            <Card>
              <CardContent>
                <div className="card-content">
                  <h2 className="subtitle card-title">
                    Login to start planning
                  </h2>
                  <HomeLogin />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="is-flex is-justify-content-space-between">
          <ScrumBoard height={'300px'} width={'300px'} />
          <CompletedTasks height={'300px'} width={'300px'} />
        </div>
      </div>
    </AnimateMotion>
  );
};
