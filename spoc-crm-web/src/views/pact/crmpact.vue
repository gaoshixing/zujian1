<style lang="less">

</style>
<template>
	<crmpact @jump="formTo" />
</template>
<script>
	export default {
		data() {
			return {}
		},
		components: {
			crmpact: () =>
				import('../../../../spoc-sign-web/src/views/library/pact/pact.vue')
		},
		methods: {
			formTo(url, info, id) {
				this.$router.push({
					name: url,
					query: {
						show: info,
						'id': id
					}
				})
			}
		}
	}
</script>