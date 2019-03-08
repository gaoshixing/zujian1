<style lang="less">
	.branchSign {
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
		.time_list {
			font-size: 12px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 20px 0;
			li {
				list-style: none;
				line-height: 16px;
				&.time_tit {
					width: 70px;
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
		.echartbox {
			width: 100%;
			overflow-x: auto;
		}
	}
</style>

<template>
	<div class="branchSign">
		<div class="title_box">
			<div class="box_headline">
				分公司签约统计
				<Tooltip content="通话次数包括“拨打且接通的次数”和“来电接听次数”。" placement="top-start" style="display: inline-block;">
					<i class="iconfont icon-tishi"></i>
					<div slot="content">
						<p>目标完成率=签约总业绩(万元)/目标销售额(万元)</p>
						<p>(百度类)资源完成率=签约总业绩(万元)/(百度类)新增资源量 </p>
						<p>(其他来源)资源完成率=签约总业绩(万元)/(其他来源)新增资源量 </p>
					</div>
				</Tooltip>
			</div>
			<div class="box_detail" @click="routerGo">
				查看明细 <i class="iconfont icon-youjiantou"></i>
			</div>
		</div>
		<ul class="time_list">
			<li class="time_tit">
				{{signTime.title}}：
			</li>
			<li class="time_Opt" v-for="item in signTime.list" @click="timeChange(item.id)" :class="{active:timeId===item.id}" :key="item.id">{{item.label}}</li>
		</ul>

		<echart-item res="bar" :data="eOption" :mstyle="estyle" v-if="echartsShow" class="echartbox"></echart-item>
	</div>
</template>

<script>
	import echartItem from "../pond/echartItem.vue";
	import valid, {
		errors,
		sys,
		common,
		crmStatistics,
	} from '../../libs/request';

	export default {
		data() {
			return {
				beforeTime: `${new Date(new Date().setMonth(new Date().getMonth())).format('yyyy-MM')}-01`,
				endDate: new Date().format('yyyy-MM-dd'),
				timeId: 1,
				signTime: {
					title: '统计时间',
					list: [{
							label: '当前月',
							id: 1
						}, {
							label: '近3个月',
							id: 3
						},
						{
							label: '近6个月',
							id: 6
						},
						{
							label: '今年',
							id: 12
						},
					]
				},
				echartsShow: false,
				estyle: {
					width: '100%',
					height: '450px'
				},
				echartsDate: [],
			}
		},
		computed: {
			eOption() {
				let self = this;
				let companyList = [],
					data1 = [],
					data2 = [],
					data3 = [];
				let d = this.echartsDate
				d.forEach(item => {
					companyList.push(item.companyName)
					data1.push(item.finishRate)
					data3.push(item.baiduFinish)
					data2.push(item.otherFinish)
				})
				let obj = {
					color: ['#3398DB'],
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						},
						formatter: (datas) => {
							var res = `分公司：${datas[0].name}<br/>统计时间：${d[datas[0].dataIndex].startDate}至${d[datas[0].dataIndex].endDate}<br/>`,
								val;
							for(var i = 0, length = datas.length; i < length; i++) {
								// res += "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:" + datas[i].color + ";'></span>"
								val = `${(datas[i].value)}`;
								res += datas[i].seriesName + '：' + val + '%<br/>';
							}
							res += `签约总业绩：${d[datas[0].dataIndex].fact}<br/>目标销售额：${d[datas[0].dataIndex].goal}<br/>资源数量（百度类）：${d[datas[0].dataIndex].baiduNum}<br/>资源数量（其他来源）：${d[datas[0].dataIndex].otherNum}<br/>`
							return res;
						}
					},
					legend: {
						type: 'plain',
						orient: 'horizontal',
						data: ['目标完成率', '资源转换率（其他来源）', '资源转换率（百度类）', ],
						selected: ['目标完成率', '资源转换率（其他来源）', '资源转换率（百度类）', ],
						textStyle: {
							color: '#a9a9a9'
						}
					},
					grid: {
						left: '4%',
						right: '4%',
						bottom: '8%',
						top: '8%',
						containLabel: true
					},
					xAxis: [{
						type: 'value',
						maxInterval: 10,
						axisLine: {
							show: true,
							lineStyle: {
								color: '#e0e0e0'
							}
						},
						axisTick: {
							show: false,
						},
						axisLabel: {
							margin: 10,
							color: '#000',
							formatter: '{value} %'
						},
						splitLine: {
							show: false,
						}
					}, ],
					yAxis: [{
						type: 'category',
						data: companyList,
						axisTick: {
							alignWithLabel: true,
							show: false
						},
						axisLabel: {
							margin: 20,
							color: '#000',
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: '#e0e0e0'
							}
						},
					}],
					series: [{
						name: '目标完成率',
						type: 'bar',
						itemStyle: {
							color: '#fad337',
							barBorderRadius: [0, 2, 2, 0],
						},
						label: {
							show: true,
							position: 'right',
							formatter: (item) => {
								if(item.value) {
									return item.value + '%'
								} else {
									return ''
								}
							}
						},
						barWidth: '12',
						data: data1,
						barGap: 0,
						//						z: 3
					}, {
						name: '资源转换率（其他来源）',
						type: 'bar',
						itemStyle: {
							color: '#4dcb73',
							barBorderRadius: [0, 2, 2, 0],
						},
						label: {
							show: true,
							position: 'right',
							//							distance: '10',
							formatter: (item) => {
								if(item.value) {
									return item.value + '%'
								} else {
									return ''
								}
							}
						},
						barWidth: '12',
						data: data2,
						barGap: 0
					}, {
						name: '资源转换率（百度类）',
						type: 'bar',
						itemStyle: {
							color: '#3aa0ff',
							barBorderRadius: [0, 2, 2, 0]
						},
						label: {
							show: true,
							position: 'right',
							//							distance: '10',
							formatter: (item) => {
								if(item.value) {
									return item.value + '%'
								} else {
									return ''
								}
							}
						},
						barWidth: '12',
						data: data3,
						barGap: 0,
						//						z: 3
					}, ]
				};
				return obj;
			}
		},
		components: {
			'echart-item': echartItem,
		},
		created() {
			this.getEchart();
		},
		methods: {
			routerGo() {
				this.$router.push({
					name: 'crm.saleResourceDetail'
				})
			},

			getEchart() {
				let obj = {
					startDate: this.beforeTime,
					endDate: this.endDate,
					type: 'q'
				}
				crmStatistics.getCompanyFinishRate(obj).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.echartsDate = res.data.data
					}
				}).catch(errors.call(this));
				this.echartsShow = true;

			},
			timeChange(val) {
				this.timeId = val;
				this.endDate = new Date().format('yyyy-MM-dd');
				if(val == 0) {
					this.beforeTime = `${new Date(new Date().setMonth(new Date().getMonth() - val, 1)).format('yyyy-MM')}-01`;
				} else if(val == 12) {
					this.beforeTime = `${new Date().getFullYear()}-01-01`;
				} else {
					this.beforeTime = `${new Date(new Date().setMonth(new Date().getMonth() - val + 1, 1)).format('yyyy-MM')}-01`;
				}
				this.getEchart()
			},
			// getDay(day) {
			// 	var today = new Date();

			// 	var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;

			// 	today.setTime(targetday_milliseconds); //注意，这行是关键代码  

			// 	var tYear = today.getFullYear();
			// 	var tMonth = today.getMonth();
			// 	var tDate = today.getDate();
			// 	tMonth = this.doHandleMonth(tMonth + 1);
			// 	tDate = this.doHandleMonth(tDate);
			// 	return tYear + "-" + tMonth + "-" + tDate;
			// },
			// doHandleMonth(month) {
			// 	var m = month;
			// 	if(month.toString().length == 1) {
			// 		m = "0" + month;
			// 	}
			// 	return m;
			// },
		}
	}
</script>