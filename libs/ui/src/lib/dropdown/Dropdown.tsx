import { FC, useEffect, useRef, useState } from 'react';
import { DropdownItem, DropdownTrigger } from './components';
import { setFadeOptions } from '../constants';
import { Animate, AnimateMotion } from '../animate';

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
  triggerColor?: string;
  testId?: string;
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
      className="dropdown is-right is-active"
      data-testid={props?.testId || 'dropdown'}
      ref={dropdownRef}
    >
      <DropdownTrigger
        text={props.text}
        icon={props.icon}
        color={props.triggerColor}
        clickHandler={() => setIsDropdownVisible(!isDropdownVisible)}
        dropdownToggler={setIsDropdownVisible}
        dropdownLabel={props.label}
      />
      <Animate>
        {isDropdownVisible && (
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <AnimateMotion options={setFadeOptions('dropdown', 0.1)}>
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
            </AnimateMotion>
          </div>
        )}
      </Animate>
    </div>
  );
};
