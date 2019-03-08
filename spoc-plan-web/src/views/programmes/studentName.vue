<style lang="less">
	.studentName {
		.name {
			line-height: 22px;
		}
		.tag {
			width: 68px;
			height: 14px;
			line-height: 14px;
			color: #FFF;
			background: #d0d0d0;
			margin: 4px auto;
			border-radius: 2px;
		}
	}
</style>

<template>
	<div class="studentName">
		<p class="name">
			<a href="javascript:void(0);" @click="jumpStudent">{{list.studentName}}</a>
		</p>
		<p class="tag" v-for="(item,index) in list.tagList" :key="item.id">{{item.name}}</p>
	</div>
</template>

<script>
	export default {
		name: 'attach',
		props: {
			'odata': {
				type: Object,
				default: function() {
					return {};
				}
			},
		},
		data() {
			return {

			}
		},
		computed: {
			list() {
				return this.odata;
			}
		},
		methods: {
			jumpStudent() {
				/* this.$router.push({
					name: 'plan.addStudent',
					query: {
						studentId: this.list.studentId,
                        menuId:'401'
					}
				}) */
				const {href} = this.$router.resolve({
					name: 'plan.addStudent',
					query: {
						studentId: this.list.studentId,
                        menuId:'401'
					}
				})
				window.open(href, '_blank')
			}
		}
	}
</script>