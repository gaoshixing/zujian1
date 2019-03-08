<style lang="less">
    .contentCaseManage{
        .analyseBarFilter{
            margin-top: 5px;
        }
        .case-manage-timePicker1 {
            margin-top: 6px;
            margin-bottom: 6px;
            margin-left: 15px;
            .tagTitle{
                display: inline-block;
                margin-right: 22px;
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
        .page {
			margin-top: 20px;
			text-align: center;
        }
        .titleBarWithAutoHeight{
            .tagTitle{
                margin-right: 7px;
            }
        }
    }
    .myBadge{
        color:#44bcb7;
        background-color: #fff;
        font-size: 14px; 
        margin-bottom: 3px;
    }
    .myBadgeBlack{
        color:#495060;
    }
</style>
<template>
<div class="contentCaseManage">
	<Tabs v-model="serviceStatus" @on-click="changeServiceStatus">
        <TabPane label="最近更新" name="0"></TabPane>
        <TabPane label="未接案" name="1"></TabPane>
        <TabPane label="服务中" name="4"></TabPane>
        <TabPane label="已结案" name="5"></TabPane> 
    </Tabs>
	<v-select 
		style="width: 396px;margin: 15px 0;"
		placeholder="输入学生姓名"
		icon="search" 
        :datafunc="datafunc"
		v-model="searchKeyWord"
		k='cnname'
		@on-enter="textChange" 
		@on-click="textChange" 
		@selected="textChange"
	    :hasShowSearchArea="hasShowSearchArea"
        :showSearchArea="showSearchArea"
        @changeShowSearchArea="changeShowSearchArea">
	</v-select>
    <div :style="{display: showSearchArea? 'block': 'none'}">
        <div :style="{display: serviceStatus != 0 ? 'block': 'none'}">
            <case-bar
                :tagList ='companyList'
                title="分公司"
                key1='companyName'
                v-if="showCompanyTags"
                @addAcitveCon='addAcitveCon'
                :num="numCompany">
            </case-bar>
            <case-bar
                :tagList ='groupList'
                title="文书组"
                key1='name'
                v-if="showGroupTags"
                :num="numGroup"
                @addAcitveCon='addAcitveGroup'>
            </case-bar>
            <case-bar
                :tagList ='peopleList'
                title="文书顾问"
                key1='name'
                key2='num'
                :num="numTeacher"
                @addAcitveCon='addAcitve'>
            </case-bar>
        </div>
        <case-bar-status
            :style="{'margin-left': '15px'}"
            :tagList ='statusChooseList'
            title="完成状态"
            @addAcitve='chooseStatus'>
        </case-bar-status>
        <case-bar-status
            :style="{'margin-left': '15px'}"
            :tagList='phaseList'
            title="申请阶段"
            @addAcitve='changeTab'>
        </case-bar-status>
        <case-bar-filter
            :style="{'margin-left': '15px'}"
            :mgt="22"
            rightType='pl_service_group'
            :menuId="pId"
            modelName='文书管理'
            :from="2" 
            @tagListChange="tagListChange"
        ></case-bar-filter>
        <div class="case-manage-timePicker1">
            <div class="tagTitle">
                <span>入学年份：</span>
            </div>
            <DatePicker type="year" :value="new Date().getFullYear() + 1 + ''" placeholder="开始年份"  style="width: 120px" @on-change="beginYearChange"></DatePicker>
            <div class="case-manage-line-div"></div>
            <DatePicker type="year" :value="new Date().getFullYear() + 1 + ''" placeholder="结束年份"  style="width: 120px" @on-change="endYearChange"></DatePicker>
        </div>
    </div>
    <table-main
        :loading="loading"
        :pId="pId"
        :studentType="tabSelectedType"
        :tableData="tableData" 
        :historyCheckResult="historyCheckResult"
        @filterChange="filterChange"
        @updateColunmsCheck="updateColunmsCheck"
        @reloadStatus="reloadStatus"
        :studentCounts="count"
        from="caseManage">
    </table-main>
    <div class="page">
        <Page 
            show-elevator 
            show-sizer 
            show-total 
            :page-size="pageSize" 
            :current="pageNo" 
            :total="count" 
            @on-change="onPageChange" 
            @on-page-size-change="onPageSizeChange"
            v-if="pageCount>1">
        </Page>
    </div>
</div>
</template>
<script>
	import tableMain from '../../modules/tableMain';
	import expandRow from '../../modules/tableExpand';
    import CaseBarFilter from '@public/modules/caseBarFilter';
	import vSelect from '@public/modules/vSelect'
	import caseBar from '@public/modules/caseBar1'
    import caseBarDate from '../../modules/caseBarDate'
    import caseBarStatus from '../../modules/caseBarStatus'

    import { mapState, mapGetters } from 'vuex'

    import valid, { errors, common, sys, docEssayTask } from "../../libs/request";

    export default {
        props:{
            pId: {
                required: true
            }
        },
        data () {
            return {
                loading: true,
                showSearchArea: true,
                hasShowSearchArea: true,
                startApplyTime: new Date().getFullYear() + 1,
                endApplyTime: new Date().getFullYear() + 1, 
                serviceStatus: '0',
                phaseList:[{"id":"UG","name":"本科"},{"id":"PG","name":"研究生"},{"id":"HS","name":"中学"}],
                studentTypeList: [], //学生类别及文书完成数目 
                tabSelectedType: 'UG', //默认选中tab  UG本科 PG研究生 HS中学 
                getMyTabStyle: {}, //获取标签样式
                tabLabels:{},//标签转换对象

                tableData:[],
                startTime: '',
                endTime: '',
                count: 0, //总学生数
                pageCount: 1, //总页数
                pageNo: 1,//当前页码
                pageSize: 10, //页面数据个数
                tags: [], //所选标签
                sort: '', //排序
                companyList: [], //分公司
                groupList: [],//文书组
                peopleList: [],
                tagList1: ['不限', '+ 筛选'],
                statusChooseList:[{"id":"","name":"不限"},{"id":"1","name":"未完成"},{"id":"0","name":"已完成"}],
                dateChooseList:[{"id":"0","name":"至今"},{"id":"1","name":"半年内"},{"id":"2","name":"一年内"}],
                searchKeyWord: '', //搜索关键字
                companyId:'', //分公司ID
                planGroupId:'', //文书组ID
                teacherId:'', //中方顾问ID
                numCompany: 0, //公司选中序号
                numGroup: 0, //文书组选中序号
                numTeacher: 0, //中方顾问选中序号
                chooseTags:[],//列表筛选项
                showCompanyTags:false, //是否显示分公司标签
                showGroupTags:false, //是否显示文书组标签
                historyCheckResult : [],  //绑定到列表组件的历史显示字段
                historyCheckResultUG : [], //本科历史显示字段
                historyCheckResultPG :  [], //研究生历史显示字段
                historyCheckResultHS : [],  //中学历史显示字段
                isMe: 0,
                type: '', //列表内筛选名
                status: '', //列表内筛选值
                isFinish: '',//完成状态
                subType:2
            }
        },
        computed: {
            ...mapState(['userInfo']),
            //管理员 总裁  分总 文书主管
		    ...mapGetters('docu',['isAdmin', 'isCeo', 'isBranchOfficeLeader', 'isEssayLeaser'])      
        },
		components: { 
			expandRow,
			CaseBarFilter,
			vSelect,
			caseBar,
            caseBarDate,
            caseBarStatus,
            tableMain
        },
        mounted() {
            this.loadStydentType() 
        },
		methods: {
            changeShowSearchArea(obj){
                this.showSearchArea = obj.show
            },
            beginYearChange(date) {
                this.startApplyTime = date
                this.pageNo  = 1
                this.getStudentList(this.tabSelectedType)
            },
            endYearChange(date) {
                this.endApplyTime = date
                this.pageNo  = 1
                this.getStudentList(this.tabSelectedType)
            },
            changeServiceStatus(val){
                console.log(val)
                this.loading = true
                this.tableData = []
                this.numCompany = 0
                this.numGroup = 0
                this.numTeacher = 0 
                this.serviceStatus = val
                if(val == 0) {
                    this.subType = 2
                } else {
                    this.subType = 3
                }
                this.loadStydentType()
                /* this.pageNo  = 1
                this.getStudentList(this.tabSelectedType) */
            },
            //筛选标签变化
            tagListChange(tags) {
                let args= [];
                tags.forEach((item, index)=>{
                    let newArgs = []
                    item.childTags.forEach((childrenItem,childIndex)=>{
                        newArgs.push(childrenItem.id)
                    })
                    args.push(newArgs)
                })
                this.tags = args
                this.pageNo  = 1
                this.getStudentList(this.tabSelectedType)
            },
            reloadStatus(){
                this.getStudentList(this.tabSelectedType)
            },
            //修改历史选中显示列
            updateColunmsCheck(hasCheckedKeyArray){
                this['historyCheckResult' + this.tabSelectedType].forEach((item,index) => {
                    if(hasCheckedKeyArray.indexOf(item.key) > -1) {
                        this['historyCheckResult' + this.tabSelectedType][index].ischeck = 1
                    } else {
                        this['historyCheckResult' + this.tabSelectedType][index].ischeck = 0
                    }
                })
                //更新用户显示字段
                let obj = {
                    type: this.tabSelectedType,
                    list: this['historyCheckResult' + this.tabSelectedType]
                }
                docEssayTask.updateShowTile(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
            //获取历史显示字段
            loadHistoryColunms(studentType){
                if(this['historyCheckResult' + studentType].length){
                    this.historyCheckResult = this['historyCheckResult' + studentType]
                    //加载学生数据
                    this.getStudentList(studentType)
                } else {
                    let obj = {
                        type: studentType
                    }
                    docEssayTask.listShowTile(obj).then(valid.call(this))
                    .then(res => {
                        if(res.ok) {
                            this.historyCheckResult = res.data.data
                            this['historyCheckResult' + studentType] = res.data.data
                            this.getStudentList(studentType)
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
                }
            },
            //加载学生类别及完成文书数
            loadStydentType(){
                let obj = {
                    isMe: 0
                }
                docEssayTask.listApply(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.studentTypeList = res.data.data
                        this.studentTypeList.forEach((item,index) => {
                            if(!this.tabSelectedType){
                                this.tabSelectedType = item.type
                            }
                            if(item.type == this.tabSelectedType) {
                                this.getMyTabStyle[item.type] = 'myBadge'
                            } else {
                                this.getMyTabStyle[item.type] = 'myBadge myBadgeBlack'
                            }
                            this.tabLabels[item.type] = (h) => {
                                return h('div', [
                                    h('span', item.name),
                                    h('Badge', {
                                        props: {
                                            count: '('+ item.num +')',
                                            'class-name':this.getMyTabStyle[item.type]
                                        }
                                    })
                                ])
                            }
                        });
                        this.loadData()
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
           /*  beginDateChange(val) {
                console.log(val)
                console.log(new Date(val).getTime())
                this.pageNo = 1
                this.startTime = val
                this.getStudentList(this.tabSelectedType)
            },
            endDateChange(val) {
                console.log(val)
                console.log(new Date(val).getTime())
                this.endTime = val
                this.pageNo = 1
                this.getStudentList(this.tabSelectedType)
            }, */
            filterChange(obj){
                console.log(obj)
                this.type = obj.type
                this.status = obj.status
                this.pageNo = 1
                this.getStudentList(this.tabSelectedType)
            },
            datafunc(){
                return new Promise((resolve, reject) => {});
            },
            //选择状态
            chooseStatus(val){
                console.log(val)
                this.isFinish = val.id
                this.pageNo  = 1
                this.getStudentList(this.tabSelectedType)
            },
            //选择时间
            chooseDate (val){
                //{"id":"0","name":"至今"},{"id":"1","name":"半年内"},{"id":"2","name":"一年内"}
                console.log(val)
                this.startTime = ''
                this.endTime  = ''
                if(val.id != 0){
                    common.newDate({}).then(valid.call(this))
                    .then(res => {
                        if(res.ok) {
                            console.log(" res.data.data = " +  res.data.data.date)
                            let now = new Date(res.data.data.date.substring(0,19))
                            this.endTime = now.format('yyyy-MM-dd')

                            let day = 24*60*60*1000 //一天的毫秒数
                            if(val.id == 1){//半年内
                                let startTime = new Date(now.getTime() - day*180)
                                this.startTime = startTime.format('yyyy-MM-dd')
                            }
                            if(val.id == 2){//一年内
                                let startTime = new Date(now.getTime() - day*365)
                                this.startTime = startTime.format('yyyy-MM-dd')
                            }
                            this.pageNo  = 1
                            this.getStudentList(this.tabSelectedType)
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
                } else {
                    this.startTime = ''
                    this.endTime = ''
                    this.pageNo  = 1
                    this.getStudentList(this.tabSelectedType)
                }
            },
             //每页个数切换
            onPageSizeChange(val){
                //this.pageNo = 1
                this.pageSize = val
                this.getStudentList(this.tabSelectedType)
            },
            //分页
            onPageChange(val) {
                this.pageNo = val
                this.getStudentList(this.tabSelectedType)
            },
            //切换分公司
            addAcitveCon(id, index) {
                this.companyId = id
                this.numCompany = index
                this.numGroup = 0
                this.numTeacher = 0 
                this.pageNo  = 1
                this.getGroupLeaderList()
            },
            //切换文书组
            addAcitveGroup(id, index) {
                this.planGroupId = id
                this.numGroup = index
                this.numTeacher = 0
                this.pageNo  = 1
                this.getTeacherList()
            },
            //切换中方顾问老师
            addAcitve(id, index) {
                this.teacherId = id
                this.numTeacher = index
                this.pageNo  = 1
                this.getStudentList(this.tabSelectedType)
            },
            //搜索输入框。回车或者点击搜索
            textChange() {
                console.log("this.compact = " + this.compact)
                this.pageNo  = 1
                this.getStudentList(this.tabSelectedType)
            },
            //切换学生类别
			changeTab(val){
                console.log(val)
                //修改TAB样式
                this.tabSelectedType = val.id
               /*  for(let key in this.getMyTabStyle){
                    if(key ==  this.tabSelectedType){
                        this.getMyTabStyle[key] = 'myBadge'
                    } else {
                        this.getMyTabStyle[key] = 'myBadge myBadgeBlack'
                    }
                } */
                this.loadHistoryColunms(val.id)
            },
            //加载数据
            loadData(){
                /* 
                    总裁CEO或者管理员-显示分公司标签、文书组标签，
                    并开始加载所有分公司的数据,
                    在加载分公司后加载第一个分公司的文书组，
                    再加载所有文书组的顾问，加载学生。 
                */
                if(this.isCeo||this.isAdmin) {
                    this.showCompanyTags = true
                    this.showGroupTags =  true
                    this.getControlledList()
                } 

                /* 
                    分公司领导- 显示文书组标签
                    加载分公司所属文书组，
                    并加载全部顾问，加载学生
                */
                if(this.isBranchOfficeLeader) {
                    this.showGroupTags =  true
                    if(!this.showCompanyTags){
                        this.getGroupLeaderList()
                    }
                } 
                
                /* 
                    如果只是文书组组长，
                    则加载所属文书组的顾问，加载学生
                */
                if((!this.showCompanyTags) && (!this.showGroupTags)) {
                    this.getTeacherList(this.userInfo.id)
                }
            },

            //获取全部分公司
            getControlledList() {
                let obj = {}
                sys.controlledList(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        let resArr = res.data.data
                        resArr.unshift({id: "", companyName: "全部"})
                        this.companyList = resArr
                        this.companyId = resArr[0].id //加载第一个分公司的文书组
                        this.getGroupLeaderList()
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
            //获取全部文书组 或者切换分公司时调用
            getGroupLeaderList() {
                if((!this.showCompanyTags) && this.showGroupTags) { //如果是分公司leader。则获取当前用户所属公司的文书组
                    this.companyId = this.userInfo.companyId
                }
                let obj = {
                    officeId: this.companyId,
                    menuId: this.pId //文书模块  701
                }
                common.findGroupNameByMenu(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        let resArray = res.data.data
                        resArray.unshift(
                            {
                                id: '',
                                name: '全部',
                            }
                        )
                        this.groupList = resArray
                        this.planGroupId = resArray[0].id
                        this.getTeacherList()
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
              //获取文书顾问
            getTeacherList() {
                let obj = {
                    menuId: this.pId,
                    subType: this.subType,
                    serviceStatus: this.serviceStatus,
                    officeId: this.companyId,
                    groupId: this.planGroupId,
                }
                if(this.tabSelectedType == 'UG'){
                    obj.apply = 1
                } else if(this.tabSelectedType == 'PG'){
                    obj.apply = 2
                } else if(this.tabSelectedType == 'HS'){
                    obj.apply = 0
                } else {
                    obj.apply = ''
                }
                common.getComUserNum(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        let resArray = res.data.data
                        resArray.unshift({
                            id:'',
                            name: '全部',
                            num:''
                        })
                        this.peopleList = resArray
                        this.teacherId = ''
                        this.pageNo  = 1
                        this.loadHistoryColunms(this.tabSelectedType)
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },

            //获取学生列表
            getStudentList(type) {
                this.loading = true
                let obj = {
                    subType: this.subType,
                    startApplyTime: this.startApplyTime,
                    endApplyTime: this.endApplyTime, 
                    serviceStatus: this.serviceStatus,
                    isMe: this.isMe,
                    isFinish: this.isFinish,
                    name: this.searchKeyWord,
                    pageNo: this.pageNo, //页码
                    pageSize: this.pageSize, //每页个数
                  /*   receivedStart: this.startTime, //开始时间
                    receivedEnd: this.endTime, //结束时间 */
                    tags: this.tags.length > 0 ? this.tags : null, //标签
                }
                if(this.serviceStatus != 0){
                    obj.officeId = this.companyId //归属公司
                    obj.comId = this.planGroupId //所属服务组
                    obj.teaId = this.teacherId //文书老师
                }
                if(typeof this.status != 'undefined'){
                    obj.type = this.type, //表格内筛选类型
                    obj.status = this.status //表格内筛选值
                }
                //加载数据
                docEssayTask['list' + type](obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.tableData = res.data.data.list
                        this.count = res.data.data.count//总学生数
                        this.pageCount =  res.data.data.pageCount//总页数
                    }
                })
                .catch(errors.call(this))
                .finally(() => {this.loading = false});
            }
        },
    }
</script>