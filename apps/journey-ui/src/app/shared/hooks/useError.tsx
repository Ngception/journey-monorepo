import { AxiosError } from 'axios';
import { HttpException } from '@nestjs/common';
import { useError as UiLibUseError } from '@journey-monorepo/ui';

export const useError = () => {
  const { showGeneralError } = UiLibUseError();

  const handleError = (error: AxiosError<HttpException>) => {
    switch (error?.response?.status) {
      case 401:
        window.location.href = `${process.env['NX_ACCOUNTS_UI_BASE_URL']}/login?site=journey`;
        break;
      default:
        showGeneralError();
        break;
    }
  };

  return handleError;
};
