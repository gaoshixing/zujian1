<style lang="less">
	.crew {
		padding-top: 26px;
		.title {
			.lf {
				font-size: 16px;
				font-weight: bold;
				line-height: 44px;
			}
			.allot {
				float: right;
				width: 90px;
				height: 30px;
				font-size: 14px;
				line-height: 16px;
			}
		}
		.teacher_box {
			.tit {
				line-height: 48px;
				font-size: 16px;
			}
			.info_box {
				overflow: hidden;
				.info {
					padding: 4px 0;
					display: inline-block;
					min-width: 200px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					.flag {
						float: left;
						border-radius: 50%;
						font-size: 12px;
						line-height: 36px;
						width: 36px;
						height: 36px;
						overflow: hidden;
						text-align: center;
						color: #fff;
						img{
							width: 36px;
							height: 36px;
						}
						&.charge {
							background: #44bcb7;
						}
						&.member {
							background: #cccccc;
						}
					}
					.name {
						float: left;
						font-size: 16px;
						margin-left: 10px;
						line-height: 36px;
					}
				}
			}
		}
	}
	
	.crew_modal {
		/*width: 730px;*/
		.add_list {
			padding: 14px 28px;
			.sel {
				width: 140px;
				height: 35px;
				margin-right: 44px;
			}
		}
		.table {
			.hid {
				/*display: none;*/
			}
		}
	}
</style>

<template>
	<div class="crew">
		<div class="title">
			<span class="lf">人员</span>
			<Button type="primary" class="allot" @click="allot" v-if="groupInfo.studentId && !$route.query.parent">人员分配</Button>
			<Button type="primary" class="allot" @click="allot1" v-if="!groupInfo.studentId">分配人员</Button>
		</div>
		<div v-if="this.groupInfo.studentId">
			<div class="teacher_box">
				<p class="tit">美方老师：</p>
				<div class="info_box">
					<div class="info" v-for="item in groupList.US" :key="item.id" v-if="item.leaderFlag==1">
						<div class="flag" :class="{charge:item.leaderFlag==1,member:item.leaderFlag==0}">
							<img :src="item.photo" v-if="item.photo"/>
							<span v-text="item.leaderFlag==1?'主管':'组员'" v-else></span>
						</div>
						<div class="name">
							<span>{{item.name}}</span><span>（{{item.roleName}}）</span>
						</div>
					</div>
				</div>
				<div class="info_box">
					<div class="info" v-for="item in groupList.US" :key="item.id" v-if="item.leaderFlag!=1">
						<div class="flag" :class="{charge:item.leaderFlag==1,member:item.leaderFlag==0}">
							<img :src="item.photo" v-if="item.photo"/>
							<span v-text="item.leaderFlag==1?'主管':'组员'"v-else></span>
						</div>
						<div class="name">
							<span>{{item.name}}</span><span>（{{item.roleName}}）</span>
						</div>
					</div>
				</div>
			</div>
			<div class="teacher_box">
				<p class="tit">中方老师：</p>
				<div class="info_box">
					<div class="info" v-for="item in groupList.CN" :key="item.id" v-if="item.leaderFlag==1">
						<div class="flag" :class="{charge:item.leaderFlag==1,member:item.leaderFlag==0}">
							<img :src="item.photo" v-if="item.photo"/>
							<span v-text="item.leaderFlag==1?'主管':'组员'" v-else></span>
						</div>
						<div class="name">
							<span>{{item.name}}</span><span>（{{item.roleName}}）</span>
						</div>
					</div>
				</div>
				<div class="info_box">
					<div class="info" v-for="item in groupList.CN" :key="item.id" v-if="item.leaderFlag!=1">
						<div class="flag" :class="{charge:item.leaderFlag==1,member:item.leaderFlag==0}">
							<img :src="item.photo" v-if="item.photo"/>
							<span v-text="item.leaderFlag==1?'主管':'组员'" v-else></span>
						</div>
						<div class="name">
							<span>{{item.name}}</span><span>（{{item.roleName}}）</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="teacher_box">
				<div class="info_box">
					<div class="info" v-for="item in crewlist" :key="item.id" style="width: 100px;">
						<div class="name" style="margin: 0;">
							<span>{{item.name}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Modal v-model="crewModal" width="730" class-name="crew_modal vertical-center-modal">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				人员分配
			</p>
			<div>
				<div class="add_list">

					<Select v-model="role" class="sel" placeholder="选择角色" @on-change="getStaff" :label-in-value="true">
						<Option :value="item.id" v-for="item in roleList" :key="item.id" :label="item.name"></Option>
					</Select>
					<Select v-model="firm" class="sel" placeholder="选择分公司" @on-change="getStaff">
						<Option :value="item.id" v-for="item in firmList" :key="item.id" :label="item.name.match(/[\u4e00-\u9fa5]+/).join('')"></Option>
					</Select>
					<Select v-model="staff" class="sel" placeholder="选择人员">
						<Option :value="item.id" v-for="item in staffList" :key="item.id" :label="item.name"></Option>
					</Select>
					<a href="javascript:void(0);" @click="addStaff" v-if="staff">确认</a>
				</div>
				<Table ref="crewTable" :columns="columns" :data="crewlist" class="table">
				</Table>
			</div>
			<div slot="footer">
				<Button type="primary" @click="crewOk">保存</Button>
			</div>
		</Modal>
		<role ref="setRole" @fresh="fresh" :selected="crewListId"></role>
		<!--show-->
	</div>
</template>

<script>
	import valid, {
		errors,
		common,
		plServiceMember,
		sys
	} from "../../libs/request.js";
	import { mapState, mapGetters } from 'vuex';
	import role from '@public/modules/rolePeopleRadio.vue';
	export default {
		props: {
			pid: {
				type: [Number, String],
				required: true,
			},
			groupInfo: {
				type: Object,
				required: true,
			}
		},
		data() {
			return {
				menuId:'',
				groupId: this.$route.params.gid,
				role: '',
				roleName: '',
				crewModal: false,
				crewListId: '',
				roleList: [],
				firm: '',
				firmList: [],
				staff: '',
				staffList: [],
				groupList: {},
				crewlist: [],
				columns: [{
					title: '角色',
					key: 'roleName',
				}, {
					title: '分公司',
					key: 'officeName',
				}, {
					title: '姓名',
					key: 'name',
					render: (h, params) => {
						let self = this;
						return h('div', {}, params.row.name)
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
						}, [
							h('a', {
								attrs: {
									href: "javascript:void(0)"
								},
								style: {
									fontSize: '12px',
									display:params.row.isDelete?'none':''
								},
								on: {
									click: function() {
										self.delCrew(params.row.id);
									}
								},
							}, '删除')
						])
					}
				}]
			}
		},
		computed: {},
		components: {
			role
		},
		created() {
			let params = {
				serviceGroupId: this.$route.params.gid,
			}
			common.listStateUser(params).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.groupList = res.data.data;
				}
			}).catch(errors.call(this));
			let params1 = {
				grade: '2',
                types: '1,2'
			}
			sys.officeList(params1).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.firmList = res.data.data.allCompany;
				}
			}).catch(errors.call(this));
			let params2 = {
				serviceGroupId: this.groupId,
			}
			if(this.$route.query.parent == 'group') {
				params2.menuId = "401"
			}
			common.listUser(params2).then(valid.call(this)).then(res => {
				if(res.ok) {
					let arr = [];
					arr = res.data.data.members;
					arr.forEach((v, k) => {
						v.isEdit = false;
					})
					this.crewlist = arr;
				}
			}).catch(errors.call(this));
			if(this.groupInfo.studentId){
				let params3 = {
					id: this.$route.params.gid || this.pid
				}
				common.plStudentData(params3).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.menuId = res.data.data.stuMenuId;
					}
				}).catch(errors.call(this));
			}else{
				this.menuId=this.pid
			}
//			console.log(this.pid)
		},
		methods: {
			getList() {
				let params = {
					serviceGroupId: this.groupId,
				}
				common.listStateUser(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.groupList = res.data.data;
						console.log(res)
					}
				}).catch(errors.call(this));
			},
			allot() {
				let params2 = {
					menuId: this.pid,
					groupId:this.groupId
				}
				common.getRoleListByWork(params2).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.roleList = res.data.data;
						this.crewModal = true;
						this.getTableList();
					}
				}).catch(errors.call(this));
			},
			allot1() {
				//				let params2 = {
				//					menuId: this.pid
				//				}
				//				sys.listMenuRole(params2).then(valid.call(this)).then(res => {
				//					if(res.ok) {
				//						this.roleList = res.data.data.roleList;
				//						this.crewModal = true;
				this.getTableList();
				//					}
				//				}).catch(errors.call(this));
			},
			getStaff(val) {
				if((typeof val)=="object") {
					this.roleName = val.label;
				}
				if(this.role && this.firm) {
					let params2 = {
						roleId: this.role,
						officeId: this.firm,
						groupId: this.groupId,
						menuId: this.pid
					}
					common.findRoleIdAndOfficeIdByList(params2).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.staffList = res.data.data;
						}
					}).catch(errors.call(this));
				}
			},
			addStaff() {
				let params2 = {
					user: this.staff,
					roleName: this.roleName,
					roleId: this.role,
					serviceGroupId: this.groupId,
					menuId: this.menuId
				}
				common.save(params2).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.role = '';
						this.roleName = '';
						this.firm = '';
						this.staff = '';
						this.getTableList();
					}
				}).catch(errors.call(this));
			},
			getTableList() {
				let params2 = {
					serviceGroupId: this.groupId,
				}
				if(this.$route.query.parent == 'group') {
					params2.menuId = "401"
				}
				common.listUser(params2).then(valid.call(this)).then(res => {
					if(res.ok) {
						let arr = [];
						arr = res.data.data.members;
						arr.forEach((v, k) => {
							v.isEdit = false;
						})
						this.crewlist = arr;
						if(!this.groupInfo.studentId) {
							this.crewListId = this.crewlist.map(item => item.userId);
							if(this.crewListId.length > 1) {
								this.crewListId = this.crewListId.join(',');
							} else {
								this.crewListId = this.crewListId.toString();
							}
							this.$refs.setRole.show();
						}
					}
				}).catch(errors.call(this));
			},
			delCrew(id) {
				let params2 = {
					id: id,
				}
				common.deleteMember(params2).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.getTableList();
					}
				}).catch(errors.call(this));
			},
			crewOk() {
				this.getList();
				this.crewModal = false;
			},
			fresh(val) {
				console.log(val)
				let arr = [];
				arr = val.map(item => item.id);
				let params2 = {
					groupId: this.groupId,
					userIds: arr.join(',')
				}
				common.batchsaveDiscussionMember(params2).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.getList();
						let params2 = {
							serviceGroupId: this.groupId,
						}
						if(this.$route.query.parent == 'group') {
							params2.menuId = "401"
						}
						common.listUser(params2).then(valid.call(this)).then(res => {
							if(res.ok) {
								let arr = [];
								arr = res.data.data.members;
								arr.forEach((v, k) => {
									v.isEdit = false;
								})
								this.crewlist = arr;
							}
						}).catch(errors.call(this));
					}
				}).catch(errors.call(this));
			}
		}
	}
</script>