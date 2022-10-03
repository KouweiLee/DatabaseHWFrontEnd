<template>
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
            <el-button size="medium" class="add_button" @click="dialogFormVisible = true">新建讨论贴</el-button>

            <el-dialog v-model="dialogFormVisible" title="Shipping address">
                <el-form :model="form">
                    <el-form-item label="Promotion name" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="Zones" :label-width="formLabelWidth">
                        <el-select v-model="form.region" placeholder="Please select a zone">
                            <el-option label="Zone No.1" value="shanghai"/>
                            <el-option label="Zone No.2" value="beijing"/>
                        </el-select>
                    </el-form-item>
                </el-form>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确认</el-button>
                  </span>
                </template>
            </el-dialog>
        </el-row>
    </div>
    <div>
        <blog-component v-for="blogInfo in blogInfos" :key="blogInfo.id" :blogInfo="blogInfo"></blog-component>
<!--        <discussion-thread v-for="discussionThread in discussionThreads" :key="discussionThread.id"-->
<!--                           :title="discussionThread.title"></discussion-thread>-->
    </div>
</template>

<script>
    // import DiscussionThread from "@/components/DiscussionThread";
    import {reactive, ref} from "@vue/reactivity";
    import API from "@/axios";
    import BlogComponent from "@/components/blogComponent";

    export default {
        name: "ComponentTwo",
        components: {BlogComponent, /*DiscussionThread*/},
        setup() {
            const searchValue = ref();
            let discussionThreads = reactive([
                {
                    id: "1",
                    title: "1"
                },
                {
                    id: "2",
                    title: "2"
                },
                {
                    id: "3",
                    title: "3"
                },
            ]);

            const blogInfos = [
                {
                    id:1,
                    isTop:true,
                    isOver:true,
                    submitNumber: 100,
                    replyNumber: 25,
                    title: "Nan",
                    url:"404",
                    content: "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                        "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                        "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                        "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                        "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja",
                    tags: ['P7', 'P8'],
                    name: "Zhang_kg",
                    time: "2022-10-1",
                    isLike:  false
                },
                {
                    id:2,
                    isTop:false,
                    isOver:true,
                    submitNumber: 100,
                    replyNumber: 25,
                    title: "Nan",
                    url:"404",
                    content: "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                        "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                        "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                        "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                        "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja",
                    tags: ['P7', 'P8'],
                    name: "Zhang_kg",
                    time: "2022-10-1",
                    isLike:  false
                },
            ]

            const dialogTableVisible = ref(false)
            const dialogFormVisible = ref(false)
            const formLabelWidth = '140px'


            const form = reactive({
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
            })

            const gridData = [
                {
                    date: '2016-05-02',
                    name: 'John Smith',
                    address: 'No.1518,  Jinshajiang Road, Putuo District',
                },
                {
                    date: '2016-05-04',
                    name: 'John Smith',
                    address: 'No.1518,  Jinshajiang Road, Putuo District',
                },
                {
                    date: '2016-05-01',
                    name: 'John Smith',
                    address: 'No.1518,  Jinshajiang Road, Putuo District',
                },
                {
                    date: '2016-05-03',
                    name: 'John Smith',
                    address: 'No.1518,  Jinshajiang Road, Putuo District',
                },
            ]

            function searchClick(content) {
                getNowDiscussions(content)
            }

            function getNowDiscussions(content) {
                console.log(discussionThreads)
                API.get(API.defaults.baseUrl + '/discuss', {
                    content
                }).then(function (response) {
                    while (!discussionThreads.length == 0) {
                        discussionThreads.pop();
                    }
                    let i;
                    for (i = 0; i < response.data.discussionThreads.length; i++) {
                        discussionThreads.push(response.data.discussionThreads[i])
                    }
                    discussionThreads = response.data.discussionThreads
                    console.log(discussionThreads)
                })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

            function createNewThread(content) {
                console.log(content)
            }

            getNowDiscussions("")
            return {
                searchClick,
                searchValue,
                discussionThreads,
                createNewThread,
                dialogFormVisible,
                dialogTableVisible,
                formLabelWidth,
                form,
                gridData,
                blogInfos
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