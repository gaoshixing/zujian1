
<style lang="less">
    .planCaseManage {
        position: relative;
        .content {
            padding: 0 15px;
            .case-manage-timePicker {
                margin-top: 10px;
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
        }
        .contentAro {
            position: absolute;
            width: 100%;
            height: 100px;
            .tableContent {
                width: 95%;
                height: 60px;
                margin: 0 auto;
                box-shadow: 0 0 5px #999;
                padding: 12px  0;
                display: flex;
                justify-content: space-around;
                span {
                    display: block;
                    border-right: 1px solid #e5e5e5;
                    text-align: center;
                    width: 100%;
                }
                
            }
            .contentTitle {
                padding-left: 50px;
                margin-bottom: 15px;
                .titleRight {
                    float: right;
                    margin-right: 36px;
                }
                .title {
                    display: inline-block;
                    padding: 0px 12px   ;
                    border-radius: 2px;
                    color: #fff;
                    background-color: #d0d0d0;
                    margin-right: 10px;
                }
            }
        }
        .page {
			margin-top: 20px;
			text-align: center;
		}
        .ivu-table-row {
            position: relative;
            left: 0px;
            height: 135px;
            .ivu-table-cell {
                position: relative;
                padding-top: 13px;
            }
            .ivu-table-column-center,.ivu-table-column-left {
                vertical-align: top;
            }
        }
        .titleBarWithAutoHeight{
            .tagTitle{
                margin-right: 7px;
            }
        }
    }
</style>
<template>
    <div class="planCaseManage">
        <div class="content">
            <Tabs v-model="serviceStatus">
                <TabPane label="最近更新" name="0"></TabPane>
                <TabPane label="未接案" name="1"></TabPane>
                <TabPane label="未交接" name="2"></TabPane>
                <TabPane label="已交接" name="3"></TabPane>
                <TabPane label="已结案" name="5"></TabPane>
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
                <div v-if="serviceStatus != 0">
                    <case-bar
                        :tagList ='controlledList'
                        title="分公司"
                        key1='companyName'
                        v-if="showCompanyTags"
                        @addAcitveCon='addAcitveCon'
                        :num="numCompany">
                    </case-bar>
                    <case-bar
                        :tagList ='planGroupList'
                        title="规划组"
                        key1='name'
                        v-if="showGroupTags"
                        :num="numGroup"
                        @addAcitveCon='addAcitveGroup'>
                    </case-bar>
                    <case-bar
                        :tagList ='peopleList'
                        title="中方顾问"
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
                    @addAcitve='changePhase'>
                </case-bar-status>
                <case-bar-filter 
                    :mgt="22"
                    :style="{'margin-left': '15px'}"
                    rightType='pl_service_group'
                    modelName='规划管理'
                    :from="2" 
                    :menuId="pid"
                    @tagListChange="tagListChange">
                </case-bar-filter>   
                <div class="case-manage-timePicker">
                    <div class="tagTitle">
                        <span>入学年份：</span>
                    </div>
                    <DatePicker type="year" :value="new Date().getFullYear() + ''" placeholder="开始年份"  style="width: 120px" @on-change="beginYearChange"></DatePicker>
                    <div class="case-manage-line-div"></div>
                    <DatePicker type="year" :value="new Date().getFullYear() + 4 + ''" placeholder="结束年份"  style="width: 120px" @on-change="endYearChange"></DatePicker>
                </div>
                <case-bar-status v-show="serviceStatus == 0"
                    :style="{'margin-left': '15px'}"
                    :tagList='subTypeList'
                    title="状态"
                    @addAcitve='changeSubType'>
                </case-bar-status>
            </div>
        </div>
        
        <table-gsx 
            :loading="loading"
            @reloadStatus="reloadStatus"
            tableTitle="接案数据-列表"
            :studentCounts="count"
            :columns="columns1"
            :data="data1"
            :isShowCaseM="isShowCaseM"
            @toSortChange="sortChange"
            @filterChange="filterChange"
            :pid="pid"
            ref="table" 
            :module="mods"
            :top='top'
            :serviceStatus="serviceStatus">
        </table-gsx>
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
	import {MENUIDS} from "@public/libs/config.js";
    import CaseBarFilter from '@public/modules/caseBarFilter';
    import caseBarStatus from '../../modules/caseBarStatus'
    import caseBar from '@public/modules/caseBar1'
    import tableGsx from '../../modules/tableGsx'
	import vSelect from '@public/modules/vSelect'
	import {waitUntil} from '@public/libs/util'
    import { mapState, mapGetters } from 'vuex'

    import valid, { errors, common, sys, plServiceGroup } from "../../libs/request";
    import {statusTransForLeader} from "../../libs/statusTrans"

    export default {
        props:{
            pid: {
                required: true
            }
        },
        data() {
            return {
                loading: true,
                showSearchArea: true,
                hasShowSearchArea: true,
                subType: '2',
                apply: '',
                phaseList:[{"id":"","name":"全部"},{"id":"0","name":"中学"},{"id":"1","name":"本科"},{"id":"2","name":"研究生"}],
                subTypeList:[{"id":"2","name":"交接给我的学生"},{"id":"0","name":"未创建服务组的学生"},{"id":"1","name":"已创建服务组的学生"}],
				mods: 'plan',
                isShowCaseM: true,
                beginDate: '',
                endDate: '',
                startApplyTime: new Date().getFullYear(),
                endApplyTime: new Date().getFullYear() + 4,
                top: 45,
                count: 0, //总学生数
                pageCount: 1, //总页数
                pageNo: 1,//当前页码
                pageSize: 10, //页面数据个数
                tags: [], //所选标签
                sort: '', //排序
                controlledList: [],
                planGroupList: [],
                peopleList: [],
                serviceStatus: '0', //0未接案、1待交接、2已交接、3最近更新(默认)
                compact: '',
                companyId:'', //分公司ID
                planGroupId:'', //规划组ID
                teacherId:'', //中方顾问ID
                numCompany: 0, //公司选中序号
                numGroup: 0, //规划组选中序号
                numTeacher: 0, //中方顾问选中序号
                phase1:'', //服务阶段筛选
                status1:'', //规划状态筛选
                columns1: [
                   /* 
                        因为暂时不用导出功能，所以没有多选
                        {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    }, */
                    {   
                        align: 'left',
                        title: '学生',
                        key: 'stuName',
                        width: 210,
                        render: (h, params) => {
                            return h('div', [
                                h('a',  
                                    {
                                        style: {
                                            color: '#44bcb7'
                                        },
                                        on: {
                                            click: () => {
                                                const {href} = this.$router.resolve({
                                                    name: 'plan.addStudent',
                                                    query: {
                                                        studentId: params.row.stuId
                                                    }
                                                })
                                                window.open(href, '_blank')
                                            }
                                        }
                                    },
                                    [
                                        params.row.stuName,
                                        h('i',
                                            {
                                                style: {
                                                    color: '#495060',
                                                    'font-style': 'normal'
                                                }
                                            },
                                        params.row.enName ? ' ('+params.row.enName +')' : '')
                                    ]
                                )
                            ]);
                        }
                    },
                    {   
                        align: 'center',
                        title: '服务阶段',
                        key: 'phase',
                       /*  filters: [],
                        filterMultiple: false,
                      	filterRemote (value, row) {
                            console.log("value = " + value + " row = " + row)
                        } */
                    },
                    {
                        align: 'center',
                        title: '申请类别',
                        key: 'applySeasonLabel'
                    },
                    {
                        align: 'center',
                        title: '入学季',
                        key: 'applyTime'
                    },
                    {
                        align: 'center',
                        title: '规划状态',
                        key: 'status',
                        filters: [],
                        filterMultiple: false,
                      	filterRemote (value, row) {
                            console.log("value = " + value + " row = " + row )
                        },
                        render: (h, params) => {
                            return h('div', [
                                h('span', statusTransForLeader(params.row.status))
                            ]);
                        }
                    },
                    {
                        align: 'center',
                        title: '交接时间',
                        key: 'handoverTimePlan',
                        sortable: "custom",
                    },
                    {   
                        align: 'left',
                        title: '任务进度',
                        render: (h, params) => {
                            return h('div', [
                                h('Progress',{
                                    props: {
                                        percent: params.row.total  ? Math.round(params.row.finish/params.row.total*100) : 0,
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                },[ params.row.total  ? Math.round(params.row.finish/params.row.total*100)+'%' : 'N/A']),
                                h('Tooltip', {
                                    props: {
                                        content: params.row.total  ? (params.row.finish ? params.row.finish : '0' + '/' + params.row.total) : 'N/A',
                                        transfer: true,
                                        placement: 'top-start',
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display:'inline-block',
                                        width: '24px',
                                        height: '20px',
                                        position: 'absolute',
                                        right: '36px',
                                        top: '12px',
                                        cursor: 'pointer',
                                    },
                                }),
                                
                            ]);
                        }
                    },
                ],
                data1: [],
                showCompanyTags:false, //是否显示分公司标签
                showGroupTags:false, //是否显示规划组标签
            }   
        },
        computed: {
            ...mapState(['userInfo']),
//		    ...mapGetters('',['isAdmin', 'isCeo', 'isBranchOfficeLeader', 'isPlanLeaser']),
		    isAdmin(){
		    	return this.userInfo.admin;
		    },
		    isCeo(){
		    	return this.userInfo.roleMap[this.pid]=='701' || this.userInfo.roleMap['0'] == '12'
		    },
		    isBranchOfficeLeader(){
		    	return this.userInfo.roleMap[this.pid]=='702'
		    },
		    isPlanLeaser(){
		    	return this.userInfo.roleMap[this.pid]=='704'
		    }
        },
        components: {
            caseBarStatus,
            CaseBarFilter,
            caseBar,
            tableGsx,
            vSelect
        },
        created(){
//      	window.w=this.$store;
//      	console.log(this.mods)
        },
        mounted() {
           /*  waitUntil(()=>{
            	console.log(this.userInfo);
            	if(this.userInfo.id){
            		return true;
            	}
            },()=>{
            	this.getTableSelect('pl_service_status_status,pl_service_status_phase');
            	this.loadData();
            },()=>{console.log('失败')}) */
            this.getTableSelect('pl_service_status_status,pl_service_status_phase');
        },

        methods: {
            changeShowSearchArea(obj){
                this.showSearchArea = obj.show
            },
            changePhase(val){
                console.log(val)
                this.apply = val.id
                this.pageNo  = 1
                this.getPlanServiceTree()
            },
            changeSubType(val){
                console.log(val)
                this.subType = val.id
                this.pageNo  = 1
                this.getPlanServiceTree()
            },
            loadData(){
                /* 
                    总裁CEO或者管理员-显示分公司标签、规划组标签，
                    并开始加载所有分公司的数据,
                    在加载分公司后加载第一个分公司的规划组，
                    再加载所有规划组的顾问，加载学生。 
                */
               
                if(this.isCeo||this.isAdmin) {
                    this.showCompanyTags = true
                    this.showGroupTags =  true
                    this.getControlledList()
                } 

                /* 
                    分公司领导- 显示规划组标签
                    加载分公司所属规划组，
                    并加载全部顾问，加载学生
                */
                if(this.isBranchOfficeLeader) {
                    this.showGroupTags =  true
                    if(!this.showCompanyTags){
                        this.getGroupLeaderList()
                    }
                } 
                
                /* 
                    如果只是规划组组长，
                    则加载所属规划组的顾问，加载学生
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
                        let resArray = res.data.data
                        resArray.unshift({
                            id:'',
                            companyName:'全部'
                        })
                        this.controlledList = resArray
                        this.companyId = resArray[0].id //加载第一个分公司的规划组
                        this.getGroupLeaderList()
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
            //获取全部规划组 或者切换分公司时调用
            getGroupLeaderList() {
                if((!this.showCompanyTags) && this.showGroupTags) { //如果是分公司leader。则获取当前用户所属公司的规划组
                    this.companyId = this.userInfo.companyId
                }
                let obj = {
                    officeId: this.companyId,
                    menuId: this.pid //'401' //规划模块
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
                        this.planGroupList = resArray
                        this.planGroupId = resArray[0].id
                        this.getTeacherList()
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
            //获取中方顾问
            getTeacherList() {
                let obj = {
                    menuId: this.pid,
                    subType: this.subType,
                    serviceStatus: this.serviceStatus,
                    officeId: this.companyId,
                    groupId: this.planGroupId,
                    apply: this.apply
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
                        this.getPlanServiceTree()
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
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
            //切换规划组
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
                this.getPlanServiceTree()
            },
            //列表修改了交接时间数据后，页面修改状态
            reloadStatus(editObj){
                /* let datas = this.data1
                console.log(datas)
                datas.forEach((item,index) => {
                    if(item.id == editObj.planId){
                        item.status = editObj.status
                    }
                })
                this.data1 = datas */
                this.getPlanServiceTree()
            },
            //获取学生列表
            getPlanServiceTree() {
                this.loading = true
                let obj = {
                    subType: this.subType,
                    apply: this.apply, //本科高中研究生
                    serviceStatus: this.serviceStatus, //
                    pageNo: this.pageNo, //页码
                    pageSize: this.pageSize, //每页个数
                    keyword: this.compact, //名称，搜索关键字
                    // receivedStart: this.beginDate, //开始时间
                    // receivedEnd: this.endDate, //结束时间
                    startApplyTime: this.startApplyTime, //申请开始年份
                    endApplyTime: this.endApplyTime, //申请结束年份
                    searchTags: this.tags, //标签
                    orderBy: this.sort, //排序
                    phase: this.phase, //表格内服务阶段筛选
                    status: this.status, //表格内规划状态筛选
                    menuId: this.pid
                }
                if(this.serviceStatus !=0){
                    obj.companyId = this.companyId //归属公司
                    obj.groupId = this.planGroupId //所属服务组
                    obj.teacherId = this.teacherId //规划老师
                }
                plServiceGroup.listPage(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.data1 = res.data.data.list
                        this.count = res.data.data.count//总学生数
                        this.pageCount =  res.data.data.pageCount//总页数
                    }
                })
                .catch(errors.call(this))
                .finally(() => {this.loading = false});
            },
            //搜索输入框。回车或者点击搜索
            textChange() {
                console.log("this.compact = " + this.compact)
                this.pageNo  = 1
                this.getPlanServiceTree()
            },

            datafunc() {
               return new Promise((resolve, reject) => {});
            },
            //每页个数切换
            onPageSizeChange(val){
                this.pageNo = 1
                this.pageSize = val
                this.getPlanServiceTree()
            },
            //分页
            onPageChange(val) {
                this.pageNo = val
                this.getPlanServiceTree()
            },
            //排序
            sortChange(sortObj) {
                this.sort =  "createDate " + sortObj.order
                this.pageNo  = 1
                this.getPlanServiceTree()
            },
            //筛选标签变化
            tagListChange(tags) {
                this.tags = tags
                this.pageNo  = 1
                this.getPlanServiceTree()
            },
            beginDateChange(date) {
                this.beginDate = date
                this.pageNo  = 1
                this.getPlanServiceTree()
            },
            endDateChange(date) {
                this.endDate = date
                this.pageNo  = 1
                this.getPlanServiceTree()
            },
            beginYearChange(date) {
                this.startApplyTime = date
                this.pageNo  = 1
                this.getPlanServiceTree()
            },
            endYearChange(date) {
                this.endApplyTime = date
                this.pageNo  = 1
                this.getPlanServiceTree()
            },
            //获取表格内筛选下拉菜单内容
            getTableSelect(type) {
                let obj = {
                    types: type
                }
                sys.batchListData(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                     /*    this.$set(this.columns1[1],'filters',res.data.data.pl_service_status_phase) */
                        this.$set(this.columns1[4],'filters',res.data.data.pl_service_status_status)
                        this.getPlanServiceTree()
                   }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
            //切换表格内筛选内容触发事件
            filterChange (filterObj) {
                console.log(filterObj.key + '   ' + filterObj.val)
                this[filterObj.key] = filterObj.val
                this.pageNo = 1
                this.getPlanServiceTree()
            }
        },
        watch: {
            //规划状态
            serviceStatus (newValue, oldValue) {
                this.data1 = []
                this.loading = true
                this.numCompany = 0
                this.numGroup = 0
                this.numTeacher = 0 
                if(newValue != 0){
                    this.subType = 3
                    this.loadData()
                } else {
                    this.subType = 2
                    this.pageNo  = 1
                    this.getPlanServiceTree()
                }
                if(newValue == 0 ){
                    if(this.columns1.length == 8) {
                        this.columns1.splice(6,1)
                    } 
                } else {
                    if(this.columns1.length == 7) {
                        this.columns1.splice(6,0, {
                            align: 'center',
                            title: '顾问名称',
                            key: 'teaName'
                        })
                    } 
                }
            },
            //表格内筛选监听 
            phase (newValue, oldValue) {
                this.pageNo  = 1
                this.getPlanServiceTree()
            },
             //表格内筛选监听 
            status (newValue, oldValue) {
                this.pageNo  = 1
                this.getPlanServiceTree()
            }
        }
    }
</script>


