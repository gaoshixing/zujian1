<template>
    <div class="expand-top-boss">
        <div>
            <listCard title="编号" :content="code"></listCard>
            <listCard title="邀请购买" :content="title"></listCard>
            <listCard title="任务有效期" :content="date"></listCard>
        </div>
        <div>
            <button class="common-button fr expand-common-button" :class="[use ? '' : 'expand-common-button-disabled']" @click="onclickButton2">生成分享链接</button>
            <button class="common-button fr expand-common-button" :class="[use ? '' : 'expand-common-button-disabled']" @click="onclickButton3">生成分享图片</button>
        </div>
        <a id="downloadPoster" :href="downloadPost" :download="title || '分享海报'" style="position:fixed; top: -200px; visibility: hidden;">生成分享图片</a>
        <div v-if="!use"><Icon type="information-circled" class="expand-top-icon"></Icon><span>关联商品上架后，才可进行以上操作</span></div>
    </div> 
</template>

<script>
import listCard from './listCard';
import { waitUntil, } from '@public/libs/util';
export default {
    name: 'ExpandTop',
    props: {
        /*
        * 来源
        */
        from: {
            type: String,
            required: true,
        },
        code: {
            type: String,
        },
        title: {
            type: String,
        },
        date: {
            type: String,
        },
        downloadPost: {
            type: String,
        },
        imgId: {
            type: String,
        },
        use: {
            type: Boolean,
            default: false,
        },
        expandId: {
            type: String,
            default: null,
        },
    },
    components: {
        listCard,
    },
    methods: {
        onclickButton2() {
            if (!this.use) return;
            if (!this.imgId) {
                this.$Message.error('该任务暂无设置推广');
                return;
            } else {
                this.$emit('onclickButton2');
            }
        },
        onclickButton3() {
            if (!this.use) return;
            if (!this.imgId) {
                this.$Message.error('该任务暂无设置推广');
                return;
            }
            this.$emit('onclickButton3');
            waitUntil (()=>{
                return !!(this.expandId && this.downloadPost);
            },()=>{
                const downloadPoster = document.getElementById('downloadPoster');
                setTimeout(() => downloadPoster.click(), 500);
            });
        },
    },
};
</script>

<style lang="less">
    @import url('../less/common.less');
    .expand-top-boss {
        display: flex;
        box-sizing: border-box;
        padding: 24px 15px 24px 0;
        justify-content: space-between;
        position: relative;
        >div:nth-of-type(1) {
            width: 500px;
        };
        >div:nth-of-type(2) {
            width: 285px;
            height: 36px;
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            justify-content: space-between;
        };
        >div:nth-of-type(3) {
            position: absolute;
            right: 92px;
            top: 70%;
            color: #999;
            height: 18px;
            span {
                display: inline-block;
                line-height: 18px;
            }
            .expand-top-icon {
                color: red;
                margin-right:5px;
                font-size: 14px;
            }
        };
    }
    .fr {
        float: left;
    }
    .expand-common-button {
        outline: none;
        border: none;
    }
    .expand-common-button-disabled {
        background-color: #ccc !important;
        color: #999!important;
        cursor: not-allowed!important;
        &:hover {
            opacity: 1!important;
        }
    }
</style>
