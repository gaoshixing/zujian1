<style>
</style>

<template>
	<div class="connectList">
		<connect-list :menuId="menu.DOCU" :mod="'docu'"></connect-list>
	</div>
</template>

<script>
	import connectList from "@public/modules/connectList.vue"
	import {MENUIDS} from "@public/libs/config.js";
	export default{
		data(){
			return {
				menu:MENUIDS,
				pId: null,
			}
		},
		components:{
			connectList
		},
	}
</script>