<template>
    <div style="text-align: center">
        <v-timeline align="start">
            <v-timeline-item
                    v-for="(item, i) in items"
                    :key="i"
                    fill-dot
                    style="width: 37%"
            >
                <template v-slot:opposite>
                    <p>{{item.year}}</p>
                </template>
                <v-card style="width: 480px">
                    <v-card-text>
                        <p style="width: 100%">{{item.overview}}</p>
                        <v-btn
                                :color="'indigo-lighten-1'"
                                variant="outlined"
                                style="margin-top: 30px"
                                @click="gotoMemberView(item)"
                        >
                            点击查看成员信息
                        </v-btn>
                        <v-btn
                                :color="'red-lighten-1'"
                                variant="outlined"
                                style="margin-left: 30%; margin-top: 30px"
                                @click="changeGroup(item)"
                        >
                            修改
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-timeline-item>
        </v-timeline>
        <el-dialog v-model="centerDialogVisible" title="新的社团信息" style="width: 60%; height: 70%" center>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="社团时期">
                    <el-input v-model="newGroup.year"></el-input>
                </el-form-item>
                <el-form-item label="发展概况">
                    <el-input type="textarea" v-model="newGroup.overview" size="large" rows="15"></el-input>
                </el-form-item>
                <div style="text-align: center;">
                    <el-upload
                            class="upload-demo"
                            ref="upload"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="newGroup.pics"
                            :auto-upload="false"
                    >
                        <el-row>
                            <el-button size="medium" type="primary">选取文件</el-button>
                        </el-row>
                        <template #tip>
                            <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
                        </template>
                    </el-upload>
                </div>
                <div style="text-align: center;">
                    <el-form-item>
                        <el-button size="medium" type="primary" @click="submitNewGroup"
                                   style="float:left; margin-left: 35%">提交
                        </el-button>
                        <el-button size="medium" @click="centerDialogVisible=false"
                                   style="float: left; margin-left: 5%">取消
                        </el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-dialog>
        <el-dialog v-model="changeDialogVisible" title="新的社团信息" style="width: 60%; height: 70%" center>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="社团时期">
                    <el-input v-model="newGroup.year"></el-input>
                </el-form-item>
                <el-form-item label="发展概况">
                    <el-input type="textarea" v-model="newGroup.overview" size="large" rows="15"></el-input>
                </el-form-item>
                <div style="text-align: center;">
                    <el-upload
                            class="upload-demo"
                            ref="upload"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="newGroup.pics"
                            :auto-upload="false"
                    >
                        <el-row>
                            <el-button size="medium" type="primary">选取文件</el-button>
                        </el-row>
                        <template #tip>
                            <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
                        </template>
                    </el-upload>
                </div>
                <div style="text-align: center;">
                    <el-form-item>
                        <el-button size="medium" type="primary" @click="submitChangeGroup"
                                   style="float:left; margin-left: 35%">提交
                        </el-button>
                        <el-button size="medium" @click="changeDialogVisible=false"
                                   style="float: left; margin-left: 5%">取消
                        </el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-dialog>
        <el-button size="medium" type="primary" style="margin-left: 0%; margin-top: 40px" @click="createNewGroup()">
            <el-icon>
                <CirclePlus/>
            </el-icon>
            点击新建新的社团历史
        </el-button>
    </div>
</template>

<script>
    import API from "../../axios.js"
    import router from "@/router/router";

    export default {
        name: "AnnouncementView",
        data: function () {
            return {
                items: [
                    {
                        id: '1',
                        year: '时期一',
                        overview: 'A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123',
                        pics: []
                    },
                    {
                        id: '2',
                        year: '时期二',
                        overview: 'A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123',
                        pics: []
                    },
                    {
                        id: '3',
                        year: '时期三',
                        overview: 'A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123',
                        pics: []
                    },
                ],
                centerDialogVisible: false,
                newGroup: {
                    id: '1',
                    year: '时期一',
                    overview: 'A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123',
                    pics: []
                },
                changeDialogVisible: false
            }
        },
        methods: {
            getInfo() {
                console.log(this.items)
                API.post(API.defaults.baseUrl + '/announce/develop/all/')
                    .then(function (response) {
                        if (response.data.code === 200) {
                            while (!(this.items.length === 0)) {
                                this.items.pop();
                            }
                            let i;
                            for (i = 0; i < response.data.data.length; i++) {
                                this.items.push(response.data.data[i])
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            createNewGroup() {
                this.centerDialogVisible = true
                this.newGroup.year = ""
                this.newGroup.overview = ""
                this.pics = []
            },
            submitNewGroup() {
                console.log(this.newGroup)
                API.post(API.defaults.baseUrl + '/announce/develop/add/', JSON.stringify(this.newGroup))
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            submitUpload() {
                this.$refs.upload.submit()
            },
            handleRemove(file, fileList) {
                console.log(file, fileList)
            },
            handlePreview(file) {
                console.log(file)
            },
            gotoMemberView(item) {
                let id = item.id;
                router.push({
                    path: '/home/member',
                    query: {id}
                })
            },
            changeGroup(item){
                this.changeDialogVisible = true
                this.newGroup = item
            },
            submitChangeGroup() {
                console.log(this.newGroup)
                API.post(API.defaults.baseUrl + '/announce/develop/change/', JSON.stringify(this.newGroup))
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        created: function () {
            this.getInfo()
        }
    }
</script>