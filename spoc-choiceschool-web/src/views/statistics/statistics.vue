<template>
    <div class="contentBox">
        <menubar>
            <span slot="menu" class="slotContent">
                <a href="javascript:void(0)" class="active">{{$t('StatisticsTitle')}}</a>
            </span>
        </menubar>
        <div class="mainContent">
            <div class="totalStatistic">
                {{$t('ReceivedAltogether')}}<span>{{statistics.studentTotal}}</span>{{$t('NameOfStudentAnd')}}<span>{{statistics.schoolTotal}}</span>{{$t('SchoolOfApply')}}
            </div>
            <div class="searchBox" :class="{hide:notRole('1')}">
                <Input v-model="searchName" icon="search" :placeholder="$t('SearchNameTips')" style="width:340px;" @on-enter="searchNameFuc" @on-click="searchNameFuc"></Input>
            </div>
            <div class="statisticsBox">
                <div class="systemBox" v-if="inRoleArray('1')">
                    <div class="statisticsList">
                        <div class="progressBox">
                            <i-circle
                                :size="125"
                                :trail-width="8"
                                :stroke-width="8"
                                :percent="(statistics.schoolAmericaPassTotal && statistics.schoolTotal)?Math.round(statistics.schoolAmericaPassTotal/statistics.schoolTotal*100):0"
                                stroke-linecap="square"
                                stroke-color="#009fff"
                                trail-color="#2c4554">
                                <div class="demo-Circle-custom">
                                    <p class="percent">{{(statistics.schoolAmericaPassTotal && statistics.schoolTotal)?Math.round(statistics.schoolAmericaPassTotal/statistics.schoolTotal*100):0}}%</p>
                                    <p class="detailInfo">{{$t('Student')}} {{statistics.studentAmericaPassTotal}}</p>
                                    <p class="detailInfo">{{$t('School')}} {{statistics.schoolAmericaPassTotal}}</p>
                                </div>
                            </i-circle>
                        </div>
                        <div class="title">{{$t('UsConfirmation')}}</div>
                    </div>
                    <div class="statisticsList">
                        <div class="progressBox">
                            <i-circle
                                :size="125"
                                :trail-width="8"
                                :stroke-width="8"
                                :percent="(statistics.schoolChinesePassTotal&&statistics.schoolTotal)?Math.round(statistics.schoolChinesePassTotal/statistics.schoolTotal*100):0"
                                stroke-linecap="square"
                                stroke-color="#44bcb7"
                                trail-color="#2c4554">
                                <div class="demo-Circle-custom">
                                    <p class="percent">{{(statistics.schoolChinesePassTotal&&statistics.schoolTotal)?Math.round(statistics.schoolChinesePassTotal/statistics.schoolTotal*100):0}}%</p>
                                    <p class="detailInfo">{{$t('Student')}} {{statistics.studentChineseaPassTotal}}</p>
                                    <p class="detailInfo">{{$t('School')}} {{statistics.schoolChinesePassTotal}}</p>
                                </div>
                            </i-circle>
                        </div>
                        <div class="title">{{$t('ChineseConfirmation')}}</div>
                    </div>
                    <div class="statisticsList">
                        <div class="progressBox">
                            <i-circle
                                :size="125"
                                :trail-width="8"
                                :stroke-width="8"
                                :percent="(statistics.schoolSginedTotal&&statistics.schoolTotal)?Math.round(statistics.schoolSginedTotal/statistics.schoolTotal*100):0"
                                stroke-linecap="square"
                                stroke-color="#e84d6e"
                                trail-color="#2c4554">
                                <div class="demo-Circle-custom">
                                    <p class="percent">{{ statistics.schoolSginedTotal&&statistics.schoolTotal ? (Math.round(statistics.schoolSginedTotal/statistics.schoolTotal*100)): 0 }}%</p>
                                    <p class="detailInfo">{{$t('Student')}} {{statistics.studentSginedTotal}}</p>
                                    <p class="detailInfo">{{$t('School')}} {{statistics.schoolSginedTotal}}</p>
                                </div>
                            </i-circle>
                        </div>
                        <div class="title">{{$t('SignedStatus')}}</div>
                    </div>
                    <div class="statisticsList">
                        <div class="progressBox">
                            <i-circle
                                :size="125"
                                :trail-width="8"
                                :stroke-width="8"
                                :percent="(statistics.signedSafetySchoolCount && statistics.schoolTotal)?Math.round(statistics.signedSafetySchoolCount/statistics.schoolTotal*100):0"
                                stroke-linecap="square"
                                stroke-color="#ffc619"
                                trail-color="#2c4554">
                                <div class="demo-Circle-custom">
                                    <p class="percent">{{(statistics.signedSafetySchoolCount && statistics.schoolTotal)?Math.round(statistics.signedSafetySchoolCount/statistics.schoolTotal*100):0}}%</p>
                                    <p class="detailInfo">{{$t('Student')}} {{statistics.signedSafetyStudentCount}}</p>
                                    <p class="detailInfo">{{$t('School')}} {{statistics.signedSafetySchoolCount}}</p>
                                </div>
                            </i-circle>
                        </div>
                        <div class="title">{{$t('ContractGuarantee')}}</div>
                    </div>
                </div>
                <div class="americaBox" v-if="inRoleArray('8')||inRoleArray('9')">
                    <div class="statisticsList">
                        <div class="progressBox">
                            <i-circle
                                :size="125"
                                :trail-width="8"
                                :stroke-width="8"
                                :percent="(statistics.schoolAmericaTotal && statistics.schoolTotal)?Math.round(statistics.schoolAmericaTotal/statistics.schoolTotal*100):0"
                                stroke-linecap="square"
                                stroke-color="#009fff"
                                trail-color="#2c4554">
                                <div class="demo-Circle-custom">
                                    <p class="percent">{{(statistics.schoolAmericaTotal && statistics.schoolTotal)?Math.round(statistics.schoolAmericaTotal/statistics.schoolTotal*100):0}}%</p>
                                    <p class="detailInfo">{{$t('Student')}} {{statistics.studentAmericaTotal}}</p>
                                    <p class="detailInfo">{{$t('School')}} {{statistics.schoolAmericaTotal}}</p>
                                </div>
                            </i-circle>
                        </div>
                        <div class="title">{{$t('SelectedSchool')}}</div>
                    </div>
                    <div class="statisticsList">
                        <div class="progressBox">
                            <i-circle
                                :size="125"
                                :trail-width="8"
                                :stroke-width="8"
                                :percent="(statistics.schoolAmericaPassTotal && statistics.schoolTotal)?Math.round(statistics.schoolAmericaPassTotal/statistics.schoolTotal*100):0"
                                stroke-linecap="square"
                                stroke-color="#009fff"
                                trail-color="#2c4554">
                                <div class="demo-Circle-custom">
                                    <p class="percent">{{(statistics.schoolAmericaPassTotal && statistics.schoolTotal)?Math.round(statistics.schoolAmericaPassTotal/statistics.schoolTotal*100):0}}%</p>
                                    <p class="detailInfo">{{$t('Student')}} {{statistics.studentAmericaPassTotal}}</p>
                                    <p class="detailInfo">{{$t('School')}} {{statistics.schoolAmericaPassTotal}}</p>
                                </div>
                            </i-circle>
                        </div>
                        <div class="title">{{$t('Approved')}}</div>
                    </div>
                </div>
                <div class="chineseBox" v-if="inRoleArray('6')||inRoleArray('7')">
                    <div class="statisticsList">
                        <div class="progressBox">
                            <i-circle
                                :size="125"
                                :trail-width="8"
                                :stroke-width="8"
                                :percent="(statistics.schoolAmericaPassTotal && statistics.schoolTotal)?Math.round(statistics.schoolAmericaPassTotal/statistics.schoolTotal*100):0"
                                stroke-linecap="square"
                                stroke-color="#009fff"
                                trail-color="#2c4554">
                                <div class="demo-Circle-custom">
                                    <p class="percent">{{(statistics.schoolAmericaPassTotal && statistics.schoolTotal)?Math.round(statistics.schoolAmericaPassTotal/statistics.schoolTotal*100):0}}%</p>
                                    <p class="detailInfo">{{$t('Student')}} {{statistics.studentAmericaPassTotal}}</p>
                                    <p class="detailInfo">{{$t('School')}} {{statistics.schoolAmericaPassTotal}}</p>
                                </div>
                            </i-circle>
                        </div>
                        <div class="title">{{$t('UsConfirmation')}}</div>
                    </div>
                    <div class="statisticsList">
                        <div class="progressBox">
                            <i-circle
                                :size="125"
                                :trail-width="8"
                                :stroke-width="8"
                                :percent="(statistics.schoolChinesePassTotal&&statistics.schoolTotal)?Math.round(statistics.schoolChinesePassTotal/statistics.schoolTotal*100):0"
                                stroke-linecap="square"
                                stroke-color="#44bcb7"
                                trail-color="#2c4554">
                                <div class="demo-Circle-custom">
                                    <p class="percent">{{(statistics.schoolChinesePassTotal&&statistics.schoolTotal)?Math.round(statistics.schoolChinesePassTotal/statistics.schoolTotal*100):0}}%</p>
                                    <p class="detailInfo">{{$t('Student')}} {{statistics.studentChineseaPassTotal}}</p>
                                    <p class="detailInfo">{{$t('School')}} {{statistics.schoolChinesePassTotal}}</p>
                                </div>
                            </i-circle>
                        </div>
                        <div class="title">{{$t('Approved')}}</div>
                    </div>
                    <div class="statisticsList">
                        <div class="progressBox">
                            <i-circle
                                :size="125"
                                :trail-width="8"
                                :stroke-width="8"
                                :percent="(statistics.schoolSginedTotal&&statistics.schoolTotal)?Math.round(statistics.schoolSginedTotal/statistics.schoolTotal*100):0"
                                stroke-linecap="square"
                                stroke-color="#e84d6e"
                                trail-color="#2c4554">
                                <div class="demo-Circle-custom">
                                    <p class="percent">{{(statistics.schoolSginedTotal&&statistics.schoolTotal)?Math.round(statistics.schoolSginedTotal/statistics.schoolTotal*100):0}}%</p>
                                    <p class="detailInfo">{{$t('Student')}} {{statistics.studentSginedTotal}}</p>
                                    <p class="detailInfo">{{$t('School')}} {{statistics.schoolSginedTotal}}</p>
                                </div>
                            </i-circle>
                        </div>
                        <div class="title">{{$t('HasSigned')}}</div>
                    </div>
                </div>
            </div>
            <div class="conditionBox">
                <div class="filterList" :class="{hide:notRole('9','1')}">
                    <div class="title">{{$t('Commen.americanTeachers')}}：</div>
                    <div class="detailBox">
                        <div class="clearfix">
                            <span :class="['list',{select:item.select}]" v-for="item in americaTeachers" :key="item.teacherId" @click="filterTeacher(item)">{{item.teacherName +" "+ item.studentCount}}</span>
                        </div>
                    </div>
                </div>
                <div class="filterList" :class="{hide:notRole('7','1')}">
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
            </div>
            <div class="headerInfo clearfix">
                <div class="fl">
                    <a href="javascript:void(0)" class="filterBtn latest" :class="{active:sortType=='latest'}"  @click="sortDataList('latest')">{{$t('RecentUpdates')}}</a>
                    <a href="javascript:void(0)" class="filterBtn notStarted" :class="{active:sortType=='notStarted'}"  @click="sortDataList('notStarted')">{{$t('NotStarted')}}</a>
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
            <div class="studentBox">
                <div class="studentList" @click="seeDetailInfo(item.id)" v-for="(item,index) in studentList" :key="index">
                    <div class="basicInfo">
                        <div class="name"><span class="en">{{item.pinYin}}</span><span class="cn">（{{item.enName}}/{{item.lastName+item.firstName}}）</span></div>
                        <div class="layer">{{item.applyName}}</div>
                    </div>
                    <div class="progressInfo">
                        <div v-if="item.phase!='-1'">
                            <div v-if="inRoleArray('1')" class="clearfix">
                                <div class="infoList">
                                    <div class="num">{{item.schoolAmericaTotal}}</div>
                                    <div class="detail">{{$t('UsElectionSchool')}}</div>
                                </div>
                                <div class="infoList">
                                    <div class="num">{{item.schoolAmericaPassTotal}}</div>
                                    <div class="detail">{{$t('UsConfirmation')}}</div>
                                </div>
                                <div class="infoList">
                                    <div class="num">{{item.schoolChineseTotal}}</div>
                                    <div class="detail">{{$t('ChinaElectionSchool')}}</div>
                                </div>
                                <div class="infoList">
                                    <div class="num">{{item.schoolChinesePassTotal}}</div>
                                    <div class="detail">{{$t('ChineseConfirmation')}}</div>
                                </div>
                                <div class="infoList">
                                    <div class="num">{{item.schoolSginedTotal}}</div>
                                    <div class="detail">{{$t('HasSigned')}}</div>
                                </div>
                                <div class="infoList">
                                    <div class="num">{{item.schoolSginedTotal}}/{{item.amount}}</div>
                                    <div class="detail">{{$t('Common.selectionSituation')}}</div>
                                </div>
                            </div>
                            <div v-if="inRoleArray('6') || inRoleArray('7')" class="chineseBox clearfix">
                                <div class="infoList">
                                    <div class="num">{{item.schoolAmericaPassTotal}}</div>
                                    <div class="detail">{{$t('UsConfirmation')}}</div>
                                </div>
                                <div class="infoList">
                                    <div class="num">{{item.schoolChineseTotal}}</div>
                                    <div class="detail">{{$t('ChinaElectionSchool')}}</div>
                                </div>
                                <div class="infoList">
                                    <div class="num">{{item.schoolChinesePassTotal}}</div>
                                    <div class="detail">{{$t('Approved')}}</div>
                                </div>
                                <div class="infoList">
                                    <div class="num">{{item.schoolSginedTotal}}</div>
                                    <div class="detail">{{$t('HasSigned')}}</div>
                                </div>
                                <div class="infoList">
                                    <div class="num">{{item.schoolSginedTotal}}/{{item.amount}}</div>
                                    <div class="detail">{{$t('Common.selectionSituation')}}</div>
                                </div>
                            </div>
                            <div v-if="inRoleArray('8') || inRoleArray('9')" class="americaBox">
                            <div class="infoList">
                                <div class="num">{{item.schoolAmericaTotal}}</div>
                                <div class="detail">{{$t('SelectedSchool')}}</div>
                            </div>
                            <div class="infoList">
                                <div class="num">{{item.schoolAmericaPassTotal}}</div>
                                <div class="detail">{{$t('Approved')}}</div>
                            </div>
                            <div class="infoList">
                                <div class="num">{{item.schoolSginedTotal}}/{{item.amount}}</div>
                                <div class="detail">{{$t('Common.selectionSituation')}}</div>
                            </div>
                        </div>
                        </div>
                        <div v-else class="unStartBox">
                            <span>{{$t('NotStarted')}}</span>
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
    </div>
</template>
<script>
import util from '../../libs/js/util.js';
import nozzle from "../../libs/interface.js";
import {mapMutations,mapState} from 'vuex';
import MenuBar from '../../modules/breadcrumb/menuBar';
export default {
    data(){
        return {
            //roleId:"",
            sortType:"latest",
            startTime:"",
            startTimeOpen:false,
            endTime:"",
            endTimeOpen:false,
            searchName:"",
            americaTeachers:[],
            chineseTeachers:[],
            statistics:{
                studentSginedTotal: 0,
                schoolSginedTotal: 0,
                studentChineseaPassTotal: 0,
                studentAmericaPassTotal: 0,
                schoolTotal: 0,
                studentTotal: 0,
                schoolChinesePassTotal: 0,
                schoolAmericaPassTotal: 0
            },
            studentList:[],
            pageConfig:{
                pageNo: 1,
                pageSize:20,
                placement: 'bottom',
                totalCount: 0
            },
            searchName:"",
            searchValue:{
                teacherId:"",
                keyword:""
            },
            listfold:true,
        }
    },
    components: {
        'menubar':MenuBar
    },
    filters:{//过滤器
        
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        seeDetailInfo(_id){//查看详情
            this.$router.push({name:"choiceschool.choiceDetail",query: {"studentId":_id}})
        },
        inRoleArray(id){
            return this.roleIds.indexOf(id)>-1;
        },
        notRole(...ids){ // 判断不是这些角色
            return ids.every(id=>{
                return !this.inRoleArray(id);
            });
        },
        searchNameFuc(){//搜索
            this.searchValue.keyword=this.searchName;
            this.loadStudentInfo({
                pageNo:this.pageConfig.pageNo,
                pageSize:20,
                keyword:this.searchValue.keyword,
                teacherId:this.searchValue.teacherId,
                status:this.searchValue.status,
                beginDate:this.startTime,
                endDate:this.endTime 
            });
        },
        sortDataList(_type){//加载条件：全部，已完成，未完成
            this.sortType=_type;
            if(_type=="latest"){//全部
                this.searchValue.status="";
            }else if(_type=="notStarted"){//未开始
                this.searchValue.status="-1";
            }else if(_type=="unfinished"){//未分配、未完成
                if(this.inRoleArray('9') || this.inRoleArray('8')){
                    this.searchValue.status=2;//美方未完成
                }else{
                    this.searchValue.status=4;//中方未完成
                }
            }else if(_type=="completed"){
                if(this.inRoleArray('9') || this.inRoleArray('8')){ 
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
                status:this.searchValue.status,
                beginDate:this.startTime,
                endDate:this.endTime 
            });
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
        loadStudentInfo(_data){//加载学生统计列表
            var _this=this;
            this.updateLoadingStatus({isLoading:true});
            util.ajax.get(nozzle.xxStudent.listStatistic,{params:_data}).then(function(res){
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
        getChoiceStatistic(){//统计信息
            var _this=this;
            this.updateLoadingStatus({isLoading:true});
            util.ajax.get(nozzle.xxChoiceSchool.choiceStatistic).then(function(res){
              util.checkAjaxJson(res).thenSuccess(function(json){
                  _this.statistics=json.data;
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
    watch:{
        "userInfo.roleId"(roleId) {
            this.userInfo.roleId = roleId;
            this.processRole();
        }
    },
    computed:{
        ...mapState(['userInfo']),
        roleIds(){
            return this.userInfo.roleId.split(',');
        }
    },
    mounted(){
        this.processRole();
        var _this=this;
        this.getChoiceStatistic();
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
.contentBox{
    .header{
        padding: 10px 0 0 10px;
        border-bottom:1px solid #e5e5e5;
        .menuBox{
          float:left;
          line-height:30px;
          a{
            cursor: default;
            color:#222;
          }
          a.active{
            color:#44bcb7;
          }
          .arrow{
            margin:0px 5px;
          }
        }
        .settingBox{
          float:right;
          line-height:30px;
          .ivu-btn{
              height: 30px;
          }
        }
    }
    .totalStatistic{
        margin-top: 20px;
        text-align: center;
        font-size: 20px;
        height: 50px;
        line-height: 50px;
        span{
            margin: 0px 4px;
            font-size: 25px;
            color: #44bcb7;
        }
    }
    .searchBox{
        text-align: center;
        margin-top: 10px;
        .ivu-input{
            background-color: #fafafa !important;
        }
    }
    .statisticsBox{
        display: table;
        margin-top: 20px;
        width: 100%;
        .systemBox,
        .americaBox,
        .chineseBox{
            display: table;
            width: 100%;
        }
        .statisticsList{
            height: 120px;
            display: table-cell;
            text-align: center;
            .progressBox{
                height: 120px;
                .percent{
                    line-height: 30px;
                    font-size: 18px;
                }
                .detailInfo{
                    line-height: 20px;
                    font-size: 12px;
                }
            }
            .title{
                margin:10px 0;
            }
        }
    }
    .conditionBox{
        margin-top:20px;
        .filterList{
            margin: 10px 0px;
            position: relative;
            color: #666;
            .title{
                text-align: left;
                position:absolute;
                left:0px;
                top: 0px;
                width: 100px;
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
        .notStarted{
            background-image: url("../../assets/images/studentList/icon_notStart.png");
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
        cursor: pointer;
        padding: 15px 20px;
        border-bottom:1px solid #e0e0e0;
        transition: all ease 200ms;
        .basicInfo{
            position: absolute;
            left:20px;
            top: 10px;
            .name{
                font-size: 18px;
                color: #44bcb7;
                line-height: 30px;
                 .en{
                    max-width: 120px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    float: left;
                }
                .cn{
                    font-size: 14px;
                    color: #0c0c0c;
                    max-width: 120px;
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
            padding-left: 240px;
            position: relative;
            .unStartBox{
                text-align: center;
                font-size: 20px;
                color: #d7d6d6;
                height: 48px;
                position: relative;
                line-height: 48px;
                span{
                    width: 30px;
                    height: 45px;
                    padding-left: 30px;
                    background: url("../../assets/images/public/icon_start.png") no-repeat center left;
                }
            }
            .infoList{
                float: left;
                width: 16%;
                text-align: center;
                border-left: 1px dashed #ccc;
                .num{
                    color: #44bcb7;
                    font-size: 18px;
                }
                .detail{
                    color: #666;
                }
                &:first-child{
                    border-left: 0;
                }
            }
            .chineseBox{
                .infoList{
                    width: 20%;
                }
            }
            .americaBox{
                .infoList{
                    width: 33.3%;
                }
            }
        }
        &:hover{
            background: #fafafa;
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