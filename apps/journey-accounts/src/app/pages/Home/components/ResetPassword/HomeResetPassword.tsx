import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  useNotification,
} from '@journey-monorepo/ui';
import {
  resetUserPassword,
  useQueryLink,
  verifyResetToken,
} from '../../../../shared';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomeResetPasswordProps {}

export const HomeResetPassword: FC<HomeResetPasswordProps> = (
  props: HomeResetPasswordProps
) => {
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const effectCalled = useRef(false);

  const navigate = useNavigate();
  const { getQueryParam } = useQueryLink();
  const { showErrorNotification, showSuccessNotification } = useNotification();

  useEffect(() => {
    if (effectCalled.current) {
      return;
    }

    effectCalled.current = true;
    handleResetToken();
  }, []);

  const validateForm = (): boolean => {
    let errors = 0;

    if (!isPasswordValid) {
      setPasswordError('Please check password');
      errors++;
    }

    if (errors > 0) {
      return false;
    }

    return true;
  };

  const handleResetToken = async () => {
    const token = getQueryParam('token');

    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    try {
      const isValidToken = await verifyResetToken(token);

      if (!isValidToken) {
        showErrorNotification('Token has expired or is invalid.');
        navigate('/login', { replace: true });
      }
    } catch (err) {
      showErrorNotification('Token has expired or is invalid.');
      navigate('/login', { replace: true });
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const token = getQueryParam('token') as string;

      const { status } = await resetUserPassword(token, { password });

      if (status === 'OK') {
        navigate('/login', { replace: true });
        showSuccessNotification('Changes successfully saved.');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleError(err);
    }

    setIsLoading(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = (err?: any) => {
    switch (err?.response?.status) {
      case 401:
        navigate('/login', { replace: true });
        showErrorNotification('Token has expired or is invalid.');
        break;
      default:
        setError('Something went wrong. Please try again later.');
        break;
    }
  };

  return (
    <AnimateMotion options={setFadeOptions('reset-password', 0.5)}>
      <Card>
        <CardContent>
          <div className="px-5 py-5">
            <h2 className="subtitle is-4">New password</h2>
            <div aria-live="polite">
              {error && (
                <div className="my-4" role="alert">
                  <Message testId="error-message" color="danger">
                    <MessageBody>
                      <p>{error}</p>
                    </MessageBody>
                  </Message>
                </div>
              )}
            </div>
            <Form submitHandler={(event) => handleSubmit(event)}>
              <FormFieldset isDisabled={isLoading}>
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
                      isDisabled={!isPasswordValid || isLoading}
                      isLoading={isLoading}
                      shouldSubmit={true}
                      fullWidth={true}
                    >
                      Save Password
                    </Button>
                  </FormControl>
                </FormField>
              </FormFieldset>
            </Form>
          </div>
        </CardContent>
      </Card>
    </AnimateMotion>
  );
};
