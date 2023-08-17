import { TaskStatuses } from '@/types/task'

// get task background color, used in TaskStatus.vue and TaskList.vue
export function returnTaskStatusStyleBackground(status: TaskStatuses) {
  switch (status) {
    case 'new':
      return 'bg-blue-100'
    case 'in_progress':
      return 'bg-yellow-100'
    case 'done':
      return 'bg-green-100'
    default:
      return 'bg-blue-100'
  }
}

// get task text color, used in TaskStatus.vue and TaskList.vue
export function returnTaskStatusStyleText(status: TaskStatuses) {
  switch (status) {
    case 'new':
      return 'text-blue-400'
    case 'in_progress':
      return 'text-yellow-400'
    case 'done':
      return 'text-green-400'
    default:
      return 'text-blue-400'
  }
}
