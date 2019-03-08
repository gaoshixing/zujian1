<style lang="less">
	.crm_filiale_table {
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
					td {
						height: 44px;
					}
				}
			}
		}
		.radio_group {
			width: 100%;
		}
	}
</style>

<template>
	<div class="crm_filiale_table">
		<div class="table_box">
			<p class="strip-tit">共找到 <span>{{data.length}}</span> 所分公司</p>
			<RadioGroup v-model="table_audio" class="radio_group">
				<Table :columns="columns" :data="data" :loading="isLoading" @on-sort-change="sort"></Table>
			</RadioGroup>
		</div>
		<Modal ref="affirmBox" v-model="affirm" width="480" class-name="crm_affirmModel plan_common_modal vertical-center-modal">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				分单确认
			</p>
			<div>
				<Form ref="affirmForm1" :label-width="96">
					<FormItem label="接单分公司：">
						<p>{{company}}</p>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="ghost" @click="closeaffirmBox">取消</Button>
				<Button type="primary" @click="affirmOk()" :loading="isload">提交</Button>
			</div>
		</Modal>
		<Modal v-model="hint2" width="418">
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
	import vSearchOptions from "../../../../spoc-sign-web/src/modules/vSearchOptions.vue";
	import name from "./name.vue";
	import { mapState } from 'vuex';
	import valid, {
		errors,
		crmAllocPlan,
		crmAllocResult,
		common,
	} from "../../libs/request.js";
	export default {
		props: {
			formArr: {
				type: Array,
				default: () => {
					return [];
				}
			}
		},
		data() {
			return {
				hint2:false,
				hint2User:'',
				affirm: false,
				formList: this.formArr,
				affirmFormList: [],
				company: '',
				table_audio: '',
				tags: [],
				isload:false,
				sortType: '',
				columns: [{
						title: ' ',
						width: 36,
						align: 'center',
						render: (h, params) => {
							let self = this;
							return h("Radio", {
								props: {
									label: params.row.id
								},
								nativeOn: {
									'change': () => {
										self.company = params.row.objectName.split(' ')[0];
										self.affirmFormList=[];
										if(self.formArr.length) {
											self.formArr.forEach((v, k) => {
												const a = {
													"cusId": v.id,
													"score": v.score,
													"startDate": new Date(v.startDate).format('yyyy-MM-dd hh:mm:ss'),
													"mode": self.isHeadcompany?"headquarter":"office",
													"officeId":params.row.objectId,
													"ifFall": "",
												}
												self.affirmFormList.push(a);
											})
										}
										self.affirm = true;
									}
								}
							}, '')
						}
					},
					{
						title: '分公司',
						align: 'center',
						key: 'objectName',
						render: (h, params) => {
							let self = this;
							return h('div', {}, params.row.objectName.split(' ')[0])
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
//					{
//						title: '首电回 访效率',
//						align: 'center',
//						key: 'avgDelay',
//						sortable: 'custom',
//						render: (h, params) => {
//							let self = this;
//							return h('div', {}, (params.row.avgDelay || 0) + ' min')
//						},
//					}
				],
				data: [],
				isLoading:false,
				firm: []
			}
		},
		components: {
			caseBarFilter,
			vSearchOptions,
			name
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
		created() {
			this.getList();
		},
		methods: {
			getList() {
				this.isLoading=true;
				let params = {
					"name": '',
					"objectType": "office",
					"orderBy": this.sortType
				}
				crmAllocPlan.listUnsignedByCompany(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.data = res.data.data;
						this.isLoading=false;
					}
				}).catch(errors.call(this));
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
					if(data.order=='desc'){
						this.sortType='-'+this.sortType;
					}
				}
				this.getList();
			},
			closeaffirmBox() {
				this.affirm = false;
			},
			affirmOk() {
				this.affirm = true;
				this.isload=true;
				crmAllocResult.saveCompany(this.affirmFormList).then(valid.call(this)).then(res => {
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
							this.getList();
							this.$emit('updataRes');
							this.affirm = false;
						}
						this.table_audio = '';
						this.isload=false;
					} else {
						this.$refs.affirmBox.visible = true;
						this.affirm = true;
						this.isload=false;
					}
				}).catch(errors.call(this));
			},
			offHint2() {
				this.hint2 = false;
				this.affirm = false;
				this.$emit('updataRes');
				this.table_audio = '';
				this.getList();
			},
			confirm() {
				this.hint2 = false;
				this.affirm = false;
				this.$emit('updataRes');
				this.getList();
				this.table_audio = '';
			},
		}
	}
</script>