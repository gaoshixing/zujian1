<style lang="less">
	.modal-approval-boss {
		.ivu-form-item-label {
			color: rgb(156,156,156);
			text-align: right;
			margin-right: 10px;
		}
		.modal-approval-form-text-aera-scroll {
			overflow: hidden;
			overflow-y: scroll;
		}
		.modal-approval-form-text-aera {
			float: right;
			box-sizing: border-box;
			position: relative;
			display: block;
			width: 608px;
			min-height: 32px;
			max-height: 96px;
			line-height: 32px;
			border: solid 1px #e5e5e5;
			background-color: #f5f5f5;
			border-radius: 5px;
			padding: 0 15px 0 10px;
			span {
				right: 5px;
				top: 0;			
				position: absolute;
				color: rgb(156,156,156);
			}
		}
		.ivu-btn {
			padding: 5px 23px;
			margin-bottom: 15px;
		}
		.ivu-btn:nth-of-type(1) {
			margin-right: 20px;
		}
	}
</style>

<template>
	<Modal
		width="730"
		class="modal-approval-boss"
		ref="refModalApproval"
        v-model="modalApproval"
        :title="title"
        @on-ok="modalApprovalOK"
        @on-cancel="modalApprovalCancel">
		<Form label-position="left" :label-width="80">
			<FormItem label="审批内容：">
				<span>{{ approvalInfos && approvalInfos.kind === "crmgroupemail" ? '群发邮件' : '群发短信'}}</span>
			</FormItem>
			<FormItem label="发件人：">
				<span>{{approvalInfos && approvalInfos.senderName}}</span>
			</FormItem>
			<FormItem label="收件人：">
				<span class="modal-approval-form-text-aera" :class="[this.text1 > 96 ? 'modal-approval-form-text-aera-scroll': '',]" >
					<div ref="refModalInfos1">
						<div v-if="approvalInfos">
							<b v-for="(item, index) in approvalInfos.sysNotificationResultList" :key="index" style="font-weight: normal;">
								{{item.user.name}}；
							</b>
						</div>
					</div>
					<span>{{approvalInfos && approvalInfos.sysNotificationResultList.length}}</span>
				</span>
			</FormItem>
			<FormItem label="短信内容：">
				<span class="modal-approval-form-text-aera" :class="[this.text2 > 96 ? 'modal-approval-form-text-aera-scroll': '',]" >
					<div ref="refModalInfos2">{{approvalInfos && approvalInfos.content}}</div>
				</span>
			</FormItem>
			<FormItem label="提交时间：">
				<span>{{approvalInfos && approvalInfos.handleTime}}</span>
			</FormItem>
			<FormItem label="审批结果：">
				<Button :type="btn1" @click="onlickApproval">通过</Button>
				<Button :type="btn2" @click="onlickReject">驳回</Button>
				<Input v-show ="btn2 === 'primary'" v-model="rejectReason" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入驳回理由"></Input>
			</FormItem>
	</Form>
    </Modal>
</template>

<script>
import { waitUntil, } from '@public/libs/util';
export default {
	name: 'ModalApproval',
	props: {
		title: {
			type: String,
			required: true,
		},
		approvalInfos: {
			default: () => {
				return {};
			},
		},
	},
	data() {
		return {
			modalApproval: false,
			text1: null,
			text2: null,
			btn1: 'primary',
			btn2: 'default',
			rejectReason: null,
		};
	},
	watch: {
		modalApproval(newVal) {
			if (newVal) {
				waitUntil(()=>{
					return !!(this.$refs.refModalInfos1 && this.$refs.refModalInfos1.offsetHeight);
				},()=>{
					this.text1 = this.$refs.refModalInfos1.offsetHeight;
				});
				waitUntil(()=>{
					return !!(this.$refs.refModalInfos2 && this.$refs.refModalInfos2.offsetHeight);
				},()=>{
					this.text2 = this.$refs.refModalInfos2.offsetHeight;
				});
			}
		},
	},
	methods: {
		show() {
			this.modalApproval = true;
		},
		modalApprovalOK() {
			if (this.btn2 === 'primary') {
				if (!this.rejectReason) {
					this.$Message.warning('请输入拒绝理由');
					this.$refs.refModalApproval.visible = true;
					this.modalApproval = true;
					return;
				}
				this.$emit('onclickToApproval', this.approvalInfos.id, '2', this.rejectReason);
			} else {
				this.$emit('onclickToApproval', this.approvalInfos.id, '1');
			}
			this.statusReset();
		},
		modalApprovalCancel() {
			this.$refs.refModalApproval.visible = false;
			this.modalApproval = false;
			this.statusReset();
		},
		onlickApproval() {
			this.btn1 = 'primary';
			this.btn2 = 'default';
		},
		onlickReject() {
			this.btn1 = 'default';
			this.btn2 = 'primary';
		},
		statusReset() {
			this.btn1 = 'primary';
			this.btn2 = 'default';
			this.rejectReason = '';
		},
	},
};
</script>