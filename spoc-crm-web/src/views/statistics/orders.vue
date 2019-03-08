<style lang="less">
	.orders {
		overflow: hidden;
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
	<div class="orders">
		<div class="title_box">
			<div class="box_headline">
				分单饱和度分析
				<Tooltip content="通话次数包括“拨打且接通的次数”和“来电接听次数”。" placement="top-start" style="display: inline-block;">
					<i class="iconfont icon-tishi"></i>
        			<div class="api" slot="content">
        				<p>预计分单量：指统计时间内分公司预计分单资源数量。</p>
						<p>实际分单量：指统计时间内分公司实际被分单资源数量。</p>
						<p>预计分单分值：指统计时间内分公司预计分单资源分值。</p>
						<p>实际分单量：指统计时间内分公司实际被分单资源分值。</p>
        			</div>
				</Tooltip>
			</div>
			<div class="box_detail" @click="jump">
				查看明细 <i class="iconfont icon-youjiantou"></i>
			</div>
		</div>
		<ul class="time_list">
			<li class="time_tit">
				{{signTime.title}}：
			</li>
			<li class="time_Opt" v-for="(item,index) in signTime.list" @click="timeChange(item.id,item.val)" :class="{active:timeId===item.val}" :key="index">{{item.label}}</li>
		</ul>
		<echart-item :startDate="beforeTime" :endDate="new Date().format('yyyy-MM')"></echart-item>
	</div>
</template>

<script>
	import echartItem from "./saturation/saturationCharts.vue";
	import valid, {
		errors,
		crmStatistics,
		sys
	} from '../../libs/request.js';

	export default {
		data() {
			return {
				beforeTime: new Date().format('yyyy-MM'),
				timeId: 0,
				signTime: {
					title: '分单时间',
					list: [{
							label: '当前月',
							id: new Date().getMonth(),
							val:0
						}, {
							label: '近3个月',
							id: new Date().getMonth()-3,
							val:3
						},
						{
							label: '近6个月',
							id: new Date().getMonth()-6,
							val:6
						},
						{
							label: '今年',
							id: 0,
							val:12
						},
					]
				},
				officeList: [],
				echartList:[],
				allocNumList:[],
				allocScoreList:[],
				preAllocNumList:[],
				preAllocScoreList:[],
			}
		},
		computed: {
		},
		components: {
			'echart-item': echartItem,
		},
		created() {
		},
		methods: {
			timeChange(id,val) {
				this.timeId = val;
				let time=new Date();
				this.beforeTime=new Date(time.setMonth(id)).format('yyyy-MM');
			},
			jump(){
				this.$router.push({name:'crm.saturation',query:{}})
			}
		}
	}
</script>