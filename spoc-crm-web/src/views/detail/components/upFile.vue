<style lang="less">
@pinkish-grey: #ccc;
@black: #333;
@white: #e0e0e0;
.crm-up-file {
	position: relative;
	box-shadow: 0 0 10px 0 rgba(4, 0, 0, 0.15);
	border: solid 1px @white;
	padding: 10px;
	width: 419px;
	min-height: 188px;
	max-height: 300px;
	box-sizing: border-box;
	background-color: #fff;
	left: -20px;
	z-index: 90;
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
	.hidden{
		display: none;
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
			&:hover {
				background-color: #f5f5f5;
			}
		}
	}
	.file-lists {
		min-height: 50px;
		.li{
			list-style: none;
		}
		.del-btn{
			color: #f00;
			cursor: pointer;
		}
	}
}
</style>
<template>
    <div class="crm-up-file">
        <div class="close-btn" @click="close">
            <Icon type="android-close"></Icon>
        </div>
        <div>
            <h3>上传文件</h3>
            <p>提示：一次跟进记录最多添加3个文件，支持doc、docx、xls、pdf格式</p>
            <div>
                <Button :disabled="files.length>=maxNum" type="success" size="small" @click="showyunpan">云盘上传</Button>
                <Button :disabled="files.length>=maxNum" type="success" size="small" @click="uplocal">本地上传</Button>
            </div>
            <div class="file-lists">
                <ul>
                    <li class="li" v-for="(item,index) in files" :key="'f'+index">
                        <span>{{item.name?item.name:item.fileName}}</span>
                        <span class="del-btn" @click="delfile(item,index)">删除</span>
                    </li>
                </ul>
            </div>
            <div class="num-bar clearfix">
                <p class="num-text">{{num}}</p>
                <button class="sure" @click="sure">确定</button>
            </div>
        </div>
		<div v-if="pan.show">
			<yunpan @on-confirm="doSendFile" ref="yunpan" @on-cancel="doCancel" :visible="pan.visible"></yunpan>
		</div>
        <input type="file" class="hidden" accept="application/msword,application/pdf,application/vnd.ms-excel" @change="onFileChange">
    </div>
</template>
<script>
import yunpan from "@public/modules/yunpan";
import valid,{errors, sys } from '../../../libs/request.js'
import {MENUIDS} from '@public/libs/config.js'
import {mapMutations} from 'vuex';
import { clone } from '@public/libs/util.js'
const cfg = {
    api:'/',
    k:'files',
    data:{
        dirName:'all',
		type:'trace_file',
		menuId:MENUIDS.CRM
    },
    maxsize:1024*1024,
};
export default {
	props:{
        setfile:{
            type:Array,
            default:()=>{
                return [];
            }
		},
		cusId:{
			type:String,
			required:true,
		}
    },
	data() {
		return {
			maxNum: 3,
			files: clone(this.setfile),
			pan:{
				show:false,
				visible:false,
			}
		};
	},
	computed: {
		num(){
			return `${this.files.length}/${this.maxNum}`;
		}
	},
	components: {
		yunpan,
	},
	methods: {
		...mapMutations(['updateLoadingStatus']),
		init(){
			this.files = clone(this.setfile);
		},
		close() {
			this.$emit("close");
		},
		sure(){
			this.$emit("close");
		},
		uplocal() {
			this.$el.querySelector('.hidden').click();
		},
		showyunpan() {
			this.pan.visible = true;
			this.pan.show = true;
		},
		doSendFile(item) {
			this.files.push(Object.assign({},item));
			this.doCancel();
		},
		doCancel() {
			this.pan.visible = false;
			setTimeout(() => {
				this.pan.show = false;
			}, 300);
		},
	
		delfile(file,i){
			this.files.splice(i,1);	
		},
		 onFileChange(e){
            const file = e.target.files[0];
            if(file){
                if(file.size>cfg.maxsize){
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
					const item = res.data.data;
					debugger;
					this.files.push(item);
                }
            }).catch(errors.call(this)).finally(()=>{
                this.updateLoadingStatus({isLoading:false});
			});
        }
	},
    watch:{
        num(v){
            this.$emit('on-change',this.files);
        }
    }
};
</script>


