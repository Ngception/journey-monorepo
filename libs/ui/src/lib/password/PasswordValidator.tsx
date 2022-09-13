import { FC, useEffect, useState } from 'react';
import { Icon } from '../icon';
import {
  hasAtLeastOneLowerLetter,
  hasAtLeastOneNumber,
  hasAtLeastOneSpecialChar,
  hasAtLeastOneUpperLetter,
  containsSpaces,
  isSixCharsOrLonger,
  isMediumPassword,
  isStrongPassword,
  TEXT_COLORS,
} from '../constants';

import styles from './PasswordValidator.module.scss';

interface PasswordValidatorProps {
  password: string;
  onValidPasswordHandler: (v: boolean) => void;
}

const indicatorColor: Record<string, string> = {
  weak: 'is-danger',
  medium: 'is-warning',
  strong: 'is-success',
};

const indicatorValue: Record<string, number> = {
  weak: 1,
  medium: 50,
  strong: 100,
};

export const PasswordValidator: FC<PasswordValidatorProps> = (
  props: PasswordValidatorProps
) => {
  const [passwordStrength, setPasswordStrength] = useState<string>('weak');

  useEffect(() => {
    validatePassword();
  }, [props.password]);

  const validatePassword = () => {
    if (containsSpaces(props.password)) {
      props.onValidPasswordHandler(false);
      return false;
    }

    if (isStrongPassword(props.password)) {
      props.onValidPasswordHandler(true);
      setPasswordStrength('strong');
      return true;
    }

    if (isMediumPassword(props.password)) {
      props.onValidPasswordHandler(true);
      setPasswordStrength('medium');
      return true;
    }

    props.onValidPasswordHandler(false);
    setPasswordStrength('weak');
    return false;
  };

  const renderIndicatorText = () => {
    switch (passwordStrength) {
      case 'weak':
        return (
          <p data-testid="weak-pw-indicator" className="has-text-danger">
            Weak password
          </p>
        );
      case 'medium':
        return (
          <p data-testid="medium-pw-indicator" className="has-text-warning">
            Medium password
          </p>
        );
      case 'strong':
        return (
          <p data-testid="strong-pw-indicator" className="has-text-success">
            Strong password
          </p>
        );
      default:
        return;
    }
  };

  const setIconColor = (isValid: boolean) => {
    if (isValid) {
      return TEXT_COLORS['success'];
    }

    return TEXT_COLORS['dark'];
  };

  return (
    <div>
      <div aria-live="polite">{renderIndicatorText()}</div>
      <progress
        data-testid="pw-strength-bar"
        className={`progress ${indicatorColor[passwordStrength]} ${styles['progress']}`}
        value={indicatorValue[passwordStrength]}
        max="100"
      >
        {indicatorValue[passwordStrength]}%
      </progress>

      <div
        data-testid="pw-criteria-text"
        className={styles['pw-criteria-text']}
      >
        <div className="is-flex is-justify-content-space-between">
          <p>Contains at least 1 lowercase letter</p>
          <span
            className={setIconColor(hasAtLeastOneLowerLetter(props.password))}
          >
            <Icon type="solid" name="circle-check" />
          </span>
        </div>
        <div className="is-flex is-justify-content-space-between">
          <p>Contains at least 1 uppercase letter</p>
          <span
            className={setIconColor(hasAtLeastOneUpperLetter(props.password))}
          >
            <Icon type="solid" name="circle-check" />
          </span>
        </div>
        <div className="is-flex is-justify-content-space-between">
          <p>Contains at least 1 number</p>
          <span className={setIconColor(hasAtLeastOneNumber(props.password))}>
            <Icon type="solid" name="circle-check" />
          </span>
        </div>
        <div className="is-flex is-justify-content-space-between">
          <p>Contains at least 1 special character</p>
          <span
            className={setIconColor(hasAtLeastOneSpecialChar(props.password))}
          >
            <Icon type="solid" name="circle-check" />
          </span>
        </div>
        <div className="is-flex is-justify-content-space-between">
          <p>Contains no spaces</p>
          <span
            className={
              props.password.length && !containsSpaces(props.password)
                ? 'has-text-success'
                : 'has-text-dark'
            }
          >
            <Icon type="solid" name="circle-check" />
          </span>
        </div>
        <div className="is-flex is-justify-content-space-between">
          <p>Is at least six characters or longer</p>
          <span className={setIconColor(isSixCharsOrLonger(props.password))}>
            <Icon type="solid" name="circle-check" />
          </span>
        </div>
      </div>
    </div>
  );
};
