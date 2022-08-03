import { FC, useEffect, useRef, useState } from 'react';
import { DropdownItem, DropdownTrigger } from './components';

export interface IDropdownItem {
  label: string;
  clickHandler: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DropdownProps {
  label: string;
  items: IDropdownItem[];
  text?: string;
  icon?: string;
}

export const Dropdown: FC<DropdownProps> = (props: DropdownProps) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener('mousedown', setClickedOutsideDropdownListener);
    }

    return () =>
      document.removeEventListener(
        'mousedown',
        setClickedOutsideDropdownListener
      );
  }, [isDropdownVisible]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setClickedOutsideDropdownListener = (event: any) => {
    if (!dropdownRef.current?.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  return (
    <div
      className="dropdown is-active"
      data-testid="dropdown"
      ref={dropdownRef}
    >
      <DropdownTrigger
        text={props.text}
        icon={props.icon}
        clickHandler={() => setIsDropdownVisible(!isDropdownVisible)}
        dropdownToggler={setIsDropdownVisible}
        dropdownLabel={props.label}
      />
      {isDropdownVisible && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {props.items.map((item, idx) => (
              <DropdownItem
                item={item}
                key={item.label}
                dropdownToggler={setIsDropdownVisible}
                dropdownLabel={props.label}
                isLastItem={idx === props.items.length - 1 || undefined}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
