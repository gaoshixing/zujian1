<style lang="less">
	.orders {
		.echartbox{
			width: 100%;
			overflow-x: auto;
		}
	}
</style>

<template>
	<div class="orders">
	</div>
</template>

<script>

	export default {
		data() {
			return {
				echartsShow: false,
				
			}
		},
		computed: {
		
		},
		components: {
			
		},
		created() {
			this.getEchart();
		},
		methods: {
			getEchart() {
				this.echartsShow = true;
				// let obj = {
				// 	type: this.listId == 1 ? 'd' : 'q',
				// 	startDate: this.beforeTime,
				// 	endDate: this.endDate,
				// }
				// crmStatistics.everyMonthTel(obj).then(valid.call(this)).then(res => {
				// 	if (res) {
				// 		this.saleList = res.data.data
				// 	}
				// }).catch(errors.call(this));
			},
		}
	}
</script>