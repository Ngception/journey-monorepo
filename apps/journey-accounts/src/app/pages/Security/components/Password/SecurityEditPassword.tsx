import { FC, useRef, useState } from 'react';
import {
  Button,
  Dialog,
  FormControl,
  FormField,
  FormInput,
  FormLabel,
  Icon,
  PasswordValidator,
  TooltipButton,
  useNotification,
} from '@journey-monorepo/ui';
import {
  logoutUser,
  updateUser,
  useError,
  useLogout,
  useUser,
} from '../../../../shared';

import styles from './SecurityEditPassword.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SecurityEditPasswordProps {}

export const SecurityEditPassword: FC<SecurityEditPasswordProps> = (
  props: SecurityEditPasswordProps
) => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const changePasswordTrigger = useRef<HTMLButtonElement>(null);

  const { state: user } = useUser();
  const handleLogout = useLogout();
  const { showSuccessNotification } = useNotification();
  const handleError = useError();

  const openDialog = () => {
    if (!isPasswordValid) {
      return;
    }

    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!isPasswordValid) {
      return;
    }

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
      setIsLoading(false);
    }
  };

  const confirmationDialogProps = {
    title: 'Confirm password change',
    trigger: changePasswordTrigger,
    showWarning: true,
    confirmButtonColor: 'primary',
    confirmHandler: handleSubmit,
    cancelHandler: () => setIsDialogOpen(false),
    isDialogOpen,
    isLoading,
  };

  return (
    <div>
      <h2 className="subtitle">Change your password</h2>
      <FormLabel controlId="new-pw">
        New Password <sup className="has-text-danger">*</sup>
      </FormLabel>

      <FormField hasAddons={true}>
        <FormControl isExpanded={true}>
          <FormInput
            testId="new-password-field"
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Enter new password"
            id="new-pw"
            name="new"
            required={true}
            changeHandler={(event) => setNewPassword(event.target.value)}
          />
        </FormControl>
        <FormControl>
          <TooltipButton
            label={
              isPasswordVisible ? 'Hide new password' : 'Show new password'
            }
            tooltip={
              isPasswordVisible ? 'Hide new password' : 'Show new password'
            }
            tooltipColor="dark"
            tooltipPosition="top-center"
            clickHandler={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Icon
              type="solid"
              name={!isPasswordVisible ? 'eye' : 'eye-slash'}
            />
          </TooltipButton>
        </FormControl>
      </FormField>

      <PasswordValidator
        password={newPassword}
        onValidPasswordHandler={setIsPasswordValid}
      />
      <FormField>
        <FormControl>
          <div className={styles['save-button']}>
            <Button
              triggerRef={changePasswordTrigger}
              testId="open-confirm-dialog-button"
              color="primary"
              isDisabled={!isPasswordValid || isLoading}
              isLoading={isLoading}
              clickHandler={openDialog}
            >
              <span>Save changes</span>
            </Button>
            <Dialog type="confirmation" dialogProps={confirmationDialogProps}>
              <div
                data-testid="confirm-change-password-dialog"
                className="is-flex is-justify-content-space-between"
              >
                <span className={styles['notification-icon']}>
                  <Icon type="solid" name="triangle-exclamation" />
                </span>
                <p>
                  You are about to change your password. Once confirmed, you
                  will be logged out and will need to log back in with your new
                  password.
                </p>
              </div>
            </Dialog>
          </div>
        </FormControl>
      </FormField>
    </div>
  );
};
