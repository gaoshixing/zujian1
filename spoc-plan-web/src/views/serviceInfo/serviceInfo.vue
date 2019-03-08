<style lang="less">
	.group {
		height: 100%;
		.info {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			padding: 10px 0;
		}
		.group_name {
			margin-left: 10px;
			color: #00c0b8;
			font-size: 14px;
		}
		.nav {
			margin-left: 10px;
			flex: 1;
			display: flex;
			font-size: 12px;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			p {
				margin-left: 14px;
				color: #b6b6b6;
				span {
					color: #333333;
				}
			}
			a {
				margin-left: 20px;
			}
			.phase {
				flex: 1;
				text-align: right;
			}
		}
	}
</style>

<template>
	<div class="group">
		<div class="info">
			<i-circle :percent="80" :size="36" :stroke-width="8" :trail-width="8" stroke-color="#00c0b8" v-if="!workbench">
				<span class="demo-Circle-inner" style="font-size:12px;color: #56c1bc;">80%</span>
			</i-circle>
			<div class="group_name">
				{{infoList.groupName}}
			</div>
			<div class="nav">
				<a href="javascript:void(0);">
					<create-or-edit-group :pid="pid" modelName="规划" @editGroupSuccess="editGroupSuccess" title="编辑服务组" type='edit' spanContent="设置"></create-or-edit-group>
				</a>
				<p>学生：<span>{{infoList.studentName}}</span></p>
				<div v-for="(item,index) in infoList.schooleList" :key="index" v-if="item">
					<p>毕业学校：<span v-text="item.schoolName || '暂无'"></span></p>
					<p>GPA：<span v-text="item.gpa || '暂无'"></span></p>
				</div>
				<p>托福：<span v-text="infoList.toeflScore || '暂无'"></span></p>
				<p>申请类别：<span>{{infoList.studentApplySeasonLabel}}</span></p>
				<p>入学季：<span>{{infoList.studentApplyTime}}</span></p>
				<a href="javascript:void(0);" @click="seeMore">查看更多</a>
				<div class="phase">当前服务阶段：[ {{this.phase}} ]</div>
			</div>
		</div>
		<Tabs v-model="tabName" @on-click="jump" v-if="!(workbench||($route.params.showHead===false))">
			<TabPane label="总览" name="pandect" v-if="groupList.setting01"></TabPane>
			<TabPane label="人员" name="crew" v-if="groupList.setting02"></TabPane>
			<TabPane label="任务" name="task" v-if="groupList.setting03"></TabPane>
			<TabPane label="文件" name="file" v-if="groupList.setting04"></TabPane>
			<TabPane label="甘特图" name="gantt" v-if="groupList.setting05"></TabPane>
			<TabPane label="日历" name="todolList" v-if="groupList.setting06"></TabPane>
			<TabPane label="账单" name="bill" v-if="groupList.setting07"></TabPane>
			<TabPane label="记事本" name="notepad" v-if="groupList.setting08"></TabPane>
		</Tabs>
		<router-view @changeTab="changeTab" v-if="groupInfo && pid && !workbench" :pid="pid" :group-info="groupInfo">
		</router-view>
	</div>
</template>

<script>
	import createOrEditGroup from '@public/modules/createOrEditGroup';
	import valid, {
		errors,
		plServiceGroup,
		common,
		sys,
	} from "../../libs/request.js";
	export default {
		props: {
			pid: {
				type: [Number, String],
				required: true,
			},
			workbench: {
				type: Boolean,
				required: false,
			},
		},
		data() {
			return {
				tabName: 'crew',
				infoList: {},
				phase: [],
				groupList: {},
				groupInfo: null,
				urls: this.$route.name.split('.')[1]
			}
		},
		components: {
			createOrEditGroup
		},
		created() {
			console.log(this.$route.name == 'plan.taskReview.msg')
			if(this.$route.name == 'plan.taskReview.msg') {
				this.tabName = 'taskReview.msg';
			} else {
				this.tabName = this.$route.name.split('.')[1];
				if(this.tabName == 'serviceInfo') {
					this.tabName = 'crew';
				}
				this.jump(this.tabName);
			}

			let params = {
				id: this.$route.params.gid || this.pid
			}
			common.plStudentData(params).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.infoList = res.data.data
				}
			}).catch(errors.call(this));
			let params1 = {
				flag: 1,
				id: this.$route.params.gid || this.pid
			}
			common.plGetPhase(params1).then(valid.call(this)).then(res => {
				if(res.ok) {
					if(res.data.data.length > 1) {
						this.phase = res.data.data.map(item => item.label).join('/');
					} else if(res.data.data.length == 1) {
						this.phase = res.data.data[0].label;
					} else {
						this.phase = '暂无';
					}
				}
			}).catch(errors.call(this));
			let params2 = {
				id: this.$route.params.gid || this.pid
			}
			common.plGetGroupInfo(params2).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.groupInfo = res.data.data.groupInfo
					this.groupList = JSON.parse(res.data.data.groupInfo.settings);
				}
			}).catch(errors.call(this));
		},
		mounted() {},
		methods: {
			changeTab(val) {
				this.tabName = val;
			},
			jump(name) {
				this.tabName = name;
				this.$router.push({
					name: 'plan.' + this.tabName,
					query: {
						parent: 'group'
					},
					params: {
						gid: this.$route.params.gid || this.pid
					}
				})
			},
			editGroupSuccess(settings) {
				this.groupList = settings;
			},
			seeMore() {
				this.$router.push({
					name: 'plan.addStudent',
					query: {
						studentId: this.infoList.studentId,
						menuId: '401'
					}
				})
			}
		},
		watch: {
			pid: {
				handler() {
					if(this.$route.name == 'plan.taskReview.msg') {
						this.tabName = 'taskReview.msg';
					} else {
						this.tabName = this.$route.name.split('.')[1];
						if(this.tabName == 'serviceInfo') {
							this.tabName = 'crew';
						}
						this.jump(this.tabName);
					}

					let params = {
						id: this.$route.params.gid || this.pid
					}
					common.plStudentData(params).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.infoList = res.data.data
						}
					}).catch(errors.call(this));
					let params1 = {
						flag: 1,
						id: this.$route.params.gid || this.pid
					}
					common.plGetPhase(params1).then(valid.call(this)).then(res => {
						if(res.ok) {
							if(res.data.data.length > 1) {
								this.phase = res.data.data.map(item => item.label).join('/');
							} else if(res.data.data.length == 1) {
								this.phase = res.data.data[0].label;
							} else {
								this.phase = '暂无';
							}
						}
					}).catch(errors.call(this));
					let params2 = {
						id: this.$route.params.gid || this.pid
					}
					common.plGetGroupInfo(params2).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.groupInfo = res.data.data.groupInfo
							this.groupList = JSON.parse(res.data.data.groupInfo.settings);
						}
					}).catch(errors.call(this));
				},
				immediate: true
			},
			urls: {
				handler() {
					console.log(this.$route)
					this.tabName = this.$route.name.split('.')[1];
					if(this.tabName == 'serviceInfo') {
						this.tabName = 'crew';
					}
				}
			}
		}
	}
</script>