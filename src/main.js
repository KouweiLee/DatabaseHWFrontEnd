import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import axios from '@/axios.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)

// app.config.globalProperties.$axios=axios;  //配置axios的全局引用
// require('./mock/index')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.config.globalProperties.user = 'liwk'

app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(router).mount('#app')
