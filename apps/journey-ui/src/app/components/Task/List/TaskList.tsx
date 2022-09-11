import { Dispatch, FC } from 'react';
import {
  Animate,
  AnimateMotion,
  Dropdown,
  setFadeOptions,
} from '@journey-monorepo/ui';
import { ITaskList } from '@journey-monorepo/util';
import { useTask } from '../../../shared';
import { AddTask } from '../AddTask/AddTask';
import { TaskDragDropDroppable } from '../DragDrop/components';
import { TaskListItem } from '../ListItem/TaskListItem';
import { DeleteAllTasks } from '../DeleteAllTasks/DeleteAllTasks';

import styles from './TaskList.module.scss';

interface TaskListProps {
  list: ITaskList;
  listSetter: Dispatch<React.SetStateAction<ITaskList>>;
}

export const TaskList: FC<TaskListProps> = (props: TaskListProps) => {
  const { state: task } = useTask();

  const sortOptions = [
    {
      label: 'Sort by newest created',
      clickHandler: () => sortList('date DESC'),
    },
    {
      label: 'Sort by oldest created',
      clickHandler: () => sortList('date ASC'),
    },
  ];

  const sortList = (option: string) => {
    let sortedList = [];

    switch (option) {
      case 'date ASC':
        sortedList = props.list.items.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );

        props.listSetter({
          title: props.list.title,
          items: sortedList,
        });

        break;
      case 'date DESC':
        sortedList = props.list.items.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        props.listSetter({
          title: props.list.title,
          items: sortedList,
        });
        break;
      default:
        break;
    }
  };

  const tooltipOptions = {
    tooltipColor: 'dark',
    tooltipPosition: 'top-center',
    tooltip: 'Sort options',
  };

  return (
    <>
      <div className="is-flex is-justify-content-space-between is-align-items-center">
        <h2>
          <span className="tag is-primary is-medium mr-2">
            {props.list.items.length}
          </span>
          {props.list.title}
        </h2>
        <div className="is-flex">
          <div className="mr-2">
            <AddTask
              title={props.list.title}
              fetchTasks={task.fetchTasksHandler}
            />
          </div>
          <div className="mr-2">
            <DeleteAllTasks
              title={props.list.title}
              fetchTasks={task.fetchTasksHandler}
              tasks={props.list.items}
            />
          </div>
          <Dropdown
            label="Task list sort options"
            icon="sort"
            items={sortOptions}
            triggerColor="white"
            testId="sort-dropdown"
            isDisabled={props.list.items.length <= 1}
            tooltipOptions={tooltipOptions}
          />
        </div>
      </div>
      <div className={styles['task-list-item-droppable']}>
        <Animate>
          <TaskDragDropDroppable droppableId={props.list.title}>
            {props.list.items.length ? (
              props.list.items.map((i, idx) => (
                <AnimateMotion options={setFadeOptions(idx)} key={i.task_id}>
                  <div className="px-2 py-2">
                    <TaskListItem item={i} index={idx} />
                  </div>
                </AnimateMotion>
              ))
            ) : (
              <div className={styles['placeholder']}></div>
            )}
          </TaskDragDropDroppable>
        </Animate>
      </div>
    </>
  );
};
