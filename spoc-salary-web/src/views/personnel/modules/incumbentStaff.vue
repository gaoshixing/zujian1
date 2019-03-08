<style lang="less">
.incumbent-staff-container{
    position: relative;
    .count{
        position: relative;//top: 6px;
        line-height: 40px;
        font-size: 14px;color: #222;
        span{
            font-size: 18px;color: #44bcb7;
        }
    }
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
    .timeOptpons{
        @h: 28px;
        .time_tit, .ivu-input-icon{
            height: @h;line-height: @h;
        }
    }
}
.select-modal{
    .ivu-modal-body {
        max-height: 400px;
        overflow: hidden;
        overflow-y: scroll;
    }
}
.modal-select {
    display: flex;
    justify-content: space-between;
    >div {
        width: 50%;
        box-sizing: border-box;
        background-color: #f8f8f9;
        border:1px solid #e9eaec;
        .modal-select-title {
            color: #333;
            display: inline-block;
            padding-left: 15px;
            height: 35px;
            width: 100%;
            line-height: 35px;
            font-size: 16px;
            border-bottom: 1px solid #e9eaec;
            position: relative;
            > label {
                right: 15px;
                position: absolute;
            }
        }
    }
    .modal-select-common {
        padding: 10px;
        label {
            font-size: 14px;
            line-height: 35px;
            width: 50%;
            margin-right: 0px;
            float: left;
        }
        p {
            font-size: 14px;
            line-height: 35px;
            width: 50%;
            margin-right: 0px;
            float: left;
        }
    }

}
</style>
    
<template>
<div class="incumbent-staff-container">
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
    <time-optpons ref="ruzhiTimeTem" format="yyyy-MM-dd" :width="66" :timeList='signTime' @onDataPickStart="joinDateStart" @onDataPickEnd="joinDateEnd"></time-optpons>
    <time-optpons ref="zhuanzhengTimeTem" format="yyyy-MM-dd" :width="66" :timeList='signTime2' @onDataPickStart="correctDateStart" @onDataPickEnd="correctDateEnd"></time-optpons>
    <div class="count-btn-lists">
        当前总计&nbsp;<span>{{ total }}</span>
        <div class="btn-lists">
            <Button type="primary" @click="importStaff()" >导入员工</Button>
            <Button type="primary" @click="addStaff()" >新增员工</Button>
            <Button type="primary" @click="deleteStaff()" >删除员工</Button>
            <Dropdown trigger="click">
                <Button type="primary">
                    导入
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem @click.native.stop="importWork()">导入工作经历</DropdownItem>
                    <DropdownItem @click.native.stop="importEducational()">导入教育经历</DropdownItem>
                    <DropdownItem @click.native.stop="importBonusPenalty()">导入奖励/升迁</DropdownItem>
                    <DropdownItem @click.native.stop="importUserBasicInfo()">导入基础信息</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown trigger="click">
                <Button type="primary">
                    导出
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <!-- <DropdownItem @click.native.stop="exportOne()">导出所选员工</DropdownItem> -->
                    <!-- <DropdownItem @click.native.stop="exportAll()">导出全部员工</DropdownItem> -->
                    <DropdownItem @click.native.stop="opemAllAttachmentModal()">导出附件</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    </div>
    <Table :loading="loading" :columns="columns" :data="data" @on-selection-change="tableChange" @on-sort-change="sortTable"></Table>
    <div class="page-box" v-show="pages > 1">
        <div style="margin: auto;display: inline-block;">
            <Page :current="pageNum"
                :total="total"
                show-elevator show-total show-sizer
                :page-size="pageSize"
                @on-change="pageChange"
                @on-page-size-change="sizeChange">
            </Page>
        </div>
    </div>
    <add-new-personnel :pid="pid" ref="addNewPersonnel"></add-new-personnel>
    <Modal v-model="delModel" @on-ok="deletePersonnel" title="删除员工" width='500' class="del-personnel-container">
        您确定要删除当前员工吗？删除后将无法恢复。
    </Modal>
    <Modal
        width=832
        ref='modalExport'
        v-model="exportModal"
        title="选择导出字段"
        :loading="loadingModal"
        @on-ok="exportModalOk"
        class="select-modal">
        <div class="modal-select">
            <div>
                <p class="modal-select-title">所有字段
                    <Checkbox
                        class="title-check-all"
                        :age="m_indeterminate"
                        v-model="m_checkAll"
                        @click.prevent.native="m_handleCheckAll">全选
                    </Checkbox>
                </p>
                <div class="modal-select-common modal-select-select">
                    <Checkbox v-for="(item, index) in copy_exportChecks" :key="index" v-model="item.check" @on-change="onclickChockItem(item.check, index)">{{item.value}}</Checkbox>
                </div>
            </div>
            <div>
                <p class="modal-select-title">已选字段</p>
                <div class="modal-select-common modal-select-selected">
                    <p v-for="(item, index) in copy_exportChecks" :key="index" v-if="item.check">{{item.value}}</p>
                </div>
            </div>
        </div>
    </Modal>
</div>
</template>

<script>

import Vue from 'vue';
import { mapMutations } from 'vuex';
import vSelect from '@public/modules/vSelect';
import timeOptpons from "../../../modules/timeOptpons.vue";
import addNewPersonnel from './addNewPersonnel.vue';
import valid, { errors, salUserBasicInfo, sys } from '../../../libs/request.js';

export default {
    props: {
        pid: {
            type: [Number, String],
            required: true,
        },
    },
    data(){
        return {
            pageNum: 1,//当前页码
            pages: 0,//页码总数
            pageSize: 10,//每页条数
            total: 0,//数据总数
            loading: true,
            compact: '',
            signTime: {
                title: '入职日期',
                list: []
            },
            signTime2: {
                title: '转正日期',
                list: []
            },
            params: {},
            tableSlelcted: [],
            exportModal: false,
            m_indeterminate: false,
            m_checkAll: false,
            copy_exportChecks: [],
            loadingModal: true,
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
                    render: (h, params) => {
                        return h('span', params.row.jobStatus ? params.row.jobStatus.label : '');
                    },
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
                    render: (h, params) => {
                        return h('span', params.row.userStatus ? params.row.userStatus.label : '');
                    },
                    filters: [],
                    filterMultiple: false,
                    filterRemote (value, row) {
                        this.filter(value, row);
                    }
                },
                {
                    title: '组织归属',
                    align: 'center',
                    render: (h, params) => {
                        return h('span', params.row.company.name.split(' ')[0]);
                    },
                },
                {
                    title: '部门',
                    align: 'center',
                    render: (h, params) => {
                        return h('span', params.row.office ? params.row.office.name.split(' ')[0] : '');
                    },
                },
                {
                    title: '职级',
                    align: 'center',
                    render: (h, params) => {
                        return h('span', params.row.level ? params.row.level.label : '');
                    }
                },
                {
                    title: '入职日期',
                    align: 'center',
                    key: 'entryTime',
                    sortable: 'custom',
                    width: 120
                },
                {
                    title: '操作',
                    align: 'center',
                    render: (h, params) => {
                        return h('a',{
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
                        }, '编辑')
                    }
                },
            ],
            data: [],
            delModel: false,
        };
    },
    components: {
        vSelect, timeOptpons, addNewPersonnel
    },
    mounted(){
        this.params.company = {id: this.$route.query.company};
        this.getBatchListData();
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        reset() {
            this.pageNum = 1;
            this.getLists();
        },
        importStaff() {
            // 导入员工
            this.$router.push({
				name: 'salary.import',
				query: {
                    froms: 'SALARY',
                    path: 'personnel'
				},
			});
        },
        importWork() {
            // 导入工作经历
            this.$router.push({
				name: 'salary.import',
				query: {
                    froms: 'SALARY',
                    path: 'importWork'
				},
			});
        },
        importEducational() {
            // 导入教育经历
            this.$router.push({
				name: 'salary.import',
				query: {
                    froms: 'SALARY',
                    path: 'importEducational'
				},
			});
        },
        importBonusPenalty() {
            // 导入奖励/升迁
            this.$router.push({
				name: 'salary.import',
				query: {
                    froms: 'SALARY',
                    path: 'importBonusPenalty'
				},
			});
        },
        importUserBasicInfo() {
            // 导入基础信息
            this.$router.push({
				name: 'salary.import',
				query: {
                    froms: 'SALARY',
                    path: 'importUserBasicInfo'
				},
			});
        },
        addStaff() {
            // 新增员工
            this.$refs.addNewPersonnel.show();
        },
        deleteStaff() {
            // 删除员工
            if(this.tableSlelcted.length > 0) this.delModel = true;
            else this.$Message.error('请选择要删除的员工');
        },
        deletePersonnel() {
            // 执行删除员工
            this.updateLoadingStatus({isLoading:true});
            let arr = [];
            this.tableSlelcted.forEach(element => {
                arr.push(element.userId);
            });
            let params = {
                userIds: arr.join(',')
            }
            salUserBasicInfo.delete(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.reset();
				}
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({isLoading:false});
            });
        },
        exportOne() {
            // 导出所选员工
            if(this.tableSlelcted.length > 0) {
                let arr = [];
                this.tableSlelcted.forEach(element => {
                    arr.push(element.id);
                });
                window.open(salUserBasicInfo.export(arr.join(',')));
            } else this.$Message.error('请选择要导出的员工');

        },
        exportAll() {
            // 导出全部员工
            window.open(salUserBasicInfo.export(''));
        },
        opemAllAttachmentModal() {
            // 导出附件
            if(this.tableSlelcted.length > 0) {
                this.copy_exportChecks = [
                    {
                        check: false,
                        value: '身份证扫描件',
                        label: '1'
                    },
                    {
                        check: false,
                        value: '银行卡扫描件',
                        label: '2'
                    },
                    {
                        check: false,
                        value: '上家单位离职证明',
                        label: '3'
                    },
                    {
                        check: false,
                        value: '备用银行卡扫描件',
                        label: '4'
                    },
                    {
                        check: false,
                        value: '学历证书扫描件',
                        label: '5'
                    }
                ];
                this.exportModal = true;
            } else this.$Message.error('请选择要导出的员工');
        },
        /*
		* 日期选择 
		*/
        joinDateStart(start, end) {
            this.params.joinDateStart = start ? new Date(start).format('yyyy-MM-dd') : '';
            this.params.joinDateEnd = end ? new Date(end).format('yyyy-MM-dd') : '';
            this.pageNum = 1;
            this.getLists();
        },
        joinDateEnd(start, end) {
            this.params.joinDateStart = start ? new Date(start).format('yyyy-MM-dd') : '';
            this.params.joinDateEnd = end ? new Date(end).format('yyyy-MM-dd') : '';
            this.pageNum = 1;
            this.getLists();
        },
        correctDateStart(start, end) {
            this.params.correctDateStart = start ? new Date(start).format('yyyy-MM-dd') : '';
            this.params.correctDateEnd = end ? new Date(end).format('yyyy-MM-dd') : '';
            this.pageNum = 1;
            this.getLists();
        },
        correctDateEnd(start, end) {
            this.params.correctDateStart = start ? new Date(start).format('yyyy-MM-dd') : '';
            this.params.correctDateEnd = end ? new Date(end).format('yyyy-MM-dd') : ''
            this.pageNum = 1;
            this.getLists();
        },
        textChange() {
            // 搜索
            if(this.compact != '') {
                this.params.nameOrNo = this.compact;
            } else {
                delete this.params.nameOrNo;
            }
            this.getLists();
        },
        setId(item, type, year) {
            console.log(item)
            delete this.params.level;
            delete this.params.company;
            delete this.params.office;
            if(type == 'org') {
                // 组织机构
                if(item.parentId != '0') {
                    if(item.parentId == '1') this.params.company = {id: item.id};
                    else this.params.office = {id: item.id};
                }
            }else if(type == 'grade') {
                // 职能等级
                this.params.level = item.id
            }
            if(!year) this.getLists();
        },
        setJoinDate(start, end) {
            // 设置入职日期
            this.params.joinDateStart = start ? start : '';
            this.params.joinDateEnd = end ? end : '';
            this.$refs.ruzhiTimeTem.setTimeInit(start, end);
            this.getLists();
        },
        setCorrectDate(start, end) {
            // 设置转正日期
            this.params.correctDateStart = start ? start : '';
            this.params.correctDateEnd = end ? end : '';
            this.$refs.zhuanzhengTimeTem.setTimeInit(start, end);
            this.getLists();
        },
        getLists() {
            // 获取lists
            this.params.pageNo = this.pageNum;
            this.params.pageSize = this.pageSize;
            // console.log(this.params)
            salUserBasicInfo.listPage(this.params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    let data = res.data.data;
                    this.total = data.total;
                    this.pageNum = data.pageNum;
                    this.pages = data.pages;
                    this.data = data.list;
                    this.tableSlelcted = []; // 选中的数据清空
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
            this.pageNum = page;
            this.getLists();
        },
        sizeChange(size) {
            this.pageSize = size;
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
        sortTable(column) {
            // 排序
            if(column.order == 'desc') {
                this.params.orderBy = '1';
                this.params.orderRule = '0';
            }else if(column.order == 'asc') {
                this.params.orderBy = '1';
                this.params.orderRule = '1';
            }else{
                delete this.params.orderBy;
                delete this.params.orderRule;
            }
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
                        if(element.label.indexOf('离职') == -1) {
                            userStatus.push(element);
                        }
                    });
                    this.$set(this.columns[3],'filters',data.sal_user_basic_info_job_status);
                    this.$set(this.columns[4],'filters',userStatus);
				}
            }).catch(errors.call(this));
        },
        m_handleCheckAll () {
            this.m_checkAll = !this.m_checkAll;
            if (this.m_checkAll) {
                this.copy_exportChecks.forEach(item => item.check = true );
            } else {
                this.copy_exportChecks.forEach(item => item.check = false );
            }
        },
        onclickChockItem(val, indexs) {
            this.copy_exportChecks.forEach((item,index) => {
                if (index === indexs) {
                    Vue.set(this.copy_exportChecks[index], 'check', val);
                }
            });
            if (this.copy_exportChecks.every(item => item.check === true)) {
                this.m_checkAll = true;
            } else {
                this.m_checkAll = false;
            }
        },
        exportModalOk() {
            // 确认导出附件
            let arr = [];
            this.copy_exportChecks.forEach(item => {
                if(item.check) arr.push(item.label);
            });
            if(arr.length > 0) {
                let userId = [];
                this.tableSlelcted.forEach(element => {
                    userId.push(element.userId);
                });
                let params = {
                    userIds: userId.join(','),
                    exportTerm: arr.join(','),
                }
                this.exportAllAttachment(params)
            } else {
                this.$Message.error('请选择要导出的字段');
                this.loadingModal = false;
                setTimeout(() => {
                    this.loadingModal = true;
                }, 0);
            }
        },
        exportAllAttachment(params) {
            // 执行导出附件
            window.open(salUserBasicInfo.exportAllAttachment(params));
            this.m_checkAll = false;
            this.exportModal = false;
        },
    }
}
</script>


