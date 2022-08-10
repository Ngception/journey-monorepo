import { Button, Icon } from '@journey-monorepo/ui';
import {
  ChangeEvent,
  FC,
  FormEvent,
  MouseEvent,
  useRef,
  useState,
} from 'react';
import { logoutUser } from '../../../shared';
import { useAuth, useTask } from '../../../shared/hooks';

import styles from './PrimaryNavbar.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PrimaryNavbarProps {}

export const PrimaryNavbar: FC<PrimaryNavbarProps> = (
  props: PrimaryNavbarProps
) => {
  const [searchFilter, setSearchFilter] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { state: auth, logout } = useAuth();
  const { state: task, setTasksSearchFilter } = useTask();

  const handleLogout = async (event: FormEvent) => {
    event.preventDefault();

    const { message } = await logoutUser();
    if (message === 'success') {
      logout();
      redirectToLogin();
    } else {
      return;
    }
  };

  const redirectToLogin = () => {
    window.location.href = `${process.env['NX_ACCOUNTS_UI_BASE_URL']}/profile?site=journey`;
  };

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setSearchFilter(event.target.value);
  };

  const handleSearchKeyUp = (event: any) => {
    event.preventDefault();

    if (event.key === 'Enter') {
      setTasksSearchFilter(event.target.value);
    }
  };

  const handleResetSearchFilter = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setSearchFilter('');
    setTasksSearchFilter('');

    inputRef.current?.focus();
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
          <div className="navbar-item column is-one-third">
            <div className="field has-addons">
              <div className={`control has-icons-right is-expanded`}>
                <input
                  data-testid="task-search-filter-input"
                  ref={inputRef}
                  className="input"
                  type="text"
                  onChange={handleSearchInput}
                  placeholder="Search tasks"
                  value={searchFilter}
                  onKeyUp={handleSearchKeyUp}
                />
                {task.tasksSearchFilter && (
                  <button
                    className={`icon is-white is-small is-right ${styles['clear-filter-input']}`}
                    tabIndex={0}
                    onClick={handleResetSearchFilter}
                    aria-label="Clear search and reset tasks"
                  >
                    <Icon type="solid" name="xmark" />
                  </button>
                )}
              </div>
              <div className="control">
                <Button
                  color="primary"
                  clickHandler={() => setTasksSearchFilter(searchFilter)}
                >
                  <p>Search</p>
                </Button>
              </div>
            </div>
          </div>

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
                  className="button is-light"
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
