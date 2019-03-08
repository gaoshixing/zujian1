<style lang="less">
	.notepade-modal-ul {
		list-style: none;
		>li:nth-of-type(1) {
			position: relative;
			min-height: 140px;
		}
		p {
			color: #1c2438;
			font-weight: bold;
			font-size: 14px;
			margin-bottom: 20px;
		}
		.upload_btn {
			float: left;
			margin-top: 5px;
			margin-left: 25px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			.ivu-upload {
				background-color: #44bcb7;
				border-radius: 4px;
				color: #fff;
				line-height: 28px;
			}
			.ivu-upload-drag {
				border: none;
			}
			.tipInfo {
				color: #999899;
			}
		}
		.academe_icon {
			float: left;
			border: 1px solid #e0e1e2;
			display: inline-block;
			width: 100px;
			height: 100px;
			background-color: #f1f1f1;
			border-radius: 5px;
		}
	}
	
	#notepad-modal-form {
		label {
			width: 100% !important;
			color: #1c2438;
			font-weight: bold;
			font-size: 14px;
			// padding-left: 80px;
			text-align: left;
			margin-bottom: 10px;
			&::before {
				font-size: 12px;
				font-weight: normal;
			}
		}
		>div {
			margin-bottom: 20px;
			margin-left: 0;
			>div {
				margin-left: 0 !important;
			}
		}
	}
	
	#notepad-modal-form2 {
		color: #333;
		label {
			color: #999;
		}
	}
	
	.bill-paging {
		text-align: center;
		margin-top: 20px;
	}
	
	.modal-detail-note-item {
		b {
			color: #1c2438;
			font-size: 14px;
			letter-spacing: .1em;
		}
	}
	
	.note-srcoll-y {
		min-height: 100px;
		max-height: 150px;
		overflow-y: scroll;
	}
	
	.notepad-modal-detail {
		.ivu-form-item {
			margin-bottom: 10px;
		}
		.ivu-modal-footer {
			display: none !important;
		}
		.bill-modal-detail-btn-area {
			margin: 20px 0;
			padding: 0 30%;
			display: flex;
			display: -webkit-flex;
			justify-content: space-around;
			>button {
				padding: 0;
				width: 120px;
				height: 42px;
				font-size: 14px;
			}
		}
		img {
			width: 100px;
			height: 100px;
		}
	}
	.notepad-modal-detail-content {
		overflow: hidden;
		overflow-y: scroll;
		max-height: 220px
	}
	.notepad-modal-detail-content::-webkit-scrollbar {
    	display: none;
	}
</style>
<template>
	<div class="notepad-boss" v-if="1">
		<top-title title="记事本" btnVal="添加记事本" @onclickButton="onclickButton"></top-title>
		<notepad-list-item v-for="(item, index) in noteList" :key="index" :thumbnail="item.url || ''" :title="item.name" :date="item.updateDate" :userName="item.createUserName" :createby="item.createUserId" @onclickEditNote="onclickEditNote(item.id)" @onclickDeleteNote="onclickDeleteNote(item.id)" @onclickDetail="onclickDetail(item.id)"></notepad-list-item>
		<div></div>
		<Modal ref="refModalNotepad" v-model="modalNotepad" title="添加记事本" ok-text="保存" cancelText='取消' :mask-closable=false @on-ok="ok" @on-cancel="cancel" width="730">
			<Form ref="formValidate" :model="formValidate" id="notepad-modal-form" :rules="ruleValidate" :label-width="80">
				<FormItem label="名称" prop="name">
					<Input v-model="formValidate.name" placeholder="请输入记事本名称"></Input>
				</FormItem>
				<FormItem label="内容" prop="content">
					<Input v-model="formValidate.content" placeholder="请输入记事本内容" type="textarea" :autosize="{ minRows: 4, }"></Input>
				</FormItem>
			</Form>
			<ul class="notepade-modal-ul">
				<li>
					<p>记事本封面：</p>
					<img v-show="avatar" :src="avatar" alt="" class="academe_icon">
					<img v-show="!avatar" src="../../assets/images/default-notepade-logo.png" alt="" class="academe_icon" style="opacity: 0.6;">
					<div class="upload_btn">
						<!--<Upload name="files" ref="academeLogo" :data="{'objectId':1,'type':'pl_group','dirName':'all','isOverride':1,'fileType':'all'}" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" type="drag" :action="uploadUrl" style="width:94px;">
							上传图片
						</Upload>
						-->
						<Button type="primary" @click="onUploadLocal">上传图片</Button>
					</div>
					<span style="position:absolute; left: 0; top: 90px; padding-left: 128px; color:#999;">支持jpg，png格式</span>
				</li>
				<li>
					<!-- 
						1. 未勾选默认是自己可见 
						2. 
					-->
					<Select v-model="openStatus" style="width:266px" placeholder="选择对谁可见？">
						<Option v-for="item in permissionList" :value="item.value" :key="item.value">
							{{ item.label }}
						</Option>
					</Select>
				</li>
			</ul>
		</Modal>
		<!-- detail modal -->
		<Modal ref="refModalNotepadDetail" v-model="modalNotepaddetail" title="记事本" ok-text="保存" cancelText='取消' :mask-closable=true @on-ok="onclickCloseDetaiil" @on-cancel="onclickCloseDetaiil" class="notepad-modal-detail" width="730">
			<Form id="notepad-modal-form2" :label-width="80">
				<FormItem label="创建人" prop="servieContent">
					<span>{{tempNotepadObj.createUserName}}</span>
				</FormItem>
				<FormItem label="名称" prop="servieContent">
					<span>{{tempNotepadObj.name}}</span>
				</FormItem>
				<FormItem label="内容" prop="servieContent" class="notepad-modal-detail-content">
					<span style="letter-spacing: .01em;">{{tempNotepadObj.content}}</span>
				</FormItem>
				<FormItem label="对谁可见" prop="servieContent">
					<span v-show="tempNotepadObj.openStatus == 0">服务组内可见</span>
					<span v-show="tempNotepadObj.openStatus == 1">本人可见</span>
				</FormItem>
				<FormItem label="创建日期" prop="servieContent">
					<span>{{tempNotepadObj.createDate}}</span>
				</FormItem>
				<FormItem label="记事本封面" prop="servieContent">
					<img v-show="tempNotepadObj.url" :src="tempNotepadObj.url" alt="" class="academe_icon" style="width:100px;height:100px;">
					<img v-show="!tempNotepadObj.url" src="../../assets/images/default-notepade-logo.png" alt="" class="academe_icon" style="width:100px;height:100px;opacity:0.6;">
				</FormItem>
			</Form>
			<div class="bill-modal-detail-btn-area" style="display: none;">
				<Button type="success" @click="onclickCloseDetaiil">关闭</Button>
			</div>
		</Modal>
		<Page v-show="pageCount > 10" show-sizer class="bill-paging" :total="pageCount" show-total show-elevator :page-size="10" :current="pageNo" @on-change="onclickChangePage"></Page>
		<up-to-pan ref="uptopan"  :max-size="2048" :format="['jpg','png']" :dir="(gInfo.folderName?'/'+gInfo.folderName:'')+'/plan'" :object-id="gInfo.id" type="pl_group" fileType="all" @uploadok="onUploadOk" />
	</div>
</template>

<script>
	import { mapMutations } from "vuex";
	import TopTitle from '../../components/topTitle.vue';
	import NotepadListItem from '../../components/notepadListItem.vue';
	import upToPan from '../../modules/planUpToPan';
	import valid, {
		errors,
		plNotepad,
		sys,
	} from '../../libs//request';
	export default {
		name: 'Notepad',
		props: {
			groupInfo: {
				type: Object,
				default: {},
			}
		},
		data() {
			return {
				noteList: [],
				formValidate: {
					name: '',
					content: '',
				},
				rValid: false,
				isEdit: false,
				ruleValidate: {
					name: [{
						required: true,
						message: '请输入记事本名称',
						trigger: 'blur'
					}],
					content: [{
						required: true,
						message: '请输入记事本内容',
						trigger: 'blur'
					}],
				},
				permissionList: [{
						value: '0',
						label: '对服务组人员可见'
					},
					{
						value: '1',
						label: '仅对自己可见'
					},
				],
				modalNotepad: false,
				openStatus: '0',
				avatar: null,
				tempAvatar: null,
				pageCount: null,
				pageNo: null,
				thumbnail: '',
				serviceGroupId: null,
				tempNotepadObj: {},
				modalNotepaddetail: false,
			};
		},
		components: {
			TopTitle,
			NotepadListItem,
			upToPan
		},
		computed: {
			/*
			 * action 上传图片 返回地址链接
			 */
			gInfo() {
				console.log('this.groupInfo', this.groupInfo);
				return this.groupInfo;
			},
		},
		methods: {
			...mapMutations(["updateLoadingStatus"]),
			/*
			 * 获取记事本列表
			 */
			getNotepadList(data) {
				this.updateLoadingStatus({
					isLoading: true
				});
				plNotepad.list(data).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.noteList = res.data.data.list;
						this.pageCount = res.data.data.count;
						this.pageNo = res.data.data.pageNo;
					}
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
				this.updateLoadingStatus({
					isLoading: false
				});
			},
			/*
			 * 查看记事本详情
			 */
			onclickDetail(id) {
				this.modalNotepaddetail = true;
				const data = {
					id: id,
				}
				this.updateLoadingStatus({
					isLoading: true
				});
				plNotepad.form(data).then(valid.call(this)).then(res => {
					this.tempNotepadObj = res.data.data;
				}).catch(errors.call(this)).finally(() => {});
				this.updateLoadingStatus({
					isLoading: false
				});
			},
			/*
			 * 关闭记事本详情
			 */
			onclickCloseDetaiil() {
				this.modalNotepaddetail = false;
			},
			/*
			 * 点击添加记事本
			 */
			onclickButton() {
				this.modalNotepad = true;
			},
			/*
			 * 验证表单
			 */
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(!valid) {
						this.$Message.error({
							content: '请完善记事本的名称或内容',
							duration: 4,
						});
					} else {
						this.rValid = valid;
					}
				})
			},
			handleReset() {
				this.$refs.formValidate.resetFields();
			},
			/*
			 * 点击进行编辑记事本
			*/
			onclickEditNote(id) {
				const data = {
					id: id,
				}
				this.isEdit = true;
				this.updateLoadingStatus({
					isLoading: true
				});
				plNotepad.form(data).then(valid.call(this)).then(res => {
					this.formValidate = res.data.data;
					this.openStatus = res.data.data.openStatus;
					this.avatar = res.data.data.url;
				}).catch(errors.call(this)).finally(() => {});
				this.updateLoadingStatus({
					isLoading: false
				});
				this.modalNotepad = true;
			},
			/*
			 * 上传图片
			 */
//			handleSuccess(data) {
//				if(data.status == "success") {
//					// 添加记事本封面时显示的图片
//					this.avatar = data.data.filePath;
//					this.tempAvatar = data.data.filePath;
//					if(!this.CheckImgExists(this.avatar)) {
//						const imgId = data.data.id;
//						this.avatar = sys.displayUrl(imgId);
//					};
//					this.$Message.success('图片上传成功');
//				} else {
//					this.$Message.error(data.message);
//				}
//			},
//			handleFormatError() {
//				this.$Message.error("需使用jpg、png格式图片");
//			},
//			handleMaxSize() {
//				this.$Message.error("图标大小不能超过2MB");
//			},
			/*
			 * 删除记事本
			 */
			onclickDeleteNote(id) {
				this.updateLoadingStatus({
					isLoading: true
				});
				plNotepad.delete({
					id: id,
				}).then(valid.call(this)).then(res => {
					this.noteList.map((item, index) => {
						if(item.id === id) {
							this.noteList.splice(index, 1);
						}
					});
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
				this.updateLoadingStatus({
					isLoading: false
				});
				// 刷新列表
				this.getNotepadList({
					serviceGroupId: this.serviceGroupId,
					pageNo: this.pageNo,
				});
			},
			/*
			 * 点击保存
			 */
			ok() {
				this.modalNotepad = true;
				this.$refs.refModalNotepad.visible = true;
				this.handleSubmit('formValidate');
				if(!this.rValid) {
					return;
				}
				/*
				 * 接口参数
				 */
				let data = null;
				if(this.isEdit) {
					data = {
						serviceGroupId: this.serviceGroupId,
						id: this.formValidate.id,
						remarks: this.formValidate.remarks,
						createDate: this.formValidate.createDate,
						updateDate: new Date().format('yyyy-MM-dd hh:mm:ss'),
						name: this.formValidate.name,
						content: this.formValidate.content,
						url: this.avatar,
						openStatus: this.openStatus,
						scope: this.formValidate.scope,
					};
				} else {
					data = {
						serviceGroupId: this.serviceGroupId,
						createDate: new Date().format('yyyy-MM-dd hh:mm:ss'),
						updateDate: new Date().format('yyyy-MM-dd hh:mm:ss'),
						name: this.formValidate.name,
						content: this.formValidate.content,
						url: this.avatar,
						openStatus: this.openStatus,
					};
				}
				// 默认组内公开
				data.openStatus = data.openStatus ? data.openStatus : 0;
				this.updateLoadingStatus({
					isLoading: true
				});
				plNotepad.save(data).then(valid.call(this)).then(res => {
					this.formValidate = {};
					// 刷新列表
					this.getNotepadList({
						serviceGroupId: this.serviceGroupId,
						pageNo: this.pageNo,
					});
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
				this.updateLoadingStatus({
					isLoading: false
				});

				this.thumbnail = '';
				this.openStatus = '0';
				this.modalNotepad = false;
				this.tempAvatar = null,
					this.avatar = null,
					this.$Message.info('保存成功');
			},
			/*
			 * 取消编辑
			 */
			cancel() {
				this.isEdit = false;
				this.modalNotepad = false;
				this.formValidate.name = null;
				this.formValidate.content = null;
				this.tempAvatar = null;
				this.thumbnail = '';
				this.openStatus = '0';
				this.avatar = null,
					this.tempAvatar = null,
					this.$Message.info('取消保存');
				this.handleReset();
			},
			/*
			 * 切换分页
			 */
			onclickChangePage(index) {
				this.updateLoadingStatus({
					isLoading: true
				});
				this.getNotepadList({
					serviceGroupId: this.serviceGroupId,
					pageNo: index,
				});
				this.updateLoadingStatus({
					isLoading: false
				});
			},
			/*
			 * 判断图片是否存在
			 */
			CheckImgExists(imgurl) {
				var ImgObj = new Image(); //判断图片是否存在  
				ImgObj.src = imgurl;
				ImgObj.onload = function() {
					//没有图片，则返回-1  
					if(ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
						return true;
					} else {
						return false;
					}
				};
			},
			onUploadLocal() {
				this.$refs.uptopan.doUpload();
			},
			onUploadOk(data) {
				console.log('data', data);
				if(data.status == "success") {
					// 添加记事本封面时显示的图片
					const resURl = `spoc-plan/a/ws/sys/attachment/downloadPan?filePath=${data.data.filePath}&fileName=${data.data.fileName}`;
					console.log('resURl', resURl);
					this.avatar = resURl;
					this.tempAvatar = resURl;
					this.$Message.success('图片上传成功');
				} else {
					this.$Message.error(data.message);
				}
			},
		},
		created() {
			this.serviceGroupId = this.$route.params.gid;
			this.getNotepadList({
				serviceGroupId: this.serviceGroupId,
				pageNo: this.pageNo,
			});
		},
	};
</script>