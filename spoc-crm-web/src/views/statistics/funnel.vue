<style lang="less">
	.funnel {
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
	<div class="funnel">
		<div class="title_box">
			<div class="box_headline">
				销售跟进资源星级漏斗
				<Tooltip content="通话次数包括“拨打且接通的次数”和“来电接听次数”。" placement="top-start" style="display: inline-block;">
					<i class="iconfont icon-tishi"></i>
					<div slot="content">销售跟进资源包括统计时间范围内，销售接单资源、从公共库领取成功的资源，不包括销售放弃进公共库中的资源。</div>
				</Tooltip>
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
		</div>
		<echart-item res="bar" :data="eOption" :mstyle="estyle" v-if="echartsShow&&chartData.length" class="echartbox"></echart-item>
		<div class="noList" v-if="!chartData.length">
			<span>暂无资源数据</span>
		</div>
	</div>
</template>

<script>
	import echartItem from "../pond/echartItem.vue";
	import valid, { errors, sys, common, crmStatistics, } from '../../libs/request';
	export default {
		data() {
			return {
				chartData: [],
				beforeTime: '',
				afterTime: '',
				timeId: 0,
				signTime: {
					title: '统计时间',
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
					tooltip: {
						trigger: 'item',
						formatter: (params) => {
							return params.name + ':  ' + params.data.value + '%  ' + params.data.num + '个'
						},
					},
					series: [{
						name: '预期',
						type: 'funnel',
						left: '8%',
						top: '15%',
						width: '40%',
						height: '70%',
						sort: 'none',
						label: {
							normal: {
								position: 'right',
								formatter: (params) => {
									return params.data.name + ':  ' + params.data.value + '%  ' + params.data.num + '个'
								},
								textStyle: {
									color: 'auto'
								}
							},
							emphasis: {
								position: 'right',
								formatter: (params) => {
									return params.name + ':  ' + params.data.value + '%  ' + params.data.num + '个'
								},
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						itemStyle: {
							normal: {
								opacity: 0.7
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
			this.loadData()
		},
		methods: {
			getStartName(key){
				let strObj = {
					zeroStar: {
						name: '0星',
						order: 0
					},
					oneStar:  {
						name: '1星',
						order: 1
					},
					twoStar: {
						name: '2星',
						order: 2
					}, 
					threeStar:{
						name:  '3星',
						order: 3
					}, 
					sign: {
						name:  '已签约',
						order: 4
					}, 
				}
				return strObj[key] || {
						name: key,
						order: 0
					}
			},
			viewDetail() {
				this.$router.push({
					name: 'crm.funnelDetail'
				})
			},
			loadData() {
				let obj = {
					startTime: this.startTime,
					endTime: this.endTime
				}
				crmStatistics.resStar(obj).then(valid.call(this)).then(res => {
					if (res) {
						let result = res.data.data
						let total = 0
						for(let key in result){
							total += result[key]
						}
						this.chartData = []
						if(total != 0){
							for(let key in result){
								this.chartData.push(
									{
										value: (result[key] * 100 / total).toFixed(2),
										num:  result[key],
										name: this.getStartName(key).name,
										order: this.getStartName(key).order,
									}
								)
							}
							this.chartData.sort((a,b) => {
								return a.order - b.order
							})
						}
						this.echartsShow = true
					}
				}).catch(errors.call(this));
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