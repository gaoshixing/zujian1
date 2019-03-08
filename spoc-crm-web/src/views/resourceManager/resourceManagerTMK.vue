<style lang="less">
	.resourceManager {
		border-top: 1px #e0e0e0 solid;
		.ivu-table th {
			background: #fff;
		}
    .search-data{
        position: relative;padding-left: 91px;zoom: 1;min-height: 32px;margin-top: 8px;
        &:after,&::before{
            content: '';display: table;clear: both;visibility: hidden;font-size: 0;height: 0;
        }
        .title{
            width: 84px;position: absolute;left: 0;top: 0;line-height: 30px;
            color: #999;text-align: right;
        }
        li,.more{
            float: left;padding: 5px 12px;cursor: pointer;margin:3px;line-height: 1;
            &.active{
                background: #44bcb6;color: #fff;
            }
        }
    }
		.resourceManager_time {
			margin-top: 8px;
		}
		.staff_filter {
			font-size: 12px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin-top: 10px;
			li {
				list-style: none;
				line-height: 16px;
				&.staff_filter_Tit {
					width: 84px;
					color: #999;
					margin-right: 10px;
					text-align: right;
					height: 2em;
					line-height: 2em;
					box-sizing: border-box;
				}
				&.staff_filter_Opt {
					padding: 4px 12px;
					cursor: pointer;
					margin-right: 10px;
					&.active {
						background: #44bcb7;
						color: #fff;
					}
				}
			}
		}
		.table_box {
			padding: 10px 0px 20px;
			.strip-tit {
				font-size: 14px;
				span {
					font-size: 16px;
					color: #44bcb7;
				}
			}
			.ivu-table-wrapper {
				border: none;
				.ivu-table {
					&:before,
					&:after {
						display: none;
					}
					.ivu-table-body {
						.ivu-table-tbody {
							.ivu-table-row {
								td {
									.ivu-badge-dot {
										right: -14px;
									}
								}
							}
						}
					}
				}
			}
		}
		.page-box {
			display: flex;
			justify-content: center;
			margin-top: 20px;
		}
	}
	.transferBody{
		.main_box {
			.ivu-form-item-label {
				color: #999;
			}
			.ivu-form-item{
				margin-bottom: 0;
			}
		}
	}
</style>

<template>
	<div class="resourceManager">
		<v-select style="width: 396px;margin: 15px 0;" placeholder="请输入客户姓名/编号/微信号" icon="search" v-model="search" k='cnname' :datafunc="searchDropList" @on-enter="textChange" @on-click="textChange" @selected="textChange">
		</v-select>
		<case-bar-filter :from="2" menuId="801" title="标签：" :width="84" :mgt="7" @tagListChange="tagListChange" align="right" class="caseBar" tit-color="#999">
		</case-bar-filter>
		<time-optpons ref="timeModel" @onDataPickStart="onDataPickStart" @onDataPickEnd="onDataPickEnd" @timeChange="timeChange">
		</time-optpons>
		<div class="search-data">
			<span class="title">客户分组：</span>
			<ul>
				<li :class="[!fzChecked ? 'active' : '']" @click="changeFz()">不限</li>
				<li v-for="item in fzlists" :key="item.id" @click="changeFz(item)" :class="{ active:fzChecked === item.id}">{{ item.name }}</li>
			</ul>
			<!--<Button style="margin-top:2px;margin-left: 8px;" type="primary" @click="showFzModal" size="small">编辑分组</Button>-->
		</div>
		<ul class="staff_filter">
			<li class="staff_filter_Tit">{{staff.tit}}</li>
			<li class="staff_filter_Opt" :class="{active:''==staffId}" @click="staffChange('')">全部</li>
			<li class="staff_filter_Opt" v-for="(item,index) in staff.options" :key="index" :class="{active:item.id==staffId}" v-if="index<staffIndex" @click="staffChange(item.id)">{{item.name}}</li>
			<li class="staff_filter_Opt" @click="isMore=!isMore" v-show="isMore">更多</li>
		</ul>
		<div class="table_box">
			<p class="strip-tit">共找到 <span>{{count}}</span> 条资源</p>
			<btn-list title="客户列表" :btnList="tableSlelcted.length?btninfo:[]"></btn-list>
			<Table :loading="loading" :columns="columns" :data="data" @on-selection-change="tableChange" @on-sort-change="sort"></Table>
		</div>
		<div class="page-box" v-if="count>10">
			<div style="margin: auto;display: inline-block;">
				<Page :total="count" :page-size="10" :current="pageNo" show-total :show-sizer="count>10" show-elevator @on-change="pageChange" @on-page-size-change="sizeChange" :page-size-opts="[10,20,50,80,100]"></Page>
			</div>
		</div>
		<Modal v-model="transfer" width="730" class-name="vertical-center-modal transferBody">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				选择转让人
			</p>
			<div>
				<v-select style="width: 396px;margin:0 0 10px 0;" placeholder="请输入客户姓名/编号" icon="search" v-model="searchRole" k='cnname' :datafunc="searchDropList" @on-enter="roleChange" @on-click="roleChange" @selected="roleChange">
				</v-select>
				
		<v-search-options :data="company.options" byKey="label" :searchTitle="company.tit" @on-select-item="fenpeiCompanyChange" labelWidth="98" v-if="company.options.length" multiple style="margin-top: 10px;">
		</v-search-options>
				<div class="main_box">
					<Form ref="affirmForm1" :label-width="100">
						<FormItem label="转让人：">
							<RadioGroup v-model="roleId">
								<Radio :label="item.id" v-for="item in roleList" :key="item.id">{{item.name}}</Radio>
							</RadioGroup>
						</FormItem>
					</Form>
				</div>
			</div>
			<div slot="footer">
				<Button @click="offTransfer">取消</Button>
				<Button type="primary" @click="okTransfer">确定</Button>
			</div>
		</Modal>

		<!-- 分组 -->
		<edit-group ref="editGroupRef" @getFzLists="getFzLists()"></edit-group>
		<!-- 发短信弹窗 -->
    	<send-message v-if="false" ref="sendMessageModal" @onRefresh="getLists"></send-message>
		<!-- 发邮件 -->
    	<email-modal v-if="false" ref="emailModal" @onRefresh="getLists"></email-modal>

	</div>
</template>

<script>
	import vSelect from '@public/modules/vSelect';
	import caseBarFilter from "@public/modules/caseBarFilter.vue";
	import timeOptpons from "../../modules/timeOptpons.vue";
	import BtnList from '@public/modules/btnlist';

	import vSearchOptions from "@public/modules/vSearchOptions.vue";
	import sendMessage from "../../modules/modal/sendMessage.vue";
	import emailModal from "../../modules/modal/emailModal.vue";
	import editGroup from "../../modules/modal/editGroup.vue";

	import valid, {
		errors,
		sys,
		common,
		crmCustomerTmk,
		crmNotification,
		crmCustomerShare,
		crmCustomer,
	} from "../../libs/request.js";
	export default {
		data() {
			return {
				fzChecked: '',
            checkedLists: [],
				loading: true,
				count: 20,
				pageNo: 1,
				isMore: true,
				staff: {
					tit: 'TMK专员：',
					options: []
				},
				search: '',
				tags: [],
				staffId: '',
				btninfo: [{
					text: '移动分组',
					type: 'primary',
					event: this.showMoveGroup
				},{
					text: '转让客户',
					type: 'primary',
					event: this.assign
				}, {
					text: '发短信',
					type: 'primary',
					event: this.Texting
				}, {
					text: '发邮件',
					type: 'primary',
					event: this.emails
				}, ],
				pageNo: 1,
				pageSize: 10,
				tableSlelcted: [],
				signTime: {
					searchName: '分单时间',
					list: [{
							label: '不限',
							id: ''
						}, {
							label: '今天',
							id: 1
						},
						{
							label: '最近7天',
							id: 2
						},
						{
							label: '最近30天',
							id: 3
						},
					]
				},
				months: '',
				beforeTime: '',
				afterTime: '',
				columns: [{
						type: 'selection',
						width: 36,
						align: 'center'
					},
					{
						title: '编号',
						align: 'center',
						key: 'cusCode',
						render: (h, params) => {
							let self = this;
							return h('a', {
								attrs: {
									href: "javascript:void(0)"
								},
								on: {
									click: () => {
										self.jump(params.row.cusId)
									}
								}
							}, params.row.cusCode ? parseInt(params.row.cusCode) : '')
						}
					},
					{
						title: '客户姓名',
						align: 'center',
						key: 'cusName',
					},
					{
						title: '分值',
						align: 'center',
						key: 'score',
						sortable: 'custom'
					},
					{
						title: '更新时间',
						align: 'center',
						key: 'updateDate',
						sortable: 'custom'
					},
					{
						title: '跟进阶段',
						align: 'center',
						key: 'statusLabel',
						filters: [],
						filterMultiple: false,
						filterRemote(value, key) {
							this.status = value[0];
							this.getList();
						}
					},
					{
						title: '状态',
						align: 'center',
						key: 'activeStatus',
						filters: [{
								label: '未激活',
								value: 0
							},
							{
								label: '已激活',
								value: 1
							}
						],
						filterMultiple: false,
						filterRemote(value, key) {
							this.activeStatus = value[0];
							this.getList();
						}
					},
					{
						title: 'TMK专员',
						align: 'center',
						key: 'ownerName',
					},
					{
						title: '操作',
						key: 'handle',
						align: 'center',
						render: (h, params) => {
							return h('div', {
								style: {
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								},
							}, [
								h("a", {
									style: {
										color: '#44bcb7',
										fontSize: '12px'
									},
									attrs: {
										href: "javascript:void(0)"
									},
									on: {
										click: () => {
											this.$router.push({
												name: "crm.detail",
												query: {
													id: params.row.cusId,
													tmk:1
//													from: 'myclient'
												}
											});
										}
									}
								}, '跟进'),
							])
						}
					}
				],
				data: [],
				isLoading: false,
				orderByType: '',
				orderByStatus: '',
				activeStatus: '',
				status: '',
				orderByMap: {
					score: 1,
					updateDate: 2,
				},
				transfer: false,
				searchRole: '',
				roleId: '',
				roleList: [],
				tableSelected: [],
				fzlists: [],
				company: {
					options: [],
					tit: '分公司'
				},
				companyId:'',
			}
		},
		computed: {
			staffIndex() {
				if(this.isMore) {
					return 9;
				} else {
					return this.staff.options.length;
				}
			}
		},
		components: {
			vSelect,
			caseBarFilter,
			timeOptpons,
			BtnList,
			sendMessage, emailModal, editGroup,
			vSearchOptions,
		},
		created() {
			let params = {
				isSeft: 1,
				roleIds: '904',
				name: '',
				pageSize: -1,
				group:this.fzChecked
			}
			sys.rolesMember(params).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.staff.options = res.data.data.list;
				}
			}).catch(errors.call(this));
			let params1 = {
				flag: 1
			}
			crmCustomer.showDictStatus(params1).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.columns[5].filters = res.data.data;
				}
			}).catch(errors.call(this));
			// 获取分组列表
			this.getFzLists();
			this.showTrans();
		},
		mounted(){
			this.setTimes();
			this.getList();
//			this.$refs.timeModel.timeChange(0);
		},
		methods: {
	    	setTimes(){
	    		let obj=this.$refs.timeModel.setTime(0);
//				this.beforeTime = obj.beforeTime;
//				this.afterTime = obj.afterTime;
	            if(!obj.beforeTime) obj.afterTime = ''
	            if(obj.beforeTime == obj.afterTime && obj.beforeTime) {
	                let time = new Date(new Date().setDate(new Date(obj.beforeTime).getDate() + 1));
					time.setHours(0);
					time.setMinutes(0);
					time.setSeconds(0);
					obj.afterTime = time.format('yyyy-MM-dd hh:mm:ss')
	            }
	            this.beforeTime = obj.beforeTime ? `${obj.beforeTime}` : '';
	            this.afterTime = obj.afterTime ? `${obj.afterTime}` : '';
	    	},
			getFzLists() { // 获取分组列表
				let params2 = {
					parentId: 5006
				}
				common.getUserTagList(params2).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.fzlists = res.data.data;
						this.$refs.editGroupRef.uploadLitst(this.fzlists);
					}
				}).catch(errors.call(this));
			},
			showFzModal() {
				// 编辑分组
				this.$refs.editGroupRef.showEditGroup(this.fzlists);
			},
			changeFz(obj) {
				// 选择客户分组
				if(obj) {
					this.fzChecked = obj.id;
				} else {
					this.fzChecked = '';
				}
				this.getList();
			},
			getList() {
				this.loading = true;
				let params = {
					"pageNo": this.pageNo,
					"pageSize": this.pageSize,
					"name": this.search,
					"orderByType": this.orderByType,
					"orderByStatus": this.orderByStatus,
					"activeStatus": this.activeStatus,
					"searchTags": this.tags,
					"startTime": this.beforeTime,
					"endTime": this.afterTime,
					"inFlag": '1',
					"userId": this.staffId,
					"status": this.status,

				}
				crmCustomerTmk.listPage(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.data = res.data.data.list;
						this.count = res.data.data.count;
						this.pageNo = res.data.data.pageNo;
						this.tableSlelcted=[];
						this.loading = false
					}
				}).catch(errors.call(this));
			},
			searchDropList(word) {
				return new Promise((resolve, reject) => {});
			},
			textChange(val) {
				this.$nextTick(() => {
					this.getList();
				})
			},
			//筛选标签变化
			tagListChange(tags) {
				this.tags = tags;
				this.pageNo = 1;
				this.getList();
			},
			timeChange(start, end) {
				this.beforeTime = start;
				this.afterTime = end;
				this.getList();
			},
			onDataPickStart(start, end) {
				this.beforeTime = start;
				this.afterTime = end;
				this.getList();
			},
			onDataPickEnd(start, end) {
				this.beforeTime = start;
				this.afterTime = end;
				this.getList();
			},
			sort(data) {
				if(data.order == 'normal') {
					this.sortType = '';
				} else if(data.order == 'asc') {
					this.orderByStatus = 0;
				} else {
					this.orderByStatus = 1;
				}
				this.orderByType = this.orderByMap[data.key];
				this.getList();
			},
			pageChange(val) {
				this.pageNo = val;
				this.$el.parentElement.scrollTop = 0
				this.getList();
			},
			sizeChange(val) {
				this.pageSize = val;
				this.getList();
			},
			assign() {
				this.transfer = true;
				this.roleChange();
			},
			jump(val) {
				this.$router.push({
					name: 'crm.detail',
					query: {
						id: val,
						isTmk: true,
						tmk:1
					}
				})
			},
			roleChange() {
				let params = {
					isSeft: 1,
					roleIds: '908,904',
					name: this.searchRole,
					companyIds:this.companyId,
					pageSize: -1
				}
				sys.rolesMember(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.roleList = res.data.data.list;
					}
				}).catch(errors.call(this));
			},
			offTransfer() {
				this.transfer = false;
				this.roleId = '';
				this.searchRole = '';
				this.companyId = '';
			},
			okTransfer() {
				let params = {
					cusIds: this.tableSlelcted.map(item => item.cusId).join(','),
					ownerId: this.roleId,
					flag: "1"
				}
				crmCustomer.batchSaveOwnerId(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						this.getList();
						this.offTransfer();
					}
				}).catch(errors.call(this));
			},
			tableChange(val) {
				this.tableSlelcted = val;
            	this.checkedLists = val;
			},
			Texting() {

			},
			emails() {

			},
			staffChange(val) {
				this.staffId = val;
				this.pageNo = 1;
				this.getList();
			},
        showMoveGroup() {
            // 移动分组
            this.$refs.editGroupRef.showMoveGroup(this.fzlists, this.checkedLists);
        },
        sendMessage(type,users,content,title) {
            // 发送短信、email
            let idLists = [];
            users.forEach(element => {
                idLists.push(element.cusId);
            });
            let data = {
                kind: type,
                customerIds: idLists.join(),
                content: content
            }
            if(type == 'crmgroupemail') {
                data.title = title
            }
            console.log(data)
            crmNotification.save(data).then(valid.call(this)).then(res => {
                if(res.ok) {
                    console.log(res.data.data)
                }
            }).catch(errors.call(this));
        },
			showTrans() {
				let params = {
					types: '1,2',
					grades: '2'
				}
				sys.officeList(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						let arr = res.data.data.allCompany.map((item) => {
							return {
								label: item.name.match(/[\u4e00-\u9fa5]+/g).join(''),
								id: item.id
							};
						})
						arr.unshift({
							label: '不限',
							id: ''
						});
						this.company.options = arr;
					}
				}).catch(errors.call(this));
			},
			fenpeiCompanyChange(val) {
				let arr = [];
				val.childTags.forEach((v, k) => {
					arr.push(v.id);
				})
				this.companyId = arr.join(',');
				this.roleChange();
			},
		}
	}
</script>