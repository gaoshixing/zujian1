<style lang="less">
	.map {
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
				flex: 1;
			}
			.ctgt {
				flex: 1;
				.ivu-table th {
					background: #fff !important;
				}
			}
		}
	}
</style>

<template>
	<div class="map">
		<div class="title_box">
			<div class="box_headline">
				客户地区分布
			</div>
			<div class="box_detail" @click="viewDetail">
				查看明细 <i class="iconfont icon-youjiantou"></i>
			</div>
		</div>
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
				<Table :columns="columns1" :data="data1" height="440"></Table>
			</div>
		</div>
	</div>
</template>

<!--<script type="text/javascript" src="../../assets/china.js"></script>-->
<script>
	let names = [
		'北京','天津','河北','山西',
		'内蒙古','辽宁','吉林','黑龙江','上海','江苏',
		'浙江','安徽','福建','江西','山东','河南',
		'湖北','湖南','广东',	'广西','海南','重庆','四川',
		'贵州','云南','西藏','陕西','甘肃','青海',
		'宁夏','新疆','台湾','香港','澳门',
		'其他']

	import echartItem from "./echartItem.vue";
	import valid, { errors, sys, common, crmStatistics, } from '../../libs/request';
	export default {
		data() {
			return {
				startTime: '',
				endTime: '',
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
						key: 'per'
					},
					{
						title: '资源总量',
						align: 'center',
						key: 'cus'
					},
					{
						title: '签单总量',
						align: 'center',
						key: 'cusOrder'
					},
					{
						title: '签单总金额',
						align: 'center',
						key: 'price'
					}
				],
				data1: [],
				max: 0,
				echartsShow: false,
				estyle: {
					width: '100%',
					height: '450px'
				},
				dataInit:{},
			}
		},
		computed: {
			eOption() {
				let self = this;
				let obj = {
					tooltip: {
						trigger: 'item',
						formatter: function(a){
							let str = '' 
							if(a.data){
								str = a.data.name + '<br>' +
								'签单转化率：' + a.data.per + '%<br>' + 
								'资源总量：' + a.data.cus + '<br>' + 
								'签单总量：' + a.data.cusOrder + '<br>' + 
								'签单总金额：' + a.data.price
							}
							return str
						}
					},
					visualMap: {
						min: 0,
						max: this.max,
						text: ['资源总量：高', '低'],
						realtime: false,
						calculable: true,
						orient:'horizontal',
						inverse:true,
						inRange: {
							color: ['#ebf3fc', '#3385e3']
						},
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
						data: this.data1
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
			initMapDate(){
				let dataInit = {}
				names.forEach((item)=>{
					dataInit[item] = {name: item, cus: 0, cusOrder: 0, price: 0, per: 0, value:0}
				})
				this.dataInit = dataInit
			},
			viewDetail() {
				this.$router.push({
					name: 'crm.mapDetail'
				})
			},
			loadData() {
				let obj = {
					startTime: this.startTime,
					endTime: this.endTime
				}
				crmStatistics.resMap(obj).then(valid.call(this)).then(res => {
					if (res) {
						this.initMapDate()
						let max = 0
						res.data.data.forEach((item,index) => {
							if(item.cus > max){
								max = item.cus
							}
							item.value = item.cus
							this.dataInit[item.name] = item
						})
						let data = []
						for(let key in  this.dataInit) {
							data.push(this.dataInit[key])
						}
						this.data1 =  data.sort((a,b)=>{return a.cus > b.cus ? -1 : 1})
						this.max = max
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