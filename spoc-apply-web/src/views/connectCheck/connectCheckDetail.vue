<style>
</style>

<template>
	<div class="connectPreview">
		<check-detail :pId="menu.APPLY"></check-detail>
	</div>
</template>

<script>
	import checkDetail from "@public/modules/connectCheckDetail.vue"
	import {MENUIDS} from "@public/libs/config.js";
	export default{
		data(){
			return {
				menu:MENUIDS
			}
		},
		components:{
			checkDetail
		}
	}
</script>