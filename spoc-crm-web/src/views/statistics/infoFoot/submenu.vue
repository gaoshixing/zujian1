<style lang="less">
.submenu-container{
	position: relative;
}
</style>

<template>
	<div class="entering submenu-container">
		<div class="title_box">
			<div class="box_headline">
				分单统计
			</div>
			<div class="box_detail" @click="onclickToSubmenLeader">
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
			<p><span class="tit">分单总量：</span>{{allocList.allocNumm}}</p>
			<p><span class="tit">人均分单量：</span>{{allocList.perAllocNum}}</p>
			<p><span class="tit">人均分单效率：</span>{{allocList.perAllocRate}} 分钟
				<Tooltip content="" placement="top-start" style="display: inline-block;cursor: pointer;">
					<i class="iconfont icon-tishi"></i>
				        <div slot="content">
				            <p>分单效率=分单总时长/分单资源量</p>
				            <p>分单时长=分单时间-录入时间</p>
				        </div>
				</Tooltip>
			</p>
		</div>
	</div>
</template>

<script>
	import echartItem from "../../pond/echartItem.vue";
	import valid, {
		errors,
		crmAllocResult,
		sys
	} from '../../../libs/request.js';
	export default {
		data() {
			return {
				beforeTime: new Date().format('yyyy-MM-dd'),
				timeId: 0,
				signTime: {
					title: '分单时间',
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
				allocList:{}
			}
		},
		computed: {},
		components: {},
		created() {
			this.getList();
		},
		methods: {
			getList() {
				let params = {
					startAllocTime: this.beforeTime,
					endAllocTime:  new Date(new Date().setDate(new Date().getDate()+1)).format('yyyy-MM-dd 00:00:00')
				}
				crmAllocResult.statisticsAlloc(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.allocList=res.data.data;
					}
				}).catch(errors.call(this));
			},
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
				this.getList();
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
			onclickToSubmenLeader() {
				this.$router.push({
					name: 'crm.submenuLeader',
				});
			},
		}
	}
</script>