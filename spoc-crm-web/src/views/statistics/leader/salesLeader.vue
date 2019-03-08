<style lang="less">
	.statistics {
		border-top: #e0e0e0 1px solid;
		.info_wrap {
			box-shadow: 0 0px 16px 4px #f5fbfb;
			margin-top: 30px;
			padding-bottom: 24px;
			.statistics_title {
				line-height: 50px;
				font-size: 12px;
				text-align: center;
				position: relative;
				padding: 0 20px;zoom: 1;
				&::before,&::after{
					content: "";clear: both;display: table;height: 0;line-height: 0;font-size: 0;
				}
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
					.icon-youjiantou {
						font-size: 12px;
						color: #999999;
					}
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
		<div class="info_wrap">
			<div class="statistics_title">
				<span class="headline">今日最新</span>
				<span class="times">今日时报 <i class="iconfont icon-youjiantou"></i></span>
			</div>
			<infor-mation></infor-mation>
		</div>
		<div class="order_wrap">
			<orders class="orders_lf"></orders>
			<rob-list class="orders_gt"></rob-list>
		</div>
		<div class="sign_wrap">
			<branch-sign class="show_box sign_top"></branch-sign>
			<perform class="show_box sign_btm"></perform>
		</div>
	</div>
</template>

<script>
	import inforMation from "../information.vue";
	import robList from "../robList.vue";
	import orders from "../orders.vue";
	import branchSign from "../branchSign.vue";
	import perform from "../performance.vue";
	
	export default {
		data() {
			return {

			}
		},
		components: {
			inforMation,
			orders,
			robList,
			branchSign,
			perform,
		}
	}
</script>