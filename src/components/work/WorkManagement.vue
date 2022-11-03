<template>
    <h1>{{work.name}}</h1>
        <v-time-picker
        format="ampm"
      ></v-time-picker>
    <v-md-editor height="500px" style="text-align: left" v-model="work.content"></v-md-editor>
</template>

<script>
    import {reactive} from "@vue/reactivity";
    import STORE from '../../store/index'
    import {useRoute} from "vue-router";
    import API from "../../axios.js"
    export default {
        name: "WorkManagement",
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
            function isSuperUser() {
                return STORE.state.isSuperUser;
            }

            let route = useRoute();
            return {
                isSuperUser,
                work,
                getWork
            }
        }
    }
</script>

<style scoped>

</style>