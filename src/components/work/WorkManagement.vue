<template>
    <h1>{{work.name}}</h1>
    <el-date-picker
        v-model="dateSpan"
        type="datetimerange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        value-format="YYYY-MM-DD HH:mm:ss"
      />
<!--    <v-time-picker-->
<!--      format="ampm"-->
<!--    ></v-time-picker>-->
    <el-button type="primary" @click="setDate">Primary</el-button>
<!--    <v-md-editor height="500px" style="text-align: left" v-model="work.content"></v-md-editor>-->

    <mavon-editor
        v-model="work.content"
        ref="md"
        style="min-height: 600px"
      />
    <el-button type="primary" @click="changeWork">Primary</el-button>
    <el-button type="primary" @click="displayData">Primary</el-button>
</template>

<script>
import {reactive, ref} from "@vue/reactivity";
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
            const dateSpan = ref([work.begin_time, work.end_time])

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

            function changeWork() {
              API.post(API.defaults.baseURL + '/course/work/change/', {
                id: route.query.id,
                name: work.name,
                begin_time: dateSpan.value[0],
                end_time: dateSpan.value[1],
                content: work.content
              }).then(function (response) {
                console.log(response)
              }).catch(function (error) {
                console.log(error)
              })
            }

            function displayData() {
              console.log(work.content)
            }

            function isSuperUser() {
                return STORE.state.isSuperUser;
            }

            function setDate() {
              // * 这里只能更改dateSpan中的数据，不能更改原本的work.begin_time的数据
              console.log(work.begin_time)
              console.log(dateSpan.value[0])
              // console.log(value2.value[0])
            }

            let route = useRoute();
            return {
                isSuperUser,
                work,
                getWork,
                dateSpan,
              setDate,
              changeWork,
              displayData
            }
        }
    }
</script>

<style scoped>

</style>