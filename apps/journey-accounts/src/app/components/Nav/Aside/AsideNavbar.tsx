import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AsideNavbar.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AsideNavbarProps {}

export const AsideNavbar: FC<AsideNavbarProps> = (props: AsideNavbarProps) => {
  const classes = `menu ${styles['aside-navbar']}`;

  const setActive = (isActive: boolean) => (isActive ? `is-active` : undefined);

  return (
    <aside className={classes}>
      <p className="menu-label">My account</p>
      <ul className="menu-list">
        <li>
          <NavLink
            data-testid="profile-link"
            to="/profile"
            className={({ isActive }) => setActive(isActive)}
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            data-testid="security-link"
            to="/security"
            className={({ isActive }) => setActive(isActive)}
          >
            Security
          </NavLink>
        </li>
        <li>
          <NavLink
            data-testid="account-preferences-link"
            to="/account-preferences"
            className={({ isActive }) => setActive(isActive)}
          >
            Account preferences
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};
