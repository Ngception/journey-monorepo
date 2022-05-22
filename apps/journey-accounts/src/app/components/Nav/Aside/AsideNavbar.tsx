import { FC } from 'react';
import styles from './AsideNavbar.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AsideNavbarProps {}

export const AsideNavbar: FC<AsideNavbarProps> = (props: AsideNavbarProps) => {
  const classes = `menu ${styles['aside-navbar']}`;

  return (
    <aside className={classes}>
      <p className="menu-label">My account</p>
      <ul className="menu-list">
        <li>
          <a href="#">Profile</a>
        </li>
        <li>
          <a href="$">Security</a>
        </li>
        <li>
          <a href="#">Account preferences</a>
        </li>
      </ul>
    </aside>
  );
};
