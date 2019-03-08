<style lang="less">
	.information {
		height: 200px;
		font-size: 14px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px;
		.info_box {
			flex: 1;
			height: 200px;
			border: 1px #e0e0e0 solid;
			margin: 0 10px;
			padding: 0 14px;
			.info_box_tit {
				line-height: 38px;
				display: flex;
				justify-content: space-between;
				.info_box_headline {
					font-size: 14px;
					color: #999999;
				}
				.info_box_detail {
					font-size: 12px;
					color: #b0b6bf;
					cursor: pointer;
					.icon-youjiantou {
						font-size: 12px;
					}
				}
			}
			.info_box_type {
				margin-top: 6px;
				display: flex;
				justify-content: flex-start;
				align-content: center;
			}
			.merge {
				.num {
					font-size: 18px;
				}
			}
			.info_box_ratio {
				padding-top: 10px;
				font-weight: bold;
				font-size: 12px;
				color: #333333;
				.days {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.daysbox {
						flex: 1;
						line-height: 24px;
						.name {
							font-size: 12px;
							color: #a9a9a9;
						}
						.top {
							color: #e62c28;
							font-size: 12px;
							.icon-shang {
								font-size: 12px;
							}
						}
						.down {
							color: #50cc52;
							font-size: 12px;
							.icon-xia1 {
								font-size: 12px;
							}
						}
					}
				}
				.timeList {
					line-height: 32px;
					.icon-tishi {
						font-size: 16px;
						color: #cccccc;
						cursor: pointer;
					}
					.time_tit {
						color: #a1a1a1;
					}
					.num {
						font-size: 14px;
						color: #494949;
					}
					.ivu-tooltip-inner {
						white-space: normal;
					}
				}
			}
			.info_box_Stock {
				margin-top: 10px;
				border-top: 1px #e0e0e0 solid;
				line-height: 38px;
				white-space: nowrap;
				.stock_tit {
					color: #a1a1a1;
				}
				.num {
					font-size: 14px;
					color: #494949;
				}
			}
		}
	}
</style>

<template>
	<div class="information">
		<div class="info_box">
			<div class="info_box_tit">
				<div class="info_box_headline">
					今日新增资源
				</div>
				<div class="info_box_detail"  @click="viewDetail('crm.newResource')">
					查看明细 <i class="iconfont icon-youjiantou"></i>
				</div>
			</div>
			<RadioGroup v-model="resourcesTodayType" @on-change="resourcesTodayTypeChange" class="info_box_type">
				<Radio label="0">百度类</Radio>
				<Radio label="1">其他来源</Radio>
			</RadioGroup>
			<div class="info_box_ratio">
				<div class="merge"><span class="num">{{newResToday.cus}}</span>个 / <span class="num">{{newResToday.score}}</span>分</div>
				<div class="days">
					<div class="daysbox">
						<div class="name">日环比（量）</div>
						<div class="name">日环比（分值）</div>
					</div>
					<div class="daysbox">
						<div :class="{'top': newResToday.cusChain>=0, 'down':newResToday.cusChain<0}">{{newResToday.cusChain}}<span v-if="newResToday.cusChain != 'NaN'">%</span><i class="iconfont" :class="{'icon-shang': newResToday.cusChain>=0, 'icon-xia1':newResToday.cusChain<0}"></i></div>
						<div :class="{'top': newResToday.scoreChain>=0, 'down':newResToday.scoreChain<0}">{{newResToday.scoreChain}}<span v-if="newResToday.scoreChain != 'NaN'">%</span><i class="iconfont" :class="{'icon-shang': newResToday.scoreChain>=0, 'icon-xia1':newResToday.scoreChain<0}"></i></div>
					</div>
				</div>
			</div>
			<div class="info_box_Stock">
				<span class="stock_tit">未签约资源总计</span> <span class="num">{{newResToday.cusNum}}</span>个 / <span class="num">{{newResToday.scoreNum}}</span>分
			</div>
		</div>
		<div class="info_box">
			<div class="info_box_tit">
				<div class="info_box_headline">
					今日已签客户
				</div>
				<div class="info_box_detail"  @click="viewDetail('crm.contractDetail')">
					查看明细 <i class="iconfont icon-youjiantou"></i>
				</div>
			</div>
			<RadioGroup v-model="signTodayType" @on-change="signTodayTypeChange"  class="info_box_type">
				<Radio label="0">百度类</Radio>
				<Radio label="1">其他来源</Radio>
			</RadioGroup>
			<div class="info_box_ratio">
				<div class="merge"><span class="num">{{signToday.cusOrder}}</span>单 / <span class="num">{{parseFloat((signToday.price/10000).toFixed(2))}}</span>万元</div>
				<div class="days">
					<div class="daysbox">
						<div class="name">月环比（量）</div>
						<div class="name">月环比（金额）</div>
					</div>
					<div class="daysbox">
						<div :class="{'top': signToday.orderChain>=0, 'down':signToday.orderChain<0}">{{signToday.orderChain}}<span v-if="signToday.orderChain != 'NaN'">%</span><i class="iconfont" :class="{'icon-shang': signToday.orderChain>=0, 'icon-xia1':signToday.orderChain<0}"></i></div>
						<div :class="{'top': signToday.priceChain>=0, 'down':signToday.priceChain<0}">{{signToday.priceChain}}<span v-if="signToday.priceChain != 'NaN'">%</span><i class="iconfont" :class="{'icon-shang': signToday.priceChain>=0, 'icon-xia1':signToday.priceChain<0}"></i></div>
					</div>
				</div>
			</div>
			<div class="info_box_Stock">
				<span class="stock_tit">当月累计签单</span> <span class="num">{{signToday.orderNum}}</span>单 / <span class="num">{{parseFloat((signToday.priceNum/10000).toFixed(2))}}</span>万元
			</div>
		</div>
		<div class="info_box">
			<div class="info_box_tit">
				<div class="info_box_headline">
					今日待签客户
				</div>
				<div class="info_box_detail" @click="viewDetail('crm.contractDetail')">
					查看明细 <i class="iconfont icon-youjiantou"></i>
				</div>
			</div>
			<div class="merge"><span class="num">{{unsignToday.cusOrder}}</span>单 / <span class="num">{{parseFloat((unsignToday.price/10000).toFixed(2))}}</span>万元</div>
		</div>
		<div class="info_box">
			<div class="info_box_tit">
				<div class="info_box_headline">
					今日销售电话记录
				</div>
				<div class="info_box_detail" @click="viewDetail('crm.callStatistics')">
					查看明细 <i class="iconfont icon-youjiantou"></i>
				</div>
			</div>
			<div class="info_box_ratio" style="padding: 0;">
				<div class="merge"><span class="num">{{saleTellRecord.toalHour}}</span>小时</div>
				<div class="timeList">
					<p>
						<span class="time_tit">通话次数：</span><span class="num">{{saleTellRecord.saleNum}}次</span>
						<Tooltip content="通话次数包括“拨打且接通的次数”和“来电接听次数”。" placement="top-start" style="display: inline-block;">
							<i class="iconfont icon-tishi"></i>
						</Tooltip>
					</p>
					<p><span class="time_tit">小于15min通话次数：</span><span class="num">{{saleTellRecord.less15}}次</span></p>
				</div>
			</div>
			<div class="info_box_Stock" style="line-height: 54px;">
				<span class="stock_tit">今日销售平均通话时长</span> {{saleTellRecord.every}}小时
			</div>
		</div>
	</div>
</template>

<script>
	import valid, { errors, sys, common, crmStatistics, } from '../../libs/request';
	import { mapState } from 'vuex';

	export default{
		data(){
			return {
				resourcesTodayType: "0", //类型（0百度类 1非百度类）
				signTodayType: "0",
				newResToday: {},
				signToday: {},
				unsignToday: {},
				saleTellRecord: {},
				companyId: '',
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		mounted(){
			this.loadNewResToday()
			this.loadSignToday()
			this.loadUnsignToday()
			this.getSaleTel()
		},
		methods: {
			getSaleTel() {
				let obj = {
					companyId: this.userInfo.companyId,
				}
				crmStatistics.saleTel(obj).then(valid.call(this))
				.then(res => {
					if(res.ok) {
						this.saleTellRecord = res.data.data
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
			},

			viewDetail(routerName){
				if(routerName === 'crm.callStatistics') {
					this.$router.push(
						{
							name: routerName,
							query: {
								companyId: this.userInfo.companyId
							}
						}
					)
					return
				}
				this.$router.push(
					{
						name: routerName
					}
				)
			},
			loadNewResToday(){
				let objectNewResToday = {
					type: this.resourcesTodayType
				}
				crmStatistics.newResToday(objectNewResToday).then(valid.call(this)).then(res => {
					if (res) {
						this.newResToday = res.data.data
					}
				}).catch(errors.call(this));
			},
			loadSignToday(){
				let objectSignToday = {
					type: this.signTodayType,
					startTime: new Date().format('yyyy-MM-dd'),
                	endTime: new Date().format('yyyy-MM-dd'),
				}
				crmStatistics.signToday(objectSignToday).then(valid.call(this)).then(res => {
					if (res) {
						this.signToday = res.data.data
					}
				}).catch(errors.call(this));
			},
			loadUnsignToday(){
				let obj = {
					startTime: new Date().format('yyyy-MM-dd'),
                	endTime: new Date().format('yyyy-MM-dd'),
				}
				crmStatistics.unsignToday(obj).then(valid.call(this)).then(res => {
					if (res) {
						this.unsignToday = res.data.data
					}
				}).catch(errors.call(this));
			},
			resourcesTodayTypeChange(){
				this.loadNewResToday()
			},
			signTodayTypeChange(){
				this.loadSignToday()
			},
		}
	}
</script>