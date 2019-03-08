<style lang="less">
	.taskReview {
		padding-top: 26px;
		.review_title {
			overflow: hidden;
			border-bottom: 1px #e0e0e0 solid;
			.showBtn {
				float: right;
				font-size: 14px;
			}
			.headline {
				/*height: 44px;*/
				padding-left: 32px;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				font-size: 16px;
				flex-wrap: wrap;
				position: relative;
				.finishFlag {
					position: absolute;
					top: 0;
					left: 0;
				}
				.info-name {
					font-weight: 600;
					margin-right: 12px;
				}
				.tag_box {
					margin-left: 12px;
				}
				.check {
					cursor: pointer;
				}
			}
			.review_info {
				padding-left: 30px;
				font-size: 14px;
			}
			.describe {
				padding: 10px 0 14px 30px;
				font-size: 14px;
			}
		}
		.addTaskBody{
			padding: 30px 0px;
			border-bottom: 1px #e0e0e0 solid;
			position: relative;
			overflow: hidden;
			.hidBtn {
				float: right;
				font-size: 14px;
			}
			.editBtn{
				width: 80px;
				height: 35px;
				font-size: 14px;
				position: absolute;
				top: 30px;
				right: 0;
				z-index: 99;
			}
		}
		.review_list {
			padding: 30px 0;
			.review_list_info {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				height: 46px;
				i {
					line-height: 12px;
				}
				.list_time {
					color: #b0b0b0;
					margin: 0 40px 0 20px;
					font-size: 14px;
				}
				.review_cont {
					font-size: 14px;
				}
			}
		}
		.tab {
			margin-bottom: 10px;
			.ivu-tabs-bar {
				border: none;
			}
		}
		.review_message {
			.message_box {
				// height: 94px;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding-bottom: 20px;
				border-bottom: 1px #f7f7f7 solid;
				.via,
				.via img {
					width: 36px;
					height: 36px;
					background: #15C295;
					border-radius: 18px
				}
				.message_list {
					flex: 1;
					margin-left: 10px;
					font-size: 14px;
					.message_top {
						line-height: 36px;
						margin-top: 20px;
						.message_date {
							margin-left: 30px;
							color: #999999;
						}
					}
					.redact {
						float: right;
						a {
							margin: 0 5px;
						}
					}
				}
			}
			.message_box:last-child {
				border: none;
			}
		}
		.message_textarea {
			padding-top: 10px;
			.btn_box {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				padding: 10px 0;
				.ivu-btn {
					margin: 0 10px;
				}
			}
		}
	}
	
</style>

<template>
	<div class="taskReview">
		<div class="review_title">
			<Button type="primary" class="showBtn" @click="showTask" v-if="!isShowTask"><span>展开任务详情</span>&nbsp;<span>▼</span></Button>
			<div class="headline">
				<span @click="setStatusOn('finish')" v-if="infoList.status!='finish'" class="finishFlag"><Icon type="ios-checkmark-outline" size="24" class="check"></Icon></span>
				<span @click="setStatusOn('doing')" v-else class="finishFlag"><Icon type="ios-checkmark" size="24" class="check" color="#3ca6a1e8"></Icon></span>
				<span class="info-name">{{infoList.name}}</span>
				<div class="percent">(&nbsp;<span v-text="infoList.progress==''||infoList.progress==null?0:infoList.progress"></span>%&nbsp;)</div>
				<div class="tag_box">
					<Tag color="#3ca6a1e8" class="tag" v-for="(val,ind) in infoList.tagList" :key="ind">{{val.name}}</Tag>
				</div>
			</div>
			<div class="review_info">
				（{{infoList.userName}} | <span v-text="(new Date(infoList.endTime)).format('yyyy-MM-dd')"></span>）
			</div>
			<div class="describe">
				{{infoList.description}}
			</div>
		</div>
		<div class="addTaskBody" v-show="isShowTask">
			<Button type="primary" class="editBtn" @click="editTask" v-if="!isFinish">编辑</Button>
			<Button type="primary" class="editBtn" @click="addTaskOk('addTaskForm1')" v-if="!isFinish&&isEditTask">保存</Button>
			<Form ref="addTaskForm1" :model="addTaskForm" :rules="addTaskRuler" :label-width="106">
				<FormItem prop="stage" label="选择服务阶段：">
					<Select v-model="addTaskForm.stage" style="width: 300px;" :disabled="isFinish||!isEditTask">
						<Option :value="item.value" v-for="item in serviceList" :key="item.id">{{item.label}}</Option>
					</Select>
				</FormItem>
				<FormItem prop="operator" label="任务执行人：">
					<Select v-model="addTaskForm.operator" style="width: 300px;" :disabled="isFinish||!isEditTask">
						<Option v-for="item in crewlist" :key="item.id" :value="item.userId">{{item.name}}</Option>
					</Select>
				</FormItem>
				<FormItem prop="type" label="选择任务类型：">
					<Select v-model="addTaskForm.type" style="width: 300px;" :disabled="isFinish||!isEditTask">
						<Option v-for="item in genreList" :key="item.id" :value="item.value">{{item.label}}</Option>
					</Select>
				</FormItem>
				<FormItem prop="privacy" label="任务隐私性：">
					<Select v-model="addTaskForm.privacy" style="width: 300px;" :disabled="isFinish||!isEditTask">
						<Option value="0">公开（项目组内成员可见）</Option>
						<Option value="1">私有（仅自己及任务执行人可见）</Option>
					</Select>
				</FormItem>
				<FormItem prop="name" label="任务名称：">
					<Input v-model="addTaskForm.name" :disabled="isFinish||!isEditTask"></Input>
				</FormItem>
				<FormItem prop="tag" label="任务标签：">
					<CheckboxGroup v-model="addTaskForm.tag">
						<Checkbox v-for="item in tallyList" :key="item.id" :label="item.id" :disabled="isFinish||!isEditTask">{{item.name}}</Checkbox>
					</CheckboxGroup>
				</FormItem>
				<FormItem prop="startTime" label="起止时间：" required>
					<DatePicker type="date" v-model="addTaskForm.startTime" format="yyyy-MM-dd HH:mm" placeholder="开始时间" style="width: 150px" :disabled="isFinish||!isEditTask"></DatePicker>
					-
					<DatePicker type="date" v-model="addTaskForm.endTime" format="yyyy-MM-dd HH:mm" placeholder="结束时间" style="width: 150px" :disabled="isFinish||!isEditTask"></DatePicker>
				</FormItem>
				<!--<div>
						<FormItem prop="duration" label="沟通时长：">
							<Input v-model="addTaskForm.duration" disabled placeholder="Enter your name"></Input>
						</FormItem>
						<FormItem prop="content" label="沟通内容：">
							<Input v-model="addTaskForm.content" type="textarea" :rows="4" placeholder="Enter something..."></Input>
						</FormItem>
					</div>-->
				<xformview ref="xForm" :fid="formIdMap[addTaskForm.tplType]" :uid="xFormId" v-if="formIdMap[addTaskForm.tplType]" :viewmode="isFinish||!isEditTask" />
				<!--<FormItem prop="remark" label="备注：">
						<Input v-model="addTaskForm.remark" type="textarea" :rows="4" placeholder="Enter something..."></Input>
					</FormItem>-->
			</Form>
			<Button type="primary" class="hidBtn" @click="hidTask" v-if="isShowTask"><span>收起任务详情</span>&nbsp;<span>▲</span></Button>
		</div>
		<div class="review_list">
			<div class="review_list_info" v-for="(item,index) in reviewList" :key="index">
				<i class="iconfont" :class="iconMap[item.type]"></i>
				<div class="list_time" v-text="(new Date(item.createTime)).format('MM-dd hh:mm')">
				</div>
				<div class="review_cont">
					{{item.content}}
				</div>
			</div>
		</div>
		<Tabs class="tab">
			<TabPane label="评论"></TabPane>
		</Tabs>
		<div class="review_message">
			<div class="message_box" v-for="(item,index) in reviewList1" :key="index">
				<div class="via">
					<img :src="item.userPhoto || defaultImg" />
				</div>
				<div class="message_list">
					<div class="message_top">
						<span class="message_user">
	    					{{item.userName}}
	    				</span>
						<span class="message_date" v-text="(new Date(item.createTime)).format('MM-dd hh:mm')">
	    					
	    				</span>
						<div class="redact">
							<a href="javascript:void(0);" @click="edit(item)">[编辑]</a>
							<a href="javascript:void(0);" @click="del(item)">[删除]</a>
						</div>
					</div>
					<div class="message_button">
						{{item.content}}
					</div>
				</div>
			</div>
		</div>
		<div class="message_textarea">
			<Input v-model="massage" type="textarea" :rows="4"></Input>
			<div class="btn_box">
				<Button type="ghost" @click="messageNull">取消</Button>
				<Button type="primary" @click="messageUp">发表评论</Button>
			</div>
		</div>
		<!--<Modal ref="addTaskBox" v-model="addTaskModel" width="730" class-name="addTaskModel common_modal vertical-center-modal" @on-ok="addTaskOk('addTaskForm1')" @on-cancel="closeAddTaskModel">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				<span v-text="isFinish?'查看':'编辑'"></span>任务
			</p>
			<div class="addTaskBody">
				<Form ref="addTaskForm1" :model="addTaskForm" :rules="addTaskRuler" :label-width="106">
					<FormItem prop="stage" label="选择服务阶段：">
						<Select v-model="addTaskForm.stage" style="width: 300px;" :disabled="isFinish">
							<Option :value="item.value" v-for="item in serviceList" :key="item.id">{{item.label}}</Option>
						</Select>
					</FormItem>
					<FormItem prop="operator" label="任务执行人：">
						<Select v-model="addTaskForm.operator" style="width: 300px;" :disabled="isFinish">
							<Option v-for="item in crewlist" :key="item.id" :value="item.userId">{{item.name}}</Option>
						</Select>
					</FormItem>
					<FormItem prop="type" label="选择任务类型：">
						<Select v-model="addTaskForm.type" style="width: 300px;" :disabled="isFinish">
							<Option v-for="item in genreList" :key="item.id" :value="item.value">{{item.label}}</Option>
						</Select>
					</FormItem>
					<FormItem prop="privacy" label="任务隐私性：">
						<Select v-model="addTaskForm.privacy" style="width: 300px;" :disabled="isFinish">
							<Option value="0">公开（项目组内成员可见）</Option>
							<Option value="1">私有（仅自己及任务执行人可见）</Option>
						</Select>
					</FormItem>
					<FormItem prop="name" label="任务名称：">
						<Input v-model="addTaskForm.name" :disabled="isFinish"></Input>
					</FormItem>
					<FormItem prop="tag" label="任务标签：">
						<CheckboxGroup v-model="addTaskForm.tag">
							<Checkbox v-for="item in tallyList" :key="item.id" :label="item.id" :disabled="isFinish">{{item.name}}</Checkbox>
						</CheckboxGroup>
					</FormItem>
					<FormItem prop="startTime" label="起止时间：" required>
						<DatePicker type="date" v-model="addTaskForm.startTime" format="yyyy-MM-dd HH:mm" placeholder="开始时间" style="width: 150px" :disabled="isFinish"></DatePicker>
						-
						<DatePicker type="date" v-model="addTaskForm.endTime" format="yyyy-MM-dd HH:mm" placeholder="结束时间" style="width: 150px" :disabled="isFinish"></DatePicker>
					</FormItem>
					<div>
						<FormItem prop="duration" label="沟通时长：">
							<Input v-model="addTaskForm.duration" disabled placeholder="Enter your name"></Input>
						</FormItem>
						<FormItem prop="content" label="沟通内容：">
							<Input v-model="addTaskForm.content" type="textarea" :rows="4" placeholder="Enter something..."></Input>
						</FormItem>
					</div>
					<xformview ref="xForm" :fid="formIdMap[addTaskForm.tplType]" :uid="xFormId" v-if="formIdMap[addTaskForm.tplType]" :viewmode="isFinish" />
					<FormItem prop="remark" label="备注：">
						<Input v-model="addTaskForm.remark" type="textarea" :rows="4" placeholder="Enter something..."></Input>
					</FormItem>
				</Form>
			</div>
			<div slot="footer" style="display: none;" v-if="isFinish"></div>
		</Modal>-->
	</div>
</template>

<script>
	import { assets } from "../../../../spoc-portal/libs/assets.js";
	import xformview from '../xform/xformview'
	import valid, {
		errors,
		plFile,
		sys,
		plServiceGroup,
		plTask,
		plReport,
		common,
		remind
	} from "../../libs/request.js";
	export default {
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
				formIdMap: {
					'metting': '70a20dd1f5ae416eae6a538030bd3884',
					'exam': 'a4c7c4f1e098480691b3cfd1aeb8d21d',
					'score': '2ff1beaf6b9441b5ba6c0e262410db74',
					'prize': 'be62e2e797f4484fa8bff78a0d4ce690',
					'activity': 'd73c07abddda43d4b9df5d1a662d9fa0',
					'chat': '05175185a9f74740bb648c534ef7b474',
					'other': '3f2d2b67893f48d381acb6f465e37c4b',
					'suvey': '2ff1beaf6b9441b5ba6c0e262410db74',
					'apply': '3618141e211d4c36b6972ddc4eb7457d',
					'train': '4e32d20d48c74cb19b88ccac4d54c19b'
				},
				iconMap: {
					'create': "icon-tianjia2",
					'excute': "icon-wo1",
					'edit': "icon-xiugai",
					'finish': "icon-wancheng",
					'doing': "icon-jihuo",
					'abort': "icon-fangqi"
				},
				infoList: {},
				reviewList: [],
				reviewList1: [],
				serviceList: [],
				massage: '',
				clickId: '',
				taskId: '',
//				addTaskModel: false,
				isEditTask: false,
				isShowTask:true,
				addTaskForm: {
					stage: '',
					operator: '',
					type: '',
					privacy: '',
					name: '',
					tag: [],
					startTime: '',
					endTime: '',
					duration: '',
					content: "",
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
				crewlist: [],
				genreList: [],
				tallyList: [],

			}
		},
		computed: {
			defaultImg() {
				return assets.defaultAvatar;
			},
			isFinish() {
				return this.infoList.status == 'finish'
			}
		},
		components: {
			xformview,
		},
		created() {
			this.$emit('changeTab', 'task');
			let params = {
				taskId: this.$route.query.taskId
			}
			common.detailList(params).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.reviewList = res.data.data;
				}
			}).catch(errors.call(this));
			let params5 = {
				taskId: this.$route.query.taskId,
				type: 'comment'
			}
			common.detailList(params5).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.reviewList1 = res.data.data;
				}
			}).catch(errors.call(this));
			let params2 = {
				id: this.$route.params.gid,
			}
			common.plGetPhase(params2).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.serviceList = res.data.data;
				}
			}).catch(errors.call(this));
			let params1 = {
				id: this.$route.query.taskId
			}
			common.plForm(params1).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.xFormId = res.data.data.id;
					this.infoList = res.data.data;
					this.taskId = this.$route.query.taskId;
					this.addTaskForm = {
						stage: this.infoList.phase,
						operator: this.infoList.executorId,
						type: this.infoList.type,
						privacy: this.infoList.visibility,
						name: this.infoList.name,
						tag: this.infoList.tagList.map(item => item.id),
						startTime: this.infoList.startTime,
						endTime: this.infoList.endTime,
						duration: '',
						content: '',
						remark: this.infoList.description,
						sort: this.infoList.sort,
						tplType: this.infoList.tplType,
						tableId: this.infoList.tableId
					}
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
			let params3 = {
				type: 'pl_task_type'
			}
			sys.dictListData(params3).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.genreList = res.data.data;
				}
			}).catch(errors.call(this));
			let params4 = {
				parent: '4001'
			}
			common.listData(params4).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.tallyList = res.data.data;
				}
			}).catch(errors.call(this));
		},
		methods: {
			getList() {
				let params = {
					taskId: this.$route.query.taskId
				}
				common.detailList(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.reviewList = res.data.data;
					}
				}).catch(errors.call(this));
				let params5 = {
					taskId: this.$route.query.taskId,
					type: 'comment'
				}
				common.detailList(params5).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.reviewList1 = res.data.data;
					}
				}).catch(errors.call(this));
				let params1 = {
					id: this.$route.query.taskId
				}
				common.plForm(params1).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.infoList = res.data.data;
						this.taskId = this.$route.query.taskId;
						this.addTaskForm = {
							stage: this.infoList.phase,
							operator: this.infoList.executorId,
							type: this.infoList.type,
							privacy: this.infoList.visibility,
							name: this.infoList.name,
							tag: this.infoList.tagList.map(item => item.id),
							startTime: this.infoList.startTime,
							endTime: this.infoList.endTime,
							duration: '',
							content: '',
							remark: this.infoList.description,
							sort: this.infoList.sort,
							tplType: this.infoList.tplType,
							tableId: this.infoList.tableId
						}
					}
				}).catch(errors.call(this));
			},
			edit(item) {
				this.xFormId = item.id
				this.massage = item.content;
				this.clickId = item.id;
				this.taskId = item.taskId;
				this.addTaskForm = {
					stage: this.infoList.phase,
					operator: this.infoList.executorId,
					type: this.infoList.type,
					privacy: this.infoList.visibility,
					name: this.infoList.name,
					tag: this.infoList.tagList,
					startTime: this.infoList.startTime,
					endTime: this.infoList.endTime,
					duration: '',
					content: '',
					remark: this.infoList.description,
					sort: this.infoList.sort,
					tplType: this.infoList.tplType,
					tableId: this.infoList.tableId
				}
			},
			del(item) {
				let params1 = {
					id: item.id
				}
				common.detailDelete(params1).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.getList();
					}
				}).catch(errors.call(this));
			},
			messageNull() {
				this.massage = '';
				this.clickId = '';
			},
			messageUp() {
				if(this.massage == '') {
					return false;
				}
				let params1 = {
					taskId: this.taskId,
					content: this.massage
				}
				if(this.clickId != '') {
					params1.id = this.clickId;
				}
				common.detailSave(params1).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.massage = '';
						this.clickId = '';
						this.getList();
					}
				}).catch(errors.call(this));
			},
			showTask(){
				this.isShowTask=true;
			},
			hidTask(){
				this.isShowTask=false;
			},
			editTask(val, item) {
				this.isEditTask = true;
			},
			addTaskOk(name) {
//				this.addTaskModel = true;
				this.$refs[name].validate((valid1) => {
					if(valid1) {
						let params5 = {
							parent: this.infoList.parent.id,
							isSection: 0,
							groupId: this.$route.params.gid,
							name: this.addTaskForm.name,
							phase: this.addTaskForm.stage,
							type: this.addTaskForm.type,
							tplType: this.addTaskForm.tplType,
							executorId: this.addTaskForm.operator,
							visibility: this.addTaskForm.privacy,
							description: this.addTaskForm.remark,
							startTime: (new Date(this.addTaskForm.startTime)).format('yyyy-MM-dd hh:mm:ss'),
							endTime: (new Date(this.addTaskForm.endTime)).format('yyyy-MM-dd hh:mm:ss'),
							tags: this.addTaskForm.tag.join(','),
						}
						if(this.isEditTask) {
							params5.id = this.taskId;
							params5.tplType = this.addTaskForm.tplType;
							params5.tableId = this.addTaskForm.tableId;
						}
						common.taskSave(params5).then(valid.call(this)).then(res => {
							if(res.ok) {
								this.xFormId = res.data.data.id;
//								this.addTaskModel = false;
								this.isEditTask = false;
								this.getList();
							} else {
//								this.$refs.addTaskBox.visible = true;
								this.addTaskModel = true;
							}
						}).catch(errors.call(this));
					} else {
//						this.$refs.addTaskBox.visible = true;
//						this.addTaskModel = true;
					}
				})
			},
			closeAddTaskModel() {
				this.isEditTask = false;
//				this.addTaskModel = false;
				this.$refs.addTaskForm1.resetFields();
				let params1 = {
					id: this.$route.query.taskId
				}
				common.plForm(params1).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.infoList = res.data.data;
						this.taskId = this.$route.query.taskId;
						this.addTaskForm = {
							stage: this.infoList.phase,
							operator: this.infoList.executorId,
							type: this.infoList.type,
							privacy: this.infoList.visibility,
							name: this.infoList.name,
							tag: this.infoList.tagList.map(item => item.id),
							startTime: this.infoList.startTime,
							endTime: this.infoList.endTime,
							duration: '',
							content: '',
							remark: this.infoList.description,
							sort: this.infoList.sort,
							tplType: this.infoList.tplType,
							tableId: this.infoList.tableId
						}
					}
				}).catch(errors.call(this));
			},
			setStatusOn(val) {
				let params1 = {
					status: val,
					id: this.taskId
				}
				common.updateStatus(params1).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.getList();
					}
				}).catch(errors.call(this));
			}
		}
	}
</script>