<style lang="less">
	.custom-service-leader-boss {
		padding-left: 30px;border-top: 1px solid #e0e0e0;padding-top: 12px;
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
			top: 60px;
			height: 450px;
			width: 600px;
		}
		.echarts-custom-service-common {
			float: left;
			width: 300px;
			height: 300px;
		}
		.icon-crm {
			color:#C7CED9;
			cursor: pointer;
		}
		.table-name{
			position: relative;display: inline-block;padding: 7px 0 3px;min-height: 28px;
			overflow: hidden;text-overflow: ellipsis;white-space: normal;word-break: break-all;
			&.urgent-flag{
				padding: 7px 16px 3px;
				&:after{
					content:'急';
					position: absolute;right: 0;top: 4px;line-height: 1;
					color: #f00;font-size: 12px;
				}
			}
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
		.ivu-tooltip-inner {
			text-align: center !important;
			p {
				color: #f5f5f5 !important;
				font-size: 12px !important;
				line-height: 25px !important;
			}
		}
		.icon-crm-jiantou {
			display: inline-block;
			line-height: 32px;
			margin-top: -5px;
		}
		.top{
			.icon-crm-jiantou{
				color: red;
			}
		}
		.down{
			.icon-crm-jiantou{
				color: #0c0;transform:rotate(-180deg);
			}
		}
		.ivu-table-filter-select-item {
			text-align: center !important;
		}
		.ivu-table-wrapper {
			border: none;
		}
		.ivu-table th {
			background: #fff;
		}
		.ivu-table:after {
			display: none;
		}
	}
</style>

<template>
	<div class="custom-service-leader-boss">
		<time-optpons ref="dataOptpons" :width="88" :timeList='signTime' @onDataPickStart="onDataPickStart" @onDataPickEnd="onDataPickEnd" @timeChange="timeChange"></time-optpons>
		<div class="crm-echarts-container">
			<PandectInfoBox>
				<li> <p>录入资源量</p> <p>{{ chartsData.insertNum }}</p> </li>
				<!-- <li v-if="chartsData.rate != '0%'"> -->
				<li :class="{'top': chartsData.rate >= 0, 'down': chartsData.rate < 0}" v-if="chartsData.rate != null">
					<p>日环比</p>
					<i class="iconfont icon-jiantou icon-crm-jiantou" v-if="chartsData.rate >= 0 || chartsData.rate < 0"></i>
					<p>{{ chartsData.rate }} <span v-if="chartsData.rate != 'NaN'">%</span></p>
				</li>
				<li>
					<p>有效资源总量
						<Tooltip placement="top" style="display: inline-block">
							<i class="iconfont icon-tishi icon-crm"></i>
							<div slot="content">
								<p>有效资源指首电接通且通话30s以上的资源。</p>
							</div>
						</Tooltip>
					</p>
					<p>{{ chartsData.effectiveNum }}</p>
				</li>
				<li>
					<p>优质资源总量
						<Tooltip placement="top" style="display: inline-block">
							<i class="iconfont icon-tishi icon-crm"></i>
							<div slot="content">
								<p>优质资源指1星及以上星级的资源。</p>
							</div>
						</Tooltip>
					</p>
					<p>{{ chartsData.highQualityNum }}</p>
				</li>
			</PandectInfoBox>
			<div class="crm-echarts-area">
				<div class="echarts-custom-service-common echarts-custom-service-one"></div>
				<div class="echarts-custom-service-common echarts-custom-service-two"></div>
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
			<span class="title">客服专员</span>
			<ul>
				<li :class="[!serverChecked ? 'active' : '']" @click="changeServers()">全部</li>
				<li v-for="item in serverlists" :key="item.id" 
					@click="changeServers(item)"
					:class="{active: serverChecked === item.id}" >{{ item.name + item.insertNum }}</li>
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

		<Page :current="pageNo" v-if="pageCount > 1" class="bill-paging"
			:total="count"
			show-elevator show-total show-sizer
			:page-size="pageSize"
			@on-change="pageChange"
			@on-page-size-change="sizeChange">
		</Page>
	</div>	
</template>

<script>
import echarts from 'echarts';
// import BtnAndTime from '../../../modules/btnAndTime';
import BtnList from '@public/modules/btnlist';
import PandectInfoBox from '../../../modules/pandectInfoBox';
import { waitUntil, getTimeInterval, } from "@public/libs/util";
import { pieOptions, drawCanvas,} from '../../../libs/eahcrtsModule';
import valid, {errors, crmCustomer, sys, common} from '../../../libs/request.js';
import timeOptpons from "../../../modules/timeOptpons.vue";

export default {
	name: 'TMKLeader',
	mixins: [ pieOptions, ],
	data() {
		return {
			keyWord: null,
			count: 0,
			pageCount: 0,
			pageNo: 1,
			pageSize: 10,
			op1: {},
			op2: {},
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
			serverChecked: '',
			serverlists: [],
			columnsTMK: [
				{
					title: '编号',
					align: 'center',
					key: 'cusCode',
					render: (h, params) => {
                        return h('a', {
                            on: {
                                click: () => {
                                    this.routerGoDetail(params.row.id);
                                }
                            }
                        },params.row.cusCode ? parseInt(params.row.cusCode) : '')
                    }
				},
				{
					title: '客户姓名',
					align: 'center',
					key: 'name',
					render: (h, params) => {
                        return h('div', {
                            class: {
                                'table-name': true,
                                'urgent-flag': params.row.isHot == 1,
                            }
                        },params.row.name,)
                    }
				},
				{
					title: '来源',
					key: 'typeName',
					align: 'center',
					filters: [],
                    filterMultiple: false,
                    filterMethod (value, row) {
						return true;
					}
				},
				{
					title: '状态',
					key: 'isAlloc',
					align: 'center',
					filters: [
                        {
                            label: '未分单',
                            value: 0
                        },
                        {
                            label: '已分单',
                            value: 1
                        }
                    ],
                    filterMultiple: false,
                    filterMethod (value, row) {
						return true;
					}
				},
				{
					title: '录入时间',
                    align: 'center',
                    key: 'createDate',
                    width: 180,
                    sortable: 'custom'
				},
				{
					title: '客服',
					key: 'createByName',
					align: 'center',
				},
				{
					title: '是否有效',
					key: 'effective',
					align: 'center',
					filters: [
						{ label: '有效', value: 1 },
						{ label: '无效', value: 0 },
					],
					filterMultiple: false,
					filterMethod (value, row) {
						return true;
					},
					render: (h, params) => {
                        if(params.row.effective == 1) return h('span', '有效')
						if(params.row.effective == 0) return h('span', '无效')
                    }
				},
				{
					title: '星级',
					key: 'star',
					align: 'center',
					filters: [],
					filterMultiple: false,
					filterMethod (value, row) {
						return true;
					}
				},

			],
			dataTMK: [],
			pagePieOptions: {},
			params: {},
			chartsData: {
				effectiveNum: 0,//有效资源总量
				insertNum: 0,//总数
				highQualityNum: 0,//优质资源总量
				rate: 0,//日环比
			}
		};
	},
	components: {
		BtnList,
		timeOptpons,
		PandectInfoBox,
	},
	created() {
		this.pagePieOptions = pieOptions;
		// this.pagePieOptions.tooltip.show = false;
		
	},
	mounted() {
		this.getBatchListData();
		this.getStarLists();
		this.setOp1();
		this.setOp2();
		this.$refs['dataOptpons'].timeChange(0);
	},
	methods: {
		getBatchListData() {
            // 字典查询
            let params = {
                types: 'crm_customer_type'
            }
            sys.batchListData(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let temp = [];
                    let lists = res.data.data.crm_customer_type;
                    lists.forEach(item => {
                        if(item.value == 'kflr' || item.value == 'swtdr') {
                            temp.push(item);
                        }
                    });
                    this.$set(this.columnsTMK[2],'filters',temp);
                }
            }).catch(errors.call(this));
		},
		getStarLists() {
            // 星级筛选
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
                    this.$set(this.columnsTMK[7],'filters',temp)
                }
            }).catch(errors.call(this));
        },
		/*
		* define canvas options
		*/
		getChartsData() {
			// 获取统计图数据
			let params = {
				startTime: this.params.startTime,
				endTime: this.params.endTime,
			}
			crmCustomer.statisticsCustomer(params).then(valid.call(this)).then(res => {
                if(res.ok) {
					let data = res.data.data;
                    this.chartsData.effectiveNum = data.effectiveNum ? Number(data.effectiveNum) : 0;
                    this.chartsData.insertNum = data.insertNum ? Number(data.insertNum) : 0;
                    this.chartsData.highQualityNum = data.highQualityNum ? Number(data.highQualityNum) : 0;
					this.chartsData.rate = data.rate;
					// console.log(this.chartsData);
					this.setOp1();
					this.setOp2();
                }
            }).catch(errors.call(this));
		},
		getLists() {
			// 获取lists数据
			this.params.pageNo = this.pageNo;
			this.params.pageSize = this.pageSize;
			this.params.isStatistics = 1;
            crmCustomer.listPage(this.params).then(valid.call(this)).then(res => {
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
		getKfList() {
			// 获取客服
			let params = {
				startTime: this.params.startTime,
				endTime: this.params.endTime,
			}
            crmCustomer.statisticsKfList(params).then(valid.call(this)).then(res => {
                if(res.ok) {
					this.serverlists = res.data.data;
					this.changeServers();
                }
            }).catch(errors.call(this));
		},
		setOp1() {
			let data = (this.chartsData.effectiveNum / this.chartsData.insertNum * 100).toFixed(2) + '%';
			this.op1 = this.pagePieOptions;
			this.op1.title.text = '资源有效率';
			this.op1.title.top = 10;
			this.op1.title.itemGap = 120;
			this.op1.title.subtext = this.chartsData.insertNum > 0 ? data : '0%';
			this.op1.series[0].name = '资源有效率';
			this.op1.series[0].center = [150, 160];
			this.op1.series[0].data = [
				{value: this.chartsData.effectiveNum, name: '有效资源'},
                {value: this.chartsData.insertNum - this.chartsData.effectiveNum, name: '其他资源'},
			];
			this.op1.color =  ['#1AB2FF', '#F1F1F1'];
			this.drawCanvas('.echarts-custom-service-one', this.op1);
		},
		setOp2() {
			let data = (this.chartsData.highQualityNum / this.chartsData.insertNum * 100).toFixed(2) + '%';
			this.op2 = this.pagePieOptions;
			this.op2.title.text = '优质资源率';
			this.op2.title.top = 10;
			this.op2.title.itemGap = 120;
			this.op2.title.subtext = this.chartsData.insertNum > 0 ? data : '0%';
			this.op2.color =  ['#00B050', '#F1F1F1'];
			this.op2.series[0].center = [150, 160];
			this.op2.series[0].data = [
				{value: this.chartsData.highQualityNum, name: '优质资源'},
                {value: this.chartsData.insertNum - this.chartsData.highQualityNum, name: '其他资源'},
			];
			this.drawCanvas('.echarts-custom-service-two', this.op2);
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
		/*
		* keyword search
		*/
		onclickSearchInfos(val) {
			// console.log(this.keyWord);
			if(this.keyWord != '') {
                this.params.nameOrNo = this.keyWord;
            } else {
                delete this.params.nameOrNo;
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
			// console.log(val.key, val._filterChecked[0]);
			let key = val.key;
			let value = val._filterChecked[0];
			if(key == 'typeName') {
				if(value) {
					this.params.type = value;
				}else{
					delete this.params.type;
				}
			}else if(key == 'isAlloc') {
				if(value == 0 || value == 1) {
					this.params.isAlloc = value;
				}else{
					delete this.params.isAlloc;
				}
			}else if(key == 'effective') {
				if(value) {
					this.params.effective = value;
				}else{
					delete this.params.effective;
				}
			}else if(key == 'star') {
				if(value) {
					this.params.star = value;
				}else{
					delete this.params.star;
				}
			}
			this.getLists();
		},
		onclickSortChanges(val) {
			// console.log(val.key, val.order);
			// 排序
            if(val.order == 'desc') {
                this.params.orderType = '0';
            }else if(val.order == 'asc') {
                this.params.orderType = '10';
            }
            this.getLists();
		},
		/*
		* 分页
		*/
		pageChange(index) {
			this.pageNo = index;
			this.getLists();
		},
		sizeChange(val) {
			this.pageSize = val;
			this.getLists();
		},
		changeServers(obj) {
            // 选择客服
			this.params.kfIds = '';
			this.pageNo = 1;
            if(obj) {
                this.serverChecked = obj.id;
                this.params.kfIds = obj.id;
            }else{
				this.serverChecked = '';
				delete this.params.kfIds
            }
            this.getLists();
		},
		routerGoDetail(cusId) {
            // 详情
            this.$router.push({
                name: "crm.detail",
                query: {
                    id: cusId,
                    from: 'myclient'
                }
            });
        },
	},
};
</script>