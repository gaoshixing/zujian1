<style lang="less">
	.file {
		padding-top: 26px;
		.title {
			.lf {
				font-size: 16px;
				font-weight: bold;
				line-height: 44px;
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
			}
		}
		.file_table {
			margin-top: 12px;
			.ivu-table th {
				background: #fff;
			}
			&.ivu-table-wrapper {
				border: none;
			}
			.ivu-table:after {
				display: none;
			}
		}
		.page-box {
			display: flex;
			justify-content: center;
			margin-top: 20px;
		}
		.btn-uploaf {
			display: none;
		}
		.imgBg{
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0,0,0,0.5);
			line-height: 180vh;
			z-index: 1999;
			text-align: center;
			img{
				height: 80vh;
				display: inline-block;
			}
			&.hid{
				display: none;
			}
		}
	}
	
	.log_modal {
		.ivu-modal-footer {
			display: none;
		}
	}
	
	.update_modal {
		.btnright {
			.btn {
				display: inline-block;
			}
		}
	}
</style>

<template>
	<div class="file">
		<div class="title">
			<span class="lf">文件</span>
		</div>
		<btn-list title="院校-列表" :btnList="btninfo"></btn-list>
		<Table ref="fileTable" :columns="fileCol" :data="fileList" class="file_table">
		</Table>
		<div class="page-box" v-show="count>10">
			<div style="margin: auto;display: inline-block;">
				<Page :total="count" :page-size="10" :current="page" show-total :show-sizer="count>10" show-elevator @on-change="pageChange" @on-page-size-change="sizeChange"></Page>
			</div>
		</div>
		<Modal v-model="logModal" width="730" class-name="log_modal vertical-center-modal" @on-click="logOk">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				日志
			</p>
			<div>
				<Table ref="logTable" :columns="logCol" :data="logItem" class="table">
				</Table>
			</div>
			<!--<div slot="footer" style="display: none;">
			</div>-->
		</Modal>
		<Modal v-model="panModal" width="730" class-name="pan_modal vertical-center-modal">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				从藤门云盘中添加文件
			</p>
			<div>

			</div>
			<div slot="footer" style="display: none;">
			</div>
		</Modal>
		<Modal v-model="updateModal" width="500" class-name="update_modal vertical-center-modal">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				更新文件
			</p>
			<div>
				<Form ref="formFile" :label-width="150" class="formFile">
					<FormItem label="附件" style="margin-bottom: 14px;" class="scan">
						<p>
							<a href="javascript:void(0);">{{fileName}}</a>
						</p>
						<div class="btnright">
							<Button type="primary" @click="onUploadLocal">本地上传</Button>
							<Button type="primary" @click="addByPan">从云盘添加</Button>
						</div>
					</FormItem>
				</Form>
			</div>
		</Modal>
		<div v-if="pan.show">
			<yunpan @on-confirm="doSendFile" @on-cancel="doCancel" :visible="pan.visible" :detector="detector"></yunpan>
		</div>
		<up-to-pan ref="uptopan1" :object-id="gInfo.id" :serviceGroupId="gInfo.id" :dir="(gInfo.folderName?('/'+gInfo.folderName):'')+'/plan'" :fileId="fileId" :isUpdate="1" type="pl_group" fileType="all" @uploadok="onUploadOk1" :detector="detector"/>
		<up-to-pan ref="uptopan" :object-id="gInfo.id" :serviceGroupId="gInfo.id" :dir="(gInfo.folderName?'/'+gInfo.folderName:'')+'/plan'" type="pl_group" fileType="all" @uploadok="onUploadOk" />
		<div class="imgBg" :class="{hid:imgBgShow}" @click="hidImg" v-if="!imgBgShow">
			<img :src="displayUrl(imgPath,imgName)"/>
		</div>
	</div>
</template>

<script>
	import valid, {
		errors,
		plFile,
		common,
		sys,
	} from "../../libs/request.js";
	import yunpan from "@public/modules/yunpan";
	import BtnList from '@public/modules/btnlist';
	import upToPan from '../../modules/planUpToPan';

	import { mapState, mapGetters } from 'vuex';
	let iconMap = {
		pdf: '#icon-p',
		docx: '#icon-w',
		doc: '#icon-w',
		xlsx: '#icon-x',
		xls: '#icon-x',
	}
	export default {
		props: {
			inportal: {
				type: Boolean,
				default: false,
			},
			groupInfo: {
				type: Object,
				default: {},
			}
		},
		data() {
			return {
				imgName:'',
				imgPath:"",
				groupId: this.$route.params.gid,
				count: 11,
				page: 1,
				pageSize: 10,
				fileId: '',
				theFid:'',
				detector:{
					type:'name',
					condition:'',
					content:''
				},
				panModal: false,
				fileName: '',
				btninfo: [
					{
						text: '本地上传',
						type: 'primary',
						event: this.btnOnUploadLocal
					},
					{
						text: '从云盘添加',
						type: 'primary',
						event: this.addByPan
					},
				],
				pan: {
					visible: false,
					show: false
				},
				updateModal: false,
				imgBgShow:true,
				logModal: false,
				logItem: [],
				logCol: [{
						type: 'index',
						width: 60,
						align: 'center',
						renderHeader: (h, params) => {
							return h('div', {}, '序号')
						},
					},
					{
						title: '文件名',
						key: 'name'
					},
//					{
//						title: '操作',
//						key: 'content',
//						render: (h, params) => {
//							return h('div', {
//								domProps: {
//									innerHTML: params.row.content
//								}
//							}, '')
//						},
//					},
					{
						title: '时间',
						key: 'time'
					}
				],
				fileCol: [{
						title: '名称',
						key: 'name',
						render: (h, params) => {
							const t = params.row.fileName.split('.')[1];
							let icon = iconMap[t];
							if(!icon) {
								icon = '#icon-wenjian1';
							};
							return h('div', {
								style: {
									display: "flex",
									justifyContent: "space-start",
									alignItems: "center",
								}
							}, [
								h('svg', {
									'class': {
										'icon': true,
									},
									style: {
										color: '#41b3ae',
										fontSize: '14px',
										width: '34px',
										height: '34px',
										margin: '12px 12px 12px 0'
									},
									attrs: {
										ariaHidden: "true"
									}
								}, [
									h('use', {
										attrs: {
											"xlink:href": icon
										},

									}, ''),
								]),
								h('span', {
									style: {
										color: '#41b3ae',
										cursor: 'pointer',
									},
									on: {
										click: () => {
											this.jumpView(params.row)
										}
									}
								}, params.row.fileName),
							])
						},
					},
					{
						title: '上传人',
						key: 'userName',
					},
					{
						title: '最后更新时间',
						key: 'createDate',
					},
					{
						title: '操作',
						key: 'handle',
						align: 'center',
						render: (h, params) => {
							return h('div', {}, [h("a", {
								attrs: {
									href: 'javascript:void(0);'
								},
								on: {
									click: () => {
										this.uploadFlie(params.row)
									}
								}
							}, '更新'), h("a", {
								attrs: {
									href: 'javascript:void(0);'
								},
								style: {
									marginLeft: '16px',
								},
								on: {
									click: () => {
										this.getLog(params.row);
									}
								}
							}, '日志'), h("a", {
								attrs: {
									href: 'javascript:void(0);'
								},
								style: {
									marginLeft: '16px',
									color:"red !important",
									display:params.row.creator==this.userInfo.id?'':"none"
								},
								on: {
									click: () => {
										this.delFile1(params.row.id);
									}
								}
							}, '删除'), ])
						}
					}
				],
				fileList: []
			}
		},
		components: {
			yunpan,
			BtnList,
			upToPan
		},
		computed: {
			...mapGetters('plan', ['pid']),
        	...mapState(['userInfo']),
			gInfo() {
				return this.groupInfo;
			},
		},
		created() {
			let params = {
				serviceGroupId: this.groupId,
				//				menuId: this.pid
			}
			if(!this.inportal){
				params.menuId=this.pid||'401';
			}
			sys.getFilesByMenuIdAndServiceGroupId(params).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.fileList = res.data.data.list;
					this.count = res.data.data.count;
					this.page = res.data.data.pageNo;
					this.pageSize = res.data.data.pageSize;
				}
			}).catch(errors.call(this));
		},
		methods: {
			displayUrl(p,n) {
				return sys.downloadPan(p,n);
			},
			getList() {
				let params = {
					pageNo: this.page,
					pageSize: this.pageSize,
					serviceGroupId: this.groupId,
					//					menuId: this.pid
				}
				if(!this.inportal){
					params.menuId=this.pid||'401';
				}
				sys.getFilesByMenuIdAndServiceGroupId(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.fileList = res.data.data.list;
						this.count = res.data.data.count;
						this.page = res.data.data.pageNo;
						this.pageSize = res.data.data.pageSize;
					}
				}).catch(errors.call(this));
			},
			seeImg(val){
				this.imgName=val.fileName;
				this.imgPath=val.filePath;
				this.imgBgShow=false;
			},
			hidImg(){
				this.imgBgShow=true;
			},
			jumpView(item) {
				let imgmap={
					png:1,
					jpg:1,
					gif:1,
					psd:1,
					jpeg:1,
					bmp:1,
				}
				if(imgmap[item.fileName.split('.')[1].toLowerCase( )]) {
					this.seeImg(item);
				}else{
					window.open(`https://portal.ivygate.cn/index.php/webutils/document/${item.fileId}`);
				}
			},
			getLog(obj) {
//				console.log(obj);
//				const data = new FormData();
//				data.append('filePath', obj.filePath.indexOf('/') == 0 ? obj.filePath : '/' + obj.filePath);
//				data.append('fileName', obj.fileName);
				this.logModal = true;
				let params = {
					filePath: obj.filePath.indexOf('/') == 0 ? obj.filePath : '/' + obj.filePath,
					fileName: obj.fileName,
				}
				sys.getPanFileHistorys(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						let arr=[];
						let obj= res.data.data.data.versions;
						for (var i in obj){
							arr.push(obj[i]);
						}
						console.log(obj)
						this.logItem=arr;
						console.log(this.logItem)
					}
				}).catch(errors.call(this));

			},
			logOk() {

			},
			uploadFlie(data) {
				this.updateModal = true;
				this.fileName = data.fileName;
				this.fileId = data.fileId;
				this.detector.content=this.fileName;
				this.detector.condition='alike';
				console.log(this.detector)
			},
			addByPan() {
				this.pan.show = true;
				this.pan.visible = true;
			},
			doSendFile(item) {
				console.log(item)
				let params = {
					"panFilePath": item.dir,
					"filePath": (this.gInfo.folderName?'/'+this.gInfo.folderName:'')+'/plan',
					"fileName": item.name,
					'objectId': this.groupId,
					"type": 'pl_group',
					"isCover": 1,
					'menuId':'401'
				}
				sys.uploadPanFileToPan(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						console.log(res)
						if(res.data.statusCode == "204"){
							this.$Modal.confirm({
								onOk: () => {
									params.isCover=1;
									sys.uploadPanFileToPan(params).then(valid.call(this)).then(res => {
										this.getList();
										this.doCancel();
										
									}).catch(errors.call(this));
								},
								onCancel: () => {
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
									}, res.data.message)
								}
							})
						} else{
							this.getList();
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
			pageChange(val) {
				this.page = val;
				this.getList();
				//					this.$el.parentElement.scrollTop = 0
			},
			sizeChange(val) {
				this.pageSize = val;
				this.getList()
			},
			onUploadLocal() {
				this.$refs.uptopan1.doUpload();
			},
			btnOnUploadLocal() {
				this.$refs.uptopan.doUpload();
			},
			onUploadOk(data) {
				console.log(data)
				if(data.status == "success") {
					this.getList();
				} else {
					this.$Message.error(data.message);
				}
			},
			onUploadOk1(data) {
				console.log(data);
				if(data.status == "success") {
					this.getList();
				} else {
					this.$Message.error(data.message);
				}
			},
			delFile1(id) {
				if(id) {
					let self=this;
					this.$Modal.confirm({
						onOk: function() {
							let params = {
								'id': id
							}
							sys.delete(params).then(valid.call(self)).then(res => {
								if(res.ok) {
									self.$Message.success(res.data.message);
									self.getList();
								}
							}).catch(errors.call(self));
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
							}, '是否删除该文件？ ')
						}
					});
				}
			},
		}
	}
</script>