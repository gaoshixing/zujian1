<style>
</style>

<template>
	<div class="addStud">
		<add-stud :menuCode="pId"></add-stud>
	</div>
</template>

<script>
	import addStud from "@public/modules/addStudent.vue"
	export default{
		props: {
			pId: {
				required: true,
			},
		},
		data(){
			return {
				
			}
		},
		components:{
			addStud
		}
	}
</script>
