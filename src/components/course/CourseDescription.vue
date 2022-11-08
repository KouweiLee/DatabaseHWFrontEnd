<template>
    <h1>{{course.name}}</h1>
<!--    <el-tag v-for="(item, i) in course.tag" :key="i"-->
<!--            effect="dark"-->
<!--            round-->
<!--            style="min-width: 50px; max-width: 120px; margin: 3px; font-size: 20px">{{item}}-->
<!--    </el-tag>-->
    <el-divider style="margin-left: 20%; width: 60%"/>
    <div style="margin-left: 20%; width: 60%">
        <el-tabs :tab-position="tabPosition" style="height: 60%" class="demo-tabs">
            <el-tab-pane label="课程介绍">
<!--                <div style="height: 500px">{{course.description}}</div>-->
                <mavon-editor
                    ref="md"
                    v-model="course.description"
                    :subfield="false"
                    :defaultOpen="'preview'"
                    :toolbarsFlag="false"
                    :editable="false"
                    :scrollStyle="true"
                    :ishljs="true"
                  />
            </el-tab-pane>
<!--            <el-tab-pane label="课程内容">-->
<!--                <div style="height: 500px">-->
<!--                    <el-card v-for="content in course.content" :key="content" shadow="always"-->
<!--                             style="width: 80%;margin-left: 10%; height:10%; margin-top: 40px">{{content}}-->
<!--                    </el-card>-->
<!--                </div>-->
<!--            </el-tab-pane>-->
            <el-tab-pane label="成绩评定">
                <div style="height: 500px">
                    <div v-for="(grade, i) in course.grade" :key="i"
                         style="height: 100px; margin-top: 30px; width: 80%;margin-left: 10%; height:10%">
                        <div style="margin-bottom: 30px"><span>{{grade.name}}</span></div>
                        <el-progress
                                :text-inside="true"
                                :stroke-width="20"
                                :percentage="grade.percent"
                                status="format"
                        />
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="上课时间地点">
                <div style="height: 500px">
                    <el-card shadow="never"
                             style="width: 80%;margin-left: 10%; height:10%; margin-top: 40px">时间：{{course.time}}
                    </el-card>
                    <el-card shadow="never"
                             style="width: 80%;margin-left: 10%; height:10%; margin-top: 40px">地点：{{course.position}}
                    </el-card>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {reactive, ref} from "@vue/reactivity";
    import STORE from '../../store/index'
    import {useRoute} from "vue-router";
    import API from "../../axios.js"


    export default {
        name: "CourseDescription",
        setup() {
            const tabPosition = ref('bottom')

            let course = reactive({
                id: 1,
                name: "走进超算",
                isChoosed: false,
                teacher: "张三",
                time: "周一上午第三、四节课",
                position: "主楼101",
                description: "从初学者的视角理解超算从初学者的视角理解超算从初学者的视角理解超算从初学者的视角理解超算从初学者的视角理解超算从初学者的视角理解超算从初学者的视角理解超算从初学者的视角理解超算",
                content: ['学1', '学2', '学3'],
                grade: [
                    {
                        percent: 60,
                        name: "考试"
                    },
                    {
                        percent: 40,
                        name: "平时"
                    }
                ]
            })
            //获取当前课程信息
            let route = useRoute();
            console.log(route.query.id)


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

            return {
                isSuperUser,
                course,
                getCourse,
                tabPosition
            }
        }
    }
</script>

<style scoped>
    .demo-tabs > .el-tabs__content {
        padding: 32px;
        color: #6b778c;
        font-size: 32px;
        font-weight: 600;
    }

    .el-tabs--right .el-tabs__content,
    .el-tabs--left .el-tabs__content {
        height: 100%;
    }
</style>