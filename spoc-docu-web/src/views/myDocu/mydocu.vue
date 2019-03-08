<style lang="less">
	.docu-manage-boss {
		.ivu-table-column-center {
			background-color: #fff;
		}
		.bill-paging {
			text-align: center;
			margin-top: 20px;
		}
		.ivu-tabs-tab {
			user-select: none;
		}
	}
	.docu-manage-casebar-filter {
		.titleBar {
			p {
				span:nth-of-type(1) {
					text-align: right !important;
				}
			}
		}
	}
	.docu-manage-form {
		.ivu-form-item {
			label {
				color: #999;
				width: 100px;
				font-size: 12px;
				text-align: right;
			}
		}
	}
	.docu-manage-ul {
		max-height: 290px;
		overflow: hidden;
		overflow-y: scroll;
	}
	.docu-manage-ul::-webkit-scrollbar {
		display: none;
	}
	.docu-manage-ul-list {
		float: right;
		width: 590px;
		font-size: 12px;
		li {
			list-style: none;
			span {
				color: #44bcb7;
				cursor: pointer;
			}
		}
		.ivu-select-selection {
			max-height: 92px;
			overflow: hidden;
			overflow-y: scroll;
		}
		.ivu-select-selection::-webkit-scrollbar {
    		display: none;
		}
	}
	.docu-manage-table {
		border: none;
		.ivu-table {
			&::after {
				content: none;
			}
		}
		.ivu-table-filter-select-item {
			text-align: center;
		}
		.ivu-table-tbody {
			font-size: 12px;
		}
		.ivu-table-cell {
			text-align: center;
		}
	}
	.is-shared-docu {
		&::after {
			content: '(共享)';
			display: inline-block;
			width: 32px;
			color: #999;
			position: absolute;
			right: 10px;
			text-align: center;
			top: 50%;
			transform: translateY(-50%);
		}
	}
	.modal-template-boss {
		p {
			font-size: 16px;
			text-align: center;
			margin-bottom: 40px;
		}
		.ivu-modal-body {
			padding: 50px 40px;
		}
		.ivu-modal-footer {
			display: none;
		}
		.modal-template-button-area {
			display: flex;
			justify-content: space-around;
			padding: 0 50px;
			button {
				width: 65px;
			}
		}
	}
	.aproval-log-modal {
		.aproval-table-container {
			.ivu-table-header {
				th {
					background-color: rgb(230, 230, 230);
				}
			}
		}
		.ivu-modal-footer {
				display: none;
		}
		.ivu-modal-content {
			height: 400px;
		}
	}
	.hideRender {
		display: none !important;
		margin-right: 0 !important;
	}
	.caozuo-render {
		display: inline-block;
		width: 126px;
		color: #44bcb7;
		span {
			float: left;
			cursor: pointer;
			user-select: none;
		}
		span:nth-of-type(1) {
			margin-right: 15px;
		}
		span:nth-of-type(2) {
			margin-right: 15px;
		}
	}
	.docu-timing-gap-fixer {
		.docu-top-area-timing {
			margin-top: 10px !important;
		}
	}
	.ivu-table-filter-select-item {
		text-align: center;
	}
</style>
<template>
	<div class="docu-manage-boss">
		<DocuTopArea
			class="docu-timing-gap-fixer"
			placeholder="请输入文书名称/学生姓名/申请学校/更新人"
			:sliderNav="sliderNav"
			@onclickSearchBills="onclickSearchInfos"
			@getTargetList="getTargetList"
			@slideNavChange="slideNavChange"
			>
			<CaseBarFilter
				title="标签："
				class="docu-manage-casebar-filter"
				style="margin-bottom: 5px;"
				:from="2"
				:menuId="pId"
				@tagListChange="tagListChange"
			></CaseBarFilter>
		</DocuTopArea>

		<TopTitleAndButton
			titleTop="为您筛选出"
			titleSubTop="份文书"
			:num="pageTotal"
			title="文书列表"
			:isShow="false"
			@onclickBtns="onclickBatchEdit"
		></TopTitleAndButton>

		<Table
			:columns="manageColumns" 
			:data="ManageData"
			size="large" 
			ref="table"
			@on-sort-change="onSortChange"
			@on-filter-change="onFilterChange"
			@on-selection-change="onclickSelectChange"
			class="docu-manage-table">
		</Table>

		<Page 
			class="bill-paging" 
			v-if="pageTotal > 10"
			show-sizer
			:total="pageTotal"
			:current="pageNo"
			:page-size="pageSize"
			show-total
			show-elevator
			@on-change="onclickChangePage"
			@on-page-size-change="onPageSizeChange">
		</Page>

		<Modal
			v-model="manageModal"
			ref="refManageModal"
			title="共享文书"
			width="730"
			@on-ok="onclickOk"
			@on-cancel="onclickCancel">
			<Form class="docu-manage-form">
				<FormItem label="已选文书">
					<ul class="docu-manage-ul-list docu-manage-ul">
						<li
							v-for="(item, index) in batchList"
							:key="index"
							style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
							<span @click='onclickGoingToPan(item.fileId)'>{{item.name}}</span>
						</li>
					</ul>
				</FormItem>
				<FormItem label="选择共享对象">
					<ul class="docu-manage-ul-list">
						<p>即设置文件对服务组内哪些成员公开?</p>
						<Select v-model="menbersModel" style="width:250px;" multiple placeholder="选择服务组成员">
							<Option v-for="(item,index) in memberList" :value="item.userId" :key="index" :disabled="item._disabled">{{ item.name }}</Option>
						</Select>
					</ul>
				</FormItem>
			</Form>
		</Modal>

		<modal
			v-model="modealApproval"
			title=""
			class="modal-template-boss"
			:styles="{top: '300px', backgroundColor: 'red', }"
			width="430px">
			<p>确定提交当前文书进行审核？</p>
			<div class="modal-template-button-area">
				<Button type="default" size="large" @click="onclickApprovalCancel">取消</Button>
				<Button type="success" size="large" @click="onclickApprovalOK">确认</Button>
			</div>
		</Modal>
		<!-- 日志 Modal -->
		<Modal
			v-model="modalLog"
			title="审核日志"
			width="730"
			@on-ok="onclickLogOK"
			@on-cancel="onclickLogCancel"
			class="aproval-log-modal">
			<div class="aproval-table-container">
				<Table border :columns="columnsLog" height=300 :data="dataLog"></Table>
			</div>
		</Modal>
	</div>
</template>

<script>
import { mapMutations, mapState, } from "vuex";
import DocuTopArea from '../../modules/docuTop/topArea';
import CaseBarFilter from '@public/modules/caseBarFilter';
import TopTitleAndButton from '../../modules/docuTop/topTitleAndButton';
import valid, { errors, sys, common, docuManage, } from '../../libs/request';
import { plServiceMember, } from '../../../../spoc-plan-web/src/libs/request';
import { getOptions, tabChanges, pageChanges, pageSizeChanges, goingToStudentDetail, } from '../../libs/tabChangeTools';
export default {
	name: 'DocuManage',
	components: {
		DocuTopArea,
		CaseBarFilter,
		TopTitleAndButton,
	},
	props: {
		pId: {
			required: true,
		},
	},
	data() {
		return {
			tabs: 1,
			pageTotal: 0,
			pageNo: 1,
			pageSize: 10,
			tags: [],
			tableFilters: {},
			startDate: null,
			endDate: null,
			totaleDocu: 0,
			filterDocuName: null,
			filterUpdater: null,
			batchList: [],
			modealApproval: false,
			modalLog: false,
			isBatch: false,
			approvalData: {},
			sliderNav: [
				{
					label: '最近更新',
					name: '1',
				},
				{
					label: '未定稿',
					name: '2',
				},
				{
					label: '已定稿',
					name: '3',
				},
			],
			manageModal: false,
			// 选中的可见人员
			menbersModel: [],
			// 对射可见列表
			memberList: [],
			sharedMemberList: null,
			// 文书 表头
			manageColumns: [
                    {
                        title: "文书名称",
                        key: "name",
						align: 'center',
						width: 250,
						render: (h, params) => {
							const _this = this;
							const shares = params.row.isOneself == '1' ?  false : true;
							const text = params.row.name ? params.row.name : '';
							return h('span', {
								style: {
									position: 'relative',
									lineHeight: '35px',
									color: '#44bcb7',
									cursor: 'pointer',
									wordBreak: 'break-word',
									display: 'inline-block',
									width: '100%',
									padding: '0 20px',
									paddingRight: '40px',
								},
								class: {
									'is-shared-docu': shares,
								},
								on: {
									click: () => {
										_this.jumpView(params.row.fileId);
									}
								},
							}, text + '    ');
						},
					},
					{
						title: '文书类型',
						key: 'typeLabel',
						align: 'center',
						filters: [],
                        filterMultiple: false,
                        filterMethod (value, row) {
							return true;
						},
					},
					{
						title: '文书进度',
						key: 'statusLabel',
						align: 'center',
					},
                    {
                        title: "学生",
                        key: "studentName",
						align: 'center',
						render: (h, params) => {
							return h('span', {
								style: {
									color: '#44bcb7',
									cursor: 'pointer',
								},
								on: {
									click: () => {
										goingToStudentDetail(params.row.studentId, this);
									},
								},
							}, params.row.studentName);
						},
                    },
                    {
                        title: "申请学校",
                        key: "schoolName",
						align: 'center',
						width: 100,
						render: (h, params) => {
							const applySchool = params.row.schoolName ? params.row.schoolName : 'N/A';
							return h('span', applySchool);
						},
                    },
					{
                        title: "更新人",
                        key: "auditorName",
						align: 'center',
						filters: [
							{
								label: '我自己',
								value: '0',
							},
							{
								label: '其他人',
								value: '1',
							}
						],
						filterMultiple: false,
                        filterMethod (value, row) {
							return true;
						},
						render: (h, params) => {
							const auditors = params.row.auditorName ? params.row.auditorName : 'N/A';
							return h('span', auditors);
						},
                    },
					{
                        title: "更新时间",
                        key: "updateDate",
						align: 'center',
						sortable: true,
						render: (h, params) => {
							return h('span', params.row.updateDate.split(' ')[0])
						},
					},
					{
						title: "审核状态",
						key: "auditStatusLabel",
						align: 'center',
						filterMultiple: false,
						filters: [
							{
								label: '未提交',
								value: 'save',
							},
							{
								label: '待审核',
								value: 'commit',
							},
							{
								label: '免审核',
								value: 'nocheck',
							},
							{
								label: '通过',
								value: 'pass',
							},
							{
								label: '驳回',
								value: 'reject',
							},
						],
						filterMethod (value, row) {
							return true;
						},
						render: (h, params) => {
							const resStatus = params.row.auditStatusLabel === null ? '免审核' : params.row.auditStatusLabel;
							return h('span', resStatus);
						},
					},
					{
                        title: "操作",
                        key: "caozuo",
						align: 'center',
						width: 150,
						render: (h, params) => {
							const _this = this;
							let showShare = (params.row.isShare == '0' ||  params.row.isOneself == '1') ? '共享' : '';
							let showSubmit = (params.row.auditStatusLabel == '保存' || (params.row.auditStatusLabel == '未提交')) ? '提交审核' : '';
							let showLog = (params.row.logNum > 0) ? '日志' : '';
							if(params.row._disabled) {
								showShare = showSubmit = showLog = '';
							}
							const renderArr = [
								h('span', {
									class: {
										'hideRender': !Boolean(showShare),
									},
									on: {
										click() {
											_this.manageModal = true;
											_this.batchList = [];
											_this.batchList[0] = {
												name: params.row.name, // 文书名称
												id: params.row.id, // 文书id
												fileId: params.row.fileId,
											};

											// 已经分享过的人员
											docuManage.listShare({
												id: params.row.id,
											}).then(valid.call(this)).then(res => {
												if(res.ok) {
													_this.sharedMemberList = res.data.data || [];
													_this.sharedMemberList.forEach(item => {
														_this.menbersModel.push(item.user.id);
													});
												}
											}).catch(errors.call(this));

											// 获取文书详情 拿到服务组ID
											docuManage.form({
												id: params.row.id,
											}).then(valid.call(this)).then(res => {
												if (res.ok) {
													// 获取服务组人员
													common.listGroupByUserId({
														serviceGroupId: res.data.data.serviceGroupId,
														menuId: _this.pId,
													}).then(valid.call(this)).then(response => {
														if (response.ok) {
															_this.memberList = response.data.data.members;
															for (let i = 0; i < _this.memberList.length; i++) {
																// _this.sharedMemberList.forEach((items, indexs) => {
																// 	if (items.user.id === _this.memberList[i].userId) {
																// 		_this.memberList[i]._disabled = true;
																// 	}
																// });
																// 分享对象中去掉自己
																if (_this.memberList[i].userId === _this.userInfo.id) {
																	_this.memberList.splice(i, 1);
																	i--;
																}
															}
														}
													}).catch(errors.call(this));
												}
											}).catch(errors.call(this));
										},
									},
								}, showShare),
								h('span', {
									class: {
										'hideRender': !Boolean(showSubmit),
									},
									on: {
										click() {
											_this.modealApproval = true;
											_this.approvalData.id = params.row.id;
										},
									},
								}, showSubmit),
								h('span', {
									class: {
										'hideRender': !Boolean(showLog),
									},
									on: {
									click: () => {
										this.modalLog = true;
										docuManage.listLog({
											id: params.row.id,
										}).then(valid.call(this)).then(res => {
											if(res.ok) {
												this.dataLog = [];
												res.data.data.forEach((item, index) => {
													this.dataLog.push({
														index: index + 1,
														name: item.user.name,
														operate: item.content,
														updateDate: item.createTime,
													});
												});
											}
										}).catch(errors.call(this));
									},
									},
								}, showLog),
							];
							return h('div', {
								class: {
									"caozuo-render": true,
								},
							}, renderArr);
						},
                    },
			],
			// 文书对象的数据
			ManageData: [],
			columnsLog: [
                    {
                        title: '序号',
						key: 'index',
						width: 100,
						align: 'center',
                    },
                    {
                        title: '操作人',
						key: 'name',
						align: 'center',
					},
					{
                        title: '操作',
						key: 'operate',
						align: 'center',
					},
					{
                        title: '时间',
						key: 'updateDate',
						align: 'center',
                    },
			],
			dataLog: [],
		};
	},
	computed: {
		...mapState({
			userInfo: state => state.userInfo,
		}),
	},
	watch: {
		totaleDocu(newVal) {
			if (newVal) {
				this.$Message.info({
					content: `您收到${this.totaleDocu}份共享文书,请尽快查看`,
					duration: 5,
				});
			}	
		},
	},
	created() {
		this.dictListData('doc_essay_type_undergrad');

		this.getDocuList();

		this.getInfoTips();
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		/*
		* 文书在云盘中打开
		*/
		jumpView(id) {
			console.log(id);
			if(id) {
				window.open(`https://portal.ivygate.cn/index.php/webutils/document/${id}`);
			}
		},
		/*
		* 获取文书列表
		*/
		getDocuList(data) {
			data = data ? data : {};
			switch (this.tabs) {
				case '2' : data.status = '-1'; break;
				case '3' : data.status = '6'; break;
			};
			// this.updateLoadingStatus({isLoading:true});
			docuManage.listPageCurrentUser(data).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.ManageData = res.data.data.list;
					this.pageTotal = res.data.data.count;
					this.ManageData.forEach(item => {
						if (item.isOneself == '0') {
							item._disabled = true;
						}
					})
				}
			}).catch(errors.call(this)).finally(() => {
				this.updateLoadingStatus({isLoading:false});
			});
		},
		/*
		* 点击进行搜索
		*/
		onclickSearchInfos(val) {
			this.getDocuList({
				name: val,
			});
		},
		/*
		* 标签选择
		*/
		tagListChange(val) {
			this.tags = val;
			const data = getOptions(this);
			data.searchTags = val.length ? val : null;
			this.getDocuList(data);
		},
		/*
		* 选择起止时间
		*/
		getTargetList(val1, val2) {
			this.startDate = val1;
			this.endDate = val2;
			const data = getOptions(this);
			this.getDocuList(data);
		},
		/*
		* 标签处理
		*/
		/*
		* 点击文书标题 前往云盘
		*/
		onclickGoingToPan(id) {
			this.jumpView(id);
		},
		/*
		* 点击批量共享按钮 多选
		*/
		onclickBatchEdit(index) {
			if (!this.batchList.length) {
				index === 0 ? this.$Message.warning('请选择要审核的文书') : this.$Message.warning('请选择要共享的文书');
				return;
			}
			// 弹出出现之前  需要判断选中项是否已经被分享或者被审批； 边界情况 ==> 点击全选无一条数据符合条件
			if (index === 0) { // 批量审核
				const tempList = [];
				this.batchList.forEach((item, index) => {
					if (item.auditStatusLabel === '保存') {
						tempList.push(item);
					}
				})
				this.batchList = tempList;
				if (!this.batchList.length) {
					this.$Message.warning('当前页无可提交审批文书');
					this.$refs.table.selectAll(false);
					return false;
				}
				this.isBatch = true;
				this.modealApproval = true;
			}
		},
		/*
		* 确定批量共享文书
		*/
		onclickOk() {
			this.manageModal = true;
			this.$refs.refManageModal.visible = true;
			if(!this.memberList.length) {
				this.$Message.warning('请选择要分享的人员');
				return;
			}
			docuManage.share({
				essayId: this.batchList[0].id,
				userIds: this.menbersModel.join(','),
			}).then(valid.call(this)).then(res => {
				if (res.ok) {
					this.batchList = [];
					this.memberList = [];
					this.menbersModel = [];
					this.manageModal = false;
					this.$refs.refManageModal.visible = false;
					const data = getOptions(this);
					this.getDocuList(data);
					this.$Message.info('文书共享成功');
					this.sharedMemberList = [];
				}
			})
		},
		/*
		* 关闭批量共享弹窗
		*/
		onclickCancel() {
			this.batchList = [];
			this.isBatch = false;
			this.menbersModel = [];
			this.sharedMemberList = [];
			this.$refs.table.selectAll(false);
		},
		/*
		* 取消批量审核
		*/
		onclickApprovalCancel() {
			this.modealApproval = false;
			this.batchList = [];
			this.$refs.table.selectAll(false);
			this.isBatch = false;
		},
		/*
		* 点击 确定审核 审核
		*/
		onclickApprovalOK() {
			const data = {};
			data.auditStatus = 'commit';
			data.id = this.approvalData.id;
			docuManage.audit(data).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.modealApproval = false;
					this.batchList = null;
					this.$Message.info('提交审核成功');
					this.pageNo = 1;
					const data = getOptions(this);
					this.getDocuList(data);
				}
			}).catch(errors.call(this));
		},
		/*
		* 查看审核日志
		*/
		onclickLogOK() {
			this.modalLog = true;
		},
		onclickLogCancel() {
			this.modalLog = false;
			this.dataLog = [];
		},
		/*
		* 监听 Table 的选择项
		*/
		onclickSelectChange(val) {
			this.batchList = val;
		},
		onFilterChange(val) {
			if (val.key === 'typeLabel') {
				this.tableFilters.type = val._filterChecked[0] || null;
			} else if (val.key === 'auditorName'){
				this.tableFilters.isAll = val._filterChecked[0] || null;
			} else if (val.key === 'auditStatusLabel'){
				this.tableFilters.auditStatus = val._filterChecked[0] || null;
			}
			const datas = getOptions(this);
			this.getDocuList(Object.assign({}, this.tableFilters, datas));
		},
        onSortChange(obj) {
			const datas = getOptions(this);
            if(obj.key == 'normal') {
				this.tableFilters.orderByType ? (this.tableFilters.orderByType = null) : '';
				this.tableFilters.orderByStatus ? (this.tableFilters.orderByStatus = null) : '';
            } else if (obj.key == 'updateDate') {
				this.tableFilters.orderByType = obj.key;
				this.tableFilters.orderByStatus = obj.order;
			}
			this.getDocuList(Object.assign({}, this.tableFilters, datas));
        },
		/*
		* sliderNav
		*/
		slideNavChange(val) {
			this.tabs = val;
			const data = tabChanges(val, this);
			this.getDocuList(data);
		},
		/*
		* 分页
		*/
		onclickChangePage(index) {
			const data = pageChanges(this.tabs, this, index);
			this.getDocuList(data);
		},
		onPageSizeChange(val) {
			pageSizeChanges(this.tabs, this, val);
			const datas = getOptions(this);
			this.getDocuList(datas);
		},
		/*
		* 获得消息通知
		*/
		getInfoTips() {
			sys.listUserNotify({
				readFlag: '0',
				menuId: this.pId,
				status: '0',
			}).then(valid.call(this)).then(res => {
				if (res.ok) {
					this.totaleDocu = res.data.data.list.length;
				}
			}).catch(errors.call(this));
		},
		/*
		* 文书字典获取
		*/
		dictListData(type) {
			sys.dictListData({ type, }).then(valid.call(this)).then(res => {
				const tempArr = [];
				res.data.data.forEach(item => {
					tempArr.push({
						label: item.label,
						value: item.value,
					});
				});
				this.manageColumns[1].filters = tempArr;
			})
		},
	},
};
</script>