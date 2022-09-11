import { FC, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser, useAuth, useError } from '../../../shared';

import styles from './PrimaryNavbar.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PrimaryNavbarProps {}

export const PrimaryNavbar: FC<PrimaryNavbarProps> = (
  props: PrimaryNavbarProps
) => {
  const { state: user, logout } = useAuth();
  const navigate = useNavigate();
  const handleError = useError();

  const handleLogout = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await logoutUser();
      logout();
      navigate('/', { replace: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      logout();
      handleError(err);
    }
  };

  return (
    <nav className="navbar" role="navigation" aria-label="primary navigation">
      <div className="navbar-brand column is-one-third">
        <div className="navbar-item">
          <h2 data-testid="brand-button" className="subtitle">
            <Link className={styles['navbar-brand-link']} to="/">
              Journey
            </Link>
          </h2>
        </div>
      </div>

      {user.isLoggedIn && (
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a
                data-testid="back-to-board-button"
                href={`${process.env['NX_JOURNEY_UI_BASE_URL']}`}
                className="button is-primary"
              >
                <strong>Go to board</strong>
              </a>
              <a
                data-testid="logout-button"
                href="#"
                className="button is-outlined is-dark"
                onClick={(event) => handleLogout(event)}
              >
                Log out
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
