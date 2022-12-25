<template>
    <h2>{{ work.name }}</h2>
    <el-divider style="margin-left: 10%; width: 80%"/>
    <el-row style="margin-left: 10%; margin-top: 30px; width: 80%">
        <el-col :span="8">
            <el-row><h3>开始时间</h3></el-row>
            <el-row><h3>{{ work.begin_time.replace('T', ' ') }}</h3></el-row>
        </el-col>
        <el-col :span="8">
            <el-row><h3>结束时间</h3></el-row>
            <el-row><h3>{{ work.end_time.replace('T', ' ') }}</h3></el-row>
        </el-col>
        <el-col :span="8">
            <el-row><h3>剩余时间</h3></el-row>
            <el-row><h3>{{getRemainTime(work.end_time)}}</h3></el-row>
        </el-col>
    </el-row>
    <el-row style="margin-left: 10%; width: 80%">
        <el-col :span="24" style="margin: 0 0 0 0">
            <el-progress :percentage="timeDifference(work.begin_time, work.end_time)" :color="colors" :show-text="false"/>
        </el-col>
    </el-row>
    <el-row style="margin-left: 5%; margin-top:30px; width: 90%">
        <el-col :span="24">
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
        </el-col>
    </el-row>
</template>

<script>
import {reactive} from "@vue/reactivity";
import STORE from '../../store/index'
import {useRoute} from "vue-router";
import API from "../../axios.js"

export default {
    name: "WorkDescription",
    setup() {
        const colors = [
          { color: '#f56c6c', percentage: 20 },
          { color: '#e6a23c', percentage: 40 },
          { color: '#5cb87a', percentage: 60 },
          { color: '#1989fa', percentage: 80 },
          { color: '#6f7ad3', percentage: 100 },
        ]
        let work = reactive({
            id: 1,
            name: "第一次作业",
            content: "课本16页1到8题",
            begin_time: "2022-12-22 21:51:54",
            end_time: "2022-12-24 21:51:54"
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
                        work.content = response.data.data.content === null ? "" : response.data.data.content
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

        function timeDifference(beginTime, endTime) {
            var dateBegin = new Date(beginTime)
            var dateEnd = new Date(endTime)
            var totalTimeSpan = dateEnd.getTime() - dateBegin.getTime();
            var dateNow = new Date()
            var nowTimeSpan = dateEnd.getTime() - dateNow.getTime()
            console.log(dateBegin)
            console.log(dateNow)
            console.log(dateEnd)
            console.log(totalTimeSpan)
            console.log(nowTimeSpan)
            var percentage = 100 * nowTimeSpan / totalTimeSpan
            return percentage;
        }

        function getRemainTime(endTime) {
            var dateEnd = new Date(endTime)
            var dateNow = new Date()
            var nowTimeSpan = dateEnd.getTime() - dateNow.getTime()
            console.log(dateNow)
            console.log(dateEnd)
            console.log(nowTimeSpan)
            var dayDiff = Math.floor(nowTimeSpan / (24 * 3600 * 1000));
            var leave1 = nowTimeSpan % (24 * 3600 * 1000);
            var hours = Math.floor(leave1 / (3600 * 1000))
            return dayDiff + "天" + hours + "小时"
        }

        return {
            colors,
            isSuperUser,
            work,
            getWork,
            timeDifference,
            getRemainTime
        }
    }
}
</script>

<style scoped>

</style>