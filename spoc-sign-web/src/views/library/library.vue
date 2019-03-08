<style lang="less">
	.library {
		border-top: 1px solid #e0e0e0;
	}
</style>

<template>
	<div class="library">
		<router-view @jump="formTo">
		</router-view>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
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