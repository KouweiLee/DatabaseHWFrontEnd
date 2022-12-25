<template>
    <el-row>
        <h2 style="text-align: left">设置课程名称</h2>
    </el-row>
    <el-row style="margin-top: 5px">
        <v-text-field
            label="课程名称"
            placeholder="Placeholder"
            v-model="course.name"
            variant="outlined"
        ></v-text-field>
    </el-row>
    <el-divider></el-divider>
    <el-row>
        <el-col :span="12">
            <h2 style="text-align: left">设置课程地点</h2>
        </el-col>
        <el-col :span="12">
            <h2 style="text-align: left">设置课程时间</h2>
        </el-col>
    </el-row>
    <el-row style="margin-top: 5px">
        <el-col :span="12">
            <v-text-field
                label="课程地点"
                placeholder="Placeholder"
                v-model="course.position"
                variant="outlined"
                style="margin-right: 5px"
            ></v-text-field>
        </el-col>
        <el-col :span="12">
            <v-text-field
                label="课程时间"
                placeholder="Placeholder"
                v-model="course.time"
                variant="outlined"
                style="margin-left: 5px"
            ></v-text-field>
        </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
        <h2 style="text-align: left">修改考试和平时占比</h2>
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
            <el-progress type="dashboard" :percentage="100 - course.exam">
                <template #default="{ percentage }">
                    <span class="percentage-value">{{ percentage }}%</span>
                    <span class="percentage-label">平时占比</span>
                </template>
            </el-progress>
        </el-col>
    </el-row>

    <el-row  style="margin-top: 30px; margin-left: 5%; width: 90%;">
        <el-slider v-model="course.exam" />
    </el-row>
    <el-divider></el-divider>
    <el-row>
        <h2 style="text-align: left">设置课程描述</h2>
    </el-row>
    <el-row style="margin-top: 5px">
        <el-col :span="24">
            <mavon-editor
                v-model="course.description"
                ref="md"
                style="min-height: 600px"
            />
        </el-col>

    </el-row>
    <el-row style="margin-top: 30px">
<!--        <el-button type="primary" round style="margin: 0 auto" @click="changeCourseInfo">修改</el-button>-->
<!--        <el-button type="danger" round style="margin: 0 auto" @click="deleteCourseDialogShow=true">删除</el-button>-->
        <v-btn
            style="margin: 0 auto"
            @click="changeCourseInfo"
            color="info">
            修改
        </v-btn>
        <v-btn
            style="margin: 0 auto"
            @click="deleteCourseDialogShow=true "
            color="error">
            删除
        </v-btn>
    </el-row>
<!--    <el-row>-->
<!--        <el-col :span="12">-->
<!--            <h2>课程名称：{{ course.name }}</h2>-->
<!--            <h3>课程时间：{{ course.time }}</h3>-->
<!--        </el-col>-->
<!--        <el-col :span="12">-->
<!--            <el-row>-->
<!--                <span>课程名称修改</span>-->
<!--                <el-input v-model="course.name" style="width: 300px"></el-input>-->
<!--            </el-row>-->
<!--            <el-row>-->
<!--                <span>课程时间修改</span>-->
<!--                <el-input v-model="course.time" style="width: 300px"></el-input>-->
<!--            </el-row>-->
<!--        </el-col>-->


<!--        &lt;!&ndash;        <el-select v-model="course.time" class="m-2" placeholder="Select" size="large">&ndash;&gt;-->
<!--        &lt;!&ndash;            <el-option&ndash;&gt;-->
<!--        &lt;!&ndash;                v-for="item in options"&ndash;&gt;-->
<!--        &lt;!&ndash;                :key="item.value"&ndash;&gt;-->
<!--        &lt;!&ndash;                :label="item.label"&ndash;&gt;-->
<!--        &lt;!&ndash;                :value="item.value"&ndash;&gt;-->
<!--        &lt;!&ndash;            />&ndash;&gt;-->
<!--        &lt;!&ndash;        </el-select>&ndash;&gt;-->
<!--    </el-row>-->
<!--    <mavon-editor-->
<!--        v-model="course.description"-->
<!--        ref="md"-->
<!--        style="min-height: 600px"-->
<!--    />-->
<!--    <el-row>-->
<!--        <el-button type="primary" round style="margin: 0 auto" @click="changeCourseInfo">修改</el-button>-->
<!--        <el-button type="danger" round style="margin: 0 auto" @click="deleteCourseDialogShow=true">删除</el-button>-->
<!--    </el-row>-->
    <el-dialog
        v-model="deleteCourseDialogShow"
        title="Warning"
        width="30%"
        align-center
    >
        <span>此操作将会删除课程</span>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteCourseDialogShow = false">取消</el-button>
        <el-button type="primary" @click="deleteCourse">删除</el-button>
      </span>
        </template>
    </el-dialog>
</template>

<script>
import {reactive, ref} from "@vue/reactivity";
import STORE from '../../store/index'
import {useRoute} from "vue-router";
import API from "../../axios.js"
import {ElMessage} from "element-plus";

// import router from "@/router/router";


export default {
    name: "CourseManagement",
    setup() {
        let course = reactive({
            id: 1,
            name: "",
            time: "",
            position: "",
            description: "",
            exam: 0,
            pingshi: 0,
        })
        let route = useRoute();

        //获取当前课程信息
        function getCourse() {
            API.post(API.defaults.baseUrl + '/course/course/single/', {
                id: route.query.id, username: STORE.state.user
            })
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

        function changeCourseInfo() {
            API.post(API.defaults.baseUrl + '/course/course/change/',
                {
                    id: route.query.id,
                    name: course.name,
                    time: course.time,
                    position: course.position,
                    description: course.description,
                    exam: course.exam,
                    pingshi: 100 - course.exam
                }
            ).then(function (response) {
                if (response.data.code === 200) {
                    ElMessage({
                        message: '修改成功',
                        type: 'success',
                    })
                } else {
                    ElMessage.error("修改失败")
                }
            }).catch(function (error) {
                console.log("catch error when changing the course info")
                console.log(error)
            })
        }

        let deleteCourseDialogShow = ref(false)

        function deleteCourse() {
            deleteCourseDialogShow = false
            API.post(API.defaults.baseUrl + '/course/course/delete/',
                {
                 id: course.id 
                }
            ).then(function (response) {
                if (response.data.code === 200) {
                    ElMessage({
                        message: "删除成功",
                        type: 'success',
                    })
                } else {
                    ElMessage.error("删除失败")
                }
            }).catch(function (error) {
                console.log("Catch error when trying to delete the course")
                console.log(error)
            })
        }

        getCourse()

        function isSuperUser() {
            return STORE.state.isSuperUser;
        }


        console.log(route.query.id)
        return {
            isSuperUser,
            course,
            getCourse,
            changeCourseInfo,
            deleteCourse,
            deleteCourseDialogShow
            // options
        }
    }
}
</script>

<style scoped>
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