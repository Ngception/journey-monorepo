type Status = 'to do' | 'in progress' | 'done';

export interface ITaskList {
  title: string;
  items: ITask[];
}

export interface ITask {
  task_id: string;
  content: string;
  current_status: Status;
  user_id: string;
  created_at: Date;
  updated_at: Date | null;
}
