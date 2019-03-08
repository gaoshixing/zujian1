<style lang="less">
@pinkish-grey: #ccc;
@black: #333;
@white: #e0e0e0;
.crm-up-img {
	box-shadow: 0 0 10px 0 rgba(4, 0, 0, 0.15);
	border: solid 1px @white;
	padding: 10px;
	width: 369px;
    min-height: 176px;
    max-height: 300px;
	box-sizing: border-box;
	background-color: #fff;
    position: relative;
    left: -20px;
    z-index: 96;
    .hidden{
        display: none;
    }
    &:before {
		content: "";
		border: 5px solid #fff;
		border-left-color: transparent;
		border-bottom-color: transparent;
		position: absolute;
		transform: rotate(-45deg);
		left: 24px;
		box-shadow: 2px -2px 2px rgba(200, 200, 200, 0.4);
		top: -5px;
	}
	.close-btn {
		position: absolute;
		top: 10px;
		right: 10px;
		.ivu-icon {
			font-size: 18px;
            color: #999;
            cursor: pointer;
			&:hover {
				color: #555;
			}
		}
	}
	.num-bar {
		.num-text {
			float: left;
			color: #999;
		}
		.sure {
            float: right;
            line-height: 24px;
            cursor: pointer;
			padding: 0 12px;
			border-radius: 2px;
			border: solid 1px @pinkish-grey;
            color: @black;
            &:hover{
                background-color: #f5f5f5;
            }
		}
    }
    .img-lists{
        min-height: 60px;
    }
    .imgdiv{
        width: 60px;
        height: 60px;
        float: left;
        margin: 4px;
        border: 1px dashed #ddd;
        position: relative;
        .img{
            width: 100%;
            height: 100%;
        }
        &:hover{
            .del-btn{
                display: block;
            }
            &:after{
                background: rgba(255, 255, 255, 0.8);
                content: " ";
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                position: absolute;
                height: 100%;
                z-index: 20;
            }
        }
        .del-btn{
            position: absolute;
            left: 20px;
            top: 16px;
            color: #6f5454;
            font-size: 26px;
            cursor: pointer;
            display: none;
            z-index: 77;
            
        }
    }
    .add-icon{
        width: 60px;
        height: 60px;
        margin: 4px;
        float: left;
        border: 2px dashed @pinkish-grey;
        text-align: center;
        line-height: 60px;
        border-radius: 4px;
        .ivu-icon{
            color: @pinkish-grey;
            font-size: 20px;
        }
        &:hover{
            cursor: pointer;
            border-color: #aaa;
            .ivu-icon{
                color: #aaa;
            }
        }
    }
}
</style>
<template>
    <div class="crm-up-img">
        <div class="close-btn" @click="close">
            <Icon type="android-close"></Icon>
        </div>
        <div>
            <h3>上传图片</h3>
            <p>单个图片5M以内</p>
        </div>
        <div class="img-lists clearfix">
            <div class="imgdiv" v-if="imgUrl">
                <img class="img" :src="imgUrl">
                <Icon @click.native="delImg()" class="del-btn" type="trash-a"></Icon>
            </div>
            <label class="add-icon" v-if="!imgUrl" :for="uid">
                <Icon type="android-add" ></Icon>
            </label>
        </div>

        <div class="num-bar clearfix">
            <button class="sure" @click="sure">确定</button>
        </div>
        <input type="file" :id="uid" class="hidden" accept="image/*" @change="onFileChange">
        
    </div>
</template>
<script>
import { util } from '@public/libs/util'
import valid,{errors, sys } from '../../libs/request.js'
import {MENUIDS} from '@public/libs/config.js'
import {mapMutations} from 'vuex';
import { clone } from '@public/libs/util.js'

const cfg = {
    api:'/',
    k:'files',
    data:{
        dirName:'all',
        type:'trace_img',
		menuId:MENUIDS.APPLY
    },
    maxsize:1024*1024*5,
};
export default {
    props:{
        setimg:{
            type:String,
        }
    },
	data() {
		return {
            uid:util.uuid(),
            imgUrl: this.setimg,
            id:''
		};
	},
	methods: {
        ...mapMutations(['updateLoadingStatus']),
		close() {
            this.$emit("closeUploadImg");
        },
        sure(){
			this.$emit("onImgChange",{imgUrl: this.imgUrl, id: this.id});
        },
        onFileChange(e){
            const file = e.target.files[0];
            if(file){
                if(file.size>this.maxsize){
                    this.error=new Error('文件超过限定大小');
                }else{
                    this.error=false;
                    this.send(file);
                }
            }
        },
        send(file){
            const data = new FormData();
            data.append(cfg.k,file);
            Object.keys(cfg.data).forEach(item=>{
                data.append(item,cfg.data[item]);
            })
            this.updateLoadingStatus({isLoading: true});
            sys.uploadFile(data).then(valid.call(this)).then(res=>{
                if(res){
                    this.imgUrl = res.data.data.filePath;
                    this.id = res.data.data.id;
                }
            }).catch(errors.call(this)).finally(()=>{
                this.updateLoadingStatus({isLoading:false});
            });
        },
        delImg(){
            this.imgUrl = '';
            this.id = ''
        }
    },
    watch:{
        num(v){
           
        }
    }
};
</script>


