<style lang="less">
	.approveManager {
		border-top: solid 1px #e0e0e0;
		.ivu-table th {
			background: #fff;
		}
		.table_box {
			padding: 0px 0px 10px;
			tr{
				height: 44px;
			}
			.strip-tit {
				color: #333;
				font-size: 14px;
				line-height: 32px;
				span {
					font-weight: bold;
					font-size: 16px;
					color: #44bcb7;
				}
			}
			.ivu-table-wrapper {
				border: none;
				.ivu-table {
					&:before,
					&:after {
						display: none;
					}
					.ivu-table-body {
						.ivu-table-tbody {
							.ivu-table-row {
								td {
									.ivu-badge-dot {
										right: -14px;
									}
								}
							}
						}
					}
				}
			}
		}
		.page-box {
			display: flex;
			justify-content: center;
			margin-top: 14px;
			padding-bottom: 150px;
		}
		.bill-paging {
			text-align: center;
			margin-top: 20px;
		}
	}
	.ivu-table-filter-select-item {
		text-align: center;
	}
	.approval-hide-render {
		display: none;
	}

</style>

<template>
	<div class="approveManager">
		<v-select style="width: 396px;margin: 15px 0;" placeholder="请输入提交人姓名" icon="search" v-model="search" k='cnname' :datafunc="searchDropList" @on-enter="textChange" @on-click="textChange" @selected="textChange">
		</v-select>
		<div class="table_box">
			<p class="strip-tit">共找到 <span>{{pageTotal}}</span> 条审批记录</p>
			<btn-list title="客户列表"></btn-list>
			<Table :loading="loading" :columns="columnsApproval" :data="dataApproval" @on-sort-change="sort" @on-filter-change="onFilterChange"></Table>
		</div>
		<Page
			class="bill-paging"
			v-if="pageTotal > 10"
			show-sizer
			:total="pageTotal"
			:current="pageNo"
			:page-size="pageSize"
			show-total
			show-elevator
			@on-change="onclickChangePage"
			@on-page-size-change="onPageSizeChange">
		</Page>
		<ModalApproval
			title="审核"
			ref="refModalApproval"
			:approvalInfos="approvalInfos"
			@onclickToApproval="onclickToApproval"
		></ModalApproval>
		<ModalLog
			ref="refLog"
			:columnsException="columnsException"
			:dataException="dataException"
		></ModalLog>
	</div>
</template>

<script>
import { mapState, mapMutations, } from 'vuex';
import { waitUntil, } from '@public/libs/util';
import valid, { errors, sys, common, messageManage, } from '../../libs/request';
import vSelect from '@public/modules/vSelect';
import BtnList from '@public/modules/btnlist';
import ModalLog from '../../modules/modalLog';
import ModalApproval from '../../modules/modalApproval';
export default {
	components: {
		vSelect,
		BtnList,
		ModalLog,
		ModalApproval,
	},
	data() {
		return {
			loading: true,
			search: '',
			kind: null, // 通知种类
			status: null, // 通知状态 0 提交 1通过 2 驳回
			orderByType: null,
			orderByStatus: null,
			pageTotal: 0,
			pageSize: 10,
			pageNo: 1,
			approvalInfos: null,
			isCeo: false,
			editForm:{},
			columnsApproval: [
				{
					title: '审批内容',
					key: 'title',
					align: 'center',
					filters: [
						{
							label: '群发短信',
							value: 'crmgroupsms',
						},
						{
							label: '群发邮件',
							value: 'crmgroupemail'
						},
					],
					filterMultiple: false,
					filterMethod (value, row) {
						return true;
					},
					render: (h, params) => {
						const resText = params.row.kind === 'crmgroupsms' ? '群发短信' : '群发邮件';
						return h('span', resText);
					},
				},
				{
					title: '提交人',
					key: 'senderName',
					align: 'center',
				},
				{
					title: '提交时间',
					key: 'handleTime',
					sortable: 'custom',
					align: 'center',
				},
				{
					title: '审批状态',
					key: 'status',
					align: 'center',
					filters: [],
					filterMultiple: false,
					filterMethod(value, key) {
						return true;
					},
					render: (h, params) => {
						let resText = null;
						switch (params.row.status) {
							case '0': resText = '待审批'; break;
							case '1': resText = '审批通过'; break;
							case '2': resText = '审批驳回'; break;
							case '3': resText = '审批通过'; break;
							case '4': resText = '审批驳回'; break;
						}; 
						return h('span', resText);
					},
				},
				{
					title: '操作',
					key: 'handle',
					align: 'center',
					render: (h, params) => {
						let isHideApprovalBtn = false;
						if (this.isCeo) {
							isHideApprovalBtn = params.row.status === '1' ? false : true;
						} else {
							isHideApprovalBtn = params.row.status === '0' ? false : true;
						}
						const _this = this;
						const renderArr = [
							h("span", {
								style: {
									cursor: 'pointer',
									color: '#44bcb7',
									marginRight: '15px',
								},
								class: {
									'approval-hide-render': isHideApprovalBtn,
								},
								on: {
									click: () => {
										_this.getCheckInfo(params.row.id);
									}
								}
							}, '审批'),
							h("span", {
								style: {
									cursor: 'pointer',
									color: '#44bcb7',
								},
								on: {
									click: () => {
										_this.dataException = [];
										_this.getLogInfo(params.row.id);
										_this.$refs.refLog.checkException();
									}
								}
							}, '日志'),
						];
						return h('div', renderArr);
					}
				}
			],
			dataApproval: [],
			columnsException: [
				{
					title: '序号',
					key: 'index',
					align: 'center',
				},
				{
					title: '操作人',
					key: 'optUserName',
					align: 'center',
				},
				{
					title: '操作',
					key: 'content',
					align: 'center',
				},
				{
					title: '时间',
					key: 'optTime',
					align: 'center',
				},
			],
			dataException: [],
		}
	},
	computed: {
		...mapState({
			userInfo: state => state.userInfo,
		}),
	},
	created() {
		this.getMessageList({});
	},
	mounted() {
		const filter1 = [
			{ label: '待审批', value: '0', },
			{ label: '审批通过', value: '1', },
			{ label: '审批驳回', value: '2', },
		];
		const filter2 = [ // ceo
			{ label: '待审批', value: '1', },
			{ label: '审批通过', value: '3', },
			{ label: '审批驳回', value: '4', },
		];
		waitUntil(()=>{
			return !!this.userInfo.roleId;
		},()=>{
			this.userInfo.roleId.split(',').forEach(item => {
				if (item === '912') this.isCeo = true;
			});
			this.columnsApproval[3].filters = this.isCeo ? filter2 : filter1;
		});
	},
	methods: {
		...mapMutations(['updateLoadingStatus']),

		searchDropList(word) {
			return new Promise((resolve, reject) => {});
		},
		textChange(val) {
			this.getMessageList();
		},
		/*
		* 审批账单
		*/
		onclickToApproval(id, val1, val2) {
			const data = {
				id,
				status: val1,
				remarks: val2,
			};
			this.getAudit(data);
			this.getMessageList();
		},
		/*
		* Table 操作
		*/
		sort(val) {
			this.orderByType = val.key;
			this.orderByStatus = val.order;
			this.getMessageList();
		},
		onFilterChange(val) {
			switch (val.key) {
				case 'title': this.kind = val._filterChecked[0]; break;
				case 'status': this.status = val._filterChecked[0]; break;
			}
			this.getMessageList();
		},
		/*
		* 分页
		*/
		onclickChangePage(index) {
			this.pageNo = index;
			this.getMessageList();
		},
		onPageSizeChange(val) {
			this.pageSize = val;
			this.getMessageList();
		},
		/*
		* 列表接口
		*/
		getMessageList() {
			const data = {
				name: this.search,
				kind: this.kind,
				status: this.status,
				orderByType: this.orderByType,
				orderByStatus: this.orderByStatus,
				pageNo: this.pageNo,
				pageSize: this.pageSize,
			};
			messageManage.listCrmNotificationPage(data).then(valid.call(this)).then(res => {
				if (res) {
					this.pageNo = res.data.data.pageNo;
					this.pageSize = res.data.data.pageSize;
					this.pageTotal = res.data.data.count;
					this.dataApproval = res.data.data.list;
					this.loading = false
				}
			}).catch(errors.call(this));
		},
		/*
		* 日志接口
		*/
		getLogInfo(notificationId) {
			messageManage.listAuditLog({ notificationId, }).then(valid.call(this)).then(res => {
				if (res) {
					this.dataException = res.data.data;
					this.dataException.forEach((item, index) => {
						item.index = index + 1;
					});
				}
			}).catch(errors.call(this));
		},
		/*
		* form
		*/
		getCheckInfo(id) {
			messageManage.form({ id, }).then(valid.call(this)).then(res => {
				if (res) {
					this.approvalInfos = res.data.data;
					this.$refs.refModalApproval.show();
				}
			}).catch(errors.call(this));
		},
		/*
		* 审批
		*/
		getAudit(data) {
			this.updateLoadingStatus({isLoading:true});
			messageManage.audit(data).then(valid.call(this)).then(res => {
				if (res.ok) {
					this.$Message.info('审批成功');
					this.approvalInfos = null;
					this.getMessageList();
				}
			}).catch(errors.call(this)).finally(() => {
				this.updateLoadingStatus({isLoading:false});
			});
		},
	},
}
</script>