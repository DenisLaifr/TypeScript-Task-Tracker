<template>
  <div>
    <Form
      class="md:grid md:grid-cols-2 md:gap-4 w-full pt-4"
      @submit="onSubmit"
    >
      <div>
        <span class="p-float-label">
          <PrimeInputText
            id="name"
            v-model="name.value.value"
            :class="{ 'p-invalid': name.errors.value[0] }"
            class="w-full"
            @input="name.validate"
          />
          <label for="name">{{ $t('components.task_form.name') }}</label>
        </span>
        <small id="text-error" class="p-error">{{
          name.errors.value[0] || '&nbsp;'
        }}</small>
      </div>
      <div>
        <span class="p-float-label">
          <PrimeInputText
            id="description"
            v-model="description.value.value"
            :class="{ 'p-invalid': description.errors.value[0] }"
            class="w-full"
            @input="description.validate"
          />
          <label for="description">{{
            $t('components.task_form.description')
          }}</label>
        </span>
        <small id="description-error" class="p-error">{{
          description.errors.value[0] || '&nbsp;'
        }}</small>
      </div>
      <div>
        <span class="p-float-label">
          <PrimeDropdown
            id="status"
            v-model="status.value.value"
            :options="
              statuses.map((status) => ({
                label: $t('task_statuses.' + status),
                value: status
              }))
            "
            option-label="label"
            :class="{ 'p-invalid': status.errors.value[0] }"
            class="w-full"
            @change="status.validate"
          >
            <template #value="{ value }">
              <TaskStatus v-if="value" :status="value.value" class="w-fit" />
            </template>
            <template #option="{ option }">
              <TaskStatus v-if="option" :status="option.value" class="w-fit" />
            </template>
          </PrimeDropdown>
          <label for="status">{{
            $t('components.task_form.select_status')
          }}</label>
        </span>
        <small id="status-error" class="p-error">{{
          status.errors.value[0] || '&nbsp;'
        }}</small>
      </div>
      <PrimeButton
        size="small"
        severity="secondary"
        class="md:col-span-2 w-full"
        type="submit"
        label="Submit"
      />
    </Form>
    <PrimeToast />
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { useField, useForm, Form } from 'vee-validate'
import { required } from '@vee-validate/rules'
import { statuses, Task, TaskForm } from '@/types/task'
import TaskStatus from '@/components/TaskStatus.vue'
import { useTaskStore } from '@/store/task'
import { useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'
import i18n from '@/locale'

const props = defineProps<{ item?: Task }>()

const router = useRouter()

// setup form
const { handleSubmit, resetForm } = useForm()

// setup fields
const name = useField('name', required)
const description = useField('description', required)
const status = useField('status', required)

// if update task, set form values
onBeforeMount(() => {
  if (props.item) {
    name.value.value = props.item?.name
    description.value.value = props.item?.description
    status.value.value = {
      label: i18n.global.t('task_statuses.' + props.item?.status),
      value: props.item?.status
    }
  }
})

const toast = useToast()

const onSubmit = handleSubmit((values) => {
  // if props.item its an update task
  if (props.item) {
    const task: Task = {
      id: props.item.id,
      name: values.name,
      description: values.description,
      status: values.status.value,
      created_at: props.item.created_at,
      updated_at: new Date().toISOString()
    }
    useTaskStore().updateTask(task)
    toast.add({
      severity: 'info',
      summary: i18n.global.t('components.task_form.task_updated'),
      detail: values.name + ' submitted.',
      life: 3000
    })

    // if not, its a new task
  } else {
    const task: TaskForm = {
      name: values.name,
      description: values.description,
      status: values.status.value
    }
    useTaskStore().createNewTask(task)
    toast.add({
      severity: 'info',
      summary: i18n.global.t('components.task_form.task_created'),
      detail: values.name + ' submitted.',
      life: 3000
    })
  }
  resetForm()
  router.push({ name: 'taskList' })
})
</script>
