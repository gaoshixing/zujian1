<style lang="less">
@import '../../themes/config.less';
.x-select{
    width: 100%;
    position: relative;
    &-able{
        position: relative;
        .select{
            cursor: pointer;
        }
        &-val{
            padding: 0 24px 0 8px;
        }
        &-icon{
            position: absolute;
            right: 10px;
            top: 4px;
            font-size: 16px;
            color: #80848f;
            cursor: pointer;
            .ivu-icon{
                color: #999;
                &:hover{
                    color: #333;
                }
            }
        }
    }
    &-dropdown{
        max-height: 200px;
        overflow: auto;
        overflow-x: hidden;
        margin: 5px 0;
        padding: 5px 0;
        background-color: #fff;
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow: 0 1px 6px rgba(0,0,0,.2);
        position: absolute;
        width: 100%;
        z-index: 200;
        &-item{
            padding-left: 10px;
            height: 32px;
            line-height: 32px;
            white-space: nowrap;
            text-align: left;
            font-size: 12px;
            &:hover,&.hover{
                background-color: #f3f3f3;
                cursor: pointer;
            }
            &.active{
                background-color: @color-primary;
                color: #fff;
            }
        }
    }
    .disinline{
        .x-select-section{
            display: inline-block;
        }
    }
}
</style>
<template>
     <div class="x-select">
        <div :class="displayCls" :rel="display">
            <div class="x-el-title" v-text="title"></div>
            <div class="x-el-description" v-text="description"></div>
            <div class="x-select-section rightsection">
                <div class="x-select-able" :rel="xoptions" :style="inputs">
                    <input v-if="readonly" type="text" class="x-el-input"  :placeholder="placeholder" v-model="currentValueLabel" :readonly="true">
                    <input v-else-if="notsearch" type="text" class="x-el-input select" :class="{error:error}" :placeholder="placeholder" v-model="currentValueLabel" :readonly="true" @blur="onInputBlur" @click="onInputClick" @keyup.enter="onEnter" @keydown.up.stop.prevent="prevItem" @keydown.down.stop.prevent="nextItem">
                    <input v-else type="text" class="x-el-input with-search" :class="{error:error}" :placeholder="placeholder" v-model="currentValue" @input="onInputChange" @blur="onInputBlur" @click="onInputClick" @keyup.enter="onEnter" @keydown.up.stop.prevent="prevItem" @keydown.down.stop.prevent="nextItem">
                    <div v-if="icon" class="x-select-able-icon">
                        <Icon :type="icon" @click.native.stop.prevent="onIconClick"></Icon>
                    </div>
                    <div class="x-select-dropdown" v-if="showList" :style="hasScroll">
                        <div class="x-select-dropdown-wrap">
                            <div class="x-select-dropdown-item" :class="{hover:currIndex===index,active:value==item.value}" v-for="(item,index) in ctx.options" :key="index" @click.stop="onItemClick(item,index)" v-html="item[k]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="x-error-tip">
            <p class="x-error-tip-text" v-if="error" v-text="errorMsg"></p>
        </div>
    </div>
</template>
<script>
import base from '../base';
import {SELECTYPE} from '../../components/config';
import { isParent, uuid  , clone } from '../../libs/util';
import adapter from '../adapter';
const getoptions = adapter.options;

export default {
    mixins:[base],
    props:{
        options:{
            type:Array,
            required:true,
        },
        k:{
            type:String,
            default:'label' // 下拉框显示的
        },
        v:{
            type:String,
            default:'value', // 双向绑定的数据
        },
        label:{
            type:String,
            default:''
        },
        readonly:{
            type:Boolean,
            default:false,
        },
        icon:{
            type:String,
            default:'',
        },
        width:{
            type:String,
        }
    },
    data(){
        return {
            ctx:{
                item:{},
                options:[]
            },
            show:false,
            index:1e5,
            currIndex:'',
        };
    },
    computed:{
        showList(){
            return this.show && this.ctx.options.length>0;
        },
        notsearch(){
            return [SELECTYPE.SEARCH_REMOTE,SELECTYPE.SEARCH_LOCAL].indexOf(this.settings.searchtype)<0;
        },
        inputs(){
            if(this.width){
                return {
                    width:this.width,
                }
            }
        },
        currentValueLabel(){
            const v = this.v;
            const item = this.ctx.options.find(i=>i[v]==this.currentValue);
            return item?item.label:'';
        },
        xoptions(){ // 暂时不考虑搜索
            if(this.settings.datasource===SELECTYPE.DATASOURCE_REMOTE){
                getoptions(this.settings.api,this.ctx,this.settings);
                return 0;
            } else {
                let options=[];
                this.options.forEach(item=>{
                    options.push(Object.assign({},item,{uid:'select'+uuid()}));
                });
                if(this.settings.extra){
                    options = options.concat(this.settings.extra);
                }
                this.ctx.options = options;
                return 1;
            }
        },
        hasScroll(){ // 在子表单中需要对滚动适配
            if(this.settings.scrollx){
                return {
                    transform:`translateX(-${this.settings.scrollx}px)`
                }
            }
        }
    },
    created(){
        document.addEventListener('click',this.hideDropdown);
    },
    beforeDestroy(){
        document.removeEventListener('click',this.hideDropdown);
    },
    methods:{
        onInputClick(){
            this.show=true;
            this.index = 1e5 * this.ctx.options.length -1 ;
            this.currIndex = '';
        },
        onInputChange(){ // 启用搜索时才会触发，未完善
            
        },
        onInputBlur(e){
            this.$emit('blur',e);
        },
        onItemClick(item,index){
            this.show = false;
            this.currentValue = item[this.v];
            this.$emit('selected',item,index);
            this.ctx.item=item;
        },
        onEnter(){
            this.show = false;
            if (this.currIndex) {
                const item = this.ctx.options[this.currIndex];
                return this.onItemClick(item,this.currIndex);
            }
            this.$emit('on-enter',this.currentValue);
        },
        onIconClick(){
            this.$emit('on-click',this.currentValue);
            this.show = false;
        },
        hideDropdown(e){
            if(!isParent(e.target,this.$el)){
                this.show = false;
            }
        },
        nextItem(e){
            this.currIndex = (++this.index)%this.ctx.options.length;
            this.scroll();
        },
        prevItem(e){
            this.currIndex = (--this.index)%this.ctx.options.length;
            this.scroll();
        },
        scroll(){
            this.$nextTick(()=>{
                const el = this.$el.querySelector('.hover');
                if (el.scrollIntoViewIfNeeded) {
                    el.scrollIntoViewIfNeeded();
                } else if (el.scrollIntoView){
                    el.scrollIntoView(false);
                } else {
                }
            });
        }
    },
    watch:{
       
    }
}
</script>


