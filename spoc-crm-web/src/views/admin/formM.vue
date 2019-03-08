<style lang='less'>
    .formMGSX {
        border-top: 1px solid #e0e0e0;
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
        .ivu-table .ivu-table-header thead tr th:nth-child(3){
            text-align: center
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
    .CRMADMINGSX {
        p {
            line-height: 40px;
            .tag {
                color: #fff;
                background-color: #d0d0d0;
                display: inline-block;
                line-height: 15px;
                padding: 4px 8px;
                margin-left: 20px;
                border-radius: 3px;
            }
        }
        p >span:first-child {
            color: #b8b8b8;
            display: inline-block;
            text-align: right;
            width: 99px;
        }
    }

    

</style>
<template>
    <div class="formMGSX">
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
        <div class="yearIview">年份：
			<Select v-model="yearM" @on-change="getControlledSellList" style="width:176px">
				<Option v-for="item in yearList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
		</div>
		<div class="titleBar">
			<span>月份：</span>
			<span v-for="(item, index) in monthList" :key="index" :class="{active:index==num}" @click="addClass(index, item)" >{{item}}</span>
		</div>
        <p>{{yearM}}年{{monthV?monthV+'月':''}}：销售总目标<i>{{dataInfo.totalObjectValue}}</i>万元，月计资源总量<i>{{dataInfo.totalPredictNum}}</i>，月计资源总分<i>{{dataInfo.totalPredictScore}}</i></p>
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
            <div class="CRMADMINGSX">
                <p><span>分公司：</span>{{formInfo.companyName}}</p>
                <p><span>时间范围：</span>{{formInfo.timeScope}}</p>
                <p><span>销售目标额：</span>{{formInfo.objectValue}}</p>
                <p><span>月计资源总量：</span>{{formInfo.predictNum}}</p>
                <p><span>月计资源总分：</span>{{formInfo.predictScore}}</span></p>
            </div>
        </Modal>
        <Modal
            v-model="modal2"
            width=728
            title="月计资源分配"
            @on-ok="ok1"
            @on-cancel="cancel1">
            <div class="CRMADMINGSX">
                <p>
                    <span>分公司：</span>{{formInfo.companyName}}
                </p>
                <p>
                    <span>时间范围：</span>
                    <Select v-model="yearM" @on-change="getControlledSellList1" style="width:176px">
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
                <p v-if="!isDisable">
                    <span>月计资源总量：</span>
                    <Input v-model="defaultV" :disabled='isDisable' style="width:260px"></Input>
                </p>
                <p v-else>
                    <span>月计资源总量：</span>
                    <Input v-model="formInfo.predictNum" :disabled='isDisable' style="width:260px"></Input>
                </p>
                <p>
                    <span>月计资源总分：</span>
                    <Input v-model="formInfo.predictScore" :disabled='isDisable' style="width:260px"></Input>
                </p>
            </div>
        </Modal>
    </div>
</template>

<script> 
    import vSelect from '@public/modules/vSelect'
    import btnlist from '@public/modules/btnlist'
    import valid, { errors, common, sys, ADMIN } from "../../libs/request";

    export default {
        data() {
            return {
                defaultV: '',
                num: '',
                yearM: new Date().getFullYear()+'',
                currentM: '3',
                monthV: '',
                objectId: '',
                id: '',
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
                month: '',
                orderBy: '',
                dataInfo: {
                    totalObjectValue: '',
                    totalPredictNum: '',
                    totalPredictScore: '',
                    // totalObjectValue: '',
                    // totalPredictNum: '',
                    // totalPredictScore: '',
                },

                formInfo: {},
                modal2: false,
                modal1: false,
                compact: '',
                pageSize: 10,
                pageNo: 1,
                middMonth: '',
                currentTime: '',
                data: {
                    count: 20,
                    list: []
                },
                columns: [
                    {
                        title: "分公司",
                        key: "companyName",
                        align: "center",
                        render: (h, params) => {
                            return h('a', {
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            name: 'crm.fromDetail',
                                            query: {
                                                cId: params.row.objectId
                                            }
                                        })
                                    }
                                }
                            }, params.row.companyName)
                        }
                    },
                    {
                        title: "目标销售(万元)",
                        key: "objectValue",
                        sortable: "custom",
                        align: "center",
                    },
                    {
                        title: "月预计资源量",
                        key: "predictNum",
                        sortable: "custom",
                        align: "center"
                    },
                    {
                        title: "月预计资源分值(分)",
                        key: "predictScore",
                        sortable: "custom",
                        align: "center",
                    },
                    {
                        title: "操作",
                        key: "",
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
                                    "调整下达结果"
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
                                    "查看详情"
                                ),
                            ])
                        }
                    },
                ]
            }
        },

        components: {
            vSelect,
            btnlist
        },

        computed: {
            isDisable() {
                let [yearC, monthC] = this.currentTime.split('-')
                if(!this.monthV) return true
                if(yearC < this.yearM || (yearC == this.yearM && Number(monthC) <= this.monthV)) return false
                return true
            }
        },

        mounted() {
            this.getTime()
            this.getYearList()
        },

        methods: {
            getYearList() {
                ADMIN.getYearList().then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.yearList = res.data.data
                        // console.log(this.yearList)
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
                        this.getList()
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },

            getList() {
                let timeScope, period
                if(!this.monthV) {
                    timeScope = this.yearM
                    period = 'year'
                }else {
                    timeScope = `${this.yearM}-${this.monthV < 10 ? '0' + this.monthV : this.monthV}`
                    period = 'month'
                }
                
                let obj = {
                    pageSize: this.pageSize,
                    timeScope: timeScope,
                    pageNo: this.pageNo,
                    objectType: 'office',
                    name: this.compact,
                    period: period,
                    orderBy: this.orderBy
                }
                ADMIN.adminListPage(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.data = res.data.data
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
                
                let obj1 = {
                    timeScope: timeScope,
                    objectType: 'office',
                    name: this.compact,
                    period: period
                }
                // 获取总数
                ADMIN.getTotalIndex(obj1).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.dataInfo = res.data.data
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
                    this.monthV = ''
                    this.middMonth = ''
                }
                this.getList()
            },

            getControlledSellList() {
                this.getList()
            },

            getControlledSellList1() {
                this.getList()
            },

            changeD(obj) {
                this.formInfo = this.data.list[obj._index]
                this.defaultV = this.formInfo.predictNum == 0 ? this.formInfo.objectValue / 0.5 : this.formInfo.predictNum
                this.objectId = obj.objectId
                this.id = obj.id
                this.modal2 = true
            },

            monthChange(val) {
                this.monthV = val
                this.num = val
            },

            ckeckD(index) {
                this.formInfo = this.data.list[index]
                // this.defaultV = this.formInfo.predictNum == 0 ? this.formInfo.objectValue / 5000 : this.formInfo.predictNum
                this.modal1 = true
            },

            checkTag() {

            },

            onSortChange(obj) {
            // 排序字段，0：接案时间；1：交接时间；2：规划周期；默认规划周期
                if(obj.order == 'normal') {
                    this.orderBy = ''
                    this.getList()
                    return
                }
                this.orderBy = `${obj.key} ${obj.order}`
                this.getList()
            },

            onPageSizeChange(val) {
                this.pageSize = val
                this.getList()
            },

            onPageChange(val) {
                this.pageNo = val
                this.getList()
            },


            ok1() {
                let timeScope, period
                if(!this.monthV) {
                    timeScope = `${this.yearM}`
                    period = 'year'
                }else {
                    period = 'month'
                    timeScope = `${this.yearM}-${this.monthV < 10 ? '0' + this.monthV : this.monthV}`
                }
                let obj = {
                    objectId: this.objectId,
                    objectType: 'office',
                    period: period,
                    timeScope: timeScope,
                    predictNum: this.defaultV,
                    predictScore: this.formInfo.predictScore,
                }
                if(this.id) obj = Object.assign(obj, {id: this.id})
                ADMIN.adminDetailSave(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.$Message.info(res.data.message)
                        this.getList()
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },

            cancel1(){
                this.getList()
            },

            ok() {

            },

            cancel(){

            },
            
            textChange() {
                this.getList()
            },

            datafunc() {
                return new Promise((resole, reject) => {

                })
            },
        }
    }
</script>


