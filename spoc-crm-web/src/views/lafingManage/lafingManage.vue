<style lang="less">
	.lafingManage {
		border-top: 1px #e0e0e0 solid;
		.ivu-table th {
			background: #fff;
		}
		.lafingManage_time {
			margin-top: 8px;
		}
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
					width: 70px;
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
		.table_box {
			padding: 10px 0px 20px;
			.strip-tit {
				font-size: 14px;
				span {
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
			margin-top: 20px;
		}
	}
</style>

<template>
	<div class="lafingManage">
		<v-select style="width: 396px;margin: 15px 0;" placeholder="请输入客户姓名/编号/手机号/微信号" icon="search" v-model="search" k='cnname' :datafunc="searchDropList" @on-enter="textChange" @on-click="textChange" @selected="textChange">
		</v-select>
		<case-bar-filter :from="2" menuId="801" modelName="客户管理" title="标签：" :width="70" :mgt="7" @tagListChange="tagListChange" align="right" class="caseBar" tit-color="#999">
		</case-bar-filter>
		<div class="lafingManage_time">
			<!--<v-search-options :label-width="80" byKey="label" :searchTitle="signTime.searchName" :data="signTime.list" @on-select-item="timeCharge" labelWidth="80" valign="center">
				<DatePicker type="date" placeholder="分单开始时间" style="width: 200px" @on-change="onDataPickStart" v-model="beforeTime1"></DatePicker>
				<span style="background-color: rgb(54, 162, 158); display: inline-block; width: 12px; height: 2px;margin: 0 12px;"></span>
				<DatePicker type="date" placeholder="分单结束时间" style="width: 200px" @on-change="onDataPickEnd" v-model="afterTime1"></DatePicker>
			</v-search-options>-->

			<time-optpons ref="timeTem" :timeList='signTime' @onDataPickStart="onDataPickStart" @onDataPickEnd="onDataPickEnd" @timeChange="timeChange" :width="70">
			</time-optpons>
		</div>
		<div class="lafingManage_time">
			<time-optpons ref="timeTemFD" :timeList="timeListObj" @onDataPickStart="onDataPickStartFD" @onDataPickEnd="onDataPickEndFD" @timeChange="timeChangeFD" :width="70">
			</time-optpons>
		</div>
		<ul class="staff_filter" v-if="userInfo.roleMap[801]!='910'&&userInfo.roleMap[801]!='907'&&userInfo.roleMap[801]!='909'">
			<li class="staff_filter_Tit">{{staff.tit}}</li>
			<li class="staff_filter_Opt" v-for="(item,index) in staff.options" :key="index" :class="{active:item.id==staffId}" v-if="index<staffIndex" @click="staffChange(item.id)">{{item.name}}</li>
			<li class="staff_filter_Opt" @click="isMore=!isMore" v-show="isMore">更多</li>
		</ul>
		<div class="table_box">
			<p class="strip-tit">共找到 <span>{{count}}</span> 条资源</p>
			<btn-list title="客户列表" :btnList="btninfo"></btn-list>
			<Table :loading="loading" :columns="columns" v-if="isLeader" :data="data" @on-sort-change="sort" @on-selection-change="tableSelect"></Table>
			<Table :loading="loading" :columns="columns1" v-else :data="data" @on-sort-change="sort" @on-selection-change="tableSelect"></Table>
		</div>
		<div class="page-box" v-if="count>10">
			<div style="margin: auto;display: inline-block;">
				<Page :total="count" :page-size="10" :current="pageNo" show-total :show-sizer="count>10" show-elevator @on-change="pageChange" @on-page-size-change="sizeChange"></Page>
			</div>
		</div>
	</div>
</template>

<script>
	import vSelect from '@public/modules/vSelect';
	import caseBarFilter from "@public/modules/caseBarFilter.vue";
	import vSearchOptions from "@public/modules/vSearchOptions";
	import BtnList from '@public/modules/btnlist';
	import timeOptpons from "../../modules/timeOptpons.vue";
	import { mapState, mapGetters } from 'vuex';
	import valid, {
		errors,
		sys,
		common,
		crmAllocResult,
		crmCustomer
	} from "../../libs/request.js";
	export default {
		data() {
			return {
				loading: true,
				timeListObj: {
					title: '分单时间',
					list: [{
							label: '不限',
							value: ''
						},
						{
							label: '今天',
							value: 0
						},
						{
							label: '昨天',
							value: -1
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
				count: 20,
				pageSize: 10,
				pageNo: 1,
				beforeTimeFD: '',
				afterTimeFD: '',
				search: '',
				tags: [],
				staffId: '',
				btninfo: [],
				isMore: false,
				pageNo: 1,
				pageSize: 10,
				signTime: {
					title: '录入时间',
					list: [{
							label: '不限',
							value: ''
						},
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
				staff: {
					tit: '分单员：',
					options: [{
						label: '全部',
						id: ''
					}, ]
				},
				beforeTime: '',
				afterTime: '',
				beforeTime1: '',
				afterTime1: '',
				columns: [{
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
						align: 'center',
						render: (h, params) => {
							let self = this;
							return h('div', {}, params.row.mode == 'office' ? (params.row.officeName ? params.row.officeName.split(' ')[0] : '') : params.row.sallerName)
						},
						filters: [{
								label: '集团分单',
								value: 'headquarter'
							},
							{
								label: '分公司分单',
								value: 'office'
							}
						],
						filterMultiple: false,
						filterRemote(value, key) {
							this.mode = value[0];
							this.getList();
						}
					},
					// {
					// 	title: '阶段',
					// 	align: 'center',
					// 	key: 'saleStatusName',
					// 	filters: [],
					// 	filterMultiple: false,
					// 	filterRemote(value, key) {
					// 		this.saleStatus = value[0];
					// 		this.getList();
					// 	}
					// },
					{
						title: '状态',
						align: 'center',
						key: 'statusName',
						filters: [{
								label: '分公司未分配',
								value: 'unassignCompany'
							},
							{
								label: '未接单',
								value: 'unreceive'
							},
							{
								label: '已接单',
								value: 'receive'
							}
						],
						filterMultiple: false,
						filterRemote(value, key) {
							this.status = value[0];
							this.getList();
						}
					},
					{
						title: '录入时间',
						align: 'center',
						key: 'insertDate',
						sortable: 'custom'
					},
					{
						title: '参与流转',
						align: 'center',
						key: 'createDate',
						render: (h, params) => {
							let self = this;
							return h('div', {}, params.row.ifFall == '1' ? '流转' : params.row.ifFall == '0' ? '不流转' : '')
						},
					}, {
						title: '分单时间',
						align: 'center',
						key: 'createDate',
						sortable: 'custom'
					},
					{
						title: '操作',
						key: 'handle',
						align: 'center',
						render: (h, params) => {
							let self = this;
							if(params.row.statusName != '已签约') {
								return h('div', {
									style: {
										width: "90px",
										margin: "0 auto",
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-around'
									}
								}, [
									h("a", {
										style: {
											fontSize: '12px',
											display: params.row.status != 'receive' ? '' : 'none',
										},
										attrs: {
											href: "javascript:void(0)"
										},
										on: {
											click: () => {
												this.$router.push({
													name: "crm.entry",
													query: {
														cusid: params.row.cusId
													}
												});
											}
										}
									}, '编辑'),
									h("a", {
										style: {
											fontSize: '12px',
											display: params.row.status != 'receive' ? '' : 'none',
										},
										attrs: {
											href: "javascript:void(0)"
										},
										on: {
											click: (event) => {
												self.withdraw(params.row.cusId);
												event.stopPropagation();
											}
										}
									}, '撤回'),
									h("a", {
										style: {
											color: params.row.isHot != 1 ? '#ff0000 !important' : '#999 !important',
											fontSize: '12px',
											display: params.row.status != 'unassignCompany' ? '' : 'none'
										},
										attrs: {
											href: "javascript:void(0)"
										},
										on: {
											click: (event) => {
												self.updataHot(params.row.cusId);
												event.stopPropagation();
											}
										}
									}, '加急'),
								])
							}
						}
					}
				],
				columns1: [{
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
					},
					{
						title: '来源',
						align: 'center',
						key: 'sourceTypeName',
						filters: [{
								label: '集团分单',
								value: 'headquarter'
							},
							{
								label: '市场导入',
								value: 'import'
							}
						],
						filterMultiple: false,
						filterRemote(value, key) {
							this.mode = value[0];
							this.getList();
						}
					},
					{
						title: '分单员/市场人员',
						align: 'center',
						key: 'assigner',
						sortable: 'custom'
					},
					{
						title: '分单对象',
						align: 'center',
						key: 'sallerName'
					},
					// {
					// 	title: '阶段',
					// 	align: 'center',
					// 	key: 'saleStatusName',
					// 	filters: [],
					// 	filterMultiple: false,
					// 	filterRemote(value, key) {
					// 		this.saleStatus = value[0];
					// 		this.getList();
					// 	}
					// },
					{
						title: '状态',
						align: 'center',
						key: 'statusName',
						filters: [{
								label: '未接单',
								value: 'unreceive'
							},
							{
								label: '已接单',
								value: 'receive'
							}
						],
						filterMultiple: false,
						filterRemote(value, key) {
							this.status = value[0];
							this.getList();
						}
					},
					{
						title: '录入时间',
						align: 'center',
						key: 'insertDate',
						sortable: 'custom'
					}, {
						title: '参与流转',
						align: 'center',
						key: 'createDate',
						render: (h, params) => {
							let self = this;
							return h('div', {}, params.row.ifFall == '1' ? '流转' : params.row.ifFall == '0' ? '不流转' : '')
						},
					}, {
						title: '分单时间',
						align: 'center',
						key: 'createDate',
						sortable: 'custom'
					},
					{
						title: '操作',
						key: 'handle',
						align: 'center',
						render: (h, params) => {
							let self = this;
							if(params.row.statusName != '已签约') {
								return h('div', {
									style: {
										width: "90px",
										margin: "0 auto",
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-around'
									}
								}, [
									h("a", {
										style: {
											fontSize: '12px',
											display: params.row.status != 'receive' ? '' : 'none',
										},
										attrs: {
											href: "javascript:void(0)"
										},
										on: {
											click: () => {
												this.$router.push({
													name: "crm.entry",
													query: {
														cusid: params.row.cusId
													}
												});
											}
										}
									}, '编辑'),
									h("a", {
										style: {
											fontSize: '12px',
											display: params.row.status != 'receive' ? '' : 'none',
										},
										attrs: {
											href: "javascript:void(0)"
										},
										on: {
											click: (event) => {
												self.withdraw(params.row.cusId);
												event.stopPropagation();
											}
										}
									}, '撤回'),
									h("a", {
										style: {
											color: params.row.isHot != 1 ? '#ff0000 !important' : '#999 !important',
											fontSize: '12px',
											display: params.row.status != 'unassignCompany' ? '' : 'none'
										},
										attrs: {
											href: "javascript:void(0)"
										},
										on: {
											click: (event) => {
												self.updataHot(params.row.cusId);
												event.stopPropagation();
											}
										}
									}, '加急'),
								])
							}
						}
					}
				],
				data: [],
				isLoading:false,
				saleStatus: '',
				pageNo: 1,
				pageSize: 10,
				mode: '',
				status: '',
				tableOptionsLength: 0
			}
		},
		computed: {
			...mapState(['userInfo']),
			staffIndex() {
				if(this.isMore) {
					return 9;
				} else {
					return this.staff.options.length;
				}
			},
			...mapGetters('crm', ['isAdmin', 'isCeo', 'isBranchOfficeLeader', 'isHeaderOfficeLeader', 'isSalerLeader','isMarketLeader']),
			isLeader() {
				if(this.isSalerLeader || this.isBranchOfficeLeader||this.isMarketLeader) {
					return false
				}
				return true
			}
		},
		components: {
			vSelect,
			caseBarFilter,
			vSearchOptions,
			timeOptpons,
			BtnList
		},
		created() {
			let params = {
				roleId: "902,913"
			}
			sys.roleMember(params).then(valid.call(this)).then(res => {
				if(res.ok) {
					let arr = res.data.data;
					arr.unshift({
						name: '不限',
						id: ''
					});
					this.staff.options = arr;
				}
			}).catch(errors.call(this));
			//			let params1 = {
			//				type: 'crm_customer_sale_status'
			//			}
			//			sys.dictListData(params1).then(valid.call(this)).then(res => {
			//				if(res.ok) {
			//					let arr = [];
			//					res.data.data.forEach((v, k) => {
			//						arr.push({
			//							label: v.label,
			//							value: v.value
			//						})
			//					})
			//					this.columns[5].filters = arr;
			//				}
			//			}).catch(errors.call(this));
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
					this.columns[5].filters = arr;
					this.columns1[5].filters = arr;
				}
			}).catch(errors.call(this));
		},
		mounted(){
			this.setTimes();
			this.setFDTimes();
			this.getList();
		},
		methods: {
	    	setTimes(){
	    		let obj=this.$refs.timeTem.setTime(0);
	            if(!obj.beforeTime) obj.afterTime = ''
	            if(obj.beforeTime == obj.afterTime && obj.beforeTime) {
	                let time = new Date(new Date().setDate(new Date(obj.beforeTime).getDate() + 1));
					time.setHours(0);
					time.setMinutes(0);
					time.setSeconds(0);
					obj.afterTime = time.format('yyyy-MM-dd hh:mm:ss')
	            }
	            this.beforeTime = obj.beforeTime ? `${obj.beforeTime}` : '';
	            this.afterTime = obj.afterTime ? `${obj.afterTime}` : '';
	    	},
	    	setFDTimes(){
	    		let obj=this.$refs.timeTemFD.setTime(0);
	            if(!obj.beforeTime) obj.afterTime = ''
	            if(obj.beforeTime == obj.afterTime && obj.beforeTime) {
	                let time = new Date(new Date().setDate(new Date(obj.beforeTime).getDate() + 1));
					time.setHours(0);
					time.setMinutes(0);
					time.setSeconds(0);
					obj.afterTime = time.format('yyyy-MM-dd hh:mm:ss')
	            }
	            this.beforeTimeFD = obj.beforeTime ? `${obj.beforeTime}` : '';
	            this.afterTimeFD = obj.afterTime ? `${obj.afterTime}` : '';
	    	},
			getList() {
				this.loading=true;
				let params = {
					saleStatus: this.saleStatus,
					nameOrNo: this.search.trim(),
					searchTags: this.tags,
					startInsertTime: this.beforeTime ? `${this.beforeTime}` : '',
					endInsertTime: this.afterTime ? `${this.afterTime}` : '',
					startAllocTime: this.beforeTimeFD ? `${this.beforeTimeFD}` : '',
					endAllocTime: this.afterTimeFD ? `${this.afterTimeFD}` : '',
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
						this.data = res.data.data.list;
						this.loading = false
					}
				}).catch(errors.call(this));
			},
			getMore(val) {

			},
			searchDropList(word) {
				return new Promise((resolve, reject) => {});
			},
			textChange(val) {
				this.$nextTick(() => {
					this.getList();
				})
			},
			//筛选标签变化
			tagListChange(tags) {
				this.tags = tags;
				this.pageNo = 1;
				this.getList();
			},
			timeChange(start, end) {
				if(!start) end = ''
				if(start == end && start) {
					end = new Date(new Date().setDate(new Date(start).getDate() + 1)).format('yyyy-MM-dd hh:mm:ss')
				}
				this.beforeTime = start;
				this.afterTime = end;
				// this.beforeTime1 = '';
				// this.afterTime1 = '';
				this.pageNo = 1;
				this.getList();
			},
			onDataPickStart(start, end) {
				this.beforeTime = start;
				this.afterTime = end;
				// this.beforeTime1 = start;
				// this.afterTime1 = end;
				this.pageNo = 1;
				this.getList();
			},
			onDataPickEnd(start, end) {
				this.beforeTime = start;
				this.afterTime = end;
				// this.beforeTime1 = start;
				// this.afterTime1 = end;
				this.pageNo = 1;
				this.getList();
			},
			timeChangeFD(start, end) {
				if(!start) end = ''
				if(start == end && start) {
					end = new Date(new Date().setDate(new Date(start).getDate() + 1)).format('yyyy-MM-dd HH:mm:ss')
				}
				// console.log(start, end, 8)
				this.beforeTimeFD = start;
				this.afterTimeFD = end;
				// this.beforeTime1 = '';
				// this.afterTime1 = '';
				// this.pageNo = 1;
				this.getList();
			},
			onDataPickStartFD(start, end) {
				this.beforeTimeFD = start;
				this.afterTimeFD = end;
				// this.beforeTime1 = start;
				// this.afterTime1 = end;
				// this.pageNo = 1;
				this.getList();
			},
			onDataPickEndFD(start, end) {
				this.beforeTimeFD = start;
				this.afterTimeFD = end;
				// this.beforeTime1 = start;
				// this.afterTime1 = end;
				// this.pageNo = 1;
				this.getList();
			},
			//			timeCharge(val) {
			//				this.afterTime1 = '';
			//				this.beforeTime1 = '';
			//				this.beforeTime = '';
			//				this.afterTime = new Date().format('yyyy-MM-dd hh:mm:ss');
			//				if(val === '0') {
			//					let time = new Date();
			//					time.setHours(0);
			//					time.setMinutes(0);
			//					time.setSeconds(0);
			//					this.beforeTime = time.format('yyyy-MM-dd hh:mm:ss');
			//				} else if(val === '') {
			//					this.beforeTime = '';
			//				} else {
			//					this.beforeTime = new Date(this.getDay(val)).format('yyyy-MM-dd hh:mm:ss');
			//				}
			//				this.pageNo = 1;
			//				this.getList();
			//			},
			//			onDataPickStart(val) {
			//				this.afterTime1 = new Date().format('yyyy-MM-dd hh:mm:ss');
			//				let time=new Date(val);
			//				time.setHours(0);
			//				time.setMinutes(0);
			//				time.setSeconds(0);
			//				this.beforeTime1 = new Date(time).format('yyyy-MM-dd hh:mm:ss');
			//				this.afterTime = '';
			//				this.beforeTime = '';
			//				this.pageNo = 1;
			//				this.getList();
			//			},
			//			onDataPickEnd(val) {
			//				this.afterTime1 = new Date(val).format('yyyy-MM-dd hh:mm:ss');
			//				this.afterTime = '';
			//				this.beforeTime = '';
			//				this.pageNo = 1;
			//				this.getList();
			//			},
			staffChange(val) {
				this.staffId = val;
				this.pageNo = 1;
				this.getList();
			},
			sort(data) {
				if(data.order == 'normal') {
					this.sortType = '';
				} else if(data.key == 'insertDate'){
					this.sortType = 'b.create_date' + ' ' + data.order;
				} else if(data.key == 'createDate'){
					this.sortType = 'a.create_date' + ' ' + data.order;
				} else{
					this.sortType = data.key + ' ' + data.order;
				}
				this.pageNo = 1;
				this.getList();
			},
			pageChange(val) {
				this.pageNo = val;
				this.$el.parentElement.scrollTop = 0
				this.getList();
			},
			sizeChange(val) {
				this.pageSize = val;
				this.getList();
			},
			getDay(day) {
				var today = new Date();
				var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
				today.setTime(targetday_milliseconds); //注意，这行是关键代码  
				today.setHours(0);
				today.setMinutes(0);
				today.setSeconds(0);
				var tYear = today.getFullYear();
				var tMonth = today.getMonth();
				var tDate = today.getDate();
				tMonth = this.doHandleMonth(tMonth + 1);
				tDate = this.doHandleMonth(tDate);
				return today;
			},
			doHandleMonth(month) {
				var m = month;
				if(month.toString().length == 1) {
					m = "0" + month;
				}
				return m;
			},
			tableSelect(val) {
				this.tableOptionsLength = val.length;
			},
			updataHot(val) {
				let params = {
					id: val,
					isHost: "1"
				}
				crmCustomer.updateHot(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						this.getList();
					}
				}).catch(errors.call(this));
			},
			withdraw(val) {
				let params = {
					cusId: val
				}
				crmAllocResult.withdraw(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						this.getList();
					}
				}).catch(errors.call(this));
			},
			rowClick(val) {
				const {href} = this.$router.resolve({
					name: 'crm.detail',
					query: {
						id: val.cusId,
						'from': 'worker'
					}
				})
				window.open(href, '_blank');
				window.focus();
			}
		}
	}
</script>