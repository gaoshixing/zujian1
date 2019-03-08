<style lang="less">
    .contentMyStudent{
        .page {
			margin-top: 20px;
			text-align: center;
        }
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
<div class="contentMyStudent">
    <Tabs v-model="tabSelectedType" @on-click="changeTab">
        <TabPane :label="tabLabels[item.type]" :name="item.type" v-for="(item, index) in studentTypeList" :key="item.type"></TabPane>
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
	<case-bar-filter
        rightType='pl_service_group'
        :menuId="pId"
        :from="2" 
        modelName='文书管理'
        @tagListChange="tagListChange"
    ></case-bar-filter>
	<!-- <case-bar-status
		:tagList ='statusChooseList'
		title="完成状态"
		@addAcitve='chooseStatus'>
	</case-bar-status> -->
	<case-bar-status
		:tagList ='serviceStatuList'
		title="状态"
		@addAcitve='changeServiceStatu'>
	</case-bar-status>
    <div class="case-manage-timePicker1">
        <div class="tagTitle">
            <span>入学年份：</span>
        </div>
        <DatePicker type="year" :value="new Date().getFullYear() + 1 + ''" placeholder="开始年份"  style="width: 120px" @on-change="beginYearChange"></DatePicker>
        <div class="case-manage-line-div"></div>
        <DatePicker type="year" :value="new Date().getFullYear() + 1 + ''" placeholder="结束年份"  style="width: 120px" @on-change="endYearChange"></DatePicker>
    </div>
	<!-- <case-bar-date
		:tagList ='dateChooseList'
		title="接案时间"
		@addAcitve='chooseDate'
        @beginDateChange="beginDateChange"
        @endDateChange="endDateChange">
	</case-bar-date> -->
    </div>
    <table-main
        :loading="loading"
        @reloadData="reloadData"
        :studentType="tabSelectedType"
        :tableData="tableData" 
        :historyCheckResult="historyCheckResult"
        :pId="pId"
        @filterChange="filterChange"
        @updateColunmsCheck="updateColunmsCheck"
        @reloadStatus="reloadStatus"
        :studentCounts="count"
        from="myStudent">
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
    import caseBarDate from '../../modules/caseBarDate'
    import caseBarStatus from '../../modules/caseBarStatus'

    import { mapState, mapGetters } from 'vuex'

    import valid, { errors, common, sys, docEssayTask} from "../../libs/request";

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
                serviceStatuList:[{"id":"","name":"不限"},{"id":"1","name":"未接案"},{"id":"4","name":"服务中"},{"id":"5","name":"已结案"}],
                statusChooseList:[{"id":"","name":"不限"},{"id":"1","name":"未完成"},{"id":"0","name":"已完成"}],
                dateChooseList:[{"id":"0","name":"至今"},{"id":"1","name":"半年内"},{"id":"2","name":"一年内"}],
                tagList1: ['不限', '+ 筛选'],
                tabValue: '3', //3本科 2研究生  1中学
                searchKeyWord: '', //搜索关键字
                chooseTags:[],//列表筛选项
                historyCheckResult : [],  //绑定到列表组件的历史显示字段
                historyCheckResultUG : [], //本科历史显示字段
                historyCheckResultPG :  [], //研究生历史显示字段
                historyCheckResultHS : [],  //中学历史显示字段
                isMe: 1,
                type: '', //列表内筛选名
                status: '', //列表内筛选值
                isFinish: '',//完成状态
                serviceStatus: '', //服务状态
                startApplyTime:new Date().getFullYear() + 1,
                endApplyTime: new Date().getFullYear() + 1, 
            }
		},
		components: { 
			expandRow,
			CaseBarFilter,
			vSelect,
            caseBarDate,
            caseBarStatus,
            tableMain
        },
        mounted() {
            this.loadStydentType() 
        },
		methods: {
            beginYearChange(date) {
                this.startApplyTime = date
                this.pageNo  = 1
                this.getMyStudentList(this.tabSelectedType)
            },
            endYearChange(date) {
                this.endApplyTime = date
                this.pageNo  = 1
                this.getMyStudentList(this.tabSelectedType)
            },
            reloadData(){
                this.getMyStudentList(this.tabSelectedType)
            },
            changeShowSearchArea(obj){
                this.showSearchArea = obj.show
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
                this.getMyStudentList(this.tabSelectedType)
            },
            reloadStatus(){
                this.getMyStudentList(this.tabSelectedType)
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
                if(this['historyCheckResult' + studentType].length > 0 ){
                    this.historyCheckResult = this['historyCheckResult' + studentType]
                    //加载学生数据
                    this.getMyStudentList(studentType)
                } else {
                    let obj = {
                        type: studentType
                    }
                    docEssayTask.listShowTile(obj).then(valid.call(this))
                    .then(res => {
                        if(res.ok) {
                            this.historyCheckResult = res.data.data
                            this['historyCheckResult' + studentType] = res.data.data
                            //加载历史显示字段
                            this.getMyStudentList(studentType)
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
                }
            },
            //加载学生类别及完成文书数
            loadStydentType(){
                let obj = {
                    isMe: 1
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
                        //加载历史显示字段
                        this.loadHistoryColunms(this.tabSelectedType)
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
            beginDateChange(val) {
                console.log(val)
                console.log(new Date(val).getTime())
                this.pageNo = 1
                this.startTime = val
                this.getMyStudentList(this.tabSelectedType)
            },
            endDateChange(val) {
                console.log(val)
                console.log(new Date(val).getTime())
                this.endTime = val
                this.pageNo = 1
                this.getMyStudentList(this.tabSelectedType)
            },
            //完成状态选择
            chooseStatus(val) {
                this.isFinish = val.id
                this.pageNo  = 1
                this.getMyStudentList(this.tabSelectedType)
            },
            //服务状态选择
            changeServiceStatu(val) {
                this.serviceStatus = val.id
                this.pageNo  = 1
                this.getMyStudentList(this.tabSelectedType)
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
                            this.getMyStudentList(this.tabSelectedType)
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
            //获取学生列表
            getMyStudentList(stuType) {
                this.loading = true
                let obj = {
                    startApplyTime: this.startApplyTime,
                    endApplyTime: this.endApplyTime, 
                    subType: 2,
                    isMe: this.isMe,
                    isFinish: this.isFinish,
                    serviceStatus: this.serviceStatus,
                    name: this.searchKeyWord,
                    pageNo: this.pageNo, //页码
                    pageSize: this.pageSize, //每页个数
                 /*    receivedStart: this.startTime, //开始时间
                    receivedEnd: this.endTime, //结束时间 */
                    tags: this.tags.length > 0 ? this.tags : null  , //标签
                }
                if(typeof this.status != 'undefined'){
                    obj.type = this.type, //表格内筛选类型
                    obj.status = this.status //表格内筛选值
                }
                  
                //加载数据
                docEssayTask['list' + stuType](obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        res.data.data.list.map((item, index)=>{
                            if(item.status == 'assigned'){ //未接案数据不可展开
                                item._disableExpand = true
                            }
                        })
                        this.tableData = res.data.data.list
                        this.count = res.data.data.count//总学生数
                        this.pageCount =  res.data.data.pageCount//总页数
                    }
                })
                .catch(errors.call(this))
                .finally(() => {this.loading = false});
            },
            filterChange(obj){
                console.log(obj)
                this.type = obj.type
                this.status = obj.status
                this.pageNo = 1
                this.getMyStudentList(this.tabSelectedType)
            },
            datafunc(){
                return new Promise((resolve, reject) => {});
            },
            addAcitve(){

            },
             //每页个数切换
            onPageSizeChange(val){
                //this.pageNo = 1
                this.pageSize = val
                this.getMyStudentList(this.tabSelectedType)
            },
            //分页
            onPageChange(val) {
                this.pageNo = val
                this.getMyStudentList(this.tabSelectedType)
            },
            //搜索输入框。回车或者点击搜索
            textChange() {
                console.log("this.searchKeyWord = " + this.searchKeyWord)
                this.pageNo  = 1
                this.getMyStudentList(this.tabSelectedType)
            },
            //切换学生类别
			changeTab(val){
                this.loading = true
                this.tableData = []
                console.log(val)
                //修改TAB样式
                this.tabSelectedType = val
                for(let key in this.getMyTabStyle){
                    if(key ==  this.tabSelectedType){
                        this.getMyTabStyle[key] = 'myBadge'
                    } else {
                        this.getMyTabStyle[key] = 'myBadge myBadgeBlack'
                    }
                }
                //加载数据
                this.loadHistoryColunms(val)
            },
        }
    }
</script>