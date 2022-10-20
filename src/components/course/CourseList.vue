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
                <el-button size="small" @click="handleChoose(scope.$index, scope.row)"
                           v-if="scope.row.isChoosed === false"
                >选课
                </el-button
                >
                <el-button
                        size="small"
                        type="danger"
                        v-if="scope.row.isChoosed"
                        @click="handleGiveUp(scope.$index, scope.row)"
                >退课
                </el-button
                >
            </template>
        </el-table-column>
    </el-table>
    <el-button type="Plain" style=" margin-top: 20px; width: 30%" v-if="isSuperUser()">
        <el-icon>
            <CirclePlus/>
        </el-icon>
        点击添加课程
    </el-button>
</template>

<script>
    import {computed, reactive, ref} from "@vue/reactivity";
    import API from "../../axios.js"
    import STORE from '../../store/index'
    import router from "@/router/router";


    export default {

        name: "CourseList",
        setup() {
            let data = reactive([
                {
                    id: 1,
                    name: "c1",
                    isChoosed: true
                },
                {
                    id: 2,
                    name: "c2",
                    isChoosed: false
                }
            ])

            function getCourses() {
                API.post(API.defaults.baseUrl + '/course/all/')
                    .then(function (response) {
                        if (response.data.code === 200) {
                            data = response.data.data
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
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
            const handleChoose = (index, row) => {
                console.log(index, row)
            }
            const handleGiveUp = (index, row) => {
                console.log(index, row)
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

            return {
                filterTableData,
                handleGiveUp,
                handleChoose,
                data,
                getCourses,
                search,
                isSuperUser,
                gotoCourse
            }
        }
    }
</script>

<style scoped>

</style>