import { FC, MouseEvent, RefObject, useRef, useState } from 'react';
import { Dropdown, Icon } from '@journey-monorepo/ui';
import { ITask } from '@journey-monorepo/util';
import { UpdateTaskAction } from './UpdateTask/UpdateTaskAction';
import { DeleteTaskAction } from './DeleteTask/DeleteTaskAction';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TaskListItemActionsProps {
  task: ITask;
}

export const TaskListItemActions: FC<TaskListItemActionsProps> = (
  props: TaskListItemActionsProps
) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dropdownRef: RefObject<any> = useRef(null);

  const dropdownClasses = `dropdown is-right ${
    isDropdownOpen ? 'is-active' : undefined
  }`;

  const openDropdown = (event: MouseEvent) => {
    event.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={dropdownClasses}>
      <div className="dropdown-trigger">
        <button
          ref={dropdownRef}
          className="button"
          type="button"
          aria-haspopup="true"
          aria-controls="main-dropdown"
          onClick={(event) => openDropdown(event)}
        >
          <Icon type="solid" name="ellipsis-vertical" />
        </button>
      </div>
      <div className="dropdown-menu" id="main-dropdown" role="menu">
        <div className="dropdown-content">
          <UpdateTaskAction
            task={props.task}
            dropdownToggler={setIsDropdownOpen}
          />
        </div>
        <div className="dropdown-content">
          <DeleteTaskAction
            task={props.task}
            dropdownToggler={setIsDropdownOpen}
          />
        </div>
      </div>
    </div>
  );
};
