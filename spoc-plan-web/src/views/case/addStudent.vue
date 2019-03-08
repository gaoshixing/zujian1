<style>
</style>

<template>
	<div class="addStud">
		<add-stud :menuCode="MENUIDS.PLAN"></add-stud>
	</div>
</template>

<script>
	import addStud from "@public/modules/addStudent.vue"
	import {MENUIDS} from "@public/libs/config.js";

	export default{
		data(){
			return {
				MENUIDS,
			}
		},
		components:{
			addStud
		}
	}
</script>
