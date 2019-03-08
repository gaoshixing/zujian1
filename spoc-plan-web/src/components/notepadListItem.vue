<style lang="less">
	.notepade-list-item {
		height: 100px;
		min-width: 530px;
		box-sizing: border-box;
		position: relative;
		padding-left: 120px;
		margin-bottom: 20px;
		>img {
			width: 100px;
			height: 100px;
			position: absolute;
			left: 0;
			top: 0;
			cursor: pointer;
		}
	}
	.notepad-container {
		padding: 10px 0 5px 0px;
		height: 100%;
		position: relative;
		p {
			display: inline-block;
		}
		> div {
			height: 20px;
			line-height: 20px;
			position: relative;
			p:nth-of-type(1) {
				font-size: 16px;
				color: #333;
				// min-width: 250px;
				// max-width: 700px;
				margin-right: 40px;
				max-width: 750px;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
		}
		>p {
			bottom: 0;			
			font-size: 14px;
			color: #999999;			
			position: absolute;
		}
		.notepade-list-item-menu {
			visibility: hidden;
			font-size: 14px;
			bottom: -2px;
			color: #44bcb7;
			margin-left: 40px;
			span {
				cursor: pointer;
			}
			>span:nth-of-type(2) {
				margin-left: 30px;
			}
		}
	}
</style>
<template>
	<div 
		ref="refNotepad"
		class="notepade-list-item">
		<img v-show="thumbnail" :src="thumbnail" alt="" @click="onclickDetail">
		<img v-show="!thumbnail" src="../assets/images/default-notepade-logo.png" alt="" @click="onclickDetail" style="opacity: 0.6;">
		<div class="notepad-container">
			<div>
				<p style="cursor:pointer;color: #44BCB7;" @click="onclickDetail">{{title}}</p>
				<p  class="notepade-list-item-menu" ref="refMenus">
					<span @click="onclickEdit">编辑</span>
					<span @click="onclickDelete">删除</span>
				</p>
				<p style="display:block;line-height:35px;color:#999999;"><span>创建人：</span>{{userName}}</p>
			</div>
			<p><span>更新时间：</span>{{date}}</p>
		</div>
	</div>
</template>

<script>
import { mapState, } from 'vuex';
import { waitUntil, } from '../libs/util';
export default {
	name: 'NotepadListItem',
	props: {
		thumbnail: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		userName: {
			type: String,
			default: '',
		},
		// 记事本创建者id
		createby: {
			type: String,
			required: true,
		},
	},
	computed: {
		...mapState({
			userId: state => state.userInfo.id,
		}),
	},
	mounted() {
		waitUntil(()=>{
			return !!this.userId;
		},()=>{
			this.hoverMethods();
		});
	},
	methods: {
		onclickEdit() {
			this.$emit('onclickEditNote');
		},
		onclickDelete() {
			this.$emit('onclickDeleteNote');
		},
		onclickDetail() {
			this.$emit('onclickDetail');
		},
		hoverMethods() {
			if (this.userId === this.createby) {
				this.$refs.refNotepad.addEventListener('mouseenter', () => {
					this.$refs.refMenus.style.visibility = 'visible';
				});
				this.$refs.refNotepad.addEventListener('mouseleave', () => {
					this.$refs.refMenus.style.visibility = 'hidden';
				});
			}
		},
	},
};
</script>