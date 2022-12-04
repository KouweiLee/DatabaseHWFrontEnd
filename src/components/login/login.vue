<template>
    <div class="building" style="height: 100%; width: 100%"></div>
    <div class="loginPart">
        <el-tabs v-model="tabName">
            <el-tab-pane label="登录" name="login">
                <el-form
                        label-position="right"
                        label-width="60px"
                        style="max-width: 460px"
                        class="loginForm"
                >
                    <el-form-item label="邮箱：" style="margin-top: 30px">
                        <el-input size="large" v-model="form.username"/>
                    </el-form-item>
                    <el-form-item label="密码：" style="margin-top: 30px">
                        <el-input size="large" type="password" v-model="form.password"/>
                    </el-form-item>

                    <!--                    <el-row>-->
                    <!--                        <el-checkbox-->
                    <!--                                class="checkBox"-->
                    <!--                                v-model="form.isAgree"-->
                    <!--                                label="同意用户使用准则"-->
                    <!--                                name="type"-->
                    <!--                        />-->
                    <!--                    </el-row>-->
                    <el-button
                            v-if="form.isAgree"
                            type="primary" round
                            size="large"
                            @click="login"
                    >
                        登录
                    </el-button>
                </el-form>
            </el-tab-pane>

            <el-tab-pane label="注册" name="register">
                <el-form
                        label-position="right"
                        label-width="100px"
                        style="max-width: 460px"
                        class="loginForm"
                >
                    <el-form-item label="邮箱：" style="margin-top: 30px">
                        <el-input size="large" v-model="registerForm.username"/>
                    </el-form-item>
                    <el-form-item label="密码：">
                        <el-input size="large" type="password" v-model="registerForm.password"/>
                    </el-form-item>
                    <el-form-item label="确认密码：">
                        <el-input
                                size="large"
                                type="password"
                                v-model="registerForm.confirmPassword"
                                @blur="confirmFunc"
                        />
                    </el-form-item>
                    <!--                    <el-form-item label="验证码：">-->
                    <!--                        <el-row>-->
                    <!--                            <el-input-->
                    <!--                                    type="password"-->
                    <!--                                    v-model="registerForm.identifyCode"-->
                    <!--                                    class="inpWidth"-->
                    <!--                            />-->
                    <!--                            <el-button type="primary" @click="getIdentifyCode" plain>-->
                    <!--                                获取验证码-->
                    <!--                            </el-button>-->
                    <!--                        </el-row>-->
                    <!--                    </el-form-item>-->
                    <el-button
                            v-if="registerForm.rAgree"
                            type="primary" round
                            size="large"
                            @click="register"
                    >
                        注册
                    </el-button>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="modify">
                <el-form
                        label-position="right"
                        label-width="100px"
                        style="max-width: 460px"
                        class="loginForm"
                >
                    <el-form-item label="用户名：" style="margin-top: 30px">
                        <el-input size="large" v-model="modifierForm.username"/>
                    </el-form-item>
                    <el-form-item label="原始值：">
                        <el-input size="large" type="password" v-model="modifierForm.pre_password"/>
                    </el-form-item>
                    <el-form-item label="修改后值：">
                        <el-input size="large" type="password" v-model="modifierForm.now_password"/>
                    </el-form-item>
                    <el-button
                            type="primary" round
                            size="large"
                            @click="modify">
                        修改
                    </el-button>
                </el-form>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    import {reactive} from 'vue'
    import {ElMessage} from "element-plus";
    import router from "@/router/router";
    import API from "../../axios.js"
    import {ref} from "@vue/reactivity";
    import STORE from '../../store/index'

    export default {
        name: "LoginView",
        setup() {
            const form = reactive({
                username: "",
                password: "",
                isAgree: true,
            });
            const registerForm = reactive({
                username: "",
                password: "",
                confirmPassword: "",
                identifyCode: "",
                rAgree: true,
            });
            const modifierForm = reactive({
                username: "",
                pre_password: "",
                now_password: ""
            })
            const tabName = ref("login");
            // const reqData = ref(JSON.stringify(form));

            // 方法
            // 登录
            function login() {
                API.post(API.defaults.baseUrl + '/login/login/',
                    JSON.stringify(form)
                ).then(function (response) {
                    console.log(response);
                    if (response.data.code === 200) {
                        STORE.state.user = form.username
                        STORE.state.isSuperUser = response.data.data['isSuperUser']
                        STORE.state.userName = response.data.data['name']
                        STORE.state.token = response.data.data['token']
                        router.push('/home/')
                        ElMessage({
                            message: '登录成功',
                            type: 'success',
                        })
                    } else {
                        ElMessage.error('登录失败，请重试')
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }

            // 注册
            function register() {
                API.post(API.defaults.baseUrl + '/login/register/',
                    JSON.stringify(registerForm)
                ).then(function (response) {
                    console.log(response);
                    if (response.data.code === 200) {
                        ElMessage({
                            message: '注册成功',
                            type: 'success',
                        })
                        tabName.value = 'login'
                    } else {
                        ElMessage.error('注册失败，请重试')
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }

            // 获取验证码
            function getIdentifyCode() {
                // API.get(API.defaults.baseUrl + '/login/changepw/', JSON.stringify(modifierForm))
                //     .then(function (response) {
                //         console.log(response);
                //     })
                //     .catch(function (error) {
                //         console.log(error);
                //     });
                console.log("获取验证码");
            }

            function modify() {
                API.post(API.defaults.baseUrl + '/login/changepw/',
                    JSON.stringify(modifierForm)
                ).then(function (response) {
                    console.log(response.data.code);
                    if (response.data.code === 200) {
                        ElMessage({
                            message: '修改成功',
                            type: 'success',
                        })
                        tabName.value = 'login'
                    } else {
                        ElMessage.error("修改失败");
                    }

                }).catch(function (error) {
                    console.log(error);
                });
            }

            // 确认密码
            // function confirmFunc() {
            //   if (registerForm.confirmPassword !== registerForm.password)
            //     alert("密码与确认密码不一致");
            // }
            const confirmFunc = () => {
                if (registerForm.confirmPassword !== registerForm.password)
                    ElMessage.error("密码与确认密码不一致.");
            };
            return {
                form,
                registerForm,
                modifierForm,
                tabName,
                login,
                register,
                modify,
                getIdentifyCode,
                confirmFunc,
            };
        },
    }
</script>

<style>
    .loginPart {
        position: absolute;
        /*定位方式绝对定位absolute*/
        top: 40%;
        left: 50%;
        /*顶和高同时设置50%实现的是同时水平垂直居中效果*/
        transform: translate(-50%, -50%);
        /*实现块元素百分比下居中*/
        width: 550px;
        padding: 50px;
        background: rgba(255, 255, 255, 1);
        /*背景颜色为黑色，透明度为0.8*/
        box-sizing: border-box;
        /*box-sizing设置盒子模型的解析模式为怪异盒模型，
        将border和padding划归到width范围内*/
        box-shadow: 0px 15px 25px rgba(0, 0, 0, .5);
        /*边框阴影  水平阴影0 垂直阴影15px 模糊25px 颜色黑色透明度0.5*/
        border-radius: 15px;
        font-size: medium;
        /*边框圆角，四个角均为15px*/
    }

    .loginPart h2 {
        margin: 0 0 30px;
        padding: 0;
        color: #fff;
        text-align: center;
        /*文字居中*/
    }

    .loginPart label {
        font-family: "Microsoft YaHei", serif;
        color: black;
        font-size: large;
        padding: 0;
        text-align: center;
        /*文字居中*/
    }

    .loginPart .input {
        position: relative;
    }

    .loginPart button {
        height: 50px;
        width: 100px;
        position: relative;
        font-family: "Microsoft YaHei", serif;
        font-size: 20px;
    }

    .loginPart .inputElement input {
        width: 100%;
        padding: 10px 0;
        font-size: 16px;
        color: #fff;
        letter-spacing: 1px;
        /*字符间的间距1px*/
        margin-bottom: 30px;
        border: none;
        border-bottom: 1px solid #fff;
        outline: none;
        /*outline用于绘制元素周围的线
        outline：none在这里用途是将输入框的边框的线条使其消失*/
        background: transparent;
        /*背景颜色为透明*/
    }


    .building {
        background: url("back.jpg");
        width: 100%;
        height: 100%;
        position: fixed;
        background-size: 100% 100%;
    }

    .el-tabs__nav {
        width: 100%;
        --el-font-family: Helvetica Neue;
        color: black;
        font-size: 20px;
    }

    .el-tabs__item {
        font-size: 20px;
        font-family: "Microsoft YaHei", serif;
    }


</style>