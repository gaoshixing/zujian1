<template>
<div class="contentBox">
    <menubar>
        <span slot="menu" class="slotContent">
            <a href="javascript:void(0)" class="active">{{$t('StudentLists')}}</a>
        </span>
        <span slot="operate" :class="{hide:notRole('7','6','1')}">
            <Button type="primary" icon="ios-plus-outline" @click="addStudent">{{$t('AddStudent')}}</Button>
        </span>
    </menubar>
    <div class="conditionBox">
        <Tabs v-model="tabValue">
            <TabPane :label="label1" name="1"></TabPane>
            <TabPane :label="label2" name="2"></TabPane>
            <TabPane :label="label0" name="0"></TabPane>
        </Tabs>
        <v-select 
            style="width: 396px;margin: 15px 0;"
            placeholder="输入学生姓名"
            :datafunc="datafunc"
            icon="search" 
            v-model="compact"
            k='cnname'
            @on-enter="textChange" 
            @on-click="textChange" 
            @selected="textChange"
            :hasShowSearchArea="hasShowSearchArea"
            :showSearchArea="showSearchArea"
            @changeShowSearchArea="changeShowSearchArea">
        </v-select>
        <div :style="{display: showSearchArea? 'block': 'none'}">
            <case-bar-status
                :tagList='phaseList'
                title="状态"
                @addAcitve='changePhase'>
            </case-bar-status>
            <case-bar-filter 
                rightType='pl_service_group'
                modelName='规划管理'
                :menuId="pid"
                :from="2" 
                @tagListChange="tagListChange">
            </case-bar-filter>
        </div>
        <!-- <div class="clearfix">
            <div class="fl">
                <Input v-model="searchName" placeholder="输入学生中文姓名、中文姓名拼音、英文名搜索"  style="width:400px" icon="search" @on-click="searchNameFuc" @on-enter="searchNameFuc"></Input>
            </div>
        </div> -->
        <!-- <div class="filterList" :class="{hide:notRole('1','9')}">
            <div class="title">{{$t('Commen.americanTeachers')}}：</div>
            <div class="detailBox">
                <div class="clearfix">
                    <span :class="['list',{select:item.select}]" v-for="item in americaTeachers" :key="item.teacherId" @click="filterTeacher(item)">{{item.teacherName +" "+ item.studentCount}}</span>
                </div>
            </div>
        </div>
        <div class="filterList" :class="{hide:notRole('1','7')}">
            <div class="title">{{$t('Commen.chineseTeachers')}}：</div>
            <div class="detailBox">
                <div class="clearfix biglist" :style="{height:chineseTeachers.length>20 && listfold?'30px':''}">
                    <template v-for="item in chineseTeachers">
                        <span :class="['list',{select:item.select}]" :key="item.teacherId" @click="filterTeacher(item)">{{item.teacherName +" "+ item.studentCount}}</span>
                    </template>
                </div>
                <span v-if="chineseTeachers.length>20" :class="{'foldbtn':1,'folded':listfold}" @click="listfold=!listfold">{{listfold?'展开':'收起'}}</span>
            </div>
        </div> -->
        <div class="filterList">
            <div class="title">申请批次：</div>
            <div class="detailBox">
                <div class="clearfix">
                    <span :class="['list',{select:item.select}]" v-for="item in batchList" :key="item.value" @click="filterBatch(item)">{{item.remarks}}</span>
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="tipTitle" :class="{hide:notRole('6','8')}">
        <span class="icon"><Icon type="chatbubble-working"></Icon></span>
        <span>{{$t('StudentListsTips')}}</span>
    </div>
    <div class="headerInfo clearfix">
        <div class="fl">
            <a href="javascript:void(0)" class="filterBtn latest" :class="{active:sortType=='latest'}"  @click="sortDataList('latest')">{{$t('RecentUpdates')}}</a>
            <a href="javascript:void(0)" class="filterBtn unfinished" :class="{active:sortType=='unfinished'}"  @click="sortDataList('unfinished')">{{(inRoleArray('7') || inRoleArray('9'))?$t('Undistributed'):$t('Unfinished')}}</a>
            <a href="javascript:void(0)" class="filterBtn completed" :class="{active:sortType=='completed'}" @click="sortDataList('completed')">{{(inRoleArray('7') || inRoleArray('9'))?$t('Assigned'):$t('Completed')}}</a>
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
    </div> -->
    <div class="studentInfo clearfix">
        <div class="studentList" v-for="(item,index) in studentList" :key="index">
            <div class="name"><span class="en">{{item.pinYin}}</span><span class="cn">（{{item.enName}}/{{item.lastName+item.firstName}}）</span></div>
            <div class="layer">{{item.applyName}}</div>
            <div class="require clearfix">
                <div class="fl">{{$t('Progress')}}</div>
                <div class="fr">{{item.signCount?item.signCount:0}}/{{item.amount+item.freeAmount+item.moneyAmount}}</div>
            </div>
            <Progress :percent="getPercent(item)" hide-info :style="{'max-width':'100%',overflow:'hidden'}"></Progress>
            <div class="related clearfix">
                <div class="fl time">{{item.updateDate | timeFormat}}</div>
                <a class="fr gobtn" v-if="!item.groupId" href="javascript:void(0)">
                    <create-or-edit-group title='新建服务组' :pid="pid" type="create" spanContent="创建服务组" :studentInfo_userId="item.stuId" :studentInfo_stuName="item.lastName + item.firstName" :studentInfo_cellNumber="item.cellNumber" :studentInfo_ecID="item.ecID" :studentInfo_applyTime="item.applyTime" modelName="选校" @afterCreateGroupReload="afterCreateGroupReload">
                    </create-or-edit-group>
                </a>
                <a class="fr gobtn" v-if="item.status =='assigned'" @click="showConfirm(item)">接案</a>
                <a class="fr gobtn" v-if="item.groupId  && item.status !='assigned'" @click="goLink(item)">立即交接</a>
                <a class="fr status" v-if="item.groupId && item.status !='assigned'" href="javascript:void(0)" @click="seeDetailInfo(item.stuId)">{{$t('Details')}}</a>
                <a class="fr editBtn" v-if="item.status !='assigned'" :class="{hide: notRole('7', '6', '1')}" href="javascript:void(0)" @click="editDetailInfo(item.stuId)">{{$t('Edit')}}</a>
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
    <Modal v-model="modal" width=400 title="接案确认" ok-text="确认" @on-ok="ok()" @on-cancel="cancel()">
        <div>
            <p style="text-indent:2em;line-height:30px;">您的主管给您分配了一位新学生<span style="color:#44bcb7;padding:0 5px">{{stuName}}</span>，预计交接时间为{{handoverTimePlan}}，请尽快处理。</p>
        </div>
    </Modal>
</div>
</template>
<script>
import util from '../../libs/js/util.js';
import nozzle from "../../libs/interface.js";
import MenuBar from '../../modules/breadcrumb/menuBar';
import createOrEditGroup from '@public/modules/createOrEditGroup';
import CaseBarFilter from '@public/modules/caseBarFilter';
import vSelect from '@public/modules/vSelect'
import caseBar from '../caseManage/caseBar'
import caseBarStatus from '../caseManage/caseBarStatus'
import {mapMutations,mapState} from 'vuex';
import valid, {
		errors,
        common,
	} from "../../../../spoc-portal/libs/request";
export default {
    props: {
        pid: {
            type: String
        }
    },
    data(){
        return {
            groupId:'',
            stuName:'',
            handoverTimePlan: '',
            modal: false,
            serviceStatus:'',
            tabValue: '1',
            compact: '',
            showSearchArea: true,
            hasShowSearchArea: true,
            phaseList:[{"id":"","name":"不限"},{"id":"1","name":"未接案"},{"id":"2","name":"未交接"},{"id":"3","name":"已交接"}],
            label0: '中学',
            label1: '本科',
            label2: '研究生',
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
    filters:{ //过滤器
        timeFormat:function(dateTime,format){
            var format=format?format:"yyyy-MM-dd";
            dateTime=new Date(dateTime);
            return dateTime.format(format);
        }
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        showConfirm(item){
            this.modal = true
             this.groupId = item.groupId
             this.stuName = item.lastName + item.firstName
             this.handoverTimePlan  = item.handoverTimePlan
        },
        ok(){
            let obj = {
                serviceGroupId: this.groupId,
                phase: this.pid,
                menuId: this.pid
            }
            common.saveConfirm(obj).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.pageConfig.pageNo = 1
                    this.loadStudentInfo()
                }
            })
            .catch(errors.call(this))
            .finally(() => {})
        },
        cancel(){

        },
        changePhase(val){
            this.serviceStatus = val.id
            this.pageConfig.pageNo = 1
            this.loadStudentInfo()
        },
        changeShowSearchArea(obj){
            this.showSearchArea = obj.show
        },
        tagListChange(tags) {
            this.tags = tags
            this.pageConfig.pageNo = 1
            this.loadStudentInfo();
        },
        textChange: function(val) {
            this.pageConfig.pageNo = 1
            this.loadStudentInfo();
        },
        datafunc(word) {
            return new Promise((resolve, reject) => {});
        },

        afterCreateGroupReload(){
            this.pageConfig.pageNo = 1
            this.loadStudentInfo();
        },
        inRoleArray(id){
            return this.roleIds.indexOf(id)>-1;
        },
        notRole(...ids){ // 判断不是这些角色
            return ids.every(id=>{
                return !this.inRoleArray(id);
            });
        },
        getPercent(item){
            const allcount = item.amount+item.freeAmount+item.moneyAmount;
            if(item.signCount && allcount){
                let v = (item.signCount/allcount)*100;
                if(v>100){
                    v = 100;
                }
                return v;
            }
            return 0;
        },
        addStudent(){
            this.$router.push({name:'choiceschool.addStudent'});
        },
        seeDetailInfo(_id){//查看详情
            this.$router.push({name:"choiceschool.choiceDetail",query: {"studentId":_id}})
        },
        editDetailInfo(_id){//编辑学生
            this.$router.push({name:"choiceschool.addStudent",query: {"studentId":_id}});
        },
        filterBatch(item){//过滤申请批次
            this.cancelHover(this.batchList);
            item.select=true;
            this.searchValue.batch=item.value?item.value:"";
            this.pageConfig.pageNo = 1
            this.loadStudentInfo();
        },
        cancelHover(_list){
            for(var i=0;i<_list.length;i++){
                _list[i].select=false;
            }
        },
        onPageSizeChange(pageSize){
            this.pageConfig.pageSize=pageSize;
            this.changePage(this.pageConfig.pageNo);
        },
        changePage(page){//分页
            this.pageConfig.pageNo=page;
            this.loadStudentInfo();
        },
        loadStudentInfo(){//加载学生列表
            let _data = {
                subType: 3,
                apply: this.tabValue,  //学生类别
                serviceStatus: this.serviceStatus,//状态
                pageNo: this.pageConfig.pageNo,
                pageSize: this.pageConfig.pageSize,
                keyword: this.compact,
                batch: this.searchValue.batch, //批次
                searchTags: this.tags, //标签
            }
            var _this=this;
            this.updateLoadingStatus({isLoading:true});
            util.ajax.post(nozzle.xxStudent.list, _data, {json:true}).then(function(res){
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
        },
        goLink(item){
            const query = {studentId:item.stuId,groupId:item.groupId,phase:'choiceschool'};
            this.$router.push({name:'choiceschool.connectedit',query});
        }
    },
    components: {
        'menubar':MenuBar,
        createOrEditGroup,
        CaseBarFilter,
        vSelect,
        caseBar,
        caseBarStatus,
    },
    computed:{
        ...mapState(['userInfo']),
        roleIds(){
            return this.userInfo.roleId.split(',');
        }
    },
    watch:{
        tabValue (newValue, oldValue) {
            this.pageConfig.pageNo = 1
            this.loadStudentInfo()
        },
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
        
        this.loadStudentInfo();
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
.contentBox{
    padding-bottom: 120px;
}
.tipTitle{
    margin:15px 0px;
    height: 40px;
    line-height: 35px;
    border: 1px solid #e0e0e0;
    background: #fafafa;
    border-left: 5px solid #44bcb7;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    padding-left: 15px;
    color: #666666;
    .icon{
        color: #44bcb7;
        font-size: 20px;
        margin-right: 3px;
        position: relative;
        top: 2px;
    }
}
.conditionBox{
    margin:10px 0px;
    .filterList{
        margin: 10px 0px;
        position: relative;
        .title{
            width: 100px;
            text-align: left;
            position:absolute;
            left:0px;
            top: 0px;
            color:#b8b8b8;
        }
        .detailBox{
            min-height: 30px;
            padding:0px 10px 0px 78px;
            position: relative;
            .biglist{
                overflow: hidden;
            }
            .list{
                display: block;
                float: left;
                height: 20px;
                line-height: 20px;
                padding: 0px 10px;
                margin:0px 10px 10px 0px; 
                cursor: pointer;
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
    .statistics{
        display: block;
        float: left;
        color: #6c6c6c;
        font-size: 12px;
        padding: 0px 20px;
        border-left: 1px solid #e0e0e0;
        em{
            font-style: normal;
            color: #44bcb7;
        }
    }
}
.studentList{
    float: left;
    width: 32%;
    padding: 10px 20px;
    margin:20px 30px 0px 0px;
    margin-right: 2%;
    border: 1px solid #e0e0e0;
    border-radius: 3px;
    transition: all ease-in 200ms;
    .name{
        font-size: 18px;
        color: #44bcb7;
        line-height: 30px;
        overflow: hidden;
        .en{
            float: left;
            max-width: 140px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .cn{
            float: left;
            max-width: 140px;
            font-size: 14px;
            color: #0c0c0c;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
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
    .require{
        font-size: 12px;
        color: #6c6c6c;
        margin-top: 8px;
    }
    .ivu-progress{
        position: relative;
        top: -5px;
    }
    .related{
        height: 25px;
        line-height: 25px;
        .time{
            font-size: 12px;
            color: #6d6d6d;
        }
        .status{
            font-size: 12px;
            color: #010101;
            &:hover{
                color: #44bcb7;
                text-decoration: underline;
            }
        }
        .editBtn,.gobtn{
            font-size: 12px;
            color: #010101;
            margin-right: 5px;
            &:hover{
                color: #44bcb7;
                text-decoration: underline;
            }
        }
        .gobtn{
            margin-left: 5px;
        }
    }
    &:hover{
        border-color: #44bcb7;
    }
    &:nth-child(3n){
        margin-right: 0px;
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
