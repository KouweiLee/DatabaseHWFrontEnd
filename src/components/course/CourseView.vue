<template>
    <el-catainer>
        <el-header>
            <el-menu
                    :default-active="activeIndex"
                    class="el-menu-demo"
                    mode="horizontal"
                    router
            >
                <el-menu-item index="/home/course/description">课程描述</el-menu-item>
                <el-menu-item index="/home/course/work">作业列表</el-menu-item>
                <el-menu-item index="/home/course/management" v-if="isSuperUser()">课程管理</el-menu-item>
            </el-menu>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-catainer>
</template>

<script>
    import {ref} from "@vue/reactivity";
    import STORE from '../../store/index'

    export default {
        name: "CourseView",
        setup(){
            const activeIndex = ref('/home/course/description')
            function isSuperUser() {
                return STORE.state.isSuperUser;
            }
            return{
                isSuperUser,
                activeIndex
            }
        }
    }
</script>

<style scoped>

</style>