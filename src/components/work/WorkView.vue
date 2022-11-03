<template>
    <el-catainer>
        <el-header>
            <el-menu
                    :default-active="activeIndex"
                    class="el-menu-demo"
                    mode="horizontal"
            >
                <el-menu-item index="1" @click="handleDescription(work.id)">作业描述</el-menu-item>
                <el-menu-item index="2" @click="handleManagement(work.id)" v-if="isSuperUser()">作业管理</el-menu-item>
                <el-menu-item index="3" @click="handleSubmit(work.id)" v-if="isSuperUser()">作业提交情况</el-menu-item>
            </el-menu>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-catainer>
</template>

<script>
    import {reactive, ref} from "@vue/reactivity";
    import STORE from '../../store/index'
    import {useRoute} from "vue-router";
    import API from "../../axios.js"
    import router from "@/router/router";


    export default {
        name: "WorkView",
        setup() {
            let work = reactive({
                id: 1,
                name: "c1",
                content: "做十道练习题",
                begin_time: "2017-07-25 21:51:54",
                end_time: "2017-07-25 21:51:54"
            })

            //获取当前课程信息
            function getWork() {
                API.post(API.defaults.baseUrl + '/course/work/single/', {id: route.query.id})
                    .then(function (response) {
                        if (response.data.code === 200) {
                            work = response.data.data
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

            //顶栏路由
            function handleDescription(id) {
                router.push({
                    path: '/home/work/description',
                    query: {id}
                })
            }

            function handleManagement(id) {
                router.push({
                    path: '/home/work/management',
                    query: {id}
                })
            }

            function handleSubmit(id) {
                router.push({
                    path: '/home/work/submit',
                    query: {id}
                })
            }

            const activeIndex = ref('1')

            function isSuperUser() {
                return STORE.state.isSuperUser;
            }

            let route = useRoute();
            return {
                isSuperUser,
                activeIndex,
                work,
                getWork,
                handleDescription,
                handleManagement,
                handleSubmit,
            }
        }
    }
</script>

<style scoped>

</style>