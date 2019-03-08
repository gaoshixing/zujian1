<style>
</style>

<template>
	<div class="connectList">
		<connect-list :menuId="menu.SIGN" :mod="'sign'" :isExport='isAdmin||isCeo'></connect-list>
	</div>
</template>

<script>
	import connectList from "@public/modules/connectList.vue"
	import {MENUIDS} from "@public/libs/config.js";
	import { mapState ,mapGetters } from 'vuex';
	
	export default{
		data(){
			return {
				menu:MENUIDS
			}
		},

		computed:{
			...mapGetters('sign',['isAdmin','isCeo']),
		},
		
		components:{
			connectList
		}
	}
</script>