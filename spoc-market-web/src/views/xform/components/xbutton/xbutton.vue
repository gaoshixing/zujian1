<style lang="less">

</style>
<template>
    <div class="x-button" :class="cls">
        <button class="x-button-btn" :class="type" v-text="name" :disabled="readonly" @click="onClick" :style="{background:color}"></button>
    </div>
</template>
<script>
import base from '../base';

export default {
    mixins:[base],
    props:{
        value:{
            type:Function,
            default:()=>{}
        },
        payload:{
            type:Object,
            default:()=>{}
        }
    },
    mounted(){
    },
    methods:{
        onClick(e){
            this.value.call(this,this,e,this.payload);
            this.$emit('on-click',e,this.payload);
        }
    }
}
</script>


