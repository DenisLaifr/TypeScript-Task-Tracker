import { createApp } from 'vue'
import './tailwind.css'

import App from './App.vue'
import router from './router'

// import Pinia store
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import 'primevue/resources/themes/tailwind-light/theme.css' //theme
import 'primevue/resources/primevue.min.css' //core css
import 'primeicons/primeicons.css' //icons
import ToastService from 'primevue/toastservice'

export const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(ToastService)

const pinia = createPinia()
app.use(pinia)

import i18n from '@/locale/index'
app.use(i18n)

//PrimeVue
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import SpeedDial from 'primevue/speeddial'

app.component('PrimeInputText', InputText)
app.component('PrimeDropdown', Dropdown)
app.component('PrimeButton', Button)
app.component('PrimeToast', Toast)
app.component('PrimeSpeedDial', SpeedDial)

app.mount('#app')
