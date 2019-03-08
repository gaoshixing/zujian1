<style lang="less">
.employee-staff-container{
    position: relative;
    .page-box{
        margin-top: 20px;
		text-align: center;
    }
    // .ivu-table-wrapper {
    //     border: none;
    // }
    // .ivu-table th {
    //     background: #fff;
    // }
    // .ivu-table:after {
    //     display: none;
    // }
    .text-align{
        margin: 10px 0;
        a{
            display: block;
        }
    }
    .timeOptpons{
        @h: 28px;
        .time_tit, .ivu-input-icon{
            height: @h;line-height: @h;
        }
    } 
}
.activation-model{
    .tips{
        padding-left: 36px;
        font-size: 14px;color: #ecae3c;
    }
    .data{
        @w: 120px;
        position: relative;
        padding-left: @w + 6px;margin: 20px 0 10px;
        .title{
            position: absolute;left: 0;top: 0;width: @w;line-height: 32px;
            text-align: right;
        }
    }
}
</style>
    
<template>
<div class="employee-staff-container">
    <v-select 
        style="width: 396px;margin: 15px 0;"
        placeholder="输入员工编号/员工姓名/身份证号"
        :datafunc="datafunc"
        icon="search" 
        v-model="compact"
        k='cnname'
        @on-enter="textChange" 
        @on-click="textChange" 
        @selected="textChange">
    </v-select>
    <time-optpons ref="lizhiTimeTem" format="yyyy-MM-dd" :width="66" :timeList='signTime' @onDataPickStart="departureDateStart" @onDataPickEnd="departureDateEnd"></time-optpons>
    <div class="count-btn-lists">
        当前总计&nbsp;<span>{{ count }}</span>
        <div class="btn-lists">

        </div>
    </div>
    <Table :loading="loading" :columns="columns" :data="data" @on-selection-change="tableChange" @on-sort-change="sortTable"></Table>
    <div class="page-box" v-show="pageCount > 1">
        <div style="margin: auto;display: inline-block;">
            <Page :current="pageNo"
                :total="count"
                show-elevator show-total show-sizer
                :page-size="pageSize"
                @on-change="pageChange"
                @on-page-size-change="sizeChange">
            </Page>
        </div>
    </div>
    <Modal v-model="cancelSettleModel" @on-ok="cancelSettleAjax" :title="settleModalTitle" width='500' class="activation-model">
        您正在修改当前离职员工的薪资结算状态，确定修改为“{{ settleModalText }}”？
    </Modal>
    <Modal v-model="activationModel" @on-ok="activationAjax" :loading="loading" title="激活员工" width='750' class="activation-model">
        <p class="tips">
            <i class="iconfont icon-tishi" style="margin-right:6px;"></i>激活员工后，当前员工将重新入职，进在职员工列表可查询
        </p>
        <div class="data">
            <span class="title">重新入职时间：</span>
            <DatePicker v-model="entryDate" format="yyyy年MM月dd日" type="date" style="width:200px;display: block;"></DatePicker>
        </div>
    </Modal>
</div>
</template>

<script>

import vSelect from '@public/modules/vSelect';
import timeOptpons from "../../../modules/timeOptpons.vue";
import valid, { errors, salDeparture, sys } from '../../../libs/request.js';

export default {
    props: {
        pid: {
            type: [Number, String],
            required: true,
        },
    },
    data(){
        return {
            pageNo: 1,//当前页码
            pageCount: 0,//页码总数
            pageSize: 10,//每页条数
            count: 0,//数据总数
            settleModalText: '未结清',
            settleModalTitle: '取消结清',
            loading: true,
            compact: '',
            signTime: {
                title: '离职日期',
                list: []
            },
            params: {
                departureDateStart: '',
                departureDateEnd: ''
            },
            tableSlelcted: [],
            columns: [
                {
                    type: 'selection',
                    width: 36,
                    align: 'center'
                },
                {
                    title: '编号',
                    key: 'no',
                    width: 110,
                },
                {
                    title: '姓名',
                    align: 'center',
                    key: 'name',
                },
                {
                    title: '类型',
                    align: 'center',
                    key: 'jobStatus',
                    filters: [],
                    filterMultiple: false,
                    filterRemote (value, row) {
                        this.filter(value, row);
                    }
                },
                {
                    title: '状态',
                    align: 'center',
                    key: 'userStatus',
                    filters: [],
                    filterMultiple: false,
                    filterRemote (value, row) {
                        this.filter(value, row);
                    }
                },
                {
                    title: '组织归属',
                    align: 'center',
                    key: 'companyName',
                },
                {
                    title: '部门',
                    align: 'center',
                    key: 'officeName',
                },
                {
                    title: '离职日期',
                    align: 'center',
                    key: 'departureDate',
                    sortable: 'custom',
                    width: 110
                },
                {
                    title: '结清时间',
                    align: 'center',
                    key: 'isSettle',
                    sortable: 'custom',
                    render: (h, params) => {
                        return h('span', params.row.settleDate ? params.row.settleDate : '未结清');
                    },
                    width: 110
                },
                {
                    title: '操作',
                    align: 'center',
                    width: 100,
                    render: (h, params) => {
                        return h('div', {
                            class: {
                                    'text-align': true
                                },
                        }, [
                            h('a',{
                                on: {
                                    click: () => {
                                        this.cancelSettle(params.row.userId, params.row.isSettle);
                                    }
                                }
                            }, params.row.settleDate ? '取消结清' : '结清'),
                            h('a',{
                                on: {
                                    click: () => {
                                        this.activation(params.row.userId);
                                    }
                                }
                            }, '激活'),
                            h('a',{
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            name: "salary.staffRecords",
                                            query: {
                                                userId: params.row.userId
                                            }
                                        })
                                    }
                                }
                            }, '查看')
                        ])
                    }
                },
            ],
            data: [],
            cancelSettleModel: false,
            activationModel: false,
            entryDate: '',
            changeStateUserId: '',
            settleState: '0',
            loading: true,
        };
    },
    components: {
        vSelect, timeOptpons,
    },
    mounted(){
        this.params.companyId = this.$route.query.company
        this.getBatchListData();
    },
    methods: {
        activation(id) {
            // 激活
            this.changeStateUserId = id;
            this.activationModel = true;
        },
        activationAjax() {
            // 执行激活
            // console.log(this.entryDate)
            this.entryDate = this.entryDate ? new Date(this.entryDate).format('yyyy-MM-dd') : new Date().format('yyyy-MM-dd');
            this.loading = false;
            this.activationModel = false;
            let params = {
                userId: this.changeStateUserId,
                entryDate: this.entryDate
            }
            salDeparture.activation(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.getLists();
				}
            }).catch(errors.call(this));
        },
        cancelSettle(id, isSettle) {
            console.log(isSettle)
            // 修改结清状态
            if(isSettle) {
                this.settleModalText = '结清';
                this.settleModalTitle = '结清';
            }else{
                this.settleModalText = '未结清';
                this.settleModalTitle = '取消结清';
            }
            this.changeStateUserId = id;
            this.settleState = isSettle == '0' ? '1' : '0';
            this.cancelSettleModel = true;
        },
        cancelSettleAjax() {
            // 执行取消结清
            let params = {
                userId: this.changeStateUserId,
                isSettle: this.settleState
            }
            salDeparture.changeIsSettle(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.getLists();
				}
            }).catch(errors.call(this));
        },
        /*
		* 日期选择 
		*/
        departureDateStart(start, end) {
            this.params.departureDateStart = start ? new Date(start).format('yyyy-MM-dd') : '';
            this.params.departureDateEnd = end ? new Date(end).format('yyyy-MM-dd') : '';
            this.pageNo = 1;
            this.getLists();
        },
        departureDateEnd(start, end) {
            this.params.departureDateStart = start ? new Date(start).format('yyyy-MM-dd') : '';
            this.params.departureDateEnd = end ? new Date(end).format('yyyy-MM-dd') : '';
            this.pageNo = 1;
            this.getLists();
        },
        textChange() {
            // 搜索
            if(this.compact != '') {
                this.params.name = this.compact;
            } else {
                delete this.params.name;
            }
            this.getLists();
        },
        setId(item, type, year) {
            // console.log(item)
            delete this.params.level;
            delete this.params.companyId;
            delete this.params.officeId;
            if(type == 'org') {
                // 组织机构
                if(item.parentId != '0') {
                    if(item.parentId == '1') this.params.companyId = item.id;
                    else this.params.officeId = item.id;
                }
                
            }else if(type == 'grade') {
                // 职能等级
                this.params.level = item.id
            }
            if(!year) this.getLists();
        },
        setDepartureDate(start, end) {
            // 设置入职日期
            this.params.departureDateStart = start ? start : '';
            this.params.departureDateEnd = end ? end : '';
            this.$refs.lizhiTimeTem.setTimeInit(start, end);
            this.getLists();
        },
        getLists() {
            // 获取lists
            this.params.pageNo = this.pageNo;
            this.params.pageSize = this.pageSize;
            // console.log(this.params)
            salDeparture.listPage(this.params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    let data = res.data.data;
                    this.data = data.list;
                    this.count = data.total;
                    this.pageCount = data.pages;
				}
            })
            .catch(errors.call(this))
            .finally(() => {
                this.loading = false;
            });
        },
        tableChange(val) {
            // 选择列表数据
            this.tableSlelcted = val;
        },
        datafunc() {
            return new Promise((resolve, reject) => {});
        },
        pageChange(page) {
            this.pageNo = page;
            this.getLists();
        },
        sizeChange(size) {
            this.pageSize = size;
            this.getLists();
        },
        getBatchListData() {
            // 获取字典字段
            let arr = [
                'sal_user_basic_info_user_status', //用户状态
                'sal_user_basic_info_job_status', //用户类型
            ];
            let params = {
                types: arr.join()
            }
            sys.batchListData(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    let data = res.data.data;
                    let userStatus = [];
                    data.sal_user_basic_info_user_status.forEach(element => {
                        if(element.label.indexOf('离职') != -1) {
                            userStatus.push(element);
                        }
                    });
                    this.$set(this.columns[3],'filters',data.sal_user_basic_info_job_status);
                    this.$set(this.columns[4],'filters',userStatus);
				}
            }).catch(errors.call(this));
        },
        sortTable(column) {
            // 排序
            // orderSc 0：正序(asc) / 1：倒叙(desc)
            // orderBy 排序字段 0离职日期(departureDate) 1结清时间(isSettle)
            if(column.order == 'desc') {
                this.params.orderSc = '1';
                if(column.key == 'departureDate') this.params.orderBy = '0';
                else if(column.key == 'isSettle') this.params.orderBy = '1';
            }else if(column.order == 'asc') {
                this.params.orderSc = '0';
                if(column.key == 'departureDate') this.params.orderBy = '0';
                else if(column.key == 'isSettle') this.params.orderBy = '1';
            }else{
                delete this.params.orderBy;
                delete this.params.orderSc;
            }
            this.getLists();
        },
        filter(value, row) {
            if(row == 'jobStatus') {
                // 类型
                if(value != '') {
                    this.params.jobStatus = value[0]
                }else{
                    delete this.params.jobStatus;
                }
            }else if(row == 'userStatus') {
                // 状态
                if(value != '') {
                    this.params.userStatus = value[0]
                }else{
                    delete this.params.userStatus;
                }
            }
            this.getLists();
        },
    }
}
</script>


