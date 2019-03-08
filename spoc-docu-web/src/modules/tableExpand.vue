<style lang="less" scoped>
	.schoolsTable {
		.tags {
			span {
				padding: 3px 10px;
				margin-right: 10px;
				background-color: #d0d0d0;
				border-radius: 3px;
				color: white;
			}
		}
		.schools {
			margin-top: 18px;
			overflow: hidden;
			min-width: 900px;
			background-color: rgb(248, 248, 249);
			.schoolName {
				max-width: 140px;
				float: left;
			}
			.docsInfo {
				float: left;
				overflow: hidden;
				.docInfo{
					overflow: hidden;
					.docType{
						float: left;
						width:100px;
					}
					.docs {
						float: left;
						overflow: hidden;
						li {
							margin-bottom: 15px;
							margin-top: 0px;
							margin-right: 10px;
							list-style: none;
							float: left;
							word-break: break-all;
							&.docName {
								width: 246px;
								color: #44bcb7;
							}
							&.docStatu {
								margin-top: 0;
								width: 100px;
								color: #cccccc;
								span {
									color: #495060;
									&:hover {
										color: #44bcb7;
									}
								}
								.ivu-select-dropdown-list li{
									margin-bottom: 0;
								}
								.point {
									float: left;
									position: relative;
									top: 3px;
									margin-right: 6px;
									width: 8px;
									height: 8px;
									border-radius: 5px;
								}
								.statu_null,
								.statu_ {
									background-color: #cccccc;
								}
								.statu_0 {
									background-color: #a1ddaf;
								}
								.statu_1 {
									background-color: #c7de90;
								}
								.statu_2 {
									background-color: #dfed64;
								}
								.statu_3 {
									background-color: #e58d8d;
								}
								.statu_4 {
									background-color: #7c7ce6;
								}
								.statu_5 {
									background-color: #f2eb99;
								}
								.statu_6 {
									background-color: #44bcb7;
								}
								.statusIcon {
									margin-left: 3px;
								}
								&:hover {
									color: #44bcb7;
								}
							}
							&.action {
								color: #44bcb7;
								margin-right: 13px;
							}
						}
					}
				}
				
				.addDocu {
					cursor: pointer;
					width: 70px;
					height: 23px;
					line-height: 23px;
					text-align: center;
					border: 1px solid #44bcb7;
					border-radius: 5px;
					color: #44bcb7;
				}
			}
		}
	}
</style>
<template>
	<div class="schoolsTable">
		<div class="tags" v-if="JSON.stringify(docsObject)!= '{}'">
			<span v-for="(item, index) in row.tags"  :key="'tags_' + index">{{item}}</span>
		</div>
		<div class="schools" v-for="(item0, key) in docsObject" :key="'schools_'+key">
			<div class="schoolName" :style="{ width: nameWidth + 'px' }">{{key}}</div>
			<div class="docsInfo">
				<div class="docInfo"  v-for="(item1, key1) in item0" :key="'docInfo_'+key1">
					<div class="docType">{{key1}}</div>
					<div class="docs">
						<ul v-for="(childItem, key2) in item1" :key="'docs_'+key2">
							<li class="docName">
								<a href="javascript:void(0)" @click="showYunPanDoc(childItem.fileId)">{{childItem.fileName}}</a>
								<p v-show="childItem.remarks" style="color:#000;">备注：{{childItem.remarks}}</p>
							</li>
							<li class="docStatu">
								<Select placeholder="未开始"  size="small" :disabled="(childItem.status == 6 || childItem.auditStatus=='commit' || from == 'caseManage')" :value="childItem.status + '_' + childItem.id + '_' + key + '_' + childItem.typeValue + '_' + childItem.schoolId" @on-change="changeDocStatus" style="width:100px">
									<Option  
										:disabled="item.value == 6 || item.value == 5 || item.value == -1 || 
										((!childItem.fileName || childItem.fileName =='') && (item.value ==3 || item.value ==4)) ||
										(isAmericanTeacher() && item.value > 3)" 
										:value="item.value + '_' + childItem.id + '_' + key + '_' + childItem.typeValue + '_' + childItem.schoolId" 
										v-for="(item, index) in filters" 
										:key="'docStatu_' + item.id + index">
										{{item.label}}
									</Option>
								</Select>
							</li>
							<span v-if="!(childItem.status == 3 && isAmericanTeacher()) ">
								<li class="action" v-if="from == 'myStudent'" v-show="childItem.status!= 0 && childItem.fileName && childItem.status != 6 && (userInfo.id == childItem.createBy || (userInfo.id != childItem.createBy && childItem.status == 3))">
									<a href="javascript:void(0)" @click="docuAction(2, key, childItem)">更新</a>
								</li>
								<li class="action" v-if="from == 'myStudent' && (!isAmericanTeacher())" v-show="(childItem.status!= 0 && childItem.status!= 5 && childItem.status!= 6 && childItem.fileName && childItem.checkFlag == 0 && (childItem.auditStatus =='save'|| childItem.auditStatus == null || childItem.auditStatus != 'commit') || (userInfo.id != childItem.createBy && childItem.status == 3))">
									<a href="javascript:void(0)" @click="docuAction(3, key, childItem)">审核</a>
								</li>
								<li class="action" v-if="from == 'myStudent'" v-show="childItem.status!= 0 && childItem.fileName && childItem.status == 1 && (userInfo.id == childItem.createBy)">
									<a href="javascript:void(0)" @click="docuAction(6, key, childItem)">删除</a>
								</li>
								<li class="action" v-if="from == 'myStudent'" v-show="childItem.status!= 0 && childItem.fileName && (childItem.status != 1 || childItem.checkFlag == 1)">
									<a href="javascript:void(0)" @click="docuAction(4, key, childItem)">共享</a>
								</li>
								<li class="action" v-if="from == 'myStudent'" v-show="childItem.status!= 0 && childItem.fileName && childItem.checkFlag == 1">
									<a href="javascript:void(0)" @click="docuAction(7, key, childItem)">定稿</a>
								</li>
								<li class="action" v-if="from == 'myStudent'" v-show="childItem.status!= 0 && childItem.fileName && (!childItem.remarks || childItem.remarks =='') && (userInfo.id == childItem.createBy  || (userInfo.id != childItem.createBy && childItem.status == 3))">
									<a href="javascript:void(0)" @click="docuAction(8, key, childItem)">添加备注</a>
								</li>
								<li class="action" v-if="from == 'myStudent'" v-show="childItem.status!= 0 && childItem.fileName && (childItem.remarks && childItem.remarks !='') && (userInfo.id == childItem.createBy || (userInfo.id != childItem.createBy && childItem.status == 3))">
									<a href="javascript:void(0)" @click="docuAction(8, key, childItem)">修改备注</a>
								</li>
							</span>
						</ul>
					</div>
				</div>
				<div class="addDocu" v-if="key =='基础文书' && from == 'myStudent'" @click="docuAction(1, key)">
					<a href="javascript:void(0)">添加文书</a>
				</div>
				<div class="addDocu" v-if="key !='基础文书' && from == 'myStudent'" @click="docuAction(5, key)">
					<a href="javascript:void(0)">添加文书</a>
				</div>
			</div>
		</div>
	
		<up-to-pan ref="uptopan" :object-id="objectId" :dir="folderName" type="essay" fileType="all" @uploadok="onUploadOk" />
		<Modal v-model="modal1" :loading="modalLoading1" width=728 title="添加基础文书" @on-ok="ok(1)" @on-cancel="cancel(1)">
			<div>
				<Form ref="basicStepForm1" :rules="basicFormValidate1" :model="baseDocu" :label-width="180">
					<Form-item label="文书类型：" prop="docuType">
						<Select v-model="baseDocu.docuType" style="width:200px">
							<Option v-if="item.value != 0" v-for="item in docuTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</Form-item>
					<Form-item label="文书文件：" prop="hasUploadDoc">
						<div style="color:#41b3ae;">{{fileName}}</div>
						<div style="overflow:hidden;">
							<div style="float:left; margin-right:10px;">
								<Button type="primary" @click="onUploadLocal">本地上传</Button>
							</div>
							<div style="float:left; ">
								<Button type="primary" @click="showPan()">云盘上传</Button>
							</div>
						</div>
						<Input v-model="baseDocu.hasUploadDoc" style="display:none;"></Input>
					</Form-item>
				</Form>
			</div>
		</Modal>
		<Modal v-model="modal2" width=728 title="更新" @on-ok="ok(2)" @on-cancel="cancel(2)">
			<div>
				<Form ref="basicStepForm2" :model="baseDocu" :label-width="180">
					<Form-item label="文书文件：" prop="hasUploadDoc">
						<div style="color:#41b3ae;">{{fileName}}</div>
						<div style="overflow:hidden;">
							<div style="float:left; margin-right:10px;">
								<Button type="primary" @click="onUploadLocal">本地上传</Button>
							</div>
							<div style="float:left; ">
								<Button type="primary" @click="showPan()">云盘上传</Button>
							</div>
						</div>
						<Input v-model="baseDocu.hasUploadDoc" style="display:none;"></Input>
					</Form-item>
				</Form>
			</div>
		</Modal>
		<Modal v-model="modal3" width=428 title="审核" @on-ok="ok(3)" @on-cancel="cancel()">
			<div>
				<p style="text-indent:2em;line-height:30px;">确定提交当前文书 <span style="color:#44bcb7;padding:0 5px">{{actionFileName}}</span>进行审核？</p>
			</div>
		</Modal>
		<Modal v-model="modal4" :loading="modalLoading4" width=728 title="共享" @on-ok="ok(4)" @on-cancel="cancel(4)">
			<div>
				<Form ref="basicStepForm4" :rules="basicFormValidate4" :model="baseDocu" :label-width="180">
					<Form-item label="分享老师：" prop="shareTeacher">
						<Checkbox-group v-model="shareTeacher" @on-change="changeShare">
							<Checkbox v-if="item.userId != userInfo.id" v-for="(item,index) in teacherArray" :label="item.userId" :key="'shareTeacher_'+ item.userId + index">{{item.name}}</Checkbox>
						</Checkbox-group>
					</Form-item>
				</Form>
			</div>
		</Modal>
		<Modal v-model="modal5" :loading="modalLoading5" width=728 title="添加学校文书" @on-ok="ok(5)" @on-cancel="cancel(5)">
			<div>
				<Form ref="basicStepForm5" :rules="basicFormValidate5" :model="baseDocu" :label-width="180">
					<Form-item label="文书类型：" prop="docuType">
						<Select v-model="baseDocu.docuType" style="width:200px" @on-change="changeSchoolDocType">
							<Option v-for="item in docuTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</Form-item>
					<Form-item v-show="baseDocu.docuType != 0">
						<Checkbox v-model="isCopyBaseDoc" @on-change="changeIsCopyBaseDoc">复用当前类型文书的基础版文件</Checkbox>
					</Form-item>
					<div v-show="isCopyBaseDoc">
						<Form-item label="复用文件：" prop="hasUploadDoc">
							<div v-show="copyBaseFileName">
								<Checkbox v-model="selectBaseDoc" @on-change="isSelectCopyDoc"></Checkbox>{{copyBaseFileName}}
							</div>
							<div v-show="!copyBaseFileName">
								暂无可复用文书
							</div>
							<Input v-model="baseDocu.hasUploadDoc" style="display:none;"></Input>
						</Form-item>
					</div>
					<div v-show="!isCopyBaseDoc">
						<Form-item label="文书文件：" prop="hasUploadDoc">
							<div style="color:#41b3ae;">{{fileName}}</div>
							<div style="overflow:hidden;">
								<div style="float:left; margin-right:10px;">
									<Button type="primary" @click="onUploadLocal">本地上传</Button>
								</div>
								<div style="float:left; ">
									<Button type="primary" @click="showPan()">云盘上传</Button>
								</div>
							</div>
							<Input v-model="baseDocu.hasUploadDoc" style="display:none;"></Input>
						</Form-item>
					</div>
				</Form>
			</div>
		</Modal>
		<Modal v-model="modal6" width=428 title="删除" @on-ok="ok(6)" @on-cancel="cancel()">
			<div>
				<p style="text-indent:2em;line-height:30px;">确定删除当前文书 <span style="color:#44bcb7;padding:0 5px">{{actionFileName}}</span>？</p>
			</div>
		</Modal>
		<Modal v-model="modal7" width=428 title="定稿" @on-ok="ok(7)" @on-cancel="cancel()">
			<div>
				<p style="text-indent:2em;line-height:30px;">确定定稿当前文书 <span style="color:#44bcb7;padding:0 5px">{{actionFileName}}</span>？</p>
			</div>
		</Modal>
		<Modal v-model="modal8" :loading="modalLoading8" width=728 title="备注" @on-ok="ok(8)" @on-cancel="cancel(8)">
			<div>
				<Form ref="basicStepForm8" :rules="basicFormValidate8" :model="baseDocu" :label-width="180">
					<Form-item label="备注：" prop="remarks">
						<Input v-model="baseDocu.remarks" :rows='8' style="width:400px;" type="textarea" placeholder="请输入"></Input>
					</Form-item>
					<div style="color:red;margin-left: 180px;" v-show="strlen(baseDocu.remarks) > 200">最多输入200个字符，每个汉字占两个字符，已输入{{strlen(baseDocu.remarks)}}个字符</div>
				</Form>
			</div>
		</Modal>
		<div v-if="loadYunPan">
			<yunpan @on-confirm="doSendFile" ref="yunpan" @on-cancel="doCancel" :visible="pan.visible"></yunpan>
		</div>
	</div>
</template>
<script>
	import { mapState } from 'vuex'
	import valid, {
		errors,
		common,
		sys,
		docuManage,
		docEssayTask
	} from "../libs/request"
	import yunpan from '@public/modules/yunpan'
	import upToPan from './docuUpToPan';

	export default {
		props: {
			nameWidth: [String,Number],
			row: Object,
			from: String, //caseManage ||  myStudent
			studentType: String, // UG本科  PG研究生 HS中学
			docuTypeList: Array, //添加文书时的文书类别
			filters: Array, //文书进度字典
			teacherArray: Array, //组内顾问，用于分享
			menuId: String,
		},
		data() {
			return {
				loadYunPan: false, //是否加载云盘组件
				copyDocObj: {}, //复制的云盘文件对象
				copyBaseFileName: '', // 复用的文件名
				selectBaseDoc: false, // 是否选择了复用文件
				isCopyBaseDoc: false, //是否显示复用基础文书
				schoolIds: {}, //学校ID MAP
				status: '', //当前文书状态
				actionFileName: '', //要操作（删除、定稿、审核）的文件名
				docGroupType: '', //'基础文书' ||  '学校的名称'
				attachmentId: '', // 附件表ID
				schoolId: '', //文书学校ID 基础文书的学校ID默认为0
				objectId: '', //上传ID
				folderName: '', //上传目录
				docsObject: {}, //文书集合
				docId: '', // 用于操作的文书ID
				fileId: '', // 上传返回云盘文件ID
				fileName: '', // 上传返回云盘文件名称
				shareTeacher: [], //共享老师
				modal1: false, //添加基础文书
				modalLoading1: true, //添加文书loading
				modal2: false, //文书更新
				modal3: false, //文书审核
				modal4: false, //文书共享
				modalLoading4: true, //文书共享Loading
				modal5: false, //文书添加
				modalLoading5: true, //文书添加loading
				modal6: false, //文书删除
				modal7: false, //文书定稿
				modal8: false, //文书备注
				modalLoading8: true, //文书备注Loading
				baseDocu: {
					docuType: '', //文书类型  简历|| CA||PS||推荐信 等等
					hasUploadDoc: '', //是否上传了文书文件
					shareTeacher: [], //共享老师
					remarks: '', //备注
				},
				basicFormValidate1: { //添加基础文书模态框校验
					docuType: [{
						required: true,
						type: 'string',
						message: '必填项',
						trigger: 'change'
					}],
					hasUploadDoc: [{
						required: true,
						type: 'string',
						message: '请上传文件',
						trigger: 'change'
					}]
				},
				basicFormValidate5: { //添加学校文书模态框校验
					docuType: [{
						required: true,
						type: 'string',
						message: '必填项',
						trigger: 'change'
					}],
					hasUploadDoc: [{
						required: true,
						type: 'string',
						message: '请上传文件',
						trigger: 'change'
					}]
				},
				basicFormValidate8: { //文书备注
					remarks: [{
						required: true,
						type: 'string',
						message: '必填项',
						trigger: 'change'
					}],
				},
				basicFormValidate4: {
					shareTeacher: [{
						required: true,
						type: 'array',
						min: 1,
						message: '至少选择一项',
						trigger: 'change'
					}]
				},
				fileYunpanNum: 1,
				pan: {
					visible: false
				}
			}
		},
		computed: {
			...mapState(['userInfo']),
		},
		components: {
			yunpan,
			upToPan
		},
		mounted() {
			this.loadData()
			this.getFolderName()
		},
		methods: {
			isAmericanTeacher(){
				let roleIds = this.userInfo.roleId.split(',')
				return roleIds.indexOf('8') >= 0 ? true : false
			},
			strlen(str){  
				if(!str){
					return 0
				}
				var len = 0
				for (let i = 0; i < str.length; i++) {   
					let c = str.charCodeAt(i)
					//单字节加1   
					if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {   
						len++;   
					} else {   
						len += 2;   
					}   
				}   
				return len 
			},
			//切换是否显示复用基础文件
			changeIsCopyBaseDoc() {
				this.baseDocu.hasUploadDoc = ''
				this.selectBaseDoc = false
				this.copyBaseFileName = ''
				if(this.isCopyBaseDoc && this.baseDocu.docuType != '') {
					this.changeSchoolDocType(this.baseDocu.docuType)
				}
			},
			//是否选择了复制基础文件
			isSelectCopyDoc() {
				if(this.selectBaseDoc) {
					this.doSendFile(this.copyDocObj)
				} else {
					this.baseDocu.hasUploadDoc = ''
					this.fileId = '' //云盘文件ID
					this.attachmentId = '' //附件表ID
					this.fileName = '' //文件名
				}
			},
			//切换选择学校文书类别
			changeSchoolDocType(val) {
				if(this.isCopyBaseDoc) {
					this.baseDocu.hasUploadDoc = ''
					this.docsObject['基础文书'].forEach((item, index) => {
						if(item.typeValue == val) {
							/* fileId:"117448"
							fileName:"1.png"
							id:"1b74c036f38643d2bdaad379c02760fa"
							schoolId:"0"
							status:"6"
							typeName:"简历"
							typeValue:"1 */
							this.copyBaseFileName = item.fileName
							this.copyDocObj = item
						}
					})
				}
			},
			//云盘打开文件
			showYunPanDoc(fileId) {
				//console.log(fileId)
				if(fileId) {
					window.open(`https://portal.ivygate.cn/index.php/webutils/document/${fileId}`);
				}
			},
			//获取文书类别汉字
			getDocTypeFont(key) {
				let docType = '';
				this.docuTypeList.forEach((item, index) => {
					if(item.value == key) {
						docType = item.label
					}
				})
				return docType || key
			},
			//切换分享老师
			changeShare(val) {
				this.baseDocu.shareTeacher = val
			},
			//修改进度
			changeDocStatus(val) {
				//item.value + '_' + childItem.id + '_' + key + '_' + childItem.typeValue + '_' + childItem.schoolId
				console.log(val)
				if(!val){
					return false
				}
				let param = val.split('_')
				if(param.length < 3) {
					return false;
				}
				if(param[0] != null && param[0] != 'null') {
					let obj = {
						status: param[0]
					}
					if(param[1] && param[1] != 'null'){
						obj.id = param[1]
					} else {
						obj.serviceGroupId = this.row.groupId,
						obj.type = param[3]
						obj.schoolId = (param[4] && param[4] !='null') ? param[4] : 0
					}
					docuManage.progress(obj).then(valid.call(this)).then(res => {
						if(res.ok) {
							//this.loadData()
							this.resetData()
							this.$emit('reLoadParentData')
						}
					})
					.catch(errors.call(this))
					.finally(() => {})
				}
			},
			//获取服务组云盘文件夹
			getFolderName() {
				let obj = {
					id: this.row.groupId
				}
				common.getFolderName(obj).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.folderName = '/' + res.data.data.folderName + '/essay'
							//console.log("this.folderName = " + this.folderName)
						}
					})
					.catch(errors.call(this))
					.finally(() => {})
			},
			loadData(isEdit) {
				let obj = {
					groupId: this.row.groupId,
					type: this.studentType
				}
				docEssayTask.listEssay(obj).then(valid.call(this)).then(res => {
					if(res.ok) {
						let resArray = res.data.data
						let docsRes = {}
						let schoolIds = {}
						docsRes['基础文书'] = {} //基础文书排第一位，无论有无文书都会存在
						resArray.forEach((item, index) => {
							if(docsRes[item.baseName]) {
								if(docsRes[item.baseName][item.typeName]) {
									docsRes[item.baseName][item.typeName].push(item)
								} else {
									docsRes[item.baseName][item.typeName] = [item]
								}
							} else {
								docsRes[item.baseName] = {}
								docsRes[item.baseName][item.typeName] = [item]
							}
							schoolIds[item.baseName] = item.schoolId
						})
						this.docsObject = docsRes
						this.schoolIds = schoolIds
						
						if(isEdit){
							this.$emit('reopen')
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {})
			},
			//云盘相关开始
			showPan() {
				this.pan.visible = true;
			},
			doSendFile(item) {
				const params = {
					objectId: this.objectId,
					fileName: this.isCopyBaseDoc ? item.fileName : item.name,
					panFilePath: this.isCopyBaseDoc ? this.folderName : item.dir, //如果是复用基础文件则肯定是同一文件目录
					menuId: this.menuId,
					type: 'essay',
					filePath: this.folderName,
				};
				this.$refs.yunpan.uploadPanFileToPan(params).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						this.fileId = res.data.data.fileId //云盘文件ID
						this.attachmentId = res.data.data.id //附件表ID
						this.fileName = res.data.data.fileName //文件名
						this.baseDocu.hasUploadDoc = '非空校验占位字符串'
						this.close();
					}
				});
			},
			doCancel() {
				this.close();
			},
			close() {
				this.pan.visible = false;
			},
			//云盘相关结束

			//文件操作  1、添加基础文书  2、更新 3、审核 4、共享 5、添加学校文书  6、删除 7、定稿 8、备注
			docuAction(type, key, item) {
				if(type != 5 && type != 1) {
					this.docId = item.id //文书ID
					this.objectId = item.id
					this.baseDocu.docuType = item.typeValue //文书类型的KEY  简历|| CA||PS||推荐信的KEY等等
					this.baseDocu.remarks = item.remarks //备注
					this.docGroupType = key // 基础文书 || '学校名称'
					this.fileName = item.fileName // 上传后的文件名
					this.actionFileName = item.fileName //操作（删除、定稿、审核）的文件名
					this.schoolId = item.schoolId //学校Id  基础文书默认为0
					this.status = item.status
				} else { //添加学校文书
					this.docGroupType = key // 基础文书 || '学校名称'
					this.schoolId = this.schoolIds[key] //学校ID
				}
				if(type == 1) { //添加基础文书 默认学校ID为0
					this.schoolId = 0
				} 
				if(type == 1 || type == 2 || type == 5) { //只要是添加、更新文书
					this.loadYunPan = true
					this.objectId = ''
				}
				if(type == 1 || type == 4 || type == 5) {
					this.$refs['basicStepForm' + type].resetFields()
					this.fileName = ''
					this.baseDocu.shareTeacher = []
					this.shareTeacher = []
				}
				this['modal' + type] = true
				if(type == 4){
					this.shareTeacher = []
					docuManage.listShare({id:item.id}).then(valid.call(this)).then(res => {
						if(res.ok) {
							console.log(res.data.data)
							res.data.data.forEach((item, index)=>{
								this.shareTeacher.push(item.user.id)
							})
						}
					})
					.catch(errors.call(this))
					.finally(() => {})
					
				}	
			},
			//本地上传
			onUploadLocal() {
				this.$refs.uptopan.doUpload();
			},
			//本地上传成功
			onUploadOk(data) {
				//let data1 = {"status":"success","statusCode":null,"message":"上传附件成功","location":null,"data":{"id":"7025d3181a8e4441814f1e4a5180f170","remarks":null,"createDate":"2018-05-08 09:13:45","updateDate":"2018-05-08 09:13:45","objectId":"","type":"essay","fileName":"前端开发规范 - Tower.pdf","initFileName":"前端开发规范 - Tower.pdf","filePath":"","dirName":null,"fileType":"all","savePath":null,"status":null,"isOverride":"0","studentId":null,"taskId":null,"creator":"1","fileId":"116241","menuId":"","isCover":null}}
				if(data.status == "success") {
					this.$Message.success(data.message);
					this.fileId = data.data.fileId //云盘文件ID
					this.attachmentId = data.data.id //附件表ID
					this.fileName = data.data.fileName //文件名
					this.baseDocu.hasUploadDoc = '非空校验占位字符串'
				} else {
					this.baseDocu.hasUploadDoc = ''
					this.$Message.error(data.message);
				}
			},
			resetData() {
				this.fileId = '' //云盘文件ID
				this.attachmentId = '' //附件表ID
				this.fileName = '' //文件名称
				this.baseDocu.docuType = '' //文件类型
				this.baseDocu.remarks = '' //文书备注
				this.schoolId = '' //学校ID  基础文书默认为0
				this.docId = '' //要操作的文书Id
				this.docGroupType = '' //文书组别   基础文书 || 学校名
				this.actionFileName = '' //要操作的文书文件名
				this.objectId = '' //uploadtopan要用
				this.copyDocObj = {} //复制的云盘文件对象
				this.copyBaseFileName = '' // 复用的文件名
				this.selectBaseDoc = false // 是否选择了复用文件
				this.isCopyBaseDoc = false //是否显示复用基础文书
			},
			saveDoc(obj, type) {
				docuManage.save(obj).then(valid.call(this)).then(res => {
						if(res.ok) {
							//保存绑定文书成功，设置获取到的文书ID
							this['modal' + type] = false
							this.resetData()
							this.loadData(true)
						}
					})
					.catch(errors.call(this))
					.finally(() => {})
			},
			//模态框确定事件
			ok(type) {
				if(type == 1 || type == 5) { //1添加基础文书  5添加学校文书
					let obj = {
						fileId: this.fileId, //云盘文件ID
						attachmentId: this.attachmentId, //附件表ID
						name: this.fileName, //文件名称
						type: this.baseDocu.docuType, //文件类型
						serviceGroupId: this.row.groupId, //服务组ID
						schoolId: this.schoolId, //学校ID  基础文书默认为0
					}
					let _this = this
					this.$refs['basicStepForm' + type].validate((validRes) => {
						if(validRes) {
							this.saveDoc(obj, type)
						} else {
							_this['modal' + type] = true
							_this['modalLoading' + type] = false
							setTimeout(() => {
								_this['modalLoading' + type] = true
							}, 0)
						}
					})
				}
				if(type == 2) { //更新
					if(this.fileId == '') {
						return false;
					}
					let obj = {
						id: this.docId, //文书ID
						fileId: this.fileId, //云盘文件ID
						attachmentId: this.attachmentId, //附件表ID
						name: this.fileName, //文件名称
						type: this.baseDocu.docuType, //文件类型
						serviceGroupId: this.row.groupId, //服务组ID
						schoolId: this.schoolId, //学校ID  基础文书默认为0
					}
					docuManage.save(obj).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.loadData()
							this.resetData()
						}
					})
					.catch(errors.call(this))
					.finally(() => {})
				}
				if(type == 3) { //3审核
					let obj = {
						id: this.docId,
						auditStatus: 'commit'
					}
					docuManage.audit(obj).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.loadData()
							this.resetData()
						}
					})
					.catch(errors.call(this))
					.finally(() => {})
				}
				if(type == 4) { //4共享
					let obj = {
						essayId: this.docId,
						userIds: this.shareTeacher.join(',')
					}
					let _this = this
					this.$refs.basicStepForm4.validate((validRes) => {
						if(validRes) {
							docuManage.share(obj).then(valid.call(this)).then(res => {
								if(res.ok) {
									_this.modal4 = false
								}
							})
							.catch(errors.call(this))
							.finally(() => {})
						} else {
							_this.modal4 = true
							_this.modalLoading4 = false
							setTimeout(() => {
								_this.modalLoading4 = true
							}, 0)
						}
					})
				}
				if(type == 6) { //6删除
					let obj = {
						id: this.docId
					}
					docuManage.delete(obj).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.resetData()
							this.loadData(true)
						}
					})
					.catch(errors.call(this))
					.finally(() => {})
				}
				if(type == 7) { //7定稿
					this.changeDocStatus('6_' + this.docId + '_' + this.docGroupType)
				}
				if(type == 8) { //8备注
					let _this = this
					if(this.strlen(this.baseDocu.remarks) > 200) {
						_this.modal8 = true
						_this.modalLoading8 = false
						setTimeout(() => {
							_this.modalLoading8 = true
						}, 0)
						return
					}
					let obj = {
						id: this.docId,
						remarks: this.baseDocu.remarks
					}
					this.$refs.basicStepForm8.validate((validRes) => {
						if(validRes) {
							docuManage.remark(obj).then(valid.call(this)).then(res => {
								if(res.ok) {
									this.modal8 = false
									this.loadData()
									this.resetData()
								}
							})
							.catch(errors.call(this))
							.finally(() => {})
						} else {
							_this.modal8 = true
							_this.modalLoading8 = false
							setTimeout(() => {
								_this.modalLoading8 = true
							}, 0)
						}
					})
				}
			},
			cancel(type) {
				this.loadYunPan = false
				if(typeof type != 'undefined') {
					this.$refs['basicStepForm' + type].resetFields()
				}
				this.copyDocObj = {} //复制的云盘文件对象
				this.copyBaseFileName = '' // 复用的文件名
				this.selectBaseDoc = false // 是否选择了复用文件
				this.isCopyBaseDoc = false //是否显示复用基础文书
			},
		}
	};
</script>