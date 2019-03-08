<style lang="less">
	
</style>

<template>
	<newspaper :edit="edit"></newspaper>
</template>

<script>

	import newspaper from '../../../modules/newspaper';

	export default {
		data() {
			return {
				edit: false
			}
		},
		components: {
			newspaper
		},
		methods: {
			
		}
	}
</script>