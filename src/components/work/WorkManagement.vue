<template>
    <el-row>
        <h2 style="text-align: left">设置作业名称</h2>
    </el-row>
    <el-row style="margin-top: 5px">
        <v-text-field
            label="作业名称"
            placeholder="Placeholder"
            v-model="work.name"
            variant="outlined"
        ></v-text-field>
    </el-row>
    <el-divider></el-divider>
    <el-row>
        <h2 style="text-align: left">设置作业起始和截止日期</h2>
    </el-row>
    <el-row style="margin-top: 5px">
        <el-date-picker
            v-model="dateSpan"
            type="datetimerange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            value-format="YYYY-MM-DD HH:mm:ss"
        />
    </el-row>
    <el-divider></el-divider>
    <el-row>
        <h2 style="text-align: left">设置作业描述</h2>
    </el-row>
    <el-row style="margin-top: 5px">
        <el-col :span="24">
            <mavon-editor
                v-model="work.content"
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
            @click="changeWork"
            color="info">
            修改
        </v-btn>
        <v-btn
            style="margin: 0 auto"
            @click="deleteWorkDialogShow=true "
            color="error">
            删除
        </v-btn>
    </el-row>
    <el-divider></el-divider>
    <el-divider></el-divider>
    <el-row>
        <el-col :span="12">
            <h2>作业名称：{{ work.name }}</h2>
            <h3>作业起始时间-结束时间</h3>
        </el-col>
        <el-col :span="12">
            <el-row>
                <span>作业名称修改</span>
                <el-input v-model="work.name" style="width: 300px"></el-input>
            </el-row>
            <el-row>
                <el-date-picker
                    v-model="dateSpan"
                    type="datetimerange"
                    range-separator="To"
                    start-placeholder="Start date"
                    end-placeholder="End date"
                    value-format="YYYY-MM-DD HH:mm:ss"
                />
            </el-row>
        </el-col>
    </el-row>
    <el-button type="primary" @click="setDate">Primary</el-button>
    <mavon-editor
        v-model="work.content"
        ref="md"
        style="min-height: 600px"
    />
    <el-row>
        <el-button type="primary" round @click="changeWork" style="margin: 0 auto">修改作业</el-button>
        <el-button type="primary" round @click="deleteWorkDialogShow = true" style="margin: 0 auto">删除作业</el-button>
    </el-row>
    <el-dialog
        v-model="deleteWorkDialogShow"
        title="Warning"
        width="30%"
        align-center
    >
        <span>此操作将会删除作业</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="deleteWorkDialogShow = false">取消</el-button>
                <el-button type="primary" @click="deleteWork">删除</el-button>
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

export default {
    name: "WorkManagement",
    setup() {
        let work = reactive({
            id: 1,
            name: "",
            content: "",
            begin_time: "",
            end_time: ""
        })
        let route = useRoute();
        getWork()
        // const dateSpan = ref([work.begin_time, work.end_time])

        const dateSpan = ref([
          // new Date("2022-11-13 17:00:00"),
          // new Date("2022-11-14 17:00:00")
            work.begin_time, work.end_time
        ])
        console.log(dateSpan.value)
        //获取当前课程信息
        function getWork() {
            API.post(API.defaults.baseUrl + '/course/work/single/', {id: route.query.id})
                .then(function (response) {
                    if (response.data.code === 200) {
                        console.log(response.data.data)
                        work.id = response.data.data.id
                        work.begin_time = response.data.data.begin_time.replace('T', ' ')
                        work.end_time = response.data.data.end_time.replace('T', ' ')
                        console.log(work.begin_time)
                        work.content = response.data.data.content === null? "": response.data.data.content
                        work.name = response.data.data.name
                        dateSpan.value[0] = work.begin_time
                        dateSpan.value[1] = work.end_time
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        function changeWork() {
            API.post(API.defaults.baseUrl + '/course/work/change/', {
                id: route.query.id,
                name: work.name,
                begin_time: dateSpan.value[0],
                end_time: dateSpan.value[1],
                content: work.content
            }).then(function (response) {
                console.log(response)
                ElMessage({
                    message: "修改成功",
                    type: 'success',
                })
            }).catch(function (error) {
                console.log(error)
                ElMessage.error("修改失败")
            })
        }

        let deleteWorkDialogShow = ref(false)

        function deleteWork() {
            deleteWorkDialogShow = false
            API.post(API.defaults.baseUrl + '/course/course/delete', {
                id: route.query.id
            }).then(function (response) {
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

        function isSuperUser() {
            return STORE.state.isSuperUser;
        }

        function setDate() {
            // * 这里只能更改dateSpan中的数据，不能更改原本的work.begin_time的数据
            console.log(work.begin_time)
            console.log(dateSpan.value)
            // console.log(value2.value[0])
        }


        return {
            isSuperUser,
            work,
            getWork,
            dateSpan,
            setDate,
            changeWork,
            deleteWork,
            deleteWorkDialogShow
        }
    }
}
</script>

<style scoped>

</style>