<style lang="less">
.entering {
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
			padding: 10px 0;
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
	.btn-and-time-boss{
		font-size: 12px;padding-left: 60px;margin: 10px;
	}
	.cont {
		margin: 0px 10px;
		font-size: 12px;
		.iconfont{
			font-size: 12px;
			color: #cccccc;
		}
		.top{
			color: #FF0000;
			.iconfont{
				color: #FF0000;
			}
		}
		.down{
			color: #50cc52;
			.iconfont{
				color: #50cc52;
			}
		}
		p{
			line-height: 28px;
			.tit{
				color: #a9a9a9;
			}
		}
	}
}
</style>

<template>
<div class="entering">
	<div class="title_box">
		<div class="box_headline">
			客服录入统计
		</div>
		<div class="box_detail" @click="onclickToCustomerServiceLeader">
			查看明细 <i class="iconfont icon-youjiantou"></i>
		</div>
	</div>
	<ul class="time_list">
		<li class="time_tit">
			{{signTime.title}}：
		</li>
		<li class="time_Opt" v-for="item in signTime.list" @click="timeChange(item.id)" :class="{active:timeId == item.id}" :key="item.id">{{item.label}}</li>
	</ul>
	<div class="cont">
		<p><span class="tit">录入资源量：</span>{{ chartsData.insertNum }}</p>
		<p v-if="chartsData.rate != null">
			<span class="tit">日环比：</span>
			<span :class="{'top': chartsData.rate >= 0, 'down': chartsData.rate < 0}">{{ chartsData.rate }} <span v-if="chartsData.rate != 'NaN'">%</span><i class="iconfont" :class="{'icon-shang': chartsData.rate >= 0, 'icon-xia1': chartsData.rate < 0}"></i></span>
		</p>
		<p>
			<span class="tit">有效资源总量：</span>{{ chartsData.effectiveNum }}
			<Tooltip content="有效资源指首电接通且通话30s以上的资源。" placement="top-start" style="display: inline-block;cursor: pointer;">
				<i class="iconfont icon-tishi"></i>
			</Tooltip>
		</p>
		<p>
			<span class="tit">优质资源总量：</span>{{ chartsData.highQualityNum }}
			<Tooltip content="优质资源指2星及以上星级的资源。" placement="top-start" style="display: inline-block;cursor: pointer;">
				<i class="iconfont icon-tishi"></i>
			</Tooltip>
		</p>
	</div>
</div>
</template>

<script>
import echartItem from "../../pond/echartItem.vue";
import { waitUntil, getTimeInterval, } from "@public/libs/util";
import valid, {errors, crmCustomer, sys} from '../../../libs/request.js';

export default {
	data() {
		return {
			beforeTime: new Date().format('yyyy-MM-dd'),
			timeId: 0,
			signTime: {
				title: '统计时间',
				list: [{
						label: '今天',
						id: 0
					}, {
						label: '近7天',
						id: 7
					},
					{
						label: '近30天',
						id: 30
					},
				]
			},
			chartsData: {
				effectiveNum: 0,//有效资源总量
				insertNum: 0,//总数
				highQualityNum: 0,//优质资源总量
				rate: 0,//日环比
			},
		}
	},
	mounted() {
		this.timeChange('0')
	},
	methods: {
		getChartsData() {
			// 获取统计图数据
			let params = {
				startTime: this.beforeTime,
				endTime:  new Date(new Date().setDate(new Date().getDate()+1)).format('yyyy-MM-dd 00:00:00'),
				// endTime:  new Date(new Date().setDate(new Date().getDate())).format('yyyy-MM-dd 00:00:00'),
			}
			crmCustomer.statisticsCustomer(params).then(valid.call(this)).then(res => {
				if(res.ok) {
					let data = res.data.data;
					this.chartsData.effectiveNum = data.effectiveNum ? Number(data.effectiveNum) : 0;
					this.chartsData.insertNum = data.insertNum ? Number(data.insertNum) : 0;
					this.chartsData.highQualityNum = data.highQualityNum ? Number(data.highQualityNum) : 0;
					this.chartsData.rate = data.rate;
				}
			}).catch(errors.call(this));
		},
		/*
		* 日期选择 
		*/
        timeChange(val) {
			this.timeId = val;
			if(val === '0') {
				let time = new Date();
				time.setHours(0);
				time.setMinutes(0);
				time.setSeconds(0);
				this.beforeTime = time.format('yyyy-MM-dd 00:00:00');
			} else if(val === '') {
				this.beforeTime = '';
			} else {
				this.beforeTime = new Date(this.getDay(-val)).format('yyyy-MM-dd 00:00:00');
			}
			this.getChartsData();
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
		/**
		 * 路由跳转
		 */
		onclickToCustomerServiceLeader() {
			this.$router.push({
				name: 'crm.customerServiceLeader',
			});
		},
	}
}
</script>