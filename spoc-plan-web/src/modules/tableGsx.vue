<style lang='less'>
	.tableGsx {
		position: relative;
		.ivu-table-wrapper {
			border: none;
		}
		.ivu-table th {
			background: #fff;
		}
		.ivu-table:after {
			display: none;
		}
		.tableTittle {
			position: relative;
			font-size: 12px;
			.count {
				color: red;
				font-size: 18px;
				font-style: normal;
			}
		}
		.contentAro {
			position: absolute;
			width: 100%;
			height: 100px;
			.tableContent {
				width: 95%;
				height: 60px;
				margin: -4px 17px;
				box-shadow: 0 0 15px hsla(177.5, 47.2%, 50.2%, 0.2);
				padding: 9px 0;
				display: flex;
				justify-content: space-around;
				span {
					display: block;
					border-right: 1px solid #e5e5e5;
					text-align: center;
					width: 100%;
				}
				span:last-child {
					border-right: none;
				}
				i {
					font-style: normal;
				}
			}
			.contentTitle {
				width: 95%;
				margin-left: 17px;
				margin-right: 17px;
				margin-bottom: 15px;
				.titleRight {
					float: right;
					margin-left: 10px;
					margin-right: 5px;
				}
				.caseManage {
					float: right;
					margin-left: 10px;
					margin-right: 5px;
				}
				.title {
					display: inline-block;
					padding: 0px 12px;
					border-radius: 2px;
					color: #fff;
					background-color: #d0d0d0;
					margin-right: 10px;
				}
			}
		}
		.ivu-table-row {
			position: relative;
			left: 0px;
			height: 135px;
			.ivu-table-cell {
				padding-top: 13px;
			}
			.ivu-table-column-center,
			.ivu-table-column-left {
				vertical-align: top;
			}
		}
		.table-gsx-btnlist-container {
			padding-top: 10px;
			padding-bottom: 10px;
			.ivu-select-placeholder {
				line-height: 30px;
			}
			.table-gsx-count-select {
				display: flex;
				display: -webkit-flex;
				justify-content: space-between;
				>span {
					color: #222;
					font-size: 12px;
					line-height: 44px;
					display: inline-block;
					b {
						color: #ff0000;
						font-size: 16px;
					}
				}
			}
			.btnlist {
				padding-left: 16px;
			}
			.bt2 {
				border: none;
			}
		}
	}
	
	.crew_modal {
		.add_list {
			padding: 14px 28px;
			.sel {
				width: 140px;
				height: 35px;
				margin-right: 44px;
			}
		}
	}
</style>
<template>
	<div>
		<div class="tableGsx" v-if="data.length">
			<div id="refBtnlistContainer" class="table-gsx-btnlist-container">
				<div class="table-gsx-count-select">
					<span>当前学生人数  <b>{{studentCounts}}</b></span>
				</div>
				<btn-list :title="tableTitle" :btnList="btnListVal">
				</btn-list>
			</div>
			<Table :columns="columns" :loading="loading" :data="data" @on-sort-change="onSortChange" @on-filter-change="filterChange">
			</Table>
			<div class="contentAro" v-for="(item, index) in data" :key="index" :style="{'top': (index+1)*135 + top +'px'}">
				<p class="contentTitle">
					<span class="title" v-for="(value, key) in item.tags" :key="value">
                        {{value}}
                    </span>
					<span class="title" v-if="!item.tags || item.tags.length == 0"></span>
					<!-- unreceive未分配 assigned已分配||未接案 -->
					<a v-if="( item.status!='unreceive') && isShowCaseM && item.id" @click.prevent="onclickGoingToServer(2,item)" class="titleRight">
						进入服务组 >
					</a>
					<a v-if="( item.status!='unreceive' && item.status!='assigned') && (!isShowCaseM) && item.id" @click.prevent="onclickGoingToServer(2,item)" class="titleRight">
						进入服务组 >
					</a>
					<a v-if="(item.status != 'unreceive') && item.id" @click.prevent="onclickGoingToServer(1,item)" class="caseManage">
						查看
					</a>
					<!-- 已分配未接案assigned的不显示立即交接按钮、招生官不显示立即交接按钮 。招生官判断条件为：必须是规划顾问且是美方的 -->
					<a v-if="(!isShowCaseM) && (!(isPlanConsultant && userInfo.companyIsUs == 1)) && item.status != 'assigned' && item.id" @click.prevent="onclickGoingToServer(5,item)" class="caseManage">
						立即交接
					</a>
					<a v-if="isShowCaseM && (item.status =='unreceive') && item.id" @click.prevent="onclickGoingToServer(0,item)" class="caseManage">
						> 分配
					</a>
					<a v-if="(!isShowCaseM) && (!isPlanLeaser) && (item.status =='assigned')" @click.prevent="onclickGoingToServer(4,item)" class="caseManage">
						> 接案
					</a>
					<a v-if="(!isShowCaseM) && (!isPlanLeaser) && (item.status =='assigned')" @click.prevent="onclickGoingToServer(7,item)" class="caseManage">
						> 驳回    <!-- 我的学生  -->
					</a> 
					<a v-if="item.id && isShowCaseM && (item.menuId != pid) && (item.status =='unreceive')" @click.prevent="onclickGoingToServer(6,item)" class="caseManage">
						> 驳回  <!-- 接案列表 -->
					</a>
					<a v-if="item.jaReason" @click.prevent="onclickGoingToServer(8,item)" class="caseManage">
						查看驳回
					</a>
					<!-- <a v-if="(!isShowCaseM) && isPlanLeaser && (item.status =='assigned')" @click.prevent="onclickGoingToServer(2,item)" class="caseManage">
						进入服务组 >
					</a> -->
					<a v-if="!item.id" @click.prevent="onclickGoingToServer(3,item)" class="caseManage">
						<create-or-edit-group title='新建服务组' :pid="pid" type="create" spanContent="创建服务组" :studentInfo_userId="studentInfo.stuId" :studentInfo_stuName="studentInfo.stuName" :studentInfo_cellNumber="studentInfo.cellNumber" :studentInfo_ecID="studentInfo.ecID" :studentInfo_applyTime="studentInfo.applyTime" modelName="规划" @afterCreateGroupReload="afterCreateGroupReload">
						</create-or-edit-group>
					</a>
				</p>
				<div class="tableContent">
					<span v-for="(item, index) in item.tagMapList" :key="index">
                        <i>{{item.tagName}}</i><br>
                        <a>{{item.num}}</a> 
                    </span>
				</div>
			</div>
		</div>
		<div class="tableGsx" v-if="data.length == 0">
			<div id="refBtnlistContainer" class="table-gsx-btnlist-container">
				<div class="table-gsx-count-select">
					<span>当前学生人数  <b>{{studentCounts}}</b></span>
				</div>
				<btn-list :title="tableTitle" :btnList="btnListVal">
				</btn-list>
			</div>
			<Table :columns="columns" :data="data" @on-sort-change="onSortChange" @on-filter-change="filterChange">
			</Table>
		</div>
		<Modal v-model="modal2"  width=728 title="查看">
			<div>
				<Form  :label-width="180">
					<Form-item label="交接表：" v-if="historyArray.length">
						<div style="overflow:hidden" v-for="(item,index) in historyArray" :key="item.id">
							<div style="float:left;width:90px;">{{item.name}}</div>
							<div style="float:left;width:100px;">
								<a @click="toViewConnect(item.id)" style="margin-left: 10px;">查看交接详情</a>
							</div>
						</div>
					</Form-item>
					<div v-for="(item, index) in resultArray" :key="item.phase">
						<Form-item v-if="item.phase== menuIds.PLAN" prop="planTime" label="规划完成时间：">
							<DatePicker :clearable="false" :disabled="(!isShowCaseM) || (serviceStatus!= '1' && serviceStatus != '2')" :readonly="(!isShowCaseM) || (serviceStatus!= '1' && serviceStatus != '2')" type="datetime" placeholder="选择时间" v-model="connect.planTime" style="width: 180px"></DatePicker>
						</Form-item>
					<!-- 	<Form-item v-if="item.phase!= menuIds.PLAN" :label="'(预计)' +phaseTrans(item.phase) + '完成时间：'">
							<DatePicker disabled readonly type="datetime" placeholder="选择时间" :value="item.handoverTimePlan" style="width: 180px"></DatePicker>
						</Form-item> -->
					</div>
					<!-- <Form-item label="(预计)结案时间：">
						<DatePicker disabled  readonly type="datetime" placeholder="选择时间" :value="planEndTime" style="width: 180px"></DatePicker>
					</Form-item> -->
					<Form-item label="分配规划老师：" prop="chooseTeacher">
						<div v-if="isShowCaseM">{{teaName}}</div>
						<div v-if="!isShowCaseM">{{userInfo.name}}</div>
					</Form-item>
					<Form-item label="备注：">
						<div style="width: 380px;word-wrap: break-word;">{{connect.remark}}</div>
					</Form-item>
				</Form>
			</div>
			<div slot="footer">
				<Button type="primary" @click="ok(2)">确定</Button>
			</div>
		</Modal>
		<Modal v-model="modal3" :loading="modal3Loading" width=728 title="分配" @on-ok="ok(3)" @on-cancel="cancel(3)">
			<div>
				<Form ref="basicStepForm3" :rules="basicFormValidate3" :model="connect" :label-width="180">
					<Form-item label="交接表：" v-if="historyArray.length">
						<div style="overflow:hidden" v-for="(item,index) in historyArray" :key="item.id">
							<div style="float:left;width:90px;">{{item.name}}</div>
							<div style="float:left;width:100px;">
								<a @click="toViewConnect(item.id)" style="margin-left: 10px;">查看交接详情</a>
							</div>
						</div>
					</Form-item>
					<div v-for="(item, index) in resultArray" :key="item.phase">
						<Form-item v-if="item.phase== menuIds.PLAN" label="规划完成时间：" prop="planTime">
							<DatePicker :clearable="false" type="datetime" placeholder="选择时间" v-model="connect.planTime" style="width: 180px"></DatePicker>
						</Form-item>
						<!-- <Form-item v-if="item.phase != menuIds.PLAN" :label="'(预计)' + phaseTrans(item.phase) + '完成时间：'">
							<DatePicker disabled readonly type="datetime" placeholder="选择时间" :value="item.handoverTimePlan" style="width: 180px"></DatePicker>
						</Form-item> -->
					</div>
					<!-- <Form-item label="(预计)结案时间：">
						<DatePicker disabled readonly type="datetime" placeholder="选择时间" :value="planEndTime" style="width: 180px"></DatePicker>
					</Form-item> -->
					<Form-item label="分配规划老师：" prop="chooseTeacher">
						<RadioGroup v-model="connect.chooseTeacher">
							<Radio v-if="item.activeUser" v-for="(item,index) in teacherArray" :label="item.userId" :key="item.userId">{{item.name}}</Radio>
							<Radio v-if="!item.activeUser" v-for="(item,index) in teacherArray" :label="item.userId" :key="item.userId">{{item.name}}</Radio>
						</RadioGroup>
					</Form-item>
					<Form-item label="备注：">
						<Input v-model="connect.remark" type="textarea" :rows="4" style="width:380px;" placeholder="请输入" />
					</Form-item>
					<!--   <div style="margin-bottom: 20px;">
						<span style="float:left; line-height: 33px; width:170px; margin-right: 10px;text-align:right;"><i style="color:red">* </i>分配规划老师：</span>
						
					</div> -->
				</Form>
			</div>
		</Modal>
		<Modal v-model="modal4" width=400 title="接案确认" ok-text="确认" @on-ok="ok(4)" @on-cancel="cancel()">
			<div>
				<p style="text-indent:2em;line-height:30px;">您的主管给您分配了一位新学生<span style="color:#44bcb7;padding:0 5px">{{stuName}}</span>，预计交接时间为{{handoverTimeStr}}，请尽快处理。</p>
			</div>
		</Modal>
		<Modal v-model="modal5" width=400 title="接案驳回" ok-text="确认" @on-ok="ok(5)" @on-cancel="cancel()">
			<!-- 接案列表 -->
			<div>
				<p style="text-indent:2em;line-height:30px;">确定驳回学生<span style="color:#44bcb7;padding:0 5px">{{stuName}}</span></p>
				<Input v-model="reason" type="textarea" placeholder="请输入驳回理由"></Input>
			</div>
		</Modal>
		<Modal v-model="modal6" :loading="modal6Loading" width=500 title="接案驳回" ok-text="确认" @on-ok="ok(6)" @on-cancel="cancel()">
			<!-- 我的学生 -->
			<div>
				<p style="text-indent:2em;line-height:30px;">确定驳回学生<span style="color:#44bcb7;padding:0 5px">{{stuName}}</span></p>
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
	</div>
</template>

<script>
	import {MENUIDS} from "@public/libs/config.js";
	import { mapState, mapGetters } from 'vuex'
	import BtnList from '@public/modules/btnlist';
	import createOrEditGroup from '@public/modules/createOrEditGroup';

	import valid, {
		errors,
		common,
		sys
	} from "../libs/request";

	export default {
		props: {
			loading:{
				type: Boolean,
			},
			studentNum: {
				type: String,
				default: '0'
			},
			top: {
				type: [Number, String],
				default: 0
			},
			columns: {
				type: Array,
				default: () => {
					return []
				}
			},
			data: {
				type: Array,
				default: () => {
					return []
				}
			},
			isShowCaseM: {
				type: Boolean,  //true为接案管理  false为我的学生
				default: false
			},
			studentCounts: {
				default: 0,
			},
			tableTitle: {
				type: String
			},
			pid: {
				type: String
			},
			serviceStatus:{
				type : String,
				default: '0'
			}
		},
		data() {
			return {
				saveReject:{
					reason:''  
				},
				teaName:'',
				menuIds: {},
				reason:'',
				modal2: false,
				modal3: false,
				modal3Loading: true,
				modal4: false,
				modal5: false,
				modal6: false,
				modal6Loading: true,
				modal7: false,
				btnListVal: [{
					text: '添加学生',
					type: 'primary',
					event: this.addStudent
				}],
				selectToShow: '',
				connect: {
					planTime: '',
					chooseTeacher: '',
					remark:''
				},
				handoverTimeStr: '', //时间字符串
				planId: '', //规划组ID
				stuId: '', //学生ID
				stuName: '', //学生姓名
				studentInfo: {},
				updatedId: '', //有规划ID，可以编辑时间，需要传ID，没有ID需要改状态
				resultArray: [],
				planEndTime: '', //预计结案时间
				historyArray: [],
				/*校验*/
				basicFormValidate6: {
					reason: [{
						required: true,
						type: 'string',
						message: '必填项',
						trigger: 'change'
					}]
				},
				basicFormValidate: {
					planTime: [{
						required: true,
						type: 'date',
						message: '必填项',
						trigger: 'change'
					}]
				},
				basicFormValidate3: {
					planTime: [{
						required: true,
						type: 'date',
						message: '必填项',
						trigger: 'change'
					}],
					chooseTeacher: [{
						required: true,
						type: 'string',
						message: '请分配老师',
						trigger: 'change'
					}]
				},
				teacherArray: [],
			}
		},
		computed: {
			...mapState(['userInfo']),
			...mapGetters('plan', ['isPlanLeaser','isPlanConsultant'])
		},
		components: {
			BtnList,
			createOrEditGroup
		},
		mounted(){
			this.menuIds = MENUIDS
		},
		methods: {
			//查询组内的老师
			findListByUserId() {
				common.findListByUserId({
					 menuId: this.pid
				}).then(valid.call(this))
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
			//查看接案详情路由跳转
			toViewConnect(handoverId) {
				this.$router.push({
					name: 'plan.connectPreview',
					query: {
						id: handoverId
					}
				})
			},
			onclickGoingToServer(val, datas) {
				this.planId = datas.id
				this.stuId = datas.stuId
				this.stuName = datas.stuName
				this.teaName = datas.teaName
				this.connect = {
					planTime: '', //规划时间
					chooseTeacher: '' ,//分配了规划老师
					remark:''
				}
				if(val == 2) { //进入服务组
					const {href} = this.$router.resolve({
						name: 'plan.serviceInfo',
						params: {
							gid: datas.id,
						}
					})
					window.open(href, '_blank')
					return
				}
				if(val == 5) { //立即交接
					this.$router.push({
                        name: 'plan.connectedit',
                        query: {
                            studentId: datas.stuId,
                            groupId: datas.id
                        }
                    })
					return
				}
				if(val == 1) { //查看
					this.modal2 = true
				}
				if(val == 0) { //分配
					this.modal3 = true
					this.findListByUserId()
				}
				if(val == 3) { //创建服务组
					this.studentInfo = datas
				}
				if(val == 4) { //确定接案
					this.modal4 = true
				}
				if(val == 6) { //接案驳回  接案列表
					this.modal5 = true
				}
				if(val == 7) { //接案驳回  我的学生列表
					this.modal6 = true
				}
				if(val == 8) { //查看接案驳回
					this.modal7 = true
					this.saveReject.reason = datas.jaReason
					this.saveReject.jaReasonTime = datas.jaReasonTime
					this.saveReject.jaReasonUser = datas.jaReasonUser
				}
				if(val == 0 || val == 1 || val == 4) {
					let obj = {
						serviceGroupId: this.planId,
						menuId: this.pid
					}
					common.comServiceStatusListData(obj).then(valid.call(this))
						.then(res => {
							if(res.ok) {
								this.updatedId = ''
								this.handoverTimeStr = ''
								//可能是乱序的，自己排序
								res.data.data.destList.forEach((item, index) => {
									if(item.phase == this.menuIds.PLAN) {
										this.resultArray[0] = item
									}
									/* if(item.phase == this.menuIds.CHOICESCHOOL) {
										this.resultArray[1] = item
									} */
								})
								res.data.data.nowList.forEach((item, index) => {
									if(item.phase == this.menuIds.PLAN) {
										this.connect.remark = item.remark
									}
								})
								this.planEndTime = res.data.data.endTime
								this.historyArray = res.data.data.hisList
								this.resultArray.forEach((item, index) => {
									if(item.phase == this.menuIds.PLAN && item.id) { //规划阶段已有ID
										this.updatedId = item.id
										this.handoverTimeStr = item.handoverTimePlan
										this.connect.planTime = item.handoverTimePlan
									}
								})
							}
						})
						.catch(errors.call(this))
						.finally(() => {});
				}
			},
			//表格内排序按钮触发事件
			onSortChange(sortObj) {
				this.$emit('toSortChange', sortObj)
			},
			//表格内筛选按钮触发事件
			filterChange(val) {
				this.$emit('filterChange', {
					val: val._filterChecked[0],
					key: val.key
				})
			},
			//模态框确定事件
			ok(type) {
				if(type == 7) {
					this.modal7 = false
				}
				if(type == 2){
					this.modal2 = false
					if(this.isShowCaseM && (this.serviceStatus == '1' || this.serviceStatus == '2') ){
						let  _time = ''
						if(this.connect.planTime) {
							if(typeof(this.connect.planTime) != 'string' ) {
								_time = this.connect.planTime.format('yyyy-MM-dd hh:mm:ss')
							} else {
								_time = this.connect.planTime
							}
						} else {
							_time = ''
						}
						let obj = {
							serviceGroupId: this.planId,
							handoverTimePlan: _time,
							phase: this.pid,
							menuId: this.pid,
							isView: true, //查看不修改状态
							id: this.updatedId //已有时间编辑需要传递ID
						}
						common.saveHandoverTime(obj).then(valid.call(this)).then(res => {
							if(res.ok) {
								this.$emit('reloadStatus', obj)
							}
						})
						.catch(errors.call(this))
						.finally(() => {})
					}
				}
				if(type == 4) {//接案确认
					let obj = {
						serviceGroupId: this.planId,
						phase: this.pid,
						menuId: this.pid
					}
					common.saveConfirm(obj).then(valid.call(this)).then(res => {
							if(res.ok) {
								this.modal4 = false
								this.$emit('reloadStatus', obj)
							}
						})
						.catch(errors.call(this))
						.finally(() => {})
				}
				if(type == 5) { //接案驳回
					let obj = {
						groupId: this.planId,
						menuId: this.pid,
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
				if(type == 3) {
					this.$refs.basicStepForm3.validate((validRes) => {
						if(validRes) {
							let  _time = ''
							if(this.connect.planTime) {
								if(typeof(this.connect.planTime) != 'string' ) {
									_time = this.connect.planTime.format('yyyy-MM-dd hh:mm:ss')
								} else {
									_time = this.connect.planTime
								}
							} else {
								_time = ''
							}
							let obj = {
								serviceGroupId: this.planId,
								handoverTimePlan: _time,
								phase: this.pid,
								menuId: this.pid,
								remark: this.connect.remark
							}
							if(this.connect.chooseTeacher) { //分配的时候选择了老师
								obj.userId = this.connect.chooseTeacher
							}
							if(this.updatedId) { //已有时间编辑需要传递ID
								obj.id = this.updatedId
							}
							common.saveAssign(obj).then(valid.call(this)).then(res => {
								if(res.ok) {
									this.modal3 = false
									this.$emit('reloadStatus', {})
								}
							})
							.catch(errors.call(this))
							.finally(() => {})
						} else {
							this.modal3 = true
							this.modal3Loading = false
							let _this = this
							setTimeout(() =>{
								_this.modal3Loading = true
							},0)
						}
					})
				}
				if(type == 6) {
					this.$refs.basicStepForm6.validate((validRes) => {
						if(validRes) {
							let obj = {
								serviceGroupId: this.planId,
								phase: this.pid,
								menuId: this.pid,
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
			},

			cancel(type) {
				if(typeof type != 'undefined') {
					this.$refs['basicStepForm' + type].resetFields()
				}
				/*    if(val == 1){
				        this.$refs.basicStepForm2.resetFields()
				    }
				    if(val == 0) {
				        this.$refs.basicStepForm3.resetFields()
				    } */
			},
			//添加学生
			addStudent() {
				console.log(12)
				this.$router.push({
					name: 'plan.addStudent',
					query: {
						menuId: this.pid
					}
				})
			},
			//创建服务组后刷新页面
			afterCreateGroupReload() {
				this.$emit('reloadStatus', {})
			},
		},
		watch: {
			selectToShow(newVal) {
				if(newVal) {
					this.$emit('onclickChoseCondition', newVal);
				}
			}
		}
	}
</script>