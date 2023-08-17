<template>
  <div class="bg-white shadow rounded px-2 py-1 my-2 cursor-move">
    <div class="inline-flex w-full">
      <div class="flex-1">
        <div class="text-lg font-semibold">{{ item.name }}</div>
        <div class="text-gray-400">{{ item.description }}</div>
      </div>
      <div class="text-end">
        <div class="flex justify-end mb-2 mt-1">
          <PrimeSpeedDial
            :model="menuItems"
            direction="down"
            class="!relative"
            button-class="!w-5 !h-5 !p-1 p-button-outlined p-button-raised p-button-text p-button-secondary"
            :pt="{
              menu: 'absolute top-6',
              action: '!w-6 !h-6',
              actionIcon: '!text-[12px]'
            }"
          />
        </div>
        <TaskStatus :status="item.status" />
      </div>
    </div>
    <div v-if="item.created_at" class="text-gray-400 text-[9px] md:text-sm">
      {{ $t('components.task_card.created_at') }} :
      {{ format(new Date(item.created_at), 'MM.dd HH:mm') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Task } from '@/types/task'
import TaskStatus from '@/components/TaskStatus.vue'
import { useTaskStore } from '@/store/task'
import { useRouter } from 'vue-router'
import { format } from 'date-fns'

const props = defineProps<{ item: Task }>()
const router = useRouter()

const menuItems = [
  {
    label: 'Edit',
    icon: 'pi pi-pencil',
    command: () => {
      router.push({ name: 'editTask', params: { id: props.item.id } })
    }
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: () => {
      useTaskStore().deleteTask(props.item.id)
    }
  }
]
</script>
