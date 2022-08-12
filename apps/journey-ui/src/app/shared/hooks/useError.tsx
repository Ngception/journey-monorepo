import { AxiosError } from 'axios';
import { HttpException } from '@nestjs/common';
import { useNotification } from '@journey-monorepo/ui';

export const useError = () => {
  const { showErrorNotification } = useNotification();

  const handleError = (error: AxiosError<HttpException>) => {
    switch (error?.response?.status) {
      case 401:
        window.location.href = `${process.env['NX_ACCOUNTS_UI_BASE_URL']}?site=journey`;
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
