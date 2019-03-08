<style lang="less">
	.sign_contract_generation_additional_protocols_btn{
		display: inline-block;
		.ivu-btn{
			text-align: left;
			width:170px;
			height: 46px;
			font-size: 14px;
			margin-right: 26px;
			margin-bottom: 15px;
		}
	}
</style>
<template>
	<div class="sign_contract_generation_additional_protocols_btn">
		<Button :type="active?'primary':null" icon="plus-round" @click="selected">{{data.name}}</Button>
	</div>
</template>
<script>
export default {
	name:'additionalProtocols',
	props:{
		itemCardList:{
			type:Array,
			required:true,
		},
		data:{
			type:Object,
			required:true,
		},
	},
	data(){
		return {};
	},
	computed:{
		active(){
			const id = this.data.id;
			const index = this.itemCardList.findIndex(item=>item.id==id);
			return index >=0;
		}
	},
	methods: {
		selected(){
			let active = this.active?false:true;
			this.$emit('on-click',this.data,active);
		}
	}
}
</script>
