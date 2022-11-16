import {createRouter, createWebHashHistory} from "vue-router"

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const routes = [
    {path: '/', component: () => import('@/components/Home')},
    // {path: '/', component: () => import('@/components/blogDetailComponent')},
    // {path: '/', component: () => import('@/components/login/login.vue')},
    // {path: '/', component: () => import('@/components/learn')},
    // {path: '/', component: () => import('@/components/work/learn2View')},
    {
        path: '/home', component: () => import('@/components/Home.vue'),
        children: [
            {
                path: '/home/blog',
                component: () => import('@/components/discussion/blogDetailComponent.vue')
            },
            {
                path: '/home/discussion',
                component: () => import('@/components/discussion/DiscussionView.vue'),
            },
            {
                path: '/home/course',
                component: () => import('@/components/course/CourseView.vue'),
                children: [
                    {
                        path: '/home/course/description',
                        component: () => import('@/components/course/CourseDescription'),
                    },
                    {
                        path: '/home/course/work',
                        component: () => import('@/components/course/CourseWork'),
                    },
                    {
                        path: '/home/course/management',
                        component: () => import('@/components/course/CourseManagement'),
                    },
                    {
                        path: '/home/course/attachment',
                        component: () => import('@/components/course/CourseAttachment'),
                    },
                ]
            },
            {
                path: '/home/work',
                component: () => import('@/components/work/WorkView'),
                children: [
                    {
                        path: '/home/work/description',
                        component: () => import('@/components/work/WorkDescription'),
                    },
                    {
                        path: '/home/work/management',
                        component: () => import('@/components/work/WorkManagement'),
                    },
                    {
                        path: '/home/work/submit',
                        component: () => import('@/components/work/WorkSubmit'),
                    }
                ]
            },
            {
                path: '/home/courseList',
                component: () => import('@/components/course/CourseList.vue'),
            },
            {
                path: '/home/judgeSelf',
                component: () => import('@/components/JudgeSelfView.vue')
            },
            {
                path: '/home/announcement',
                component: () => import('@/components/announce/AnnouncementView.vue'),
            },{
                path: '/home/member',
                component: () => import('@/components/announce/MemberView.vue'),
            },
            {
                path: '/home/user',
                component: () => import('@/components/UserView.vue')
            },

        ]
    },
]

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

export default router;