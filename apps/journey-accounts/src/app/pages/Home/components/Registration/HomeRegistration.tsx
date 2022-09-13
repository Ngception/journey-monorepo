/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import validator from 'validator';
import { HttpException } from '@nestjs/common';
import {
  AnimateMotion,
  Button,
  Card,
  CardContent,
  Form,
  FormControl,
  FormField,
  FormFieldError,
  FormFieldset,
  FormIcon,
  FormInput,
  Icon,
  Message,
  MessageBody,
  PasswordValidator,
  setFadeOptions,
  TooltipButton,
} from '@journey-monorepo/ui';
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
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
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

    if (!validator.isEmail(email)) {
      setEmailError('Please enter valid email');
      errors++;
    }

    if (!isPasswordValid) {
      setPasswordError('Please check password');
      errors++;
    }

    if (errors > 0) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setEmailError('');
    setPasswordError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    const data = {
      email: email.toLowerCase(),
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
    } catch (err: any) {
      handleError(err);
      setIsLoading(false);
    }
  };

  const handleError = (err: AxiosError<HttpException>) => {
    switch (err?.response?.status) {
      case 409:
        setError(
          'Invalid registration. Please check your registration credentials.'
        );
        break;
      default:
        setError('Something went wrong. Please try again later.');
        break;
    }
  };

  return (
    <AnimateMotion options={setFadeOptions('registration', 0.5)}>
      <Card>
        <CardContent>
          <div className="px-5 py-5">
            <h2 className="subtitle is-4 has-text-centered">
              Sign up to start planning
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

            <Form
              testId="register-form"
              submitHandler={(event) => handleSubmit(event)}
            >
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
                  <FormFieldError
                    testId="email-errror"
                    id="email-error"
                    isErrorActive={!!emailError}
                  >
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
                          setPassword(event.target.value)
                        }
                      />
                      <FormIcon size="small" position="left">
                        <Icon type="solid" name="lock" />
                      </FormIcon>

                      {passwordError && (
                        <FormIcon size="small" position="right" color="danger">
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
                    data-testid="password-error"
                    id="password-error"
                    isErrorActive={!!passwordError}
                  >
                    {passwordError}
                  </FormFieldError>
                </FormField>

                <div className="my-3">
                  <PasswordValidator
                    password={password}
                    onValidPasswordHandler={setIsPasswordValid}
                  />
                </div>

                <FormField>
                  <FormControl>
                    <Button
                      testId="submit-button"
                      color="primary"
                      isDisabled={
                        !validator.isEmail(email) ||
                        !isPasswordValid ||
                        isLoading
                      }
                      isLoading={isLoading}
                      shouldSubmit={true}
                      fullWidth={true}
                    >
                      Register
                    </Button>
                  </FormControl>
                </FormField>
              </FormFieldset>
              <div
                className={`has-text-centered mt-4 pt-2 ${styles['login-link']}`}
              >
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
            </Form>
          </div>
        </CardContent>
      </Card>
    </AnimateMotion>
  );
};
