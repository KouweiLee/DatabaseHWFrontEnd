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
        <el-button size="medium" class="search_button" @click="searchClick">搜索</el-button>
        </el-row>
    </div>
    <div>
        <discussion-thread v-for="discussionThread in discussionThreads" :key="discussionThread.id"
                           :title="discussionThread.title"></discussion-thread>
    </div>
</template>

<script>
    import DiscussionThread from "@/components/DiscussionThread";
    import {reactive, ref} from "@vue/reactivity";

    export default {
        name: "ComponentTwo",
        components: {DiscussionThread},
        setup() {
            const searchValue = ref();
            const discussionThreads = reactive([
                {
                    id: "1",
                    title: "1"
                },
                {
                    id: "3",
                    title: "2"
                },
                {
                    id: "3",
                    title: "3"
                },
            ]);
            function searchClick() {

            }
            return {
                searchClick,
                searchValue,
                discussionThreads
            }
        }
    }
</script>

<style scoped>
    .search_input {
        margin-bottom: 30px;
    }

    .search_button {
        margin-left: 80px;
        margin-bottom: 30px;
        float: left;
    }

    .search {
    }
</style>