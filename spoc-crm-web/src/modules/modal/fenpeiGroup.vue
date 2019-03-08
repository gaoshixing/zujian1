<style lang="less">
	.model-component {
		.main_box {
			.ivu-form-item-label {
				color: #999;
			}
			.ivu-form-item{
				margin-bottom: 0;
			}
			.user-list {
				display: flex;
				flex-wrap: wrap;
				margin: 0;
				.uitem {
					flex: 0 0 14.285714285714286%;
					width: 14.285714285714286%;
					overflow: hidden;
					margin-right: 0;
				}
			}
		}
	}
</style>

<template>
	<Modal v-model="fenpeiGroup" title="分配客户" @on-ok="fenpeiOK" width='728' :loading="loading" @on-cancel="fenpeiCancel" class="model-component">
		<v-select style="width: 396px;margin-bottom: 15px;" placeholder="人员搜索" :datafunc="datafunc" value='value' icon="search" v-model="fenpeiText" k='cnname' @on-enter="doSearchFenpei" @on-click="doSearchFenpei" @selected="doSearchFenpei">
		</v-select>
		<v-search-options :data="company.options" byKey="label" :searchTitle="company.tit" @on-select-item="fenpeiCompanyChange" labelWidth="98" v-if="company.options.length" multiple style="margin-top: 10px;">
		</v-search-options>
		<div class="main_box">
			<Form ref="affirmForm1" :label-width="100">
				<FormItem label="销售顾问：">
					<RadioGroup v-model="fenpeiId" class="user-list" @on-change="changeFpfu">
						<Radio class="uitem" v-for="item in fenpeiLists" :key="item.id" :label="item.id">{{ item.objectName }}</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="最晚接单时长：">
					<p v-text="radioable? '不限':time+'分钟'"></p>
				</FormItem>
				<FormItem label="是否参与流转：">
					<RadioGroup v-model="moving" @on-change="fallChange">
						<Radio label="1" :disabled="radioable">是</Radio>
						<Radio label="0" :disabled="radioable">否</Radio>
					</RadioGroup>
				</FormItem>
			</Form>
		</div>
	</Modal>
</template>

<script>
	import vSelect from '@public/modules/vSelect';
	import vSearchOptions from "@public/modules/vSearchOptions.vue";
	import valid, {
		errors,
		crmCustomer,
		crmAllocPlan,
		crmCustomerImport,
		sys
	} from '../../libs/request.js';

	export default {
		props: {
			datas: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				office: '',
				radioable: false,
				saleObjectId: '',
				time: '0',
				moving: '1',
				fenpeiGroup: false,
				fenpeiId: '',
				fenpeiName: '',
				fenpeiLists: [],
				fenpeiText: '',
				fenpeiUid: [],
				loading: true,
				company: {
					options: [],
					tit: '分公司'
				},
				lists: [],
				companyId: []
			};
		},
		components: {
			vSelect,
			vSearchOptions
		},
		methods: {
			fenpeiOK() {
				if(!this.fenpeiId) {
					this.$Message.error('请选择转让人');
					this.loading = false;
					setTimeout(() => {
						this.loading = true;
					}, 0);
					return false;
				}
				let data = [];
				this.fenpeiUid.forEach(item => {
					data.push({
						ownerId: this.saleObjectId,
						saleName: this.fenpeiName,
						cusId: item
					})
				});
				let params = {
					crmCustomerSaleList: data,
					ifFall: this.moving,
					fallDuration: this.time
				}
				crmCustomerImport.allocCustomer(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						// 转让成功，刷新列表
						this.$Message.success('分配成功');
						this.fenpeiCancel();
						this.$emit('getLists');
					} else {
						this.loading = false;
						setTimeout(() => {
							this.loading = true;
						}, 0);
					}
				}).catch(errors.call(this));
			},
			fenpeiCancel() {
				this.fenpeiId = '';
				this.fenpeiName = '';
				this.fenpeiGroup = false;
				this.moving = '1';
				this.radioable = false;
				this.time = 0;
			},
			datafunc() {
				return new Promise((resolve, reject) => {});
			},
			doSearchFenpei() {
				this.getTransUserList(this.fenpeiText);
			},
			fenpeiCompanyChange(val) {
				let arr = [];
				val.childTags.forEach((v, k) => {
					arr.push({
						id: v.id
					});
				})
				this.companyId = arr;
				this.getTransUserList();
			},
			changeFpfu(id) {
				let data = this.fenpeiLists.filter(function(item) {
					return item.id == id;
				});
				if(data.length > 0) {
					this.fenpeiName = data[0].objectName;
					this.saleObjectId = data[0].objectId
				}
				let params1 = {
					id: id,
					objectType: 'sales consultant'
				}
				crmAllocPlan.formFd(params1).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.time = res.data.data.fallDuration;
						console.log(this.datas)
						if(this.datas.length > 1) {
							console.log(1)
							this.moving = '0';
							this.radioable = true;
						} else {
							this.moving = this.datas[0].isFall;
							console.log(2)
							if(this.moving == '1') {
								this.moving = res.data.data.ifFall;
								if(this.moving == '1') {
									this.radioable = false;
								} else {
									this.radioable = true;
								}
							} else {
								this.radioable = true;
							}
						}
					}
				}).catch(errors.call(this));
			},
			getTransUserList(name) {
				this.fenpeiLists = [];
				const pageSize = -1;
				// const cusId = this.fenpeiUid.join(',');
				//				const flag = '2';
				//				const companyIds = this.companyId.join(',');
				let params = {
					"name": this.fenpeiText,
					"objectType": "sales consultant",
					"companyIds": this.companyId,
					"pageSize": pageSize
				}
				crmAllocPlan.listUnsignedBySaler(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.fenpeiLists = res.data.data;
						//						this.fenpeiId=this.fenpeiLists[0].id;
					}
				}).catch(errors.call(this));
				//				crmCustomer.ownerUserList({
				//					pageSize,
				//					name,
				//					flag,
				//					companyIds
				//				}).then(valid.call(this)).then(res => {
				//					if(res.ok) {
				//						this.fenpeiLists = res.data.data.list;
				//					}
				//				}).catch(errors.call(this));
			},
			showFenpei(list) {
				// 打开分配客户弹窗
				this.lists = list;
				this.fenpeiGroup = true;
				this.showTrans();
				this.fenpeiUid = [];
				if(this.lists.length > 0) {
					this.lists.forEach(item => {
						this.fenpeiUid.push(item.id);
					});
				}
				this.getTransUserList();
			},
			showTrans() {
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
						arr.unshift({
							label: '不限',
							id: ''
						});
						this.company.options = arr;
					}
				}).catch(errors.call(this));
			},
			fallChange() {

			}
		},
	}
</script>