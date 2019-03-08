<style lang="less">
	.robList {
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
			padding: 16px 24px 0;
			.time_list {
				font-size: 12px;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 4px 0;
				li {
					list-style: none;
					line-height: 16px;
					&.time_tit {
						width: 60px;
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
			.topList {
				padding-top: 10px;
				li {
					line-height: 26px;
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
					.name {
						width: 150px;
						padding-left: 26px;
					}
				}
			}
		}
	}
</style>

<template>
	<div class="robList">
		<div class="title_box">
			<div class="box_headline">
				销售掉单/抢单排名
				<Tooltip content="通话次数包括“拨打且接通的次数”和“来电接听次数”。" placement="top-start" style="display: inline-block;">
					<i class="iconfont icon-tishi"></i>
					<div slot="content">
						<p>销售掉单率（%）=自动掉单资源数量/分单员实分资源数量。</p>
						<p>销售抢单量，即销售从销售公共库中领取成功的资源数量。（不包括领取后并丢回公共库的资源）</p>
					</div>
				</Tooltip>
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
				<li class="time_Opt" v-for="item in signTime.list" @click="timeChange(item.id)" :class="{active:timeId===item.id}" :key="item.id">{{item.label}}</li>
			</ul>
			<ul class="time_list">
				<li class="time_tit">
					{{listType.title}}：
				</li>
				<li class="time_Opt" v-for="item in listType.list" @click="listChange(item.id)" :class="{active:listId===item.id}" :key="item.id">{{item.label}}</li>
			</ul>
			<ul class="topList">
				<li v-for="(item, index) in saleList">
					<span class="num">{{index+1}}</span><span class="name">{{item.name}}</span>
					<span class="listInfo" v-if="listId==1">{{item.rate}}%，掉落{{item.fallnum}}单</span>
					<span class="listInfo" v-if="listId==2">抢{{item.getnum}}单</span>
					<span class="listInfo" v-if="listId==3">放弃{{item.abandonNum}}单</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {mapMutations} from 'vuex';
	import valid, {
		errors,
		sys,
		common,
		crmStatistics,
	} from '../../libs/request';

	export default {
		data() {
			return {
				beforeTime: new Date().format('yyyy-MM-dd'),
				endDate: new Date(new Date().setDate(new Date().getDate() + 1)).format('yyyy-MM-dd'),
				afterTime: '',
				timeId: 0,
				listId: 1,
				saleList: [],
				signTime: {
					title: '统计时间',
					list: [{
							label: '今天',
							id: 0
						}, {
							label: '最近7天',
							id: 7
						},
						{
							label: '最近30天',
							id: 30
						},
					]
				},
				listType: {
					title: '统计类型',
					list: [{
						label: '掉落',
						id: 1
					},
					{
						label: '抢单',
						id: 2
					},
					{
						label: '放弃',
						id: 3
					},
					
					]
				},
			}
		},

		mounted() {
			this.updateLoadingStatus({isLoading:true});
			this.getSaleList()
		},

		methods: {
			...mapMutations(['updateLoadingStatus']),
			getSaleList() {
				this.updateLoadingStatus({isLoading:true});
				let obj = {
					type: this.listId == 1 ? 'd' : (this.listId == 2) ? 'q' : 'f',
					startDate: this.beforeTime,
					endDate: this.endDate,
				}
				crmStatistics.saleFallRate(obj).then(valid.call(this)).then(res => {
					if(res) {
						this.saleList = res.data.data
					}
				}).catch(errors.call(this)).finally(()=>{
					this.updateLoadingStatus({isLoading:false});
				});
			},

			routerGo() {
				this.$router.push({
					name: 'crm.saleRanking',
				})
			},
			timeChange(val) {
				this.timeId = val;
				if(val === 0) {
					this.beforeTime = new Date().format('yyyy-MM-dd');
					this.endDate = new Date(new Date().setDate(new Date().getDate() + 1)).format('yyyy-MM-dd');
				} else {
					this.endDate = new Date().format('yyyy-MM-dd');
					this.beforeTime = `${new Date(new Date().setDate(new Date().getDate() - val)).format('yyyy-MM-dd')}`;
				}
				this.getSaleList()
			},
			listChange(val) {
				this.listId = val;
				this.getSaleList()
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