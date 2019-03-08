<style lang="less">
.contractDetail{
    border-top: 1px solid #e0e0e0;
    margin-bottom: 88px;
    .ivu-table th {
        background: #fff;
    }
    .ivu-table-wrapper {
        border: none;
    }
    .ivu-table:after {
        display: none;
    }
    .filter{
        margin-bottom: 4px;
        .titleBar{
            span{
                margin: 4px;
                &:first-child{
                    float: left;text-align: right !important;width: 80px !important;
                    margin: 0;line-height: 30px;
                }
            }
        }
    }
    .search-data{
        position: relative;padding-left: 95px;zoom: 1;width: 860px;
        &:after,&::before{
            content: '';display: table;clear: both;visibility: hidden;font-size: 0;height: 0;
        }
        .title{
            width: 80px;position: absolute;left: 0;top: 0;line-height: 30px;
            color: #b8b8b8;text-align: right;
        }
        li,.more{
            float: left;padding: 5px 12px;cursor: pointer;margin:3px;line-height: 1;
            &.active{
                background: #44bcb6;color: #fff;
            }
        }
    }
    .case-manage-timePicker {
        float: left;
        .case-manage-line-div {
            display: inline-block;
            width: 10px;
            height: 2px;
            background-color: #44bcb7
        }
    }
    .ivu-date-picker.error{
        .ivu-input{
            border-color: #f00;
        }
    }
    .count{
        position: relative;top: 6px;
        font-size: 14px;color: #222;
        span{
            font-size: 18px;color: #44bcb7;
        }
    }
    .btn-lists-div{
        @h:40px;
        @radius: 1px;
        position: relative;
        height: @h;line-height: @h;padding-left: 21px;margin-top: 22px;
        border: 1px solid #e0e0e0;border-radius: @radius;
        font-size: 14px;color: #666;
        background: #fafafa;
        &:before{
            @border-width: -1px;
            content: "";
            position: absolute;left: @border-width;top: @border-width;bottom: @border-width;
            width: 5px;
            border-top-left-radius: @radius;
            border-bottom-left-radius: @radius;
            background: #44bcb7;
        }
    }
    .btn-lists{
        float: right;
        .ivu-btn{
            float: left;padding-top: 3px;padding-bottom: 3px;
            margin-right: 19px;margin-top: 4px;font-size: 14px;
        }
    }
    .page-box{
        margin-top: 20px;
        text-align: center;
        margin-bottom: 140px;
    }

    .contractDetailCharts {
		overflow: hidden;
		.echartbox {
			width: 100%;
			float: left;
		}
	}
}
</style>

<template>
    <div class="contractDetail">

        <BtnAndTime
			types="date"
			title="统计时间"
			:btnList="datalistss"
			@onclickChoseTags="onclickChoseTags"
			@getTargetDate="getTargetDate">
		</BtnAndTime>

        <div class="contractDetailCharts">
            <echart-item res="bar" :data="eOption" :mstyle="estyle" v-if="echartsShow" class="echartbox"></echart-item>
        </div>

        <LargeTable
            types="sale"
            :pId="pid"
            :total='count'
            :showTags=false
            fixedHeader="saleName"
            :loading="loading"
            :checkBoxList="largeTable.checkBoxList"
            :tableColumnsChecked="largeTable.tableChecked"
            :table2ColumnList="largeTable.tableColumnList"
            :tableData2="largeTable.tableData"
            @onSortChange="onSortChange"
            @onFilterChange="onFilterChange"
            @getchangedCheckedItem="getchangedCheckedItem"
            @onclickSearchInfos="onclickSearchInfos"
            @onclickToChoseTags="onclickToChoseTags"
        ></LargeTable>

        <div class="page-box" v-if="count > 10">
            <Page  
                show-total  
                show-elevator 
                show-sizer 
                :total="count"
                :current="pageNo"
                v-if="count > 10"
                :page-size="pageSize" 
                @on-page-size-change="pageSizeChange"
                @on-change="onPageChange"></Page>
        </div>
    </div>
</template>

<script>
let getEchartOption = function(data1, data2) {
				let self = this;
				let obj =  {
					tooltip : {
						trigger: 'axis'
					},
					legend: {
						data:['签单量','签单金额(万元)'],
        				top: '20px'
					},
					calculable : true,
					xAxis : [
						{
							type : 'category',
							data : ['已签(百度类)','已签(其他来源)','待签']
						}
					],
					yAxis : [
						{
							type : 'value'
						}
					],
					series : [
						{
							name:'签单量',
							type:'bar',
                            data: data1,
                            barWidth: '40px',
                            itemStyle:{
                                color: '#5b9bd5'
                            }
						},
						{
							name:'签单金额(万元)',
							type:'bar',
                            data: data2,
                            barWidth: '40px',
                            itemStyle:{
                                color: '#ed7d31'
                            }
						}
					]
				};
				return obj;
			}

import CaseBarFilter from '@public/modules/caseBarFilter';
import valid, {errors, common, sys, crmCustomerPub, crmStatistics} from "../../../libs/request";
import echartItem from "../../pond/echartItem.vue";
import { mapMutations, mapGetters, } from 'vuex';
import BtnAndTime from '../../../modules/btnAndTime';
import LargeTable from '../../../modules/largeTable';
import { waitUntil, getTimeInterval, } from '@public/libs/util';
import Sales from '../../../schema/sales';

export default {
    props: {
        pid: {
            type: String,
            required: true,
        },
    },
    data(){
        return {
            eOption: {},
            echartsShow: false,
            estyle: {
                width: '100%',
                height: '224px'
            },
            loading: false,
            showModal: false,
            tags: [],
            count: 0,
            pageNo: 1,
            pageCount: 0,
            pageSize: 10,
            endDataError: false,
            hisOfficeId: '', //历史跟进人
            source: '', //来源
            sort:0, //排序
            orderBy:'' ,//排序
            now: '',//今日
            startTime: '',
            endTime: '',
            datalistss: [
                {
                    title: '今天',
                    type: 'date',
                    ms: 0,
                },
                {
                    title: '最近7天',
                    type: 'date',
                    ms: -6,
                },
                {
                    title: '最近30天',
                    type: 'date',
                    ms: -29,
                },
            ],
            largeTable: {
                tableData: [],
                checkBoxList: [],
                tableChecked: [],
                tableColumnList: Sales.salesForm,
            },
        };
    },
    computed: {
        ...mapGetters('crm', ['isBranchOfficeLeader', 'isSalerLeader', ]),
    },
    components: {
        CaseBarFilter,
        'echart-item': echartItem,
        BtnAndTime,
        LargeTable,
    },
    created() {
        new Sales(this);
        this.getShowTitle();
    },
    mounted(){
        this.updateLoadingStatus({isLoading:true});
        this.getNow()
        /*
        * 权限控制 分总 销总 无法查看分公司的数据
        */
        waitUntil(() => {
            return !!(this.isBranchOfficeLeader || this.isSalerLeader);
        }, () => {
            if (this.isBranchOfficeLeader || this.isSalerLeader) {
                _this.$delete(this.largeTable.tableColumnList, 'office');
            }
        });
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        onPageChange(page) {
            this.pageNo = page
            this.getLargeTableData();
        },
        pageSizeChange(size){
            this.pageSize = size
            this.getLargeTableData();
        },
        timeTrans(time,type){
            if(time && typeof time == 'string') {
                if(type == 0) {
                    return time.substring(0,10)
                }
                if(type == 1) {
                    return new Date(new Date(time).getTime() - (1000*60*60*24)).format('yyyy-MM-dd')
                }
            } else if(time && typeof time == 'object') {
                if(type == 0) {
                    return time.format('yyyy-MM-dd')
                }
                if(type == 1) {
                    return new Date(time.getTime() - (1000*60*60*24)).format('yyyy-MM-dd')
                }
            } else {
                return ''
            }
        },
        getCharts(){
            let obj = {
                startTime: this.timeTrans(this.startTime,0),
                endTime: this.timeTrans(this.endTime,1),
            }
            let data1 = []
            let data2 = []
            //已签百度类
            crmStatistics.signToday( Object.assign({},obj, {type:0})).then(valid.call(this)).then(res => {
                if (res) {
                    data1[0] = res.data.data.cusOrder
                    data2[0] = parseFloat((res.data.data.price / 10000).toFixed(2))
                    //已签其他类
                    crmStatistics.signToday(Object.assign({},obj, {type:1})).then(valid.call(this)).then(res => {
                        if (res) {
                            data1[1] = res.data.data.cusOrder
                            data2[1] = parseFloat((res.data.data.price / 10000).toFixed(2))
                            //待签
                            crmStatistics.unsignToday(obj).then(valid.call(this)).then(res => {
                                if (res) {
                                    data1[2] = res.data.data.cusOrder
                                    data2[2] = parseFloat((res.data.data.price / 10000).toFixed(2))
                                    this.eOption = getEchartOption(data1, data2)
                                    this.echartsShow = true
                                }
                            }).catch(errors.call(this));
                        }
                    }).catch(errors.call(this));
                }
            }).catch(errors.call(this));
        },
        /*
        * 日期选择 
        */
        onclickChoseTags(type, ms) {
            const data = getTimeInterval(type, ms, true);
            this.startTime = data.startTime + ' 00:00:00';
            this.endTime = data.endTime + ' 00:00:00';
            this.getCharts();
            this.getLargeTableData();
        },
        getTargetDate(d1, d2) {
            this.startTime = d1;
            this.endTime = d2;
            this.getCharts();
            this.getLargeTableData();
        },
        getNow(){
            common.newDate({}).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    const rdata = new Date(res.data.data.date.substring(0,19)).format('yyyy-MM-dd') + ' 00:00:00';
                    this.startTime = rdata;
                    this.endTime =  new Date(new Date(rdata).setDate(new Date(rdata).getDate() + 1)).format('yyyy-MM-dd') + ' 00:00:00';
                    this.getCharts();
                    this.getLargeTableData();
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        onPageChange(page) {
            this.pageNo = page
            this.getLargeTableData();
        },
        pageSizeChange(size) {
            this.pageSize = size
            this.getLargeTableData();
        },
        /*
        * largeTable
        * 获取列表
        * 更新列表
        */
        getShowTitle() {
            crmStatistics.listShowTileBySale({ type: 0, }).then(valid.call(this)).then(res => {
                if (res.ok) {
                    this.largeTable.tableChecked = res.data.data;
                    this.largeTable.checkBoxList = res.data.data;
                }
            }).then(errors.call(this));
        },
        saveListShowTitle(data) {
            const datas = Object.assign(data, { type: 0, });
            crmStatistics.updateShowTileBySale(datas).then(valid.call(this)).then(res => {
                if (res.ok) {
                    console.log('save___成功', res.data);
                }
            }).catch(errors.call(this));
        },
        getLargeTableData() {
            this.loading = true;
            this.updateLoadingStatus({isLoading:true});
            const data = {
                period: 'day',
                name: this.name,
                tags: this.tags,
                startTime: new Date(this.startTime).format('yyyy-MM-dd'),
                endTime: new Date(new Date(this.endTime).setDate(new Date(this.endTime).getDate() - 1)).format('yyyy-MM-dd'),
                officeId: this.officeId,
                orderType: this.orderType,
                sort: this.sort,
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                srcType: "0",
            };
            crmStatistics.saleInfo(data).then(valid.call(this)).then(res => {
                if (res.ok) {
                    this.loading = false;
                    const rdata = res.data.data;
                    this.count = rdata.count;
                    this.pageCount = rdata.pageCount;
                    this.pageNo = rdata.pageNo;
                    this.pageSize = rdata.pageSize;
                    this.largeTable.tableData = rdata.list;
                }
            }).catch(errors.call(this)).finally(()=>{this.updateLoadingStatus({isLoading:false});this.loading = false;});
        },
        onclickSearchInfos(val) {
            this.name = val;
            this.getLargeTableData();
        },
        onclickToChoseTags(val) {
            this.tags = val;
            this.getLargeTableData();
        },
        onSortChange(val1, val2) {
            switch (val2) {
                case 'asc': this.sort = '0'; break;
                case 'desc': this.sort = '1'; break;
                case 'normal': this.sort = null; break;
            };
            this.orderType = val2 === 'normal' ? null : Sales.getOrderByType(val1);
            this.getLargeTableData();
        },
        onFilterChange(val1, val2) {
            this.officeId = val2;
            this.getLargeTableData();
        },
        getchangedCheckedItem(val) {
            this.saveListShowTitle(val);
        },
    }
}
</script>