<style lang="less">
	.plan_myTask {
		.message_box {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 20px 0;
			/*border-bottom: 1px #f7f7f7 solid;*/
			.via {
				width: 80px;
				height: 80px;
				background: #15C295;
				border-radius: 40px;
				color: #fff;
				line-height: 80px;
				font-size: 24px;
				text-align: center;
			}
			.message_list {
				flex: 1;
				margin-left: 10px;
				font-size: 14px;
				.message_top {
					.message_user {
						display: block;
						font-size: 18px;
						line-height: 1.8em;
					}
					.message_date {
						display: block;
						color: #999999;
					}
				}
			}
		}
		.search{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
</style>

<template>
	<div class="plan_myTask">
		<div class="message_box">
			<div class="via">
				头像
			</div>
			<div class="message_list">
				<div class="message_top">
					<span class="message_user">
	    					{{userInfo.name}}
    				</span>
					<span class="message_date">
	    					{{officeList.office}}-{{officeList.company}}
    				</span>
				</div>
			</div>
		</div>
		<div class="search">
			<v-select style="width: 296px;float: left;" placeholder="输入任务名称/任务执行人" icon="search" v-model="quest" k='cnname' :datafunc="searchDropList" @on-enter="textChange" @on-click="textChange" @selected="textChange">
			</v-select>
			<div class="searchGt">
				<Select v-model="phase" style="width: 216px;" @on-change="setPhase">
					<Option value=" ">全部服务组</Option>
					<Option :value="item.id" v-for="item in groupList" :key="item.id" :label="item.name">{{item.name}}</Option>
				</Select>
				<DatePicker class="sel" format="yyyy年MM月" v-model="endTime" type="date" placeholder="请选截止时间" @on-change="setEndTime"></DatePicker>
			</div>
		</div>
		<task-info :oData="taskList" :priorityList="priorityList" :tallyList="tallyList" :crewlist="crewlist" @hidAbandon="hidAbandon(taskList)" @hidFinish="hidFinish(taskList)" @open="open"></task-info>
	</div>
</template>

<script>
	import taskInfo from "./taskInfo.vue";
	import vSelect from '@public/modules/vSelect'
	import { mapState } from 'vuex';
	import valid, {
		errors,
		sys,
		plTask,
		plServiceGroup,
		common
	} from "../../libs/request.js";
	export default {
		data() {
			return {
				taskList: {
					isFinishShow: false,
					isAbandonShow: false,
					isSys: 0,
					isShow: true,
					listData: {}
				},
				endTime:'',
				phase: ' ',
				quest: '',
				officeList: {
					office: '',
					company: ''
				},
				priorityList: [],
				tallyList: [],
				crewlist: [],
				groupList: [],
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		components: {
			taskInfo,
			vSelect
		},
		mounted() {
			this.$nextTick(() => {
				let params = {
					id: this.userInfo.companyId
				}
				sys.officeForm(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.officeList.office = res.data.data.parentName.split('0')[0];
						this.officeList.company = res.data.data.name.split('0')[0];
					}
				}).catch(errors.call(this));
			})
		},
		created() {
			let params6 = {
				flag: 0,
				groupId: this.phase,//this.$route.params.gid
				isAll: 0,
				parentId: '',
				phase: '',
				name: this.quest
			}
			common.plListData(params6).then(valid.call(this)).then(res => {
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
					this.taskList.listData = arr;
				}
			}).catch(errors.call(this));
			let params3 = {
				type: 'pl_task_priority'
			}
			sys.dictListData(params3).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.priorityList = res.data.data;
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
			let params5 = {}
			common.plList(params5).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.groupList = res.data.data;
				}
			}).catch(errors.call(this));
		},
		methods: {
			open() {
				let params6 = {
					flag: 0,
					groupId: this.phase,//this.$route.params.gid
					isAll: 0,
					parentId: '',
					phase: '',
					name: this.quest,
				}
				if(!!this.endTime) {
					params6.endTime = (this.endTime).format('yyyy-MM-dd')
				}
				//				if(!!endTime){
				//					params6.endTime=(this.endTime).format('yyyy-MM-dd')
				//				}
				common.plListData(params6).then(valid.call(this)).then(res => {
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
						this.taskList.listData = arr;
					}
				}).catch(errors.call(this));
			},
			hidAbandon(item) {
				item.isAbandonShow = !item.isAbandonShow;
			},
			hidFinish(item) {
				item.isFinishShow = !item.isFinishShow;
			},
			searchDropList(word) {
				return new Promise((resolve, reject) => {});
			},
			textChange(val) {
				this.$nextTick(() => {
					this.open();
				})
			},
			setEndTime(){
				this.$nextTick(() => {
					this.open();
				})
			},
			setPhase(){
				this.$nextTick(() => {
					this.open();
				})
			}
		}
	}
</script>