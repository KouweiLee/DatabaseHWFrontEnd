<template>
    <el-card style="margin-left: 5%; width: 90%">
        <img
            :src=imageUrl
            class="image"
            style="width: 90%; height: 350px; margin-left: 5%; margin-right: 5%"
        />
        <div style="padding: 14px">
            <span>{{imageUrl}}</span>
        </div>
    </el-card>
</template>

<script>


export default {
    name: "imageCard",
    props: {
        imageUrl: {
            type: String,
            default: function () {
                return ""
            }
        },
    },
    // setup(props) {
    //     let url = reactive(props.imageUrl)
    //     console.log(url)
    //     return {
    //         url
    //     }
    // }
}
</script>

<style scoped>
image {
}
</style>