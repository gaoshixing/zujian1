<style lang="less">
	.information {
		height: 250px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.ivu-tooltip-inner {
			white-space: normal;
		}
		.infoft_box{
			margin: 0 10px;
			flex: 1;
			height: 250px;
			box-shadow: 0 0px 16px 4px #f5fbfb;
		}
	}
</style>

<template>
	<div class="information">
		<entering class="infoft_box"></entering>
		<submenu class="infoft_box"></submenu>
		<tmk class="infoft_box"></tmk>
		<sell class="infoft_box"></sell>
	</div>
</template>

<script>
	import entering from "./infoFoot/entering.vue"
	import submenu from "./infoFoot/submenu.vue"
	import tmk from "./infoFoot/tmk.vue"
	import sell from "./infoFoot/sell.vue"
	export default {
		data() {
			return {
				resourcesToday: "0",
				sign: "0"
			}
		},
		components: {
			entering,
			submenu,
			tmk,
			sell
		}
	}
</script>