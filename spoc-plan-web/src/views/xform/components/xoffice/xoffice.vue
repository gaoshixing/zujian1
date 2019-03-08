<style lang="less">

</style>
<template>
    <div class="x-office">
        <div :class="displayCls" :rel="display">
            <div class="x-el-title" v-text="title"></div>
            <div class="x-el-description" v-text="description"></div>
            <div class="rightsection">
                <button class="x-button-btn" v-text="placeholder" @click="showChoose"></button>
                <role-office ref="of" @fresh="onSure" :only-chose-one="onlyChoseOne"></role-office>
            </div>
            <div class="x-error-tip">
                <p class="x-error-tip-text" v-if="error" v-text="errorMsg"></p>
            </div>
        </div>
    </div>
</template>
<script>
import base from '../base'
import roleOffice from '../../../../modules/roleOffice'
export default {
    mixins:[base],
    data(){
        return {
            onlyChoseOne:this.type!='multiple',
        }
    },
    components:{
        roleOffice    
    },
    methods:{
        showChoose(){
            this.onlyChoseOne=this.type!='multiple',
            this.$refs.of.show();
        },
        onSure(data){
            console.info(data);
            this.currentValue = data.map(item=>item.id).join(',')
        }
    }
}
</script>


