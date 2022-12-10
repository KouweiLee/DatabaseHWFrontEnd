<template>
    <!--after-->
    <el-row>
        <el-col :span="16"></el-col>
        <el-col :span="8">
            <v-text-field label="搜索作业" v-model="search"></v-text-field>
        </el-col>
    </el-row>
    <course-work-list-component v-for="courseWorkInfo in filterTableData" :key="courseWorkInfo.id"
                                :work-info="courseWorkInfo"></course-work-list-component>
    <!--Before-->
<!--    <el-table :data="filterTableData" style="width: 100%">-->
<!--        <el-table-column label="作业名称" >-->
<!--            <template #default="scope">-->
<!--                <span @click="gotoWork(scope.row.id)">{{scope.row.name}}</span>-->
<!--            </template>-->
<!--        </el-table-column>-->
<!--    </el-table>-->
    <el-row v-if="isSuperUser()">
        <el-input v-model="newWorkName" style="width: 30%; margin-left: 10% ;height: 30px; margin-top: 20px"
                  placeholder="请输入新建作业名称">
            <template #prefix>
                <el-icon>
                    <CirclePlus/>
                </el-icon>
            </template>
        </el-input>
        <el-button type="Plain" style=" margin-top: 20px; height: 30px; margin-left: 3%; width: 30%"
                   @click="submitNewWork">
            点击添加作业
        </el-button>
    </el-row>
</template>

<script>
    import {computed, reactive, ref} from "@vue/reactivity";
    import API from "../../axios.js"
    import STORE from '../../store/index'
    import router from "@/router/router";
    import {useRoute} from "vue-router";
    import CourseWorkListComponent from "@/components/course/CourseWorkListComponent";


    export default {

        name: "CourseWork",
        components: {CourseWorkListComponent},
        setup() {
            let data = reactive([
                {
                    id:1,
                    name:123
                }
            ])

            function refresh(){
                getWorks()
                console.log("refresh")
                console.log(data)
            }

            let route = useRoute()
            console.log(route.query.id)


            function getWorks() {
                API.post(API.defaults.baseUrl + '/course/work/all/', {
                    id:route.query.id
                }).then(function (response) {
                    if (response.data.code === 200) {
                        while (!(data.length === 0)) {
                            data.pop();
                        }
                        let i;
                        for (i = 0; i < response.data.data.length; i++) {
                            data.push(response.data.data[i])
                        }
                        console.log(response.data.data)
                    }
                }).catch(function (error) {
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

            //跳转到具体作业页面

            function gotoWork(id) {
              console.log(id)
                router.push({
                    path: '/home/work/description',
                    query: {id}
                })
            }


            let newWorkName = ref();

            function submitNewWork() {
                API.post(API.defaults.baseUrl + '/course/work/addone/', {name: newWorkName.value, class_id:route.query.id})
                    .catch(function (error) {
                        console.log(error);
                    });
                setTimeout(() => {
                    refresh()
                }, 100);
            }

            refresh()
            return {
                filterTableData,
                handleGiveUp,
                handleChoose,
                data,
                refresh,
                getWorks,
                search,
                isSuperUser,
                gotoWork,
                newWorkName,
                submitNewWork
            }
        }
    }
</script>

<style scoped>

</style>