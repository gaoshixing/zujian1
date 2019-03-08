<style lang='less'>
    .resourceDetailGSX {
        .timeFilter {
            span {
				display: inline-block;
				padding: 4px 10px;
				cursor: pointer;
			}
			.active {
				background-color: #44bcb7;
				color: white;
			}
        }
        .page {
            text-align: center;
            margin-top: 20px;
        }
        .allData {
            i {
                font-style: normal;
                font-size: 18px;
                color: #44bcb7;
            }
        }
        .echars {
			.echartbox{
				width: 100%;
				overflow-x: auto;
			}
            // text-align: center;
        }
    }
    .page-box {
			margin-top: 20px;
            text-align: center;
            margin-bottom: 140px;
		}

</style>
<template>
    <div class="resourceDetailGSX">

        <BtnAndTime
			types="month"
			title="统计时间"
			:btnList="datalistss"
			@onclickChoseTags="onclickChoseTags"
			@getTargetDate="getTargetDate">
		</BtnAndTime>

        <div class="echars">
            <echart-item :data="data10" v-if="echartsShow" class="echartbox" :mstyle="{width: '100%',height:'650px'}"  @on-click="echartClick">
			</echart-item>
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
				v-if="count > 10"
                :current="pageNo"
                :page-size="pageSize" 
                @on-page-size-change="pageSizeChange"
                @on-change="onPageChange"></Page>
        </div>
    </div>
    
</template>

<script>
    import valid, {errors, common, sys, crmCustomerPub, crmStatistics} from "../../libs/request";
    import { mapGetters, mapMutations} from 'vuex';
    import BtnAndTime from '../../modules/btnAndTime';
    import LargeTable from '../../modules/largeTable';
    import { waitUntil, getTimeInterval, } from '@public/libs/util';
    import Sales from '../../schema/sales.js';
    import echartItem from '../pond/echartItem'

    const color=['#5a9cd3','#85ca48','#e8722b','#adc2e6','#fdb802','#3967bc','#9a9b9c','#66a041','#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
    export default {
        props: {
            pid: {
                type: String,
                required: true,
            },
        },
        data() {
            return  {
                echartsShow: false,
                startTime: '',
                endTime: '',
                name: null,
                tags: [],
                count: 0,
                pageNo: 1,
                pageCount: 0,
                pageSize: 10,
                officeId: null,
				officeList:[],
                sort: null,
				orderType: null,
				loading: false,
                largeTable: {
                    tableData: [],
                    checkBoxList: [],
                    tableChecked: [],
                    tableColumnList: Sales.salesForm,
                },
                datalistss: [
					{
						title: '当前月',
						type: 'month',
						ms: -1,
					},
					{
						title: '最近3个月',
						type: 'month',
						ms: -3,
					},
					{
						title: '最近6个月',
						type: 'month',
						ms: -6,
					},
					{
						title: '今年',
						type: 'year',
						ms: 0,
					},
                ],
                dataMain: {
                    data10: []
                }
            }
        },

        computed: {
            ...mapGetters('crm', ['isBranchOfficeLeader', 'isSalerLeader', ]),
            data10(){
				let d = this.dataMain.data10;
				let s=[];
				let titles=[];
				let vals={};
				let types = {
					finishRate:'目标完成率',
					otherFinish:'资源转换率（其他来源）',
					baiduFinish:'资源转换率 (百度)'
				}
				d.forEach((item,index)=>{
					titles.push(item.companyName);
					for(let i in types){
						if(!vals[i]){
							vals[i]=[];
						}
						vals[i].push(item[i]);
					}
				});

				for(let i in types){
					let name = types[i];
					const exam = {
						name: name,
						type: 'bar',
                        itemStyle: {
							color: name=='目标完成率' ? '#fad337': name=='资源转换率（其他来源）' ? '#3aa0ff' : '#4dcb73',
							barBorderRadius: [0, 2, 2, 0],
						},
						label: {
							show: true,
							position: 'right',
							//							distance: '10',
							formatter: (item) => {
								if (item.value) {
									return item.value + '%'
								} else {
									return ''
								}
							}
                        },
                        barWidth: '12',
						barGap: 0,                        
						data: vals[i]
					};
					s.push(exam)
                }
                
                let self = this;
				let obj = {
					color: ['#3398DB'],
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						},
						formatter:(datas) => {
						    var res = `分公司：${datas[0].name}<br/>统计时间：${d[datas[0].dataIndex].startDate}至${d[datas[0].dataIndex].endDate}<br/>`,
								val;
							for(var i = 0, length = datas.length; i < length; i++) {
								// res += "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:" + datas[i].color + ";'></span>"
								val = `${(datas[i].value)}`;
								res += datas[i].seriesName + '：' + val + '%<br/>';
							}
							res += `签约总业绩：${d[datas[0].dataIndex].fact}<br/>目标销售额：${d[datas[0].dataIndex].goal}<br/>资源数量（百度类）：${d[datas[0].dataIndex].baiduNum}<br/>资源数量（其他来源）：${d[datas[0].dataIndex].otherNum}<br/>`
							return res;
						}
					},
					legend: {
						type: 'plain',
						orient: 'horizontal',
						data: ['目标完成率', '资源转换率（其他来源）', '资源转换率 (百度)', ],
						textStyle: {
							color: '#a9a9a9'
						}
					},
					grid: {
						left: '4%',
						right: '4%',
						bottom: '8%',
						top: '8%',
						containLabel: true
					},
					xAxis: [{
						type: 'value', 
						maxInterval: 10,
						axisLine: {
                            show: true,
                            lineStyle: {
								color: '#e0e0e0'
							}
						},
						axisTick: {
							show: false,
						},
						axisLabel: {
                            margin: 10,
                            color: '#000',                            
							formatter: '{value} %'
						},
						splitLine: {
							show: false,
						}
					}, ],
					yAxis: [{
						type: 'category',
						data: titles,
						axisTick: {
							alignWithLabel: true,
							show: false
						},
						axisLabel: {
							margin: 20,
                            color: '#000',
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: '#e0e0e0'
							}
						},
					}],
					series: s
				};
				return obj;
			},
        },

        components: {
            echartItem,
            LargeTable,
			BtnAndTime,
        },

        created() {
            sys.controlledList().then(valid.call(this)).then(res => {
                if (res.ok) {
                    let tempArr = res.data.data.map(item => ({label: item.companyName, value: item.id}));
                    this.officeList=tempArr;
                }
            }).catch(errors.call(this));
			this.getShowTitle();
        },

        mounted() {
            new Sales(this);
			this.updateLoadingStatus({isLoading:true});
            this.getNow();
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
            showEchart() {
                // if(!this.beforeTime && !this.endDate) {
                //     this.beforeTime = `${new Date(new Date().setMonth(new Date().getMonth())).format('yyyy-MM')} 01`
                //     this.endDate = new Date().format('yyyy-MM-dd')
                //     this.num = 0
                // }
                this.echartsShow = true
                let obj = {
                    startDate: this.startTime,
					endDate: this.endTime,
					type: 'q'
				}
                crmStatistics.getCompanyFinishRate(obj).then(valid.call(this)).then(res => {
					if (res) {
						this.dataMain.data10 = res.data.data
					}
				}).catch(errors.call(this));
                this.dataMain.data10
            },
			/*
			* 日期选择 
			*/
			onclickChoseTags(type, ms, index) {
                const data = getTimeInterval(type, ms, true);
				this.startTime = type === 'month' ? data.startTime + '-01 00:00:00' :  data.startTime + '-01-01 00:00:00';
				this.endTime = type === 'month' ? data.endTime + '-01 00:00:00' :  data.endTime + '-01-01 00:00:00';
				this.endTime = index == 0 ? new Date().format('yyyy-MM-dd 00:00:00') : this.endTime;
				this.showEchart();
				this.getLargeTableData();
			},
			getTargetDate(d1, d2) {
				this.startTime = new Date(d1).format('yyyy-MM') + '-01 00:00:00';
				this.endTime = new Date(d2).format('yyyy-MM') + '-01 00:00:00';
				this.showEchart();
				this.getLargeTableData();
			},
			getNow(){
				common.newDate({}).then(valid.call(this))
				.then(res => {
					if(res.ok) {
						const rdata = new Date(res.data.data.date.substring(0,19)).format('yyyy-MM-dd') + ' 00:00:00';
						// this.startTime = rdata;
                        // this.endTime =  new Date(new Date(rdata).setMonth(new Date(rdata).getMonth() + 1)).format('yyyy-MM') + '-01 00:00:00';
						this.startTime = new Date(new Date().setMonth(new Date(rdata).getMonth())).format('yyyy-MM') + '-01 00:00:00';
                        this.endTime =  rdata;
                        this.showEchart();
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
				crmStatistics.listShowTileBySale({ type: 2, }).then(valid.call(this)).then(res => {
					if (res.ok) {
						this.largeTable.tableChecked = res.data.data;
						this.largeTable.checkBoxList = res.data.data;
					}
				}).then(errors.call(this));
			},
			saveListShowTitle(data) {
				const datas = Object.assign(data, { type: 2, });
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
					period: 'month',
					name: this.name,
					tags: this.tags,
					startTime: new Date(this.startTime).format('yyyy-MM-dd'),
					endTime: new Date(this.endTime).format('yyyy-MM-dd'),
					officeId: this.officeId,
					orderType: this.orderType,
					sort: this.sort,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					srcType: "2",
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
				}).catch(errors.call(this)).finally(()=>{
					this.loading = false;
					this.updateLoadingStatus({isLoading:false});
				});
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
			echartClick(ind, month, opt) {
				console.log(month,666)
				this.officeList.forEach((v, k) => {
					if(v.label.search(month) != -1) {
						this.officeId=v.value;
						this.getLargeTableData();
					}
				});
			}
		},
    }
</script>

