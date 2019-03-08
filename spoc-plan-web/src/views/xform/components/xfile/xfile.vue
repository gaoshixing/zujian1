<style lang="less">
.x-file{
    .hidden{
        display: none;
    }
    .disinline{
        .x-file-choose{
            display: inline-block;
        }
    }
}
</style>
<template>
    <div class="x-file">
        <div :class="displayCls" :rel="display">
            <div class="x-el-title x-input-title" v-text="title"></div>
            <div class="x-el-description x-input-description" v-text="description"></div>
            <div class="x-file-choose">
                <label class="x-button-btn up-btn" :for="uid" v-text="placeholder"></label>
                <input type="file" :id="uid" class="hidden" @change="onFileChange">
                <span class="f-name" v-text="fname"></span>
            </div>
            <div class="x-error-tip">
                <p class="x-error-tip-text" v-if="error" v-text="errorMsg"></p>
            </div>
        </div>
    </div>
</template>
<script>
import base from '../base';
import { uuid } from '../../libs/util'
import valid,{sys, errors } from '../../../../libs/request'
const cfg = {
    api:'/',
    k:'files',
    data:{
        dirName:'all',
        type:'files'
    },
};
export default {
    mixins:[base],
    props:{
        maxsize:{
            type:Number,
            default:1024*1024
        }
    },
    data(){
        return {
            uid:uuid()
        }
    },
    computed:{
        fname(){
            if(this.currentValue && this.currentValue.filePath){
                return this.currentValue.filePath.split('/').pop();
            }
        }
    },
    created(){
    },
    methods:{
        onFileChange(e){
            const file = e.target.files[0];
            if(file){
                if(file.size<this.maxsize){
                    this.error=false;
                    this.send(file);
                } else {
                    this.error=new Error('文件超过限定大小');
                }
            }
        },
        send(file){
            const data = new FormData();
            data.append(cfg.k,file);
            console.log(this.groupId)
            data.append('serviceGroupId',this.groupId);
            Object.keys(cfg.data).forEach(item=>{
                data.append(item,cfg.data[item]);
            })
            sys.uploadFile(data).then(valid.call(this)).then(res=>{
                if(res){
                    console.info(res);
                    this.currentValue = res.data.data;
                }
            }).catch(errors.call(this));
        }
    }
}
</script>


