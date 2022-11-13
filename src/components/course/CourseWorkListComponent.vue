<template>
<el-card>
    <el-row>
        <el-col :span="12">
            <h2 class="workTitle" @click="gotoWork">{{refWorkInfo.name}}</h2>
        </el-col>
        <el-col :span="12">
            <span v-if="timeDifference(BETime.begin_time, BETime.end_time) >= 0">
                还有{{getRemainTime(BETime.end_time)}}结束</span>
            <span v-if="timeDifference(BETime.begin_time, BETime.end_time) < 0">
                作业已结束</span>
        </el-col>
    </el-row>
    <el-row style="margin: 0 0 0 0">
        <el-col :span="24" style="margin: 0 0 0 0">
            <el-progress :percentage="timeDifference(BETime.begin_time, BETime.end_time)" :color="colors" :show-text="false"/>
        </el-col>
    </el-row>
</el-card>
</template>

<script>
import {reactive} from "vue";
import router from "@/router/router";
import API from "@/axios";

export default {
    name: "CourseWorkListComponent",
    props: {
        workInfo: {
            type: Object,
            default: function () {
                return {
                    id: 999,
                    name: "default work"
                }
            }
        },
    },
    setup(props) {
        const refWorkInfo = reactive(props.workInfo);
        const BETime = reactive({
            begin_time: "",
            end_time: ""
        })
        const colors = [
          { color: '#f56c6c', percentage: 20 },
          { color: '#e6a23c', percentage: 40 },
          { color: '#5cb87a', percentage: 60 },
          { color: '#1989fa', percentage: 80 },
          { color: '#6f7ad3', percentage: 100 },
        ]
        function gotoWork() {
            let id = refWorkInfo.id
            router.push({
                path: '/home/work/description',
                query: {id}
            })
        }
        getWork()
        function getWork() {
            API.post(API.defaults.baseUrl + '/course/work/single/', {
                id: refWorkInfo.id
            }).then(function (response) {
                if (response.data.code === 200) {
                    BETime.begin_time = response.data.data.begin_time
                    BETime.end_time = response.data.data.end_time
                }
            })
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
            refWorkInfo,
            gotoWork,
            getWork,
            BETime,
            colors,
            timeDifference,
            getRemainTime
        }
    }
}
</script>

<style scoped>
.workTitle:hover {
    color: #000000;
    text-decoration-line: underline;
}
</style>