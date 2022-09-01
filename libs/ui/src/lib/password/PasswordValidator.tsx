import { FC, useEffect, useState } from 'react';
import { Icon } from '@journey-monorepo/ui';

import styles from './PasswordValidator.module.scss';

interface PasswordValidatorProps {
  password: string;
  onValidPasswordHandler: (v: boolean) => void;
}

const strongRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
);
const mediumRegex = new RegExp(
  '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
);
const atLeastOneLowerLetter = new RegExp('(?=.*[a-z])');
const atleastOneUpperLetter = new RegExp('(?=.*[A-Z])');
const atLeastOneNumber = new RegExp('(?=.*[0-9])');
const atLeastOneSpecialChar = new RegExp('(?=.*[!@#$%^&*])');
const isSixCharsOrLonger = new RegExp('(?=.{6,})');

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
    if (strongRegex.test(props.password)) {
      props.onValidPasswordHandler(true);
      setPasswordStrength('strong');
      return true;
    }

    if (mediumRegex.test(props.password)) {
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

  const setIconColor = (regex: RegExp) => {
    if (regex.test(props.password)) {
      return 'has-text-success';
    }

    return '';
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
          <span className={setIconColor(atLeastOneLowerLetter)}>
            <Icon type="solid" name="circle-check" />
          </span>
        </div>
        <div className="is-flex is-justify-content-space-between">
          <p>Contains at least 1 uppercase letter</p>
          <span className={setIconColor(atleastOneUpperLetter)}>
            <Icon type="solid" name="circle-check" />
          </span>
        </div>
        <div className="is-flex is-justify-content-space-between">
          <p>Contains at least 1 number</p>
          <span className={setIconColor(atLeastOneNumber)}>
            <Icon type="solid" name="circle-check" />
          </span>
        </div>
        <div className="is-flex is-justify-content-space-between">
          <p>Contains at least 1 special character</p>
          <span className={setIconColor(atLeastOneSpecialChar)}>
            <Icon type="solid" name="circle-check" />
          </span>
        </div>
        <div className="is-flex is-justify-content-space-between">
          <p>Is at least six characters or longer</p>
          <span className={setIconColor(isSixCharsOrLonger)}>
            <Icon type="solid" name="circle-check" />
          </span>
        </div>
      </div>
    </div>
  );
};
