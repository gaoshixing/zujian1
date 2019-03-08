<style lang="less">
.x-datetime{

}
</style>
<template>
    <div class="x-datetime">
        <div :class="displayCls" :rel="display">
            <div class="x-el-title" v-text="title"></div>
            <div class="x-el-description" v-text="description"></div>
            <div class="rightsection">
                <input v-if="readonly" :type="type" :style="inputs" class="x-el-input" :class="{error:error}" v-model="currentValue" :placeholder="placeholder" :readonly="true">
                <DatePicker v-else type="date" :placeholder="placeholder" :style="inputs" v-model="currentValue"></DatePicker>
                <!-- <input v-else :type="type" :style="inputs" class="x-el-input" :class="{error:error}" v-model="currentValue" :placeholder="placeholder" @blur="onBlur"> -->
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
        return {}
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
    methods:{
        
    }
}
</script>


