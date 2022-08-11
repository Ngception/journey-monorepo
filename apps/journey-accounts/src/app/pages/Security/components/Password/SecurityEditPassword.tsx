import { FC, FormEvent, useRef, useState } from 'react';
import {
  Button,
  DialogContainer,
  Icon,
  useNotification,
} from '@journey-monorepo/ui';
import {
  logoutUser,
  updateUser,
  useAuth,
  useLogout,
  useUser,
} from '../../../../shared';

import styles from './SecurityEditPassword.module.scss';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { HttpException } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SecurityEditPasswordProps {}

export const SecurityEditPassword: FC<SecurityEditPasswordProps> = (
  props: SecurityEditPasswordProps
) => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordVisibility, setNewPasswordVisibility] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const changePasswordTrigger = useRef<HTMLButtonElement>(null);

  const { logout } = useAuth();
  const { state: user, clearUser } = useUser();
  const handleLogout = useLogout();
  const {
    showErrorNotification,
    showInfoNotification,
    showSuccessNotification,
  } = useNotification();
  const navigate = useNavigate();

  const toggleVisibility = () => {
    setNewPasswordVisibility(!newPasswordVisibility);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await updateUser({
        user_id: user.user_id,
        password: newPassword,
      });
      await logoutUser();

      showSuccessNotification('Password changed. Please login again.');
      handleLogout();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleError(err);
    }

    setIsLoading(false);
  };

  const handleError = (err: AxiosError<HttpException>) => {
    switch (err?.response?.status) {
      case 401:
        setIsDialogOpen(false);
        logout();
        clearUser();
        showInfoNotification('Session timeout. Please login again.');
        navigate('/', { replace: false });
        break;
      default:
        showErrorNotification('Something went wrong. Please try again later.');
        break;
    }
  };

  const confirmationDialogProps = {
    title: 'Confirm password change',
    trigger: changePasswordTrigger,
    showWarning: true,
    confirmButtonColor: 'primary',
    confirmHandler: (event: FormEvent) => handleSubmit(event),
    cancelHandler: () => setIsDialogOpen(false),
    isDialogOpen: isDialogOpen,
    isLoading,
  };

  return (
    <div>
      <h2 className="subtitle">Change your password</h2>
      <div>
        <label className="label" htmlFor="new-pw">
          New Password <sup className="has-text-danger">*</sup>
        </label>
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              data-testid="new-password-field"
              className="input"
              type={newPasswordVisibility ? 'text' : 'password'}
              placeholder="Enter new password"
              id="new-pw"
              name="new"
              aria-required="true"
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </div>
          <div className="control">
            <Button
              label={
                newPasswordVisibility
                  ? 'Hide new password'
                  : 'Show new password'
              }
              clickHandler={() => toggleVisibility()}
            >
              <Icon
                type="solid"
                name={!newPasswordVisibility ? 'eye' : 'eye-slash'}
              />
            </Button>
          </div>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <div className={styles['save-button']}>
            <Button
              triggerRef={changePasswordTrigger}
              testId="open-confirm-dialog-button"
              color={!newPassword ? 'light' : 'link'}
              isDisabled={!newPassword || isLoading}
              isLoading={isLoading}
              clickHandler={() => setIsDialogOpen(true)}
            >
              <span>Save changes</span>
            </Button>
            {isDialogOpen && (
              <DialogContainer
                type="confirmation"
                dialogProps={confirmationDialogProps}
              >
                <div
                  data-testid="confirm-change-password-dialog"
                  className="is-flex is-justify-content-space-between"
                >
                  <span className={styles['notification-icon']}>
                    <Icon type="solid" name="triangle-exclamation" />
                  </span>
                  <p>
                    You are about to change your password. Once confirmed, you
                    will be logged out and will need to log back in with your
                    new password.
                  </p>
                </div>
              </DialogContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
