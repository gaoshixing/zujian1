<style lang="less">
    .applyDetail4{
        margin-bottom: 20px;
        .clear{
            overflow: hidden;
            margin-top: 10px;
            .fl{
                float: left;
                >span{
                    display: inline-block;
                    color: #999;
                    height: 40px;
                    line-height: 40px;
                    width:155px;
                    margin-right: 8px;
                    text-align: right;
                }
            }
            .w100p{
                width: 100%;
            }
            .w65p{
                width: 65%;
            }
            .w50p{
                width: 50%;
            }
            .w100{
                width: 200px;
            }
            .buttonMargin{
                margin-left: 166px;
                margin-top: 5px;
            }
            .res{
                overflow: hidden;
                >span{
                    float: left;
                    display: inline-block;
                    color: #999;
                    height: 40px;
                    line-height: 40px;
                    width:155px;
                    margin-right: 8px;
                    text-align: right;
                }
            }
        }
        .res-list1{
            margin-top: 2px;
            float: left;
            width: 70%;
            &-inner{
                .s-item{
                    float: left;
                    height: 60px;
                    margin-left: 3px;
                    margin-right: 5px;
                    &:hover{
                        .type-ctrl{
                            display: block;
                        }
                    }
                }
                @he:42px;
                .type{
                    display: inline-block;
                    width: 82.9px;
                    height: @he;
                    position: relative;
                    &.Admitted{
                        color: #8ae58a;
                    }
                    &.Deny{
                        color: #e58a8d;
                    }
                    &.Defer{
                        color: #8ab7e5;
                    }
                    &.Waitlist{
                        color: #ffde66;
                    }
                    &.Conditional{
                        color: #e5aa73;
                    }
                    &.Withdraw{
                        color: #c8cccc;
                    }
                    &.Cancel{
                        color: #646666;
                    }
                    &.Other{
                        color: #e58ae5;
                    }
                    .iconfont{
                        display: inline-block;
                        font-size: 28px;
                        font-weight: 100;
                    }
                    .text{
                        position: absolute;
                        left: 0;
                        top: -3px;
                        right: 0;
                        bottom: 0;
                        width: 100%;
                        height: 100%;
                        font-size: 12px;
                        line-height: @he;
                        text-align: center;
                        cursor: pointer;
                    }
                }
                .type-ctrl{
                    display: none;
                    position: relative;
                    top: -6px;
                    left: 4px;
                    span{
                        margin-left: 7px;
                        cursor: pointer;
                        color: #3486f6;
                    }
                }
            }
        }
    }
</style>
<template>
<div class="applyDetail4">
    <btn-list title="追踪申请结果" :btnList="btnListVal">
    </btn-list>
    <div class="clear" :style="{display: tableShowStatus? 'block':'none'}">
        <div class="fl w50p">
            <span>面试情况：</span>
            <Select  :disabled="showEditStatus" v-model="interviewDate.interviewType" class="w100" :label-in-value="true">
                <Option v-for="item in interviewTypes" :value="item.value" :key="item.id">{{ item.label }}</Option>
            </Select>
        </div>
        <div class="fl w50p">
            <span>申请材料状态：</span>
            <Select :disabled="showEditStatus" v-model="interviewDate.resourceStatusLog" style="width:200px" :label-in-value="true">
                <Option  value="材料齐全" >材料齐全</Option>
                <Option  value="材料不齐" >材料不齐</Option>
            </Select>
            <span style="width:65px;cursor:pointer;color:#05c7ff;" @click="viewLog">查看日志</span>
        </div>
        <div class="fl w100p">
            <span>补充材料信息：</span>
            <Input class="w65p" type="textarea"  v-model="interviewDate.remarks" placeholder="请输入" :disabled="showEditStatus"></Input>
        </div>
        <div class="fl w50p">
            <span>查询网址：</span>
            <Input class="w100" :disabled="showEditStatus" v-model="safebox.queryUrl"></Input>
        </div>
        <div class="fl w50p">
            <span>查询账号：</span>
            <Input class="w100" :disabled="showEditStatus" v-model="safebox.queryAccount"></Input>
        </div>
        <div class="fl w50p">
            <span>查询密码：</span>
            <Input class="w100" :disabled="showEditStatus" v-model="safebox.queryPwd"></Input><span v-show="safebox.queryPwd && showEditStatus" style="width:65px;cursor:pointer;color:#05c7ff;" @click="viewPassword">查看密码</span>
        </div>
        <div class="fl w50p">
            <span>查询ID：</span>
            <Input class="w100" :disabled="showEditStatus" v-model="safebox.queryId"></Input>
        </div>
        <div class="res w100p">
            <span>申请结果：</span>
            <div class="res-list1">
                <div class="res-list1-inner">
                    <div class="s-item" v-for="(item,index) in statusList" :key="index">
                        <div class="type" :class="item.status">
                            <i class="iconfont icon-zhang_"></i>
                            <span class="text" v-text="item.status" @click="showResDetail(item)"></span>
                        </div>
                        <div class="type-ctrl" v-if="!showEditStatus">
                            <span @click="showREdit(item)">编辑</span>
                            <span @click="showRDel(item)">删除</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="fl buttonMargin" v-show="!showEditStatus">
            <Button type="primary" @click="addStatusRes">添加申请结果</Button>
        </div>
    </div>

    <up-to-pan ref="uptopan" :object-id="objectId" :dir="folderName" type="apply" fileType="all" @uploadok="onUploadOk" />
    <up-to-pan ref="uptopanOffer"  :max-size="2048" :format="['jpg','png','pdf']" :dir="folderName" :object-id="objectId" type="apply" fileType="all" @uploadok="onUploadOk" />
    <Modal :loading="addResultForm.loading" :scrollable="true" @on-ok="addResultOk" @on-cancel="addResultClose" :title="addResultForm.addtitle" v-model="addResultForm.visible"  width="580px">
        <Form :label-width="120" label-position="right" ref="addResultForm" :rules="addResultForm.ruleValidate" :model="addResultForm.data">
            <FormItem label="申请结果" prop="status">
                <Select v-model="addResultForm.data.status" style="width:200px" :label-in-value="true" @on-change="onTypeChanged">
                    <Option v-for="item in statusTypes" :value="item.label" :key="item.id">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="结果发布时间" prop="publishDate">
                <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" :clearable="false" v-model="addResultForm.data.publishDate" style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem label="上传Offer" prop="offerAttachmentId" v-if="addResultForm.offerShow">
                <Input style="display:none" v-model="addResultForm.data.offerAttachmentId"></Input>
                <div v-if="addResultForm.data.pdfFileName == ''">
                    <img :src="offerImgUrl" v-show="offerImgUrl" alt=""  style="width: 100px;height: 100px;">
                </div>
                <div v-if="addResultForm.data.pdfFileName">
                    <a href="javascript:void(0)" @click="showYunPanDoc(addResultForm.data.offerAttachmentId)">
                        {{addResultForm.data.pdfFileName}}
                    </a>
                </div>
                <div @click="changeUploadType('offer')"> 
                    <div style="float:left; margin-right:10px;">
                        <Button type="primary" @click="onUploadLocalOffer">本地上传</Button>
                    </div>
                    <div style="clear:both;"></div>
                </div>
             <!--    <div v-show="!addResultForm.data.offerAttachmentId" @click="showImgBox" style="cursor:pointer;color: #44bcb7;"><Icon type="image"></Icon>添加offer</div>
                <up-img ref="img1"  :setimg="addResultForm.data.offerAttachmentId" v-show="showUploadImgBox"  @close="closeUploadImg" @onImgChange="onImgChange" class="abs-img"/> -->
            </FormItem>
            <FormItem label="上传结果文件" prop="resultFileName" v-if="!addResultForm.isAdmitted">
                <div v-if="!item.isDelete" v-for="(item, index) in addResultForm.data.resultAttachments" :key="'resultAttachments_' +index">
                    <span>{{item.fileName}}</span><a style="padding-left:10px;" @click="delResPicFile(item.id)">删除</a>
                </div>
                <div>
                    <Input style="display:none" v-model="addResultForm.data.resultFileName"></Input>
                </div>
                <div @click="changeUploadType('result')"> 
                    <div style="float:left; margin-right:10px;">
                        <Button type="primary" @click="onUploadLocal">本地上传</Button>
                    </div>
                    <div style="float:left; ">
                        <Button type="primary" @click="showPan">云盘上传</Button>
                    </div>
                    <div style="clear:both;"></div>
                </div>
            </FormItem>
            <div v-if="addResultForm.isAdmitted">
                <FormItem label="录取学院" prop="college">
                    <Input v-model="addResultForm.data.college" style="width:340px" :disabled="addResultForm.viewonly"></Input>
                </FormItem>
                <FormItem label="录取校区" prop="branch">
                    <Input v-model="addResultForm.data.branch" style="width:340px" :disabled="addResultForm.viewonly"></Input>
                </FormItem>
                <FormItem label="录取专业/项目" prop="program">
                    <Input v-model="addResultForm.data.program" style="width:340px" :disabled="addResultForm.viewonly"></Input>
                </FormItem>
                <FormItem label="入学时间（YYYY/F或S）" prop="enterYear">
                    <Input v-model="addResultForm.data.enterYear" style="width:340px" :disabled="addResultForm.viewonly"></Input>
                </FormItem>
                <FormItem label="学制时长（X年）" prop="duration">
                    <Input v-model="addResultForm.data.duration" style="width:340px" :disabled="addResultForm.viewonly"></Input>
                </FormItem>
                <FormItem label="Full/Part-Time" prop="fullPartTime">
                    <Select v-model="addResultForm.data.fullPartTime" style="width:340px">
                        <Option value="0">Full-Time</Option>
                        <Option value="1">Part-Time</Option>
                    </Select>
                </FormItem>
                <FormItem label="奖学金" prop="scholarship">
                    <Input v-model="addResultForm.data.scholarship" style="width:340px" :disabled="addResultForm.viewonly"></Input>
                </FormItem>
                <FormItem label="是否入读" prop="isAccept" style="margin:0">
                    <Select v-model="addResultForm.data.isAccept" style="width:340px">
                        <Option value="0">是</Option>
                        <Option value="1">否</Option>
                        <Option value="2">待定</Option>
                    </Select>
                </FormItem>
            </div>

        </Form>
    </Modal>

    <Modal title="详情" v-model="addResultForm.readvisible" class-name="vertical-center-modal ch-detail" width="580px">
        <Form :label-width="98" label-position="right">
            <FormItem label="申请结果">
                <span v-text="addResultForm.data.status"></span>    
            </FormItem>
            <FormItem label="结果发布时间">
                <span v-text="addResultForm.data.publishDate"></span>    
            </FormItem>
            <FormItem label="offerAttachmentId" v-if="addResultForm.data.status=='Admitted'">
                <img :src="addResultForm.data.offerAttachmentId"/>
            </FormItem>
            <FormItem label="结果文件" v-if="addResultForm.data.status!=='Admitted'"> <!-- Admitted 不显示结果文件 -->
                <a class="green oneline" target="_blank" v-for="(item,index) in addResultForm.data.resFile" :href="item" :key="index">结果文件链接{{index+1}}</a>
            </FormItem>
        </Form>
        <div slot="footer">
        </div>
    </Modal>
    <Modal v-model="showDelApplyRes"  width=400 title="删除申请结果" @on-ok="delApplyResOk()" @on-cancel="delApplyResCancel()">
        <div style="text-indent: 2em;">确定删除申请结果 <span style="color:#41b3ae;">{{delApplyResName}}</span>?</div>
    </Modal>
    <Modal v-model="modalLog" width=940 title="查看日志" ok-text="确认" @on-ok="ok" @on-cancel="cancel">
        <div>
            <Table :data="modalTableDatas"  height="220" :columns="modalTableColumns">
            </Table>
        </div>
    </Modal>
    <div v-if="loadYunPan">
        <yunpan @on-confirm="doSendFile" ref="yunpan" @on-cancel="doCancel" :visible="pan.visible"></yunpan>
    </div>
</div>
</template>
<script>
    import BtnList from '@public/modules/btnlist';
    import { mapState, mapGetters } from 'vuex'
    import valid, { errors, common, sys, aplApplyResult, aplSafebox, aplApplyStatus, aplApplyResource} from "../../libs/request";
    import { plServiceGroup } from '../../../../spoc-plan-web/src/libs/request';
    import yunpan from '@public/modules/yunpan'
    import upToPan from '../../modules/applyUpToPan'
    import upImg from "./upImg";
    
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
                offerImgUrl: '',
                delFilesArray: [],
                interviewDate: {
                    interviewType:'',
                    resourceStatusLog: '',
                },
                modalLog: false,
                modalTableDatas:[
				],
				modalTableColumns:[
                    {
                        title: '申请材料状态',
						key: 'status',
					},
                    {
                        title: '补充资料信息',
						key: 'remarks',
					},
					{
                        title: '更新时间',
						key: 'optTime',
					},
					{
                        title: '更新人',
						key: 'optUser',
					},
				],
                uploadType:'',
                showUploadImgBox: false,
                attachments: [],
                delApplyResName: '',
                delApplyResId: '',
                showDelApplyRes: false,
                pan:{
                    visible: false
                },
                loadYunPan: false,
                objectId:'',
                folderName: '',
                statusTypes: [],
                interviewTypes: [],
                uploadApplyFileForm:{
                    visible:false,
                },
                schoolInfo:{
                    xxResultList:[{status:'Deny'},{status:'Deny'}]
                },
                tableShowStatus: true,
                showEditStatus: true,
                btnListVal: [
                    {
                        text: '收起',
                        type: 'primary',
                        event: this.showContent
                    }
                ],
                safebox: {},
                statusList:[],

                addResultForm:{
                    addtitle:'申请结果',
                    visible:false,
                    loading:true,
                    readvisible:false,
                    offerShow:false,
                    isAdmitted:false,
                    dropList:[],
                    ruleValidate:{
                        status:[
                            {required:true,message:"请选择申请结果"}
                        ],
                        publishDate:[
                            {required:true,message:"请选择结果发布时间"}
                        ]
                    },
                    ruleValidate1: {
                        status:[
                            {required:true,message:"请选择申请结果"}
                        ],
                        publishDate:[
                            {required:true,message:"请选择结果发布时间"}
                        ]
                    },
                    ruleValidate2:{
                        college:[
                            {required:true,message:"请填写录取学院"}
                        ],
                        branch:[
                            {required:true,message:"请填写录取校区"}
                        ],
                        program:[
                            {required:true,message:"请填写录取专业/项目"}
                        ],
                        enterYear:[
                            {required:true,message:"请填写入学时间"}
                        ],
                        duration:[
                            {required:true,message:"请填写学制时长"}
                        ],
                        fullPartTime:[
                            {required:true,message:"请填写fullPartTime"}
                        ],
                        scholarship:[
                            {required:true,message:"请填写奖学金"}
                        ],
                        isAccept:[
                            {required:true,message:"请选择是否入读"}
                        ]

                    },
                    ruleValidate3:{
                        offerAttachmentId:[
                            {required:true,message:"请上传Offer",trigger:'change'}
                        ]
                    },
                    ruleValidate4:{
                        resultFileName:[
                            {required:false,message:"请上传结果文件",trigger:'change'}
                        ]
                    },
                    data:{
                        pdfFileName: '',
                        resultFileName:'',
                        offerAttachmentId:'',
                        remarks:'',
                        status:'',
                        publishDate:new Date()
                    }
                }
            }
		},
		components: { 
            BtnList,
            yunpan,
            upToPan,
            upImg
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
            this.loadDate()
            this.loadStatusDate()
            this.loadStatusTypes()
            this.getFolderName()
            this.loadInterviewDate()
        },
		methods: {
            delResPicFile(_id){
                this.delFilesArray.push(_id)
                let resultAttachments = this.addResultForm.data.resultAttachments
                resultAttachments.forEach((item, index)=>{
                    if(item.id == _id) {
                        item.isDelete = _id
                    }
                })
                //this.$set(this.addResultForm.data, 'resultAttachments', resultAttachments)
                this.addResultForm.data.resultAttachments = resultAttachments
                this.$forceUpdate()
            },
            ok(){},
            cancel(){},
            loadInterviewDate(initInterviewDateId){
                let obj = {
                    groupId: this.$route.query.groupId,
                    choiceId: this.$route.query.choiceId,
                }
                aplApplyStatus.formData(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        if(initInterviewDateId){ //防止重置已填写的数据
                            this.interviewDate.id = res.data.data.id
                        } else {
                            this.interviewDate = res.data.data || {
                                interviewType:'',
                                resourceStatusLog: '',
                            }
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
            changeUploadType(type){
                this.uploadType = type
            },
            closeUploadImg(){
                this.showUploadImgBox = false
            },
            showImgBox() {
                this.showUploadImgBox = true
            },
            onImgChange(res){
                this.showUploadImgBox = false
                this.addResultForm.data.offerAttachmentId = res.imgUrl
                this.toPushAttachments('offer', res.id)
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
            delApplyResOk(){
                let obj = {
                    id: this.delApplyResId
                }
                aplApplyResult.delete(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.loadStatusDate()
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
            delApplyResCancel(){

            },
            showOfferFileName(){
                
            },
            //发送添加申请结果请求
            addResultOk(){
                let _this = this
                this.$refs.addResultForm.validate(ok=>{
                    if(ok){
                        let obj = {
                            groupId: this.$route.query.groupId,
                            choiceId: this.$route.query.choiceId,
                            publishDate: new Date(this.addResultForm.data.publishDate).format('yyyy-MM-dd hh:mm:ss'),
                            status:this.addResultForm.data.status, //申请结果
                            attachments: this.attachments
                        }
                        if(this.addResultForm.data.status =='Admitted'){
                            obj.college = this.addResultForm.data.college //录取院校
                            obj.branch = this.addResultForm.data.branch //录取校区
                            obj.program = this.addResultForm.data.program //录取专业/项目
                            obj.enterYear = this.addResultForm.data.enterYear //入学时间（YYYY/F或S）
                            obj.duration = this.addResultForm.data.duration //学制时长（X年
                            obj.fullPartTime = this.addResultForm.data.fullPartTime //Full/Part-Time
                            obj.scholarship = this.addResultForm.data.scholarship //奖学金
                            obj.isAccept = this.addResultForm.data.isAccept //是否入读
                        }
                        if(this.addResultForm.data.id){
                            obj.id = this.addResultForm.data.id
                        }
                        aplApplyResult.save(obj).then(valid.call(this))
                        .then(res => {
                            if(res.ok) {
                                this.addResultForm.visible = false
                                this.addResultForm.data.resultFileName = ''
                                this.attachments = []
                                this.offerImgUrl = ''
                                this.addResultForm.data.offerAttachmentId = ''
                                this.loadStatusDate()
                                if(!this.interviewDate.id){
                                    this.loadInterviewDate(true)
                                }
                            }
                        })
                        .catch(errors.call(this))
                        .finally(() => {});

                        if(this.delFilesArray.length) {
                            this.delFilesArray.forEach((item,index) => {
                                sys.delete({id:item}).then(valid.call(this))
                                .then(res => {
                                })
                            })
                            this.delFilesArray = []
                        }
                    } else {
                        _this.addResultForm.visible =  true
                        _this.addResultForm.loading = false
                        setTimeout(() =>{
                            _this.addResultForm.loading = true
                        },0)
                    }
                });
            },
            addResultClose(){
                this.offerImgUrl = ''
                this.addResultForm.data.offerAttachmentId = ''
                this.delFilesArray = []
                this.attachments = []
                this.addResultForm.data.status = ''
                this.addResultForm.readvisible = false
                this.$refs.addResultForm.resetFields();
                this.addResultForm.visible = false;
                this.loadYunPan = false
            },
            loadStatusTypes(){
                let obj = {
                    types:'xx_result_type,apl_apply_interview_type',
                }
                sys.batchListData(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.statusTypes = res.data.data.xx_result_type
                        this.interviewTypes = res.data.data.apl_apply_interview_type
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
            //显示添加申请结果modal
            addStatusRes(){
                this.addResultForm.data.resultAttachments = []
                this.delFilesArray = []
                this.attachments = []
                this.addResultForm.data.status = ''
                this.addResultForm.readvisible = false
                this.loadYunPan = false
                this.$refs.addResultForm.resetFields();
                this.addResultForm.visible = true
            },
            showUploadApplyFile(){
                this.uploadApplyFileForm.visible = true;
            },
            loadDate(){
                let obj = {
                    type: 'result',
                    groupId: this.$route.query.groupId,
                    choiceId: this.$route.query.choiceId
                }
                aplSafebox.formData(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.safebox = res.data.data
                        if(this.safebox.queryPwd){
                            this.safebox.queryPwd = '******'
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
            loadStatusDate(){
                let obj = {
                    choiceId: this.$route.query.choiceId,
                    groupId: this.$route.query.groupId
                }
                aplApplyResult.list(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.statusList = res.data.data
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
                if(this.showEditStatus) {
                    let obj = {
                        groupId: this.$route.query.groupId,//  服务组ID ,
                        choiceId: this.$route.query.choiceId, //选校ID ,
                        type:'result',
                        queryUrl: this.safebox.queryUrl, //访问地址 ,
                        queryAccount: this.safebox.queryAccount, // 访问账号 ,
                        queryId: this.safebox.queryId, // 查询ID ,
                        queryPwd: this.safebox.queryPwd, //访问密码 ,
                    }
                    if(this.safebox.id){
                        obj.id = this.safebox.id
                    }
                    if(!(this.safebox.queryUrl == '' && this.safebox.queryAccount == '' && this.safebox.queryId == '' && this.safebox.queryPwd == '')){
                        aplSafebox.save(obj).then(valid.call(this))
                        .then(res => {
                            if(res.ok) {
                                this.loadDate()
                            }
                        })
                        .catch(errors.call(this))
                        .finally(() => {});
                    }
                    this.interviewDate.groupId = this.$route.query.groupId
                    this.interviewDate.choiceId = this.$route.query.choiceId
                    //保存面试信息
                    aplApplyStatus.save(this.interviewDate).then(valid.call(this))
                    .then(res => {
                        if(res.ok) {
                            this.loadInterviewDate()
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
                } else {
                    if(this.safebox.queryPwd == '******'){
                        this.viewPassword()
                    }
                }
            },
            viewPassword(){
                let obj = {
                    id:  this.safebox.id
                }
                aplSafebox.viewPassword(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.safebox.queryPwd = res.data.data
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
            viewLog(){
                this.modalLog = true
                let obj = {
                    groupId: this.$route.query.groupId,//  服务组ID ,
                    choiceId: this.$route.query.choiceId, //选校ID ,
                }
                aplApplyResource.listLog(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.modalTableDatas = res.data.data
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
            showResDetail(item){
            },
            showREdit(item){
                let type = {
                    value : item.status
                }
                this.onTypeChanged(type)
                let obj = {
                    id:item.id
                }
                aplApplyResult.form(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.addStatusRes()
                        this.addResultForm.data = res.data.data
                        if(res.data.data.offerAttachements.length){
                            let resNew = res.data.data.offerAttachements[0]
                            this.addResultForm.data.offerAttachmentId  = resNew.id
                            if(resNew.fileName.endsWith('.pdf')){
                                this.addResultForm.data.pdfFileName = resNew.fileName
                            } else {
                                this.addResultForm.data.pdfFileName = ''
                            }
                            this.offerImgUrl = `spoc-plan/a/ws/sys/attachment/downloadPan?filePath=${resNew.filePath}&fileName=${resNew.fileName}`;
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
            showRDel(item){
                this.showDelApplyRes = true
                this.delApplyResName = item.status
                this.delApplyResId = item.id
            },
            toPushAttachments(uploadfileType, attachmentId,fileName ,filePath){
                if(uploadfileType == 'offer') {
                    let attachments =  this.attachments
                    let hasOffer = false
                    attachments.forEach((item, index)=>{
                        if(item.type == 'offer') {
                            item.id = attachmentId
                            hasOffer = true
                        }
                    })
                    if(hasOffer){
                        this.attachments = attachments
                    } else {
                        this.attachments.push({
                            type: uploadfileType,
                            id: attachmentId
                        })
                    }
                    //this.offerImgUrl = sys.displayUrl(attachmentId)
                    this.offerImgUrl = `spoc-plan/a/ws/sys/attachment/downloadPan?filePath=${filePath}&fileName=${fileName}`;
                    this.addResultForm.data.offerAttachmentId = attachmentId
                } else {
                    this.attachments.push({
                        type: uploadfileType,
                        id: attachmentId
                    })
                    if(!this.addResultForm.data.resultAttachments) {
                        this.addResultForm.data.resultAttachments = []
                    }
                    this.addResultForm.data.resultAttachments.push({
                        fileName:fileName,
                        id: attachmentId
                    })
                }
            },
            //云盘相关开始
			showPan() {
                this.pan.visible = true;
                this.loadYunPan = true
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
						//this.fileId = res.data.data.fileId //云盘文件ID
						//this.attachmentId = res.data.data.id //附件表ID
                        this.toPushAttachments(this.uploadType,res.data.data.id, res.data.data.fileName)
                        if(this.uploadType == 'offer'){
                            this.addResultForm.data.offerAttachmentId =  res.data.data.id
                        } else {
                            this.addResultForm.data.resultFileName = res.data.data.fileName
                        }
                        this.close();
					}
				});
			},
			doCancel() {
				this.close();
			},
			close() {
                this.pan.visible = false
                this.loadYunPan = false
			},
			//云盘相关结束

			//本地上传
			onUploadLocal() {
				this.$refs.uptopan.doUpload();
			},
			onUploadLocalOffer() {
				this.$refs.uptopanOffer.doUpload();
			},
			//本地上传成功
			onUploadOk(data) {
				if(data.status == "success") {
					this.$Message.success(data.message);
					//this.fileId = data.data.fileId //云盘文件ID
					//this.attachmentId = data.data.id //附件表ID
                    this.toPushAttachments(this.uploadType, data.data.id, data.data.fileName,data.data.filePath)
                    if(this.uploadType == 'offer'){
                        this.addResultForm.data.offerAttachmentId =  data.data.id
                        if(data.data.fileName.endsWith('.pdf')){
                            this.addResultForm.data.pdfFileName =  data.data.fileName
                        } else {
                            this.addResultForm.data.pdfFileName =  ''
                        }
                    } else {
                        this.addResultForm.data.resultFileName = data.data.fileName
                    }
				} else {
					this.$Message.error(data.message);
				}
            },
            onTypeChanged(item){
                if(!item){
                    return;
                }
                if(item.value=='Admitted'){
                    this.addResultForm.isAdmitted = true
                    this.addResultForm.offerShow = true
                    this.$set(this.addResultForm, 'ruleValidate',Object.assign(this.addResultForm.ruleValidate1, this.addResultForm.ruleValidate2, this.addResultForm.ruleValidate3))
                } else if(item.value=='Other' || item.value=='Conditional'){
                    this.addResultForm.isAdmitted = false
                    this.addResultForm.offerShow = true
                    this.$set(this.addResultForm, 'ruleValidate',Object.assign(this.addResultForm.ruleValidate1, this.addResultForm.ruleValidate3, this.addResultForm.ruleValidate4))
                } else {
                    this.addResultForm.isAdmitted = false
                    this.addResultForm.offerShow = false
                    this.$set(this.addResultForm, 'ruleValidate',Object.assign(this.addResultForm.ruleValidate1, this.addResultForm.ruleValidate4))
                }
            },
            showYunPanDoc(fileId) {
				if(fileId) {
					window.open(`https://portal.ivygate.cn/index.php/webutils/document/${fileId}`);
				}
			},
        },
        watch:{
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