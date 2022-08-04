import { FC, FormEvent, useState } from 'react';
import {
  Location,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { Button, Icon } from '@journey-monorepo/ui';
import {
  createUser,
  handleError,
  loginUser,
  useAuth,
  useUser,
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
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const { setUser } = useUser();

  const from = location.state?.from?.pathname || '/profile';
  const invalidForm = !email || !password;
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
        const { message, user } = await loginUser(data);
        if (message === 'success') {
          if (searchParams.get('site') === 'journey') {
            window.location.href = `${process.env['NX_JOURNEY_UI_BASE_URL']}?user=${user.user_id}`;
          } else {
            setUser(user);
            navigateToAccount();
          }
        } else {
          return;
        }
      }

      if (authType === 'register') {
        const { message, user } = await createUser(data);
        if (message === 'success') {
          if (searchParams.get('site') === 'journey') {
            window.location.href = `${process.env['NX_JOURNEY_UI_BASE_URL']}?user=${user.user_id}`;
          } else {
            setUser(user);
            navigateToAccount();
          }
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
        </fieldset>
        <fieldset>
          <div className={buttonGroupClasses}>
            <div className="control">
              <Button
                testId="submit-button"
                color={invalidForm ? 'light' : 'primary'}
                isDisabled={invalidForm || isLoading}
                isLoading={isLoading}
                shouldSubmit={true}
              >
                <span>{authType === 'login' ? 'Login' : 'Register'}</span>
              </Button>
            </div>
            <div className="control">
              <Button
                testId="toggle-auth"
                color="link"
                isDisabled={isLoading}
                clickHandler={() => toggleAuth()}
              >
                <span>
                  {authType === 'login' ? 'New user?' : 'Have an account?'}
                </span>
              </Button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
