<style lang="less">
	.statistics {
		.icon-youjiantou {
			font-size: 12px !important;
			color: #999999;
		}
		border-top: #e0e0e0 1px solid;
		padding-bottom: 40px;
		.info_wrap {
			box-shadow: 0 0px 16px 4px #f5fbfb;
			margin-top: 30px;
			/*padding-bottom: 24px;*/
			.statistics_title {
				height:50px;
				line-height: 50px;
				font-size: 12px;
				text-align: center;
				position: relative;
				padding: 0 20px;
				.headline {
					font-size: 16px;
					position: absolute;
					left: 20px;
				}
				.num {
					font-size: 16px;
					color: #44bcb7;
				}
				.times {
					position: absolute;
					right: 20px;
					color: #999999;
					cursor: pointer;
				}
			}
		}
		.order_wrap {
			margin-top: 30px;
			display: flex;
			justify-content: space-between;
			.orders_lf {
				flex: 1;
				box-shadow: 0 0px 16px 4px #f5fbfb;
			}
			.orders_gt {
				margin-left: 30px;
				box-shadow: 0 0px 16px 4px #f5fbfb;
			}
		}
		.show_wrap {
			margin-top: 30px;
			display: flex;
			justify-content: space-between;
			.show_box {
				margin: 0 15px;
				flex: 1;
				box-shadow: 0 0px 16px 4px #f5fbfb;
				height: 338px;
			}
		}
		.sign_wrap{
			margin-top: 30px;
			display: flex;
			justify-content: space-between;
			.show_box {
				margin: 0 15px;
				box-shadow: 0 0px 16px 4px #f5fbfb;
				height: 560px;
				&.sign_top{
					flex: 1;
				}
				&.sign_btm{
					width: 376px;
				}
			}
		}
		.map_wrap{
			margin: 30px 15px 0;
			display: flex;
			justify-content: space-between;
			box-shadow: 0 0px 16px 4px #f5fbfb;
			.show_box {
				width: 100%;
			}
		}
	}
</style>

<template>
	<div class="statistics">
		<div v-if="!isSalePage">
			<div class="info_wrap" v-if="isBranchOfficeLeader||isHeaderOfficeLeader||isCeo||isAdmin">
				<div class="statistics_title" v-if="isCeo||isAdmin">
					<span class="headline">今日最新</span><div style="display: inline-block;position: relative;width: 100%;"><span>当前总消费总计 <span class="num" v-html="count.cost"></span> 万元，留电量总计 <span class="num" v-html="count.phoneNum"></span> 个，平均留电率 <span class="num" v-html="count.phoneRate + '%'"></span> ，平均留电成本 <span class="num" v-html="count.phoneCost"></span> 元。
					<span class="times" @click="jump('newspaper')">今日时报 <i class="iconfont icon-youjiantou"></i></span></span></div>
				</div>
				<infor-mation></infor-mation>
			</div>
			<div class="order_wrap" v-if="isBranchOfficeLeader||isHeaderOfficeLeader||isCeo||isAdmin">
				<orders class="orders_lf"></orders>
				<rob-list class="orders_gt"></rob-list>
			</div>
			<div class="show_wrap" v-if="isCeo||isAdmin">
				<cdn class="show_box"></cdn>
				<funnel class="show_box"></funnel>
				<abandon class="show_box"></abandon>
			</div>
			<div class="sign_wrap" v-if="isBranchOfficeLeader||isHeaderOfficeLeader||isCeo||isAdmin">
				<branch-sign class="show_box sign_top"></branch-sign>
				<perform class="show_box sign_btm"></perform>
			</div>
			<div class="map_wrap" v-if="isCeo||isAdmin">
				<chinamap class="show_box"></chinamap>
			</div>
			<div class="info_foot" v-if="isCeo||isAdmin">
				<infofoot></infofoot>
			</div>
		</div>
		<div v-else>
			<statistics :pid='userInfo.id'></statistics>
		</div>
	</div>
</template>

<script>
	import inforMation from "./information.vue";
	import robList from "./robList.vue";
	import orders from "./orders.vue";
	import cdn from "./cdn.vue";
	import funnel from "./funnel.vue";
	import abandon from "./abandon.vue";
	import branchSign from "./branchSign.vue";
	import perform from "./performance.vue";
	import chinamap from "./map.vue";
	import infofoot from "./infoFoot.vue";
	import statistics from "./sales/statistics.vue";
	import { mapMutations, mapState, mapGetters, } from "vuex";
	import valid, {errors, crmStatistics} from '../../libs/request.js';
	
	export default {
		data() {
			return {
				count: {},

			}
		},
		computed:{
        	...mapState(['userInfo']),
			...mapGetters('crm', ['isAdmin','isCeo', 'isWorker', 'isTMK', 'isTMKLeader', 'isMarket', 'isMarketLeader', 'isSaler', 'isSalerLeader', 'isBranchOfficeLeader', 'isHeaderOfficeLeader']),
			isSalePage() {
				if(this.isSalerLeader||this.isSaler) {
					return true
				}
				return false
			}
		},
		components: {
			inforMation,
			orders,
			robList,
			cdn,
			funnel,
			abandon,
			branchSign,
			perform,
			chinamap,
			infofoot,
			statistics
		},
		created(){
		},
		mounted(){
			this.getSeoReportHour();
		},
		methods:{
			getSeoReportHour() {
				let day = new Date();
				let newDay = day.getFullYear() + '-' + (day.getMonth()+1) + '-' + day.getDate();
				let params = {
					day: newDay
				}
				crmStatistics.seoReportHour(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.count = res.data.data;
					}
				}).catch(errors.call(this));
			},
			jump(val){
				this.$router.push({name:'crm.'+val,query:{}});
			}
		}
	}
</script>