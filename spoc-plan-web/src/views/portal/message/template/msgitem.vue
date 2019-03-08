<style lang="less">
@green:#68e2c6;
@darkGreen:#3cb4ae;
.msgitem-wrapper{
	margin: 20px 0;
	padding: 10px;
	.fname{
		overflow: hidden;
		background-color: @green;
		color: #fff;
		font-size: 18px;
		text-align: center;
		width: 50px;
		height: 50px;
		line-height: 50px;
		border-radius: 50%;
		position: absolute;
		text-transform: uppercase;
		
	}
	.name{
		font-size: 12px;
	}
	.title{
		color: #aaa;
		font-size: 12px;
	}
	.content{
		display: inline-block;
		margin-top: 10px;
		min-height: 1.3em;
		min-width: 3em;
		max-height: 13em;
		max-width: 36em;
		word-wrap: break-word;
		word-break: break-all;
		overflow: hidden;
		font-weight: 400;
		font-size: 14px;
		line-height: 1.3;
		padding-left: 0;
		padding-right: 0;
		&>i{
			font-style: normal;
			background-color: #75fff8;
			margin: 0 2px;
		}
		&>.icon{
			font-size: 60px;
		}
		&.notice{
			.ahover{
				margin-left: 15px;
			}
		}
	}
	.others{
		overflow: hidden;
		position: relative;
		.l-c{
			padding-left: 60px;
			min-height: 50px;
			p{
				margin: 0;
			}
		}
		
	}
	.me{
		overflow: hidden;
		position: relative;
		.fname{
			position: absolute;
			right: 0;
		}
		.r-c{
			float: right;
			text-align: right;
			min-height: 50px;
			padding-right: 60px;
			p{
				margin: 0;
			}
			.content{
				text-align: left;
			}
		}
		.file-content{
			text-align: left;
		}
		.f-ctrl{
			float: left;
			padding-right: 0;
		}
	}
	.atname{
		background-color: #75fff8;
	}
	.ahover{
		color: @green;
		cursor: pointer;
		&:hover{
			color: @darkGreen;
		}
	}
	.share-title{
		margin: 15px 0 10px;
		color: #aaa;
	}
	.file-content{
		overflow: hidden;
		padding: 5px 1px;
		.filebox{
			width: 230px;
			height: 50px;
			box-shadow: 0 0 3px #ddd;
			float: left;
			padding: 10px;
			overflow: hidden;
			box-sizing: content-box;
			.typeicon{
				display: block;
				width: 50px;
				height: 50px;
				float: left;
				position: relative;
				top: -10px;
				.iconfont{
					font-size: 46px;
					color: @darkGreen;
				}
			}
			.f-info{
				padding-left: 55px;
				height: 50px;
				position: absolute;
				font-size: 14px;
				.f-name{
					font-size: 14px;
					max-width: 180px;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
				.fsize{
					display: inline-block;
					min-width: 50px;
					max-width: 100px;
					overflow: hidden;
					color: #aaa;
				}
				.ftype{
					display: inline-block;
					width: 65px;
					overflow: hidden;
					color: #aaa;
					padding-left: 20px;
					text-transform: uppercase;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.f-meta{
					margin: 5px 0 0;
				}
			}
			
		}
		.f-ctrl{
			padding-top: 50px;
			.download-btn{
				display: inline-block;
				color: @green;
				margin: 0 10px;
				cursor: pointer;
				text-decoration: none;
				&:hover{
					color: @darkGreen;
				}
			}
		}
	}
	.chat-img{
		padding: 5px;
		border-radius: 5px;
		margin: 10px 0;
		box-shadow: 1px 1px 10px #ddd;
		display: inline-block;
		&:hover{
			box-shadow: 1px 1px 13px #ddd;
		}
		.chat-img-sm{
			max-width: 300px;
			max-height: 300px;
			cursor: pointer;
		}
	}
}
</style>
<template>
  <div class="msgitem-wrapper" :rel="data.id">
	  <div v-if="!me" class="others">
		  <div class="fname" v-if="data.photo">
            <img :src="data.photo" alt="">
		  </div>
		  <div class="fname" v-else>{{fname}}</div>
		  <div class="l-c">
			  <p>
					<span class="name">{{data.from}}</span>
					<span class="title">({{data.title}})</span>
			  </p>
			  <template v-if="data.type===config.MSG_TYPE_TEXT">
				  <div class="content" v-html="parse(data.content)"></div>
			  </template>
			  <template v-else-if="data.type===config.MSG_TYPE_NOTICE">
				  <div class="content notice">
						{{data.content}}
					 	<a class="ahover" @click="showSend">[发送通知]</a>
				  </div>
			  </template>
			  <template v-else-if="data.type===config.MSG_TYPE_SHARE">
				  <div class="share-title">分享了文件</div>
				  <div class="file-content">
					  <div class="filebox">
						  <div class="typeicon">
							  <i class="iconfont icon-wenjian1"></i>
						  </div>
						  <div class="f-info">
							  <p class="f-name">{{data.content}}</p>
							  <p class="f-meta">
								  <span class="fsize">{{data.ext2 | byteFormat}}</span>
								  <span class="ftype">{{data.content | extname}}</span>
							  </p>
						  </div>
					  </div>
					  <div class="f-ctrl">
						  <a class="download-btn" target="_blank" :href="url(data.content,data.ext3)" >[下载]</a>
					  </div>
				  </div>
			  </template>
			  <template v-else-if="data.type===config.MSG_TYPE_IMG">
				  <div class="chat-img">
					  <img :src="imgUrl(data.content,data.ext3)" @click="showImg" class="chat-img-sm">
				  </div>
			  </template>
		  </div>
	  </div>
	  <div v-else class="me">
		  <div class="r-c">
			  	<p>
					<span class="name">{{data.from}}</span>
			  	</p>
			  	<template v-if="data.type===config.MSG_TYPE_TEXT">
					<div class="content" v-html="parse(data.content)"></div>
			  	</template>
				<template v-else-if="data.type===config.MSG_TYPE_NOTICE">
					<div class="content notice">
						{{data.content}}
						<a class="ahover" @click="showSend">[发送通知]</a>
					</div>
			  	</template>
			  	<template v-else-if="data.type==config.MSG_TYPE_SHARE">
					<div class="share-title">分享了文件</div>
					<div class="file-content">
						<div class="f-ctrl">
							<a class="download-btn" @click="doDel" >[删除]</a>
							<a class="download-btn" target="_blank" :href="url(data.content,data.ext3)" >[下载]</a>
						</div>
						<div class="filebox">
							<div class="typeicon">
								<i class="iconfont icon-wenjian1"></i>
							</div>
							<div class="f-info">
								<p class="f-name">{{data.content}}</p>
								<p class="f-meta">
									<span class="fsize">{{data.ext2 | byteFormat}}</span>
									<span class="ftype">{{data.content | extname}}</span>
								</p>
							</div>
						</div>
						
					</div>
				</template>
				<template v-else-if="data.type===config.MSG_TYPE_IMG">
					<div class="chat-img">
						<img :src="imgUrl(data.content,data.ext3)" @click="showImg" class="chat-img-sm">
					</div>
				</template>
			  
		  </div>
		  <div class="fname" v-if="data.photo">
            <img :src="data.photo" alt="">
		  </div>
		  <div class="fname" v-else>{{fname}}</div>
	  </div>
  </div>
</template>
<script>
import { config,util } from '../connection/socket.js';
import { extname, dateFormate } from '../../../../libs/util.js';
export default {
	props:{
		data:{
			type:Object,
			required:true,
		},
		userInfo:{
			type:Object,
			required:true,
		}
	},
	data(){
		return {
			config:config,
			sendbox:{
				show:false,
			}
		}
	},
	computed:{
		fname(){
			return this.data.from.substr(0,1);
		},
		me(){
			return this.data.me;
		},
		
	},
	methods:{
		parse(str){
			return util.parse(str,this.userInfo.name);
		},
		url(name,dir){
			return this.$parent.$parent.url(name,dir);
		},
		imgUrl(name,dir){
			const url = this.url(name,dir);
			return `${url}&img=1`;
		},
		showImg(){
			const u = this.imgUrl(this.data.content,this.data.ext3);
			this.$parent.$parent.showImg(u);
		},
		showSend(){
			this.$emit('showsend',this.data);
		},
		doDel(){
			this.$Modal.confirm({
				title: '确认删除',
				content: '此操作将不可撤销，确认删除？',
				onOk: () => {
					const root = this.$parent.$parent.$parent;
					if(root && root.toDel){
						root.toDel(this.data);
					} else {
						console.error('err');
					}
				},
			});
		}
	},
	filters:{
		byteFormat(s){
			return util.byteFormat(s);
		},
		extname(s){
			return extname(s);
		},
		
	}
}
</script>


