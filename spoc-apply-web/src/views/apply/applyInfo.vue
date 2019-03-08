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
			placeholder="请输入申请学校/专业项目/学生姓名"
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
			fixedHeader="stuName,applySchoolName"
			:edit=true
			:total="pageTotal"
			:checkBoxList="largeTable.checkBoxList"
			:tableColumnsChecked="largeTable.tableColumnsChecked"
			:table2ColumnList="largeTable.table2ColumnList"
			:tableData2="largeTable.tableData2"
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
		<ModalStuAccountPwd
			:dataModal="safeData"
			:safeInfo="safeInfo"
			ref="refModalStuAccountPwd"
		></ModalStuAccountPwd>
		<CreatExamInfo
			ref="refCreatExamInfo"
			:studentType='apply'
			:groupId="studentInfo.groupId"
			:studentName="studentInfo.name"
			@onclickCloseModal="onclickCloseModal"
		></CreatExamInfo>
	</div>
</template>

<script>
import TopArea from '../../modules/docuTop/topArea';
import CaseBar from '../../modules/caseBar';
import TagList from '../../modules/tagSelect';
import CreatExamInfo from '../../modules/createExamInfo';
import CasebarFilter from '@public/modules/caseBarFilter';
import { mapMutations, mapState, mapGetters, } from "vuex";
import { waitUntil, } from '@public/libs/util';
import valid, { errors, sys, common, aplApplyInfo, aplSafebox, aplApplyResult, } from '../../libs/request';
import LargeTable from '../../modules/largeTable';
import ModalStuAccountPwd from '../../modules/modalStuAccountPwd';

function switchToShow(val) {
	let text = '';
	switch(val) {
		case '0': text = '无需送分'; break;
		case '1': text = '已通知送分'; break;
		case '2': text = '已送分'; break;
	};
	return text;
};


// 高中
const HSCheckBoxList = [
	{ label: 'toeflCode', name: 'TOEFL送分代码', },
	{ label: 'toeflJuniorCode', name: 'TOEFL Junior送分代码', },
	{ label: 'ssatCode', name: 'SSAT送分代码', },
	{ label: 'toeflScore', name: 'TOEFL 送分', },
	{ label: 'toeflJuniorScore', name: 'TOEFL Junior送分', },
	{ label: 'ssatScore', name: 'SSAT送分', },
];
const HSTableColumnsChecked = [];
const HSTable2ColumnList = {
	toeflCode: {
		title: 'TOEFL送分代码',
		align: 'center',
		key: 'toeflCode',
		minWidth: 140,
		editable: true,
	},
	toeflJuniorCode: {
		title: 'TOEFL Junior送分代码',
		align: 'center',
		key: 'toeflJuniorCode',
		minWidth: 170,
		editable: true,
	},
	ssatCode: {
		title: 'SSAT送分代码',
		align: 'center',
		key: 'ssatCode',
		minWidth: 120,
		editable: true,
	},
	toeflScore: {
		title: 'TOEFL送分',
		align: 'center',
		key: 'toeflScore',
		minWidth: 120,
		editable: true,
		types: 'select',
		filters: [
			{ label: '无需送分',  value: '0', },
			{ label: '已通知送分', value: '1', },
			{ label: '已送分', value: '2', },
		],
		filterMultiple: false,
		filterMethod() {
			return true;
		},
		render: (h, params) => {
			const text = switchToShow(params.row.toeflScore);
			return h('span', text);
		},
	},
	toeflJuniorScore: {
		title: 'TOEFL Junior送分',
		align: 'center',
		key: 'toeflJuniorScore',
		minWidth: 160,
		editable: true,
		types: 'select',
		filters: [
			{ label: '无需送分',  value: '0', },
			{ label: '已通知送分', value: '1', },
			{ label: '已送分', value: '2', },
		],
		filterMultiple: false,
		filterMethod() {
			return true;
		},
		render: (h, params) => {
			const text = switchToShow(params.row.toeflJuniorScore);
			return h('span', text);
		},
	},
	ssatScore: {
		title: 'SSAT送分',
		align: 'center',
		key: 'ssatScore',
		minWidth: 120,
		editable: true,
		types: 'select',
		filters: [
			{ label: '无需送分',  value: '0', },
			{ label: '已通知送分', value: '1', },
			{ label: '已送分', value: '2', },
		],
		filterMultiple: false,
		filterMethod() {
			return true;
		},
		render: (h, params) => {
			const text = switchToShow(params.row.ssatScore);
			return h('span', text);
		},
		
	},
};

// 本科
const UGCheckBoxList = [
	{ label: 'toeflCode', name: 'TOEFL送分代码', },
	{ label: 'satCode', name: 'SAT送分代码', },
	{ label: 'ssatCode', name: 'SSAT送分代码', },
	{ label: 'toeflScore', name: 'TOEFL 送分', },
	{ label: 'satActScore', name: 'SAT/ACT送分', },
];
const UGTableColumnsChecked = [];
const UGTable2ColumnList = {
	toeflCode: {
		title: 'TOEFL送分代码',
		align: 'center',
		key: 'toeflCode',
		minWidth: 140,
		editable: true,
	},
	satCode: {
		title: 'SAT送分代码',
		align: 'center',
		key: 'satCode',
		minWidth: 120,
		editable: true,
	},
	ssatCode: {
		title: 'ACT送分代码',
		align: 'center',
		key: 'ssatCode',
		minWidth: 120,
		editable: true,
	},
	toeflScore: {
		title: 'TOEFL送分',
		align: 'center',
		key: 'toeflScore',
		minWidth: 120,
		editable: true,
		types: 'select',
		filters: [
			{ label: '无需送分',  value: '0', },
			{ label: '已通知送分', value: '1', },
			{ label: '已送分', value: '2', },
		],
		filterMultiple: false,
		filterMethod() {
			return true;
		},
		render: (h, params) => {
			const text = switchToShow(params.row.toeflScore);
			return h('span', text);
		},
	},
	satActScore: {
		title: 'SAT/ACT送分',
		align: 'center',
		key: 'satActScore',
		minWidth: 130,
		filters: [
			{ label: '无需送分',  value: '0', },
			{ label: '已通知送分', value: '1', },
			{ label: '已送分', value: '2', },
		],
		filterMultiple: false,
		filterMethod() {
			return true;
		},
		render: (h, params) => {
			const text = switchToShow(params.row.satActScore);
			return h('span', text);
		},
		
	},
};

// 研究生
const PGCheckBoxList = [
	{ label: 'toeflCode', name: 'TOEFL送分代码', },
	{ label: 'greCode', name: 'GRE送分代码', },
	{ label: 'gmatCode', name: 'GNAT送分代码', },
	{ label: 'lsatCode', name: 'LSAT送分代码', },
	{ label: 'toeflScore', name: 'TOEFL 送分', },
	{ label: 'greGmatLsatScore', name: 'GRE/GMAT/LSAT送分', },
];
const PGTableColumnsChecked = [];
const PGTable2ColumnList = {
	toeflCode: {
		title: 'TOEFL送分代码',
		align: 'center',
		key: 'toeflCode',
		minWidth: 140,
		editable: true,
	},
	greCode: {
		title: 'GRE送分代码',
		align: 'center',
		key: 'greCode',
		minWidth: 120,
		editable: true,
	},
	gmatCode: {
		title: 'GNAT送分代码',
		align: 'center',
		key: 'gmatCode',
		minWidth: 120,
		editable: true,
	},
	lsatCode: {
		title: 'LSAT送分代码',
		align: 'center',
		key: 'lsatCode',
		minWidth: 120,
		editable: true,
	},
	toeflScore: {
		title: 'TOEFL送分',
		align: 'center',
		key: 'toeflScore',
		minWidth: 120,
		editable: true,
		types: 'select',
		filters: [
			{ label: '无需送分',  value: '0', },
			{ label: '已通知送分', value: '1', },
			{ label: '已送分', value: '2', },
		],
		filterMultiple: false,
		filterMethod() {
			return true;
		},
		render: (h, params) => {
			const text = switchToShow(params.row.toeflScore);
			return h('span', text);
		},
	},
	greGmatLsatScore: {
		title: 'GRE/GMAT/LSAT送分',
		align: 'center',
		key: 'greGmatLsatScore',
		minWidth: 180,
		filters: [
			{ label: '无需送分',  value: '0', },
			{ label: '已通知送分', value: '1', },
			{ label: '已送分', value: '2', },
		],
		filterMultiple: false,
		filterMethod() {
			return true;
		},
		render: (h, params) => {
			const text = switchToShow(params.row.greGmatLsatScore);
			return h('span', text);
		},
		
	},
};

export default {
	name: 'ApplyInfo',
	components: {
		CaseBar,
		TopArea,
		TagList,
		LargeTable,
		CasebarFilter,
		CreatExamInfo,
		ModalStuAccountPwd,
	},
	props: {
		pId: {
			default: '901',
		},
	},
	data() {
		return {
			keyword: null,
			startDate: null,
			endDate: null,
			pageTotal: 0,
			pageSize: 10,
			pageNo: 1,
			showStuInfo: false,
			studentInfo: {
				groupId: null,
				name: null,
			},
			orderType: null,
			// orderByStatus: null,
			orderBy: null,
			navActive: '1',
			apply: 'UG',
			tags: null,
			infoStatus: null, // 完成状态
			companyId: null, // 分公司 Id
			docuGroupId: null, // 申请组Id
			docuConsultantId: null, // 申请顾问 id
			branchList: [ {id: null, companyName: '全部'},], // 公司
			docuGroup: [ {id: null, name: '全部'},], // 分组
			docuConsultant: [ {id: null, userName: '全部'},], // 申请顾问
			branchListIndex1: 0, // 点击选中
			branchListIndex2: 0,
			branchListIndex3: 0,
			safeData: null, // safe modal data
			safeInfo: {
				name: null,
				account: null,
				pwd: null
			},
			sliderNav: [
				{ label: '本科', name: '1', },
				{ label: '研究生', name: '2', },
				{ label: '高中', name: '3', },
			],
			// 完成状态
			tagList: [
				{ id: null, name: '不限', },
				{ id: 0, name: '未提交', },
				{ id: 1, name: '已提交', },
			],
			largeTable: {
				tableData2: [],
				checkBoxList : [ // 下拉框选择展示
					{ label: 'majorName', name: '专业项目', },
					{ label: 'applyTime', name: '申请季', },
					{ label: 'batch', name: '申请批次', },
					{ label: 'sys', name: '申请系统', },
					{ label: 'infoStatus', name: '申请状态', },
					{ label: 'toeflCode', name: 'TOEFL送分代码', },
					{ label: 'satCode', name: 'SAT送分代码', },
					{ label: 'ssatCode', name: 'SSAT送分代码', },
					{ label: 'toeflScore', name: 'TOEFL 送分', },
					{ label: 'satActScore', name: 'SAT/ACT送分', },
					{ label: 'commitDate', name: '提交日期', },
					{ label: 'schoolAuditDate', name: '学校审阅时间', },
					{ label: 'deadline', name: '申请截止日期', },
					{ label: 'queryUrl', name: '注册网站', },
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
					applySchoolName: {
                        title: '申请学校',
						key: 'applySchoolName',
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
								}, params.row.applySchoolName),
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
					batch: {
						title: '申请批次',
						align: 'center',
                        key: 'batch',
                        minWidth: 120,
					},
					sys: {
						title: '申请系统',
						align: 'center',
                        key: 'sys',
						minWidth: 120,
						editable: true,
						types: 'select',
						// 状态未定
                        filters: [
							{ label: 'common', value: 'common', },
							{ label: 'CAAS', value: 'CAAS', },
							{ label: '其他',  value: 'other', },
						],
						filterMultiple: false,
						filterMethod() {
							return true;
						},
                    },
                    infoStatus: {
						title: '申请状态',
						align: 'center',
                        key: 'infoStatus',
						minWidth: 120,
						editable: true,
						types: 'select',
						//  状态未定 待提交 填表中 已提交
						filters: [
							{ label: '待提交', value: '0', },
							{ label: '填表中', value: '1', },
							{ label: '已提交', value: '2', },
						],
						filterMultiple: false,
						filterMethod() {
							return true;
						},
						render: (h, params) => {
							let text = null;
							switch (params.row.infoStatus) {
								case '0': text = '待提交'; break;
								case '1': text = '填表中'; break;
								case '2': text = '已提交'; break;
							};
							return h('span', text);
						},
					},
					toeflCode: {
						title: 'TOEFL送分代码',
						align: 'center',
						key: 'toeflCode',
						minWidth: 140,
						editable: true,
					},
					satCode: {
						title: 'SAT送分代码',
						align: 'center',
						key: 'satCode',
						minWidth: 120,
						editable: true,
					},
					ssatCode: {
						title: 'ACT送分代码',
						align: 'center',
						key: 'ssatCode',
						minWidth: 120,
						editable: true,
					},
					toeflScore: {
						title: 'TOEFL送分',
						align: 'center',
						key: 'toeflScore',
						minWidth: 120,
						editable: true,
						types: 'select',
						filters: [
							{ label: '无需送分',  value: '0', },
							{ label: '已通知送分', value: '1', },
							{ label: '已送分', value: '2', },
						],
						filterMultiple: false,
						filterMethod() {
							return true;
						},
						render: (h, params) => {
							const text = switchToShow(params.row.toeflScore);
							return h('span', text);
						},
					},
					satActScore: {
						title: 'SAT/ACT送分',
						align: 'center',
						key: 'satActScore',
						minWidth: 130,
						filters: [
							{ label: '无需送分',  value: '0', },
							{ label: '已通知送分', value: '1', },
							{ label: '已送分', value: '2', },
						],
						filterMultiple: false,
						filterMethod() {
							return true;
						},
						render: (h, params) => {
							const text = switchToShow(params.row.satActScore);
							return h('span', text);
						},
						
					},
                    commitDate: {
						title: '提交日期',
						align: 'center',
                        key: 'commitDate',
                        minWidth: 120,
						sortable: true,
						editable: true,
						types: 'date',
						render: (h, params) => {
							const text = (params.row.commitDate && params.row.commitDate.split(' ')[0]) ? params.row.commitDate.split(' ')[0] : 'N/A';
							return h('span', text);
						},
					}, // schoolAuditDate applyPhase
					schoolAuditDate: {
						title: '学校审阅时间',
						align: 'center',
                        key: 'schoolAuditDate',
                        minWidth: 130,
						sortable: true,
						editable: true,
						types: 'date',
						render: (h, params) => {
							const text = (params.row.schoolAuditDate && params.row.schoolAuditDate.split(' ')[0]) ? params.row.schoolAuditDate.split(' ')[0] : 'N/A';
							return h('span', text);
						},
					},
					deadline: {
						title: '申请截止日期',
						align: 'center',
                        key: 'deadline',
                        minWidth: 130,
						sortable: true,
						editable: true,
						types: 'date',
						render: (h, params) => {
							const text = (params.row.deadline && params.row.deadline.split(' ')[0]) ? params.row.deadline.split(' ')[0] : 'N/A';
							return h('span', text);
						},
					},
					queryUrl: {
						title: '注册网站',
						align: 'center',
                        key: 'queryUrl',
						minWidth: 120,
						editable: true,
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
                    createBy: {
						title: '申请顾问',
						align: 'center',
                        key: 'createBy',
                        minWidth: 120,
                    },
					applyTime: {
						title: '入学季',
						align: 'center',
                        key: 'applyTime',
                        width: 150,
					},
					batch: {
						title: '申请批次',
						align: 'center',
                        key: 'batch',
                        width: 150,
					},
                    updateDate: {
						title: '更新时间',
						align: 'center',
                        key: 'updateDate',
                        minWidth: 120,
                        sortable: true
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
	created() {
		this.getInfoList();
		this.getShowTitle({
			type: 'INFO',
			apply: this.apply,
		});
	},
	watch: {
		/*
		* nav changes table changes
		*/
		navActive(newVal, oldVal) {
			this.navOldValChanges(oldVal);
			this.navNewValChanges(newVal);
			this.getInfoList();
		},
		companyId(newVal) {
			if (this.isAdmin || this.isCeo || this.isBranchOfficeLeader) this.getDocuGroup();
			this.getDocuConsultant();
		},
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
		switchToShow(val, tip) {
			let text = '';
			switch(val) {
				case '0': text = '无需送分'; break;
				case '1': text = '已通知送分'; break;
				case '2': text = '已送分'; break;
			};
			return text;
		},
		slideNavChange(val) {
			this.navActive = val;
			switch(val) {
				case '1':  this.apply = 'UG'; break;
				case '2': this.apply = 'PG'; break;
				case '3': this.apply = 'HS'; break;
			}
			this.getShowTitle({
				type: 'INFO',
				apply: this.apply,
			});
		},
		onclickCloseModal(val) {
			this.showStuInfo = val;
			this.$refs.refCreatExamInfo.showViewExam = this.showStuInfo;
		},
		// 1 高中 2 本科 3 研究生
		navOldValChanges(val) {
			// 清空筛选项
			// this.toeflScore = null;
			// this.toeflJuniorScore = null;
			// this.ssatScore = null;
			// this.satScore = null;
			// this.actScore = null;
			// this.greScore = null;
			// this.gmatScore = null;
			// this.lsatScore = null;
			switch (val) {
				case '3': 
					this.largeTable.checkBoxList.splice(5,6);
					HSTableColumnsChecked.forEach(item => {
						this.$delete(this.largeTable.table2ColumnList, item);
					});
				break;
				case '1':
					this.largeTable.checkBoxList.splice(5,5);
					UGTableColumnsChecked.forEach(item => {
						this.$delete(this.largeTable.table2ColumnList, item);
					});
				break;
				case '2':
					this.largeTable.checkBoxList.splice(5,6); 
					PGTableColumnsChecked.forEach(item => {
						this.$delete(this.largeTable.table2ColumnList, item);
					});
				break;
			}
		},
		navNewValChanges(val) {
			switch(val) {
				case '3':
					const TempObj1 = {};
					this.largeTable.checkBoxList.splice(5,0,...HSCheckBoxList);
					// this.largeTable.tableColumnsChecked.splice(6,0,...HSTableColumnsChecked);
					const assignObj1 = Object.assign({}, this.largeTable.table2ColumnList, HSTable2ColumnList);
					const [...tempArr1] = this.largeTable.checkBoxList;
					tempArr1.unshift({ label: 'stuName', name: '学生', });
					tempArr1.push({ label: 'applySchoolName', name: '申请学校', });
					tempArr1.forEach(item => {
						TempObj1[item.label] = assignObj1[item.label];
					});
					this.largeTable.table2ColumnList = TempObj1;
				break;
				case '1':
					const TempObj2 = {};
					this.largeTable.checkBoxList.splice(5,0,...UGCheckBoxList);
					// this.largeTable.tableColumnsChecked.splice(6,0,...UGTableColumnsChecked);
					const assignObj2 = Object.assign({}, this.largeTable.table2ColumnList, UGTable2ColumnList);
					const [...tempArr2] = this.largeTable.checkBoxList;
					tempArr2.unshift({ label: 'stuName', name: '学生', });
					tempArr2.push({ label: 'applySchoolName', name: '申请学校', });
					tempArr2.forEach(item => {
						TempObj2[item.label] = assignObj2[item.label];
					});
					this.largeTable.table2ColumnList = TempObj2;
				break;
				case '2':
					const TempObj3 = {};
					this.largeTable.checkBoxList.splice(5,0,...PGCheckBoxList);
					this.largeTable.tableColumnsChecked.splice(6,0,...PGTableColumnsChecked);
					const assignObj3 = Object.assign({}, this.largeTable.table2ColumnList, PGTable2ColumnList);
					const [...tempArr3] = this.largeTable.checkBoxList;
					tempArr3.unshift({ label: 'stuName', name: '学生', });
					tempArr3.push({ label: 'applySchoolName', name: '申请学校', });
					tempArr3.forEach(item => {
						TempObj3[item.label] = assignObj3[item.label];
					});
					this.largeTable.table2ColumnList = TempObj3;
				break;
			}
		},
		// keyword
		onclickSearch(val) {
			this.keyword = val;
			this.getInfoList();
		},
		// time limit
		getTargetList(t1, t2) {
			this.startDate = t1;
			this.endDate = t2;
			this.getInfoList();
		},
		// casebarfilter
		tagListChange(val) {
			this.tags = val;
			this.getInfoList();
		},
		// compelete status tag
		onclickChoseTags(val) {
			this.status = val;
			this.getInfoList();
		},
		/*
		* Table 操作
		*/
		onFilterChange(val1, val2) {
			console.log(val1, val2);
			this[val1] = val2;
			this.getInfoList();
		},
		onSortChange(val1, val2) {
			this.orderBy = val1;
			this.orderType = val2;
			if (this.orderBy === 'commitDate') {
				this.orderBy = 'subDate';
			}
			// switch(val1) {
			// 	case 'schoolAuditDate': this.orderBy = `aai.school_audit_date ${val2}`; break; // 学校审阅时间
			// 	case 'commitDate': this.orderBy = `aai.sub_date ${val2}`; break; // 提交时间
			// 	case 'deadline': this.orderBy = `aai.deadline ${val2}`; break; // 申请 截止时间
			// 	case 'updateDate': this.orderBy = `aai.update_date ${val2}`; break; // 更新时间
			// };
			this.getInfoList();
		},
		getchangedCheckedItem(val) {
			const data = {};
			data.list = val;
			data.apply = this.apply;
			data.type = 'INFO';
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
			this.getInfoList();
		},
		onPageSizeChange(val) {
			this.pageSize = val;
			this.getInfoList();
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
			this.getInfoList();
		},
		// 文书组
		addAcitveConGroup(val2) {
			this.docuGroupId = val2.id;
			this.branchListIndex2 = val2.index;
			this.getDocuConsultant();
			this.getInfoList();
		},
		// 文书顾问
		addAcitveConConsultant(val3) {
			this.docuConsultantId = val3.id;
			this.branchListIndex3 = val3.index;
			this.getInfoList();
		},
		/*
		* 列表获取
		*/
		getInfoList() {
			const data = {
				keyword: this.keyword,
				
				startDate: this.startDate,
				endDate: this.endDate,

				tags: this.tags,
				officeId: this.companyId,
				comId: this.docuGroupId,
				teacherId: this.docuConsultantId,
				apply: this.apply,
				orderBy: this.orderBy,
				orderType: this.orderType,
				// orderByStatus: this.orderByStatus,

				infoStatus: this.infoStatus, // 申请状态
				status: this.status, // tag

				system: this.sys,

				toeflScore: this.toeflScore,
				// 高中
				toeflJuniorScore: this.toeflJuniorScore,
				ssatScore: this.ssatScore,
				satActScore: this.satActScore,
				// 本科
				satScore: this.satScore,
				actScore: this.actScore,
				// 研究生
				greScore: this.greScore,
				gmatScore: this.gmatScore,
				lsatScore: this.lsatScore,

				pageNo: this.pageNo,
				pageSize: this.pageSize,
			};
			aplApplyInfo.listPage(data).then(valid.call(this)).then(res => {
				if (res.ok) {
					this.largeTable.tableData2 = res.data.data.list;
					this.largeTable.tableData2.forEach((item,index) => {
						item.index = index;
						item.updateDate = item.updateDate ? item.updateDate.split(' ')[0] : '';
						item.deadline = item.deadline ? item.deadline.split(' ')[0] : '';
						item.commitDate = item.commitDate ? item.commitDate.split(' ')[0] : '';
						item.schoolAuditDate = item.schoolAuditDate ? item.schoolAuditDate.split(' ')[0] : '';
					});
					this.pageTotal = res.data.data.count;
					this.pageSize = res.data.data.pageSize;
				}
			}).catch(errors.call(this));
		},
		/*
		* 保险箱是数据获取
		*/
		getSafeBoxList(groupId) {
			aplSafebox.list({ groupId, }).then(valid.call(this)).then(res => {
				if (res.ok) {
					this.safeData = res.data.data;
				}
			}).catch(errors.call(this));
		},
		/*
		* 修改列表数据
		*/
		modifyTableInfos(data) {
			data.forEach(item => {
				item.updateDate = item.updateDate ?  item.updateDate + ' 00:00:00' : null;
				item.deadline = item.deadline ? item.deadline + ' 00:00:00' : null;
				item.commitDate = item.commitDate? item.commitDate + ' 00:00:00' : null;
				item.schoolAuditDate = item.schoolAuditDate ? item.schoolAuditDate + ' 00:00:00' : null;
				item.system = item.sys;
				delete item.editting;
				delete item.sys;
				delete item.edittingCell;
				delete item.index;
				delete item._checked;
			});
			aplApplyInfo.modify(data).then(valid.call(this)).then(res => {
				if (res.ok) {
					this.$Message.success(res.data.message);
				}
				this.getInfoList();
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
				if (tempArr[0].key === 'applySchoolName') tempArr.shift(); // 去掉表头重复显示的学校名称
				this.largeTable.tableColumnsChecked = tempArr.map(item => item.key);
			}).catch();
		},
	},
};
</script>