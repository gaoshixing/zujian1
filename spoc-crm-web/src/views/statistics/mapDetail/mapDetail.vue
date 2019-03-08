<style lang="less">
.public-container{
    border-top: 1px solid #e0e0e0;
    margin-bottom: 88px;
    .echartbox {
        width: 100%;
        overflow-x: auto;
    }
    .content {
        display: flex;
        justify-content: space-between;
        .ctlt {
            width: 530px;
            flex: 1;
        }
        .ctgt {
            width: 650px;
            .ivu-table th {
                background: #fff !important;
            }
        }
    }
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

        <div class="content">
			<div class="ctlt">
				<echart-item res="bar" :data="eOption" :mstyle="estyle" v-if="echartsShow" class="echartbox"></echart-item>
			</div>
			<div class="ctgt">
				<Table :columns="columns1" :data="dataMapTable" height="450" width="480"></Table>
			</div>
		</div>

        <LargeTable
            :pId="pid"
            :total='count'
            fixedHeader="cusCode"
            :exportExcel=true
            :loading="loading"
            :getInfoData="getInfoData"
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
    let names = [
		'北京','天津','河北','山西',
		'内蒙古','辽宁','吉林','黑龙江','上海','江苏',
		'浙江','安徽','福建','江西','山东','河南',
		'湖北','湖南','广东',	'广西','海南','重庆','四川',
		'贵州','云南','西藏','陕西','甘肃','青海',
		'宁夏','新疆','台湾','香港','澳门',
		'其他']
    
import CaseBarFilter from '@public/modules/caseBarFilter';
import valid, {errors, common, sys, crmCustomerPub, crmStatistics} from "../../../libs/request";
import { mapGetters, } from 'vuex';
import BtnAndTime from '../../../modules/btnAndTime';
import { waitUntil, getTimeInterval, } from '@public/libs/util';
import LargeTable from '../../../modules/largeTable';
import Resource from '../../../schema/resource.js';
import echartItem from "../echartItem.vue";

export default {
    props: {
        pid: {
            type: String,
        },
    },
    data(){
        return {
            columns1: [{
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '省份',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '签单转化率',
                    align: 'center',
                    key: 'per'
                },
                {
                    title: '资源总量',
                    align: 'center',
                    key: 'cus'
                },
                {
                    title: '签单总量',
                    align: 'center',
                    key: 'cusOrder'
                },
                {
                    title: '签单总金额',
                    align: 'center',
                    key: 'price'
                }
            ],
            echartsShow: false,
            estyle: {
                width: '450px',
                height: '450px'
            },
            loading: false,
            eOption:{},
            showModal: false,
            tags: [],
            getInfoData: null,
            dataMapTable: [],
            data1: [],
            count: 0,
            pageNo: 1,
            pageCount: 0,
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
            dataInit: {},
        };
    },
    computed: {
        ...mapGetters('crm', ['isBranchOfficeLeader', 'isSalerLeader', ]),
    },
    components: {
        BtnAndTime,
        CaseBarFilter,
        LargeTable,
        'echart-item': echartItem,
    },
    created() {
        new Resource(this); // 执行 constractor
        this.getListShowTitle();
    },
    mounted(){
        this.getNow()
    },
    methods: {
        initMapDate(){
            let dataInit = {}
            names.forEach((item)=>{
                dataInit[item] = {name: item, cus: 0, cusOrder: 0, price: 0, per: 0, value:0}
            })
            this.dataInit = dataInit
        },
        /*
		* 日期选择 
		*/
		onclickChoseTags(type, ms) {
			const data = getTimeInterval(type, ms, true);
			this.startTime = data.startTime;
            this.endTime = data.endTime;
            this.pageNo  = 1;
            this.getLargeTableData();
            this.getCharts();
		},
		getTargetDate(d1, d2) {
			this.startTime = d1;
            this.endTime = d2;
            this.pageNo  = 1;
            this.getLargeTableData();
            this.getCharts();
		},
        getEchartOption(data,max) {
            let obj = {
                tooltip: {
                    trigger: 'item',
                    formatter: function(a){
                        let str = '' 
                        if(a.data){
                            str = a.data.name + '<br>' +
                            '签单转化率：' + a.data.per + '%<br>' + 
                            '资源总量：' + a.data.cus + '<br>' + 
                            '签单总量：' + a.data.cusOrder + '<br>' + 
                            '签单总金额：' + a.data.price
                        }
                        return str
                    }
                },
                visualMap: {
                    min: 0,
                    max: max,
                    text: ['资源总量：高', '低'],
                    realtime: false,
                    calculable: true,
                    orient:'horizontal',
                    inverse:true,
                    inRange: {
                        color: ['#ebf3fc', '#3385e3']
                    }
                },
                series: [{
                    name: '',
                    type: 'map',
                    mapType: 'china',
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    data: data
                }]
            };
            return obj;
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
        getCharts() {
            /* let startTime = typeof(this.startTime) =="string" ? this.startTime : this.startTime.format('yyyy-MM-dd')
            let endTime = typeof(this.endTime) =="string" ? this.endTime : this.endTime.format('yyyy-MM-dd') */
            let obj = {
                startTime: this.timeTrans(this.startTime,0),
                endTime: this.timeTrans(this.endTime,1)
            }
            crmStatistics.resMap(obj).then(valid.call(this)).then(res => {
                if (res) {
                    this.initMapDate()
                    let max = 0
                    res.data.data.forEach((item,index) => {
                        if(item.cus > max){
                            max = item.cus
                        }
                        item.value = item.cus
                        this.dataInit[item.name] = item
                    })
                    let data = []
                    for(let key in  this.dataInit) {
                        data.push(this.dataInit[key])
                    }
                    this.dataMapTable =  data.sort((a,b)=>{return a.cus > b.cus ? -1 : 1})
                    this.eOption =  this.getEchartOption(data,max)
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
                srcType: "4",
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
    }
}
</script>


