<style lang = 'less' scoped>
    .myStudentsGsx{
        position: relative;
        .case-manage-timePicker {
            margin-top: 10px;
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
        .time{
            .ivu-input-icon {
                height: 26px;
                line-height: 26px;
                font-style: normal;
                color: #44bcb7;
                font-size: 16px;
            }
            .ivu-input {
                height: 26px;
                width: 118px;
            }
        } 
        .dialogContent {
            .cp {
                .cspan {
                    display: inline-block;
                    width: 85px;
                    text-align: right;
                }
            }
        }
        .page-box{
            margin-top: 20px;
			text-align: center;
        }
        .tabsBox{
            position: relative;
            /* padding-top: 10px; */
        }
        /* .datePackerBox{
            position: absolute;right: 0;bottom: 11px;
        } */
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
    }
</style>
<template>
    <div class="myStudentsGsx">
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
        <div class="case-manage-timePicker">
            <div class="tagTitle">
                <span>入学年份：</span>
            </div>
            <DatePicker type="year" :value="new Date().getFullYear() + ''" placeholder="开始年份"  style="width: 120px" @on-change="beginYearChange"></DatePicker>
            <div class="case-manage-line-div"></div>
            <DatePicker type="year" :value="new Date().getFullYear() + 4 + ''" placeholder="结束年份"  style="width: 120px" @on-change="endYearChange"></DatePicker>
        </div>
        <!-- <div class="case-manage-timePicker">
            <div class="tagTitle">
                <span>分配时间：</span>
            </div>
            <DatePicker
                type="date"
                placeholder="分配开始时间"
                style="width: 118px;height:26px;"
                class="time"
                @on-change="beginDateChange">
            </DatePicker>
            <div class="case-manage-line-div"></div>
            <DatePicker
                type="date"
                placeholder="分配结束时间"
                class="time"
                style="width: 118px;height:26px;"
                @on-change="endDateChange">
            </DatePicker>
        </div> -->
        </div>
        <div>
            <table-gsx
                :loading="loading"
                :pid="pid"
                @reloadStatus="reloadStatus"
                tableTitle="我的学生数据-列表"
                :studentCounts="count"
                :columns="columns1"
                :data="data1"
                :top="top"
                :isShowCaseM="isShowCaseM"
                @toSortChange="sortChange"
                @filterChange="filterChange"
                >
            </table-gsx>
        </div>
        <div class="page-box">
            <Page 
                v-if="pageCount>1"
                show-elevator 
                show-sizer 
                show-total 
                :page-size="pageSize" 
                :current="pageNo" 
                :total="count"
                @on-change="onPageChange"
                @on-page-size-change="onPageSizeChange">
            </Page>
		</div>
    </div>
</template>

<script>

    import CaseBarFilter from '@public/modules/caseBarFilter';
    import tableGsx from '../../modules/tableGsx'
    import vSelect from '@public/modules/vSelect'
    import caseBarStatus from '../../modules/caseBarStatus'

    import valid, { errors, plServiceGroup, sys, common } from "../../libs/request";
    import {statusTransForTeacher} from "../../libs/statusTrans"

    export default {
        props:{
            pid: {
				type: String
            }
        },
        data() {
            return {
                loading: true,
                startApplyTime: new Date().getFullYear(),
                endApplyTime: new Date().getFullYear() + 4,
                showSearchArea: true,
                hasShowSearchArea: true,
                serviceStatus:'',
                phaseList:[{"id":"","name":"不限"},{"id":"1","name":"未接案"},{"id":"2","name":"未交接"},{"id":"3","name":"已交接"}],
                label0: '中学',
                label1: '本科',
                label2: '研究生',
                isShowCaseM: false,
                sort:'',
                top: 45,
                count: 0, //总学生数
                pageCount: 1, //总页数
                pageNo: 1,//当前页码
                pageSize: 10, //页面数据个数
                tags: [], //所选标签
                tabValue: '1',
                compact: '',
                beginDate: '',
                endDate: '',
                columns1: [
                   /*  {
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
                                                        studentId: params.row.stuId,
                                                        menuId: this.pid
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
                                ),
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
                            console.log("value = " + value + " row = " + row)
                        },
                        render: (h, params) => {
                            return h('div', [
                                h('span', statusTransForTeacher(params.row.status))
                            ]);
                        }
                    },
                    {
                        align: 'center',
                        title: '交接时间',
                        key: 'handoverTimePlan',
                        sortable: true
                    },
                    {   
                        align: 'left',
                        title: '任务进度',
                        render: (h, params) => {
                            return h('div', [
                                h('Progress', {
                                    props: {
                                        //percent: params.row.age,
                                        percent:  params.row.total ? Math.round(params.row.finish/params.row.total*100) : 0
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                },[params.row.total ? Math.round(params.row.finish/params.row.total*100)+'%' : 'N/A']),
                                h('Tooltip', {
                                    props: {
                                        content: params.row.total ? (params.row.finish? params.row.finish : '0' + '/' + params.row.total) : 'N/A',
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
                    }
                ],
                data1: []
            };
        },

        components: {
            caseBarStatus,
            CaseBarFilter,
            tableGsx,
            vSelect
        },

        mounted() {
            this.getTableSelect('pl_service_status_status,pl_service_status_phase');
            this.getMyStudentList()
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
            changePhase(val){
                this.serviceStatus = val.id
                this.pageNo  = 1
                this.getMyStudentList()
            },
            reloadStatus(){
                this.getMyStudentList()
            },
            phaseTrans(val){
                let obj = {
                    plan:'规划',
                    choiceschool:'选校',
                    essay:'文书',
                    apply:'申请'
                }
                return obj[val] || val;
            },
            textChange: function(val) {
                console.log(this.compact);
                this.pageNo  = 1
                this.getMyStudentList()
			},

            datafunc(word) {
                return new Promise((resolve, reject) => {});
            },

          /*   beginDateChange(date) {
                this.beginDate = date
                this.pageNo  = 1
                this.getMyStudentList()
            },
            endDateChange(date) {
                this.endDate = date
                this.pageNo  = 1
                this.getMyStudentList()
            }, */
            //每页个数切换
            onPageSizeChange(val){
                this.pageNo = 1
                this.pageSize = val
                this.getMyStudentList()
            },
            //分页
            onPageChange(val) {
                this.pageNo = val
                this.getMyStudentList()
            },
             //排序
            sortChange(sortObj) {
                this.sort =  "createDate " + sortObj.order
                this.pageNo  = 1
                this.getMyStudentList()
            },
            //筛选标签变化
            tagListChange(tags) {
                this.tags = tags
                this.pageNo  = 1
                this.getMyStudentList()
            },
            //获取表格内筛选下拉菜单内容
            getTableSelect(type) {
                let obj = {
                    type: type
                }
                sys.batchListData(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        let fliterRes = res.data.data.pl_service_status_status.filter((item) => {
                            return item.value != 'unreceive' //没有未分配的状态，过滤掉
                        })
                        fliterRes.forEach((item,index) => {
                            if(item.value == 'assigned') {
                                item.label = '未接案'
                            }
                        })
                        this.$set(this.columns1[4],'filters',fliterRes)
     /*                    this.$set(this.columns1[1],'filters',res.data.data.pl_service_status_phase) */
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },

             //获取学生列表
            getMyStudentList() {
                this.loading = true
                let obj = {
                    subType: 3,
                    apply: this.tabValue,  //类别
                    serviceStatus: this.serviceStatus,//状态
                    pageNo: this.pageNo, //页码
                    pageSize: this.pageSize, //每页个数
                    keyword: this.compact, //名称，搜索关键字
                   /*  receivedStart: this.beginDate, //开始时间
                    receivedEnd: this.endDate, //结束时间 */
                    startApplyTime: this.startApplyTime, //申请开始年份
                    endApplyTime: this.endApplyTime, //申请结束年份
                    searchTags: this.tags, //标签
                    orderBy: this.sort, //排序
                    phase: this.phase, //表格内服务阶段筛选
                    status: this.status //表格内规划状态筛选
                }
                plServiceGroup.getMyStudent(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.data1 = res.data.data.list,
                        this.count = res.data.data.count, //总学生数
                        this.pageCount =  res.data.data.pageCount //总页数
                    }
                })
                .catch(errors.call(this))
                .finally(() => { this.loading = false});
            },

            //切换表格内筛选内容触发事件
            filterChange (filterObj) {
                this[filterObj.key] = filterObj.val
                this.pageNo = 1
                this.getMyStudentList()
            }
        },
        watch: {
            //规划状态
            tabValue (newValue, oldValue) {
                this.data1 = []
                this.loading = true
                this.pageNo  = 1
                this.getMyStudentList()
            },
            //表格内筛选监听 
            phase (newValue, oldValue) {
                this.pageNo  = 1
                this.getMyStudentList()
            },
             //表格内筛选监听 
            status (newValue, oldValue) {
                this.pageNo  = 1
                this.getMyStudentList()
            }
        }
    }
</script>