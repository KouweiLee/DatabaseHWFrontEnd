<template>
<!--    <v-main>-->
        <v-card flat class="pa-8">
            <v-avatar
                size="300"
                tile
            >
                <v-img :src="avatar"></v-img>
            </v-avatar>

            <v-divider class="mt-10 mb-10"/>
            <h2>{{ name }}</h2>
            <p class="mt-1 mb-0">
                <v-chip
                    class="mr-2"
                    color="primary"
                    outlined
                    pill>
                    <v-icon left>
                        mdi-account-outline
                    </v-icon>
                    {{ permission }}
                </v-chip>
                <v-chip
                    class="mr-2"
                    color="primary"
                    outlined
                    pill>
                    <v-icon left>
                        mdi-identifier
                    </v-icon>
                    学号：{{ id }}
                </v-chip>
            </p>


            <v-btn
                depressed
                class="mt-4 mr-2"
                color="primary"
                @click="dialog_avatar = true"
            >
                修改头像
            </v-btn>
            <v-dialog
                transition="dialog-bottom-transition"
                max-width="1000"
                persistent
                v-model="dialog_avatar"
            >
                <v-card class="pa-8">
                    <h2>修改头像</h2>
                    <v-form ref="form_avatar">
                        <v-file-input
                            label="头像文件"
                            outlined
                            class="mt-3"
                            v-model="new_avatar"
                            accept=".jpg"
                            show-size
                            prepend-icon="mdi-camera"
                            :rules="[() => !new_avatar ? '头像不能为空' : new_avatar.size < 10 * 1024 * 1024 || '头像大小不能超过 10M！']"
                        ></v-file-input>
                    </v-form>
                    <v-row class="mt-3">
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
                    </v-row>
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
                        <v-btn
                            class="primary mx-5"
                            text
                            @click="change_password"
                        >确定
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            class="mx-5"
                            text
                            @click="dialog_password = false"
                        >关闭
                        </v-btn>
                    </v-row>
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

<script>
import STORE from "@/store";
import router from "@/router/router";

export default {
    name: "UserView",
    data: () => ({
        name: "獭",
        // id: localStorage.getItem("user_id"),
        id: STORE.state.user,
        permission: "普通用户",
        show1: false,
        show2: false,
        show3: false,
        dialog_avatar: false,
        dialog_password: false,

        avatar: "",
        new_avatar: "",

        old_password: "",
        new_password: "",
        check_password: "",
    }),
    methods: {
        logout() {
            router.push('/')
        },
        change_avatar() {

        }
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