<style lang="less">
.x-textarea{
    &-val{
        line-height: 20px;
        display: block;
        resize: none;
        padding-top: 8px;
        padding-bottom: 8px;
    }
    &-title{
        font-size: 14px;
    }
    &-description{
        font-size: 12px;
    }
    .disinline{
        .x-el-title{
            margin-top: 0;
            vertical-align: top;
        }
        .x-textarea-wrap{
            display: inline-block;
        }
    }
}
</style>
<template>
    <div class="x-textarea">
        <div :class="displayCls" :rel="display">
            <div class="x-el-title" v-text="title"></div>
            <div class="x-el-description" v-text="description"></div>
            <div class="x-textarea-wrap rightsection">
                <textarea :type="type" :style="inputs" class="x-el-input x-textarea-val" :class="{error:error}" v-model="currentValue" :placeholder="placeholder" :readonly="readonly" ></textarea>
            </div>
        </div>
        <div class="x-error-tip">
            <p class="x-error-tip-text" v-if="error" v-text="errorMsg"></p>
        </div>
    </div>
</template>
<script>
import base from '../base';

export default {
    mixins:[base],
    props:{
        width:{
            type:String,
        },
        height:{
            type:String,
            default:'6em'
        }
    },
    data(){
        return {}
    },
    computed:{
        inputs(){
            const style={};
            if(this.width){
                style.width=this.width
            }
            if(this.height){
                style.height=this.height;
            }
            return style;
        }
    }
}
</script>


