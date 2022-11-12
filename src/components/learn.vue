<template>
    <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
    >
        <template #trigger>
            <el-button size="small" type="primary">选取文件</el-button>
        </template>
        <el-button
                style="margin-left: 10px;"
                size="small"
                type="success"
                @click="submitUpload"
        >上传到服务器</el-button
        >
        <template #tip>
            <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
        </template>
    </el-upload>
</template>

<script>
    export default {
        name: "LearnView",
        data() {
            return {
                fileList: [
                    {
                        name: 'food.jpeg',
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                    },
                    {
                        name: 'food2.jpeg',
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                    },
                ],
            }
        },
        methods: {
            submitUpload() {
                this.$refs.upload.submit()
            },
            handleRemove(file, fileList) {
                console.log(file, fileList)
            },
            handlePreview(file) {
                console.log(file)
            },
        },
    }
</script>