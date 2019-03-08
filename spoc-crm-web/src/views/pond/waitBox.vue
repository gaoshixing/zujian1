<style lang="less">
	.crm_wait_table {
		.wait_box {
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
	<div class="crm_wait_table">
		<v-select style="width: 396px;margin: 15px 18px 0;" placeholder="请输入客户姓名/编号" icon="search" v-model="search" k='cnname' :datafunc="searchDropList" @on-enter="textChange" @on-click="textChange" @selected="textChange">
		</v-select>
		<div class="wait_box">
			<case-bar-filter :from="3" menuId="801" title="标签：" :width="70" :mgt="7" @tagListChange="tagListChange" align="right" class="caseBar" tit-color="#999">
			</case-bar-filter>
			<v-search-options :data="source.options" byKey="label" :searchTitle="source.tit" @on-select-item="sourceChange" labelWidth="80" v-if="source.options.length" style="margin-top: 10px;"></v-search-options>
		</div>
		<div class="table_box">
			<p class="strip-tit">共找到 <span v-text="count"></span> 条资源，已选中 <span v-text="checkedLength"></span> 条</p>
			<CheckboxGroup v-model="table_audio" class="radio_group">
				<Table height="720" :loading="isloading" :columns="columns" :data="data" @on-sort-change="sort" @on-selection-change=""></Table>
			</CheckboxGroup>
		</div>
	</div>
</template>

<script>
	import caseBarFilter from "@public/modules/caseBarFilter.vue";
	import vSearchOptions from "@public/modules/vSearchOptions.vue";
	import name from "./name.vue";
	import vSelect from '@public/modules/vSelect';
	import valid, {
		errors,
		sys,
		common,
		crmCustomer
	} from "../../libs/request.js";
	export default {
		data() {
			return {
				pageNo: 1,
				isloading: false,
				count: 0,
				table_audio: [],
				formArr: [],
				checkedLength: 0,
				tableSelected: [],
				search: '',
				tags: [],
				pageNo1: 1,
				sortType: '',
				addType: '',
				single:false,
				source: {
					options: [],
					tit: '添加方式'
				},
				companyId: '',
				//				dataLength:0,
				//				showLength:18,
				columns: [{
						title: ' ',
						width: 36,
						align: 'center',
						renderHeader: (h, params) => {
							let self = this;
							return h("Checkbox", {
								props: {
									'value':self.single
								},
								nativeOn: {
									'change': (b) => {
										if(self.table_audio.length-1<this.data.length){
											this.table_audio=[];
											this.data.forEach((val, ky) => {
												self.table_audio.push(val.id);
											})
											this.single=true;
											self.tableChecked(params.row);
										}else{
											this.table_audio=[];
											this.single=false;
											self.tableChecked(params.row);
										}
									}
								}
							}, '')
						},
						render: (h, params) => {
							let self = this;
							return h("Checkbox", {
								props: {
									label: params.row.id,
								},
								nativeOn: {
									'change': () => {
										console.log(params.row);
										self.tableChecked(params.row);
									}
								}
							}, '')
						}
					},
					{
						title: '客户编号',
						width: 100,
						//						align: 'center',
						key: 'cusCode',
						render: (h, params) => {
							let self = this;
							return h(name, {
								props: {
									oData: params.row,
									hint: 'isResource',
									src: 'detail',
									form:'pond',
									showKey: 'cusCode',
									isTagShow: true
								},
							}, '')
						}
					},
					{
						title: '客户姓名',
						//						align: 'center',
						key: 'name',
						render: (h, params) => {
							let self = this;
							return h(name, {
								props: {
									oData: params.row,
									hint: 'isResource',
									src: 'detail',
									form:'pond',
									showKey: 'name'
								},
							}, '')
						}
					},
					{
						title: '分值',
						align: 'center',
						key: 'score',
						sortable: 'custom'
					},
					{
						title: '关键词',
						align: 'center',
						key: 'keyword'
					},
					{
						title: '客户地区',
						align: 'center',
						key: 'provinceName'
					},
					{
						title: '归属分公司',
						align: 'center',
						key: 'companyName',
						filters: [],
						filterMultiple: false,
						filterRemote: (value, key) => {
							this.companyId = value[0];
							this.$emit('synCompany', this.companyId || '');
							this.getList();
						}
					},
					{
						title: '申请国家',
						align: 'center',
						key: 'applyCountry'
					},
				],
				//				tableData:[],
				data: [],
			}
		},
		components: {
			caseBarFilter,
			vSearchOptions,
			name,
			vSelect
		},
		created() {
			let params = {
				type: 'crm_customer_type',
			}
			sys.dictListData(params).then(valid.call(this)).then(res => {
				if(res.ok) {
					let arr = res.data.data.map((item) => {
						return {
							label: item.label,
							id: item.value
						};
					})
					arr.unshift({
						label: '不限',
						id: ''
					});
					this.source.options = arr;
				}
			}).catch(errors.call(this));
			let params1 = {
				type: '1',
			}
			sys.officeListName(params1).then(valid.call(this)).then(res => {
				if(res.ok) {
					let arr = res.data.data.allOffice.map((item) => {
						return {
							label: item.name,
							value: item.id
						};
					})
					this.columns[6].filters = arr;
				}
			}).catch(errors.call(this));
			this.getList();
		},
		mounted() {
			this.$nextTick(() => {
				let _this = this;
				let table_box = this.$el.querySelector(".ivu-table-body");
				let table_tbody = this.$el.querySelector(".ivu-table-tbody");
				table_box.addEventListener('scroll', function() {
					if(Math.ceil(table_box.clientHeight + table_box.scrollTop) >= Math.ceil(table_tbody.offsetHeight)) {
						if(_this.data.length < _this.count) {
							_this.isloading = true;
							_this.pageNo += 1;
							_this.shiftData();
						}
					}
				}, false);
			})
		},
		methods: {
			getList() {
				this.isloading = true;
				this.formArr = [];
				this.tableSelected = [];
				this.$emit('formArrChange', this.formArr);
				let params1 = {
					"nameOrNo": this.search,
					"type": this.addType,
					"companyId": this.companyId,
					"searchTags": this.tags,
					"orderBy": this.sortType,
					"pageize": 10,
					"pageNo": 1
				}

				//				let regPos = /^\d+(\.\d+)?$/; //非负浮点数
				//				let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
				//				if(regPos.test(this.search) || regNeg.test(this.search)) {
				//					params1.cusId = this.search;
				//				} else {
				//					params1.name = this.search;
				//				}
				params1.companyId = this.companyId;
				params1.orderBy = this.sortType;
				crmCustomer.listUnsignedPage(params1).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.count = res.data.data.count;
						this.data = res.data.data.list;
						this.checkedLength = 0;
						this.isloading = false;
						//						this.dataLength=this.data.length;
						//						this.tableData=this.data.splice(0,18);
					}
				}).catch(errors.call(this));
			},
			shiftData() {
				let params1 = {
					"nameOrNo": this.search,
					"type": this.addType,
					"companyId": this.companyId,
					"searchTags": this.tags,
					"orderBy": this.sortType,
					"pageize": 10,
					"pageNo": this.pageNo
				}
				params1.companyId = this.companyId;
				params1.orderBy = this.sortType;
				crmCustomer.listUnsignedPage(params1).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.count = res.data.data.count;
						this.data = this.data.concat(res.data.data.list);
						this.isloading = false;
						//						this.dataLength=this.data.length;
						//						this.tableData=this.data.splice(0,18);
					}
				}).catch(errors.call(this));
				//				this.$set(this,"tableData",this.tableData.concat(this.data.splice(0,9)));
				//				this.data.splice(0,9).forEach((v,k)=>{
				//					this.tableData.push(v);
				//				})
			},
			//筛选标签变化
			tagListChange(tags) {
				this.tags = tags;
				this.getList();
				this.setShareTag();
			},
			setShareTag() {
				let arr = [];
				this.tags.forEach((v, k) => {
					v.childTags.forEach((val, key) => {
						if(val.isDirect == 1) {
							arr.push(val);
						}
					})
				})
				arr = arr.concat(this.tableSelected);
				let arr1 = [];
				let arr2 = [];
				arr.forEach((v, k) => {
					if(arr1.indexOf(v.id) == -1) {
						arr1.push(v.id);
						arr2.push(v);
					}
				})
				this.$emit('tagChange', arr2, this.formArr);
			},
			sourceChange(val) {
				this.addType = val;
				this.getList();
			},
			sort(data) {
				if(data.order == 'normal') {
					this.sortType = '';
				} else {
					this.sortType = 'score ' + data.order;
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
			tableChecked(v) {
				let arr = [];
				let arr1 = [];
				this.table_audio.forEach((v, k) => {
					this.data.forEach((val, ky) => {
						if(v == val.id) {
							val.comTags.forEach((value, key) => {
								if(value.isDirect == 1) {
									arr1.push(val);
								}
							})
							arr.push({
								cusId: val.cusId,
								score: val.score,
								startDate: new Date(val.startDate),
								cusName: val.name,
								id: val.id,
								isFall: val.isFall
							});
						}
					})
				})
				this.formArr = arr;
				this.tableSelected = arr1;
				this.checkedLength = this.formArr.length;
				this.setShareTag();
			},
			rowClick(val) {
				//				this.$router.push({name:'crm.entry',query:{cusid:val.id,noEdit:true}})
			},
			jump(val) {
				const {
					href
				} = this.$router.resolve({
					name: 'crm.entry',
					query: {
						cusid: val,
						noEdit: false,
						source: true
					}
				})
				window.open(href, '_blank');
			},
		}
	}
</script>