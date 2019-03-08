<style lang="less">
	.news {
		padding: 0 15px;
		.tabs {
			font-size: 14px;
			.ivu-tabs-bar {
				padding: 0 14px;
			}
		}
	}
</style>

<template>
	<div class="news">
		<Tabs @on-click="tabChange" v-model="tabNume" class="tabs" :animated="false">
			<TabPane label="通知列表" name="list"></TabPane>
			<TabPane label="接收设置" name="setup"></TabPane>
		</Tabs>
		<router-view @markRead="markRead"></router-view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tabNume: 'list',
			}
		},
		computed: {
			_url() {
				return this.$route.query.name;
			}
		},
		created() {
			if(this.$route.query.name != 'portal.newSet') {
				this.tabNume = 'list';
				this.$router.push({
					name: 'portal.newsList'
				});
			} else {
				this.tabNume = 'setup';
				this.$router.push({
					name: 'portal.newSet'
				});
			}
		},
		methods: {
			tabChange(val) {
				let urlName = '';
				if(val == 'list') {
					urlName = 'portal.newsList';
				} else {
					urlName = 'portal.newSet';
				}
				this.$router.push({
					name: urlName,
					query: {}
				});
			},
			markRead() {
				this.$emit('markRead');
			}
		},
		watch: {
			_url: {
				handler: function() {
					this.$router.push({
						name: this._url,
						query: {}
					});
				},
				deep: true
			}
		}
	}
</script>