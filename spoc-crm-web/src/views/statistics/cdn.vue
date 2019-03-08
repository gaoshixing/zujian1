<style lang="less">
	.cdnMy {
		.title_box {
			line-height: 51px;
			border-bottom: 1px #e0e0e0 solid;
			padding: 0 14px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.box_headline {
				font-size: 16px;
				color: #333333;
				.ivu-tooltip-inner {
					white-space: normal;
				}
				.icon-tishi {
					font-size: 14px;
					cursor: pointer;
					color: #cecece;
				}
			}
			.box_detail {
				font-size: 12px;
				color: #b0b6bf;
				cursor: pointer;
			}
		}
		.wrap_box {
			padding: 16px 24px 0;
			.time_list {
				white-space:nowrap;  
				font-size: 12px;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 4px 0;
				li {
					list-style: none;
					line-height: 16px;
					&.time_tit {
						width: 60px;
						color: #999;
						margin-right: 10px;
						text-align: right;
						height: 2em;
						line-height: 2em;
						box-sizing: border-box;
					}
					&.time_Opt {
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
			.topList {
				padding-top: 10px;
				li {
					line-height: 26px;
					span {
						display: inline-block;
					}
					.num {
						background: #000000;
						width: 16px;
						height: 16px;
						line-height: 16px;
						text-align: center;
						border-radius: 8px;
						color: #fff;
					}
					.name {
						width: 150px;
						padding-left: 26px;
					}
				}
			}
		}
		.noList {
			width: 100%;
			text-align: center;
			span {
				background: url(../../../../../assets/img/public/tableDataEmpty.png);
				padding-bottom: 50px;
				display: inline-block;
				padding-top: 160px;
				color: #aaa;
				background-repeat: no-repeat;
				background-position: center 40px;
				min-width: 200px;
			}
		}
		.echartbox {
			width: 100%;
			overflow-x: auto;
		}
	}
</style>

<template>
	<div class="cdnMy">
		<div class="title_box">
			<div class="box_headline">
				新增资源来源分布
			</div>
			<div class="box_detail" @click="viewDetail">
				查看明细 <i class="iconfont icon-youjiantou"></i>
			</div>
		</div>
		<div class="wrap_box">
			<ul class="time_list">
				<li class="time_tit">
					{{signTime.title}}：
				</li>
				<li class="time_Opt" v-for="item in signTime.list" @click="timeChange(item.id)" :class="{active:timeId===item.id}" :key="item.id">{{item.label}}</li>
			</ul>
			<ul class="time_list">
				<li class="time_tit">
					{{listType.title}}：
				</li>
				<li class="time_Opt" v-for="item in listType.list" @click="listChange(item.id)" :class="{active:resType===item.id}" :key="item.id">{{item.label}}</li>
			</ul>
		</div>
		<echart-item res="bar" :data="eOption" :mstyle="estyle" v-if="echartsShow&&chartData.length" class="echartbox"></echart-item>
		<div class="noList" v-if="!chartData.length">
			<span>暂无资源数据</span>
		</div>
	</div>
</template>

<script>
	import valid, { errors, sys, common, crmStatistics, } from '../../libs/request';
	import echartItem from "../pond/echartItem.vue";
	export default {
		data() {
			return {
				newResTodayRes: {},
				totalValue: 0,
				totalScore: 0,
				chartData: [],
				legendData: [],
				startTime: '',
				endTime: '',
				timeId: 0,
				resType: 'baidu',
				signTime: {
					title: '创建时间',
					list: [{
							label: '今天',
							id: 0
						}, {
							label: '最近7天',
							id: 6
						},
						{
							label: '最近30天',
							id: 29
						},
					]
				},
				listType: {
					title: '类型',
					list: [{
						label: '百度类',
						id: 'baidu'
					}, {
						label: '其他来源',
						id: 'other'
					}, ]
				},
				echartsShow: false,
				estyle: {
					width: '336px',
					height: '224px'
				},
			}
		},
		computed: {
			eOption() {
				let self = this;
				let obj = {
					title: {
						text:  this.totalValue ? "资源总量:"  + this.totalValue : '资源总量:0',
						subtext: this.totalScore ? "资源总分值:"  + this.totalScore : '资源总分值:0',
						x: 'center',
						top:"80px",
						left:"16%",
						textStyle: {
							color: "#a9a8a9",
							fontSize: "14px",
						},
						subtextStyle: {
							color: "#a9a8a9",
							fontSize: "14px",
						}
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						type:'scroll',
						orient: 'vertical',
						right:'10%',
						top:'middle',
						data: this.legendData
					},
	                grid:{
	                	left :'left'
	                },
					series: [{
						name: '访问来源',
						type: 'pie',
						center:['30%','50%'],
						radius: ['52%', '70%'],
						labelLine: {
							normal: {
								show: false
							}
						},
						label: {
							normal: {
								show: false,
								position: 'center'
							},
							emphasis: {
								show: false,
								textStyle: {}
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: this.chartData
					}]
				};
				return obj;
			}
		},
		components: {
			'echart-item': echartItem,
		},
		mounted() {
			let now = new Date().format('yyyy-MM-dd')
			this.startTime = now
			this.endTime = now
			this.loadData();
		},
		methods: {
			viewDetail() {
				this.$router.push({
					name: 'crm.newResource'
				})
			},
			loadData() {
				let obj = {
					startTime: this.startTime,
					endTime: this.endTime
				}
				crmStatistics.resTag(obj).then(valid.call(this)).then(res => {
					if (res) {
						this.newResTodayRes =  res.data.data
						this.chartData = res.data.data[this.resType]
						this.legendData = []
						this.totalValue = 0
						this.totalScore = 0
						this.chartData.forEach((item,index) => {
							this.totalValue += item.value
							this.totalScore += item.score
							this.legendData.push(item.name)
						})
						this.totalScore = parseFloat(this.totalScore.toFixed(2))
						this.echartsShow = true
					}
				}).catch(errors.call(this));
			},
			listChange(val) {
				this.resType = val;
				this.chartData = this.newResTodayRes[val]
				this.legendData = []
				this.totalValue = 0
				this.totalScore = 0
				this.chartData.forEach((item,index) => {
					this.totalValue += item.value
					this.totalScore += item.score
					this.legendData.push(item.name)
				})
			},
			timeChange(val) {
				this.timeId = val
				let now = new Date().format('yyyy-MM-dd') 
				let day = 3600 * 24 * 1000  //一天毫秒数
				let start = new Date(new Date().getTime() - day * val)
				this.startTime = start.format('yyyy-MM-dd') 
				this.endTime = now
				this.loadData()
			},
		}
	}
</script>