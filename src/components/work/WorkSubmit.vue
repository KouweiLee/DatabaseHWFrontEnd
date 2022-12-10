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
        <el-table-column label="提交时间">
        <template #default="scope">
            <span>{{scope.row.time}}</span>
        </template>
    </el-table-column>
        <el-table-column label="成绩">
            <template #default="scope">
                <span>{{scope.row.score}}</span>
            </template>
        </el-table-column>
        <el-table-column align="right" label="下载作业附件">
            <template #default="scope">
                <el-button size="small" @click="download(scope.row.attachment_id)"
                >
                    <el-icon>
                        <Bottom/>
                    </el-icon>
                </el-button
                >
            </template>
        </el-table-column>
        <el-table-column align="right" style="width: 70px;" v-if="isSuperUser">
            <template #default="scope">
                <el-button size="small" @click="deleteSubmit(scope.row.attachment_id)"
                >
                    <el-icon>
                        <Delete/>
                    </el-icon>
                </el-button
                >
            </template>
        </el-table-column>
        <el-table-column align="right" v-if="isSuperUser">
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
                :data="{username: username, homework_id: id}"
                action="http://localhost:8000/course/work/upload/"
                multiple
                :on-sucess="uploadSuccess"
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <template #tip>
                <div class="el-upload__tip">在此处上传作业附件</div>
            </template>
        </el-upload>
    </el-row>
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
            function refresh(){
                getInfo()
            }

            //获取当前提交信息
            let route = useRoute();
            let id = route.query.id
            let username = STORE.state.user

            function getInfo() {
              console.log(route.query.id)
                API.post(API.defaults.baseUrl + '/course/work/correcting/', {id: route.query.id})
                    .then(function (response) {
                        while (!(data.length === 0)) {
                            data.pop();
                        }
                        let i;
                        for (i = 0; i < response.data.data.attachments.length; i++) {
                            data.push(response.data.data.attachments[i])
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
                refresh()
            }

            function deleteSubmit(id){
                console.log(id)
                API.post(API.defaults.baseUrl + '/course/work/deleteRecord/', {id: id})
                    .catch(function (error) {
                        console.log(error);
                    });
                refresh()
            }

            //下载
            function download(id) {
                let postUrl= "http://localhost:8000/course/work/downloadOne/"
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
            function uploadSuccess() {
                refresh()
            }
            refresh()
            return {
                id,
                username,
                isSuperUser,
                data,
                refresh,
                getInfo,
                search,
                filterTableData,
                judgeMode,
                handleChange,
                deleteSubmit,
                downloadFile,
                download,
                uploadSuccess
            }
        }
    }

</script>

<style scoped>

</style>