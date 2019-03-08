<style>
</style>

<template>
	<div class="connectPreview">
		<connect-edit :pId="pId"></connect-edit>
	</div>
</template>

<script>
	import connectEdit from "@public/modules/connectedit.vue"
	import {MENUIDS} from "@public/libs/config.js";
	export default{
		data(){
			return {
				menu:MENUIDS,
				pId: null,
			}
		},
		components:{
			connectEdit
		},
		created(){
			this.pId = MENUIDS.DOCU;
			console.log(this.pId)
		},
	}
</script>