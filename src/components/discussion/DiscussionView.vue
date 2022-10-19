<template>
    <router-view></router-view>
    <div class="search">
        <el-row>
            <el-input
                    v-model="searchValue"
                    size="medium"
                    style="width: 60%"
                    class="search_input"
                    suffix-icon="Search"
                    clearable
            >
                输入框
            </el-input>
            <el-button size="medium" class="search_button" @click="searchClick(searchValue)">搜索</el-button>
            <el-button size="medium" class="add_button" @click="createNewThread">新建讨论贴</el-button>

            <el-dialog v-model="dialogFormVisible" title="添加主题帖">
                <el-form :model="form" label-width="120px">
                    <el-form-item label="主题">
                        <el-input v-model="newBlogInfo.title"/>
                    </el-form-item>
                    <el-form-item label="选择主题相关元素">
                        <el-select
                                v-model="newBlogInfo.tags"
                                multiple
                                placeholder="Select"
                                style="width: 240px"
                        >
                            <el-option
                                    v-for="item in cTags"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否置顶">
                        <el-switch v-model="newBlogInfo.isTop"/>
                    </el-form-item>
                    <el-form-item label="是否">
                        <el-switch v-model="newBlogInfo.isOver"/>
                    </el-form-item>
                    <el-form-item label="内容">
                        <el-input v-model="newBlogInfo.content" type="textarea"/>
                    </el-form-item>
                </el-form>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="submitNewThread">确认</el-button>
                  </span>
                </template>
            </el-dialog>
        </el-row>
    </div>
    <div>
        <blog-component v-for="blogInfo in blogInfos" :key="blogInfo.id" :blogInfo="blogInfo"
                        @deleteBlog="childDeleteBlog"></blog-component>
        <!--        <discussion-thread v-for="discussionThread in discussionThreads" :key="discussionThread.id"-->
        <!--                           :title="discussionThread.title"></discussion-thread>-->
    </div>
</template>

<script>
    // import DiscussionThread from "@/components/DiscussionThread";
    import {reactive, ref} from "@vue/reactivity";
    import {watch} from"vue"
    // import router from "@/router/router";
    import BlogComponent from "@/components/discussion/blogComponent";
    import API from "../../axios.js"
    import STORE from "@/store";
    // import {watch} from "chokidar";

    // import {getCurrentInstance} from "@vue/runtime-core";

    export default {
        name: "ComponentTwo",
        components: {BlogComponent},
        setup() {
            let blogInfos = reactive([
                // {
                //   id: -1,
                //   isTop: true,
                //   isOver: true,
                //   submitNumber: 100,
                //   replyNumber: 25,
                //   title: "Nan",
                //   url: "404",
                //   content: "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                //       "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                //       "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                //       "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                //       "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja",
                //   tags: ['P7', 'P8'],
                //   name: "Zhang_kg",
                //   time: "2022-10-1",
                //   isLike: false
                // },
                // {
                //   id: -2,
                //   isTop: false,
                //   isOver: true,
                //   submitNumber: 100,
                //   replyNumber: 25,
                //   title: "Nan",
                //   url: "404",
                //   content: "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                //       "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                //       "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                //       "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                //       "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja",
                //   tags: ['P7', 'P8'],
                //   name: "Zhang_kg",
                //   time: "2022-10-1",
                //   isLike: false
                // },
            ])

            function childDeleteBlog() {
                searchClick()
            }

            function getNowDiscussions(content) {
                console.log("get")
                API.post(API.defaults.baseUrl + '/discuss/queryTitle/',
                    JSON.stringify(content)
                ).then(function (response) {
                    console.log(response)
                    while (!(blogInfos.length === 0)) {
                        blogInfos.pop();
                    }
                    let i;
                    for (i = 0; i < response.data.data.length; i++) {
                        blogInfos.push(response.data.data[i])
                    }
                    // blogInfos = response.data.blogInfos
                    console.log(blogInfos)
                })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

            //搜索

            const searchValue = ref("");

            function searchClick(content) {
                if (content == null)
                    getNowDiscussions("")
                else
                    getNowDiscussions(content)

            }

            watch(searchValue.value, (value) => {
                searchClick(value)
            })


            //新建讨论帖

            const dialogFormVisible = ref(false)
            let newBlogInfo = reactive({
                id: 0,
                isTop: false,
                isOver: false,
                submitNumber: 0,
                replyNumber: 0,
                title: "",
                url: "404",
                content: "",
                tags: [],
                name: "",
                time: "2022-10-1",
                isLike: false
            })

            const cTags = [
                {value: 'P1', label: 'P1'}, {value: 'P2', label: 'P2'}, {value: 'P3', label: 'P3'}, {
                    value: 'P4',
                    label: 'P4'
                }, {value: 'P5', label: 'P5'}, {value: 'P6', label: 'P6'}, {value: 'P7', label: 'P7'}
            ]

            function createNewThread() {
                dialogFormVisible.value = true
                // newBlogInfo = newBlogInfoDefault
                console.log("create")
            }

            function submitNewThread() {
                let yy = new Date().getFullYear();
                let mm = new Date().getMonth() + 1;
                let dd = new Date().getDate();
                let hh = new Date().getHours();
                let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
                let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
                newBlogInfo.time = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
                newBlogInfo.name = STORE.state.user

                dialogFormVisible.value = false
                console.log(newBlogInfo)
                API.post(API.defaults.baseUrl + '/discuss/addtitle/',
                    JSON.stringify(newBlogInfo)
                ).then(function (response) {
                    console.log(response);
                })
                    .catch(function (error) {
                        console.log(error);
                    });
                console.log('submit!')
                setTimeout(() => {
                    getNowDiscussions("")
                }, 100);
                // setTimeout( 3000);
                // getNowDiscussions("")

            }

            getNowDiscussions("")
            return {
                searchClick,
                searchValue,
                cTags,
                createNewThread,
                submitNewThread,
                dialogFormVisible,
                blogInfos,
                newBlogInfo,
                // newBlogInfoDefault,
                childDeleteBlog
            }
        }
    }
</script>

<style scoped>
    .el-button--text {
        margin-right: 15px;
    }

    .el-select {
        width: 300px;
    }

    .el-input {
        width: 300px;
    }

    .dialog-footer button:first-child {
        margin-right: 10px;
    }

    .search_input {
        margin-bottom: 30px;
    }

    .search_button {
        margin-left: 80px;
        margin-bottom: 30px;
        float: left;
    }

    .add_button {
        margin-left: 60px;
        margin-bottom: 30px;
        float: left;
    }

    .search {
    }
</style>