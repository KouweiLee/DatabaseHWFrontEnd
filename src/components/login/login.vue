<template>
    <div class="layout">
        <el-tabs type="border-card">
            <el-tab-pane label="登录">
                <el-form
                        label-position="right"
                        label-width="60px"
                        style="max-width: 460px"
                        class="loginForm"
                >
                    <el-form-item label="邮箱：">
                        <el-input v-model="form.username" />
                    </el-form-item>
                    <el-form-item label="密码：">
                        <el-input type="password" v-model="form.password" />
                    </el-form-item>

                    <el-row>
                        <el-checkbox
                                class="checkBox"
                                v-model="form.isAgree"
                                label="同意用户使用准则"
                                name="type"
                        />
                    </el-row>
                    <el-button
                            v-if="form.isAgree"
                            type="primary"
                            class="loginBtn"
                            @click="login"
                    >
                        登录
                    </el-button>
                </el-form>
            </el-tab-pane>

            <el-tab-pane label="注册">
                <el-form
                        label-position="right"
                        label-width="100px"
                        style="max-width: 460px"
                        class="loginForm"
                >
                    <el-form-item label="邮箱：">
                        <el-input v-model="registerForm.rUsername" />
                    </el-form-item>
                    <el-form-item label="密码：">
                        <el-input type="password" v-model="registerForm.rPassword" />
                    </el-form-item>
                    <el-form-item label="确认密码：">
                        <el-input
                                type="password"
                                v-model="registerForm.confirmPassword"
                                @blur="confirmFunc"
                        />
                    </el-form-item>
                    <el-form-item label="验证码：">
                        <el-row>
                            <el-input
                                    type="password"
                                    v-model="registerForm.identifyCode"
                                    class="inpWidth"
                            />
                            <el-button type="primary" @click="getIdentifyCode" plain>
                                获取验证码
                            </el-button>
                        </el-row>
                    </el-form-item>

                    <el-row>
                        <el-checkbox
                                class="checkBox"
                                v-model="registerForm.rAgree"
                                label="同意用户使用准则"
                                name="type"
                        />
                    </el-row>
                    <el-button
                            v-if="rAgree"
                            type="primary"
                            class="loginBtn"
                            @click="register"
                    >
                        注册
                    </el-button>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import { reactive } from 'vue'
    import { ElMessage } from "element-plus";
    import router from "@/router";
    import API from "@/axios.js"
    export default {
        name: "LoginView",
        setup() {
            const form = reactive({
                username: "",
                password: "",
                isAgree: 0,
            });
            const registerForm = reactive({
                rUsername: "",
                rPassword: "",
                confirmPassword: "",
                identifyCode: "",
                rAgree: 0,
            });

            // 方法
            // 登录
            function login() {
                console.log(form.valueOf())
                API.get('/user?ID=12345')
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                API({
                    url:'/test',
                    method:'post',
                    data:{
                        form
                    }
                })
                router.push('/home')
            }
            // 注册
            function register() {
                console.log("注册", registerForm);
            }
            // 获取验证码
            function getIdentifyCode() {
                console.log("获取验证码");
            }
            // 确认密码
            // function confirmFunc() {
            //   if (registerForm.confirmPassword !== registerForm.rPassword)
            //     alert("密码与确认密码不一致");
            // }
            const confirmFunc = () => {
                if (registerForm.confirmPassword !== registerForm.rPassword)
                    ElMessage.error("密码与确认密码不一致.");
            };
            return {
                form,
                registerForm,
                login,
                register,
                getIdentifyCode,
                confirmFunc,
            };
        },
    };
</script>

<style scoped>
    .layout {
        position: absolute;
        left: calc(50% - 200px);
        top: 20%;
        width: 400px;
    }
    .loginBtn {
        width: 100px;
    }
    .loginForm {
        text-align: center;
    }
    .checkBox {
        margin-left: 7px;
    }
    .inpWidth {
        width: 165px;
    }
</style>
