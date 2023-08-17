export type Task = {
  id: string
  name: string | null
  description: string | null
  status: TaskStatuses
  created_at?: string
  updated_at?: string
}

export interface TaskForm {
  name: string
  description: string
  status: TaskStatuses
}

export type TaskStatuses = 'new' | 'in_progress' | 'done'

export const statuses: TaskStatuses[] = ['new', 'in_progress', 'done']
