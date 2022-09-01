import { FC, FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { HttpException } from '@nestjs/common';
import { Button, Icon, Message, MessageBody } from '@journey-monorepo/ui';
import { createUser, useAuth, useQueryLink, useUser } from '../../../../shared';

import styles from './HomeRegistration.module.scss';

type LocationProps = {
  state: {
    from: Location;
  };
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomeRegistrationProps {}

export const HomeRegistration: FC<HomeRegistrationProps> = (
  props: HomeRegistrationProps
) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();
  const location = useLocation() as LocationProps;
  const { login } = useAuth();
  const { setUser } = useUser();
  const { getQueryParam, getQueryString } = useQueryLink();

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
      const { user } = await createUser(data);

      if (getQueryParam('site') === 'journey') {
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
      case 409:
        setError('Invalid registration. Please try logging in.');
        break;
      default:
        setError('Something went wrong. Please try again later.');
        break;
    }
  };

  return (
    <div>
      <h2 className="subtitle">Sign up to start planning</h2>
      {error && (
        <div className="my-4" role="alert">
          <Message testId="error-message" color="danger">
            <MessageBody>
              <p>{error}</p>
            </MessageBody>
          </Message>
        </div>
      )}
      <form
        data-testid="register-form"
        onSubmit={(event) => handleSubmit(event)}
      >
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

        <div className="field">
          <div className="control">
            <Button
              testId="submit-button"
              color={invalidForm ? 'light' : 'primary'}
              isDisabled={invalidForm || isLoading}
              isLoading={isLoading}
              shouldSubmit={true}
              fullWidth={true}
            >
              Register
            </Button>
          </div>
        </div>
        <div className={`has-text-centered mt-4 pt-2 ${styles['login-link']}`}>
          <Link
            to={{
              pathname: '/login',
              search: getQueryString('site', 'journey'),
            }}
            aria-description="Click to navigate to login page."
          >
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};
