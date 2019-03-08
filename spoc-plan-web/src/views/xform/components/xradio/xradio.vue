<style lang="less">
@gcolor:#44bcb7;
.x-radio{
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
                .x-radio-input{
                    cursor: not-allowed;
                }
                .x-radio-inner{
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
            .x-radio-inner{
                border-color: @gcolor;
                &:after{
                    opacity: 1;
                    -webkit-transform: scale(1);
                    transform: scale(1);
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
        display: inline-block;
        width: 14px;
        height: 14px;
        position: relative;
        top: 0;
        left: 0;
        background-color: #fff;
        border: 1px solid #dddee1;
        border-radius: 50%;
        transition: all 0.2s ease-in-out;
        box-sizing: border-box;
        &:after{
            position: absolute;
            width: 8px;
            height: 8px;
            left: 2px;
            top: 2px;
            border-radius: 6px;
            display: table;
            border-top: 0;
            border-left: 0;
            content: ' ';
            background-color: @gcolor;
            opacity: 0;
            transition: all 0.2s ease-in-out;
            -webkit-transform: scale(0);
                    transform: scale(0);
        }
        &:focus{
            box-shadow: 0 0 0 2px rgba(68, 188, 183, 0.2);
        }
    }
    .disinline{
        .x-radio-group{
            display: inline-block;
            margin: 7px 0;
        }
    }
}
</style>
<template>
    <div class="x-radio">
        <div :class="displayCls" :rel="display">
            <div class="x-el-title x-radio-title" v-text="title"></div>
            <div class="x-el-description x-radio-description" v-text="description"></div>
            <div class="x-radio-group" :rel="xoptions">
                <label class="x-radio-group-item" :class="{readonly:readonly,[type]:type}" :for="pid+item.uid+r" v-for="item in ctx.options" :key="item.uid">
                    <div class="x-radio-icon" :class="{checked:isEq(item.value,value)}">
                        <span class="x-radio-inner"></span>
                        <input type="radio" :id="pid+item.uid+r" class="x-radio-input" v-model="currentValue" :value="item.value" :name="item.name" :disabled="readonly">
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
import {uuid  , deepEqual } from '../../libs/util';
import {SELECTYPE} from '../../components/config';
import adapter from '../adapter';
const getoptions = adapter.options;

export default {
    mixins:[base],
    props:{
        options:{
            type:Array,
            required:true
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
                    options.push(Object.assign({},item,{uid:'radio'+uuid()}));
                });
                this.ctx.options = options;
                return 1;
            }
        }
    },
    created(){

    },
    methods:{
        isEq(x,y){
            return deepEqual(x,y);
        }
    },
    watch:{
        currentValue(v){
            const item = this.ctx.options.find(item=>item.value==v);
            this.$emit('selected',item);
        }
    }
}
</script>


