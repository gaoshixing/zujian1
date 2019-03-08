<style lang="less">
.x-el-design{
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    min-height: 80vh;
    padding: 0 15px 100px;
    &-wrap{
        .x-el-design-ctlbtns{
            .x-button-btn{
                line-height: 1;
                padding-top: 0;
                padding-bottom: 0;
            }
        }
        &:hover,&.active{
            background-color: #e9f7f7;
            .x-el-design-ctlbtns{
                .xel-item{
                    visibility: visible;
                }
            }
        }
    }
    .x-el-input{
        background: #fff;
    }
    &-ctlbtns{
        text-align: right;
        .xel-item{
            display: inline-block;
            margin: 0;
            visibility: hidden;
        }
    }
}
</style>
<template>
    <div class="x-el-design" @drop.prevent="handleOnDrag" @dragover.stop.prevent="handleDragOver">
        <div class="x-el-design-wrap" :class="{active:active.id==el.id}" v-for="el in data" :key="'c_'+el.id">
            <div class="x-el-design-ctlbtns">
               <xel v-for="a in ctlbtns" :key="a.id" :data="a" :payload="el"/>
            </div>
            <drag-item :el="el" @click.native="onClick(el)" @insert-before="insertBefore" ></drag-item>
        </div>
    </div>
</template>
<script>

import dragItem from './types/dragItem';
import xel from '../components/xel';
import { uuid,clone  } from '../libs/util';
import { TYPES } from '../components/config';

export default {
    props:{
        data:{
            type:Array,
            required:true,
        },
        xsetting:{
            type:Object,
            required:true,
        },
        active:{
            type:Object,
            default:()=>{
                return {};
            }
        }
    },
    data(){
        return {
            ctlbtns:[],
            draghover:{},
        }
    },
    components:{
        xel,
        dragItem
    },
    created(){
        this.ctlbtns=[
            {
                id:uuid(),
                model:TYPES.BUTTON,
                name:'复制',
                type:'text color-success',
                value:this.copyOne
            },
            {
                id:uuid(),
                model:TYPES.BUTTON,
                name:'删除',
                type:'text color-error',
                value:this.delOne
            },
        ];
    },
    methods:{
        onClick(el){
            this.$emit('on-active',el);
        },
        handleOnDrag(e){
            const data = e.dataTransfer.getData('text');
            if(data){
                try{
                    const j = JSON.parse(data);
                    j.settings.module = this.xsetting.module;
                    this.data.push(j);
                }catch(err){
                    console.error(err)
                }
            }
        },
        handleDragOver(){

        },
        insertBefore(data,el){
            const id = el.id;
            const index = this.data.findIndex(i=>i.id==id);
            data.settings.module = this.xsetting.module;
            this.data.splice(index,0,data);
        },
        copyOne(ctx,e,data){
            const obj = clone(data);
            obj.id = uuid();
            const index = this.data.findIndex(i=>i.id==data.id);
            obj.name='';
            obj.settings.datasource='';
            obj.settings.category='';
            this.data.splice(index,0,obj);
        },
        delOne(ctx,e,data){
            const index = this.data.findIndex(i=>i.id==data.id);
            this.data.splice(index,1);
        },
        
    }
}
</script>


