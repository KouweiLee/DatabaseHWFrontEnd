<template>
    <div class="common-layout">
        <router-view></router-view>
    </div>
</template>

<script>

// import HelloWorld from './components/HelloWorld.vue';
// import ButtonTo from "@/components/buttonTo";
import STORE from "@/store";

export default {
    name: 'App',
    components: {
        // ButtonTo,
        // HelloWorld
    },
    setup() {
        // 在页面加载时读取sessionStorage里的状态信息
        if (sessionStorage.getItem('store')) {
            STORE.replaceState(
                Object.assign(
                    {},
                    STORE.state,
                    JSON.parse(sessionStorage.getItem('store'))
                )
            )
        }

        // 在页面刷新时将vuex里的信息保存到sessionStorage里
        // beforeunload事件在页面刷新时先触发
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('store', JSON.stringify(STORE.state))
        })
    }
}
// import {
//   Document,
//   Menu as IconMenu,
//   Location,
//   Setting,
// } from '@element-plus/icons-vue'

const handleOpen = (key, keyPath) => { // eslint-disable-line no-unused-vars
    console.log(key, keyPath)
} // eslint-disable-line no-unused-vars
const handleClose = (key, keyPath) => { // eslint-disable-line no-unused-vars
    console.log(key, keyPath)
} // eslint-disable-line no-unused-vars

</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0;
}
</style>



