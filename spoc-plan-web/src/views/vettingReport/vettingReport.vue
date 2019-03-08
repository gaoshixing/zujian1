<style lang="less">
	.vettingReport {
		.ivu-table td {
			vertical-align: top !important;
			padding-top: 10px;
		}
		.mold {
			line-height: 32px;
			span {
				font-size: 14px;
				&.moldNum {
					font-size: 16px;
					color: #44bcb7;
				}
			}
		}
		.ivu-table-wrapper {
			border: none;
		}
		.ivu-table th {
			background: #fff;
		}
		.ivu-table:after {
			display: none;
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
			}
		}
		.page-box {
			display: flex;
			justify-content: center;
			margin-top: 20px;
		}
	}
	
	.modalJournal {
		.ivu-modal-footer {
			display: none;
		}
		.ivu-modal-body {}
	}
</style>

<template>
	<div class="vettingReport">
		<Tabs :animated="false" v-model="tabName" @on-click="tabChange">
			<TabPane label="待审核" name="wait"></TabPane>
			<TabPane label="已审核" name="audited"></TabPane>
		</Tabs>
		<v-select style="width: 396px;margin: 15px 0;" placeholder="输入学生姓名/手机号/EC号/规划老师姓名" icon="search" v-model="compact" k='cnname' :datafunc="searchDropList" @on-enter="textChange" @on-click="textChange" @selected="textChange">
		</v-select>
		<p class="mold"><span v-text="tabName=='wait'?'待审核':'已审核'"></span>&nbsp;<span class="moldNum">{{count}}</span></p>
		<div class="btnlist">
			<div class="lineSide"></div>
			<span class="tit">规划报告-列表</span>
		</div>
		<wait :tableSelectedItem="tableData" @filterMethod="filterMethod" v-if="tabName=='wait'" @audit="audit" @log="log" @sort="sort"></wait>
		<audited :tableSelectedItem="tableData" @filterMethod="filterMethod" @sort="sort" v-else @log="log"></audited>
		<div class="page-box" v-if="count>10">
			<div style="margin: auto;display: inline-block;">
				<Page :total="count" :page-size="10" :current="pageNo" show-total :show-sizer="count>10" show-elevator @on-change="pageChange" @on-page-size-change="sizeChange"></Page>
			</div>
		</div>
		<Modal v-model="modalJournal" title="操作日志" width="730" class="modalJournal modal-form">
			<Table border :columns="journalCol" :data="journalData"></Table>
		</Modal>
		<Modal ref="approvalBox" v-model="approvalModel" width="730" class-name="approvalModel common_modal vertical-center-modal">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				审批规划报告
			</p>
			<div>
				<Form ref="approvalForm1" :model="approvalForm" :label-width="98">
					<FormItem prop="file" label="报告名称：">
						<a href="javascript:void(0);" style="display: block;" v-for="(item,index) in approvalForm.file" :key="index">{{item.fileName}}</a>
					</FormItem>
					<FormItem prop="pwd" label="服务学生：">
						<a href="javascript:void(0);">{{approvalForm.student}}</a>
					</FormItem>
					<FormItem prop="pwd" label="规划老师：">
						{{approvalForm.user}}
					</FormItem>
					<FormItem prop="num" label="报告提交时间：">
						{{approvalForm.time}}
					</FormItem>
					<FormItem prop="pwd" label="审批结果：">
						<Button :type="approvalForm.result=='reject'?'primary':'ghost'" @click="approvalForm.result='reject'">驳回</Button>
						<Button :type="approvalForm.result=='pass'?'primary':'ghost'" @click="approvalForm.result='pass'">通过</Button>
					</FormItem>
					<FormItem prop="reason" label="驳回理由：" v-if="approvalForm.result=='reject'" :rules="{required: true, message: '驳回理由不能为空', trigger: 'blur'}">
						<Input v-model="approvalForm.reason" type="textarea" :rows="4"></Input>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button @click="closeApprovalModel">取消</Button>
				<Button type="primary" @click="approvalOk('approvalForm1')">确定</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import wait from "./wait.vue";
	import audited from "./audited.vue";
	import vSelect from '@public/modules/vSelect'
	import yunpan from "@public/modules/yunpan";
	import { mapMutations, mapState } from 'vuex';
	import valid, {
		errors,
		plFile,
		sys,
		plReport
	} from "../../libs/request.js";
	export default {
		data() {
			return {
				approvalForm: {
					file: [],
					student: '',
					user: '',
					time: '',
					result: '',
					reason: ''
				},
				approvalModel: false,
				count: 0,
				pageSize: 10,
				pageNo: 1,
				clickId: '',
				tabName: 'wait',
				compact: '',
				fileName: '',
				orderByStatus: 1,
				modalJournal: false,
				inStatus: 'commit',
				journalCol: [{
						title: '序号',
						type: 'index',
						align: 'center',
					},
					{
						title: '操作人',
						align: 'center',
						key: 'userName'
					},
					{
						title: '操作',
						align: 'center',
						key: 'content',
						render: (h, params) => {
							return h('div', {
								domProps: {
									innerHTML: params.row.content
								}
							}, [])
						}
					},
					{
						title: '时间',
						align: 'center',
						key: 'createTime'
					}
				],
				journalData: [],
				tableData: [],
			}
		},
		computed: {
			...mapState(['appMenuList', 'userInfo']),
		},
		components: {
			wait,
			vSelect,
			audited,
			yunpan
		},
		created() {
			let params = {
				flag: 1,
				inStatus: 'commit',
				notInStatus: '',
				name: '',
			}
			plReport.listPage(params).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.tableData = res.data.data.list;
					this.count = res.data.data.count;
				}
			}).catch(errors.call(this));
		},
		methods: {
			...mapMutations(['updateLoadingStatus']),
			getTable() {
				let params = {
					flag: 1,
					inStatus:this.inStatus,
					notInStatus: '',
					name: this.compact,
					pageSize: this.pageSize,
					pageNo: this.pageNo,
				}
				if(this.tabName == 'wait') {
					params.orderByType = 0;
					params.orderByStatus = this.orderByStatus;
				} else {
					params.orderByType = 1;
					params.orderByStatus = this.orderByStatus;
				}
				console.log(params)
				plReport.listPage(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.tableData = res.data.data.list;
						this.count = res.data.data.count;
					}
				}).catch(errors.call(this));
			},
			searchDropList(word) {
				return new Promise((resolve, reject) => {});
			},
			textChange(val) {
				this.$nextTick(() => {
					this.getTable();
				})
			},
			filterMethod(val) {
				this.inStatus = val;
				this.getTable();
			},
			log(val) {
				this.clickId = val.id;
				let params1 = {
					reportId: this.clickId
				}
				plReport.listLog(params1).then(valid.call(this)).then(res => {
					if(res.ok) {
						//              		this.$Message.success(res.data.message);
						this.modalJournal = true;
						this.journalData = res.data.data;
					}
				}).catch(errors.call(this));
			},
			audit(val) {
				this.clickId = val.id;
				this.approvalForm = {
					file: val.attachmentList,
					student: val.studentName,
					user: val.userName,
					time: val.pushTime,
					result: '',
					reason: ''
				};
				this.approvalModel = true;
			},
			pageChange(val) {
				this.pageNo = val;
				this.getTable();
				this.$el.parentElement.scrollTop = 0
			},
			sizeChange(val) {
				this.pageSize = val;
				this.getTable();
			},
			tabChange(name) {
				if(name == 'wait') {
					this.inStatus = 'commit';
				} else {
					this.inStatus = 'pass,reject';
				}
				this.getTable();
			},
			sort(val) {
				this.orderByStatus = val;
				this.getTable();
			},
			approvalOk(name) {
                this.$refs[name].validate((valid1) => {
                    if (valid1) {
						this.updateLoadingStatus({
							isLoading: true
						});
						let params = {
							id: this.clickId,
							auditStatus: this.approvalForm.result,
							reason: this.approvalForm.reason
						}
						plReport.audit(params).then(valid.call(this)).then(res => {console.log(res.ok)
							if(res.ok) {
								this.$Message.success(res.data.message);
								this.getTable();
								this.approvalModel = false;
								this.updateLoadingStatus({
									isLoading: false
								});
							}
						}).catch(errors.call(this));
                    }
                })

			},
			closeApprovalModel() {
				this.approvalForm = {
					file: [],
					student: '',
					user: '',
					time: '',
					result: '',
					reason: '',
				}
				this.approvalModel = false;
			}
		}
	}
</script>