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
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);
  const dropdownItemsRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    dropdownItemsRef.current = [];

    document.addEventListener('mousedown', setClickedOutsideDropdownListener);

    return () =>
      document.removeEventListener(
        'mousedown',
        setClickedOutsideDropdownListener
      );
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setClickedOutsideDropdownListener = (event: any) => {
    event.preventDefault();

    const clickedInsideDropdown =
      dropdownItemsRef.current?.includes(event.target) ||
      dropdownTriggerRef.current?.contains(event.target);

    if (clickedInsideDropdown) {
      return;
    }

    setIsDropdownVisible(false);
  };

  const addDropdownItemRef = (element: HTMLAnchorElement) => {
    if (element && !dropdownItemsRef.current.includes(element)) {
      dropdownItemsRef.current.push(element);
    }
  };

  const attachTogglerToLastItem = (index: number) => {
    const lastItem = props.items.length - 1;

    if (index === lastItem) {
      return setIsDropdownVisible;
    }

    return undefined;
  };

  return (
    <div className="dropdown is-active" data-testid="dropdown">
      <DropdownTrigger
        text={props.text}
        icon={props.icon}
        clickHandler={() => setIsDropdownVisible(!isDropdownVisible)}
        dropdownTriggerRef={dropdownTriggerRef}
        dropdownToggler={setIsDropdownVisible}
        dropdownLabel={props.label}
      />
      {isDropdownVisible && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {props.items.map((item, idx) => (
              <DropdownItem
                item={item}
                addDropdownItemRef={addDropdownItemRef}
                key={item.label}
                dropdownToggler={attachTogglerToLastItem(idx)}
                dropdownLabel={props.label}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
