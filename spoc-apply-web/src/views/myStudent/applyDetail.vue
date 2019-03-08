<style lang="less" scoped>
    .applyDetail{
        /* border-top: .5px solid #999;
        padding-top: 30px;  */
        .chooseSchool{
            width:160px;
            background: #fff;
            border: 1px solid #e0e0e0;
            position: fixed;
            right: 0px;
            bottom: 0px;
            z-index: 999;
            box-shadow: 0 0 15px rgba(68,188,183,.2);
            .chooseSchoolHeader{
                background: #f4f4f4;
            }
            .header{
                font-size: 16px;
                font-weight: bold;
                padding-left: 20px;
                line-height: 32px;
            }
            .chooseSchoolIcon{
                color:#44bcb7;
                cursor: pointer;
                padding-left: 5px;
            }
            .schoolNames{
                max-height: 290px;
                overflow-y: scroll;
            }
            .schoolName{
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
                cursor: pointer;
                padding: 5px;
                text-align: center;
                border-top: 1px solid #e0e0e0;
                &:hover{
                    color: #44bcb7;
                }
            }
        }
        .clear{
            overflow: hidden;
            .fl{
                float: left;
            }
            .fr{
                float: right;
            }
            .name{
                cursor: pointer;
                color: #44bcb7;
                font-size: 18px;
                line-height: 28px;
            }
            .card{
                cursor: pointer;
                color: #71bdb9;
                margin-left: 10px;
            }
            .uploadConfirm{
                margin-left: 20px;
                .uploadConfirmButton{
                    cursor: pointer;
                    color: #2d8cf0;
                    padding-top: 5px;
                }
                .files-list{
                    display: inline-block;
                    .tool-tips{
                        display: inline-block;
                    }
                }
                .fileicon{
                    background: url("../../assets/images/detail/proto.svg") no-repeat 50% 15%;
                    background-size: 16px;
                    width: 30px;
                    height: 45px;
                    display: inline-block;
                    cursor: pointer;
                    vertical-align: middle;
                    position: relative;
                    &:hover{
                        &>a{
                            display: block;
                        }
                    }
                    &>a{
                        display: none;
                        font-size: 12px;
                        position: absolute;
                        top: 31px;
                        width: inherit;
                        left: 1px;
                        text-align: center; 
                    }
                }
            }
        }
        .tags{
            margin-bottom: 10px;
            span{
                display: inline-block;
                height: 20px;
                line-height: 20px;
                padding: 0px 12px;
                text-align: center;
                background-color:#ddd; 
                color: #fff;
                margin-right: 10px;
                border-radius: 5px; 
            }
        }
        .info{
            .title{
                color: #666;
                margin-right: 10px;
                line-height: 30px;
                height: 30px;
            }
            .schoolNameBig{
                font-size: 16px;
                font-weight: bold;
            }
            .schoolName{
                color: #44bcb7;
                cursor: pointer;
            }
            .edit{
                margin-left: 25px;
                color: #00afe2;
                cursor: pointer;
            }
        }
        .applyRes{
            overflow: hidden;
            .title{
                display: inline-block;
                float: left;
                color: #666;
                margin-right: 10px;
                line-height: 36px;
                height: 36px;
            }
            .res{
                float: left;
                width:300px;
            }
        }

        .res-list{
            float: left;
            width: 142px;
            &-inner{
                .s-item{
                    height: 36px;
                    &:hover{
                        .type-ctrl{
                            display: inline-block;
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
                        cursor: pointer;
                        color: #3486f6;
                    }
                }
            }
        }
    }

</style>
<template>
<div class="applyDetail">
    <div class="clear">
        <div class="fl name">
            <span @click="openHref('apply.addStudent',studentInfo.studentId)">{{studentInfo.studentName}}</span>
            <span @click="showModel(2,studentInfo)"><Icon class="card" type='card'></Icon></span>
        </div>
        <div class="fl uploadConfirm">
            <ul class="files-list">
                <template v-for="(file,index) in xxAttachmentList">
                    <Tooltip class="tool-tips" :content="file | showFname" :key="index" placement="top">
                        <li class="fileicon" @click.stop="openFile(file)">
                        <a @click.stop.prevent="removeFile(file)" v-if="hasPer(file.creator)">删除</a>
                    </li>
                    </Tooltip>
                </template>
            </ul>
        </div>
        <div class="fl uploadConfirm">
            <Upload 
                :action="attUploadUrl" 
                :data="{objectId:studentInfo.studentId ,dirName:'files',type:'confirm',fileName:mainFile2Name()}" 
                name="files" 
                :on-success="uploadSuccess" 
                class="proto-upload" 
                :format="['pdf','jpg','png','gif','jpeg']" 
                :show-upload-list="false" 
                :max-size="10000000" 
                :on-format-error="uploadFormatError" 
                :on-progress="onUploadProgress" 
                :on-error="onUploadError" 
                :on-exceeded-size="uploadMaxSize">
                <p class="uploadConfirmButton">上传提交确认</p>
            </Upload>
        </div>
        <div class="fr"><Button type="primary" v-if="from == 'myStudent'" @click="showModel(1,studentInfo)" v-show="showApplyEnd">申请结案</Button></div>
    </div>
    <div class="tags">
        <span v-for="item in studentInfo.tags" :key="item">{{item}}</span>
    </div>
    <div class="info"><span class="title">服务状态：</span>
        <span v-show="canEditStatus">{{serviceStatusLabel}}</span>
        <Select v-show="!canEditStatus" v-model="studentInfo.serviceStatus" style="width:200px">
            <Option v-if="studentInfo.serviceStatus <= item.value" disabled v-for="(item, index) in pl_service_status_status" :value="item.value" :key="item.value + index ">{{ item.label }}</Option>
            <Option  v-if="studentInfo.serviceStatus > item.value" v-for="(item, index) in pl_service_status_status" :value="item.value" :key="item.value + index ">{{ item.label }}</Option>
        </Select> 
        <span class="edit" v-if="from == 'myStudent' && showApplyEnd" @click="editStatus">{{canEditStatus ? '修改':'保存'}}</span>
    </div>
    <div class="info">
        <span class="title">申请学校：</span>
        <span class="schoolNameBig schoolName" @click="openHref('apply.addSchool',studentInfo.schoolId)">{{studentInfo.schoolName}}</span>
        <span class="edit" v-if="studentInfo.applyBox" @click="open(studentInfo.applyBox.queryUrl)">提交申请信息</span>
        <span class="edit" v-if="studentInfo.queryBox" @click="open(studentInfo.queryBox.queryUrl)">查询申请结果</span>
        <span class="edit" v-if="!studentInfo.applyBox" style="color:#999;cursor:default;">提交申请信息</span>
        <span class="edit" v-if="!studentInfo.queryBox" style="color:#999;cursor:default;">查询申请结果</span>
    </div>
    <div class="info" v-if="studentInfo.applyPhase == 'PG'">
        <span class="title">研究生院：</span>
        <span class="schoolName" @click="openHref('apply.applyDetail')">{{studentInfo.gradschoolName}}</span>
    </div>
    <div class="info">
        <span class="title">专业项目：</span>
        <span class="schoolName" @click="openHref('library.graduateProgramInfo',studentInfo.majorId)">{{studentInfo.majorName}}</span>
    </div>
    <div class="applyRes">
        <span class="title">申请结果：</span>
        <div class="res"  v-if="studentInfo.aplApplyStatus && studentInfo.aplApplyStatus.resultStatus">
            <div class="res-list">
                <div class="res-list-inner">
                    <div class="s-item">
                        <div class="type" :class="studentInfo.aplApplyStatus.resultStatus">
                            <i class="iconfont icon-zhang_"></i>
                            <span class="text" v-text="studentInfo.aplApplyStatus.resultStatus"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="info"><span class="title">更新时间：</span><span v-if="studentInfo.aplApplyStatus">{{studentInfo.aplApplyStatus.updateDate}}</span></div>
    <apply-detail-part1 ref="part1" :showApplyEnd="showApplyEnd" :from="from" :pId="pId" :userInfo="studentInfo"></apply-detail-part1>
    <apply-detail-part2 ref="part2" :showApplyEnd="showApplyEnd" :from="from" :pId="pId" :userInfo="studentInfo"></apply-detail-part2>
    <apply-detail-part3 ref="part3" :showApplyEnd="showApplyEnd" :from="from" :pId="pId" :userInfo="studentInfo"></apply-detail-part3>
    <apply-detail-part4 ref="part4" :showApplyEnd="showApplyEnd" :from="from" :pId="pId" :userInfo="studentInfo"></apply-detail-part4>
    <apply-detail-part5 ref="part5" :showApplyEnd="showApplyEnd" :from="from" :pId="pId" :userInfo="studentInfo"></apply-detail-part5>
    <Modal
        v-model="modal1"
        title="结案申请"
        width="300"
        @on-ok="ok(1)"
        @on-cancel="cancel">
        <p style="text-indent:2em">确认对<span style="color:#44bcb7;padding:0 5px;">{{studentInfo.studentName}}</span> 提交结案申请</p>
    </Modal>
    <create-exam-info  ref="createExamInfoRef"  :studentType="studentInfo.applyPhase" :groupId="studentInfo.groupId" :studentName="studentInfo.studentName"></create-exam-info>
    <div class="chooseSchool">
        <div class="chooseSchoolHeader">
            <Icon class="chooseSchoolIcon" size="16" type="android-add-circle"  v-show="!showSchools" @click="showSchools=!showSchools"></Icon>
            <Icon class="chooseSchoolIcon" size="16" type="android-remove-circle"  v-show="showSchools" @click="showSchools=!showSchools"></Icon>
            <span class="header">申请学校({{$route.query.contractCount}}/{{$route.query.choiceTotal}})</span>
        </div>
        <div class="schoolNames" :style="{display: showSchools ? 'block': 'none'}">
            <div class="schoolName" :style="{color: item.choiceId == $route.query.choiceId ? '#44bcb7' : ''}" v-for="(item, index) in tableData" :key="index" @click="changeSchool(item.choiceId)">{{item.schoolName}}</div>
        </div>
        <div class="schoolName" @click="goTop">回顶部</div>
    </div>
</div>
</template>
<script>
    let _this
    window.onbeforeunload = function(){
        if(!(_this.$refs.part1.showEditStatus &&
                _this.$refs.part2.showEditStatus && 
                _this.$refs.part3.showEditStatus && 
                _this.$refs.part4.showEditStatus && 
                _this.$refs.part5.showEditStatus)) 
        {
            return ''
        }
    }
    import util from '../../../../spoc-choiceschool-web/src/libs/js/util.js';
    import nozzle from "../../../../spoc-choiceschool-web/src/libs/interface.js";
    import createExamInfo from '../../modules/createExamInfo'; 
    import ApplyDetailPart1 from './applyDetailPart1';
    import ApplyDetailPart2 from './applyDetailPart2';
    import ApplyDetailPart3 from './applyDetailPart3';
    import ApplyDetailPart4 from './applyDetailPart4';
    import ApplyDetailPart5 from './applyDetailPart5';

    import { mapState, mapGetters } from 'vuex'

    import valid, { errors, common, sys, aplApplyTask, aplSafebox, aplEndAudit} from "../../libs/request";

    export default {
        props:{
            pId: {
                required: true
            }
        },
        mounted(){  
            this.loadSelectOption()
            _this = this
        },
        computed:{
            ...mapState(['userInfo']),
            from: function () {
                return this.$route.query.from;
            }
        },
        beforeRouteLeave (to, from, next) {
            if(!(this.$refs.part1.showEditStatus &&
                 this.$refs.part2.showEditStatus && 
                 this.$refs.part3.showEditStatus && 
                 this.$refs.part4.showEditStatus && 
                 this.$refs.part5.showEditStatus)) 
            {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>还有未保存的数据，确定离开？</p>',
                    onOk: () => {
                        next()
                    },
                    onCancel: () => {
                        next(false)
                    }
                });
            } else {
                next()
            }
        },
        data () {
            return {
                xxAttachmentList: [],
                attUploadUrl:nozzle.basicData.uploadFile,
                tableData: [],
                showSchools: true, //展开收缩学校列表
                showApplyEnd: false, //显示申请结案
                modal1: false, //确认结案模态框
                modal2: false, //查看密码模态框
                serviceStatusLabel:'', //服务状态汉字
                pl_service_status_status: [], //服务状态下拉菜单
                studentInfo:{}, //个人信息对象
                canEditStatus: true, //修个/保存服务状态切换
            }
		},
		components: { 
            createExamInfo,
            ApplyDetailPart1,
            ApplyDetailPart2,
            ApplyDetailPart3,
            ApplyDetailPart4,
            ApplyDetailPart5
        },
		methods: {
            removeFile(item){
                this.$Modal.confirm({
                    title: '删除附件',
                    content: '您确定要删除此附件吗？删除后将无法恢复',
                    onOk: () => {
                        const data = {id:item.id};
                        util.ajax.post(nozzle.xxStudent.deleteAttachment,data).then((res)=>{
                        util.checkAjaxJson(res).thenSuccess(json=>{
                            this.getStudentInfo({id:this.studentInfo.studentId});
                        }).autoRun("login","error");
                        //this.updateLoadingStatus({isLoading:false});
                    }).catch(error => {
                        //this.updateLoadingStatus({isLoading:false});
                        util.checkAjaxError(error);
                    });
                    }
                });
            },
            hasPer(uid){
                if(this.userInfo.admin){
                    return true;
                }
                if(uid==this.userInfo.id){
                    return true;
                }
                return false;
            },
            getStudentInfo(_data){//获取学生信息
                var _this=this;
                util.ajax.get(nozzle.xxStudent.formChoiceSchool,{params:_data}).then(function(res){
                    util.checkAjaxJson(res).thenSuccess(function(json){
                        _this.xxAttachmentList = json.data.xxAttachmentList;
                    }).autoRun("login","error");
                }).catch(function(error) {
                    util.checkAjaxError(error);
                });
            },
            openFile(item){
                window.open(item.filePath);
            },
            uploadSuccess(res,file){
                setTimeout(()=>{
                    if(res.status == 'success'){
                        this.getStudentInfo({id:this.studentInfo.studentId});
                        this.$Message.success("上传成功");
                    } else {
                        this.$Message.error(res.message);
                    }
                    //this.updateLoadingStatus({isLoading:false});
                },1000);
            },
            uploadFormatError() {
                this.$Message.error("请使用图片或pdf文件");
            },
            uploadMaxSize() {
                this.$Message.error("文件大小不能超过10MB");
            },
            onUploadProgress(){
                //this.updateLoadingStatus({isLoading:true});
            },
            onUploadError(error){
                this.$Message.error(error.toString());
                //this.updateLoadingStatus({isLoading:false});
            },
            mainFile2Name(){
                return `${this.studentInfo.studentName}-提交确认`;
            },
            changeSchool(choiceId){
                this.$router.push({
                    name: 'apply.applyDetail',
                    query: {
                        from: this.$route.query.from,
                        choiceId: choiceId,
                        groupId: this.$route.query.groupId,
                        contractCount: this.$route.query.contractCount,
                        choiceTotal: this.$route.query.choiceTotal,
                    }
                })
            },
            //加载下拉菜单字典
            loadSelectOption(){
                let obj = {
					//服务状态,确认申请结果
                    types: 'pl_service_status_status_apply'
				}
				sys.batchListData(obj).then(valid.call(this))
				.then(res => {
					if(res.ok) {
						this.pl_service_status_status = res.data.data.pl_service_status_status_apply
                        this.loadData()
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
            },
            //加载个人信息
            loadData(){
                let obj = {
					choiceId: this.$route.query.choiceId
				}
				aplApplyTask.applyDetail(obj).then(valid.call(this))
				.then(res => {
					if(res.ok) {
                        this.studentInfo = res.data.data
                        this.getStudentInfo({id:this.studentInfo.studentId})
                        this.showApplyEnd = !((res.data.data.endStatus && (res.data.data.endStatus == 'commit' || res.data.data.endStatus == 'pass' || res.data.data.endStatus == 'commit_boss')) || (res.data.data.caseStatus && res.data.data.caseStatus == 'assigned'))
                        this.pl_service_status_status.forEach((item)=>{
                            if(item.value == this.studentInfo.serviceStatus) {
                                this.serviceStatusLabel = item.label
                            }
                        })  
                        if(res.data.data.serviceStatus == '已结案') {
                             this.serviceStatusLabel  =  res.data.data.serviceStatus
                        }
                        let obj = {
                            studentId: res.data.data.studentId,
                        }
                        aplApplyTask.sublist(obj).then(valid.call(this)).then(res => {
                            if(res.ok) {
                                this.tableData =  res.data.data
                            }
                        })
                        .catch(errors.call(this))
                        .finally(() => {})
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
            },
            //修改个人服务状态
            editStatus(){
                this.canEditStatus = !this.canEditStatus
                if(this.canEditStatus) {
                    let obj= {
                        phase: this.pId,
                        status:this.studentInfo.serviceStatus,
                        serviceGroupId: this.studentInfo.groupId,
                    }
                    common.saveStatus(obj).then(valid.call(this))
                    .then(res => {
                        if(res.ok) {
                            this.pl_service_status_status.forEach((item)=>{
                                if(item.value == this.studentInfo.serviceStatus) {
                                    this.serviceStatusLabel = item.label
                                }
                            })  
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
                }
            },
            //申请结案
            showModel(type,datas){
                //1 申请结案  2查看密码
                if(type == 1){
                    this.modal1 = true
                }
                if(type == 2){
                    this.$refs.createExamInfoRef.showViewExam = true
                }
            },
            //确认
            ok(type){
                if(type == 1){
                    let obj = {
                        groupId:this.studentInfo.groupId,
                        status:'commit',
                        remarks:''
					}
					aplEndAudit.save(obj).then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.showApplyEnd = false
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
                }
            },
            cancel(){

            },
            open(url){
                if(url){
                    if(url.indexOf('http')==0){
                        window.open(url)
                    } else {
                        window.open("http://" + url)
                    }
                } else {
                    this.$Message.error('暂无地址');
                }
			},
            openHref(url,data){
                if(url == 'apply.addStudent'){
                    this.$router.push({
                        name: url,
                        query: {
                            studentId: data
                        }
                    })  
                } else if(url ==  'apply.addSchool' ){ 
                    this.$router.push({
                        name: url,
                        query: {
                            schoolId: data,
                            'edit':1,
                            'ban':1,
                            usnews:this.studentInfo.usnewsId
                        }
                    })  
                } else if(url ==  'library.graduateProgramInfo'){ 
                    if(data){
                        this.$router.push({
                            name: url,
                            query: {
                                majorId: data
                            }
                        }) 
                    } else {
                        this.$Message.warning('院校库中没有对应数据')
                    }
                } else {
                    const {href} = this.$router.resolve({
                        name: url,
                        query: {
                        }
                    })
                    window.open(href, '_blank')
                }
            },
            goTop(){
                document.getElementsByClassName('content')[0].scrollTop = 0
            }
        },
        filters:{
            fileName(file){
                return file.filePath.split('/').pop();
            },
            showFname(file){
                let ext = file.filePath.split('.').pop();
                return `${file.fileName}.${ext}`;
            }
        },
        watch:{
            $route(){
                location.reload()
            }
        }
    }
</script>