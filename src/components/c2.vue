<template>
    <discussion-thread :title="1" button="b1"> </discussion-thread>
    <discussion-thread :title="2"> </discussion-thread>
    <discussion-thread :title="3"> </discussion-thread>
    <discussion-thread :title="4"> </discussion-thread>
</template>

<script>
    import DiscussionThread from "@/components/DiscussionThread";
    export default {
        name: "ComponentTwo",
        components: {DiscussionThread}
    }
</script>

<style scoped>

</style>