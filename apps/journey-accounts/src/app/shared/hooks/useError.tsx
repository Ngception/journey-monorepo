import { AxiosError } from 'axios';
import { HttpException } from '@nestjs/common';
import { useNotification } from '@journey-monorepo/ui';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { useUser } from './useUser';

export const useError = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { showErrorNotification, showInfoNotification } = useNotification();
  const { clearUser } = useUser();

  const handleError = (error: AxiosError<HttpException>) => {
    switch (error?.response?.status) {
      case 401:
        logout();
        clearUser();
        showInfoNotification('Session timeout. Please login again.');
        navigate('/', { replace: false });
        break;
      default:
        showErrorNotification(
          'Something went wrong. Please try again or refresh the page.'
        );
        break;
    }
  };

  return handleError;
};
