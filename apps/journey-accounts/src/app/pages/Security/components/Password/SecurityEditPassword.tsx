import { Icon } from '@journey-monorepo/ui';
import { FC, useState } from 'react';

import styles from './SecurityEditPassword.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SecurityEditPasswordProps {}

export const SecurityEditPassword: FC<SecurityEditPasswordProps> = (
  props: SecurityEditPasswordProps
) => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [currentPasswordVisibility, setCurrentPasswordVisibility] =
    useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordVisibility, setNewPasswordVisibility] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const invalidForm = !currentPassword || !newPassword;
  const setSubmitButtonClasses = `button ${styles['form-button']} ${
    invalidForm ? 'is-light' : 'is-link'
  } ${isLoading ? 'is-loading' : undefined}`;

  const toggleVisibility = (field: string) => {
    switch (field) {
      case 'currentPassword':
        return setCurrentPasswordVisibility(!currentPasswordVisibility);
      case 'newPassword':
        return setNewPasswordVisibility(!newPasswordVisibility);
      default:
        return;
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div>
      <h2 className="subtitle">Change your password</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <fieldset>
          <label className="label" htmlFor="current-pw">
            Current Password <sup className="has-text-danger">*</sup>
          </label>
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                className="input"
                type={currentPasswordVisibility ? 'text' : 'password'}
                placeholder="Enter current password"
                id="current-pw"
                name="current"
                aria-required="true"
                onChange={(event) => setCurrentPassword(event.target.value)}
              />
            </div>
            <div className="control">
              <button
                className="button"
                type="button"
                aria-label={
                  currentPasswordVisibility
                    ? 'Hide current password'
                    : 'Show current password'
                }
                onClick={() => toggleVisibility('currentPassword')}
              >
                <Icon
                  type="solid"
                  name={!currentPasswordVisibility ? 'eye' : 'eye-slash'}
                />
              </button>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <label className="label" htmlFor="new-pw">
            New Password <sup className="has-text-danger">*</sup>
          </label>
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
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
              <button
                className="button"
                type="button"
                aria-label={
                  newPasswordVisibility
                    ? 'Hide new password'
                    : 'Show new password'
                }
                onClick={() => toggleVisibility('newPassword')}
              >
                <Icon
                  type="solid"
                  name={!newPasswordVisibility ? 'eye' : 'eye-slash'}
                />
              </button>
            </div>
          </div>
        </fieldset>

        <div className="field">
          <div className="control">
            <button
              data-testid="submit-button"
              disabled={invalidForm || isLoading}
              type="submit"
              className={setSubmitButtonClasses}
            >
              Save changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
