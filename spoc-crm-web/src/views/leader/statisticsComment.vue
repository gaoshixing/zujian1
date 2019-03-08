<style lang='less'>
    .statisticsCommentGSX {
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
            b {
                font-size: 18px;
                color: red;
                font-weight: 400;
            }
        }
        .echars {
            .statSum {
                overflow: hidden;
                margin: 150px 50px;
                display: inline-block;
                width: 237px;
                height: 182px;
                box-shadow: 0 0 5px #cccccc;
                text-align: center;
                span {
                    color: #999;
                    display: block;
                    margin-top: 21px;
                }
                p {
                    font-size: 20px;
                    margin-top: 8px;
                    i {
                        color: #44bcb7;
                        font-style: normal;
                        margin-right: 5px;
                    }
                }
            }
            .echarsItem {
                padding-top: 15px;
            }
        }
    }

</style>
<template>
    <div class="statisticsCommentGSX">
        <p class="timeFilter">
            <span>统计时间：</span>
			<span v-for="(item, index) in monthList" :key="index" :class="{active:index==num}" @click="addClass(index, item)" >{{item}}</span>
            <DatePicker v-model="startTimeV" @on-change="beforeChange" format="yyyy-MM-dd" type="date" transfer :placeholder="placeholder" style="width: 160px"></DatePicker>
				——
		    <DatePicker v-model="endTimeV" @on-change="afterChange" format="yyyy-MM-dd" type="date" transfer :placeholder="placeholder" style="width: 160px"></DatePicker>
		</p>
        <div class="echars">
            <div class="statSum">
                <span>点评总次数</span>
                <p><i>{{dataMain.reviewCount}}</i>次</p>
                <span>发起点评总人数</span>
                <p><i>{{dataMain.reviewerCount}}</i>人</p>
            </div>
            <echart-item :data="data9" class="echarsItem" :mstyle="{width:'850px',height:'400px'}">
			</echart-item>
        </div>
        <v-select 
            style="width: 396px;margin: 15px 0;"
            placeholder="输入点评人/点评对象姓名"
            :datafunc="datafunc"
            icon="search" 
            v-model="compact"
            k='cnname'
            @on-enter="textChange" 
            @on-click="textChange" 
            @selected="textChange">
        </v-select>
        <p class="allData"><i>{{data.reviewerCount}}</i>人发起点评，点评总计 <b>{{data.page.count}}</b> 次</p>
        <btnlist
            title="点评人列表">
        </btnlist>
        <div class="cancleBorder">
            <Table :columns="columns" :data="data.page.list" @on-filter-change="filterChange"  @on-sort-change="onSortChange"></Table>
        </div>
        <div class="page">
            <Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange"  :current="pageNo" :total="data.page.count" @on-change="onPageChange" v-if="data.page.count>10"></Page>
        </div>
    </div>
</template>

<script>
    import vSelect from '@public/modules/vSelect'
    import btnlist from '@public/modules/btnlist'
    import echartItem from './components/echartItem'
    import valid, { errors, common, sys, STATISTICSC } from "../../libs/request";
    const color=['#5a9cd3','#85ca48','#e8722b','#adc2e6','#fdb802','#3967bc','#9a9b9c','#66a041','#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
    export default {
        data() {
            return  {
                pageSize: 10,
                pageNo: 1,
                num: 0,
                compact: '',
                monthList: [
                    "今天",
                    "最近7天",
                    "最近30天",
                ],
                data: {
                    page: {
                        list: [],
                    },
                    count: 22,
                    allPeople: 2,
                },
                columns: [
                    {
                        title: "点评人",
                        key: "reviewName",
                        align: "center",
                    },
                    {
                        title: "分公司",
                        key: "officeName",
                        align: "center",
                        filters: [],
                        filterMultiple: false,
                        filterRemote :() => {
                        }
                    },
                    {
                        title: "点评对象(销售顾问)",
                        key: "adviserName",
                        align: "center",
                        render: (h, params) => {
                            return h('a', {
                                on: {
                                    click: () => {
                                        this.$router.push(
                                            {
                                                name: 'crm.salesStatistics',
                                                query: {
                                                    uid: params.row.id,
                                                }
                                            }
                                        )
                                    }
                                }
                            },
                            params.row.adviserName
                            )
                        }
                    },
                    {
                        title: "客户姓名",
                        key: "customerName",
                        align: "center",
                        render: (h, params) => {
                            return h('a', {
                                on: {
                                    click: () => {
                                        this.$router.push(
                                            {
                                                name: 'crm.detail',
                                                query: {
                                                    id: params.row.customerId,
                                                    from: 'myclient',
                                                },
                                            }
                                        )
                                    }
                                }
                            },
                            params.row.customerName
                            )
                        }
                    },
                    {
                        title: "点评时间",
                        key: "reviewTime",
                        sortable: "custom",
                        align: "center",
                    }
                ],
                startTimeV: '',
                endTimeV: '',
                officeId: '',
                orderBy: '',
                placeholder: '请输入时间',
                dataMain: {
                    list: [],
                    reviewCount: '',
                    reviewerCount: '',
                }
            }
        },

        computed: {
            data9(){
				let d = this.dataMain.list;
				let titles= [];
				let data = d.map(item=>{
					titles.push(item.reviewName);
					return {value:item.reviewCount,name:item.reviewName};
				});

				let option = {
					tooltip: {
						// backgroundColor:'rgba(200,200,200,0.7)',
						trigger: 'axis',
						textStyle:{
							color:'#fff'
						},
						formatter:(param)=>{
							param=param[0];
							const item = d.find(item=>item.reviewName==param.name);
							if(item){
                                return `　　点评人：${item.reviewName}</br>
                                        点评总次数：${item.reviewCount}次</br>`
							} else{
								console.info('not found');
							}
						},
                    },
                    
                    title: {
                        text: '销售签约业绩排名-Top 10',
                        left: '30%',
                        textStyle: {
                            fontWeight: 500,
                            fontSize: 18,
                        }
                    },
					grid: {
						top: '10%',
						left: '3%',
						right: '10%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: {
                        type: 'value',
                        name: '(次)',
                        position: 'top',
                        axisTick: {
                            inside: true,
                        },
                        axisLabel: {
                            inside: true,
                        }
					},
					yAxis: {
						type: 'category',
						data: titles
					},
					color,
					series: [
						{
							type: 'bar',
							barWidth:'30%',
							label:{
								normal: {
									show: true,
									position: 'right',
									formatter:'{c}'
								}
							},
							data: data
						}
					]
				};
				return option;
			},
        },

        components: {
            vSelect,
            btnlist,
            echartItem
        },
        
        mounted() {
            this.getOfficeList()
            this.getReviewList()
            this.getReviewBar()
        },

        methods: {
            getOfficeList() {
                let obj = {
                    grade: 2,
                    types: '1,3'
                }
                sys.officeList(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        let arr = res.data.data.allCompany.forEach((item, index) => {
                            let obj = {}
                            obj.label = item.remarks
                            obj.value = item.id
                            this.$set(this.columns[1].filters, index, obj)
                        })
                        
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },

            getReviewList() {
                let obj = {
                    timeType: this.num == 0 ? 0 : this.num == 1 ? 7 : this.num == 2 ? 30 : '',
                    startTime: this.startTimeV,
                    endTime: this.endTimeV,
                    keyWord: this.compact,
                    officeId: this.officeId,
                    orderBy: this.orderBy,
                    pageSize: this.pageSize,
                    pageNo: this.pageNo,
                }

                STATISTICSC.reviewList(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.data = res.data.data
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },

            getReviewBar() {
                let obj = {
                    timeType: this.num == 0 ? 0 : this.num == 1 ? 7 : this.num == 2 ? 30 : '',
                    startTime: this.startTimeV,
                    endTime: this.endTimeV,
                }

                STATISTICSC.reviewBar(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.dataMain = res.data.data
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },

            addClass(index, item) {
                this.num = index
                this.startTimeV = ''
                this.endTimeV = ''
                if(index == 0) this.timeType = 0
                if(index == 1) this.timeType = 7
                if(index == 2) this.timeType = 30
                this.getReviewList()
                this.getReviewBar()
            },

            filterChange(val) {
                if (val._filterChecked.length) {
                    this.officeId = val._filterChecked[0]
                } else {
                    this.officeId = ''
                }
                this.getReviewList()
            },
            
            onSortChange(val) {
                if(val.order == 'asc') {
                    this.orderBy = 'a.create_date ASC'
                } else if (val.order == 'desc') {
                    this.orderBy = 'a.create_date DESC'
                } else {
                    this.orderBy = ''
                }
                this.getReviewList()
            },
            
            onPageSizeChange(val) {
                this.pageSize = val
                this.getReviewList()
            },

            onPageChange(val) {
                this.pageNo = val
                this.getReviewList()
            },

            datafunc() {
                return new Promise((resole, reject) => {

                })
            },

            textChange() {
                this.getReviewList()
            },

            beforeChange(val) {
                this.num = '888'
                this.startTimeV = val
                if(!val&&!this.endTimeV) {
                    this.num = 0
                }
                this.getReviewList()
                this.getReviewBar()
            },

            afterChange(val) {
                this.num = '888'
                this.endTimeV = val
                if(!val&&!this.startTimeV) {
                    this.num = 0
                }
                this.getReviewList()
                this.getReviewBar()
            }
        }
    }
</script>


