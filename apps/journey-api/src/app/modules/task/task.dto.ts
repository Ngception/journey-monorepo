export class CreateTaskDto {
  content: string;
  current_status: 'to do' | 'in progress' | 'done';
  user_id: string;
}

export class UpdateTaskDto {
  content: string;
  current_status: 'to do' | 'in progress' | 'done';
  position?: number;
}
