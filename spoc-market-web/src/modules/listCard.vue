<template>
    <div class="list-card-boss clearfix" :style="{width: width + 'px'}">
        <span :style="{width: titleWidth + 'px'}">{{title}}：</span>
        <span :style="{'margin-left': titleWidth + 'px'}">{{content}}</span>
        <slot></slot>
    </div>    
</template>

<script>
export default {
    name: 'ListCard',
    props: {
        title: {
            type: String,
            default: '',
        },
        content: {
            type: String,
            default: '',
        },
        titleWidth: {
            type: Number,
            default: 110,
        },
        width: {
            type: Number,
            default: 500,
        },
    },

};
</script>

<style lang="less">
    .list-card-boss {
        height: 33px;
        line-height: 33px;
        font-size: 12px;
        width: 500px;
        position: relative;
        >span {
            display: inline-block;
        }
        >span:nth-of-type(1) {
            position: absolute;
            left: 0;
            top: 0;
            color: #999;
            text-align: right;
        }
        >span:nth-of-type(2) {
            color: #333;
            width: 350px;
            padding-left: 17px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
</style>
