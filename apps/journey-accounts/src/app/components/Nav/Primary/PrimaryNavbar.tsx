import { FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser, useAuth } from '../../../shared';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PrimaryNavbarProps {}

export const PrimaryNavbar: FC<PrimaryNavbarProps> = (
  props: PrimaryNavbarProps
) => {
  const { state: user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (event: FormEvent) => {
    event.preventDefault();

    const { message } = await logoutUser();
    if (message === 'success') {
      logout();
      navigate('/', { replace: true });
    } else {
      return;
    }
  };

  return (
    <nav className="navbar" role="navigation" aria-label="primary navigation">
      <div className="navbar-brand">
        <h1 data-testid="brand-button" className="navbar-item">
          Journey
        </h1>
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
                <strong>Back to board</strong>
              </a>
              <a
                data-testid="logout-button"
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
