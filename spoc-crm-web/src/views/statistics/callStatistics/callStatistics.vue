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
    .echarsAro {
        .echartbox{
			width: 100%;
			overflow-x: auto;
		}
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
        margin-top: 15px;
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
        <div class="search-data">
            <span class="title">统计时间</span>
            <ul>
                <!-- <li :class="[!dataChecked ? 'active' : '']" @click="changeData()">不限</li> -->
                <li v-for="item in datalists" :key="item.id" 
                    @click="changeData(item)"
                    :class="{active:dataChecked === item.id}">{{ item.data }}</li>
            </ul>
            <div class="case-manage-timePicker">
                <DatePicker type="date"
                    placeholder="开始日期" 
                    style="width: 120px"
                    v-model="beginData"
                    @on-change="beginDateChange">
                </DatePicker>
                <div class="case-manage-line-div"></div>
                <DatePicker type="date"
                    placeholder="结束日期"  
                    style="width: 120px" 
                     v-model="endData1"
                    :class="{error: endDataError}"
                    @on-change="endDateChange">
                </DatePicker>
            </div>
        </div>
		<div class="echarsAro">
            <echart-item res="bar" :data="eOption" v-if='echartsShow' :mstyle="estyle" class="echartbox" @on-click="echartClick"></echart-item>
        </div>
        <v-select 
            style="width: 396px;margin: 15px 0;"
            placeholder="输入销售顾问姓名"
            :datafunc="datafunc"
            icon="search" 
            v-model="compact"
            k='cnname'
            @on-enter="textChange" 
            @on-click="textChange" 
            @selected="textChange">
        </v-select>
        <div class="count">为您共找到  <span>{{ data1.count }}</span> 条数据</div>
        <div class="btn-lists-div">
            <span>客户列表</span>
        </div>
        <Table ref="table" :columns="columns1" :data="data1.list"  @on-sort-change="sortChange" @on-filter-change="filterChange"></Table>
        <div class="page-box">
            <Page  
                v-if="data1.count>10"
                show-total  
                show-elevator 
                show-sizer 
                :total="data1.count"
                :current="pageNo"
                :page-size="pageSize" 
                @on-page-size-change="pageSizeChange"
                @on-change="onPageChange"></Page>
        </div>
    </div>
</template>

<script>

import { mapMutations, mapGetters, } from 'vuex';
import vSelect from '@public/modules/vSelect';
import CaseBarFilter from '@public/modules/caseBarFilter';
// import callCharts from './callCharts';
import echartItem from "../../pond/echartItem.vue";
import valid, {errors, common, sys, crmCustomerPub, crmStatistics} from "../../../libs/request";

export default {
    props: {
        
    },
    data(){
        return {
            showModal: false,
            echartsShow: false,
            estyle: {
                width: '100%',
                height: '400px'
            },
            tags: [],
            filterVal:'',
            columns1: [
                {
                    title: '销售顾问',
                    key: 'name',
                    align: 'center',
                    render: (h, params) => {
                        return h('a', {
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            name: 'crm.salesStatistics',
                                            query: {
                                               uid: params.row.id,
                                            }
                                        })
                                    }
                                }
                            },
                            params.row.name
                        )
                    }
                },
                {
                    title: '分公司',
                    key: 'company',
                    align: 'center',
                    filters: [
                    ],
                    filterMultiple: false,
                    filterRemote (value, row) {
                    }
                },
                {
                    title: '通话次数',
                    key: 'callTimes',
                    align: 'center',
                    sortable: true
                },
                {
                    title: '通话总时长(小时)',
                    key: 'callHours',
                    align: 'center',
                    sortable: true
                },
                {
                    title: '<15min的通话次数',
                    key: 'less15Times',
                    align: 'center',
                    sortable: true
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        return h("div", [
                            h("span", {
                                style:{
                                    cursor:'pointer',
                                    // color:  params.row.lockFlag == 0 ? '#41b3ae': '#b8b8b8'
                                    color: '#41b3ae'
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            name: 'crm.recordDetail',
                                            query: {
												id: params.row.saleId,
											},
                                        })
                                    }
                                }
                            }, '查看录音详情')
                        ])
                    }
                },
            ],
            data1: [
               
            ],
            count: 0,
            pageNo: 1,
            // pageCount: 98,
            pageSize: 10,
            compact: '',
            dataChecked: 0,
            dataList: [],
            datalists: [
                {
                    id: 0,
                    data: '今天'
                },
                {
                    id: 7,
                    data: '最近7天'
                },
                {
                    id: 30,
                    data: '最近30天'
                },
            ],
            beginData: '',
            endData1: '',
            beforeTime: new Date().format('yyyy-MM-dd'),
			endDate: new Date(new Date().setDate(new Date().getDate() + 1)).format('yyyy-MM-dd'),
            endDataError: false,
            hisOfficeId: '', //历史跟进人
            source: '', //来源
            sort:0, //排序
            orderBy:'' ,//排序
            now: '',//今日
            companyId: '',
            companyArray:[],
        };
    },
    computed: {
        eOption() {
            let d = this.dataList
            let data1 = [], data2 = [], companyList = []
            d.forEach(item => {
                data1.push(item.everyHour)
                data2.push(item.less15)
                companyList.push(item.company)
            })
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        crossStyle: {
                            color: '#999'
                        }
                    },
                    formatter:(datas) => {
                        var res = `分公司：${datas[0].name}<br/>统计时间：${this.beforeTime}至${this.endDate}<br/>`,
                            val;
                        for(var i = 0, length = datas.length; i < length; i++) {
                            // res += "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:" + datas[i].color + ";'></span>"
                            val = `${(datas[i].value)}`;
                            res += datas[i].seriesName + '：' + val + '<br/>';
                        }
                        res += `通话总时长(小时)：${d[datas[0].dataIndex].totalHours}<br/>通话次数：${d[datas[0].dataIndex].times}<br/>`
                        return res;
                    }
                },
                legend: {
                    data:['人均通话总时长', '<15min的通话次数']
                },
                grid: {
                    left: '2%',
                    right: '2%',
                    bottom: '4%',
                    top: '18%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: companyList,
                    axisTick: {
                        alignWithLabel: true,
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        margin: 20
                    }
                }],
                yAxis: [{
                    type: 'value',
                    name: '(小时)',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false,
                    },
                    // minInterval: 1,
                }, {
                    type: 'value',
                    name: '(次)',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        show: false,	
                    },
                    // minInterval: 1,
					}],
                // xAxis: [
                //     {
                //         type: 'category',
                //         data: companyList,
                //         axisPointer: {
                //             type: 'shadow',
                //         },
                //     }
                // ],
                
                // yAxis: [
                //     {
                //         type: 'value',
                //         name: '(小时)',
                //         min: 0,
                //         // max: 250,
                //         axisLine: {
				// 			show: false
				// 		},
                //         interval: 2,
                //         axisLabel: {
                //             formatter: '{value}'
                //         }
                //     },
                //     {
                //         type: 'value',
                //         name: '(次)',
                //         min: 0,
                //         // max: 25,
                //         axisLine: {
				// 			show: false
				// 		},
                //         interval: 5,
                //         axisLabel: {
                //             formatter: '{value}'
                //         }
                //     }
                // ],
                series: [
                     {
						name: '人均通话总时长',
						type: 'bar',
						label: {
							show: true,
							position: 'top',
							color: '#1ab2ff',
							formatter: (params) => {
							},
							rich: {
								org: {
									color: '#ff7433'
								},
								blu: {
									color: '#1ab2ff'
								}
							}
						},
						itemStyle: {
							color: '#d9f2ff',
							barBorderRadius: [2, 2, 0, 0],
						},
						barWidth: '24',
						yAxisIndex: 0,
						stack: '1',
						data: data1,
						barGap: 0
					},{
						name: '<15min的通话次数',
						type: 'bar',
						label: {
							show: true,
							position: 'top',
							rich: {
								org: {
									color: '#ff7433'
								},
								gre: {
									color: '#2fc25b'
								},
							}
						},
						itemStyle: {
							color: '#cef2d9',
							barBorderRadius: [2, 2, 0, 0]
						},
						barWidth: '24',
						stack: '2',
						yAxisIndex: 0,
						data: data2,
						barGap: 0
					}
                    // {
                    //     name:'人均通话总时长',
                    //     type:'bar',
                    //     barWidth : 30,
                    //     color: 'rgb(26, 178, 255)',
                    //     data: data1
                    // },
                    // {
                    //     name:'<15min的通话次数',
                    //     type:'line',
                    //     yAxisIndex: 1,
                    //     data: data2
                    // }
                ]
            };
            return option;
		}
    },
    components: {
        vSelect, 
        echartItem,
        CaseBarFilter,
    },
    mounted(){
        this.updateLoadingStatus({isLoading:true});
        // this.getNow()
        this.getFilter()
//      this.getLists()
        this.getSaleTel()
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        getSaleTel() {
            this.echartsShow = true
            if (!this.beforeTime && !this.endDate) {
                this.beforeTime = new Date().format('yyyy-MM-dd')
                this.endDate = new Date(new Date().setDate(new Date().getDate() + 1)).format('yyyy-MM-dd')
                this.dataChecked = 0
            }

            let obj = {
                // companyId: this.$route.query.companyId,
                startDate: this.beforeTime,
                endDate: this.endDate,
            }
            crmStatistics.companyTel(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.dataList = res.data.data
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
            this.getLists()
        },

        // onRowClick(params){
        //     this.$router.push({
        //         name: 'crm.detail',
        //         query: {
        //             id: params.cusId,
        //             from:'public'
        //         }
        //     })
        // },
        // getNow(){
        //     common.newDate({}).then(valid.call(this))
        //     .then(res => {
        //         if(res.ok) {
        //             this.now = new Date(res.data.data.date.substring(0,19))
        //         }
        //     })
        //     .catch(errors.call(this))
        //     .finally(() => {});
        // },
        
        getFilter(){
            //公共库来源
            let obj = {
                types: 'crm_customer_pub_source' 
            }
            sys.batchListData(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    //this.$set(this.columns1[5], 'filters', res.data.data.crm_customer_pub_source) 
                }
            })
            .catch(errors.call(this))
            .finally(() => {});

            //获取分公司
            sys.controlledList({}).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    //console.log(res.data.data)
                    let companyArray = []
                    res.data.data.forEach((item,index)=>{
                        companyArray.push({
                            label: item.companyName,
                            value: item.id
                        })
                    });
                    this.companyArray=companyArray;
                    this.$set(this.columns1[1], 'filters', companyArray) 
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        onPageChange(page) {
            this.pageNo = page
            this.getLists();
        },
        pageSizeChange(size){
            this.pageSize = size
            this.getLists();
        },
        filterChange(filterObj){
            // console.log( filterObj.key  + '   ' +  filterObj.title + '   ' +  filterObj._filterChecked[0])
            // if(filterObj.key == 'hisName') {
            //     this.hisOfficeId  =  filterObj._filterChecked[0] ? filterObj._filterChecked[0] : ""
            // } else {
            //     this.source = filterObj._filterChecked[0] ? filterObj._filterChecked[0] : ""
            // }
            if (filterObj._filterChecked.length) {
                this.companyId = filterObj._filterChecked[0]
            } else {
                this.companyId = ''
            }
            this.getLists();
        },
        sortChange(obj){
            if(obj.order == 'normal') {
                this.orderBy = ''
                this.getLists()
                return
            }
            this.orderBy = `${obj.key} ${obj.order}`
            this.getLists();
        },
        ok() {
            this.getLists()
        },
        getLists() {
            this.updateLoadingStatus({isLoading:true});
            let obj1 = {
                companyId: this.companyId,
                startTime: this.beforeTime,
                endTime: this.endDate,
                orderBy: this.orderBy,
                name: this.compact,
                pageSize: this.pageSize,
                pageNo: this.pageNo
            }
            crmStatistics.detailList(obj1).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.data1 = res.data.data
                }
            })
            .catch(errors.call(this))
            .finally(() => { this.updateLoadingStatus({isLoading:false});});
        },
        textChange() {
            // 搜索
            this.getLists();
        },
        changeData(data) {
                this.dataChecked = data.id;
                this.beginData = this.endData1 = ''
                let val = data.id
                if(val === 0) {
					this.beforeTime = new Date().format('yyyy-MM-dd');
					this.endDate = new Date(new Date().setDate(new Date().getDate() + 1)).format('yyyy-MM-dd');
                } else {
					this.beforeTime = new Date(new Date().setDate(new Date().getDate() - val)).format('yyyy-MM-dd');
					this.endDate = new Date().format('yyyy-MM-dd');
				}
				this.getSaleTel()
        },
        beginDateChange(data) {
            this.dataChecked = ''
            this.beforeTime = data
            if (this.endData1) {
                this.endDate = new Date(this.endData1).format('yyyy-MM-dd')
            } else {
                this.endDate = ''
            }
            this.getSaleTel()
        },
        endDateChange(data) {
            this.dataChecked = ''
            this.endDate = data
            if (this.beginData) {
                this.beforeTime = new Date(this.beginData).format('yyyy-MM-dd')
            } else {
                this.beforeTime = ''
            }
          
            this.getSaleTel()
        },
        datafunc() {
           return new Promise((resolve, reject) => {});
        },
        echartClick(ind,month,opt){
        	console.log(this.companyArray)
        	this.companyArray.forEach((v,k)=>{
        		if(v.label.search(month)!=-1){
        			this.filterVal=v.value;
        			this.$refs.table.handleFilterSelect (1, this.filterVal)
//      			this.$refs.table.cloneColumns[1]._filterChecked=this.filterVal;
        		}
        	});
        }
    }
}
</script>