<template>
    <el-row>
        <el-col>
            <el-card>
                <template #header>
                    <div class="title">
                        <span style="font-weight: bold;text-align: left; display: block;font-size: 50px;">{{blogInfo.title}}</span>
                    </div>
                    <div>
                        <span style="height: 20px;display: block"></span>
                    </div>
                    <div style="float: left">
                        <!--帖子的标签们-->
                        <el-tag v-for="(item, i) in blogInfo.tags" :key="i"
                                effect="dark"
                                round
                                style="min-width: 50px; max-width: 120px; margin: 3px; font-size: 20px">{{item}}
                        </el-tag>
                    </div>
                    <span style="height: 20px;display: block;"></span>
                </template>
                <el-row>
                    <el-col>
                        <!--这个里面如果实现话题贴，应该做成一个list-->
                        <el-card style="border: none" shadow="never">
                            <template #header>
                                <el-row>
                                    <!--主贴主要信息-->
                                    <div style="margin: 0 20px 0 10px;">
                                        <el-avatar></el-avatar>
                                    </div>
                                    <span class="name">{{blogInfo.member_name}}({{blogInfo.member_type}})</span>
                                </el-row>
                            </template>
                            <el-row>
                                <!--主贴主要内容-->
                                <div class="markdown_body">
                                    <p>{{blogInfo.content}}</p>
                                </div>
                            </el-row>
                            <el-row>
                                <!--主贴下方的一些功能，包括时间，评论和点赞-->
                                <span style="font-size: 10px; color: gray;margin: auto 20px;">发布于{{blogInfo.time}}</span>
                                <div class="spacer"></div>
                                <el-button type="primary" :icon="Edit" circle/>
                                <el-button type="danger" :icon="Star" circle/>
                                <span style="font-size: 15px;margin: auto 10px;">{{blogInfo.likeNumber}}</span>
                            </el-row>
                            <div v-for="(item, i) in blogInfo.comments" :key="i">
                                <el-divider border-style="dashed"/>
                                <el-row style="margin-left: 10%;margin-right: 10%;">
                                    <!--            <el-divider border-style="dashed" />-->
                                    <el-col>
                                        <!--              <el-divider border-style="dashed" />-->
                                        <el-card shadow="never" style="margin-top: 0;border: none">
                                            <template #header>
                                                <el-row>
                                                    <!--回复主要信息-->
                                                    <div style="margin: 0 20px 0 10px;">
                                                        <el-avatar></el-avatar>
                                                    </div>
                                                    <span class="name">{{item.commentator}}({{item.member_type}})
                      回复: {{item.beCommentator}}</span>
                                                </el-row>
                                            </template>
                                            <el-row>
                                                <!--回复主要内容-->
                                                <div class="markdown_body">
                                                    <p>{{item.content}}</p>
                                                </div>
                                            </el-row>
                                            <el-row>
                                                <!--回复下方的一些功能，包括时间，评论和点赞-->
                                                <span style="font-size: 10px; color: gray;margin: auto 20px;">发布于{{item.time}}</span>
                                                <div class="spacer"></div>
                                                <el-button type="primary" :icon="Edit" circle/>
                                                <el-button type="danger" :icon="Star" circle/>
                                                <span style="font-size: 15px;margin: auto 10px;">{{blogInfo.likeNumber}}</span>
                                            </el-row>
                                        </el-card>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>

</template>

<script>
    import {
        Edit,
        Star,
    } from '@element-plus/icons-vue'
    import {toRefs} from "@vue/reactivity";
    import {reactive} from "vue";
    // import router from "@/router";
    import {useRoute} from "vue-router";
    import API from "../../axios.js"
    export default {
        name: "blogDetailComponent",
        // props: {
        //     title: {
        //         type: String,
        //         default: "asd"
        //     },
        //     tags: {
        //         type: Array,
        //         default: () => ['P7', 'P8']
        //     },
        //     content: {
        //         type: String,
        //         default: "请问为什么"
        //     },
        //     member_name: {
        //         type: String,
        //         default: "李国玮"
        //     },
        //     member_type: {
        //         type: String,
        //         default: "社长"
        //     },
        //     time: {
        //         type: String,
        //         default: "2017-07-25 21:51:54"
        //     },
        //     isLike: {
        //         type: assertBoolean,
        //         default: false
        //     },
        //     likeNumber: {
        //         type: Number,
        //         default: 20
        //     },
        //     isTutor: {
        //         type: assertBoolean,
        //         default: false
        //     },
        //     comments: {
        //         type: Array,
        //         default: () => [{
        //             content: "没有为什么",
        //             time: "2017-07-25 21:51:54",
        //             commentator: "张凯歌",
        //             member_type: "成员",
        //             beCommentator: "李国玮"
        //         },]
        //     }
        // },
        setup() {
            getInfo();
            let route = useRoute();
            console.log(route.query.id)
            const data = reactive({
                Star: Star,
                Edit: Edit
            })
            const dataRef = toRefs(data)
            let blogInfo = reactive({
                title: "asd",
                tags: ['P7', 'P8'],
                content: "请问为什么",
                member_name: "李国玮",
                member_type: "社长",
                time: "2017-07-25 21:51:54",
                isLike: false,
                likeNumber: 20,
                isTutor: false,
                comments: [{
                    content: "没有为什么",
                    time: "2017-07-25 21:51:54",
                    commentator: "张凯歌",
                    member_type: "成员",
                    beCommentator: "李国玮"
                }]
            })
            function getInfo() {
                API.post(API.defaults.baseUrl + '/discuss/queryone/', route.query.id)
                    .then(function (response) {
                        console.log(response);
                        if (response.status === 400) {
                            blogInfo = response.data.data
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            return {
                getInfo,
                blogInfo,
                // data
                ...dataRef
            };
        }
    }

</script>

<style scoped>
    *, :after, :before {
        background-repeat: no-repeat;
        box-sizing: inherit;
    }

    :after, :before {
        text-decoration: inherit;
        vertical-align: inherit;
    }

    /*div {*/
    /*  display: block;*/
    /*}*/
    .name {
        font-size: 15px;
        position: relative;
        top: 25%;
        display: block;
        margin: auto 0;
        text-align: left;

    }

    .markdown_body {
        -webkit-text-size-adjust: 100%;
        line-height: 1.5;
        color: #24292e;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
        Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
        font-size: 16px;
        word-wrap: break-word;
    }

    .markdown_body:after, .markdown_body:before {
        display: table;
        content: "";
    }

    .spacer {
        flex-grow: 1 !important;
    }
</style>