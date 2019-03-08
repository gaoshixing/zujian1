<style lang="less">
.tmk-container{
	position: relative;
}
</style>
<template>
	<div class="entering tmk-container">
		<div class="title_box">
			<div class="box_headline">
				TMK工作统计
			</div>
			<div class="box_detail" @click="onclickToTMKLeader">
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
			<p><span class="tit">资源总量：</span>{{ chartsData.total }}</p>
			<p><span class="tit">有效资源总量：</span>{{ chartsData.valid }}
				<Tooltip content="有效资源TMK与当前客户所有通话记录中，有1次通过时长达到30S以上。" placement="top" style="display: inline-block;cursor: pointer;">
					<i class="iconfont icon-tishi"></i>
				</Tooltip>
			</p>
			<p><span class="tit">优质资源总量：</span>{{ chartsData.effective }}
				<Tooltip content="优质资源指被标记为1星及以上星级的资源。" placement="top" style="display: inline-block;cursor: pointer;">
					<i class="iconfont icon-tishi"></i>
				</Tooltip>
			</p>
			<p><span class="tit">成功邀约量：</span>{{ chartsData.invite }}
				<Tooltip content="指TMK成功邀约的资源。" placement="top" style="display: inline-block;cursor: pointer;">
					<i class="iconfont icon-tishi"></i>
				</Tooltip>
			</p>
			<p><span class="tit">实际上门量：</span>{{ chartsData.visit }}
				<Tooltip content="指销售顾问确认实际上门的客户。" placement="top" style="display: inline-block;cursor: pointer;">
					<i class="iconfont icon-tishi"></i>
				</Tooltip>
			</p>
		</div>
	</div>
</template>

<script>

import echartItem from "../../pond/echartItem.vue";
import valid, {errors, crmCustomerTmk, sys} from '../../../libs/request.js';

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
				valid: 0,
				effective: 0,
				total: 0,
				invite: 0,
				visit: 0,
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
				starTime: this.beforeTime,
				endTime:  new Date(new Date().setDate(new Date().getDate()+1)).format('yyyy-MM-dd 00:00:00'),
				// endTime:  new Date(new Date().setDate(new Date().getDate())).format('yyyy-MM-dd 00:00:00'),
			}
			crmCustomerTmk.tmkStatisticsData(params).then(valid.call(this)).then(res => {
				if(res.ok) {
					let data = res.data.data;
					if(data) {
						this.chartsData.valid = data.valid ? Number(data.valid) : 0;
						this.chartsData.effective = data.effective ? Number(data.effective) : 0;
						this.chartsData.total = data.total ? Number(data.total) : 0;
						this.chartsData.invite = data.invite;
						this.chartsData.visit = data.visit;
					}else{
						this.chartsData.valid = 0;
						this.chartsData.effective = 0;
						this.chartsData.total = 0;
						this.chartsData.invite = 0;
						this.chartsData.visit = 0;
					}
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
		onclickToTMKLeader() {
			this.$router.push({
				name: 'crm.TMKLeader',
			});
		},
	}
}
</script>