<style lang="less">
	.apply-info-boss {
		.close-my-close {
			.docu-top-area-timing {
				margin-top: 0;
				padding-right: 58px;
			}
		}
		.my-close-table {
			border: none;
			.ivu-table {
				&::after {
					content: none;
				}
			}
			.ivu-table-cell {
				color: #333;
			}
		}
		.bill-paging {
			text-align: center;
			margin-top: 20px;
		}
		.apply-info-casebar-filters {
			.titleBar {
				p {
					span:nth-of-type(1) {
						text-align: right !important;
					}
				}
			}
		}
	}
</style>

<template>
	<div class="apply-info-boss">
		<TopArea
			class="close-my-close"
			:sliderNav="sliderNav"
			placeholder="输入申请学校/专业项目/学生姓名"
			@slideNavChange="slideNavChange"
			@onclickSearchBills="onclickSearch"
			@getTargetList="getTargetList">

			<CasebarFilter
				title="标签："
				:from="2"
				:menuId="pId"
				modelName="申请模块"
				style="margin-bottom: 9px;"
				class="apply-info-casebar-filters"
				@tagListChange="tagListChange"
			></CasebarFilter>

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
				v-if="isCeo || isAdmin || isBranchOfficeLeader || isAplManage"
				title="分组"
				typeKind="group"
				:tagList="docuGroup"
				:num="branchListIndex2"
				style="margin-bottom: 5px;"
				@addAcitveGroup="addAcitveConGroup"
			></CaseBar>
			<CaseBar
				v-if="isCeo || isAdmin || isBranchOfficeLeader || isAplManage || isAplLeaser"
				title="申请顾问"
				typeKind="man"
				:tagList="docuConsultant"
				:num="branchListIndex3"
				@addAcitve="addAcitveConConsultant"
			></CaseBar>

			<TagList
				title="完成状态"
				:tagList="tagList"
				@onclickChoseTags="onclickChoseTags"
			></TagList>
		</TopArea>
		<LargeTable
			fixedHeader="stuName,schoolName"
			:edit=true
			:total="pageTotal"
			:tableData2="largeTable.tableData2"
			:checkBoxList="largeTable.checkBoxList"
			:tableColumnsChecked="largeTable.tableColumnsChecked"
			:table2ColumnList="largeTable.table2ColumnList"
			@modifyTableInfos="modifyTableInfos"
			@getchangedCheckedItem="getchangedCheckedItem"
			@onSortChange="onSortChange"
			@onFilterChange="onFilterChange"
		></LargeTable>
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
		<CreatExamInfo
			:studentType='apply'
			ref="refCreatExamInfo"
			:groupId="studentInfo.groupId"
			:studentName="studentInfo.name"
			@onclickCloseModal="onclickCloseModal"
		></CreatExamInfo>
	</div>
</template>

<script>
import CaseBar from '../../modules/caseBar';
import TagList from '../../modules/tagSelect';
import { waitUntil, } from '@public/libs/util';
import CreatExamInfo from '../../modules/createExamInfo';
import LargeTable from '../../modules/largeTable';
import TopArea from '../../modules/docuTop/topArea';
import CasebarFilter from '@public/modules/caseBarFilter';
import { mapMutations, mapState, mapGetters, } from "vuex";
import valid, { errors, sys, common, aplSafebox, aplApplyResult, aplApplyInfo, } from '../../libs/request';
export default {
	name: 'ApplyResult',
	components: {
		CaseBar,
		TagList,
		TopArea,
		LargeTable,
		CreatExamInfo,
		CasebarFilter,
	},
	props: {
		pId: {
			default: '901',
		},
	},
	data() {
		return {
			apply: 'UG',
			showStuInfo: false,
			studentInfo: {
				name: null,
				groupId: null,
			},
			keyword: null,
			startDate: null,
			endDate: null,
			tags: null,
			hasResult: null,
			pageTotal: 0,
			pageSize: 10,
			pageNo: 1,
			orderByType: null,
			orderType: null,
			orderBy: null,
			resourceStatus: null, // 0 待完成 1 已完成
			resultStatus: null, // 申请结果 tag
			interviewType: null, // 面试情况
			companyId: null, // 分公司 Id
			docuGroupId: null, // 申请组Id
			docuConsultantId: null, // 申请顾问 id
			branchList: [ {id: null, companyName: '全部'},], // 公司
			docuGroup: [ {id: null, name: '全部'},], // 分组
			docuConsultant: [ {id: null, userName: '全部'},], // 申请顾问
			branchListIndex1: 0, // 点击选中
			branchListIndex2: 0,
			branchListIndex3: 0,
			sliderNav: [
				{ label: '本科', name: '1', },
				{ label: '研究生', name: '2', },
				{ label: '高中', name: '3', },
			],
			// 完成状态
			tagList: [
				{ id: null, name: '不限', },
				{ id: '1', name: '已有结果', },
				{ id: '0', name: '暂无结果', },
			],
			largeTable: {
				tableData2: [],
				checkBoxList : [ // 下拉框选择展示
					// { label: 'schoolName', name: '申请学校', },
					{ label: 'majorName', name: '专业项目', },
					{ label: 'applyTime', name: '申请季', },
					{ label: 'interviewType', name: '面试情况', },
					{ label: 'resourceStatus', name: '申请材料状况', },
					{ label: 'remarks', name: '补充材料信息', },
					{ label: 'queryUrl', name: '查询网址', },
					{ label: 'queryId', name: '查询ID', },
					{ label: 'resultStatus', name: '申请结果', },
					{ label: 'createBy', name: '申请顾问', },
					{ label: 'updateDate', name: '更新时间', },
				],
				// 已选择了哪些标签
				tableColumnsChecked: [],
				table2ColumnList: { // 列表项的标题
					stuName: {
						title: '学生',
						align: 'center',
						key: 'stuName',
						fixed: 'left',
						minWidth: 120,
						render: (h, params) => {
							const _this = this;
							const renderArr = [
								h('span', {
									style: {
										color: '#44bcb7',
										cursor: 'pointer',
									},
									on: {
										click() {
											_this.$router.push({
												name: 'apply.addStudent',
												query: {
													studentId: params.row.stuId
												}
											});
										},
									},
								}, params.row.stuName),
								h('i', {
									class: {
										'iconfont': true,
										'icon-ziliao': true,
									},
									style: {
										color: '#44bcb7',
										fontSize: '14px',
										marginLeft: '5px',
										cursor: 'pointer',
									},
									on: {
										click() {
											_this.showStuInfo = true;
											_this.$refs.refCreatExamInfo.showViewExam = _this.showStuInfo;
											_this.studentInfo.name = params.row.stuName;
											_this.studentInfo.groupId = params.row.groupId;
										},
									},
								})
							];
							return h('div', renderArr);
						},
                    },
                    schoolName: {
                        title: '申请学校',
						key: 'schoolName',
						align: 'center',
						minWidth: 120,
						fixed: 'left',
						render: (h, params) => {
							const _this = this;
							return h('div', [
								h('span', {
									style: {
										color: '#44bcb7',
										cursor: 'pointer',
									},
									on: {
										click() {
											let fromTypes = 'myStudent';
											if (_this.isAplLeaser) {
												fromTypes = 'caseManage';
											}
											_this.$router.push({
												name: 'apply.applyDetail',
												query: {
													from: fromTypes,
													choiceId: params.row.choiceId,
													groupId: params.row.groupId,
												}
											});
										},
									},
								}, params.row.schoolName),
							],)
						},
                    },
                    majorName: {
						title: '专业项目',
						align: 'center',
						key: 'majorName',
						minWidth: 120,
                        render: (h, params) => {
							const _this = this;
							return h('span', {
								style: {
									color: '#44bcb7',
									cursor: 'pointer',
								},
								on: {
									click() {
										if (!params.row.majorId) {
											_this.$Message.error('该校无该专业');
											return false;
										}
										_this.$router.push({
											name: 'apply.applyDetail',
											query: {
												from: 'myStudent',
												choiceId : params.row.choiceId,
												groupId : params.row.groupId,
												contractCount : params.row.contractCount,
												choiceTotal : params.row.choiceTotal,
											}
										})
									},
								},
							}, params.row.majorName);
						},
					},
                    applyTime: {
						title: '申请季',
						align: 'center',
						key: 'applyTime',
						minWidth: 120,
					},
					interviewType: {
						title: '面试情况',
						align: 'center',
						key: 'interviewType',
						minWidth: 120,
						editable: true,
						types: 'select',
						filters: [],
						filterMultiple: false,
						filterMethod() {
							return true;
						},
						render: (h, params) => {
							let text = null;
							switch(params.row.interviewType) {
								case 'no interview': text = '无面试'; break;
								case 'alumni interview': text = '校友面试'; break;
								case 'third party interview': text = '第三方面试'; break;
								case 'telephone interview': text = '电话面试'; break;
								case 'other interviews': text = '其他面试'; break;
								case 'abandon interview': text = '放弃面试'; break;
							};
							return h('span', text);
						},
					},
					resourceStatus: {
						title: '申请材料状态',
						align: 'center',
						key: 'resourceStatus',
						editable: true,
						types: 'select',
						filterMultiple: false,
						minWidth: 130,
						filterMethod() {
							return true;
						},
						filters: [
							{
								label: '材料齐全',
								value: '材料齐全',
							},
							{
								label: '材料不齐',
								value: '材料不齐',
							},
						],
					},
					remarks: {
						title: '补充材料信息',
						align: 'center',
						key: 'remarks',
						editable:  true,
						width: 150,
					},
                    queryUrl: {
						title: '查询网址',
						align: 'center',
						key: 'queryUrl',
						editable: true,
						minWidth: 120,
						render: (h, params) => {
							return h('span', {
								style: {
									color: '#44bcb7',
									cursor: 'pointer',
								},
								on: {
									click() {
										if (params.row.queryUrl.startsWith('http')) {
											window.open(params.row.queryUrl);
										} else {
											window.open(`http://${params.row.queryUrl}`);
										}
									},
								},
							}, params.row.queryUrl);
						},
                    },
                    queryId: {
						title: '查询ID',
						align: 'center',
						key: 'queryId',
						editable: true,
						minWidth: 120,
					},
					resultStatus: {
						title: '申请结果',
						align: 'center',
						key: 'resultStatus',
						minWidth: 120,
						filters: [
							{
                                label: 'Admitted',
                                value: 'Admitted',
							},
							{
                                label: 'Defer',
                                value: 'Defer',
							},
							{
                                label: 'Deny',
                                value: 'Deny',
							},
							{
                                label: 'Waitlist',
                                value: 'Waitlist',
							},
							{
                                label: 'Widthdraw',
                                value: 'Widthdraw',
							},
							{
                                label: 'Conditional',
                                value: 'Conditional',
							},
							{
                                label: 'Cancel',
                                value: 'Cancel',
							},
							{
                                label: 'Other',
                                value: 'Other',
                            },
						],
						filterMultiple: false,
						filterMethod() {
							return true;
						},
                   },
                    applyTime: {
						title: '入学季',
						align: 'center',
                        key: 'applyTime',
                        width: 150,
                    },
                    createBy: {
						title: '申请顾问',
						align: 'center',
						key: 'createBy',
						minWidth: 120,
                    },
                    updateDate: {
						title: '更新时间',
						align: 'center',
                        key: 'updateDate',
						sortable: true,
						minWidth: 120,
					},
				},
			},
		};
	},
	computed: {
		...mapState({
			userInfo: state => state.userInfo,
		}),
		...mapGetters('apply',['isAdmin', 'isCeo', 'isBranchOfficeLeader', 'isAplManage', 'isAplLeaser', 'isAplConsultant',]),
	},
	watch: {
		companyId(newVal) {
			if (this.isAdmin || this.isCeo || this.isBranchOfficeLeader) this.getDocuGroup();
			this.getDocuConsultant();
		},
	},
	created() {
		this.getList();
		this.getInterviewTypeDict(); // 面试类型字典
		this.getShowTitle({ // 获取显示的 table 标题
			type: 'RESULT',
			apply: this.apply,
		});
	},
	mounted() {
		waitUntil(()=>{
			return !!this.userInfo.companyId;
		},()=>{
			// 分公司列表
			this.companyId = this.userInfo.companyId;
			if (this.isAdmin || this.isCeo) this.getCompanyList();
		});
	},
	methods: {
		slideNavChange(val) {
			switch(val) {
				case '1':  this.apply = 'UG'; break;
				case '2': this.apply = 'PG'; break;
				case '3': this.apply = 'HS'; break;
			}
			this.getList();
			this.getShowTitle({
				type: 'RESULT',
				apply: this.apply,
			});
		},
		onclickCloseModal(val) {
			this.showStuInfo = val;
			this.$refs.refCreatExamInfo.showViewExam = this.showStuInfo;
		},
		// keyword
		onclickSearch(val) {
			this.keyword = val;
			this.getList();
		},
		// time limit
		getTargetList(t1, t2) {
			this.startDate = t1;
			this.endDate = t2;
			this.getList();
		},
		// casebarfilter
		tagListChange(val) {
			this.tags = val;
			this.getList();
		},
		// compelete ststus ==> tag
		onclickChoseTags(val) {
			this.hasResult = val;
			this.getList();
		},
		/*
		* Table 操作
		*/
		onFilterChange(val1, val2) {
			console.log(val1, val2);
			this[val1] = val2;
			this.getList();
		},
		onSortChange(val1, val2) {
			this.orderBy = val1,
			this.orderType = val2;
			// this.orderBy = 'aas.update_date ' + val2
			this.getList();
		},
		getchangedCheckedItem(val) {
			const data = {};
			data.list = val;
			data.apply = this.apply;
			data.type = 'RESULT';
			aplApplyInfo.updateShowTile(data).then(valid.call(this)).then(res => {
				if (res.ok) {
					console.log('保存筛选条件成功');
				}
			}).catch();
		},
		/*
		* 分页
		*/
		onclickChangePage(index) {
			this.pageNo = index;
			this.getList();
		},
		onPageSizeChange(val) {
			this.pageSize = val;
			this.getList();
		},
		/*
		* 获取标签数据
		*/
		/*
		* 公司列表获取
		*/
		getCompanyList() {
			if (!this.isAdmin && !this.isCeo) return false;
			sys.controlledList().then(valid.call(this)).then(res => {
				if (res.ok) {
					this.branchList = [...this.branchList, ...([...res.data.data])];
					this.companyId = this.branchList[0].id;
				}
			}).catch(errors.call(this));
		},
		/*
		* 分组列表获取
		*/
		getDocuGroup() {
			if (this.companyId === '1') return;
			common.findGroupNameByMenu({
				officeId: this.companyId,
				menuId: this.pId,
			}).then(valid.call(this)).then(res => {
				if (res.ok) {
					this.docuGroup = [];
					res.data.data.forEach(item => {
						this.docuGroup.push({
							id: item.officeId,
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
		* 申请顾问
		*/
		getDocuConsultant() {
			if (!this.companyId || (this.companyId === '1')) return; // ceo 身份 分公司 id 会重定向到北京分公司
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
		* 标签处理
		*/
		// 分公司
		addAcitveCon(val1) {
			this.branchListIndex1 = val1.index;
			this.companyId = val1.id;
			this.getList();
		},
		// 文书组
		addAcitveConGroup(val2) {
			this.docuGroupId = val2.id;
			this.branchListIndex2 = val2.index;
			this.getDocuConsultant();
			this.getList();
		},
		// 文书顾问
		addAcitveConConsultant(val3) {
			this.docuConsultantId = val3.id;
			this.branchListIndex3 = val3.index;
			this.getList();
		},
		// 列表获取
		getList() {
			const data = {
				apply: this.apply,
				keyword: this.keyword,
				tags: this.tags,
				officeId: this.companyId,
				comId: this.docuGroupId,
				teacherId: this.docuConsultantId,
				startDate: this.startDate,
				endDate: this.endDate,
				orderBy: this.orderBy,
				orderType: this.orderType,
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				resourceStatusLog: this.resourceStatus,
				interviewType: this.interviewType,
				hasResult: this.hasResult,
				resultStatus: this.resultStatus,
			};
			aplApplyResult.listAllPage(data).then(valid.call(this)).then(res => {
				if (res.ok) {
					this.largeTable.tableData2 = res.data.data.list;
					this.largeTable.tableData2.forEach((item, i) => {
						item.index = i;
					});
					this.pageTotal = res.data.data.count;
					this.pageSize = res.data.data.pageSize;
				}
			}).catch(errors.call(this));
		},
		/*
		* 修改列表数据
		*/
		modifyTableInfos(data) {
			data.forEach(item => {
				item.updateDate = item.updateDate ? item.updateDate + ' 00:00:00' : null;
				item.resourceStatusLog = item.resourceStatus;
				delete item.editting;
				delete item.edittingCell;
				delete item.index;
				delete item._checked;
				delete item.resourceStatus;
			});
			aplApplyResult.modify(data).then(valid.call(this)).then(res => {
				if (res.ok) {
					this.$Message.success(res.data.message);
					this.getList();
				}
			}).catch();
		},
		/*
		* 获取要显示的表头
		*/
		getShowTitle({ type, apply, }) {
			aplApplyInfo.listShowTitle({ type, apply, }).then(valid.call(this)).then(res => {
				let tempArr = [];
				tempArr = res.data.data.filter(item => item.ischeck === '1');
				if (tempArr[0].key === 'stuName') tempArr.shift(); // 去掉表头重复显示的学生名
				if (tempArr[0].key === 'schoolName') tempArr.shift(); // 去掉表头重复显示的学校名称
				this.largeTable.tableColumnsChecked = tempArr.map(item => item.key);
			}).catch();
		},
		/*
		* 面试类型 filters 字典
		*/
		getInterviewTypeDict() {
			sys.getByType({type: 'apl_apply_interview_type'}).then(valid.call(this)).then(res => {
				if(res.ok) {
					const rdata = res.data.data.map(item => {
						return {
							value: item.value,
							label: item.label,
						}
					});
					this.largeTable.table2ColumnList.interviewType.filters = rdata;
				}
			}).catch();
		},
	},
};
</script>