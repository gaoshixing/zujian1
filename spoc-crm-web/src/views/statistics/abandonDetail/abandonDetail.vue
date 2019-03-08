<style lang="less">
.public-container{
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
    }

    .newResourceCharts {
        overflow: hidden;
        .chartTitle{
            padding-top: 30px;
            text-align: center;
            font-weight: bold;
        }
		.echartbox {
			width: 50%;
			float: left;
		}
	}
}
</style>

<template>
    <div class="public-container">

        <BtnAndTime
			types="date"
			title="创建时间"
			:btnList="datalists"
			@onclickChoseTags="onclickChoseTags"
			@getTargetDate="getTargetDate">
		</BtnAndTime>

        <div class="newResourceCharts">
            <div class="echartbox chartTitle">销售公共库</div>
            <div class="echartbox chartTitle">TMK公共库</div>   
            <echart-item res="bar" :data="eOption0" :mstyle="estyle" v-if="echartsShow" class="echartbox"></echart-item>
            <echart-item res="bar" :data="eOption1" :mstyle="estyle" v-if="echartsShow" class="echartbox"></echart-item>
        </div>
        <LargeTable
            :pId="pid"
            :total='count'
            fixedHeader="cusCode"
            :exportExcel=true
            :loading="loading"
            :getInfoData:="getInfoData"
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

        <div class="page-box">
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
let eOption = function(totalValue, legendData, chartData) {
    	let obj = {
            title: {
                text: totalValue? "放弃资源总量:" + totalValue : "放弃资源总量:" + totalValue,
                x: 'center',
                top:"100px",
                textStyle: {
                    color: "#a9a8a9",
                    fontSize: "14px",
                },
                subtextStyle: {
                    color: "#a9a8a9",
                    fontSize: "14px",
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'right',
                data: legendData
            },
            grid: {
                x: 'left'
            },
            series: [{
                name: '放弃资源',
                type: 'pie',
                radius: ['55%', '70%'],
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false,
                        textStyle: {}
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: chartData
            }]
        };
        return obj;
}

import BtnAndTime from '../../../modules/btnAndTime';
import CaseBarFilter from '@public/modules/caseBarFilter';
import valid, { errors, common, sys, crmCustomerPub, crmStatistics, } from "../../../libs/request";
import { mapGetters, } from 'vuex';
import { waitUntil, getTimeInterval,} from '@public/libs/util';
import LargeTable from '../../../modules/largeTable';
import Resource from '../../../schema/resource.js';
import echartItem from "../../pond/echartItem.vue";

export default {
    props: {
        pid: {
            type: String,
        },
    },
    data(){
        return {
            eOption0: {},
            eOption1: {},
            loading: false,
            getInfoData: null,
            echartsShow: false,
            estyle: {
                width: '100%',
                height: '224px'
            },
            showModal: false,
            tags: [],
            data1: [],
            count: 0,
            pageNo: 1,
            pageCount: 98,
            pageSize: 10,
            officeId: null,
            source: null,
            star: null,
            status: null,
            orderType: null,
            sort: null,
            phase: null,
            compact: '',
            dataChecked: '101',
            datalists: [
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
            startTime: '',
            endTime: '',
            endDataError: false,
            hisOfficeId: '', //历史跟进人
            largeTable: {
                checkBoxList: [],
                tableChecked: [],
                tableColumnList: Resource.resourceFrom,
                tableData: [],
            },
        };
    },
    computed: {
        ...mapGetters('crm', ['isBranchOfficeLeader', 'isSalerLeader', ]),
    },
    components: {
        BtnAndTime,
        CaseBarFilter,
        LargeTable,
        echartItem
    },
    created() {
        new Resource(this); // 执行 constractor
        this.getListShowTitle();
    },
    mounted(){
        const _this = this;
        _this.getNow();
        /*
        * 权限控制 分总 销总 无法查看分公司的数据
        */
        waitUntil(() => {
            return !!(_this.isBranchOfficeLeader || _this.isSalerLeader);
        }, () => {
            if (_this.isBranchOfficeLeader || _this.isSalerLeader) {
                _this.$delete(this.largeTable.tableColumnList, 'office');
            }
        });
    },
    methods: {
        /*
		* 日期选择 
		*/
		onclickChoseTags(type, ms) {
			const data = getTimeInterval(type, ms, true);
			this.startTime = data.startTime;
            this.endTime = data.endTime;
            this.pageNo  = 1;
            this.getCharts();
            this.getLargeTableData();
		},
		getTargetDate(d1, d2) {
			this.startTime = d1;
            this.endTime = d2;
            this.pageNo  = 1;
            this.getCharts();
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
                startTime: this.timeTrans(this.startTime, 0),
                endTime: this.timeTrans(this.endTime, 1),
                type: 0
            }
            crmStatistics.resAbandon(obj).then(valid.call(this)).then(res => {
                if (res) {
                    let result = res.data.data
                    let chartData0  = []
                    let chartsLegend0 = []
                    let dataTotal0 = 0
                    result.sale.forEach((item, index)=>{
                        chartData0.push({
                            name: item.name,
                            value: item.cusNum
                            })
                        chartsLegend0.push(item.name)
                        dataTotal0 += item.cusNum
                    })

                    let chartData1  = []
                    let chartsLegend1 = []
                    let dataTotal1 = 0
                    result.tmk.forEach((item, index)=>{
                        chartData1.push({
                            name: item.name,
                            value: item.cusNum
                            })
                        chartsLegend1.push(item.name)
                        dataTotal1 += item.cusNum
                    })

                    this.eOption0 = eOption(dataTotal0, chartsLegend0, chartData0) 
                    this.eOption1 = eOption(dataTotal1, chartsLegend1, chartData1) 
                    this.echartsShow = true
                }
            }).catch(errors.call(this));
        },
        getNow(){
            common.newDate({}).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    const rdata = new Date(res.data.data.date.substring(0,19)).format('yyyy-MM-dd');
                    this.startTime = rdata;
                    this.endTime =  new Date(new Date(rdata).setDate(new Date(rdata).getDate() + 1)).format('yyyy-MM-dd');
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
        pageSizeChange(size){
            this.pageSize = size
            this.getLargeTableData();
        },
        /*
        * LargeTable
        * @ 搜索
        * @ 标签
        * @ 排序
        * @ 筛选
        * @ 记录显示表头
        */
        getLargeTableData() {
            this.loading = true;
            const data = {
                name: this.name,
                tags: this.tags,
                startTime: this.startTime,
                endTime: this.endTime,
                officeId: this.officeId,
                source: this.source,
                isChange: this.isChange,
                lib: this.phase,
                orderType: this.orderType,
                sort: this.sort,
                star: this.star,
                status: this.status,
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                srcType: "3",
            };
            this.getInfoData = data;
            crmStatistics.resInfo(data).then(valid.call(this)).then(res => {
                if (res.ok) {
                    const rdata = res.data.data;
                    this.count = rdata.count;
                    this.pageCount = rdata.pageCount;
                    this.pageNo = rdata.pageNo;
                    this.pageSize = rdata.pageSize;
                    this.largeTable.tableData = rdata.list;
                    this.loading = false;
                }
            }).catch(errors.call(this)).finally(() => this.loading = false);;
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
            switch (val1) {
                case 'score':  this.orderType = 0; break;
                case 'createDate':  this.orderType = 1; break;
                case 'sellDate':  this.orderType = 2; break;
                case 'price':  this.orderType = 3; break;
                case 'updateDate':  this.orderType = 4; break;
                default: this.orderType = null;
            };
            switch (val2) {
                case 'asc': this.sort = '0'; break;
                case 'desc': this.sort = '1'; break;
                case 'normal': this.sort = null; break;
            };
            this.getLargeTableData();
        },
        onFilterChange(val1, val2) {
            switch (val1) {
                case 'office': this.officeId = val2; break;
                case 'source': this.source = val2; break;
                case 'star': this.star = val2; break;
                case 'status': this.status = val2; break;
                case 'isChange': this.isChange = val2; break;
                case 'phase': this.phase = val2; break;
            };
            this.getLargeTableData();
        },
        getchangedCheckedItem(val) {
            this.saveListShowTitle(val);
        },
        /*
        * 获取 存储表头
        */
        getListShowTitle() {
            crmStatistics.listShowTile({ type: 3, }).then(valid.call(this)).then(res => {
                if (res.ok) {
                    this.largeTable.tableChecked = res.data.data;
                    this.largeTable.checkBoxList = res.data.data;
                }
            }).catch(errors.call(this));
        },
        saveListShowTitle(data) {
            const datas = Object.assign(data, { type: 3, });
            crmStatistics.updateShowTile(datas).then(valid.call(this)).then(res => {
                if (res.ok) {
                    console.log('save___成功', res.data);
                }
            }).catch(errors.call(this));
        },
    }
}
</script>


