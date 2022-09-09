import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AnimateMotion,
  Button,
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
  const [confirmation, setConfirmation] = useState<string>('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!email) {
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
      handleError(err);
    }

    setIsLoading(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = (err?: any) => {
    switch (err?.response?.status) {
      case 409:
        setError(
          'A reset email has already been requested for this email address.'
        );
        break;
      default:
        setError('Something went wrong. Please try again later.');
        break;
    }
  };

  return (
    <AnimateMotion options={setFadeOptions('request-pw-reset', 0.5)}>
      <div>
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
        <form onSubmit={handleSubmit}>
          <div className="field">
            <div className="control has-icons-left">
              <input
                data-testid="email-field"
                className="input"
                type="email"
                name="email"
                placeholder="Email"
                aria-required="true"
                onChange={(event) => setEmail(event?.target.value)}
              />
              <span className="icon is-small is-left">
                <Icon type="solid" name="envelope" />
              </span>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Button
                color={!email ? 'light' : 'primary'}
                isDisabled={!email || isLoading}
                isLoading={isLoading}
                fullWidth={true}
                shouldSubmit={true}
                testId="submit-button"
              >
                Reset Password
              </Button>
            </div>
          </div>
        </form>
        <div
          className={`has-text-centered mt-4 pt-4 ${styles['login-register-links']}`}
        >
          <span>
            <Link to="/login">Login</Link> or{' '}
            <Link to="/register">Register</Link>
          </span>
        </div>
      </div>
    </AnimateMotion>
  );
};
