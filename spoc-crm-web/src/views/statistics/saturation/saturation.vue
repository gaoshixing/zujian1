<style lang="less">
	.public-container {
		border-top: 1px solid #e0e0e0;
		margin-bottom: 88px;
		.ivu-table th {
			background: #fff;
		}
		.filter {
			margin-bottom: 4px;
			.titleBar {
				span {
					margin: 4px;
					&:first-child {
						float: left;
						text-align: right !important;
						width: 80px !important;
						margin: 0;
						line-height: 30px;
					}
				}
			}
		}
		.search-data {
			position: relative;
			padding-left: 95px;
			zoom: 1;
			width: 860px;
			&:after,
			&::before {
				content: '';
				display: table;
				clear: both;
				visibility: hidden;
				font-size: 0;
				height: 0;
			}
			.title {
				width: 80px;
				position: absolute;
				left: 0;
				top: 0;
				line-height: 30px;
				color: #b8b8b8;
				text-align: right;
			}
			li,
			.more {
				float: left;
				padding: 5px 12px;
				cursor: pointer;
				margin: 3px;
				line-height: 1;
				&.active {
					background: #44bcb6;
					color: #fff;
				}
			}
		}
		.case-manage-timePicker {
			float: left;
			.case-manage-line-div {
				display: inline-block;
				width: 10px;
				height: 2px;
				background-color: #44bcb7
			}
		}
		.ivu-date-picker.error {
			.ivu-input {
				border-color: #f00;
			}
		}
		.count {
			position: relative;
			top: 6px;
			font-size: 14px;
			color: #222;
			span {
				font-size: 18px;
				color: #44bcb7;
			}
		}
		.btn-lists-div {
			@h: 40px;
			@radius: 1px;
			position: relative;
			height: @h;
			line-height: @h;
			padding-left: 21px;
			margin-top: 22px;
			border: 1px solid #e0e0e0;
			border-radius: @radius;
			font-size: 14px;
			color: #666;
			background: #fafafa;
			&:before {
				@border-width: -1px;
				content: "";
				position: absolute;
				left: @border-width;
				top: @border-width;
				bottom: @border-width;
				width: 5px;
				border-top-left-radius: @radius;
				border-bottom-left-radius: @radius;
				background: #44bcb7;
			}
		}
		.btn-lists {
			float: right;
			.ivu-btn {
				float: left;
				padding-top: 3px;
				padding-bottom: 3px;
				margin-right: 19px;
				margin-top: 4px;
				font-size: 14px;
			}
		}
		.page-box {
			margin-top: 20px;
			text-align: center;
			margin-bottom: 140px;
		}
	}
</style>

<template>
	<div class="public-container">
		<BtnAndTime style="margin-bottom: 10px;" types="month" title="统计时间" :btnList="datalistss" @onclickChoseTags="onclickChoseTags" @getTargetDate="getTargetDate">
		</BtnAndTime>

		<call-charts :endDate="endTime" :startDate="startTime" @on-click="echartClick"></call-charts>
		<!-- <Table :columns="columns1" :data="data1" @on-row-click="onRowClick" @on-sort-change="sortChange" @on-filter-change="filterChange"></Table> -->
		<LargeTable types="sale" :tagShow="false" :pId="pid" :total='count' :showTags=false :loading="loading" fixedHeader="saleName" :checkBoxList="largeTable.checkBoxList" :tableColumnsChecked="largeTable.tableChecked" :table2ColumnList="largeTable.tableColumnList" :tableData2="largeTable.tableData" @onSortChange="onSortChange" @onFilterChange="onFilterChange" @getchangedCheckedItem="getchangedCheckedItem" @onclickSearchInfos="onclickSearchInfos" @onclickToChoseTags="onclickToChoseTags"></LargeTable>
		<div class="page-box" v-if="count > 10">
			<Page show-total show-elevator show-sizer :total="count" v-if="count > 10" :current="pageNo" :page-size="pageSize" @on-page-size-change="pageSizeChange" @on-change="onPageChange"></Page>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex';
	import CaseBarFilter from '@public/modules/caseBarFilter';
	import callCharts from './saturationCharts';
	import BtnAndTime from '../../../modules/btnAndTime';
	import LargeTable from '../../../modules/largeTable';
	import { waitUntil, getTimeInterval, } from '@public/libs/util';
	import valid, {
		errors,
		common,
		sys,
		crmCustomerPub,
		crmStatistics,
	} from "../../../libs/request";
	import Sales from '../../../schema/sales';

	export default {
		props: {
			pid: {
				type: String,
				required: true,
			},
		},
		data() {
			return {
				officeId: '',
				officeList: [],
				showModal: false,
				loading: false,
				tags: [],
				count: 0,
				pageNo: 1,
				pageCount: 0,
				pageSize: 10,
				dataChecked: '',
				startTime: new Date().format('yyyy-MM'),
				endTime: new Date().format('yyyy-MM'),
				datalistss: [{
						title: '当前月',
						type: 'month',
						ms: -1,
					},
					{
						title: '最近3个月',
						type: 'month',
						ms: -3,
					},
					{
						title: '最近6个月',
						type: 'month',
						ms: -6,
					},
					{
						title: '今年',
						type: 'year',
						ms: 0,
					},
				],
				endDataError: false,
				hisOfficeId: '', //历史跟进人
				source: '', //来源
				sort: 0, //排序
				orderType: '', //排序
				now: '', //今日
				largeTable: {
					tableData: [],
					checkBoxList: [],
					tableChecked: [],
					tableColumnList: Sales.salesForm,
				},
			};
		},
		computed: {
			...mapGetters('crm', ['isBranchOfficeLeader', 'isSalerLeader', ]),
		},
		components: {
			CaseBarFilter,
			callCharts,
			LargeTable,
			BtnAndTime,
		},
		created() {
			sys.controlledList().then(valid.call(this)).then(res => {
				if(res.ok) {
					let tempArr = res.data.data.map(item => ({
						label: item.companyName,
						value: item.id
					}));
					this.officeList = tempArr;
				}
			}).catch(errors.call(this));
			this.getShowTitle();
		},
		mounted() {
			new Sales(this);
			this.updateLoadingStatus({
				isLoading: true
			});
			this.getNow()
			/*
			 * 权限控制 分总 销总 无法查看分公司的数据
			 */
			waitUntil(() => {
				return !!(this.isBranchOfficeLeader || this.isSalerLeader);
			}, () => {
				if(this.isBranchOfficeLeader || this.isSalerLeader) {
					_this.$delete(this.largeTable.tableColumnList, 'office');
				}
			});
		},
		methods: {
			...mapMutations(['updateLoadingStatus']),
			/*
			 * 日期选择 
			 */
			onclickChoseTags(type, ms) {
				const data = getTimeInterval(type, ms, true);
				this.startTime = type === 'month' ? data.startTime + '-01 00:00:00' : data.startTime + '-01-01 00:00:00';
				this.endTime = type === 'month' ? data.endTime + '-01 00:00:00' : data.endTime + '-01-01 00:00:00';
				this.getLargeTableData();
			},
			getTargetDate(d1, d2) {
				this.startTime = new Date(d1).format('yyyy-MM') + '-01 00:00:00';
				this.endTime = new Date(d2).format('yyyy-MM') + '-01 00:00:00';
				this.getLargeTableData();
			},
			getNow() {
				common.newDate({}).then(valid.call(this))
					.then(res => {
						if(res.ok) {
							const rdata = new Date(res.data.data.date.substring(0, 19)).format('yyyy-MM') + '-01 00:00:00';
							this.startTime = rdata;
							this.endTime = new Date(new Date(rdata).setMonth(new Date(rdata).getMonth() + 1)).format('yyyy-MM') + '-01 00:00:00';
							this.getLargeTableData();
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},
			onPageChange(page) {
				this.pageNo = page
				this.getLargeTableData();
			},
			pageSizeChange(size) {
				this.pageSize = size
				this.getLargeTableData();
			},
			/*
			 * largeTable
			 * 获取列表
			 * 更新列表
			 */
			getShowTitle() {
				crmStatistics.listShowTileBySale({
					type: 1,
				}).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.largeTable.tableChecked = res.data.data;
						this.largeTable.checkBoxList = res.data.data;
					}
				}).then(errors.call(this));
			},
			saveListShowTitle(data) {
				const datas = Object.assign(data, {
					type: 1,
				});
				crmStatistics.updateShowTileBySale(datas).then(valid.call(this)).then(res => {
					if(res.ok) {
						console.log('save___成功', res.data);
					}
				}).catch(errors.call(this));
			},
			getLargeTableData() {
				this.loading = true;
				this.updateLoadingStatus({
					isLoading: true
				});
				const data = {
					period: 'month',
					name: this.name,
					tags: this.tags,
					startTime: new Date(this.startTime).format('yyyy-MM-dd'),
					endTime: new Date(this.endTime).format('yyyy-MM-dd'),
					officeId: this.officeId,
					orderType: this.orderType,
					sort: this.sort,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					srcType: "1",
				};
				crmStatistics.saleInfo(data).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.loading = false;
						const rdata = res.data.data;
						this.pageCount = rdata.pageCount;
						this.pageNo = rdata.pageNo;
						this.pageSize = rdata.pageSize;
						this.largeTable.tableData = rdata.list;

						crmStatistics.getTotalAllocOrders(data).then(valid.call(this)).then(res1 => {
							if(res.ok) {
								this.count = res1.data.data;
							}
						}).catch(errors.call(this)).finally(() => {
							this.updateLoadingStatus({
								isLoading: false
							});
							this.loading = false;
						});
					}
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
					this.loading = false;
				});
			},
			onclickSearchInfos(val) {
				this.name = val;
				this.getLargeTableData();
			},
			onclickToChoseTags(val) {
				this.tags = val;
				this.getLargeTableData();
			},
			onSortChange(val1, val2) {
				switch(val2) {
					case 'asc':
						this.sort = '0';
						break;
					case 'desc':
						this.sort = '1';
						break;
					case 'normal':
						this.sort = null;
						break;
				};
				this.orderType = val2 === 'normal' ? null : Sales.getOrderByType(val1);
				this.getLargeTableData();
			},
			onFilterChange(val1, val2) {
				this.officeId = val2;
				this.getLargeTableData();
			},
			getchangedCheckedItem(val) {
				this.saveListShowTitle(val);
			},
			echartClick(ind, month, opt) {
				this.officeList.forEach((v, k) => {
					if(v.label.search(month) != -1) {
						this.officeId = v.value;
						this.getLargeTableData();
					}
				});
			}
		}
	}
</script>