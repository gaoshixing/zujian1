<style lang="less">
	.orders {
		.echartbox {
			width: 100%;
			overflow-x: auto;
		}
	}
</style>

<template>
	<div class="orders">
		<echart-item res="bar" :data="options" :mstyle="estyle" v-if="echartsShow" class="echartbox" @on-click="echartClick"></echart-item>
	</div>
</template>

<script>
	import echartItem from "../../pond/echartItem.vue";
	import valid, {
		errors,
		crmStatistics,
		sys
	} from '../../../libs/request.js';
	export default {
		props: {
			endDate: {
				type: [Date, String],
				default: () => {
					return new Date().format('yyyy-MM')
				}
			},
			startDate: {
				type: [Date, String],
				default: () => {
					return new Date().format('yyyy-MM')
				}
			}
		},
		data() {
			return {
				echartsShow: false,
				estyle: {
					width: '100%',
					height: '336px'
				},
				options:{}
			}
		},
		computed: {
		},
		components: {
			'echart-item': echartItem,
		},
		created() {
			this.getEchart();
		},
		methods: {
			eOption() {
				let self = this;
				let obj = {
					color: ['#3398DB'],
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						},
						textStyle: {
							fontSize: 12
						},
						formatter: function(datas) {
							var res = '分公司：' + datas[0].name + '<br/>';
							res += '统计时间：' + new Date().format('yyyy-MM') + '<br/>';
							var res1='',res2='',res3='',res4='';
							datas.forEach((v,k)=>{
								if(v.seriesName=='预计分单量'){
									res1=v.marker + v.seriesName + '：' + self.echartList[v.dataIndex].preAllocNum+ '<br/>';
								}
								if(v.seriesName=='实际分单量'){
									res2=v.marker + '实际分单量（百度类）：' + self.echartList[v.dataIndex].iSBaidu + '<br/>';
									res2 += v.marker + '实际分单量（其他来源）：' + self.echartList[v.dataIndex].iSNotBaidu + '<br/>';
								}
								if(v.seriesName=='预计分单分值'){
									res3=v.marker + v.seriesName + '：' +self.echartList[v.dataIndex].preAllocScore + '<br/>';
								}
								if(v.seriesName=='实际分单分值'){
									res4=v.marker + v.seriesName + '：' +self.echartList[v.dataIndex].allocScore + '<br/>';
								}
							})
							res += res1;
							res += res2;
							res += res3;
							res += res4;
							return res;
						}
					},
					legend: {
						type: 'plain',
						top:14,
						orient: 'horizontal',
						selectedMode :false,
						data: ['预计分单量', '实际分单量', '预计分单分值', '实际分单分值'],
						selected: ['预计分单量', '实际分单量', '预计分单分值', '实际分单分值'],
						textStyle: {
							color: '#a9a9a9'
						}
					},
					grid: {
						left: '2%',
						right: '2%',
						bottom: '4%',
						top: '18%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						data: self.officeList,
						axisTick: {
							alignWithLabel: true,
							show: false
						},
						axisLine: {
							show: false
						},
						axisLabel: {
							margin: 20
						}
					}],
					yAxis: [{
						type: 'value',
						name: '(个)',
						axisLine: {
							show: false
						},
						axisTick: {
							show: false,
						},
						minInterval: 1,
					}, {
						type: 'value',
						name: '(分)',
						axisLine: {
							show: false
						},
						axisTick: {
							show: false,
						},
						splitLine: {
							show: false,
						},
						minInterval: 1,
					}],
					series: [{
						name: '实际分单量',
						type: 'bar',
						itemStyle: {
							color: (params) => {
//								if(self.preAllocNumList[params.dataIndex] <= 0&&params.value>0) {
//									return "#ff7433";
//								} else {
//									return "#1ab2ff"
//								}
									return "#1ab2ff"
							},
							barBorderRadius: [2, 2, 0, 0],
						},
						barWidth: '24',
						yAxisIndex: 0,
						stack: '1',
						data: self.allocNumList,
						barGap: 0
						//						z: 3
					}, {
						name: '预计分单量',
						type: 'bar',
						label: {
							show: true,
							position: 'top',
							offset: [-4, 0],
							color: '#1ab2ff',
							formatter: (params) => {
								let num;
								if(obj.series[0].data[params.dataIndex]) {
									num = (obj.series[0].data[params.dataIndex] / self.echartList[params.dataIndex].preAllocNum * 100).toFixed(0)
								} else {
									num = 0
								}
								if(params.value > 0) {
									return `{blu|` + num + `%}`;
								} else if(params.value == 0&&obj.series[0].data[params.dataIndex]!=0) {
									return `{blu|` + 100 + `%}`;
								} else if(params.value == 0&&obj.series[0].data[params.dataIndex]==0) {
									return '';
								} else {
//									return `{org|` + num + `%}`;
									return `{blu|` + num + `%}`;
								}
							},
							rich: {
								org: {
									color: '#ff7433'
								},
								blu: {
									color: '#1ab2ff'
								}
							}
						},
						itemStyle: {
							color: '#d9f2ff',
							barBorderRadius: [2, 2, 0, 0],
						},
						barWidth: '24',
						yAxisIndex: 0,
						stack: '1',
						data: self.preAllocNumList,
						barGap: 0
					}, {
						name: '实际分单分值',
						type: 'bar',
						itemStyle: {
							color: (params) => {
//								if(self.preAllocScoreList[params.dataIndex] <= 0&&params.value>0) {
//									return "#ff7433";
//								} else {
//									return "#2fc25b"
//								}
									return "#2fc25b"
							},
							barBorderRadius: [2, 2, 0, 0]
						},
						barWidth: '24',
						yAxisIndex: 1,
						stack: '2',
						data: self.allocScoreList,
						barGap: 0,
						//						z: 3
					}, {
						name: '预计分单分值',
						type: 'bar',
						label: {
							show: true,
							position: 'top',
							offset: [4, 0],
							formatter: (params) => {
								let num;
								if(obj.series[2].data[params.dataIndex]) {
									num = (obj.series[2].data[params.dataIndex] / self.echartList[params.dataIndex].preAllocScore * 100).toFixed(0);
								} else {
									num = 0;
								}
								if(params.value > 0) {
									return `{gre|` + num + `%}`;
								} else if(params.value == 0&&obj.series[2].data[params.dataIndex]!=0) {
									return `{gre|` + 100 + `%}`;
								}else if(params.value == 0&&obj.series[2].data[params.dataIndex]==0){
									return '';
								}else {
//									return `{org|` + num + `%}`;
									return `{gre|` + num + `%}`;
								}
							},
							rich: {
								org: {
									color: '#ff7433'
								},
								gre: {
									color: '#2fc25b'
								},
							}
						},
						itemStyle: {
							color: '#cef2d9',
							barBorderRadius: [2, 2, 0, 0]
						},
						barWidth: '24',
						stack: '2',
						yAxisIndex: 1,
						data: self.preAllocScoreList,
						barGap: 0
					}]
				};
				this.options = obj;
			},
			getEchart() {
				let params = {
					startTimeScope: new Date(this.startDate).format('yyyy-MM'),
					endTimeScope: new Date(this.endDate).format('yyyy-MM')
				}
				crmStatistics.allocSaturation(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						let list = res.data.data;
						this.echartList = list;
						this.officeList = list.map(item => item.officeName);
						this.allocNumList = list.map(item => item.allocNum < 0 ? 0 : item.allocNum);
						this.allocScoreList = list.map(item => item.allocScore < 0 ? 0 : item.allocScore);
						this.preAllocNumList = list.map(item => (item.preAllocNum - item.allocNum) < 0 ? 0 : (item.preAllocNum - item.allocNum));
						this.preAllocScoreList = list.map(item => (item.preAllocScore - item.allocScore) < 0 ? 0 : (item.preAllocScore - item.allocScore));
						this.eOption();
						this.echartsShow = true;
					}
				}).catch(errors.call(this));
			},
	        echartClick(ind,month,opt){
					this.$emit('on-click', ind, month, opt);
	        }
		},
		watch: {
			endDate: {
				handler(val, oval) {
					this.getEchart();
				},
				deep: true
			},
			startDate: {
				handler(val, oval) {
					this.getEchart();
				},
				deep: true
			},
		}
	}
</script>