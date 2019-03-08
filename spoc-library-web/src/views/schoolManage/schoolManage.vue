//学校管理主页
<style lang="less">
	.schoolManage {
		min-height: 500px;
		table {
			.ivu-table-cell {
				padding: 0;
			}
			.tool{
				.ivu-tooltip-inner{
					white-space:pre-line;
				}
			}
		}
		.page-box {
			display: flex;
			justify-content: center;
			margin-top: 20px;
		}
		.rank1:hover:before {
			z-index: 999;
			text-transform: capitalize;
			content: '#'attr(data-num)' in National 'attr(data-type);
			width: 200px;
			height: 54px;
			background: #fff;
			font-weight: normal;
			color: #000;
			box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
			border-color: #eee;
			line-height: 54px;
			text-align: center;
			position: absolute;
			top: -44px;
			left: -80%;
		}
		.rank2:hover:before {
			z-index: 999;
			content: 'Rank Not Publishedv \A U.S.News calculated a numerical rank but \A does not publish it.';
			text-transform: capitalize;
			height: 67px;
			width: 271px;
			background: #fff;
			box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
			border-color: #eee;
			white-space: pre-wrap;
			text-align: center;
			line-height: 18px;
			position: absolute;
			top: -54px;
			left: -80%;
			color: #000;
			font-weight: normal;
			box-sizing: border-box;
			padding-top: 6px;
		}
		.rank3:hover:before {
			z-index: 999;
			content: 'Unranked \A school did not supply enough information \A to U.S.News to calculate a ranking.';
			text-transform: capitalize;
			height: 67px;
			width: 271px;
			background: #fff;
			box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
			border-color: #eee;
			white-space: pre-wrap;
			text-align: center;
			line-height: 18px;
			position: absolute;
			top: -54px;
			left: -80%;
			color: #000;
			font-weight: normal;
			box-sizing: border-box;
			padding-top: 6px;
		}
		.ivu-table-body,
		.ivu-table-cell {
			overflow: visible;
			.ivu-table-cell-ellipsis {
				overflow: visible;
			}
		}
		.logo {
			&.ivu-table-column-center {
				.ivu-table-cell {
					span {
						display: none;
					}
				}
			}
		}
	}
</style>

<template>
	<div class="schoolManage">
		<v-select style="width: 396px;margin: 10px 0;" placeholder="输入关键词搜索" icon="search" v-model="schoolName" k='cnname' :datafunc="searchDropList" @on-enter="textChange" @on-click="textChange" @selected="textChange">
		</v-select>
		<Btnlists title="学校-列表" :btnList="btninfo" ></Btnlists>
		<Table :columns="columns" :data="tableItem" @on-selection-change="selection" @on-sort-change="sortChange"></Table>
		<div class="page-box" v-show="count>10">
			<div style="margin: auto;display: inline-block;">
				<Page :total="count" :current="1" show-total :show-sizer="count>10" show-elevator @on-change="pageChange" @on-page-size-change="sizeChange"></Page>
			</div>
		</div>
		<form class="formexport" :action="exportUrl" method="get">
			<input type="hidden" name="ids" v-model="exportData" />
		</form>
	</div>
</template>

<script>
	import valid, {
		errors,
		school,
		common
	} from '../../libs/request';
	import vSelect from "../../modules/vSelect.vue";
	import MenuBar from '../../modules/menuBar';
	import Btnlists from '@public/modules/btnlist';
	import logo from "../../assets/svg/logo.svg";
	import ivygateimg from "../../assets/images/schoolManage/addSchool/ivygate.svg";
	import usimg from "../../assets/images/schoolManage/addSchool/us.svg";
	export default {
		data() {
			return {
				ivygate: ivygateimg,
				us: usimg,
				logoImg: logo,
				exportData: '',
				exportUrl: school.exportSelected(),
				columns: [{
						type: 'selection',
						width: 60,
						align: 'center',
					},
					{
						width: 40,
						align: 'center',
						className: 'logo',
						render: (h, params) => {
							return h('img', {
								attrs: {
									src: params.row.logoUrl || this.logoImg
								},
								style: {
									float: 'left',
									width: '40px',
									height: '40px'
								}
							})
						}
					},
					{
						sortable: 'custom',
						width: 60,
						align: 'center',
						title: '排名',
						filters: [],
						filterMultiple: false,
						filterRemote(val) {
							this.filter(val)
						},
						key: 'schoolRanking',
						render: (h, params) => {
							return h('Tooltip', {
								'class':{
									tool:true
								},
								style: {
									'float': 'left',
									width: '60px',
									textAlign: 'left',
									padding: '0 12px',
									lineHeight: '40px',
								},
								props:{
									content:params.row.schoolRanking == '11111' ? "Rank Not Publishedv U.S.News calculated a numerical rank but does not publish it." : params.row.schoolRanking == '22222' ? "Unranked school did not supply enough information to U.S.News to calculate a ranking." : (!!params.row.schoolRanking && !!params.row.schoolType && params.row.schoolType != 'others') ? '#'+params.row.schoolRanking+' in National '+(params.row.schoolType == 'colleges' ? 'Liberal Arts Colleges' : params.row.schoolType == 'universities' ? params.row.schoolType : ''): '',
									placement:'top'
								},
							},
							params.row.schoolRanking == '11111' ? 'RNP' : params.row.schoolRanking == '22222' ? 'UN' : (!!params.row.schoolRanking) ? '#' + params.row.schoolRanking : 'null')
						}
					},
					{
						title: '学校',
						key: 'schoolName',
						align: 'left',
						sortable: 'custom',
						ellipsis: true,
						render: (h, params) => {
							return h('div', {
								style: {
									width: '100%',
									height: '60px',
									margin: '0 auto',
									padding: '10px 0'
								}
							}, [, h('p', {
								style: {
									float: 'left',
									width: '100%',
									boxSizing: 'border-box',
									display: 'inline-block',
									color: "#44bcb7",
									fontSize: '12px',
									cursor: 'pointer'
								},
								on: {
									click: () => {
										this.$router.push({
											name: 'library.addSchool',
											query: {
												'edit': 1,
												'schoolId': params.row.id,
												'ban': 1,
												usnews: params.row.usnewsId
											}
										});
									}
								}
							}, [
								h('span', {
									style: {
										display: 'block',
										lineHeight: '22px',
										textAlign: 'left',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
									}
								}, params.row.schoolName),
								h('span', {
									style: {
										display: 'block',
										lineHeight: '22px',
										textAlign: 'left',
										width: '150px',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
									}
								}, params.row.schoolEnname == params.row.schoolName ? '' : params.row.schoolEnname),
							]), ])
						}
					},
					{
						title: '学校类型',
						key: 'schoolType',
						align: 'center',
					},
					{
						title: '所在州',
						key: 'state',
						align: 'center'
					},
					{
						sortable: 'custom',
						title: '学校信息来源',
						key: 'source',
						align: 'center',
						render: (h, params) => {
							return h('div', {
									style: {
										textAlign: 'center'
									}
								},
								//                  	params.row.source
								[
									h('img', {
										attrs: {
											src: /ivygate/.test(params.row.source) ? this.ivygate : this.us
										},
										style: {
											width: '20px',
											height: '20px',
										}
									})
								]
							)
						}
					},
					{
						title: '专业',
						key: 'majorCount',
						align: 'center',
						sortable: 'custom',
					},
					{
						title: '信息完善度',
						key: 'completeDegree',
						align: 'center',
						sortable: true,
						render: (h, params) => {
							return h('span', {
								style: {
									cursor: 'pointer',
									color: '#44bcb7'
								},
								on: {
									click: () => {
										this.$router.push({
											name: 'library.addSchool',
											query: {
												'edit': 1,
												'schoolId': params.row.id,
												'ban': 1,
												usnews: params.row.usnewsId
											}
										});
									}
								}
							}, (params.row.completeDegree || 0) + '%')
						}
					}
				],
				schoolName: '',
				sort: 'asc',
				field: 'school_ranking',
				pageNo: 1,
				pageSize: 10,
				rankType: '',
				tableItem: [],
				pitchItem: [],
				btninfo: [
					{
						text: '删除学校',
						type: 'default',
						cls: 'bt1',
						visible: false,
						event: this.delSchool,
					},
					{
						text: '导出学校',
						type: 'default',
						cls: 'bt2',
						children: [
							{
								text: '导出当前',
								event: this.deriveCurrent,
							},
							{
								text: '导出所有',
								event: this.deriveAll,
							},
						],
					},
					{
						text: '导入学校',
						type: 'default',
						cls: 'bt4',
						event: this.importSchool,
					},
					{
						text: '添加学校',
						event: this.addSchool,
					},
				],
				count: 0,
			}
		},
		components: {
			"menuBar": MenuBar,
			vSelect,
			Btnlists,
		},
		watch: {
			pitchItem(newVal) {
				if(newVal.length > 0) {
					this.$set(this.btninfo[0], 'visible', true);
				} else {
					this.$set(this.btninfo[0], 'visible', false);
				}
			},
		},
		beforeCreate() {
			let _this = this;
			this.sort = 'asc';
			this.field = 'school_ranking';
			let param = {
				field: 'school_ranking',
				sort: this.sort,
				pageNo: 1,
				pageSize: 10,
				rankType: this.rankType
			}
			school.schoolList(param).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.count = res.data.data.count;
					this.tableItem = res.data.data.list;
				}
			}).catch(errors.call(this));
			common.listData({
				type: 'ss_rank_type'
			}).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.columns[2].filters = res.data.data;
				}
			}).catch(errors.call(this));
		},
		methods: {
			filter: function(val) {
				this.rankType = val[0];
				let param = {
					field: this.field,
					sort: this.sort,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					schoolName: this.schoolName,
					rankType: this.rankType
				}
				school.schoolList(param).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.tableItem = res.data.data.list;
						this.count = res.data.data.count;
					}
				}).catch(errors.call(this));
			},
			searchDropList(word) {
				return new Promise((resolve, reject) => {
					school.listThink({
						schoolName: word
					}).then(valid.call(this)).then(res => {
						if(res.ok) {
							resolve(res.data.data);
						} else {
							reject(res);
						}
					}).catch(err => {
						errors.call(this);
						reject(err);
					});
				});
			},
			sizeChange: function(val) {
				this.pageSize = val;
				let param = {
					field: this.field,
					sort: this.sort,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					schoolName: this.schoolName,
					rankType: this.rankType
				}
				school.schoolList(param).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.tableItem = res.data.data.list;
						this.count = res.data.data.count;
					}
				}).catch(errors.call(this));
			},
			selection: function(data) {
				this.pitchItem = data;
			},
			addSchool: function() {
				this.$router.push({
					name: 'library.addSchool',
					query: {}
				});
			},
			importSchool: function(show) {
				this.$router.push({
					name: 'library.import',
					query: {
						t: 'school'
					}
				})
			},
			delSchool: function() {
				if(this.pitchItem.length) {
					this.$Modal.confirm({
						title: "删除学校",
						render: (h) => {
							return h('div', {
								style: {
									marginTop: '14px',
									borderTop: '1px #dcdcdc solid',
									paddingTop: '40px',
									textAlign: 'center',
									fontSize: '14px',
									fontWeight: 'bold'
								}
							}, '您确定要删除吗？')
						},
						onOk: () => {
							if(!!!this.pitchItem.length) {
								this.$Modal.warning({
									title: '',
									content: '请选择学校'
								});
							}
							let arr = [];
							for(var val of this.pitchItem) {
								arr.push(val.id)
							}
							let str = {
								ids: arr.join(',')
							}
							school.delList(str).then(valid.call(this)).then(res => {
								let param = {
									field: this.field,
									sort: this.sort,
									pageNo: this.pageNo,
									pageSize: this.pageSize,
									schoolName: this.schoolName,
									rankType: this.rankType
								}
								school.schoolList(param).then(valid.call(this)).then(res => {
									if(res.ok) {
										this.tableItem = res.data.data.list;
										this.count = res.data.data.count;
									}
								}).catch(errors.call(this));
							}).catch(errors.call(this));
						}
					})
				}
			},
			deriveCurrent: function() {
				if(!this.pitchItem.length) {
					this.$Modal.warning({
						title: '',
						content: '请选择学校信息'
					});
				} else {
					let arr = this.pitchItem.map(item => item.id);
					let form = this.$el.querySelector('.formexport');
					this.exportData = arr.join(',');
					this.$nextTick(() => {
						form.submit();
					});
				}
			},
			deriveAll: function() {
				let params = {
					searchType: 0,
					keyword: this.schoolName
				}
				window.open(school.exportEXCEL(params))
			},
			pageChange: function(num) {
				this.pageNo = num
				let param = {
					field: this.field,
					sort: this.sort,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					schoolName: this.schoolName,
					rankType: this.rankType
				}
				school.schoolList(param).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.tableItem = res.data.data.list;
						this.count = res.data.data.count;
					}
				}).catch(errors.call(this));
			},
			textChange: function(val) {
				//		this.schoolName=val;

				this.$nextTick(() => {
					let param = {
						field: this.field,
						sort: this.sort,
						pageNo: this.pageNo,
						pageSize: this.pageSize,
						schoolName: this.schoolName,
						rankType: this.rankType
					}
					school.schoolList(param).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.tableItem = res.data.data.list
							this.count = res.data.data.count;
						}
					}).catch(errors.call(this))
				})
			},
			sortChange: function(data) {
				console.log(data)
				let fieldNum = 2;
				if(data.key == 'schoolRanking') {
					fieldNum = 'school_ranking';
				} else if(data.key == 'schoolName') {
					fieldNum = 'school_enname';
				} else if(data.key == 'source') {
					fieldNum = 'source';
				} else if(data.key == 'completeDegree') {
					fieldNum = 'complete_degree';
				} else if(data.key == 'majorCount') {
					fieldNum = 'majorCount';
				}
				this.field = fieldNum;
				if(data.order != 'normal') this.sort = data.order;
				let param = {
					field: this.field,
					sort: this.sort,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					schoolName: this.schoolName,
					rankType: this.rankType
				}
				school.schoolList(param).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.tableItem = res.data.data.list;
						this.count = res.data.data.count;
					}
				}).catch(errors.call(this));
			}
		}
	}
</script>