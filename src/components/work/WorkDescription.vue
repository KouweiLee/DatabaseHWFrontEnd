<template>
    <h1>{{ work.name }}</h1>
    <mavon-editor
        ref="md"
        v-model="work.content"
        :subfield="false"
        :defaultOpen="'preview'"
        :toolbarsFlag="false"
        :editable="false"
        :scrollStyle="true"
        :ishljs="true"
    />
</template>

<script>
import {reactive} from "@vue/reactivity";
import STORE from '../../store/index'
import {useRoute} from "vue-router";
import API from "../../axios.js"

export default {
    name: "WorkDescription",
    setup() {
        let work = reactive({
            id: 1,
            name: "c1",
            content: "做十道练习题",
            begin_time: "2017-07-25 21:51:54",
            end_time: "2017-07-25 21:51:54"
        })
let route = useRoute();
        getWork()
        //获取当前课程信息
        function getWork() {
            API.post(API.defaults.baseUrl + '/course/work/single/', {id: route.query.id})
                .then(function (response) {
                    if (response.data.code === 200) {
                        work.id = response.data.data.id
                        work.begin_time = response.data.data.begin_time
                        work.end_time = response.data.data.end_time
                        work.content = response.data.data.content === null? "": response.data.data.content
                        work.name = response.data.data.name

                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        function isSuperUser() {
            return STORE.state.isSuperUser;
        }


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