<style lang="less">
	.my-close-boss {
		.ivu-table-column-center {
			background-color: #fff;
		}
		.close-my-close {
			.docu-top-area-timing {
				margin-top: 0;
				padding-right: 70px;
			}
		}
		.my-close-table {
			border: none;
			.ivu-table {
				&::after {
					content: none;
				}
			}
			.ivu-table-cell {
				color: #333;
			}
		}
		.bill-paging {
			text-align: center;
			margin-top: 20px;
		}
	}
	.ivu-poptip-content {
		text-align: center !important;
	}
	.render-caozuo-hide {
		display: none;
	}
</style>

<template>
	<div class="my-close-boss">
		<TopArea
			class="close-my-close"
			:sliderNav="sliderNav"
			placeholder="输入学生姓名/提交人姓名"
			timeTitle="提交时间"
			@onclickSearchBills="onclickSearch"
			@getTargetList="getTargetList"
			@slideNavChange="slideNavChange"
		></TopArea>
		<div style="line-height: 32px; color:#333; font-size:14px;">当前文书<span style="color:red;font-size:16px;font-weight:bold;margin-left:5px;">{{pageTotal}}</span></div>
		<BtnList title="文书列表" :btnList="btnList"></BtnList>
		<Table
			ref="refApprovalTable"
			class="my-close-table"
			:columns="columnsClose"
			:data="dataClose"
			@on-sort-change="sort"
			@on-filter-change="onFilterChange"
			@on-selection-change="onSelectionChange">
		</Table>
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
		<ModalLog
			title="操作日志"
			ref="refExceptionModal"
			:columnsException="columnsException"
			:dataException="dataException"
			@cancleModalLog="cancleModalLog"
		></ModalLog>
		<ModalApproval
			title="结案审核"		
			:types="types"
			ref="refApprovalInfos"			
			:approvalInfos="approvalInfos"
			@onclickToApproval="onclickToApproval"
			@modalApprovalCancel="modalApprovalCancel">
		</ModalApproval>
	</div>
</template>

<script>
import TopArea from '../../modules/docuTop/topArea';
import BtnList from '@public/modules/btnlist';
import ModalLog from '../../modules/modalLog';
import ModalApproval from '../../modules/modalApproval';
import { mapMutations, mapState, mapGetters, } from "vuex";
import valid, { errors, common, sys, closeApproval, } from '../../libs/request';
import { contract, } from '../../../../spoc-sign-web/src/libs/request.js';
export default {
	name: 'MyClose',
	props: {
		pId: {
			required: true,
		},
	},
	components: {
		TopArea,
		BtnList,
		ModalLog,
		ModalApproval,
	},
	data() {
		return {
			status: null, // sliderNav 筛选
			keyword: null,
			startDate: null,
			endDate: null,
			pageTotal: null,
			pageSize: 10,
			pageNo: 1,
			orderByType: null,
			orderByStatus: null,
			studentId: null, // 进行审核的时候 学生的id
			types: 'single',
			sliderNav: [
				{ label: '最近更新', name: '1', },
				{ label: '待审核', name: '2', },
				{ label: '已审核', name: '3', },
			],
			btnList: [
				{
					text: '批量审核',
					event: this.onclickBatchApproval,
				},
			],
			columnsClose: [
				{
					type: 'selection',
					width: 60,
					align: 'center'
                },
				{
					title: '结案学生',
					key: 'stuName',
					align: 'center',
					render: (h, params) => {
						const _this = this;
						return h('span', {
							style: {
								color: '#44bcb7',
								cursor: 'pointer',
							},
							on: {
								click() {
									_this.$router.push({
										name: 'apply.addStudent',
										query: {
											studentId: params.row.stuId,
										},
									});
								},
							},
						}, params.row.stuName)
					},
				},
				{
					title: '提交人',
					key: 'submitter',
					align: 'center',
				},
				{
					title: '提交时间',
					key: 'createDate',
					align: 'center',
					sortable: true,
				},
				{
					title: '审核结果',
					key: 'status',
					align: 'center',
					filters: [
						{ label: '待审核', value: 'commit', },
						{ label: '通过', value: 'pass', },
						{ label: '驳回', value: 'reject' },
					],
					filterMultiple: false,
					filterMethod (value, row) {
						return true;
					},
				},
				{
					title: '操作',
					key: 'address',
					align: 'center',
					width: 200,
					render: (h, params) => {
						const _this = this;
						const text1 = '日志';
						const text2 = '审核';
						let isShow = false;
						console.log('_this.isAplManage', _this.isAplManage);
						if (_this.isAplManage) {
							isShow = (params.row.status !== '待分总审批') ? true : false;
						} else {
							isShow = (params.row.status !== '待审批') ? true : false;
						}
						const renderArr = [
							h('span', {
								style: {
									color: '#44bcb7',
									cursor: 'pointer',
									float: 'left',
									marginRight: '15px',
								},
								class: {
									'render-caozuo-hide': isShow,
								},
								on: {
									click() {
										_this.types = 'single';
										_this.studentId = params.row.stuId;
										_this.approvalInfos.push(params.row);
										_this.$refs.refApprovalInfos.show();
									},
								},
							}, text2),
							h('span', {
								style: {
									color: '#44bcb7',
									cursor: 'pointer',
									float: 'left',
								},
								on: {
									click() {
										_this.getLog(params.row.id);
										_this.$refs.refExceptionModal.checkException();
									},
								},
							}, text1),
						];
						return h('div', {
							style: {
								padding: '0 50px',
								height: '18px',
							},
						}, renderArr);
					},
				}
			],
			dataClose: [],
			columnsException: [
				{ title: '序号', key: 'index', align: 'center', },
				{ title: '操作人', key: 'optUser', align: 'center', },
				{ title: '操作', key: 'reason', align: 'center', width: 180, },
				{ title: '时间', key: 'optTime', align: 'center', },
			],
			dataException: [],
			approvalInfos: [],
		};
	},
	computed: {
		...mapState({
			userInfo: state => state.userInfo,
		}),
		...mapGetters('apply',['isAplManage',]),
	},
	methods: {
		slideNavChange(val) { //status
			switch(val) {
				case '1' : this.status = null; break;
				case '2' : this.status = 'commit'; break;
				case '3' : this.status = 'handled'; break;
			};
			this.getApprovalList();
		},
		onclickSearch(val) {
			this.keyword = val;
			this.getApprovalList();
		},
		getTargetList(t1, t2) {
			this.startDate = t1;
			this.endDate = t2;
			this.getApprovalList();
		},
		/*
		* Modal 消失
		*/
		modalApprovalCancel() {
			this.approvalInfos = [];
			this.$refs.refApprovalTable.selectAll(false);
		},
		/*
		* 关闭日志modal
		*/
		cancleModalLog() {
			this.dataException = [];
		},
		/*
		* 审批
		*/
		onclickToApproval(d1, d2, d3) {
			let status = null;
			if (this.isAplManage) {
				status = d2 ? 'pass' : 'reject';
			} else {
				status =  d2 ? 'commit_boss' : 'reject';
			}
			const data = {
				ids: d1,
				status,
				remarks: d3,
			};
			this.audit(data);
		},
		/*
		* Table 操作
		*/
		// 监听 table 选中
		onSelectionChange(selection) {
			this.approvalInfos = selection;
		},
		// 批量 审核
		onclickBatchApproval() {
			if (!this.approvalInfos.length) {
				this.$Message.warning('请选择要批量审核的文书');
				return;
			}
			this.types = 'batch';
			this.$refs.refApprovalInfos.show();
		},
		sort(val) {
			this.orderByType = val.key;
			this.orderByStatus = val.order;
			this.getApprovalList();
		},
		onFilterChange(val) {
			this.status = val._filterChecked[0];
			this.getApprovalList();
		},
		/*
		* 分页
		*/
		onclickChangePage(index) {
			this.pageNo = index;
			this.getApprovalList();
		},
		onPageSizeChange(val) {
			this.pageSize = val;
			this.getApprovalList();
		},
		/*
		* 列表获取
		*/
		getApprovalList() {
			const data = {
				status: this.status,
				keyword: this.keyword,
				startDate: this.startDate,
				endDate: this.endDate,
				orderByType: this.orderByType,
				orderByStatus: this.orderByStatus,
				pageNo: this.pageNo,
				pageSize: this.pageSize,
			};
			closeApproval.listPage(data).then(valid.call(this)).then(res => {
				if (res.ok) {
					this.dataClose = res.data.data.list;
					this.pageTotal = res.data.data.count;
					this.pageNo = res.data.data.pageNo;
					this.pageSize = res.data.data.pageSize;
					this.dataClose.forEach(item => {
						if (item.status === '通过' || item.status === '驳回') {
							item._disabled = true;
						}
					})
				}
			}).catch(errors.call(this));
		},
		/*
		* log日志
		*/
		getLog(auditId) {
			closeApproval.log({ auditId, }).then(valid.call(this)).then(res => {
				if (res.ok) {
					this.dataException = res.data.data;
					this.dataException.forEach((item,index) => {
						item.index = index + 1;
						if (item.status === 'pass') {
							if (!item.reason) {
								item.reason = `审核通过`;
							} else {
								item.reason = `审核通过，反馈内容如下：\n ${item.reason}`;
							}
						} else if (item.status === 'reject') {
							item.reason = `审核驳回，驳回理由如下：\n${item.reason}`;
						}
					});
				}
			}).catch(errors.call(this));
		},
		/*
		* 审批
		*/
		audit(data) {
			closeApproval.audit(data).then(valid.call(this)).then(res => {
				if (res.ok) {
					this.$Message.info(res.data.message);
					this.getApprovalList();
					if (data.status === 'pass') {
						console.log('this.studntId', this.studentId);
						contract.aplfinishContract({ studentId: this.studentId, }).then(valid.call(this)).then(res => {
							console.log('this is res', res);
						}).catch(errors.call(this));
						console.log('this is pass');
					}
				}
			}).catch(errors.call(this));
		},
	},
	created() {
		this.getApprovalList();
	},
};
</script>