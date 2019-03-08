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
	.modal-Approval-table {
		margin-bottom: 20px;
		margin-left: 7px;
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
		<div v-if=" type === 'batch' ">
			<Table
				border
				size="small"
				width=690
				class="modal-Approval-table"
				:columns="columnsException"
				:data="approvalInfos">
			</Table>
		</div>
		<Form label-position="left" :label-width="80">
			<div v-if="type === 'single' && approvalInfos.length">
				<FormItem label="结案学生：">
					<span>{{approvalInfos[0].stuName}}</span>
				</FormItem>
				<FormItem label="入读学校：">
					<span>{{approvalInfos[0].schoolName}}</span>
				</FormItem>
				<FormItem label="提交人：">
					<span>{{approvalInfos[0].submitter}}</span>
				</FormItem>
				<FormItem label="提交时间：">
					<span>{{approvalInfos[0].createDate}}</span>
				</FormItem>
			</div>
			<FormItem label="审批结果：">
				<Button :type="btn1" @click="onlickApproval">通过</Button>
				<Button :type="btn2" @click="onlickReject">驳回</Button>
				<Input v-show ="btn2 === 'primary'" v-model="rejectReason" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入驳回理由"></Input>
			</FormItem>
	</Form>
    </Modal>
</template>

<script>
import ModalLog from './modalLog'
export default {
	name: 'ModalApproval',
	props: {
		title: {
			type: String,
			required: true,
		},
		/*
		* @param types batch 多显示一个表格
		*/
		types: {
			type: String,
			default: 'single',
		},
		approvalInfos: {
			default: () => {
				return {};
			},
		},
	},
	components: {
		ModalLog,
	},
	data() {
		return {
			modalApproval: false,
			type: 'single',
			btn1: 'primary',
			btn2: 'default',
			rejectReason: null,
			columnsException: [
				{ title: '结案学生', key: 'stuName', align: 'center', },
				{ title: '入读学校', key: 'schoolName', align: 'center', width: 200, },
				{ title: '提交人', key: 'submitter', align: 'center', },
				{ title: '提交时间', key: 'createDate', align: 'center', },
			],
		};
	},
	watch: {
		types() {
			this.type = this.types;
		},
	},
	methods: {
		show() {
			this.modalApproval = true;
		},
		modalApprovalOK() {
			if (this.btn2 === 'primary') {
				if (!this.rejectReason) {
					this.modalApproval = true;
					this.$refs.refModalApproval.visible = true;
					this.$Message.warning('请输入拒绝理由');
					return;
				}
			}
			let ids = [];
			this.approvalInfos.forEach(item => ids.push(item.id));
			ids = ids.join(',');
			this.$emit('onclickToApproval', ids, this.btn1 === 'primary', this.rejectReason);
			this.modalStatusReset();
		},
		modalApprovalCancel() {
			this.modalStatusReset();
			this.$emit('modalApprovalCancel');
		},
		onlickApproval() {
			this.btn1 = 'primary';
			this.btn2 = 'default';
		},
		onlickReject() {
			this.btn1 = 'default';
			this.btn2 = 'primary';
		},
		modalStatusReset() {
			this.btn1 = 'primary';
			this.btn2 = 'default';
			this.rejectReason = null;
		},
	},
};
</script>