type Status = 'to do' | 'in progress' | 'done';

export interface ITaskList {
  title: string;
  items: ITask[];
}

export interface ITask {
  id: string;
  text: string;
  status: Status;
}
