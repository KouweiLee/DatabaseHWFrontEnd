<template>
    <h2>{{ course.name }}</h2>
    <!--    <el-tag v-for="(item, i) in course.tag" :key="i"-->
    <!--            effect="dark"-->
    <!--            round-->
    <!--            style="min-width: 50px; max-width: 120px; margin: 3px; font-size: 20px">{{item}}-->
    <!--    </el-tag>-->
    <el-divider style="margin-left: 10%; width: 80%"/>
    <el-row style="margin-left: 10%; width: 80%">
        <el-col :span="10">
            <v-card title="课程时间" v-model:text="course.time"></v-card>
        </el-col>
        <el-col :span="4"></el-col>
        <el-col :span="10">
            <v-card title="课程地点" v-bind:text="course.position"></v-card>
        </el-col>
    </el-row>
    <el-row style="margin-top: 30px; margin-left: 5%; width: 90%">
        <el-col :span="12">
            <el-progress type="dashboard" :percentage="course.exam">
                <template #default="{ percentage }">
                    <span class="percentage-value">{{ percentage }}%</span>
                    <span class="percentage-label">考试占比</span>
                </template>
            </el-progress>
        </el-col>
        <el-col :span="12">
            <el-progress type="dashboard" :percentage="course.pingshi">
                <template #default="{ percentage }">
                    <span class="percentage-value">{{ percentage }}%</span>
                    <span class="percentage-label">平时占比</span>
                </template>
            </el-progress>
        </el-col>
    </el-row>
    <el-row style="margin-left: 5%; margin-top:30px; width: 90%">
        <el-col :span="24">
            <mavon-editor
                ref="md"
                v-model="course.description"
                :subfield="false"
                :defaultOpen="'preview'"
                :toolbarsFlag="false"
                :editable="false"
                :scrollStyle="true"
                :ishljs="true"
            />
        </el-col>

    </el-row>

<!--    <div style="margin-left: 10%; width: 80%">-->
<!--        <el-tabs :tab-position="tabPosition" style="height: 60%" class="demo-tabs">-->
<!--            <el-tab-pane label="课程介绍">-->
<!--                <mavon-editor-->
<!--                    ref="md"-->
<!--                    v-model="course.description"-->
<!--                    :subfield="false"-->
<!--                    :defaultOpen="'preview'"-->
<!--                    :toolbarsFlag="false"-->
<!--                    :editable="false"-->
<!--                    :scrollStyle="true"-->
<!--                    :ishljs="true"-->
<!--                />-->
<!--            </el-tab-pane>-->
<!--            <el-tab-pane label="上课时间地点">-->
<!--                <div style="height: 500px">-->
<!--                    <el-card shadow="never"-->
<!--                             style="width: 80%;margin-left: 10%; height:10%; margin-top: 40px">时间：{{ course.time }}-->
<!--                    </el-card>-->
<!--                    <el-card shadow="never"-->
<!--                             style="width: 80%;margin-left: 10%; height:10%; margin-top: 40px">-->
<!--                        地点：{{ course.position }}-->
<!--                    </el-card>-->
<!--                </div>-->
<!--            </el-tab-pane>-->
<!--        </el-tabs>-->
<!--    </div>-->
</template>

<script>
import {reactive, ref} from "@vue/reactivity";
import STORE from '../../store/index'
import {useRoute} from "vue-router";
import API from "../../axios.js"


export default {
    name: "CourseDescription",
    setup() {
        const tabPosition = ref('bottom')

        let course = reactive({
            id: 1,
            name: "走进超级计算机",
            time: "2022年秋季",
            position: "主M401",
            description: "主要进行超级计算机发展历史、涉及领域、作用意义等信息的介绍，激发同学们学习超级计算机的兴趣。",
            pingshi: 35,
            exam: 75
        })
        //获取当前课程信息
        let route = useRoute();
        console.log(route.query.id)
        getCourse()

        function getCourse() {
            API.post(API.defaults.baseUrl + '/course/course/single/', {id: route.query.id, username: STORE.state.user})
                .then(function (response) {
                    if (response.data.code === 200) {
                        console.log(response.data.data)
                        course.name = response.data.data.name
                        course.id = response.data.data.id
                        course.description = response.data.data.description === null ? "" : response.data.data.description
                        course.exam = response.data.data.exam
                        course.pingshi = response.data.data.pingshi
                        course.position = response.data.data.position
                        course.time = response.data.data.time
                        console.log(course)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        function isSuperUser() {
            return STORE.state.isSuperUser;
        }

        getCourse()

        const courseTime = reactive(course.time)

        return {
            isSuperUser,
            course,
            getCourse,
            tabPosition,
            courseTime
        }
    }
}
</script>

<style scoped>
.demo-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
    height: 100%;
}
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
</style>