<style lang="less">
	.performance {
		height: 560px;
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
			padding: 16px 0 0 24px;
			.time_list {
				font-size: 12px;
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				flex-wrap: nowrap;
				padding: 2px 0;
				li {
					list-style: none;
					line-height: 16px;
					&.time_tit {
						min-width: 60px;
						color: #999;
						margin: 2px 0;
						margin-right: 10px;
						text-align: right;
						height: 2em;
						line-height: 2em;
						box-sizing: content-box;
					}
					.time_Opt {
						margin: 2px 0;
						display: inline-block;
						padding: 4px 12px;
						cursor: pointer;
						margin-right: 10px;
						white-space: nowrap;
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
					// display: flex;
					// justify-content: space-between;
					// align-items: center;
					padding-bottom: 8px;
					padding-right: 20px;
					.name {
						display: inline-block;
						width: 56px;
						vertical-align: middle;
						margin: 0 8px;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.percent {
						width: 40px;
						margin-right: 8px;
						white-space: nowrap;
						overflow: hidden;
						vertical-align: middle;
						text-overflow: ellipsis;
						cursor: pointer;
					}
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
					.listInfo{
						cursor: pointer;
						margin-right: 8px;
						.red{
							width: 35px;
							text-align: center;
							white-space: nowrap;
							overflow: hidden;
							vertical-align: middle;
							text-overflow: ellipsis;
							color: #e62c28;
						}
					}
				}
			}
		}
	}
</style>

<template>
	<div class="performance">
		<div class="title_box">
			<div class="box_headline">
				销售签约业绩排名-Top 10
			</div>
			<div class="box_detail" @click="routerGo">
				查看明细 <i class="iconfont icon-youjiantou"></i>
			</div>
		</div>
		<div class="wrap_box">
			<ul class="time_list">
				<li class="time_tit">
					{{signTime.title}}：
				</li>
				<li>
					<div class="time_Opt" v-for="item in signTime.list" @click="timeChange(item.id)" :class="{active:timeId===item.id}" :key="item.id">{{item.label}}</div>
				</li>
			</ul>
			<ul class="time_list">
				<li class="time_tit">
					{{listType.title}}：
				</li>
				<li>
					<div class="time_Opt" v-for="item in listType.list" @click="listChange(item.id)" :class="{active:listId===item.id}" :key="item.id">{{item.label}}</div>
				</li>
			</ul>
			<ul class="topList">
				<li v-for="(item, index) in saleList">
					<span class="num">{{index+1}}</span><span class="name">{{item.name}}</span>
					<span class="percent">
						<Tooltip :content="item.rate+'%'" placement="top">
            				<span class="percent">{{item.rate}}</span>
        				</Tooltip>
						</span><span class="listInfo">
						<Tooltip :content="item.saleSign+'万'" placement="top-end">
            				业绩：<span class="red">{{item.saleSign}}</span>
        				</Tooltip>
						</span>
					<span v-if="listId===1">销售目标：<span class="red">{{item.preSaleTarget}}</span>万</span>
					<span v-if="listId===2">百度资源量：<span class="red">{{item.baiduNum}}</span>个</span>
					<span v-if="listId===3">其他来源量：<span class="red">{{item.notBaiduNum}}</span>个</span>
					
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import valid, { errors, sys, common, crmStatistics, } from '../../libs/request';	
	export default {
		data() {
			return {
				beforeTime: `${new Date(new Date().setMonth(new Date().getMonth())).format('yyyy-MM')}-01`,
				endDate: new Date().format('yyyy-MM-dd'),
				timeId: 0,
				listId: 1,
				saleList: [],
				signTime: {
					title: '统计时间',
					list: [{
							label: '当前月',
							id: 0
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
				listType: {
					title: '统计类型',
					list: [{
						label: '目标完成率',
						id: 1
					}, {
						label: '资源转换率（百度类）',
						id: 2
					}, {
						label: '资源转换率（其他来源）',
						id: 3
					}, ]
				},
			}
		},

		mounted() {
			this.getSaleList()
		},
		
		methods: {
			routerGo() {
				this.$router.push({
					name: 'crm.saleResourceDetail',
				})
			},
			getSaleList() {
				let obj = {
					startTime: this.beforeTime,
					endTime: this.endDate,
				}
				crmStatistics.getTopTenSale(obj).then(valid.call(this)).then(res => {
					if (res) {
						this.saleList = res.data.data
					}
				}).catch(errors.call(this));
				
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
				this.getSaleList()
			},
			listChange(val) {
				this.listId = val;
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