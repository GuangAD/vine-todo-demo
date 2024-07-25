import './assets/main.css'
import 'todomvc-app-css/index.css'
import 'todomvc-common/base.css'

import { createApp } from 'vue'
import App from './App.vine'
import router from './router/index'

const app = createApp(App)

app.use(router)

app.mount('.todoapp')
