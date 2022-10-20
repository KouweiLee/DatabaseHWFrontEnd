<template>
    <el-catainer>
        <el-header>
            <el-menu
                    :default-active="activeIndex"
                    class="el-menu-demo"
                    mode="horizontal"
            >
                <el-menu-item index="/home/course/description" @click="handleDescription(course.id)">课程描述</el-menu-item>
                <el-menu-item index="/home/course/work" @click="handleWork(course.id)">作业列表</el-menu-item>
                <el-menu-item index="/home/course/management" @click="handleManagement(course.id)" v-if="isSuperUser()">课程管理</el-menu-item>
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
        name: "CourseView",
        setup(){
            let course = reactive({
                id: 1,
                name: "c1",
                isChoosed: false,

            })
            //获取当前课程信息
            function getCourse(){
                API.post(API.defaults.baseUrl + '/course/single/', route.query.id)
                    .then(function (response) {
                        if (response.data.code === 200) {
                            course = response.data.data
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            //顶栏路由
            function handleDescription(id){
                router.push({
                    path: '/home/course/description',
                    query: {id}
                })
            }
            function handleWork(id) {
                router.push({
                    path: '/home/course/work',
                    query: {id}
                })
            }
            function handleManagement(id) {
                router.push({
                    path: '/home/course/management',
                    query: {id}
                })
            }
            const activeIndex = ref('/home/course/description')
            function isSuperUser() {
                return STORE.state.isSuperUser;
            }
            let route = useRoute();
            return{
                isSuperUser,
                activeIndex,
                course,
                getCourse,
                handleDescription,
                handleManagement,
                handleWork
            }
        }
    }
</script>

<style scoped>

</style>