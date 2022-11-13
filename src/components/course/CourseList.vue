<template>
    <el-table :data="filterTableData" style="width: 100%">
        <el-table-column label="课程名称">
            <template #default="scope">
                <span @click="gotoCourse(scope.row.id)">{{scope.row.name}}</span>
            </template>
        </el-table-column>
        <el-table-column label="是否已选">
            <template #default="scope">
                <el-tag v-if="scope.row.isChoosed">已选</el-tag>
                <el-tag v-if="scope.row.isChoosed === false">未选</el-tag>
            </template>
        </el-table-column>
        <el-table-column align="right">
            <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search"/>
            </template>
            <template #default="scope">
                <el-button size="small" @click="handleChoose(scope.row.id)"
                           v-if="scope.row.isChoosed === false"
                >选课
                </el-button
                >
                <el-button
                        size="small"
                        type="danger"
                        v-if="scope.row.isChoosed"
                        @click="handleGiveUp(scope.row.id)"
                >退课
                </el-button
                >
            </template>
        </el-table-column>
    </el-table>


    <el-row>
        <el-col :span="16"></el-col>
        <el-col :span="8">
            <v-text-field label="搜索课程" v-model="search"></v-text-field>
        </el-col>
    </el-row>


    <course-list-component v-for="courseInfo in filterTableData" :key="courseInfo.id" :courseInfo="courseInfo"
        @refresh="refresh"></course-list-component>
    <el-row>
        <el-input v-model="newCourseName" style="width: 30%; margin-left: 10% ;height: 30px; margin-top: 20px"
                  placeholder="请输入新建课程名称">
            <template #prefix>
                <el-icon>
                    <CirclePlus/>
                </el-icon>
            </template>
        </el-input>
        <el-button type="Plain" style=" margin-top: 20px; height: 30px; margin-left: 3%; width: 30%"
                   v-if="isSuperUser()" @click="submitNewCourse">
            点击添加课程
        </el-button>
    </el-row>
</template>

<script>
    import {computed, reactive, ref} from "@vue/reactivity";
    import API from "../../axios.js"
    import STORE from '../../store/index'
    import router from "@/router/router";
    import CourseListComponent from "@/components/course/CourseListComponent";


    export default {

        name: "CourseList",
        components: {CourseListComponent},
        setup() {
            let data = reactive([
                {
                    id: 999999,
                    name: "",
                    isChoosed: true
                },
                {
                    id: 9999999,
                    name: "",
                    isChoosed: false
                }
            ])

            function getCourses() {
                API.post(API.defaults.baseUrl + '/course/course/all/', {username: STORE.state.user})
                    .then(function (response) {
                        console.log(response.data.data)
                        if (response.data.code === 200) {
                            // data = response.data.data
                            while (!(data.length === 0)) {
                                data.pop();
                            }
                            let i;
                            for (i = 0; i < response.data.data.length; i++) {
                                data.push(response.data.data[i])
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                console.log(data)
            }

            function refresh() {
                setTimeout(() => {
                    getCourses()
                }, 100);
            }

            //具体表格区
            const search = ref('')
            const filterTableData = computed(() =>
                data.filter(
                    (data) =>
                        !search.value ||
                        data.name.toLowerCase().includes(search.value.toLowerCase())
                )
            )

            function handleChoose(id) {
                API.post(API.defaults.baseUrl + '/course/course/choose/',
                    {username: STORE.state.user, class_id: id})
                    .catch(function (error) {
                        console.log(error);
                    });
                refresh()
            }

            function handleGiveUp(id) {
                API.post(API.defaults.baseUrl + '/course/course/quit/', {username: STORE.state.user, class_id: id})
                    .catch(function (error) {
                        console.log(error);
                    });
                refresh()
            }

            function isSuperUser() {
                return STORE.state.isSuperUser;
            }

            //跳转到具体课程页面

            function gotoCourse(id) {
                router.push({
                    path: '/home/course/description',
                    query: {id}
                })
            }

            //添加课程
            let newCourseName = ref();

            function submitNewCourse() {
                API.post(API.defaults.baseUrl + '/course/course/addone/', {class_name: newCourseName.value})
                    .catch(function (error) {
                        console.log(error);
                    });
                refresh();
            }

            refresh();

            return {
                data,
                getCourses,
                refresh,
                isSuperUser,
                search,
                filterTableData,
                handleGiveUp,
                handleChoose,
                gotoCourse,
                newCourseName,
                submitNewCourse
            }
        }
    }
</script>

<style scoped>

</style>