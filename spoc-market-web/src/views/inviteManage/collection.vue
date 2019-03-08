<style lang="less">
	.collection {
		border-top: 1px #e0e0e0 solid;
		.formTitle {
			padding: 10px 0;
			font-size: 14px;
			.ivu-form-item {
				margin-bottom: 0;
				.ivu-form-item-label {
					color: #999999;
				}
			}
		}
		.cancleBorder {
		}
		.page {
			margin-top: 20px;
			margin-bottom: 140px;
			text-align: center;
		}
		.myTable{
			position: relative;
			.buttons{
				position: absolute;
				top: 0;
				right:20px;
			}
		}
	}
	
	.colle_meetModel {
		.meetBody {
			height: 50vh;
			overflow-y: auto;
			.warn {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				color: orange;
				font-size: 14px;
				.icon-tishi {
					font-size: 24px;
					line-height: 2;
					margin-right: 10px;
				}
			}
		}
	}
</style>

<template>
	<div class="collection">
		<div class="title">
			<Form :label-width="147" class="formTitle">
				<FormItem label="编号">
					<div>{{$route.query.code||$route.query.packCode}}</div>
				</FormItem>
				<FormItem label="商品名称">
					<div>{{$route.query.title||$route.query.packName}}</div>
				</FormItem>
			</Form>
		</div>
	<!-- 	<btnlist title="订单列表" :btnList="btninfo">
		</btnlist> -->
		<div class="myTable">
			<Tabs v-model="myTab">
				<TabPane label="未上报" name="name1"></TabPane>
				<TabPane label="已上报" name="name2"></TabPane>
			</Tabs>
			<div class="buttons">
				<Button  :disabled="myTab != 'name1'"  style="margin-right:20px;" type="primary" @click="reportCrm">上报到CRM</Button>
				<Button   type="primary" @click="derive">导出全部数据</Button>
			</div>
		</div>
		<div v-show="myTab == 'name1'">
			<div class="cancleBorder">
				<Table :columns="columns1" @on-selection-change="selectionChange" :data="tableList1" class="common-table" :loading="loading1"></Table>
			</div>
			<div class="page">
				<Page show-elevator show-total show-sizer @on-page-size-change="PageSizeChange1" :current="pageNo1" :total="count1" @on-change="PageChange1" v-if="count1>10"></Page>
			</div>
		</div>
		<div v-show="myTab == 'name2'">
			<div class="cancleBorder">
				<Table :columns="columns" :data="tableList" class="common-table" :loading="loading"></Table>
			</div>
			<div class="page">
				<Page show-elevator show-total show-sizer @on-page-size-change="PageSizeChange" :current="pageNo" :total="count" @on-change="PageChange" v-if="count>10"></Page>
			</div>
		</div>
		<Modal v-model="meetModel" width="730" class-name="colle_meetModel vertical-center-modal" @on-visible-change="meetModelChange">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				表单数据
			</p>
			<div class="meetBody" v-if="xFormId">
				<xformview :uid="meetFormId" :fid="xFormId" />
			</div>
		</Modal>
	</div>
</template>

<script>
	import vSelect from '@public/modules/vSelect';
	import btnlist from '@public/modules/btnlist';
	import xformview from '../xform/xformview';
	import { mapState, mapGetters, mapMutations } from 'vuex';
	import valid, {
		errors,
		common,
		sys,
		comFormTable,
		groupB,
		wpInvitingPage,
		wpGoods,
		wpCrmCustomer
	} from "../../libs/request";
	import {crmCustomer} from "../../../../spoc-crm-web/src/libs/crmCustomer.js"
	export default {
		data() {
			return {
				selection:[],
				myTab: 'name1',
				loading: true,
				loading1: true,
				count: 20,
				count1: 20,
				isGroup: this.$route.query.isGroup || false,
				isGoods: this.$route.query.isGoods || false,
				pageNo: 1,
				pageSize: 10,
				pageNo1: 1,
				pageSize1: 10,
				meetModel: false,
				xFormId: '',
				meetFormId: '',
				btninfo: [
					//				{
					//						text: '导出到CRM',
					//						event: this.deriveCRM,
					//					},
					{
						text: '导出',
						event: this.derive,
					},
				],
				columns1: [
					{
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
					{
						title: "表单收集ID",
						key: "id",
						align: "center",
					},
					/* {
						title: "订单号",
						key: "id",
						align: "center",
					}, */
					{
						title: "提交时间",
						key: "createDate",
						align: "center"
					},
					{
						title: "姓名",
						key: "name",
						align: "center"
					},
					{
						title: "手机号",
						key: "phone",
						align: "center"
					},
					{
						title: "操作",
						key: "predictNum",
						align: "center",
						render: (h, params) => {
							return h('div', {
								style: {
									width: "124px",
									display: "flex",
									margin: "auto",
									"justify-content": "center",
									"align-items": "center",
								}
							}, [
								h(
									"a", {
										style: {

										},
										on: {
											click: () => {
												this.xFormId = params.row.formId;
												this.meetFormId = params.row.id;
												this.meetModel = true;
											}
										}
									},
									"预览"
								),
							])
						}
					},
				],
				columns: [
					{
						title: "表单收集ID",
						key: "id",
						align: "center",
					},
				/* 	{
						title: "订单号",
						key: "id",
						align: "center",
					}, */
					{
						title: "提交时间",
						key: "createDate",
						align: "center"
					},
					{
						title: "姓名",
						key: "name",
						align: "center"
					},
					{
						title: "手机号",
						key: "phone",
						align: "center"
					},
					{
						title: "上报时间",
						key: "reportDate",
						align: "center"
					},
					{
						title: "操作",
						key: "predictNum",
						align: "center",
						render: (h, params) => {
							return h('div', {
								style: {
									width: "124px",
									display: "flex",
									margin: "auto",
									"justify-content": "center",
									"align-items": "center",
								}
							}, [
								h(
									"a", {
										style: {

										},
										on: {
											click: () => {
												this.xFormId = params.row.formId;
												this.meetFormId = params.row.id;
												this.meetModel = true;
											}
										}
									},
									"预览"
								),
							])
						}
					},
				],
				tableList: [],
				tableList1: [],
				formId: ''
			}
		},
		components: {
			vSelect,
			btnlist,
			xformview
		},
		created() {
			if (this.isGroup) {
				this.geDetail()
				return
			} 
			if (this.isGoods){
				this.getGoodsDetail()
				return
			} 
			this.getFormList();
		},
		methods: {
			...mapMutations(["updateLoadingStatus"]),
			selectionChange(val){
				let q = []
				val.forEach(item => {
					q.push({
						name: item.name,
						phone: item.phone,
						companyId: item.companyId,
						dataId: item.dataId,
					})
				});
				this.selection = q
			},
			getFormList() {
				this.updateLoadingStatus({
					isLoading: true
				});
				let params = {
					id: this.$route.query.id
				}
				wpInvitingPage.form(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.tableListD(res.data.data.formId)
					}
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
			},

			tableListDchild1(){
				this.loading1 = true
				let params = {
					itemId: this.$route.query.id,
					formId: this.formId,
					pageNo: this.pageNo1,
					pageSize: this.pageSize1,
					isReport:0 //1已上报   0未上报
				}
				wpCrmCustomer.listPageRel(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						let q = res.data.data.list
						q.forEach(item=>{
							if(!item.name || !item.phone){
								item._disabled = true
							}
						})
						this.count1 = res.data.data.count;
						this.tableList1 = q;
						this.pageNo1 = res.data.data.pageNo;
						this.pageSize1 = res.data.data.pageSize;
					}
				}).catch(errors.call(this)).finally(() => {
					this.loading1 = false
					this.updateLoadingStatus({
						isLoading: false
					});
				});
			},
			tableListDchild(){
				this.loading = true
				let params = {
					itemId: this.$route.query.id,
					formId: this.formId,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					isReport:1 //1已上报   0未上报
				}
				wpCrmCustomer.listPageRel(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.count = res.data.data.count;
						this.tableList = res.data.data.list;
						this.pageNo = res.data.data.pageNo;
						this.pageSize = res.data.data.pageSize;
					}
				}).catch(errors.call(this)).finally(() => {
					this.loading = false
					this.updateLoadingStatus({
						isLoading: false
					});
				});
			},
			tableListD(formId) {
				this.formId = formId;
				if(this.formId) {
					this.tableListDchild1()
					this.tableListDchild()
				} else {
					this.$Message.warning({
						content: '"该邀请页面没有动态表单，请选择其他邀请页面"',
						duration: 10,
						closable: true
					})
				}
			},

			geDetail() {
				let obj = {
					id: this.$route.query.id
				}
				this.updateLoadingStatus({
					isLoading: true
				});
				groupB.getDetail(obj).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.tableListD(res.data.data.goodsList[0].formIds[0])
					}
				}).catch(errors.call(this))
			},
			
			getGoodsDetail() {
				let obj = {
					id: this.$route.query.id
				}
				this.updateLoadingStatus({
					isLoading: true
				});
				wpGoods.form(obj).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.tableListD(res.data.data.formIds[0])
					}
				}).catch(errors.call(this))
			},

			PageChange(val) {
				this.pageNo = val;
				this.tableListDchild();
			},
			PageSizeChange(val) {
				this.pageSize = val;
				this.tableListDchild();
			},
			PageChange1(val) {
				this.selection = []
				this.pageNo1 = val;
				this.tableListDchild1();
			},
			PageSizeChange1(val) {
				this.selection = []
				this.pageSize1 = val;
				this.tableListDchild1();
			},
			deriveCRM() {

			},
			reportCrm(){
				if(!this.selection.length){
					this.$Message.error('请选择上报数据')
				} else {
					crmCustomer.batchSaveFormData(this.selection).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.tableListDchild();
							this.tableListDchild1();
							if(res.data.data.failureNum > 0){
								this.$Modal.info({
									title: '提示',
									content: res.data.data.failureMsg
								});
							} else {
								this.$Message.info( res.data.message)
							}
						}
					}).catch(errors.call(this))
				}
			},
			derive() {
				if (!this.tableList.length) {
					this.$Message.error('暂无导出数据')
					return
				}
				let params1 = {
					itemId: this.$route.query.id,
					formId: this.formId
				}
				window.open(comFormTable.exportFormData(params1));
			},
			meetModelChange(val) {
				if(!val) {
					this.xFormId = ''
					this.meetFormId = ''
				}
			}
		}
	}
</script>