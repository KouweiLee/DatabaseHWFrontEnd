<template>
  <div class="layout">
    <el-tabs type="border-card" v-model="tabName">
      <el-tab-pane label="登录" name="login">
        <el-form
            label-position="right"
            label-width="60px"
            style="max-width: 460px"
            class="loginForm"
        >
          <el-form-item label="邮箱：">
            <el-input v-model="form.username"/>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input type="password" v-model="form.password"/>
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
          <el-row>
            <el-link @click="tabName='modify'">
              忘记密码
              <el-icon>
                <QuestionFilled/>
              </el-icon>
            </el-link>
          </el-row>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="注册" name="register">
        <el-form
            label-position="right"
            label-width="100px"
            style="max-width: 460px"
            class="loginForm"
        >
          <el-form-item label="邮箱：">
            <el-input v-model="registerForm.username"/>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input type="password" v-model="registerForm.password"/>
          </el-form-item>
          <el-form-item label="确认密码：">
            <el-input
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

          <el-row>
            <el-checkbox
                class="checkBox"
                v-model="registerForm.rAgree"
                label="同意用户使用准则"
                name="type"
            />
          </el-row>
          <el-button
              v-if="registerForm.rAgree"
              type="primary"
              class="loginBtn"
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
          <el-form-item label="用户名：">
            <el-input v-model="modifierForm.username"/>
          </el-form-item>
          <el-form-item label="原始密码：">
            <el-input type="password" v-model="modifierForm.pre_password"/>
          </el-form-item>
          <el-form-item label="修改后密码：">
            <el-input type="password" v-model="modifierForm.now_password"
            />
          </el-form-item>
          <el-button
              type="primary"
              class="loginBtn"
              @click="modify"
          >
            修改密码
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


// import {QuestionFilled} from '@element-plus/icons-vue';
// import { QuestionFilled as IconView } from '@element-plus/icons-vue'

export default {
  name: "LoginView",
  setup() {
    const form = reactive({
      username: "",
      password: "",
      isAgree: 0,
    });
    const registerForm = reactive({
      username: "",
      password: "",
      confirmPassword: "",
      identifyCode: "",
      rAgree: 0,
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
      API.post(API.defaults.baseUrl + '/login/login/', JSON.stringify(form))
          .then(function (response) {
            console.log(response);
            if (response.data.code === 200) {
              STORE.state.user = form.username
              router.push('/home/c2')
              ElMessage({
                message: '登录成功',
                type: 'success',
              })
            } else {
              ElMessage.error('登录失败，请重试')
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    // 注册
    function register() {
      API.post(API.defaults.baseUrl + '/login/register/', JSON.stringify(registerForm))
          .then(function (response) {
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
          })
          .catch(function (error) {
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
      API.post(API.defaults.baseUrl + '/login/changepw/', JSON.stringify(modifierForm))
          .then(function (response) {
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

          })
          .catch(function (error) {
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
};

</script>

<style scoped>
.el-link {
  margin-left: 80%;
}

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
