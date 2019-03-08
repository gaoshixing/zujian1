<style lang="less">
	.inviteBox {
		.formInvite {
			.ivu-form-item-label {
				color: #999999;
			}
			.tip {
				color: #ff0000;
			}
			.placeholder {
				color: #a9a9a9;
			}
			.frmList {
				width: 220px;
				line-height: 34px;
				display: inline-block;
			}
			.upload_cont {
				width: 180px;
				height: 240px;
				line-height: 240px;
				text-align: center;
				background: #f8f8f8;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.butList {
				display: inline-block;
				.btn {
					width: 88px;
					height: 28px;
					margin-right: 20px;
					line-height: 16px;
				}
			}
			.btnSubmit {
				button {
					width: 108px;
					height: 36px;
				}
			}
		}
	}
	
	.frmModel {
		.radio_group {
			width: 100%;
		}
		button {
			width: 80px;
			height: 36px;
		}
		.page {
			margin-top: 14px;
			margin-bottom: 14px;
			text-align: center;
		}
	}
</style>

<template>
	<div class="inviteBox">
		<Form ref="formInvite" :model="inviteForm" :rules="inviteRule" :label-width="147" class="formInvite">
			<FormItem label="邀请页面名称：" prop="title">
				<Input type="text" v-model="inviteForm.title" style="width: 180px;" :disabled="!!$route.query.readOnly"></Input>
			</FormItem>
			<FormItem label="上传图片：" prop="uploadFile">
				<Upload ref="upload" :data="uploadData" name="files" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png','gif']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" type="drag" :action="uploadFileUrl" style="width: 180px;height:240px;" accept=".png, .jpg, .jpeg, .gif">
					<div style="" class="upload_cont">
						<img :src="inviteForm.uploadFile" v-if="inviteForm.uploadFile" />
						<Icon type="plus-circled" :size="30" v-else></Icon>
					</div>
				</Upload>
			</FormItem>
			<FormItem label="表单位置选择：" prop="formPosition">
				<RadioGroup v-model="inviteForm.formPosition">
					<Radio label="up" :disabled="!!$route.query.readOnly">图片上方</Radio>
					<Radio label="below" :disabled="!!$route.query.readOnly">图片下方</Radio>
					<Radio label="floating" :disabled="!!$route.query.readOnly">覆盖在图片上的浮层</Radio>
				</RadioGroup>
				<div class="tip">
					表单与图片的相对位置
				</div>
			</FormItem>
			<FormItem label="表单显示标题：" prop="formTitle">
				<Input type="text" v-model="inviteForm.formTitle" style="width: 180px;" :disabled="!!$route.query.readOnly"></Input>
				<div class="placeholder">
					表单标题，用户可见，可不填
				</div>
			</FormItem>
			<FormItem label="设置表单：" prop="frmName">
				<div class="frmList" v-if="inviteForm.frmName">
					{{inviteForm.frmName}}
				</div>
				<div class="butList">
					<Button type="primary" class="btn" @click="selectForm" v-if="!inviteForm.frmName" v-show="!$route.query.readOnly">选择表单</Button>
					<Button type="primary" class="btn" @click="pvwForm" v-if="inviteForm.frmName" v-show="!$route.query.readOnly">预览表单</Button>
					<Button type="primary" class="btn" @click="cancelForm" v-if="inviteForm.frmName" v-show="!$route.query.readOnly">取消选择</Button>
				</div>
			</FormItem>
			<FormItem label="" :label-width="1" prop="visible">
				<companys-checkbox ref="companysVisible" :hasChecked="hasChecked" @checkComany="checkComany" :disabled="!!$route.query.readOnly" :nameStyle="{color:'#999','line-height':'20px','padding-right':'12px','text-align':'right',width:'146px'}"></companys-checkbox>
			</FormItem>
			<formItem class="btnSubmit" styl>
				<Button type="primary" @click="handleSubmit('formInvite')" v-show="!$route.query.readOnly">确定</Button>
			</formItem>
		</Form>
		<Modal v-model="frmModel" width="728" class-name="frmModel vertical-center-modal">
			<p slot="header" style="color:#222222;">
				<span>选择表单</span>
			</p>
			<div style="text-align:center">

				<v-select style="width: 296px;margin: 15px 0;" placeholder="搜索表单名称" :datafunc="datafunc" icon="search" v-model="compact" k='cnname' @on-enter="textChange" @on-click="textChange" @selected="textChange">
				</v-select>
				<RadioGroup v-model="formIds" class="radio_group">
					<Table border height="180" :columns="columns" :loading="isloading" :data="tableList"></Table>
				</RadioGroup>
				<div class="page">
					<Page show-elevator show-total show-sizer @on-page-size-change="PageSizeChange" :current="pageNo" :total="count" @on-change="PageChange" v-if="count>10"></Page>
				</div>
			</div>
			<div slot="footer">
				<Button type="ghost" @click="frmCancel">取消</Button>
				<Button type="primary" @click="frmOk">确定</Button>
			</div>
		</Modal>
		<Modal v-model="pvwModel" width="728" class-name="pvwModel vertical-center-modal">
			<p slot="header" style="color:#222222;">
				<span>预览表单</span>
			</p>
			<div>
				<xformview ref="meetxForm" :fid="formIds" v-if="formIds&&inviteForm.frmName" />
			</div>
			<div slot="footer">
				<Button type="primary" @click="pvwClose">关闭</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import vSelect from '@public/modules/vSelect';
	import { mapState, mapGetters, mapMutations } from 'vuex';
	import companysCheckbox from '../../modules/companysCheckbox.vue';
	import xformview from '../xform/xformview';
	import valid, {
		errors,
		common,
		sys,
		wpMarketCommon,
		wpInvitingPage,
		comFormTable
	} from "../../libs/request";
	export default {
		data() {
			return {
				count: 10,
				pageNo: 1,
				pageSize: 10,
				formIds: "",
				compact: "",
				pvwModel: false,
				uploadList: {},
				hasChecked: [],
				uploadData: {
					type: 'wp_inviting_page_image',
					dirName: 'all',
					meunId: '1001'
				},
				frmModel: false,
				isloading: false,
				inviteForm: {
					id: '',
					title: "",
					uploadFile: "",
					formPosition: "",
					formTitle: "",
					frmName: "",
					visible: []
				},
				inviteRule: {
					title: {
						required: true,
						type: 'string',
						message: '邀请页面名称不能为空',
						trigger: 'blur'
					},
					uploadFile: {
						required: true,
						type: 'string',
						message: '请上传图片',
						trigger: 'change'
					},
					formPosition: {
						required: true,
						type: 'string',
						message: '请选择表单位置',
						trigger: 'change'
					},
					frmName: {
						required: true,
						type: 'string',
						message: '请选择表单',
						trigger: 'change'
					},
				},
				columns: [{
						title: '选择',
						width: 70,
						align: 'center',
						render: (h, params) => {
							let self = this;
							return h("Radio", {
								style: {
									display: 'inline-block',
									margin: 'auto'
								},
								props: {
									label: params.row.id,
								},
								nativeOn: {
									click: () => {
										common.viewForm(params.row.id).then(valid.call(this)).then(res => {
											if(res.ok) {
												if(res.data.data) {
													self.inviteForm.frmName = params.row.name;
													self.$refs.formInvite.validateField('frmName');
												} else {
													this.formIds = '';
													this.$Message.error('该表单内容为空')
												}
											}
										}).catch(errors.call(this));
									}
								},
							}, '')
						}
					}, {
						title: "表单名称",
						width: 460,
						key: "name",
						align: "left",
					},
					{
						title: "创建人",
						key: "creator",
						align: "left"
					},
				],
				tableList: [{
					id: '1',
					objectValue: "44546545",
					predictNum: "454465465"
				}],
				isUploadImg: false
			}
		},
		computed: {
			uploadFileUrl() {
				return wpMarketCommon.getUploadFileUrl();
			}
		},
		components: {
			vSelect,
			companysCheckbox,
			xformview
		},
		created() {
			if(this.$route.query.id) {
				this.updateLoadingStatus({
					isLoading: true
				});
				let params = {
					id: this.$route.query.id
				}
				wpInvitingPage.form(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						//						this.$Message.success(res.data.message);
						this.inviteForm.id = res.data.data.id;
						this.inviteForm.title = res.data.data.title;
						this.inviteForm.attachmentId = res.data.data.attachmentId;
						this.inviteForm.uploadFile = res.data.data.filepath;
						this.inviteForm.formPosition = res.data.data.formPosition;
						this.inviteForm.formTitle = res.data.data.formTitle;
						this.inviteForm.frmName = res.data.data.formName;
						this.formIds = res.data.data.formId;
						this.inviteForm.visible = res.data.data.officeIds;
						this.hasChecked = res.data.data.officeIds;
						this.updateLoadingStatus({
							isLoading: false
						});
					} else {
						this.updateLoadingStatus({
							isLoading: false
						});
					}
				}).catch(errors.call(this));
			}
		},
		methods: {
			...mapMutations(["updateLoadingStatus"]),
			getFormList() {
				this.updateLoadingStatus({
					isLoading: true
				});
				let params = {
					name: this.compact,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					groupId: "com_form_tpl_kind_inviting_page"
				}
				comFormTable.list(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.count = res.data.data.count;
						this.tableList = res.data.data.list;
						this.pageNo = res.data.data.pageNo;
						this.pageSize = res.data.data.pageSize;
					}
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
			},
			saveForm() {
				let params = {
					title: this.inviteForm.title,
					attachmentId: this.inviteForm.attachmentId,
					formPosition: this.inviteForm.formPosition,
					formTitle: this.inviteForm.formTitle,
					formId: this.formIds,
					officeIds: this.inviteForm.visible,
				}
				if(this.inviteForm.id) {
					params.id = this.inviteForm.id;
				}
				wpInvitingPage.save(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						this.$router.push({
							name: "market.inviteManage",
							query: {}
						})
						this.updateLoadingStatus({
							isLoading: false
						});
					} else {
						this.updateLoadingStatus({
							isLoading: false
						});
					}
				}).catch(errors.call(this));
			},
			handleSuccess(data) {
				if(data.status == "success") {
					this.inviteForm.attachmentId = data.data.id;
					this.saveForm();
					this.updateLoadingStatus({
						isLoading: true
					});
				} else {
					this.$Message.error(data.message);
				}
			},
			handleFormatError() {
				this.$Message.error("需使用'jpg','jpeg','png','gif'格式");
				this.updateLoadingStatus({
					isLoading: false
				});
			},
			handleMaxSize() {
				this.$Message.error("图片不得大于2M");
				this.updateLoadingStatus({
					isLoading: false
				});
			},
			handleBeforeUpload(file) {
				let reader = new FileReader();
				// readAsDataURL 方法用于读取指定 Blob 或 File 的内容
				// 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）
				// 读取文件作为 URL 可访问地址
				reader.readAsDataURL(file);
				const _this = this;
				reader.onloadend = function(e) {
					_this.inviteForm.uploadFile = reader.result;
					if(reader.result) {
						_this.$refs.formInvite.validateField('uploadFile');
					}
				};
				this.uploadList = file;
				this.isUploadImg = true;
				// 返回 falsa 停止自动上传 我们需要手动上传
				return false;
			},
			upload() { // 上传文件
				let item = this.uploadList;
				this.$refs.upload.post(item);
			},
			selectForm() {
				this.getFormList();
				this.frmModel = true;
			},
			pvwForm() {
				this.pvwModel = true;
			},
			pvwClose() {
				this.pvwModel = false;
			},
			cancelForm() {
				this.formIds = '';
				this.inviteForm.frmName = '';
			},
			frmOk() {
				common.viewForm(this.formIds).then(valid.call(this)).then(res => {
					if(res.ok) {
						if(res.data.data) {
							this.frmModel = false;
						} else {
							this.$Message.error('该表单为空，请重新选择');
							this.frmModel = true;
						}
					}
				}).catch(errors.call(this));
			},
			frmCancel() {
				this.frmModel = false;
			},
			datafunc() {
				return new promise().then(() => {}).catch(() => {})
			},
			textChange(val) {
				this.getFormList();
			},
			PageSizeChange(val) {
				this.pageSize = val;
				this.getFormList();
			},
			PageChange(val) {
				this.pageNo = val;
				this.getFormList();
			},
			handleSubmit(name) {
				if(this.$refs.companysVisible.showCheckboxGroup && !this.inviteForm.visible.length) {
					this.$Message.error('您已选择分校可见，但未指定分校')
					return false
				}
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.updateLoadingStatus({
							isLoading: true
						});
						if(this.isUploadImg) {
							this.upload();
						} else {
							this.saveForm();
						}
					} else {}
				})
			},
			checkComany(data) {
				this.inviteForm.visible = data;
			},
		}
	}
</script>