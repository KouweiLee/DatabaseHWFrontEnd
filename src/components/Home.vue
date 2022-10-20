<template>
    <el-container>
        <el-aside style="width: 20%;">
            <el-cow>
                <el-icon @click="expandView" style="margin-bottom: 40px" v-if="isCollapse">
                    <ArrowRightBold/>
                </el-icon>
                <el-icon @click="expandView" style="margin-bottom: 40px" v-if="isCollapse === false">
                    <ArrowLeftBold/>
                </el-icon>
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        :collapse="isCollapse"
                        @open="handleOpen"
                        @close="handleClose"
                        router
                >
                    <!--            <el-sub-menu index="1">-->
                    <!--                <template #title>-->
                    <!--                    <el-icon><location /></el-icon>-->
                    <!--                    <span>Navigator One</span>-->
                    <!--                </template>-->
                    <!--                <el-menu-item-group>-->
                    <!--                    <template #title><span>Group One</span></template>-->
                    <!--                    <el-menu-item index="1-1">item one</el-menu-item>-->
                    <!--                    <el-menu-item index="1-2">item two</el-menu-item>-->
                    <!--                </el-menu-item-group>-->
                    <!--                <el-menu-item-group title="Group Two">-->
                    <!--                    <el-menu-item index="1-3">item three</el-menu-item>-->
                    <!--                </el-menu-item-group>-->
                    <!--                <el-sub-menu index="1-4">-->
                    <!--                    <template #title><span>item four</span></template>-->
                    <!--                    <el-menu-item index="1-4-1">item one</el-menu-item>-->
                    <!--                </el-sub-menu>-->
                    <!--            </el-sub-menu>-->
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
            </el-cow>
        </el-aside>
        <el-main>
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
        width: 200px;
        min-height: 400px;
    }
</style>