import { FC, FormEvent } from 'react';
import { logoutUser } from '../../../shared';
import { useAuth } from '../../../shared/hooks';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PrimaryNavbarProps {}

export const PrimaryNavbar: FC<PrimaryNavbarProps> = (
  props: PrimaryNavbarProps
) => {
  const { state: auth, logout } = useAuth();

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

  return (
    <nav className="navbar" role="navigation" aria-label="primary navigation">
      <div className="navbar-brand">
        <a href="#" className="navbar-item">
          Brand
        </a>
      </div>

      {auth.isLoggedIn && (
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a
                href={`${process.env['NX_ACCOUNTS_UI_BASE_URL']}/profile`}
                className="button is-primary"
              >
                <strong>My account</strong>
              </a>
              <a
                href="#"
                className="button is-light"
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
