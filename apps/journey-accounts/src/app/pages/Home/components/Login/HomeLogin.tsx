import { FC, FormEvent, useState } from 'react';
import {
  Location,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { AxiosError } from 'axios';
import { HttpException } from '@nestjs/common';
import { Button, Icon, Message, MessageBody } from '@journey-monorepo/ui';
import { createUser, loginUser, useAuth, useUser } from '../../../../shared';

import styles from './HomeLogin.module.scss';

type LocationProps = {
  state: {
    from: Location;
  };
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomeLoginProps {}

export const HomeLogin: FC<HomeLoginProps> = (props: HomeLoginProps) => {
  const [authType, setAuthType] = useState<string>('login');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();
  const location = useLocation() as LocationProps;
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const { setUser } = useUser();

  const from = location.state?.from?.pathname || '/profile';
  const invalidForm = !email || !password;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setIsLoading(true);
    setError('');

    const data = {
      email,
      password,
    };

    try {
      let user;

      if (authType === 'login') {
        const response = await loginUser(data);
        user = response.user;
      } else {
        const response = await createUser(data);
        user = response.user;
      }

      if (searchParams.get('site') === 'journey') {
        window.location.href = `${process.env['NX_JOURNEY_UI_BASE_URL']}?user=${user.user_id}`;
      } else {
        setUser(user);
        login();
        navigate(from, { replace: true });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleError(err);
      setIsLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = (err: AxiosError<HttpException>) => {
    switch (err?.response?.status) {
      case 401:
        setError('Login failed. Please check your credentials.');
        break;
      case 409:
        setError('Account already exists. Please try logging in.');
        break;
      default:
        setError('Something went wrong. Please try again later.');
        break;
    }
  };

  const toggleAuth = () => {
    if (authType === 'login') {
      setAuthType('register');
    } else {
      setAuthType('login');
    }
  };

  return (
    <div className={styles['login-container']}>
      {error && (
        <div className={styles['login-error']} role="alert">
          <Message testId="error-message" color="danger">
            <MessageBody>
              <p>{error}</p>
            </MessageBody>
          </Message>
        </div>
      )}
      <form data-testid="login-form" onSubmit={(event) => handleSubmit(event)}>
        <div className="field">
          <div className="control has-icons-left">
            <input
              data-testid="email-field"
              className={`input ${error ? 'is-danger' : ''}`}
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              aria-required="true"
              onChange={(event) => setEmail(event.target.value)}
            />
            <span className="icon is-small is-left">
              <Icon type="solid" name="envelope" />
            </span>
          </div>
        </div>

        <div className="field has-addons">
          <div className="control has-icons-left is-expanded">
            <input
              data-testid="password-field"
              className={`input ${error ? 'is-danger' : ''}`}
              name="password"
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Password"
              aria-required="true"
              onChange={(event) => setPassword(event?.target.value)}
            />
            <span className="icon is-small is-left">
              <Icon type="solid" name="lock" />
            </span>
          </div>
          <div className="control">
            <Button
              clickHandler={() => setIsPasswordVisible(!isPasswordVisible)}
              label={isPasswordVisible ? 'Hide Password' : 'Show password'}
            >
              <Icon
                type="solid"
                name={!isPasswordVisible ? 'eye' : 'eye-slash'}
              />
            </Button>
          </div>
        </div>

        <div className={`field ${styles['button-group']}`}>
          <div className="control">
            <Button
              testId="submit-button"
              color={invalidForm ? 'light' : 'primary'}
              isDisabled={invalidForm || isLoading}
              isLoading={isLoading}
              shouldSubmit={true}
            >
              {authType === 'login' ? 'Login' : 'Register'}
            </Button>
          </div>
          <div className="control">
            <Button
              testId="toggle-auth"
              color="info"
              isDisabled={isLoading}
              clickHandler={() => toggleAuth()}
              description={
                authType === 'login'
                  ? 'Click to change to register new account'
                  : 'Click to change to log into account'
              }
            >
              {authType === 'login' ? 'New user' : 'Current user'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
