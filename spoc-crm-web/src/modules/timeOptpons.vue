<style lang="less">
	.timeOptpons {
		position: relative;
		margin-top: 10px;
		// margin-bottom: -10px;
		.time_tit {
			@h:24px;
			position: absolute;left: 0;top: 0;
			width: 70px;
			color: #999;
			margin-right: 10px;
			text-align: right;
			height: @h;
			line-height: @h;
			box-sizing: border-box;
		}
		.time_list {
			float: left;margin-bottom: 10px;
			font-size: 12px;
			li {
				float: left;
				list-style: none;
				line-height: 16px;
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
		.date-picker{
			float: left;
			// margin-bottom: 10px;
		}
		.ivu-input{
			height: 28px;
		}
	}
</style>

<template>
	<div class="timeOptpons clearfix" :style="'padding-left:'+padding+'px'">
		<span class="time_tit" :style="'width:'+width+'px'">{{timeList.title}}：</span>
		<ul class="time_list">
			<li class="time_Opt" v-for="item in timeList.list" @click="timeChange(item.value)" :class="{active:timeId===item.value}" :key="item.valve">{{item.label}}</li>
		</ul>
		<div class="date-picker" v-if="types == 'data'">
			<DatePicker type="datetime" placeholder="" format="yyyy-MM-dd HH:mm:ss" style="width: 180px" @on-change="onDataPickStart" v-model="beforeTime1"></DatePicker>
			<span style="background-color: rgb(54, 162, 158); display: inline-block; width: 12px; height: 2px;margin: 0 6px;"></span>
			<DatePicker type="datetime" placeholder="" format="yyyy-MM-dd HH:mm:ss" style="width: 180px" @on-change="onDataPickEnd" v-model="afterTime1"></DatePicker>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			timeList: {
				type: Object,
				default: () => {
					return {
						title: '入库时间',
						filter: [{
								label: '入库时间',
								value: '2'
							}, {
								label: '更新动态时间',
								value: '0'
							},
							{
								label: '未更新动态时间',
								value: '1'
							},
						],
						list: [{
								label: '不限',
								value: ''
							},
							{
								label: '今天',
								value: 0
							},
							{
								label: '最近7天',
								value: -7
							},
							{
								label: '最近30天',
								value: -30
							},
						]
					}
				}
			},
			width: {
				type: [Number, String],
				default: () => {
					return '84';
				}
			},
			tid: {
				type: [Number, String],
				default: () => {
					return '';
				},
			},
			types: {
				type: String,
				default: 'data'
			}
		},
		data() {
			return {
				timeId: this.tid,
				beforeTime: '',
				afterTime: '',
				beforeTime1: '',
				afterTime1: '',
				filterId: '',
				filterColor: '',
				padding: Math.ceil(this.width) + 10,
			}
		},
		mounted(){
		},
		methods: {
			onDataPickStart(val) {
				//				this.afterTime1 = new Date(this.getDay(0)).format('yyyy-MM-dd');
				if(val) {
					this.beforeTime1 = new Date(val).format('yyyy-MM-dd hh:mm:ss');
				}else{
					this.beforeTime1 = '';
				}
				if(this.afterTime1) {
					this.afterTime1 = new Date(this.afterTime1).format('yyyy-MM-dd hh:mm:ss');
				}else{
					this.afterTime1 = '';
				}
				this.afterTime = '';
				this.beforeTime = '';
				if(this.beforeTime1 || this.afterTime1) {
					this.timeId = " ";
				} else {
					this.timeId = "";
				}
				this.$emit('onDataPickStart', this.beforeTime1, this.afterTime1);
			},
			onDataPickEnd(val) {
				if(val) {
					this.afterTime1 = new Date(val).format('yyyy-MM-dd hh:mm:ss');
				}else{
					this.afterTime1 = '';
				}
				if(this.beforeTime1) {
					this.beforeTime1 = new Date(this.beforeTime1).format('yyyy-MM-dd hh:mm:ss');
				}else{
					this.beforeTime1 = '';
				}
				this.afterTime = '';
				this.beforeTime = '';
				if(this.beforeTime1 || this.afterTime1) {
					this.timeId = " ";
				} else {
					this.timeId = "";
				}
				console.log(this.beforeTime1)
				this.$emit('onDataPickEnd', this.beforeTime1, this.afterTime1);
			},
			timeChange(val) {
				this.timeId = val;
				this.afterTime1 = '';
				this.beforeTime1 = '';
				this.beforeTime = '';
				this.afterTime = new Date(this.getDay(1)).format('yyyy-MM-dd 00:00:00');
				if(val === '0') {
					let time = new Date();
					time.setHours(0);
					time.setMinutes(0);
					time.setSeconds(0);
					this.beforeTime = time.format('yyyy-MM-dd 00:00:00');
				} else if(val === '') {
					this.beforeTime = '';
				} else {
					this.beforeTime = new Date(this.getDay(val)).format('yyyy-MM-dd 00:00:00');
				}
				this.$emit('timeChange', this.beforeTime, this.afterTime,);
			},
			setTime(val) {
				this.timeId = val;
				this.afterTime1 = '';
				this.beforeTime1 = '';
				this.beforeTime = '';
				this.afterTime = new Date(this.getDay(0)).format('yyyy-MM-dd 00:00:00');
				if(val === '0') {
					let time = new Date();
					time.setHours(0);
					time.setMinutes(0);
					time.setSeconds(0);
					this.beforeTime = time.format('yyyy-MM-dd 00:00:00');
				} else if(val === '') {
					this.beforeTime = '';
				} else {
					this.beforeTime = new Date(this.getDay(val)).format('yyyy-MM-dd 00:00:00');
				}
//				this.$emit('timeChange', this.beforeTime, this.afterTime);
				return {"beforeTime":this.beforeTime,"afterTime":this.afterTime};
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