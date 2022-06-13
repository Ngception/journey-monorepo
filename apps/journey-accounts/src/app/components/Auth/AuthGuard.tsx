import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContextType } from '../../shared';
import { useAuth } from '../../shared/hooks/useAuth';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AuthGuardProps {}

export const AuthGuard: FC<AuthGuardProps> = (props: AuthGuardProps) => {
  const { state: auth } = useAuth() as AuthContextType;
  const location = useLocation();

  return auth?.isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
