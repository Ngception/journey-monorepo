import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AnimateMotion, setFadeOptions } from '@journey-monorepo/ui';
import {
  CompletedTasks,
  JourneyBrand,
  ScrumBoard,
} from '@journey-monorepo/assets';

import styles from './HomeContainer.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomeContainerProps {}

export const HomeContainer: FC<HomeContainerProps> = (
  props: HomeContainerProps
) => {
  return (
    <AnimateMotion options={setFadeOptions('home', 0.5)}>
      <div
        data-testid="home-container"
        className={`${styles['home-container']} is-flex is-flex-direction-column is-justify-content-space-between`}
      >
        <div
          data-testid="home-content"
          className={`${styles['home-content']} section`}
        >
          <div className={styles['brand']}>
            <JourneyBrand />
          </div>
          <div className={`${styles['home-content-card']}`}>
            <Outlet></Outlet>
          </div>
        </div>
        <div className={styles['scrum-board-graphic']}>
          <ScrumBoard height={'300px'} width={'300px'} />
        </div>
        <div className={styles['completed-tasks-graphic']}>
          <CompletedTasks height={'300px'} width={'300px'} />
        </div>
      </div>
    </AnimateMotion>
  );
};
