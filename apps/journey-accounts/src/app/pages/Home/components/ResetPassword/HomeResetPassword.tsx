import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AnimateMotion,
  Button,
  Icon,
  Message,
  MessageBody,
  PasswordValidator,
  setFadeOptions,
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
  const effectCalled = useRef(false);

  const navigate = useNavigate();
  const { getQueryParam } = useQueryLink();
  const { showErrorNotification, showSuccessNotification } = useNotification();

  const invalidForm = !password || !getQueryParam('token');

  useEffect(() => {
    if (effectCalled.current) {
      return;
    }

    effectCalled.current = true;
    handleResetToken();
  }, []);

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

    if (invalidForm) {
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
      <div>
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
        <form onSubmit={(event) => handleSubmit(event)}>
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
          <div className="my-3">
            <PasswordValidator
              password={password}
              onValidPasswordHandler={setIsPasswordValid}
            />
          </div>
          <div className="field">
            <div className="control">
              <Button
                testId="submit-button"
                color={!isPasswordValid ? 'light' : 'primary'}
                isDisabled={invalidForm || isLoading}
                isLoading={isLoading}
                shouldSubmit={true}
                fullWidth={true}
              >
                Save Password
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AnimateMotion>
  );
};
