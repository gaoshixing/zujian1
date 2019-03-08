<style lang="less">
    .applyCaseManage{
        .analyseBarFilter{
            margin-top: 5px;
        }
        .case-manage-timePicker1 {
            margin-top: 6px;
            margin-left: 15px;
            margin-bottom: 6px;
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
        .tagTitle{
            margin-right: 7px;
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
<div class="applyCaseManage">
    <Tabs v-model="serviceStatus" @on-click="changeServiceStatus">
        <TabPane label="最近更新" name="0"></TabPane>
        <TabPane label="未接案" name="1"></TabPane>
        <TabPane label="申请中" name="4"></TabPane>
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
        <div :style="{display: serviceStatus != 0? 'block': 'none'}">
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
                title="申请组"
                key1='name'
                v-if="showGroupTags"
                :num="numGroup"
                @addAcitveCon='addAcitveGroup'>
            </case-bar>
            <case-bar
                :tagList ='peopleList'
                title="申请顾问"
                key1='name'
                key2='num'
                :num="numTeacher"
                @addAcitveCon='addAcitve'>
            </case-bar>
        </div>
        <case-bar-status
            :style="{'margin-left': '15px'}"
            :tagList='phaseList'
            title="申请阶段"
            @addAcitve='changeTab'>
        </case-bar-status>
        <case-bar-filter
            :mgt="22"
            :style="{'margin-left': '15px'}"
            rightType='pl_service_group'
            modelName='申请管理'
            :menuId="pId"
            :from="2" 
            @tagListChange="tagListChange"
        ></case-bar-filter>
        <div class="case-manage-timePicker1">
            <div class="tagTitle">
                <span>入学年份：</span>
            </div>
            <DatePicker type="year" placeholder="开始年份"  style="width: 120px" @on-change="beginYearChange"></DatePicker>
            <div class="case-manage-line-div"></div>
            <DatePicker type="year" placeholder="结束年份"  style="width: 120px" @on-change="endYearChange"></DatePicker>
        </div>
    </div>
    <table-main
        :pId="pId"
        :tableData="tableData" 
        :studentType="tabSelectedType"
        @filterChange="filterChange"
        @reloadStatus="reloadStatus"
        :studentCounts="count"
        :pl_service_status_status="pl_service_status_status"
        :xx_result_type="xx_result_type"
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

    import valid, { errors, common, sys, aplApplyTask } from "../../libs/request";

    export default {
        props:{
            pId: {
                required: true
            }
        },
        data () {
            return {
                showSearchArea: true,
                hasShowSearchArea: true,
                serviceStatusApply: '',
                dateChooseList:[],
                startApplyTime: '',
                endApplyTime: '',
                phaseList:[{"id":"all","name":"不限"},{"id":"UG","name":"本科"},{"id":"PG","name":"研究生"},{"id":"HS","name":"中学"}],
                tabSelectedType: 'all', 
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
                groupList: [],//申请组
                peopleList: [],
                tagList1: ['不限', '+ 筛选'],
                isFinishList: [{"id":"","name":"不限"},{"id":"0","name":"未结案"},{"id":"1","name":"已结案"}],
                searchKeyWord: '', //搜索关键字
                companyId:'', //分公司ID
                planGroupId:'', //申请组ID
                teacherId:'', //中方顾问ID
                numCompany: 0, //公司选中序号
                numGroup: 0, //申请组选中序号
                numTeacher: 0, //中方顾问选中序号
                showCompanyTags:false, //是否显示分公司标签
                showGroupTags:false, //是否显示申请组标签
                serviceStatus: '0', //服务状态筛选
                resourceStatus: '', //准备材料筛选
                infoStatus: '', //申请信息状态筛选
                resultStatus: '', //申请结果筛选
                isFinish: '',//完成状态
                pl_service_status_status:[], //表格筛选项--服务状态
                xx_result_type:[], //表格筛选项--确认申请结果
                subType: 2,
            }
        },
        computed: {
            ...mapState(['userInfo']),
            //管理员 总裁  分总 申请主管
		    //...mapGetters('apply',['isAdmin', 'isCeo', 'isBranchOfficeLeader', 'isAplLeaser'])      
		    ...mapGetters('apply',['isAdmin', 'isCeo', 'isAplManage', 'isAplLeaser'])      
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
            this.getTableSelect() 
        },
		methods: {
            changeShowSearchArea(obj){
                this.showSearchArea = obj.show
            },
            beginYearChange(date) {
                this.startApplyTime = date
                this.pageNo  = 1
                this.getStudentList()
            },
            endYearChange(date) {
                this.endApplyTime = date
                this.pageNo  = 1
                this.getStudentList()
            },
            //获取表格内筛选下拉菜单内容，并加载表格列配置信息 
			getTableSelect() {
				let obj = {
					//服务状态,确认申请结果
                    types: 'pl_service_status_status_apply,xx_result_type',
				}
				sys.batchListData(obj).then(valid.call(this))
				.then(res => {
					if(res.ok) {
                        this.pl_service_status_status = res.data.data.pl_service_status_status_apply
                        this.xx_result_type = res.data.data.xx_result_type
                        this.loadData()
					}
				})
				.catch(errors.call(this))
                .finally(() => {});
			},
            //筛选标签变化
            tagListChange(tags) {
                this.tags = tags
                this.pageNo  = 1
                this.getStudentList()
            },
            reloadStatus(){
                this.getStudentList()
            },
            filterChange(obj){
                if(obj.type == 'serviceStatusLabel'){
                    this.serviceStatusApply = obj.status
                }
                if(obj.type == 'resourceCount'){
                    this.resourceStatus = obj.status
                }
                if(obj.type == 'infoStatus'){
                    this.infoStatus = obj.status
                }
                if(obj.type == 'resultStatus'){
                    this.resultStatus = obj.status
                }
                this.pageNo = 1
                this.getStudentList()
            },
            datafunc(){
                return new Promise((resolve, reject) => {});
            },
            //选择状态
            chooseIsFinish(val){
                this.isFinish = val.id
                this.pageNo  = 1
                this.getStudentList()
            },
            onPageSizeChange(val){
                //this.pageNo = 1
                this.pageSize = val
                this.getStudentList()
            },
            onPageChange(val) {
                this.pageNo = val
                this.getStudentList()
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
            //切换申请组
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
                this.getStudentList()
            },
            textChange() {
                this.pageNo  = 1
                this.getStudentList()
            },
			changeTab(val){
                this.tabSelectedType = val.id
                this.pageNo  = 1
                this.getStudentList()
            },
            changeServiceStatus(val){
                this.numCompany = 0
                this.numGroup = 0
                this.numTeacher = 0 
                this.serviceStatus = val
                if(val == 0) {
                    this.subType = 2
                    this.pageNo = 1
                    this.getStudentList()
                } else {
                    this.subType = 3
                    this.loadData()
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
                if(this.isCeo||this.isAdmin) {
                    this.showCompanyTags = true
                    this.showGroupTags =  true
                    this.getControlledList()
                } 

                /* 
                    分公司领导- 显示申请组标签
                    加载分公司所属申请组，
                    并加载全部顾问，加载学生
                */
                if(this.isAplManage) {
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
                        this.companyId = resArr[0].id //加载第一个分公司的申请组
                        this.getGroupLeaderList()
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
            //获取全部申请组 或者切换分公司时调用
            getGroupLeaderList() {
                if((!this.showCompanyTags) && this.showGroupTags) { //如果是分公司leader。则获取当前用户所属公司的申请组
                    this.companyId = this.userInfo.companyId
                }
                let obj = {
                    officeId: this.companyId,
                    menuId: this.pId //申请模块  701
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
              //获取申请顾问
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
                        this.getStudentList()
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },

            //获取学生列表
            getStudentList() {
                let obj = {
                    subType: this.subType,
                    serviceStatus: this.serviceStatus,
                    startApplyTime: this.startApplyTime,
                    endApplyTime: this.endApplyTime, 
                    pageNo: this.pageNo, //页码
                    pageSize: this.pageSize, //每页个数
                }
                if(this.tabSelectedType != 'all'){
                    obj.applyPhase = this.tabSelectedType
                }
                if(this.serviceStatus != 0) {
                    obj.officeId = this.companyId //归属公司
                    obj.groupId = this.planGroupId //所属服务组
                    obj.teacherId = this.teacherId //申请老师
                }
               /*  if(this.startTime){
                    obj.receivedStart = this.startTime + ' 00:00:00' //开始时间
                }
                if(this.endTime){
                    obj.receivedEnd = this.endTime + ' 23:59:59' //开始时间
                } */
                if(this.isFinish != '') {
                    obj.isFinish = this.isFinish
                }
                if(this.searchKeyWord!= '') {
                    obj.name = this.searchKeyWord
                }
                if(this.tags.length){
                    obj.searchTags = this.tags
                }
                if(typeof this.serviceStatusApply != 'undefined' && this.serviceStatusApply !=='') {
                    obj.serviceStatusApply = this.serviceStatusApply 
                }
                if(typeof this.resourceStatus != 'undefined' && this.resourceStatus !=='') {
                    obj.resourceStatus = this.resourceStatus 
                }
                if(typeof this.infoStatus != 'undefined' && this.infoStatus !=='') {
                    obj.infoStatus = this.infoStatus 
                }
                if(typeof this.resultStatus != 'undefined' && this.resultStatus !=='') {
                    obj.resultStatus = this.resultStatus 
                }
                //加载数据
                aplApplyTask.listPage(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.tableData = res.data.data.list
                        this.count = res.data.data.count//总学生数
                        this.pageCount =  res.data.data.pageCount//总页数
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            }
        },
    }
</script>