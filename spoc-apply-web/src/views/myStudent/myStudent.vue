<style lang="less">
    .applyMyStudent{
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
        .page {
			text-align: center;
			margin-top: 20px;
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
<div class="applyMyStudent">
    <Tabs v-model="tabSelectedType" @on-click="changeTab">
        <TabPane label="本科" name="UG"></TabPane>
        <TabPane label="研究生" name="PG"></TabPane>
        <TabPane label="高中" name="HS"></TabPane>
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
        modelName='申请管理'
        :menuId="pId"
        :from="2" 
        @tagListChange="tagListChange"
    ></case-bar-filter>
    <case-bar-status
		:tagList ='serviceStatuList'
		title="状态"
		@addAcitve='changeServiceStatu'>
	</case-bar-status>
<!--     <case-bar-status
		:tagList ='isFinishList'
		title="完成状态"
		@addAcitve='chooseIsFinish'>
	</case-bar-status> -->
	<!-- <case-bar-date
		title="接案时间"
        beginPlaceholder="接案开始时间"
		endPlaceholder="接案结束时间"
        @beginDateChange="beginDateChange"
        @endDateChange="endDateChange">
	</case-bar-date> -->
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
        @filterChange="filterChange"
        @reloadStatus="reloadStatus"
        :studentCounts="count"
        :studentType="tabSelectedType"
        :pl_service_status_status="pl_service_status_status"
        :xx_result_type="xx_result_type"
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

    import valid, { errors, common, sys, aplApplyTask} from "../../libs/request";

    export default {
        props:{
            pId: {
                required: true
            }
        },
        data () {
            return {
                startApplyTime: '',
                endApplyTime: '',
                showSearchArea: true,
                hasShowSearchArea: true,
                serviceStatusApply: '', //服务状态筛选  细粒度
                tabSelectedType: 'UG', 
                tableData:[],
                startTime: '',
                endTime: '',
                count: 0, //总学生数
                pageCount: 1, //总页数
                pageNo: 1,//当前页码
                pageSize: 10, //页面数据个数
                tags: [], //所选标签
                serviceStatuList:[{"id":"","name":"不限"},{"id":"1","name":"未接案"},{"id":"4","name":"申请中"},{"id":"5","name":"已结案"}],
                isFinishList:[{"id":"","name":"不限"},{"id":"0","name":"未结案"},{"id":"1","name":"已结案"}],
                tagList1: ['不限', '+ 筛选'],
                searchKeyWord: '', //搜索关键字
                chooseTags:[],//列表筛选项
                serviceStatus: '', //服务状态筛选  粗粒度
                resourceStatus: '', //准备材料筛选
                infoStatus: '', //申请信息状态筛选
                resultStatus: '', //申请结果筛选
                isFinish: '',//完成状态
                pl_service_status_status:[],
                xx_result_type:[]
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
            this.getTableSelect() 
        },
		methods: {
            beginYearChange(date) {
                this.startApplyTime = date
                this.pageNo  = 1
                this.getMyStudentList()
            },
            endYearChange(date) {
                this.endApplyTime = date
                this.pageNo  = 1
                this.getMyStudentList()
            },
            changeShowSearchArea(obj){
                this.showSearchArea = obj.show
            },
            //获取表格内筛选下拉菜单内容，并加载表格列配置信息 
			getTableSelect() {
				let obj = {
					//服务状态,确认申请结果
                    types: 'pl_service_status_status_apply,xx_result_type'
				}
				sys.batchListData(obj).then(valid.call(this))
				.then(res => {
					if(res.ok) {
                        this.pl_service_status_status = res.data.data.pl_service_status_status_apply
                        this.xx_result_type = res.data.data.xx_result_type
                        this.getMyStudentList()
					}
				})
				.catch(errors.call(this))
                .finally(() => {});
			},
            //筛选标签变化
            tagListChange(tags) {
              /*   let args= [];
                tags.forEach((item, index)=>{
                    let newArgs = []
                    item.childTags.forEach((childrenItem,childIndex)=>{
                        newArgs.push(childrenItem.id)
                    })
                    args.push(newArgs)
                }) */
                this.tags = tags
                this.pageNo  = 1
                this.getMyStudentList()
            },
            reloadStatus(){
                this.getMyStudentList()
            },
            beginDateChange(val) {
                this.pageNo = 1
                this.startTime = val
                this.getMyStudentList()
            },
            endDateChange(val) {
                this.endTime = val
                this.pageNo = 1
                this.getMyStudentList()
            },
            //切换申请阶段
            chooseIsFinish(val) {
                this.isFinish = val.id
                this.pageNo  = 1
                this.getMyStudentList()
            },
            //服务状态选择
            changeServiceStatu(val) {
                this.serviceStatus = val.id
                this.pageNo  = 1
                this.getMyStudentList()
            },
            //获取学生列表
            getMyStudentList() {
                let obj = {
                    startApplyTime: this.startApplyTime,
                    endApplyTime: this.endApplyTime, 
                    subType: 2,
                    pageNo: this.pageNo, //页码
                    pageSize: this.pageSize, //每页个数
                    applyPhase: this.tabSelectedType  //本科、研究生、高中
                }
              /*   if(this.startTime){
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
                if(this.serviceStatus != '') {
                    obj.serviceStatus = this.serviceStatus 
                }
                if(typeof this.serviceStatusApply != 'undefined' && this.serviceStatusApply !== '') {
                    obj.serviceStatusApply = this.serviceStatusApply 
                }
                if(typeof this.resourceStatus != 'undefined' && this.resourceStatus !== '') {
                    obj.resourceStatus = this.resourceStatus 
                }
                if(typeof this.infoStatus != 'undefined' && this.infoStatus !== '') {
                    obj.infoStatus = this.infoStatus 
                }
                if(typeof this.resultStatus != 'undefined' && this.resultStatus !== '') {
                    obj.resultStatus = this.resultStatus 
                }
                 
                //加载数据
                aplApplyTask.listCurrentUserPage(obj).then(valid.call(this))
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
                .finally(() => {});
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
                this.getMyStudentList()
            },
            datafunc(){
                return new Promise((resolve, reject) => {});
            },
            //每页个数切换
            onPageSizeChange(val){
                //this.pageNo = 1
                this.pageSize = val
                this.getMyStudentList()
            },
            //分页
            onPageChange(val) {
                this.pageNo = val
                this.getMyStudentList()
            },
            //搜索输入框。回车或者点击搜索
            textChange() {
                this.pageNo  = 1
                this.getMyStudentList()
            },
            //切换学生类别
			changeTab(val){
                this.pageNo  = 1
                this.getMyStudentList()
            },
        }
    }
</script>