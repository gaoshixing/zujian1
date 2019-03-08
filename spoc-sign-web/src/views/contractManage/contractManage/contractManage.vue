<style lang="less">
.sign-contract-manage-container{
	.ivu-table-wrapper{
		border: none;
	}
	.ivu-table:after{
		width: 0;
	}
	.page{
		text-align: center;
		margin-top: 20px;
		margin-bottom: 150px;
	}
	.search-box{
		width: 396px;
		margin: 20px 0;
	}
}
</style>
<template>
	<div class="sign-contract-manage-container">
		<Tabs v-model="tabsValue">
			<TabPane label="待存档" name="1">

			</TabPane>
			<TabPane label="存档合同" name="2">
			</TabPane>
		</Tabs>

		<v-hang v-show="tabsValue==1" ref="hang"></v-hang>
		<v-deposit v-show="tabsValue==2" ref="deposit"></v-deposit>
	</div>
</template>
<script>
import vDeposit from "./component/deposit/vDeposit";
import vHang from "./component/hang/vHang";

export default {
	name:'contractManage',
	data () {
		return {
			tabsValue:'1'
		}
	},
	components: {
		vDeposit,
		vHang
	},
	watch: {
			//切换tabs，调用子组件方法获取数据
		tabsValue(value){
			if(value==1){
				// this.$refs.hang
				// this.$refs.deposit
			}
		}
	}
}
</script>
