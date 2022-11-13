<template>
    <el-card class="courseComponentClass" shadow="hover">
        <el-row>
            <el-col :span="4">

            </el-col>
            <el-col :span="12" @click="gotoCourse">
                <h2 style="text-align: left;">{{ refCourseInfo.name }}</h2>
            </el-col>
            <el-col :span="4">
                <el-tag v-if="courseInfo.isChoosed" size="large">已选</el-tag>
                <el-tag v-if="courseInfo.isChoosed === false" size="large">未选</el-tag>
            </el-col>
            <el-col :span="4">
                <v-btn
                    v-if="courseInfo.isChoosed === false"
                    @click="handleChoose"
                    color="info" class="checkButtonClass">
                    选课
                </v-btn>
                <v-btn
                    v-if="courseInfo.isChoosed"
                    @click="handleGiveUp"
                    color="error" class="checkButtonClass">
                    退课
                </v-btn>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
import router from "@/router/router";
import {reactive} from "vue";
import STORE from "@/store";
import API from "@/axios";
import {ElMessage} from "element-plus";

export default {
    name: "CourseListComponent",
    props: {
        courseInfo: {
            type: Object,
            default: function () {
                return {
                    id: 1,
                    name: "test class",
                    isChoosed: false
                }
            }
        },
    },
    setup(props, context) {
        const refCourseInfo = reactive(props.courseInfo);

        function handleChoose() {
            let id = refCourseInfo.id
            API.post(API.defaults.baseUrl + '/course/course/choose/',
                {username: STORE.state.user, class_id: id}
            ).catch(function (error) {
                console.log(error);
                ElMessage.error("选课失败")
            })
            refresh()
        }

        function handleGiveUp() {
            let id = refCourseInfo.id
            API.post(API.defaults.baseUrl + '/course/course/quit/', {
                username: STORE.state.user,
                class_id: id
            }).catch(function (error) {
                console.log(error)
                ElMessage.error("退选失败")
            })
            refresh()
        }

        function gotoCourse() {
            let id = refCourseInfo.id
            router.push({
                path: '/home/course/description',
                query: {id}
            })
        }

        function refresh() {
            context.emit("refresh")
        }

        return {
            refCourseInfo,
            handleChoose,
            handleGiveUp,
            gotoCourse,
        }
    }
}
</script>

<style scoped>
.courseComponentClass {
    height: 75px;
}
.checkButtonClass {
    display: flex;
    justify-content: flex-end;
    margin-left: auto;
}
</style>