<template>
	<div class="top-title">
		<span>{{title}}</span>
		<Button 
			@click="onclickButton"
			type="primary">{{btnVal}}</Button>
	</div>
</template>

<script>
export default {
	name: 'TopTitle',
	props: {
		title: {
			type: String,
			required: true,
		},
		btnVal: {
			type: String,
			required: true,
		},
	},
	methods: {
		onclickButton() {
			this.$emit('onclickButton');
		},
	},
};
</script>

<style lang="less">
	.top-title {
		display: flex;
		display: -webkit-flex;
		margin-top: 26px;
		margin-right: 20px;
		margin-bottom: 18px;
		height: 30px;
		justify-content: space-between;
		> span {
			color: #333;
			font-size: 16px;
			font-weight: bold;
			line-height: 40px;
		}
	}
</style>
