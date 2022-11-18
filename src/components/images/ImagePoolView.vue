<template>
    <h1>images pool</h1>
    <image-card v-for="(url, i) in imageUrls" :key="i" :image-url="url.url"></image-card>
    <!--    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"-->
    <el-upload
        v-model:file-list="imageUrls"

        action="https://jsonplaceholder.typicode.com/posts/"
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
    >
        <img w-full :src="dialogImageUrl" alt="Preview Image"/>
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

        const dialogImageUrl = ref('')
        const dialogVisible = ref(false)

        // getAllPics()

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

        function handleRemove() {

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
            handlePictureCardPreview
        }
    }
}
</script>

<style scoped>

</style>