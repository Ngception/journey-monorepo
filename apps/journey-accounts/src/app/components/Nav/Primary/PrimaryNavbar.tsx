import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextType, useAuth } from '../../../shared';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PrimaryNavbarProps {}

export const PrimaryNavbar: FC<PrimaryNavbarProps> = (
  props: PrimaryNavbarProps
) => {
  const { state: user, dispatch } = useAuth() as AuthContextType;
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: 'logout' });
    navigate('/', { replace: true });
  };

  return (
    <nav className="navbar" role="navigation" aria-label="primary navigation">
      <div className="navbar-brand">
        <a href="#" className="navbar-item">
          Brand
        </a>
      </div>

      {user.isLoggedIn && (
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a href="#" className="button is-primary">
                <strong>Back to board</strong>
              </a>
              <a href="#" className="button is-light" onClick={() => logout()}>
                Log out
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
