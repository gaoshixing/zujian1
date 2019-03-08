<style lang="less">
	.tmk-leader-boss {
		padding-left: 30px;
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
			top: 30px;
			height: 450px;
			width: 500px;
		}
		.echarts-tmk-common {
			float: left;
			width: 240px;
			height: 240px;
		}
		.icon-crm {
			color:#C7CED9;
			cursor: pointer;
		}
		.search-data{
			position: relative;padding-left: 79px;zoom: 1;width: 860px;min-height: 34px;
			&:after,&::before{
				content: '';display: table;clear: both;visibility: hidden;font-size: 0;height: 0;
			}
			.title{
				width: 60px;position: absolute;left: 0;top: 0;line-height: 30px;
				color: #b8b8b8;text-align: right;
			}
			li,.more{
				float: left;padding: 5px 12px;cursor: pointer;margin:5px 10px 8px 3px;line-height: 1;
				&.active{
					background: #44bcb6;color: #fff;
				}
			}
		}
		.bill-paging {
			text-align: center;
			margin-top: 20px;
		}
		.ivu-table-filter-select-item {
			text-align: center !important;
		}
		.ivu-tooltip-inner {
			text-align: center !important;
			p {
				color: #f5f5f5 !important;
				font-size: 12px !important;
				line-height: 25px !important;
			}
		}
		.crm-leader-table{
			border-top: none;
		}
	}
</style>

<template>
	<div class="tmk-leader-boss">
		<time-optpons ref="dataOptpons" :width="88" :timeList='signTime' @onDataPickStart="onDataPickStart" @onDataPickEnd="onDataPickEnd" @timeChange="timeChange"></time-optpons>
		<div class="crm-echarts-container">
			<PandectInfoBox>
				<li> <p>资源总量</p> <p>{{ chartsData.total }}</p> </li>
				<li>
					<p>有效资源总量
						<Tooltip placement="top" style="display: inline-block">
							<i class="iconfont icon-tishi icon-crm"></i>
							<div slot="content">
								<p>有效资源TMK与当前客户所有通话记录中，</p>
								<p>有1次通过时长达到30S以上。</p>
							</div>
						</Tooltip>
					</p>
					<p>{{ chartsData.valid }}</p>
				</li>
				<li>
					<p>优质资源总量
						<Tooltip placement="top" style="display: inline-block">
							<i class="iconfont icon-tishi icon-crm"></i>
							<div slot="content">
								<p>优质资源指被标记为1星及以上星级的资源。</p>
							</div>
						</Tooltip>
					</p>
					<p>{{ chartsData.effective }}</p>
				</li>
				<li>
					<p>成功邀约总量
						<Tooltip placement="top" style="display: inline-block">
							<i class="iconfont icon-tishi icon-crm"></i>
							<div slot="content">
								<p>指TMK成功邀约的资源。</p>
							</div>
						</Tooltip>
					</p>
					<p>{{ chartsData.invite }}</p>
				</li>
				<li>
					<p>实际上门量
						<Tooltip placement="top" style="display: inline-block">
							<i class="iconfont icon-tishi icon-crm"></i>
							<div slot="content">
								<p>指销售顾问确认实际上门的客户。</p>
							</div>
						</Tooltip>
					</p>
					<p>{{ chartsData.visit }}</p>
				</li>
			</PandectInfoBox>
			<div class="crm-echarts-area">
				<div class="echarts-tmk-common echarts-tmk-one"></div>
				<div class="echarts-tmk-common echarts-tmk-two"></div><br>
				<div class="echarts-tmk-common echarts-tmk-three"></div>
				<div class="echarts-tmk-common echarts-tmk-four"></div>
			</div>
		</div>
		<Input
			v-model="keyWord"
			icon="ios-search"
			@on-click="onclickSearchInfos"
			@on-enter="onclickSearchInfos"
			placeholder="请输入客服姓名/客户姓名"
			style="width: 300px;margin-bottom:10px;"/>
		<div class="search-data">
			<span class="title">TMK专员</span>
			<ul>
				<li :class="[!serverChecked ? 'active' : '']" @click="changeServers()">全部</li>
				<li v-for="item in serverlists" :key="item.userId" 
					@click="changeServers(item)"
					:class="{active: serverChecked === item.userId}" >{{ item.userName + item.num }}</li>
			</ul>
		</div>
		<p class="table-title-info">共找到条 <span v-html="count"></span> 数据</p>

		<BtnList title="客户列表"></BtnList>

		<Table 
			:columns="columnsTMK"
			:data="dataTMK"
			@on-filter-change="onclickFilterChange"
			@on-sort-change="onclickSortChanges"
			class="crm-leader-table">
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
	</div>	
</template>

<script>

import valid, {errors, crmCustomerTmk, sys, common} from '../../../libs/request.js';
import echarts from 'echarts';
import timeOptpons from "../../../modules/timeOptpons.vue";
import BtnList from '@public/modules/btnlist';
import PandectInfoBox from '../../../modules/pandectInfoBox';
import { waitUntil, getTimeInterval, } from "@public/libs/util";
import { pieOptions, drawCanvas,} from '../../../libs/eahcrtsModule';

export default {
	name: 'TMKLeader',
	mixins: [ pieOptions, ],
	components: {
		BtnList,
		timeOptpons,
		PandectInfoBox,
	},
	data() {
		return {
			keyWord: null,
			pageTotal: 0,
			pageNo: 1,
			pageSize: 10,
			count: 0,
			serverChecked: '',
			serverlists: [],
			params: {},
			signTime: {
                title: '统计时间',
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
			op1: {},
			op2: {},
			op3: {},
			op4: {},
			columnsTMK: [
				{
					title: '编号',
					align: 'center',
					key: 'cusCode',
				},
				{
					title: '客户姓名',
					align: 'center',
					key: 'cusName',
				},
				{
					title: '分值',
					key: 'cusScore',
					align: 'center',
					sortable: true,
				},
				{
					title: '更新时间',
					key: 'updateTime',
					align: 'center',
					sortable: true,
				},
				{
					title: '跟进阶段',
					key: 'tracePhase',
					align: 'center',
					filters: [],
					filterMultiple: false,
					filterMethod (value, row) {
						return true;
					}
				},
				{
					title: '状态',
					key: 'status',
					align: 'center',
					filters: [
						{ label: '未激活', value: 0 },
						{ label: '已激活', value: 1 },
					],
					filterMultiple: false,
					filterMethod (value, row) {
						return true;
					}
				},
				{
					title: 'TMK专员',
					key: 'tmkName',
					align: 'center',
				},
			],
			chartsData: {
				valid: 0,
				effective: 0,
				total: 0,
				invite: 0,
				visit: 0,
			},
			dataTMK: [],
		};
	},
	created() {
		// console.log('pieOptions', pieOptions);
	},
	mounted() {
		this.getTmkStatus();
		this.$refs['dataOptpons'].timeChange(0);
	},
	methods: {
		getTmkStatus() {
            // 获取跟进阶段类型
            let params = {
                types: 'crm_customer_tmk_status'
            }
            sys.batchListData(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let temp = [];
					let lists = res.data.data.crm_customer_tmk_status;
                    lists.forEach(item => {
                        if(item.value != 'abandon' && item.value != 'reinit') {
                            temp.push(item);
                        }
                    });
                    this.$set(this.columnsTMK[4],'filters',temp);
                }
            }).catch(errors.call(this));
        },
		getKfList() {
			// 获取TMK专员
			let params = {
				startTime: this.params.startTime,
				endTime: this.params.endTime,
			}
            crmCustomerTmk.tmkerList(params).then(valid.call(this)).then(res => {
                if(res.ok) {
					this.serverlists = res.data.data;
					this.changeServers();
                }
            }).catch(errors.call(this));
		},
		getChartsData() {
			// 获取统计图数据
			let params = {
				startTime: this.params.startTime,
				endTime: this.params.endTime,
			}
			crmCustomerTmk.tmkStatisticsData(params).then(valid.call(this)).then(res => {
                if(res.ok) {
					let data = res.data.data;
					// total资源领取量，valid有效，effective优质，invite成功邀约，visit实际上门
					if(data) {
						this.chartsData.valid = data.valid ? Number(data.valid) : 0;
						this.chartsData.effective = data.effective ? Number(data.effective) : 0;
						this.chartsData.total = data.total ? Number(data.total) : 0;
						this.chartsData.invite = data.invite;
						this.chartsData.visit = data.visit;
					}else{
						this.chartsData.valid = 0;
						this.chartsData.effective = 0;
						this.chartsData.total = 0;
						this.chartsData.invite = 0;
						this.chartsData.visit = 0;
					}
					let proportion = {};
					if(this.chartsData.total == 0) {
						proportion = {
							op1: '0%', //有效率
							op2: '0%', //优质率
							op3: '0%', //成功邀约率
							op4: '0%', //实际上门率
						}
					}else{
						proportion = {
							op1: (this.chartsData.valid / this.chartsData.total * 100).toFixed(2) + '%', //有效率
							op2: (this.chartsData.effective / this.chartsData.total * 100).toFixed(2) + '%', //优质率
							op3: (this.chartsData.invite / this.chartsData.total * 100).toFixed(2) + '%', //成功邀约率
							op4: (this.chartsData.visit / this.chartsData.total * 100).toFixed(2) + '%', //实际上门率
						}
					}
					
					this.setOp1(proportion.op1);
					this.setOp2(proportion.op2);
					this.setOp3(proportion.op3);
					this.setOp4(proportion.op4);
					
                }
            }).catch(errors.call(this));
		},
		getLists() {
			// 获取lists数据
			this.params.pageNo = this.pageNo;
			this.params.pageSize = this.pageSize;
            crmCustomerTmk.tmkStatisticsList(this.params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let listData = res.data.data;
                    this.dataTMK = listData.list;
                    this.pageNo = listData.pageNo;
                    this.pageCount = listData.pageCount;
                    this.pageSize = listData.pageSize;
                    this.count = listData.count;
                }
            }).catch(errors.call(this));
		},
		/*
		* define canvas options
		*/
		setOp1(percent) {
			this.op1 = pieOptions;
			this.op1.title.text = '资源有效率';
			this.op1.title.subtext = percent;
			this.op1.series[0].name = '资源有效率';
			this.op1.color =  ['red', '#F1F1F1'];
			this.op1.series[0].data = [
				{value: this.chartsData.valid, name: '有效资源'},
                {value: this.chartsData.total - this.chartsData.valid, name: '其他资源'},
			];
			this.drawCanvas('.echarts-tmk-one', this.op1);
		},
		setOp2(percent) {
			this.op2 = pieOptions;
			this.op2.title.text = '优质资源率';
			this.op2.title.subtext = percent;
			this.op2.color =  ['#FFC000', '#F1F1F1'];
			this.op2.series[0].name = '优质资源率';
			this.op2.series[0].data = [
				{value: this.chartsData.effective, name: '优质资源'},
                {value: this.chartsData.total - this.chartsData.effective, name: '其他资源'},
			];
			this.drawCanvas('.echarts-tmk-two', this.op2);
		},
		setOp3(percent) {
			this.op3 = pieOptions;
			this.op3.title.text = '成功邀约率';
			this.op3.title.subtext = percent;
			this.op3.color =  ['#00B050', '#F1F1F1'];
			this.op3.series[0].name = '成功邀约率';
			this.op3.series[0].data = [
				{value: this.chartsData.invite, name: '成功邀约资源'},
                {value: this.chartsData.total - this.chartsData.invite, name: '其他资源'},
			];
			this.drawCanvas('.echarts-tmk-three', this.op3);
		},
		setOp4(percent) {
			this.op4 = pieOptions;
			this.op4.title.text = '实际上门率';
			this.op4.title.subtext = percent;
			this.op4.color =  ['#00B050', '#F1F1F1'];
			this.op4.series[0].name = '实际上门率';
			this.op4.series[0].data = [
				{value: this.chartsData.visit, name: '实际上门资源'},
                {value: this.chartsData.total - this.chartsData.visit, name: '其他资源'},
			];
			this.drawCanvas('.echarts-tmk-four', this.op4);
		},
		/*
		* 日期选择 
		*/
		onDataPickStart(start, end) {
            this.params.startTime = start;
            this.params.endTime = end;
            this.pageNo = 1;
            this.getKfList(); 
      		this.getChartsData(); 
        },
        onDataPickEnd(start, end) {
            this.params.startTime = start;
            this.params.endTime = end;
            this.pageNo = 1;
            this.getKfList(); 
      		this.getChartsData(); 
        },
        timeChange(start, end) {
            if(!start) end = ''
            else {
				let time = new Date(new Date().setDate(new Date(end).getDate() + 1));
				time.setHours(0);
				time.setMinutes(0);
				time.setSeconds(0);
				end = time.format('yyyy-MM-dd hh:mm:ss')
            }
            this.params.startTime = start ? `${start}` : '';
            this.params.endTime = end ? `${end}` : '';
			this.pageNo = 1;
			this.getKfList(); 
      		this.getChartsData(); 
		},
		
		changeServers(obj) {
            // 选择TMK专员
			this.pageNo = 1;
            if(obj) {
                this.serverChecked = obj.userId;
                this.params.teacherId = obj.userId;
            }else{
				this.serverChecked = '';
				delete this.params.teacherId;
            }
            this.getLists();
		},
		
		
		/*
		* keyword search
		*/
		onclickSearchInfos(val) {
			if(this.keyWord != '') {
                this.params.keyWord = this.keyWord;
            } else {
                delete this.params.keyWord;
            }
            this.getLists();
		},
		drawCanvas(el, options) {
			let myCharts = echarts.init(this.$el.querySelector(el));
			myCharts.setOption(options);
		},
		/*
		* Table
		*/
		onclickFilterChange(val) {
			let key = val.key;
			let value = val._filterChecked[0];
			if(key == 'tracePhase') {
				if(value) this.params.tracePhase = value;
				else delete this.params.tracePhase;
			}else if(key == 'status') {
				if(value) this.params.status = value;
				else delete this.params.status;
			}
			this.getLists();
			// console.log(val.key, val._filterChecked[0]);
		},
		onclickSortChanges(val) {
			let key = val.key;
			let value = val.order;
			if(value == 'normal') {
				delete this.params.orderBy;
				delete this.params.orderType;
			}else{
				this.params.orderType = value;
				if(key == 'cusScore') {
					this.params.orderBy = 'score';
				}else if(key == 'updateTime') {
					this.params.orderBy = 'updateDate';
				}
			}
			this.getLists();
			// console.log(val.key, val.order);
		},
		/*
		* 分页
		*/
		onclickChangePage(index) {
			this.pageNo = index;
			this.getLists();
		},
		onPageSizeChange(val) {
			this.pageSize = val;
			this.getLists();
		},
	},
	
};
</script>
