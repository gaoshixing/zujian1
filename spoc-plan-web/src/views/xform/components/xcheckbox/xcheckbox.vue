<style lang="less">
@gcolor:#44bcb7;
.x-checkbox{
    &-group{
        text-align: left;
        &-item{
            font-size: 12px;
            margin-right: 10px;
            cursor: pointer;
            &.block{
                display: block;
                margin-top: 5px;
                margin-bottom: 5px;
            }
            &.readonly{
                cursor: not-allowed;
                .x-checkbox-input{
                    cursor: not-allowed;
                }
                .x-checkbox-inner{
                    border-color: #dddee1;
                    background-color: #f3f3f3;
                }
            }
        }
    }
    &-icon{
        display: inline-block;
        margin-right: 0;
        white-space: nowrap;
        position: relative;
        line-height: 1;
        vertical-align: middle;
        cursor: pointer;
        &.checked{
            .x-checkbox-inner{
                border-color: @gcolor;
                background-color: @gcolor;
                &:after{
                    box-sizing: border-box;
                    content: '';
                    display: table;
                    width: 4px;
                    height: 8px;
                    position: absolute;
                    top: 1px;
                    left: 4px;
                    border: 2px solid #fff;
                    border-top: 0;
                    border-left: 0;
                    -webkit-transform: rotate(45deg) scale(1);
                    transform: rotate(45deg) scale(1);
                    transition: all 0.2s ease-in-out;
                }
            }
        }
    }
    &-input{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
        opacity: 0;
        cursor: pointer;
    }
    &-inner{
        box-sizing: border-box;
        display: inline-block;
        width: 14px;
        height: 14px;
        position: relative;
        top: 0;
        left: 0;
        border: 1px solid #dddee1;
        border-radius: 2px;
        background-color: #fff;
        transition: border-color 0.2s ease-in-out, background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        &:after{
            content: '';
            display: table;
            width: 4px;
            height: 8px;
            position: absolute;
            top: 1px;
            left: 4px;
            border: 2px solid #fff;
            border-top: 0;
            border-left: 0;
            -webkit-transform: rotate(45deg) scale(0);
            transform: rotate(45deg) scale(0);
            transition: all 0.2s ease-in-out;
        }
        &:focus{
            box-shadow: 0 0 0 2px rgba(68, 188, 183, 0.2);
        }
    }
    .disinline{
        .x-checkbox-group{
            display: inline-block;
            margin: 7px 0;
        }   
    }
}
</style>
<template>
    <div class="x-checkbox">
        <div :class="displayCls" :rel="display">
            <div class="x-el-title x-checkbox-title" v-text="title"></div>
            <div class="x-el-description x-checkbox-description" v-text="description"></div>
            <div class="x-checkbox-group" :rel="xoptions">
                <label class="x-checkbox-group-item" :class="{readonly:readonly,[type]:type}" :for="pid+item.uid+r" v-for="item in ctx.options" :key="item.uid">
                    <div class="x-checkbox-icon" :class="{checked:has(item.value)}">
                        <span class="x-checkbox-inner"></span>
                        <input type="checkbox" :id="pid+item.uid+r" class="x-checkbox-input" v-model="currentValue" :value="item.value" :name="name" :disabled="readonly">
                    </div>
                    <span v-text="item.label"></span>
                </label>
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
import {uuid  , isContains } from '../../libs/util';
import adapter from '../adapter';
const getoptions = adapter.options;

export default {
    mixins:[base],
    props:{
        options:{
            type:Array,
            required:true
        },
        value:{
            type:Array,
            required:true,
        }
    },
    data(){
        return {
            ctx:{
                options:[],
                item:{},
            },
            r:uuid(),
        }
    },
    computed:{
        xoptions(){
            if(this.settings.datasource===SELECTYPE.DATASOURCE_REMOTE){
                getoptions(this.settings.api,this.ctx,this.settings);
                return 0;
            } else {
                const options=[];
                this.options.forEach(item=>{
                    options.push(Object.assign({},item,{uid:'checkbox'+uuid()}));
                });
                this.ctx.options = options;
                return 1;
            }
            
        }
    },
    
    methods:{
        has(s){
            return isContains(this.currentValue,s);
        }
    },
    watch:{
        
    }
}
</script>


