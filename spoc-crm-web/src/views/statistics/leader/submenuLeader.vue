<style lang="less">
	.submenu-leader-boss {
		padding-left: 30px;
		.staff_filter {
			font-size: 12px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin-top: 10px;
			li {
				list-style: none;
				line-height: 16px;
				&.staff_filter_Tit {
					width: 48px;
					color: #999;
					margin-right: 10px;
					text-align: right;
					height: 2em;
					line-height: 2em;
					box-sizing: border-box;
				}
				&.staff_filter_Opt {
					padding: 4px 12px;
					cursor: pointer;
					margin-right: 10px;
					&.active {
						background: #44bcb7;
						color: #fff;
					}
				}
			}
		}
			.ivu-table-wrapper {
				border: none;
				.ivu-table {
					&:before,
					&:after {
						display: none;
					}
				}
			}
		.table-title-info {
			color: #333;
			font-size: 14px;
			line-height: 32px;
			span {
				color: #44bcb7;
				font-size: 16px;
			}
		}
		.crm-echarts-container {
			position: relative;
			padding: 50px 0 20px 50px;
		}
		.crm-echarts-area {
			position: absolute;
			left: 320px;
			top: 20px;
			height: 350px;
			width: 720px;
		}
		.echarts-submenu-common {
			display: inline-block;
			width: 700px;
			height: 290px;
			float: left;
		}
		.icon-crm {
			color: #C7CED9;
			cursor: pointer;
		}
	}
	
	.bill-paging {
		text-align: center;
		margin-top: 20px;
	}
	
	.ivu-tooltip-inner {
		text-align: center !important;
		p {
			color: #f5f5f5 !important;
			font-size: 12px !important;
			line-height: 25px !important;
		}
	}
	
	.ivu-table-filter-select-item {
		text-align: center !important;
	}
</style>

<template>
	<div class="submenu-leader-boss">
			<time-optpons :tid="0" :timeList='signTime' @onDataPickStart="onDataPickStart" @onDataPickEnd="onDataPickEnd" @timeChange="timeChange" :width="70">
			</time-optpons>
		<!--<BtnAndTime title="统计时间" :btnList="tagList" @onclickChoseTags="onclickChoseTags" @getTargetDate="getTargetDate"></BtnAndTime>-->
		<div class="crm-echarts-container">
			<PandectInfoBox>
				<li>
					<p>分单总量</p>
					<p>{{allocList.allocNumm}}</p>
				</li>
				<li>
					<p>人均分单量</p>
					<p>{{allocList.perAllocNum}}</p>
				</li>
				<li>
					<p>人均分单效率
						<Tooltip placement="top" style="display: inline-block">
							<i class="iconfont icon-tishi icon-crm"></i>
							<div slot="content">
								<p>分单效率=分单总时长/分单资源量分单时长</p>
								<p>=分单时间-录入时间</p>
							</div>
						</Tooltip>
					</p>
					<p>{{allocList.perAllocRate}}分钟</p>
				</li>
			</PandectInfoBox>
			<div class="crm-echarts-area">
				<div class="echarts-submenu-common echarts-submenu-one"></div>
			</div>
		</div>
		<Input v-model="keyWord" icon="ios-search" @on-click="onclickSearchInfos" @on-enter="onclickSearchInfos" placeholder="请输入客服姓名/客户姓名" style="width: 300px;margin-bottom:10px;">
		</Input>
		<ul class="staff_filter">
			<li class="staff_filter_Tit">{{staff.tit}}</li>
			<li class="staff_filter_Opt" v-for="(item,index) in staff.options" :key="index" :class="{active:item.id==staffId}" v-if="index<staffIndex" @click="staffChange(item.id)">{{item.name}} {{item.allocNum}}</li>
			<li class="staff_filter_Opt" @click="isMore=!isMore" v-show="isMore">更多</li>
		</ul>
		<p class="table-title-info">共找到条 <span>{{count}}</span> 数据</p>
		<BtnList title="客户列表"></BtnList>
		<Table :columns="columnsTMK" :data="dataTMK" @on-sort-change="sort" class="crm-leader-table">
		</Table>
		<Page class="bill-paging" v-if="count > 10" show-sizer :total="count" :current="pageNo" :page-size="pageSize" show-total show-elevator @on-change="onclickChangePage" @on-page-size-change="onPageSizeChange">
		</Page>
	</div>
</template>

<script>
	import echarts from 'echarts';
	import timeOptpons from '../../../modules/timeOptpons';
	import BtnList from '@public/modules/btnlist';
	import PandectInfoBox from '../../../modules/pandectInfoBox';
	import { waitUntil, getTimeInterval, } from "@public/libs/util";
	import { barOption, drawCanvas, addComma, } from '../../../libs/eahcrtsModule';
	import valid, {
		errors,
		crmAllocResult,
		sys
	} from '../../../libs/request.js';
	export default {
		name: 'TMKLeader',
		mixins: [barOption, ],
		filters: {
			addComma,
		},
		data() {
			return {
				keyWord: null,
				count: 0,
				pageNo: 1,
				pageSize: 10,
				isMore: false,
				allocList: {},
				enameList: [],
				edataList: [],
				op1: {},
				op2: {},
				op3: {},
				op4: {},
				staff: {
					tit: '分单员：',
					options: [{
						label: '全部',
						id: ''
					}, ]
				},
				signTime: {
					title: '入库时间',
					list: [
						{
							label: '今天',
							value: 0
						},
						{
							label: '最近7天',
							value: -7
						},
						{
							label: '最近30天',
							value: -30
						},
					]
				},
//				tagList: [{
//						title: '今天',
//						type: 'date',
//						ms: 0,
//					},
//					{
//						title: '最近7天',
//						type: 'date',
//						ms: -6,
//					},
//					{
//						title: '最近30天',
//						type: 'date',
//						ms: -29,
//					},
//				],
				columnsTMK: [{
						title: '编号',
						align: 'center',
						key: 'cusName',
						render: (h, params) => {
							let self = this;
							return h('div', {
								style: {
									width: '100%',
									height: '35px',
									lineHeight: '35px'
								},
								on: {
									click: () => {
										self.rowClick(params.row);
									}
								}
							}, [h('a', {
								attrs: {
									href: "javascript:void(0)"
								},
							}, params.row.cusCode ? parseInt(params.row.cusCode) : '')])
						}
					},
					{
						title: '客户姓名',
						align: 'center',
						key: 'cusName',
						render: (h, params) => {
							let self = this;
							return h('div', {
								style: {
									width: '100%',
									height: '35px',
									lineHeight: '35px'
								},
								on: {
									// click: () => {
									// 	self.rowClick(params.row);
									// }
								}
							}, [h('span', {
								// attrs: {
								// 	href: "javascript:void(0)"
								// },
							}, params.row.cusName)])
						}
					},
					{
						title: '分单员',
						align: 'center',
						key: 'assigner',
					},
					{
						title: '分单时长',
						align: 'center',
						key: 'duration',
						render: (h, params) => {
							let self = this;
							return h('div', {}, params.row.duration ? params.row.duration + " 分钟" : "进行中")
						},
						sortable: 'custom'
					},
					{
						title: '分单对象',
						key: 'age',
						align: 'center',
						render: (h, params) => {
							let self = this;
							return h('div', {}, params.row.mode == 'office' ? (params.row.officeName ? params.row.officeName.split(' ')[0] : '') : params.row.sallerName)
						},
						filters: [{
								label: '销售顾问',
								value: 'headquarter'
							},
							{
								label: '分公司',
								value: 'office'
							},
						],
						filterMultiple: false,
						filterRemote(value, key) {
							this.mode = value[0];
							this.getTable();
						}
					},
					{
						title: '状态',
						key: 'statusName',
						align: 'center',
						filters: [{
								label: '未接单',
								value: 'unreceive'
							},
							{
								label: '已接单',
								value: 'receive'
							},
							{
								label: '待分配',
								value: 'unassignCompany'
							},
						],
						filterMultiple: false,
						filterRemote(value, key) {
							this.status = value[0];
							this.getTable();
						}
					},
					{
						title: '分单时间',
						key: 'createDate',
						align: 'center',
						sortable: true,
					},
					{
						title: '录入时间',
						key: 'insertDate',
						align: 'center',
						sortable: true,
					},
				],
				dataTMK: [],
				startTime: new Date().format('yyyy-MM-dd 00:00:00'),
				endTime: new Date(new Date().setDate(new Date().getDate()+1)).format('yyyy-MM-dd 00:00:00'),
				mode: '',
				status: '',
				staffId: '',
				sortType: '',
				count: 0,
			};
		},
		computed: {
			staffIndex() {
				if(this.isMore) {
					return 9;
				} else {
					return this.staff.options.length;
				}
			},
		},
		components: {
			BtnList,
			timeOptpons,
			PandectInfoBox,
		},
		created() {
			let params2 = {
				type: 'crm_alloc_result_status'
			}
			sys.dictListData(params2).then(valid.call(this)).then(res => {
				if(res.ok) {
					let arr = [];
					res.data.data.forEach((v, k) => {
						arr.push({
							label: v.label,
							value: v.value
						})
					})
					this.columnsTMK[5].filters = arr;
				}
			}).catch(errors.call(this));
			this.getList();
			this.getData();
			this.getTable();
		},
		mounted() {},
		methods: {
			getTable() {
				let params = {
					nameOrNo: this.keyWord,
					startAllocTime: new Date(this.startTime).format('yyyy-MM-dd hh:mm:ss'),
					endAllocTime: new Date(this.endTime).format('yyyy-MM-dd hh:mm:ss'),
					mode: this.mode,
					status: this.status,
					createById: this.staffId,
					orderBy: this.sortType,
					pageSize: this.pageSize,
					pageNo: this.pageNo,
				}
				// if(this.afterTime || this.beforeTime) {
				// 	params.startInsertTime = this.beforeTime?this.beforeTime+' 00:00:00':'';
				// 	params.endInsertTime = this.afterTime?this.afterTime+' 24:00:00':'';
				// } else if(this.afterTime1 || this.beforeTime1) {
				// 	params.startInsertTime = this.beforeTime1?this.beforeTime1+' 00:00:00':'';
				// 	params.endInsertTime = this.afterTime1?this.afterTime1+' 24:00:00':'';
				// } else {

				// }
				crmAllocResult.listPage(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.pageNo = res.data.data.pageNo;
						this.count = res.data.data.count;
						this.dataTMK = res.data.data.list;
					}
				}).catch(errors.call(this));
			},
			getList() {
				let params = {
					startAllocTime: new Date(this.startTime).format('yyyy-MM-dd hh:mm:ss'),
					endAllocTime: new Date(this.endTime).format('yyyy-MM-dd hh:mm:ss')
				}
				crmAllocResult.statisticsAlloc(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.allocList = res.data.data;
					}
				}).catch(errors.call(this));
			},
			getData() {
				let params = {
					startAllocTime: new Date(this.startTime).format('yyyy-MM-dd hh:mm:ss'),
					endAllocTime: new Date(this.endTime).format('yyyy-MM-dd hh:mm:ss'),
				}
				crmAllocResult.statisticsFdList(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						let list = res.data.data;
						this.enameList = list.map(item => item.name);
						this.edataList = list.map(item => item.perAllocRate);
						let arr = res.data.data;
						arr.unshift({
							name: '不限',
							allocNum:'',
							id: ''
						});
						this.staff.options = arr;
						this.setOp1('23%');
					}
				}).catch(errors.call(this));
			},
			/*
			 * define canvas options
			 */
			setOp1() {
				this.op1 = barOption;
				this.op1.color = ['#3AA0FF', ],
					this.op1.title.text = '分单员分单效率排名';
				this.op1.title.subtext = '';
				this.op1.series[0].name = '分单有效率';
				this.op1.series[0].barWidth = 15;
				this.op1.yAxis.axisLine.lineStyle.color = 'transparent';
				this.op1.xAxis.axisLine.lineStyle.color = '#e5e5e5';
				this.op1.yAxis.data = this.enameList;
				this.op1.series[0].data = this.edataList;
				console.log(this.edataList)
				this.drawCanvas('.echarts-submenu-one', this.op1);
			},
			/*
			 * 日期选择 
			 */
			onDataPickStart(start, end) {
				this.startTime = start;
				this.endTime = end;
				// this.beforeTime1 = start;
				// this.afterTime1 = end;
				this.pageNo = 1;
				this.getList();
				this.getData();
				this.getTable();
			},
			onDataPickEnd(start, end) {
				this.startTime = start;
				this.endTime = end;
				// this.beforeTime1 = start;
				// this.afterTime1 = end;
				this.pageNo = 1;
				this.getList();
				this.getData();
				this.getTable();
			},
			timeChange(start, end) {
				if(!start) end = ''
				if(start == end && start) {
					end = new Date(new Date().setDate(new Date(start).getDate() + 1)).format('yyyy-MM-dd hh:mm:ss')
				}
				this.startTime = start;
				this.endTime = end;
				this.getList();
				this.getData();
				this.getTable();
			},
//			onclickChoseTags(type, ms) {
//				const data = getTimeInterval(type, ms);
//				this.startTime = data.startTime;
//				this.endTime = data.endTime;
//				this.getList();
//				this.getData();
//				this.getTable();
//			},
//			getTargetDate(d1, d2) {
//				this.startTime = d1;
//				this.endTime = d2;
//				this.getList();
//				this.getData();
//				this.getTable();
//			},
			/*
			 * keyword search
			 */
			onclickSearchInfos(val) {
				this.$nextTick(() => {
					this.getTable();
				})
			},
			drawCanvas(el, options) {
				let myCharts = echarts.init(this.$el.querySelector(el));
				myCharts.setOption(options);
			},
			/*
			 * Table
			 */
			onclickFilterChange(val) {
				console.log(val.key, val._filterChecked[0]);
			},
			sort(data) {
				if(data.order == 'normal') {
					this.sortType = '';
				} else {
					this.sortType = data.key + ' ' + data.order;
				}
				this.pageNo = 1;
				this.getTable();
			},
			/*
			 * 分页
			 */
			onclickChangePage(index) {
				this.pageNo = index;
				this.getTable();
			},
			onPageSizeChange(val) {
				this.pageSize = val;
				this.getTable();
			},
			staffChange(val) {
				this.staffId = val;
				this.pageNo = 1;
				this.getTable();
			},
		},
	};
</script>