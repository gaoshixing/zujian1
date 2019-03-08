<style lang="less">
	.programmes {
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
	
	.commit {
		.cont {
			font-size: 18px;
			text-align: center;
			margin: 40px 0;
			font-weight: 600;
		}
		.modal-btn {
			text-align: center;
			padding-bottom: 34px;
			.ivu-btn {
				font-weight: 400;
				font-size: 14px;
				width: 120px;
				height: 36px;
				margin: 0 5px;
			}
		}
		.ivu-modal-footer {
			display: none;
		}
	}
	
	.modalJournal {
		.ivu-modal-footer {
			display: none;
		}
		.ivu-modal-body {}
	}
	
	.addModal {
		.btnright {
			.btn {
				display: inline-block;
			}
		}
	}
	
	.modalJournal {
		.ivu-modal-footer {
			display: none;
		}
	}
	
	.modal-record {
		.lf {
			float: left;
		}
		.gt {
			float: right;
		}
		.widthMax {
			width: 100%;
		}
		.formModal {
			overflow: hidden;
			padding: 10px 14px 10px 0px;
			.width330 {
				width: 330px;
			}
			.width380 {
				width: 380px;
			}
			.width266 {
				width: 266px;
			}
			.widthMax {
				width: 100%;
			}
			.ivu-form-item {
				.ivu-input {
					background: #fff;
					color: #212121;
					font-size: 14px;
				}
				.ivu-input:hover {
					background: #fff;
				}
				.ivu-select-placeholder {
					color: #b3b3b3;
				}
				.ivu-select-selection {
					background: #fff;
				}
			}
			.langlabel {
				.ivu-form-item-label {
					padding: 5px 12px 0 0px;
				}
			}
			.logoBox {
				.schoolLogoBox {
					width: 70px;
					height: 70px;
					background-color: #f7f7f7;
					border: 1px solid #e0e1e2;
					img {
						width: 70px;
						height: 70px;
					}
				}
				.scanBox {
					line-height: 43px;
					p {
						width: 70px;
						color: #0d70b0;
					}
				}
				label {
					line-height: 70px;
				}
				.uploadBox {
					position: relative;
					padding: 5px 0px;
					.tips {
						color: #999899;
						font-size: 12px;
						margin-top: 10px;
					}
					.error_tips {
						top: 85%;
					}
				}
			}
			.logo {
				width: 100%;
				.ivu-form .logoBox .uploadBox .tips {
					line-height: 1em;
					margin-top: 20px;
				}
				.ivu-form-item-content {
					line-height: 1em;
				}
			}
			.limit {
				margin-top: 14px;
				span {
					color: #999999;
				}
			}
			.fileName {
				position: relative;
				display: inline-block;
				span {
					position: absolute;
					bottom: -18px;
					right: 12px;
					line-height: 32px;
					color: red;
					cursor: pointer;
					display: none;
				}
			}
			.fileName:hover {
				span {
					display: inline-block;
				}
			}
			.fileList {
				overflow: hidden;
				min-height: 32px;
				a {
					float: left;
				}
				span {
					float: left;
					color: red;
					margin-top: 12px;
					line-height: 20px;
					margin-left: 12px;
					display: none;
					cursor: pointer;
				}
				&:hover span {
					display: block;
				}
			}
		}
	}
</style>

<template>
	<div class="programmes">
		<Tabs :animated="false" v-model="tabName" @on-click="tabChange">
			<TabPane label="待审核" name="wait"></TabPane>
			<TabPane label="已审核" name="audited"></TabPane>
		</Tabs>
		<v-select style="width: 396px;margin: 15px 0;" placeholder="输入学生姓名/手机号/EC号/规划老师姓名" icon="search" v-model="compact" k='cnname' :datafunc="searchDropList" @on-enter="textChange" @on-click="textChange" @selected="textChange">
		</v-select>
		<p class="mold"><span v-text="tabName=='wait'?'待审核':'已审核'"></span>&nbsp;<span class="moldNum">{{count}}</span></p>
		<!--<div class="btnlist">
			<div class="lineSide"></div>
			<span class="tit"></span>
			<div class="btnright">
				<Button type="primary" class="btn" @click="addReport" v-if="tabName=='wait'">+添加规划报告</Button>
			</div>
		</div>-->
		<btn-list title="规划报告-列表" :btnList="tabName=='wait'?btninfo:[]"></btn-list>
		<wait :tableSelectedItem="tableData" @filterMethod="filterMethod" v-if="tabName=='wait'" @audit="audit" @log="log"></wait>
		<audited :tableSelectedItem="tableData" @sort="sort" v-else @audit="audit" @log="log" @send="send" @read="read" @record="record"></audited>
		<div class="page-box" v-if="count>10">
			<div style="margin: auto;display: inline-block;">
				<Page :total="count" :page-size="10" :current="pageNo" show-total :show-sizer="count>10" show-elevator @on-change="pageChange" @on-page-size-change="sizeChange"></Page>
			</div>
		</div>
		<!--<Modal v-model="addModal" width="473" class-name="addModal" @on-ok="addOk">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				添加规划报告
			</p>
			<div>
				<Form ref="formFile" :label-width="100" class="formFile">
					<FormItem label="选择学生:" style="margin-bottom: 14px;" class="scan">
						<Select v-model="student" style="width:275px;" placeholder="选择学生" @on-change="selStudent" :label-in-value="true">
							<Option v-for="(item,index) in pupilList" :value="item.taskId" :key="index" :label="item.groupId">{{ item.studentName }}</Option>
						</Select>
					</FormItem>
					<FormItem label="附件:" style="margin-bottom: 14px;" class="scan">
						<div>
							<div v-if="!attachmentList.length">
								<a href="javascript:void(0);" v-text="'文件名'"></a>
							</div>
							<div v-else>
								<a href="javascript:void(0);" style="display: block;line-height: 22px;" v-text="item.fileName" v-for="(item,index) in attachmentList"></a>
							</div>
						</div>
						<div class="btnright">
							<Upload multiple class="btn" ref="upload" name="files" :data="{'objectId':this.groupId,'type':'pl_report','dirName':'all','isOverride':0,'fileType':'all'}" :show-upload-list="false" :on-success="handleSuccess" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="uploadFile">
								<Button type="primary">本地上传</Button>
							</Upload>
							<Button type="primary" @click="addByPan">从云盘添加</Button>
						</div>
					</FormItem>
				</Form>
			</div>
		</Modal>-->
		<Modal v-model="commit" width="730" class="commit">
			<div style="text-align:center">
				<p class="cont">
					确定提交审批当前学生的规划报告？
				</p>
				<div class="modal-btn">
					<Button type="ghost" @click="commit=false">取消</Button>
					<Button type="primary" @click="commOk">确定</Button>
				</div>
			</div>
		</Modal>
		<Modal v-model="readed" width="730" class="commit">
			<div style="text-align:center">
				<p class="cont">确定家长已阅读规划报告？</p>
				<div class="modal-btn">
					<Button type="ghost" @click="readed=false">取消</Button>
					<Button type="primary" @click="readOk">确定</Button>
				</div>
			</div>
		</Modal>
		<Modal v-model="modalJournal" title="操作日志" width="730" class="modalJournal modal-form">
			<Table border :columns="journalCol" :data="journalData"></Table>
		</Modal>
		<Modal ref="sendBox" v-model="sendModel" width="730" class-name="sendModel common_modal vertical-center-modal" @on-ok="sendOk('sendForm1')" @on-cancel="closeSendModel">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				发送家长
			</p>
			<div>
				<Form ref="sendForm1" :model="sendForm" :rules="sendRuler" :label-width="74">
					<FormItem prop="num" label="发件账号：">
						<Input v-model="sendForm.sendNum" disabled></Input>
					</FormItem>
					<FormItem prop="pwd" label="发件密码：">
						<Input v-model="sendForm.pwd"></Input>
					</FormItem>
					<FormItem prop="pwd" label="收件账号：">
						<Input v-model="sendForm.num1"></Input>
					</FormItem>
				</Form>
			</div>
		</Modal>
		<Modal ref="recordBox" v-model="recordModal" width="730" class="modal-record" @on-ok="rulesSubmit('formModal')" @on-cancel="clearForm">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				上传讲解记录
			</p>
			<div>
				<Form ref="formModal" :model="formModal" :label-width="74" class="formModal">
					<FormItem label="上传附件：" prop="contentFile" class="widthMax fl">
						<div class="infoList logoBox clearfix">
							<div>
								<div v-if="!formModal.attachments.length">
									<a href="javascript:void(0);" v-text="'文件名'"></a>
								</div>
								<div v-else>
									<div v-for="(item,index) in formModal.attachments" :key="index" class="fileList">
										<a href="javascript:void(0);" style="display: block;line-height: 22px;" v-text="item.fileName" @click="openFile(item.fileId)"></a>
										<span @click="delFile(item.id,index)">
						            		删除
						        		</span>
									</div>
								</div>
							</div>
							<div class="fl uploadBox">
								<!--<Upload ref="upload" name="files" :data="{'objectId':this.clickId,'type':'pl_report_report','dirName':'files','isOverride':1}" :show-upload-list="false" :on-success="handleSuccess1" :format="['docx','pdf','docx','jpg','jpeg','gif','png']" :on-format-error="handleFormatError1" :on-exceeded-size="handleMaxSize" :action="uploadFile">-->
								<Button type="primary" @click="onUploadLocal">点击上传</Button>
								<!--</Upload>-->
								<p>（请上传图片、doc、docx、pdf格式）</p>
							</div>
						</div>
					</FormItem>
					<FormItem prop="remark" label="备注：" class="widthMax fl">
						<Input v-model="formModal.remark" type="textarea" :rows="4"></Input>
					</FormItem>
				</Form>
			</div>
		</Modal>
		<!--<div v-if="pan.show">
			<yunpan @on-confirm="doSendFile" @on-cancel="doCancel" :visible="pan.visible"></yunpan>
		</div>-->
		<up-to-pan ref="uptopan" :object-id="this.clickId" :serviceGroupId="gInfo.id" :dir="(gInfo.folderName?'/'+gInfo.folderName:'')+'/plan/report_report'" :format="['docx','pdf','docx','jpg','jpeg','gif','png']" type="pl_report_report" fileType="all" @uploadok="onUploadOk" v-if="gInfo.id"/>
	</div>
</template>

<script>
	import wait from "./wait.vue";
	import audited from "./audited.vue";
	import vSelect from '@public/modules/vSelect'
	import yunpan from "@public/modules/yunpan";
	import BtnList from '@public/modules/btnlist';
	import upToPan from '../../modules/planUpToPan';
	import { mapState } from 'vuex';
	import valid, {
		errors,
		plFile,
		common,
		sys,
		plReport,
		plServiceGroup
	} from "../../libs/request.js";
	export default {
		data() {
			return {
				sendForm: {
					sendNum: '',
					num1: '',
					pwd: ''
				},
				formModal: {
					contentFile: '',
					attachments: [],
					remark: ''
				},
				btninfo: [],
				recordModal: false,
				sendRuler: {},
				count: 0,
				pageSize: 10,
				pageNo: 1,
				clickId: '',
				sendModel: false,
				tabName: 'wait',
				compact: '',
				fileName: '',
				pupilList: [],
				addModal: false,
				commit: false,
				orderByStatus: 1,
				attachmentList: [],
				readed: false,
				student: '',
				modalJournal: false,
				inStatus: 'save,commit',
//				pan: {
//					visible: false,
//					show: false
//				},
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
							}, [
								//								h('p', {}, params.row.content),
								//								h('p', {}, !!params.row.reason ? '驳回理由:' + params.row.reason : '')
							])
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
				gInfo:{}
			}
		},
		computed: {
			...mapState(['appMenuList', 'userInfo']),
		},
		components: {
			wait,
			vSelect,
			audited,
			yunpan,
			BtnList,
			upToPan
		},
		created() {
			let params = {
				flag: 0,
				inStatus: 'save,commit',
				notInStatus: '',
				name: '',
			}
			plReport.listPage(params).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.tableData = res.data.data.list;
					this.count = res.data.data.count;
				}
			}).catch(errors.call(this));
			let params1 = {
				name: '',
			}
			plReport.listStudent(params1).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.pupilList = res.data.data;
				}
			}).catch(errors.call(this));
		},
		methods: {
			displayUrl(id) {
				console.log(sys.displayUrl(id))
				return sys.displayUrl(id);
			},
			getTable() {
				let params = {
					flag: 0,
					inStatus: this.inStatus,
					notInStatus: '',
					name: this.compact,
					pageSize: this.pageSize,
					pageNo: this.pageNo,
				}
				if(this.tabName == 'wait') {
					params.orderByType = 0;
				} else {
					params.orderByType = 1;
					params.orderByStatus = this.orderByStatus;
				}
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
			addReport() {
				this.addModal = true;
			},
			//			handleSuccess(data) {
			//				if(data.status == "success") {
			//					this.attachmentList.push(data.data);
			//				} else {
			//					this.$Message.error(data.message);
			//				}
			//			},
			//			handleFormatError() {
			//				this.$Message.error("需使用'docx','pdf','docx','jpg','jpeg','gif','png'格式");
			//			},
			//			handleFormatError1() {
			//				this.$Message.error("需使用docx、pdf格式");
			//			},
			//			handleMaxSize() {
			//
			//			},
			readOk() {
				let params1 = {
					id: this.clickId,
					isParentRead: 1
				}
				plReport.updateIsParentRead(params1).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						this.readed = false;
						this.getTable();
					}
				}).catch(errors.call(this));

			},
//			doSendFile(item) {
//				console.log(item)
//				let params = {
//					"panFilePath": item.dir,
//					"filePath": (this.gInfo.folderName?'/'+this.gInfo.folderName:'')+'/plan',
//					"fileName": item.name,
//					'objectId': this.groupId,
//					"type": 'pl_report',
//					"isCover": 1,
//				}
//				sys.uploadPanFileToPan(params).then(valid.call(this)).then(res => {
//					if(res.ok) {
//						this.getList();
//						this.doCancel();
//					}
//				}).catch(errors.call(this));
//			},
//			doCancel() {
//				this.close();
//			},
//			close() {
//				setTimeout(() => {
//					this.pan.show = false;
//					this.pan.visible = false;
//				}, 300);
//			},
//			addByPan() {
//				this.pan.show = true;
//				this.pan.visible = true;
//			},
			addOk() {
				let params1 = {
					taskId: this.student,
					attachmentList: this.attachmentList
				}
				plReport.save(params1).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						this.attachmentList = [];
						this.addModal = false;
						this.getTable();
					}
				}).catch(errors.call(this));
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
			commOk() {
				let params1 = {
					id: this.clickId,
					auditStatus: 'commit'
				}
				plReport.audit(params1).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						this.commit = false;
						this.getTable();
					}
				}).catch(errors.call(this));

			},
			audit(val) {
				this.clickId = val.id;
				this.commit = true;
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
					this.inStatus = 'save,commit';
				} else {
					this.inStatus = 'pass,reject';
				}
				this.getTable();
			},
			sort(val) {
				this.orderByStatus = val;
			},
			send(val) {
				this.clickId = val.id;
				this.sendModel = true;
				this.sendForm.sendNum = this.userInfo.email;
			},
			read(val) {
				this.clickId = val.id;
				this.readed = true;
			},
			closeSendModel() {
				this.sendForm.pwd = '';
				this.sendForm.num1 = '';
			},
			sendOk(name) {
				this.sendModel = true;
				this.$refs[name].validate((valid1) => {
					if(valid1) {
						let params5 = {
							email: this.sendForm.num1,
							password: this.sendForm.pwd,
							id: this.clickId
						}
						plReport.sendmail(params5).then(valid.call(this)).then(res => {
							if(res.ok) {
								this.$Message.success(res.data.message);
								this.sendModel = false;
								this.sendForm.pwd = '';
								this.sendForm.num1 = '';
							} else {
								this.$refs.sendBox.visible = true;
								this.sendModel = true;
							}
						}).catch(errors.call(this));
					} else {
						this.$refs.sendBox.visible = true;
						this.sendModel = true;
					}
				})
			},
			record(val) {
				this.clickId = val.id;
				let params2 = {
					id: val.groupId
				}
				common.plGetGroupInfo(params2).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.gInfo = res.data.data.groupInfo;
					}
				}).catch(errors.call(this));
				this.formModal = {
						contentFile: '',
						attachments: val.attachmentListReport,
						remark: val.record
					},
					this.recordModal = true;
			},
			clearForm() {
				this.recordModal = false;
				this.formModal = {
					contentFile: '',
					attachments: [],
					remark: ''
				}
			},
			rulesSubmit(name) {
				this.recordModal = true;
				this.$refs[name].validate((valid1) => {
					if(valid1) {
						let params5 = {
							record: this.formModal.remark,
							id: this.clickId
						}
						plReport.updateRecord(params5).then(valid.call(this)).then(res => {
							if(res.ok) {
								this.$Message.success(res.data.message);
								this.recordModal = false;
								this.formModal = {
									contentFile: '',
									attachments: [],
									remark: ''
								};
								this.getTable();
							} else {
								this.$refs.recordBox.visible = true;
								this.recordModal = true;
							}
						}).catch(errors.call(this));
					} else {
						this.$refs.recordBox.visible = true;
						this.recordModal = true;
					}
				})
			},
			delFile(id, ind) {
				if(id) {
					let params = {
						'id': id
					}
					sys.delete(params).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.$Message.success(res.data.message);
							this.formModal.attachments.splice(ind, 1);
						}
					}).catch(errors.call(this));
				}
			},
			selStudent(val) {
				this.groupId = val.label;
			},
			onUploadLocal() {
				this.$refs.uptopan.doUpload();
			},
			onUploadOk(data) {
				console.log(data)
				if(data.status == "success") {
					this.$Message.success(data.message);
					this.formModal.attachments.push(data.data);
					this.formModal.contentFile = data.data.filePath;
				} else {
					this.$Message.error(data.message);
				}
				console.log(this.formModal.attachments)
			},
			openFile(val){
				if(val) {
					window.open(`https://portal.ivygate.cn/index.php/webutils/document/${val}`);
				}
			}
		}
	}
</script>