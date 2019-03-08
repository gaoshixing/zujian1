<style lang="less">
	.docu-manage-boss {
		.bill-paging {
			text-align: center;
			margin-top: 20px;
		}
		.ivu-tabs-tab {
			user-select: none;
		}
	}
	.docu-manage-casebar-filters {
		line-height: 32px !important;
		.titleBar {
			p {
				span:nth-of-type(1) {
					text-align: right !important;
				}
			}
		}
	}
	.docu-manage-tables {
		border: none;
		.ivu-table {
			border-top: solid 1px #e5e5e5;
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
	}
	.top-title-and-button-top-title {
		width: 100%;
		height: 45px;
		line-height: 45px;
		font-weight: 500;
		font-size: 14px;
		margin-top: 10px;
		span {
			font-size: 16px;
			color: red;
			font-weight: bold;
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
	.caozuo-renders {
		display: inline-block;
		width: 90px;
		color: #44bcb7;
		margin-left: 10px;
		margin-top: 3px;
		span {
			cursor: pointer;
			user-select: none;
		}
	}
	.hideRender {
		display: none !important;
		margin-right: 0 !important;
	}
	.docu-timing-gap-fix {
		.docu-top-area-timing {
			margin-top: 5px !important;
		}
	}
	.ivu-table-filter-select-item {
		text-align: center;
	}
</style>
<template>
	<div class="docu-manage-boss">

		<DocuTopArea
			:sliderNav="sliderNav"
			ref="refDocuTopArea"
			class="docu-timing-gap-fix"
			placeholder="请输入文书名称/文书顾问/学生姓名/申请学校"
			@onclickSearchBills="onclickSearchInfos"
			@getTargetList="getTargetList"
			@slideNavChange="slideNavChange">
			<CaseBarFilter
				title="标签："
				modelName="文书模块"
				:from="2"
				:menuId="pId"
				class="docu-manage-casebar-filters"
				style="margin-bottom: 5px;"
				@tagListChange="tagListChange"
			></CaseBarFilter>
			<CaseBar
				v-if="isCeo || isAdmin"
				title="分公司"
				typeKind="controlled"
				:tagList="branchList"
				:num="branchListIndex1"
				@addAcitveCon="addAcitveCon"
				style="margin-bottom: 5px;"
			></CaseBar>
			<CaseBar
				v-if="isCeo || isAdmin || isBranchOfficeLeader"
				title="文书组"
				typeKind="group"
				:tagList="docuGroup"
				:num="branchListIndex2"
				style="margin-bottom: 5px;"
				@addAcitveGroup="addAcitveConGroup"
			></CaseBar>
			<CaseBar
				title="文书顾问"
				typeKind="man"
				:tagList="docuConsultant"
				:num="branchListIndex3"
				@addAcitve="addAcitveConConsultant"
			></CaseBar>
		</DocuTopArea>

		<div class="top-title-and-button-top-title">
			为您筛选出 <span>{{pageTotal}}</span> 份文书
		</div>

		<Table 
			:columns="manageColumns" 
			:data="ManageData" 
			size="large"
			ref="table"
			@on-sort-change="onSortChange"
			@on-filter-change="onFilterChange"
			class="docu-manage-tables">
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
		<modal
			v-model="modealTemplate"
			title=""
			class="modal-template-boss"
			:styles="{top: '300px', backgroundColor: 'red', }"
			width="430px">
			<p>{{templateText}}</p>
			<div class="modal-template-button-area">
				<Button type="default" size="large" @click="onclickTemplateCancel">取消</Button>
				<Button type="success" size="large" @click="onclickTemplateOK">确认</Button>
			</div>
		</Modal>

	</div>
</template>

<script>
import CaseBar from '../../modules/caseBar';
import DocuTopArea from '../../modules/docuTop/topArea';
import CaseBarFilter from '@public/modules/caseBarFilter';
import { mapMutations, mapState, mapGetters, } from "vuex";
import valid, { errors, sys, common, docuManage, } from '../../libs/request';
import { getOptions, pageChanges, tabChanges, pageSizeChanges, goingToStudentDetail, waitUntil} from '../../libs/tabChangeTools';
export default {
	name: 'DocuManage',
	props: {
		pId: {
			required: true,
		},
	},
	components: {
		DocuTopArea,
		CaseBarFilter,
		CaseBar,
	},
	data() {
		return {
			pageTotal: 0,
			pageNo: 1,
			pageSize: 10,
			startDate: null,
			endDate: null,
			totaleDocu: 0,
			tabs: 1,
			tableFilters: {},
			docuGroupId: '', // 分书组ID
			docuConsultantId: null, // 文书顾问ID
			branchList: [ {id: null, name: '全部'}, ], // 分公司
			docuGroup: [ {id: null, name: '全部'}, ],
			docuConsultant: [ {userId: null, userName: '全部'}, ], // 文书顾问list
			batchList: [],
			branchListIndex1: 0, // 点击选中
			branchListIndex2: 0,
			branchListIndex3: 0,
			filterDocuName: null,
			filterUpdater: null,
			modealTemplate: false, // 设置为文书模板
			modelEssayId: null,
			templateText: null,
			companyId: null,
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
			// 文书 表头
			manageColumns: [
				{
					title: "文书名称",
					key: "name",
					align: 'center',
					width: 250,
					render: (h, params) => {
						const _this = this;
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
									}
								},
						}, params.row.name + '    ')
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
						}, params.row.studentName)
					},
				},
				{
					title: "文书顾问",
					key: "adviserName",
					align: 'center',
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
					title: "更新时间",
					key: "updateDate",
					align: 'center',
					"sortable": true,
					render: (h, params) => {
						return h('span', params.row.updateDate.split(' ')[0])
					},
				},
				{
					title: "操作",
					key: "caozuo",
					width: 150,
					align: 'center',
					render: (h, params) => {
						const _this = this;
						const setModel = params.row.isModel == '1' ? false : '设为范本';
						const renderArr =[
							h('span', {
								class: {
									'hideRender': !Boolean(setModel),
								},
								on: {
									click() {
										if (params.row.status !== '6') {
											_this.templateText = '当前文书未定稿，确定设置为文书范本？';
										} else {
											_this.templateText = '确定将当前文书设置为文书范本？';
										}
										_this.modealTemplate = true;
										_this.modelEssayId = params.row.id;
									},
								},
							}, setModel)
						];
						return h('div', {
							class: {
								"caozuo-renders": true,
							},
						}, renderArr);
					},
				},
			],
			// 文书对象的数据
			ManageData: [],
		};
	},
	computed: {
		...mapState({
			userInfo: state => state.userInfo,
		}),
		...mapGetters('docu',['isAdmin', 'isCeo', 'isBranchOfficeLeader', 'isEssayLeaser']),
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
		// companyId(newVal) {
		// 	console.log(newVal);
		// 	if (this.isAdmin || this.isCeo || this.isBranchOfficeLeader) this.getDocuGroup();
		// 	this.getDocuConsultant();
		// 	this.getManageList({});
		// },
	},
	created() {
		this.dictListData('doc_essay_type_undergrad');

		this.getInfoTips();
	},
	mounted() {
		waitUntil(()=>{
			return !!this.userInfo.companyId;
		},()=>{
			// 分公司列表
			this.companyId = this.userInfo.companyId;
			if (this.isAdmin || this.isCeo) this.getCompanyList();

			if (!this.isAdmin && !this.isCeo && !this.isBranchOfficeLeader) {
				this.getDocuConsultant();
				this.getManageList({});
			}
		});
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		/*
		* 文书在云盘中打开
		*/
		jumpView(id) {
			if(id) {
				window.open(`https://portal.ivygate.cn/index.php/webutils/document/${id}`);
			}
		},
		/*
		* 公司列表获取
		*/
		getCompanyList() {
			if (!this.isAdmin && !this.isCeo) return false;

			sys.controlledList().then(valid.call(this)).then(res => {
				if (res.ok) {
					const tempData = {};
					this.branchList = res.data.data;
					this.branchList.forEach((item, index) => {
						if (item.companyName === '北京') {
							tempData.companyName = item.companyName;
							tempData.id = item.id;
							this.companyId = item.id;
							this.branchList.splice(index, 1);
						}
					});
					this.branchList.unshift(tempData);
					if (this.isAdmin || this.isCeo || this.isBranchOfficeLeader) this.getDocuGroup();
					this.getDocuConsultant();
					this.getManageList({});
				}
			}).catch(errors.call(this));
		},
		/*
		* 文书组获取
		*/
		getDocuGroup() {
			common.findGroupNameByMenu({
				officeId: this.companyId,
				menuId: this.pId,
			}).then(valid.call(this)).then(res => {
				if (res.ok) {
					this.docuGroup = [];
					res.data.data.forEach(item => {
						this.docuGroup.push({
							id: item.id,
							name: item.name,
						});
					});
					this.docuGroup.unshift({
						id: null,
						name: '全部',
					});
					this.docuGroupId = null;
				}
			}).catch(errors.call(this));
		},
		/*
		* 文书顾问获取
		*/
		getDocuConsultant() {
			if (this.isAdmin || this.isCeo || this.isBranchOfficeLeader) { // ceo || 分公司 leader
                    common.listByAll({
						groupId: this.docuGroupId,
						menuId: this.pId,
						officeId: this.companyId,
					}).then(valid.call(this)).then(res => {
                        if(res.ok) {
							this.docuConsultant = [];
							res.data.data.forEach(item => {
								this.docuConsultant.push({
									userId: item.user.userId,
									userName: item.user.name,
								});
							});
							this.docuConsultant.unshift({
								userName: '全部',
								userId: null,
							});
						}
                    })
                    .catch(errors.call(this))
			} else { // 主管身份
				common.findListByUserId({
					menuId: this.pId,
				}).then(valid.call(this)).then(res => {
					if (res.ok) {
						this.docuConsultant = [];
						res.data.data.forEach(item => {
							this.docuConsultant.push({
								userId: item.userId,
								userName: item.name,
							});
						});
						this.docuConsultant.unshift({
							userName: '全部',
							userId: null,
						});
					}
				}).catch(errors.call(this));
				}
		},
		/*
		* table列表 获取
		*/
		getManageList(data) {
			data.companyId = this.companyId;
			switch (this.tabs) {
				case '2' : data.status = '-1'; break;
				case '3' : data.status = '6'; break;
			};
			docuManage.listPage(data).then(valid.call(this)).then(res => {
				if (res.ok) {
					this.ManageData = res.data.data.list;
					this.pageTotal = res.data.data.count;
				}
			}).catch(errors.call(this)).finally(() => {});
		},
		/*
		* 点击进行搜索
		*/
		onclickSearchInfos(val) {
			this.getManageList({
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
			this.getManageList(data);
		},
		/*
		* 时间过滤
		*/
		getTargetList(val1, val2) {
			this.startDate = val1;
			this.endDate = val2;
			const data = getOptions(this);
			this.getManageList(data);
		},
		/*
		* 标签处理
		*/
		// 分公司
		addAcitveCon(val1) {
			this.branchListIndex1 = val1.index;
			this.companyId = val1.id;
			if (this.isAdmin || this.isCeo || this.isBranchOfficeLeader) this.getDocuGroup();
			this.getDocuConsultant();
			this.getManageList({});
		},
		// 文书组
		addAcitveConGroup(val2) {
			this.docuGroupId = val2.id;
			this.branchListIndex2 = val2.index;
			const data = {
				companyId: this.companyId,
				gropuId: this.docuGroupId,
			}
			this.getDocuConsultant();
			this.getManageList(data);
		},
		// 文书顾问
		addAcitveConConsultant(val3) {
			this.docuConsultantId = val3.id;
			this.branchListIndex3 = val3.index;
			const data = {
				companyId: this.companyId,
				gropuId: this.docuGroupId,
				teacherId: this.docuConsultantId,
			};
			this.getManageList(data);
		},
		/*
		* 设置为模板
		*/
		onclickTemplateCancel() {
			this.modealTemplate = false;
		},
		onclickTemplateOK() {
			this.modealTemplate = false;
			docuManage.modelEssay({
				id: this.modelEssayId,
			}).then(valid.call(this)).then(res => {
				if(res.ok) {
					const data = getOptions(this);
					this.getManageList(data);
					this.$Message.info('设为范本成功');
				}
			}).catch(errors.call(this));
		},
		/*
		* 监听 Table 的选择项
		*/
		onSelectionChange(val) {
			const tempData = val;
			this.batchList = val;
		},
		onFilterChange(val) {
			if (val.key === 'typeLabel') {
				this.tableFilters.type = val._filterChecked[0] || null;
			} else if (val.key === 'auditorName') {
				this.tableFilters.isAll = val._filterChecked[0] || null;
			}
			const datas = getOptions(this);
			this.getManageList(Object.assign(this.tableFilters, datas));
		},
        onSortChange(obj) {
			const datas = getOptions(this);
            if(obj.order == 'normal') {
				this.tableFilters.orderByType ? (this.tableFilters.orderByType = null) : '';
				this.tableFilters.orderByStatus ? (this.tableFilters.orderByStatus = null) : '';
            } else if (obj.key == 'updateDate') {
				this.tableFilters.orderByType = obj.key;
				this.tableFilters.orderByStatus = obj.order;
			}
			this.getManageList(Object.assign(this.tableFilters, datas));
		},
		/*
		* slideNav 切换
		*/
		slideNavChange(val) {
			this.tabs = val;
			const data = tabChanges(val, this);
			this.getManageList(data);
		},
		/*
		* 分页
		*/
		onclickChangePage(index) {
			const data = pageChanges(this.tabs, this, index);
			this.getManageList(data);
		},
		onPageSizeChange(val) {
			pageSizeChanges(this.tabs, this, val);
			const datas = getOptions(this);
			this.getManageList(datas);
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