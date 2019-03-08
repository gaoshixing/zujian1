<style lang="less">
.sell-container{
	position: relative;
}
</style>
<template>
	<div class="entering sell-container">
		<div class="title_box">
			<div class="box_headline">
				销售点评统计
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
		<div class="cont">
			<p><span class="tit">点评总次数：</span>{{dataMain.reviewCount}}</p>
			<p><span class="tit">发起点评总人数：</span>{{dataMain.reviewerCount}}</p>
		</div>
	</div>
</template>

<script>
    import valid, { errors, common, sys, STATISTICSC } from "../../../libs/request";
	import echartItem from "../../pond/echartItem.vue";
	export default {
		data() {
			return {
				dataMain: {},
				beforeTime: '',
				afterTime: '',
				timeId: 1,
				signTime: {
					title: '统计时间',
					list: [{
							label: '今天',
							id: 1
						}, {
							label: '近7天',
							id: 3
						},
						{
							label: '近30天',
							id: 6
						},
					]
				},
			}
		},
		computed: {},
		components: {},
		created() {
			this.getEchart();
		},
		mounted() {
			this.getReviewBar()
		},

		methods: {
			routerGo() {
				this.$router.push({
					name: 'crm.statisticsComment'
				})
			},

			getReviewBar() {
                let obj = {
                    timeType: this.timeId == 1 ? 0 : this.timeId == 3 ? 7 : this.timeId == 6 ? 30 : '',
                    // startTime: this.startTimeV,
                    // endTime: this.endTimeV,
                }

                STATISTICSC.reviewBar(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
						// console.log(res.data.data)
                        this.dataMain = res.data.data
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },

			getEchart() {},
			timeChange(val) {
				this.timeId = val;
				this.getReviewBar()
				// if(val === '0') {
				// 	let time = new Date();
				// 	time.setHours(0);
				// 	time.setMinutes(0);
				// 	time.setSeconds(0);
				// 	this.beforeTime = time.format('yyyy-MM-dd');
				// } else if(val === '') {
				// 	this.beforeTime = '';
				// } else {
				// 	this.beforeTime = new Date(this.getDay(val)).format('yyyy-MM-dd');
				// }
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