import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router/router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import axios from '@/axios.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
// import vuetify from './plugins/vuetify'
import { createVuetify } from 'vuetify'
import { loadFonts } from './plugins/webfontloader'
loadFonts()
const vuetify = createVuetify()
app.use(vuetify)

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
// import vuePressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
// import Prism from 'prismjs'
import VmdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css'
import hljs from 'highlight.js';

VmdPreview.use(githubTheme, {
    textAlign: "left"
})
VueMarkdownEditor.use(githubTheme, {
    Hljs: hljs,

})
app.use(VueMarkdownEditor).use(VmdPreview)

// import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'
// app.use(Vuetify)


import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
app.use(mavonEditor)


// app.config.globalProperties.$axios=axios;  //配置axios的全局引用
// require('./mock/index')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.config.globalProperties.user = 'liwk'

app.use(ElementPlus, {size: 'small', zIndex: 3000})
// app.use(Vuetify)
app.use(router).mount('#app')
