<template>
    <div class="contentBox">
        <menubar>
            <span slot="menu" class="slotContent">
                <a href="javascript:void(0)">{{$t('SchoolManagement')}}</a>
                <span class="arrow">></span>
                <a href="javascript:void(0)" class="active">{{$t('AddSchool')}}</a>
            </span>
            <span slot="operate">
                <Button type="ghost" icon="ios-arrow-left" @click="goBack">
                    <span>{{$t('Common.return')}}</span>
                </Button>
            </span>
        </menubar>
        <Form ref="formValidate" :model="schoolData" label-position="right" :label-width="120" inline :rules="ruleValidate">
            <Form-item label="Logo" style="margin-bottom:0px; margin-top:20px;">
                <div class="infoList logoBox clearfix">
                    <div class="fl schoolLogoBox"><img :src="schoolData.logoUrl" :class="{hide:!schoolData.logoUrl}"></div>
                    <div class="fl uploadBox">
                        <Upload
                            ref="upload"
                            name="files"
                            :show-upload-list="false"
                            :on-success="handleSuccess"
                            :format="['jpg','jpeg','png']"
                            :max-size="2048"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            :action="uploadUrl">
                            <Button type="primary">{{$t('UploadPictures')}}</Button>
                        </Upload>
                        <p class="tips">* {{$t('PicturesTips')}}</p>
                        <div class="ivu-form-item-error-tip error_tips">{{imgErrorTips}}</div>
                    </div>
                </div>
            </Form-item>
            <div class="infoList">
                <Form-item :label="$t('XxSchool.schoolName')" prop="schoolName">
                    <Input v-model="schoolData.schoolName" style="width: 300px"></Input>
                </Form-item>
                <Form-item :label="$t('XxSchool.schoolRank')">
                    <Input v-model="schoolData.schoolRank" style="width: 300px"></Input>
                </Form-item>
            </div>
            <div class="infoList addMajorBox clearfix" >
                <div class="fl">
                    <Form-item :label="$t('XxSchool.majorName')">
                        <Select v-model="majorId" style="width: 300px" :label-in-value="labelInValue" @on-change="selectMajor">
                            <Option v-for="item in majorList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item :label="$t('XxSchool.majorRank')">
                        <Input v-model="majorRank" style="width: 235px"></Input>
                    </Form-item>
                </div>
                <Button class="addMajor fl" type="ghost" @click="addMajor">{{$t('Common.add')}}</Button>
                <div class="ivu-form-item-error-tip error_tips">{{majorErrorTips}}</div>
            </div>
            <div class="majorBox" :class="{hide:!xxSchoolMajorList.length}">
                <Table border :columns="majorColumns" :data="xxSchoolMajorList"></Table>
            </div>
            <div class="infoList">
                <Form-item :label="$t('XxSchool.state')" prop="state">
                    <Select v-model="schoolData.state" style="width: 300px">
                        <Option v-for="item in stateList" :value="item.value" :key="item.value">{{item.remarks}}</Option>
                    </Select>
                </Form-item>
                <Form-item :label="$t('XxSchool.applyUrl')" prop="applyUrl">
                    <Select v-model="schoolData.applyUrl" style="width: 300px">
                        <Option v-for="item in systemList" :value="item.value" :key="item.value">{{item.remarks}}</Option>
                    </Select>
                </Form-item>
            </div>
            <div class="infoList">
                <Form-item :label="$t('XxSchool.schoolDetail')" prop="schoolDetail">
                    <Input v-model="schoolData.schoolDetail"  type="textarea" :autosize="{minRows: 2,maxRows: 5}" style="width: 735px"></Input>
                </Form-item>
            </div>
            <div class="infoList">
                <Form-item :label="$t('XxSchool.kvideoDesc')" prop="kvideoDesc">
                    <Input v-model="schoolData.kvideoDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" style="width: 735px"></Input>
                </Form-item>
            </div>
            <div class="infoList">
                <Form-item>
                    <Button type="primary" @click="savaSchoolInfo('formValidate')">{{$t('SaveMessage')}}</Button>
                </Form-item>
            </div>
        </Form>
    </div>
</template>
<script>
    import {mapMutations} from 'vuex';
    import util from '../../libs/js/util.js';
    import nozzle,{uploadUrl} from "../../libs/interface.js";
    import MenuBar from '../../modules/breadcrumb/menuBar';
    export default {
        data(){
            return {
                labelInValue:true,
                shoolId:"",
                imgErrorTips:"",
                majorErrorTips:"",
                majorId:"",
                majorName:"",
                majorRank:"",
                stateList:[],//所在州
                systemList:[],//申请系统
                schoolData:{
                    id:"",
                    schoolName:"",
                    logoUrl:"",
                    schoolRank:"",
                    kvideoDesc:"",
                    schoolDetail:"",
                    applyUrl:"",
                    state:""
                },
                xxSchoolMajorList:[],
                majorColumns:[
                    {
                        type: 'index',
                        title:" ",
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: this.$t('XxSchool.majorName'),
                        key: 'notes'
                    },
                    {
                        title: this.$t('XxSchool.majorRank'),
                        key: 'majorRank'
                    },
                    {
                        title: this.$t("XxChoiceLog.type"),
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.deletMajor(params.index)
                                        }
                                    }
                                }, this.$t('DeleteSchool'))
                            ]);
                        }
                    }
                ],
                majorList:[],
                ruleValidate: {
                    schoolName: [
                        { required: true, message: '学校名称不能为空', trigger: 'blur' }
                    ],
                    state:[
                        { required: true, message: '学校所在州不能为空', trigger: 'blur' }
                    ],
                    applyUrl:[
                        { required: true, message: '申请系统不能为空', trigger: 'blur' }
                    ],
                    schoolDetail:[
                        { required: true, message: '请输入学校介绍', trigger: 'blur' }
                    ],
                    kvideoDesc:[
                        { required: true, message: '请输入核心课程', trigger: 'blur' }
                    ]
                },
                uploadUrl:uploadUrl
            }
        },
        created: function(){
            this.shoolId=this.$route.query.schoolId;
        },
        mounted(){
            this.loadMajorList();
            this.loadStateList();
            this.loadSystemList();
            this.loadSchoolData();
        },
        methods:{
            ...mapMutations(['updateLoadingStatus']),
            loadMajorList(){//加载专业列表
                var _this=this;
                this.updateLoadingStatus({isLoading:true});
                util.ajax.get(nozzle.xxMajor.list).then(function(res){
                    util.checkAjaxJson(res).thenSuccess(function(json){
                        _this.majorList=json.data.list;
                    }).autoRun("login","error");
                    _this.updateLoadingStatus({isLoading:false});
                }).catch(function(error) {
                    _this.updateLoadingStatus({isLoading:false});
                    util.checkAjaxError(error);
                });
            },
            loadStateList(){//所在州
                var _this=this;
                this.updateLoadingStatus({isLoading:true});
                util.ajax.get(nozzle.basicData.dictListData,{params:{
                    type:"state"
                }}).then(function(res){
                    util.checkAjaxJson(res).thenSuccess(function(json){
                        _this.stateList=json.data;
                    }).autoRun("login","error");
                    _this.updateLoadingStatus({isLoading:false});
                }).catch(function(error) {
                    _this.updateLoadingStatus({isLoading:false});
                    util.checkAjaxError(error);
                });
            },
            loadSystemList(){//所在系统
                var _this=this;
                this.updateLoadingStatus({isLoading:true});
                util.ajax.get(nozzle.basicData.dictListData,{params:{
                    type:"xx_school_apply_url"
                }}).then(function(res){
                    util.checkAjaxJson(res).thenSuccess(function(json){
                        _this.systemList=json.data;
                    }).autoRun("login","error");
                    _this.updateLoadingStatus({isLoading:false});
                }).catch(function(error) {
                    _this.updateLoadingStatus({isLoading:false});
                    util.checkAjaxError(error);
                });
            },
            selectMajor(_data){
                this.majorName=_data.label;
            },
            loadSchoolData(){//加载学校数据
                var _this=this;
                this.updateLoadingStatus({isLoading:true});
                util.ajax.get(nozzle.xxSchool.form,{params:{
                    id: this.shoolId
                }}).then(function(res){
                    util.checkAjaxJson(res).thenSuccess(function(json){
                        _this.schoolData=json.data;
                        _this.xxSchoolMajorList=JSON.parse(JSON.stringify(json.data.xxSchoolMajorList));
                    }).autoRun("login","error");
                    _this.updateLoadingStatus({isLoading:false});
                }).catch(function(error) {
                    _this.updateLoadingStatus({isLoading:false});
                    util.checkAjaxError(error);
                });
            },
            goBack(){//返回
                this.$router.push({name:'choiceschool.schoolManage'});
            },
            handleSuccess (res, file) {//图片上传成功
                this.imgErrorTips="";
                this.schoolData.logoUrl= res.data.filePath;
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                });
            },
            addMajor(){//添加专业
                if(!this.majorId){
                    this.majorErrorTips="请选择专业";
                }else{
                    this.majorErrorTips="";
                    this.xxSchoolMajorList.push({
                        majorId:this.majorId,
                        notes:this.majorName,
                        majorRank:this.majorRank
                    });
                }
            },
            deletMajor(index){//删除专业
                this.xxSchoolMajorList.splice(index,1);
            },
            savaSchoolInfo(name){
                var otherError=true;
                if(!this.schoolData.logoUrl){
                    otherError=false;
                    this.imgErrorTips="请上传学校logo图片";
                }
                if(!this.xxSchoolMajorList.length){
                    otherError=false;
                    this.majorErrorTips="请至少添加一个专业";
                }
                this.$refs[name].validate((valid) => {
                    if (valid && otherError) {
                        var _this=this;
                        this.updateLoadingStatus({isLoading:true});
                        var submitData={};
                        this.schoolData.isNewRecord=false;
                        this.schoolData.xxSchoolMajorList=[];
                        submitData.xxSchool=JSON.stringify(this.schoolData);
                        submitData.xxSchoolMajorList=JSON.stringify(this.xxSchoolMajorList);
                        util.ajax.post(nozzle.xxSchool.save,submitData).then(function(res){
                            util.checkAjaxJson(res).thenSuccess(function(json){
                                _this.$Message.success('提交成功!');
                                _this.$router.push({name:'choiceschool.schoolManage'});
                            }).autoRun("login","error");
                            _this.updateLoadingStatus({isLoading:false});
                        }).catch(function(error) {
                            _this.updateLoadingStatus({isLoading:false});
                            util.checkAjaxError(error);
                        });
                    }
                });
            }
        },
        components: {
          'menubar':MenuBar
        }
    }
</script>
<style scoped lang="less">
.logoBox{
    display: inline-block;
    .schoolLogoBox{
        width: 70px;
        height: 70px;
        background-color: #f7f7f7;
        border: 1px solid #e0e1e2;
        img{
            width:70px;
            height:70px;
        }
    }
    label{
        line-height:70px;
    }
    .uploadBox{
        position: relative;
        padding:5px 0px;
        margin-left:20px;
        .tips{
            color:#999899;
            font-size:12px;
            margin-top:10px;
        }
        .error_tips{
            top: 85%;
        }
    }
}
.majorBox{
    position: relative;
    width: 734px;
    margin-left: 120px;
    margin-bottom: 20px;
}
.addMajorBox{
    position: relative;
    .error_tips{
        top: 52%;
        font-size: 12px;
        left:120px;
    }
}

</style>
