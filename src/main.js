import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router/router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import axios from '@/axios.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
import vuePressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'
import VmdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css'

VmdPreview.use(githubTheme)
VueMarkdownEditor.use(vuePressTheme, {Prism})

const app = createApp(App)

// app.config.globalProperties.$axios=axios;  //配置axios的全局引用
// require('./mock/index')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.config.globalProperties.user = 'liwk'

app.use(ElementPlus, {size: 'small', zIndex: 3000})
app.use(VueMarkdownEditor).use(VmdPreview)
app.use(router).mount('#app')
