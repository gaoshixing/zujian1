<style lang="less">
	.bill-modal-details {
		.ivu-modal-footer {
			display: inline-block !important;
			width: 100%;
		}
	}
	.bill-modal-detail {

		.ivu-modal-footer {
			display: none;
		}
		.bill-modal-detail-btn-area {
			margin: 20px 0;
			padding: 0 30%;
			display: flex;
			display: -webkit-flex;
			justify-content: space-around;
			>button {
				padding: 0;
				width: 120px;
				height: 42px;
				font-size: 14px;
			}
		}
		.bill-modal-detail-btn-areas {
			margin: 20px 0;
			>button {
				padding: 0;
				width: 120px;
				height: 42px;
				font-size: 14px;
			}
		}
		.ivu-form-item-label::before {
			content: '*';
			display: inline-block;
			margin-right: 4px;
			line-height: 1;
			font-family: SimSun;
			font-size: 12px;
			color: #ed3f14;
		}
		label::before {
			content: '';
			display: none !important;
		}
		.form-modal-detail-item {
			color:#333;
			.ivu-form-item {
				>label {
					color:#999;
				}
				span {
					color: #333;
				}
			}
		}
		.ivu-btn-success {
			span {
				color: #fff !important;
			}
		}
	}
	.bill-modal-content-scroll::-webkit-scrollbar {
    	display: none;
	}
</style>
<template>
		<Modal
			v-model="modalDetail"
			ref="refModalDetail"
			title="账单详情"
			width="730"
			cancelText='取消'
			ok-text="保存"
			@on-ok="ok"
			@on-cancel="onclickCloseModal"
			class="bill-modal-detail" :class="[billIsAudit == '0' ? 'bill-modal-details' : '']">
			<Form ref="formValidates" :model="formValidates" :label-width="80" class="form-modal-detail-item">
				<FormItem label="报账人">
					<span>{{formValidates.accountName}}</span>
				</FormItem>
				<FormItem label="帐单号/ID">
					<span v-model="formValidates.invoiceId" style="width: 200px;">{{formValidates.invoiceId}}</span>
				</FormItem>
				<FormItem label="报账日期">
					<span v-model="formValidates.createDate" style="width: 200px;">{{formValidates.createDate | dateFormate}}</span>
				</FormItem>
				<FormItem label="沟通时长">
					<div class="bill-time-use">
						<FormItem prop="serviceStartTime">
							<span>{{formValidates.serviceTime}}
								<span style="color:#333;">(开始时间：{{formValidates.serviceStartTime | dateFormate}}</span>
								<span style="color:#333;">，结束时间：{{formValidates.serviceEndTime | dateFormate}})</span>
							</span>
						</FormItem>
					</div>
				</FormItem>
				<FormItem label="沟通范围" disabled>
					<CheckboxGroup v-model="formValidates.serviceScope">
						<Checkbox
							v-for="(item, index) in listDatas"
							:key="index"
							:label="item.id">
							{{item.name}}
						</Checkbox>
					</CheckboxGroup>
				</FormItem>
				<FormItem label="沟通内容">
					<span style="display:block;overflow-y:scroll;max-height:160px" class="bill-modal-content-scroll">{{formValidates.servieContent}}</span>
				</FormItem>
				<FormItem label="账单价格">
					<span>{{formValidates.amount | currency}}</span>
					<span v-if="formValidates.type == '0'" style="width: 200px; color:#333;">(根据时长和费用计算)</span>
					<span v-else="formValidates.type == '1'" style="width: 200px; color:#333;">(固定价格)</span>
				</FormItem>
				<FormItem label="货币类型">
					<span>{{formValidates.unitTypes}}</span>
				</FormItem>
				<FormItem label="审批结果" v-if="tipsBillApproval && formValidates.isAudit != 0">
					<span v-if="formValidates.isAudit == 1 || formValidates.isAudit == 3">通过</span>
					<span v-if="formValidates.isAudit == 2">驳回</span>
				</FormItem>
				<FormItem label="驳回理由" v-if="tipsBillApproval && formValidates.isAudit == 2">
					<span>{{formValidates.reason}}</span>
				</FormItem>
				<!-- 
					传入 billIsAudit 显示审批按钮 
					修改为理由在弹窗上
				-->
				<div
					v-if="billIsAudit == '0'"
					class="bill-modal-detail-btn-areas">
					<FormItem label="审批结果">
						<div v-if="approval">
							<Button type="success" style="color: #fff; width: 80px; margin-right: 20px;" @click="onclickDocuApproval(true)">通过</Button>
							<Button type="default" style="width: 80px;" @click="onclickDocuApproval(false)">驳回</Button>
						</div>
						<div v-if="!approval">
							<Button type="default" style="width: 80px; margin-right: 20px;" @click="onclickDocuApproval(true)">通过</Button>
							<Button type="success" style="color: #fff; width: 80px;" @click="onclickDocuApproval(false)">驳回</Button>
						</div>
					</FormItem>
					<FormItem label="驳回理由" v-if="!approval">
						<Input type="textarea" v-model="rejectReason" placeholder="请输入拒绝理由" :autosize="{minRows: 4,maxRows: 5}"></Input>
					</FormItem>
					<!-- <Button type="success" @click="okDetail(formValidates.id, formValidates.isAudit)">通过</Button>
					<Button type="error" @click="cancelDetail(formValidates.id, formValidates.isAudit)">驳回</Button> -->
				</div>
				<!-- 按钮文本为提示账单审批状态 -->
				<!-- <div v-if="billIsAudit == '1' || billIsAudit == '3'" class="bill-modal-detail-btn-area" style="justify-content: space-around;">
					<Button type="success" @click="onclickCloseModal" style="border:none; background:#f2f2f2;color:#333;">已通过</Button>
				</div>
				<div v-if="billIsAudit == '2'" class="bill-modal-detail-btn-area" style="justify-content: space-around;">
					<Button @click="onclickCloseModal" style="color:#ed3f14; backgroundColor:#f2f2f2;border:none;">已驳回</Button>
				</div> -->
			
				<div
					v-if="billIsAudit == 'sure'"
					class="bill-modal-detail-btn-area" style="justify-content: space-around;">
					<Button type="success" @click="onclickCloseModal">关闭</Button>
				</div>
			</Form>
		</Modal>
</template>

<script>
import { currency, dateFormate, } from '../libs/util'
export default {
	name: 'BillModalDetail',
	props: {
		formValidates: {
			required: true,
			type: Object,
			default: {},
		},
		listDatas: {
			required: true,
			default: [],
		},
		// 判断是否是账单审批页面的modal
		billIsAudit: {
			default: 'sure',
		},
		tipsBillApproval: {
			type: Boolean,
			default: false,
		},
		finals: {
			type: String,
			default: '',
		},
		reason: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			modalDetail: false,
			approval: true,
			rejectReason: null,
		};
	},
	filters: {
		currency,
		dateFormate,
	},
	watch: {
		approval(newVal) {
			this.$emit('onclickChoseReject', newVal);
		},
	},
	methods: {
		billModalShow() {
			this.modalDetail = true;
		},
		ok() {
			if (!this.approval && !this.rejectReason) {
				this.modalDetail = true;
				this.approval = false;
				this.$refs.refModalDetail.visible = true;
				this.$Message.error('请输入驳回理由');
			} else {
				this.$emit('onclickSure', this.rejectReason);
				this.approval = true;
				this.rejectReason = null;
			}
		},
		onclickCloseModal() {
			this.modalDetail = false;
			this.$emit('onclickCloseModal');
		},
		// okDetail(id, isAduit) { // 通过
		// 	this.$emit('okDetail', id, isAduit);
		// },
		// cancelDetail(id, isAduit) { // 驳回
		// 	this.$emit('cancelDetail', id, isAduit)
		// },
		onclickDocuApproval(msg) {
			this.approval = msg;
		},
	},
};
</script>
