<style>
</style>

<template>
	<div class="connectPreview">
		<connect-preview :pId="menu.DOCU"></connect-preview>
	</div>
</template>

<script>
	import connectPreview from "@public/modules/connectPreview.vue"
	import {MENUIDS} from "@public/libs/config.js";
	export default{
		data(){
			return {
				menu:MENUIDS
			}
		},
		components:{
			connectPreview
		}
	}
</script>