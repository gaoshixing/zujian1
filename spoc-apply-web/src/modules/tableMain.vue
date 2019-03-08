<style lang="less">
	.contentTableMain {
		margin-top: 15px;
		min-height: 300px;
		.ivu-table-wrapper {
			border: none;
		}
		.ivu-table th {
			background: #fff;
		}
		.ivu-table:after {
			display: none;
		}
		.stuNum {
			span {
				color: #73cdc9;
				font-size: 16px;
			}
		}
		.page {
			margin-top: 15px;
			text-align: center;
			margin-bottom: 140px;
		}
		 /*滚动条样式*/
        .ivu-table-body::-webkit-scrollbar {/*滚动条整体样式*/
            width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 8px;
			text-align: center;
			margin-bottom: 140px;
		}
		 /*滚动条样式*/
        .ivu-table-body::-webkit-scrollbar {/*滚动条整体样式*/
            width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 8px;
        }
        .ivu-table-body::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: rgba(0,0,0,0.2);
        }
        .ivu-table-body::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 0;
            background: rgba(0,0,0,0.1);
        }
        .ivu-table-tip::-webkit-scrollbar {/*滚动条整体样式*/
            width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 8px;
        }
        .ivu-table-tip::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: rgba(0,0,0,0.2);
        }
        .ivu-table-tip::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 0;
            background: rgba(0,0,0,0.1);
		}
		
		.ivu-table-expanded-cell{
			padding: 10px;
			background-color: #fff;
			.ivu-table:after {
				display: none;
			}
			.ivu-table:before{
				height: 0;
			}
			.ivu-table-cell {
				border: none
			}
			.ivu-table-header th {
				border: none
			}
			.ivu-table-tbody td {
				border: none
			}
			.ivu-table-header thead th{
				background-color: #fff;
			}
		}
		.ivu-table-header thead th{
			background-color: #f8f8f9;
		}
	}
	.ivu-table-filter-list-single{
		max-height: 200px;
	}
</style>
<template>
	<div class="contentTableMain">
		<div class="stuNum">学生人数：<span>{{studentCounts}}</span></div>
		<div class="cle"></div>
		<Table :data="tableData" :columns="tableColumns" @on-filter-change="filterChange">
		</Table>

		<Modal v-model="modal1" width=728 title="查看">
			<div>
				<Form :label-width="180">
					<Form-item label="交接表：" v-if="historyArray.length">
						<div style="overflow:hidden" v-for="(item,index) in historyArray" :key="item.id">
							<div style="float:left;width:90px;">{{item.name}}</div>
							<div style="float:left;width:100px;">
								<a @click="toViewConnect(item.id)" style="margin-left: 10px;" href="javascript:void(0);">查看交接详情</a>
							</div>
						</div>
					</Form-item>
					<div v-for="(item, index) in resultArray" :key="item.phase">
						<Form-item v-if="item.phase == menuIds.PLAN" label="规划交接后期时间：">
							<DatePicker disabled readonly type="datetime" :value="item.handoverTimePlan" style="width: 180px"></DatePicker>
						</Form-item>
						<Form-item v-if="item.phase == menuIds.CHOICESCHOOL" label="选校完成时间：">
							<DatePicker disabled readonly type="datetime" :value="item.handoverTimePlan" style="width: 180px"></DatePicker>
						</Form-item>
					</div>
					<Form-item label="结案时间：">
						<DatePicker disabled readonly type="datetime" :value="planEndTime" style="width: 180px"></DatePicker>
					</Form-item>
					<Form-item label="分配申请顾问：">
						<div>{{teaName}}</div>
					</Form-item>
					<Form-item label="备注：">
						<div style="width: 380px;word-wrap: break-word;">{{connect.remark}}</div>
					</Form-item>
				</Form>
			</div>
			<div slot="footer">
				<Button type="primary" @click="ok(1)">确定</Button>
			</div>
		</Modal>

		<Modal v-model="modal2" :loading="modalLoading" width=728 title="分配" @on-ok="ok(2)" @on-cancel="cancel(2)">
			<div>
				<Form ref="basicStepForm" :rules="basicFormValidate" :model="connect" :label-width="180">
					<Form-item label="交接表：" v-if="historyArray.length">
						<div style="overflow:hidden" v-for="(item,index) in historyArray" :key="item.id">
							<div style="float:left;width:90px;">{{item.name}}</div>
							<div style="float:left;width:100px;">
								<a @click="toViewConnect(item.id)" style="margin-left: 10px;" href="javascript:void(0);">查看交接详情</a>
							</div>
						</div>
					</Form-item>
					<div v-for="(item, index) in resultArray" :key="item.phase">
						<Form-item v-if="item.phase == menuIds.PLAN" label="规划交接后期时间：">
							<DatePicker disabled readonly type="datetime" :value="item.handoverTimePlan" style="width: 180px"></DatePicker>
						</Form-item>
						<Form-item v-if="item.phase == menuIds.CHOICESCHOOL" label="选校完成时间：">
							<DatePicker disabled readonly type="datetime" :value="item.handoverTimePlan" style="width: 180px"></DatePicker>
						</Form-item>
					</div>
					<Form-item label="结案时间：">
						<DatePicker disabled readonly type="datetime" :value="planEndTime" style="width: 180px"></DatePicker>
					</Form-item>
					<Form-item label="分配申请顾问：" prop="chooseTeacher">
						<RadioGroup v-model="connect.chooseTeacher">
							<!--    <Radio v-if="item.activeUser" v-for="(item,index) in teacherArray" :label="item.userId" :key="item.userId">{{item.name}}</Radio> -->
							<Radio  v-for="(item,index) in teacherArray" :label="item.userId" :key="item.userId + '_' + index">{{item.name}}</Radio>
						</RadioGroup>
					</Form-item>
					<Form-item label="备注：">
						<Input v-model="connect.remark" type="textarea" :rows="4" style="width:380px;" placeholder="请输入" />
					</Form-item>
				</Form>
			</div>
		</Modal>

		<Modal v-model="modal3" width=400 title="接案确认" ok-text="确认" @on-ok="ok(3)" @on-cancel="cancel()">
			<div>
				<p style="text-indent:2em;line-height:30px;">您的主管给您分配了一位新学生<span style="color:#44bcb7;padding:0 5px">{{studentName}}</span>，请尽快处理。</p>
			</div>
		</Modal>
		<Modal v-model="modal5" width=400 title="接案驳回" ok-text="确认" @on-ok="ok(5)" @on-cancel="cancel()">
			<div>
				<p style="text-indent:2em;line-height:30px;">确定驳回学生<span style="color:#44bcb7;padding:0 5px">{{studentName}}</span></p>
				<Input v-model="reason" type="textarea" placeholder="请输入驳回理由"></Input>
			</div>
		</Modal>
		<Modal v-model="modal6" :loading="modal6Loading" width=500 title="接案驳回" ok-text="确认" @on-ok="ok(6)" @on-cancel="cancel()">
			<!-- 我的学生 -->
			<div>
				<p style="text-indent:2em;line-height:30px;">确定驳回学生<span style="color:#44bcb7;padding:0 5px">{{studentName}}</span></p>
				<Form ref="basicStepForm6" :rules="basicFormValidate6" :model="saveReject" :label-width="107">
					<Form-item label="驳回理由"  prop="reason">
						<Input v-model="saveReject.reason" type="textarea" :rows="4" style="width:280px;"  placeholder="请输入驳回理由"></Input>
					</Form-item>
				</Form>
			</div>
		</Modal>
		<Modal v-model="modal7"  width=500 title="查看驳回">
			<div>
				<Form :model="saveReject" :label-width="107">
					<Form-item label="驳回人">
						<Input v-model="saveReject.jaReasonUser"  :readonly="true" style="width:280px;"></Input>
					</Form-item>
					<Form-item label="驳回理由">
						<Input v-model="saveReject.reason"  :readonly="true" type="textarea" :rows="4" style="width:280px;"  placeholder="请输入驳回理由"></Input>
					</Form-item>
					<Form-item label="驳回时间">
						<Input v-model="saveReject.jaReasonTime"  :readonly="true" style="width:280px;"></Input>
					</Form-item>
				</Form>
			</div>
			<div slot="footer">
				<Button type="primary" @click="ok(7)">确定</Button>
			</div>
		</Modal>
		<create-exam-info  ref="createExamInfoRef" :studentType="studentType" :groupId="planId" :studentName="studentName"></create-exam-info>
	</div>
</template>
<script>
	import expandRow from './tableExpand';
	import createExamInfo from './createExamInfo';
	import {MENUIDS} from "@public/libs/config.js";
	import { mapState, mapGetters } from 'vuex'
	import valid, {
		errors,
		common,
		sys, aplSafebox
	} from "../libs/request";

	export default {
		props: {
			pId: {
				required: true
			},
			tableData: { //表格绑定的数据
				type: Array,
				default: () => {
					return []
				}
			},
			studentCounts: { //学生总数
				default: 0,
			},
			from: { //哪个模块的引入，caseManage || myStudent
				type: String
			},
			pl_service_status_status:{
				type: Array
			},
			xx_result_type:{ 
				type: Array
			},
			studentType: {
				type: String
			}
		},
		data() {
			return {
				saveReject:{
					reason:''  
				},
				teaName: '',
				menuIds: {},
				filterTitle1:'',
				filterTitle2:'',
				filterTitle3:'',
				filterTitle4:'',
				planId: '', //服务组ID
				stuId: '', //学生ID
				studentName: '', //学生姓名
				connect: { //交接信息
					chooseTeacher: '',
					remark:'',
				},
				teacherArray: [], //所有顾问老师
				modal1: false, //查看模态框是否显示
				modal2: false, //分配模态框是否显示
				modal3: false, //确认接案模态框是否显示
				modal4: false, //查看密码模态框是否显示
				modal5: false, //驳回模态框是否显示
				modal6: false,
				modal6Loading: true,
				modal7: false,
				reason: '', // 驳回理由
				modalLoading: true, // 确认验证加载
				updatedConnectId: '', //编辑已存在的接案时间时，需要这个这个服务阶段的记录ID
				handoverTimeStr: '', //确认接案模态框需要的 接案时间
				planEndTime: '', //预计结案时间
				historyArray: [], //模态框中的历史交接记录
				resultArray: [], //模态框中各服务阶段名称及时间
				basicFormValidate6: {
					reason: [{
						required: true,
						type: 'string',
						message: '必填项',
						trigger: 'change'
					}]
				},
				basicFormValidate: { //分配模态框校验
					/*  planTime:[
					     { required: true, type:'date', message: '必填项', trigger: 'change' }
					 ], */
					chooseTeacher: [{
						required: true,
						type: 'string',
						message: '请分配申请顾问',
						trigger: 'change'
					}],
				},
				tableColumns: [
					{
						type: 'expand',
						width: 50,
						render: (h, params) => {
							return h(expandRow, {
								props: {
									menuId: this.pId,
									row: params.row,
									from: this.from,
								}
							})
						},
					},
					{
						title: '学生',
						key: 'studentName',
						minWidth: 100,
						render: (h, params) => {
							return h('div', [
								h('a', {
									style: {
										color: '#44bcb7'
									},
									on: {
										click: () => {
											const {href} = this.$router.resolve({
												name: 'apply.addStudent',
												query: {
													studentId: params.row.studentId
												}
											})
											window.open(href, '_blank')
										}
									}
								},
								params.row.studentName
								),
								h('a',{
									on: {
										click: () => {
											this.showModal(4,params.row)
										}
									},
								},[
									h('Icon', {
										style:{
											'margin-left': '5px',
											'font-size': '14px',
											'cursor':'pointer'
										},
										props: {
											color: '#44bcb7',
											type: 'card'
										}
									})
								]
								)
								
							]);
						}
					},
					{
						title: '服务状态',
						key: 'serviceStatusLabel',
						width: 120,
						filters: [
						],
						filterMultiple: false,
						filterRemote(value, row, obj) {
							let res = obj.filters.filter((item)=>{
								return item.value == value[0] || ''
							})
							this.filterTitle1 = res[0] ? res[0].label : ''
						},
						renderHeader: (h, params) => {
							return h('div',{
										style:{
											display:'inline'
										}
									},['服务状态',
										h('div',{
													style:{
														float:'left',
														position:'relative',
														top:'0',
														left:'0',
														color:'#999999',
														minWidth:'120px'
													}
												},
											this.filterTitle1
										)
									])
						}
					},
                    {
                        title: '申请类别',
						key: 'applyLabel',
						minWidth:48,
					},
                    {
                        title: '选校进度',
						key: 'choiceTotal',
						minWidth:48,
						render: (h, params) => {
							return h('div', [
								params.row.contractCount + '/' +params.row.choiceTotal
							]);
						}
					},
					{
						title: '准备申请材料',
						key: 'resourceCount',
						width: 120,
						render: (h, params) => {
							return h('div', [
								params.row.resourceCount  + '/' +params.row.contractCount
							]);
						},
						filters: [
							{
                                label: '未完成',
                                value: 0
                            },
                            {
                                label: '已完成',
                                value: 1
                            }
						],
						filterMultiple: false,
						filterRemote(value, row, obj) {
							let res = obj.filters.filter((item)=>{
								return item.value == value[0] || ''
							})
							this.filterTitle2 = res[0]? res[0].label : ''
						},
						renderHeader: (h, params) => {
							return h('div',{
										style:{
											display:'inline'
										}
									},['准备申请材料',
										h('div',{
													style:{
														float:'left',
														position:'relative',
														top:'0',
														left:'0',
														color:'#999999',
														minWidth:'120px'
													}
												},
											this.filterTitle2
										)
									])
						}
					},
					{
						title: '提交申请信息',
						key: 'infoStatus',
						width: 120,
						render: (h, params) => {
							return h('div', [
								params.row.infoCount   + '/' +params.row.contractCount
							]);
						},
						filters: [
							{
                                label: '未提交',
                                value: 0
                            },
                            {
                                label: '已提交',
                                value: 1
                            }
						],
						filterMultiple: false,
						filterRemote(value, row, obj) {
							let res = obj.filters.filter((item)=>{
								return item.value == value[0] || ''
							})
							this.filterTitle3 = res[0] ? res[0].label : ''
						},
						renderHeader: (h, params) => {
							return h('div',{
										style:{
											display:'inline'
										}
									},['提交申请信息',
										h('div',{
													style:{
														float:'left',
														position:'relative',
														top:'0',
														left:'0',
														color:'#999999',
														minWidth:'120px'
													}
												},
											this.filterTitle3
										)
									])
						}
					},
					{
						title: '追踪申请结果',
						key: 'resultStatus',
						width: 120,
						render: (h, params) => {
							return h('div', [
								params.row.resultCount   + '/' +params.row.infoCount
							]);
						},
						filters: [],
						filterMultiple: false,
						filterRemote(value, row, obj) {
							let res = obj.filters.filter((item)=>{
								return item.value == value[0] || ''
							})
							this.filterTitle4 = res[0] ? res[0].label : ''
						},
						renderHeader: (h, params) => {
							return h('div',{
										style:{
											display:'inline'
										}
									},['追踪申请结果',
										h('div',{
													style:{
														float:'left',
														position:'relative',
														top:'0',
														left:'0',
														color:'#999999',
														minWidth:'120px'
													}
												},
											this.filterTitle4
										)
									])
						}
					},
                    {
                        title: '入读确认',
						key: 'schoolName',
						minWidth:48,
					},
                    {
                        title: '申请顾问',
						key: 'adviserName',
						minWidth: 48,
					},
					{
						title: '操作',
						key: 'action',
						minWidth: 100,
						align: 'center',
						render: (h, params) => {
							//接案管理相关操作
							if(this.from == "caseManage") {
								if(params.row.serviceStatus == 'unreceive') {
									let h1 = h('a', {
												style: {
													color: '#73cdc9',
													'margin-right': '10px'
												},
												on: {
													click: () => {
														this.showModal(2, params.row)
													}
												}
											}, '分配')
									let h2 = h('a', {
												style: {
													color: '#73cdc9'
												},
												on: {
													click: () => {
														this.showModal(5, params.row)
													}
												}
											}, '驳回')

									let h3 = h('a', {
												style: {
													color: '#73cdc9'
												},
												on: {
													click: () => {
														this.showModal(2, params.row)
													}
												}
											}, '分配')
									let h4 = h('div', {
												style: {
													color: '#41b3ae',
													cursor:'pointer'
												},
												on: {
													click: () => {
														this.showModal(7, params.row)
													}
												}
											}, '查看驳回')
									if(params.row.menuId != this.pId){
										//分配
										if(params.row.jaReason){
											return h('div', [
												h1,
												h2,
												h4
											]);
										} else {
											return h('div', [
												h1,
												h2
											]);
										}
									} else {
										//分配
										if(params.row.jaReason){
											return h('div', [
												h3,
												h4
											]);
										} else {
											return h('div', [
												h3
											]);
										}
									}
								} else {
									//查看
									return h('div', [
										h('a', {
											style: {
												color: '#73cdc9'
											},
											on: {
												click: () => {
													this.showModal(1, params.row)
												}
											}
										}, '查看')
									]);
								}
							}
							//我的学生相关操作
							if(this.from == "myStudent") {
								if(params.row.serviceStatus == 'assigned') {
									//可接案
									return h('div', [
										h('a', {
											style: {
												color: '#73cdc9'
											},
											on: {
												click: () => {
													this.showModal(3, params.row)
												}
											}
										}, '接案'),
										h('a', {
											style: {
												"margin-left": '5px',
												color: '#73cdc9'
											},
											on: {
												click: () => {
													this.showModal(6, params.row)
												}
											}
										}, '驳回')
									]);
								} else {
									return h('div', [
										h('a', {
											style: {
												color: '#73cdc9'
											},
											on: {
												click: () => {
													this.showModal(1, params.row)
												}
											}
										}, '查看'),
										h('a', {
											style: {
												"margin-left": '5px',
												color: '#73cdc9'
											},
											on: {
												click: () => {
													this.$router.push({
														name: 'apply.connectedit',
														query: {
															studentId: params.row.studentId,
															groupId: params.row.groupId
														}
													})
												}
											}
										}, '交接')
									]);
								}
							}
						}
					}
				], 
				distributionId: '' ,// 分配顾问时传递的服务ID
				statusTransObj: {
					undo: '未开始',
					doing: '进行中',
					due: '进行中',
					finish: '定稿',
					overtime: '进行中'
				},
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		components: {
			expandRow,
			createExamInfo
		},
		mounted() {
			if(this.from == 'caseManage') {
				this.findListByUserId()
			} else {
				this.tableColumns.splice(9,1)
			}
			this.menuIds = MENUIDS
			this.$set(this.tableColumns[2],'filters',this.pl_service_status_status)
			this.$set(this.tableColumns[7],'filters',this.xx_result_type)
		},
		methods: {
			//查看接案详情路由跳转
			toViewConnect(handoverId) {
				this.$router.push({
					name: 'apply.connectPreview',
					query: {
						id: handoverId
					}
				})
			},
			//模态框确定事件
			ok(type) {
				if(type == 1){
					this.modal1 = false
				}
				if(type == 5) { //接案驳回
					let obj = {
						groupId: this.planId,
						menuId: this.pId,
						reason: this.reason
					}
					common.handOverByGroupId(obj).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.reason = ''
							this.modal5 = false
							this.$emit('reloadStatus', obj)
						}
					})
					.catch(errors.call(this))
					.finally(() => {})
				}
				if(type == 2) { // 分配
					let _this = this
					this.$refs.basicStepForm.validate((validRes) => {
						if(validRes) {
							let obj = {
								serviceGroupId: this.planId,
								id: this.distributionId,
								phase: this.pId,
								userId: this.connect.chooseTeacher,
								menuId: this.pId,
								remark: this.connect.remark
							}
							common.saveAssign(obj).then(valid.call(this)).then(res => {
									if(res.ok) {
										_this.modal2 = false
										this.$emit('reloadStatus', obj)
									}
								})
								.catch(errors.call(this))
								.finally(() => {})
						} else {
							_this.modal2 = true
							_this.modalLoading = false
							setTimeout(() => {
								_this.modalLoading = true
							}, 0)
						}
					})
				}
				if(type == 3) { // 确认接案
					let obj = {
						serviceGroupId: this.planId,
						phase: this.pId,
						menuId: this.pId
					}
					common.saveConfirm(obj).then(valid.call(this)).then(res => {
							if(res.ok) {
								//更新状态为已接案。前端局部刷新
								let obj = {
									'planId': this.planId,
									'status': 'received'
								}
								this.$emit('reloadStatus', obj)
							}
						})
						.catch(errors.call(this))
						.finally(() => {})
				}
				if(type == 6) { //我的学生驳回
					this.$refs.basicStepForm6.validate((validRes) => {
						if(validRes) {
							let obj = {
								serviceGroupId: this.planId,
								phase: this.pId,
								menuId: this.pId,
								reason: this.saveReject.reason
							}
							common.saveReject(obj).then(valid.call(this)).then(res => {
								if(res.ok) {
									this.modal6 = false
									this.$emit('reloadStatus', {})
								}
							})
							.catch(errors.call(this))
							.finally(() => {})
						} else {
							this.modal6 = true
							this.modal6Loading = false
							let _this = this
							setTimeout(() =>{
								_this.modal6Loading = true
							},0)
						}
					})
				}
				if(type == 7){
					this.modal7 = false
				}
			},

			cancel(type) {
				/* if(typeof type != 'undfined'){
					this.$refs.basicStepForm.resetFields()
				} */
			},
			//查询组内的老师
			findListByUserId() {
				common.findListByUserId({menuId: this.pId}).then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.teacherArray = res.data.data
							this.teacherArray.forEach((item, index) => {
								if(item.activeUser) {
									this.connect.chooseTeacher = item.userId
								}
							})
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},
			//查看modal1 || 分配modal2 || 接案确认modal3 || 查看密码 modal4 || 驳回modal5  ||我的学生 驳回 modal6  || 查看驳回 modal7
			showModal(modalType, datas) {
				this.studentName = datas.studentName
				this.teaName = this.from == "caseManage" ? datas.adviserName : this.userInfo.name
				this.planId = datas.groupId
				this.connect = {
					chooseTeacher: '', //分配了规划老师
					remark:''
				}
				this['modal'+modalType] = true
				if(modalType == 6){
					this.saveReject = {}
				}
				if(modalType == 7){
					this.saveReject.reason = datas.jaReason
					this.saveReject.jaReasonTime = datas.jaReasonTime
					this.saveReject.jaReasonUser = datas.jaReasonUser
				}
				if(modalType == 4){
					this.$refs.createExamInfoRef.showViewExam = true
				}
				if(modalType == 1 || modalType == 2) {
					this.distributionId = datas.id
					this.stuId = datas.stuId
					let obj = {
						serviceGroupId: this.planId,
						menuId: this.pId
					}
					common.comServiceStatusListData(obj).then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.updatedConnectId = ''
							this.handoverTimeStr = ''
							let resultArrayForSort = res.data.data.destList.filter((item, index) => {
								//不显示规划、申请、其他 时间
								return item.phase != 0  && item.phase !=  this.menuIds.DOCU && item.phase != this.menuIds.APPLY
							})
							//可能是乱序的，自己排序
							resultArrayForSort.forEach((item, index) => {
								if(item.phase == 'plan') {
									this.resultArray[0] = item
								}
								if(item.phase == 'choiceschool') {
									this.resultArray[1] = item
								}
							})
							res.data.data.nowList.forEach((item, index) => {
								if(item.phase == this.menuIds.APPLY) {
									this.connect.remark = item.remark
								}
							})
							this.planEndTime = res.data.data.endTime
							this.historyArray = res.data.data.hisList
							this.resultArray.forEach((item, index) => {
								if(item.phase == 'plan' && item.id) { //规划阶段已有ID
									this.updatedConnectId = item.id
									this.handoverTimeStr = item.handoverTimePlan
									//this.connect.planTime = item.handoverTimePlan
								}
							})
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
				}
			},
			//切换表格内筛选内容触发事件
			filterChange(filterObj) {
				this.$emit('filterChange', {
					type: filterObj.key,
					status: filterObj._filterChecked[0]
				})
			/* 	if(filterObj.key != 'status2'){
					this.$set(this.tableColumns[4].filters,'_filterChecked[0]','')
					this.filterTitle2 = ''
				} */
			},
			//状态显示转换
			statusTrans(key) {
				let val = this.statusTransObj[key] || key
				return val
			},
			open(url){
				if(url.indexOf('http')==0){
					window.open(url)
				} else {
					window.open("http://" + url)
				}
			}
		},
		watch: {
			pl_service_status_status(){
				this.$set(this.tableColumns[2],'filters',this.pl_service_status_status)
			},
			xx_result_type(){
				this.$set(this.tableColumns[7],'filters',this.xx_result_type)
			}
		}
	}
</script>