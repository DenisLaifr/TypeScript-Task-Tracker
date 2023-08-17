<template>
  <div class="mx-4 my-3 px-4 py-3 rounded-lg bg-white shadow-lg">
    <div
      class="mb-4 pb-1 border-b w-full text-gray-500 font-semibold text-xl inline-flex"
    >
      <router-link :to="{ name: 'index' }" class="hover:text-gray-800">
        {{ $t('navigation.home') }}
      </router-link>
      <i class="pi pi-angle-right self-center px-2" />
      <div>{{ $t('create_task_view.create_task') }}</div>
    </div>
    <TaskForm />
  </div>
</template>

<script setup lang="ts">
import TaskForm from '@/components/TaskForm.vue'
</script>
