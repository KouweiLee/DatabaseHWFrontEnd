<template>
    <h1>images pool</h1>
    <el-row>
        <el-col
            v-for="(url, i) in imageUrls"
            :key="i"
            :span="8"
        >
            <image-card :key="i" :image-url="url.url" :click="handlePictureCardPreview(url)"></image-card>
        </el-col>
    </el-row>

    <!--    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"-->
    <el-upload
        v-model:file-list="imageUrls"

        action="http://localhost:8000/login/picture/upload/"
        :data="{username: username}"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
    >
        <el-icon>
            <Plus/>
        </el-icon>
    </el-upload>

    <el-dialog
        v-model="dialogVisible"
        :title=dialogImageUrl
        style="width: auto"
    >
        <img w-full :src="dialogImageUrl" alt="Preview Image" style="max-width: 80%"/>
    </el-dialog>
</template>

<script>
import {reactive} from "vue";
import STORE from "@/store";
import {ElMessage} from "element-plus";
import API from "@/axios";
import ImageCard from "@/components/images/imageCard";
import {ref} from "@vue/reactivity";

export default {
    name: "ImagePoolView.vue",
    components: {ImageCard},
    setup() {
        let imageUrls = reactive([
            {
                name: "111",
                url: "111"
            },
            {
                name: "222",
                url: "222"
            }
        ])

        let username = STORE.state.user

        const dialogImageUrl = ref('')
        const dialogVisible = ref(false)

        getAllPics()

        function getAllPics() {
            API.post(API.defaults.baseUrl + '/login/picture/all/', {
                username: STORE.state.user
            }).then(function (response) {
                console.log("receive from backend, query all pics")
                console.log(response.data.data)
                if (response.data.code === 200) {
                    while (!(imageUrls.length === 0)) {
                        imageUrls.pop()
                    }
                    let i
                    for (i = 0; i < response.data.data.length; i++) {
                        // imageUrls.push(response.data.data[i])
                        imageUrls.push({
                            name: response.data.data[i],
                            url: response.data.data[i]
                        })
                    }
                    console.log(imageUrls)
                } else {
                    ElMessage.error("返回码：" + response.data.code)
                }
            }).catch(function (error) {
                ElMessage.error("错误")
                console.log(error)
            })
        }

        function postPic() {

        }

        function handleRemove(file) {
            console.log(file.url)
            API.post(API.defaults.baseUrl + '/login/picture/delete/', {
                url: file.url
            }).then(function (response) {
                console.log(API.defaults.baseUrl)
                if (response.data.code === 200) {
                    ElMessage.success("删除照片成功")
                } else {
                    ElMessage.error("删除照片失败，错误码：" + response.data.code)
                }
            }).catch(function (error) {
                ElMessage.error("删除照片错误")
                console.log(error)
            })
        }



        function handlePictureCardPreview(url) {
            dialogImageUrl.value = url.url
            dialogVisible.value = true
        }

        return {
            imageUrls,
            dialogImageUrl,
            dialogVisible,
            getAllPics,
            postPic,
            handleRemove,
            handlePictureCardPreview,
            username
        }
    }
}
</script>

<style scoped>

</style>