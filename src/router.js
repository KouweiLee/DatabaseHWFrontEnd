import {createRouter, createWebHashHistory} from "vue-router"

import c1 from './components/c1.vue'
import c2 from './components/DiscussionView.vue'
import c3 from './components/c3.vue'
import c4 from './components/c4.vue'
// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const routes = [
    // {path: '/', component: () => import('@/components/Home')},
    {path: '/', component: () => import('@/components/login/login.vue')},
    // {path: '/', component: () => import('@/components/learn')},
    {path: '/home', component: () => import('@/components/Home.vue'),
        children: [
            {
                path: '/home/c1',
                component: () => import('@/components/c1.vue')
            },
            {
                path: '/home/c2',
                component: () => import('@/components/DiscussionView.vue')
            },
            {
                path: '/home/c3',
                component: () => import('@/components/c3.vue')
            },
            {
                path: '/home/c4',
                component: () => import('@/components/c4.vue')
            },

        ]},
    { path: '/1', component: c1 },
    { path: '/2', component: c2 },
    { path: '/3', component: c3 },
    { path: '/4', component: c4 },
]

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

export default router;