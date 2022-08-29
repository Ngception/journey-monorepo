import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FC } from 'react';
import { COLORS } from '../../../constants';
import { Icon } from '../../../icon';

interface DropdownTriggerProps {
  text?: string;
  icon?: string;
  clickHandler: () => void;
  dropdownToggler: (isDropdownVisible: boolean) => void;
  dropdownLabel: string;
  color?: string;
  isDisabled?: boolean;
}

export const DropdownTrigger: FC<DropdownTriggerProps> = (
  props: DropdownTriggerProps
) => {
  const autoCloseDropdown = (event: any) => {
    if (event.shiftKey && event.key === 'Tab') {
      props.dropdownToggler(false);
    }

    return;
  };

  const buttonColor = props.color ? COLORS[props.color] : 'is-primary';

  return (
    <div className="dropdown-trigger">
      <button
        data-testid="dropdown-trigger"
        className={`button ${buttonColor}`}
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        aria-description={!props.text ? props.dropdownLabel : undefined}
        onClick={props.clickHandler}
        onKeyDown={autoCloseDropdown}
        disabled={props.isDisabled}
      >
        {props.text && (
          <span data-testid="dropdown-trigger-text">{props.text}</span>
        )}
        {props.icon && (
          <span data-testid="dropdown-trigger-icon" className="icon is-small">
            <Icon type="solid" name={props.icon as IconName} />
          </span>
        )}
      </button>
    </div>
  );
};
