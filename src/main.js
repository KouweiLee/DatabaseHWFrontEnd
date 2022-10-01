import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)
import axios from '@/axios.js'

app.config.globalProperties.$axios=axios;  //配置axios的全局引用
require('./mock/index')


app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(router).mount('#app')
