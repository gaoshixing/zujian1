<style lang="less">
    .applyDetail2{
        margin-bottom: 20px;
        .clear{
            margin-top: 10px;
            overflow: hidden;
            .fl{
                float: left;
                line-height: 40px;
                .pointer{
                    cursor: pointer;
                    color: #44bcb7;
                    margin-right: 5px;
                }
                .pointer1{
                    cursor: pointer;
                    color: #05c7ff;
                    margin-left: 15px;
                }
                .docs{
                    color: #999;
                    margin-right: 8px;
                }
            }
            .w155{
                color: #999;
                width:155px;
                margin-right: 8px;
                text-align: right;
                height: 40px;
            }
            .w500{
                height: 30px;
                width: 70%
            }
            .buttonMargin{
                margin-left: 162px;
                margin-top: 5px;
            }
        }
    }
    .applyDetail2_dialogContentF {
        p {
            line-height: 40px;
            span {
                
            }
        }
    }
    .visitUrl{
        word-wrap: break-word;
    }
</style>
<template>
<div class="applyDetail2">
    <btn-list title="准备申请材料" :btnList="btnListVal">
    </btn-list>
    <div :style="{display: tableShowStatus? 'block':'none'}">
        <div class="clear">
            <div class="fl w155">完成状态：</div>
            <div class="fl w70p">
                <div>
                    <RadioGroup v-model="resourceStatus">
                        <Radio :disabled="showEditStatus" label="0">未完成</Radio>
                        <Radio :disabled="showEditStatus" label="1">已完成</Radio>
                    </RadioGroup>
                </div>
                <!-- <div class="pointer">学生申请信息采集表</div> -->
            </div>
        </div>
        <div class="clear">
            <div class="fl w155">学校申请表：</div>
            <div class="fl w70p">
                <p><span class="pointer" @click="showSchoolApply">学校申请表</span><span class="pointer1" @click="toShowFormModal">发布</span><span style="margin-left:20px">{{applyTableData.status != 0 ? (applyTableData.status == 1? '已发布':'学生已提交'):'未发布'}}</span></p>
             </div>
        </div>
        <div class="clear">
            <div class="fl w155">文书材料：</div>
            <div class="fl w70p">
                <div v-for="(item,index) in docuList" :key="index">
                    <p><span class="docs">#{{item.subtypeName}}#</span><span class="pointer">{{item.fileName}}</span><span v-if="item.isMe == 1 && !showEditStatus" class="pointer1" @click="delDoc(item,0)">删除</span></p>
                </div>
             </div>
        </div>
        <div class="clear">
            <div class="fl w155">成绩单：</div>
            <div class="fl w70p">
                <div  v-for="(item,index) in scoreList" :key="index">
                    <p><span class="pointer">{{item.fileName}}</span><span v-if="!showEditStatus" class="pointer1" @click="delDoc(item,1)">删除</span></p>
                    <p><span>备注：</span><span>{{item.remarks}}</span></p>
                </div>
            </div>
        </div>
        <div class="clear">
            <div class="fl w155">财力情况材料：</div>
            <div class="fl w70p">
                <div  v-for="(item,index) in moneyList" :key="index">
                    <p><span class="pointer">{{item.fileName}}</span><span v-if="!showEditStatus" class="pointer1" @click="delDoc(item,1)">删除</span></p>
                    <p><span>备注：</span><span>{{item.remarks}}</span></p>
                </div>
            </div>
        </div>
        <div class="clear">
            <div class="fl w155">争取信：</div>
            <div class="fl w70p">
                <div  v-for="(item,index) in striveList" :key="index">
                    <p><span class="pointer">{{item.fileName}}</span><span v-if="!showEditStatus" class="pointer1" @click="delDoc(item,1)">删除</span></p>
                    <p><span>备注：</span><span>{{item.remarks}}</span></p>
                </div>
            </div>
        </div>
        <div class="clear">
            <div class="fl w155">其他材料：</div>
            <div class="fl w70p">
                <div  v-for="(item,index) in otherList" :key="index">
                    <p><span class="pointer">{{item.fileName}}</span><span v-if="!showEditStatus" class="pointer1" @click="delDoc(item,1)">删除</span></p>
                    <p><span>备注：</span><span>{{item.remarks}}</span></p>
                </div>
            </div>
        </div>
        <div class="clear">
            <div class="buttonMargin" v-if="!showEditStatus">
                <Button type="primary" @click="toShowAddResource">上传材料</Button>
            </div>
        </div>
    </div>
    <up-to-pan ref="uptopan" :object-id="objectId" :dir="folderName" type="apply" fileType="all" @uploadok="onUploadOk" />
    <Modal v-model="showAddResource" :loading="showAddResourceLoading" width=728 title="添加材料" @on-ok="addResourceOk()" @on-cancel="addResourceCancel()">
        <Form ref="basicStepForm" :rules="basicFormValidate" :model="addResource" :label-width="180">
            <Form-item label="材料类型：" prop="type">
                <Select v-model="addResource.type" style="width:200px" @on-change="typeChange">
                    <Option v-if="item.value != 'essay'" v-for="item in apl_apply_resource_type" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Form-item>
            <Form-item label="文书类型：" prop="docuType" v-show="addResource.type == 'essay'">
                <Select v-model="addResource.docuType" style="width:200px">
                    <Option v-for="item in doc_essay_type" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Form-item>
            <Form-item label="备注：" prop="remarks" v-show="'essay'">
                <Input v-model="addResource.remarks" type="textarea" placeholder="请输入" style="width:300px"></Input>
            </Form-item>
            <Form-item label="附件：" prop="hasUploadDoc">
                <div style="color:#41b3ae;">{{addResource.fileName}}</div>
                <div style="overflow:hidden;">
                    <div style="float:left; margin-right:10px;">
                        <Button type="primary" @click="onUploadLocal">本地上传</Button>
                    </div>
                    <div style="float:left; ">
                        <Button type="primary" @click="showPan()">云盘上传</Button>
                    </div>
                </div>
                <Input v-model="addResource.hasUploadDoc" style="display:none;"></Input>
            </Form-item>
        </Form>
    </Modal>
    <Modal v-model="showDelDoc"  width=400 title="删除申请材料" @on-ok="delDocOk()" @on-cancel="delDocCancel()">
        <div style="text-indent: 2em;">确定删除申请材料 <span style="color:#41b3ae;">{{delDocName}}</span>?</div>
    </Modal>
    <Modal v-model="showFormModal"  :loading="modalloading" width=728 title="发布表单" @on-ok="ok" @on-cancel="cancel">
        <div class="applyDetail2_dialogContentF">
            <Form ref="applytableForm" :rules="applytableValidate" :model="applyTableData" :label-width="180">
                <p>提示：表单发布后，学生凭链接、密码可填写表单内容，学生需在您设置的最晚填写时间内完成填写，否则链接失效。</p>
                <Form-item label="凭密码填写：" prop="visitPwd">
                    <Input v-model="applyTableData.visitPwd" placeholder="请输入密码" style="width:200px" :disabled="applyTableData.status == 2" :readonly="applyTableData.status == 2" ></Input>
                </Form-item>
                <Form-item label="最晚填写时间：" prop="deadTime">
                    <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" v-model="applyTableData.deadTime" placeholder="请选择" style="width: 200px" :disabled="applyTableData.status == 2" :readonly="applyTableData.status == 2"></DatePicker>
                </Form-item>
                <Form-item label="填写链接：" v-show="applyTableData.visitUrl">
                    <!-- <a @click="showSchoolApply" class="visitUrl">{{applyTableData.visitUrl}}</a> -->
                    <a href="javascript:void(0)" @click="showSchoolApply" class="visitUrl">{{applyTableData.visitUrl}}</a>
                </Form-item>
            </Form>
        </div>
    </Modal>
    <div v-if="loadYunPan">
        <yunpan @on-confirm="doSendFile" ref="yunpan" @on-cancel="doCancel" :visible="pan.visible"></yunpan>
    </div>
</div>
</template>
<script>
    import BtnList from '@public/modules/btnlist';
    import {docuManage} from "../../../../spoc-docu-web/src/libs/request";
    import valid, { errors, common, sys, aplApplyResource, aplShareUrl} from "../../libs/request";
    import yunpan from '@public/modules/yunpan'
	import upToPan from '../../modules/applyUpToPan';

    export default {
        props:{
            pId: {
                required: true
            },
            from:{
                type:String
            },
            userInfo: {
                type: Object
            },
            showApplyEnd: {
                type: Boolean
            }
        },
        data () {
            return {
                modalloading: true,
                showFormModal: false,
                delDocName: '',
                delDocId: '',
                delDocType: 0, //0 文书 ，1 非文书,
                showDelDoc: false,
                objectId:'',
                folderName:'',
                loadYunPan: false,
                pan:{
                    visible: false
                },
                basicFormValidate: {
					type: [{required: true,type: 'string',message: '必填项',trigger: 'change'}],
					/* docuType: [{required: true,type: 'string',message: '必填项',trigger: 'change'}], */
					hasUploadDoc: [{required: true,ype: 'string',message: '请上传文件',trigger: 'change'}]
                },
                applyTableData:{},
                applytableValidate: {
					visitPwd: [{required: true,type: 'string',message: '必填项',trigger: 'change'}],
					deadTime: [{required: true,type: 'date',message: '必填项',trigger: 'change'}],
				},
                showAddResource: false,
                showAddResourceLoading: true,
                tableShowStatus: true,
                showEditStatus:true,
                btnListVal: [],
                resourceStatus :0, //0:未完成；1：已完成
                apl_apply_resource_type: [], //材料类型
                doc_essay_type:[], //文书类型
                doc_essay_type_undergrad: [], //本科文书类型
                doc_essay_type_postgraduate: [], //研究生文书类型
                doc_essay_type_highschool: [], //高中文书类型
                addResource:{
                    type: '',
                    docuType: '',
                    remarks: '',
                    hasUploadDoc: '',
                    fileName: '',
                },
                docuList:[],//文书材料
                scoreList:[],//成绩单
                moneyList:[],//财力情况材料
                striveList:[],//争取信
                otherList:[],//其他材料
                fileId:'',//云盘文件ID
				attachmentId:'', //附件表ID
            }
		},
		components: { 
            BtnList,
			yunpan,
			upToPan
        },
        mounted(){
            if(this.from == 'caseManage' || (this.from == 'myStudent' && !this.showApplyEnd)){
                this.btnListVal =  [
                    {
                        text: '收起',
                        type: 'primary',
                        event: this.showContent
                    }
                ]
            }
            if(this.from == 'myStudent' && this.showApplyEnd){
                this.btnListVal =  [
                    {
                        text: '编辑',
                        type: 'primary',
                        event: this.showEdit
                    },
                    {
                        text: '收起',
                        type: 'primary',
                        event: this.showContent
                    }
                ]
            }
            this.loadSelectData()
            this.getFolderName()
            this.loadData()
        },
		methods: {
            showSchoolApply(){
                if(this.applyTableData.visitUrl){
                    let str = this.applyTableData.visitUrl
                    str = str.substring(str.indexOf('token=') + 6,str.length)
                    const {href} = this.$router.resolve({
                            name: 'portal.schoolApplyTable',
                            query: {
                                groupId: this.$route.query.groupId,
                                token: str,
                                visitPwd: this.applyTableData.visitPwd,
                            }
                        })
                    window.open(href, '_blank')
                } else { //未发布状态，只预览表格
                    const {href} = this.$router.resolve({
                            name: 'portal.schoolApplyTable',
                            query: {
                                tableId: this.applyTableData.tableId,
                            }
                        })
                    window.open(href, '_blank')
                }
            },
            ok(){
                if(this.applyTableData.status != 2){
                    this.showFormModal = true
                    this.$refs.applytableForm.validate((validRes) => {
                        if(validRes) {
                            let deadTime = typeof this.applyTableData.deadTime == 'string' ? this.applyTableData.deadTime :  new Date(this.applyTableData.deadTime).format('yyyy-MM-dd hh:mm:ss')
                            let obj = {
                                groupId: this.$route.query.groupId,
                                visitPwd: this.applyTableData.visitPwd.trim(),
                                deadTime: deadTime,
                                apply: this.userInfo.applyPhase
                            }
                            aplShareUrl.save(obj).then(valid.call(this))
                            .then(res => {
                                if(res.ok) {
                                    this.applyTableData = res.data.data
                                    this.applyTableData.deadTime =  new Date(res.data.data.deadTime)
                                    this.modalloading = false
                                    this.showFormModal = false
                                    this.loadData()
                                    let _this = this
                                    setTimeout(function(){
                                        _this.modalloading = true
                                    },0)
                                }
                            })
                            .catch(errors.call(this))
                            .finally(() => {});
                        } else {
                            this.modalloading = false
                            let _this = this
                            setTimeout(function(){
                                _this.modalloading = true
                            },0)
                        }
                    })
                } else {
                    this.showFormModal = false
                }
            },
            cancel(){

            },
            toShowFormModal(){
                this.showFormModal = true
            },
            loadData(hasChangeResourceStatus){
                let obj = {
                    groupId: this.$route.query.groupId,
                    choiceId: this.$route.query.choiceId
                }
                aplApplyResource.listLevel(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        let result = res.data.data
                        result.forEach((item,index)=>{
                            let key = Object.keys(item)[0]
                            if(key == '学校申请表'){
                                this.applyTableData = item[key]
                                if(this.applyTableData.deadTime){
                                    this.applyTableData.deadTime =  new Date(this.applyTableData.deadTime)
                                }
                            }
                            if(key == '文书材料'){
                                this.docuList = item[key]
                            }
                            if(key == '成绩单'){
                                this.scoreList = item[key]
                            }
                            if(key == '财力情况材料'){
                                this.moneyList = item[key]
                            }
                            if(key == '争取信'){
                                this.striveList = item[key]
                            }
                            if(key == '其他材料'){
                                this.otherList = item[key]
                            }
                            if(key == 'resourceStatus' && !hasChangeResourceStatus){
                                this.resourceStatus = item.resourceStatus.resourceStatus
                            }
                        })
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
            delDoc(item,type){
                this.delDocType = type
                this.delDocName = item.fileName
                this.delDocId = type == 0 ? item.essayId : item.id
                this.showDelDoc = true
            },
            delDocOk(){
                if(this.delDocType == 0 ){ //删除 文书
                    let obj = {
						id: this.delDocId
					}
					docuManage.delete(obj).then(valid.call(this)).then(res => {
                        if(res.ok) {
                            this.loadData(true)
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {})
                } else {  //删除非文书
                    let obj = {
                        id:  this.delDocId 
                    }
                    aplApplyResource.delete(obj).then(valid.call(this))
                    .then(res => {
                        if(res.ok) {
                            this.loadData(true)
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
                }
            },
            delDocCancel(){

            },
            typeChange(){
                this.addResource.hasUploadDoc = ''
                this.addResource.fileName = ''
                this.addResource.remarks = ''
                if(this.addResource.type == 'essay') {
                    this.addResource.docuType = ''
                } else {
                    this.addResource.docuType = '占位'
                }
            },
            toShowAddResource(){
                this.showAddResource = true
                this.addResource = {
                    type: '',
                    docuType: '',
                    remarks: '',
                    hasUploadDoc: '',
                    fileName: '',
                }
                this.$refs.basicStepForm.resetFields()
            },
            //获取服务组云盘文件夹
			getFolderName() {
				let obj = {
					id: this.$route.query.groupId
				}
				common.getFolderName(obj).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        this.folderName = '/' + res.data.data.folderName + '/apply'
                    }
                })
                .catch(errors.call(this))
                .finally(() => {})
			},
            addResourceOk(){
                if(this.addResource.type != 'essay'){
                    this.$refs.basicStepForm.validate((validRes) => {
                        if(validRes) {
                            let obj = {
                                groupId: this.$route.query.groupId,
                                choiceId: this.$route.query.choiceId,
                                attachmentId:this.attachmentId, //附件表编号 ,
                                fileId: this.fileId, //云盘ID ,
                                fileName: this.addResource.fileName , // 文件名称 ,
                                remarks:this.addResource.remarks, // (string, optional): 备注 ,
                                type: this.addResource.type, // (string, optional): 类型 关联字典 ,
                            }
                            aplApplyResource.save(obj).then(valid.call(this))
                            .then(res => {
                                if(res.ok) {
                                    this.showAddResource = false
                                    this.loadData(true)
                                }
                            })
                            .catch(errors.call(this))
                            .finally(() => {});
                        } else {
                            this.showAddResource = true
                            this.showAddResourceLoading = false
                            let _this = this
                            setTimeout(function(){
                                _this.showAddResourceLoading = true
                            },0)
                        }
                    })
                } else {
                    //不让上传文书材料，暂时注释
                    /* let obj1 = {
						fileId: this.fileId, //云盘文件ID
						attachmentId: this.attachmentId, //附件表ID
						name: this.addResource.fileName, //文件名称
						type: this.addResource.docuType, //文件类型
						serviceGroupId: this.$route.query.groupId, //服务组ID
						schoolId: this.userInfo.schoolId, //学校ID  基础文书默认为0
                    }
                    docuManage.save(obj1).then(valid.call(this)).then(res => {
						if(res.ok) {
                            this.showAddResource = false
                            let obj = {
                                id: res.data.data,
                                status: 6
                            }
                            docuManage.progress(obj).then(valid.call(this)).then(res => {
                                    if(res.ok) {
                                        this.loadData(true)
                                    }
                            })
                            .catch(errors.call(this))
                            .finally(() => {})
						}
					})
					.catch(errors.call(this))
					.finally(() => {}) */
                }
            },
            addResourceCancel(){

            },
            loadSelectData(){
                let obj = {
                    types: 'apl_apply_resource_type,doc_essay_type_undergrad,doc_essay_type_postgraduate,doc_essay_type_highschool',
                }
                sys.batchListData(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.apl_apply_resource_type = res.data.data.apl_apply_resource_type
                        this.doc_essay_type = res.data.data.doc_essay_type_undergrad
                        this.doc_essay_type_undergrad = res.data.data.doc_essay_type_undergrad
                        this.doc_essay_type_postgraduate = res.data.data.doc_essay_type_postgraduate
                        this.doc_essay_type_highschool = res.data.data.doc_essay_type_highschool
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
            showContent(){
                this.tableShowStatus = !this.tableShowStatus
                this.$set(this.btnListVal[this.from == 'myStudent' ? 1: 0],'text',this.tableShowStatus ? '收起':'展开')
            },
            showEdit(){
                this.showEditStatus = !this.showEditStatus
                this.$set(this.btnListVal[0],'text',this.showEditStatus ? '编辑':'保存')
                if(this.showEditStatus) { //修改截止日期
                    let obj = {
                        groupId: this.$route.query.groupId,
                        choiceId: this.$route.query.choiceId,
                        resourceStatus: this.resourceStatus 
                    }
                    aplApplyResource.saveStatus(obj).then(valid.call(this))
                    .then(res => {
                        if(res.ok) {
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
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
					this.addResource.fileName = data.data.fileName //文件名
					this.addResource.hasUploadDoc = '非空校验占位字符串'
				} else {
					this.addResource.hasUploadDoc = ''
					this.$Message.error(data.message);
				}
            },
            //云盘相关开始
			showPan() {
                this.loadYunPan = true
				this.pan.visible = true
			},
			doSendFile(item) {
				const params = {
					objectId: this.objectId,
					fileName: item.name,
					panFilePath: item.dir,
					menuId: this.pId,
					type: 'apply',
					filePath: this.folderName,
				};
				this.$refs.yunpan.uploadPanFileToPan(params).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						this.fileId = res.data.data.fileId //云盘文件ID
						this.attachmentId = res.data.data.id //附件表ID
                        this.addResource.fileName = res.data.data.fileName //文件名
					    this.addResource.hasUploadDoc = '非空校验占位字符串'
                        this.close();
					}
				});
			},
			doCancel() {
				this.close();
			},
			close() {
                this.pan.visible = false;
                this.loadYunPan = false
			},
			//云盘相关结束
        },
        watch:{
            'applyTableData.visitPwd': function(newValue, oldVale){
                if(newValue){
                    this.$set(this.applyTableData,'visitPwd', newValue.replace(/ /g,'').trim())
                }
            },
            showApplyEnd: function(newValue, oldVale){
                if(this.from == 'caseManage' || (this.from == 'myStudent' && !this.showApplyEnd)){
                    this.btnListVal =  [
                        {
                            text: '收起',
                            type: 'primary',
                            event: this.showContent
                        }
                    ]
                }
                if(this.from == 'myStudent' && this.showApplyEnd){
                    this.btnListVal =  [
                        {
                            text: '编辑',
                            type: 'primary',
                            event: this.showEdit
                        },
                        {
                            text: '收起',
                            type: 'primary',
                            event: this.showContent
                        }
                    ]
                } 
            },
        }
    }
</script>