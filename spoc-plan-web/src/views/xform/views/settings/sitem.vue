<style lang="less">
.xform-s-item{
    .x-el-title,.x-el-description,.x-error-tip{
        display: none;
    }
    .x-checkbox-group-item.block{
        margin: 0;
        padding: 10px 6px;
        &:hover{
            background-color: #eee;
        }
    }
}
</style>

<template>
    <div class="xform-s-item">
        <xcheckbox :options="options" :id="id" type="block" name="ucheck" v-model="currentValue" />
    </div>  
</template>
<script>

import xcheckbox from '../../components/xcheckbox/xcheckbox'
import { uuid } from '../../libs/util'

export default {
    props:{
       value:{
           type:Array,
           required:true,
       },
       options:{
           type:Array,
           required:true
       }
    },
    data(){
        return {
            id:uuid(),
            currentValue:this.value,
        }
    },
    components:{
        xcheckbox
    },
    watch:{
        value(v){
            this.currentValue = v;
        },
        currentValue(v){
            this.$emit('input',v);
        }
    }
}
</script>

