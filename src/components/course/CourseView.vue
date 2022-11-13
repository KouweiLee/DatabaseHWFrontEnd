<template>
    <el-catainer>
        <el-header >
            <el-menu
                    :default-active="activeIndex"
                    class="el-menu-demo"
                    mode="horizontal"
            >
                <el-menu-item index="/home/course/description" @click="handleDescription(course.id)">课程描述</el-menu-item>
                <el-menu-item index="/home/course/work" @click="handleWork(course.id)" v-if="course.isChoosed">作业列表</el-menu-item>
                <el-menu-item index="/home/course/management" @click="handleManagement(course.id)" v-if="isSuperUser()">课程管理</el-menu-item>
                <el-menu-item index="/home/course/attachment" @click="handleAttachment(course.id)" v-if="course.isChoosed">课程附件</el-menu-item>
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
                id: 4,
                name: "c1",
                isChoosed: true,

            })
            let route = useRoute();
            //获取当前课程信息
            function getCourse(){
                API.post(API.defaults.baseUrl + '/course/course/single/', {id:route.query.id,username:STORE.state.user})
                    .then(function (response) {
                        if (response.data.code === 200) {
                            course = response.data.data
                            console.log("courseView show course msg")
                            course.id = response.data.data.id
                            course.name = response.data.data.name
                            course.isChoosed = response.data.data.isChoosed
                            console.log(course.id)
                            console.log("courseView end show course msg")


                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            //顶栏路由
            function handleDescription(id){
                id = route.query.id
                // getCourse()
                router.push({
                    path: '/home/course/description',
                    query: {id}
                })
            }
            function handleWork(id) {
                // getCourse()
                id = route.query.id
                router.push({
                    path: '/home/course/work',
                    query: {id}
                })
            }
            function handleManagement(id) {
                // getCourse()
                id = route.query.id
                router.push({
                    path: '/home/course/management',
                    query: {id}
                })
                console.log(id)
            }
            function handleAttachment(id) {
                // getCourse()
                id = route.query.id
                router.push({
                    path: '/home/course/attachment',
                    query: {id}
                })
            }
            const activeIndex = ref('/home/course/description')
            function isSuperUser() {
                return STORE.state.isSuperUser;
            }

            return{
                isSuperUser,
                activeIndex,
                course,
                getCourse,
                handleDescription,
                handleManagement,
                handleAttachment,
                handleWork
            }
        }
    }
</script>

<style scoped>
.el-header {
    height: 80px;
    position: relative;
    /*position: fixed;*/
}
.el-main {
    height: calc(100vh - 85px);
}
</style>