<template>
    <el-table :data="filterTableData" style="width: 100%">
        <el-table-column label="课程名称">
            <template #default="scope">
                <span @click="goToCourse">{{scope.row.name}}</span>
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
                <el-button size="small" @click="handleChoose(scope.$index, scope.row)" v-if="scope.row.isChoosed === false"
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
</template>

<script>
    import {computed, reactive, ref} from "@vue/reactivity";

    export default {

        name: "CourseList",
        setup() {


            // let id = 0

            // const dataGenerator = () => ({
            //     id: `random-id-${++id}`,
            //     name: 'Tom',
            //     date: '2020-10-1',
            // })

            let data = reactive([
                {
                    name: "c1",
                    isChoosed: true
                },
                {
                    name: "c2",
                    isChoosed: false
                }
            ])
            //
            // function get() {
            //
            // }

            // const columns = [
            //     {
            //         key: 'name',
            //         title: '课程名称',
            //         dataKey: 'name',
            //         width: 400,
            //         align: 'center',
            //         cellRenderer: ({cellData: name}) => <span>{name}</span>,
            //     },
            //     {
            //         key: 'tag',
            //         title: '是否已选',
            //         dataKey: 'isChoosed',
            //         width: 400,
            //         align: 'center',
            //         cellRenderer: ({cellData: isChoosed}) => <el-tag>{isChoosed === true ? '已选' : '未选'}</el-tag>,
            //     },
            //     {
            //         key: 'operations',
            //         dataKey: 'isChoosed',
            //         title: '操作',
            //         cellRenderer: ({cellData: isChoosed}) => (
            //             <>
            //                 <el-button size="small">{isChoosed === true ? '退选' : '选课'}</el-button>
            //             </>
            //         ),
            //         width: 250,
            //         align: 'center',
            //         flexGrow: 1,
            //     },
            // ]
            //
            //
            // const rowClass = (rowIndex) => {
            //     if (rowIndex % 10 === 5) {
            //         return 'bg-red-100'
            //     } else if (rowIndex % 10 === 0) {
            //         return 'bg-blue-200'
            //     }
            //     return ''
            // }
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

            return {
                filterTableData,
                handleGiveUp,
                handleChoose,
                data,
                search
            }
        }
    }
</script>

<style scoped>

</style>