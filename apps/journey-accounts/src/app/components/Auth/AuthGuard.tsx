import { FC, useEffect, useRef } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useNotification, useUser, verifyAuthStatus } from '../../shared';
import { useAuth } from '../../shared/hooks/useAuth';

type LocationProps = {
  state: {
    from: Location;
  };
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AuthGuardProps {}

export const AuthGuard: FC<AuthGuardProps> = (props: AuthGuardProps) => {
  const { state: auth, login, logout } = useAuth();
  const { setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation() as LocationProps;
  const { addNotification } = useNotification();
  const effectCalled = useRef(false);
  const from = location.state?.from?.pathname || '/profile';

  const setAuthStatus = async () => {
    if (auth.isLoggedIn) {
      return;
    }

    try {
      const response = await verifyAuthStatus();

      if (response.message === 'OK') {
        login();
        setUser(response.user);
        navigate(from, { replace: true });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      addNotification({
        message: 'Session timeout. Please login again.',
        type: 'info',
      });
      logout();
    }
  };

  useEffect(() => {
    if (effectCalled.current) {
      return;
    } else {
      effectCalled.current = true;
      setAuthStatus();
    }
  }, []);

  return auth?.isLoggedIn ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
