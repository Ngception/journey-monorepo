import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { HttpException } from '@nestjs/common';
import {
  useError as UiLibUseError,
  useNotification,
} from '@journey-monorepo/ui';
import { useAuth } from './useAuth';
import { useUser } from './useUser';

export const useError = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { showInfoNotification } = useNotification();
  const { clearUser } = useUser();
  const { showGeneralError } = UiLibUseError();

  const handleError = (error: AxiosError<HttpException>) => {
    switch (error?.response?.status) {
      case 401:
        logout();
        clearUser();
        showInfoNotification('Please login again.');
        navigate('/', { replace: false });
        break;
      default:
        showGeneralError();
        break;
    }
  };

  return handleError;
};
