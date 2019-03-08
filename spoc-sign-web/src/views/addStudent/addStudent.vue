<style>
</style>

<template>
	<div class="addStud">
		<add-stud :menuCode="this.$route.query.menuId"></add-stud>
	</div>
</template>

<script>
	import addStud from "@public/modules/addStudent.vue"
	export default{
		data(){
			return {
				
			}
		},
		components:{
			addStud
		}
	}
</script>
