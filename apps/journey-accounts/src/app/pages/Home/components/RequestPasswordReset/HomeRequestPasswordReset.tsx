import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
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
  setFadeOptions,
} from '@journey-monorepo/ui';
import { requestUserPasswordReset } from '../../../../shared';

import styles from './HomeRequestPasswordReset.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomeRequestPasswordResetProps {}

export const HomeRequestPasswordReset = (
  props: HomeRequestPasswordResetProps
) => {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [confirmation, setConfirmation] = useState<string>('');

  const validateForm = (): boolean => {
    if (!email) {
      setEmailError('Please enter an email address');
      return false;
    }

    if (!validator.isEmail(email)) {
      setEmailError('Please check email address format');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setEmailError('');

    if (!validateForm()) {
      return;
    }

    setError('');
    setConfirmation('');

    setIsLoading(true);

    try {
      const { status } = await requestUserPasswordReset(email);

      if (status === 'OK') {
        setConfirmation(
          'A reset email will be sent to the specified email address if an account exists.'
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError('Something went wrong. Please try again later.');
    }

    setIsLoading(false);
  };

  return (
    <AnimateMotion options={setFadeOptions('request-pw-reset', 0.5)}>
      <Card>
        <CardContent>
          <div className="px-5 py-5">
            <h2 className="subtitle is-4">Reset Password</h2>
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
              {confirmation && (
                <div className="my-4" role="alert">
                  <Message testId="success-message" color="success">
                    <MessageBody>
                      <p>{confirmation}</p>
                    </MessageBody>
                  </Message>
                </div>
              )}
            </div>
            <p className="mb-4">
              Enter your email address to receive a link to reset your password.
            </p>
            <Form submitHandler={handleSubmit}>
              <FormFieldset isDisabled={isLoading}>
                <FormField>
                  <FormControl hasIconsLeft={true} hasIconsRight={true}>
                    <FormInput
                      testId="email-field"
                      type="email"
                      name="email"
                      placeholder="Email"
                      required={true}
                      isInvalid={emailError ? true : false}
                      errorMessageId="email-error"
                      changeHandler={(event) => setEmail(event?.target.value)}
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
                  <FormControl>
                    <Button
                      color="primary"
                      isDisabled={!email || isLoading}
                      isLoading={isLoading}
                      fullWidth={true}
                      shouldSubmit={true}
                      testId="submit-button"
                    >
                      Reset Password
                    </Button>
                  </FormControl>
                </FormField>
              </FormFieldset>
            </Form>
            <div
              className={`has-text-centered mt-4 pt-4 ${styles['login-register-links']}`}
            >
              <span>
                <Link to="/login">Login</Link> or{' '}
                <Link to="/register">Register</Link>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimateMotion>
  );
};
