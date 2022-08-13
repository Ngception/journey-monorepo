import { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useError } from '../../hook/useError';
import { GeneralError } from '../General/GeneralError';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ErrorOutletProps {}

export const ErrorOutlet: FC<ErrorOutletProps> = (props: ErrorOutletProps) => {
  const { state: error } = useError();
  const [errorStatus, setErrorStatus] = useState<number>(error.status);

  useEffect(() => {
    setErrorStatus(error.status);
  }, [error.status]);

  const renderError = () => {
    switch (errorStatus) {
      default:
        return <GeneralError />;
    }
  };

  return !error.status ? <Outlet></Outlet> : renderError();
};
