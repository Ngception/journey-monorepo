import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { useUser } from './useUser';

export const useLogout = () => {
  const { clearUser } = useUser();
  const { logout } = useAuth();
  const navigate = useNavigate();

  return () => {
    clearUser();
    logout();
    navigate('/', { replace: true });
  };
};
