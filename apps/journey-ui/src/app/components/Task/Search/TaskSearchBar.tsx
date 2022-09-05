import { ChangeEvent, FC, MouseEvent, useRef, useState } from 'react';
import { Button, Icon } from '@journey-monorepo/ui';
import { useTask } from '../../../shared';

import styles from './TaskSearchBar.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TaskSearchBarProps {}

export const TaskSearchBar: FC<TaskSearchBarProps> = (
  props: TaskSearchBarProps
) => {
  const [searchFilter, setSearchFilter] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { state: task, setTasksSearchFilter } = useTask();

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setSearchFilter(event.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearchKeyUp = (event: any) => {
    event.preventDefault();

    if (event.key === 'Enter') {
      setTasksSearchFilter(event.target.value);
    }
  };

  const handleResetSearchFilter = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setSearchFilter('');
    setTasksSearchFilter('');

    inputRef.current?.focus();
  };

  return (
    <div className="field has-addons">
      <div className={`control has-icons-right is-expanded`}>
        <input
          data-testid="task-search-filter-input"
          ref={inputRef}
          className="input"
          type="text"
          onChange={handleSearchInput}
          placeholder="Search tasks"
          value={searchFilter}
          onKeyUp={handleSearchKeyUp}
        />
        {task.tasksSearchFilter && (
          <button
            data-testid="reset-button"
            type="button"
            className={`icon is-white is-small is-right ${styles['clear-filter-input']}`}
            tabIndex={0}
            onClick={handleResetSearchFilter}
            aria-label="Clear search and reset tasks"
          >
            <Icon type="solid" name="xmark" />
          </button>
        )}
      </div>
      <div className="control">
        <Button
          testId="search-button"
          color="primary"
          clickHandler={() => setTasksSearchFilter(searchFilter)}
        >
          <p>Search</p>
        </Button>
      </div>
    </div>
  );
};
