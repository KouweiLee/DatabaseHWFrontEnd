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
                <el-button size="small" @click="download(scope.row.attachment_id)">
                    <el-icon>
                        <Bottom/>
                    </el-icon>
                </el-button>
                <el-button size="small" @click="deleteAttach(scope.row.attachment_id)" v-if="isSuperUser">
                    <el-icon>
                        <Delete/>
                    </el-icon>
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-row style="text-align: center" v-if="isSuperUser">
<!--        <el-upload-->
<!--                class="upload-demo"-->
<!--                ref="upload"-->
<!--                action="http://localhost:8000/course/attachment/upload/"-->
<!--                :on-preview="handlePreview"-->
<!--                :on-remove="handleRemove"-->
<!--                :file-list="fileList"-->
<!--                :auto-upload="false"-->
<!--                style="margin-left: 45%; margin-top: 20px"-->
<!--        >-->
<!--            <template #trigger>-->
<!--                <el-button size="medium" type="default">选取文件</el-button>-->
<!--            </template>-->
<!--            <el-button-->
<!--                    style="margin-left: 10px;"-->
<!--                    size="medium"-->
<!--                    type="primary"-->
<!--                    @click="submitUpload"-->
<!--            >上传附件到服务器</el-button-->
<!--            >-->
<!--            <template #tip>-->
<!--                <div class="el-upload__tip">文件大小不超过 500kb</div>-->
<!--            </template>-->
<!--        </el-upload>-->
            <el-upload
                    style="margin-left: 45%; margin-top: 30px"
                    class="upload-demo"
                    drag
                    action="http://localhost:8000/course/attachment/upload/"
                    multiple
                    :data="{class_id:id}"
                    :on-sucess="uploadSuccess"
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <template #tip>
                    <div class="el-upload__tip">不超过 500kb</div>
                </template>
            </el-upload>
    </el-row>
</template>

<script>
    import {useRoute} from "vue-router";
    import {computed, reactive, ref} from "@vue/reactivity";
    import STORE from "@/store";
    import API from "@/axios";

    export default {
        name: "CourseAttachment",
        methods:{
            submitUpload() {
                this.$refs.upload.submit()
            },
        },
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

            function refresh() {
                getAttachments()
            }

            const route = useRoute()
                    let id = route.query.id


            function getAttachments() {
                API.post(API.defaults.baseUrl + '/course/attachment/all/', {id: route.query.id})
                    .then(function (response) {
                        if (response.data.code === 200) {
                            while (!(data.length === 0)) {
                                data.pop();
                            }
                            let i;
                            for (i = 0; i < response.data.data.attachments.length; i++) {
                                data.push(response.data.data.attachments[i])
                            }
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
            //下载
            function download(id) {
                let postUrl= "http://localhost:8000/course/attachment/downloadOne/"
                let params = {
                    id: id,
                }
                // console.log("下载参数",params)
                downloadFile(postUrl,params)
            }
            function downloadFile(url, options = {}){
                return new Promise((resolve, reject) => {
                    // console.log(`${url} 请求数据，参数=>`, JSON.stringify(options))
                    // axios.defaults.headers['content-type'] = 'application/json;charset=UTF-8'
                    API({
                        method: 'post',
                        url: url, // 请求地址
                        data: options, // 参数
                        responseType: 'blob' // 表明返回服务器返回的数据类型
                    }).then(
                        response => {
                            // console.log("下载响应",response)
                            resolve(response.data)
                            let blob = new Blob([response.data], {
                                type: 'application/vnd.ms-excel'
                            })
                            // console.log(blob)
                            // let fileName = Date.parse(new Date()) + '.xlsx'
                            // 切割出文件名
                            let fileNameEncode = response.headers['content-disposition'].split("filename=")[1];
                            // 解码
                            let fileName = decodeURIComponent(fileNameEncode)
                            // console.log("fileName",fileName)
                            if (window.navigator.msSaveOrOpenBlob) {
                                // console.log(2)
                                navigator.msSaveBlob(blob, fileName)
                            } else {
                                // console.log(3)
                                let link = document.createElement('a');
                                link.href = window.URL.createObjectURL(blob)
                                link.download = fileName
                                link.click()
                                //释放内存
                                window.URL.revokeObjectURL(link.href)
                            }
                        },
                        err => {
                            reject(err)
                        }
                    )
                })
            }
            //upload
            function uploadSuccess() {
                setTimeout(() => {
                    refresh()
                }, 100);
            }
            function handleRemove(file, fileList) {
                console.log(file, fileList)
            }
            function handlePreview(file) {
                console.log(file)
            }
            const fileList = reactive( [

            ])
            function deleteAttach(id){
                console.log(id)
                API.post(API.defaults.baseUrl + '/course/attachment/delete/', {id: id})
                    .catch(function (error) {
                        console.log(error);
                    });
                setTimeout(() => {
                    refresh()
                }, 100);
            }


            function isSuperUser() {
                return STORE.state.isSuperUser;
            }


            refresh()

            return {
                getAttachments,
                filterTableData,
                data,
                search,
                download,
                downloadFile,
                fileList,
                uploadSuccess,
                handlePreview,
                handleRemove,
                deleteAttach,
                isSuperUser,
                id
            }
        }
    }

</script>

<style scoped>

</style>