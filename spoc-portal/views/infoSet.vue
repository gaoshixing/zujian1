<style lang="less">
	.infoConfig {
		font-size: 14px;
		border-top: 1px solid #e0e0e0;
		margin: 0 15px;
		overflow: hidden;
		position: relative;
		.mask {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1999;
			background-color: rgba(255, 255, 255, 0.99);
		}
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
			.ivu-table-header {
				font-size: 14px;
				.ivu-checkbox-wrapper {
					font-size: 14px;
				}
			}
			.ivu-table:after {
				display: none;
			}
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
			right: 70px;
			top: 50px;
			line-height: 34px;
			.icon-shaixuanguolv {
				cursor: pointer;
			}
		}
		.shade {
			position: absolute;
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
	
	.modal {
		.role {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			.box {
				width: 300px;
				.tit {
					line-height: 2em;
					font-size: 14px;
				}
				.wind {
					width: 100%;
					height: 231px;
					border: 1px #999999 solid;
					.content {
						overflow: auto;
						height: 184px;
						width: 100%;
						padding: 12px;
					}
					.btn {
						height: 46px;
						padding: 5px;
						border-top: 1px #999999 solid;
						text-align: right;
						margin: 0 12px;
						.but {
							width: 76px;
							height: 34px;
							span {
								display: inline-block;
								line-height: 18px;
							}
						}
					}
				}
			}
		}
		.warn {
			margin-top: 10px;
			color: red;
			line-height: 2.5em;
		}
		.table {
			.hid {
				display: none;
			}
			.table_foot {
				width: 100%;
				td {
					padding: 0 18px;
					.input {
						width: 140px;
					}
					&.tdLast {
						text-align: center;
						.a2 {
							margin-left: 20px;
						}
					}
				}
			}
		}
		.lastWarn {
			margin-top: 16px;
		}
	}
</style>

<template>
	<div class="infoConfig">
		<p class="warn"><b>提醒</b>：您可以为每类消息设置是否接收，为防止重要信息遗漏，建议设置全部接收。
			<Button type="primary" class="btn">设置通知接收人</Button>
		</p>
		<Table ref="selection" :columns="columns4" :data="setList" class="table" v-show="isShow"></Table>
		<div class="page-box" v-show="count>10">
			<div style="margin: auto;display: inline-block;">
				<Page :total="count" :current="1" show-total :show-sizer="count>10" show-elevator @on-change="pageChange" @on-page-size-change="sizeChange"></Page>
			</div>
		</div>
		<Modal ref="save" v-model="modal" width="730" title="设置通知角色" class-name="modal vertical-center-modal" @on-ok="saveModel">
			<div>
				<p>通知类型：<span>签约通知</span></p>
				<div class="role">
					<div class="box">
						<p class="tit">待分配角色</p>
						<div class="wind">
							<div class="content">
								<CheckboxGroup v-model="unassignRolesGroup">
									<Checkbox :label="item.id" v-for="item in unassignRoles" :key="item.id">{{item.name}}</Checkbox>
								</CheckboxGroup>
							</div>
							<div class="btn">
								<Button type="ghost" @click="toadd" class="but">添加 <i class="iconfont icon-youjiantou"></i> </Button>
							</div>
						</div>
					</div>
					<div class="box">
						<p class="tit">已分配角色</p>
						<div class="wind">
							<div class="content">
								<CheckboxGroup v-model="assignRolesGroup">
									<Checkbox :label="item.id" v-for="item in assignRoles" :key="item.id">{{item.name}}</Checkbox>
								</CheckboxGroup>
							</div>
							<div class="btn">
								<Button type="ghost" @click="toremove" class="but"> <i class="iconfont icon-zuojiantou"></i> 移除</Button>
							</div>
						</div>
					</div>
				</div>
				<p class="warn">
					提醒：如果通知需要发送给外部联系人，请在下面添加外部联系人信息。
				</p>
				<Table ref="peo" :columns="columns1" :data="userLinks" class="table">

					<table slot="footer" border="0" cellspacing="0" cellpadding="0" class="table_foot">
						<tr>
							<td>
								<Input v-model="iname" placeholder="姓名" class="input"></Input>
							</td>
							<td>
								<Input v-model="iemail" placeholder="邮箱" class="input"></Input>
							</td>
							<td>
								<Input v-model="iphone" placeholder="手机" class="input"></Input>
							</td>
							<td class="tdLast">
								<a href="javascript:void(0)" @click="addList">确定</a>
								<a href="javascript:void(0)" class="a2" @click="clearList">取消</a>
							</td>
						</tr>
					</table>
				</Table>
				<p class="lastWarn">*注意：接收人邮箱、手机至少填一个。</p>
			</div>
		</Modal>
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
	import filters from "../modules/filter.vue";
	import valid, {
		errors,
		sysConfig,
		sys
	} from "../libs/request.js";
	export default {
		data() {
			return {
				loadingShow: false,
				isShow: false,
				count: 0,
				menuId: '',
				modal: false,
				iname: '',
				iemail: '',
				iphone: '',
				assignRoles: [],
				assignRolesGroup: [],
				imenuId: '',
				kind: '',
				unassignRoles: [],
				userLinks: [],
				unassignRolesGroup: [],
				columns1: [{
					title: '姓名',
					key: 'name',
					render: (h, params) => {
						let self = this;
						return h('div', {}, [h('input', {
							attrs: {
								type: 'text',
							},
							domProps: {
								value: self.userLinks[params.index].name
							},
							class: {
								hid: !self.userLinks[params.index].isEdit
							},
							on: {
								change: function(event) {
									self.userLinks[params.index].name = event.target.value;
								}
							}
						}), h('p', {
							class: {
								hid: self.userLinks[params.index].isEdit
							},
						}, params.row.name)])
					}
				}, {
					title: '邮箱',
					key: 'email',
					render: (h, params) => {
						let self = this;
						return h('div', {}, [h('input', {
							attrs: {
								type: 'text',
							},
							domProps: {
								value: self.userLinks[params.index].email
							},
							class: {
								hid: !self.userLinks[params.index].isEdit
							},
							on: {
								change: function(event) {
									self.userLinks[params.index].email = event.target.value;
								}
							}
						}), h('p', {
							class: {
								hid: self.userLinks[params.index].isEdit
							},
						}, params.row.email)])
					}
				}, {
					title: '手机',
					key: 'mobile',
					render: (h, params) => {
						let self = this;
						return h('div', {}, [h('input', {
							attrs: {
								type: 'text',
							},
							domProps: {
								value: self.userLinks[params.index].mobile
							},
							class: {
								hid: !self.userLinks[params.index].isEdit
							},
							on: {
								change: function(event) {
									self.userLinks[params.index].mobile = event.target.value;
								}
							}
						}), h('p', {
							class: {
								hid: self.userLinks[params.index].isEdit
							},
						}, params.row.mobile)])
					}
				}, {
					title: '操作',
					key: 'configName',
					align: 'center',
					render: (h, params) => {
						let self = this;
						return h('div', {
							style: {
								width: '100%',
								textAlign: "center"
							},
						}, [h('a', {
								attrs: {
									href: "javascript:void(0)"
								},
								style: {
									fontSize: '12px',
								},
								on: {
									click: function() {
										console.log(self.userLinks[params.index])
										self.userLinks[params.index].isEdit = !self.userLinks[params.index].isEdit
									}
								},
							}, params.row.isEdit ? '确定' : '修改'),
							h('a', {
								attrs: {
									href: "javascript:void(0)"
								},
								style: {
									fontSize: '12px',
									marginLeft: '20px'
								},
								on: {
									click: function() {
										self.userLinks.splice(params.index, 1)
									}
								},
							}, '取消')
						])
					}
				}],
				columns4: [{
						title: '通知类型',
						key: 'configName',
					}, {
						title: '所属应用',
						key: 'module',
						filters: [],
						filterMultiple: false,
						filterRemote(value, row) {
							this.menuId = value[0];
							this.getList();
						}
					}, {
						key: 'bool1',
						align: 'left',
						renderHeader: (h, params) => {
							let self = this;
							return h('div', {}, [
								h('Checkbox', {
									props: {
										'value': self.bTit[params.index - 2].log,
										'true-value': '1',
										'false-value': '0'
									},
									on: {
										'on-change': function(val) {
											self.checkCol(self.bTit[params.index - 2].ename, val, self.menuId)
										}
									}
								}, self.bTit[params.index - 2].cname)
							])
						},
						render: (h, params) => {
							let self = this;
							return h('div', {}, [
								h('Checkbox', {
									props: {
										value: params.row.mapValue[self.bTit[params.column._index - 2].ename],
										'true-value': '1',
										'false-value': '0'
									},
									on: {
										'on-change': function(val) {
											self.fit(params.row.menuId, params.row.configId, self.bTit[params.column._index - 2].ename, val)
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
										'value': self.bTit[params.index - 2].log,
										'true-value': '1',
										'false-value': '0'
									},
									on: {
										'on-change': function(val) {
											self.checkCol(self.bTit[params.index - 2].ename, val, self.menuId)
										}
									}
								}, this.bTit[params.index - 2].cname)
							])
						},
						render: (h, params) => {
							let self = this;
							return h('div', {}, [
								h('Checkbox', {
									props: {
										value: params.row.mapValue[self.bTit[params.column._index - 2].ename],
										'true-value': '1',
										'false-value': '0'
									},
									on: {
										'on-change': function(val) {
											self.fit(params.row.menuId, params.row.configId, self.bTit[params.column._index - 2].ename, val)
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
										'value': self.bTit[params.index - 2].log,
										'true-value': '1',
										'false-value': '0'
									},
									on: {
										'on-change': function(val) {
											self.checkCol(self.bTit[params.index - 2].ename, val, self.menuId)
										}
									}
								}, this.bTit[params.index - 2].cname)
							])
						},
						render: (h, params) => {
							let self = this;
							return h('div', {}, [
								h('Checkbox', {
									props: {
										value: params.row.mapValue[self.bTit[params.column._index - 2].ename],
										'true-value': '1',
										'false-value': '0'
									},
									on: {
										'on-change': function(val) {
											self.fit(params.row.menuId, params.row.configId, self.bTit[params.column._index - 2].ename, val)
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
										'value': self.bTit[params.index - 2].log,
										'true-value': '1',
										'false-value': '0'
									},
									on: {
										'on-change': function(val) {
											self.checkCol(self.bTit[params.index - 2].ename, val, self.menuId)
										}
									}
								}, this.bTit[params.index - 2].cname)
							])
						},
						render: (h, params) => {
							let self = this;
							return h('div', {}, [
								h('Checkbox', {
									props: {
										value: params.row.mapValue[self.bTit[params.column._index - 2].ename],
										'true-value': '1',
										'false-value': '0'
									},
									on: {
										'on-change': function(val) {
											self.fit(params.row.menuId, params.row.configId, self.bTit[params.column._index - 2].ename, val)
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
										'value': self.bTit[params.index - 2].log,
										'true-value': '1',
										'false-value': '0'
									},
									on: {
										'on-change': function(val) {
											self.checkCol(self.bTit[params.index - 2].ename, val, self.menuId)
										}
									}
								}, this.bTit[params.index - 2].cname)
							])
						},
						render: (h, params) => {
							let self = this;
							return h('div', {}, [
								h('Checkbox', {
									props: {
										value: params.row.mapValue[self.bTit[params.column._index - 2].ename],
										'true-value': '1',
										'false-value': '0'
									},
									on: {
										'on-change': function(val) {
											self.fit(params.row.menuId, params.row.configId, self.bTit[params.column._index - 2].ename, val)
										}
									}
								}, '')
							])
						}
					},
					{
						key: 'bool',
						align: 'left',
						renderHeader: (h, params) => {
							let self = this;
							return h('div', {}, [
								h('Checkbox', {
									props: {
										'value': self.bTit[params.index - 2].log,
										'true-value': '1',
										'false-value': '0'
									},
									on: {
										'on-change': function(val) {
											self.checkCol(self.bTit[params.index - 2].ename, val, self.menuId)
										}
									}
								}, this.bTit[params.index - 2].cname)
							])
						},
						render: (h, params) => {
							let self = this;
							return h('div', {}, [
								h('Checkbox', {
									props: {
										value: params.row.mapValue[self.bTit[params.column._index - 2].ename],
										'true-value': '1',
										'false-value': '0'
									},
									on: {
										'on-change': function(val) {
											self.fit(params.row.menuId, params.row.configId, self.bTit[params.column._index - 2].ename, val)
										}
									}
								}, '')
							])
						}
					},
					{
						key: 'bool6',
						align: 'left',
						title: '通知接收人',
						render: (h, params) => {
							let self = this;
							return h('div', {
								style: {
									width: '70px',
									textAlign: "center"
								},
							}, [h('a', {
								attrs: {
									href: "javascript:void(0)"
								},
								style: {
									fontSize: '12px',
								},
								on: {
									'click': function() {
										self.clickSet(params.row)
									}
								},
							}, '设置')])
						}
					},
				],
				setList: [],
				maskShow: false,
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
						obj.push(i)
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
								cname = '短信提醒'
								break;
							case 'web':
								cname = '站内信'
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
						let log = '1';
						this.setList.forEach((v, k) => {
							if(v.mapValue[val.ename] == '0') {
								log = '0';
							}
						})
						val.log = log;
					})
					return arr;
				} else {
					return [{
						"ename": "app",
						"cname": "APP",
						"log": "0"
					}, {
						"ename": "web",
						"cname": "站内信",
						"log": "0"
					}, {
						"ename": "phone",
						"cname": "短信提醒",
						"log": "0"
					}, {
						"ename": "chat",
						"cname": "聊天",
						"log": "0"
					}, {
						"ename": "ewechat",
						"cname": "企业微信",
						"log": "0"
					}, {
						"ename": "email",
						"cname": "发邮件",
						"log": "0"
					}]
				}
			}
		},
		created() {
			this.getList()
			let params1 = {}
			sys.listMenu(params1).then(valid.call(this)).then(res => {
				if(res.ok) {
					let arr = [];
					res.data.data.forEach((v, k) => {
						arr.push({
							label: v.name,
							value: v.id
						});
					});
					//					this.menuId = arr[0].value;
					this.columns4[1].filters = arr;
				}
			}).catch(errors.call(this));
		},
		mounted() {
			this.$nextTick(() => {
				this.isShow = true;
			})
		},
		methods: {
			getList() {
				this.loadingShow = true;
				this.maskShow = true;
				let params = {
					menuId: this.menuId
				};
				sysConfig.listNotifySetting(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.setList = res.data.data;
						this.count = res.data.data.count;
						//						if(!this.setList.length) return;
						this.$nextTick(() => {
							this.isShowTable = true;
							setTimeout(() => {
								this.maskShow = false;
								this.loadingShow = false;
							}, 300)
						})
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
			checkCol(_key, val, m) {
				this.setList.forEach((v, k) => {
					v.mapValue[_key] = val;
				})
				let params = {
					menuId: m,
					method: _key,
					isRecieve: val
				};
				sysConfig.batchNotifySetting(params).then(valid.call(this)).then(res => {
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
				sysConfig.notifySetting(params).then(valid.call(this)).then(res => {
					if(res.ok) {}
				}).catch(errors.call(this));
			},
			toadd() {
				this.unassignRolesGroup.forEach((v, k) => {
					this.unassignRoles.forEach((val, ind, arr) => {
						if(v == val.id) {
							this.unassignRoles.splice(ind, 1);
							this.assignRoles.push(val)
						}
					})
				});
				this.unassignRolesGroup = [];
			},
			addList() {
				this.userLinks.push({
					cfgId: this.kind,
					name: this.iname,
					email: this.iemail,
					mobile: this.iphone,
					isEdit: false
				});
				this.iname = '';
				this.iemail = '';
				this.iphone = '';
			},
			clearList() {
				this.iname = '';
				this.iemail = '';
				this.iphone = '';
			},
			toremove() {
				this.assignRolesGroup.forEach((v, k) => {
					this.assignRoles.forEach((val, ind) => {
						if(v == val.id) {
							let obj = this.assignRoles.splice(ind, 1);
							this.unassignRoles.push(val)
						}
					})
				});
				this.assignRolesGroup = [];
			},
			clickSet(val) {
				let params = {
					menuId: val.menuId,
					kind: val.configId,
				};
				this.imenuId = val.menuId;
				this.kind = val.configId;
				//				assignRoles:[],
				//				imenuId:'',
				//				kind:'',
				//				unassignRoles:[],
				//				userLinks:[],
				sysConfig.receiptConfig(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						let arr = res.data.data.userLinks;
						arr.forEach((v, k) => {
							v.isEdit = false;
						});
						this.userLinks = arr;
						this.assignRoles = res.data.data.assignRoles;
						this.unassignRoles = res.data.data.unassignRoles;
						this.modal = true;
					}
				}).catch(errors.call(this));
			},
			saveModel() {
				this.$refs.save.visible = true;
				this.modal = true;
				let params = {
					kind: this.kind,
					menuId: this.imenuId,
					assignRoles: [],
					userLinks: []
				};
				params.assignRoles = this.assignRoles.map(item => {
					return {
						id: item.id
					}
				});
				params.userLinks = this.userLinks.map(item => {
					return {
						cfgId: item.cfgId,
						name: item.name,
						email: item.email,
						mobile: item.mobile,
					}
				});
				sysConfig.saveReceiptConfig(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						this.modal = false;
					} else {
						this.$refs.save.visible = true;
						this.modal = true;
					}
				}).catch(errors.call(this));

			}
		}
	}
</script>