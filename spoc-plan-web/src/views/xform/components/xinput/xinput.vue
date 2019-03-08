<style lang="less">
.x-input{
    &-val{
        outline: none;
    }
    .disinline{
        .x-input-section{
            display: inline-block;
        }
    }
}
</style>
<template>
    <div class="x-input">
        <div :class="displayCls" :rel="display">
            <div class="x-el-title x-input-title" v-text="title"></div>
            <div class="x-el-description x-input-description" v-text="description"></div>
            <div class="x-input-section rightsection">
                <input :type="type" :style="inputs" class="x-el-input x-input-val" :class="{error:error}" v-model="currentValue" :placeholder="placeholder" :readonly="readonly" @blur="onBlur">
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
        }
    },
    data(){
        return {
        };
    },
    computed:{
        inputs(){
            if(this.width){
                return {
                    width:this.width,
                }
            }
        }
    },
    created(){
    },
    watch:{
        
    }
}
</script>

