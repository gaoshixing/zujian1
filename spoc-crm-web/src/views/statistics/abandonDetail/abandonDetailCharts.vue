<style lang="less">
	.abandonDetailCharts {
		overflow: hidden;
		.echartbox {
			width: 50%;
			float: left;
		}
	}
</style>

<template>
	<div class="abandonDetailCharts">
		<echart-item res="bar" :data="eOption" :mstyle="estyle" v-if="echartsShow" class="echartbox"></echart-item>
	</div>
</template>

<script>
	import echartItem from "../../pond/echartItem.vue";
	export default {
		data() {
			return {
				beforeTime: '',
				afterTime: '',
				timeId: 0,
				listId: 1,
				signTime: {
					title: '创建时间',
					list: [{
							label: '今天',
							id: 0
						}, {
							label: '当前月',
							id: 1
						},
						{
							label: '近3个月',
							id: 3
						},
						{
							label: '近6个月',
							id: 6
						},
					]
				},
				listType: {
					title: '类型',
					list: [{
						label: '百度类',
						id: 1
					}, {
						label: '其他来源',
						id: 2
					}, ]
				},
				echartsShow: false,
				estyle: {
					width: '100%',
					height: '224px'
				},
			}
		},
		computed: {
			eOption() {
				let self = this;
				let obj = {
					title: {
						text: "放弃资源总量:\n400",
						x: 'center',
						left:"20%",
						top: "100px",
						textStyle: {
							color: "#a9a8a9",
							fontSize: "14px",
							align:'center'
						},
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						right:'35%',
						top:'middle',
						data: ['0星', '1星',]
					},
					grid: {
						x: 'left'
					},
					series: [{
						name: '访问来源',
						type: 'pie',
						center:['30%','50%'],
						radius: ['55%', '70%'],
						labelLine: {
							normal: {
								show: false
							}
						},
						itemStyle: { // 此配置
							normal: {
							},
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
						data: [{
								value: 220,
								name: '0星'
							},
							{
								value: 40,
								name: '1星'
							},
						]
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
			getEchart() {
				this.echartsShow = true;
			},
			listChange(val) {
				this.listId = val;
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