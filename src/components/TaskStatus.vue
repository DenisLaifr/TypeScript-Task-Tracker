<template>
  <div>
    <div
      :class="[returnTaskStatusStyleBackground(status)]"
      class="rounded px-2 py-1"
    >
      <div
        :class="[returnTaskStatusStyleText(status)]"
        class="text-[9px] md:text-xs"
      >
        {{ $t('task_statuses.' + status) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TaskStatuses } from '@/types/task'
import {
  returnTaskStatusStyleBackground,
  returnTaskStatusStyleText
} from '@/utils/taskUtils'

defineProps<{ status: TaskStatuses }>()
</script>
