import { Loader } from '@journey-monorepo/ui';
import { FC, useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { verifyAuthStatus } from '../../shared';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomeAuthGuardProps {}

export const HomeAuthGuard: FC<HomeAuthGuardProps> = (
  props: HomeAuthGuardProps
) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const effectCalled = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (effectCalled.current) {
      return;
    } else {
      effectCalled.current = true;
      verifyUserAuthStatus();
    }
  }, []);

  const verifyUserAuthStatus = async () => {
    try {
      const response = await verifyAuthStatus();

      if (response.user) {
        navigate('/profile', { replace: true });
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      return;
    }
  };

  return <div>{isLoading ? <Loader /> : <Outlet></Outlet>}</div>;
};
