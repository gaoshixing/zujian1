<style lang="less">
@green: #44bcb7;
.audio-player {
	background-color: #353f46;
	display: flex;
	height: 60px;
	line-height: 60px;
	margin: 20px;
	position: relative;
	.icon {
		flex: 1;
		text-align: center;
		.iconfont {
			color: #ddd;
			font-size: 30px;
			cursor: pointer;
			transition: all 0.4s ease;
			&:hover {
				color: #fff;
			}
		}
	}
	.progress {
		flex: 7;
		height: 2px;
		background-color: #e0e0e0;
		margin-top: 29px;
		position: relative;
		.played {
			width: 1px;
			height: 2px;
			background-color: @green;
			transition: all 0.06s linear;
		}
		.dot {
			width: 12px;
			height: 12px;
			border-radius: 50%;
			cursor: pointer;
			background-color: @green;
			position: absolute;
			margin-left: -6px;
			margin-top: -7px;
			transition: all 0.06s linear;
		}
	}
	.duration {
		flex: 2;
		color: #959595;
		text-align: center;
		user-select: none;
	}
	.close-btn{
		position: absolute;
		right: 5px;
		top: 5px;
		line-height: normal;
		.ivu-icon{
			color: #aaa;
			font-size: 16px;
			cursor: pointer;
			&:hover{
				color: #eee;
			}
		}
	}
}
</style>
<template>
    <div class="audio-player">
        <div class="icon">
			<i class="iconfont" @click="toggle" :class="{'icon-bofang':audio.paused!==false,'icon-zanting':audio.paused===false}"></i>
		</div>
        <div class="progress">
            <div class="played" :style="playstyle"></div>
			<div class="dot" :style="dotstyle" @mousedown="mousedown" ></div>
        </div>
        <div class="duration">
			<template v-show="timeok">
				<span>{{currTime}}</span> / <span>{{totalTime}}</span>
			</template>
        </div>
		<div v-if="closeable" class="close-btn" @click="onClose">
			<Icon type="android-close"></Icon>
		</div>
    </div>
</template>
<script>
import { util, throttle } from "@public/libs/util";
export default {
	props: {
		src: {
			type: String,
			default: ''
		},
		closeable:{
			type:Boolean,
			default:false
		},
		duration:{
			type:Number,
			default:0,
		}
	},
	data() {
		return {
			source: this.src,
			ctl: {
				w: 0,
				x: 0,
				move: false
			},
			audio: {},
			playInfo: {
				currentTime: 0,
				played: 0,
				duration: this.duration
			}
		};
	},
	computed: {
		currTime() {
			return util.timeFormat(this.playInfo.currentTime);
		},
		totalTime() {
			return util.timeFormat(this.playInfo.duration);
		},
		timeok() {
			return this.playInfo.duration;
		},
		playstyle() {
			return {
				width: this.playInfo.played + "%"
			};
		},
		dotstyle() {
			return {
				left: this.playInfo.played + "%"
			};
		}
	},
	mounted() {
		this.audio = new Audio();
		this.audio.src = this.source;
		this.audio.addEventListener(
			"timeupdate",
			throttle(this.onupdate, 200),
			false
		);
		this.audio.addEventListener("ended", this.onplayend, false);
		this.ctl.w = this.$el.querySelector(".progress").clientWidth;
	},
	beforeDestory() {},
	methods: {
		toggle() {
			if (this.audio.paused) {
				this.play();
			} else {
				this.pause();
			}
		},
		changePlay(src){
			this.change(src);
			this.play();
		},
		change(src) {
			this.stop();
			this.source = src;
			this.audio.src = this.source;
		},
		play() {
			this.audio.play();
			this.onupdate();
		},
		stop() {
			this.pause();
			this.audio.currentTime = 0;
		},
		pause() {
			this.audio.pause();
			this.onupdate();
		},
		info() {
			const player = this.audio;
			const info = {
				duration: player.duration,
				currentTime: player.currentTime,
				played: Number(
					(player.currentTime * 100 / player.duration).toFixed(2)
				)
			};
			return info;
		},
		onupdate() {
			const info = this.info();
			this.playInfo.currentTime = info.currentTime;
			this.playInfo.duration = info.duration;
			if (!this.ctl.move) {
				this.playInfo.played = info.played;
			}
		},
		onplayend() {},
		mousedown(e) {
			this.ctl.move = true;
			this.ctl.x = e.pageX;
			window.addEventListener("mousemove", this.mousemove, false);
			window.addEventListener("mouseup", this.mouseup, false);
		},
		mouseup() {
			window.removeEventListener("mousemove", this.mousemove);
			window.removeEventListener("mouseup", this.mouseup);
			this.ctl.move = false;
			this.audio.currentTime =
				this.audio.duration * (this.playInfo.played?this.playInfo.played:0) / 100;
		},
		mousemove(e) {
			if (this.ctl.move) {
				const v = (e.pageX - this.ctl.x) * 100 / this.ctl.w;
				this.playInfo.played += v;
				if (this.playInfo.played > 100) {
					this.playInfo.played = 100;
					return;
				}
				if (this.playInfo.played < 0) {
					this.playInfo.played = 0;
					return;
				}
				this.ctl.x = e.pageX;
			}
		},
		onClose(){
			this.$emit('on-close');
		}
	}
};
</script>


