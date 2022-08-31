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

import styles from './TaskList.module.scss';
import { DeleteAllTasks } from '../DeleteAllTasks/DeleteAllTasks';

interface TaskListProps {
  list: ITaskList;
  listSetter: Dispatch<React.SetStateAction<ITaskList>>;
}

const taskListHeaderClasses = `${styles['task-list-header']}`;
const taskListCountClasses = `tag is-primary is-medium ${styles['task-list-count']}`;

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

  return (
    <>
      <div className={styles['task-list-header']}>
        <h2 className={taskListHeaderClasses}>
          <span className={taskListCountClasses}>
            {props.list.items.length}
          </span>
          {props.list.title}
        </h2>
        <div className={styles['task-list-header-buttons']}>
          <AddTask
            title={props.list.title}
            fetchTasks={task.fetchTasksHandler}
          />
          <DeleteAllTasks
            title={props.list.title}
            fetchTasks={task.fetchTasksHandler}
            tasks={props.list.items}
          />
          <Dropdown
            label="Task list sort options"
            icon="sort"
            items={sortOptions}
            triggerColor="white"
            testId="sort-dropdown"
            isDisabled={props.list.items.length <= 1}
          />
        </div>
      </div>
      <div className={styles['task-list-item-droppable']}>
        <Animate>
          <TaskDragDropDroppable droppableId={props.list.title}>
            {props.list.items.length ? (
              props.list.items.map((i, idx) => (
                <AnimateMotion options={setFadeOptions(idx)} key={i.task_id}>
                  <div className={styles['task-list-item-wrapper']}>
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
