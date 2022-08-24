import { FC, ReactNode } from 'react';
import { LayoutAside } from './Aside/LayoutAside';
import { LayoutBody } from './Body/LayoutBody';
import { LayoutHeader } from './Header/LayoutHeader';

import styles from './Layout.module.scss';

interface LayoutProps {
  aside?: ReactNode;
  primaryNavbar?: ReactNode;
  body?: ReactNode;
}

export const Layout: FC<LayoutProps> = (props: LayoutProps) => {
  return (
    <>
      {props.primaryNavbar && (
        <LayoutHeader>{props.primaryNavbar}</LayoutHeader>
      )}
      <LayoutBody>
        {props.aside ? (
          <div
            data-testid="with-aside"
            className={`columns is-gapless ${styles['full-height']}`}
          >
            <div className="column is-2">
              <LayoutAside>{props.aside}</LayoutAside>
            </div>
            <div className={`column ${styles['content']} main-content`}>
              {props.body}
            </div>
          </div>
        ) : (
          <div
            data-testid="no-aside"
            className={`${styles['content']} ${styles['full-height']} main-content`}
          >
            {props.body}
          </div>
        )}
      </LayoutBody>
    </>
  );
};
