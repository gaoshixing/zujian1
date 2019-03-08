<style lang="less">
.x-label{
    &-title{
        font-size: 14px;
    }
    &-description{
        font-size: 12px;
    }
}
</style>
<template>
    <div class="x-label">
        <div class="x-el-title x-label-title" v-text="title"></div>
        <div class="x-el-description x-label-description" v-text="description"></div>
    </div>
</template>
<script>
import base from '../base';

export default {
    mixins:[base],
}
</script>

