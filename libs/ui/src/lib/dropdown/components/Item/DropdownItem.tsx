import { FC } from 'react';
import { IDropdownItem } from '../../Dropdown';

interface DropdownItemProps {
  item: IDropdownItem;
  addDropdownItemRef: (element: HTMLAnchorElement) => void;
  dropdownToggler?: (isDropdownVisible: boolean) => void;
  dropdownLabel: string;
}

export const DropdownItem: FC<DropdownItemProps> = (
  props: DropdownItemProps
) => {
  const { label, clickHandler } = props.item;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (event: any) => {
    event.preventDefault();

    clickHandler();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const autoCloseDropdown = (event: any) => {
    if (event.key === 'Tab') {
      props.dropdownToggler?.(false);
    }

    return;
  };

  return (
    <a
      data-testid="dropdown-item"
      href="#"
      className="dropdown-item"
      onClick={handleClick}
      key={label}
      ref={props.addDropdownItemRef}
      onKeyDown={props.dropdownToggler ? autoCloseDropdown : undefined}
      aria-description={props.dropdownLabel}
    >
      {label}
    </a>
  );
};
