<template>
    <el-card class="wholeClass" shadow="hover" :body-style="{height: '200px'}">
        <!-- <div class="overallInfo"> -->
        <!--这个是帖子组件的顶栏信息，包括是否置顶、是否关闭、如果没有关闭则显示关注和回复次数-->
        <el-row>
            <el-col :span="3.5" style="justify-content: space-between;">
                <el-tag v-if="myBlogInfo.isTop" shadow="never" class="top-card">
                    <span class="status-card-font" style="margin: 0 4px">置顶</span></el-tag>
                <el-tag v-if="!myBlogInfo.isTop" shadow="never" class="normal-card">
                    <span class="status-card-font" style="margin: 0 4px">普通</span></el-tag>
                <el-tag v-if="myBlogInfo.isOver" shadow="never" class="close-card">
                    <span class="status-card-font" style="margin: 0 4px">已关闭</span></el-tag>
                <el-tag v-if="!myBlogInfo.isOver" shadow="never" class="status-card">
                    <span class="status-card-font" style="margin: 0 4px">{{
                            myBlogInfo.submitNumber
                        }}关注|{{ myBlogInfo.replyNumber }}回复</span>
                </el-tag>
            </el-col>
            <el-col :span="17">
                <el-button type="primary" :icon="Delete" @click="deleteBlog"
                           style="background-color: red;border: 0;height: 20px;width: 30px; float: right;margin: 0 4px"/>
            </el-col>
        </el-row>
        <!-- </div> -->
        <div>
            <!--帖子的标题信息-->
            <h2 style="text-align: left" @click="gotoDetail(myBlogInfo.id)">{{ myBlogInfo.title }}</h2>
        </div>
        <div>
            <!--帖子内容简洁，最长四行-->
            <span class="blogContent">
        {{
                    myBlogInfo.content.toString().replace(/#*.*#/g, '').replace(/[^a-z0-9\u4e00-\u9fa5]/, '').substring(0, 200)
                }}
      </span>
        </div>
        <div style="float: left">
            <!--帖子的标签们-->
            <el-tag v-for="(item, i) in myBlogInfo.tags" :key="i"
                    effect="dark"
                    round
                    style="min-width: 40px; max-width: 70px; margin: 3px; ">{{ item }}
            </el-tag>
        </div>
        <div style="clear:both"></div>
        <div>
            <!--帖子发布人+点赞-->
            <span style="text-align: left; float:left;">{{ myBlogInfo.name }} {{ myBlogInfo.time }}</span>
            <el-check-tag :checked="checked" @change="onChange" style="float: right;height: 20px; width: 50px;">
                Like
            </el-check-tag>
        </div>
        <div style="clear:both"></div>
    </el-card>
</template>

<script>


// import {assertBoolean} from "@babel/core/lib/config/validation/option-assertions";
import {ref} from "vue";
import {reactive} from "@vue/reactivity";
import {Delete} from "@element-plus/icons-vue";
import API from "@/axios";
import router from "@/router/router";
import STORE from "@/store";
import {ElMessage} from "element-plus";
// import { useContext } from "vue";


export default {
    name: "blogComponent",

    // props: ['isTop', 'isOver', 'submitNumber', 'replyNumber',
    // 'title', 'url', 'content', 'tags', 'name', 'time', 'isLike'],
    props: {
        blogInfo: {
            type: Object,
            default: function () {
                return {
                    id: 1,
                    isTop: true,
                    isOver: true,
                    submitNumber: 100,
                    replyNumber: 25,
                    title: "Nan",
                    url: "404",
                    content: "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                        "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                        "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                        "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                        "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja",
                    tags: ['P7', 'P8'],
                    name: "Zhang_kg",
                    time: "2022-10-1",
                    isLike: false
                }
            }
        },
    },
    setup(props, context) {
        const checked = ref(false)

        const myBlogInfo = reactive(props.blogInfo);

        console.log(props.blogInfo)

        const onChange = (status) => {
            checked.value = status
        }   //点赞

        function deleteBlog() {
            console.log(myBlogInfo.name)
            // console.log(STORE.state.user)
            console.log(STORE.state.userName)
            if (STORE.state.userName === myBlogInfo.name) {
                console.log(myBlogInfo.id)
                API.post(API.defaults.baseUrl + '/discuss/deletetitle/',
                    JSON.stringify({title_id: myBlogInfo.id})
                ).then(function (response) {
                    console.log(response);
                    context.emit('deleteBlog')
                }).catch(function (error) {
                    console.log(error);
                });
            } else {
                ElMessage.error("不能删除他人博客")
            }
        }

        function gotoDetail(id) {
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            console.log(router)
            console.log("???????????????????????????")
            router.push({
                path: '/home/blog',
                query: {id}
            })
        }

        return {
            deleteBlog,
            checked,
            onChange,
            myBlogInfo,
            Delete,
            gotoDetail
        }
    }
}
</script>

<style scoped>
* {
    padding: 2px;
    margin: 0;
}

*, :after, :before {
    background-repeat: no-repeat;
    box-sizing: inherit;
}

.wholeClass {
    cursor: pointer;
    width: 30%;
    float: left;
    margin-bottom: 2%;
    /*padding-left: 1.5%;*/
    /*padding-right: 1.5%;*/
    margin-left: 1%;
    margin-right: 1%;
    /*height: 40%;*/
    /*display: block;*/
}

.overallInfo {

}

.top-card {
    background: #db4a3d;
}

.normal-card {
    background: #6aae56;
}

.status-card {
    background: #e0e0e0;
}

.close-card {
    background: #46269d;
}

.status-card-font {
    color: #ffffff;
    font-size: 12px;
    align-items: center;
    align-content: center;
    display: flex;
    max-width: 100%;
    height: 100%;
}

a:link, a:visited, a:active {
    color: #000000;
    text-decoration: none;
}

h2:hover {
    color: #000000;
    text-decoration-line: underline;
}

.blogContent {
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    color: gray;
    height: 60px;
    text-align: left;
    word-wrap: break-word;
    word-break: normal;
}
</style>