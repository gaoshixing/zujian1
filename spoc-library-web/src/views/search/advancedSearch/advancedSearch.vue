<style lang="less">
	.lib_search_advanced_search {
		.title {
			width: 4rem;
			color: #44bcb7;
			margin: 18px;
			font-size: 16px;
			transform: translate(115px, -57px);
			height: 16px;
		}
		.tab_bar {
			margin-left: 19px;
			.content {
				// margin-top: 20px;
				padding: 0;
				border: 1px solid #dddee1;
				margin: 20px 10px 0;
				border-top: none;
				form {
					margin-top: 20px;
					padding: 0 10px;
					.ivu-form-item{
						border-bottom: 1px #e0e0e0 solid;
						padding-bottom: 10px;
					}
				}
			}
			.ivu-tabs-bar{
				border-bottom: 2px solid #44bcb7;
			}
		}
		.ranking_interval {
			display: flex;
			align-items: center;
			margin: 5px 20px 0 20px;
			.box {
				width: 60px;
				height: 25px;
				border: 1px solid #33b59f;
				color: #33b59f;
				text-align: center;
				line-height: 25px;
			}
			.line {
				width: 10px;
				border-top: 3px solid #33b59f;
				margin: 5px;
			}
		}
		.btn {
			max-width: 1200px;
			margin-bottom: 18px;
			.ivu-btn {
				color: #fff;
				width: 180px;
				background-color: #69c9c5;
				display: block;
				margin: 0 auto;
			}
		}
		.ivu-select-dropdown {
			top: 100px !important;
			left: 100px !important;
		}
		.state_dropdown {
			.ivu-select-dropdown {
				left: 325px !important;
			}
		}
		.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
			text-align: center;
			width: 120px;
			line-height: 22px;
			background: -webkit-linear-gradient(bottom, #fbfbfb, #e7e7e6);
			/* Safari 5.1 - 6.0 */
			background: -o-linear-gradient(bottom, #fbfbfb, #e7e7e6);
			/* Opera 11.1 - 12.0 */
			background: -moz-linear-gradient(bottom, #fbfbfb, #e7e7e6);
			/* Firefox 3.6 - 15 */
			background: linear-gradient(to bottom, #fbfbfb, #e7e7e6);
			/* 标准的语法 */
			border: 1px solid #dddee1;
			border-bottom: none;
		}
		.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
				background: -webkit-linear-gradient(bottom, #7bd0cc, #44bcb7);
				/* Safari 5.1 - 6.0 */
				background: -o-linear-gradient(bottom, #7bd0cc, #44bcb7);
				/* Opera 11.1 - 12.0 */
				background: -moz-linear-gradient(bottom, #7bd0cc, #44bcb7);
				/* Firefox 3.6 - 15 */
				background: linear-gradient(to bottom, #7bd0cc, #44bcb7);
				/* 标准的语法 */
				border: 1px solid #44bcb7;
				border-bottom: none;
				color: #fff;
		}
		.content {
			.ivu-tabs-bar {
				background: #f2f2f2;
				border-bottom: 1px solid #e0e0e0;
				border-top: 1px solid #e0e0e0;
			}
			.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
				height: 30px;
				border: none;
				background: #f2f2f2;
			}
			.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
				height: 32px;
				border: none;
				border-top: 1px solid #44bcb7;
				background: #fff;
				border-radius: 0;
				color: #000000;
			}
		}
		.ivu-form-item {
			margin-bottom: 10px;
		}
	}
	
	.tm_advance_search_result {
		.result {
			margin: 26px 0 15px;
		}
		.keywords_list {
			display: flex;
			align-items: center;
			.keyword {
				border: 1px solid #e0e0e0;
				padding: 3px 9px;
				margin-right: 10px;
				.word {
					margin-right: 10px;
				}
			}
			margin-bottom: 30px;
		}
		#resultContent {
			.ivu-table-wrapper {
				border: 1px solid #dddee1;
				border-bottom: 0;
				border-right: 0;
			}
		}
		.page {
			text-align: center;
			margin-top: 20px;
		}
		.export {
			text-align: right;
			margin-right: 30px;
			.ivu-select-placeholder {
				text-align: center;
			}
		}
		.hiddenMy {
			display: none;
		}
	}
</style>
<template>
	<div>
		<div class="lib_search_advanced_search">
			<div class="title" style="cursor:pointer;" @click="show"></div>
			<div class="tab_bar" v-show="showTable[0].show">
				<Tabs type="card">
					<TabPane label="院校库">
						<div class="content">
							<Tabs type="card">
								<TabPane label="学校">
									<schoolQuery @search="handleSearch1" :mapDict="associateDitData" :regionList="regionList" :stateList="stateList" :state.sync="toStateId" v-model="showIndex" :stateName.sync="stateName" :regionName.sync="regionName"></schoolQuery>
								</TabPane>
								<TabPane label="研究生院">
									<gradeSchoolQuery @search="handleSearch2" :mapDict="associateDitData" v-model="showIndex"></gradeSchoolQuery>
								</TabPane>
							</Tabs>
						</div>
					</TabPane>

					<TabPane label="专业库">
						<div class="content">
							<Tabs type="card" :value="0">
								<TabPane label="本科">
									<schoolMajorQuery v-model="showIndex" @search="handleSearch3"></schoolMajorQuery>
								</TabPane>
								<TabPane label="研究生">
									<gradeMajorQuery v-model="showIndex" @search="handleSearch4" :mapDict="associateDitData.ss_school_major_level_type"></gradeMajorQuery>
								</TabPane>
							</Tabs>
						</div>
					</TabPane>
				</Tabs>
			</div>
		</div>

		<div class="tm_advance_search_result" v-show="!showTable[0].show">
			<v-search-terms :mapDict="associateDitData" :searchItems="searchItems" @reSearch="reSearch" :regionName="regionName" :stateName="stateName"></v-search-terms>
			<div>
				<div class="resultContent">
					<div v-show="!showTable[1].show">
						<div class="export" v-if="userInfo.admin">
							<Dropdown @on-click="exportCurr1">
								<Button type="ghost" style="border: 1px solid #999999;">
								导出<Icon type="arrow-down-b"></Icon>
							</Button>
								<DropdownMenu slot="list">
									<DropdownItem :name="1" style="text-align: center;display: block;">导出当前</DropdownItem>
									<DropdownItem :name="0" style="text-align: center;display: block;">导出所有</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
						<search-table :data="academy_undergraduate_data.list" :ftable="schoolCol.ftable" :mtable="schoolCol.mtable"></search-table>
						<div class="page">
							<Page show-elevator show-total :current="academy_undergraduate_data.pageNo" show-sizer :total="academy_undergraduate_data.count" @on-change="onPageChange1" @on-page-size-change="onPageSizeChange1" v-if="academy_undergraduate_data.count>10"></Page>
						</div>
					</div>
					<div v-show="!showTable[2].show">
						<div class="export" v-if="userInfo.admin">
							<Dropdown @on-click="exportCurr2">
								<Button type="ghost" style="border: 1px solid #999999;">
								导出<Icon type="arrow-down-b"></Icon>
							</Button>
								<DropdownMenu slot="list">
									<DropdownItem :name="1" style="text-align: center;display: block;">导出当前</DropdownItem>
									<DropdownItem :name="0" style="text-align: center;display: block;">导出所有</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
						<search-table :data="academy_graduate_data.list" :ftable="schoolGradeCol.ftable" :mtable="schoolGradeCol.mtable"></search-table>
						<div class="page">
							<Page show-elevator show-total :current="academy_graduate_data.pageNo" show-sizer :total="academy_graduate_data.count" @on-change="onPageChange2" @on-page-size-change="onPageSizeChange2" v-if="academy_graduate_data.count>10"></Page>
						</div>
					</div>
					<div v-show="!showTable[3].show">
						<div class="export" v-if="userInfo.admin">
							<Dropdown @on-click="exportCurr3">
								<Button type="ghost" style="border: 1px solid #999999;">
								导出<Icon type="arrow-down-b"></Icon>
							</Button>
								<DropdownMenu slot="list">
									<DropdownItem :name="1" style="text-align: center;display: block;">导出当前</DropdownItem>
									<DropdownItem :name="0" style="text-align: center;display: block;">导出所有</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
						<search-table :data="major_undergraduate_data.list" :ftable="majorCol.ftable" :alone="true"></search-table>
						<div class="page">
							<Page show-elevator show-total :current="major_undergraduate_data.pageNo" show-sizer :total="major_undergraduate_data.count" @on-change="onPageChange3" @on-page-size-change="onPageSizeChange3" v-if="major_undergraduate_data.count>10"></Page>
						</div>
					</div>
					<div v-show="!showTable[4].show">
						<div class="export" v-if="userInfo.admin">
							<Dropdown @on-click="exportCurr4">
								<Button type="ghost" style="border: 1px solid #999999;">
								导出<Icon type="arrow-down-b"></Icon>
							</Button>
								<DropdownMenu slot="list">
									<DropdownItem :name="1" style="text-align: center;display: block;">导出当前</DropdownItem>
									<DropdownItem :name="0" style="text-align: center;display: block;">导出所有</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
						<search-table :data="major_graduate_data.list" :ftable="majorGradeCol.ftable" :mtable="majorGradeCol.mtable"></search-table>

						<div class="page">
							<Page show-elevator show-total show-sizer :current="major_graduate_data.pageNo" :total="major_graduate_data.count" @on-change="onPageChange4" @on-page-size-change="onPageSizeChange4" v-if="major_graduate_data.count>10"></Page>
						</div>
					</div>
				</div>
			</div>
		</div>
		<form class="formexport" :action="exportUrl" method="post" target="_blank">
			<input type="hidden" name="ids" v-model="exportData" />
		</form>
	</div>
</template>
<script>
	import valid, {
		errors,
		tmBaseSearch,
		school,
		SchoolMajor,
		academeManage,
		common,
		TMSEARCH
	} from "../../../libs/request";
	import { mapMutations, mapState } from "vuex";
	import searchTable from "../searchTable/searchTable";
	import { schoolCol, schoolGradeCol, majorCol, majorGradeCol } from "../searchCol";
	import schoolMajorQuery from "./searchResult/schoolMajor";
	import gradeMajorQuery from "./searchResult/gradeMajor";
	import gradeSchoolQuery from "./searchResult/gradeSchool";
	import schoolQuery from "./searchResult/school";
	import vSearchTerms from "../../../modules/vSearchTerms";

	//   字段关联字典表类型
	let types = "ss_school_setting,ss_school_nature,ss_school_school_type,ss_rank_type,xx_choice_school_batch,ss_school_degree,ss_gradeschool_type,ss_school_major_level_type";
	export default {
		name: "advancedSearch",
		data() {
			return {
				schoolCol: schoolCol(this),
				schoolGradeCol: schoolGradeCol(this),
				majorCol: majorCol(this),
				majorGradeCol: majorGradeCol(this),

				exportUrl: '',
				exportData: '',
				showIndex: 0,
				showTable: [{
						show: true
					},
					{
						show: true
					},
					{
						show: true
					},
					{
						show: true
					},
					{
						show: true
					}
				],
				academy_undergraduate_data: {
					pageNo: 1,
					count: 10,
					pageSize: 10,
					pageCount: 1,
					list: []
				},
				academy_graduate_data: {
					pageNo: 1,
					count: 10,
					pageSize: 10,
					pageCount: 1,
					list: []
				},
				major_undergraduate_data: {
					pageNo: 1,
					count: 10,
					pageSize: 10,
					pageCount: 1,
					list: []
				},
				major_graduate_data: {
					pageNo: 1,
					count: 10,
					pageSize: 10,
					pageCount: 1,
					list: []
				},
				// 地区/州
				regionList: [],
				toStateId: "",
				stateList: [],
			
				associateDitData: "",
				// regionList:'',
				// stateList:'',
				// 分页
				// 本科学校列表（按名称）-带分页和排序参数
				schoolListParams: {
					pageNo: "1",
					pageSize: "10",
					orderBy: "schoolRanking ASC"
				},
				// 本科专业（按名称）-带分页和排序参数
				schoolMajorParams: {
					pageNo: "1",
					pageSize: "10",
					orderBy: ""
				},
				// 研究生院（按名称）-带分页和排序参数
				gradeListParams: {
					pageNo: "1",
					pageSize: "10",
					orderBy: "ranking ASC"
				},
				//研究生专业（按名称）-带分页和排序
				gradeMajorParams: {
					pageNo: "1",
					pageSize: "10",
					orderBy: ""
				},

				searchItems: "",
				showIndexPro: "",
				regionName: '',
				stateName: '',
				filterData:[],
			};
		},
		computed: {
			...mapState(['userInfo'])
		},
		components: {
			schoolMajorQuery,
			gradeMajorQuery,
			gradeSchoolQuery,
			schoolQuery,
			vSearchTerms,
			searchTable
		},
		created() {
			this.associateDit(types);
			this.toRegion("140");
			common.listData({type:'ss_rank_type'}).then(valid.call(this)).then(res => {
				if(res.ok){
					this.filterData = res.data.data;
				}
			}).catch(errors.call(this));
		},
		methods: {
			...mapMutations(["updateLoadingStatus"]),
			//关联字典表
			associateDit(types) {
				this.updateLoadingStatus({
					isLoading: true
				});
				TMSEARCH.associateDit(types)
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.associateDitData = res.data.data;
						}
					})
					.catch(errors.call(this))
					.finally(() => {
						this.updateLoadingStatus({
							isLoading: false
						});
					});
			},
			//获取地区/州
			toRegion(val) {
				common.areaRest({
						id: val
					})
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.regionList = res.data.data;
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},
			toState: function(val) {
				let param = {
					id: val
				};
				if(val) {
					common.areaRest(param)
						.then(valid.call(this))
						.then(res => {
							if(res.ok) {
								this.stateList = res.data.data;
							}
						})
						.catch(errors.call(this))
						.finally(() => {});
				} else {
					this.stateList = [];
				}
			},
			handleSearch1(params) {
				this.searchItems = params;
				params.orderBy = 'schoolRanking ASC'
				this.fetchData1(params);
			},
			fetchData1(params) {
				this.updateLoadingStatus({
					isLoading: true
				});
				tmBaseSearch
					.querySchoolList(params)
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.academy_undergraduate_data = res.data.data;
						}
					})
					.catch(errors.call(this))
					.finally(() => {
						this.updateLoadingStatus({
							isLoading: false
						});
					});
			},
			handleSearch2(params) {
				this.searchItems = params;
				params.orderBy = 'schoolRanking ASC'
				this.fetchData2(params);
			},
			fetchData2(params) {
				this.updateLoadingStatus({
					isLoading: true
				});
				tmBaseSearch
					.queryGradeList(params)
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.academy_graduate_data = res.data.data;
						}
					})
					.catch(errors.call(this))
					.finally(() => {
						this.updateLoadingStatus({
							isLoading: false
						});
					});
			},

			handleSearch3(params) {
				this.searchItems = params;
				this.fetchData3(params);
			},
			fetchData3(params) {
				this.updateLoadingStatus({
					isLoading: true
				});
				this.updateLoadingStatus({
					isLoading: true
				});
				tmBaseSearch
					.querySchoolMajorList(params)
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.major_undergraduate_data = res.data.data;
						}
					})
					.catch(errors.call(this))
					.finally(() => {
						this.updateLoadingStatus({
							isLoading: false
						});
					});
			},
			handleSearch4(params) {
				this.searchItems = params;
				this.fetchData4(params);
			},
			fetchData4(params) {
				this.updateLoadingStatus({
					isLoading: true
				});
				tmBaseSearch
					.queryGradeMajorList(params)
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.major_graduate_data = res.data.data;
						}
					})
					.catch(errors.call(this))
					.finally(() => {
						this.updateLoadingStatus({
							isLoading: false
						});
					});
			},
			// 分页
			onPageChange1(val) {
				this.schoolListParams.pageNo = val;
				this.schoolListParams = Object.assign({}, this.schoolListParams, this.searchItems)
				this.fetchData1(this.schoolListParams);
			},
			onPageSizeChange1(val) {
				this.schoolListParams.pageSize = val;
				this.schoolListParams = Object.assign({}, this.schoolListParams, this.searchItems)
				this.fetchData1(this.schoolListParams);
			},
			onPageChange2(val) {
				this.gradeListParams.pageNo = val;
				this.gradeListParams = Object.assign({}, this.gradeListParams, this.searchItems)
				this.fetchData2(this.gradeListParams);
			},
			onPageSizeChange2(val) {
				this.gradeListParams.pageSize = val;
				this.gradeListParams = Object.assign({}, this.gradeListParams, this.searchItems)
				this.fetchData2(this.gradeListParams);
			},
			onPageChange3(val) {
				this.schoolMajorParams.pageNo = val;
				this.schoolMajorParams = Object.assign({}, this.schoolMajorParams, this.searchItems)
				this.fetchData3(this.schoolMajorParams);
			},
			onPageSizeChange3(val) {
				this.schoolMajorParams = Object.assign({}, this.schoolMajorParams, this.searchItems)
				this.schoolMajorParams.pageSize = val;
				this.fetchData3(this.schoolMajorParams);
			},
			onPageChange4(val) {
				this.gradeMajorParams.pageNo = val;
				this.gradeMajorParams = Object.assign({}, this.gradeMajorParams, this.searchItems)
				this.fetchData4(this.gradeMajorParams);
			},
			onPageSizeChange4(val) {
				this.gradeMajorParams.pageSize = val;
				this.gradeMajorParams = Object.assign({}, this.gradeMajorParams, this.searchItems)
				this.fetchData4(this.gradeMajorParams);
			},
			// 排序
			onSortChange1(sort, key) {
				this.schoolListParams = Object.assign({}, this.schoolListParams, this.searchItems)
				this.schoolListParams.orderBy = `${key} ${sort?'ASC':'DESC'}`;
				this.fetchData1(this.schoolListParams);
			},
			onSortChange2(sort, key) {
				this.gradeListParams = Object.assign({}, this.gradeListParams, this.searchItems)
				this.gradeListParams.orderBy = `${key} ${sort?'ASC':'DESC'}`;
				this.fetchData2(this.gradeListParams);
			},
			onSortChange3(sort, key) {
				this.schoolMajorParams = Object.assign({}, this.schoolMajorParams, this.searchItems)
				this.schoolMajorParams.orderBy = `${key} ${sort?'ASC':'DESC'}`;
				this.fetchData3(this.schoolMajorParams);
			},
			onSortChange4(sort, key) {
				this.gradeMajorParams = Object.assign({}, this.gradeMajorParams, this.searchItems)
				this.gradeMajorParams.orderBy = `${key} ${sort?'ASC':'DESC'}`;
				this.fetchData4(this.gradeMajorParams);
			},
			show() {
				this.showTable[0].show = !this.showTable[0].show;
				this.showTable[this.showIndexPro].show = !this.showTable[this.showIndexPro].show;
			},
			reSearch(paramsObj) {
				this[`handleSearch${this.showIndexPro}`](paramsObj);
			},
			//导出
			exportCurr1(val) {
				if(val == 1) {
					let params = {
						searchType: 0,
						keyword: ''
					}
					window.open(school.exportEXCEL(params))
				} else {
					let params = {
						searchType: 0,
						keyword: ''
					}
					window.open(school.exportEXCEL(params))
				}
			},
			exportCurr2(val) {
				if(val == 1) {
					academeManage.export(this.searchItems)
				} else {
					let params = {
						searchType: 0,
						keyword: ''
					}
					window.open(academeManage.exportEXCEL(params))
				}
			},
			exportCurr3(val) {
				if(val == 1) {
					SchoolMajor.exportSchooMajor(this.searchItems)
				} else {
					let params = {
						searchType: 0,
						keyword: ''
					}
					window.open(SchoolMajor.exportSchooMajor(params))
				}
			},
			exportCurr4(val) {
				if(val == 1) {
					SchoolMajor.exportGradeSchooMajor(this.searchItems)
				} else {
					let params = {
						searchType: 0,
						keyword: '',
					}
					window.open(SchoolMajor.exportGradeSchooMajor(params))
				}
			},
			onFilter1(item){ // 院校库-学校 排名
				if(item.value){
					this.searchItems.rankType = item.value;
				} else {
					delete this.searchItems.rankType;
				}
				this.fetchData1(this.searchItems);
			}
		},
		watch: {
			showIndex(val) {
				if(val == -1) {
					return;
				}
				this.showIndexPro = val;
				this.showTable.forEach(v => {
					v.show = true;
				});
				this.showTable[val].show = false;
				this.showTable[0].show = false;
				this.showIndex = -1;
			},
			toStateId(val) {
				this.toState(val);
			}
		}
	};
</script>