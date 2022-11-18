<template>
    <h1>Member</h1>
    <p>{{selected}}</p>
    <v-container fluid>
    <p>{{ selected }}</p>
    <v-checkbox
      v-model="selected"
      label="John"
      value="John"
    ></v-checkbox>
    <v-checkbox
      v-model="selected"
      label="Jacob"
      value="Jacob"
    ></v-checkbox>
  </v-container>
    <!--TODO 这里要添加一个相册。并展示当前年份、具体简介-->
    <el-row>
        <el-col
            v-for="(o, index) in members"
            :key="index"
            :span="8"
        >
            <v-card style="margin: 10%;">
                <v-img :src="o.pic" height="200px" cover></v-img>
                <v-card-title>{{ o.name }}</v-card-title>
                <v-card-actions>
                    <v-btn
                        color="orange-lighten-2"
                        variant="text">个人介绍
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        :icon="o.show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                        @click="o.show = !o.show"
                    ></v-btn>
                </v-card-actions>
                <v-expand-transition>
                    <div v-show="o.show">
                        <v-divider></v-divider>
                        <v-card-text>{{ o.profile }}</v-card-text>
                    </div>
                </v-expand-transition>
            </v-card>
        </el-col>
    </el-row>
    <v-btn @click="changeMemberDialogShow = true">修改成员</v-btn>
    <!--增加成员-->
    <el-dialog v-model="changeMemberDialogShow" title="修改成员">
        <el-form>
            <el-form-item label="调整展示队员">
                <p>{{selectedMembers}}</p>
                <v-container fluid>
                    <v-checkbox
                        v-for="(stu, key) in allMembers"
                        v-model="selectedMembers"
                        :label="stu.name"
                        :value="stu.username"
                        :key="key"
                    ></v-checkbox>
                    <el-checkbox
                        v-for="(stu, key) in allMembers"
                        v-model="selectedMembers"
                        :label="stu.name"
                        :value="stu.username"
                        :key="key"
                    />
                </v-container>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-row>
                <el-col :span="12">
                    <v-btn
                        style="margin: 0 auto"
                        @click="changeMembers"
                        color="info">
                        修改
                    </v-btn>
                </el-col>
                <el-col :span="12">
                    <v-btn
                        style="margin: 0 auto"
                        @click="changeMemberDialogShow = false"
                        color="error">
                        取消
                    </v-btn>
                </el-col>
            </el-row>
        </template>
    </el-dialog>
</template>

<script>
import {reactive} from "vue";
import {useRoute} from "vue-router";
import API from "@/axios";
import {ElMessage} from "element-plus";
import {ref} from "@vue/reactivity";

export default {
    name: "memberView",
    setup() {
        let groupInfo = reactive({
            id: '1',
            year: '时期一',
            overview: 'A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123',
            pics: []
        })
        let selected = reactive(['John'])
        let members = reactive([
            {
                name: "成员姓名",
                profile: "成员简介",
                pic: "成员照片的url1",
                show: false
            },
            {
                name: "成员姓名",
                profile: "成员简介",
                pic: "成员照片的url1",
                show: false
            },
            {
                name: "成员姓名",
                profile: "成员简介",
                pic: "成员照片的url1",
                show: false
            },
            {
                name: "成员姓名",
                profile: "成员简介",
                pic: "成员照片的url1",
                show: false
            },
            {
                name: "成员姓名",
                profile: "成员简介",
                pic: "成员照片的url1",
                show: false
            }
        ])

        // * 存储学号 + 姓名
        let allMembers = reactive([
            {
                username: 20373067,
                name: "Zhang_kg"
            },
            {
                username: 19373354,
                name: "19lllll"
            },
            {
                username: 18554545,
                name: "18/123422"
            },
        ])

        // * 存储学号
        let selectedMembers = reactive([
            20373067, 19373354
        ])

        let changeMemberDialogShow = ref(false)

        let route = useRoute()

        function getGroupInfo() {
            console.log("group id" + route.query.id)
            API.post(API.defaults.baseUrl +
                '/announce/develop/all/'
            ).then(function (response) {
                if (response.data.code === 200) {
                    let i
                    for (i = 0; i < response.data.data.length; i++) {
                        if (response.data.data[i].id === route.query.id) {
                            groupInfo.id = response.data.data[i].id
                            groupInfo.year = response.data.data[i].year
                            groupInfo.overview = response.data.data[i].overview
                            groupInfo.pics = response.data.data[i].pics
                        }
                    }
                } else {
                    ElMessage.error("获取社团信息错误")
                }
            }).catch(function (error) {

                console.log(error)
            })
        }

        function getMemberInfo() {
            // * 获取对应年份所有成员信息
            API.post(API.defaults.baseUrl + '/announce/member/all/', {
                id: route.query.id
            }).then(function (response) {
                if (response.data.code === 200) {
                    while (!(members.length === 0)) {
                        members.pop()
                    }
                    let i;
                    for (i = 0; i < response.data.data.length; i++) {
                        let key = 'show';
                        response.data.data[i][key] = false;
                        members.push(response.data.data[i]);
                    }
                    ElMessage.success("成功获取所有成员信息")
                } else {
                    ElMessage.error("获取成员信息错误码：" + response.data.code);
                }
            }).catch(function (error) {
                ElMessage.error("获取成员信息错误");
                console.log(error);
            })
        }

        function getAllUsers() {
            API.post(API.defaults.baseUrl + '/announce/member/getAllName/'
            ).then(function (response) {
                if (response.data.code === 200) {
                    let i;
                    let memberSet = new Set();
                    for (i = 0; i < members.length; i++) {
                        memberSet.add(members[i].name)
                    }
                    while (selectedMembers.length !== 0) {
                        selectedMembers.pop();
                    }
                    for (i = 0; i < response.data.data['usernames'].length; i++) {
                        allMembers.push({
                            username: response.data.data['usernames'][i],
                            name: response.data.data['names'][i]
                        });
                        if (memberSet.has(response.data.data['names'][i])) {
                            selectedMembers.push(response.data.data['usernames'][i]);
                        }
                    }
                } else {
                    ElMessage.error("获取所有成员错误码" + response.data.code);
                }
            }).catch(function (error) {
                ElMessage.error("获取所有成员错误")
                console.log(error)
            })
        }

        function changeMembers() {
            API.post(API.defaults.baseUrl + '/announce/member/add/', {
                develop_id: route.query.id,
                usernames: selectedMembers
            }).catch(function (error) {
                ElMessage.error("修改成员失败")
                console.log(error)
            })
        }

        function refresh() {
            setTimeout(() => {
                getMemberInfo();
            }, 1000);
        }

        return {
            groupInfo,
            members,
            getMemberInfo,
            getGroupInfo,
            changeMemberDialogShow,
            allMembers,
            selectedMembers,
            getAllUsers,
            changeMembers,
            refresh,
            selected
        }
    }
}
</script>

<style scoped>
.image {
    width: 100%;
    display: block;
}

.time {
    font-size: 12px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
}
</style>