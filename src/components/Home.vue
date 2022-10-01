<template>
    <el-container>
        <el-cow>
            <el-button @click="expandView" style="margin-bottom: 40px">
                扩展形式
            </el-button>
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
                <el-menu-item index="/home/c2">
                    <el-icon>
                        <el-icon>
                            <ChatDotSquare/>
                        </el-icon>
                    </el-icon>
                    <template #title>Navigator Two</template>
                </el-menu-item>
                <el-menu-item index="/home/c4">
                    <el-icon>
                        <el-icon>
                            <User/>
                        </el-icon>
                    </el-icon>
                    <template #title>Navigator Four</template>
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
        <el-container>
            <el-header>
                <div class="h-6"/>
                <el-menu
                        :default-active="activeIndex2"
                        class="el-menu-demo"
                        mode="horizontal"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        @select="handleSelect"
                >
                    <el-menu-item index="1">Processing Center</el-menu-item>
                    <el-sub-menu index="2">
                        <template #title>Workspace</template>
                        <el-menu-item index="2-1">item one</el-menu-item>
                        <el-menu-item index="2-2">item two</el-menu-item>
                        <el-menu-item index="2-3">item three</el-menu-item>
                        <el-sub-menu index="2-4">
                            <template #title>item four</template>
                            <el-menu-item index="2-4-1">item one</el-menu-item>
                            <el-menu-item index="2-4-2">item two</el-menu-item>
                            <el-menu-item index="2-4-3">item three</el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                    <el-menu-item index="3" disabled>Info</el-menu-item>
                    <el-menu-item index="4">Orders</el-menu-item>
                </el-menu>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import {ref} from "@vue/reactivity";

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