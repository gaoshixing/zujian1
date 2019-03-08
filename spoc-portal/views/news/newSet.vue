<style lang="less">
	.news {
		position: relative;
		font-size: 14px;
		.warn {
			margin-top: 20px;
			border: 1px #e0e0e0 solid;
			line-height: 52px;
			background-color: #fafafa;
			padding-left: 12px;
			padding-right: 30px;
			.btn {
				float: right;
				margin-top: 10px;
			}
		}
		.table {
			margin-top: 20px;
			border: none;
			th {
				background: none;
			}
		}
		.page-box {
			display: flex;
			justify-content: center;
			margin-top: 14px;
			padding-bottom: 150px;
		}
		.menu {
			position: absolute;
			right: 0px;
			line-height: 34px;
			.icon-shaixuanguolv {
				cursor: pointer;
			}
		}
		#myMenu{
			top: -40px;
		}
		.shade {
			position: absolute;
			z-index: 99;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: #fff;
			.demo-spin-icon-load {
				animation: ani-demo-spin 1s linear infinite;
			}
			@keyframes ani-demo-spin {
				from {
					transform: rotate(0deg);
				}
				50% {
					transform: rotate(180deg);
				}
				to {
					transform: rotate(360deg);
				}
			}
			.demo-spin-col {
				height: 100vh;
				position: relative;
			}
		}
	}
</style>

<template>
	<div class="news">
		<div class="menu" id="myMenu" v-show="!loadingShow">
			<span>
				应用模块：<span>{{menu}}</span>&emsp;
			</span>
			<filters @doFilter="doFilter" @createFilter="createFilter"></filters>
		</div>
		<p class="warn"  v-show="!loadingShow"><b>提醒</b>：您可以为每类消息设置是否接收，为防止重要信息遗漏，建议设置全部接收。
			<!--<Button type="primary" class="btn">设置通知接收人</Button>-->
		</p>
		<Table ref="selection" :columns="columns4" :data="setList" class="table" v-if="bTit && isShowTable"></Table>
		<div class="page-box" v-show="count>10">
			<div style="margin: auto;display: inline-block;">
				<Page :total="count" :current="1" show-total :show-sizer="count>10" show-elevator @on-change="pageChange" @on-page-size-change="sizeChange"></Page>
			</div>
		</div>
		<div class="shade" v-if="loadingShow">
			<div class="demo-spin-col">
				<Spin fix size="large">
					<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
					<div>Loading</div>
				</Spin>
			</div>
		</div>
	</div>
</template>

<script>
	import filters from "../../modules/filter.vue";
	import valid, {
		errors,
		infoSet
	} from "../../libs/request.js";
	import { mapMutations } from 'vuex';
	export default {
		data() {
			return {
				loadingShow: true,
				count: 0,
				menu: '',
				menuId: '',
				pageNo: 1,
				pageSize: 10,
				columns4: [{
						title: '通知类型',
						key: 'configName',
					},
					{
						key: 'bool1',
						align: 'left',
						renderHeader: (h, params) => {
							let self = this;
							return h('div', {}, [
								h('Checkbox', {
									props: {
										'value': self.bTit[params.index - 1].log,
										'true-value': '1',
										'false-value': '0'
									},
									on: {
										'on-change': function(val) {
											self.checkCol(self.bTit[params.index - 1].ename, val, self.menuId)
										}
									}
								}, self.bTit[params.index - 1].cname)
							])
						},
						render: (h, params) => {
							let self = this;
							return h('div', {}, [
								//								...(()=>{
								//									console.warn(params.row.mapValue);
								//									console.info(params.row.mapValue[self.bTit[params.column._index - 1].ename]);
								//									debugger;
								//									return [];
								//									
								//								})(),

								h('Checkbox', {
									props: {
										value: params.row.mapValue[self.bTit[params.column._index - 1].ename],
										'true-value': '1',
										'false-value': '0'
									},
									on: {
										'on-change': function(val) {
											self.fit(params.row.menuId, params.row.configId, self.bTit[params.column._index - 1].ename, val);
										}
									}
								}, '')
							])
						}
					},
					{
						key: 'bool2',
						align: 'left',
						renderHeader: (h, params) => {
							let self = this;
							return h('div', {}, [
								h('Checkbox', {
									props: {
										'value': self.bTit[params.index - 1].log,
										'true-value': '1',
										'false-value': '0'
									},
									on: {
										'on-change': function(val) {
											self.checkCol(self.bTit[params.index - 1].ename, val, self.menuId)
										}
									}
								}, this.bTit[params.index - 1].cname)
							])
						},
						render: (h, params) => {
							let self = this;
							return h('div', {}, [
								h('Checkbox', {
									props: {
										value: params.row.mapValue[self.bTit[params.column._index - 1].ename],
										'true-value': '1',
										'false-value': '0'
									},
									on: {
										'on-change': function(val) {
											self.fit(params.row.menuId, params.row.configId, self.bTit[params.column._index - 1].ename, val)
										}
									}
								}, '')
							])
						}
					},
					{
						key: 'bool3',
						align: 'left',
						renderHeader: (h, params) => {
							let self = this;
							return h('div', {}, [
								h('Checkbox', {
									props: {
										'value': self.bTit[params.index - 1].log,
										'true-value': '1',
										'false-value': '0'
									},
									on: {
										'on-change': function(val) {
											self.checkCol(self.bTit[params.index - 1].ename, val, self.menuId)
										}
									}
								}, this.bTit[params.index - 1].cname)
							])
						},
						render: (h, params) => {
							let self = this;
							return h('div', {}, [
								h('Checkbox', {
									props: {
										value: params.row.mapValue[self.bTit[params.column._index - 1].ename],
										'true-value': '1',
										'false-value': '0'
									},
									on: {
										'on-change': function(val) {
											self.fit(params.row.menuId, params.row.configId, self.bTit[params.column._index - 1].ename, val)
										}
									}
								}, '')
							])
						}
					},
					{
						key: 'bool4',
						align: 'left',
						renderHeader: (h, params) => {
							let self = this;
							return h('div', {}, [
								h('Checkbox', {
									props: {
										'value': self.bTit[params.index - 1].log,
										'true-value': '1',
										'false-value': '0'
									},
									on: {
										'on-change': function(val) {
											self.checkCol(self.bTit[params.index - 1].ename, val, self.menuId)
										}
									}
								}, this.bTit[params.index - 1].cname)
							])
						},
						render: (h, params) => {
							let self = this;
							return h('div', {}, [
								h('Checkbox', {
									props: {
										value: params.row.mapValue[self.bTit[params.column._index - 1].ename],
										'true-value': '1',
										'false-value': '0'
									},
									on: {
										'on-change': function(val) {
											self.fit(params.row.menuId, params.row.configId, self.bTit[params.column._index - 1].ename, val)
										}
									}
								}, '')
							])
						}
					},
					{
						key: 'bool5',
						align: 'left',
						renderHeader: (h, params) => {
							let self = this;
							return h('div', {}, [
								h('Checkbox', {
									props: {
										'value': self.bTit[params.index - 1].log,
										'true-value': '1',
										'false-value': '0'
									},
									on: {
										'on-change': function(val) {
											self.checkCol(self.bTit[params.index - 1].ename, val, self.menuId)
										}
									}
								}, this.bTit[params.index - 1].cname)
							])
						},
						render: (h, params) => {
							let self = this;
							return h('div', {}, [
								h('Checkbox', {
									props: {
										value: params.row.mapValue[self.bTit[params.column._index - 1].ename],
										'true-value': '1',
										'false-value': '0'
									},
									on: {
										'on-change': function(val) {
											self.fit(params.row.menuId, params.row.configId, self.bTit[params.column._index - 1].ename, val)
										}
									}
								}, '')
							])
						}
					},
					{
						key: 'bool6',
						align: 'left',
						renderHeader: (h, params) => {
							let self = this;
							return h('div', {}, [
								h('Checkbox', {
									props: {
										'value': self.bTit[params.index - 1].log,
										'true-value': '1',
										'false-value': '0'
									},
									on: {
										'on-change': function(val) {
											self.checkCol(self.bTit[params.index - 1].ename, val, self.menuId)
										}
									}
								}, this.bTit[params.index - 1].cname)
							])
						},
						render: (h, params) => {
							let self = this;
							return h('div', {}, [
								h('Checkbox', {
									props: {
										value: params.row.mapValue[self.bTit[params.column._index - 1].ename],
										'true-value': '1',
										'false-value': '0'
									},
									on: {
										'on-change': function(val) {
											self.fit(params.row.menuId, params.row.configId, self.bTit[params.column._index - 1].ename, val)
										}
									}
								}, '')
							])
						}
					},
				],
				setList: [],
				isShowTable: false,
			}
		},
		components: {
			filters
		},
		computed: {
			bTit() {
				if(this.setList.length) {
					let obj = [];
					for(var i in this.setList[0].mapValue) {
						obj.push(i);
					}
					let arr = [];
					obj.forEach((v, k) => {
						let cname = '';
						switch(v) {
							case 'app':
								cname = 'APP'
								break;
							case 'email':
								cname = '发邮件'
								break;
							case 'ewechat':
								cname = '企业微信'
								break;
							case 'phone':
								cname = '站内信'
								break;
							case 'web':
								cname = '短信提醒'
								break;
							case 'chat':
								cname = '聊天'
								break;
							default:
								break;
						}
						arr.push({
							'ename': v,
							'cname': cname,
							'log': '0'
						})
					});
					arr.forEach((val, ky) => {
						let logs = '1';
						this.setList.forEach((v, k) => {
							if(v.mapValue[val.ename] == '0') {
								logs = '0';
							}
						})
						val.log = logs;
					})
					console.log(arr)
					return arr;
				}
			}
		},
		created() {
			//this.getList();
		},
		methods: {
			...mapMutations(['updateLoadingStatus']),
			createFilter(val) {
				this.menu = val.name;
				this.menuId = val.id;
				this.getList();
			},
			getList() {
				this.loadingShow = true;
				let params = {
					menuId: this.menuId,
					pageNo: this.pageNo,
					pageSize: this.pageSize
				};
				infoSet.listNotifySetting(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.setList = res.data.data;
						this.count = res.data.data.count;
						if(this.setList.length) {
							this.$nextTick(() => {
								this.isShowTable = true;
								setTimeout(() => {
									this.loadingShow = false;
								}, 500)
							})
							return false;
						} else {
							this.$nextTick(() => {
								this.isShowTable = true;
								this.loadingShow = false;
							})
						}
					}
				}).catch(errors.call(this));
			},
			pageChange: function(num) {
				this.pageNo = num;
				this.getList();
			},
			sizeChange: function(val) {
				this.pageSize = val;
				this.getList();
			},
			doFilter(id, name) {
				this.menu = name;
				this.menuId = id;
				this.getList();
			},
			checkCol(_key, val, m) {
				this.setList.forEach((v, k) => {
					v.mapValue[_key] = val;
				})
				let params = {
					menuId: m,
					method: _key,
					isRecieve: val
				};
				infoSet.batchSaveUserSetting(params).then(valid.call(this)).then(res => {
					if(res.ok) {}
				}).catch(errors.call(this));
			},
			fit(m, c, mt, ir) {
				let params = {
					menuId: m,
					configId: c,
					method: mt,
					isRecieve: ir
				};
				infoSet.saveUserSetting(params).then(valid.call(this)).then(res => {
					if(res.ok) {}
				}).catch(errors.call(this));
			}
		}
	}
</script>