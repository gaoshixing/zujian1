<style lang="less">

</style>
<template>
    <div class="x-person">
        <div :class="displayCls" :rel="display">
            <div class="x-el-title" v-text="title"></div>
            <div class="x-el-description" v-text="description"></div>
            <div class="rightsection">
                <button class="x-button-btn" v-text="placeholder" @click="showChoose"></button>
                <role-person ref="p" @fresh="onSure" :only-chose-one="onlyChoseOne"></role-person>
            </div>
            <div class="x-error-tip">
                <p class="x-error-tip-text" v-if="error" v-text="errorMsg"></p>
            </div>
        </div>
    </div>
</template>
<script>
import rolePeople from '@public/modules/rolePeopleRadio';
import base from '../base'
export default {
    mixins:[base],
    data(){
        return {
            onlyChoseOne:this.type!='multiple',
        }
    },
    components:{
        rolePeople
    },
    methods:{
        showChoose(){
            this.onlyChoseOne=this.type!='multiple',
            this.$refs.p.show();
        },
        onSure(data){
            this.currentValue = data.map(item=>item.id).join(',')
        }
    }
}
</script>


