import { FC, FormEvent, useState } from 'react';
import { Location, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@journey-monorepo/ui';
import {
  createUser,
  handleError,
  loginUser,
  useAuth,
} from '../../../../shared';
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

  const navigate = useNavigate();
  const location = useLocation() as LocationProps;
  const { login } = useAuth();

  const from = location.state?.from?.pathname || '/profile';
  const invalidForm = !email || !password;
  const submitButtonClasses = `button ${isLoading ? 'is-loading' : undefined} ${
    invalidForm ? 'is-light' : 'is-primary'
  }`;
  const buttonGroupClasses = `field ${styles['button-group']}`;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    const data = {
      email,
      password,
    };

    try {
      const navigateToAccount = () => {
        login();
        navigate(from, { replace: true });
      };

      if (authType === 'login') {
        // login handler
        const { message } = await loginUser(data);
        if (message === 'success') {
          navigateToAccount();
        } else {
          return;
        }
      }

      if (authType === 'register') {
        const { message } = await createUser(data);
        if (message === 'success') {
          navigateToAccount();
        } else {
          return;
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(handleError(err));
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const toggleAuth = () => {
    if (authType === 'login') {
      setAuthType('register');
    } else {
      setAuthType('login');
    }
  };

  return (
    <div>
      <form data-testid="login-form" onSubmit={(event) => handleSubmit(event)}>
        <fieldset>
          <div className="field">
            <div className="control has-icons-left">
              <input
                data-testid="email-field"
                className="input"
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
        </fieldset>
        <fieldset>
          <div className="field has-addons">
            <div className="control has-icons-left is-expanded">
              <input
                data-testid="password-field"
                className="input"
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
              <button
                className="button"
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                aria-label={
                  isPasswordVisible ? 'Hide Password' : 'Show password'
                }
              >
                <Icon
                  type="solid"
                  name={!isPasswordVisible ? 'eye' : 'eye-slash'}
                />
              </button>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <div className={buttonGroupClasses}>
            <div className="control">
              <button
                data-testid="submit-button"
                disabled={invalidForm || isLoading}
                type="submit"
                className={submitButtonClasses}
              >
                {authType === 'login' ? 'Login' : 'Register'}
              </button>
            </div>
            <div className="control">
              <button
                data-testid="toggle-auth"
                className="button is-link"
                type="button"
                disabled={isLoading}
                onClick={() => toggleAuth()}
              >
                {authType === 'login' ? 'New user?' : 'Have an account?'}
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
