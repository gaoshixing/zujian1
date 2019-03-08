<style lang="less">
	.table-cjf-container {
		.ivu-table-wrapper {
			border: none;
		}
		.ivu-table {
			th {
				background: #fff;
			}
		}
		.ivu-table:after {
			display: none;
		}
		.checkbox-table {
			th,
			td {
				&:first-child {
					.ivu-table-cell {
						display: inline;
					}
				}
			}
		}
		.listsTable {
			position: relative;
			.nunber {
				position: fixed;
				z-index: 9;
				width: 226px;
				line-height: 24px;
				padding: 10px 0;
				border-radius: 3px;
				font-size: 14px;
				background: rgba(0, 0, 0, .5);
				color: #fff;
				text-align: center;
				span {
					display: inline-block;
					width: 26px;
					height: 20px;
					line-height: 20px;
					margin: 0 3px;
					background: #fff;
					color: #000;
				}
			}
		}
		.table-name {
			position: relative;
			display: inline-block;
			padding: 7px 0 3px;
			min-height: 28px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: normal;
			word-break: break-all;
			&.urgent-flag {
				padding: 7px 16px 3px;
				&:after {
					content: '急';
					position: absolute;
					right: 0;
					top: 4px;
					line-height: 1;
					color: #f00;
					font-size: 12px;
				}
			}
			&.new-flag {
				padding: 7px 12px 3px;
				&:after {
					content: '';
					position: absolute;
					right: 0;
					top: 4px;
					width: 8px;
					height: 8px;
					border-radius: 8px;
					background: #f00;
				}
			}
		}
		.text-left {
			text-align: left;
		}
	}
</style>

<template>
	<div class="table-cjf-container">
		<div class="listsTable">
			<div class="nunber" :style="{left:numberLeft,top:numberTop}" v-show="showNumber">
				温馨提示<br/> 您还剩余
				<span>{{ modelNum.minute }}</span>:<span>{{ modelNum.second }}</span>回访客<br/> 户，否则资源将掉落进公共库。
			</div>
			<!-- 我的客户 -->
			<Table v-if="tableType == 1" class="checkbox-table" :columns="columns0" :data="newLists" @on-selection-change="selectChange" @on-sort-change="sortTable">
			</Table>
			<!-- 新资源 -->
			<Table v-if="tableType == 0" :columns="columns1" :data="newLists" @on-selection-change="selectChange" @on-sort-change="sortTable">
			</Table>
			<Table v-if="tableType == 2" :columns="columns2" :data="newLists" @on-selection-change="selectChange" @on-sort-change="sortTable">
			</Table>
			<Table v-if="tableType == 3" :columns="columns3" :data="newLists" @on-selection-change="selectChange" @on-sort-change="sortTable">
			</Table>
		</div>
		<div class="page-box" v-show="pageCount > 1">
			<div style="margin: auto;display: inline-block;">
				<Page :current="pageNo" :total="count" show-elevator show-total show-sizer :page-size="pageSize" @on-change="pageChange" @on-page-size-change="sizeChange">
				</Page>
			</div>
		</div>
	</div>
</template>

<script>
	import valid, {
		errors,
		common
	} from '../../libs/request.js';

	import { mapState, mapGetters, } from "vuex";

	export default {
		props: {
			globalFallDuration: {
				type: String,
				default: ''
			},
			fdDuration: {
				type: String,
				default: ''
			},
			qdDuration: {
				type: String,
				default: ''
			},
			tableType: {
				required: true,
				type: [String, Number],
				default: 0
			},
			lists: {
				required: true,
				type: Array,
			},
			pageNo: {
				type: Number,
				default: 1,
			},
			pageCount: {
				type: Number,
				default: 1,
			},
			pageSize: {
				type: Number,
				default: 10,
			},
			count: {
				type: Number,
				default: 10,
			},
		},
		data() {
			let _this = this
			return {
				numberLeft: 0,
				numberTop: 0,
				showNumber: false,
				newLists: [],
				modelNum: {
					minute: '10',
					second: '12'
				},
				interval: '',
				intervalNum: [],
				columns0: [{
						type: 'selection',
						width: 40,
						align: 'center'
					},
					{
						title: '掉落提示',
						align: 'center',
						render: (h, params) => {
							let q = ''
							let flag = params.row.countDown && params.row.isContract !='1' && params.row.status != 'sign'
							if(flag){
								q = (Number(params.row.countDown) / Number(_this.globalFallDuration) * 100).toFixed(0)
							}
							let color = '#44bcb7'
							if(q <=25){
								color = '#FF6666'
							} else if(q<=50) {
								color = '#FFB101'
							}
							return h('div', {
								style: {
									color:color
									/* 'background-color': color,
									color: '#fff', */
								},
							}, flag ? '不足' +Math.ceil(Number(params.row.countDown) / (24 * 3600)) +'天掉落' : '' )
						}
					},
					{
						title: '编号',
						align: 'center',
						key: 'cusCode',
						render: (h, params) => {
							return h('a', {
								class: {
									'table-name': true,
									'urgent-flag': params.row.isHot == 1,
										'new-flag': params.row.new
								},
								on: {
									click: () => {
										this.routerGoDetail(params.row.cusId, 'group');
									}
								}
							}, params.row.cusCode ? parseInt(params.row.cusCode) : '', )
						}
					},
					{
						title: '客户姓名',
						align: 'center',
						key: 'name',
					},
					{
						title: '星级',
						align: 'center',
						key: 'star',
						filters: [],
						filterMultiple: false,
						filterRemote(value, row) {
							this.filterStar(value, row);
						}
					},
					{
						title: '录入时间',
						align: 'center',
						key: 'insertDate',
						width: 140,
						sortable: 'custom',
					},
					{
						title: '最新动态',
						align: 'center',
						key: 'updateDate',
						width: 200,
						sortable: 'custom',
						render: (h, params) => {
							let text = params.row.traceDescription;
							let textLeft = false;
							if(text && text.length > 30) {
								text = text.substring(0, 30) + '...';
							}
							if(text && text.length > 14) {
								textLeft = true;
							}
							return h('div', {
								style: {
									'padding': '10px 0',
									textAlign:'left'
								}
							}, [
								h('p', params.row.updateDate),
								h('p', {
									class: {
										'text-left': textLeft
									}
								}, text)
							]);
						}
					},
					{
						title: '最后联系时间',
						align: 'center',
						key: 'lastDate',
						width: 160,
						sortable: 'custom',
					},
					{
						title: '来源',
						align: 'center',
						key: 'flagName',
						filters: [{
								label: '抢单',
								value: 0
							},
							{
								label: '分单',
								value: 1
							},
							{
								label: '共享',
								value: 2
							},
							{
								label: '转让',
								value: 3
							}
						],
						filterMultiple: false,
						filterRemote(value, row) {
							this.filterListsSource(value, row);
						}
					},
					{
						title: '跟进阶段',
						align: 'center',
						key: 'statusName',
					},
					{
						title: '操作',
						align: 'center',
						width: 100,
						render: (h, params) => {
							return h("div", [
								h("a", {
									style: {
										'margin-right': '8px'
									},
									on: {
										click: () => {
											this.routerGo(params.row.cusId);
										}
									}
								}, '跟进'),
								h("a", {
									on: {
										click: () => {
											this.choosePeople(params.row);
										}
									}
								}, '共享')
							])
						}
					},
				],
				columns1: [{
						title: '编号',
						align: 'center',
						key: 'cusCode',
						render: (h, params) => {
							return h('a', {
								class: {
									'table-name': true,
									'urgent-flag': params.row.isHot == 1,
										'new-flag': params.row.new
								},
								on: {
									click: () => {
										this.routerGoDetail(params.row.cusId);
									}
								}
							}, params.row.cusCode ? parseInt(params.row.cusCode) : '', )
						}
					},
					{
						title: '客户姓名',
						align: 'center',
						key: 'name',
					},
					{
						title: '星级',
						align: 'center',
						key: 'star',
						filters: [],
						filterMultiple: false,
						filterRemote(value, row) {
							this.filterStar(value, row);
						}
					},
					{
						title: '更新时间',
						align: 'center',
						width: 200,
						key: 'createDate',
						sortable: 'custom',
						render: (h, params) => {
							return h('div', [
								h('span', {
									style: {
										float: 'left',
										marginRight: '9px'
									}
								}, params.row.createDate),
								(() => {
									if(params.row.countDown) {
										let q = ''
										let times = params.row.countDown.split(':')
										let second = Number(times[0])*60 + Number(times[1])
										if(params.row.flag == '0'){ //抢单
											q = (second / Number(_this.qdDuration) * 100).toFixed(0)
										} else {
											q = (second/ Number(_this.fdDuration) * 100).toFixed(0)

										}
										let color = '#44bcb7'
										if(q <=25){
											color = '#FF6666'
										} else if(q<=50) {
											color = '#FFB101'
										}
										return [
											h('span', {
												style: {
													float: 'left',
													background: color,//'#44bcb7',
													color: '#fff',
													lineHeight: '17px',
													width: '50px',
													textAlign: 'center'
												},
												on: {
													mouseover: (e) => {
														this.numberLeft = e.clientX - 226 + 'px';
														this.numberTop = e.clientY - 92 + 'px';
														this.showNumber = true;
														let temp = params.row.countDown.split(":");
														this.modelNum.minute = temp[0];
														this.modelNum.second = temp[1];
													},
													mouseout: (e) => {
														e.stopPropagation();
														this.showNumber = false;
													}
												}
											}, params.row.countDown)
										]
									}
								})()
							])
						}
					},
					{
						title: '来源',
						align: 'center',
						key: 'flagName',
						filters: [{
								label: '抢单',
								value: 0
							},
							{
								label: '分单',
								value: 1
							},
							{
								label: '共享',
								value: 2
							},
							{
								label: '转让',
								value: 3
							}
						],
						filterMultiple: false,
						filterRemote(value, row) {
							this.filterListsSource(value, row);
						}
					},
				],
				columns2: [{
						title: '编号',
						align: 'center',
						key: 'cusCode',
						render: (h, params) => {
							return h('a', {
								class: {
									'table-name': true,
									'urgent-flag': params.row.isHot == 1,
										'new-flag': params.row.new
								},
								on: {
									click: () => {
										this.routerGoDetail(params.row.cusId);
									}
								}
							}, params.row.cusCode ? parseInt(params.row.cusCode) : '', )
						}
					},
					{
						title: '客户姓名',
						align: 'center',
						key: 'name'
					},
					{
						title: '星级',
						align: 'center',
						key: 'star',
						filters: [],
						filterMultiple: false,
						filterRemote(value, row) {
							this.filterStar(value, row);
						}
					},
					{
						title: '回访时间',
						align: 'center',
						key: 'nextTime',
						width: 200,
						sortable: 'custom'
					},
					{
						title: '操作',
						align: 'center',
						render: (h, params) => {
							return h("a", {
								on: {
									click: () => {
										this.routerGo(params.row.cusId);
									}
								}
							}, '跟进')
						}
					},
				],
				columns3: [{
						title: '编号',
						align: 'center',
						key: 'cusCode',
						render: (h, params) => {
							return h('a', {
								class: {
									'table-name': true,
									'urgent-flag': params.row.isHot == 1,
										'new-flag': params.row.new
								},
								on: {
									click: () => {
										this.routerGoDetail(params.row.cusId);
									}
								}
							}, params.row.cusCode ? parseInt(params.row.cusCode) : '', )
						}
					},
					{
						title: '客户姓名',
						align: 'center',
						key: 'name'
					},
					{
						title: '星级',
						align: 'center',
						key: 'star',
						filters: [],
						filterMultiple: false,
						filterRemote(value, row) {
							this.filterStar(value, row);
						}
					},
					{
						title: '共享类型',
						align: 'center',
						key: 'shareType',
						filters: [{
								label: '共享给我的',
								value: 0
							},
							{
								label: '共享给同事的',
								value: 1
							}
						],
						filterMultiple: false,
						filterRemote(value, row) {
							this.filterShareType(value, row);
						}
					},
					{
						title: '共享人',
						align: 'center',
						key: 'shareByName',
					},
					{
						title: '共享人数',
						align: 'center',
						key: 'shareNum',
						sortable: 'custom'
					},
					{
						title: '共享时间',
						align: 'center',
						key: 'shareDate',
						width: 200,
						sortable: 'custom'
					},
					{
						title: '操作',
						align: 'center',
						render: (h, params) => {
							return h("a", {
								on: {
									click: () => {
										this.routerGo(params.row.cusId);
									}
								}
							}, '跟进')
						}
					},
				],
			};
		},
		computed: {
			...mapGetters('crm', ['isSaler']),
		},
		created() {},
		mounted() {
			this.newLists = this.lists;
			this.$nextTick(() => {});
			this.newInterval();
			this.getStarLists();
		},
		methods: {
			choosePeople(item) {
				this.$emit('onChoosePeople', item);
			},
			routerGo(cusId, str) {
				// 跟进
				let thisForm = 'myclient'
				if(str) {
					thisForm = str;
				}
				this.$router.push({
					name: "crm.detail",
					query: {
						id: cusId,
						from: thisForm
					}
				});

			},
			routerGoDetail(cusId, str) {
                // 详情
                let data = {
                    name: 'crm.detail',
                    query: {
                        id: cusId,
                        from: 'myclient'
                    }
                }
                if(str) data.query.group = true
				const {href} = this.$router.resolve(data)
                window.open(href, '_blank');
            },
			newInterval() {
				// 找出需要倒计时的数据
				this.intervalNum.forEach(inte => {
					clearInterval(inte);
				});
				this.intervalNum = [];
				// console.log(this.intervalNum)
				if(this.tableType == 0) {
					for(let i = 0; i < this.newLists.length; i++) {
						let list = this.newLists[i];
						if(list.countDown && list.countDown != '') {
							this.SetIntervalFun(list.countDown, i, this.newLists[i]);
						}
					}
				} else {
					this.intervalNum.forEach(inte => {
						clearInterval(inte);
					});
				}
			},
			SetIntervalFun(list, index, item) {
				// 倒计时
				let temp = list.split(":");
				let minute = parseInt(temp[0]);
				let second = parseInt(temp[1]);
				let int = setInterval(() => {
					minute = parseInt(minute);
					second = parseInt(second);
					if(second > 0) {
						second--;
					} else {
						if(minute > 0) {
							minute--;
							second = 59;
						} else {
							minute = 0;
							second = 0;
							// 倒计时结束，将数据掉入tmk公共库
							this.$emit('delResource', item);
							clearInterval(int);
						}
					}
					if(minute < 10) {
						minute = '0' + minute;
					}
					if(second < 10) {
						second = '0' + second;
					}
					let re = minute + ':' + second;
					this.newLists[index].countDown = re;
				}, 1000);
				this.intervalNum.push(int);
				// console.log(this.intervalNum)
			},
			sortTable(column) {
				// 排序时有效，当点击排序时触发
				let num;
				if(column.order == 'normal') {
					num = '';
				} else {
					if(column.key == 'score') {
						if(column.order === 'desc') {
							num = 10;
						} else if(column.order === 'asc') {
							num = 0;
						}
					} else if(column.key == 'updateDate') {
						if(column.order === 'desc') {
							num = 11;
						} else if(column.order === 'asc') {
							num = 1;
						}
					} else if(column.key == 'nextTime') {
						if(column.order === 'desc') {
							num = 12;
						} else if(column.order === 'asc') {
							num = 2;
						}
					} else if(column.key == 'shareNum') {
						if(column.order === 'desc') {
							num = 13;
						} else if(column.order === 'asc') {
							num = 3;
						}
					} else if(column.key == 'shareDate') {
						if(column.order === 'desc') {
							num = 14;
						} else if(column.order === 'asc') {
							num = 4;
						}
					} else if(column.key == 'lastDate') {
						if(column.order === 'desc') {
							num = 15;
						} else if(column.order === 'asc') {
							num = 5;
						}
					} else if(column.key == 'createDate') {
						if(column.order === 'desc') {
							num = 16;
						} else if(column.order === 'asc') {
							num = 6;
						}
					} else if(column.key == 'insertDate') {
						if(column.order === 'desc') {
							num = 18;
						} else if(column.order === 'asc') {
							num = 8;
						}
					}
				}
				this.$emit('sortTable', num);
			},
			selectChange(selection) {
				// 勾选多选框
				this.$emit('on-select-change', selection);
			},
			pageChange(page) {
				this.$emit('pageChange', page);
			},
			sizeChange(size) {
				this.$emit('sizeChange', size);
			},
			filterStar(value, row) {
				// 星级筛选
				this.$emit('onFilterStar', value[0]);
			},
			filterListsSource(value, row) {
				// 新客户-筛选来源
				this.$emit('onFilterListsSource', value[0]);
			},
			filterShareType(value, row) {
				// 共享客户-筛选共享类型
				this.$emit('onFilterShareType', value[0]);
			},
			getStarLists() {
				let params = {
					parent: '8001'
				}
				common.listData(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						let temp = [];
						res.data.data.forEach(item => {
							temp.push({
								label: item.name,
								value: item.id
							})
						});
						let col0 = this.columns0.filter(function(item){
							return item.key == "star"; 
						})[0];
						let col1 = this.columns1.filter(function(item){
							return item.key == "star"; 
						})[0];
						let col2 = this.columns2.filter(function(item){
							return item.key == "star"; 
						})[0];
						let col3 = this.columns3.filter(function(item){
							return item.key == "star"; 
						})[0];
						this.$set(col0, 'filters', temp)
						this.$set(col1, 'filters', temp)
						this.$set(col2, 'filters', temp)
						this.$set(col3, 'filters', temp)
					}
				}).catch(errors.call(this));
			},
		},
		watch: {
			lists: function(val, oldval) {
				this.newLists = val;
				this.newInterval();
			}
		}
	}
</script>