<style lang="less">
	.my-bill-boss-app {
		padding: 16px 15px;
		padding-top: 0;
		padding-left: 0;
		position: relative;
		.my-bill-search-add {
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;
			padding-right: 10px;
			height: 85px;
			width: 100%;
			position: absolute;
			top: 51px;
			left: 0;
			z-index: 999;
		}
	}
	.my-view-tabs {
		.my-bill-tab-content {
			margin-top: 100px;
		}
	}
	.my-bill-container {
		position: relative;
		padding-top: 0;
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
		.my-bill-line-div {
			width: 14px;
			height: 4px;
			margin-top: 14px;
			background-color: #44BCB7;
		}
	}
	.my-bill-tab-content {
		padding-top: 5px;
	}
	.bill-time-use {
		>div {
			float: left;
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
		.bill-manage-modal-tip {
			.bill-manage-modal-tip-p {
				padding: 40px 0;
				font-size: 16px;
				text-align: center;
			}
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
					width: 100px;
					height: 42px;
					font-size: 14px;
				}
			}
		}
	.bill-manage-rate-list {
		// height: 32px;
		.bill-manage-rate-list-name {
			float: left;
			font-size:14px;
			color:#1b1b1b;
			line-height:32px;
			width: 100px;
			height: 32px;
			display:inline-block;
			margin-right:20px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.bill-manage-rate-list-hour {
			color:rgb(167, 167, 167);
			line-height:32px;
			display:inline-block;
			margin-left:-10px;
			margin-right:20px;
		}
	}
	.bill-paging {
		text-align: center;
		margin-top: 20px;
	}
</style>

<template>
	<div class="my-bill-boss-app">
		<!-- 主管_账单管理 -->
		<div class="my-bill-container">
				<div class="my-bill-search-add">
					<Input v-model="searchVal" icon="ios-search" placeholder="请输入输入账单发票号/报账人姓名" style="width: 396px" @on-click="onclickSearchBills" @on-enter="onclickSearchBills"></Input>
					<Button style="width: 95px; height:32px;float:right"type="primary" @click="onclickButton">设置费率</Button>
					<div class="my-bill-container-timePicker">
						<DatePicker type="date" placeholder="开始日期"   style="width: 120px" @on-change="onchangeBDate"></DatePicker>
						<div class="my-bill-line-div"></div>
						<DatePicker type="date" placeholder="结束日期"  style="width: 120px" @on-change="onchangeEDate"></DatePicker>
					</div>
				</div>
			<Tabs value="1" v-model="tabVal" class="my-view-tabs" :animated="false">
				<TabPane label="最近更新" name="1">
					<div class="my-bill-tab-content">
						<media-list-item
							v-for="(item, index) in billList"
							:key="index"
							:thumbnail="item.thumbnail"
							:title="item.invoiceId"
							:date="item.invoiceDate"
							:isAudit="item.isAudit"
							:describ="item.servieContent"
							:submiter="item.accountName "
							:submitType="item.unit"
							:submitCount="item.amount"
							:conmunicateTime="item.serviceTime"
							:importantColor=true
							:manage=true
							:id="item.accountId"
							types="我的账单"
							@onclickBillDetail="onclickBillDetail(item.id)">

							<check-box-item
								ref="refCheckBox"
								:singles="item.singles"
								:index="index"
								:isAudit="item.isAudit"
								manageType="compelete"
								:id="item.id"
								@onclickCheckBox="onclickCheckBox"
							></check-box-item>

						</media-list-item>
					</div>
				</TabPane>
				<TabPane label="未付款" name="2">
					<div class="my-bill-tab-content">
						<media-list-item
							v-for="(item, index) in billList"
							:key="index"
							:thumbnail="item.thumbnail"
							:title="item.invoiceId"
							:date="item.createDate"
							:isAudit="item.isAudit"
							:describ="item.servieContent"
							:submiter="item.accountName "
							:submitType="item.unit"
							:submitCount="item.amount"
							:conmunicateTime="item.serviceTime"
							:importantColor=true
							:manage=true
							:id="item.accountId"
							types="我的账单"
							@onclickBillDetail="onclickBillDetail(item.id)">

							<check-box-item
								ref="refCheckBox"
								:singles="item.singles"
								:index="index"
								:isAudit="item.isAudit"
								manageType="compelete"
								:id="item.id"
								@onclickCheckBox="onclickCheckBox"
							></check-box-item>

						</media-list-item>
					</div>
				</TabPane>
				<TabPane label="已付款" name="3">
					<div class="my-bill-tab-content">
						<media-list-item
							v-for="(item, index) in billList"
							:key="index"
							:thumbnail="item.thumbnail"
							:title="item.invoiceId"
							:date="item.createDate"
							:isAudit="item.isAudit"
							:describ="item.servieContent"
							:submiter="item.accountName "
							:submitType="item.unit"
							:submitCount="item.amount"
							:conmunicateTime="item.serviceTime"
							:importantColor=true
							:manage=true
							types="我的账单"
							:id="item.accountId"
							@onclickBillDetail="onclickBillDetail(item.id)">
						</media-list-item>
					</div>
				</TabPane>
			</Tabs>
		</div>
		<!-- 主管_账单管理 -->
		<Page
			v-if="pageCount > 10"
			show-sizer
			class="bill-paging"
			:total="pageCount"
			:page-size="10"
			show-total
			show-elevator
			:current="pageNo"
			@on-change="onclickChangePage"
			@on-page-size-change="onPageSizeChange"
		></Page>
		<!-- 点击查看账单详情 -->
		<bill-modal-detail
			ref="refBillModalDetail"
			:formValidates="formValidates"
			:listDatas="listDatas"

		></bill-modal-detail>
		<!-- 点击确定之后的弹窗 -->
		<Modal
			v-model="modalTips"
			:closable="false"
			class="bill-manage-modal-tip"
			width="730">
			<p class="bill-manage-modal-tip-p">确定将该帐单标记为已付款?</p>
			<div
				class="bill-modal-detail-btn-area">
				<Button  @click="onclickNotSure">取消</Button>
				<Button type="success" @click="onclickSure">确定</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
import { mapMutations, mapGetters, } from "vuex";
import { currency, } from '../../libs/util';
import valid, { errors, plBill, common, sys} from '../../libs//request';
import MediaListItem from "../../components/mediaListItem";
import CheckBoxItem from '../../components/checkBoxItem';
import BillModalDetail from '../../components/billModalDetailItem';
export default {
	name: 'MyBill',
	components: {
		MediaListItem,
		CheckBoxItem,
		BillModalDetail,
	},
	data() {
		return {
			// 是否是boss
			isCharge: false,
			// 提示框弹窗
			modalTips: false,
			// tab切换
			tabVal: '1',
			// 正在管理的账单的id
			managingId: null,
			managingStatus: null,
			managingIndex: null,
			searchVal: null,
			// 是否 添加账单
			isAddForm: false,
			// 标签列表
			listDatas: null,
			// 货币字典列表
			unitTypeList: null,
			// 账单时间检索的范围
			beginDate: null,
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
				serviceGroupId: null,
				},
		};
	},
	filters: {
		currency,
	},
	watch: {
		tabVal(newVal) {
			if(newVal) {
				this.getBillList({});
			}
		},
	},
	computed: {
		...mapGetters('plan', ['tagId']),
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
		* 点击 checkbox
		*/
		onclickCheckBox(val, id, index) {
			this.managingId = id;
			this.managingStatus = val;
			this.managingIndex = index;
			this.modalTips = true;
			this.billList[index].singles = !this.billList[index].singles;
		},
		/*
		* 点击 取消 tips
		*/
		onclickNotSure() {
			// this.onclickCheckBox(false, this.managingId, this.managingIndex);
			this.$refs.refCheckBox[this.managingIndex].single = false;
			this.managingId = null;
			this.managingStatus = false;
			this.managingIndex = null;
			this.modalTips = false;
		},
		/*
		* 点击 确定 tips
		*/
		onclickSure() {
			plBill.audit({
				id: this.managingId,
				isAudit: 3,
			}).then(valid.call(this)).then(res => {
				if (res.ok) {
					this.$Message.success('已标记为已付款');
					this.getBillList({
						pageNo: this.pageNo,
					});
				}
			})
			this.$refs.refCheckBox[this.managingIndex].single = false;
			this.managingId = null;
			this.managingStatus = false;
			this.managingIndex = null;
			this.modalTips = false;
		},
		/*
		* 获取账单列表 index 为判断是点击进行分页操作 还是 自行刷新
		*/
		getBillList(data, index) {
			const datas = this.tabValChanges(data, index);
			plBill.listAuditedBill(datas).then(valid.call(this)).then(res => {
				if (res.ok) {
					this.billList = res.data.data.list;
					this.pageCount = res.data.data.count;
					this.pageSize = res.data.data.pageSize;

					this.billList.forEach((item, index) => {
						item.singles = false;
					});
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
					return Object.assign({}, data, { isAudit: '3', pageNo: this.pageNo3, });
				} else {
					this.pageNo2 = index;
					return Object.assign({}, data, { isAudit: '4', pageNo: this.pageNo2,});
				}
			} else {
				if (this.tabVal === '1') {
					return Object.assign({}, data, { pageNo: this.pageNo1, });
				} else if (this.tabVal === '3') {
					return Object.assign({}, data, { isAudit: '3', pageNo: this.pageNo3, });
				} else {
					// 未付款
					return Object.assign({}, data, { isAudit: '4', pageNo: this.pageNo2,});
				}
			}
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
						if (item.value === this.formValidates.unit) {
							this.formValidates.unitTypes = item.label;
						}
					});
				}
			}).catch(errors.call(this)).finally(() => {
				this.updateLoadingStatus({ isLoading: false });
			});
		},
		/*
		* 点击设置费率
		*/
		onclickButton() {
			this.$router.push({
				name: 'plan.rate',
			});
		},
		/*
		* 删除订单 delete
		*/
		onclickDeleteBill(id) {
			this.updateLoadingStatus({ isLoading: false });
			plBill.delete({id: id}).then(valid.call(this)).then(res => {
				if (res.ok) {
					this.getBillList({
						pageNo: this.pageNo,
						pageSize: this.pageSize,
					});
				}
			}).catch(errors.call(this)).finally(() => {
				this.updateLoadingStatus({ isLoading: false });
			});
		},
		/*
		* 切换分页
		*/
		onclickChangePage(index) {
			this.getBillList({}, index);
			this.pageNo = index;
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
	},
	created() {
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

