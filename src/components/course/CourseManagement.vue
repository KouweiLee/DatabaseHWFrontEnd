<template>
  <h1>{{ course.name }}</h1>
  <el-row>
    <span>课程时间</span>

    <el-select v-model="course.time" class="m-2" placeholder="Select" size="large">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
  </el-row>
  <mavon-editor
      v-model="course.description"
      ref="md"
      style="min-height: 600px"
  />

</template>

<script>
import {reactive} from "@vue/reactivity";
import STORE from '../../store/index'
import {useRoute} from "vue-router";
import API from "../../axios.js"
// import router from "@/router/router";


export default {
  name: "CourseManagement",
  setup() {
    let course = reactive({
      id: 1,
      name: "c1",
      time: "",
      position: "",
      description: "# 课程描述\n## 课程主题",
      exam: 0,
      pingshi: 0,
    })
    const options = [
      {
        value: '周一',
        label: '周一',
      },
      {
        value: '周二',
        label: '周二',
      },
      {
        value: '周三',
        label: '周三',


      },
      {
        value: '周四',
        label: '周四',
      },
      {
        value: '周五',
        label: '周五',
      },
      {
        value: '周六',
        label: '周六',
      },
      {
        value: '周日',
        label: '周日',
      },
    ]

    //获取当前课程信息
    function getCourse() {
      API.post(API.defaults.baseUrl + '/course/course/single/', route.query.id)
          .then(function (response) {
            if (response.data.code === 200) {
              course = response.data.data
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    function isSuperUser() {
      return STORE.state.isSuperUser;
    }

    let route = useRoute();
    console.log(route.query.id)
    return {
      isSuperUser,
      course,
      getCourse,
      options
    }
  }
}
</script>

<style scoped>

</style>