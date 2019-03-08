<style lang="less">
	.plan_taskList {
		.tit {
			height: 40px;
			padding-left: 20px;
			line-height: 40px;
			background: #EEEEEE;
			border-radius: 4px;
			.iconfont {
				cursor: pointer;
			}
			.name {
				display: inline-block;
				padding: 0 0 0 10px;
				font-size: 14px;
				position: relative;
				top: -1px;
			}
			a {
				margin-left: 20px;
			}
		}
		.title{
			padding: 14px 12px 0;
			font-size: 14px;
		}
	}
</style>

<template>
	<div class="plan_taskList">
		<div>
			<div class="tit">
				<i class="iconfont icon--" v-if="isShow" @click="close(index)"></i>
				<i class="iconfont icon-icon-test1" v-else @click="open(index)"></i>
				<span class="name">{{item.name}}</span>
				<a href="javascript:void(0);" v-if="item.isSys!=1" @click="editTit(index)">[编辑]</a>
				<a href="javascript:void(0);" v-if="item.isSys!=1 && item.isDelete" @click="delTask(item,index)">[删除]</a>
			</div>
			<div v-if="item.listData.list">
				<!--<div class="content" v-if="item.isSys==1 && (item.phase!='essay'||item.phase!='essay') && item.listData.list[0].status!='finish'" v-show="isShow" style="padding-top: 14px;">
					<div class="operate">
						<Button type="primary" class="but" @click="handleRender(item)">{{item.name}}</Button>
						<span v-if="item.listData.list" style="margin-left: 12px;">
						<a href="javascript:void(0);" v-if="item.listData.list.length" v-show="item.listData.list[0].status!='finish'" @click="setTime" :style="{color:item.listData.list[0].status=='due'?'#e6cf8a !important':'#44bcb7 !important'}">[&nbsp;<span v-text="new Date(item.listData.list[0].startTime).format('yyyy-MM-dd')"></span> - <span v-text="new Date(item.listData.list[0].endTime).format('yyyy-MM-dd')"></span>&nbsp;]</a><span v-show="item.listData.list[0].status=='finish'" style="color: #999;">已完成</span>
						</span>
					</div>
				</div>-->
				<div class="title" v-if="item.tplType=='choiceSchool'&&isShow&&item.listData.list.length">
					xxx同学申请学校数量总计 <span style="color:#44bcb7;font-size: 14px;">10</span> 所，已定校  <span style="color:#44bcb7;font-size: 14px;">5</span> 所。
				</div>
				<task-info :o-data="item" :index="index" :priorityList="priorityList" :tallyList="tallyList" :crewlist="crewlist" @editTask="editTask" @open="open" @addTask="addTask" @hidAbandon="hidAbandon" @hidFinish="hidFinish" @setTime="setTime" @handleRender="handleRender" v-show="isShow"></task-info>
			</div>
		</div>

		<Modal ref="setTimeBox" v-model="setTimeModel" width="470" class-name="setTimeModel plan_common_modal vertical-center-modal" @on-ok="setTimeOk('setTimeForm1')">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				设置{{item.name}}时间
			</p>
			<div>
				<Form ref="setTimeForm1" :model="setTimeForm" :label-width="98">
					<FormItem prop="name" label="预计开始时间：">
						<DatePicker disabled v-model="setTimeForm.startTime" format="yyyy-MM-dd" type="date" placeholder="请选择时间" style="width: 300px"></DatePicker>
					</FormItem>
					<FormItem prop="describe" label="预计完成时间：">
						<DatePicker v-model="setTimeForm.endTime" format="yyyy-MM-dd" type="date" placeholder="请选择时间" style="width: 300px"></DatePicker>
					</FormItem>
				</Form>
			</div>
		</Modal>
	</div>
</template>

<script>
	import taskInfo from "./taskInfo.vue";
	import valid, {
		errors,
		plFile,
		sys,
		plServiceGroup,
		plTask,
		common,
		plReport,
		plServiceMember,
		remind,
		plSchool
	} from "../../libs/request.js";
	export default {
		props: {
			item: {
				type: Object,
				default: function() {
					return {};
				}
			},
			filter: {
				type: Object,
				default: function() {
					return {};
				}
			},
			quest: {
				type: String,
				default: function() {
					return '';
				}
			},
			isAll: {
				type: Number,
				default: function() {
					return 1;
				}
			},
			priorityList: {
				type: Array,
				default: function() {
					return [];
				}
			},
			tallyList: {
				type: Array,
				default: function() {
					return [];
				}
			},
			crewlist: {
				type: Array,
				default: function() {
					return [];
				}
			},
			index: {
				type: Number,
				required: true,
			},
		},
		data() {
			return {
				//				item:this.taskData,
				setTimeModel: false,
				setTimeForm: {
					startTime: "",
					endTime: ""
				},
				isShow: false,
				school:{
					name:'',
					selected:0,
					total:0
				}
			}
		},
		components: {
			taskInfo,
		},
		created() {
			let params6 = {
				flag: 0,
				groupId: this.$route.params.gid,
				isAll: this.isAll,
				parentId: this.item.id,
				phase: this.item.phase,
				type: this.filter.type,
				tags: this.filter.tags,
				priority: this.filter.priority,
				name: this.quest
			}
			if(this.item.isSys == '1') {
				params6.flag = 0;
			} else {
				params6.flag = 0;
				this.item.isFinishShow = false;
				this.item.isAbandonShow = false;
			}
			common.plListData(params6).then(valid.call(this)).then(res => {
				if(res.ok) {
					let arr1 = res.data.data;
					if(arr1.list.length) {
						arr1.list.forEach((val, key) => {
							val.progress = Number(val.progress);
							if(val.progress > 0) {
								val.isSliderShow = true;
							} else {
								val.isSliderShow = false;
							}
							val.operatorShow = false;
							val.privacyShow = false;
						})
					}
					this.item.listData = arr1;
					console.log(this.item.listData)
				}
			}).catch(errors.call(this));
			if(this.item.tplType=='choiceSchool'){
				let params7={
					serviceGroupId:this.$route.params.gid
				}
				plSchool.choiceAndSignNumber(params7).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.school={
							name:res.data.data.studentName,
							selected:res.data.data.signCount,
							total:res.data.data.totalCount
						}
					}
				}).catch(errors.call(this));
			}
		},
		methods: {
			getList() {
				console.log(111)
				let params5 = {
					flag: 0,
					groupId: this.$route.params.gid,
					isAll: this.isAll,
					parentId: this.item.id,
					phase: this.item.phase,
					type: this.filter.type,
					tags: this.filter.tags,
					priority: this.filter.priority,
					name: this.quest
				}
				if(this.item.isSys == '1') {
					params5.flag = 0;
				} else {
					params5.flag = 0;
				}
				common.plListData(params5).then(valid.call(this)).then(res => {
					if(res.ok) {
						let arr = res.data.data;
						if(arr.list.length) {
							arr.list.forEach((val, key) => {
								val.progress = Number(val.progress);
								if(val.progress > 0) {
									val.isSliderShow = true;
								} else {
									val.isSliderShow = false;
								}
								val.operatorShow = false;
								val.privacyShow = false;
							})
						}
						this.item.listData = arr;
						console.log(this.item.listData)
					}
				}).catch(errors.call(this));
			},
			hidAbandon() {
				this.$emit('hidAbandon');
			},
			hidFinish() {
				this.$emit('hidFinish');
			},
			//			hasData(item) {
			//				let flag = false;
			//				if(item.abortList) {
			//					if(item.abortList.length || item.finishList.length || item.undoneList.length) {
			//						flag = false;
			//					} else {
			//						flag = true;
			//					}
			//				};
			//				return flag
			//			},
			close(ind) {
				this.isShow = false;
				this.item.isShow = false;
			},
			open() {
				this.item.isShow = true;
				this.isShow = true;
				this.getList();
			},
			editTit(ind) {
				this.$emit('editTit', ind);
			},
			delTask(item, ind) {
				this.$emit('delTask', item, ind);
			},
			handleRender(item) {
				this.$emit('handleRender', item);
			},
			editTask(value, index, item) {
				this.$emit('editTask', value, index, item);
			},
			addTask(item, ind) {
				this.$emit("addTask", item, ind);
			},
			setTime(ind) {
				this.setTimeForm.startTime = this.item.listData.list[0].startTime;
				this.setTimeForm.endTime = this.item.listData.list[0].endTime;
				this.setTimeModel = true;
			},
			setTimeOk(name) {
				this.setTimeModel = true;
				this.$refs[name].validate((valid1) => {
					if(valid1) {
						let params5 = {
							id: this.item.listData.list[0].id,
							startTime: (new Date(this.setTimeForm.startTime)).format('yyyy-MM-dd hh:mm:ss'),
							endTime: (new Date(this.setTimeForm.endTime)).format('yyyy-MM-dd hh:mm:ss')
						}
						common.updateTime(params5).then(valid.call(this)).then(res => {
							if(res.ok) {
								this.setTimeModel = false;
								this.setTimeForm.startTime = '';
								this.setTimeForm.endTime = '';
								this.open();
							} else {
								this.$refs.setTimeBox.visible = true;
								this.setTimeModel = true;
							}
						}).catch(errors.call(this));
					} else {
						this.$refs.setTimeBox.visible = true;
						this.setTimeModel = true;
					}
				})
			},
		}
	}
</script>