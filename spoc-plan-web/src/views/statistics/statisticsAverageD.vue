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
                <p>总接案学生数 <i>{{data.map.all}}</i> ， 未交接学生总数 <b>{{data.map.notHanded}}</b> ， 每位规划顾问平均接案学生 <i>{{data.map.studentAVG}}</i></p>
                <Btnlists title="接案-列表" :btnList="btninfo"></Btnlists>
            </div>
            <div class="tableContent cancleBorder">
                <Table @on-select-all="signSelectAll" @on-selection-change="signChange" :columns="columns" @on-filter-change="filterChange" :data="data.page.list"  @on-sort-change="onSortChange"></Table>
                <div class="page">
                    <Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange"  :current="pageNo" :total="data.page.count" @on-change="onPageChange" v-if="data.page.count>10"></Page>
                </div>
            </div>
        </div>
        <!-- 弹出框 -->
        <Modal
            v-model="modal1"
            width=628
            title="设置接案上限"
            @on-ok="ok"
            @on-cancel="cancel">
                <p style="margin-bottom: 20px">请设置规划顾问同期内最多可接案的学生人数。</p>
                <p><span style="margin-right: 20px">{{userName}}：</span>  <InputNumber :max="99" :min="1" v-model="value1"></InputNumber></p>
        </Modal>
        <form class="formexport" :action="exportUrl" method="post" target="_blank">
			<input type="hidden" name="groupId" v-model="groupId" />
			<input type="hidden" name="endTime" v-model="endTime" />
			<input type="hidden" name="startTime" v-model="startTime" />
			<input type="hidden" name="status" v-model="status" />
			<input type="hidden" name="officeId" v-model="officeId" />
			<input type="hidden" name="ids" v-model="signId" />
		</form>
    </div>
</template>

<script>
import Btnlists from '@public/modules/btnlist';
import valid, { errors, STATISTICS, sys } from "../../libs/request"
import companyFilter from './components/companyFilter'
import {mapGetters, mapState} from 'vuex'
import statisticsTime from './components/statisticsTime'
export default {
    data() {
        return  {
            exportUrl: '',
            value1: 1,
            userName: '',
            userNameId: '',
            vText: '规划接案统计',
            modal1: false,
            orderByType: '',
            officeId: '',
            orderByStatus: '',
            status: '',
            groupId: '',
            orderByStatus: '',
            pitchItem:[],
            currentTime: '',
            btninfo: [
                {
                    text: '导出',
                    type: 'default',
                    cls: 'bt2',
                    children: [
                        {
                            text: '导出当前',
                            event: this.deriveCurrent
                        },
                        {
                            text: '导出所有',
                            event: this.deriveAll
                        },
                    ],
                },
            ],
            signId: '',
            pageSize: 10,
            pageNo: 1,
            data: {
                page: {},
                map: {},
                count: '',
                list: [],
            },
            startTime: '2018-01-01',
            endTime: '2019-01-01',
            officeId: '',	
            columns: [
                {
					type: "selection",
					width: 60,
					align: "center"
				},
                {
					title: "规划老师",
					key: "userName",
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
                        }, params.row.userName)
                    }
				},
				{
					title: "累计服务学生",
                    key: "all",
                    sortable: "custom",
					align: "center",
				},
				{
					title: "已交接",
                    key: "handed",
                    sortable: "custom",
					align: "center"
				},
				{
					title: "服务中",
                    key: "notHanded",
                    align: "center",
                    filterMultiple: false,
                    filterRemote() {
                    }
				},
				{
					title: "预计交接学生",
					key: "expectedHandover",
					sortable: "custom",
					align: "center",
				},
				{
					title: "预计接案余额",
					key: "remainingCase",
					sortable: "custom",
					align: "center",
				},
				{
					title: "操作",
                    align: "center",
                    render: (h, params) => {
						return h('a', {
								style: {
									color: '#3b9ad1',
									cursor:'pointer',
								},
								on:{
									click: () => {
                                        this.showDialog(params.row)
									}
								}
                            }, '设置接案上限')
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
        this.getTableSelect()
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

        getViewPicRingDataInfo(params={}) {
            if(params == 'first') {
                this.startTime = `${this.currentTime.substr(0, 7)}-01`
                let [year, month] = this.currentTime.split('-')
                month = month / 1 + 1
                year = month > 12 ? year / 1 + 1 : year
                month = month > 12 ? month - 12 < 10 ? '0' + (month - 12) : month - 12 : month
                month = month < 10 ? `0${month}` : month
                this.endTime =  `${year}-${month}-01`
            }

            let obj = {
                officeId: this.officeId,
                groupId: this.groupId,
                startTime: this.startTime,
                endTime: this.endTime,
                status: this.status,
                pageSize: this.pageSize,
                pageNo: this.pageNo,  
            }
            if(params) {
                obj = Object.assign(obj, params)
            }
            STATISTICS.listStudentCase(obj).then(valid.call(this))
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

        showDialog(val) {
            this.value1 = val.max
            this.modal1 = true
            this.userName = val.userName
            this.userNameId = val.userId
        },

        ok() {
            let obj = {
                max: this.value1,
                id: this.userNameId
            }
            STATISTICS.updateMax(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.$Message.info(res.data.message)
                    this.getViewPicRingDataInfo()
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        cancel() {

        },

        getTableSelect() {
            let obj = {
                type: 'pl_service_status_status'
            }
            sys.listData(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.$set(this.columns[4], 'filters', res.data.data)
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        
        filterChange(val) {
            this.status = val._filterChecked[0]
            this.getViewPicRingDataInfo()
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
            if(obj.order == 'normal') {
                this.getViewPicRingDataInfo()
                return
            }
            let key = obj.key
            switch(key) {
                case 'all': this.orderByType = 0 ; break;
                case 'handed': this.orderByType = 1 ; break;
                case 'expectedHandover': this.orderByType = 2 ; break;
                case 'remainingCase': this.orderByType = 3 ; break;
            }

			if(obj.order == 'asc') {
                this.orderByStatus = '1'
            }else {
                this.orderByStatus = '0'
            }
            let params ={
                orderByType: this.orderByType,
                orderByStatus: this.orderByStatus,
            }

            this.getViewPicRingDataInfo(params)
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
				this.exportUrl = STATISTICS.exportSelectedListStudentCase()
				this.$nextTick(()=>{
					form.submit();
				});
			}
        },

        deriveAll() {
            let form = this.$el.querySelector('.formexport');
            this.signId = ''
			this.exportUrl = STATISTICS.exportFileListStudentCase()
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
