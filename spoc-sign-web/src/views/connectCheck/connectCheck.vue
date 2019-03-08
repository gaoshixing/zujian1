<style>
</style>

<template>
	<div class="connectPreview">
		<connect-check :menuId="menu.SIGN" :mod="'sign'"></connect-check>
	</div>
</template>

<script>
	import connectCheck from "@public/modules/connectCheck.vue"
	import {MENUIDS} from "@public/libs/config.js";
	export default{
		data(){
			return {
				menu:MENUIDS
			}
		},
		components:{
			connectCheck
		}
	}
</script>