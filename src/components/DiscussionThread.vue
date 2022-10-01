<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>{{myTitle}}</span>
                <el-button class="button" text>{{button}}</el-button>
            </div>
        </template>
        <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
    </el-card>
</template>

<script>
    import {ref} from "@vue/reactivity";

    export default {
        props:{
            title:String,
            button:String
        },
        name: "DiscussionThread",
        setup(props){
            const myTitle = ref(props.title)

            return{
               myTitle
            }
        }
    }
</script>

<style>
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .box-card {
        float: left;
        width: 30%;
        /*padding: .75rem;*/
        margin-bottom: 2%;
        /*padding-left: 1.5%;*/
        /*padding-right: 1.5%;*/
        margin-left: 1%;
        margin-right: 1%;
    }
</style>


