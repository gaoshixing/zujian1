<style lang="less">
	.mapCharts {
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
		.content {
			display: flex;
			justify-content: space-between;
			.ctlt {
				width: 530px;
				flex: 1;
			}
			.ctgt {
				.ivu-table th {
					background: #fff !important;
				}
			}
		}
	}
</style>

<template>
	<div class="mapCharts">
		<ul class="time_list">
			<li class="time_tit">
				{{signTime.title}}：
			</li>
			<li class="time_Opt" v-for="item in signTime.list" @click="timeChange(item.id)" :class="{active:timeId===item.id}" :key="item.id">{{item.label}}</li>
		</ul>
		<div class="content">
			<div class="ctlt">
				<echart-item res="bar" :data="eOption" :mstyle="estyle" v-if="echartsShow" class="echartbox"></echart-item>
			</div>
			<div class="ctgt">
				<Table :columns="columns1" :data="data1"></Table>
			</div>
		</div>
	</div>
</template>

<!--<script type="text/javascript" src="../../assets/china.js"></script>-->
<script>
	import echartItem from "../echartItem.vue";
	export default {
		data() {
			return {
				beforeTime: '',
				afterTime: '',
				timeId: 0,
				signTime: {
					title: '统计时间',
					list: [{
							label: '至今',
							id: 0
						}, {
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
				columns1: [{
						type: 'index',
						width: 60,
						align: 'center'
					},
					{
						title: '省份',
						align: 'center',
						key: 'name'
					},
					{
						title: '签单转化率',
						align: 'center',
						key: 'conversion'
					},
					{
						title: '资源总量',
						align: 'center',
						key: 'gross'
					},
					{
						title: '签单总量',
						align: 'center',
						key: 'quantum'
					},
					{
						title: '签单总金额',
						align: 'center',
						key: 'money'
					}
				],
				data1: [{
						name: '北京',
						conversion: '80%',
						gross: '2000',
						quantum: '2016',
						money: '1000万元',
					},
					{
						name: '浙江',
						conversion: '80%',
						gross: '2000',
						quantum: '2016',
						money: '1000万元',
					},
					{
						name: '广东',
						conversion: '80%',
						gross: '2000',
						quantum: '2016',
						money: '1000万元',
					},
					{
						name: '山东',
						conversion: '80%',
						gross: '2000',
						quantum: '2016',
						money: '1000万元',
					},
					{
						name: '河北',
						conversion: '80%',
						gross: '2000',
						quantum: '2016',
						money: '1000万元',
					},
					{
						name: '天津',
						conversion: '80%',
						gross: '2000',
						quantum: '2016',
						money: '1000万元',
					},
					{
						name: '山西',
						conversion: '80%',
						gross: '2000',
						quantum: '2016',
						money: '1000万元',
					},
					{
						name: '江苏',
						conversion: '80%',
						gross: '2000',
						quantum: '2016',
						money: '1000万元',
					},
					{
						name: '上海',
						conversion: '80%',
						gross: '2000',
						quantum: '2016',
						money: '1000万元',
					},
				],
				echartsShow: false,
				estyle: {
					width: '100%',
					height: '450px'
				},
			}
		},
		computed: {
			eOption() {
				let self = this;

				function randomData() {
					return Math.round(Math.random() * 500);
				}

				var mydata = [{
						name: '北京',
						value: randomData()
					}, {
						name: '天津',
						value: randomData()
					},
					{
						name: '上海',
						value: randomData()
					}, {
						name: '重庆',
						value: randomData()
					},
					{
						name: '河北',
						value: randomData()
					}, {
						name: '河南',
						value: randomData()
					},
					{
						name: '云南',
						value: randomData()
					}, {
						name: '辽宁',
						value: randomData()
					},
					{
						name: '黑龙江',
						value: randomData()
					}, {
						name: '湖南',
						value: randomData()
					},
					{
						name: '安徽',
						value: randomData()
					}, {
						name: '山东',
						value: randomData()
					},
					{
						name: '新疆',
						value: randomData()
					}, {
						name: '江苏',
						value: randomData()
					},
					{
						name: '浙江',
						value: randomData()
					}, {
						name: '江西',
						value: randomData()
					},
					{
						name: '湖北',
						value: randomData()
					}, {
						name: '广西',
						value: randomData()
					},
					{
						name: '甘肃',
						value: randomData()
					}, {
						name: '山西',
						value: randomData()
					},
					{
						name: '内蒙古',
						value: randomData()
					}, {
						name: '陕西',
						value: randomData()
					},
					{
						name: '吉林',
						value: randomData()
					}, {
						name: '福建',
						value: randomData()
					},
					{
						name: '贵州',
						value: randomData()
					}, {
						name: '广东',
						value: randomData()
					},
					{
						name: '青海',
						value: randomData()
					}, {
						name: '西藏',
						value: randomData()
					},
					{
						name: '四川',
						value: randomData()
					}, {
						name: '宁夏',
						value: randomData()
					},
					{
						name: '海南',
						value: randomData()
					}, {
						name: '台湾',
						value: randomData()
					},
					{
						name: '香港',
						value: randomData()
					}, {
						name: '澳门',
						value: randomData()
					}
				];
				let obj = {
					tooltip: {
						trigger: 'item',
						formatter: '{b}<br/>{c}'
					},
					visualMap: {
						min: 0,
						max: 500,
						text: ['High', 'Low'],
						realtime: false,
						calculable: true,
						orient:'horizontal',
						inverse:true,
						inRange: {
							color: ['#ebf3fc', '#3385e3']
						}
					},
					series: [{
						name: '',
						type: 'map',
						mapType: 'china',
						label: {
							normal: {
								show: false
							},
							emphasis: {
								show: false
							}
						},
						data: mydata
					}]
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
			viewDetail() {
				this.$router.push({
					name: 'crm.mapDetail'
				})
			},
			getEchart() {
				this.echartsShow = true;
			},
			timeChange(val) {
				this.timeId = val;
				if(val === '0') {
					let time = new Date();
					time.setHours(0);
					time.setMinutes(0);
					time.setSeconds(0);
					this.beforeTime = time.format('yyyy-MM-dd');
				} else if(val === '') {
					this.beforeTime = '';
				} else {
					this.beforeTime = new Date(this.getDay(val)).format('yyyy-MM-dd');
				}
			},
			getDay(day) {
				var today = new Date();

				var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;

				today.setTime(targetday_milliseconds); //注意，这行是关键代码  

				var tYear = today.getFullYear();
				var tMonth = today.getMonth();
				var tDate = today.getDate();
				tMonth = this.doHandleMonth(tMonth + 1);
				tDate = this.doHandleMonth(tDate);
				return tYear + "-" + tMonth + "-" + tDate;
			},
			doHandleMonth(month) {
				var m = month;
				if(month.toString().length == 1) {
					m = "0" + month;
				}
				return m;
			},
		}
	}
</script>