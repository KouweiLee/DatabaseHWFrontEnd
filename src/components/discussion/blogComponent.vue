<template>
    <el-card class="wholeClass" shadow="hover" :body-style="{height: '200px'}">
        <!-- <div class="overallInfo"> -->
        <!--这个是帖子组件的顶栏信息，包括是否置顶、是否关闭、如果没有关闭则显示关注和回复次数-->
        <el-row>
            <el-col :span="3.5" style="justify-content: space-between;">
                <el-tag v-if="myBlogInfo.isTop" shadow="never" class="top-card">
                    <span class="status-card-font">置顶</span></el-tag>
                <el-tag v-if="!myBlogInfo.isTop" shadow="never" class="normal-card">
                    <span class="status-card-font">普通</span></el-tag>
                <el-tag v-if="myBlogInfo.isOver" shadow="never" class="close-card">
                    <span class="status-card-font">已关闭</span></el-tag>
                <el-tag v-if="!myBlogInfo.isOver" shadow="never" class="status-card">
                    <span class="status-card-font">{{myBlogInfo.submitNumber}}关注|{{myBlogInfo.replyNumber}}回复</span>
                </el-tag>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" :icon="Delete" @click="deleteBlog"
                           style="background-color: red;border: 0;height: 25px;float: right;"/>
            </el-col>

        </el-row>
        <!-- </div> -->
        <div>
            <!--帖子的标题信息-->
            <h2 style="text-align: left" @click="gotoDetail(myBlogInfo.id)">{{myBlogInfo.title}}</h2>
        </div>
        <div>
            <!--帖子内容简洁，最长四行-->
            <span class="blogContent">
                {{myBlogInfo.content}}
            </span>
        </div>
        <div style="float: left">
            <!--帖子的标签们-->
            <el-tag v-for="(item, i) in myBlogInfo.tags" :key="i"
                    effect="dark"
                    round
                    style="min-width: 40px; max-width: 70px; margin: 3px; ">{{item}}
            </el-tag>
        </div>
        <div style="clear:both"></div>
        <div>
            <!--帖子发布人+点赞-->
            <span style="text-align: left; float:left;">{{myBlogInfo.name}} {{myBlogInfo.time}}</span>
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
            // id: Number,
            // isTop: assertBoolean,
            // isOver: assertBoolean,
            // submitNumber: {
            //     type: Number,
            //     default: 100
            // },
            // replyNumber: {
            //     type: Number,
            //     default: 25
            // },
            // title: {
            //     type: String,
            //     default: "Nan"
            // },
            // url: {
            //     type: String,
            //     default: "404"
            // },
            // content: {
            //     type: String,
            //     default: "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
            //         "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
            //         "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
            //         "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
            //         "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja"
            // },
            // tags: {
            //     type: Array,
            //     default: () => ['P7', 'P8']
            // },
            // name: {
            //     type: String,
            //     default: "Zhang_kg"
            // },
            // time: {
            //     type: String,
            //     default: "2022-10-1"
            // },
            // isLike: {
            //     type: assertBoolean,
            //     default: false
            // }
            // }
        },
        setup(props, context) {
            const checked = ref(false)

            const myBlogInfo = reactive(props.blogInfo);

            console.log(props.blogInfo)

            const onChange = (status) => {
                checked.value = status
            }   //点赞

            function deleteBlog() {
                console.log(myBlogInfo.id)
                API.post(API.defaults.baseUrl + '/discuss/deletetitle/', JSON.stringify({title_id: myBlogInfo.id}))
                    .then(function (response) {
                        console.log(response);
                        context.emit('deleteBlog')

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

            function gotoDetail(id) {
                console.log(router)
                router.push({
                    path: '/home/c21',
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
        height: 25px;
        background: #db4a3d;
    }

    .normal-card {
        height: 25px;
        background: #6aae56;
    }

    .status-card {
        height: 25px;
        background: #e0e0e0;
    }

    .close-card {
        height: 25px;
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

    a:hover {
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