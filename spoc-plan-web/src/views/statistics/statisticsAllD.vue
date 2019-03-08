<template>
    <div class="statisitcsAllGsx">
        <div class="titleFilter">
            <company-filter
            @toggleGroup='toggleGroup'
            >
            </company-filter>
            <statistics-time
            @upDateAnalyseSellDetail="upDateAnalyseSellDetail"
            :currentTime="currentTime"

            @clearStartTime='clearStartTime'
            @clearEndTime='clearEndTime'
            >
            </statistics-time>
        </div>
        <div class="table">
            <div class="title">
                <p>人均任务创建数 <i>{{data.alldata.avgTaskNum}}</i> ， 人均任务完成率 <b>{{data.alldata.avgFinishNum}}%</b> ，人均任务过期率 <i>{{data.alldata.avgOvertimeNum }}%</i> ，人均任务放弃比 <b>{{data.alldata.avgAbortNum}}%</b> </p>
                <Btnlists title="接案-列表" :btnList="btninfo"></Btnlists>
            </div>
            <div class="tableContent cancleBorder">
                <Table @on-select-all="signSelectAll" @on-selection-change="signChange" :columns="columns" :data="data.infodata.list"  @on-sort-change="onSortChange"></Table>
                <div class="page">
                    <Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange"  :current="data.infodata.pageNo" :total="data.infodata.count" @on-change="onPageChange" v-if="data.infodata.count>10"></Page>
                </div>
            </div>
        </div>
        <form class="formexport" :action="exportUrl" method="post" target="_blank">
			<input type="hidden" name="groupId" v-model="groupId" />
			<input type="hidden" name="endTime" v-model="endTime" />
			<input type="hidden" name="startTime" v-model="startTime" />
			<input type="hidden" name="officeId" v-model="officeId" />
			<input type="hidden" name="ids" v-model="signId" />
		</form>
    </div>
</template>

<script>
import Btnlists from '@public/modules/btnlist';
import valid, { errors, STATISTICS } from "../../libs/request"
import companyFilter from './components/companyFilter'
import statisticsTime from './components/statisticsTime'
import {mapGetters, mapState} from 'vuex'
export default {
    data() {
        return  {
            vText: '规划接案统计',
            exportUrl: '',
            officeId: '',
            groupId: '',
            orderFlag: '',
            order: '',
            pitchItem:[],
            currentTime: '',
            pageNo: '1',
            pageSize: '10',
            btninfo: [
                {
                    text: '导出',
                    type: 'default',
                    cls: 'bt2',
                    children: [
                        {
                            ind: 0,
                            text: '导出当前',
                            event: this.deriveCurrent,
                        },
                        {
                            ind: 1,
                            text: '导出所有',
                            event: this.deriveAll,
                        },
                    ],
                }
            ],
            signId: '',
            data: {
                pageNo: '1',
                count: '',
                list: [],
                infodata: {},
                alldata: {
                    avgAbortNum: '',
                    avgFinishNum: '',
                    avgTaskNum: '',
                }
            },
            startTime: '',
            endTime: '',
            officeId: '',	
            groupId: '',
            columns: [
                {
					type: "selection",
					width: 60,
					align: "center"
				},
                {
					title: "规划老师",
					key: "name",
                    align: "center",
                    render: (h, params) => {
						return h('a', {
							on:{
								click: () => {
                                     const { href } = this.$router.resolve({
                                    	name: "plan.personStatistics",
                                    })
                                    window.open(href+'?uid='+params.row.userId, '_blank')
								}
							}
                        }, params.row.name)
                    }
				},
				{
					title: "任务创建总数",
                    key: "taskNum",
                    sortable: "custom",
					align: "center",
				},
				{
					title: "平均任务数/学生",
                    key: "avgNum",
                    sortable: "custom",
					align: "center"
				},
				{
					title: "任务完成率",
                    key: "finishNum",
                    sortable: "custom",
                    align: "center",
                    render: (h, params) => {
                        return h('span', {},
                        params.row.finishNum + '%'
                        )
                    }
				},
				{
					title: "任务过期率",
					key: "overtimeNum",
					sortable: "custom",
                    align: "center",
                    render: (h, params) => {
                        return h('span', {},
                        params.row.overtimeNum + '%'
                        )
                    }
				},
				{
					title: "任务放弃比",
					key: "abortNum",
					sortable: "custom",
                    align: "center",
                    render: (h, params) => {
                        return h('span', {},
                        params.row.abortNum + '%'
                        )
                    }
				},
            ]
        }
    },
    
    components: {
        companyFilter,
        statisticsTime,
        Btnlists,
    },

    computed: {
        ...mapGetters('plan',['isAdmin', 'isPlanLeaser']),   
    },

    created() {
                
        this.getTime()
    },

    mounted() {
        if(this.isPlanLeaser) this.getViewPicRingDataInfo()
    },
    
    methods: {
        getTime() {
            STATISTICS.getTime({}).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.currentTime = res.data.data.date
                    this.handleData()
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        handleData() {
            this.startTime = `${this.currentTime.substr(0, 7)}-01`
            let [year, month] = this.currentTime.split('-')
            month = month / 1 + 1
            year = month > 12 ? year / 1 + 1 : year
            month = month > 12 ? month - 12 < 10 ? '0' + (month - 12) : month - 12 : month
            month = month < 10 ? `0${month}` : month
            this.endTime =  `${year}-${month}-01`
            if(this.isPlanLeaser) this.getViewPicRingDataInfo()
        },

        toggleGroup(comId, groupId) {
            this.officeId = comId
            this.groupId = groupId
            this.getViewPicRingDataInfo()
        },

        getViewPicRingDataInfo(type={}) {
            let obj = {
                officeId: this.officeId,
                groupId: this.groupId,
                startTime: this.startTime,
                endTime: this.endTime,
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                orderFlag: this.orderFlag,
                order: this.order,
            }
            STATISTICS.viewPicRingDataInfo(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.data = res.data.data
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        clearStartTime(val, val2) {
            if(val) {
               this.startTime = `${val}-01`
            }else {
                this.startTime = ''
            }
            if(val2) this.endTime = ''
            
            this.getViewPicRingDataInfo()
        },
        
        clearEndTime(val, val2) {
            if(val) {
               this.endTime = `${val}-01`
            }else {
                this.endTime = ''
            }
            if(val2) this.endTime = ''

            this.getViewPicRingDataInfo()
        },


        upDateAnalyseSellDetail(val) {
            this.startTime = val[0]
            this.endTime = val[1]
            this.getViewPicRingDataInfo()
        },

        signChange(obj) {
			this.getSignIds(obj)
		},

		signSelectAll(obj) {
			this.getSignIds(obj)			
		}, 

		getSignIds(obj) {
			this.signId = ''
			let str = ''
			if(obj.length == 0) {
				return
			}

			obj.forEach(item => {
				str += item.userId + ','
			})
			this.signId = str.substr(0, str.length-1)
			
        },
        
        onSortChange(obj) {

            // 排序方式 1任务总数 2平均任务数 3任务完成率 4任务过期率 5任务放弃比
			if(obj.order == 'normal') {
				this.orderFlag = ''
			}else {
                switch(obj.key) {
                    case 'taskNum': this.orderFlag = 1; break;
                    case 'avgNum': this.orderFlag = 2; break;
                    case 'finishNum': this.orderFlag = 3; break;
                    case 'overtimeNum': this.orderFlag = 4; break;
                    case 'abortNum': this.orderFlag = 5; break;
                }
            }

            if(obj.order == 'asc') {
                this.order = '0'
            }else {
                this.order = '1'
            }
            
            this.getViewPicRingDataInfo()
        },
        
        onPageSizeChange(val) {
			this.pageSize = val
		    this.getViewPicRingDataInfo()
		},

		onPageChange(val) {
			this.pageNo = val
			this.getViewPicRingDataInfo()
		},

        deriveCurrent() {
            let form = this.$el.querySelector('.formexport');
			if(!this.signId){
				this.$Message.error('请选择学院信息');
			}else{
				this.exportUrl = STATISTICS.exportSelectedPicRingDataInfo()
				this.$nextTick(()=>{
					form.submit();
				});
			}
        },

        deriveAll() {
            let form = this.$el.querySelector('.formexport');
            this.signId = ''
			this.exportUrl = STATISTICS.exportPicRingDataInfo()
			this.$nextTick(()=>{
				form.submit();
			});  
        }

    }
}
</script>

<style lang='less'>
    .statisitcsAllGsx {
        .table {
            .title {
                p {
                    font-size: 12px;
                    i,b {
                        font-style: normal;
                        font-size: 18px;
                    }
                    i {
                        color: red;
                    }
                    b {
                        color: #44bcbc;
                    }
                }
            }
            .tableContent {
                .page {
                    text-align: center;
                    margin-top: 20px;
                }
            }
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
