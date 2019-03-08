<style lang="less">
	.docu-approval-boss {
		.ivu-table-column-center {
			background-color: #fff;
		}
		.ivu-table-row {
			td:last-child {
				display: flex;
				justify-content: space-around;
			}
			.ivu-table-cell {
				height: 37px;
			}
		}
		.ivu-table td {
			height: 37px;
		}
		.bill-paging {
			text-align: center;
			margin-top: 20px;
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
	.aproval-log-modal {
		.aproval-table-container {
			.ivu-modal-content {
				min-height: 400px;
			}
			.ivu-table-header {
				th {
					background-color: rgb(230, 230, 230);
				}
			}
		}
		.ivu-modal-footer {
				display: none;
		}
	}
	.docu-modal {
		font-size: 14px;
		color: #333;
		.ivu-modal-content {
			label {
				width: 80px !important;
				color: #999;
				text-align: right;
			}
		}
		.docu-modal-name {
			color: #44bcb7;
			cursor: pointer;
			user-select: none;
		}
	}
	.approval-table {
		line-height: 37px;
		border: none;
		.ivu-table {
			&::after {
				content: none;
			}
		}
		.ivu-table-filter-list-single {
			.ivu-table-filter-select-item {
				text-align: center !important;
			}
		}
		.ivu-table-tbody {
			font-size: 12px;
			line-height: 37px;
		}
	}
	.caozuo-renderssss {
		display: inline-block;
		width: 68px;
		height: 100%;
		color: #44bcb7;
		line-height: 36px;
		display: flex;
		display: -webkit-flex;
		justify-content: space-around;
		span {
			cursor: pointer;
			user-select: none;
			float: left;
		}
	}
	.hideRender {
		display: none !important;
		margin-right: 0 !important;
	}
	.docu-timing-gap-fixs {
		.docu-top-area-timing {
			margin-top: 10px !important;
		}
	}
	.ivu-table-filter-select-item {
		text-align: center;
	}
</style>
<template>
	<div class="docu-approval-boss">
		<DocuTopArea
			:sliderNav="sliderNav"
			ref="refDocuTopArea"
			class="docu-timing-gap-fixs"
			placeholder="请输入文书名称/文书顾问/学生姓名/申请学校"
			@onclickSearchBills="onclickSearchBills"
			@getTargetList="getTargetList"
			@slideNavChange="slideNavChange">
			<CaseBarFilter
				title="标签："
				:from="2"
				:menuId="pId"
				class="docu-manage-casebar-filter"
				@tagListChange="tagListChange"
			></CaseBarFilter>
		</DocuTopArea>

		<TopTitleAndButton
			titleTop="当前文书"
			:num="pageTotal"
			title="文书列表"
			btnVal="批量审核"
			:isShow="false"
			:btnList="btnlist"
			@onclickBtns="onclickBatchEdit"
		></TopTitleAndButton>

		<Table 
			:columns="docuColumns" 
			:data="docuData"
			ref="table"
			class="approval-table"
			@on-sort-change="onSortChange"
			@on-filter-change="onFilterChange"
			@on-selection-change="onSelectionChange">
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

		<!-- 审核modal -->
		<Modal
			v-model="modalDocu"
			title="审核文书"
			width="730"
			ref="refModalApproval"
			@on-ok="onclickDocuApprovalOk"
			@on-cancel="onclickDocuApprovalCancel"
			class="docu-modal">
			<Form label-position="left" :label-width="100">
				<FormItem label="文书名称">
					<p
						v-if="batchList && isBatch"
						class="docu-modal-name" 
						v-for="(item, index) in batchList"
						:key="index"
						@click="onclickDocuModalName(item.id)"
						style="line-height:25px;">
						{{item.name}}
					</p>
					<span @click="onclickDocuModalName(approvalData.fileId)" v-if="approvalData && !isBatch" class="docu-modal-name">{{approvalData.name}}</span>
				</FormItem>
				<FormItem label="文书类型" v-if="approvalData">
					<span>{{approvalData.typeLabel}}</span>
				</FormItem>
				<FormItem label="文书顾问" v-if="approvalData">
					<span>{{approvalData.adviserName}}</span>
				</FormItem>
				<FormItem label="申请学校" v-if="approvalData">
					<span>{{approvalData.schoolName}}</span>
				</FormItem>
				<FormItem label="提交时间" v-if="approvalData">
					<span>{{approvalData.updateDate}}</span>
				</FormItem>
				<FormItem label="审批结果">
					<div v-if="approval">
						<Button type="success" style="width: 80px; margin-right: 20px;" @click="onclickDocuApproval('approval')">通过</Button>
						<Button type="default" style="width: 80px;" @click="onclickDocuApproval('reject')">驳回</Button>
					</div>
					<div v-if="!approval">
						<Button type="default" style="width: 80px; margin-right: 20px;" @click="onclickDocuApproval('approval')">通过</Button>
						<Button type="success" style="width: 80px;" @click="onclickDocuApproval('reject')">驳回</Button>
					</div>
				</FormItem>
				<!-- v-if="!approval" -->
				<FormItem :label="reasonLabel">
					<Input type="textarea" :autosize="{minRows: 4,maxRows: 5}" placeholder="" v-model="descriptOrReason"></Input>
				</FormItem>
			</Form>
		</Modal>
		<!-- 日志 Modal -->
		<Modal
			v-model="modalLog"
			title="审核日志"
			width="730"
			style="min-height: 220px;"
			@on-ok="onclickLogOk"
			@on-cancel="onclickLogCancel"
			class="aproval-log-modal">
			<div class="aproval-table-container">
				<Table border :columns="columnsLog" height="300" :data="dataLog"></Table>
			</div>
		</Modal>
	</div>
</template>

<script>
import DocuTopArea from '../../modules/docuTop/topArea';
import TopTitleAndButton from '../../modules/docuTop/topTitleAndButton';
import CaseBarFilter from '@public/modules/caseBarFilter';
import {mapGetters,mapState, mapMutations, } from 'vuex';
import valid, {errors, docuManage, sys, common, } from '../../libs/request';
import { getOptions, tabChanges, pageChanges, pageSizeChanges, goingToStudentDetail, tableDocuTypeList} from '../../libs/tabChangeTools';
export default {
	name: 'DocuApproval',
	props: {
		pId: {
			required: true,
		},
	},
	components: {
		DocuTopArea,
		CaseBarFilter,
		TopTitleAndButton,
	},
	data() {
		return {
			pageTotal: 0,
			pageNo: 1,
			tabs: 1,
			pageSize: 10,
			startDate: null,
			endDate: null,
			isBatch: false, // 是否批量审核
			docuName: null, // 文书名称
			approvalResult: null, // 审核结果
			tableFilters: {},
			tags: [],
			sliderNav: [
				{
					label: '最近更新',
					name: '1',
				},
				{
					label: '待审核',
					name: '2',
				},
				{
					label: '已审核',
					name: '3',
				},
			],
			btnlist: [
				{
					type: 'primary',
					btnVal: '批量审核',
				},
			],
			batchList: null, // 选中列表项
			approvalData: null, // 审核时的数据
			approval: true, // 审批弹窗上的通过与驳回按钮
			reasonLabel: '备注',
			descriptOrReason: null, // 文书反馈 或者 拒绝理由
			docuColumns: [ // 文书列表标题
				{
					type: 'selection',
					align: 'center',
					width: 60,
				},
				{
					title: '文书名称',
					key: 'name',
					align: 'center',
					width: 250,
					filters: [],
					filterMultiple: false,
					filterMethod (value, row) {
						return true;
					},
					render: (h, params) => {
						const _this = this;
						const title = params.row.name;
						return h('span', {
							style: {
								position: 'relative',
								lineHeight: '35px',
								color: '#44bcb7',
								cursor: 'pointer',
								wordBreak: 'break-word',
								display: 'inline-block',
								width: '100%',
							},
							on: {
								click: () => {
									_this.jumpView(params.row.fileId);
								},
							},
						}, title);
					},
				},
				{
					title: '状态',
					key: 'statusLabel',
					align: 'center',
				},
				{
					title: '学生',
					key: 'studentName',
					align: 'center',
					render: (h, params) => {
						const student = params.row.studentName;
						return h('span', {
							style: {
								color: ' #44bcb7',
								cursor: 'pointer',
							},
							on: {
								click: () => {
									goingToStudentDetail(params.row.studentId, this);
								},
							},
						}, student);
					},
				},
		
				{
					title: "文书顾问",
					key: "adviserName",
					align: 'center',
				},
				{
					"title": "申请学校",
					"key": "schoolName",
					width: 100,
					'align': 'center',
					render: (h, params) => {
						const applySchool = params.row.schoolName ? params.row.schoolName : 'N/A';
						return h('span', applySchool);
					},
				},
				{
					"title": "更新时间",
					"key": "updateDate",
					'align': 'center',
					"sortable": true,
					render: (h, params) => {
						return h('span', params.row.updateDate.split(' ')[0]);
					},
				},
				{
					"title": "审核结果",
					"key": "auditStatusLabel",
					'align': 'center',
					filterMultiple: false,
					filters: [
						{
							label: '待审核',
							value: 'commit',
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
						let resText = '';
						if (params.row.auditStatusLabel  === '保存' || params.row.auditStatusLabel  === '提交审批') {
							resText = '待审核';
						} else {
							resText = params.row.auditStatusLabel ;
						}
						return h('span', {
						}, resText);
					},
				},
				{
					"title": "操作",
					"key": "month",
					'align': 'center',
					width: 150,
					render: (h, params) => {
						let logButton = null;
						let approvalButton = null;
						if(params.row.auditStatusLabel  === '待审核' || params.row.auditStatusLabel  === '提交审批') {
							approvalButton = '审核';
						} else {
							approvalButton = false;
						}
						logButton = (params.row.logNum > 0) ? '日志' : false;
						const renderArr = [
							h('span', {
								class: {
									'hideRender': !Boolean(approvalButton),
								},
								on: {
									click: () => {
										this.modalDocu = true;
										this.approvalData = params.row;
										this.approvalData.schoolName = this.approvalData.schoolName ? this.approvalData.schoolName : 'N/A';
									},
								},
							}, approvalButton),
							h('span', {
								class: {
									'hideRender': !Boolean(logButton),
								},
								on: {
									click: () => {
										this.modalLog = true;
										docuManage.listLog({
											id: params.row.id,
										}).then(valid.call(this)).then(res => {
											if(res.ok) {
												const listLogList = [];
												res.data.data.forEach((item, index) => {
													listLogList.push({
														index: index + 1,
														name: item.user.name,
														operate: item.content,
														updateDate: item.createTime,
													});
												});
												this.dataLog = listLogList;
											}
										}).catch(errors.call(this));
									},
								},
							}, logButton),
						];
						return h('div', {
							class: {
								"caozuo-renderssss": true,
							},
						}, renderArr)
					},
				}
			],
			docuData: [],
			columnsLog: [
                    {
                        'title': '序号',
						'key': 'index',
						'align': 'center',
						'width': 100,
                    },
                    {
                        'title': '操作人',
						'key': 'name',
						'align': 'center',
					},
					{
                        'title': '操作',
						'key': 'operate',
						'align': 'center',
					},
					{
                        'title': '时间',
						'key': 'updateDate',
						'align': 'center',
                    },
			],
			dataLog: [],
			modalDocu: false,
			modalLog: false,
		};
	},
	created() {
		this.dictListData('doc_essay_type_undergrad');

		this.getApprovalList({});
	},

	methods: {
		...mapMutations(['updateLoadingStatus']),
		/*
		* 文书在云盘中打开
		*/
		jumpView(id) {
			if(id) {
				window.open(`https://portal.ivygate.cn/index.php/webutils/document/${id}`);
			}
		},
		/*
		* 列表获取
		*/
		getApprovalList(data) {
			data = data ? data : {};
			// this.updateLoadingStatus({isLoading:true});
			switch (this.tabs) {
				case '2' : data.isAudited = '0'; break;
				case '3' : data.isAudited = '1'; break;
			};
			docuManage.listPageAudit(data).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.docuData = res.data.data.list;
					this.pageTotal = res.data.data.count;
					this.docuData.forEach(item => {
						if (item.auditStatusLabel !== '待审核') item._disabled = true;
					})
				}
			}).catch(errors.call(this)).finally(() => {
				this.updateLoadingStatus({isLoading: false});
			});
		},
		/*
		* 点击进行搜索
		*/
		onclickSearchBills(searchVal) {
			this.getApprovalList({
				name: searchVal,
			});
		},
		/*
		* 标签选择
		*/
		tagListChange(val) {
			this.tags = val;
			const data = getOptions(this);
			data.searchTags = val.length ? val : null;
			this.getApprovalList(data);
		},
		/*
		* 选择起止时间
		*/
		getTargetList(val1, val2) {
			this.startDate = val1;
			this.endDate = val2;
			const data = getOptions(this);
			this.getApprovalList(data);
		},
		/*
		* 点击批量审核按钮
		*/
		onclickBatchEdit() {
			if(!this.batchList || this.batchList.length == 0) {
				this.$Message.warning('请选择要批量审核的文书');
				return;
			} else {
				this.modalDocu = true;
				this.isBatch = true;
			}
		},
		/*
		* 点击文书名称
		*/
		onclickDocuModalName(id) {
			this.jumpView(id);
		},
		/*
		* 点击审批按钮 通过 驳回
		*/
		onclickDocuApproval(msg) {
			if (msg === 'approval') {
				this.approval = true;
				this.reasonLabel = '备注';
			} else if (msg === 'reject') {
				this.approval = false;
				this.reasonLabel = '驳回理由';
			}
		},
		/*
		* 点击 确定审核 审核
		*/
		onclickDocuApprovalOk() {
			this.$refs.refModalApproval.visible = true;
			this.modalDocu = true;
			if (!this.approval && !this.descriptOrReason) {
				this.$Message.error('请输入驳回理由');
				return;
			}
			// 发送请求 batchAudit
			const data = {};
			if (this.approval) {
				data.remarks = this.descriptOrReason;
			} else {
				data.reason = this.descriptOrReason;	
			}
			data.auditStatus = this.approval ? 'pass' : 'reject';
			if (this.isBatch && this.batchList) {
				const datas = [];
				this.batchList.forEach(item => {
					datas.push(item.id);
				})
				data.ids = datas.join(',');
				docuManage.batchAudit(data).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$refs.refModalApproval.visible = false;
						this.modalDocu = false;
						this.descriptOrReason = null;
						this.batchList = null;
						this.approval = true;
						this.isBatch = false;
						this.$Message.info('批量审核成功');
						this.getApprovalList();
					}
				}).catch(errors.call(this));
			} else {
				data.id = this.approvalData.id;
				docuManage.audit(data).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$refs.refModalApproval.visible = false;
						this.modalDocu = false;
						this.descriptOrReason = null;
						this.batchList = null;
						this.approval = true;
						this.$Message.info('审核成功');
						this.getApprovalList();
					}
				}).catch(errors.call(this));
			}
		},

		onclickDocuApprovalCancel() {
			this.modalDocu = false;
			this.approvalData = null;
			this.isBatch = false;
			this.$refs.table.selectAll(false);
			this.batchList = null;
			this.$Message.warning('取消审核');
		},
		/*
		* 文书审核日志
		*/
		onclickLogOk() {
			this.modalLog = true;
		},
		onclickLogCancel() {
			this.modalLog = false;
		},
		/*
		* slideNav 切换 isAudited
		*/
		slideNavChange(val) {
			this.tabs = val;
			const data = tabChanges(val, this);
			this.getApprovalList(data);
		},
		/*
		* Table 操作 
		*/
		onSelectionChange(val) {
			this.batchList = val;
		},
		onFilterChange(val) {
			if (val.key === 'name') {
				this.tableFilters.type = val._filterChecked[0] || null;
			} else if (val.key === 'auditStatusLabel'){
				this.tableFilters.auditStatus = val._filterChecked[0] || null;
			}
			const datas = getOptions(this);
			this.getApprovalList(Object.assign(this.tableFilters, datas));
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
			this.getApprovalList(Object.assign(this.tableFilters, datas));
        },
		/*
		* 分页
		*/
		onclickChangePage(index) {
			const data = pageChanges(this.tabs, this, index);
			this.getApprovalList(data);
		},
		onPageSizeChange(val) {
			pageSizeChanges(this.tabs, this, val);
			const datas = getOptions(this);
			this.getApprovalList(datas);
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
				this.docuColumns[1].filters = tempArr;
			})
		},
	},
};
</script>