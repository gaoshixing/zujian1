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
        <div class="clearfix">
            <div class="fl">
                <Input v-model="searchName" placeholder="输入学生中文姓名、中文姓名拼音、英文名搜索"  style="width:400px" icon="search" @on-click="searchNameFuc" @on-enter="searchNameFuc"></Input>
            </div>
        </div>
        <div class="filterList" :class="{hide:notRole('1','9')}">
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
    <div class="tipTitle" :class="{hide:notRole('6','8')}">
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
    </div>
    <div class="studentInfo clearfix">
        <div class="studentList" v-for="(item,index) in studentList" :key="index">
            <div class="name"><span class="en">{{item.pinYin}}</span><span class="cn">（{{item.enName}}/{{item.lastName+item.firstName}}）</span></div>
            <div class="layer">{{item.applyName}}</div>
            <div class="require clearfix">
                <div class="fl">{{$t('Progress')}}</div>
                <div class="fr">{{item.signCount?item.signCount:0}}/{{item.amount+item.freeAmount+item.moneyAmount}}</div>
            </div>
            <Progress :percent="item.signCount && item.amount?(item.signCount/(item.amount+item.freeAmount+item.moneyAmount))*100:0" hide-info :style="{'max-width':'100%',overflow:'hidden'}"></Progress>
            <div class="related clearfix">
                <div class="fl time">{{item.updateDate | timeFormat}}</div>
                <a class="fr gobtn" v-if="!item.groupId">
                    <create-or-edit-group title='新建服务组' :pid="pid" modelName="选校模块" type="create" spanContent="创建服务组" :studentInfo_userId="item.stuId" :studentInfo_stuName="item.stuName" :studentInfo_cellNumber="item.cellNumber" :studentInfo_ecID="item.ecId" :studentInfo_applyTime="item.applyTime"  @afterCreateGroupReload="afterCreateGroupReload">
                    </create-or-edit-group>
                </a>
                <a class="fr gobtn" v-if="item.groupId && (item.menuId != pid) &&(item.status == 'unreceive')" @click="onclickGoingToServer(1,item)">接案驳回</a>
                <a class="fr gobtn" v-if="item.groupId && (item.status =='unreceive')" @click="onclickGoingToServer(3, item)">分配</a>
                <a class="fr gobtn" v-if="(item.status != 'unreceive') && item.groupId" @click="onclickGoingToServer(2, item)">查看分配</a>
                <a class="fr status" v-if="(item.status != 'unreceive') && item.groupId" href="javascript:void(0)" @click="seeDetailInfo(item.stuId)">{{$t('Details')}}</a>
                <a class="fr editBtn" v-if="(item.status != 'unreceive') && item.groupId" :class="{hide: notRole('7', '6', '1')}" href="javascript:void(0)" @click="editDetailInfo(item.stuId)">{{$t('Edit')}}</a>
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
    <Modal v-model="modal2" :loading="modal2Loading" width=728 title="查看" @on-ok="ok(2)" @on-cancel="cancel(2)">
        <div>
            <Form ref="basicStepForm2" :rules="basicFormValidate" :model="connect" :label-width="180">
                <Form-item label="交接表：" v-if="historyArray.length">
                    <div style="overflow:hidden" v-for="(item,index) in historyArray" :key="item.id">
                        <div style="float:left;width:90px;">{{item.name}}</div>
                        <div style="float:left;width:100px;">
                            <a @click="toViewConnect(item.id)" style="margin-left: 10px;" href="#">查看交接详情</a>
                        </div>
                    </div>
                </Form-item>
                <div v-for="(item, index) in resultArray" :key="item.phase">
                    <Form-item v-if="item.phase=='plan'" prop="planTime" :label="'(预计)' + phaseTrans(item.phase) + '交接时间：'">
                        <DatePicker type="datetime" placeholder="选择时间" v-model="connect.planTime" style="width: 180px"></DatePicker>
                    </Form-item>
                    <Form-item v-if="item.phase!='plan'" :label="'(预计)' +phaseTrans(item.phase) + '完成时间：'">
                        <DatePicker disabled  readonly  type="datetime" placeholder="选择时间" :value="item.handoverTimePlan" style="width: 180px"></DatePicker>
                    </Form-item>
                </div>
                <Form-item label="(预计)结案时间：">
                    <DatePicker disabled readonly type="datetime" placeholder="选择时间" :value="planEndTime" style="width: 180px"></DatePicker>
                </Form-item>
            </Form>
        </div>
    </Modal>
    <Modal v-model="modal3" :loading="modal3Loading" width=728 title="分配" @on-ok="ok(3)" @on-cancel="cancel(3)">
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
                    <Form-item v-if="item.phase=='plan'" :label="'(预计)' + phaseTrans(item.phase) + '交接时间：'" prop="planTime">
                        <DatePicker type="datetime" placeholder="选择时间" v-model="connect.planTime" style="width: 180px"></DatePicker>
                    </Form-item>
                    <Form-item v-if="item.phase !='plan'" :label="'(预计)' + phaseTrans(item.phase) + '完成时间：'">
                        <DatePicker disabled readonly type="datetime" placeholder="选择时间" :value="item.handoverTimePlan" style="width: 180px"></DatePicker>
                    </Form-item>
                </div>
                <Form-item label="(预计)结案时间：">
                    <DatePicker disabled readonly type="datetime" placeholder="选择时间" :value="planEndTime" style="width: 180px"></DatePicker>
                </Form-item>
                <Form-item label="分配选校老师：" prop="chooseTeacher">
                    <RadioGroup v-model="connect.chooseTeacher">
                        <Radio v-if="item.activeUser" v-for="(item,index) in teacherArray" :label="item.userId" :key="item.userId">{{item.name}}</Radio>
                        <Radio v-if="!item.activeUser" v-for="(item,index) in teacherArray" :label="item.userId" :key="item.userId">{{item.name}}</Radio>
                    </RadioGroup>
                </Form-item>
                <!--   <div style="margin-bottom: 20px;">
                    <span style="float:left; line-height: 33px; width:170px; margin-right: 10px;text-align:right;"><i style="color:red">* </i>分配规划老师：</span>
                    
                </div> -->
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
import {MENUIDS} from "@public/libs/config.js";
import valid, {
		errors,
        common,
        xxStudent
	} from "../../../../spoc-portal/libs//request";
import {mapMutations,mapState} from 'vuex';
export default {
    props: {
        pid: {
            type: String
        }
    },
    data(){
        return {
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
            modal2Loading: true, 
            modal3: false,
            modal3Loading: true, 
            reason: '', //驳回原因
            stuName: '',  //驳回学生姓名
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
                planTime: [{
                    required: true,
                    type: 'date',
                    message: '必填项',
                    trigger: 'change'
                }],
                chooseTeacher: [{
                    required: true,
                    type: 'string',
                    message: '请分配老师',
                    trigger: 'change'
                }]
            },
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
        phaseTrans(val) {
            let obj = {}
            obj[this.menuIds.DOCU] = '文书'
            obj[this.menuIds.APPLY] = '申请'
            obj[this.menuIds.PLAN] = '规划'
            obj[this.menuIds.CHOICESCHOOL] = '选校'
            return obj[val] || val;
        },
        onclickGoingToServer(val, datas) {
            this.planId = datas.groupId
            this.stuId = datas.stuId
            this.stuName = datas.stuName
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
                            this.handoverTimeStr = ''
                            let resultArrayForSort = res.data.data.destList.filter((item, index) => {
                                //不显示文书、申请、其他0 时间
                                return item.phase != 0  && item.phase !=  this.menuIds.DOCU && item.phase != this.menuIds.APPLY
                            })
                            //可能是乱序的，自己排序
                            resultArrayForSort.forEach((item, index) => {
                                if(item.phase == this.menuIds.PLAN) {
                                    this.resultArray[0] = item
                                }
                                if(item.phase == this.menuIds.CHOICESCHOOL) {
                                    this.resultArray[1] = item
                                }
                            })
                            this.planEndTime = res.data.data.endTime
                            this.historyArray = res.data.data.hisList
                            this.resultArray.forEach((item, index) => {
                                if(item.phase == this.menuIds.PLAN && item.id) { //规划阶段已有ID
                                    this.updatedId = item.id
                                    this.handoverTimeStr = item.handoverTimePlan
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
                name: 'plan.connectPreview',
                query: {
                    id: handoverId
                }
            })
        },
        afterCreateGroupReload(){
            this.loadStudentInfo({
                pageNo:1,
                pageSize:20
            });
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
                        this.loadStudentInfo({
                            pageNo:1,
                            pageSize:20
                        });
                    }
                })
                .catch(errors.call(this))
                .finally(() => {})
            }
            if(type == 3) {
                this.$refs['basicStepForm' + type].validate((validRes) => {
                    this['modal' + type + 'Loading'] = false
                    if(validRes) {
                      /*   let obj = {
                            serviceGroupId: this.planId,
                            handoverTimePlan: this.connect.planTime  ? this.connect.planTime.format('yyyy-MM-dd hh:mm:ss') : '',
                            phase: this.pid,
                            menuId: this.pid
                        }
                        if(this.connect.chooseTeacher) { //分配的时候选择了老师
                            obj.userId = this.connect.chooseTeacher
                        }
                        if(this.updatedId) { //已有时间编辑需要传递ID
                            obj.id = this.updatedId
                        }
                        if(type == 2) { //查看不修改状态
                            obj.isView = true
                        } */
                        this.someOtherAjaxInChooseSchool(3)
                        /* common.saveAssign(obj).then(valid.call(this)).then(res => {
                                if(res.ok) {
                                    this['modal' + type] = false
                                    this['modal' + type + 'Loading'] = true
                                    this.loadStudentInfo({
                                        pageNo:1,
                                        pageSize:20
                                    });
                                }
                            })
                            .catch(errors.call(this))
                            .finally(() => {}) */
                    } else {
                        this['modal' + type] = true
                        setTimeout(() => {
                            this['modal' + type + 'Loading'] = true
                        }, 500)
                    }
                })
            }
        },
        someOtherAjaxInChooseSchool(type){
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
            // add in 20180611 选校里还需2步ajax操作
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
            debugger;
            common.saveAssign(asdata).then(valid.call(this)).then(res=>{
                if(res.ok) {
                    common.saveConfirm(codata).then(valid.call(this)).then(res=>{
                        if(res.ok) {
                            xxStudent.assign(xxdata).then(valid.call(this)).then(
                                res=>{
                                    this['modal' + type] = false
                                    this['modal' + type + 'Loading'] = true
                                    this.loadStudentInfo({
                                        pageNo:1,
                                        pageSize:20
                                    });
                                }

                            ).catch(errors.call(this));
                        }
                    }).catch(errors.call(this));
                }
            }).catch(errors.call(this));

        },
        cancel(type) {
            if(typeof type != 'undfined') {
                this.$refs['basicStepForm' + type].resetFields()
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
        searchNameFuc(){//搜搜
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
                if(this.inRoleArray('7') || this.inRoleArray('9')){
                    this.searchValue.status=0;//未分配
                }else if(this.inRoleArray('8')){
                    this.searchValue.status=2;//美方未完成
                }else{
                    this.searchValue.status=4;//中方未完成
                }
            }else if(_type=="completed"){
                if(this.inRoleArray('7') || this.inRoleArray('9')){
                    this.searchValue.status=1;//已分配
                }else if(this.inRoleArray('8')){
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
        onPageSizeChange(pageSize){
            this.pageConfig.pageSize=pageSize;
            this.changePage(this.pageConfig.pageNo);
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
        loadStudentInfo(_data){//加载学生列表
            var _this=this;
            this.updateLoadingStatus({isLoading:true});
            util.ajax.get(nozzle.xxStudent.contactList,{params:_data}).then(function(res){
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
            const query = {studentId:item.id,groupId:item.groupId,phase:'choiceschool'};
            this.$router.push({name:'choiceschool.connectedit',query});
        }
    },
    components: {
      'menubar':MenuBar,
      createOrEditGroup
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
        this.menuIds = MENUIDS
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
        }
        .detailBox{
            min-height: 30px;
            padding:0px 10px 0px 100px;
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
