<style lang="less">
    .applyDetail3{
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
            .refereeFl{
                float: left;
            }
            .referees{
                padding-top: 11px;
                padding-left: 5px;
                .referee{
                    margin-bottom: 5px;
                    .refereeName{
                        cursor:pointer;
                        display: inline-block;
                        width:150px;
                        color:#44bcb7;
                    }
                    .refereeAction{
                        display: inline-block;
                        width:50px;
                        cursor:pointer;
                        color:#05c7ff;
                    }
                }
            }
            .w100p{
                width: 100%;
            }
            .w65p{
                width: 65%;
                margin-top: 5px;
            }
            .w50p{
                width: 50%;
            }
            .w200{
                width: 200px;
            }
        }
    }

</style>
<template>
<div class="applyDetail3">
    <btn-list title="提交申请信息" :btnList="btnListVal">
    </btn-list>
    <div class="clear" :style="{display: tableShowStatus? 'block':'none'}">
        <div class="fl w100p">
            <span>申请状态：</span> 
            <RadioGroup v-model="myApplyInfo.infoStatus">
                <Radio label="0" :disabled="showEditStatus">已开账户</Radio>
                <Radio label="1" :disabled="showEditStatus">填表中</Radio>
                <Radio label="2" :disabled="showEditStatus">已提交</Radio>
            </RadioGroup>
        </div>
        <div class="fl w50p">
            <span>提交时间：</span> 
            <DatePicker  v-model="myApplyInfo.subDate" :disabled="showEditStatus" :readonly="showEditStatus" type="datetime" placeholder="请选择日期"  class="w200"></DatePicker>
        </div>
        <div class="fl w50p">
            <span>学校审阅时间：</span> 
            <DatePicker  v-model="myApplyInfo.schoolAuditDate" :disabled="showEditStatus" :readonly="showEditStatus" type="datetime" placeholder="请选择日期"  class="w200"></DatePicker>
        </div>
        <div class="fl w50p">
            <span>截止日期：</span> 
            <DatePicker  v-model="myApplyInfo.deadline" :disabled="showEditStatus" :readonly="showEditStatus" type="datetime" placeholder="请选择日期"  class="w200"></DatePicker>
        </div>
        <div class="fl w50p">
            <span>TOEFL送分代码：</span> 
            <InputNumber :max="9999" :min="0"   v-model="myApplyInfo.toeflCode" :disabled="showEditStatus"  class="w200"></InputNumber>
        </div>
        <!-- 本科特有 -->
        <div class="fl w50p"  v-if="userInfo.applyPhase == 'UG'">
            <span>SAT送分代码：</span> 
            <InputNumber :max="9999" :min="0"   v-model="myApplyInfo.satCode" :disabled="showEditStatus"  class="w200"></InputNumber>
        </div>
        <div class="fl w50p"  v-if="userInfo.applyPhase == 'UG'">
            <span>ACT送分代码：</span> 
            <InputNumber :max="9999" :min="0"   v-model="myApplyInfo.actCode" :disabled="showEditStatus"  class="w200"></InputNumber>
        </div>
        <div class="fl w50p"  v-if="userInfo.applyPhase == 'UG'">
            <span>TOEFL送分：</span>
            <Select v-model="myApplyInfo.toeflScore"  class="w200" :disabled="showEditStatus">
                <Option v-for="item in scoreList" :value="item.value" :key="'toeflScore_' + item.value">{{ item.label }}</Option>
            </Select>    
        </div>
        <div class="fl w50p"  v-if="userInfo.applyPhase == 'UG'">
            <span>SAT/ACT送分：</span>
            <Select v-model="myApplyInfo.satActScore"  class="w200" :disabled="showEditStatus">
                <Option v-for="item in scoreList" :value="item.value" :key="'satActScore_' + item.value">{{ item.label }}</Option>
            </Select>   
        </div>
        <!-- 研究生特有 -->
        <div class="fl w50p" v-if="userInfo.applyPhase == 'PG'">
            <span>GRE送分代码：</span>
            <InputNumber :max="9999" :min="0"   v-model="myApplyInfo.greCode" :disabled="showEditStatus"  class="w200"></InputNumber>
        </div>
        <div class="fl w50p" v-if="userInfo.applyPhase == 'PG'">
            <span>GMAT送分代码：</span>
            <InputNumber :max="9999" :min="0"   v-model="myApplyInfo.gmatCode" :disabled="showEditStatus"  class="w200"></InputNumber>
        </div>
        <div class="fl w50p" v-if="userInfo.applyPhase == 'PG'">
            <span>LSAT送分代码：</span>
            <InputNumber :max="9999" :min="0"   v-model="myApplyInfo.lsatCode" :disabled="showEditStatus"  class="w200"></InputNumber>
        </div>
        <div class="fl w50p" v-if="userInfo.applyPhase == 'PG'">
            <span>TOEFL送分：</span>
            <Select v-model="myApplyInfo.toeflScore"  class="w200" :disabled="showEditStatus">
                <Option v-for="item in scoreList" :value="item.value" :key="'toeflScore_' +item.value">{{ item.label }}</Option>
            </Select>    
        </div>
        <div class="fl w50p" v-if="userInfo.applyPhase == 'PG'">
            <span>GRE/GMAT/LSAT送分：</span>
            <Select v-model="myApplyInfo.greGmatLsatScore"  class="w200" :disabled="showEditStatus">
                <Option v-for="item in scoreList" :value="item.value" :key="'greGmatLsatScore_' + item.value">{{ item.label }}</Option>
            </Select>    
        </div>
        <!-- 高中特有--> 
        <div class="fl w50p" v-if="userInfo.applyPhase == 'HS'">
            <span>TOEFL Junior送分代码：</span>
            <InputNumber :max="9999" :min="0"   v-model="myApplyInfo.toeflJuniorCode" :disabled="showEditStatus"  class="w200"></InputNumber>
        </div>
        <div class="fl w50p" v-if="userInfo.applyPhase == 'HS'">
            <span>SSAT送分代码：</span>
            <InputNumber :max="9999" :min="0"   v-model="myApplyInfo.ssatCode" :disabled="showEditStatus"  class="w200"></InputNumber>
        </div>
        <div class="fl w50p" v-if="userInfo.applyPhase == 'HS'">
            <span>TOEFL送分：</span>
            <Select v-model="myApplyInfo.toeflScore"  class="w200" :disabled="showEditStatus">
                <Option v-for="item in scoreList" :value="item.value" :key="'toeflScore_' +item.value">{{ item.label }}</Option>
            </Select>    
        </div>
        <div class="fl w50p" v-if="userInfo.applyPhase == 'HS'">
            <span>TOEFL Junior送分：</span>
            <Select v-model="myApplyInfo.toeflJuniorScore"  class="w200" :disabled="showEditStatus">
                <Option v-for="item in scoreList" :value="item.value" :key="'toeflJuniorScore_' +item.value">{{ item.label }}</Option>
            </Select>   
        </div>
        <div class="fl w50p" v-if="userInfo.applyPhase == 'HS'">
            <span>SSAT送分：</span>
            <Select v-model="myApplyInfo.ssatScore"  class="w200" :disabled="showEditStatus">
                <Option v-for="item in scoreList" :value="item.value" :key="'ssatScore_' + item.value">{{ item.label }}</Option>
            </Select>   
        </div>

        <div class="fl w100p"></div>
        <div class="fl w50p">
            <span>申请系统：</span>
            <Select v-model="myApplyInfo.type" class="w200" :disabled="showEditStatus" @on-change="applySysChange">
                <Option v-for="item in applySysList" :value="item.value" :key="'type_' + item.value">{{ item.label }}</Option>
            </Select>
        </div>
        <div class="fl w50p" v-show="isShowOther">
            <span>其他申请系统：</span>
            <Input class="w200" v-model="myApplyInfo.other" :disabled="showEditStatus"></Input>
        </div>
        <div class="fl w50p">
            <span>注册网站：</span>
            <Input class="w200" v-model="myApplyInfo.queryUrl" :disabled="showEditStatus"></Input>
        </div>
        <div class="fl w50p">
            <span>申请用户名：</span>
            <Input class="w200" v-model="myApplyInfo.queryAccount" :disabled="showEditStatus"></Input>  
        </div>
        <div class="fl w50p">
            <span>申请密码：</span>
            <Input class="w200"  v-model="myApplyInfo.queryPwd" :disabled="showEditStatus"></Input><span v-show="myApplyInfo.queryPwd && showEditStatus"style="width:65px;cursor:pointer;color:#05c7ff;" @click="viewPassword">查看密码</span>
        </div>
        <div class="fl w100p">
            <span>备注：</span>
            <Input class="w65p" type="textarea"  v-model="myApplyInfo.remarks" placeholder="请输入" :disabled="showEditStatus"></Input>
        </div>
        <div class="fl w100p">
            <span class="refereeFl">推荐人信息：</span>
            <div class="refereeFl referees">
                <div class="referee" v-for="(item, index) in refereeList" :key="index">
                    <span class="refereeName" @click="viewReferee(item.id)">{{item.name}}</span>
                    <span class="refereeAction" v-show="!showEditStatus" @click="editReferee(item.id)">[编辑]</span>
                    <span class="refereeAction" v-show="!showEditStatus" @click="delReferee(item)">[删除]</span>
                </div>
                <Button type="primary" @click="addReferee" v-show="!showEditStatus">添加推荐人</Button>
            </div>
        </div>
    </div>
    <Modal  :loading="modalloading"  :title="refereeTitle" v-model="modal1"  width="580px"  @on-ok="saveReferee()" @on-cancel="cancel()">
        <Form ref="basicStepForm" :rules="basicFormValidate" :model="refereeInfo" :label-width="98">
            <div style="overflow:hidden">
                <div style="float:left;width:50%;">
                    <FormItem label="姓名：" prop="name">
                        <Input v-model="refereeInfo.name" style="width:150px" :disabled="viewType"></Input>
                    </FormItem>
                </div>
                <div style="float:left;width:50%;">
                    <FormItem label="称位：">
                        <Select v-model="refereeInfo.call"  placeholder="请选择" style="width:150px" :disabled="viewType">
                            <Option value="Mr.">Mr.</Option>
                            <Option value="Ms.">Ms.</Option>
                        </Select>   
                    </FormItem>
                </div>
                <div style="float:left;width:50%;">
                    <FormItem label="推荐人类型：">
                        <Select v-model="refereeInfo.type" placeholder="请选择"  style="width:150px" :disabled="viewType">
                            <Option v-for="item in refereeType" :value="item.value" :key="'refereeInfoType_' + item.value">{{ item.label }}</Option>
                        </Select>  
                    </FormItem>
                </div>
                <div style="float:left;width:50%;">
                    <FormItem label="手机号：">
                        <Input v-model="refereeInfo.phone" style="width:150px" :disabled="viewType"></Input>
                    </FormItem>
                </div>
                <div style="float:left;width:50%;">
                    <FormItem label="邮箱：">
                        <Input v-model="refereeInfo.email" style="width:150px" :disabled="viewType"></Input>
                    </FormItem>
                </div>
                <div style="float:left;width:50%;">
                    <FormItem label="单位名称：">
                        <Input v-model="refereeInfo.company" style="width:150px" :disabled="viewType"></Input>
                    </FormItem>
                </div>
                <div style="float:left;width:50%;">
                    <FormItem label="职务：">
                        <Input v-model="refereeInfo.job" style="width:150px" :disabled="viewType"></Input>
                    </FormItem>
                </div>
                <div style="float:left;width:50%;">
                    <FormItem label="通讯地址：">
                        <Input v-model="refereeInfo.postalAddress" style="width:150px" :disabled="viewType"></Input>
                    </FormItem>
                </div>
                <div style="float:left;width:100%;">
                    <FormItem label="推荐信：">
                        <Select v-model="refereeInfo.recommendation" placeholder="请选择"  style="width:150px" :disabled="viewType">
                            <Option v-for="item in refereeDocs" :value="item.id" :key="'refereeInfoDocs_' + item.id">{{ item.name }}</Option>
                        </Select>  
                    </FormItem>
                </div>
                <div style="float:left;width:100%;">
                    <FormItem label="与推荐人关系：">
                        <Input type="textarea" v-model="refereeInfo.relationship" style="width:425px" :disabled="viewType"></Input>
                    </FormItem>
                </div>
                <div style="float:left;width:100%;">
                    <FormItem label="备注：">
                        <Input type="textarea" v-model="refereeInfo.remarks" style="width:425px" :disabled="viewType"></Input>
                    </FormItem>
                </div>
            </div>
        </Form>
    </Modal>
    <Modal v-model="modal2"  width=400 title="删除推荐人" @on-ok="doDelReferee()" @on-cancel="cancel()">
        <div style="text-indent: 2em;">确定删除推荐人 <span style="color:#41b3ae;">{{delName}}</span>?</div>
    </Modal>
</div>
</template>
<script>
    import BtnList from '@public/modules/btnlist';
    import { mapState, mapGetters } from 'vuex'
    import valid, { errors, common, sys, aplApplyInfo, aplSafebox, aplApplyReferee} from "../../libs/request";
    import {docuManage} from "../../../../spoc-docu-web/src/libs/docuManage";

    export default {
        props:{
            pId: {
                required: true
            },
            from:{
                type: String
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
                refereeDocs: [],
                refereeType: [],
                basicFormValidate: {
					name: [{
						required: true,
						type: 'string',
						message: '必填项',
						trigger: 'change'
					}]
                },
                refereeList: [],
                delId: '',
                delName: '',
                refereeInfo: {},
                viewType: false,
                modalloading: true,
                modal1: false,
                modal2: false,
                refereeTitle: '添加推荐人',
                isShowOther: false, //是否其他选项
                applySysList:[
                    {
                        value: '0',
                        label: 'applications online'
                    },
                    {
                        value: '1',
                        label: 'SSAT'
                    },
                    {
                        value: '2',
                        label: '其他'
                    }
                ], //申请系统下拉菜单
                applySysListValues: [0,1],
                applySysListOtherValue: 2,
                myApplyInfo: {
                },
                scoreList: [
                    {
                        value: '0',
                        label: '无需送分'
                    },
                    {
                        value: '1',
                        label: '已通知送分'
                    },
                    {
                        value: '3',
                        label: '应送分实际未送分'
                    },
                    {
                        value: '2',
                        label: '已送分'
                    }
                ],
                tableShowStatus: true,
                showEditStatus: true,
                btnListVal: [
                ],
            }
		},
		components: { 
            BtnList
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
            this.loadSelectOption()
            this.listReferee()
        },
		methods: {
            listReferee(){
                let obj = {
                    choiceId: this.$route.query.choiceId,
                    groupId: this.$route.query.groupId
                }
                aplApplyReferee.list(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.refereeList = res.data.data
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
            getRefereeInfo(id){
                let obj = {
                    id: id,
                }
                aplApplyReferee.form(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.refereeInfo = res.data.data
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
            addReferee(){
                this.refereeInfo = {
                    id: '',
                    name: '',
                    call: '',
                    type: '',
                    phone: '',
                    email: '',
                    company: '',
                    job: '',
                    postalAddress: '',
                    recommendation: '',
                    relationship: '',
                    remarks: '',
                }
                this.$refs.basicStepForm.resetFields()
                this.refereeTitle = '添加推荐人'
                this.modal1 = true
                this.viewType = false
            },
            editReferee(id){
                this.getRefereeInfo(id)
                this.refereeTitle = '编辑推荐人'
                this.modal1 = true
                this.viewType = false
            },
            viewReferee(id){
                this.getRefereeInfo(id)
                this.refereeTitle = '查看推荐人'
                this.modal1 = true
                this.viewType = true
            },
            delReferee(item){
                this.modal2 = true
                this.delId = item.id
                this.delName = item.name
            },
            saveReferee(){
                if(this.viewType){
                    this.modal1 = false
                    return
                }
                this.refereeInfo.choiceId = this.$route.query.choiceId
                this.refereeInfo.groupId = this.$route.query.groupId
                this.$refs.basicStepForm.validate((validRes) => {
                    if(validRes) {
                        aplApplyReferee.save(this.refereeInfo).then(valid.call(this))
                        .then(res => {
                            if(res.ok) {
                                this.modal1 = false
                                this.listReferee()
                            }
                        })
                        .catch(errors.call(this))
                        .finally(() => {});
                    } else {
                        this.modal1 = true
                        this.modalloading = false
                        let _this = this
                        setTimeout(function(){
                            _this.modalloading = true
                        },0)
                    }
                })
            },
            doDelReferee(){
                let obj = {
                    id: this.delId,
                }
                aplApplyReferee.delete(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.listReferee()
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
            cancel(){

            },
            //切换申请系统
            applySysChange(){
                if(this.myApplyInfo.type == this.applySysListOtherValue){
                    this.isShowOther = true
                } else {
                    this.isShowOther = false
                }
            },
            //加载下拉菜单字典
            loadSelectOption(){
                let obj = {
                    types: 'apl_apply_referee_type',
                }
                sys.batchListData(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.refereeType = res.data.data.apl_apply_referee_type
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});

                let obj1 = {
                    serviceGroupId: this.$route.query.groupId,
                    type:4
                }
                docuManage.listTypeDocessay(obj1).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.refereeDocs= res.data.data
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});

                if(this.userInfo.applyPhase != 'HS' ){ //不是中学生
                    let keyType =  this.userInfo.applyPhase == 'PG' ? 'ss_apply_require_system':'ss_school_major_system'
                    let obj = {
                        types: keyType,
                    }
                    sys.batchListData(obj).then(valid.call(this))
                    .then(res => {
                        if(res.ok) {
                            this.applySysList = res.data.data[keyType]
                            let applySysListValues = []
                            this.applySysList.forEach((item,index)=>{
                                applySysListValues.push(item.value)
                                if(item.label == '其他') {
                                    this.applySysListOtherValue = item.value
                                }
                            })
                            this.applySysListValues = applySysListValues
                            this.loadAplApplyInfo()
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
                } else {
                    this.loadAplApplyInfo()
                }
            },
            loadAplApplyInfo(){
                let obj = {
                    choiceId: this.$route.query.choiceId,
                    groupId: this.$route.query.groupId
                }
                aplApplyInfo.form(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.myApplyInfo = res.data.data
                        this.myApplyInfo.toeflCode = parseInt(this.myApplyInfo.toeflCode) || null
                        this.myApplyInfo.satCode = parseInt(this.myApplyInfo.satCode) || null
                        this.myApplyInfo.actCode = parseInt(this.myApplyInfo.actCode) || null
                        this.myApplyInfo.greCode = parseInt(this.myApplyInfo.greCode) || null
                        this.myApplyInfo.gmatCode = parseInt(this.myApplyInfo.gmatCode) || null
                        this.myApplyInfo.lsatCode = parseInt(this.myApplyInfo.lsatCode) || null
                        this.myApplyInfo.toeflJuniorCode = parseInt(this.myApplyInfo.toeflJuniorCode) || null
                        this.myApplyInfo.ssatCode = parseInt(this.myApplyInfo.ssatCode) || null
                        if(this.myApplyInfo.queryPwd){
                            this.myApplyInfo.queryPwd = '******'
                        }
                        if(this.applySysListValues.indexOf(this.myApplyInfo.type) < 0) {
                            //其他类型
                            let other = this.myApplyInfo.type
                            this.myApplyInfo.other = other
                            this.myApplyInfo.type = this.applySysListOtherValue
                            this.isShowOther = true
                        }   
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
                        infoStatus: this.myApplyInfo.infoStatus, // 申请信息状态 ,
                        queryAccount: this.myApplyInfo.queryAccount, //  申请用户名 ,
                        queryPwd: this.myApplyInfo.queryPwd,// 申请密码 ,
                        queryUrl: this.myApplyInfo.queryUrl,//  注册网站 ,
                        remarks: this.myApplyInfo.remarks,// 备注 ,
                        subDate: this.myApplyInfo.subDate ? new Date(this.myApplyInfo.subDate).format('yyyy-MM-dd hh:mm:ss'): '',//提交时间 ,
                        schoolAuditDate: this.myApplyInfo.schoolAuditDate ? new Date(this.myApplyInfo.schoolAuditDate).format('yyyy-MM-dd hh:mm:ss'): '',//学校审核时间 ,
                        deadline: this.myApplyInfo.deadline ? new Date(this.myApplyInfo.deadline).format('yyyy-MM-dd hh:mm:ss'): '',//截止时间 ,

                        toeflCode: this.myApplyInfo.toeflCode,
                        satCode: this.myApplyInfo.satCode,
                        actCode: this.myApplyInfo.actCode,
                        toeflScore: this.myApplyInfo.toeflScore,
                        satActScore: this.myApplyInfo.satActScore,
                        greCode: this.myApplyInfo.greCode,
                        gmatCode: this.myApplyInfo.gmatCode,
                        lsatCode: this.myApplyInfo.lsatCode,
                        toeflScore: this.myApplyInfo.toeflScore,
                        greGmatLsatScore: this.myApplyInfo.greGmatLsatScore,
                        toeflJuniorCode: this.myApplyInfo.toeflJuniorCode,
                        ssatCode: this.myApplyInfo.ssatCode,
                        toeflScore: this.myApplyInfo.toeflScore,
                        toeflJuniorScore: this.myApplyInfo.toeflJuniorScore,
                        ssatScore: this.myApplyInfo.ssatScore,
                    }
                    if(this.myApplyInfo.id){
                        obj.id = this.myApplyInfo.id
                    }
                    if(this.isShowOther) {
                        obj.type = this.myApplyInfo.other//申请系统类型 ,
                    } else {
                        obj.type = this.myApplyInfo.type
                    }
                    aplApplyInfo.save(obj).then(valid.call(this))
                    .then(res => {
                        if(res.ok) {
                            this.loadAplApplyInfo()
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
                } else {
                    if(this.myApplyInfo.queryPwd == '******'){
                        this.viewPassword()
                    }
                }
            },
            viewPassword(){
                let obj = {
                    id:  this.myApplyInfo.safeBoxId
                }
                aplSafebox.viewPassword(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.myApplyInfo.queryPwd = res.data.data
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
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