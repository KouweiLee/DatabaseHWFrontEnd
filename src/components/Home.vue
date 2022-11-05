<template>
    <el-container>
        <el-aside @mouseover="isCollapse=false" @mouseout="isCollapse=true"
                  @mousemove="isCollapse=false" width="auto">

            <el-menu
                :collapse-transition="false"
                default-active="2"
                class="el-menu-vertical-demo"
                :collapse="isCollapse"
                @open="handleOpen"
                @close="handleClose"
                router
            >

                <el-menu-item index="/home/discussion">
                    <el-icon>
                        <Comment/>
                    </el-icon>
                    <template #title>讨论区</template>
                </el-menu-item>
                <el-menu-item index="/home/announcement">
                    <el-icon>
                        <ChatDotSquare/>
                    </el-icon>
                    <template #title>公告区</template>
                </el-menu-item>
                <el-menu-item index="/home/courseList">
                    <el-icon>
                        <Notebook/>
                    </el-icon>
                    <template #title>课程区</template>
                </el-menu-item>
                <el-menu-item index="/home/judgeSelf">
                    <el-icon>
                        <CircleCheck/>
                    </el-icon>
                    <template #title>自测区</template>
                </el-menu-item>
                <el-menu-item index="/home/user">
                    <el-icon>
                        <User/>
                    </el-icon>
                    <template #title>用户</template>
                </el-menu-item>
                <!--            <el-menu-item index="3" disabled>-->
                <!--                <el-icon><document /></el-icon>-->
                <!--                <template #title>Navigator Three</template>-->
                <!--            </el-menu-item>-->
                <!--            <el-menu-item index="4">-->
                <!--                <el-icon><setting /></el-icon>-->
                <!--                <template #title>Navigator Four</template>-->
                <!--            </el-menu-item>-->
            </el-menu>
        </el-aside>
        <el-main style="width: auto !important;">
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
import {ref} from "@vue/reactivity";
// import useGetGlobalProperties from '@/useGlobal'

export default {
    name: "HomeView",
    setup() {
        let isCollapse = ref(true)
        const handleOpen = (key, keyPath) => {
            console.log(key, keyPath)
        }
        const handleClose = (key, keyPath) => {
            console.log(key, keyPath)
        }

        function expandView() {
            console.log(isCollapse.value)
            isCollapse.value = isCollapse.value !== true;
        }

        return {
            isCollapse,
            handleClose,
            handleOpen,
            expandView,
        }
    }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: auto !important;
    min-height: 400px;
}
</style>