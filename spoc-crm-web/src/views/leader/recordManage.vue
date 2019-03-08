<style lang="less">
	.record-manage-boss {
		border-top: solid 1px #e0e0e0;
		.render-caozuo {
			color: #44bcb7;
			cursor: pointer,
		}
		.bill-paging {
			text-align: center;
			margin-top: 20px;
		}
		.record-manage-progress{
			.ivu-progress-text {
				color: #333;
			}
			text-overflow: clip;
			.ivu-progress-bg {
				border-radius: 0;
				background-color: #44bcb7;
			}
			.ivu-progress-inner {
				background-color: #e5e5e5;
				border-radius: 0;
			}
			.ivu-progress-outer {
				padding-right: 80px;
			}
			.ivu-progress-text {
				margin-left: -18px;
			}
		}
	}
	.record-table {
		.ivu-table th {
			background: #fff;
		}
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
</style>

<template>
	<div class="record-manage-boss">
		<Input
			size="large"
			icon="ios-search"
			v-model="searchKeyword"
			placeholder="请输入销售顾问姓名"
			@on-enter="onclickSearchInfo"
			@on-click="onclickSearchInfo"
			style="margin: 10px 0 20px 0; width:400px;">
		</Input>
		<CaseBar
			title="分公司"
			typeKind="controlled"
			:tagList="branchList"
			:num="officeIndex"
			@addAcitveCon="addAcitveCon"
			style="margin-bottom: 15px;"
		></CaseBar>
		<div style="line-height: 32px; font-size: 14px; color: #333; ">共找到 <span style="color: #44bcb7; font-size: 16px; font-weight: bold;">{{pageTotal}}</span>  条数据</div>
		<Btnlist title="录音列表"></Btnlist>
		<Table
			:loading="loading"
			class="record-table"
			:columns="columnsRecord" 
			:data="dataRecord"
			@on-sort-change="onSortChange"
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
			ref="refLog"
			title="异常日志"
			:columnsException="columnsException"
			:dataException="dataException"
		></ModalLog>
	</div>
</template>

<script>
import Btnlist from '@public/modules/btnlist';
import CaseBar from '../../modules/caseBar';
import ModalLog from '../../modules/modalLog';
import valid, { errors, sys, common, recordManage, } from '../../libs/request';
export default {
	name: 'RecordManage',
	components: {
		Btnlist,
		CaseBar,
		ModalLog,
	},
	data() {
		return {
			loading: true,
			recordStatus: null, // 录音状态
			uploadProgress: null, // 上传状态
			orderByType: null, // 排序字段
			orderByStatus: null, // 排序方式
			searchKeyword: null, // 搜索关键字
			officeIndex: 0,
			branchList: [],
			companyId: null,
			columnsRecord: [
				{
					title: '销售顾问',
					key: 'salerName',
					align: 'center',
				},
				{
					title: '分公司',
					key: 'officeName',
					align: 'center',
					render: (h, params) => {
						const tempInfo = params.row.officeName ? params.row.officeName.split(' ')[0] : '';
						return h('span', tempInfo);
					},
				},
				{
					title: '录音状态',
					key: 'status',
					align: 'center',
					filters: [
						{
							label: '开启',
							value: '1',
						},
						{
							label: '关闭',
							value: '0',
						}
					],
					filterMultiple: false,
					filterMethod (value, row) {
						return true;
					},
					render: (h, params) => {
						const _this = this;
						let SwitchResult = params.row.status === '1' ? '开启' : '关闭';
						const renderArr = [
							// h('i-switch', {
							// 	props: {
							// 		value: params.row.status,
							// 		trueValue: '1',
							// 		falseValue: '0',
							// 	},
							// 	on: {
							// 		'on-change': (val) => {
							// 			params.row.status = val;
							// 			_this.setSaveRecordTrace({
							// 				salerId: params.row.salerId,
							// 				status: val,
							// 			});
							// 		},
							// 	},
							// },),
							h('span', {
								style: {
									marginLeft: '5px',
								},
							}, SwitchResult),
						];
						return h('div', {
							style: {},
						}, renderArr);
						},
				},
				{
					title: '录音次数',
					key: 'recordCount',
					align: 'center',
					sortable: true,
				},
				// {
				// 	title: '录音上传进度',
				// 	key: 'uploadProgress',
				// 	align: 'center',
				// 	width: 200,
				// 	filterMultiple: false,
				// 	filters: [
				// 		{
				// 			label: '未完成',
				// 			value: '0'
				// 		},
				// 		{
				// 			label: '已完成',
				// 			value: '1'
				// 		},
				// 	],
				// 	filterMethod (value, row) {
				// 		return true;
				// 	},
				// 	render: (h, params) => {
				// 		const percent = params.row.recordCount == 0 ? 0 : ((params.row.uploadCount / params.row.recordCount) * 100);
				// 		return h('Progress', {
				// 			props: {
				// 				percent: percent,
				// 			},
				// 			class: {
				// 				'record-manage-progress': true,
				// 			},
				// 			style: {
				// 				borderRadius: '0',
				// 			},
				// 		}, `${params.row.uploadCount}/${params.row.recordCount}`);
				// 	},
				// },
				{
					title: '操作',
					key: 'caozuo',
					align: 'center',
					width: 200,
					render: (h, params) => {
						const _this = this;
						const renderArr = [
							h('span', {
								class: {
									'render-caozuo': true,
								},
								on: {
									click() {
										_this.$router.push({
											name: 'crm.recordDetail',
											query: {
												id: params.row.salerId,
											},
										});
									},
								},
							}, '录音详情'),
							h('span', {
								class: {
									'render-caozuo': true,
								},
								on: {
									click() {
										_this.$refs.refLog.checkException();
										_this.getListTraceLogData({
											salerId: params.row.salerId,
										});
									},
								},
							}, '异常日志'),
						];
						return h('div', {
							style: {
								display: 'flex',
								justifyContent: 'space-around',
								padding: '0 13%',
							},
						}, renderArr);
					},
				},
			],
			dataRecord: [],
			pageTotal: null,
			pageNo: 1,
			pageSize: 10,
			columnsException: [
				{
					title: '序号',
					key: 'index',
					align: 'center',
				},
				{
					title: '操作人',
					key: 'salerName',
					align: 'center',
				},
				{
					title: '操作',
					key: 'content',
					align: 'center',
				},
				{
					title: '时间',
					key: 'endTime',
					align: 'center',
				},
			],
			dataException: [],
		};
	},
	created() {
		this.getOfficeList();
		this.getRecordList();
	},
	methods: {
		onclickSearchInfo() {
			this.getRecordList();
		},
		/*
		* 分公司的选择
		*/
		addAcitveCon(val) {
			this.officeIndex = val.index;
			this.companyId = val.id;
			this.getRecordList();
		},
		/*
		* 分公司列表获取
		*/
		getOfficeList() {
			sys.controlledList().then(valid.call(this)).then(res => {
				if (res.ok) {
					const tempData = {};
					this.branchList = res.data.data;
					this.branchList.forEach((item, index) => {
						if (item.companyName === '北京') {
							tempData.companyName = item.companyName;
							tempData.id = item.id;
							// this.companyId = this.branchList[0].id;
							this.branchList.splice(index, 1);
						}
					});
					if(JSON.stringify(tempData) != '{}'){ //不为空对象才插入
						this.branchList.unshift(tempData);
					}
					this.branchList.unshift({
						companyName: '全部',
						id: null,
					});
				}
			}).catch(errors.call(this));
		},
		/*
		* Table 操作
		*/
		onSortChange(val) {
			this.orderByType = val.key;
			this.orderByStatus = val.order;
			this.getRecordList();
		},
		onFilterChange(val) {
			switch (val.key) {
				case 'uploadProgress': this.uploadProgress = val._filterChecked[0]; break;
				case 'status': this.recordStatus = val._filterChecked[0]; break;
			}
			this.getRecordList();
		},
		/*
		* Modal
		*/
		cancelException() {
			this.$refs.refLog.cancelException();
			setTimeout(() => {
				this.dataException = [];
			}, 100)
		},
		/*
		* 分页
		*/
		onclickChangePage(index) {
			this.pageNo = index;
			this.getRecordList();
		},
		onPageSizeChange(val) {
			this.pageSize = val;
			this.getRecordList();
		},
		/*
		* 列表获取
		*/
		getRecordList() {
			const data = {
				name: this.searchKeyword,
				officeId: this.companyId,
				status: this.recordStatus,
				uploadProgress: this.uploadProgress,
				orderByType: this.orderByType,
				orderByStatus: this.orderByStatus,
				pageNo: this.pageNo,
				pageSize: this.pageSize,
			};
			recordManage.listManagePage(data).then(valid.call(this)).then(res => {
				if (res) {
					const rdata = res.data.data;
					this.dataRecord = rdata.list;
					this.pageNo = rdata.pageNo;
					this.pageTotal = rdata.count;
					this.pageSize = rdata.pageSize;
					this.loading = false
				}
			}).catch(errors.call(this));
		},
		/*
		* 异常日志
		*/
		getListTraceLogData(data) {
			recordManage.listTraceLogData(data).then(valid.call(this)).then(res => {
				if (res) {
					this.dataException = res.data.data;
					this.dataException.forEach((item, index) => {
						item.index = index + 1;
					})
				}
			}).catch(errors.call(this));
		},
		/*
		* 录音状态设置
		*/
		setSaveRecordTrace(data) {
			recordManage.saveRecordTrace(data).then(valid.call(this)).then(res => {
				if (res) {
					this.$Message.info('录音状态设置成功');
				}
			}).catch(errors.call(this));
		},
	},
};
</script>