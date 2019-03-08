<style lang='less'>
    .formDetailGSX {
        border-top: 1px solid #e0e0e0;
        padding-top: 10px;
        .page {
            text-align: center;
            margin-top: 20px;
        }
        .yearIview {
			margin: 12px 0 18px;
			line-height: 33px;
			color: #b8b8b8;
			font-size: 12px;
        }
        .titleBar {
			font-size: 12px;
			.bar {
				margin-top: 10px;
			}

			span {
				display: inline-block;
				padding: 4px 10px;
				cursor: pointer;
			}

			.active {
				background-color: #44bcb7;
				color: white;
			}

			span:first-of-type {
				padding: 4px 0;
				color: #b8b8b8;
				cursor: auto;
            }  
        }   
        p {
            i {
                font-style: normal;
                color: #44bcbc;
                font-size: 18px;
            }
        }
        .ivu-table .ivu-table-header thead tr th:nth-child(5){
            text-align: center;
            background: #fff;
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
    .CRMADMINGSX1 {
        overflow: hidden;
        p {
            line-height: 40px;
        }
        p >span:first-child {
            color: #b8b8b8;
            display: inline-block;
            text-align: right;
            width: 99px;
        }
        .showTag >span:first-child {
            width: 0;
        }
        .left, .right {
            float: left;
        }
        .left {
            width: 99px;
            color: #b8b8b8;
            text-align: right;
        }
        .right {
            width: 579px;
            .tags {
                color: #fff;
                background-color: #d0d0d0;
                display: inline-block;
                line-height: 15px;
                padding: 4px 8px;
                margin-right: 20px;
                border-radius: 3px;
                margin-bottom: 8px;
            }
        }
        .editTag {
            .tags {
                color: #fff;
                background-color: #d0d0d0;
                display: inline-block;
                line-height: 15px;
                padding: 4px 8px;
                margin-right: 20px;
                border-radius: 3px;
                margin-top: 8px;
            }
        }
    }
</style>
<template>
    <div class="formDetailGSX">
        <div class="titleBar" v-if="isAdmin">
			<span>分公司：</span>
			<span v-for="(item, index) in controlledList" :key="index" :class="{active:index==num1}" @click="addClass1(index, item)" >{{item.companyName}}</span>
		</div>
        <div class="yearIview">　年份：
			<Select v-model="year" @on-change="getControlledSellList" style="width:176px">
				<Option v-for="item in yearList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
		</div>
		<div class="titleBar">
			<span>　月份：</span>
			<span v-for="(item, index) in monthList" :key="index" :class="{active:index==num}" @click="addClass(index, item)" >{{item}}</span>
		</div>
        <p>
            {{year}}年{{monthV ? monthV + '月' : ''}}：销售总目标 <i>{{dataInfo.totalObjectValue}}</i> 万元，月计资源总量 <i>{{dataInfo.totalPredictNum}}</i>，月计资源总分 <i>{{dataInfo.totalPredictScore}}</i> 。
            （集团下达：月资源总量 <i>{{dataInfo.totalCompanyPredictNum}}</i> ，月计资源总分 <i>{{dataInfo.totalCompanyPredictScore}}</i>）
        </p>
        <btnlist
            title="分单列表">
        </btnlist>
        <div class="cancleBorder">
            <Table :columns="columns" :data="data.list"  @on-sort-change="onSortChange"></Table>
        </div>
        <div class="page">
            <Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange"  :current="data.pageNo" :total="data.count" @on-change="onPageChange" v-if="data.count>10"></Page>
        </div>
        <!-- 弹出窗 -->
        <Modal
            v-model="modal1"
            width=728
            title="月计资源分配"
            @on-ok="ok"
            @on-cancel="cancel">
            <div class="CRMADMINGSX1">
                <p><span>销售顾问：</span>{{formInfo.userName}}</p>
                <p><span>分公司：</span>{{formInfo.officeName}}</p>
                <p><span>时间范围：</span>{{formInfo.timeScope}}</p>
                <p><span>月计资源量：</span>{{formInfo.predictNum}}</p> 
                <p><span>月计资源分值：</span>{{formInfo.predictScore}}</p>
                <div class="left">
                    <span>分单方向：</span>
                </div>
                <div class="right">
                    <span class="tags" v-for="(item, index) in formInfo.tags" :key="index">{{item.title}}</span>
                </div>
            </div>
        </Modal>
        <Modal
            v-model="modal2"
            width=728
            title="月计资源分配"
            :mask-closable="false"
            @on-ok="ok1"
            @on-cancel="cancelM2">
            <div class="CRMADMINGSX1">
                <p><span>销售顾问：</span>{{formInfo.userName}}</p>
                <p><span>分公司：</span>{{formInfo.officeName}}</p>
                <p>
                    <span>时间范围：</span>
                	<Select v-model="year" @on-change="getControlledSellList1" style="width:176px">
                        <Option v-for="item in yearList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                	<Select v-if="monthV" v-model="monthV" @on-change="monthChange" style="width:76px">
                        <Option v-for="item in monthList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </p>
                 <p>
                    <span>销售目标额：</span>
                    <Input v-model="formInfo.objectValue" :disabled='true'  style="width:260px"></Input>万元
                </p>
                <p>
                    <span>月计资源量：</span>
                    <Input v-model="defaultV" :disable='isDisable' style="width:260px"></Input>
                    <span style='margin-left:35px;color:#b8b8b8'>(提示：分公司月计资源总量{{dataInfo.totalObjectValue}})</span>
                </p>
                <p>
                    <span>月计资源分值：</span>
                    <Input v-model="formInfo.predictScore" :disable='isDisable' style="width:260px"></Input>
                    <span style='margin-left:35px;color:#b8b8b8'>(提示：分公司月计资源总量{{dataInfo.totalPredictNum}})</span>
                </p>
                <p class="showTag">
                    <tag-module
                        :style1="style1"
                        @getTagName='tagArrData'
                        :hasSelected='tagIdList'
                        pid='801'
                        :amend='true'
                        modelName='客户管理'
                    ></tag-module>
                <div class='editTag' style="margin-left:100px">
                    <span class="tags" v-for='(item, index) in tagList' :key="index">{{item}}</span>
                </div>
                </p>
            </div>
        </Modal>
        
    </div>
</template>

<script> 
    import {mapMutations,mapState,mapGetters} from 'vuex'
    import vSelect from '@public/modules/vSelect'
    import btnlist from '@public/modules/btnlist'
    import valid, { errors, common, sys, ADMIN } from "../../libs/request"
    import tagModule from '@public/modules/tagModule'
    export default {
        props: 
            ['compId'],
   

        data() {
            return {
                style1: {
                    color: '#b8b8b8',
                    display: 'inline-block',
                    textAlign: 'right',
                    width: '99px'
                },
                defaultV: '',
                tagList: [],
                companyId: this.compId || this.$route.query.cId,
                currentTime: '',
                num: '',
                num1: 0,
                controlledList: [],
                monthV: '',
                objectId: '',
                id: '',
                tags: '',
                tagIdList: [],
                yearList: [
                    {
                        value: "2019",
                        label: "2019"
                    },
                    {
                        value: "2018",
                        label: "2018"
                    },
                    {
                        value: "2017",
                        label: "2017"
                    },
                    {
                        value: "2016",
                        label: "2016"
                    }
                ],
                monthList1: [
                    {
                        value: "1",
                        label: "1月"
                    },
                    {
                        value: "2",
                        label: "2月"
                    },
                    {
                        value: "3",
                        label: "3月"
                    },
                    {
                        value: "4",
                        label: "4月"
                    },
                    {
                        value: "5",
                        label: "5月"
                    },
                    {
                        value: "6",
                        label: "6月"
                    },
                    {
                        value: "7",
                        label: "7月"
                    },
                    {
                        value: "8",
                        label: "8月"
                    },
                    {
                        value: "9",
                        label: "9月"
                    },
                    {
                        value: "10",
                        label: "10月"
                    },
                    {
                        value: "11",
                        label: "11月"
                    },
                    {
                        value: "12",
                        label: "12月"
                    },
                ],
                monthList: [
                    "全部",
                    "1月",
                    "2月",
                    "3月",
                    "4月",
                    "5月",
                    "6月",
                    "7月",
                    "8月",
                    "9月",
                    "10月",
                    "11月",
                    "12月"
                ],
                middMonth: '',
                year: new Date().getFullYear()+'',
                dataInfo: {
                    totalCompanyPredictNum: '',
                    totalCompanyPredictScore: '',
                    totalObjectValue: '',
                    totalPredictNum: '',
                    totalPredictScore: '',
                },
                formInfo: {},
                modal2: false,
                modal1: false,
                compact: '',
                pageSize: 10,
                pageNo: 1,
                data: {
                    count: 20,
                    list: [],
                    pageNo: 1,
                },
                orderBy: '',
                columns: [
                    {
                        title: "销售顾问",
                        key: "userName",
                        align: "center",
                    },
                    {
                        title: "销售目标(万元)",
                        key: "objectValue",
                        sortable: "custom",                        
                        align: "center",
                    },
                    {
                        title: "月预计资源量",
                        key: "predictNum",
                        align: "center",
                    },
                    {
                        title: "月预计资源分值",
                        key: "predictScore",
                        align: "center",
                    },
                    {
                        title: "分单方向",
                        key: "applyTime",
                        align: "left",
                        ellipsis: true,
                        render: (h, params) => {
                            if(params.row.tags) {
                                return h('div', 
                                { 
                                    style: {
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    },
                                },
                                params.row.tags.map(function(item){
                                return h('a',{
                                    style: {
                                        paddingRight: '15px',
                                    },
                                }, item.title);
                            }))
                            }else {
                                return h('p', '');
                            }
                        } 
                    },
                    {
                        title: "操作",
                        key: "dayTime",
                        align: "center",
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "a",
                                    {
                                    style: {
                                        marginRight: "10px",
                                        display: this.isDisable ? 'none': 'inline-block',
                                    },
                                    on: {
                                        click: () => {
                                            this.changeD(params.row);
                                        }
                                    }
                                    },
                                    "修改"
                                ),
                                h(
                                    "a",
                                    {
                                        style: {
                                        
                                    },
                                        on: {
                                            click: () => {
                                                this.ckeckD(params.row._index);
                                            }
                                        }
                                    },
                                    "查看"
                                ),
                            ])
                        }
                    },
                ]
            }
        },

        components: {
            vSelect,
            btnlist,
            tagModule
        },

        computed: {
            ...mapGetters('crm',['isAdmin']),
            isDisable() {
                let [yearC, monthC] = this.currentTime.split('-')
                if(!this.monthV) return true
                if(yearC < this.year || (yearC == this.year && Number(monthC) <= this.monthV)) return false
                return true
            }
        },

        mounted() {
            this.getYearList()
        },

        methods: {
            getYearList() {
                ADMIN.getYearList().then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.yearList = res.data.data
                        this.getTime()
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
            
            getTime() {
                common.newDate({}).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.currentTime = res.data.data.date
                        this.monthV = this.num = Number(this.currentTime.split('-')[1])+''
                        if(this.isAdmin) {
                            this.getControlledList()
                            return
                        }
                        this.getListPage()
                        
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },


            getListPage() {
                let timeScope, period
                if(!this.monthV) {
                    timeScope = this.year
                    period = 'year'
                }else {
                    timeScope = `${this.year}-${this.monthV < 10 ? '0' + this.monthV : this.monthV}`
                    period = 'month'
                }
                let obj = {
                    timeScope: timeScope,
                    pageSize: this.pageSize,
                    pageNo: this.pageNo,
                    companyId: this.companyId,
                    objectType: 'sales consultant',
                    period: period,
                    orderBy: this.orderBy,
                }
                ADMIN.listPage(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.data = res.data.data
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});

                // 获取总数
                let obj1 = {
                    timeScope: timeScope,
                    companyId: this.companyId,
                    objectType: 'sales consultant',
                    period: period
                }
                ADMIN.getTotal(obj1).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.dataInfo = res.data.data
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },

            // 获取全部分公司
            getControlledList() {
                let obj = {
                    grade: '2',
                    types: '1,3'
                }
                sys.controlledList(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.controlledList = res.data.data
                        this.num1 = this.controlledList.findIndex((item) => {
                            return item.id == this.companyId
                        })
                        this.getListPage()
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },

            addClass(index, month) {
                this.num = index
                if(month.match(/^[0-9]+/g)) {
                    this.monthV = month.match(/^[0-9]+/g)[0]
                }else {
                    this.middMonth = ''
                    this.monthV = ''
                }

                if(!index) {
                    this.monthV =  ''
                }
                this.getListPage()
            },

            addClass1(index, item) {
                this.companyId = item.id
                this.num1 = index
                this.getListPage()
            },

            monthChange(val) {
                this.num = val
            },

            getControlledSellList() {
                this.getListPage()
            },

            getControlledSellList1() {
                this.getListPage()
            },

            changeD(obj) {
                this.tags = ''
                this.tagIdList = obj.tags.map((item) => {
                    this.tags += item.id + ','
                    return item.id
                })
                this.tagList = obj.tags.reduce((prev, item) => {
                    prev.push(item.title)
                    return prev
                }, [])
                this.formInfo = this.data.list[obj._index]
                this.defaultV = this.formInfo.predictNum == 0 ? this.formInfo.objectValue / 0.5 : this.formInfo.predictNum
                this.id = obj.id
                this.objectId = obj.userId
                
                this.modal2 = true
            },

            ckeckD(index) {
                this.formInfo = this.data.list[index]
                this.modal1 = true
            },

            checkTag() {

            },

            // 获取tags 
            tagArrData(val, tags) {
                // console.log(tags)
                this.tagList = val
                this.tags = tags
            },

            onSortChange(obj) {
            // 排序字段，0：接案时间；1：交接时间；2：规划周期；默认规划周期
                if(obj.order == 'normal') {
                    this.orderBy = ''
                    this.getListPage()
                    return
                }
                this.orderBy = `${obj.key} ${obj.order}`
                this.getListPage()
            },

            onPageSizeChange(val) {
                this.pageSize = val
                this.getListPage()
            },

            onPageChange(val) {
                this.pageNo = val
                this.getListPage()
            },

            ok1() {
                let timeScope, period
                if(!this.monthV) {
                    timeScope = `${this.year}`
                    period = 'year'
                }else {
                    period = 'month'
                    timeScope = `${this.year}-${this.monthV < 10 ? '0' + this.monthV : this.monthV}`
                }

                let obj = {
                    objectType: 'sales consultant',
                    period: period,
                    timeScope: timeScope, 
                    predictNum: this.defaultV,
                    predictScore: this.formInfo.predictScore,
                    companyId: this.companyId,
                    tags: this.tags,
                    objectId: this.objectId
                }
                if(this.id) obj = Object.assign(obj, {id: this.id})
                ADMIN.adminDetailSave(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.$Message.info(res.data.message)
                        this.getListPage()
                    }
                })
                .catch(errors.call(this))
                .finally(() => {}); 
            },

            cancelM2() {
                this.getListPage()
            },

            ok() {

            },

            cancel(){

            },
        }
    }
</script>


