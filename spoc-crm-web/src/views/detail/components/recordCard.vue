<style lang="less">
@white: #fff;
@light-moss-green: #a4cb6d;
@greeny-blue: #44bcb7;
@warm-grey: #999;
@pinkish-grey: #ccc;
.record-card {
	border-radius: 4px;
	box-shadow: 0 0 4.9px 0.1px rgba(26, 178, 255, 0.19);
	background-color: @white;
	border: solid 1px #e7ebf1;
	margin: 20px 0 20px 0;
	padding: 10px;
	box-sizing: border-box;
	position: relative;
	div{
	    word-wrap: break-word;
	    word-break: break-all;
	}
	&.item-review {
		border-color: #f33;
	}
	.editable {
		.ivu-btn {
			position: absolute;
			right: 10px;
			bottom: 10px;
		}
	}
	.title {
		padding-bottom: 8px;
		.uname {
			float: left;
			color: @light-moss-green;
			font-size: 14px;
		}
		.utype {
			float: right;
			color: @warm-grey;
			font-size: 12px;
			.iconfont {
				color: #fbc271;
			}
			&.orange {
				color: #fbc271;
			}
		}
	}
	.tg {
		font-weight: 600;
		& + .tg {
			margin-left: 10px;
		}
	}
	.b {
		font-weight: 600;
	}
	.foo-date {
		margin-top: 10px;
		color: @warm-grey;
	}
	.stat-change {
		text-align: center;
		.istat {
			border: solid 1px @warm-grey;
			padding: 5px 12px;
			display: inline-block;
			width: 90px;
			color: @warm-grey;
			font-weight: 600;
			&.active {
				border: solid 1px @light-moss-green;
				color: @light-moss-green;
			}
		}
		.ivu-icon {
			width: 40px;
			font-size: 14px;
			color: @warm-grey;
		}
	}
	.img-lists {
		.img-item {
			width: 80px;
			height: 80px;
			background-color: #ddd;
			float: left;
			margin: 10px 10px 10px 0;
			.img {
				width: 100%;
				height: 100%;
			}
		}
	}
	.file-lists {
		position: relative;
		.f-title {
			position: absolute;
		}
		.f-list {
			padding-left: 40px;
			.it {
				cursor: pointer;
				color: @greeny-blue;
			}
		}
	}
	.can-play {
		.iconfont {
			margin-left: 4px;
			color: @greeny-blue;
			font-size: 14px;
			cursor: pointer;
			transition: color 0.3s ease;
			&:hover {
				color: #38a9a4;
			}
		}
	}
	.can-play-wechat {
		background: #44bcb7;
		width: 70px;
		height: 30px;
		border-radius: 5px;
        margin-right: 10px;
        float: left;
		cursor: pointer;
		&:hover {
			background: #38a9a4;
		}
		.player-icon {
			width: 12px;
			height: 15px;
			margin-top: 9px;
			margin-left: 15px;
		}
    }
    .voice-time{
        float: left;
        height: 30px;
        line-height: 30px;
    }
}
</style>
<template>
    <div class="record-card" :class="'item-'+data.type">
            <div class="title clearfix">
                <p class="uname">{{data.createName}}</p>
                <p class="utype" :class="{orange:data.type=='review'}">
                    {{data.typeLabel}}
                    <i class="iconfont" :class="icon"></i>
                </p>
            </div>
            <template v-if="data.content.title">
                <div v-text="data.content.title"></div>
            </template>
            <template v-if="data.content.content">
                <div v-html="data.content.content.replace(/\r|\n/g,'<br/>')"></div>
            </template>
            <template v-if="data.content.txtArray.length">
                <div v-for="(item,index) in data.content.txtArray" :key="'txt'+index">
                    {{item}}
                </div>
            </template>
            <template v-if="data.content.oldValue && data.content.newValue">
                <div class="stat-change">
                    <span class="istat">{{data.content.oldValue}}</span>
                    <Icon type="arrow-right-a"></Icon>
                    <span class="istat active">{{data.content.newValue}}</span>
                </div>
            </template>
            <template v-if="data.content.tags.length">
                <div>
                    <span class="tg" v-for="(tg,index) in data.content.tags" :key="'tg'+index" v-text="tg"></span>
                </div>
            </template>
            <template v-else-if="0">
                <div>
                    <p>
                        <span class="b">初步意向，邀约见面</span> 
                        <a>查看计划详情</a>
                    </p>
                    <p>
                        回访时间：<span class="b">2018-07-22 15：30</span>
                        <i class="icon"></i>
                    </p>
                </div>
            </template>
            <template v-if="data.content.imgList.length || data.content.fileList.length">
                <div>
                    <div class="img-lists clearfix" v-if="data.content.imgList.length">
                        <div class="img-item" v-for="(item,index) in data.content.imgList" :key="'img'+index">
                            <img class="img" :src="item.filePath" alt="" @click="open(item.filePath)" >
                        </div>
                    </div>
                    <div class="file-lists" v-if="data.content.fileList.length">
                        <span class="f-title">文件：</span>
                        <ul class="f-list">
                            <li class="it" v-for="(f,index) in data.content.fileList" :key="'f'+index" @click="openFile(f)">{{f.fileName?f.fileName:f.name}}</li>
                        </ul>
                    </div>
                </div>
            </template>
            <template v-if="data.content.audioList.length">
                <div class="clearfix" v-for="item in data.content.audioList" :key="item.id">
                    <div class="can-play-wechat" @click="playUrl(item.filePath)" >
                        <img class="player-icon" :src="voiceimg" alt="">
                    </div>
                    <span class="voice-time">{{item.remarks | format2}}</span>
                </div>
            </template>
            <template v-if="data.fullTime">
                <div class="can-play" >
                    <span>通话时长：</span>
                    <span class="b">{{ data.fullTime | format}}</span>
                    <!--<i class="iconfont icon-bofang" @click="playId(data.fileId,data.fullTime)" v-if="data.recordList.length>0"></i>-->
                </div>
            </template>
            <div class="foo-date">
                {{data.createDate}}
            </div>
            <div class="editable" v-if="editable && canedit">
                <Button type="primary" size="small" @click="doedit">编辑</Button>
            </div>
            
            
        
        
    </div>
</template>
<script>
import { util } from "@public/libs/util";
import { mapMutations, mapState, mapGetters } from "vuex";
import {sys} from '../../../libs/request.js';

const typeMap = {
	review: "icon-dianping",
	trace: "icon-jilu1",
	callplan: "icon-tubiaokuozhan-",
	call: "icon-dianhua"
};
const defaultIcon = "icon-xiaoxituisong";
import voicePaused from "../../../assets/voice.png";
import voicePaying from "../../../assets/voice.gif";

export default {
	props: {
		data: {
			type: Object,
			required: true
		},
		editable: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			playing: false,
			audio: {}
		};
	},
	computed: {
		...mapState(["userInfo"]),
		canedit() {
			return (
				["trace", "review", "callplan", "call"].includes(
					this.data.type
				) && this.data.createBy == this.userInfo.id
			); // 日常跟进
		},
		icon() {
			return typeMap[this.data.type]
				? typeMap[this.data.type]
				: defaultIcon;
		},
		voiceimg() {
			if (this.playing) {
				return voicePaying;
			}
			return voicePaused;
		}
	},
	mounted() {
		this.audio = new Audio();
		this.audio.addEventListener(
			"playing",
			() => {
                this.playing = true;
                setTimeout(()=>{
                    console.info(this.voiceimg);
                },0);
			},
			false
        );
        this.audio.addEventListener(
			"ended",
			() => {
				this.playing = false;
			},
			false
        );
        this.audio.addEventListener(
			"error",
			() => {
				this.playing = false;
			},
			false
		);
	},
	methods: {
		playUrl(url, t) {
			console.log(this.audio.paused)
            if(this.audio.paused){
                this.audio.src = url;
                this.audio.crossOrigin = 'anonymous';
                this.audio.play();
            }
            debugger;
		},
		playId(id, t) {
			const url = `/spoc-crm/a/ws/sys/attachment/display?id=${id}`;
			this.$emit("play", url, t);
		},
		doedit() {
			this.$emit("edit", this.data);
		},
		open(href) {
			window.open(href);
		},
		onupdate(v) {
			// console.info(v)
		},
		openFile(f){
			if(f.filePath){
				return this.open(f.filePath);
			}
			const url = sys.downloadPan(f.dir,f.name);
			return this.open(url);
		}
	},
	filters: {
		format(t) {
			return util.durationFormat(t);
		},
		format2(t) {
			if (t > 60) {
				const m = Math.floor(t / 60);
				const s = t - 60 * m;
				return `${m}'${s}''`;
			}
			return `${t}''`;
		}
	}
};
</script>


