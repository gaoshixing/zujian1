<style lang='less'>
    .saleRankingGSX {
        border-top: 1px solid #e0e0e0;
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
        .allData {
            i {
                font-style: normal;
                font-size: 18px;
                color: #44bcb7;
            }
        }
        .echarts {
            // width: 100%;
            // // text-align: center;
			// padding: 40px 0 25px;
			// padding-left: 15%; 
			.echartbox{
				width: 100%;
				overflow-x: hidden;
			}
        }
        .page {
            text-align: center;
            margin-top: 20px;
            margin-bottom: 140px;
        }
        .cancleBorder {
            .ivu-table-wrapper {
                border: none;
            }
            .ivu-table:after {
                content: '';
                width: 0px;
                
            }
            .ivu-table-column-center {
                background-color: #fff;
            }
        }

    }

</style>

<template>
    <div class="saleRankingGSX">
        <BtnAndTime
			types="month"
			title="统计时间"
			:btnList="datalistss"
			@onclickChoseTags="onclickChoseTags"
			@getTargetDate="getTargetDate">
		</BtnAndTime>

        <div class="echarts">
            <echart-item res="bar" :data="eOption" :mstyle="estyle" v-if="echartsShow" class="echartbox"></echart-item>
        </div>

        <LargeTable
			types="sale"
            :pId="pid"
            :total='count'
            :showTags=false
			:exportExcel=true
			:loading="loading"
			:getInfoData="getInfoData"
            fixedHeader="saleName"
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

        <div class="page" v-if="count > 10">
            <Page show-total show-elevator show-sizer :total="count" :current="pageNo" v-if="count > 10" :page-size="pageSize" @on-page-size-change="pageSizeChange" @on-change="onPageChange"></Page>    
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations} from 'vuex';
    import BtnAndTime from '../../modules/btnAndTime';
	import LargeTable from '../../modules/largeTable';
	import { waitUntil, getTimeInterval, } from '@public/libs/util';
    import echartItem from './components/echartItem'
    import valid, {errors, common, sys, crmCustomerPub, crmStatistics} from "../../libs/request";
    import Sales from '../../schema/sales.js';
    export default {
        props: {
			pid: {
				type: String,
				required: true,
			},
		},
        data() {
            return {
				echartsShow: false,
                estyle: {
					width: '100%',
					height: '400px'
				},
				loading: false,
				getInfoData: null,
                startTimeV: '',
                endTimeV: '',
                placeholder: '请输入时间',
                num: 0,
                tags: [],
				count: 0,
				pageNo: 1,
				pageCount: 0,
                pageSize: 10,
                officeId: null,
                sort: 0, //排序
				orderType: '', //排序
				now: '', //今日
				largeTable: {
					tableData: [],
					checkBoxList: [],
					tableChecked: [],
					tableColumnList: Sales.salesForm,
				},
				dataList: [],
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
            }
        },
        
        components: {
            echartItem,
            LargeTable,
			BtnAndTime,
        },
        computed: {
			...mapGetters('crm', ['isBranchOfficeLeader', 'isSalerLeader', ]),
			//			...mapState(['userInfo']),
			//			isHeadcompany() {
			//				if(this.userInfo.companyType == 1 && this.userInfo.companyGrade == 2) {
			//					return false;
			//				} else {
			//					return true;
			//				}
			//			},
			eOption() {
				let d = this.dataList
				let companyList = []
				let data1 = []
				let data2 = []
				d.forEach(item => {
					item.companyName ? companyList.push(item.companyName) : companyList.push(item.name)
					data1.push(item.fallnum)
					data2.push(item.getnum)
				})
				let obj = {
					color: ['#3398DB'],
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        },
						formatter: function(datas) {
							var res = `${datas[0].name ? datas[0].name : datas[0].companyName} <br/>`,
							val
							for(var i = 0, length = datas.length; i < length; i++) {
								res += "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:" + datas[i].color + ";'></span>"
								val = `${(datas[i].value)}`;
								res += datas[i].seriesName + '：' + val + '<br/>';
							}
							res = `${res}<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:red'></span>掉单率：${d[datas[0].dataIndex].rate ? d[datas[0].dataIndex].rate : d[datas[0].dataIndex].fallRate ? d[datas[0].dataIndex].fallRate : 0}%`
							return res;
						}
					},
					legend: {
						type: 'plain',
						orient: 'horizontal',
						data: ['掉单量','抢单量',],
						selected: ['掉单量','抢单量',],
						textStyle:{
							color:'#a9a9a9'
                        },
                        // bottom:
                        
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
						name: '(个)',
						axisLine: {
							show: false
						},
						axisTick: {
							show: false,
						},
						// minInterval: 1,
					}, {
						type: 'value',
						name: '(个)',
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
					series: [ {
						name: '掉单量',
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
						name: '抢单量',
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
					}]
				};
				return obj;
			}
        },
        created() {
			new Sales(this);
			this.getShowTitle();
        },
        
        mounted() {
			this.updateLoadingStatus({isLoading:true});
			this.getNow();
			/*
			* 权限控制 分总 销总 无法查看分公司的数据
			*/
			waitUntil(() => {
				return !!(this.isBranchOfficeLeader || this.isSalerLeader);
			}, () => {
				if (this.isBranchOfficeLeader || this.isSalerLeader) {
					this.$delete(this.largeTable.tableColumnList, 'office');
				}
			});
		},

        methods: {
			...mapMutations(['updateLoadingStatus']),
			getCompanyFallGetNum() {
				this.echartsShow = true
				let data = {
					startDate: this.startTime,
					endDate: this.endTime,
				};
				if (this.isBranchOfficeLeader || this.isSalerLeader) {
					data = Object.assign(data, {
						type: 'd'
					})
					crmStatistics.saleFallRate(data).then(valid.call(this)).then(res => {
						if (res.ok) {
							this.dataList = res.data.data
						}
					}).catch(errors.call(this));
					return
				}
				crmStatistics.getCompanyFallGetNum(data).then(valid.call(this)).then(res => {
					if (res.ok) {
						this.dataList = res.data.data
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
				this.getLargeTableData();
				this.getCompanyFallGetNum()
            },
            getTargetDate(d1, d2) {
                this.startTime = new Date(d1).format('yyyy-MM') + '-01 00:00:00';
                this.endTime = new Date(d2).format('yyyy-MM') + '-01 00:00:00';
				this.getLargeTableData();
				this.getCompanyFallGetNum()
            },
            getNow(){
                common.newDate({}).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        const rdata = new Date(res.data.data.date.substring(0,19)).format('yyyy-MM-dd') + ' 00:00:00';
                        this.startTime = rdata;
                        this.endTime =  new Date(new Date(rdata).setDate(new Date(rdata).getDate() + 1)).format('yyyy-MM-dd') + ' 00:00:00';
						this.getLargeTableData();
						this.getCompanyFallGetNum()
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
				crmStatistics.listShowTileBySale({ type: 3, }).then(valid.call(this)).then(res => {
					if (res.ok) {
						this.largeTable.tableChecked = res.data.data;
						this.largeTable.checkBoxList = res.data.data;
					}
				}).then(errors.call(this));
			},
			saveListShowTitle(data) {
				const datas = Object.assign(data, { type: 3, });
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
					startTime: this.startTime,
					endTime: this.endTime,
					officeId: this.officeId,
					orderType: this.orderType,
					sort: this.sort,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					srcType: "3",
				};
				this.getInfoData = data;
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
		}
    }
</script>

