import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FC, RefObject } from 'react';
import { Icon } from '../../../icon';

interface DropdownTriggerProps {
  text?: string;
  icon?: string;
  clickHandler: () => void;
  dropdownTriggerRef: RefObject<HTMLButtonElement>;
  dropdownToggler: (isDropdownVisible: boolean) => void;
  dropdownLabel: string;
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

  return (
    <div className="dropdown-trigger">
      <button
        data-testid="dropdown-trigger"
        className="button"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        aria-description={!props.text ? props.dropdownLabel : undefined}
        onClick={props.clickHandler}
        ref={props.dropdownTriggerRef}
        onKeyDown={autoCloseDropdown}
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
