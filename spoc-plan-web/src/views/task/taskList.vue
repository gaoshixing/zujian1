<style lang="less">
	.taskList {
		.ivu-form-item-label {
			color: #999999;
		}
		padding-top: 26px;
		.title {
			.lf {
				font-size: 16px;
				font-weight: bold;
				line-height: 44px;
			}
		}
		.taskList_info {
			padding: 20px 0;
			.row {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				align-items: flex-start;
				.list {
					width: 480px;
					margin-bottom: 4px;
				}
			}
		}
		.feature {
			overflow: hidden;
			width: 100%;
			margin-bottom: 20px;
			.filter {
				.ivu-select-dropdown {
					width: 100px;
				}
				.btn {
					width: 32px;
					height: 32px;
					padding: 0;
					margin: 0;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
			.count {
				float: right;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				line-height: 40px;
				font-size: 14px;
				font-weight: 700;
				.num {
					font-size: 16px;
					color: #44bcb7;
				}
			}
		}
		.btnlist {
			border: 1px solid #e0e0e0;
			position: relative;
			background: #fafafa;
			height: 40px;
			line-height: 38px;
			border-radius: 2px;
			.ivu-btn {
				margin: 0 5px;
			}
			.lineSide {
				position: absolute;
				left: -1px;
				top: -1px;
				height: 40px;
				width: 5px;
				background: #43bbb6;
				border-radius: 2px 0 0 2px;
			}
			.tit {
				padding-left: 20px;
				float: left;
			}
			.btnright {
				position: absolute;
				right: 20px;
				top: -1px;
				.btn {
					display: inline-block;
				}
				.ivu-dropdown-item {
					text-align: center;
				}
			}
		}
		.main {
			width: 100%;
			min-width: 960px;
			padding: 30px 0 30px 0;
			position: relative;
			.task-list-info {
				&.ivu-card {
					box-shadow: 0 0 15px #888;
				}
				margin-bottom: 30px;
				width: 100%;
				position: relative;
				.task-tit {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					margin-bottom: 4px;
					.info-name {
						font-size: 14px;
						color: #44bcb7;
						font-weight: 600;
						margin: 0 10px;
					}
					.percent {
						margin-right: 20px;
					}
				}
				.task-list-content {
					.infoForm {
						.list {
							margin-bottom: 4px;
						}
					}
				}
			}
			.page-box {
				display: flex;
				justify-content: center;
				margin-top: 20px;
			}
			.noList {
				width: 100%;
				text-align: center;
				span {
					background: url(http://localhost:8080/assets/tableDataEmptyd29c8f0.png);
					padding-bottom: 50px;
					display: inline-block;
					padding-top: 160px;
					color: #aaa;
					background-repeat: no-repeat;
					background-position: center 40px;
					min-width: 200px;
				}
			}
		}
	}
</style>

<template>
	<div class="taskList">
		<div class="title">
			<span class="lf">任务清单</span>
		</div>
		<div class="taskList_info">
			<Form :label-width="130" inline class="infoForm" inline>
				<div class="row">
					<FormItem label="学生姓名：" class="list">
						<a href="javascript:void(0);">{{studentList.studentName}}</a>
					</FormItem>
					<FormItem label="服务组创建时间：" class="list">
						<span v-text="(new Date(formatData(studentList.groupStartTime))).format('yyyy-MM-dd')"></span>&emsp;
						<a href="javascript:void(0);;" @click="jump('pandect')">（>>进服务组）</a>
					</FormItem>
				</div>
				<div class="row">
					<FormItem label="入学季：" class="list">
						{{studentList.studentApplyTime}}
					</FormItem>
					<FormItem label="规划老师：" class="list">
						{{studentList.planTeacherName}}
					</FormItem>
				</div>
			</Form>
		</div>
		<div class="feature">
			<v-select style="width: 296px;float: left;" placeholder="输入任务名称/任务执行人" icon="search" v-model="quest" k='cnname' :datafunc="searchDropList" @on-enter="textChange" @on-click="textChange" @selected="textChange">
			</v-select>
			<Dropdown class="filter" @on-click="tallyClick">
				<Button href="javascript:void(0)" class="btn">
					<Icon type="arrow-down-b" style="font-size: 16px;"></Icon>
				</Button>
				<DropdownMenu slot="list">
					<DropdownItem name="">全部</DropdownItem>
					<DropdownItem v-for="item in tallyList" :key="item.id" :name="item.id" :selected="tags==item.id">{{item.name}}</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<div class="count">
				任务总数：<span class="num">{{count}}</span>
			</div>
		</div>
		<div class="btnlist">
			<div class="lineSide"></div>
			<span class="tit">
				<Checkbox v-model="isCheckAll" @on-change="checkAll"><span v-text="isCheckAll?'取消全选':'全选'"></span></Checkbox>
			</span>
			<div class="btnright">
				<Dropdown trigger="click" style="margin-left: 20px" class="btn" @on-click="derive">
					<Button type="primary">导出PDF</Button>
					<DropdownMenu slot="list">
						<DropdownItem name="some">导出所选</DropdownItem>
						<DropdownItem name="all">导出全部</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
		</div>
		<div class="main">
			<CheckboxGroup v-model="fruit">
				<div v-for="(item,index) in infoList" v-if="item.status!='abort'" :key="index">
					<Card class="task-list-info">
						<div class="task-tit">
							<Checkbox :label="item.id">
								<a href="javascript:void(0);;" class="info-name" @click="jump1('taskReview',item.id)">{{item.name}}</a>
							</Checkbox>
							<div class="percent">(&nbsp;<span v-text="item.progress==''||item.progress==null?0:item.progress"></span>%&nbsp;)</div>
							<div class="tag_box">
								<Tag color="#3ca6a1e8" class="tag" v-for="(val,ind) in item.tagList" :key="ind">{{val.name}}</Tag>
							</div>
						</div>
						<div class="task-list-content">
							<Form :label-width="66" class="infoForm">
								<FormItem label="执行人:" class="list">
									{{item.userName}}
								</FormItem>
								<FormItem label="开始日期:" class="list">
									{{item.startTime}}
								</FormItem>
								<FormItem label="完成日期:" class="list">
									{{item.endTime}}
								</FormItem>
								<FormItem label="任务描述:" class="list">
									{{item.description}}
								</FormItem>
							</Form>
						</div>
					</Card>
				</div>
			</CheckboxGroup>
			<div class="noList" v-if="!infoList.length">
				<span>暂无合同数据</span>
			</div>
			<div class="page-box" v-show="count>10">
				<div style="margin: auto;display: inline-block;">
					<Page :total="count" :page-size="10" :current="pageNo" show-total :show-sizer="count>10" show-elevator @on-change="pageChange" @on-page-size-change="sizeChange"></Page>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import vSelect from '@public/modules/vSelect'
	import valid, {
		errors,
		plFile,
		sys,
		plServiceGroup,
		plTask,
		plReport,
		common,
		plServiceMember,
		remind
	} from "../../libs/request.js";
	export default {
		data() {
			return {
				pageNo: 1,
				pageSize: 10,
				count: 39,
				quest: '',
				tallyList: [],
				tags: '',
				list: [],
				fruit: [],
				infoList: [],
				isCheckAll: false,
				studentList:{},
			}
		},
		computed: {

		},
		components: {
			vSelect,
		},
		created() {
			console.log(this.$route)
			let params2 = {
				parent: '4001'
			}
			common.listData(params2).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.tallyList = res.data.data;
				}
			}).catch(errors.call(this));
			let params = {
				flag: 0,
				groupId: this.$route.params.gid,
				tags: this.tags,
				name: this.quest,
				pageNo: 1,
				pageSize: 10,
				isBill:1
			}
			common.taskListPage(params).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.infoList = res.data.data.list;
					this.count = res.data.data.count;
					this.pageNo = res.data.data.pageNo;
					this.pageSize = res.data.data.pageSize;
				}
			}).catch(errors.call(this));
			let params1 = {
				id: this.$route.params.gid
			}
			common.plStudentData(params1).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.studentList = res.data.data;
				}
			}).catch(errors.call(this));

		},
		methods: {
			formatData(val) {
				if(val) {
					return val.replace(/-/g, "/");
				}
			},
			getList() {
				let params = {
					flag: 0,
					groupId: this.$route.params.gid,
					tags: this.tags,
					name: this.quest,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					isBill:1
				}
				common.taskListPage(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.infoList = res.data.data.list;
						this.count = res.data.data.count;
						this.pageNo = res.data.data.pageNo;
						this.pageSize = res.data.data.pageSize;
					}
				}).catch(errors.call(this));
			},
			searchDropList(word) {
				return new Promise((resolve, reject) => {});
			},
			textChange(val) {
				this.$nextTick(() => {
					this.getList();
				})
			},
			tallyClick(val) {
				this.tags = val;
				this.getList();
			},
			pageChange(val) {
				this.pageNo = val;
				this.getList();
			},
			sizeChange(val) {
				this.pageSize = val;
				this.getList();
			},
			jump(name) {
				this.$emit('changeTab',name);
				this.$router.push({
					name: 'plan.' + name,
					query: {
						parent: 'group'
					},
					params: {
						gid: this.$route.params.gid
					}
				})
			},
			jump1(name, id) {
				let urlName = '';
				if(this.$route.name == 'plan.taskList.msg') {
					urlName = name + '.msg';
				} else if(this.$route.name == 'plan.taskList') {
					urlName = name;
				}
				this.$router.push({
					name: 'plan.' + urlName,
					query: {
						parent: 'group',
						taskId: id
					},
					params: {
						gid: this.$route.params.gid
					}
				})
			},
			derive(val) {
				if(val == 'some') {
					if(!this.fruit.length) {
						this.$Modal.warning({
							render: (h) => {
								return h('div', {
									style: {
										width: "370px",
										height: "40px",
										textAlign: 'center',
										fontSize: '16px',
										fontWeight: '700'
									},
								}, '请选择需要导出的任务 ')
							}
						})
					} else {
						let params = {
							groupId: this.$route.params.gid,
							ids: this.fruit.join(',')
						}
						console.log(params)
						window.open(common.taskExport(params));
					}
				} else {
					let params = {
						groupId: this.$route.params.gid,
					}
					window.open(common.taskExport(params));
				}
			},
			checkAll(val) {
				if(val) {
					this.fruit = this.infoList.map(item => item.id);
				} else {
					this.fruit = [];
				}
			}

		}
	}
</script>