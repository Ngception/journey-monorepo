import { FC, FormEvent, useState } from 'react';
import { Link, Location, useLocation, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import validator from 'validator';
import { HttpException } from '@nestjs/common';
import {
  AnimateMotion,
  Button,
  Card,
  CardContent,
  Icon,
  Message,
  MessageBody,
  setFadeOptions,
  TooltipButton,
  containsSpaces,
  Form,
  FormField,
  FormControl,
  FormInput,
  FormIcon,
  FormFieldError,
  FormFieldset,
} from '@journey-monorepo/ui';
import { loginUser, useAuth, useQueryLink, useUser } from '../../../../shared';

import styles from './HomeLogin.module.scss';

type LocationProps = {
  state: {
    from: Location;
  };
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomeLoginProps {}

export const HomeLogin: FC<HomeLoginProps> = (props: HomeLoginProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();
  const location = useLocation() as LocationProps;
  const { login } = useAuth();
  const { setUser } = useUser();
  const { getQueryParam, getQueryString } = useQueryLink();

  const from = location.state?.from?.pathname || '/profile';

  const validateForm = (): boolean => {
    let errors = 0;

    setEmailError('');
    setPasswordError('');

    if (!validator.isEmail(email)) {
      setEmailError('Please enter valid email');
      errors++;
    }

    if (!password || containsSpaces(password)) {
      setPasswordError('Please enter password');
      errors++;
    }

    if (errors > 0) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    const data = {
      email,
      password,
    };

    try {
      const { user } = await loginUser(data);

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
      case 401:
        setError('Login failed. Please check your credentials.');
        break;
      default:
        setError('Something went wrong. Please try again later.');
        break;
    }
  };

  return (
    <AnimateMotion options={setFadeOptions('login', 0.5)}>
      <Card>
        <CardContent>
          <div className="px-5 py-5">
            <h2 className="subtitle is-4 has-text-centered">
              Login to start planning
            </h2>
            {error && (
              <div className="my-4" role="alert">
                <Message testId="error-message" color="danger">
                  <MessageBody>
                    <p>{error}</p>
                  </MessageBody>
                </Message>
              </div>
            )}
            <Form testId="login-form" submitHandler={handleSubmit}>
              <FormFieldset isDisabled={isLoading}>
                <FormField>
                  <FormControl hasIconsLeft={true} hasIconsRight={true}>
                    <FormInput
                      testId="email-field"
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      required={true}
                      isInvalid={emailError ? true : false}
                      errorMessageId="email-error"
                      changeHandler={(event) =>
                        setEmail(event.target.value.toLowerCase())
                      }
                    />
                    <FormIcon size="small" position="left">
                      <Icon type="solid" name="envelope" />
                    </FormIcon>
                    {emailError && (
                      <FormIcon color="danger" size="small" position="right">
                        <Icon type="solid" name="exclamation-triangle" />
                      </FormIcon>
                    )}
                  </FormControl>
                  <FormFieldError id="email-error" isErrorActive={!!emailError}>
                    {emailError}
                  </FormFieldError>
                </FormField>

                <FormField>
                  <FormField hasAddons={true}>
                    <FormControl
                      hasIconsLeft={true}
                      hasIconsRight={true}
                      isExpanded={true}
                    >
                      <FormInput
                        testId="password-field"
                        name="password"
                        type={isPasswordVisible ? 'text' : 'password'}
                        placeholder="Password"
                        required={true}
                        isInvalid={passwordError ? true : false}
                        errorMessageId="password-error"
                        changeHandler={(event) =>
                          setPassword(event?.target.value)
                        }
                      />
                      <FormIcon size="small" position="left">
                        <Icon type="solid" name="lock" />
                      </FormIcon>

                      {passwordError && (
                        <FormIcon color="danger" size="small" position="right">
                          <Icon type="solid" name="exclamation-triangle" />
                        </FormIcon>
                      )}
                    </FormControl>

                    <FormControl>
                      <TooltipButton
                        clickHandler={() =>
                          setIsPasswordVisible(!isPasswordVisible)
                        }
                        label={
                          isPasswordVisible ? 'Hide Password' : 'Show password'
                        }
                        tooltip={
                          isPasswordVisible ? 'Hide Password' : 'Show password'
                        }
                        tooltipColor="dark"
                        tooltipPosition="top-center"
                      >
                        <Icon
                          type="solid"
                          name={!isPasswordVisible ? 'eye' : 'eye-slash'}
                        />
                      </TooltipButton>
                    </FormControl>
                  </FormField>
                  <FormFieldError
                    id="password-error"
                    isErrorActive={!!passwordError}
                  >
                    {passwordError}
                  </FormFieldError>
                </FormField>

                <FormField>
                  <FormControl>
                    <Button
                      testId="submit-button"
                      color="primary"
                      isDisabled={!email || !password || isLoading}
                      isLoading={isLoading}
                      shouldSubmit={true}
                      fullWidth={true}
                    >
                      Login
                    </Button>
                  </FormControl>
                </FormField>
              </FormFieldset>
              <div
                className={`is-flex is-justify-content-space-between mt-4 pt-4 ${styles['register-link']}`}
              >
                <Link
                  to={{
                    pathname: '/register',
                    search: getQueryString('site', 'journey'),
                  }}
                  aria-description="Click to navigate to registration page."
                >
                  Need a new account?
                </Link>
                <Link
                  to="forgot-password"
                  aria-description="Click to navigate to password reset page."
                >
                  Forgot password?
                </Link>
              </div>
            </Form>
          </div>
        </CardContent>
      </Card>
    </AnimateMotion>
  );
};
