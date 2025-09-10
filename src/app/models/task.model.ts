export interface Task {
  _id?: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  completed?: boolean;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface ApiResponse<T> {
  status: string;
  message?: string;
  data?: T;
  error?: string;
}
