<template>
    <el-card>
        <img
            src={{imageUrl}}
            class="image"
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

</style>