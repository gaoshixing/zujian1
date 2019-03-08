<style lang="less">
	.refund {
		border-top: 1px solid #e0e0e0;
		.ivu-table:after {
			display: none;
		}
		.ivu-table-wrapper {
			border: none;
		}
		.ivu-table-column-center {
			background: #fff;
		}
		.filterDw {
			.mb12 {
				margin-bottom: 12px;
			}
			.form {
				.ivu-form-item-content {
					line-height: 22px;
				}
				.ivu-form-item {
					margin-bottom: 14px;
					.ivu-form-item-label {
						color: #999;
						font-size: 14px;
					}
				}
				.filter {
					.title {
						/*display: none;*/
					}
				}
			}
		}
		.main {
			position: relative;
			margin-top: 30px;
			.info {
				position: absolute;
				top: -30px;
				left: 0px;
				.green {
					color: #77cac7;
					font-size: 18px;
				}
				.red {
					color: #f00;
					font-size: 18px;
				}
			}
		}
		.page-box {
			display: flex;
			justify-content: center;
			margin-top: 20px;
		}
	}
	/*.closeRefund{
		p{
			width: 49%;
			display: inline-block;	
			line-height: 50px;
		}
	}*/
	
	.modalAcc {
		.imgBg {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.5);
			line-height: 180vh;
			z-index: 1999;
			text-align: center;
			img{
				height: 80vh;
				width: auto;
				display: inline-block;
			}
			&.hid {
				display: none;
			}
		}
		ul,li {
			list-style: none;
			margin: 0;
			padding: 0;
		}
		ul>li {
			line-height: 30px;
			span {
				vertical-align: top;
				display: inline-block;
				width: 100px;
				text-align: right;
				margin-right: 10px;
			}
			.modalAccBody {
				display: inline-block;
				width: 370px;
				padding-top: 8px;
			}
		}
		.modalAccBody {
			min-height: 200px;
		}
		.attaImg {
			img {
				display: inline-block;
				width: 80px;
				height: 80px;
				cursor: pointer;
				margin: 0 10px;
			}
		}
		.ivu-modal-footer {
			display: none;
		}
	}
</style>

<template>
	<div class="refund">
		<v-select style="width: 396px;margin: 15px 0 10px;" placeholder="输入合同名称/合同编码/学生姓名/EC号" icon="search" v-model="compact" k='cnname' :datafunc="searchDropList" @on-enter="textChange" @on-click="textChange" @selected="textChange">
		</v-select>
		<div class="filterDw">
			<v-search-options :data="firm.countryList" company byKey="name" :searchTitle="firm.searchName" @on-select-item="firmChange" labelWidth="80" style="margin: 5px 0;" v-if="isAdmin || isCeo"></v-search-options>
			<div>
				<v-search-options :label-width="80" byKey="label" :searchTitle="signTime.searchName" :data="signTime.list" @on-select-item="timeCharge" labelWidth="80" valign="center">
					<DatePicker type="date" placeholder="报账时间" style="width: 200px" @on-change="onDataPickStart" v-model="beforeTime"></DatePicker>
					<span style="background-color: rgb(54, 162, 158); display: inline-block; width: 12px; height: 2px;"></span>
					<DatePicker type="date" placeholder="报账时间" style="width: 200px" @on-change="onDataPickEnd" v-model="afterTime"></DatePicker>
				</v-search-options>
			</div>
			<v-search-options :data="pay.countryList" byKey="label" :searchTitle="pay.searchName" @on-select-item="payChange" labelWidth="80" style="margin: 5px 0;"></v-search-options>
		</div>
		<div class="main">
			<p class="info">累计收到 <span class="green">{{count}}</span> 份退款合同，退款总金额 <span class="red" v-text="sumCurReceipt?parseFloat((Number(sumCurReceipt)/1000).toFixed(4)):0"></span> 万</p>
			<btnlist :btn="btnItem" :tableSelectedItem="pitchItem" @current="deriveCurrent" @all="deriveAll">
				<span slot='url' style="margin-left: 12px;">合同退款-列表</span>
			</btnlist>
			<Table ref="wait" :columns="columns" :data="tableData" @on-sort-change="sort" @on-selection-change="selection"></Table>
		</div>
		<div class="page-box" v-show="count>10">
			<div style="margin: auto;display: inline-block;">
				<Page :total="count" :current="1" show-total :show-sizer="count>10" show-elevator @on-change="pageChange" @on-page-size-change="sizeChange"></Page>
			</div>
		</div>
		<form class="formexport" action="" method="get">
			<input type="hidden" name="companyIds" :value="companyIds" />
			<input type="hidden" name="startTime" :value="this.beforeTime?(new Date(this.beforeTime)).format('yyyy-MM-dd'):''" />
			<input type="hidden" name="endTime" :value="this.afterTime?(new Date(this.afterTime)).format('yyyy-MM-dd'):''" />
			<input type="hidden" name="timeFlag" :value="2" />
			<input type="hidden" name="months" :value="months" />
			<input type="hidden" name="receiptDetailTypes" :value="receiptDetailTypes" />
			<input type="hidden" name="orderBy" :value="orderBy" />
			<input type="hidden" name="name" :value="compact" />
		</form>
		<Modal v-model="modalAcc" title="查看退款" width="520" class="modalAcc">
			<ul>
				<li><span>退款金额：</span>{{tableItem.outPrice}}</li>
				<li><span>退款时间：</span>{{tableItem.pendingAmount}}</li>
				<li><span>操作人：</span>{{tableItem.applyerName}}</li>
				<li><span>操作时间：</span>{{tableItem.signTime}}</li>
				<li>
					<span>退款收据：</span>
					<div v-if="modalAcc" class="modalAccBody">
						<p v-if="tableItem.attachments.length" class="attaImg">
							<img :src="displayUrl(item)" v-for="item in tableItem.attachments" @click="seeImg(item)" />
						</p>
						<p v-else>无</p>
						<div class="imgBg" :class="{hid:imgBgShow}" @click="hidImg">
							<img :src="displayUrl(imgId)" v-if="imgId" />
						</div>
					</div>
				</li>
			</ul>
			
		</Modal>
	</div>
</template>

<script>
	import vSearchOptions from "@public/modules/vSearchOptions";
	import vSelect from "../../modules/vSelect.vue";
	import btnlist from "../receipt/btnlist.vue";
	import { mapGetters, mapState } from 'vuex';
	import valid, {
		errors,
		common,
		htTag,
		htContractTpl,
		htPolicy,
		account
	} from "../../libs/request.js";
	export default {
		data() {
			return {
				count: 0,
				modalAcc: false,
				imgBgShow: true,
				tableItem: {},
				imgId: '',
				pitchItem: [],
				btnItem: [{
						cont: ''
					},
					{
						cont: '导出',
						importOptList: [{
								id: 1,
								label: "导出当前",
								value: "current"
							},
							{
								id: 2,
								label: "导出所有",
								value: "all"
							}
						]
					},
					{
						cont: ''
					},
					{
						cont: ''
					}
				],
				compact: '',
				beforeTime: '',
				afterTime: '',
				companyIds: '',
				sumCurReceipt: '',
				months: '',
				orderBy: '',
				receiptDetailTypes: '',
				pageNo: 1,
				pageSize: 10,
				pay: {
					searchName: '支付方式',
					countryList: []
				},
				firm: {
					searchName: '分公司',
					countryList: [],
				},
				signTime: {
					searchName: '报账时间',
					list: [{
							label: '不限',
							id: ''
						},
						{
							label: '本月',
							id: 1
						},
						{
							label: '近三个月',
							id: 3
						},
						{
							label: '今年',
							id: 12
						},
					]
				},
				columns: [{
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
						title: '合同编号',
						key: 'ctNo',
						align: 'center',
						render: (h, params) => {
							return h('div', {}, [
								h('span', {
									style: {
										color: '#41b3ae',
										cursor: 'pointer',
									},
									on: {
										click: () => {
											this.jumpView(params.row)
										}
									}
								}, params.row.ctNo),
								h('i', {
									'class': {
										'iconfont': true,
										'icon-wenjianjia': true
									},
									style: {
										color: '#41b3ae',
										fontSize: '14px',
										display: params.row.isProtocol == 1 ? '' : 'none'
									}
								}, '')
							])
						},
					},
                    {
                        title: '签约客户',
                        key: 'studentName',
                        align: 'center'
                    },
					{
						title: '签约人',
						key: 'applyerName',
						align: 'center'
					},
					{
						title: '应收金额',
						key: 'signPrice',
						align: 'center',
						sortable: 'custom',
					},
					{
						title: '实收金额',
						key: 'inPrice',
						align: 'center',
						sortable: 'custom',
					},
					{
						title: '退款金额',
						key: 'outPrice',
						align: 'center',
						sortable: 'custom',
					},
					{
						title: '退款时间',
						key: 'pendingAmount',
						align: 'center',
						sortable: 'custom',
					},
					{
						title: '操作',
						key: 'handle',
						align: 'center',
						render: (h, params) => {
							let self = this;
							return h("a", {
								on: {
									click: () => {
										console.log(params.row)
										self.checkAcc(params.row);
									}
								}
							}, '查看')
						}
					}
				],
				tableData: [],
				count: 20,
				exportData: [],
				//				closeRefund:true
			}
		},
		computed: {
			...mapGetters('sign', ['isAdmin', 'isCeo']),
			...mapState(['userInfo', 'appMenuList']),
			exportFileRefund() {
				return account.exportFileRefund();
			},
		},
		components: {
			vSelect,
			vSearchOptions,
			btnlist,
		},
		created() {
			let params = {
				grade: '2',
				types: '1,2,3'
			}
			common.officeList(params).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.firm.countryList = res.data.data.allCompany;
					this.firm.countryList.splice(0, 0, {
						id: '',
						name: '全部 all'
					});
				}
			}).catch(errors.call(this));
			let params1 = {
				type: 'ht_receipt_detail_type'
			}
			common.listData(params1).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.pay.countryList = res.data.data;
					this.pay.countryList.splice(0, 0, {
						label: '不限',
						id: ''
					})
				}
			}).catch(errors.call(this));
			this.getList();
		},
		methods: {
			displayUrl(id) {
				return common.displayUrl(id);
			},
			getList() {
				let params = {
					companyIds: this.companyIds,
					startTime: '',
					endTime: '',
					months: this.months,
					orderBy: this.orderBy,
					name: this.compact,
					timeFlag: 2,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					receiptDetailTypes: this.receiptDetailTypes
				}
				if(!!this.beforeTime) {
					params.startTime = (new Date(this.beforeTime)).format('yyyy-MM-dd');
				};
				if(!!this.afterTime) {
					params.endTime = (new Date(this.afterTime)).format('yyyy-MM-dd');
				} else if(!!this.beforeTime && !this.afterTime) {
					params.endTime = (new Date()).format('yyyy-MM-dd');
				};
				account.refundList(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.tableData = res.data.data.list;
						this.count = res.data.data.count;
						this.sumCurReceipt = res.data.data.attach.sumCurReceipt;
					}
				}).catch(errors.call(this))
			},
			searchDropList(word) {
				return new Promise((resolve, reject) => {});
			},
			textChange: function(val) {
				this.$nextTick(() => {
					this.getList();
				})
			},
			firmChange(val) {
				this.companyIds = val
				this.getList();
			},
			onDataPickStart() {
				this.getList();
			},
			onDataPickEnd() {
				this.getList();
			},
			payChange(val) {
				this.receiptDetailTypes = val
				this.getList();
			},
			deriveCurrent: function() {
				if(!!!this.pitchItem.length) {
					this.$Modal.warning({
						title: '',
						content: '请选择信息'
					});
				} else {
					let arr = this.pitchItem.map(item => item.ctId);
					let ids = arr.join(',');
					window.open(account.exportFileRefundByIds(ids))
				}
			},
			deriveAll: function() {
				let form = this.$el.querySelector('.formexport');
				form.action = this.exportFileRefund;
				this.$nextTick(() => {
					form.submit();
				});
			},
			sort(data) {
				let sortType = '';
				if(data.order != 'normal') {
					sortType = data.order;
					this.orderBy = data.key + ' ' + sortType;
					this.getList();
				}
			},
			selection(data) {
				this.pitchItem = data;
			},
			timeCharge(val) {
				this.months = val
				this.getList();
			},
			pageChange: function(num) {
				this.pageNo = num;
				this.getList();
			},
			sizeChange: function(val) {
				this.pageSize = val;
				this.getList();
			},
			jumpView(data) {
				this.$router.push({
					name: 'sign.pactPreview',
					query: {
						id: data.ctId
					}
				})
			},
			jumpView1(item) {
				if(item.fileId) {
					window.open(`https://portal.ivygate.cn/index.php/webutils/document/${item.fileId}`);
				}
			},
			seeImg(id) {
				this.imgId = id;
				this.imgBgShow = false;
			},
			hidImg() {
				this.imgBgShow = true;
			},
			checkAcc(data) {
				this.modalAcc = true;
				this.tableItem = data;
			},
		}
	}
</script>