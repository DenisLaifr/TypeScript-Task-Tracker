import { defineStore } from 'pinia'
import { Task, TaskForm, TaskStatuses } from '@/types/task'

type TaskStore = {
  initialized: boolean
  tasks: Task[]
  currentTask: Task | null
}

// get tasks from local storage
function getTasksFromLocalStorage(): Task[] {
  const tasks = localStorage.getItem('tasks')
  console.log(tasks)
  return tasks
    ? JSON.parse(tasks)
    : [
        {
          id: 'askjdhajkf',
          name: 'Meeting',
          description: 'this is default task',
          status: 'new'
        },
        {
          id: 'jhgahsdhj',
          name: 'Code Review',
          description: 'this is default task',
          status: 'done'
        },
        {
          id: 'fliasilf',
          name: 'Todo Scrum',
          description: 'this is default task',
          status: 'in_progress'
        }
      ]
}

export const useTaskStore = defineStore('task', {
  state: () => {
    return {
      initialized: false,
      tasks: getTasksFromLocalStorage(),
      currentTask: null
    } as TaskStore
  },

  actions: {
    async initialize() {
      this.initialized = true
    },

    // get Task index and update it, also update local storage
    updateTask(task: Task) {
      const taskIndex = this.tasks.findIndex((t) => t.id === task.id)
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = task
        this.updateTasksLocalStorage()
      }
    },

    // create new task and update local storage
    createNewTask(taskForm: TaskForm) {
      const task = {
        id: Math.random().toString(36).substr(2, 9),
        name: taskForm.name,
        description: taskForm.description,
        status: taskForm.status,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      } as Task

      this.tasks.push(task)
      this.updateTasksLocalStorage()
    },

    // update local storage for tasks
    updateTasksLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },

    // delete task and update local storage
    deleteTask(taskId: string) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId)
      this.updateTasksLocalStorage()
    },

    // update task status and update local storage, used in TaskList.vue drag and drop card
    updateTaskStatus(taskId: string, status: TaskStatuses) {
      const task = this.tasks.find((task) => task.id === taskId)
      if (task) {
        task.status = status
        this.updateTasksLocalStorage()
      }
    }
  }
})
