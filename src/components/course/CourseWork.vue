<template>
    <el-table :data="filterTableData" style="width: 100%">
        <el-table-column label="作业名称" @click="gotoWork(scope.row.id)">
            <template #default="scope">
                <span >{{scope.row.name}}</span>
            </template>
        </el-table-column>
<!--        <el-table-column label="是否已选">-->
<!--            <template #default="scope">-->
<!--                <el-tag v-if="scope.row.isChoosed">已选</el-tag>-->
<!--                <el-tag v-if="scope.row.isChoosed === false">未选</el-tag>-->
<!--            </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column align="right">-->
<!--            <template #header>-->
<!--                <el-input v-model="search" size="small" placeholder="Type to search"/>-->
<!--            </template>-->
<!--            <template #default="scope">-->
<!--                <el-button size="small" @click="handleChoose(scope.$index, scope.row)"-->
<!--                           v-if="scope.row.isChoosed === false"-->
<!--                >选课-->
<!--                </el-button-->
<!--                >-->
<!--                <el-button-->
<!--                        size="small"-->
<!--                        type="danger"-->
<!--                        v-if="scope.row.isChoosed"-->
<!--                        @click="handleGiveUp(scope.$index, scope.row)"-->
<!--                >退课-->
<!--                </el-button-->
<!--                >-->
<!--            </template>-->
<!--        </el-table-column>-->
    </el-table>
</template>

<script>
    import {computed, reactive, ref} from "@vue/reactivity";
    import API from "../../axios.js"
    import STORE from '../../store/index'
    import router from "@/router/router";


    export default {

        name: "CourseWork",
        setup() {
            let data = reactive([
                {
                    id: 1,
                    name: "c1",
                },
                {
                    id: 2,
                    name: "c2",
                }
            ])

            function getWorks() {
                API.post(API.defaults.baseUrl + '/work/all/')
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

            function gotoWork(id) {
                router.push({
                    path: '/home/course/work/description',
                    query: {id}
                })
            }

            return {
                filterTableData,
                handleGiveUp,
                handleChoose,
                data,
                getWorks,
                search,
                isSuperUser,
                gotoWork
            }
        }
    }
</script>

<style scoped>

</style>