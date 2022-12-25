<template>
    <!--    <v-main>-->
    <v-card flat class="pa-8">
        <v-avatar size="300" tile>
            <v-img :src="avatar"></v-img>
        </v-avatar>

        <v-divider class="mt-10 mb-10"/>
        <h2>{{ name }}</h2>
        <p class="mt-1 mb-0">
            <v-chip class="mr-2" color="primary" outlined pill>
                <v-icon left>
                    mdi-account-outline
                </v-icon>
                {{ permission }}
            </v-chip>
            <v-chip class="mr-2" color="primary" outlined pill>
                <v-icon left>
                    mdi-identifier
                </v-icon>
                学号：{{ id }}
            </v-chip>
            <v-chip class="mr-2" color="primary" outlined pill>
                发帖数：{{num}}
            </v-chip>
        </p>

        <div class="d-flex pa-4">
            <v-card style="margin-left: 10%; width: 80%">
                <v-card-title>用户简介</v-card-title>
                <v-textarea clearable label="用户简介"
                            :disabled="!profile_enable"
                            prepend-inner-icon="mdi-comment"
                            v-model="profile"
                            variant="solo"></v-textarea>
                <v-card-actions>
                    <v-btn color="orange lighten-2" @click="profile_enable=!profile_enable" :disabled="profile_enable">
                        修改用户简介
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="green lighten-2" @click="change_profile()" :disabled="!profile_enable">确认修改
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>

        <v-btn depressed class="mt-4 mr-2" color="primary"
               @click="dialog_avatar = true; getAllPics()">
            修改头像
        </v-btn>
        <v-dialog transition="dialog-bottom-transition"
                  max-width="1000" persistent
                  v-model="dialog_avatar">
            <v-card class="pa-8">
                <h2>修改头像</h2>
                <v-form>
                    <v-row>
                        <v-radio-group
                            v-model="new_avatar"
                        >
                            <v-col v-for="(url, index) in allPics" :key="index" style="margin-left: 10%; width: 80%">
                                <v-card>
                                    <v-img :src="url"
                                           max-height="125"
                                           class="grey darken-4">
                                    </v-img>
                                    <v-radio :value="url"></v-radio>
                                </v-card>
                            </v-col>
                        </v-radio-group>
                    </v-row>
                </v-form>

                <el-row class="mt-3">
                    <v-btn
                        class="primary mx-5"
                        text
                        @click="change_avatar"
                    >确定
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="mx-5"
                        text
                        @click="dialog_avatar = false"
                    >关闭
                    </v-btn>
                </el-row>
            </v-card>
        </v-dialog>

        <v-btn depressed class="mt-4 mr-2" color="primary"
               @click="dialog_name = true; new_name = name">
            修改姓名
        </v-btn>
        <v-dialog transition="dialog-bottom-transition"
                  max-width="1000" persistent
                  v-model="dialog_name">
            <v-card class="pa-8">
                <h2>修改姓名</h2>
                <v-form>
                    <v-text-field
                        label="修改姓名"
                        hide-details="auto"
                        v-model="new_name"
                    ></v-text-field>
                </v-form>

                <el-row class="mt-3">
                    <v-btn class="primary mx-5" text @click="change_name"
                    >确定
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="mx-5" text @click="dialog_name = false"
                    >关闭
                    </v-btn>
                </el-row>
            </v-card>
        </v-dialog>

        <v-btn
            depressed
            class="mt-4 mr-2"
            color="primary"
            @click="dialog_password = true"
        >
            修改密码
        </v-btn>
        <v-dialog
            transition="dialog-bottom-transition"
            max-width="1000"
            persistent
            v-model="dialog_password"
        >
            <v-card class="pa-8">
                <h2>修改密码</h2>
                <v-form ref="form_password">
                    <v-text-field
                        label="原始密码"
                        outlined
                        class="mt-3"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="show1 = !show1"
                        :type="show1 ? 'text' : 'password'"
                        v-model="old_password"
                        :rules="[() => !!old_password || '原始密码不能为空']"
                    ></v-text-field>
                    <v-text-field
                        label="新的密码"
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="show2 = !show2"
                        :type="show2 ? 'text' : 'password'"
                        outlined
                        v-model="new_password"
                        :rules="[() => !!new_password || '新的密码不能为空']"
                    ></v-text-field>
                    <v-text-field
                        label="确认密码"
                        :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="show3 = !show3"
                        :type="show3 ? 'text' : 'password'"
                        outlined
                        v-model="check_password"
                        :rules="[() => !check_password ? '重复密码不能为空' : new_password === check_password || '两次密码必须一致']"
                    ></v-text-field>
                </v-form>
                <v-row class="mt-3">
                    <v-btn class="primary mx-5" text @click="change_password"
                    >确定
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="mx-5" text @click="dialog_password = false"
                    >关闭
                    </v-btn>
                </v-row>
            </v-card>
        </v-dialog>

        <v-btn
            depressed
            class="mt-4 mr-2"
            color="primary"
            @click="dialog_change_manager = true; getAllSuperUsers(); getAllUsers();"
            :disabled="!isSuperUser()"
        >
            设置管理员
        </v-btn>
        <v-dialog
            transition="dialog-bottom-transition"
            max-width="1000"
            persistent
            v-model="dialog_change_manager"
        >
            <v-card class="pa-8">
                <v-card-title>设置管理员</v-card-title>
                <v-form>
                    <v-select
                        label="添加新管理员"
                        v-model="newSuperUser"
                        :items="normalUsers"
                        item-title="name"
                        item-value="username"
                        style="margin-left: 10%; width: 80%"
                    ></v-select>
                    <v-select
                        label="撤销管理员"
                        v-model="newNormalUser"
                        :items="superUsers"
                        item-title="name"
                        item-value="username"
                        style="margin-left: 10%; width: 80%"
                    ></v-select>
                    <v-row class="mt-3">
                        <v-btn
                            class="primary mx-5"
                            text
                            @click="addSuperUser()"
                        >添加管理员
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            class="danger mx-5"
                            text
                            @click="removeSuperUser()"
                        >撤销管理员
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            class="mx-5"
                            text
                            @click="dialog_change_manager = false"
                        >关闭
                        </v-btn>
                    </v-row>

                </v-form>
            </v-card>
        </v-dialog>

        <v-btn
            depressed
            class="mt-4 mr-2"
            color="error"
            @click="logout">
            注销
        </v-btn>
    </v-card>
    <!--    </v-main>-->
    <!--    <el-upload-->
    <!--            class="avatar-uploader"-->
    <!--            action="http://localhost:8000/course/work/upload/"-->
    <!--            :show-file-list="false"-->
    <!--            :data="{username:username}"-->
    <!--            :on-success="handleAvatarSuccess"-->
    <!--            :before-upload="beforeAvatarUpload"-->
    <!--    >-->
    <!--        <img v-if="imageUrl" :src="imageUrl" class="avatar"/>-->
    <!--        <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
    <!--    </el-upload>-->
</template>


<script>
import STORE from "@/store";
import router from "@/router/router";
import API from "@/axios";
import {ElMessage} from "element-plus";

export default {
    name: "UserView",
    data: () => ({
        name: STORE.state.userName,
        // id: localStorage.getItem("user_id"),
        id: STORE.state.user,
        permission: STORE.state.isSuperUser ? "管理员" : "普通用户",
        num: STORE.state.num,
        show1: false,
        show2: false,
        show3: false,
        dialog_avatar: false,
        dialog_password: false,

        dialog_name: false,
        new_name: "",

        avatar: "",
        new_avatar: "",

        profile: "",
        profile_enable: false,


        old_password: "",
        new_password: "",
        check_password: "",
        allPics: [],

        dialog_change_manager: false,
        managers: [],
        allMembers: [{
            username: 999,
            name: "ZZZ"
        },],
        superUserIDs: [],
        superUsers: [{
            username: 999,
            name: "ZZZ"
        },],
        normalUsers: [{
            username: 999,
            name: "ZZZ"
        },],
        newSuperUser: 999,
        newNormalUser: 999,
    }),
    methods: {
        logout() {
            router.push('/')
        },
        getUserInfo() {
            this.get_profile()
            this.get_photo()
        },
        get_profile() {
            console.log("Get User profile")
            let that = this
            API.post(API.defaults.baseUrl + '/login/user/getprofile/', {
                username: STORE.state.user
            }).then(function (response) {
                if (response.data.code === 200) {
                    ElMessage.success("获取用户描述成功")
                    that.profile = response.data.data
                } else {
                    ElMessage.error("获取用户简介失败，错误码：" + response.data.code)
                }
            }).catch(function (error) {
                console.log(error)
                ElMessage.error("获取用户简介错误")
            })
        },
        get_photo() {
            console.log("Get user avatar")
            let that = this
            API.post(API.defaults.baseUrl + '/login/user/getphoto/', {
                username: STORE.state.user
            }).then(function (response) {
                if (response.data.code === 200) {
                    ElMessage.success("获取用户头像成功")
                    that.avatar = response.data.data
                } else {
                    ElMessage.error("获取用户头像失败，错误码：" + response.data.code)
                }
            })
        },
        getAllPics() {
            let that = this
            API.post(API.defaults.baseUrl + '/login/picture/all/', {
                username: STORE.state.user
            }).then(function (response) {
                console.log("get all pics response")
                console.log(response)
                if (response.data.code === 200) {
                    ElMessage.success("获取" + STORE.state.user + "用户相册成功")
                    while (!(that.allPics.length === 0)) {
                        that.allPics.pop();
                    }
                    let i;
                    for (i = 0; i < response.data.data.length; i++) {
                        that.allPics.push(response.data.data[i])
                    }
                    console.log(that.allPics)
                } else {
                    ElMessage.success("获取" + STORE.state.user + "用户相册失败，错误码：" +
                        response.data.code)
                }
            }).catch(function (error) {
                console.log(error)
                ElMessage.error("获取" + STORE.state.user + "用户相册错误")
            })
        },
        getAllSuperUsers() {
            let that = this
            API.post(API.defaults.baseUrl + '/login/getSuperUsers/'
            ).then(function (response) {
                console.log("all super users")
                console.log(response)
                if (response.data.code === 200) {
                    ElMessage.success("获取所有管理员成功")
                    while (!(that.superUserIDs.length === 0)) {
                        that.superUserIDs.pop()
                    }
                    let i;
                    for (i = 0; i < response.data.data.length; i++) {
                        that.superUserIDs.push(response.data.data[i])
                    }
                } else {
                    ElMessage.error("所有SuperUser失败，错误码")
                }
            }).catch(function (error) {
                ElMessage.error("获取所有管理员错误")
                console.log(error)
            })
        },
        getAllUsers() {
            let that = this
            API.post(API.defaults.baseUrl + '/announce/member/getAllName/'
            ).then(function (response) {
                that.newSuperUser = null
                that.newNormalUser = null
                if (response.data.code === 200) {
                    let i;
                    let superUserSet = new Set();
                    for (i = 0; i < that.superUserIDs.length; i++) {
                        superUserSet.add(that.superUserIDs[i])
                    }
                    while (that.allMembers.length !== 0) {
                        that.allMembers.pop()
                    }
                    while (that.superUsers.length !== 0) {
                        that.superUsers.pop()
                    }
                    while (that.normalUsers.length !== 0) {
                        that.normalUsers.pop()
                    }
                    for (i = 0; i < response.data.data['usernames'].length; i++) {
                        that.allMembers.push({
                            username: response.data.data['usernames'][i],
                            name: response.data.data['names'][i]
                        })
                        if (superUserSet.has(response.data.data['usernames'][i])) {
                            that.superUsers.push({
                                username: response.data.data['usernames'][i],
                                name: response.data.data['names'][i]
                            })
                        } else {
                            that.normalUsers.push({
                                username: response.data.data['usernames'][i],
                                name: response.data.data['names'][i]
                            })
                        }
                    }
                    console.log(that.allMembers)
                    console.log(that.superUsers)
                    console.log(that.normalUsers)
                }
            })
        },
        removeSuperUser() {
            if (this.newNormalUser === STORE.state.user) {
                ElMessage.error("不能调整自己的权限")
            } else {
                let that = this
                API.post(API.defaults.baseUrl + '/login/user/changeSuper/', {
                    username: that.newNormalUser,
                    isSuperUser: false
                }).then(function (response) {
                    if (response.data.code === 200) {
                        ElMessage.success("撤销管理员成功")
                    } else {
                        ElMessage.error("撤销管理员失败")
                    }
                }).catch(function (error) {
                    console.log(error)
                    ElMessage.error("撤销管理员错误")
                })
            }
        },
        addSuperUser() {
            console.log(this.newSuperUser)
            if (this.newSuperUser === STORE.state.user) {
                ElMessage.error("不能调整自己的权限")
            } else {
                let that = this
                API.post(API.defaults.baseUrl + '/login/user/changeSuper/', {
                    username: that.newSuperUser,
                    isSuperUser: true
                }).then(function (response) {
                    if (response.data.code === 200) {
                        ElMessage.success("添加管理员成功")
                    } else {
                        ElMessage.error("添加管理员失败")
                    }
                }).catch(function (error) {
                    console.log(error)
                    ElMessage.error("添加管理员错误")
                })
            }
        },
        change_name() {
            let that = this
            API.post(API.defaults.baseUrl + '/login/user/changeName/', {
                username: STORE.state.user,
                name: that.new_name
            }).then(function (response) {
                if (response.data.code === 200) {
                    ElMessage.success("修改用户名称成功")
                    that.name = that.new_name
                    STORE.state.userName = that.new_name
                } else {
                    ElMessage.error("修改用户名称失败，错误码：" + response.data.code)
                }
            }).catch(function (error) {
                console.log(error)
                ElMessage.error("修改用户名称错误")
            })
        },
        change_avatar() {
            let that = this
            API.post(API.defaults.baseUrl + '/login/user/setphoto/', {
                username: STORE.state.user,
                photo: that.new_avatar
            }).then(function (response) {
                if (response.data.code === 200) {
                    ElMessage.success("修改用户头像成功")
                    that.avatar = that.new_avatar
                } else {
                    ElMessage.error("修改用户头像失败，错误码：" + response.data.code)
                }
            }).catch(function (error) {
                console.log(error)
                ElMessage.error("修改用户头像错误")
            })
        },
        change_profile() {
            let that = this
            API.post(API.defaults.baseUrl + '/login/user/changeProfile/', {
                username: STORE.state.user,
                profile: that.profile
            }).then(function (response) {
                if (response.data.code === 200) {
                    ElMessage.success("修改用户描述成功")
                    that.profile_enable = false
                } else {
                    ElMessage.error("修改用户描述失败，错误码：" + response.data.code)
                }
            }).catch(function (error) {
                ElMessage.error("修改用户描述错误")
                console.log(error)
            })
        },
        change_password() {
            let that = this
            API.post(API.defaults.baseUrl + '/login/changepw/', {
                username: STORE.state.user,
                pre_password: that.old_password,
                now_password: that.new_password
            }).then(function (response) {
                console.log(response.data.code);
                if (response.data.code === 200) {
                    ElMessage({
                        message: '修改成功',
                        type: 'success',
                    })
                } else {
                    ElMessage.error("修改失败");
                }
            }).catch(function (error) {
                console.log(error);
                ElMessage.error("修改错误");
            });
        },
        isSuperUser() {
            return STORE.state.isSuperUser;
        },
        refresh() {
            // abc
            setTimeout(() => {
                this.getUserInfo()
            }, 100);
        }
    },
    created() {
        this.getUserInfo()
    }
    // methods: {
    //     change_avatar() {
    //         if (!this.$refs.form_avatar.validate()) return
    //         let data = new FormData()
    //         data.append("user_id", STORE.state.user)
    //         data.append("avatar", this.new_avatar)
    //
    //         this.post_with_snackbar('/modify_avatar', data, () => {
    //             this.new_avatar = false
    //             this.$refs.form_avatar.resetValidation()
    //             this.dialog_avatar = false
    //             this.avatar = this.url + "/MikeOJPictures/avatar/" + localStorage.getItem("user_id") + ".jpg"
    //             this.$root.$emit('snackbar', "green", "修改完成，刷新后查看新头像", "mdi-check-circle")
    //         })
    //     },
    //     change_password() {
    //         if (!this.$refs.form_password.validate()) return
    //         let data = {
    //             user_id: localStorage.getItem("user_id"),
    //             old_password: this.old_password,
    //             new_password: this.new_password
    //         }
    //         this.post_with_snackbar('/modify_password', data, () => {
    //             this.old_password = this.old_password = this.check_password = "";
    //             this.$refs.form_password.resetValidation()
    //             this.dialog_password = false
    //             this.$root.$emit('snackbar', "green", "修改完成！", "mdi-check-circle")
    //         })
    //     }
    // },
    // mounted() {
    //     let data = {
    //         user_id: localStorage.getItem("user_id"),
    //     }
    //     API.post('/query_profile', data, (response) => {
    //         this.name = response.data.data.user_name
    //         if (response.data.data.avatar.toString() === "1") this.avatar = this.url + "/MikeOJPictures/avatar/" + localStorage.getItem("user_id") + ".jpg"
    //         else this.avatar = require("../image/data-center.png")
    //         if (response.data.data.permission.toString() === "1") this.permission = "超级管理员"
    //     })
    //     document.title = "账户信息"
    // }
}
</script>

<style scoped>

</style>

<!--<script>-->

<!--import STORE from "@/store";-->

<!--export default {-->
<!--    name: "UserView",-->
<!--    data() {-->
<!--        return {-->
<!--            imageUrl: '',-->
<!--            username: '',-->
<!--        }-->
<!--    },-->
<!--    methods: {-->
<!--        getUserName() {-->
<!--            return STORE.state.user-->
<!--        },-->
<!--        handleAvatarSuccess(res, file) {-->
<!--            this.imageUrl = URL.createObjectURL(file.raw)-->
<!--        },-->
<!--        beforeAvatarUpload(file) {-->
<!--            this.username = STORE.state.user-->
<!--            console.log(this.username)-->
<!--            const isJPG = file.type === 'image/jpeg'-->
<!--            const isLt2M = file.size / 1024 / 1024 < 2-->

<!--            if (!isJPG) {-->
<!--                this.$message.error('上传头像图片只能是 JPG 格式!')-->
<!--            }-->
<!--            if (!isLt2M) {-->
<!--                this.$message.error('上传头像图片大小不能超过 2MB!')-->
<!--            }-->
<!--            return isJPG && isLt2M-->
<!--        },-->
<!--    },-->

<!--    setup() {-->

<!--    }-->
<!--}-->
<!--</script>-->
<!--<style>-->
<!--.avatar-uploader .el-upload {-->
<!--    border: 1px dashed #d9d9d9;-->
<!--    border-radius: 6px;-->
<!--    cursor: pointer;-->
<!--    position: relative;-->
<!--    overflow: hidden;-->
<!--}-->

<!--.avatar-uploader .el-upload:hover {-->
<!--    border-color: #409eff;-->
<!--}-->

<!--.avatar-uploader-icon {-->
<!--    font-size: 28px;-->
<!--    color: #8c939d;-->
<!--    width: 178px;-->
<!--    height: 178px;-->
<!--    line-height: 178px;-->
<!--    text-align: center;-->
<!--}-->

<!--.avatar {-->
<!--    width: 178px;-->
<!--    height: 178px;-->
<!--    display: block;-->
<!--}-->
<!--</style>-->