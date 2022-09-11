import { FC, FormEvent } from 'react';
import { Animate, AnimateMotion, setFadeOptions } from '@journey-monorepo/ui';
import { logoutUser, useAuth, useError, useTask } from '../../../shared';
import { TaskSearchBar } from '../../Task/Search/TaskSearchBar';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PrimaryNavbarProps {}

export const PrimaryNavbar: FC<PrimaryNavbarProps> = (
  props: PrimaryNavbarProps
) => {
  const { state: auth, logout } = useAuth();
  const { state: task } = useTask();
  const handleError = useError();

  const handleLogout = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await logoutUser();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleError(err);
    } finally {
      logout();

      window.location.href = `${process.env['NX_ACCOUNTS_UI_BASE_URL']}/login`;
    }
  };

  return (
    <nav className="navbar" role="navigation" aria-label="primary navigation">
      <div
        data-testid="navbar-brand"
        className="navbar-brand column is-one-third"
      >
        <div className="navbar-item">
          <h2 className="subtitle">Journey</h2>
        </div>
      </div>

      {auth.isLoggedIn && (
        <>
          {task.tasks.length > 1 ? (
            <div className="navbar-item column is-one-third">
              <Animate>
                <AnimateMotion options={setFadeOptions('search', 0.125)}>
                  <TaskSearchBar />
                </AnimateMotion>
              </Animate>
            </div>
          ) : null}

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a
                  data-testid="navbar-account-button"
                  href={`${process.env['NX_ACCOUNTS_UI_BASE_URL']}/profile`}
                  className="button is-primary"
                >
                  <strong>My account</strong>
                </a>
                <a
                  data-testid="navbar-logout-button"
                  href="#"
                  className="button is-dark is-outlined"
                  onClick={(event) => handleLogout(event)}
                >
                  Log out
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};
