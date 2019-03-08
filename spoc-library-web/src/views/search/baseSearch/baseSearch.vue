<style lang="less">
.lib_search_baseSearch {
	.ivu-tabs{
		width: 100%;
	}
	.ivu-tabs-bar{
		width: 166px;
		margin: 0 auto;
		.ivu-tabs-tab:last-child{
			margin-right: 0;
		}
	}
  	.tab_bar {
		display: flex;
		justify-content: center;
		.search_box {
			margin-top:20px; 
			display: flex;
			align-items: center;
			justify-content: center;
			.search_contain {
				display: flex;
				justify-content: center;
				align-items: center;
				border: 1px solid #dddee1;
				.v_search {
					margin: 0;
				}
				.searchTipBox {
					width: 375px;
					position: relative;
					.searchResList {
						position: absolute;
						width: 396px;
						top: 32px;
						left: 0;
						background-color: #fff;
						border: 1px solid #dddee1;
					}
					.main-input {
						border: none;
						&:focus {
							box-shadow: none;
						}
					}
				}
				.ivu-select-selection {
					box-shadow: none;
					border-radius: 0;
					border-right: 1px solid #dddee1;
					.ivu-select-selected-value {
						text-align: center;
					}
				}
			}
			.ivu-select-selection,
			.ivu-input {
				border: none;
			}
		}
		.ivu-tabs-nav-scroll {
			display: flex;
			justify-content: center;
		}
		.hotSearch {
			margin-top: 15px;
			margin-bottom: 15px;
			display: flex;
			justify-content: center;
			span {
				margin-right: 30px;
			}
			div {
				margin-right: 30px;
				color: #44bcb7;
				cursor: pointer;
				white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
				max-width: 150px;
			}
		}
		.tableContent {
			.ivu-table-wrapper {
				border: 1px solid #dddee1;
				border-bottom: 0;
				border-right: 0;
			}
		}
  	}
	.academy_lib_condition {
		/*margin-top: 6px;*/
		display: flex;
		justify-content: center;
	}
	.export {
		text-align: right;
		margin-right: 30px;
		float: right;
		margin-top: 20px;
		.ivu-select-placeholder{
			text-align: center;
		}
	}
	.ivu-select-item-selected,
	.ivu-select-item-selected:hover {
		/*background: #dddee1;*/
	}
	.page {
		text-align: center;
		margin-top: 20px;
		margin-bottom: 150px;
	}
	.hiddenMy{
		display: none;
	}
}
</style>
<template>
  <div class="lib_search_baseSearch">
	<div class="tab_bar">
	  <Tabs v-model="libOpts">
		<TabPane label="院校库" name="1">
			<div class="export" v-if="userInfo.admin">
				<Dropdown @on-click="exportCurr1">
					<Button type="ghost" style="border: 1px solid #999999;">
						导出
					<Icon type="arrow-down-b"></Icon>
					</Button>
					<DropdownMenu slot="list">
						<DropdownItem :name="1" style="text-align: center;display: block;">导出当前</DropdownItem>
						<DropdownItem :name="0" style="text-align: center;display: block;">导出所有</DropdownItem>
					</DropdownMenu>
				</Dropdown>
		  	</div>
		  	<div>
			  	<div class="search_box">
					<div class="search_contain">
						<Select v-model="searchOpt" style="width:100px" class="select">
							<Option v-for="item in searchOptList" :value="item.value" :key="item.id">{{ item.label }}</Option>
						</Select>
						<div class="searchTipBox">
							<v-select placeholder="在院校中搜索" k="enname" icon="search" v-model="academy_lib_search_key_word" :datafunc="searchDropList1" @selected="onSelectSearch1" @on-enter="onSearch1" @on-click="onSearch1"></v-select>
						</div>
					</div>
					<router-link style="margin:10px;color:#44bcb7" :to="{name:'library.advancedSearch'}">高级检索</router-link>
				</div>
		  	</div>
		  	<div class="hotSearch">
				<span v-html="searchOpt==1?'学校热词：':'研究生院热词：'"></span>
				<div v-if="searchOpt == 1" v-for="(item,index) in hot_search.school" :key="index" v-html="item.hotword" @click="get_hot_word1(item)"></div>
				<div v-if="searchOpt == 2" v-for="(item,index) in hot_search.gradeschool" :key="index" v-html="item.hotword" @click="get_hot_word2(item)"></div>
		  	</div>
		  
			<div>
				<div v-show="searchOpt=='1'" class="tableContent academy_lib">
					<search-table :data="academy_undergraduate_data.list" :ftable="schoolCol.ftable" :mtable="schoolCol.mtable"></search-table>
					<div class="page">
						<Page show-elevator show-total :current="academy_undergraduate_data.pageNo"  show-sizer :total="academy_undergraduate_data.count" :page-size="schoolListParams.pageSize" @on-change="onPageChange1" @on-page-size-change="onPageSizeChange1" v-if="academy_undergraduate_data.count>10"></Page>
					</div>
				</div>
				<div v-show="searchOpt=='2'" class="tableContent academy_lib">
					<search-table :data="academy_graduate_data.list" :ftable="schoolGradeCol.ftable" :mtable="schoolGradeCol.mtable"></search-table>
					<div class="page">
						<Page show-elevator show-total :current="academy_graduate_data.pageNo" show-sizer :total="academy_graduate_data.count" :page-size="gradeListParams.pageSize" @on-change="onPageChange2" @on-page-size-change="onPageSizeChange2" v-if="academy_graduate_data.count>10"></Page>
					</div>
				</div>
			</div>

		</TabPane>
		<TabPane label="专业库" name="2">
			<div class="export" v-if="userInfo.admin">
				<Dropdown @on-click="exportCurr2">
					<Button type="ghost" style="border: 1px solid #999999;">
						导出
						<Icon type="arrow-down-b"></Icon>
					</Button>
					<DropdownMenu slot="list">
						<DropdownItem :name="1" style="text-align: center;display: block;">导出当前</DropdownItem>
						<DropdownItem :name="0" style="text-align: center;display: block;">导出所有</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
			<div>
				<div class="search_box">
				<div class="search_contain">
					<Select v-model="searchOpt" style="width:100px">
						<Option v-for="item in searchOptList1" :value="item.value" :key="item.id">{{ item.label }}</Option>
					</Select>
					<div class="searchTipBox">
						<v-select placeholder="在专业库搜索" k="enname" icon="search" v-model="academy_lib_search_key_word" :datafunc="searchDropList2" @selected="onSelectSearch2" @on-enter="onSearch2" @on-click="onSearch2"></v-select>
					</div>
				</div>
					<router-link style="margin:10px;color:#44bcb7;" :to="{name:'library.advancedSearch'}">高级检索</router-link>
				  	<div class="academy_lib_condition">
						<RadioGroup v-model="academy_lib_condition">
							<Radio label="1">按学校</Radio>
							<Radio label="2">按专业</Radio>
						</RadioGroup>
				  	</div>
				</div>
			</div>
			<div class="hotSearch">
				<span v-html="searchOpt==2?'本科热词：':'研究生热词：'"></span>
				<div v-if="searchOpt == 1" v-for="(item,index) in (academy_lib_condition==2?hot_search.gradeschoolMajor:hot_search.gradeschoolMajorForGradeschool)" :key="index" v-html="item.hotword" @click="get_hot_word4(item)"></div>
				<div v-if="searchOpt == 2" v-for="(item,index) in (academy_lib_condition==2?hot_search.schoolMajor:hot_search.schoolMajorForSchool)" :key="index" v-html="item.hotword" @click="get_hot_word3(item)"></div>
			</div>
		   
			<div class="tableContent major_lib">
				<div v-show="searchOpt=='2'">
					<search-table :data="major_undergraduate_data.list" :ftable="majorCol.ftable" :alone="true"></search-table>
					<div class="page">
						<Page show-elevator show-total :current="major_undergraduate_data.pageNo" show-sizer :total="major_undergraduate_data.count" :page-size="schoolMajorParams.pageSize" @on-change="onPageChange3"  @on-page-size-change="onPageSizeChange3" v-if="major_undergraduate_data.count>10"></Page>
					</div>
				</div>
				<div v-show="searchOpt=='1'">
					<search-table :data="major_graduate_data.list" :ftable="majorGradeCol.ftable" :mtable="majorGradeCol.mtable"></search-table>
					<div class="page">
						<Page show-elevator show-total show-sizer :current="major_graduate_data.pageNo" :total="major_graduate_data.count" :page-size="gradeMajorParams.pageSize" @on-change="onPageChange4" @on-page-size-change="onPageSizeChange4" v-if="major_graduate_data.count>10"></Page>
					</div>
				</div>
			</div>
		</TabPane>
	  </Tabs>
	</div>
  </div>
</template>
<script>
import vSelect from "../../../modules/vSelect";
import { mapMutations,mapState } from "vuex";
import searchTable from "../searchTable/searchTable";
import {schoolCol,schoolGradeCol,majorCol,majorGradeCol}  from "../searchCol";
import valid, { errors, tmBaseSearch,school,academeManage,SchoolMajor,common } from "../../../libs/request";
export default {
	name: "baseSearch",
	data() {
		return {
			schoolCol:schoolCol(this),
			schoolGradeCol:schoolGradeCol(this),
			majorCol:majorCol(this),
			majorGradeCol:majorGradeCol(this),
			libOpts: "1",
			searchOpt: "1",
			academy_lib_condition: "1",
			searchOptList: [
				{ id: 1, value: "2", label: "研究生院" },
				{ id: 2, value: "1", label: "学校" }
			],
			searchOptList1: [
				{ id: 1, value: "2", label: "本科" },
				{ id: 2, value: "1", label: "研究生" }
			],
			importOpt: "",
			importOptList: [
				{ id: 1, value: "impCurr", label: "导出当前" },
				{ id: 2, value: "impAll", label: "导出全部" }
			],
			searchResList: [],
			academy_lib_search_key_word: "",
			//热词
			searchKeyWord: "",
			// searchTipBoxShow: false,
			hot_search: [
			],
			academy_undergraduate_data: {
				count: 10,
				pageNo: 1,
				pageCount: 1,
				list: []
			},
			academy_graduate_data: {
				count: 10,
				pageNo: 1,
				pageCount: 1,
				list: []
			},
			major_undergraduate_data: {
				count: 10,
				pageNo: 1,
				pageCount: 1,
				list: []
			},
			major_graduate_data: {
				count: 10,
				pageNo: 1,
				pageCount: 1,
				list: []
			},
			schoolList: {
				pageNo: "1",
				count: "1"
			},
			// 本科学校列表（按名称）-带分页和排序参数
			schoolListParams: {
				pageNo: 1,
				pageSize: 10,
				orderBy: "schoolRanking ASC",
				keyword: ""
			},
			// 本科专业（按名称）-带分页和排序参数
			schoolMajorParams: {
				pageNo: 1,
				pageSize: 10,
				orderBy: "",
				keyword: "",
				searchType: "1"
			},
			// 研究生院（按名称）-带分页和排序参数
			gradeListParams: {
				id: "",
				pageNo: 1,
				pageSize: 10,
				orderBy: "ranking ASC",
				keyword: ""
			},
			//研究生专业（按名称）-带分页和排序
			gradeMajorParams: {
				pageNo: 1,
				pageSize: 10,
				orderBy: "",
				keyword: "",
				searchType: "1"
			},
			filterData:[],
		};
	},
	computed: {
		...mapState(['userInfo']),
	},
	components: {
		vSelect,
		searchTable
	},
	created() {
		this.fetchSchoolList(this.schoolListParams);
		this.fetchGradeList(this.gradeListParams);
		this.fetchScholMajorList(this.schoolMajorParams);
		this.fetchGradeMajor(this.gradeMajorParams);
		this.fetchHotwords();
		common.listData({type:'ss_rank_type'}).then(valid.call(this)).then(res => {
			if(res.ok){
				this.filterData = res.data.data;
			}
		}).catch(errors.call(this));
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		loadFilter(){
			const param={
				type:'ss_rank_type'
			}
		},
		//院校库导出
		exportCurr1(val){
			//导出学校
			if(this.searchOpt==1){
				if(val==1){//导出当前
					let params={
						searchType:0,
						keyword:this.academy_lib_search_key_word
					}
					window.open(school.exportEXCEL(params))
				}else{//导出全部
					let params={
						searchType:0,
						keyword:''
					}
					window.open(school.exportEXCEL(params))
				}
			}else{//导出研究生院
				if(val==1){//导出当前
					let params={
						searchType:0,
						keyword:this.academy_lib_search_key_word
					}
					window.open(academeManage.exportEXCEL(params))
				}else{//导出全部
					let params={
						searchType:0,
						keyword:'',
					}
					window.open(academeManage.exportEXCEL(params))
				}
			}
		},
		//专业库导出
		exportCurr2(val){
			//导出本科专业
			if(this.searchOpt ==2){
				if(val==1){//导出当前
					let params={
							searchType:0,
							keyword:this.academy_lib_search_key_word,
						}
					window.open(SchoolMajor.exportSchooMajor(params))
				}else{//导出全部
					let params={
							searchType:0,
							keyword:'',
						}
					window.open(SchoolMajor.exportSchooMajor(params))
				}
			}else{//导出研究生专业
				if(val==1){//导出当前
					let params={
							searchType:0,
							keyword:this.academy_lib_search_key_word,
						}
					window.open(SchoolMajor.exportGradeSchooMajor(params))
				}else{//导出全部
					let params={
							searchType:0,
							keyword:'',
						}
					window.open(SchoolMajor.exportGradeSchooMajor(params))
				}
			}
		},
		//跳转学院详情页
		jumpAcademeInfo(params) {
			this.$router.push({
				name: "library.academeBasicInfo",
				query: { gradeSchoolId: params.row.id }
			});
		},
		//跳转学校详情页
		jumpSchoolInfo(params) {
			this.$router.push({
				name: "library.schoolDetail",
				query: { id: params.row.id }
			});
		},
		//跳转专业详情页
		jumpMajorInfo(params) {
			this.$router.push({
				name: "library.academeAddMajor",
				query: { majorId: params.row.majorId }
			});
		},
		get_hot_word1(item) {
			// this.searchKeyWord = item;
			this.fetchSchoolList({ keyword: item.hotword,id:item.hotId });
		},
		get_hot_word2(item) {
			// this.searchKeyWord = item;
			this.fetchGradeList({ keyword: item.hotword,id:item.hotId });
		},
		get_hot_word3(item) {
			// this.searchKeyWord = item;
			this.fetchScholMajorList({ keyword: item.hotword,id:item.hotId,searchType:this.academy_lib_condition });
		},
		get_hot_word4(item) {
			// this.searchKeyWord = item;
			this.fetchGradeMajor({ keyword: item.hotword,id:item.hotId,searchType:this.academy_lib_condition});
		},
		//本科学校列表（按名称）-带分页和排序
		fetchSchoolList(params) {
			this.updateLoadingStatus({ isLoading: true });
			tmBaseSearch
			.fetchSchoolList(params)
			.then(valid.call(this))
			.then(res => {
				if(res.ok){
					this.academy_undergraduate_data = res.data.data;
				}			
			})
			.catch(errors.call(this))
			.finally(() => {
				this.updateLoadingStatus({ isLoading: false });
			});
		},
		//本科专业列表（按名称）-带分页和排序
		fetchScholMajorList(params) {
			this.updateLoadingStatus({ isLoading: true });
			tmBaseSearch
			.fetchScholMajorList(params)
			.then(valid.call(this))
			.then(res => {
				if (res.ok) {
					this.major_undergraduate_data = res.data.data;
				}	
			})
			.catch(errors.call(this))
			.finally(() => {
				this.updateLoadingStatus({ isLoading: false });
			});
		},
		// 研究生院（按名称）-带分页和排序
		fetchGradeList(params) {
			this.updateLoadingStatus({ isLoading: true });
			tmBaseSearch
			.fetchGradeList(params)
			.then(valid.call(this))
			.then(res => {
				if (res.ok) {
					this.academy_graduate_data = res.data.data;
				}
			})
			.catch(errors.call(this))
			.finally(() => {
				this.updateLoadingStatus({ isLoading: false });
			});
		},
		//研究生专业（按名称）-带分页和排序
		fetchGradeMajor(params) {
			this.updateLoadingStatus({ isLoading: true });
			tmBaseSearch
			.fetchGradeMajor(params)
			.then(valid.call(this))
			.then(res => {
				if (res.ok) {
					this.major_graduate_data = res.data.data;
				}
			})
			.catch(errors.call(this))
			.finally(() => {
				this.updateLoadingStatus({ isLoading: false });
			});
		},

		// 分页
		onPageChange1(val) {
			this.schoolListParams.pageNo = val;
			this.schoolListParams.keyword = this.academy_lib_search_key_word;
			this.fetchSchoolList(this.schoolListParams);
		},
		onPageSizeChange1(val) {
			this.schoolListParams.pageSize = val;
			this.schoolListParams.keyword = this.academy_lib_search_key_word;
			this.fetchSchoolList(this.schoolListParams);
		},
		onPageChange2(val) {
			this.gradeListParams.pageNo = val;
			this.gradeListParams.keyword = this.academy_lib_search_key_word;
			this.fetchGradeList(this.gradeListParams);
		},
		onPageSizeChange2(val) {
			this.gradeListParams.pageSize = val;
			this.gradeListParams.keyword = this.academy_lib_search_key_word;
			this.fetchGradeList(this.gradeListParams);
		},
		onPageChange3(val) {
			this.schoolMajorParams.pageNo = val;
			this.schoolMajorParams.keyword = this.academy_lib_search_key_word;
			this.fetchScholMajorList(this.schoolMajorParams);
		},
		onPageSizeChange3(val) {
			this.schoolMajorParams.pageSize = val;
			this.schoolMajorParams.keyword = this.academy_lib_search_key_word;
			this.fetchScholMajorList(this.schoolMajorParams);
		},
		onPageChange4(val) {
			this.gradeMajorParams.pageNo = val;
			this.gradeMajorParams.keyword = this.academy_lib_search_key_word;
			this.fetchGradeMajor(this.gradeMajorParams);
		},
		onPageSizeChange4(val) {
			this.gradeMajorParams.pageSize = val;
			this.gradeMajorParams.keyword = this.academy_lib_search_key_word;
			this.fetchGradeMajor(this.gradeMajorParams);
		},
		//获取热词
		fetchHotwords() {
			this.updateLoadingStatus({ isLoading: true });
			tmBaseSearch
			.fetchHotwords(this.schoolMajorParams)
			.then(valid.call(this))
			.then(res => {
				if (res.ok) {
					this.hot_search = res.data.data;
				}	
			})
			.catch(errors.call(this))
			.finally(() => {
				this.updateLoadingStatus({ isLoading: false });
			});
		},
		onSortChange1(sort,key) {
			this.schoolListParams.orderBy = `${key} ${sort?'ASC':'DESC'}`;
			this.fetchSchoolList(this.schoolListParams);
		},
		onSortChange2(sort,key) {
			this.gradeListParams.orderBy = `${key} ${sort?'ASC':'DESC'}`;
			this.fetchGradeList(this.gradeListParams);
		},
		onSortChange3(sort,key) {
			this.schoolMajorParams.orderBy = `${key} ${sort?'ASC':'DESC'}`;
			this.fetchScholMajorList(this.schoolMajorParams);
		},
		onSortChange4(sort,key) {
			this.gradeMajorParams.orderBy = `${key} ${sort?'ASC':'DESC'}`;
			this.fetchGradeMajor(this.gradeMajorParams);
		},
		// 学校搜索（按名称联想）
		searchDropList1(word) {
			if (this.searchOpt == 1) {
				return new Promise((resolve, reject) => {
				tmBaseSearch
					.schoolSearch(word)
					.then(valid.call(this))
					.then(res => {
					if (res.ok) {
						resolve(res.data.data);
					} else {
						reject(res);
					}
					})
					.catch(err => {
					errors.call(this);
					reject(err);
					});
				});
			} else {
				// 研究生院搜索（按名称联想）
				return new Promise((resolve, reject) => {
				tmBaseSearch
					.gradeSchoolSearch(word)
					.then(valid.call(this))
					.then(res => {
					if (res.ok) {
						resolve(res.data.data);
					} else {
						reject(res);
					}
					})
					.catch(err => {
					errors.call(this);
					reject(err);
					});
				});
			}
		},
		// 专业联想
		searchDropList2(word) {
			if (this.searchOpt == 2) {
				// 本科专业搜索（按专业名称联想）
				if(this.academy_lib_condition ==2){
					return new Promise((resolve, reject) => {
						tmBaseSearch
						.schoolMajorSearch(word)
						.then(valid.call(this))
						.then(res => {
							if (res.ok) {
							resolve(res.data.data);
							} else {
							reject(res);
							}
						})
						.catch(err => {
							errors.call(this);
							reject(err);
						});
					});
					// 本科专业搜索（按学校名称联想）
				} else {
					return new Promise((resolve, reject) => {
						tmBaseSearch
						.schoolSearch(word)
						.then(valid.call(this))
						.then(res => {
							if (res.ok) {
							resolve(res.data.data);
							} else {
							reject(res);
							}
						})
						.catch(err => {
							errors.call(this);
							reject(err);
						});
					});
				}
			} else {
				if(this.academy_lib_condition ==2){
					// 研究生专业搜索（按专业名称联想）
					return new Promise((resolve, reject) => {
						tmBaseSearch
						.gradeMajorSearch(word)
						.then(valid.call(this))
						.then(res => {
							if (res.ok) {
							resolve(res.data.data);
							} else {
							reject(res);
							}
						})
						.catch(err => {
							errors.call(this);
							reject(err);
						});
					});
				} else {
					// 研究生专业搜索（按学校名称联想）
					return new Promise((resolve, reject) => {
						tmBaseSearch
						.gradeSchoolSearch(word)
						.then(valid.call(this))
						.then(res => {
							if (res.ok) {
							resolve(res.data.data);
							} else {
							reject(res);
							}
						})
						.catch(err => {
							errors.call(this);
							reject(err);
						});
					});
				}
			}
		},
		onSearch1() {
			this.schoolListParams.pageSize = 10;
			this.gradeListParams.pageSize = 10;
			if (this.searchOpt == 1) {
				this.fetchSchoolList({ keyword: this.academy_lib_search_key_word });
			} else {
				this.fetchGradeList({ keyword: this.academy_lib_search_key_word });
			}
		},
		onSelectSearch1(item) {
			this.schoolListParams.pageSize = 10;
			this.gradeListParams.pageSize = 10;
			if (this.searchOpt == 1) {
				this.schoolListParams.keyword = item.enname;
				this.fetchSchoolList(Object.assign({id:item.id},this.schoolListParams));
			} else {
				this.gradeListParams.keyword = item.enname;
				this.fetchGradeList(Object.assign({id:item.id},this.gradeListParams));
			}
		},
		onSearch2(item) {
			this.schoolMajorParams.pageSize = 10;
			this.gradeMajorParams.pageSize = 10;
			if (this.searchOpt == 2) {
				this.fetchScholMajorList({
					keyword: this.academy_lib_search_key_word,
					searchType: this.academy_lib_condition
				});
			} else {
				this.fetchGradeMajor({
					keyword: this.academy_lib_search_key_word,
					searchType: this.academy_lib_condition
				});
			}
		},
		onSelectSearch2(item) {
			this.schoolMajorParams.pageSize = 10;
			this.gradeMajorParams.pageSize = 10;
			if (this.searchOpt == 2) {
				this.schoolMajorParams.keyword = item.enname;
				this.schoolMajorParams.searchType= this.academy_lib_condition;
				this.fetchScholMajorList(Object.assign({id:item.id},this.schoolMajorParams));
			} else {
				this.gradeMajorParams.keyword = item.enname;
				this.gradeMajorParams.searchType= this.academy_lib_condition;
				this.fetchGradeMajor(Object.assign({id:item.id},this.gradeMajorParams));
			}
		},
		onFilter1(item){
			if(item.value){
				this.schoolListParams.rankType = item.value;
			} else {
				delete this.schoolListParams.rankType;
			}
			this.fetchSchoolList(this.schoolListParams);
		}
	},
	watch: {
		libOpts(){
			this.academy_lib_search_key_word= '';
		},
		searchOpt(){
			this.academy_lib_search_key_word ='';
		},
		academy_lib_condition(val){
			this.schoolMajorParams.searchType = val;
			this.gradeMajorParams.searchType =val;
		}
	}
};
</script>
