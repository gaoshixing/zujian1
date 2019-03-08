<style lang="less">
	@green: #43bbb6;
	.role-manage-tab {
		height: ~"calc(100vh - 90px)";
		overflow: auto;
		.role-namelist {
			border-radius: 10px;
			box-shadow: 0 0 8.8px 0.2px rgba(3, 0, 0, 0.1);
			border: solid 1px #e0e0e0;
			margin: 20px 0;
			padding: 20px;
			.role-item-box,
			.add-role-box {
				margin: 10px 15px;
			}
			.add-role-box {
				border-radius: 3px;
				border: 1px solid #e6e6e6;
				width: 190px;
				height: 46px;
				line-height: 46px;
				box-sizing: border-box;
				padding: 0 5px;
				position: relative;
				font-size: 14px;
				cursor: pointer;
				float: left;
				&:hover {
					border-color: @green;
				}
				.border-r {
					margin: 0 8px 0 10px;
					width: 24px;
					height: 24px;
					box-sizing: border-box;
					border-radius: 4px;
					line-height: 1.5;
					text-align: center;
					border: 1px dashed #43bbb6;
					color: #43bbb6;
					display: inline-block;
				}
			}
		}
		.listMsg {
			.btnlist {
				border: 1px solid #e0e0e0;
				background: #fafafa;
				height: 40px;
				line-height: 40px;
				border-radius: 2px;
				position: relative;
				text-indent: 20px;
				.lineSide {
					position: absolute;
					left: -1px;
					top: -1px;
					height: 40px;
					width: 5px;
					background: #43bbb6;
					border-radius: 2px 0 0 2px;
				}
			}
		}
		.page {
			text-align: center;
			margin-top: 20px;
		}
	}
	
	.TQuserInfo {
		ul,
		li {
			list-style: none;
			margin: 0;
			padding: 0;
		}
		li>span {
			display: inline-block;
			width: 60px;
			text-align: right;
			line-height: 30px;
			margin-right: 10px;
		}
	}
</style>

<template>
	<div class="role-manage-tab">
		<div class="search">
			<Input icon="search" placeholder="请输入要搜索的人员" style="width: 396px" @on-click="onSearch" @on-enter="onSearch" v-model="search.text"></Input>
		</div>
		<div class="role-namelist clearfix">
			<role-card v-for="item in roleNameList" :class="{active:item.id==state.clicked.id}" :key="item.id" :item="item" :disabled="isRoleDisable" @click.native="cardClick(item)" @ondel="cardDel" @onSync="onSync" @onupdate="cardUpdate" @ongive="giveRight" @onpeople="peopleChoose" :edit="edit"></role-card>
			<div class="add-role-box" @click="addRole" v-if="edit">
				<span class="border-r">+</span>
				<span>添加角色</span>
			</div>
		</div>
		<div>
			<div class="listMsg">
				<div class="btnlist">
					<div class="lineSide"></div>
					<span>{{appmenu.name}} - 角色</span>
				</div>
			</div>
			<Table :columns="userList" :data="roleUserList.list"></Table>
			<div class="page">
				<Page show-elevator show-total show-sizer :current="roleUserList.pageNo" :total="roleUserList.count" :page-size="pageConfig.pageSize" @on-page-size-change="onPageSizeChange" @on-change="onPageChange" v-if="roleUserList.pageCount>1"></Page>
			</div>
		</div>

		<Modal v-if="edit" v-model="addRoleItem.show" :title="addRoleItem.add?addRoleItem.addtitle:addRoleItem.edittitle">
			<div>
				<i-form ref="addrole" :model="addRoleItem" :rules="addRoleItem.ruleValidate" :label-width="72">
					<form-item label="角色名称" prop="name">
						<i-input v-model="addRoleItem.name" placeholder="请输入角色名称"></i-input>
					</form-item>
					<form-item label="英文名称" prop="enname">
						<i-input v-model="addRoleItem.enname" placeholder="请输入英文名称"></i-input>
					</form-item>
					<form-item label="数据范围" prop="dataScope">
						<Select v-model="addRoleItem.dataScope">
							<Option v-for="item in alldataScope" :value="item.value" :key="item.id">{{item.label}}</Option>
						</Select>
					</form-item>
					<form-item label="同步角色" prop="part">
						<Select v-model="addRoleItem.part" multiple>
							<Option v-for="item in roleModelList" :value="item.id" :key="item.id" :disabled="abel(item.id,item.menuId)">{{item.name}}</Option>
						</Select>
					</form-item>
					<form-item label="描述" prop="remarks" class="last-child">
						<i-input v-model="addRoleItem.remarks" type="textarea" placeholder="描述内容" :rows="2"></i-input>
					</form-item>
				</i-form>
			</div>
			<div slot="footer">
				<Button @click="addRoleClose">取消</Button>
				<Button type="primary" @click="addRoleOk">确定</Button>
			</div>
		</Modal>
		<Modal :mask-closable='false' v-model="isBind" width=728 :title="isBindTitle?'绑定TQ账户':'解绑TQ账户'" ref="reason">
			<div style="padding-left:10px">
				<ul class="TQuserInfo">
					<li><span>姓名：</span>{{userInfor.name}}</li>
					<li><span>手机号：</span>{{userInfor.photo}}</li>
					<li><span>邮箱：</span>{{userInfor.email}}</li>
					<li v-if="!isBindTitle"><span>TQ账户：</span>{{tqInfo.tqUsername}}</li>
				</ul>
			</div>
			<div slot="footer">
				<Button @click="isBindCancel">取消</Button>
				<Button type="primary" @click="isBindOk">{{isBindTitle?'绑定TQ账户':'解绑TQ账户'}}</Button>
			</div>
		</Modal>
		<Modal :mask-closable='false' v-model="isOk" width=728 @on-ok="isOkOk" ref="reason1" @on-cancel="isOkCancel">
			<div style="padding-left:10px">
				<p style="line-height:30px;text-align:center;margin-top:30px" v-if="isBindTitle"><span>TQ账户：</span>
					<Input v-model="tqInfo.tqUsername" placeholder="请输入TQ账户" style="width: 300px" />
				</p>
				<p style="line-height:30px;text-align:center;margin-top:30px" v-else>确定解绑当前账户？</p>
			</div>
		</Modal>
		<Modal v-model="syncModel" width="728" title="同步用户">
			<div>
				<i-form :label-width="72">
					<p style="margin-bottom: 14px;">提示：您正在同步用户角色，请确认同步信息！</p>
					<form-item label="当前角色：">
						<p v-for="(item,index) in syncList.origin" :key="index">{{item.content}}</p>
					</form-item>
					<form-item label="同步对象：">
						<p v-for="(item,index) in syncList.target" :key="index">{{item.content}}</p>
					</form-item>
					<form-item label="同步人数：">
						<p> <span v-if="syncList.origin">{{syncList.origin[0].num}}</span><span v-else>0</span>人</p>
					</form-item>
				</i-form>
			</div>
			<div slot="footer">
				<Button @click="syncModel=false">取消</Button>
				<Button type="primary" @click="syncOk">确定同步</Button>
			</div>
		</Modal>
		<Modal v-model="affirmSyncModel" width="400" title="提示">
			<div style="padding: 4px 0 20px;">
				<p>
					<span v-for="(item,index) in syncList.target" :key="index">
						同步对象{{item.content}}中已存在 {{item.num}} 调用户数据，
					</span>
					<span>同步后系统将删除这些数据。</span>
				</p>
				<p>请确认是否继续同步？</p>
			</div>
			<div slot="footer">
				<Button @click="affirmSyncModel=false">取消</Button>
				<Button type="primary" @click="affirmSyncOk">继续同步</Button>
			</div>
		</Modal>
		<role-people ref="rolepeople" :appmenu="appmenu" :role="state.item" @fresh="doFresh"></role-people>
		<rightstab ref="rightstab" :appmenu="appmenu" :role="state.item" @fresh="doFresh" :menuId="menuId"></rightstab>

	</div>
</template>
<script>
	import valid, {
		errors,
		sys,
		listMenuRole,
		getUserList,
		dictData,
		saveRole,
		delRole,
		bindAccount,
		getExternalSystemAccount,
		unBindAccount
	} from '../libs/request';
	import roleCard from './roleCard.vue';
	import rightstab from './rightstab';
	import rolePeople from './rolePeople.vue';
	import { mapMutations } from 'vuex';

	export default {
		props: {
			appmenu: {
				type: Object,
				required: true,
			},
			edit: {
				type: Boolean,
				default: true
			},
			menuId: {
				type: [String, Number],
				default: true,
			}
		},
		data() {
			return {
				roleId: '',
				affirmSyncModel: false,
				syncModel: false,
				syncList: {},
				syncNum: '',
				search: {
					text: '',
					page: 0
				},
				isOk: false,
				isBind: false,
				isBindTitle: true,
				tqInfo: {
					tqUsername: '',
				},
				userInfor: {
					name: '高师兄'
				},
				pageConfig: {
					pageSize: 10
				},
				state: {
					item: {},
					clicked: {}
				},
				alldataScope: [],
				roleUserList: {},
				userList: [],
				usercolumn: [{
					title: "姓名",
					key: "name",
					width: 140
				}, {
					title: '角色',
					key: 'roleName'
				}, {
					title: '归属公司',
					key: 'companyName',
					width: 100
				}, {
					title: '归属部门',
					key: 'officeName'
				}, {
					title: "用户名",
					key: "loginName",
					width: 120
				}, {
					title: "手机号码",
					key: "mobile",
					width: 120
				}, {
					title: "邮箱",
					key: "email"
				}, ],
				roleNameList: [],
				roleModelList: [],
				loadItem: {},
				addRoleItem: {
					show: false,
					add: true,
					addtitle: '添加角色',
					edittitle: "修改角色",
					part: [],
					name: '',
					enname: '',
					dataScope: null,
					remarks: '',
					ruleValidate: {
						name: [{
								required: true,
								message: '角色名称不能为空',
								trigger: 'blur'
							},
							{
								required: true,
								pattern: /^(^[\w\-]{1,20}$)|(^[\w\-\u4e00-\u9fa5]{1,10}$)$/,
								message: '最大10个汉字或20个字母，不能有特殊字符',
								trigger: 'blur'
							}
						],
						enname: [{
							required: true,
							message: '英文名称不能为空',
							trigger: 'blur'
						}],
						dataScope: [{
							required: true,
							message: '数据范围不能为空',
							trigger: 'change'
						}],
						remarks: [{
							required: false,
							type: 'string',
							max: 100,
							message: '描述最大100个字符',
							trigger: 'blur'
						}],
					}
				},
			};
		},
		components: {
			roleCard,
			rightstab,
			rolePeople,
		},
		created() {
			this.initPage();
		},
		methods: {
			...mapMutations(['updateLoadingStatus']),
            abel(id,mId) {
                let flag1=false,flag2=true;
                this.addRoleItem.part.forEach((v,k)=>{
                    if(id==v){
                        flag2=false;
                    }
                    this.roleModelList.forEach((val,ind)=>{
                        if(val.id==v){
                            if(mId==val.menuId){
                                flag1=true;
                            }
                        }
                    })
                })
                if(flag1&&flag2){
                    return true;
                }else{
                    return false;
                }
            },
			initPage() {
				this.getRoles(() => {
					this.$nextTick(() => {
						if(this.roleNameList[0]) {
							this.loadItem = this.roleNameList[0]
							this.cardClick(this.roleNameList[0]);
						}
					});
				});
			},
			getRoles(cb) {
				this.updateLoadingStatus({
					isLoading: true
				});
				listMenuRole(this.appmenu.id).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.roleNameList = res.data.data.roleList || [];
						cb && cb();
					}
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
			},
			cardClick(item) {
				[...this.userList] = this.usercolumn
				this.loadItem = item
				if(item.id == 904 || item.id == 908) {
					this.userList.push({
						title: "操作",
						key: "email",
						render: (h, params) => {
							return h('a', {
									on: {
										click: () => {
											this.userInfor = params.row
											this.getUserInfor(params.row)
											// if(params.row.accountMap) {
											//     this.isBindTitle = true  
											//     this.tqInfo.tqUsername = ''
											// } else {

											//     return
											// }
											// this.isBind = true
										}
									}
								},
								'查看TQ账户'
							)
						}
					})
				}
				this.search.text = '';
				this.state.clicked = item;
				this.getCurrUserList();
			},

			getUserInfor() {
				let obj = {
					userId: this.userInfor.id,
					system: 'tq'
				}
				getExternalSystemAccount(obj).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.tqInfo = res.data.data
						if(this.tqInfo) {
							this.isBindTitle = false
						} else {
							this.tqInfo = {
								tqUsername: '',
							}
							this.isBindTitle = true
						}
						this.isBind = true
					}
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
			},

			bindAccount() {
				let obj = {
					userId: this.userInfor.id,
					system: 'tq',
					tqUsername: this.tqInfo.tqUsername
				}
				bindAccount(obj).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.info(res.data.message)
						this.cardClick(this.loadItem)
					}
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
			},

			unBindAccount() {
				let obj = {
					id: this.tqInfo.id,
				}
				unBindAccount(obj).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.info(res.data.message)
						this.cardClick(this.loadItem)
					}
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
			},

			onPageChange(page) {
				this.search.page = page || 1;
				this.getCurrUserList();
			},
			onPageSizeChange(pageSize) {
				this.pageConfig.pageSize = pageSize;
				this.getCurrUserList();
			},
			onSearch() {
				this.search.page = 0;
				this.getCurrUserList();
			},
			getCurrUserList() {
				let param = {
					'role.id': this.state.clicked.id,
					'role.menuId': this.appmenu.id,
					pageSize: this.pageConfig.pageSize
				};
				if(this.search.text) {
					param.name = this.search.text;
				}
				if(this.search.page) {
					param.pageNo = this.search.page;
				}
				this.updateLoadingStatus({
					isLoading: true
				});
				getUserList(param).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.roleUserList = res.data.data;
					}
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
			},
			addRole() {
				this.$refs['addrole'].resetFields();
				this.tryScopeData();
				this.addRoleItem.show = true;
				this.addRoleItem.add = true;
			},
			cardDel(item) {
				if(item.num > 0) {
					return this.$Message.warning('不能删除非空角色');
				}
				this.$Modal.confirm({
					title: '删除角色',
					content: '您确定要删除所选内容吗？删除后将无法恢复',
					onOk: () => {
						this.cardClick(item);
						this.doDel(item);
					},
					onCancel: () => {
						this.cardClick(item);
					}
				});
			},
			onSync(item) {
				console.log(item)
				this.roleId = item.id;
				sys.formRoleSync({
					roleId: item.id
				}).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.syncList = res.data.data;
						let arr = this.syncList.target.map(item => item.num);
						this.syncNum = arr.reduce(function(x, y) {
							return x + y;
						});
						this.syncModel = true;
					}
				}).catch(errors.call(this));
			},
			syncOk() {
				if(this.syncNum) {
					this.affirmSyncModel = true;
				} else {
					this.roleSync(() => {
						this.syncModel = false;
					});
				}
			},
			affirmSyncOk() {
				this.roleSync(() => {
					this.syncModel = false;
					this.affirmSyncModel = true;
				});
			},
			roleSync(cb) {
				sys.roleSync({
					roleId: this.roleId
				}).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						cb && cb();
					}
				}).catch(errors.call(this));
			},
			doDel(item) {
				delRole(item.id).then(valid.call(this)).then((res) => {
					if(res.ok) {
						this.getRoles();
					}
				}).catch(errors.call(this));
			},
			cardUpdate(item) {
				sys.RolelistData({
					menuId: this.appmenu.id,
					roleId:item.id
				}).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.roleModelList = res.data.data || [];
					}
				}).catch(errors.call(this));
				this.state.item = item;
				this.tryScopeData();
				this.addRoleItem.add = false;
				this.addRoleItem.show = true;
				this.addRoleItem.name = item.name;
				this.addRoleItem.enname = item.enname;
				this.addRoleItem.remarks = item.remarks;
				this.addRoleItem.dataScope = item.dataScope;
				this.addRoleItem.part = item.syncList.map(item => item.syncObjectId);

			},
			addRoleOk() {
				this.$refs['addrole'].validate((validok) => {
					if(validok) {
						let info = {
							name: this.addRoleItem.name,
							remarks: this.addRoleItem.remarks,
							dataScope: this.addRoleItem.dataScope,
							enname: this.addRoleItem.enname,
							menuId: this.appmenu.id,
							roleSyncIds: this.addRoleItem.part.join(',')
						};
						if(!this.addRoleItem.add) {
							info.id = this.state.item.id;
							this.state.clicked = this.state.item;
						}
						saveRole(info).then(valid.call(this)).then((res) => {
							if(res.ok) {
								this.addRoleClose();
								this.getRoles();
							}
						}).catch(errors.call(this))
					}
				});
			},
			addRoleClose() {
				if(this.state.item.id) {
					this.cardClick(this.state.item);
				}
				this.addRoleItem.show = false;
				this.$refs['addrole'].resetFields();
			},
			giveRight(item) {
				this.state.item = item;
				this.$nextTick(() => {
					this.$refs.rightstab.show();
				});
			},
			peopleChoose(item) {
				this.state.item = item;
				this.$nextTick(() => {
					this.$refs.rolepeople.show();
				});
			},
			tryScopeData() {
				if(this.alldataScope.length) {
					return;
				}
				dictData('sys_data_scope').then(valid.call(this)).then((res) => {
					if(res.ok) {
						this.alldataScope = res.data.data;
					}
				}).catch(errors.call(this));
			},
			doFresh(item) {
				this.getRoles();
				this.cardClick(item);
			},
			isRoleDisable(item) {
				// 中方后期教师、中方后期组长、美方后期教师、美方后期组长这4个角色不允许分配人员
				// 规划主管，规划顾问 不能自由分配人员
				//          const arr = ['6','7','8','9','704','705'];
				//          return arr.indexOf(item.id)>-1;
				return true;
			},

			isOkOk() {
				if(this.isBindTitle) {
					if(!this.tqInfo.tqUsername) {
						this.$refs.reason1.visible = true
						this.isOk = true
						this.$Message.info('请输入TQ账户')
						return
					}
					this.bindAccount()
				} else {
					this.unBindAccount()
				}
			},

			isOkCancel() {

			},

			isBindCancel() {
				this.isBind = false
			},

			isBindOk() {
				this.isBind = false
				this.isOk = true
			}
		}
	}
</script>