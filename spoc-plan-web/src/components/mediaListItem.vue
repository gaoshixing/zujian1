<template>
	<div 
		ref="refBillList"
		class="media-list-item-boss">
		<img class="media-list-item-img"v-if="!status && thumbnail" :src="thumbnail" alt="">
		<i v-if="(status == 1 || status == 3) && !approvalChecking" class="iconfont icon-zhang_ icon-status-common icon-status-Pass"><span>Pass</span></i>
		<i v-if="(status == 0) && !approvalChecking" class="iconfont icon-zhang_ icon-status-common icon-status-Checking"><span>Checking</span></i>
		<i v-if="status == 2 && !approvalChecking" class="iconfont icon-zhang_ icon-status-common icon-status-Reject"><span>Reject</span></i>
		<i class="icon-media-logo">
			<img src="../assets/images/bill-logo.png" alt="" @click="onclickBillDetail">
		</i>

		<slot></slot>

		<div
			class="media-list-item-content">
			<div>
				<p 
					@click="onclickBillDetail"
					style="cursor:pointer;font-weight:normal;"
					:class="[importantColor ? 'media-list-item-importantColor': '']">
					{{title}}
				</p>
				<!-- 游客:{{userId}} == 报账人:{{id}} == 操作人:{{createUserId}} == 组长{{groupParterId}} -->
				<span
					v-show="types!=='审批' && isAudit == 2 && ( (userId == id) || (userId == createUserId))"
					ref="refEdit"
					style="cursor:pointer"
					@click="onclickEditBill">
					编辑
				</span>
				<span 
					v-show="types!=='审批' && isAudit == 2 && ( (userId == id) || (userId == createUserId))"
					style="cursor:pointer"
					ref="refDelete"
					@click="onclickdeleteBill">
					删除
				</span>
			</div>
			<p 
				v-if="types !== '我的账单'"
				@click="onclickBillDetail"
				class="media-list-item-span-date">
				{{date}}
			</p>
			<p 
				v-if="types === '我的账单'"
				@click="onclickBillDetail"
				class="media-list-item-span-detail">
				<span>报账人:  <b>{{submiter}}</b></span>
				<span>报账金额:  <b>{{submitTypes}} {{submitCount | currency}}</b></span>
				<span>报账时间:  <b>{{date}}</b></span>
				<span>沟通时长:  <b>{{conmunicateTime}}</b></span>		
			</p>
			<p class="media-list-item-describ">{{describ}}</p>
		</div>
	</div>
</template>

<script>
import { waitUntil, currency, } from '../libs/util';
import { mapState } from "vuex";
export default {
	name: 'MediaListItem',
	props: {
		thumbnail: {
			type: String,
		},
		title: {
			type: String,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		describ: {
			type: String,
			required: true,
		},
		/*
		* 判断显示的类型
		*/
		types: {
			type: String,
		},
		status: {
			default: null,
		},
		submiter: {
			type: String,
		},
		importantColor: {
			type: Boolean,
			default: false,
		},
		approvalChecking: { // 审核页待审核 默认不显示图标
			type: Boolean,
			default: false,
		},
		submitType: {},

		submitCount: {},

		conmunicateTime: {},
		index: {
			// 获得列表的索引
		},
		// 传入账单的上报人id
		id: {
			default: null,
		},
		createUserId: {
			dafault: null,
		},
		// 组长id
		groupParterId: {
			default: null,
		},
		manageType: {
			default: '',
		},
		manage: {
			type: Boolean,
			default: false,
		},
		isAudit: {
			default: 0,
		},
	},
	data() {
		return {
			submitTypes: null,
		};
	},
	filters: {
		currency,
	},
	computed: {
		...mapState({
			userId: state => state.userInfo.id,
		}),
	},
	created() {
		this.submitTypes = this.submitType.indexOf('-') < 0 ? this.submitType : this.submitType.split('-')[0];
	},
	mounted() {	
		waitUntil(()=>{
			return !!this.userId;
		},()=>{
			this.hoverMethods();
		});
	},
	methods: {
		onclickEditBill() {
			this.$emit('onclickEditBill');
		},
		onclickdeleteBill() {
			this.$emit('onclickDeleteBill');
		},
		onclickBillDetail() {
			if (this.importantColor) {
				this.$emit('onclickBillDetail');
			}
		},
		hoverMethods() {
			/*
			* 非账单管理页面 且驳回状态 触发hover事件
			*/
			this.$refs.refEdit && this.$refs.refBillList.addEventListener('mouseenter', () => {
				if (this.isAudit == 2 && !this.manage) {
					this.$refs.refEdit.style.visibility = 'visible';
					this.$refs.refDelete.style.visibility = 'visible';
				}
			});

			this.$refs.refEdit && this.$refs.refBillList.addEventListener('mouseleave', () => {
				if (this.isAudit == 2 && !this.manage) {
					this.$refs.refEdit.style.visibility = 'hidden';
					this.$refs.refDelete.style.visibility = 'hidden';
				}
			});
		},
	},
};
</script>

<style lang="less">
	.media-list-item-boss {
		height: 100px;
		position: relative;
		padding-left: 120px;
		margin-bottom: 20px;		
	}
	// 盖章的样式
	.icon-status-common {
		width: 100px;
		height: 60px;
		line-height: 60px;
		display: block;
		text-align: center;
		font-size: 30px;
		position: absolute;
		left: 850px;
		top: 20px;
		transform: rotate(15deg);
		span {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			font-size: 12px;
		}
	}
	.icon-status-Pass {
		color: rgb(230, 184, 13);
	}
	.icon-status-Checking {
		color: rgb(94, 223, 94);
	}
	.icon-status-Reject {
		color: rgb(255, 135, 135);
	}
	.icon-media-logo {
		left: 0;
		top: 0;
		width: 100px;
		height: 100px;
		position: absolute;
		img {
			display: block;
			width: 100px;
			height: 100px;
			opacity: 0.6;
		}
	}
	.media-list-item-content {
		position: relative;
		overflow: hidden;
		padding: 10px 30px 5px 0px;
		>div:nth-of-type(1) {
			width: 100%;
			height: 21px;
			overflow: hidden;
			>p {
				float: left;
				display: inline-block;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				max-width: 70%;
				font-size: 16px;
				line-height: 21px;
				height: 21px;
				color: #333;
				margin-right: 40px;
			}
			>span {
				visibility: hidden;
				font-size: 14px;
				color: #44BCB7;
				line-height: 21px;
			}
			>span:nth-of-type(1) {
				margin-right: 20px;
			}
		}
		>p:nth-of-type(2) {
			width: 700px;
			font-size: 14px;
			line-height: 17px;
			height: 34px;
			// display: block;
			white-space: normal;
			word-break: break-all;
			color: #999999;
			overflow:hidden;
			display: -webkit-box; 
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2; 
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
	.media-list-item-span-date {
		line-height: 35px;
		color: #999;
		font-size: 14px;
	}
	.media-list-item-span-detail {
		height: 35px;
		display: inline-block;
		line-height: 35px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		span {
			float: left;
			color: #999;
			margin-right: 35px;
			b {
				font-size: 14px;
				font-weight: normal;
			}
		}
	}
	.media-list-item-img {
		left: 0;
		top: 0;
		width: 100px;
		height: 100px;
		display: block;
		position: absolute;
	}
	.media-list-item-importantColor {
		color: #44BCB7 !important;
	}
</style>
