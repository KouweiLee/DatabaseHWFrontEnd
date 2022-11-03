<template>
    <el-table :data="filterTableData" style="width: 100%">
        <el-table-column label="提交名称">
            <template #default="scope">
                <span>{{scope.row.name}}</span>
            </template>
        </el-table-column>
        <el-table-column label="用户名">
            <template #default="scope">
                <span>{{scope.row.username}}</span>
            </template>
        </el-table-column>
        <el-table-column label="成绩">
            <template #default="scope">
                <span>{{scope.row.score}}</span>
            </template>
        </el-table-column>
        <el-table-column align="right">
            <template #header>
<!--                <el-input v-model="search" size="small" placeholder="Type to search"/>-->
                <el-switch
                v-model="judgeMode"
                size="large"
                active-text="是否开启评分模式"
                />
            </template>
            <template #default="scope">
                <el-input-number :disabled="!judgeMode" v-model="scope.row.score" :min="0" :max="100" @change="handleChange(scope.row.attachment_id, scope.row.score)"/>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import {reactive, ref, computed} from "@vue/reactivity";
    import STORE from '../../store/index'
    import {useRoute} from "vue-router";
    import API from "../../axios.js"

    export default {
        name: "WorkSubmit",
        setup() {
            let data =
                reactive([
                    {
                        attachment_id: 1,
                        username: "李佳禄",
                        name: "submit1",
                        time: "2017-07-25 21:51:54",
                        score: 89
                    },
                    {
                        attachment_id: 2,
                        username: "李佳禄",
                        name: "submit2",
                        time: "2017-07-26 21:51:54",
                        score: 99
                    }
                ])

            //获取当前提交信息
            let route = useRoute();

            function getInfo() {
                API.post(API.defaults.baseUrl + '/course/work/correcting/', {id: route.query.id})
                    .then(function (response) {
                        if (response.data.code === 200) {
                            data = response.data.data.attachments
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

            function isSuperUser() {
                return STORE.state.isSuperUser;
            }

            //表格

            const search = ref('')
            const filterTableData = computed(() =>
                data.filter(
                    (data) =>
                        !search.value ||
                        data.name.toLowerCase().includes(search.value.toLowerCase())
                )
            )

            const judgeMode = ref(false)

            function handleChange(id, score) {
                API.post(API.defaults.baseUrl + '/course/work/score/', {id: id, score: score})
                    .catch(function (error) {
                        console.log(error);
                    });
            }

            return {
                isSuperUser,
                data,
                getInfo,
                search,
                filterTableData,
                judgeMode,
                handleChange
            }
        }
    }

</script>

<style scoped>

</style>