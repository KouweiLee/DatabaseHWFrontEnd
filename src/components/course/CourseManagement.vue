<template>
    <h1>CourseManagement</h1>
</template>

<script>
    import {reactive, ref} from "@vue/reactivity";
    import STORE from '../../store/index'
    import {useRoute} from "vue-router";
    import API from "../../axios.js"
    import router from "@/router/router";


    export default {
        name: "CourseManagement",
        setup(){
            let course = reactive({
                id: 1,
                name: "c1",
                isChoosed: false,

            })
            //获取当前课程信息
            function getCourse(){
                API.post(API.defaults.baseUrl + '/course/single/', route.query.id)
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
            return{
                isSuperUser,
                course,
                getCourse,
            }
        }
    }
</script>

<style scoped>

</style>