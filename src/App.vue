<template>
  <div class="common-layout">
    <router-view></router-view>
  </div>
</template>

<script>
  // import HelloWorld from './components/HelloWorld.vue';
  // import ButtonTo from "@/components/buttonTo";

  export default {
    name: 'App',
    components: {
      // ButtonTo,
      // HelloWorld
    },
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
    margin-top: 60px;
  }
</style>



