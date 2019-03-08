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
		.ivu-table-fixed {
			box-shadow: 0 0;
			border-right: none; //1px solid  rgba(0, 0, 0, 0.2);
		}
		.ivu-table-fixed-right {
			box-shadow: 0 0;
			border-left: none; //1px solid  rgba(0, 0, 0, 0.2);
		}
		.ivu-table-fixed-header thead th{
			background-color: #f8f8f9;
		}
		.ivu-table-header thead th{
			background-color: #f8f8f9;
		}
		.stuNumAndCheckColunms {
			.stuNum {
				float: left;
				span {
					color: #73cdc9;
					font-size: 16px;
				}
			}
			.checkColumns {
				float: right;
				position: relative;
				.checkGroupsColumns {
					position: absolute;
					top: 22px;
					right: -22px;
					z-index: 10;
					background-color: #fff;
				}
			}
			.myBorder1 {
				cursor: pointer;
				border: 1px solid #495060;
				padding: 2px 4px 0 4px;
				border-radius: 3px;
				&:hover{
					border-color: #51aeaa;
					color: #51aeaa; 
				}
			}
			.myBorder2 {
				cursor: pointer;
				border: 1px solid #44bcb6;
				padding: 2px 4px 0 4px;
				border-radius: 3px;
			}
		}
		.cle {
			clear: both;
		}
		.page {
			margin-top: 15px;
			text-align: center;
			margin-bottom: 140px;
		}
	
	}
</style>
<template>
	<div class="contentTableMain">
		<div class="stuNumAndCheckColunms">
			<div class="stuNum">学生人数：<span>{{studentCounts}}</span></div>
			<div class="checkColumns" :class="[showCheckColumns ? myBorder1: myBorder2]" @click="showCheckColumns=!showCheckColumns">
				<Icon type="funnel" size="14" :color="(showCheckColumns?'':'#44bcb6')"></Icon>
			</div>
			<div class="checkColumns">
				<div class="checkGroupsColumns">
					<Checkbox-group v-show="showCheckColumns" v-model="tableColumnsChecked" @on-change="changeTableColumns(true)" style="width:100px;">
						<div v-for="(item,index) in tableColumnsForCheck" :key="index">
							<Checkbox :label="item.key" :disabled="item.isSys == 1">{{item.name}}</Checkbox>
						</div>
					</Checkbox-group>
				</div>
			</div>
		</div>
		<div class="cle"></div>
		<div @click="hiddenCheckColums">
			<Table :loading="loading" :height="tableHeight" :data="tableData" @on-expand="expandChange" :columns="tableColumns" @on-filter-change="filterChange">
			</Table>
		</div>
		<Modal v-model="modal1" width=728 title="查看">
			<div>
				<Form  :label-width="180">
					<Form-item label="交接表：" v-if="historyArray.length">
						<div style="overflow:hidden" v-for="(item,index) in historyArray" :key="item.id">
							<div style="float:left;width:90px;">{{item.name}}</div>
							<div style="float:left;width:100px;">
								<a @click="toViewConnect(item.id)" style="margin-left: 10px;" href="javascript:void(0)">查看交接详情</a>
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
					<Form-item label="分配文书顾问：">
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
								<a @click="toViewConnect(item.id)" style="margin-left: 10px;" href="javascript:void(0)">查看交接详情</a>
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
					<!--   <Form-item label="当前学生是否免审核：" prop="examine">
                    <RadioGroup v-model="connect.examine">
                        <Radio label="1">是</Radio>
                        <Radio label="0">否</Radio>
                    </RadioGroup>
                </Form-item> -->
					<Form-item label="分配文书顾问：" prop="chooseTeacher">
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
				<p style="text-indent:2em;line-height:30px;">您的主管给您分配了一位新学生<span style="color:#44bcb7;padding:0 5px">{{stuName}}</span>，请尽快处理。</p>
			</div>
		</Modal>
		<Modal v-model="modal4" width=400 title="接案驳回" ok-text="确认" @on-ok="ok(4)" @on-cancel="cancel()">
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
	import expandRow from './tableExpand';
	import {MENUIDS} from "@public/libs/config.js";
	import valid, {
		errors,
		common,
		sys
	} from "../libs/request";
	import { plServiceMember, plServiceStatus } from '../../../spoc-plan-web/src/libs/request';

	export default {
		props: {
			loading:{
				type: Boolean
			},
			pId: {
				required: true
			},
			historyCheckResult: { //表格列选中状态
				type: Array,
				default: () => {
					return []
				}
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
			tableTitle: { //表格名称
				type: String
			},
			from: { //哪个模块的引入，caseManage || myStudent
				type: String
			},
			studentType: { //学生类别  UG本科 PG研究生 HS中学 
				type: String
			}
		},
		data() {
			return {
				tableHeight: 500,
				saveReject:{
					reason:''  
				},
				nameWidth: 120,
				reason: '', //驳回理由
				menuIds: {},
				filterArrayUG: ['resumeStatus', 'rlStatus', 'psStatus', 'othertStatus', 'caStatus', 'ucStatus','addResumeStatus','pdStatus','wsStatus','abstractStatus','caInfoStatus'], 
				filterArrayPG: ['resumeStatus', 'rlStatus', 'psStatus', 'othertStatus','addResumeStatus','pdStatus','wsStatus','abstractStatus','caInfoStatus'], 
				filterArrayHS: ['resumeStatus', 'rlStatus', 'psStatus', 'othertStatus','addResumeStatus','pdStatus','wsStatus','abstractStatus','caInfoStatus'], 
				columnNames: {
					abstractStatus: '研究概述状态',
					addResumeStatus: '附加简历状态',
					caInfoStatus: 'CA附加信息状态',
					caStatus: 'CA活动列表状态',
					choicesNum: '已选学校数量',
					firstName: '名',
					groupId: '服务组ID',
					lastName: '姓',
					othertStatus: '其他状态',
					pdStatus: '作品集描述状态',
					psStatus: 'PS状态',
					resumeStatus: '简历状态',
					rlStatus: '推荐信状态',
					schoolEssayNum: '学校文书数量',
					schoolNum: '申请学校数量',
					status: '当前文书阶段状态',
					stuId: '学生ID',
					stuName: '姓名',
					stuenName: '英文名',
					teaId: '顾问ID',
					teaName: '顾问姓名',
					ucStatus: 'UC活动列表状态',
					wsStatus: '写作样本状态'
				},
				myBorder1: 'myBorder1',
				myBorder2: 'myBorder2',
				planId: '', //服务组ID
				stuId: '', //学生ID
				stuName: '', //学生姓名
				connect: { //交接信息
					chooseTeacher: '',
					examine: '0', //是否免审核
					remark:'',
				},
				teacherArray: [], //所有顾问老师

				modal1: false, //查看模态框是否显示
				modal2: false, //分配模态框是否显示
				modal3: false, //确认接案模态框是否显示
				modal4: false, //驳回模态框是否显示
				modal6: false,
				modal6Loading: true,
				modal7: false,
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
						message: '请分配文书顾问',
						trigger: 'change'
					}],
					/*  examine:[
					     { required: true, type:'string', message: '请确认是否免审核', trigger: 'change' }
					 ] */
				},

				tableFilterTags: [], //列表筛选项
				showCheckColumns: false, //是否显示可选列
				tableColumns: [], //要最终显示的，绑定在table上的列集合
				tableColumnsChecked: [], //列已选项
				tableColumnsForCheck: [], //列备选项
				tableColumnList: {}, // 列备选项map  key 为showCheckColumns 的值，value 为一个实际的列对象
				filters: [], //列筛选项
				docuTypeList: [], //添加文书时的文书类别
				docuTypeListUG: [], //本科添加文书类别备选
				docuTypeListPG: [], //研究生添加文书类别备选
				docuTypeListHS: [], //中学添加文书类别备选
				distributionId: '' ,// 分配顾问时传递的服务ID
				statusTransObj: {
					undo: '未开始',
					doing: '进行中',
					due: '进行中',
					finish: '定稿',
					overtime: '进行中'
				},
				filtersWithNoStart:[],//筛选备选项
				teaName:'',
				reLoadParentData: ''
			}
		},
		components: {
			expandRow
		},
		mounted() {
			if(this.from == 'caseManage') {
				this.findListByUserId()
			}
			this.menuIds = MENUIDS
		},
		methods: {
			hiddenCheckColums(){
				this.showCheckColumns = false
			},
			//查看接案详情路由跳转
			toViewConnect(handoverId) {
				this.$router.push({
					name: 'docu.connectPreview',
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
				if(type == 4) { //接案驳回
					let obj = {
						groupId: this.planId,
						menuId: this.pId,
						reason: this.reason
					}
					common.handOverByGroupId(obj).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.reason = ''
							this.modal4 = false
							this.$emit('reloadStatus', {})
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
				/*   if(typeof type != 'undfined'){
				      this.$refs['basicStepForm'+ type].resetFields()
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
			//查看modal1 || 分配modal2 || 接案确认modal3 || ||我的学生 驳回 modal6  || 查看驳回 modal7
			showModal(modalType, datas) {
				//console.log(datas)
				this.distributionId = datas.id
				this.planId = datas.groupId
				this.stuId = datas.stuId
				this.stuName = datas.stuName
				this.teaName = datas.teaName
				this.connect = {
					//planTime:'' ,//规划时间
					chooseTeacher: '', //分配了规划老师
					examine: '0', //是否免审核
					remark: '',
				}
				this['modal' +modalType] = true
				let obj = {
					serviceGroupId: this.planId,
					menuId: this.pId
				}
				if(modalType == 6){
					this.saveReject = {}
				}
				if(modalType == 7){
					this.saveReject.reason = datas.jaReason
					this.saveReject.jaReasonTime = datas.jaReasonTime
					this.saveReject.jaReasonUser = datas.jaReasonUser
				}
				if(modalType == 1 || modalType == 2) {
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
								if(item.phase == this.menuIds.DOCU) {
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
			//获取表格内筛选下拉菜单内容，并加载表格列配置信息 
			getTableSelect() {
				if(!this.filtersWithNoStart.length) {
					let obj = {
						types: 'doc_essay_status'
					}
					sys.batchListData(obj).then(valid.call(this))
						.then(res => {
							if(res.ok) {
								this.filters = res.data.data.doc_essay_status
								res.data.data.doc_essay_status.unshift({label:'未开始',value:'-1'})
								this.filtersWithNoStart = res.data.data.doc_essay_status
								this.getCheckboxStatus(this.filtersWithNoStart);
							}
						})
						.catch(errors.call(this))
						.finally(() => {});
				} else {
					this.getCheckboxStatus(this.filtersWithNoStart);
				}
			},
			//切换表格内筛选内容触发事件
			filterChange(filterObj) {
				//console.log(filterObj)
				//console.log(filterObj.title + '   ' + filterObj._filterChecked[0])
				this.$emit('filterChange', {
					type: filterObj.title,
					status: filterObj._filterChecked[0]
				})
			},
			//展开收缩某行
			expandChange(row, status) {
				this.tableHeight = this.tableHeight  + 1
				if(this.tableHeight > 510){
					this.tableHeight  = 500
				}
				if(status) { //展开
					//console.log(row.groupId + '  ' + row.stuId)
					this.nameWidth =  parseInt(document.getElementsByClassName('getWidth')[0].parentElement.clientWidth) + 50
					this.getDocuType()
					if(this.from == 'myStudent') {
						this.listUser({
							serviceGroupId: row.groupId,
							menuId: this.pId
						})
					}
				}
			},
			//查询可分享老师
			listUser(obj) {
				common.listGroupByUserId(obj).then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.teacherArray = res.data.data.members
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},
			//获取文书类别，添加文书时使用
			getDocuType() {
				if(this['docuTypeList' + this.studentType].length > 0) {
					this.docuTypeList = this['docuTypeList' + this.studentType]
				} else {
					let type = 'doc_essay_type_undergrad'
					if(this.studentType == 'UG') {
						type = 'doc_essay_type_undergrad'
					}
					if(this.studentType == 'PG') {
						type = 'doc_essay_type_postgraduate'
					}
					if(this.studentType == 'HS') {
						type = 'doc_essay_type_highschool'
					}
					let obj = {
						types: type
					}
					sys.batchListData(obj).then(valid.call(this))
						.then(res => {
							if(res.ok) {
								this.docuTypeList = res.data.data[type]
								this['docuTypeList' + this.studentType] = res.data.data[type]
							}
						})
						.catch(errors.call(this))
						.finally(() => {});
				}
			},
			//获取备选项和历史选择状态
			getCheckboxStatus(filters) {
				//固定列头展开收缩
				this.tableColumnList.expand = {
					type: 'expand',
					width: 50,
					fixed: 'left',
					render: (h, params) => {
						return h(expandRow, {
							on: {
								reopen: () => {
									this.reopenExpand(params.row)
								},
								reLoadParentData: () => {
									this.reLoadParentData = params.row
									this.$emit('reloadData')
								}
							},
							props: {
								nameWidth: this.nameWidth,
								menuId: this.pId,
								row: params.row,
								from: this.from,
								studentType: this.studentType,
								docuTypeList: this.docuTypeList,
								filters: this.filters,
								teacherArray: this.teacherArray
							}
						})
					},
				}
				//固定显示学生名
				this.tableColumnList.stuName = {
					title: this.columnNames['stuName'] || 'stuName',
					key: 'stuName',
					minWidth:120,
					maxWidth: 140,
					//width: 100,
					fixed: 'left',
					render: (h, params) => {
						return h('div',  {
								class:'getWidth',
								style: {
									cursor: 'pointer'
								},
								on: {
									click: () => {
										/* this.$router.push({
											name: 'docu.addStudent',
											query: {
												studentId: params.row.stuId
											}
										}) */
										const {href} = this.$router.resolve({
											name: 'docu.addStudent',
											query: {
												studentId: params.row.stuId
											}
										})
										window.open(href, '_blank')
									}
								}
							}	,[
							h('div', {
								style: {
									color: '#44bcb7',
									'white-space': 'nowrap'
								},
							}, 
							//params.row.lastName + ' ' + params.row.firstName
							params.row.stuName
							),
							h('i', {
								style: {
									color: '#495060',
									'font-style': 'normal',
									'white-space': 'nowrap'
								}
							},
							params.row.stuenName ? (' (' + params.row.stuenName + ')') : ''
							)
						]);
					}
				}
				this.historyCheckResult.forEach((item, index) => {
					this.tableColumnsForCheck.push(item) //填充备选项
					if(item.ischeck == 1) {
						this.tableColumnsChecked.push(item.key) //填充已选项
					}
					if(item.key != 'stuName') {
						if(this['filterArray' + this.studentType].indexOf(item.key) > -1) {
							//有过滤
							this.tableColumnList[item.key] = {
								title: item.name,
								key: item.key,
								width: 120,
								align:'center',
								filters: filters,
								filterMultiple: false,
								filterRemote(value, row) {
								}
							}
						} else {
							//无过滤
							this.tableColumnList[item.key] = {
								title: item.name,
								key: item.key,
								align:'center',
								minWidth:90,
								//width: 130,
							}
						}
						if(item.key == 'choicesNum') { //选校进度
							this.tableColumnList[item.key].render = (h, params) => {
								return h('p', {
										style: {
											//color: '#44bcb7',
											//'text-align': 'center'
										},
									},
									params.row.choicesNum + '/' + params.row.schoolNum);
							}
						} else if(item.key == 'schoolEssayNum') { //学校文书
							this.tableColumnList[item.key].render = (h, params) => {
								return h('p', {
										style: {
											//color: '#44bcb7'
										},
									},
									params.row.schoolEssayNum + '/' + params.row.choicesNum);
							}
						} else {
							this.tableColumnList[item.key].render = (h, params) => {
								return h('p', {}, this.statusTrans(params.row[item.key]));
							}
						}
					}
				})

				//固定列尾 操作按钮
				this.tableColumnList.action = {
					title: '操作',
					key: 'action',
					width: 100,
					align: 'center',
					fixed: 'right',
					render: (h, params) => {
						//接案管理相关操作
						if(this.from == "caseManage") {
							if(params.row.status == 'unreceive') {
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
													this.showModal(4, params.row)
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
								if(params.row.menuId != this.pId) {
									//分配 &&驳回
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
								} else { //分配
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
							if(params.row.status == 'assigned') {
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
													name: 'docu.connectedit',
													query: {
														studentId: params.row.stuId,
														groupId: params.row.groupId,
														menuId:this.pId
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
				this.changeTableColumns(false) //渲染列表列头
			},
			//状态显示转换
			statusTrans(key) {
				let val = this.statusTransObj[key] || key
				return val
			},
			//重组列显示
			getTable2Columns() {
				let data = [this.tableColumnList.expand];
				for(let key in this.tableColumnList) {
					//从所有备选显示列中抽取选中的列
					if(this.tableColumnsChecked.indexOf(key) > -1) {
						data.push(this.tableColumnList[key])
					}
				}
				data.push(this.tableColumnList.action)
				return data;
			},
			//选择可显示列后触发方法
			changeTableColumns(toEmit) {
				if(toEmit) {
					this.$emit('updateColunmsCheck', this.tableColumnsChecked)
				}
				this.tableColumns = this.getTable2Columns();
			},
			reopenExpand(data){
				let tableData =  this.tableData
				this.tableData = []
				tableData.forEach((item, index)=>{
					if(item.id == data.id) {
						item._expanded = true
					}
				})
				
				let _this = this
				setTimeout(()=>{
					_this.tableData  =  tableData
					_this.$forceUpdate()
				},100)
			},
		},
		watch: {
			historyCheckResult: function(newValue, oldValue) {
				this.tableColumnList = {}
				this.tableFilterTags = [] //列表筛选项
				this.showCheckColumns = false //是否显示可选列
				this.tableColumns = [] //要最终显示的，绑定在table上的列集合
				this.tableColumnsChecked = [] //列已选项
				this.tableColumnsForCheck = [] //列备选项
				this.getTableSelect()
			},
			tableData: function(newValue, oldValue) {
				if(this.reLoadParentData) {
					this.reopenExpand(this.reLoadParentData)
					this.reLoadParentData = ''
				}
			}
		}
	}
</script>