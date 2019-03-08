<style lang="less">
  #mytable {
        .ivu-table-wrapper {
            border: none;
            
        }
        .ivu-table th {
            background: #fff;
        }
        .ivu-table:after {
            display: none;
        }
    }
.contentBox{
    padding-bottom: 120px;
    .case-manage-timePicker1 {
        margin-top: 6px;
        margin-bottom: 6px;
        .tagTitle{
            display: inline-block;
            margin-right: 15px;
            width: 60px;
            text-align: center;
            color: #b8b8b8;
        }
        .case-manage-line-div {
            display: inline-block;
            width: 10px;
            height: 2px;
            background-color: #44bcb7
        }
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
.webPage{
    margin-top: 20px;
    text-align:center;
}
</style>
<template>
<div class="contentBox">
    <menubar>
        <span slot="menu" class="slotContent">
            <a href="javascript:void(0)" class="active">{{$t('CaseManagement')}}</a>
        </span>
        <span slot="operate" :class="{hide:notRole('7','6','1')}">
            <Button type="primary" icon="ios-plus-outline" @click="addStudent">{{$t('AddStudent')}}</Button>
        </span>
    </menubar>
    <div class="conditionBox">
       <Tabs v-model="serviceStatus" @on-click="changeServiceStatus">
        <TabPane label="最近更新" name="0"></TabPane>
        <TabPane label="未接案" name="1"></TabPane>
        <TabPane label="选校中" name="4"></TabPane>
        <TabPane label="已结案" name="5"></TabPane> 
        </Tabs>
        <v-select 
            style="width: 396px;margin: 15px 0;"
            placeholder="输入学生姓名"
            icon="search" 
            :datafunc="datafunc"
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
            <div v-show="serviceStatus!=0">
                <case-bar
                    :tagList ='companyList'
                    title="分公司"
                    typeKind='controlled'
                    v-if="showCompanyTags"
                    @addAcitveCon='addAcitveCon'
                    :num="numCompany">
                </case-bar>
                <case-bar
                    :tagList ='groupList'
                    title="选校组"
                    typeKind='group'
                    v-if="showGroupTags"
                    :num="numGroup"
                    @addAcitveGroup='addAcitveGroup'>
                </case-bar>
                <case-bar
                    :tagList ='peopleList'
                    title="选校顾问"
                    typeKind='man'
                    :num="numTeacher"
                    @addAcitve='addAcitve'>
                </case-bar>
            </div>
            <case-bar-status
                :tagList='phaseList'
                title="申请阶段"
                @addAcitve='changeTab'>
            </case-bar-status>
            <case-bar-filter
                rightType='pl_service_group'
                modelName='选校管理'
                :menuId="pid"
                :from="2" 
                @tagListChange="tagListChange"
            ></case-bar-filter>
            <div class="case-manage-timePicker1">
                <div class="tagTitle">
                    <span>申请年份：</span>
                </div>
                <DatePicker type="year" placeholder="开始年份"  style="width: 120px" @on-change="beginYearChange"></DatePicker>
                <div class="case-manage-line-div"></div>
                <DatePicker type="year" placeholder="结束年份"  style="width: 120px" @on-change="endYearChange"></DatePicker>
            </div>
         <!--    <case-bar-date
                :tagList='dateChooseList'
                title="接案时间"
                beginPlaceholder="接案开始时间"
                endPlaceholder="接案结束时间"
                @beginDateChange="beginDateChange"
                @endDateChange="endDateChange">
            </case-bar-date> -->
            <case-bar-status v-show="serviceStatus == 0"
                :tagList='subTypeList'
                title="状态"
                @addAcitve='changeSubType'>
            </case-bar-status>
            <div class="filterList">
                <div class="title">申请批次：</div>
                <div class="detailBox">
                    <div class="clearfix">
                        <span :class="['list',{select:item.select}]" v-for="item in batchList" :key="item.value" @click="filterBatch(item)">{{item.remarks}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div id="mytable">
            <Table :data="studentList" :columns="tableColumns">
            </Table>
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
    <Modal v-model="modal2"  width=728 title="查看">
        <div>
            <Form :label-width="180">
                <Form-item label="交接表：" v-if="historyArray.length">
                    <div style="overflow:hidden" v-for="(item,index) in historyArray" :key="item.id">
                        <div style="float:left;width:90px;">{{item.name}}</div>
                        <div style="float:left;width:100px;">
                            <a @click="toViewConnect(item.id)" style="margin-left: 10px;" href="#">查看交接详情</a>
                        </div>
                    </div>
                </Form-item>
                <div v-for="(item, index) in resultArray" :key="item.phase">
                   <!--  <Form-item v-if="item.phase == menuIds.PLAN" prop="planTime" label="规划交接后期时间：">
                        <DatePicker disabled  readonly  type="datetime" placeholder="选择时间" :value="item.handoverTimePlan"  style="width: 180px"></DatePicker>
                    </Form-item> -->
                    <Form-item v-if="item.phase == menuIds.CHOICESCHOOL" label="选校完成时间：">
                        <DatePicker disabled  readonly  type="datetime" placeholder="选择时间" v-model="connect.planTime" style="width: 180px"></DatePicker>
                    </Form-item>
                </div>
               <!--  <Form-item label="(预计)结案时间：">
                    <DatePicker disabled readonly type="datetime" placeholder="选择时间" :value="planEndTime" style="width: 180px"></DatePicker>
                </Form-item> -->
                <Form-item label="分配选校老师：" prop="chooseTeacher">
                    <div>{{teaName}}</div>
                </Form-item>
            </Form>
        </div>
        <div slot="footer">
            <Button type="primary" @click="ok(2)">确定</Button>
        </div>
    </Modal>
    <Modal v-model="modal3" :loading="modalLoading" width=728 title="分配" @on-ok="ok(3)" @on-cancel="cancel(3)">
        <div>
            <Form ref="basicStepForm3" :rules="basicFormValidate3" :model="connect" :label-width="180">
                <Form-item label="交接表：" v-if="historyArray.length">
                    <div style="overflow:hidden" v-for="(item,index) in historyArray" :key="item.id">
                        <div style="float:left;width:90px;">{{item.name}}</div>
                        <div style="float:left;width:100px;">
                            <a @click="toViewConnect(item.id)" style="margin-left: 10px;" href="#">查看交接详情</a>
                        </div>
                    </div>
                </Form-item>
                <div v-for="(item, index) in resultArray" :key="item.phase">
                   <!--  <Form-item v-if="item.phase ==  menuIds.PLAN" label="规划交接后期时间：">
                        <DatePicker disabled readonly type="datetime" placeholder="选择时间" :value="item.handoverTimePlan"  style="width: 180px"></DatePicker>
                    </Form-item> -->
                    <Form-item v-if="item.phase == menuIds.CHOICESCHOOL" label="选校完成时间：">
                        <DatePicker type="datetime" placeholder="选择时间" v-model="connect.planTime"  style="width: 180px"></DatePicker>
                    </Form-item>
                </div>
                <!-- <Form-item label="(预计)结案时间：">
                    <DatePicker disabled readonly type="datetime" placeholder="选择时间" :value="planEndTime" style="width: 180px"></DatePicker>
                </Form-item> -->
                <Form-item label="分配选校老师：" prop="chooseTeacher">
                    <RadioGroup v-model="connect.chooseTeacher">
                        <Radio v-if="item.activeUser" v-for="(item,index) in teacherArray" :label="item.userId" :key="item.userId">{{item.name}}</Radio>
                        <Radio v-if="!item.activeUser" v-for="(item,index) in teacherArray" :label="item.userId" :key="item.userId">{{item.name}}</Radio>
                    </RadioGroup>
                </Form-item>
            </Form>
        </div>
    </Modal>
    <Modal v-model="modal1" width=400 title="接案驳回" ok-text="确认" @on-ok="ok(1)" @on-cancel="cancel()">
        <div>
            <p style="text-indent:2em;line-height:30px;">确定驳回学生<span style="color:#44bcb7;padding:0 5px">{{stuName}}</span></p>
            <Input v-model="reason" type="textarea" placeholder="请输入驳回理由"></Input>
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
import caseBar from './caseBar'
import caseBarDate from './caseBarDate'
import caseBarStatus from './caseBarStatus'
import {MENUIDS} from "@public/libs/config.js";
import valid, {
        sys,
		errors,
        common,
        xxStudent
	} from "../../../../spoc-portal/libs/request";
import {mapMutations,mapState} from 'vuex';
export default {
    props: {
        pid: {
            type: String
        }
    },
    data(){
        return {
            compact:'',
            subType: '2',
            subTypeList:[{"id":"2","name":"交接给我的学生"},{"id":"0","name":"未创建服务组的学生"},{"id":"1","name":"已创建服务组的学生"}],
            companyList: [], //分公司
            groupList: [],//申请组
            peopleList: [],
            companyId:'', //分公司ID
            planGroupId:'', //申请组ID
            teacherId:'', //中方顾问ID
            numCompany: 0, //公司选中序号
            numGroup: 0, //申请组选中序号
            numTeacher: 0, //中方顾问选中序号
            showCompanyTags:false, //是否显示分公司标签
            showGroupTags:false, //是否显示申请组标签
            phaseList:[{"id":"","name":"全部"},{"id":"1","name":"本科"},{"id":"2","name":"研究生"},{"id":"0","name":"中学"}],
            apply: '', 
            dateChooseList:[],
            showSearchArea: true,
            hasShowSearchArea: true,
            serviceStatus: '0',
            tableColumns: [
                {
                    title: '学生',
                    key: 'studentName',
                    //width: 100,
                    render: (h, params) => {
                        return h('div', [
                            h('a', {
                                style: {
                                    color: '#44bcb7'
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            name: 'choiceschool.addStudent',
                                            query: {
                                                studentId: params.row.stuId
                                            }
                                        })
                                    }
                                }
                            },
                            [
                                h('div',  params.row.pinYin),
                                h('div', '('+params.row.enName + '/' + params.row.lastName + params.row.firstName+')'),
                            ]
                            )
                        ]);
                    }
                },
                {
                    title: '申请类别',
                    key: 'applyName',
                    //width: 100,
                },
                {
                    title: '申请季',
                    key: 'applyTime',
                },
                {
                    title: '选校进度',
                    key: 'choiceTotal',
                    render: (h, params) => {
                        return h('div', [
                            params.row.signCount ? params.row.signCount : 0 + '/' + (params.row.freeAmount +  params.row.moneyAmount)
                        ]);
                    }
                },
                {
                    title: '选校顾问',
                    key: 'teaName',
                    //width: 140,
                },
               /*  {
                    title: '更新时间',
                    key: 'updateDate',
                    width: 140,
                }, */
                {
                    title: '操作',
                    key: 'action',
                    //width: 100,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', {
                            style: {
                                    'margin-top':'5px',
                                    'margin-bottom':'5px',
                                },
                        },[
                            !params.row.groupId ? h(createOrEditGroup, {
                                style: {
                                    cursor: 'pointer',
                                    color: '#41b3ae',
                                    'margin-top':'5px',
                                    'margin-bottom':'5px',
                                },
                                props:{
                                    title:'新建服务组',
                                    pid: this.pid,
                                    modelName:"选校模块",
                                    type:"create",
                                    spanContent:"创建服务组",
                                    studentInfo_userId: params.row.stuId,
                                    studentInfo_stuName: params.row.stuName,
                                    studentInfo_cellNumber: params.row.cellNumber,
                                    studentInfo_ecID: params.row.ecId,
                                    studentInfo_applyTime: params.row.applyTime
                                },
                                on: {
                                    afterCreateGroupReload: this.afterCreateGroupReload,
                                }
                            }, '') : '',
                            (params.row.groupId && (params.row.menuId != this.pid) &&(params.row.status == 'unreceive')) ? h('a', {
                                style: {
                                    cursor: 'pointer',
                                    color: '#41b3ae',
                                    'margin-top':'5px',
                                    'margin-bottom':'5px',
                                },
                                on: {
                                    click: () => {
                                        this.onclickGoingToServer(1, params.row)
                                    }
                                }
                            }, '接案驳回') : '',
                            (params.row.groupId && (params.row.status =='unreceive')) ? h('div', {
                                style: {
                                    cursor: 'pointer',
                                    color: '#41b3ae',
                                    'margin-top':'5px',
                                    'margin-bottom':'5px',
                                },
                                on: {
                                    click: () => {
                                        this.onclickGoingToServer(3, params.row)
                                    }
                                }
                            }, '分配') : '',
                            ((params.row.status != 'unreceive') && params.row.groupId) ? h('div', {
                                style: {
                                    cursor: 'pointer',
                                    color: '#41b3ae',
                                    'margin-top':'5px',
                                    'margin-bottom':'5px',
                                },
                                on: {
                                    click: () => {
                                        this.onclickGoingToServer(2, params.row)
                                    }
                                }
                            }, '查看分配') : '',
                      /*       ((params.row.status != 'unreceive') && params.row.groupId) ? h('div', {
                                style: {
                                    cursor: 'pointer',
                                    color: '#41b3ae',
                                    'margin-top':'5px',
                                    'margin-bottom':'5px',
                                },
                                on: {
                                    click: () => {
                                        this.seeDetailInfo(params.row.stuId)
                                    }
                                }
                            }, '选校操作') : '', */
                            ((params.row.status != 'unreceive') && params.row.groupId) ? h('div', {
                                style: {
                                    cursor: 'pointer',
                                    color: '#41b3ae',
                                    'margin-top':'5px',
                                    'margin-bottom':'5px',
                                },
                                on: {
                                    click: () => {
                                        this.editDetailInfo(params.row.stuId)
                                    }
                                }
                            }, '编辑信息') : '',
                        ]);
                    }
                }
            ],
            menuIds: {},
            updatedId: '',
            planId: '',
            planEndTime: '',
            historyArray: [],
            resultArray: [],
            teacherArray: [],
            connect: {
                planTime: '',
                chooseTeacher: ''
            },
            modal1: false,
            modal2: false,
            modal3: false,
            modalLoading: true, 
            reason: '', //驳回原因
            stuName: '',  //驳回学生姓名
            teaName: '', //分配老师姓名
            /*校验*/
            basicFormValidate: {
                planTime: [{
                    required: true,
                    type: 'date',
                    message: '必填项',
                    trigger: 'change'
                }]
            },
            basicFormValidate3: {
               /*  planTime: [{
                    required: true,
                    type: 'date',
                    message: '必填项',
                    trigger: 'change'
                }], */
                chooseTeacher: [{
                    required: true,
                    type: 'string',
                    message: '请分配老师',
                    trigger: 'change'
                }]
            },
            startTime:"",
            startTimeOpen:false,
            endTime:"",
            endTimeOpen:false,
            batchList:[],//申请批次
            searchValue:{
                keyword:"",
                teacherId:"",
                batch:"",
                status:""
            },
            studentList:[],
            pageConfig:{
                pageNo: 1,
                pageSize:10,
                placement: 'bottom',
                totalCount: 0
            },
        }
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
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
        changeSubType(val){
            console.log(val)
            this.subType = val.id
            this.pageConfig.pageNo  = 1
            this.loadStudentInfo()
        },
        //筛选标签变化
        tagListChange(tags) {
            this.tags = tags
            this.pageConfig.pageNo  = 1
            this.loadStudentInfo();
        },
        beginYearChange(date) {
            this.startApplyTime = date
            this.pageConfig.pageNo  = 1
            this.loadStudentInfo();
        },
        endYearChange(date) {
            this.endApplyTime = date
            this.pageConfig.pageNo  = 1
            this.loadStudentInfo();
        },
        beginDateChange(val) {
            this.startTime = val
            this.pageConfig.pageNo  = 1
            this.loadStudentInfo();
        },
        endDateChange(val) {
            this.endTime = val
            this.pageNo = 1
            this.pageConfig.pageNo  = 1
            this.loadStudentInfo();
        },
        //切换分公司
        addAcitveCon(val) {
            this.companyId = val.id
            this.numCompany = val.index
            this.numGroup = 0
            this.numTeacher = 0 
            this.pageConfig.pageNo  = 1
            this.getGroupLeaderList()
        },
        //切换申请组
        addAcitveGroup(val) {
            this.planGroupId = val.id
            this.numGroup = val.index
            this.numTeacher = 0
            this.pageConfig.pageNo  = 1
            this.getTeacherList()
        },
        //切换中方顾问老师
        addAcitve(val) {
            this.teacherId = val.id
            this.numTeacher = val.index
            this.pageConfig.pageNo  = 1
            this.loadStudentInfo();
        },
        //搜索输入框。回车或者点击搜索
        textChange() {
            console.log("this.compact = " + this.compact)
            this.pageConfig.pageNo  = 1
            this.loadStudentInfo();
        },
        //切换学生类别
        changeTab(val){
            this.apply = val.id
            this.pageConfig.pageNo  = 1
            this.loadStudentInfo();
        },
        changeServiceStatus(val){
            this.numCompany = 0
            this.numGroup = 0
            this.numTeacher = 0 
            this.serviceStatus = val
            if(val != 0){
                this.subType = 3
                this.loadData()
            } else {
                this.subType = 2
                this.pageConfig.pageNo  = 1
                this.loadStudentInfo();
            }
        },
        //加载数据
        loadData(){
            /* 
                总裁CEO或者管理员-显示分公司标签、申请组标签，
                并开始加载所有分公司的数据,
                在加载分公司后加载第一个分公司的申请组，
                再加载所有申请组的顾问，加载学生。 
            */
            if(this.inRoleArray('1')) {
                this.showCompanyTags = true
                this.showGroupTags =  true
                this.getControlledList()
            } 

            /* 
                分公司领导- 显示申请组标签
                加载分公司所属申请组，
                并加载全部顾问，加载学生
            */
            //if(this.inRoleArray('7') || this.inRoleArray('9')) {
            if(this.inRoleArray('1')) {
                this.showGroupTags =  true
                if(!this.showCompanyTags){
                    this.getGroupLeaderList()
                }
            } 
            
            /* 
                如果只是申请组组长，
                则加载所属申请组的顾问，加载学生
            */
            if((!this.showCompanyTags) && (!this.showGroupTags)) {
                this.getTeacherList()
            }
        },

        //获取全部分公司
        getControlledList() {
            let obj = {}
            sys.controlledList(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.companyList = res.data.data
                    this.companyId = res.data.data[0].id //加载第一个分公司的申请组
                    this.getGroupLeaderList()
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        //获取全部选校组 或者切换分公司时调用
        getGroupLeaderList() {
            if((!this.showCompanyTags) && this.showGroupTags) { //如果是分公司leader。则获取当前用户所属公司的申请组
                this.companyId = this.userInfo.companyId
            }
            let obj = {
                officeId: this.companyId,
                menuId: this.pid //申请模块  701
            }
            common.findGroupNameByMenu(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    res.data.data.unshift(
                        {
                            id: '',
                            name: '全部',
                        }
                    )
                    this.groupList = res.data.data
                    this.planGroupId = res.data.data[0].id
                    this.getTeacherList()
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
            //获取申请顾问
        getTeacherList() {
            let obj = {
                menuId: this.pid,
                subType: this.subType,
                serviceStatus: this.serviceStatus,
                officeId: this.companyId,
                groupId: this.planGroupId,
                apply:this.apply,
            }
            common.getComUserNum(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    console.log(res.data.data)
                    let myResultArray = [{
                            userId:'',
                            userName: '全部',
                        }]
                    res.data.data.forEach((item, index) => {
                        myResultArray.push({
                            userId: item.id,
                            userName: item.name,
                            num: item.num
                        })
                    })
                    this.peopleList = myResultArray
                    this.teacherId = ''
                    this.pageConfig.pageNo  = 1
                    this.loadStudentInfo();
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        changeShowSearchArea(obj){
            this.showSearchArea = obj.show
        },
        datafunc(){
            return new Promise((resolve, reject) => {});
        },
        onclickGoingToServer(val, datas) {
            this.planId = datas.groupId
            this.stuId = datas.stuId
            this.stuName = datas.stuName
            this.teaName = datas.teaName
            this.connect = {
                planTime: '', //规划时间
                chooseTeacher: '' //分配了规划老师
            }
            this['modal' + val] = true
            if(val == 3) { //分配
                this.findListByUserId()
            }
            if(val == 2 || val == 3) {
                let obj = {
                    serviceGroupId: this.planId,
                    menuId: this.pid
                }
                common.comServiceStatusListData(obj).then(valid.call(this))
                    .then(res => {
                        if(res.ok) {
                            this.updatedId = ''
                            //可能是乱序的，自己排序
                            res.data.data.destList.forEach((item, index) => {
                                if(item.phase == this.menuIds.PLAN) {
                                    this.resultArray[0] = item
                                }
                                if(item.phase == this.menuIds.CHOICESCHOOL) {
                                    this.resultArray[1] = item
                                }
                            })
                            //this.planEndTime = res.data.data.endTime
                            this.historyArray = res.data.data.hisList
                            this.resultArray.forEach((item, index) => {
                                if(item.phase == this.menuIds.CHOICESCHOOL && item.id) { //选校阶段已有ID
                                    this.updatedId = item.id
                                    this.connect.planTime = item.handoverTimePlan
                                }
                            })
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
            }
        },
        //查看接案详情路由跳转
        toViewConnect(handoverId) {
            this.$router.push({
                name: 'choiceschool.connectPreview',
                query: {
                    id: handoverId
                }
            })
        },
        afterCreateGroupReload(){
            this.pageConfig.pageNo  = 1
            this.loadStudentInfo();
        },
        //查询组内的老师
        findListByUserId() {
            common.findListByUserId({
                    menuId: this.pid
            }).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.teacherArray = res.data.data
                        this.teacherArray.forEach((item, index) => {
                            if(item.activeUser) {
                                this.connect.chooseTeacher = item.userId
                            }
                        })
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        ok(type) {
            if(type == 2){
                this.modal2 = false
            }
            if(type == 1) { //接案驳回
                let obj = {
                    groupId: this.planId,
                    menuId: this.pid,
                    reason: this.reason
                }
                common.handOverByGroupId(obj).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        this.reason = ''
                        this.modal1 = false
                        this.pageConfig.pageNo  = 1
                        this.loadStudentInfo();
                    }
                })
                .catch(errors.call(this))
                .finally(() => {})
            }
            if(type == 3) {
                let _this = this
                this.$refs.basicStepForm3.validate((validRes) => {
                    if(validRes) {
                        this.someOtherAjaxInChooseSchool()
                    } else {
                        _this.modal3 = true
                        _this.modalLoading = false
                        setTimeout(() => {
                            _this.modalLoading = true
                        }, 0)
                    }
                })
            }
        },
        someOtherAjaxInChooseSchool(){
            const serviceGroupId = this.planId;
            let  _time = ''
            if(this.connect.planTime) {
                if(typeof(this.connect.planTime) != 'string' ) {
                    _time = this.connect.planTime.format('yyyy-MM-dd hh:mm:ss')
                } else {
                    _time = this.connect.planTime
                }
            } else {
                _time = ''
            }
            const handoverTimePlan = _time
            let userId,id;
            if(this.connect.chooseTeacher) { //分配的时候选择了老师
                userId = this.connect.chooseTeacher
            }
            if(this.updatedId) { //已有时间编辑需要传递ID
                id = this.updatedId
            }
            const asdata = {
                serviceGroupId,
                handoverTimePlan,
                phase: this.pid,
                menuId:this.pid,
                userId,
                id,
            };
            const codata = {
                serviceGroupId,
                phase: this.pid,
                menuId:this.pid,
            };
            const uitem = this.teacherArray.find(i=>i.userId==userId);
            const assginer = uitem?uitem.name:'';
            const xxdata = {
                studentId:this.stuId,
                assginerId:userId,
                assginer,
                phase:"0",
                reassignFlag:"0",
                menuId:this.pid,
            };
            common.saveAssign(asdata).then(valid.call(this)).then(res=>{
                if(res.ok) {
                    this.modal3 = false
                    this.pageConfig.pageNo  = 1
                    this.loadStudentInfo();
                  /*   common.saveConfirm(codata).then(valid.call(this)).then(res=>{
                        if(res.ok) {
                            xxStudent.assign(xxdata).then(valid.call(this)).then(
                                res=>{
                                    this.modal3 = false
                                    this.modalLoading = true
                                    this.pageConfig.pageNo  = 1
                                    this.loadStudentInfo();
                                }

                            ).catch(errors.call(this));
                        }
                    }).catch(errors.call(this)); */
                }
            }).catch(errors.call(this));

        },
        cancel(type) {
            if(type == 3) {
                this.$refs.basicStepForm3.resetFields()
            }
        },

        inRoleArray(id){
            return this.roleIds.indexOf(id)>-1;
        },
        notRole(...ids){ // 判断不是这些角色
            return ids.every(id=>{
                return !this.inRoleArray(id);
            });
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
        onPageSizeChange(pageSize){
            this.pageConfig.pageSize=pageSize;
            this.pageConfig.pageNo  = 1
            this.changePage(this.pageConfig.pageNo);
        },
        changePage(page){//分页
            this.pageConfig.pageNo=page;
            this.loadStudentInfo();
        },
        loadStudentInfo(){//加载学生列表
            var _this=this;
            this.updateLoadingStatus({isLoading:true});
            let obj = {
                batch: this.searchValue.batch,
                subType: this.subType,
                apply: this.apply, //本科高中研究生
                serviceStatus: this.serviceStatus, 
                pageNo: this.pageConfig.pageNo, //页码
                pageSize: this.pageConfig.pageSize, //每页个数
                keyword: this.compact, //名称，搜索关键字
                startApplyTime: this.startApplyTime, //申请开始年份
                endApplyTime: this.endApplyTime, //申请结束年份
                searchTags: this.tags, //标签
                orderBy: this.sort, //排序
                phase: this.phase, //表格内服务阶段筛选
                status: this.status, //表格内规划状态筛选
                menuId: this.pid
            }
           /*  if(this.startTime){
                obj.receivedStart = this.startTime + ' 00:00:00' //开始时间
            }
            if(this.endTime){
                obj.receivedEnd = this.endTime + ' 23:59:59' //开始时间
            } */
            if(this.tabValue !=0){
                obj.companyId = this.companyId //归属公司
                obj.groupId = this.planGroupId //所属服务组
                obj.teacherId = this.teacherId //规划老师
            }
            util.ajax.post(nozzle.xxStudent.contactList, obj, {json:true}).then(function(res){
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
    },
    components: {
        'menubar':MenuBar,
        createOrEditGroup,
        CaseBarFilter,
        vSelect,
        caseBar,
        caseBarDate,
        caseBarStatus,
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
        }
    },
    mounted() {
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
            this.loadStudentInfo();
        });
        this.menuIds = MENUIDS
    }
}    
</script>