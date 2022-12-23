<template>
    <el-container style="overflow:Scroll;overflow-y:hidden">
<!--        <el-aside @mouseover="isCollapse=false" @mouseout="isCollapse=false"-->
<!--                  @mousemove="isCollapse=false" width="auto">-->

        <el-aside >
<!--            <p>{{title}}</p>-->
<!--            <a href="https://www.flaticon.com/free-icons/data-center" title="data center icons">Data center icons created by Freepik - Flaticon</a>-->
<!--            <img :src="require('@/image/data-center.png')" width="150" height="150"-->
<!--                 style="margin: 25px 75px 25px 75px; position:fixed; display: flex"  />-->
            <img :src="require('@/image/img.png')" width="150" height="150"
                 style="margin: 25px 75px 25px 75px; position:fixed; display: flex"  />
            <el-menu
                :collapse-transition="false"
                default-active="2"
                class="el-menu-vertical-demo"
                :collapse="isCollapse"
                router
                style="width: 300px"
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
                <el-menu-item index="/home/imagePool">
                    <el-icon>
                        <CircleCheck/>
                    </el-icon>
                    <template #title>个人图床</template>
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
<!--        <el-main style="width: auto !important;">-->
<!--        <div style="position: fixed; height: 50px">-->
<!--            <span style="background: skyblue">-->

<!--            </span>-->
<!--        </div>-->
<!--        <div class="navbar-wrapper">-->
            <el-container >
                <el-header >
                    <span style="font-size: 40px; text-align: left; font-weight: bold; margin: 0 auto">你好，{{username}}</span>
                </el-header>
                <el-main style="padding: 0 0 0 0">
                    <router-view></router-view>
                </el-main>
            </el-container>
<!--        </div>-->


    </el-container>
</template>

<script>
import {ref} from "@vue/reactivity";
import {useRoute} from "vue-router";
import {watch} from  'vue'
import STORE from "@/store";

// import router from "@/router/router";


// import useGetGlobalProperties from '@/useGlobal'

export default {
    name: "HomeView",
    setup() {
        const title = ref('123');
        const route = useRoute()
        let isCollapse = ref(false)
        let username = ref(STORE.state.userName)
        const handleOpen = (key, keyPath) => {
            console.log(key, keyPath)
        }
        const handleClose = (key, keyPath) => {
            console.log(key, keyPath)
        }

        watch( route, (to, from) => {
            switch (from.path) {
                case '/home/user':
                    title.value = "123456"
                    break;
                default:
                    title.value = "1234"
            }
        })

        return {
            isCollapse,
            handleClose,
            handleOpen,
            title,
            username
        }
    },


}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    /*width: auto !important;*/
    padding-top: 0;
    margin: 200px 0 0 0;
    /*width: 60%;*/
    max-width: 500px;
    min-height: 550px;
    position: fixed;
    /*background: #b0e3e6;*/
    /*height: 100%;*/
}

/*.layout-container-demo .el-header {*/
/*  position: relative;*/
/*  background-color: var(--el-color-primary-light-7);*/
/*  color: var(--el-text-color-primary);*/
/*}*/
.navbar-wrapper {
    width: 100%;
border-bottom: 1px solid #dcdfe6;
    /*height: var(--header-height);*/
    padding: 0 12px 0 24px;
    background-image: radial-gradient(transparent 1px,#ffffff 1px);
    background-size: 4px 4px;
    /*backdrop-filter: blur(2px) saturate(50%);*/
    filter: saturate(50%) blur(2px);
}
.el-header {
    height: 80px;
    text-align: right;
    font-size: 12px;
    background: skyblue;
    /*position: relative;*/
}

.el-main {
    height: calc(100vh - 85px);
    margin: 0 0 0 0;
}
/**修改全局的滚动条*/
/**滚动条的宽度*/
::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
    border-radius: 10px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(109, 109, 109, 0.4);
    height: 120px;
}

</style>