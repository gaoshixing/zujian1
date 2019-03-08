<style lang='less'>
    .public {
    }
</style>
<template>
    <div class="public">
        <router-view :pubId='pubId'>
        </router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            pubId: this.$route.query.pubId
        }
    },
    mounted() { 
    }
}
</script>

