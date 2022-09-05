import { FC, useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Loader } from '@journey-monorepo/ui';
import { verifyAuthStatus } from '../../shared/handlers';
import { useUser } from '../../shared/hooks';
import { useAuth } from '../../shared/hooks/useAuth';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AuthGuardProps {}

export const AuthGuard: FC<AuthGuardProps> = (props: AuthGuardProps) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const { state: auth, login } = useAuth();
  const { setUser } = useUser();
  const effectCalled = useRef(false);
  const navigate = useNavigate();

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
      return;
    }

    try {
      const response = await verifyAuthStatus();

      login();
      setUser(response?.user);
      setLoading(false);
      navigate('/profile', { replace: true });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      window.location.href = `${process.env['NX_ACCOUNTS_UI_BASE_URL']}/login?site=journey`;
    }
  };

  return isLoading ? <Loader /> : <>{auth?.isLoggedIn && <Outlet></Outlet>}</>;
};
