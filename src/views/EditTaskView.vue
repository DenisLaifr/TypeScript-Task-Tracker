<template>
  <div class="mx-4 my-3 px-4 py-3 rounded-lg bg-white shadow-lg">
    <div
      class="inline-flex mb-4 pb-1 border-b w-full text-gray-500 font-semibold text-xl"
    >
      <router-link :to="{ name: 'index' }" class="hover:text-gray-800">
        {{ $t('navigation.home') }}
      </router-link>
      <i class="pi pi-angle-right self-center px-2" />
      <div>{{ $t('edit_task_view.edit_task') }}</div>
    </div>
    <TaskForm v-if="edittingTask" :item="edittingTask" />
    <div v-else>{{ $t('edit_task_view.task_not_found') }}</div>
  </div>
</template>

<script setup lang="ts">
import TaskForm from '@/components/TaskForm.vue'
import { useTaskStore } from '@/store/task'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { tasks } = useTaskStore()

const edittingTask = ref(tasks.find((task) => task.id === route.params.id))
</script>
