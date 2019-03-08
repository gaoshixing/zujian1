<style>
</style>

<template>
	<div class="connectPreview">
		<import-page :pId="menu.SALARY"></import-page>
	</div>
</template>

<script>
	import importPage from "@public/modules/importPage.vue"
	import {MENUIDS} from "@public/libs/config.js";
	export default{
		data(){
			return {
				menu:MENUIDS
			}
		},
		components:{
			importPage
		}
	}
</script>