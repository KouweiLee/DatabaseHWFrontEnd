<template>

  <el-dialog v-model="dialogFormVisible" title="增加评论" style="width: 800px">
<!--    <v-md-editor min-height="400px" v-model="addCommentForm.content"></v-md-editor>-->
    <mavon-editor v-model="addCommentForm.content" ref="md" style="min-height: 600px"/>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addComment">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>


  <el-row>
    <el-col>
      <el-card>
        <template #header>
          <div class="title">
            <span
                style="font-weight: bold;text-align: left; display: block;font-size: 50px;">{{ blogInfo.title }}</span>
          </div>
          <div>
            <span style="height: 20px;display: block"></span>
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
                  <span class="name">{{ blogInfo.member_name }}({{ blogInfo.member_type }})</span>
                </el-row>
              </template>
              <!--主贴主要内容-->
<!--              <v-md-preview :text="blogInfo.content"></v-md-preview>-->
              <mavon-editor
                ref="md"
                v-model="blogInfo.content"
                :subfield="false"
                :defaultOpen="'preview'"
                :toolbarsFlag="false"
                :editable="false"
                :scrollStyle="true"
                :ishljs="true"
              />
              <el-row>
                <!--主贴下方的一些功能，包括时间，评论和点赞-->
                <span style="font-size: 10px; color: gray;margin: auto 20px;">发布于{{ blogInfo.time }}</span>
                <div class="spacer"></div>
                <el-button type="primary" :icon="Edit"
                           @click="showAddCommentForm(blogInfo.member_name)" circle/>
                <!--                <el-button type="danger" :icon="Delete" circle/>-->

              </el-row>
              <div v-for="(item, i) in blogInfo.comments" :key="i">
                <el-divider border-style="dashed"/>
                <el-row style="margin-left: 10%;margin-right: 10%;">
                  <el-col>
                    <el-card shadow="never" style="margin-top: 0;border: none">
                      <template #header>
                        <el-row>
                          <!--回复主要信息-->
                          <div style="margin: 0 20px 0 10px;">
                            <el-avatar :src="item"></el-avatar>
                          </div>
                          <span class="name">{{ item.commentator }}({{ item.member_type }})
                      回复: {{ item.beCommentator }}</span>
                        </el-row>
                      </template>

                        <!--回复主要内容-->

<!--                          <p>{{ item.content }}</p>-->
                          <mavon-editor
                            ref="md"
                            v-model="item.content"
                            :subfield="false"
                            :defaultOpen="'preview'"
                            :toolbarsFlag="false"
                            :editable="false"
                            :scrollStyle="true"
                            :ishljs="true"
                            style="margin: 0"
                          />


                      <el-row>
                        <!--回复下方的一些功能，包括时间，评论和点赞-->
                        <span style="font-size: 10px; color: gray;margin: auto 20px;">发布于{{ item.time }}</span>
                        <div class="spacer"></div>
                        <el-button type="primary" :icon="Edit"
                                   @click="showAddCommentForm(item.commentator)" circle/>
                        <el-button type="danger" :icon="Delete" @click="showDeleteCommentWindow(item.comment_id)"
                                   circle/>
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
  Delete,
} from '@element-plus/icons-vue'
import {ref, toRefs} from "@vue/reactivity";
import {reactive} from "vue";
// import router from "@/router/router";
import {useRoute} from "vue-router";
import API from "../../axios.js"
import STORE from "@/store";
import {ElMessage, ElMessageBox} from 'element-plus'

export default {
  name: "blogDetailComponent",
  setup() {
    let route = useRoute();
    console.log(route)
    getInfo();
    const data = reactive({
      Delete: Delete,
      Edit: Edit
    })
    const dataRef = toRefs(data)
    let blogInfo = reactive({
      title_id: 1,            // new
      title: "asd",
      content: "请问为什么",
      member_name: "李国玮",
      member_type: "社长",
      time: "2017-07-25 21:51:54",
      // member_id: 1,
      comments: [{
        comment_id: 1,
        content: "没有为什么",
        time: "2017-07-25 21:51:54",
        commentator: "张凯歌",
        member_type: "成员",
        beCommentator: "李国玮",
        avatarSrc: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        // commentator_id: 1,
      }]
    })

    let addCommentForm = reactive({
      content: "请输入评论内容",
      beCommentator_name: "",
      commentator_id: 1,
    })

    function getInfo() {
      console.log(route.query.id)
      API.post(API.defaults.baseUrl + '/discuss/queryone/',
          {
            title_id: route.query.id
          }).then(function (response) {
        console.log("!!!!!!!!!!!!!!!")
        console.log(response);
        console.log("???????????????")
        if (response.data.code === 200) {
          blogInfo.title_id = response.data.data.title_id
          blogInfo.title = response.data.data.title
          blogInfo.content = response.data.data.content
          blogInfo.member_name = response.data.data.member_name
          blogInfo.member_type = response.data.data.member_type
          //TODO: 更新其他信息
          blogInfo.comments.length = 0
          for (let [index, item] of response.data.data.comments.entries()) {
            console.log(item)
            console.log(index)
            console.log(item.comment_id)
            let obj = reactive({
              comment_id: 1,
              content: "没有为什么",
              time: "2017-07-25 21:51:54",
              commentator: "张凯歌",
              member_type: "成员",
              beCommentator: "李国玮",
            })
            obj.comment_id = item.comment_id
            obj.content = item.content
            obj.time = item.time
            obj.commentator = item.commentator
            obj.beCommentator = item.beCommentator
            obj.member_type = item.member_type
            blogInfo.comments.push(obj)
          }
        }
      }).catch(function (error) {
        console.log(error);
      });
    }

    const dialogFormVisible = ref(false)

    function showAddCommentForm(beCommentator_name) {
      addCommentForm.content = ""
      console.log("begin AddComment: from " + STORE.state.user + "to " + beCommentator_name)
      console.log("The title_id = " + blogInfo.title_id)
      console.log("Showing the addCommentForm")
      addCommentForm.beCommentator_name = beCommentator_name
      addCommentForm.commentator_id = STORE.state.user
      dialogFormVisible.value = true
    }

    // function showDeleteCommentWindow() {
    //   console.log("Showing the Delete Comment Window")
    //
    // }

    function showDeleteCommentWindow(comment_id) {
      console.log("!!!!!!!!!!!!" + comment_id)
      ElMessageBox.confirm(
          'This action will permanently delete the comment. Continue?\n此操作将永久删除该条评论，是否继续？',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
      ).then(() => {
        API.post(API.defaults.baseUrl + "/discuss/deletecomment/", {
          comment_id: comment_id
        }).then(function (response) {
          console.log("成功删除评论")
          console.log(response)
          let i = -1
          for (let [index, item] of blogInfo.comments.entries()) {
            if (item.comment_id === comment_id) {
              i = index
              break
            }
          }
          blogInfo.comments.splice(i, 1)
          ElMessage({
            type: 'success',
            message: '成功删除评论',
          })
        }).catch(function (error) {
          console.log("删除评论失败")
          console.log(error)
          ElMessage.error("删除评论失败")
        })
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '删除操作取消',
        })
      })
    }

    function addComment() {
      dialogFormVisible.value = false
      API.post(API.defaults.baseUrl + "/discuss/addcomment/",
          {
            title_id: blogInfo.title_id,
            content: addCommentForm.content,
            commentator_id: addCommentForm.commentator_id,
            beCommentator_name: addCommentForm.beCommentator_name
          }).then(function (response) {
        if (response.data.code === 200) {
          console.log(response.data.data)
          blogInfo.comments.push({
            content: addCommentForm.content,
            time: response.data.data.time,
            commentator: STORE.state.user,
            member_type: STORE.state.isSuperUser ? "adm" : "stu",
            beCommentator: addCommentForm.beCommentator_name,
            commentator_id: STORE.state.user,
          })
        }
      }).catch(function (error) {
        console.log("添加评论失败")
        console.log(error);
      });
    }

    return {
      getInfo,
      blogInfo,
      // data
      ...dataRef,
      addComment,
      showAddCommentForm,
      addCommentForm,
      dialogFormVisible,
      showDeleteCommentWindow,
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