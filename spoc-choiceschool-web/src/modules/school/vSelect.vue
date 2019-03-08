<style lang="less">
.v-select-wrap{
    width: 100%;
    position: relative;
    .select-able{
        .main-input{
            display: inline-block;
            height: 32px;
            line-height: 32px;
            padding: 0 24px 0 8px;
            font-size: 12px;
            outline: 0;
            border: 1px solid #dddee1;
            box-sizing: border-box;
            color: #495060;
            background-color: transparent;
            width: 100%;
            border-radius: 4px;
            transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            &:hover{
                border-color: #69c9c5;
            }
            &[readonly]{
                background-color: #f3f3f3;
                opacity: 1;
                cursor: not-allowed;
                color: #aaa;
                &:hover{
                    border-color: #dddee1;
                }
                &:focus{
                    border-color: #dddee1;
                    box-shadow: none;                    
                }
            }
            &:focus{
                border-color: #69c9c5;
                outline: 0;
                box-shadow: 0 0 0 2px rgba(68, 188, 183, 0.2);
            }
        }
        .icon-right{
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
    .dropdown{
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
        width: inherit;
        z-index: 200;
        &-item{
            padding-left: 10px;
            height: 32px;
            line-height: 32px;
            white-space: nowrap;
            &:hover,&.hover{
                background-color: #f3f3f3;
                cursor: pointer;
            }
        }
    }
}
    
</style>
<template>
    <div class="v-select-wrap">
        <div class="select-able">
            <input type="text" class="main-input" :placeholder="placeholder" v-model="model" @input="inputChange" :readonly="readonly" @blur="onBlur" @focus="onFocus"  @keyup.enter="onEnter" 
            @keydown.up.stop.prevent="prevItem" @keydown.down.stop.prevent="nextItem">
            <div v-if="icon" class="icon-right">
                <Icon :type="icon" @click.native.stop.prevent="onIconClick"></Icon>
            </div>
        </div>
        <div class="dropdown" v-if="hasResult">
            <div class="dropdown-item-s">
                <div class="dropdown-item" :class="{hover:currIndex===index}" v-for="(item,index) in dropList" :key="index" @click.stop="itemClick(item,index)" v-html="item[k]"></div>
            </div>
        </div>
    </div>
</template>
<script>
import { isParent } from '../../libs/js/util.js';
export default {
    props:{
        value:{
            required:true,
        },
        placeholder:{
            type:String,
            default:'',
        },
        datafunc:{
            type:Function,
            required:true,
        },
        k:{
            type:String,
            default:'name'
        },
        minlength:{
            type:Number,
            default:1,
        },
        readonly:{
            type:Boolean,
            default:false,
        },
        icon:{
            type:String,
            default:'',
        },
        onfocus:{
            type:[Function,Boolean],
            default:false,
        }
    },
    data(){
        return {
            show:false,
            dropList:[
            ],
            model: this.value,
            index:1e5,
            currIndex:'',
        };
    },
    computed:{
        hasResult(){
            return this.show && this.dropList.length>0;
        }
    },
    created(){
        document.addEventListener('click',this.hideDropdown);
    },
    beforeDestroy(){
        document.removeEventListener('click',this.hideDropdown);
    },
    methods:{
        inputChange(){
            if(this.model.length>=this.minlength){
                this.datafunc(this.model).then(res=>{
                    this.dropList = res;
                    this.index = 1e5 * this.dropList.length -1 ;
                    this.currIndex = '';
                }).catch(e=>console.warn(e)).finally(()=>{
                    this.show = true;
                });
            } else {
                this.show = false;
            }
        },
        itemClick(item,index){
            this.show = false;
            this.model = item[this.k];
            this.$emit('selected',item,index);
        },
        onEnter(){
            this.show = false;
            if (this.currIndex) {
                const item = this.dropList[this.currIndex];
                return this.itemClick(item,this.currIndex);
            }
            this.$emit('on-enter',this.value);
        },
        onIconClick(){
            this.$emit('on-click',this.value);
            this.show = false;
        },
        hideDropdown(e){
            if(!isParent(e.target,this.$el)){
                this.show = false;
            }
        },
        onBlur(e){
            this.$emit('blur',e);
        },
        onFocus(){
            if(this.onfocus){
                this.onfocus(this.model).then(res=>{
                    this.dropList = res;
                    this.index = 1e5 * this.dropList.length -1 ;
                    this.currIndex = '';
                }).catch(e=>console.warn(e)).finally(()=>{
                    this.show = true;
                });
            }
        },
        nextItem(e){
            this.currIndex = (++this.index)%this.dropList.length;
            this.scroll();
        },
        prevItem(e){
            this.currIndex = (--this.index)%this.dropList.length;
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
        value(val){
            this.model = val;
        },
        model(model){
            this.$emit('input',model);
        }
    }
}
</script>


