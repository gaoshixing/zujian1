<style lang="less">
	.my-bill-boss {
		padding: 16px 15px;
		padding-top: 0;
		padding-left: 0;
		.my-bill-search-add {
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;
			padding-right: 10px;
			height: 85px;
			position: relative;
			margin-top: 15px;
		}
	}
	.my-bill-container {
		position: relative;
		padding-top: 0px;
	}
	.my-bill-container-timePicker {
		position: absolute;
		left: -8px;
		bottom: 0px;
		width: 300px;
		height: 37px;
		display: flex;
		display: -webkit-flex;
		justify-content: space-around;
	}
	.my-bill-tab-content {
			padding-top: 15px;
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
	.my-bill-line-div {
		width: 14px;
		height: 4px;
		margin-top: 14px;
		display: inline-block;
		background-color: #44BCB7;
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
	<div class="my-bill-boss">
		<div class="my-bill-container">
			<Tabs value="1" v-model="tabVal" :animated="false">
				<TabPane label="最近更新" name="1"></TabPane>
				<TabPane label="未审批" name="3"></TabPane>
				<TabPane label="已审批" name="2"></TabPane>
			</Tabs>
			<div class="my-bill-search-add">
				<Input v-model="searchVal" icon="ios-search" placeholder="请输入输入账单发票号/报账人姓名" style="width: 396px" @on-click="onclickSearchBills" @on-enter="onclickSearchBills"></Input>
				<Button style="width: 95px; height:32px;"type="primary" @click="onclickButton">添加账单</Button>
				<div class="my-bill-container-timePicker">
					<DatePicker type="date" placeholder="开始日期" style="width: 120px" @on-change="onchangeBDate"></DatePicker>
					<div class="my-bill-line-div"></div>
					<DatePicker type="date" placeholder="结束日期" style="width: 120px" @on-change="onchangeEDate"></DatePicker>
				</div>
			</div>
			<div class="my-bill-tab-content">
				<media-list-item
					v-for="(item, index) in billList"
					:key="index"
					:thumbnail="item.thumbnail"
					:title="item.invoiceId"
					:date="item.invoiceDate"
					:importantColor=true
					:isAudit="item.isAudit"
					:describ="item.servieContent"
					:status="item.isAudit"
					:submiter="item.accountName "
					:submitType="item.unit"
					:submitCount="item.amount"
					:conmunicateTime="item.serviceTime"
					:approvalChecking="approvalChecking"
					:id="item.accountId"
					:groupParterId="item.groupParterId"
					:createUserId="item.createUserId"
					types="我的账单"
					@onclickEditBill="onclickEditBill(item.id)"
					@onclickDeleteBill="onclickDeleteBill(item.id)"
					@onclickBillDetail="onclickBillDetail(item.id)"
				></media-list-item>
			</div>
		</div>
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
			:mask-closable=false
			ref="refModalBill"
			class="bill-modal"
			:title="formModalTitle"
			width="730"
			cancelText='取消'
			ok-text="保存"
			@on-ok="ok"
			@on-cancel="cancel">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
				<FormItem label="服务组" prop="serviceGroupId">
					<Select v-model="formValidate.serviceGroupId" style="width: 200px;" placeholder="请选择服务组"  @on-change="onclickChoseSeviceGroup" :disabled="isAddForm">
						<Option 
							v-for="(item, index) in serviceGroupList"
							:key="index"
							:value="item.id">
							{{item.name}}
						</Option>
					</Select>
				</FormItem>
				<FormItem label="报账人" prop="accountName">
					<Button type="primary" @click="onclickAddUser">点击选择</Button>
					<span>{{formValidate.accountName}}</span>
				</FormItem>
				<FormItem label="发票号/ID" prop="invoiceId">
					<Input v-model="formValidate.invoiceId" style="width: 200px;" placeholder="请输入发票号/ID" ref="refInvoicedIdInput" :disabled="isAddForm"></Input>
				</FormItem>
				<FormItem label="报账时间" prop="createDate">
					<DatePicker v-model="formValidate.createDate" type="datetime" style="width: 200px;"></DatePicker>
				</FormItem>
				<FormItem label="价格" required>
					<Select v-model="formValidate.type" style="width: 200px;" placeholder="根据时长和费用计算" @on-change="onclickChangePayType">
						<Option value="0">根据时长和费用计算</Option>
						<Option value="1">固定价格</Option>
					</Select>
					<Input v-if="formValidate.type && formValidate.type == 1"  ref="refFormValidateAmount" v-model="formValidate.amount" style="width: 200px;" placeholder="请输入最终价格"></Input>
					<FormItem prop="type" style="width: 200px; float:right;">
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
							:label="item.id">{{item.name}}</Checkbox>
					</CheckboxGroup>
				</FormItem>
				<FormItem label="沟通时长"  prop="serviceTime" class="bill-modal-error">
					<div class="bill-time-use clearfix">
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
			:saveOrCancleBill="saveOrCancleBill"
			:serviceMenbers="serviceMenbers"
			@fresh="getChosedGuys"
			ref="refAddUserPopup">
		</chose-members>
		<!-- 点击查看账单详情 -->
		<bill-modal-detail
			ref="refBillModalDetail"
			:tipsBillApproval="true"
			:formValidates="formValidates"
			:listDatas="listDatas"
		></bill-modal-detail>
	</div>
</template>

<script>
import { mapMutations, mapGetters, } from "vuex";
import valid, { errors, plBill, common, sys, plRateUser, plServiceMember, plServiceGroup,} from '../../libs//request';
import MediaListItem from "../../components/mediaListItem";
import ChoseMembers from '../../components/choseMembers';
import BillModalDetail from '../../components/billModalDetailItem';
export default {
	name: 'MyBill',
	components: {
		MediaListItem,
		ChoseMembers,
		BillModalDetail,
	},
	data() {
		const validateCreateDate = (rule, value, callback) => {
			if (value === '') {
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
			// const reg = /[\u4e00-\u9fa5]/; // 中文字符
			const reg =  /^[0-9a-zA-Z]+$/;
			if (!value) {
				callback(new Error('请输入账单号或ID'));
			} else if (!reg.test(value)) {
				callback(new Error('发票号只允许输入数字、字母'));
			} else {
				callback();
			}
		};
		return {
			isEditRejectBill: false,
			addFormCount: 0,
			// 搜索的内容
			searchVal: null,
			// 是否 添加账单
			isAddForm: false,
			approvalChecking: null,
			// tab切换
			tabVal: '1',
			// 标签列表
			listDatas: null,
			// 货币字典列表
			unitTypeList: null,
			// 账单时间检索的范围
			beginDate: null,
			// 服务组列表
			serviceGroupList: null,
			// 服务组人员
			serviceMenbers: null,
			// 选择固定价格时 获取其 时薪 于 价格单位
			fixedUnit: null,
			// modal 标题
			formModalTitle: '添加账单',
			fixedprice: null,
			serverHours: null,
			serverHours: null,
			endDate: null,
			modalBill: false,
			billList: [],
			pageCount: null,
			pageNo: 1,
			pageNo1: 1,
			pageNo2: 1,
			pageNo3: 1,
			pageSize: null,
			formValids: false,
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
			formValidates: {
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
			},
			ruleValidate: {
				serviceGroupId: [
					{ required: true, message: '请选择服务组', trigger: 'blur', },
				],
				accountName: [
					{ required: true, message: '请选择报账人', trigger: 'blur' }
				],
				invoiceId: [
					{ required: true, validator: validateInvoiceId, trigger: 'change' }
				],
				createDate: [
					{ required: true, validator: validateCreateDate, trigger: 'blur' }
				],
				type: [
					// { required: true, validator: validateType, trigger: 'change' },
				],
				amount: [
					// { required: true, message: '请输入金额', trigger: 'change' }
				],
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
					{ required: true, message: '   ', trigger: 'change' },
					{ type: 'string', message: '   ', trigger: 'change' }
				]
			},
			saveOrCancleBill: null,
		};
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
	watch: {
		tabVal(newVal) {
			if(newVal) {
				this.getBillList({});
			}
			if (newVal == 3) {
				this.approvalChecking = true;
			} else {
				this.approvalChecking = false;
			}
		},
		isAddForm(newVal) {
			if(newVal === true) {
				this.formModalTitle = '编辑账单';
			} else {
				this.formModalTitle = '添加账单';
			}
		}
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),

		onchangeBDate(val) {
			this.beginDate = val ? new Date(val).format('yyyy-MM-dd') + ' 00:00:00' : '';
			const dateLeft =  this.endDate ? (new Date(this.endDate).getTime() - new Date(this.beginDate).getTime()) : -1;
			if (this.beginDate && this.endDate && dateLeft >= 0) {
				this.getBillList({});
			} else if (!this.endDate || !this.endDate) {
				if (!this.endDate && !this.beginDate) {
					this.getBillList({});
				}
			} else {
				this.$Message.warning('请选择正确的起止时间');
			}
		},
		onchangeEDate(val) {
			this.endDate = val ? new Date(new Date(val).setDate((new Date(val).getDate() + 1))).format('yyyy-MM-dd') + ' 00:00:00' : '';
			const dateLeft = this.beginDate ? (new Date(this.endDate).getTime() - new Date(this.beginDate).getTime()) : -1;
			if (this.beginDate && this.endDate && dateLeft >= 0) {
				this.getBillList({});
			} else if (!this.beginDate || !this.endDate) {
				if (!this.endDate && !this.beginDate) {
					this.getBillList({});
				}
			} else {
				this.$Message.warning('请选择正确的起止时间');
			}
		},
		/*
		* 搜索账单
		*/
		onclickSearchBills() {
			this.getBillList({
				keyword: this.searchVal,
			});
		},
		/*
		* 点击添加人员
		*/
		onclickAddUser() {
			if(this.isAddForm) {
				this.$Message.error('重新编辑的账单无法更换报账人');
				return;
			}
			this.$refs.refAddUserPopup.show();
		},
		/*
		* 获取账单列表 index 为判断是点击进行分页操作 还是 自行刷新
		*/
		getBillList(data, index) {
			const datas = this.tabValChanges(data, index);
			// this.updateLoadingStatus({ isLoading: true });
			plBill.listByCurrentUser(datas).then(valid.call(this)).then(res => {
				if (res.ok) {
					this.billList = res.data.data.list;
					this.pageCount = res.data.data.count;
					this.pageSize = res.data.data.pageSize;
					/*
					* 记录 tab 下的 页码
					*/
					if (this.tabVal === '1') {
						this.pageNo1 = res.data.data.pageNo;
					} else if (this.tabVal === '2') {
						this.pageNo2 = res.data.data.pageNo;
					} else {
						this.pageNo3 = res.data.data.pageNo;
					}
					this.pageNo = res.data.data.pageNo;
				}
			}).catch(errors.call(this)).finally(() => {
				// this.updateLoadingStatus({ isLoading: false });
			});
		},
		/*
		* 判断 tab 状态 记录各个tab下的页码
		*/
		tabValChanges(data, index) {

			this.beginDate && this.endDate && (data.beginDate = this.beginDate) && (data.endDate = this.endDate);

			this.searchVal ? data.keyword = this.searchVal: '';

			if (index) {
				if (this.tabVal === '1') {
					this.pageNo1 = index;
					return Object.assign({}, data, { pageNo: this.pageNo1, });
				} else if (this.tabVal === '3') {
					this.pageNo3 = index;
					return Object.assign({}, data, { isAudit: 0, pageNo: this.pageNo3, });
				} else {
					this.pageNo2 = index;
					return Object.assign({}, data, { isAudit: '5', pageNo: this.pageNo2,});
				}
			} else {
				if (this.tabVal === '1') {
					return Object.assign({}, data, { pageNo: this.pageNo1, });
				} else if (this.tabVal === '3') {
					return Object.assign({}, data, { isAudit: '0', pageNo: this.pageNo3, });
				} else {
					return Object.assign({}, data, { isAudit: '5', pageNo: this.pageNo2,});
				}
			}
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
		* 点击选择服务组
		*/
		onclickChoseSeviceGroup(val) {
			if(!val) { // 请求完成清空数据依然回触发onchange事件
				return false;
			}

			common.listUsPcUser({
				serviceGroupId: val,
			}).then(valid.call(this)).then(res => {
				if (res.ok) {
					this.serviceMenbers = res.data.data.members;
				}
			})
		},
		/*
		* 获取报账人
		*/
		getChosedGuys(msg) {
			this.formValidate = Object.assign({}, this.formValidate, {accountName: msg.name});
			this.formValidate.accountId = msg.userId;
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
					this.formValidate.unit = this.fixedUnit;
					this.formValidate.price = this.fixedprice;
				}
			});
		},
		/*
		* 点击选择报账方式
		*/
		onclickChangePayType(val) {
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
			this.isAddForm = true;
			this.modalBill = true;
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
				}			
			})
		},
		/*
		* 删除订单 delete
		*/
		onclickDeleteBill(id) {
			this.updateLoadingStatus({ isLoading: false });
			plBill.delete({id: id}).then(valid.call(this)).then(res => {
				if (res.ok) {
					this.$Message.success('账单删除成功');
					this.getBillList({});
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
					return;
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
		handleReset () {
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
				// 屏蔽连续提交账单
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
				data.serviceGroupId = this.formValidate.serviceGroupId;
				data.isAudit = 0;
				/*
				* 金额乘以时间
				*/
				if (data.type == 0) {
					data.amount = this.fixedprice * this.serverHours;
					// data.amount = `${this.fixedprice} * ${this.serverHours}`;
					data.unit = this.fixedUnit;
				}
				// 如果是新建表单
				if (!this.isAddForm) {
					delete data.id;
					data.remarks = null;
					// data.serviceGroupId = this.$route.params.gid;
					data.updateDate = data.createDate;
				}
				this.updateLoadingStatus({ isLoading: true });
				plBill.save(data).then(valid.call(this)).then(res => {
					if (res.ok) {
						this.$Message.info('账单提交成功');
						this.handleReset();
						// 刷新列表
						this.getBillList({});
						/*
						*  保存上个账单人的信息
						*/
						this.formValidate = {};

						this.$refs.refModalBill.visible = false;
						this.addFormCount = 0;
						this.saveOrCancleBill = new Date().getTime();
						this.fixedUnit = null;
						this.fixedprice = null;
					}
				}).catch(errors.call(this)).finally(() => {
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
			this.$Message.info('取消添加账单');
			this.saveOrCancleBill = new Date().getTime();
			this.handleReset();
		},
		/*
		* 切换分页
		*/
		onclickChangePage(index) {
			this.getBillList({}, index);
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
					this.formValidates = res.data.data;
					this.formValidates.serviceScope = this.formValidates.serviceScope ? this.formValidates.serviceScope.split(','): [];
					this.unitTypeList.forEach(item => {
						console.log(item.value, this.formValidates.unit);
						if (item.value === this.formValidates.unit) {
							this.formValidates.unitTypes = item.label;
						}
					});
					console.log('this.formValidates.unitTypes', this.formValidates.unitTypes);
				}
			}).catch(errors.call(this)).finally(() => {
				this.updateLoadingStatus({ isLoading: false });
			});
		},
	},
	created() {

		this.formValidate.serviceGroupId = this.$route.params.gid;
		/*
		* 初始化默认创建账单日期
		*/
		this.formValidate.createDate = new Date().format('yyyy-MM-dd hh:mm:ss');

		this.getBillList({});
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
		* 获取服务组列表(待定)
		*/
		common.plList({}).then(valid.call(this)).then(res => {
			this.serviceGroupList = res.data.data;
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