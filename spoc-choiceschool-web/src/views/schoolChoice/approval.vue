<template>
<div class="contentBox">
    <menubar>
        <span slot="menu" class="slotContent">
            <a href="javascript:void(0)" class="active">{{$t('ApprovalTitle')}}</a>
        </span>
        <!--span slot="operate" :class="{hide:userInfo.roleId!=='1' && userInfo.roleId!=='7'}">
            <Button type="primary" icon="ios-plus-outline" @click="addStudent">{{$t('AddStudent')}}</Button>
        </span-->
    </menubar>
    <div class="conditionBox">
        <div class="clearfix">
            <div class="fl">
                <Input v-model="searchName" placeholder="输入学生中文姓名、中文姓名拼音、英文名搜索" style="width:400px" icon="search" @on-click="searchNameFuc" @on-enter="searchNameFuc"></Input>
            </div>
        </div>
        <div class="filterList" :class="{hide:inRoleArray('7')}">
            <div class="title">{{$t('Commen.americanTeachers')}}：</div>
            <div class="detailBox">
                <div class="clearfix">
                    <span :class="['list',{select:item.select}]" v-for="item in americaTeachers" :key="item.teacherId" @click="filterTeacher(item)">{{item.teacherName +" "+ item.studentCount}}</span>
                </div>
            </div>
        </div>
        <div class="filterList" :class="{hide:inRoleArray('9')}">
            <div class="title">{{$t('Commen.chineseTeachers')}}：</div>
            <div class="detailBox">
                <div class="clearfix biglist" :style="{height:chineseTeachers.length>20 && listfold?'30px':''}">
                    <template v-for="item in chineseTeachers">
                        <span :class="['list',{select:item.select}]" :key="item.teacherId" @click="filterTeacher(item)">{{item.teacherName +" "+ item.studentCount}}</span>
                    </template>
                </div>
                <span v-if="chineseTeachers.length>20" :class="{'foldbtn':1,'folded':listfold}" @click="listfold=!listfold">{{listfold?'展开':'收起'}}</span>
            </div>
        </div>
        <div class="filterList">
            <div class="title">{{$t('Commen.state')}}：</div>
            <div class="detailBox">
                <div class="clearfix">
                    <span :class="['list',{select:item.select}]" v-for="item in batchList" :key="item.value" @click="filterBatch(item)">{{item.remarks}}</span>
                </div>
            </div>
        </div>
    </div>
    <div class="headerInfo clearfix">
        <div class="fl">
            <a href="javascript:void(0)" class="filterBtn latest" :class="{active:sortType=='latest'}"  @click="sortDataList('latest')">{{$t('RecentUpdates')}}</a>
            <a href="javascript:void(0)" class="filterBtn unfinished" :class="{active:sortType=='unfinished'}"  @click="sortDataList('unfinished')">{{$t('Unfinished')}}</a>
            <a href="javascript:void(0)" class="filterBtn completed" :class="{active:sortType=='completed'}"  @click="sortDataList('completed')">{{$t('Completed')}}</a>
        </div>
        <div class="fr">
            <div class="timeBox startTime">
                <Date-picker
                    :open="startTimeOpen"
                    :value="startTime"
                    type="date"
                    placement="bottom-end"
                    @on-change="handleStartTime">
                    <span @click="handleStartClick">
                        <Icon type="android-calendar"></Icon>
                        <template v-if="startTime === ''">{{$t('StartTime')}}</template>
                        <template v-else>{{ startTime }}</template>
                    </span>
                </Date-picker>
            </div>
            <div class="timeBox endTime">
                <Date-picker
                    :open="endTimeOpen"
                    :value="endTime"
                    type="date"
                    placement="bottom-end"
                    @on-change="handleEndTime">
                    <span @click="handleEndClick">
                        <Icon type="android-calendar"></Icon>
                        <template v-if="endTime === ''">{{$t('EndTime')}}</template>
                        <template v-else>{{ endTime }}</template>
                    </span>
                </Date-picker>
            </div>
        </div>
    </div>
    <div class="studentInfo">
        <div class="studentList" v-for="(item,index) in studentList" :key="index" @click="seeDetailInfo(item.id)">
            <div class="basicInfo">
                <div class="name"><span class="en">{{item.pinYin}}</span><span class="cn"> （{{item.enName}}/{{item.lastName+item.firstName}}）</span></div>
                <div class="layer">{{item.applyName}}</div>
            </div>
            <div class="progressInfo">
                <div class="chineseBox clearfix"  v-if="inRoleArray('1')" >
                    <div class="infoList">
                        <div class="iconType"><Icon type="ios-bookmarks"></Icon></div>
                        <div class="descripe">
                            <div>{{$t('ReceiveApplication')}}</div>
                            <span :class="['num',{weight:item.amount+item.freeAmount+item.moneyAmount}]">{{item.amount+item.freeAmount+item.moneyAmount}}</span>个
                        </div>
                    </div>
                    <div class="infoList">
                        <div class="iconType"><Icon type="university"></Icon></div>
                        <div class="descripe">
                            <div>{{$t('UsChooseSchooling')}}</div>
                            <span :class="['num',{weight:item.americaCount}]">{{item.americaCount}}</span>个
                        </div>
                    </div>
                    <div class="infoList">
                        <div class="iconType"><Icon type="android-globe"></Icon></div>
                        <div class="descripe">
                            <div>{{$t('UsConfirmationing')}}</div>
                            <span :class="['num',{weight:item.americaAuditCount}]">{{item.americaAuditCount}}</span>个
                        </div>
                    </div>
                    <div class="infoList">
                        <div class="iconType"><Icon type="android-globe"></Icon></div>
                        <div class="descripe">
                            <div>{{$t('ChinaChooseSchooling')}}</div>
                            <span :class="['num',{weight:(item.chinaCount || item.negotiationCount || item.removeCount)}]">{{item.chinaCount + item.negotiationCount + item.removeCount}}</span>个
                        </div>
                    </div>
                    <div class="infoList">
                        <div class="iconType"><Icon type="earth"></Icon></div>
                        <div class="descripe">
                            <div>{{$t('ChinaConfirmationing')}}</div>
                            <span :class="['num',{weight:item.chinaAuditCount}]">{{item.chinaAuditCount}}</span>个
                        </div>
                    </div>
                    <div class="infoList">
                        <div class="iconType"><Icon type="android-people"></Icon></div>
                        <div class="descripe">
                            <div>{{$t('HasSigned')}}</div>
                            <span :class="['num',{weight:item.signCount}]">{{item.signCount}}</span>个
                        </div>
                    </div>
                </div>
                <div class="chineseLeader clearfix" v-if="inRoleArray('7')" >
                    <div class="infoList">
                        <div class="iconType"><Icon type="ios-bookmarks"></Icon></div>
                        <div class="descripe">
                            <div>{{$t('ReceiveApplication')}}</div>
                            <span :class="['num',{weight:item.amount+item.freeAmount+item.moneyAmount}]">{{item.amount+item.freeAmount+item.moneyAmount}}</span>个
                        </div>
                    </div>
                    <div class="infoList">
                        <div class="iconType"><Icon type="android-globe"></Icon></div>
                        <div class="descripe">
                            <div>{{$t('UsConfirmation')}}</div>
                            <span :class="['num',{weight:item.schoolAmericaPassTotal}]">{{item.schoolAmericaPassTotal}}</span>个
                        </div>
                    </div>
                    <div class="infoList">
                        <div class="iconType"><Icon type="android-globe"></Icon></div>
                        <div class="descripe">
                            <div>{{$t('ChinaChooseSchooling')}}</div>
                            <span :class="['num',{weight:(item.chinaCount || item.negotiationCount || item.removeCount)}]">{{item.chinaCount + item.negotiationCount + item.removeCount}}</span>个
                        </div>
                    </div>
                    <div class="infoList">
                        <div class="iconType"><Icon type="earth"></Icon></div>
                        <div class="descripe">
                            <div>{{$t('PendingApproval')}}</div>
                            <span :class="['num',{weight:item.chinaAuditCount}]">{{item.chinaAuditCount}}</span>个
                        </div>
                    </div>
                    <div class="infoList">
                        <div class="iconType"><Icon type="android-people"></Icon></div>
                        <div class="descripe">
                            <div>{{$t('ParentAudit')}}</div>
                            <span :class="['num',{weight:item.parentAuditCount}]">{{item.parentAuditCount}}</span>个
                        </div>
                    </div>
                    <div class="infoList">
                        <div class="iconType"><Icon type="android-people"></Icon></div>
                        <div class="descripe">
                            <div>{{$t('HasSigned')}}</div>
                            <span :class="['num',{weight:item.signCount}]">{{item.signCount}}</span>个
                        </div>
                    </div>
                </div>
                <div class="usaBox clearfix" v-if="inRoleArray('9')" >
                    <div class="infoList">
                        <div class="iconType"><Icon type="ios-bookmarks"></Icon></div>
                        <div class="descripe">
                            <div>{{$t('ReceiveApplication')}}</div>
                            <span :class="['num',{weight:item.amount+item.freeAmount+item.moneyAmount}]">{{item.amount+item.freeAmount+item.moneyAmount}}</span>个
                        </div>
                    </div>
                    <div class="infoList">
                        <div class="iconType"><Icon type="university"></Icon></div>
                        <div class="descripe">
                            <div>{{$t('ChooseSchool')}}</div>
                            <span :class="['num',{weight:item.americaCount}]">{{item.americaCount}}</span>个
                        </div>
                    </div>
                    <div class="infoList">
                        <div class="iconType"><Icon type="university"></Icon></div>
                        <div class="descripe">
                            <div>{{$t('PendingApproval')}}</div>
                            <span :class="['num',{weight:item.americaAuditCount}]">{{item.americaAuditCount}}</span>个
                        </div>
                    </div>
                    <div class="infoList">
                        <div class="iconType"><Icon type="earth"></Icon></div>
                        <div class="descripe">
                            <div>{{$t('FeedbackToChinese')}}</div>
                            <span :class="['num',{weight:item.schoolAmericaPassTotal}]">{{item.schoolAmericaPassTotal}}</span>个
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="noneData" v-show="studentList.length=='0'">
            <span>{{$t('NotStudentData')}}</span>
        </div>
    </div>
    <div class="webPage" :class="{hide:!studentList.length}">
        <Page show-total
          show-elevator
          show-sizer
          :total="pageConfig.totalCount"
          :pageSize="pageConfig.pageSize"
          :current="pageConfig.pageNo"
          :placement ="pageConfig.placement"
          @on-page-size-change="onPageSizeChange"
          @on-change="changePage">
        </Page>
    </div>
</div>
</template>
<script>
import util from '../../libs/js/util.js';
import nozzle from "../../libs/interface.js";
import MenuBar from '../../modules/breadcrumb/menuBar';
import {mapMutations,mapState} from 'vuex';

export default {
    data(){
        return {
            //roleId:"",
            sortType:"latest",
            startTime:"",
            startTimeOpen:false,
            endTime:"",
            endTimeOpen:false,
            americaTeachers:[],//美方教师
            chineseTeachers:[],//中方教师
            batchList:[],//申请批次
            searchName:"",
            searchValue:{
                keyword:"",
                teacherId:"",
                batch:"",
                status:""
            },
            studentList:[],
            pageConfig:{
                pageNo: 1,
                pageSize:20,
                placement: 'bottom',
                totalCount: 0
            },
            listfold:true
        }
    },
    filters:{//过滤器
        timeFormat:function(dateTime,format){
            var format=format?format:"yyyy-MM-dd";
            if(!isNaN(dateTime))dateTime=new Date(dateTime);
            var o = {
        		"M+" : dateTime.getMonth()+1, //month
        		"d+" : dateTime.getDate(),    //day
        		"h+" : dateTime.getHours(),   //hour
        		"m+" : dateTime.getMinutes(), //minute
        		"s+" : dateTime.getSeconds(), //second
        		"q+" : Math.floor((dateTime.getMonth()+3)/3),  //quarter
        		"S" : dateTime.getMilliseconds() //millisecond
        	};
        	if(/(y+)/.test(format)){format=format.replace(RegExp.$1,(dateTime.getFullYear()+"").substr(4- RegExp.$1.length));}
        	for (var k in o) {
        		if (new RegExp("(" + k + ")").test(format)) {
        			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        		}
        	}
        	return format;
        }
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        inRoleArray(id){
            return this.roleIds.indexOf(id)>-1;
        },
        addStudent(){//添加学生
            this.$router.push({name:'choiceschool.addStudent'});
        },
        seeDetailInfo(_id){//查看详情
            this.$router.push({name:"choiceschool.choiceDetail",query: {"studentId":_id}})
        },
        searchNameFuc(){//搜索
            this.searchValue.keyword=this.searchName;
            this.loadStudentInfo({
                pageNo:this.pageConfig.pageNo,
                pageSize:20,
                keyword:this.searchValue.keyword,
                teacherId:this.searchValue.teacherId,
                batch:this.searchValue.batch,
                status:this.searchValue.status,
                beginDate:this.startTime,
                endDate:this.endTime 
            });
        },
        sortDataList(_type){//加载条件：全部，已完成，未完成
            this.sortType=_type;
            if(_type=="latest"){//全部
                this.searchValue.status="";
            }else if(_type=="unfinished"){//未分配、未完成
                if(this.inRoleArray('9')){
                    this.searchValue.status=2;//美方未完成
                }else{
                    this.searchValue.status=4;//中方未完成
                }
            }else if(_type=="completed"){
                if(this.inRoleArray('9')){
                    this.searchValue.status=3;//美方已完成
                }else{
                    this.searchValue.status=5;//中方已完成
                }
            }
            this.loadStudentInfo({
                pageNo:this.pageConfig.pageNo,
                pageSize:20,
                keyword:this.searchValue.keyword,
                teacherId:this.searchValue.teacherId,
                batch:this.searchValue.batch,
                status:this.searchValue.status,
                beginDate:this.startTime,
                endDate:this.endTime 
            });
        },
        handleStartClick(){//开始时间点击
            this.startTimeOpen = !this.startTimeOpen;
        },
        handleEndClick(){//结束时间点击
            this.endTimeOpen = !this.endTimeOpen;
        },
        handleStartTime(date){//确定选择开始时间
            this.startTime = date;
            this.startTimeOpen = false;
            this.loadStudentInfo({
                pageNo:this.pageConfig.pageNo,
                pageSize:20,
                keyword:this.searchValue.keyword,
                teacherId:this.searchValue.teacherId,
                batch:this.searchValue.batch,
                status:this.searchValue.status,
                beginDate:this.startTime,
                endDate:this.endTime 
            });
        },
        handleEndTime(date){//确定选择结束时间
            this.endTime = date;
            this.endTimeOpen = false;
            this.loadStudentInfo({
                pageNo:this.pageConfig.pageNo,
                pageSize:20,
                keyword:this.searchValue.keyword,
                teacherId:this.searchValue.teacherId,
                batch:this.searchValue.batch,
                status:this.searchValue.status,
                beginDate:this.startTime,
                endDate:this.endTime 
            });
        },
        filterTeacher(item){//过滤教师
            this.cancelHover(this.americaTeachers);
            this.cancelHover(this.chineseTeachers);
            item.select=true;
            this.searchValue.teacherId=item.teacherId?item.teacherId:"";
            this.loadStudentInfo({
                pageNo:this.pageConfig.pageNo,
                pageSize:20,
                keyword:this.searchValue.keyword,
                teacherId:this.searchValue.teacherId,
                batch:this.searchValue.batch,
                status:this.searchValue.status,
                beginDate:this.startTime,
                endDate:this.endTime 
            });
        },
        filterBatch(item){//过滤申请批次
            this.cancelHover(this.batchList);
            item.select=true;
            this.searchValue.batch=item.value?item.value:"";
            this.loadStudentInfo({
                pageNo:this.pageConfig.pageNo,
                pageSize:20,
                keyword:this.searchValue.keyword,
                teacherId:this.searchValue.teacherId,
                batch:this.searchValue.batch,
                status:this.searchValue.status,
                beginDate:this.startTime,
                endDate:this.endTime 
            });
        },
        cancelHover(_list){
            for(var i=0;i<_list.length;i++){
                _list[i].select=false;
            }
        },
        changePage(page){//分页
            this.pageConfig.pageNo=page;
            this.loadStudentInfo({
                pageNo:this.pageConfig.pageNo,
                pageSize:this.pageConfig.pageSize,
                keyword:this.searchValue.keyword,
                teacherId:this.searchValue.teacherId,
                batch:this.searchValue.batch,
                status:this.searchValue.status,
                beginDate:this.startTime,
                endDate:this.endTime 
            });
        },
        onPageSizeChange(pageSize){
            this.pageConfig.pageSize = pageSize;
            this.changePage(1);
        },
        loadStudentInfo(_data){//加载学生列表
            var _this=this;
            this.updateLoadingStatus({isLoading:true});
            util.ajax.get(nozzle.xxStudent.listAudit,{params:_data}).then(function(res){
                util.checkAjaxJson(res).thenSuccess(function(json){
                    _this.studentList=json.data.list;
                    _this.pageConfig.totalCount = json.data.count;
                    _this.pageConfig.pageNo = json.data.pageNo;
                }).autoRun("login","error");
                _this.updateLoadingStatus({isLoading:false});
            }).catch(function(error) {
                _this.updateLoadingStatus({isLoading:false});
                util.checkAjaxError(error);
            });
        },
        getDifficultyList(_data,_callback){//申请难度、申请批次
          var _this=this;
          this.updateLoadingStatus({isLoading:true});
          util.ajax.get(nozzle.basicData.dictListData,{params:_data}).then(function(res){
            util.checkAjaxJson(res).thenSuccess(function(json){
                if(typeof(_callback)=="function"){
                    _callback(json.data);
                }
            }).autoRun("login","error");
            _this.updateLoadingStatus({isLoading:false});
          }).catch(function(error) {
              _this.updateLoadingStatus({isLoading:false});
              util.checkAjaxError(error);
          });
        },
        getTeacherList(_url,_callback){//获取教师列表
            var _this=this;
            this.updateLoadingStatus({isLoading:true});
            util.ajax.get(_url).then(function(res){
              util.checkAjaxJson(res).thenSuccess(function(json){
                  if(typeof(_callback)=="function"){
                      _callback(json.data);
                  }
              }).autoRun("login","error");
              _this.updateLoadingStatus({isLoading:false});
            }).catch(function(error) {
                _this.updateLoadingStatus({isLoading:false});
                util.checkAjaxError(error);
            });
        },
        processRole(){
            if(this.inRoleArray('1')){
                this.getTeacherList(nozzle.xxStudent.listAllTeachers,(data)=>{
                    this.americaTeachers.push({
                        teacherId:"",
                        teacherName:this.$t("Commen.all"),
                        studentCount:"",
                        select:true,
                    });
                    data.americaTeachers.forEach((item)=>{
                        item.select=false;
                        this.americaTeachers.push(item);
                    });
                    this.chineseTeachers.push({
                        teacherId:"",
                        teacherName:this.$t("Commen.all"),
                        studentCount:"",
                        select:true,
                    });
                    data.chineseTeachers.forEach((item)=>{
                        item.select=false;
                        this.chineseTeachers.push(item);
                    });
                });//获取教师列表
            }else if(this.inRoleArray('7') || this.inRoleArray('9')){
                this.getTeacherList(nozzle.xxStudent.listTeachers,(data)=>{
                    if(this.inRoleArray('7')){
                        this.chineseTeachers.push({
                            teacherId:"",
                            teacherName:this.$t("Commen.all"),
                            studentCount:"",
                            select:true,
                        });
                        data.teachers.forEach((item)=>{
                            item.select=false;
                            this.chineseTeachers.push(item);
                        });
                    }else{
                        this.americaTeachers.push({
                            teacherId:"",
                            teacherName:this.$t("Commen.all"),
                            studentCount:"",
                            select:true,
                        });
                        data.teachers.forEach((item)=>{
                            item.select=false;
                            this.americaTeachers.push(item);
                        });
                    }
                });//获取教师列表
            }
        }
    },
    components: {
      'menubar':MenuBar
    },  
    computed:{
        ...mapState(['userInfo']),
        roleIds(){
            return this.userInfo.roleId.split(',');
        }
    },
    watch:{
        "userInfo.roleId"(roleId) {
            this.userInfo.roleId = roleId;
            this.processRole();
        }
    },
    mounted() {
        this.processRole();
        //获取申请批次
        this.getDifficultyList({type:"xx_choice_school_batch"},(data)=>{
            this.batchList.push({
                value:"",
                remarks:this.$t("Commen.all"),
                select:true,
            });
            data.forEach((item)=>{
                item.select=false;
                this.batchList.push(item);
            });
        });
        this.loadStudentInfo({
            pageNo:1,
            pageSize:20
        });
    }
}    
</script>
<style scoped lang="less">
.foldbtn{
    color: #44bcb7;
    cursor: pointer;
    position: absolute;
    right: 0;
    bottom: 10px;
    &.folded{
        bottom: '';
        top: 0;
    }
}
.conditionBox{
    margin:20px 0px 10px;
    .filterList{
        margin: 10px 0px;
        position: relative;
        .title{
            width: 100px;
            text-align: left;
            position:absolute;
            left:0px;
            top: 0px;
        }
        .detailBox{
            padding:0px 10px 0px 100px;
            min-height: 30px;
            position: relative;
            .biglist{
                overflow: hidden;
            }
            .list{
                display: block;
                cursor: pointer;
                float: left;
                height: 20px;
                line-height: 20px;
                padding: 0px 10px;
                margin:0px 10px 10px 0px; 
            }
            .select{
                font-size: 12px;
                color: #fff;
                background-color: #44bcb7;
            }
        }
    }
}
.headerInfo{
    height: 35px;
    line-height: 34px;
    border: 1px solid #e0e0e0;
    .filterBtn{
        display: block;
        float: left;
        color: #6c6c6c;
        font-size: 12px;
        padding: 0px 20px;
        border-right: 1px solid #e0e0e0;
        background-repeat: no-repeat;
        padding-left: 40px;
        background-position: 10px 1px;
    }
    .filterBtn.active{
        color: #fff!important;
        background-color: #44bcb7;
        background-position: 10px -29px;
    }
    .latest{
        background-image: url("../../assets/images/studentList/icon_latest.png");
    }
    .unfinished{
        background-image: url("../../assets/images/studentList/icon_nocomplete.png");
    }
    .completed{
        background-image: url("../../assets/images/studentList/icon_completeed.png");
    }
    .timeBox{
        display: block;
        float: left;
        cursor: pointer;
        font-size: 12px;
        color: #6c6c6c;
        padding: 0px 20px;
        border-left: 1px solid #e0e0e0;
        .ivu-icon{
            font-size: 16px;
            margin-right: 5px;
            position: relative;
            top: 2px;
        }
    }
}
.studentList{
    overflow: hidden;
    position: relative;
    padding: 15px 20px;
    border-bottom:1px solid #e0e0e0;
    transition: all ease 300ms;
    cursor: pointer;
    .basicInfo{
        position: absolute;
        left:20px;
        top: 10px;
        .name{
            font-size: 18px;
            color: #44bcb7;
            line-height: 30px;
            overflow: hidden;
            .en{
                max-width: 100px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                float: left;
            }
            .cn{
                font-size: 14px;
                color: #0c0c0c;
                max-width: 105px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                float: left;
            }
        }
        .layer{
            font-size: 12px;
            color: #6d6d6d;
            background: #f2f2f2;
            border: 1px solid #e5e5e5;
            display: initial;
            padding: 2px 7px;
        }
    }
    .progressInfo{
        min-height: 52px;
        padding-left: 200px;
        position: relative;
        .infoList{
            float: left;
            width: 20%;
            text-align: center;
            .iconType{
                width:50px;
                height: 50px;
                float: left;
                margin:0px auto;
                border: 1px solid #E0E1E2;
                border-radius: 100%;
                overflow: hidden;
                background-repeat: no-repeat;
                background-position: center;
                position: relative;
                text-align: center;
                line-height: 50px;
                font-size: 20px;
                color: #aaa;
                &:hover{
                    border-color: #44bcb7;
                    background: #44bcb7;
                    color: #fff;
                }
            }
            .apply{
                background-image: url("../../assets/images/studentList/icon_service.png");
            }
            .xuanxiao{
                background-image: url("../../assets/images/studentList/icon_choice.png");
            }
            .meifang{
                background-image: url("../../assets/images/studentList/icon_meiguo.png");
            }
            .zhongfang{
                background-image: url("../../assets/images/studentList/icon_zhongguo.png");
            }
            .jiazhang{
                background-image: url("../../assets/images/studentList/icon_parent.png");
            }
            .descripe{
                float: left;
                text-align: left;
                margin-left: 10px;
                line-height: 28px;
                font-size: 12px;
                .num{
                    font-size: 12px;
                    font-style: italic;
                    margin-right: 5px;
                    &.weight{
                        font-weight: bold;
                        color: #44bcb7;
                        font-size: 16px;
                    }
                }
            }
        }
        .chineseBox .infoList{
            width: 16.6%;
        }
        .chineseLeader .infoList{
            width: 16.6%;
        }
        .usaBox .infoList{
            width: 25%;
        }
    }
    .operateBox{
        position: absolute;
        opacity: 0;
        top: 0;
        left:0;
        right:0;
        height: 100%;
        z-index: 1;
        text-align: center;
        background: rgba(0,0,0,.05);
        transition: all ease 300ms;
        display: none;
    }
    .seeButton{
        position: absolute;
        opacity: 0;
        width: 200px;
        height: 40px;
        line-height: 1;
        top: 50%;
        left: 50%;
        z-index: 2;
        margin-left: -100px;
        margin-top: -20px;
        font-size: 16px;
        transition: all ease 300ms;
        transform: scale(1.2,1.2);
        display: none;
    }
    &:hover{
        background-color: #f7f7f7;
        .operateBox{
            top: 0;
            opacity: 1;
        }
        .seeButton{
            opacity: 1;
            transform: scale(1,1);
        }
    }
}
.noneData{
    text-align: center;
    background:url("../../assets/images/public/noData.png");
    padding-bottom: 80px;
    padding-top: 180px;
    color: #aaaaaa;
    background-repeat: no-repeat;
    background-position: center 60px;
    border-bottom: 1px solid #e0e1e2;
}
.webPage{
    margin-top: 20px;
    text-align:center;
}

</style>

<style lang="less">
@media screen and (max-width:1366px){
    .studentList .progressInfo .clearfix .infoList{
       .iconType{
           float:none;
       }
       .descripe{
           float:none;
           text-align: center;
           margin-left: 0;
       }
    }
}
</style>