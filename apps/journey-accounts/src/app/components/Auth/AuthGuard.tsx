import { FC, useEffect, useRef, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Loader, useNotification } from '@journey-monorepo/ui';
import { useAuth, useUser, verifyAuthStatus } from '../../shared';
import { AxiosError } from 'axios';
import { HttpException } from '@nestjs/common';

type LocationProps = {
  state: {
    from: Location;
  };
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AuthGuardProps {}

export const AuthGuard: FC<AuthGuardProps> = (props: AuthGuardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const effectCalled = useRef(false);

  const navigate = useNavigate();
  const location = useLocation() as LocationProps;
  const { state: auth, login, logout } = useAuth();
  const { setUser } = useUser();
  const { showErrorNotification, showInfoNotification } = useNotification();

  const from = location.state?.from?.pathname || '/profile';

  useEffect(() => {
    if (effectCalled.current) {
      return;
    } else {
      effectCalled.current = true;
      setAuthStatus();
    }
  }, []);

  const setAuthStatus = async () => {
    if (auth.isLoggedIn) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await verifyAuthStatus();

      login();
      setUser(response?.user);
      navigate(from, { replace: true });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleError(err);
    }

    setIsLoading(false);
  };

  const handleError = (error: AxiosError<HttpException>) => {
    switch (error?.response?.status) {
      case 401:
        showInfoNotification('Please login or create an account.');
        break;
      default:
        showErrorNotification(
          'Something went wrong. Please login and try again.'
        );
        break;
    }

    logout();
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {auth?.isLoggedIn ? (
        <Outlet></Outlet>
      ) : (
        <Navigate to="/" state={{ from: location }} replace />
      )}
    </>
  );
};
