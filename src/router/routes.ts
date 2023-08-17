import NotFound from '@/views/NotFoundView.vue'
import { RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layout/app/AppLayout.vue'

export const routes: RouteRecordRaw[] = [
  {
    name: 'index',
    path: '/',
    redirect: '/taskList'
  },
  {
    name: 'taskList',
    path: '/TaskList',
    component: () => import('@/views/TaskListView.vue'),
    meta: {
      title: 'TaskList',
      layout: AppLayout
    }
  },
  {
    name: 'createTask',
    path: '/CreateTask',
    component: () => import('@/views/CreateTaskView.vue'),
    meta: {
      title: 'CreateTask',
      layout: AppLayout
    },
    props: true
  },
  {
    name: 'editTask',
    path: '/EditTask/:id',
    component: () => import('@/views/EditTaskView.vue'),
    meta: {
      title: 'EditTask',
      layout: AppLayout
    },
    props: true
  },
  {
    name: 'notFound',
    path: '/NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      title: 'NotFound',
      layout: ''
    }
  },
  { path: '/:path(.*)', component: NotFound }
]
