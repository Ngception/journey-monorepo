import { FC, useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { verifyAuthStatus } from '../../shared';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomeAuthGuardProps {}

export const HomeAuthGuard: FC<HomeAuthGuardProps> = (
  props: HomeAuthGuardProps
) => {
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
    } catch (err) {
      return;
    }
  };

  return <Outlet></Outlet>;
};
