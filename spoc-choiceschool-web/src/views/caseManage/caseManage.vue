<style>
</style>

<template>
	<div class="caseManage">
		<case-manage :pid="menu.CHOICESCHOOL" :mod="'choiceschool'"></case-manage>
	</div>
</template>

<script>
	import caseManage from "@public/modules/caseManage.vue"
	import {MENUIDS} from "@public/libs/config.js";
	export default{
		data(){
			return {
				menu:MENUIDS
			}
		},
		components:{
			caseManage
		}
	}
</script>