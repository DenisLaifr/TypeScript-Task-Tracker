<template>
  <div class="h-full">
    <div
      class="grid grid-cols-3 devide-x divide-dashed devide-gray-500 py-3 px-2 h-full"
    >
      <div v-for="category in categories" :key="category.name" class="mx-2">
        <div
          class="px-2 py-1 mb-4 rounded"
          :class="returnTaskStatusStyleBackground(category.name)"
        >
          <div
            class="md:text-lg font-semibold"
            :class="returnTaskStatusStyleText(category.name)"
          >
            {{ $t('task_statuses.' + category.name) }}
          </div>
        </div>
        <div :key="tasks.length" class="h-full">
          <Draggable
            :id="category.name"
            :model-value="tasks.filter((task) => task.status === category.name)"
            item-key="id"
            :sort="false"
            group="tasksGroup"
            easing="cubic-bezier(1, 0, 0, 1)"
            :animation="150"
            style="min-height: 100%"
            class="h-full"
            @end="changeTaskStatus"
          >
            <template #item="{ element }">
              <TaskCard :id="element.id" :item="element" />
            </template>
          </Draggable>
        </div>
      </div>
    </div>
    <PrimeButton
      severity="secondary"
      rounded
      class="!p-3 floating-button"
      @click="createNewTask()"
    >
      <AddIcon class="w-6" />
    </PrimeButton>
  </div>
</template>
<script setup lang="ts">
import { statuses } from '@/types/task'
import { useTaskStore } from '@/store/task'
import { storeToRefs } from 'pinia'
import Draggable from 'vuedraggable'
import TaskCard from '@/components/TaskCard.vue'
import {
  returnTaskStatusStyleBackground,
  returnTaskStatusStyleText
} from '@/utils/taskUtils'
import { Add20Regular as AddIcon } from '@vicons/fluent'
import router from '@/router'

const { tasks } = storeToRefs(useTaskStore())

// Map to desired object structure
const categories = statuses.map((status) => ({ name: status }))

function changeTaskStatus(evt: any) {
  useTaskStore().updateTaskStatus(evt.item.id, evt.to.id)
}

function createNewTask() {
  router.push({ name: 'createTask' })
}
</script>

<style scoped>
/* Style for the floating button */
.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  animation: float 2.5s infinite;
}

/* Keyframes animation for the floating effect */
@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
