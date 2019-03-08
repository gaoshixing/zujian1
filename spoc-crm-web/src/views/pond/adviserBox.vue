<style lang="less">
	.crm_adviser_table {
		.search_box {
			padding-top: 15px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}
		.adviser_box {
			padding: 0px 10px;
			.caseBar {
				margin-top: 10px;
			}
		}
		.table_box {
			padding: 10px 18px;
			.strip-tit {
				span {
					font-size: 14px;
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
									vertical-align: baseline;
									padding-bottom: 34px;
									position: relative;
									overflow: visible;
									.ivu-table-cell {
										overflow: visible;
									}
								}
							}
						}
					}
				}
			}
			.radio_group {
				width: 100%;
			}
		}
	}
</style>

<template>
	<div class="crm_adviser_table">
		<div class="search_box">
			<v-select style="width: 396px;margin: 0px 18px;" placeholder="请输入销售顾问姓名" icon="search" v-model="search" k='cnname' :datafunc="searchDropList" @on-enter="textChange" @on-click="textChange" @selected="textChange">
			</v-select>
			<Button type="primary" @click="tagSelected=[]" size="small">查看全部</Button>
		</div>
		<div class="adviser_box">
			<case-bar-filter :from="2" menuId="801" title="分单方向：" :width="70" :mgt="7" @tagListChange="tagListChange" align="right" class="caseBar" tit-color="#999" isDirect='1' :selected="tagSelected">
			</case-bar-filter>
			<v-search-options :data="company.options" byKey="label" :searchTitle="company.tit" :companySelected="companySelected" @on-select-item="companyChange" labelWidth="80" v-if="company.options.length&&isHeadcompany" multiple style="margin-top: 10px;"></v-search-options>
		</div>
		<div class="table_box">
			<p class="strip-tit">共找到 <span>{{tableData.length}}</span> 位销售</p>
			<RadioGroup v-model="table_audio" class="radio_group">
				<Table height="720" :columns="columns" :loading="isloading" :data="tableData" @on-sort-change="sort"></Table>
			</RadioGroup>
		</div>
		<Modal ref="affirmBox" v-model="affirm" width="480" class-name="crm_affirmModel plan_common_modal vertical-center-modal" @on-visible-change="hiddModel">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				分单确认
			</p>
			<div>
				<Form ref="affirmForm1" :label-width="96">
					<FormItem label="销售顾问">
						<p>{{user}}&nbsp;({{office}})</p>
					</FormItem>
					<FormItem label="最晚接单时长">
						<p v-text="radioable? '不限':time+'分钟'"></p>
					</FormItem>
					<FormItem label="是否参与流转">
						<RadioGroup v-model="moving" @on-change="fallChange">
							<Radio label="1" :disabled="radioable">是</Radio>
							<Radio label="0" :disabled="radioable">否</Radio>
						</RadioGroup>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="ghost" @click="closeaffirmBox">取消</Button>
				<Button type="primary" @click="affirmOk()" :loading="isload">提交</Button>
			</div>
		</Modal>
		<!--<Modal v-model="hint1" width="418">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				<span>分单提示</span>
			</p>
			<div style="height: 100px;font-size: 14px;">
				<p>您选择的  客户已被分单，请重新选择分单。</p>
			</div>
			<div slot="footer">
				<Button type="ghost" @click="offHint">关闭</Button>
			</div>
		</Modal>-->
		<Modal v-model="hint2" width="418" @on-visible-change="hiddModel2">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				<span>分单提示</span>
			</p>
			<div style="height: 100px;font-size: 14px;">
				<p>您选择的以下客户已被分单，系统已帮您自动忽略。 </p>
				<p v-for="(item,index) in hint2User">{{item}}</p>
			</div>
			<div slot="footer">
				<Button type="ghost" @click="offHint2">关闭</Button>
				<Button type="primary" @click="confirm">确定</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import caseBarFilter from "@public/modules/caseBarFilter.vue";
	import vSearchOptions from "@public/modules/vSearchOptions.vue";
	import name from "./name.vue";
	import { mapState } from 'vuex';
	import vSelect from '@public/modules/vSelect';
	import valid, {
		errors,
		sys,
		common,
		crmAllocPlan,
		crmAllocResult
	} from "../../libs/request.js";
	export default {
		props: {
			tagSelects: {
				type: Array,
				default: () => {
					return [];
				}
			},
			formArr: {
				type: Array,
				default: () => {
					return [];
				}
			}
		},
		data() {
			return {
				tagSelected: this.tagSelects,
				companySelected: [],
				hint2: false,
				hint2User: [],
				radioable: false,
				//				hint1: false,
				moving: "1",
				isloading: false,
				affirmFormList: [],
				user: '',
				time: '30',
				office: '',
				affirm: false,
				search: '',
				tags: [],
				isload: false,
				pageNo1: 1,
				sortType: '',
				table_audio: '',
				company: {
					options: [],
					tit: '分公司'
				},
				companyId: [],
				columns: [{
						title: ' ',
						width: 36,
						align: 'center',
						render: (h, params) => {
							let self = this;
							return h("Radio", {
								props: {
									label: params.row.id,
								},
								nativeOn: {
									'change': () => {
										if(!self.formArr.length) {
											this.$Modal.warning({
												onOk: () => {
													self.table_audio = '';
												},
												render: (h) => {
													return h('div', {
														style: {
															width: "370px",
															height: "40px",
															textAlign: 'center',
															fontSize: '16px',
															fontWeight: '700'
														},
													}, '请选择客户 ')
												}
											})
											return false;
										}
										self.radioable = false;
										self.user = params.row.objectName;
										let params1 = {
											id: params.row.id,
											objectType: 'sales consultant'
										}
										crmAllocPlan.formFd(params1).then(valid.call(this)).then(res => {
											if(res.ok) {
												this.time = res.data.data.fallDuration;
												let isfall = false;
												if(params.row.officeName) {
													self.office = params.row.officeName.split(' ')[0];
												} else {
													self.office = '未知部门';
												}
												self.affirmFormList = [];
												if(self.formArr.length) {
													self.formArr.forEach((v, k) => {
														const a = {
															"cusId": v.id,
															"officeId": params.row.officeId,
															"sallerId": params.row.objectId,
															"score": v.score,
															"startDate": new Date(v.startDate).format('yyyy-MM-dd hh:mm:ss'),
															"mode": self.isHeadcompany ? "headquarter" : "office",
															"ifFall": "",
															"cusName": v.cusName,
															"fallDuration": this.time
														}
														if(v.isFall == "0") {
															isfall = true;
															self.radioable = true;
														} else {
															self.radioable = false;
														}
														self.affirmFormList.push(a);
													})
												}
												if(isfall) {
													this.moving = "0"
													this.radioable = true;
												} else {
													this.moving = "1"
													this.radioable = false;
												}
												if(this.moving != 0) {
													this.moving = res.data.data.ifFall;
													if(this.moving == '1') {
														this.radioable = false;
													} else {
														this.radioable = true;
													}
												}
												if(self.formArr.length > 1) {
													this.moving = "0"
													this.radioable = true;
												}
												self.affirm = true;
											}
										}).catch(errors.call(this));
									}
								},
							}, '')
						}
					},
					{
						title: '销售顾问',
						align: 'left',
						key: 'name',
						render: (h, params) => {
							let self = this;
							return h(name, {
								props: {
									oData: params.row,
									hint: 'isAdviser',
									selected: self.tagSelected,
									showKey: 'objectName'
								},
							}, '')
						},
					},
					{
						title: '今日资源数量 （已分/预计）',
						align: 'center',
						key: 'predictNumRatioDay',
						sortable: 'custom',
						render: (h, params) => {
							let self = this;
							return h('div', {}, (params.row.predictFNumDay || 0) + '/' + (params.row.predictNumDay || 0))
						},
					},
					{
						title: '当月资源数量 （已分/预计）',
						align: 'center',
						key: 'predictNumRatioMonth',
						sortable: 'custom',
						render: (h, params) => {
							let self = this;
							return h('div', {}, (params.row.predictFNumMonth || 0) + '/' + (params.row.predictNum || 0))
						},
					},
					{
						title: '当月资源分值 （已分/预计）',
						align: 'center',
						key: 'predictScoreRatioMonth',
						sortable: 'custom',
						render: (h, params) => {
							let self = this;
							return h('div', {}, (params.row.predictFScoreMonth || 0) + '/' + (params.row.predictScore || 0))
						},
					},
					{
						title: '首电回访效率',
						align: 'center',
						key: 'avgDelay',
						sortable: 'custom',
						render: (h, params) => {
							let self = this;
							return h('div', {}, (params.row.avgDelay || 0) + ' min')
						},
					}
				],
				tableData: [],
				data: [],
			}
		},
		computed: {
			...mapState(['userInfo']),
			isHeadcompany() {
				if(this.userInfo.companyType == 1 && this.userInfo.companyGrade == 2) {
					return false;
				} else {
					return true;
				}
			},
		},
		components: {
			caseBarFilter,
			vSearchOptions,
			name,
			vSelect
		},
		created() {
			let params = {
				types: '1,3',
				grades: '2'
			}
			sys.controlledList(params).then(valid.call(this)).then(res => {
				if(res.ok) {
					let arr = res.data.data.map((item) => {
						return {
							label: item.companyName,
							id: item.id
						};
					})
					//					let arr1 = [];
					//					if(!this.companyId.length) {
					//						arr.forEach((v, k) => {
					//							arr1.push({
					//								id: v.id
					//							});
					//						})
					//					}
					//					this.companyId = arr1;
					arr.unshift({
						label: '不限',
						id: ''
					});
					this.company.options = arr;
					this.getList();
				}
			}).catch(errors.call(this));
		},
		mounted() {
			//			this.$nextTick(() => {
			//				let _this = this;
			//				let table_box = this.$el.querySelector(".ivu-table-body");
			//				let table_tbody = this.$el.querySelector(".ivu-table-tbody");
			//				table_box.addEventListener('scroll', function() {
			//					if(Math.ceil(table_box.clientHeight + table_box.scrollTop) >= Math.ceil(table_tbody.offsetHeight)) {
			//						if(_this.data.length < _this.count) {
			//							_this.isloading = true;
			//							_this.pageNo += 1;
			//							_this.shiftData();
			//						}
			//					}
			//				}, false);
			//			})
		},
		methods: {
			getList() {
				this.isloading = true;
				let params = {
					"name": this.search,
					"objectType": "sales consultant",
					"searchTags": this.tags,
					"orderBy": this.sortType,
					"companyIds": this.companyId
				}
				crmAllocPlan.listUnsignedBySaler(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.data = res.data.data;
						//						this.tableData = (this.data.splice(0, 18));
						this.tableData = res.data.data
						this.isloading = false;
					}
				}).catch(errors.call(this));
			},
			//			shiftData() {
			//				this.tableData = this.tableData.concat(this.data.splice(0, 9));
			//			},
			//筛选标签变化
			tagListChange(tags) {
				this.tags = tags;
				this.pageNo = 1;
				this.getList();
			},
			sort(data) {
				if(data.order == 'normal') {
					this.sortType = '';
				} else {
					if(data.key == 'predictNumRatioDay') {
						this.sortType = '2';
					} else if(data.key == 'predictNumRatioMonth') {
						this.sortType = '3';
					} else if(data.key == 'predictScoreRatioMonth') {
						this.sortType = '4';
					} else if(data.key == 'avgDelay') {
						this.sortType = '5';
					}
					if(data.order == 'desc') {
						this.sortType = '-' + this.sortType;
					}
				}
				this.getList();
			},
			searchDropList(word) {
				return new Promise((resolve, reject) => {});
			},
			textChange(val) {
				this.$nextTick(() => {
					this.getList();
				})
			},
			companyChange(val) {
				let arr = [];
				val.childTags.forEach((v, k) => {
					arr.push({
						id: v.id
					});
				})
				//				if(!this.companyId.length) {
				//					this.company.options.forEach((v, k) => {
				//						arr.push({
				//							id: v.id
				//						});
				//					})
				//				}
				this.companyId = arr;
				this.getList();
			},
			affirmOk() {
				this.affirm = true;
				this.isload = true;
				this.affirmFormList.forEach((v, k) => {
					v.ifFall = this.moving;
					v.sallerName = this.user;
				})
				crmAllocResult.saveSaler(this.affirmFormList).then(valid.call(this)).then(res => {
					if(res.ok) {
						if(res.data.data) {
							let arr = [];
							let count = [];
							arr = res.data.data.split(',');
							arr.forEach((v, k) => {
								count.push(v.split(':')[1]);
							})
							this.hint2 = true;
							this.hint2User = count;
						} else {
							this.$Message.success(res.data.message);
							this.getList();
							this.$emit('updataRes');
							this.affirm = false;
						}
						this.table_audio = '';
						this.moving = "1";
						this.isload = false;
					} else {
						this.$refs.affirmBox.visible = true;
						this.affirm = true;
						this.isload = false;
					}
				}).catch(errors.call(this));
			},
			closeaffirmBox() {
				this.moving = "1";
				this.affirm = false;
				this.radioable = false;
				this.getList();
				this.table_audio = '';
			},
			//			offHint() {
			//				this.hint1 = false;
			//				this.affirm = false;
			//				this.$emit('updataRes');
			//				this.getList();
			//			},
			offHint2() {
				this.hint2 = false;
				this.affirm = false;
				this.$emit('updataRes');
				//				this.getList();
				//				this.table_audio='';
			},
			confirm() {
				this.hint2 = false;
				this.affirm = false;
				this.$emit('updataRes');
				this.getList();
				this.table_audio = '';
			},
			hiddModel2(val) {
				if(!val) {
					this.offHint2();
				}
			},
			hiddModel(val) {
				console.log(val)
				if(!val) {
					this.closeaffirmBox();
				}
			},
			fallChange(val) {}
		},
		watch: {
			tagSelects: {
				handler(val, oval) {
					this.tagSelected = val;
				},
				deep: true
			}
		}
	}
</script>