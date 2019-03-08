<style lang='less'>
	.conectCheckGsx {
		.count i {
			font-size: 18px;
			color: red;
			font-style: normal;
		}
		thead i {
			color: #bbbec4;
			font-size: 12px;
			&.on {
				color: #44bcb7;
			}
		}
		.comment {
			overflow: hidden;
			margin: 10px 0 15px;
			.left {
				width: 20%;
				float: left;
			}
			.right {
				width: 80%;
				float: left;
			}
		}
		.page-box {
			padding-top: 20px;
			padding: 18px;
			text-align: center;
		}
		.ivu-table-wrapper {
			border: none;
		}
		.ivu-table th {
			background: #fff;
		}
		.ivu-table:after {
			display: none;
		}
		.btn-lists-div {
			@h: 40px;
			@radius: 1px;
			position: relative;
			height: @h;
			line-height: @h;
			padding-left: 21px;
			margin-top: 22px;
			border: 1px solid #e0e0e0;
			border-radius: @radius;
			font-size: 14px;
			color: #666;
			background: #fafafa;
			&:before {
				@border-width: -1px;
				content: "";
				position: absolute;
				left: @border-width;
				top: @border-width;
				bottom: @border-width;
				width: 5px;
				border-top-left-radius: @radius;
				border-bottom-left-radius: @radius;
				background: #44bcb7;
			}
		}
		.table1 {
			th,
			td {
				&:nth-child(1) {
					width: 25%;
				}
				// &:nth-child(3){
				//     padding-left: 8%;
				// }
			}
		}
		// .table2{
		//     th,td{
		//         &:nth-child(4){
		//             padding-left: 5%;
		//         }
		//     }
		// }
	}
	
	.connectModel {
		.baseInfo {
			overflow: hidden;
		}
		.left {
			width: 50%;
			float: left;
		}
		.comment {
			margin: 10px 0;
			overflow: hidden;
			padding-left: 40px;
			span {
				float: left;
				width: 40px;
				margin-left: -40px;
			}
		}
		.closeModal {
			font-size: 14px;
		}
	}
</style>
<template>
	<div class="conectCheckGsx">
		<Tabs @on-click="addActive" v-model="tabValue">
			<TabPane :label="$t('PendingApproval')" name="0"></TabPane>
			<TabPane :label="$t('Approved')" name="1"></TabPane>
		</Tabs>
		<v-select style="width: 396px;margin: 15px 0;" :placeholder="$t('portal.studentName')" :datafunc="datafunc" icon="search" v-model="compact" k='cnname' @on-enter="textChange" @on-click="textChange" @selected="textChange">
		</v-select>
		<p class="count">{{planType}} <i>{{planNum}}</i></p>
		<div class="btn-lists-div">{{ $t("portal.connectList") }}</div>
		<Table :loading="loading" class="table1" v-if="tabValue == 0" :columns="columns1" :data="list" @on-filter-change="filterChange" @on-sort-change="sortTable">
		</Table>
		<Table :loading="loading" class="table2" v-if="tabValue == 1" :columns="columns2" :data="list" @on-filter-change="filterChange" @on-sort-change="sortTable">
		</Table>
		<div class="page-box" v-show="pageCount > 1">
			<div style="margin: auto;display: inline-block;">
				<Page :current="pageNo" :total="planNum" show-elevator show-total show-sizer :page-size="pageSize" @on-change="pageChange" @on-page-size-change="sizeChange">
				</Page>
			</div>
		</div>
		<Modal v-model="modal1" :title="$t('portal.showResults')" @on-ok="ok" width='728' class="connectModel" @on-cancel="cancel">
			<div class="baseInfo" style="over-float: hidden">
				<div class="left">
					<p><span>{{ $t("portal.connectCheckStuName") }}</span>{{user.stuName}}</p>
					<p><span>{{ baseInfoName }}</span>{{user.teaName}}</p>
				</div>
				<div class="left">
					<p><span>{{ $t("portal.connectCheckLabel") }}</span>{{user.label}}</p>
					<p><span>{{ $t("portal.connectCheckTime") }}</span>{{user.time}}</p>
				</div>
			</div>
			<!-- <div class="comment">
				<span>备注：</span>
				<div>
					{{user.remarks}}
				</div>
			</div> -->
			<div class="result">
				<p>{{ $t("portal.auditStatus") + user.auditStatus }}</p>
				<p>{{ $t("portal.reason") + user.reason }}</p>
			</div>
			<div slot="footer">
				<Button @click="closeModal" type="primary" class="closeModal">{{ $t("Common.ensure") }}</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import vSelect from '@public/modules/vSelect'
	import valid, {
		errors,
		common,
		sys
	} from "../libs/request";

	export default {
		props: {
			mod: {
				type: String,
				required: true
			},
			menuId: {
				type: String,
				required: true
			},
		},
		data() {
			return {
				user: {
					stuName: '',
					teaName: '',
					time: '',
					auditStatus: '',
					label: '',
					remarks: ''
				},
				baseInfoName: '',
				status: 0,
				pageNo: 1,
				pageCount: 0,
				pageSize: 10,
				compact: '',
				tabValue: 0, //tab
				planType: this.$t('portal.toBeAudited'),
				planNum: 0,
				orderFlag: 1, //排序
				modal1: false,
				list: [],
				handOverId: '',
				loading: true,
				columns1: [{
						title: this.$t('portal.studentName'),
						align: 'center',
						key: 'stuName',
						render: (h, params) => {
							return h("a", {
									on: {
										click: () => {
											let obj = {
												name: this.mod + ".addStudent",
												query: {
													studentId: params.row.stuId,
													menuId: this.menuId
												}
											}
											this.windowOpen(obj);
										}
									}
								},
								params.row.stuName)
						}
					},
					{
						title: '',
						align: 'center',
						key: 'teaNamea'
					},
					{
						title: this.$t('portal.connectType'),
						align: 'center',
						key: 'type',
					},
					{
						title: this.$t('portal.connectObj'),
						align: 'center',
						key: 'handOverName',
					},
					{
						title: this.$t('portal.submissionTime'),
						align: 'center',
						key: 'date',
						sortable: true,
						sortType: 'desc'
					},
					{
						title: this.$t('XxChoiceLog.type'),
						align: 'center',
						width: 150,
						render: (h, params) => {
							return h("a", {
									on: {
										click: () => {
											let obj = {
												name: this.mod + ".connectCheckDetail",
												query: {
													id: params.row.handOverId
												}
											}
											this.windowOpen(obj);
										}
									}
								},
								this.$t('portal.toConnectCheckDetail'))
						}
					}
				],
				columns2: [{
						title: this.$t('portal.studentName'),
						align: 'center',
						key: 'stuName'
					},
					{
						title: '',
						align: 'center',
						key: 'teaNamea'
					},
					{
						title: this.$t('portal.connectType'),
						align: 'center',
						key: 'type',
					},
					{
						title: this.$t('portal.connectObj'),
						align: 'center',
						key: 'handOverName',
					},
					{
						title: this.$t('portal.examinationTime'),
						align: 'center',
						key: 'auditStatus',
						render: (h, params) => {
								let state = params.row.auditStatus;
							return h('div', {}, state == 'save' || state == 'commit'?this.$t('portal.toBeAudited'):state == 'pass'?this.$t('Pass'):state == 'reject'?this.$t('portal.NotPass'):'123')
						},
						filters: [{
								label: this.$t('Pass'),
								value: 1
							},
							{
								label: this.$t('portal.NotPass'),
								value: 2
							}
						],
						filterMultiple: false,
						filterRemote() {}
					},
					{
						title: this.$t('AppTime'),
						key: 'date',
						align: 'center',
						sortable: true,
						sortType: 'desc'
					},
					{
						title: this.$t('XxChoiceLog.type'),
						align: 'center',
						width: 180,
						render: (h, params) => {
							return h("div", [
								h("a", {
									on: {
										click: () => {
											let obj = {
												name: this.mod + ".connectCheckDetail",
												query: {
													id: params.row.handOverId,
													edit: false
												}
											}
											this.windowOpen(obj);
										}
									}
								}, this.$t('portal.showHandOver')),
								h("a", {
									style: {
										marginLeft: '15px'
									},
									on: {
										click: () => {
											this.handOverId = params.row.handOverId;
											this.showModal();
										}
									}
								}, this.$t('portal.showResults'))
							])
						}
					}
				],
			}
		},

		components: {
			vSelect
		},

		mounted() {
			let name = this.$t('XxInnerinfo.teacher_plan');
			if(this.menuId == '201') {
				// 签约
				name = this.$t('portal.teacher_sign');
			}else if(this.menuId == '101'){
				// 选校管理
				name = this.$t('ChooseTheSchoolAdviser');
			}else if(this.menuId == '701'){
				// 文书
				name = this.$t('portal.teacher_docu');
			}else if(this.menuId == '901'){
				// 申请
				name = this.$t('portal.teacher_apply');
			}else if(this.menuId == '401'){
				// 规划
				name = this.$t('XxInnerinfo.teacher_plan');
			}
			this.$set(this.columns1[1],'title',name);
			this.$set(this.columns2[1],'title',name);
			this.addActive()
			this.baseInfoName = name + '：';
		},

		methods: {
			windowOpen(obj) {
				// 新窗口打开
				const {href} = this.$router.resolve(obj);
				window.open(href, '_blank');
			},
			showModal() {
				let params = {
					id: this.handOverId,
					menuId:this.menuId
				}
				common.getHandoverResult(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						let resultData = res.data.data;
						let users = this.user;
						if(resultData) {
							users.stuName = resultData.stuName;
							users.teaName = resultData.teaName;
							users.time = resultData.time;
							users.label = resultData.label;
							users.remarks = resultData.remarks;
							users.reason = resultData.reason;
							let state = resultData.auditStatus;
							if(state == 'save' || state == 'commit') users.auditStatus = this.$t('portal.toBeAudited')
							else if(state == 'pass') users.auditStatus = this.$t('Pass')
							else if(state == 'reject') users.auditStatus = this.$t('portal.NotPass')
						}
						this.modal1 = true;
					}
				}).catch(errors.call(this));
			},
			pageChange(page) {
				this.pageNo = page;
				this.geTaduitList();
			},

			sizeChange(size) {
				this.pageSize = size;
				this.geTaduitList();
			},

			sortTable(column) {
				// 0-升序
				// 1-降序
				this.orderFlag = column.order == 'desc' ? 1 : 0
				this.geTaduitList();
			},

			filterChange(val) {
				// 筛选
				let key = val._filterChecked[0];
				if(!key) {
					this.status = 1;
				} else if(key == 1) {
					this.status = 2;
				} else if(key == 2) {
					this.status = 3;
				}
				this.geTaduitList();
			},

			addActive(val) {
				this.status = val;
				if(!val) {
					this.status = 0;
				}
				this.planType = val == 0 ? this.$t('portal.toBeAudited') : this.$t('Approved');
				this.geTaduitList();
			},

			textChange() {
				this.geTaduitList();
			},

			datafunc() {
				return(resole, reject) => {

				}
			},

			cancel() {

			},

			ok() {

			},

			closeModal() {
				this.modal1 = false;
			},

			geTaduitList() {
				let params = {
					status: this.status,
					orderFlag: this.orderFlag,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					menuId: this.menuId
				}
				// 搜索框内容
				if(this.compact) {
					params.name = this.compact;
				}
				common.aduitList(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						let aduitData = res.data.data;
						this.list = aduitData.list;
						this.planNum = aduitData.count;
						this.pageCount = aduitData.pageCount;
						this.pageNo = aduitData.pageNo;
						this.loading = false;
					}
				}).catch(errors.call(this));
			}
		},
	}
</script>