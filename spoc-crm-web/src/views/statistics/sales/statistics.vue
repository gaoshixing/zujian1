<style lang="less">
.sales-statistics-container{
    border-top: 1px solid #e0e0e0;
    .search-data{
        position: relative;padding-left: 95px;zoom: 1;width: 860px;min-height: 32px;
        &:after,&::before{
            content: '';display: table;clear: both;visibility: hidden;font-size: 0;height: 0;
        }
        .title{
            width: 80px;position: absolute;left: 0;top: 0;line-height: 30px;
            color: #b8b8b8;text-align: right;
        }
        li{
            float: left;padding: 5px 12px;cursor: pointer;margin:3px;line-height: 1;
            &.active{
                background: #44bcb6;color: #fff;
            }
        }
    }
    .seo-timePicker {
        float: left;
    }
    .seo-count{
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
    .page-box{
        margin-top: 20px;
		text-align: center;
    }
    // 表格
    .ivu-table-wrapper {
        border: none;
    }
    .ivu-table {
        th{
            background: #fff;
        }
    }
    .ivu-table:after {
        display: none;
    }
    // 
    .clear{
        zoom: 1;
        &::before,&::after{
            content: '';display: table;clear: both;height: 0;line-height: 0;font-size: 0;
        }
    }
    .chart-box{
        padding-bottom: 30px;
        .clear();
    }
    .info-box{
        float: left;margin-left: 66px;width: 239px;height: 343px;margin-top: 30px;
        background: #fff;box-shadow: 0px 0px 20px rgba(4, 0, 0, .2);
        text-align: center;
        .title{
            padding-top: 9px;line-height: 54px;
            font-size: 14px;color: #333;
        }
        .coun{
            @h: 36px;
            height: @h;line-height: @h;
            font-size: 20px;color: #44bcb7;
        }
        .detail{
            padding-top: 7px;line-height: 24px;
            color: #999;font-size: 14px;
        }
        .down{
            i{
                display: inline-block;
                color: #f00;transform:rotate(-180deg);
            }
        }
        .up{
            i{
                color: #0c0;
            }
        }
        .bottom{
            margin-top: 12px;padding: 6px 10px 0;
            border-top: 1px solid #e0e0e0;
        }
        .ivu-tooltip{
            float: left;margin-left: 6px;
        }
    }
    .echarts-box{
        float: left;margin-left: 66px;
    }
    // 
    .ueer-info{
        padding: 20px 0 20px 25px;
    }
    .user-photo{
        @w:120px;
        float: left;width: @w;height: @w;border-radius: 50%;margin-right: 20px;background: #ccc;
    }
    .user-brief{
        float: left;padding-top: 13px;color: #222;
        div{
            @h:38px;
            height: @h;line-height: @h;font-size: 18px;
        }
        p{
            @h:28px;
            height: @h;line-height: @h;font-size: 14px;
        }
    }
}
</style>
    
<template>
<div class="sales-statistics-container">
    <div class="ueer-info clear">
        <img :src="user.photo" class="user-photo" alt="">
        <div class="user-brief">
            <div v-text="user.userName"></div>
            <p v-text="user.company + '-' + user.office"></p>
            <p v-text="user.job"></p>
        </div>
    </div>

    <BtnAndTime
        types="month"
        title="创建时间"
        :btnList="datalists"
        @onclickChoseTags="onclickChoseTags"
        @getTargetDate="getTargetDate">
    </BtnAndTime>

    <div class="chart-box">
        <div class="info-box">
            <div class="title">新增资源</div>
            <div class="coun">{{ chartData.newCusNum }}个<span v-if="!isSaler">/{{ chartData.newCusScore }}分</span></div>
            <p class="down detail">
                <i class="iconfont icon-jiantou icon-crm-jiantou"></i>
                <span>掉落资源</span>
            </p>
            <div class="coun">{{ chartData.falloutCusNum }}个<span v-if="!isSaler">/{{ chartData.falloutCusScore }}分</span></div>
            <p class="up detail">
                <i class="iconfont icon-jiantou icon-crm-jiantou"></i>
                <span>抢单资源</span>
            </p>
            <div class="coun">{{ chartData.getCusNum }}个<span v-if="!isSaler">/{{ chartData.getCusScore }}分</span></div>
            <div class="bottom">
                <p style="display: inline-block;" class="detail">
                    <span style="float: left;">总持有资源</span>
                    <Tooltip placement="top">
                        <Icon type="information-circled"></Icon>
                        <div slot="content">
                            <p>总持有资源：</p>
                            <p>表示至今为止，销售个人未签约的所有资源。</p>
                        </div>
                    </Tooltip>
                </p>
                <div class="coun">{{ chartData.totalCusNum }}个 <span v-if="!isSaler">/ {{ chartData.totalCusScore || 0 }}分</span></div>
            </div>
        </div>
        <div class="echarts-box">
            <echart-item res="bar" :data="eOption" :mstyle="estyle" v-if="echartsShow" class="echartbox"></echart-item>
        </div>
    </div>

    <LargeTable
        :pId="pid"
        :total='count'
        fixedHeader="cusCode"
        :exportExcel=true
        :getInfoData="getInfoData"
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

    <div class="page-box" v-show="count > 10">
        <div style="margin: auto;display: inline-block;">
            <Page
                :current="pageNo"
                :total="count"
                v-if="count > 10"
                show-elevator show-total show-sizer
                :page-size="pageSize"
                @on-change="pageChange"
                @on-page-size-change="sizeChange">
            </Page>
        </div>
    </div>
</div>
</template>


<script>

import echartItem from "../../pond/echartItem.vue";
import { mapGetters, mapState } from 'vuex';
import { waitUntil, getTimeInterval, } from '@public/libs/util';
import LargeTable from '../../../modules/largeTable';
import Resource from '../../../schema/resource.js';
import BtnAndTime from '../../../modules/btnAndTime';
import valid, {errors, common, sys, crmStatistics } from "../../../libs/request";

export default {
    props: {
        pid: {
            type: String,
        },
    },
    data(){
        return {
            user: {},
            keyWord: '',
            datalists: [
                {
                    title: '当前月',
                    type: 'month',
                    ms: -1,
                    timeType: 0,

                },
                {
                    title: '最近3个月',
                    type: 'month',
                    ms: -3,
                    timeType: 3,
                },
                {
                    title: '最近6个月',
                    type: 'month',
                    ms: -6,
                    timeType: 6,
                },
                {
                    title: '今年',
                    type: 'year',
                    ms: 0,
                    timeType: 12,
                },
            ],
            loading: false,
            timeType: -1,
            dataChecked: '101',
            date: '',
            pageNo: 1, //当前页码
            pageCount: 0,//页码总数
            pageSize: 10,//每页条数
            count: 0,
            officeId: null,
            source: null,
            star: null,
            status: null,
            orderType: null,
            sort: null,
            phase: null,
            getInfoData: null,
            list: [],
            params: {},
            estyle: {
                width: '560px',
                height: '380px'
            },
            echartsShow: !false,
            largeTable: {
                checkBoxList: [],
                tableChecked: [],
                tableColumnList: Resource.detailSalesColumn().column,
                tableData: [],
            },
            chartData: {
                "newCusNum": "0",
                "newCusScore": "0",
                "getCusNum": "0",
                "getCusScore": "0",
                "falloutCusNum": "0",
                "falloutCusScore": "0",
                "totalCusNum": 0,
                "totalCusScore": null,
                "signMoney": 0.0,
                "targetMoney": 0.0,
                "newBdNum": 0,
                "newBdScore": 0,
                "newOtherNum": 0,
                "newOtherScore": 0,
            },
            userId: '',
        };
    },
    computed: {
        ...mapState(['userInfo']), 
        ...mapGetters('crm', ['isSaler','isBranchOfficeLeader', 'isSalerLeader', ]),
        
        eOption() {
            let self = this;
            let obj = {
                title: {
                    text: "资源转化",
                    top: '30px',
                    x: 'center',
                    textStyle: {
                        color: "#222",
                        fontSize: "14px",
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter:(datas) => {
                        // return datas[0].name + '<br/>' + datas[0].seriesName + '：' + datas[0].value + '%<br/>';
                        return datas[0].name + '：' + datas[0].value + '%<br/>';
                    }
                },
                grid:{
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ['目标完成率', '资源转换率（百度类）', '资源转换率（其他来源）'],
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            interval: 0, //x轴title全部显示
                            textStyle: {
                                color: '#333'
                            }
                        },
                        splitLine:{
                    　　　　show:false
                    　　},
                        axisLine: {
                            lineStyle: {
                                color: '#ccc',//左边线的颜色
                            }
                        },
                    }
                ],
                yAxis : [
                    {
                        axisLabel:{
                            formatter:'{value}%',
                            textStyle: {
                                color: '#333'
                            }
                        },
                        max: Math.max(Math.ceil(self.chartData.signMoney / self.chartData.targetMoney * 10000) / 100,Math.ceil(self.chartData.signMoney / self.chartData.newBdNum * 10000) / 100,Math.ceil(self.chartData.signMoney / self.chartData.newOtherNum * 10000) / 100) > 100 ? null : 100,
                        splitLine:{
                    　　　　show:false
                    　　},
                        axisLine: {
                            lineStyle: {
                                color: '#ccc',//左边线的颜色
                            }
                        },
                    }
                ],
                series: [{
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'top',
                        color: '#666',
                        formatter: '{c}%'
                    },
                    itemStyle: {
                        color: function(params) { 
                            var colorList = ['#2fc25b','#1ab2ff','#1ab2ff']; 
                            return colorList[params.dataIndex] 
                        }
                    },
                    barWidth: '30px',
                    data:[
                        self.chartData.targetMoney == 0 ? '0' : Math.ceil(self.chartData.signMoney / self.chartData.targetMoney * 10000) / 100,
                        self.chartData.newBdNum == 0 ? '0' : Math.ceil(self.chartData.signMoney / self.chartData.newBdNum * 10000) / 100,
                        self.chartData.newOtherNum == 0 ? '0' : Math.ceil(self.chartData.signMoney / self.chartData.newOtherNum * 10000) / 100,
                    ]
                }]
            };
            return obj;
        }
    },
    components: {
        echartItem,
        LargeTable,
        BtnAndTime,
    },
    created() {
        this.userId = this.$route.query.uid ? this.$route.query.uid : this.userInfo.id;
        new Resource(this); // 执行 constractor
        this.getListShowTitle();
        this.getUserBriefInfo(this.userId);
    },
    mounted(){
        this.getNow();
    },
    methods: {
        getUserBriefInfo(id) {
            // 根据用户编号获取头像、分公司、部门、职位信息
            let params = {
                userId: id
            }
            sys.userBriefInfo(params).then(valid.call(this)).then(res => {
                if (res.ok) {
                    this.user = res.data.data;
                }
            }).catch(errors.call(this));
        },
        getSaleStatisticalDetail() {
            let params = {
                startTime: this.startTime,
                endTime: this.endTime,
                userId: this.userId
            }
            if(this.timeType != -1) {
                params.timeType = this.timeType;
            }
            crmStatistics.saleStatisticalDetail(params).then(valid.call(this)).then(res => {
                if (res.ok) {
                    this.chartData = res.data.data;
                }
            }).catch(errors.call(this));
        },
        /*
		* 日期选择 
		*/
		onclickChoseTags(type, ms) {
            const data = getTimeInterval(type, ms);
			this.startTime = data.startTime;
            this.endTime = data.endTime;
            this.pageNo  = 1;
            if(type == 'month') {
                this.timeType = Math.abs(ms);
            }else if(type == 'year') {
                this.timeType = new Date().getMonth() + 1;
            }
            this.getLargeTableData();
		},
		getTargetDate(d1, d2) {
			this.startTime = d1;
            this.endTime = d2;
            this.pageNo  = 1;
            this.timeType = -1;
            this.getLargeTableData();
		},
        getNow(){
            common.newDate({}).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    const rdata = new Date(res.data.data.date.substring(0,19)).format('yyyy-MM');
                    this.startTime = rdata + '-01 00:00:00';
                    this.endTime =  new Date(new Date(rdata).setMonth(new Date(rdata).getMonth() + 1)).format('yyyy-MM') + '-01 00:00:00';
                    this.getLargeTableData();
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        pageChange(page) {
            this.pageNo = page
            this.getLargeTableData();
        },
       sizeChange(size){
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
            this.getSaleStatisticalDetail();
            const data = {
                userId: this.userId,
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
                srcType: '4',
            };

            this.getInfoData = data;

            crmStatistics.resInfo(data).then(valid.call(this)).then(res => {
                if (res.ok) {
                    this.loading = false;
                    const rdata = res.data.data;
                    this.count = rdata.count;
                    this.pageCount = rdata.pageCount;
                    this.pageNo = rdata.pageNo;
                    this.pageSize = rdata.pageSize;
                    this.largeTable.tableData = rdata.list;
                }
            }).catch(errors.call(this)).finally(() => this.loading = false);
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
            crmStatistics.listShowTile({ type: 4, }).then(valid.call(this)).then(res => {
                if (res.ok) {
                    this.largeTable.tableChecked = res.data.data;
                    this.largeTable.checkBoxList = res.data.data;
                }
            }).catch(errors.call(this));
        },
        saveListShowTitle(data) {
            const datas = Object.assign(data, { type: 4, });
            crmStatistics.updateShowTile(datas).then(valid.call(this)).then(res => {
                if (res.ok) {
                    console.log('save___成功', res.data);
                }
            }).catch(errors.call(this));
        },
    },
}
</script>


