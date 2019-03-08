<style lang="less">
	.crm_pond {
		border-top: 1px #e0e0e0 solid;
		.pond {
			box-shadow: 0px 5px 8px 8px #f5fbfb;
			border-radius: 4px;
			position: relative;
			.e-chart-section {
				width: 100%;
			}
			.statistics {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 20px 0;
				.info {
					margin: 0 24px;
					color: #666666;
					span {
						font-size: 18px;
						&.num {
							color: #1ab2ff;
						}
						&.score {
							color: #44bcb7;
						}
						&.spill {
							color: #ff7433;
						}
					}
				}
			}
			.icon-ziyuan {
				font-size: 18px;
				position: absolute;
				right: 6px;
				bottom: 6px;
				z-index: 100;
				color: #52c9c0;
			}
		}
		.main {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			padding: 24px 0 80px;
			.m_box {
				width: 50%;
				box-shadow: 0px 5px 8px 8px #f5fbfb;
				.analyseBarFilter {
					line-height: 24px !important;
				}
				.m_title {
					line-height: 42px;
					height: 42px;
					background: #e7ebf1;
					text-align: center;
					color: #44bcb7;
					font-size: 14px;
					border-radius: 4px 4px 0 0;
					.ivu-tabs-bar {
						border: none;
						.ivu-tabs-nav-scroll {
							display: flex;
							justify-content: center;
							align-items: center;
							.ivu-tabs-nav {
								.ivu-tabs-tab {
									color: #999999;
									&.ivu-tabs-tab-active {
										color: #44bcb7;
									}
								}
							}
						}
					}
				}
			}
			.m_lt {
				margin-right: 6px;
			}
			.m_gt {
				margin-left: 6px;
			}
		}
	}
</style>

<template>
	<div class="crm_pond">
		<div class="pond">
			<div class="statistics">
				<div class="info">
					今日资源数量 (已分/总数)&nbsp;<span class="num">{{this.statistics.predictFNumDay}}/{{this.statistics.AddNumDay}}</span>
				</div>
				<div class="info">
					今日资源分值 (已分/总分)&nbsp;<span class="spill">{{this.statistics.predictFScoreDay}}/{{this.statistics.AddScoreDay}}</span>
				</div>
			</div>
			<echart-item res="bar" :data="eOption" :mstyle="estyle" v-if="echartsShow && isHeadcompany"></echart-item>
			<i class="iconfont icon-ziyuan" @click="echartsShow=!echartsShow" style="cursor: pointer;" v-if="isHeadcompany"></i>
		</div>
		<div class="main">
			<div class="m_lt m_box">
				<div class="m_title">
					待分单资源
				</div>
				<wait-box ref="waitBox" @tagChange="tagChange" @synCompany="synCompany" @formArrChange="formArrChange">

				</wait-box>
			</div>
			<div class="m_gt m_box">
				<div class="m_title">
					<Tabs v-model="mGtTab">
						<TabPane label="销售顾问" name="adviser"></TabPane>
						<TabPane label="分公司" name="filiale" v-if="isHeadcompany"></TabPane>
					</Tabs>
				</div>
				<adviser-box ref="adviser" v-if="mGtTab=='adviser'" :tagSelects="tagSelected" :formArr="formArr" @updataRes="updataRes">

				</adviser-box>
				<filiale-box v-else :formArr="formArr" @updataRes="updataRes">

				</filiale-box>
			</div>
		</div>
	</div>
</template>

<script>
	import echartItem from "./echartItem.vue";
	import waitBox from "./waitBox.vue";
	import adviserBox from "./adviserBox.vue";
	import filialeBox from "./filialeBox.vue";
	import { mapState } from 'vuex';
	import valid, {
		errors,
		sys,
		common,
		crmAllocPlan,
		crmAllocResult
	} from "../../libs/request.js";
	export default {
		data() {
			return {
				echartsShow: false,
				statistics: {
					company: {
						predictFNum: [],
						predictFScore: [],
						predictScore: [],
						label: [],
						predictNum: []
					},
					AddNumDay: 0,
					AddScoreDay: 0,
					predictFScoreDay: 0,
					predictFNumDay: 0
				},
				formArr: [],
				tagSelected: [],
				estyle: {
					width: '100%',
					height: '224px'
				},
				mGtTab: 'adviser',
			}
		},
		computed: {
			...mapState(['userInfo']),
			isHeadcompany() {
				if(this.userInfo.companyType == 1 && this.userInfo.companyGrade == 2) {
					return false;
				} else {
					return true;
				}
			},
			eOption() {
				let self = this;
				let obj = {
					color: ['#3398DB'],
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						},
						formatter: function(datas) {
							var res = datas[0].name + '<br/>',
								val;
							for(var i = 0, length = datas.length; i < length; i++) {
								res += "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:" + datas[i].color + ";'></span>"
								if(i % 2 != 0) {
									if(i == 1) {
										val = self.predictNum[datas[i].dataIndex];
									} else {
										val = self.predictScore[datas[i].dataIndex];
									}
								} else {
									val = (datas[i].value);
								}
								res += datas[i].seriesName + '：' + val + '<br/>';
							}
							return res;

						}
					},
					grid: {
						left: '2%',
						right: '2%',
						bottom: '4%',
						top: '12%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						data: this.statistics.company.label,
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
						name: '本月已分资源数',
						type: 'bar',
						itemStyle: {
							color: (params) => {
								if(this.eOption.series[1].data[params.dataIndex] <= 0) {
									return "#ff7433";
								} else {
									return "#1ab2ff"
								}
							},
							barBorderRadius: [2, 2, 0, 0],
						},
						barWidth: '18',
						yAxisIndex: 0,
						stack: '1',
						data: this.statistics.company.predictFNum,
						barGap: 0,
						//						z: 3
					}, {
						name: '本月计划资源数',
						type: 'bar',
						label: {
							show: true,
							position: 'top',
							offset: [-4, -6],
							rotate: 45,
							color: '#1ab2ff',
							formatter: (params) => {
								if(params.value > 0) {
									this.eOption.series[1].label.show = true;
									if(this.predictNum[params.dataIndex]) {
										return `{blu|` + (this.eOption.series[0].data[params.dataIndex] / this.predictNum[params.dataIndex] * 100).toFixed(0) + `%}`;
									} else {
										return '';
									}
								} else {
									this.eOption.series[1].label.show = false;
									if(this.predictNum[params.dataIndex]) {
										return `{org|` + (this.eOption.series[0].data[params.dataIndex] / this.predictNum[params.dataIndex] * 100).toFixed(0) + `%}`;
									} else {
										return '';
									}
								}
							},
							rich: {
								org: {
									color: '#ff7433',
								},
								blu: {
									color: '#1ab2ff',
								}
							},
						},
						itemStyle: {
							color: '#d9f2ff',
							barBorderRadius: [2, 2, 0, 0],
						},
						barWidth: '18',
						yAxisIndex: 0,
						stack: '1',
						data: this.statistics.company.predictNum,
						barGap: 0
					}, {
						name: '本月已分资源分数',
						type: 'bar',
						itemStyle: {
							color: (params) => {
								if(this.eOption.series[3].data[params.dataIndex] <= 0) {
									return "#ff7433";
								} else {
									return "#44bcb7"
								}
							},
							barBorderRadius: [2, 2, 0, 0]
						},
						barWidth: '18',
						yAxisIndex: 1,
						stack: '2',
						data: this.statistics.company.predictFScore,
						barGap: 0,
						//						z: 3
					}, {
						name: '本月计划资源分数',
						type: 'bar',
						label: {
							show: true,
							position: 'top',
							offset: [10, -6],
							rotate: 45,
							formatter: (params) => {
								if(params.value > 0) {
									this.eOption.series[3].label.show = true;
									if(this.predictScore[params.dataIndex] != 0) {
										return `{gre|` + (this.eOption.series[2].data[params.dataIndex] / this.predictScore[params.dataIndex] * 100).toFixed(0) + `%}`;
									} else {
										return '';
									}
								} else {
									this.eOption.series[3].label.show = false;
									if(this.predictScore[params.dataIndex] != 0) {
										return `{org|` + (this.eOption.series[2].data[params.dataIndex] / this.predictScore[params.dataIndex] * 100).toFixed(0) + `%}`;
									} else {
										return '';
									}
								}
							},
							rich: {
								org: {
									color: '#ff7433',
								},
								gre: {
									color: '#44bcb7',
								},
							},
						},
						itemStyle: {
							color: '#c7ebe9',
							barBorderRadius: [2, 2, 0, 0]
						},
						barWidth: '18',
						stack: '2',
						yAxisIndex: 1,
						data: this.statistics.company.predictScore,
						barGap: 0
					}]
				};
				return obj;
			}
		},
		components: {
			'echart-item': echartItem,
			waitBox,
			filialeBox,
			adviserBox
		},
		created() {
			this.getEchart();
			const flush = new Date().format('yyyy-MM-dd hh:mm:ss');
			let t = window.setInterval(() => {
				if(this.$route.name == 'crm.pond') {
					let params = {
						time: flush
					}
					crmAllocResult.getAllocHotInfo(params).then(valid.call(this)).then(res => {
						if(res.ok) {
							if(res.data.data) {
								this.$Message.destroy();
								this.$Message.warning({
									content: res.data.data,
									duration: 0,
									closable: true
								});
							}
						}
					}).catch(errors.call(this));

				}
			}, 1000 * 60)
		},
		beforeDestroy(){
			this.$Message.destroy()
		},
		methods: {
			getEchart() {
				let params = {
					"objectType": "office",
					"orderBy": "sort desc"
				}
				crmAllocPlan.customerStatistic(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						if(this.isHeadcompany) {
							this.predictNum = res.data.data.company.predictNum;
							this.predictScore = res.data.data.company.predictScore;
							let arr = [];
							res.data.data.company.predictNum.forEach((v, k) => {
								let num = Number(v) - Number(res.data.data.company.predictFNum[k]);
								if(num < 0) {
									num = 0;
								}
								arr.push(num);
							})
							res.data.data.company.predictNum = arr;
							let arr2 = [];
							res.data.data.company.predictScore.forEach((v, k) => {
								let num = Number(v) - Number(res.data.data.company.predictFScore[k]);
								if(num < 0) {
									num = 0;
								}
								arr2.push(num);
							})
							res.data.data.company.predictScore = arr2;
						}
						this.statistics = res.data.data;
						this.echartsShow = true;
					}
				}).catch(errors.call(this));
			},
			tagChange(val, arr) {
				val.forEach((v, k) => {
					if(v.title) {
						v.name = v.title;
					}
				})
				this.tagSelected = val;
				this.formArr = arr;
				console.log(val)
			},
			formArrChange(arr) {
				console.log(arr)
				this.formArr = arr;
			},
			updataRes() {
				this.$refs.waitBox.getList();
				this.getEchart();
			},
			synCompany(val) {
				console.log([val])
				this.$refs.adviser.companySelected = [val];
			}
		}
	}
</script>