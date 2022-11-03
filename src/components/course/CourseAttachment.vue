<template>
    <el-table :data="filterTableData" style="width: 100%">
        <el-table-column label="附件名称">
            <template #default="scope">
                <span>{{scope.row.name}}</span>
            </template>
        </el-table-column>
        <el-table-column align="right">
            <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search"/>
            </template>
            <template #default="scope">
                <el-button size="small"
                >
                    <el-icon>
                        <Bottom/>
                    </el-icon>
                </el-button
                >
                <el-button size="small" @click="deleteAttach(scope.row.attachment_id)"
                >
                    <el-icon>
                        <Delete/>
                    </el-icon>
                </el-button
                >
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import {useRoute} from "vue-router";
    import {computed, reactive, ref} from "@vue/reactivity";
    import STORE from "@/store";
    import API from "@/axios";

    export default {
        name: "CourseAttachment",
        setup() {
            let data = reactive([
                {
                    attachment_id: 1,
                    name: "c1",
                    time: "2017-07-25 21:51:54",
                },
                {
                    attachment_id: 2,
                    name: "c2",
                    time: "2017-07-25 21:51:54",
                }
            ])

            const route = useRoute()

            function getAttachments() {
                API.post(API.defaults.baseUrl + '/course/attachment/all/', {id: route.query.id})
                    .then(function (response) {
                        if (response.data.code === 200) {
                            data = response.data.data.attachments
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
            function deleteAttach(id){
                console.log(id)
                API.post(API.defaults.baseUrl + '/course/attachment/delete/', {id: id})
                    .catch(function (error) {
                        console.log(error);
                    });
            }


            function isSuperUser() {
                return STORE.state.isSuperUser;
            }


            getAttachments();

            return {
                getAttachments,
                filterTableData,
                data,
                search,
                deleteAttach,
                isSuperUser,
            }
        }
    }

</script>

<style scoped>

</style>