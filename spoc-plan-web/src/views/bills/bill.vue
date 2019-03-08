<style lang="less">
	.bill-boss {
		margin-top: 15px;
	}
	.my-bill-line-div {
		width: 14px;
		height: 4px;
		margin-top: 14px;
		display: inline-block;
		background-color: #44BCB7;
	}
	.bill-paging {
		text-align: center;
		margin-top: 20px;
	}

	.bill-time-use {
		>div {
			float: left;
		}
		>div:nth-of-type(1) {
			margin-right: 0;
		}
		>div:nth-of-type(2) {
			margin-right: 15px !important;
			margin-left: 15px !important;
			width: 14px;
			height: 4px;
			margin-top: 14px;
			background-color: #44BCB7;
		}
		>div:nth-of-type(4) {
			margin-left: 50px !important;
		}
	}
	.bill-modal-error {
		.ivu-form-item-error-tip {
			margin-top: 31px;
		}
	}
	.bill-modal-formItem-price {
		>.ivu-form-item-content {
			.ivu-form-item {
				display: inline-block;
			}
		}
	}
	.bill-modal {
		.ivu-form-item {
			color: #333;
			.ivu-checkbox-group {
				label {
					color: #333;
				}
			}
			label {
				color: #999;
			}
		}
	}
</style>

<template>
	<div class="bill-boss">
		<top-title
			title="账单"
			btnVal="添加账单"
			@onclickButton="onclickButton"
		></top-title>
		<media-list-item
			v-for="(item, index) in billList"
			:key="index"
			:thumbnail="item.thumbnail"
			:title="item.invoiceId"
			:date="item.invoiceDate"
			:isAudit="item.isAudit"
			:describ="item.servieContent"
			:importantColor=true
			:status="item.isAudit"
			:submiter="item.accountName"
			:submitType="item.unit"
			:submitCount="item.amount"
			:conmunicateTime="item.serviceTime"
			:id="item.accountId"
			:createUserId="item.createUserId"
			types="我的账单"
			@onclickEditBill="onclickEditBill(item.id)"
			@onclickDeleteBill="onclickDeleteBill(item.id)"
			@onclickBillDetail="onclickBillDetail(item.id)"
		></media-list-item>
		<!---->
		<Page
			v-if="pageCount > 10"
			show-sizer
			class="bill-paging"
			:total="pageCount" 
			show-total
			show-elevator
			:page-size="10"
			:current="pageNo"
			@on-change="onclickChangePage"
			@on-page-size-change="onPageSizeChange"
			></Page>
		<Modal
			v-model="modalBill"
			ref="refModalBill"
			class="bill-modal"
			style="height: 705px;"
			title="添加账单"
			width="730"
			cancelText='取消'
			ok-text="保存"
			@on-ok="ok"
			@on-cancel="cancel">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
				<FormItem label="报账人" prop="accountName">
					<Button type="primary" @click="onclickAddUser">点击选择</Button> <span>{{formValidate.accountName}}</span>
				</FormItem>
				<FormItem label="发票号/ID" prop="invoiceId">
					<Input v-model="formValidate.invoiceId" style="width: 200px;" placeholder="请输入发票号/ID" :disabled="isAddForm"></Input>
				</FormItem>
				<FormItem label="报账时间" prop="createDate">
					<DatePicker v-model="formValidate.createDate" type="datetime" style="width: 200px;"></DatePicker>
				</FormItem>
				<FormItem label="价格" required class="bill-modal-formItem-price">
					<FormItem prop="type">
						<Select v-model="formValidate.type" style="width: 200px;" placeholder="根据时长和费用计算" @on-change="onclickChangePayType">
							<Option value="0">根据时长和费用计算</Option>
							<Option value="1">固定价格</Option>
						</Select>
					</FormItem>
					<FormItem>
						<Input  v-if="formValidate.type && formValidate.type == 1"  v-model="formValidate.amount" ref="refFormValidateAmount" style="width: 200px;" placeholder="请输入最终价格"></Input>
					</FormItem>
					<FormItem prop="unit" style="width: 200px; float:right;">
						<Select v-if="formValidate.type && formValidate.type == 1"  v-model="formValidate.unit" style="width: 200px;" placeholder="选择货币类型">
							<Option 
								v-for="(item, index) in unitTypeList"
								:key="index"
								:value="item.value">
								{{item.label}}
							</Option>
						</Select>
					</FormItem>
				</FormItem>
				<FormItem label="沟通范围" prop="serviceScope">
					<CheckboxGroup v-model="formValidate.serviceScope">
						<Checkbox 
							v-for="(item, index) in listDatas"
							:key="index"
							:label="item.id">
							{{item.name}}
						</Checkbox>
					</CheckboxGroup>
				</FormItem>
				<FormItem label="沟通时长"  class="bill-modal-error" prop="serviceTime">
					<div class="bill-time-use">
						<FormItem prop="serviceStartTime" style="width: 140px">
							<DatePicker v-model="formValidate.serviceStartTime"type="datetime" placeholder="开始时间" style="width: 140px; float:left;"></DatePicker>
						</FormItem>
						<div class="my-bill-line-div"></div>
						<FormItem prop="serviceEndTime" style="width:140px; float:left;">
							<DatePicker v-model="formValidate.serviceEndTime" type="datetime" placeholder="结束时间" style="width: 140px; float:left;"></DatePicker>
						</FormItem>
						<Input v-model="dateTotal" disabled style="width: 140px;" placeholder=""></Input>
					</div>
				</FormItem>
				<FormItem label="沟通内容" prop="servieContent">
					<Input v-model="formValidate.servieContent" type="textarea" :autosize="{minRows: 5,}" placeholder="请至少输入150个文字"></Input>
				</FormItem>
				<FormItem style="display:none;">
					<Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
					<Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
				</FormItem>
			</Form>
		</Modal>
		<!-- 添加用户弹窗 -->
		<chose-members
			:serviceMenbers="serviceMenbers"
			@fresh="getChosedGuys"
			:saveOrCancleBill="saveOrCancleBill"
			ref="refAddUserPopup">
		</chose-members>
		<bill-modal-detail
			ref="refBillModalDetail"
			:formValidates="formValidate"
			:tipsBillApproval="true"
			:listDatas="listDatas"
			@onclickCloseModal="onclickCloseModal"
		></bill-modal-detail>
		<!-- 查看账单详情 modal -->
	</div>
</template>

<script>
import { mapMutations, mapGetters, } from "vuex";
import store from '../../../../../store/index';
import { currency, } from '../../libs/util'
import ChoseMembers from '../../components/choseMembers';
import TopTitle from '../../components/topTitle.vue';
import MediaListItem from '../../components/mediaListItem.vue';
import BillModalDetail from '../../components/billModalDetailItem';
import valid, { errors, plBill, common, sys, plRateUser, plServiceMember,} from '../../libs//request';
export default {
	name: 'Bill',
	components: {
		TopTitle,
		MediaListItem,
		ChoseMembers,
		BillModalDetail,
	},
	// 
	data() {
		const validateCreateDate = (rule, value, callback) => {
			if (!value) {
				callback(new Error('请选择报账时间'));
			} else {
				callback();
			}
		};
		const validateStartTime = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请选择开始时间'));
			} else {
				callback();
			}
		};
		const validateEndTime = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请选择结束时间'));
			} else {
				callback();
			}
		};
		const validateTimeUse = (rule, value, callback) => {
			if (!value) {
				callback(new Error('请选择结束时间'));
			} else {
				callback();
			}
		};
		const validateInvoiceId = (rule, value, callback) => {
			const reg =  /^[0-9a-zA-Z]+$/;
			if (!value) {
				callback(new Error('请输入账单号或ID'));
			} else if (!reg.test(value)) {
				callback(new Error('发票号只允许输入数字、字母'));
			}else {
				callback();
			}
		};
		return {
			// 是否 添加账单
			isAddForm: false,
			// 是否是编辑驳回账单
			isEditRejectBill: false,
			// 标签列表
			listDatas: null,
			// 货币字典列表
			unitTypeList: null,
			// 选择固定价格时 获取其 时薪 于 价格单位
			fixedUnit: null,
			// 是否点击提交了账单
			saveOrCancleBill: null,
			// 点击保存限流
			addFormCount: 0,
			fixedprice: null,
			serverHours: null,
			modalBill: false,
			billList: [],
			pageCount: null,
			pageNo: 1,
			formValids: false,
			serviceGroupId: null,
			serviceMenbers: [],
			formValidate: {
				id: null,
				accountName : '',
				accountId: null,
				invoiceId: '',
				createDate: '',
				// 选择价格的类型 0 时长 1固定计价
				type: null,
				unit: null,
				amount: null,
				serviceScope: [],
				serviceStartTime: null,
				serviceEndTime: null,
				servieContent: '',
				serviceTime: null,
				serviceGroupId: null,
			},
			// tempFormValidate: {},
			ruleValidate: {
				serviceGroupId: [
					{ required: true, message: '请选择服务组', trigger: 'change', },
				],
				accountName: [
					{ required: true, message: '请选择报账人', trigger: 'change' }
				],
				invoiceId: [
					{ required: true, validator: validateInvoiceId, trigger: 'change' }
				],
				createDate: [
					{ required: true, validator: validateCreateDate, trigger: 'change' }
				],
				type: [ // validator: validateType,
					{ required: true,  message: '请选报账方式', trigger: 'change' },
				],
				unit: [
					{ required: true,  message: '请选择货币类型', trigger: 'change' },
				],
				// amount: [
				// 	{ required: true, message: '请输入金额', trigger: 'change' }
				// ],
				serviceScope: [
					{ required: true, type: 'array', min: 1, message: '请选择沟通范围', trigger: 'change' },
					{ type: 'array', trigger: 'change' }
				],
				serviceStartTime: [
					{ required: true, type: 'string', validator: validateStartTime, trigger: 'blur' }
				],
				serviceEndTime: [
					{ required: true, type: 'string', validator: validateEndTime, trigger: 'blur' }
				],
				serviceTime: [
					{ required: true, type: 'string', validator: validateTimeUse, trigger: 'change' }
				],
				servieContent: [
					{ required: true, message: '  ', trigger: 'change' },
					{ type: 'string', message: '  ', trigger: 'change' }
				]
			},
		};
	},
	filters: {
		currency,
	},
	computed: {
		...mapGetters('plan', ['tagId']),
		dateTotal() {
			if (this.formValidate.serviceStartTime && this.formValidate.serviceEndTime) {
				if (new Date(this.formValidate.serviceEndTime).getTime() < new Date(this.formValidate.serviceStartTime).getTime()) {
					 this.$Message.info('请选择正确的起止时间');
					 this.formValidate.serviceEndTime = null;
					 return;
				}
				const sustainTime = (new Date(this.formValidate.serviceEndTime).getTime() - new Date(this.formValidate.serviceStartTime).getTime()) / 1000;

				/*
				* 服务的小时数
				*/
				this.serverHours = (sustainTime / 3600).toFixed(2);

				let hours = Math.floor(sustainTime / (60 * 60));
				let minutes = Math.floor((sustainTime - hours * 3600) / 60);
				hours = hours < 10 ? '0' + hours : hours;
				minutes = minutes < 10 ? '0' + minutes : minutes;
				let res = null;
				if (hours === '00') {
					res = `${minutes}分钟`;
				} else {
					res = `${hours}小时${minutes}分钟`;
				}
				this.formValidate.serviceTime = res;
				return res;
			}
		},
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		onclickAddUser() {
			if(this.isAddForm) {
				this.$Message.error('重新编辑的账单无法更换报账人');
				return;
			}
			this.$refs.refAddUserPopup.show();
		},
		/*
		* 获取账单列表
		*/
		getBillList(data) {
			this.updateLoadingStatus({ isLoading: true });
			plBill.listByCurrentUser(data).then(valid.call(this)).then(res => {
				if (res.ok) {
					this.billList = res.data.data.list;
					this.pageCount = res.data.data.count;
					this.pageNo = res.data.data.pageNo;
				}
			}).catch(errors.call(this)).finally(() => {
				this.updateLoadingStatus({ isLoading: false });
			});
		},
		/*
		* 点击添加账单
		*/
		onclickButton() {
			this.modalBill = true;
			this.isAddForm = false;
			this.formValidate.createDate = new Date().format('yyyy-MM-dd hh:mm:ss');
		},
		/*
		* 获取报账人
		*/
		getChosedGuys(msg) {
			this.formValidate = Object.assign({}, this.formValidate, {accountName: msg.name});
			this.formValidate.accountId = msg.userId;
			// 报账人更改且不为空 ==> 切换报账人之后所有的临时信息全部更换
			// if ((this.tempFormValidate.accountName !== msg.name) && (msg.name !== '')) {
			// 	this.tempFormValidate.accountName = msg.name;
			// 	this.tempFormValidate.accountId =  msg.userId;
			// 	this.tempFormValidate.type = null;
			// 	this.tempFormValidate.price = null;
			// 	this.tempFormValidate.unit = null;
			// 	this.formValidate = Object.assign(this.formValidate, {type: null,});
			// }
			plRateUser.list({
				userId: msg.userId,
			}).then(valid.call(this)).then(res => {
				if (res.ok) {
					const rdata = res.data.data.list;
					if (rdata.length) {
						if (rdata[0].unit && rdata[0].price) {
							this.fixedUnit = rdata[0].unit;
							this.fixedprice = Number(rdata[0].price);
						} else {
							this.fixedUnit = null;
							this.fixedprice = null;
						}
					} else {
						this.fixedUnit = null;
						this.fixedprice = null;
					}
					// 默认为固定价格
					this.formValidate.unit = this.fixedUnit ? this.fixedUnit : null;
					this.formValidate.price = this.fixedprice ? this.fixedprice: null;
					// 存入本次的金额于货币单位
					// this.tempFormValidate.unit = this.fixedUnit;
					// this.tempFormValidate.price =  this.fixedprice;
				}
			});
		},

		/*
		* 点击选择报账方式
		*/
		onclickChangePayType(val) {
			console.log('val', val);
			if (val === '0' && this.modalBill) { // 固定价格
				if (!this.fixedUnit || !this.fixedprice) {
					this.$Message.warning({
						content: '该成员无对应费率,请重新选择报账人员或选择根据时长和费用计算',
						duration: 5,
						closable: true
					});
					setTimeout(() => {
						this.formValidate.type = '1';
					}, 0)
				}
			}
		},
		/*
		* 点击编辑订单
		*/
		onclickEditBill(id) {
			this.modalBill = true;
			this.isAddForm = true;
			this.isEditRejectBill = true;
			plBill.form({
				id: id,
			}).then(valid.call(this)).then(res => {
				if (res.ok) {
					const rdata = res.data.data;
					if (rdata.type == '0') {
						this.fixedprice = rdata.price;
						this.fixedUnit = rdata.unit;
					}
					rdata.serviceScope = !rdata.serviceScope ? (rdata.serviceScope = []) : rdata.serviceScope.split(',');
					for (let k in rdata) {
						this.formValidate[k] = rdata[k];
					}
					console.log(this.formValidate);
				}			
			})
		},
		/*
		* 删除订单 delete
		*/
		onclickDeleteBill(id) {
			const data = {
				id,
			};
			this.updateLoadingStatus({ isLoading: false });
			plBill.delete(data).then(valid.call(this)).then(res => {
				if (res.ok) {
					this.getBillList({
						serviceGroupId: this.serviceGroupId,
						pageNo: this.pageNo,
					});
				}
			}).catch(errors.call(this)).finally(() => {
				this.updateLoadingStatus({ isLoading: false });
			});
		},
		/*
		* 点击保存的时候进行一次表单验证
		*/
		handleSubmit (name) {
			if (this.serverHours && this.formValidate.type == 0) {
				this.formValidate.amount = this.fixedprice * this.serverHours;
			} else {
				if (parseFloat(this.formValidate.amount) <= 0) {
					this.$Message.error('请输入正确的金额');
					this.formValidate.amount = null;
					this.$refs.refFormValidateAmount.focus();
					return false;
				}
			}
			this.$refs[name].validate((valid) => {
				if (!valid) {
					this.$Message.error('您的表单填写有误,请按照提示填写表单');
				}
				this.formValids = valid;
				return valid;
			})
		},
		/*
		*  取消验证状态
		*/
		handleReset() {
			this.$refs.formValidate.resetFields();
		},
		/*
		* 点击保存账单
		*/
		ok() {
			this.modalBill = true;
			this.$refs.refModalBill.visible = true;
			
			this.handleSubmit ('formValidate'); // 验证表单
			if (this.formValids) {
				this.addFormCount++;
				if (this.addFormCount > 1) {
					this.addFormCount = 0;
					return;
				}

				if (!this.formValidate.amount) {
					if(this.serverHours == 0) {
						this.$Message.error('请选择正确的起止日期');
						this.addFormCount = 0;
						return;
					}
					this.$Message.error('请输入报账金额');
					this.modalBill = true;
					this.$refs.refModalBill.visible = true;
					this.addFormCount = 0;
					return false;
				} else if (!this.formValidate.unit){
					this.$Message.error('请选择货币类型');
					this.modalBill = true;
					this.$refs.refModalBill.visible = true;
					this.addFormCount = 0;
					return false;				
				}

				let data = JSON.stringify(this.formValidate);
				data = JSON.parse(data);

				data.serviceStartTime && (data.serviceStartTime = new Date(data.serviceStartTime).format('yyyy-MM-dd hh:mm:ss'));
				data.serviceEndTime && (data.serviceEndTime = new Date(data.serviceEndTime).format('yyyy-MM-dd hh:mm:ss'));
				data.serviceTime = this.dateTotal; // 总共时间
				data.createDate = new Date(this.formValidate.createDate).format('yyyy-MM-dd hh:mm:ss');
				data.invoiceDate = new Date(this.formValidate.createDate).format('yyyy-MM-dd hh:mm:ss');
				data.serviceScope = data.serviceScope.join(',');
				// 被驳回的账单 编辑后 可以 再次 被 审批
				data.isAudit = 0;
				// 如果是新建表单
				if (!this.isAddForm) {
					delete data.id;
					data.remarks = null;
					data.updateDate = data.createDate;
					data.serviceGroupId = this.$route.params.gid;
				}
				/*
				* 选择了固定金额
				*/
				if (data.type == 0) {
					data.amount = this.fixedprice * this.serverHours;
					data.unit = this.fixedUnit;
				}
				this.updateLoadingStatus({ isLoading: true });
				plBill.save(data).then(valid.call(this)).then(res => {
					if (res.ok) {
						this.handleReset();
						this.getBillList({
							serviceGroupId: this.serviceGroupId,
						});
						this.$Message.info('账单提交成功');
						this.saveOrCancleBill = new Date().getTime();
						/*
						*  保存上个账单人的信息
						*/
						this.formValidate = {};
						// this.formValidate = Object.assign(this.formValidate, {type: this.tempFormValidate.type, accountName: this.tempFormValidate.accountName, serviceGroupId: this.tempFormValidate.serviceGroupId});
						// this.formValidate.accountId = this.tempFormValidate.accountId;
						// this.formValidate.price = this.tempFormValidate.price;
						// this.formValidate.unit = this.tempFormValidate.unit;

						this.$refs.refModalBill.visible = false;
						this.addFormCount = 0;
						this.fixedUnit = null;
						this.fixedprice = null;
					}
				}).catch(errors.call(this)).finally(() => {
					this.isAddForm = false;
					this.modalBill = false;
					this.$refs.refModalBill.visible = false;
					this.updateLoadingStatus({ isLoading: false });
					this.addFormCount = 0;
				});
			} else {
				this.updateLoadingStatus({ isLoading: false });
				return false;
			}
		},
		/*
		* 取消添加账单
		*/
		cancel() {
			if (!this.isEditRejectBill) {
				this.formValidate = {
					accountName: this.formValidate.accountName,
					accountId: this.formValidate.accountId,
					type: this.formValidate.type,
					unit: this.formValidate.fixedUnit,
					price: this.formValidate.fixedprice,
					serviceGroupId: this.formValidate.serviceGroupId,
				};
			}
			this.modalBill = false;
			this.isAddForm = false;
			this.handleReset();
			this.$Message.info('取消添加账单');
			this.saveOrCancleBill = new Date().getTime();
		},
		/*
		* 切换分页
		*/
		onclickChangePage(index) {
			this.updateLoadingStatus({ isLoading: true });
			this.getBillList({
				serviceGroupId: this.serviceGroupId,
				pageNo: index,
			});
			this.updateLoadingStatus({ isLoading: false });
		},
		/*
		* 切换显示条数
		*/
		onPageSizeChange(val) {
			this.getBillList({
				pageSize: val,
				pageNo: this.pageNo,
			});
		},
		/*
		* 点击查看账单详情
		*/
		onclickBillDetail(id) {
			this.updateLoadingStatus({ isLoading: true });
			this.$refs.refBillModalDetail.billModalShow();
			plBill.form({
				id,
			}).then(valid.call(this)).then(res => {
				if (res.ok) {
					this.formValidate = res.data.data;
					this.formValidate.serviceScope = this.formValidate.serviceScope ? this.formValidate.serviceScope.split(','): [];
					this.unitTypeList.forEach(item => {
						if (item.value === this.formValidate.unit) {
							this.formValidate.unitTypes = item.label;
						}
					});
				}
			}).catch(errors.call(this)).finally(() => {
				this.updateLoadingStatus({ isLoading: false });
			});
		},
		/*
		* 点击关闭账单详情
		*/
		onclickCloseModal() {
			this.formValidate = {};
			this.handleReset();
		},
	},
	created() {
		this.serviceGroupId = this.$route.params.gid;

		this.formValidate.serviceGroupId = this.serviceGroupId;
		// this.tempFormValidate.serviceGroupId = this.serviceGroupId;
		/*
		* 服务组 id
		*/
		let data = {
			serviceGroupId: this.serviceGroupId,
			pageNo: this.pageNo,
		};
		/*
		* 获取账单列表
		*/
		this.getBillList(data);
		/*
		* 获取货币类型的字典
		*/
		sys.dictListData({
			type: 'pl_bill_unit',
		}).then(valid.call(this)).then(res => {
			if (res.ok) {
				this.unitTypeList = res.data.data;
			}
		});
		/*
		* 获得服务组人员
		*/
		plServiceMember.listUsPcUser({
			serviceGroupId: this.serviceGroupId,
		}).then(valid.call(this)).then(res => {
			if (res.ok) {
				this.serviceMenbers = res.data.data.members;
			}
		});
	},
	mounted() {
		/*
		* 标签列表 任务标签
		*/
		common.listData({
			parent: this.tagId,
		}).then(valid.call(this)).then(res => {
			if (res.ok) {
				this.listDatas = res.data.data
			}
		});				
	},
};
</script>