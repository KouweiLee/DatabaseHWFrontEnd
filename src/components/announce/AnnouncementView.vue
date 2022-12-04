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
                    <p>{{ item.year }}</p>
                </template>
                <v-card style="width: 480px">
                    <v-card-text>
                        <p style="width: 100%">{{ item.overview }}</p>
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
        <el-dialog v-model="centerDialogVisible" title="新的社团信息" style="width: 60%; height: auto" center>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="社团时期">
                    <el-input v-model="newGroup.year"></el-input>
                </el-form-item>
                <el-form-item label="发展概况">
                    <el-input type="textarea" v-model="newGroup.overview" size="large" rows="15"></el-input>
                </el-form-item>
                <div style="text-align: center;">
                    <!--展示图片-->
                    <el-form-item>
                        <el-row>
                            <el-col v-for="(url, index) in this.allPicList" :key="index" :span="12">
                                <el-checkbox
                                v-model="newGroup.pics"
                                :label="url"
                                :value="url"
                                :key="index"
                                style="display: block; height: 200px;width: 400px"
                                >
                                    <el-image :src="url" style="height: 150px; width: 200px"></el-image>
                                </el-checkbox>
                            </el-col>
                        </el-row>
                    </el-form-item>
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
        <el-dialog v-model="changeDialogVisible" title="修改社团信息" style="width: 60%; height: auto" center>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="社团时期">
                    <el-input v-model="newGroup.year"></el-input>
                </el-form-item>
                <el-form-item label="发展概况">
                    <el-input type="textarea" v-model="newGroup.overview" size="large" rows="15"></el-input>
                </el-form-item>

                <div style="text-align: center;">
                    <el-form-item>
                        <el-row>
                            <el-col v-for="(url, index) in this.allPicList" :key="index" :span="12">
                                <el-checkbox
                                v-model="newGroup.pics"
                                :label="url"
                                :value="url"
                                :key="index"
                                style="display: block; height: 200px;width: 400px"
                                >
                                    <el-image :src="url" style="height: 150px; width: 200px"></el-image>
                                </el-checkbox>
                            </el-col>
                        </el-row>
                    </el-form-item>
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
import {ElMessage} from "element-plus";
import STORE from "@/store";

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
            fileList: [],
            changeDialogVisible: false,
            allPicList: []
        }
    },
    methods: {
        getInfo() {
            console.log(this.items)
            let that = this;
            API.post(API.defaults.baseUrl + '/announce/develop/all/'
            ).then(function (response) {
                console.log("111111")
                console.log(that.items)
                if (response.data.code === 200) {
                    while (!(that.items.length === 0)) {
                        that.items.pop();
                    }
                    let i;
                    console.log(response.data.data.size)
                    for (i = 0; i < response.data.data.length; i++) {
                        that.items.push(response.data.data[i])
                    }
                    console.log(that.items)
                    ElMessage.success("成功获取所有信息")
                }
            }).catch(function (error) {
                ElMessage.error("获取社团信息错误")
                console.log(error);
            });
        },

        getAllPics() {
            let that = this
            API.post(API.defaults.baseUrl + '/login/picture/all/', {
                username: STORE.state.user
            }).then(function (response) {
                console.log("response")
                console.log(response)
                if (response.data.code === 200) {
                    console.log("i am in")
                    while (!(that.allPicList.length === 0)) {
                        that.allPicList.pop();
                    }
                    let i;
                    // console.log(response.data.data)
                    for (i = 0; i < response.data.data.length; i++) {
                        console.log(response.data.data[i])
                        that.allPicList.push(response.data.data[i])
                        console.log("after push")
                    }
                    console.log(that.allPicList)
                }
            }).catch(function (error) {
                console.log(error)
                ElMessage.error("获取" + 123 + "所有照片错误")
            })
        },
        createNewGroup() {


            this.getAllPics()
            this.centerDialogVisible = true
            this.newGroup.year = ""
            this.newGroup.overview = ""
            this.newGroup.pics = []
        },
        submitNewGroup() {
            console.log(this.newGroup)
            API.post(API.defaults.baseUrl + '/announce/develop/add/',
                JSON.stringify(this.newGroup)
            ).then(function (response) {
                if (response.data.code === 200) {
                    ElMessage.success("成功添加社团发展信息")
                } else {
                    ElMessage.error("添加社团发展信息失败，错误码：" + response.data.code)
                }
            }).catch(function (error) {
                ElMessage.error("添加社团发展信息错误")
                console.log(error);
            });
        },
        // submitUpload() {
        //     this.$refs.upload.submit()
        // },
        // handleRemove(file, fileList) {
        //     console.log(file, fileList)
        // },
        // handlePreview(file) {
        //     console.log(file)
        // },
        // handleChange(file, fileList) {
        //     while (this.newGroup.pics.length > 0) {
        //         this.pics.pop()
        //     }
        //     console.log(file, fileList)
        //     for (var i = 0; i < fileList.length; i++) {
        //         console.log("123"+this.fileList[i].url)
        //         this.newGroup.pics.append(fileList[i].url)
        //     }
        // },
        gotoMemberView(item) {
            let id = item.id;
            router.push({
                path: '/home/member',
                query: {id}
            })
        },
        changeGroup(item) {
            this.getAllPics()
            setTimeout(function () {

            }, 2000)
            this.changeDialogVisible = true
            this.newGroup = item
            console.log("allPicListBef " + this.allPicList)


            // let that = this
            // API.post(API.defaults.baseUrl + '/login/picture/all/', {
            //     username: STORE.state.user
            // }).then(function (response) {
            //     console.log("response")
            //     console.log(response)
            //     if (response.data.code === 200) {
            //         console.log("i am in")
            //         while (!(that.allPicList.length === 0)) {
            //             that.allPicList.pop();
            //         }
            //         let i;
            //         // console.log(response.data.data)
            //         for (i = 0; i < 2; i++) {
            //             console.log(response.data.data[i])
            //             that.allPicList.push(response.data.data[i])
            //             console.log("after push")
            //         }
            //         console.log(that.allPicList)
            //     }
            // }).catch(function (error) {
            //     console.log(error)
            //     ElMessage.error("获取" + 123 + "所有照片错误")
            // })
            console.log("!!!!!!!!!!!!!")
            console.log(this.allPicList)
            console.log("!!!!!!!!!!!!!")
        },


        submitChangeGroup() {
            console.log(this.newGroup)
            API.post(API.defaults.baseUrl + '/announce/develop/change/',
                JSON.stringify(this.newGroup)
            ).then(function (response) {
                if (response.data.code === 200) {
                    ElMessage.success("成功修改公告信息")
                } else {
                    ElMessage.error("修改公告信息错误，错误码：" + response.data.code)
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    },
    created: function () {
        this.getInfo()
    }
}
</script>