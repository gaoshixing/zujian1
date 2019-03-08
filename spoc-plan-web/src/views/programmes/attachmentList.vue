<style lang="less">
	.attachmentList {
		padding: 0px 0 10px 0;
		.tableBtn {
			width: 65px;
			height: 24px;
			line-height: 10px;
			display: inline-block;
		}
		.btn_box {
			padding-top: 5px;
		}
		.list_box {
			overflow: hidden;
			line-height: 22px;
			.list {
				float: left;
			}
			.del {
				color: #ff2626 !important;
				float: right;
				display: none;
			}
			&:hover .del {
				display: block;
			}
		}
	}
</style>

<template>
	<div class="attachmentList">
		<div v-for="(item,index) in attach" :key="index" v-if="filter(index)" class="list_box">
			<a  href="javascript:void(0);" @click="jumpView(item)" class="list">{{item.fileName}}</a>
			<a href="javascript:void(0);" class="del" @click="delReport(item.id,index)" v-if="(odata.auditStatus=='save'||odata.auditStatus=='reject')&&isdel">删除</a>
		</div>
		<div class="btn_box">
			<Button type="ghost" v-text="this.unfold?'收起':'更多'" @click="unwind" class="tableBtn" v-if="attach.length>3"></Button>
			<Button type="ghost" class="tableBtn" @click="addReport" v-if="(odata.auditStatus=='save'||odata.auditStatus=='reject')&&isAdd">添加</Button>
		</div>

		<Modal v-model="addModal" width="473" class-name="addModal" @on-ok="addOk">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				添加文件
			</p>
			<div>
				<Form ref="formFile" :label-width="100" class="formFile">
					<FormItem label="选择学生:" style="margin-bottom: 14px;" class="scan">
						{{this.odata.studentName}}
					</FormItem>
					<FormItem label="附件:" style="margin-bottom: 14px;" class="scan">
						<div>
							<div v-if="!attachmentList.length">
								<a href="javascript:void(0);" v-text="'文件名'"></a>
							</div>
							<div v-else>
								<a href="javascript:void(0);" style="display: block;line-height: 22px;" v-text="item.fileName" v-for="(item,index) in attachmentList" :key="index" ></a>
							</div>
						</div>
						<div class="btnright">
							<!--<Upload multiple class="btn" ref="upload" name="files" :data="{'objectId':odata.groupId,'type':'pl_report','dirName':'all','isOverride':0,'fileType':'all'}" :show-upload-list="false" :on-success="handleSuccess" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="uploadFile">-->
							<Button type="primary" @click="onUploadLocal">本地上传</Button>
							<!--</Upload>-->
							<Button type="primary" @click="addByPan">从云盘添加</Button>
						</div>
					</FormItem>
				</Form>
			</div>
		</Modal>
		<div v-if="pan.show">
			<yunpan @on-confirm="doSendFile" @on-cancel="doCancel" :visible="pan.visible" :detector="detector"></yunpan>
		</div>
		<up-to-pan ref="uptopan" :object-id="gInfo.id" :serviceGroupId="gInfo.id" :dir="(gInfo.folderName?'/'+gInfo.folderName:'')+'/plan/report'" type="pl_report" fileType="all" @uploadok="onUploadOk" v-if="gInfo.id" :detector="detector"/>
	</div>
</template>

<script>
	import yunpan from "@public/modules/yunpan";
	import upToPan from '../../modules/planUpToPan';
	import { mapState } from 'vuex';
	import valid, {
		errors,
		plFile,
		sys,
		common,
		plServiceGroup,
		plReport,
	} from "../../libs/request.js";
	export default {
		name: 'attach',
		props: {
			'odata': {
				type: Object,
				default: function() {
					return {
						attachmentList: [],
					};
				}
			},
			isAdd: {
				type: Boolean,
				default: true
			},
			isdel: {
				type: Boolean,
				default: true
			},
		},
		data() {
			return {
				unfold: false,
				addModal: false,
				pan: {
					visible: false,
					show: false
				},
				attachmentList: [],
				attachList: [],
				gInfo: {},
				detector:{
					type:'name',
					condition:'',
					content:''
				},
			}
		},
		computed: {
			...mapState(['appMenuList', 'userInfo']),
			attach() {
				return this.odata.attachmentList;
			},
			num() {
				if(this.unfold) {
					return true;
				} else {
					return true;
				}
				return this.odata.attachmentList;
			},
		},
		components: {
			yunpan,
			upToPan
		},
		mounted() {
			let params2 = {
				id: this.odata.groupId
			}
			common.plGetGroupInfo(params2).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.gInfo = res.data.data.groupInfo
					console.log(res)
				}
			}).catch(errors.call(this));
		},
		methods: {
			displayUrl(id) {
				return sys.displayUrl(id);
			},
			unwind() {
				this.unfold = !this.unfold;
			},
			filter(ind) {
				if(this.unfold) {
					return true;
				} else {
					return ind < 3;
				}
			},
			delReport(val, ind) {
					this.$Modal.confirm({
						onOk: () => {
							let params1 = {
								id: val,
							}
							sys.delete(params1).then(valid.call(this)).then(res => {
								if(res.ok) {
									this.$Message.success(res.data.message);
									this.pupilList = res.data.data;
									this.odata.attachmentList.splice(ind, 1);
								}
							}).catch(errors.call(this));
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
							}, '确定删除当前文件？')
						}
					});
			},
			addOk() {
				let params1 = {
					taskId: this.odata.taskId,
					id: this.odata.id,
					attachmentList: this.attachList
				}
				plReport.save(params1).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						this.attachmentList = [];
						this.addModal = false;
						this.odata.attachmentList = this.attachList;
					}
				}).catch(errors.call(this));
			},
			addByPan() {
				this.detector.content=this.attachmentList.map(item=>item.fileName).join(',');
				this.pan.show = true;
				this.pan.visible = true;
			},
			addReport() {
				this.addModal = true;
				let params1 = {
					id: this.odata.id,
				}
				plReport.form(params1).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.attachList = res.data.data.attachmentList;
						this.attachmentList = res.data.data.attachmentList;
						this.detector.content=this.attachmentList.map(item=>item.fileName).join(',');
					}
				}).catch(errors.call(this));
			},
			onUploadLocal() {
				this.$refs.uptopan.doUpload();
			},
			onUploadOk(data) {
				if(data.status == "success") {
					//					this.attachmentList.push(data.data);
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
					'objectId': this.odata.groupId,
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
										this.attachList.push(res.data.data);
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
							this.attachList.push(res.data.data);
							this.doCancel();
						}
					}
				}).catch(errors.call(this));
			},
			doCancel() {
				this.close();
			},
			close() {
				setTimeout(() => {
					this.pan.show = false;
					this.pan.visible = false;
				}, 300);
			},
			jumpView(item) {
				if(item.fileId) {
					window.open(`https://portal.ivygate.cn/index.php/webutils/document/${item.fileId}`);
				}
			},
		}
	}
</script>