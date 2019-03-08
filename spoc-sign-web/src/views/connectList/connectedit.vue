<style>
</style>

<template>
	<div class="connectPreview">
		<connect-edit  :pId="menu.SIGN"></connect-edit>
	</div>
</template>

<script>
	import connectEdit from "@public/modules/connectedit.vue"
	import {MENUIDS} from "@public/libs/config.js";
	export default{
		data(){
			return {
				menu:MENUIDS
			}
		},
		components:{
			connectEdit
		}
	}
</script>