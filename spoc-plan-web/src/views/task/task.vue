<style lang="less">
	.plan_task {
		padding: 26px 0 40px 0;
		.title {
			.lf {
				font-size: 16px;
				font-weight: bold;
				line-height: 44px;
			}
		}
		.feature {
			overflow: hidden;
			width: 100%;
			.button {
				float: right;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				.but {
					margin-left: 10px;
				}
				.drop {
					margin: 0 20px 0 10px;
					.dropBtn {
						background: #eeeeee;
						width: 22px;
						height: 30px;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 4px;
						cursor: pointer;
					}
				}
			}
		}
		.listInfo {
			font-size: 12px;
			line-height: 46px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.mess {
				float: left;
				span {
					font-size: 16px;
					&.green {
						color: #44bcb7;
					}
					&.red {
						color: #cf8585;
					}
				}
			}
			.isAll {
				float: right;
			}
		}
		.main {
			padding: 10px 0;
			.box {
				padding-bottom: 30px;
				width: 100%;
			}
		}
		.imgBg {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.5);
			line-height: 180vh;
			z-index: 1999;
			text-align: center;
			img {
				height: 80vh;
				display: inline-block;
			}
			&.hid {
				display: none;
			}
		}
	}
	
	.plan_plan_common_modal {
		.width180 {
			width: 180px;
		}
		.width590 {
			width: 592px;
		}
	}
	
	.plan_addModal {
		.fileList {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 40px;
			padding: 4px 0;
		}
		.btnright {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.upbtn {
				margin-right: 12px;
			}
		}
	}
	
	.plan_TaskTemplateModel {
		.template {
			overflow: auto;
			padding-top: 0px;
			/*display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: stretch;
			flex-wrap: wrap;*/
			.ivu-btn {
				width: 150px;
				height: 46px;
				margin: 10px 20px 10px 0;
			}
		}
		.footer {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			.ivu-btn {
				width: 120px;
				height: 35px;
				margin: 10px 5px;
			}
		}
		.ivu-modal-footer {
			display: none;
		}
	}
	
	.plan_addTaskModel {
		.ivu-form-item {
			margin-bottom: 20px;
		}
		.addTaskBody {
			height: 70vh;
			overflow-y: auto;
		}
	}
	
	.plan_delModel {
		.footer {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			.ivu-btn {
				width: 120px;
				height: 35px;
				margin: 10px 5px;
			}
		}
		.ivu-modal-footer {
			display: none;
		}
	}
	
	.plan_meetModel {
		.meetBody {
			height: 80vh;
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
		.mettFooter {
			display: flex;
			justify-content: space-around;
			align-items: center;
		}
	}
</style>

<template>
	<div class="plan_task">
		<div class="title">
			<span class="lf">任务</span>
		</div>
		<div class="feature">
			<v-select style="width: 296px;float: left;" placeholder="输入任务名称/任务执行人" icon="search" v-model="quest" k='cnname' :datafunc="searchDropList" @on-enter="textChange" @on-click="textChange" @selected="textChange">
			</v-select>
			<filter-box :tags="filter.tags" :serviceList="serviceList" :genreList="genreList" :tallyList="tallyList" :priorityList="priorityList" @serviceClick="serviceClick" @tallyClick="tallyClick" @genreClick="genreClick" @priorityClick="priorityClick"></filter-box>
			<div class="button">
				<Button type="primary" class="but" @click="addTaskListbut">添加任务列表</Button>
				<Dropdown class="drop" @on-click="controlAll">
					<div class="dropBtn">
						<Icon type="android-more-vertical" style="font-size: 24px;"></Icon>
					</div>
					<DropdownMenu slot="list">
						<DropdownItem name="close">折叠所有任务列表</DropdownItem>
						<DropdownItem name="open">展开所有任务列表</DropdownItem>
					</DropdownMenu>
				</Dropdown>
				<Button type="primary" class="but" @click="jump('taskList')">任务清单</Button>
				<Button type="primary" class="but" v-if="!isSaler">导入任务</Button>
			</div>
		</div>
		<div class="listInfo">
			<div class="mess">
				累计创建 <span class="green">{{countData.allCount}}</span> 项任务， <span class="green">{{countData.doingCount}}</span> 项待完成， <span class="green">{{countData.finishCount}}</span> 项已完成，放弃 <span class="red">{{countData.abortCount}}</span> 项。
			</div>
			<div class="isAll">
				<span>我的任务</span>
				<i-switch v-model="isAll" @on-change="change" :true-value="1" :false-value="0"></i-switch>
				<span>全部任务</span>
			</div>
		</div>
		<div class="main">
			<div class="box" v-for="(item,index) in listSection" :key="index" v-show="!((item.tplType=='essay'||item.tplType=='choiceSchool'||item.tplType=='apply')&&$route.query.parent=='group')">
				<task-list ref="index" :item="item" :quest="quest" :filter="filter" :isAll="isAll" :index="index" :priorityList="priorityList" :tallyList="tallyList" :crewlist="crewlist" @editTit="editTit" @delTask="delTask" @handleRender="handleRender(item)" @editTask="editTask" @addTask="addTask" @hidAbandon="hidAbandon(item)" @hidFinish="hidFinish(item)"></task-list>
			</div>
		</div>

		<Modal ref="addTaskListModal" v-model="addTaskListModel" width="730" class-name="addTaskListModal plan_common_modal vertical-center-modal" @on-cancel="closeAddTaskListModel" @on-ok="addTaskList('addTaskListForm1')">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				<span v-text="isEditTit?'编辑':'添加'"></span>任务列表
			</p>
			<div>
				<Form ref="addTaskListForm1" :model="addTaskListForm" :rules="addTaskListRules" :label-width="106">
					<FormItem label="选择服务阶段：" prop="stage">
						<Select v-model="addTaskListForm.stage" style="width: 300px;" disabled v-if="this.$route.query.parent=='group'">
							<Option :value="item.value" v-for="item in serviceList" :key="item.id">{{item.label}}</Option>
						</Select>
						<Select v-model="addTaskListForm.stage" style="width: 300px;" v-else>
							<Option :value="item.value" v-for="item in serviceList" :key="item.id">{{item.label}}</Option>
						</Select>
					</FormItem>
					<FormItem prop="name" label="名称：">
						<Input type="text" v-model="addTaskListForm.name" class="width180">
						</Input>
					</FormItem>
					<FormItem prop="describe" label="描述：">
						<Input type="textarea" :rows="4" v-model="addTaskListForm.describe" class="width590">
						</Input>
					</FormItem>
					<input type="hidden" v-model="addTaskListForm.sort" />
				</Form>
			</div>
		</Modal>
		<Modal ref="TaskTemplateBox" v-model="TaskTemplateModel" width="730" class-name="plan_TaskTemplateModel plan_common_modal vertical-center-modal" @on-ok="">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				添加任务
			</p>
			<div>
				<p style="line-height: 22px;font-size: 16px;font-weight: bold;">选择任务模板</p>
				<div class="template">
					<Button :type="item.value==template.id?'primary':'ghost'" v-for="(item,index) in templateList" :key="item.id" @click="selTemplate(item)" v-if="item.formId">{{item.label}}</Button>
				</div>
			</div>
			<div class="footer">
				<Button @click="closeTaskTemplateModel">取消</Button>
				<Button type="primary" @click="taskTemplateOk">确定</Button>
			</div>
		</Modal>
		<Modal ref="delBox" v-model="delModel" width="730" class-name="plan_delModel plan_common_modal vertical-center-modal">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				确认删除
			</p>
			<div style="height: 180px;">
				<div style="line-height:100px;font-size: 16px;text-align: center;font-weight: 700;">
					是否删除当前任务
				</div>
				<div class="footer">
					<Button @click="delModel=false">取消</Button>
					<Button type="primary" @click="delOk">确定</Button>
				</div>
			</div>
		</Modal>
		<Modal v-model="meetModel" width="730" class-name="plan_meetModel plan_common_modal vertical-center-modal">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				<span v-text="isSeeMeet?'添加':'查看'"></span>初始会议
			</p>
			<div class="meetBody" v-if="meetXFormShow">
				<p class="warn">
					<i class="iconfont icon-tishi"></i> 以下内容为建议在初始会议中进行讨论的事项，您可以在此进行记录，或使用其他任何习惯的方式进行。
				</p>
				<xformview ref="meetxForm" :viewmode="!isSeeMeet" :fid="meetFormId" :uid="xFormId" />
			</div>
			<div slot="footer" class="mettFooter" v-show="isSeeMeet">
				<Button @click="saveMeet">保存会议内容</Button>
				<Button type="primary" @click="toFinishMeet">完成初始会议</Button>
			</div>
		</Modal>

		<Modal v-model="addTaskModel" width="730" class-name="plan_addTaskModel plan_common_modal vertical-center-modal" @on-visible-change="planAddTaskVisible">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				<span v-text="isEditTask?'编辑':'添加'"></span>{{template.label}}
			</p>
			<div v-if="addXform" class="addTaskBody">
				<Form ref="addTaskForm1" :model="addTaskForm" :rules="addTaskRuler" :label-width="120">
					<FormItem prop="stage" label="选择服务阶段：">
						<Select v-model="addTaskForm.stage" style="width: 300px;" disabled v-if="this.$route.query.parent=='group'">
							<Option :value="item.value" v-for="item in serviceList" :key="item.id">{{item.label}}</Option>
						</Select>
						<Select v-model="addTaskForm.stage" style="width: 300px;" v-else>
							<Option :value="item.value" v-for="item in serviceList" :key="item.id">{{item.label}}</Option>
						</Select>
					</FormItem>
					<FormItem prop="operator" label="任务执行人：">
						<Select v-model="addTaskForm.operator" style="width: 300px;">
							<Option v-for="item in crewlist" :key="item.id" :value="item.userId">{{item.name}}</Option>
						</Select>
					</FormItem>
					<FormItem prop="type" label="选择任务类型：">
						<Select v-model="addTaskForm.type" style="width: 300px;">
							<Option v-for="item in genreList" :key="item.id" :value="item.value">{{item.label}}</Option>
						</Select>
					</FormItem>
					<FormItem prop="privacy" label="任务隐私性：">
						<Select v-model="addTaskForm.privacy" style="width: 300px;">
							<Option value="0">公开（项目组内成员可见）</Option>
							<Option value="1">私有（仅自己及任务执行人可见）</Option>
						</Select>
					</FormItem>
					<FormItem prop="name" label="任务名称：">
						<Input v-model="addTaskForm.name"></Input>
					</FormItem>
					<FormItem prop="tag" label="任务标签：">
						<CheckboxGroup v-model="addTaskForm.tag">
							<Checkbox v-for="item in tallyList" :key="item.id" :label="item.id">{{item.name}}</Checkbox>
						</CheckboxGroup>
					</FormItem>
					<FormItem prop="startTime" label="起止时间：" required>
						<DatePicker type="datetime" v-model="addTaskForm.startTime" format="yyyy-MM-dd HH:mm" placeholder="开始时间" style="width: 150px"></DatePicker>
						-
						<DatePicker type="datetime" v-model="addTaskForm.endTime" format="yyyy-MM-dd HH:mm" placeholder="结束时间" style="width: 150px"></DatePicker>
					</FormItem>
					<xformview ref="xForm" :groupId="this.$route.params.gid" :fid="isEditTask?addTaskForm.tableId:template.formId" :paddingx="120" :uid="xFormId" :pid="pid" v-if="addTaskForm.tableId||template.formId" />
					<!--<FormItem prop="remark" label="备注：">
						<Input v-model="addTaskForm.remark" type="textarea" :rows="4" placeholder="Enter something..."></Input>
					</FormItem>-->
				</Form>
			</div>
			<div slot="footer">
				<Button @click="closeAddTaskModel">取消</Button>
				<Button type="primary" @click="addTaskOk('addTaskForm1')">确定</Button>
			</div>
		</Modal>
		<Modal v-model="addModal" width="473" class-name="plan_addModal">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				<span v-text="attachmentList.length>0?'查看':'添加'"></span>文件
			</p>
			<div>
				<Form ref="formFile" :label-width="100" class="formFile">
					<FormItem label="选择学生:" style="margin-bottom: 14px;" class="scan">
						{{studentName}}
					</FormItem>
					<FormItem label="附件:" style="margin-bottom: 14px;" class="scan">
						<div>
							<div>
								<div v-for="(item,index) in attachmentList" :key="index" class="fileList">
									<a href="javascript:void(0);" style="display: inline-block;line-height: 22px;width: 260px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" v-text="item.fileName" @click="jumpView(item)"></a>
									<a href="javascript:void(0);" style="display: inline-block;line-height: 22px;color: red !important;" @click="delFile1(item.id,index)" v-show="formList.auditStatus!='pass' && formList.auditStatus!='commit'">删除</a>
								</div>
							</div>
						</div>
						<div class="btnright" v-show="formList.auditStatus!='pass' && formList.auditStatus!='commit'">
							<!--<Upload class="upbtn" multiple ref="upload" name="files" :data="{'objectId':this.groupId,'type':'pl_report','dirName':'all','isOverride':0,'fileType':'all'}" :show-upload-list="false" :on-success="handleSuccess" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="uploadFile">-->
							<Button type="primary" @click="onUploadLocal" style="margin-right: 12px;">本地上传</Button>
							<!--</Upload>-->
							<Button type="primary" @click="addByPan">从云盘添加</Button>
						</div>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button @click="closeAdd">关闭</Button>
				<Button type="primary" @click="addOk">确定</Button>
			</div>
		</Modal>
		<div v-if="pan.show">
			<yunpan @on-confirm="doSendFile" @on-cancel="doCancel" :visible="pan.visible" :detector="detector"></yunpan>
		</div>
		<up-to-pan ref="uptopan" :object-id="this.reportId" :serviceGroupId="gInfo.id" :dir="(gInfo.folderName?'/'+gInfo.folderName:'')+'/plan/report'" type="pl_report" fileType="all" @uploadok="onUploadOk" :detector="detector" />
		<div class="imgBg" :class="{hid:imgBgShow}" @click="hidImg" v-if="!imgBgShow">
			<img :src="displayUrl(imgPath,imgName)" />
		</div>
	</div>
</template>

<script>
	import taskList from "./plan_taskList.vue";
	import yunpan from "@public/modules/yunpan";
	import vSelect from '@public/modules/vSelect'
	import xformview from '../xform/xformview'
	import filterBox from "./filter.vue";
	import upToPan from '../../modules/planUpToPan';
	import { mapState } from 'vuex';
	import valid, {
		errors,
		sys,
		plServiceGroup,
		plTask,
		plReport,
		remind,
		common,
	} from "../../libs/request.js";
	export default {
		props: {
			pid: {
				type: [Number, String],
				required: true,
			},
			groupInfo: {
				type: Object,
				required: true,
			}
		},
		data() {
			const validateDate = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请添加开始时间'));
				} else {
					if(this.addTaskForm.endTime == '') {
						callback(new Error('请添加结束时间'));
					}
					callback();
				}
			};
			return {
				imgBgShow: true,
				imgName: '',
				imgPath: "",
				detector: {
					type: 'name',
					condition: '',
					content: ''
				},
				meetFormId: '',
				//				formIdMap: {
				//					'metting': '70a20dd1f5ae416eae6a538030bd3884',
				//					'exam': 'a4c7c4f1e098480691b3cfd1aeb8d21d',
				//					'score': '2ff1beaf6b9441b5ba6c0e262410db74',
				//					'prize': 'be62e2e797f4484fa8bff78a0d4ce690',
				//					'activity': 'd73c07abddda43d4b9df5d1a662d9fa0',
				//					'chat': '05175185a9f74740bb648c534ef7b474',
				//					'other': '3f2d2b67893f48d381acb6f465e37c4b',
				//					'suvey': 'cc72157afc334ae8a8a55e9860086d3b',
				//					'apply': '3618141e211d4c36b6972ddc4eb7457d',
				//					'train': '4e32d20d48c74cb19b88ccac4d54c19b'
				//				},
				meetId: '',
				isSeeMeet: false,
				meetXFormShow: false,
				meetModel: false,
				taskId: '',
				formList: {},
				delModel: false,
				isEditWarn: false,
				isEditTask: false,
				clickNum: '',
				addWarnForm: {
					id: '',
					user: '',
					time: '',
					type: ''
				},
				privacy: '',
				studentName: '',
				crewlist: [],
				clickId: '',
				groupId: this.$route.params.gid,
				TaskTemplateModel: false,
				serviceList: [],
				filter: {
					phase: this.$route.query.parent == 'group' ? '401' : '',
					type: '',
					tags: '',
					priority: '',
				},
				genreList: [],
				tallyList: [],
				priorityList: [],
				countData: {},
				listSection: [],
				quest: '',
				isAll: 1,
				percent: 0,
				addTaskListModel: false,
				addTaskListForm: {
					name: '',
					describe: '',
					sort: '',
					stage: ''
				},
				addTaskListRules: {
					stage: [{
						required: true,
						message: '阶段不能为空',
						trigger: 'change'
					}],
					name: [{
						required: true,
						message: '名称不能为空',
						trigger: 'blur'
					}],
				},
				isEditTit: false,
				addModal: false,
				addXform: false,
				attachmentList: [],
				attachList: [],
				pan: {
					visible: false,
					show: false
				},
				templateList: [],
				template: {
					id: '',
					label: '',
					value: '',
					formId: ''
				},
				addTaskModel: false,
				addTaskForm: {
					stage: '',
					operator: '',
					type: '',
					privacy: '',
					name: '',
					tag: [],
					startTime: '',
					endTime: '',
					remark: '',
					tableId: ''
				},
				addTaskRuler: {
					stage: [{
						required: true,
						message: '服务阶段不能为空',
						trigger: 'change'
					}, ],
					type: [{
						required: true,
						message: '任务类型不能为空',
						trigger: 'change'
					}, ],
					privacy: [{
						required: true,
						message: '隐私性不能为空',
						trigger: 'change'
					}, ],
					name: [{
						required: true,
						message: '任务名称不能为空',
						trigger: 'blur'
					}, ],
					tag: [{
						required: true,
						type: 'array',
						min: 1,
						max: 8,
						message: '请添加1-8个任务标签',
						trigger: 'change'
					}, ],
					startTime: [{
						validator: validateDate,
						trigger: 'change'
					}],
					content: [{
						required: true,
						message: '内容不能为空',
						trigger: 'blur'
					}, ],
				},
				xFormId: '',
				userName: '',
				reportId: '',
				gInfo: {}
			}
		},
		computed: {
			...mapState(['userInfo']),
			isSaler() {
				return this.userInfo.roleMap[this.pid] == '705'
			},
		},
		components: {
			vSelect,
			yunpan,
			filterBox,
			taskList,
			xformview,
			upToPan
		},
		created() {
			let params6 = {
				id: this.$route.params.gid
			}
			common.plGetGroupInfo(params6).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.gInfo = res.data.data.groupInfo;
				}
			}).catch(errors.call(this));
			let params = {
				id: this.$route.params.gid,
			}
			common.plGetPhase(params).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.serviceList = res.data.data;
				}
			}).catch(errors.call(this));
			let params1 = {
				types: 'pl_task_type'
			}
			sys.batchListData(params1).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.genreList = res.data.data.pl_task_type;
				}
			}).catch(errors.call(this));

			let params2 = {
				parent: '4001'
			}
			common.listData(params2).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.tallyList = res.data.data;
				}
			}).catch(errors.call(this));
			let params3 = {
				types: 'pl_task_priority'
			}
			sys.batchListData(params3).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.priorityList = res.data.data.pl_task_priority;
				}
			}).catch(errors.call(this));
			let params4 = {
				isAll: this.isAll,
				groupId: this.$route.params.gid,
				phase: this.filter.phase,
				type: this.filter.type,
				tags: this.filter.tags,
				priority: this.filter.priority,
				name: this.quest,
			}
			if(this.$route.query.parent == 'group') {
				params4.phase = '401';
			}
			common.countData(params4).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.countData = res.data.data;
				}
			}).catch(errors.call(this));
			let params5 = {
				groupId: this.$route.params.gid,
			}
			if(this.$route.query.parent == 'group') {
				params5.phase = '401';
			}
			common.listSection(params5).then(valid.call(this)).then(res => {
				if(res.ok) {
					let arr = res.data.data;
					arr.forEach((v, k) => {
						v.isShow = false;
						v.listData = [];
						if(v.isSys == '1') {} else {
							v.isFinishShow = false;
							v.isAbandonShow = false;
						}
					})
					this.listSection = arr;
				}
			}).catch(errors.call(this));

			let params7 = {
				serviceGroupId: this.$route.params.gid,
			}
			common.listUser(params7).then(valid.call(this)).then(res => {
				if(res.ok) {
					let arr = [];
					arr = res.data.data.members;
					this.crewlist = arr;
				}
			}).catch(errors.call(this));
		},
		methods: {
			displayUrl(p, n) {
				return sys.downloadPan(p, n);
			},
			hidAbandon(item) {
				item.isAbandonShow = !item.isAbandonShow;
			},
			hidFinish(item) {
				item.isFinishShow = !item.isFinishShow;
			},
			getTit() {
				let params4 = {
					isAll: this.isAll,
					groupId: this.$route.params.gid,
					phase: this.filter.phase,
					type: this.filter.type,
					tags: this.filter.tags,
					priority: this.filter.priority,
					name: this.quest,
				}
				common.countData(params4).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.countData = res.data.data;
					}
				}).catch(errors.call(this));
				let params5 = {
					groupId: this.$route.params.gid,
				}
				common.listSection(params5).then(valid.call(this)).then(res => {
					if(res.ok) {
						let arr = res.data.data;
						arr.forEach((v, k) => {
							v.listData = [];
							if(v.isSys == '1') {} else {
								v.isFinishShow = false;
								v.isAbandonShow = false;
							}
						})
						this.listSection = arr;
						this.$nextTick(() => {
							setTimeout(() => {
								this.listSection.forEach((v, k) => {
									this.getList(k);
								})
							}, 20)
						})
					}
				}).catch(errors.call(this));
			},
			searchDropList(word) {
				return new Promise((resolve, reject) => {});
			},
			textChange(val) {
				this.$nextTick(() => {
					this.getTit();
				})
			},
			change() {
				this.$nextTick(() => {
					this.getTit();
				})
			},
			closeAddTaskListModel() {
				this.addTaskListModel = false;
				this.isEditTit = false;
			},
			addTaskList(name) {
				this.addTaskListModel = true;
				this.$refs[name].validate((valid1) => {
					if(valid1) {
						let params5 = {
							parent: 0,
							isSection: 1,
							groupId: this.$route.params.gid,
							name: this.addTaskListForm.name,
							description: this.addTaskListForm.describe,
							phase: this.addTaskListForm.stage,
							menuId: this.addTaskListForm.stage,
						}
						if(this.isEditTit) {
							params5.id = this.clickId;
							params5.sort = this.addTaskListForm.sort;
						}
						common.taskSave(params5).then(valid.call(this)).then(res => {
							if(res.ok) {
								this.addTaskListModel = false;
								this.addTaskListForm.name = '';
								this.addTaskListForm.describe = '';
								this.addTaskListForm.sort = '';
								this.isEditTit = false;
								this.getTit();
							} else {
								this.$refs.addTaskListModal.visible = true;
								this.addTaskListModel = true;
							}
						}).catch(errors.call(this));
					} else {
						this.$refs.addTaskListModal.visible = true;
						this.addTaskListModel = true;
					}
				})

			},
			serviceClick(val) {
				this.filter.phase = val;
				this.getTit();
			},
			genreClick(val) {
				this.filter.type = val;
				this.getTit();
			},
			tallyClick(val) {
				this.filter.tags = val;
				this.getTit();
			},
			priorityClick(val) {
				this.filter.priority = val;
				this.getTit();
			},
			controlAll(val) {
				if(val == 'open') {
					this.listSection.forEach((v, k) => {
						this.open(k);
					})
				} else {
					this.listSection.forEach((v, k) => {
						this.close(k);
					})
				}
			},
			editTit(ind) {
				this.isEditTit = true;
				this.clickId = this.listSection[ind].id;
				this.addTaskListForm.name = this.listSection[ind].name;
				this.addTaskListForm.describe = this.listSection[ind].description;
				this.addTaskListForm.sort = this.listSection[ind].sort;
				this.addTaskListForm.stage = this.listSection[ind].phase;
				this.addTaskListModel = true;
			},
			showMeetModel() {
				this.meetXFormShow = true;
				this.$nextTick(() => {
					this.meetModel = true;
				})
			},
			closeMeetModel() {
				this.meetModel = false;
				setTimeout(() => {
					this.meetXFormShow = false;
				}, 500)
			},
			saveMeet() {
				if(this.$refs.meetxForm.valid()) {
					if(this.userNameId == this.userInfo.id) {
						this.$nextTick(() => {
							this.$refs.meetxForm.save().then(res => {
								if(res.ok) {
									let params = {
										id: this.meetId
									};
									common.updateIsRed(params).then(valid.call(this)).then(res => {
										if(res.ok) {
											this.getTit();
											this.closeMeetModel();
										}
									}).catch(errors.call(this));
								}
							});
						})
					} else {
						this.$Message.error('非当前任务执行人，不允许保存任务');
					}
				}
			},
			toFinishMeet() {
				if(this.$refs.meetxForm.valid()) {
					this.$Modal.confirm({
						onOk: () => {
							if(this.userNameId == this.userInfo.id) {
								this.$nextTick(() => {
									this.$refs.meetxForm.save().then(res => {
										if(res.ok) {
											let params = {
												id: this.meetId
											};
											let params1 = {
												status: 'finish',
												id: this.xFormId
											}
											common.updateIsRed(params1).then(valid.call(this)).then(res => {
												if(res.ok) {

													common.updateStatus(params1).then(valid.call(this)).then(res => {
														if(res.ok) {
															this.$Message.success({
																content: res.data.message
															});
															this.getTit();
															this.closeMeetModel();
														}
													}).catch(errors.call(this));
												}
											}).catch(errors.call(this));
										}
									});
								})
							} else {
								this.$Message.error('非当前任务执行人，不允许完成任务');
							}
						},
						onCancel: function() {
							return false;
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
							}, '确定完成' + this.studentName + '学生的初始会议？')
						}
					});
				}
			},
			handleRender(item) {
				if(item.tplType == 'metting') {
					this.xFormId = item.listData.list[0].id;
					this.meetFormId = item.listData.list[0].tableId || '';
					if(item.listData.list[0].status == 'finish') {
						this.isSeeMeet = false;
					} else {
						this.isSeeMeet = true;
					}
					this.showMeetModel();
					this.studentName = item.listData.list[0].studentName;
					this.userNameId = item.listData.list[0].executorId;
					this.meetId = item.listData.list[0].id;
				} else {
					this.reportId = item.listData.list[0].id;
					if(this.listSection.find((value, index, arr) => {
							return value.tplType == "metting";
						}).listData.list[0].status != 'finish') {
						this.$Modal.confirm({
							render: (h) => {
								return h('div', {
									style: {
										width: "370px",
										height: "40px",
										textAlign: 'center',
										fontSize: '16px',
										fontWeight: '700'
									},
								}, '初始会议未完成， 暂不能添加规划报告。 ')
							}
						})
					} else if(item.listData.list[0].newReport) {
						this.addReport(item);
					} else {
						let params = {
							id: item.listData.list[0].id
						}
						plReport.form(params).then(valid.call(this)).then(res => {
							if(res.ok) {
								this.attachmentList = res.data.data.attachmentList;
								this.taskId = res.data.data.id;
								this.formList = res.data.data;
								this.detector.content = this.attachmentList.map(item => item.fileName).join(',');
								this.addReport(item);
							}
						}).catch(errors.call(this));
					}
				}
			},
			finishMeet(item) {
				if(!this.groupInfo.studentId) {
					return true;
				}
				if(!this.listSection.find((value, index, arr) => {
						return value.tplType == "metting";
					}).listData.list.length) {
					this.$Modal.confirm({
						onOk: function() {
							return false;
						},
						onCancel: function() {
							return false;
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
							}, '初始会议未完成， 暂不能添加任务。 ')
						}
					});
					return false;
				}
				if(this.listSection.find((value, index, arr) => {
						return value.tplType == "metting";
					}).listData.list[0].status != 'finish' && item.tplType != 'metting') {
					this.$Modal.confirm({
						onOk: function() {
							return false;
						},
						onCancel: function() {
							return false;
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
							}, '初始会议未完成， 暂不能添加任务。 ')
						}
					});
					return false;
				} else {
					return true;
				}

			},
			addOk() {
				if(this.attachList.length) {
					let params1 = {
						taskId: this.listSection.find((value, index, arr) => {
							return value.tplType == "report";
						}).listData.list[0].id,
						attachmentList: this.attachList
					}
					if(this.listSection.find((value, index, arr) => {
							return value.tplType == "report";
						}).listData.list[0].newReport == false) {
						params1.id = this.listSection.find((value, index, arr) => {
							return value.tplType == "report";
						}).listData.list[0].id;
					}
					plReport.save(params1).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.$Message.success(res.data.message);
							this.attachmentList = [];
							this.addModal = false;
							this.listSection.find((value, index, arr) => {
								return value.tplType == "report";
							}).listData.list[0].attachmentList = this.attachList;
							this.getList(1);
						}
					}).catch(errors.call(this));
				} else {
					this.getList(1);
					this.listSection.find((value, index, arr) => {
						return value.tplType == "report";
					}).listData.list[0].attachmentList = this.attachList;
					this.addModal = false;
				}
			},
			addByPan() {
				this.pan.show = true;
				this.pan.visible = true;
				this.detector.content = this.attachmentList.map(item => item.fileName).join(',');
				this.detector.condition = 'different';
			},
			addReport(item) {
				this.addModal = true;
				this.studentName = item.listData.list[0].studentName;
				if(item.listData.list[0].newReport) {
					return true;
				}
				let params1 = {
					id: item.listData.list[0].id
				}
				plReport.form(params1).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.attachList = res.data.data.attachmentList;
					}
				}).catch(errors.call(this));
			},
			addTask(item, ind) {
				if(this.finishMeet(item)) {
					this.TaskTemplateModel = true;
					this.clickNum = ind;
					this.clickId = item.id;
					this.template.id = '';
					this.template.label = '';
					this.template.value = '';
					this.template.formId = '';
					common.showDictNew({
						type: 'com_form_tpl_kind_task'
					}).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.templateList = res.data.data;
						}
					}).catch(errors.call(this));
					console.log(item.phase)
					this.addTaskForm.stage = item.phase ? item.phase : '401';
				}
			},
			open(val) {
				this.$refs.index[val].open();
			},
			getList(val) {
				this.$refs.index[val].getList();
			},
			close(val) {
				this.$refs.index[val].close();
			},
			selTemplate(item) {
				if(this.template.id == item.value) {
					this.template.id = '';
					this.template.label = '';
					this.template.value = '';
					this.template.formId = '';
				} else {
					this.template.id = item.value;
					this.template.label = item.label;
					this.template.value = item.value;
					this.template.formId = item.formId;
				}
			},
			showAddTaskModel() {
				this.addXform = true;
				this.$nextTick(() => {
					this.addTaskModel = true;
				})
			},
			closeAddTaskModel() {
				console.log(this.$refs.addTaskForm1)
				if(this.$refs.addTaskForm1) {
					this.$refs.addTaskForm1.resetFields();
					this.isEditTask = false;
					this.addXform = false;
					this.xFormId = '';
					setTimeout(() => {
						this.addTaskForm = {
								stage: '',
								operator: '',
								type: '',
								privacy: '',
								name: '',
								tag: [],
								startTime: '',
								endTime: '',
								remark: '',
								tableId: ''
							},
							this.addTaskModel = false;
					}, 100)
				}
			},
			addTaskOk(name) {
				this.$refs[name].validate((valid1) => {
					if(this.$refs.xForm) {
						if(this.$refs.xForm.valid()) {

						} else {
							return false;
						}
					}
					if(valid1) {
						let params5 = {
							parent: this.clickId,
							isSection: 0,
							groupId: this.$route.params.gid,
							name: this.addTaskForm.name,
							phase: this.addTaskForm.stage,
							type: this.addTaskForm.type,
							tplType: this.template.value,
							executorId: this.addTaskForm.operator,
							visibility: this.addTaskForm.privacy,
							description: this.addTaskForm.remark,
							startTime: (new Date(this.addTaskForm.startTime)).format('yyyy-MM-dd hh:mm:ss'),
							endTime: (new Date(this.addTaskForm.endTime)).format('yyyy-MM-dd hh:mm:ss'),
							tags: this.addTaskForm.tag.join(','),
							tableId: this.template.formId,
						}
						if(this.isEditTask) {
							params5.id = this.addTaskForm.id;
							params5.tplType = this.addTaskForm.tplType;
							params5.tableId = this.addTaskForm.tableId;
						}
						common.taskSave(params5).then(valid.call(this)).then(res => {
							if(res.ok) {
								this.xFormId = res.data.data.id;
								this.$nextTick(() => {
									if(this.$refs.xForm) {
										this.$refs.xForm.save().then((res) => {
											this.closeAddTaskModel();
											this.open(this.clickNum);
											this.closeTaskTemplateModel();
										});
									} else {
										this.closeAddTaskModel();
										this.open(this.clickNum);
										this.closeTaskTemplateModel();
									}
								})
							} else {
								this.addTaskModel = true;
							}
						}).catch(errors.call(this));
					} else {
						this.addTaskModel = true;
					}
				})
			},
			closeTaskTemplateModel() {
				this.TaskTemplateModel = false;
				this.template.id = '';
				this.template.label = '';
				this.template.value = '';
				this.template.formId = '';
			},
			taskTemplateOk() {
				this.showAddTaskModel();
				this.addTaskForm.operator = this.userInfo.id;
			},
			editTask(val, num, item) {
				this.xFormId = val.id
				this.clickId = item.id;
				this.clickNum = num;
				this.isEditTask = true;
				this.addTaskForm = {
						id: val.id,
						stage: val.phase,
						operator: val.executorId,
						type: val.type,
						privacy: val.visibility,
						name: val.name,
						tag: val.tagList.map(item => item.id),
						startTime: val.startTime,
						endTime: val.endTime,
						remark: val.description,
						tplType: val.tplType,
						tableId: val.tableId
					},
					this.showAddTaskModel();
			},
			delTask(item, ind) {
				this.clickId = item.id;
				this.clickNum = ind;
				this.delModel = true;
			},
			delOk() {
				let params1 = {
					id: this.clickId
				}
				common.taskDelete(params1).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.listSection.splice(this.clickNum, 1);
						this.delModel = false;
					}
				}).catch(errors.call(this));
			},
			jump(name) {
				let urlName = '';
				if(this.$route.name == 'plan.portal.task') {
					urlName = name + '.msg';
				} else if(this.$route.name == 'plan.task') {
					urlName = name;
				}
				this.$router.push({
					name: 'plan.' + urlName,
					query: {
						parent: 'group'
					},
					params: {
						gid: this.$route.params.gid
					}
				})
			},
			delFile1(id, ind) {
				if(id) {
					let params = {
						'id': id
					}
					sys.delete(params).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.$Message.success(res.data.message);
							this.attachmentList.splice(ind, 1);
							this.attachList.splice(ind, 1);
						}
					}).catch(errors.call(this));
				}
			},
			closeAdd() {
				this.attachmentList = [];
				this.addModal = false;
				this.listSection[1].listData.list[0].attachmentList = this.attachList;
			},
			onUploadLocal() {
				this.$refs.uptopan.doUpload();
			},
			onUploadOk(data) {
				if(data.status == "success") {
					this.attachmentList.push(data.data);
					this.attachList.push(data.data);
				} else {
					this.$Message.error(data.message);
				}
			},
			doSendFile(item) {
				console.log(item)
				let params = {
					"panFilePath": item.dir,
					"filePath": (this.gInfo.folderName ? '/' + this.gInfo.folderName : '') + '/plan/report',
					"fileName": item.name,
					'objectId': this.groupId,
					"type": 'pl_report',
					"isCover": 0,
					"menuId": '401'
				}
				sys.uploadPanFileToPan(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						console.log(res)
						if(res.data.statusCode == "204") {
							this.$Modal.confirm({
								onOk: () => {
									params.isCover = 1;
									sys.uploadPanFileToPan(params).then(valid.call(this)).then(res => {
										this.attachmentList.push(res.data.data);
										this.attachList.push(res.data.data);
										this.getList(1);
										this.doCancel();

									}).catch(errors.call(this));
								},
								onCancel: () => {},
								render: (h) => {
									return h('div', {
										style: {
											width: "370px",
											height: "40px",
											textAlign: 'center',
											fontSize: '16px',
											fontWeight: '700'
										},
									}, res.data.message)
								}
							})
						} else {
							this.attachmentList.push(res.data.data);
							this.attachList.push(res.data.data);
							this.getList(1);
							this.doCancel();
						}
					}
				}).catch(errors.call(this));
			},
			doCancel() {
				this.panclose();
			},
			panclose() {
				setTimeout(() => {
					this.pan.show = false;
					this.pan.visible = false;
				}, 300);
			},
			planAddTaskVisible(v) {
				if(!v) {
					this.closeAddTaskModel();
				}
			},
			addTaskListbut() {
				if(this.$route.query.parent == 'group') {
					this.addTaskListForm.stage = '401';
				} else {
					this.addTaskListForm.stage = '';
				}
				this.addTaskListModel = true;
			},
			jumpView(item) {
				let imgmap = {
					png: 1,
					jpg: 1,
					gif: 1,
					psd: 1,
					jpeg: 1,
					bmp: 1,
				}
				if(imgmap[item.fileName.split('.')[1].toLowerCase()]) {
					this.seeImg(item);
				} else {
					window.open(`https://portal.ivygate.cn/index.php/webutils/document/${item.fileId}`);
				}
			},
			seeImg(val) {
				this.imgName = val.fileName;
				this.imgPath = val.filePath;
				this.imgBgShow = false;
			},
			hidImg() {
				this.imgBgShow = true;
			},
		}
	}
</script>