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
                background: rgba(1, 1, 1, 0.5);
                content: " ";
                left: 0;
                top: 30px;
                right: 0;
                bottom: 0;
                width: 100%;
                position: absolute;
                z-index: 20;
            }
        }
        .del-btn{
            position: absolute;
            left: 40px;
            top: 35px;
            color: #fff;
            font-size: 20px;
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
            <div class="imgdiv" v-for="(item,index) in imgs" :key="index">
                <img class="img" :src="item.filePath">
                <Icon @click.native="delImg(index, item)" class="del-btn" type="trash-a"></Icon>
            </div>
            <label class="add-icon" v-if="maxNum == 0 || imgs.length < maxNum" :for="uid">
                <Icon type="android-add" ></Icon>
            </label>
        </div>

        <div class="num-bar clearfix">
            <p class="num-text" v-if="maxNum > 0">{{num}}</p>
            <button class="sure" @click="sure">确定</button>
        </div>
        <input type="file" :id="uid" class="hidden" accept="image/*" @change="onFileChange">
        
    </div>
</template>
<script>
import { util } from '@public/libs/util'
import valid,{errors, sys } from '../../../libs/request.js'
import {MENUIDS} from '@public/libs/config.js'
import {mapMutations} from 'vuex';
import { clone } from '@public/libs/util.js'

export default {
    props:{
        setimg:{
            type:Array,
            default:()=>{
                return [];
            }
        },
        cfg: {
            type: Object,
            default: ()=>{
                return {
                    api:'/',
                    k:'files',
                    data:{
                        dirName:'all',
                        type:'trace_img',
                        menuId:MENUIDS.CRM
                    },
                    maxsize:1024*1024*5,
                }
            }
        },
        maxNum: {
            type: [Number || String],
            default: 9
        }
    },
	data() {
		return {
            uid:util.uuid(),
            imgs:clone(this.setimg)
		};
	},
	computed: {
		num() {
			return `${this.imgs.length}/${this.maxNum}`;
		}
    },
    components:{
        
    },
	methods: {
        ...mapMutations(['updateLoadingStatus']),
        init(){
			this.imgs = clone(this.setimg);
		},
		close() {
            this.$emit("close");
        },
        sure(){
			this.$emit("close");
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
            data.append(this.cfg.k,file);
            Object.keys(this.cfg.data).forEach(item=>{
                data.append(item,this.cfg.data[item]);
            })
            this.updateLoadingStatus({isLoading: true});
            sys.uploadFile(data).then(valid.call(this)).then(res=>{
                if(res){
                    console.info(res);
                    const item = res.data.data;
                    this.imgs.push(item);
                }
            }).catch(errors.call(this)).finally(()=>{
                this.updateLoadingStatus({isLoading:false});
            });
        },
        delImg(index,item){
            this.imgs.splice(index,1);
            this.$emit('onDelImg',item);
        }
    },
    watch:{
        num(v){
            this.$emit('on-change',this.imgs);
        }
    }
};
</script>


