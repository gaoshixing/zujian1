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
		.ivu-poptip-content {
			text-align: center;
		}
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
		<BtnList title="文书列表"></BtnList>
		<Table
			class="my-close-table"
			:columns="columnsClose"
			:data="dataClose"
			@on-sort-change="sort"
			@on-filter-change="onFilterChange">
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
			ref="exceptionModal"
			@cancleModalLog="cancleModalLog"
			:columnsException="columnsException"
			:dataException="dataException"
		></ModalLog>
	</div>
</template>

<script>
import TopArea from '../../modules/docuTop/topArea';
import BtnList from '@public/modules/btnlist';
import ModalLog from '../../modules/modalLog'
import valid, { errors, sys, common, closeApproval, } from '../../libs/request';
export default {
	name: 'MyClose',
	components: {
		TopArea,
		BtnList,
		ModalLog,
	},
	data() {
		return {
			status: null,
			keyword: null,
			startDate: null,
			endDate: null,
			pageTotal: null,
			pageSize: 10,
			pageNo: 1,
			orderByType: null,
			orderByStatus: null,
			sliderNav: [
				{ label: '最近更新', name: '1', },
				{ label: '待审核', name: '2', },
				{ label: '已审核', name: '3', },
			],
			columnsClose: [
				{
					title: '结案学生',
					key: 'stuName',
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
						{ label: '驳回', value: 'reject', },
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
					render: (h, params) => {
						const _this = this;
						const text = '日志';
						return h('span', {
							style: {
								color: '#44bcb7',
								cursor: 'pointer',
							},
							on: {
								click() {
									_this.getLog(params.row.id);
									_this.$refs.exceptionModal.checkException();
								},
							},
						}, text);
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
		};
	},
	created() {
		this.getListPage();
	},
	methods: {
		slideNavChange(val) {
			switch(val) {
				case '1': this.status = null; break;
				case '2': this.status = 'commit'; break;
				case '3': this.status = 'handled'; break;
			};
			this.getListPage();
		},
		onclickSearch(val) {
			this.keyword = val;
			this.getListPage();
		},
		getTargetList(t1, t2) {
			this.startDate = t1;
			this.endDate = t2;
			this.getListPage();
		},
		/*
		* 关闭日志modal
		*/
		cancleModalLog() {
			this.dataException = [];
		},
		/*
		* Table 操作
		*/
		sort(val) {
			this.orderByType = val.key;
			this.orderByStatus = val.order;
			this.getListPage();
		},
		onFilterChange(val) {
			this.status = val._filterChecked[0];
			this.getListPage();
		},
		/*
		* 分页
		*/
		onclickChangePage(index) {
			this.pageNo = index;
			this.getListPage();
		},
		onPageSizeChange(val) {
			this.pageSize = val;
			this.getListPage();
		},
		/*
		* 列表获取
		*/
		getListPage() {
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
					this.pageSize = res.data.data.pageSize;
					this.pageNo = res.data.data.pageNo;
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
	},
};
</script>