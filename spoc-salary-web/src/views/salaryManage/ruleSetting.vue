<template>
    <div class="rule-setting-boss">
        <Input v-model.trim="searchVal" size='large' icon="ios-search" placeholder="请输入薪酬项目名称" style="width: 396px; margin-top: 20px; margin-bottom: 20px;" @on-click="onclickSearchInfos" @on-enter="onclickSearchInfos" class="docu-top-input"></Input>
        <p class="rule-setting-total">当前总计: <span>{{count}}</span></p>
        <btn-list title="员工列表" :btnList="btninfo"></btn-list>
        <Table
            class="table-border-none"
            :columns="localColumns"
            :data="columnsData"
            @on-filter-change="onFilterChange"
        ></Table>
        <Page
            v-if="pageCount > 1"
            show-sizer
            :total="count"
            :current="pageNo"
            :page-size="pageSize"
            show-total
            show-elevator
            @on-change="onclickPageNoChange"
            @on-page-size-change="onclickPageSizeChange"
            style="margin-bottom: 140px; text-align: center; margin-top: 20px;">
        </Page>
    </div>    
</template>

<script>
import Vue from 'vue';
import { mapMutations, } from 'vuex';
import BtnList from '@public/modules/btnlist';
import valid, { errors, sys, common, salaryManageApi, } from '../../libs/request';
export default {
    name: 'RuleSetting',
    components: {
        BtnList,
    },
    data() {
        return {
            searchVal: '',
            count: 0,
            pageNo: 1,
            pageSize: 10,
            pageCount: 1,
            proFilters: [],
            showFilters: [],
            showType: null,
            projectType: null,
            isMath: null,
            isUse: null,
            btninfo: [
                {
                    text: '调整顺序',
                    type: 'primary',
                    event: this.onclickAdjustSequence
                }, 
                {
                    text: '新增薪酬项目',
                    type: 'primary',
                    event: this.onclickAddSalaryProject
                },
            ],
            localColumns: [
                {
                    title: '薪酬项目',
                    key: 'name',
                    align: 'center',
                },
                {
                    title: '项目类型',
                    key: 'projectType',
                    align: 'center',
                    filters: [],
                    filterMultiple: false,
                    filterMethod() {
                        return true;
                    },
                    render: (h, params) => {
                        let text = null;
                        this.proFilters.forEach(item => {
                            if (item.value === params.row.projectType) text = item.label;
                        })
                        return h('span', text);
                    },
                },
                {
                    title: '展示类型',
                    key: 'showType',
                    align: 'center',
                    filters: [],
                    filterMultiple: false,
                    filterMethod() {
                        return true;
                    },
                    render: (h, params) => {
                        let text = null;
                        this.showFilters.forEach(item => {
                            if (item.value === params.row.showType) text = item.label;
                        })
                        return h('span', text);
                    },
                },
                {
                    title: '是否计算项',
                    key: 'isMath',
                    align: 'center',
                    filters: [
                        {
                            label: '计算项',
                            value: '1'
                        },
                        {
                            label: '非计算项',
                            value: '0'
                        }
                    ],
                    filterMultiple: false,
                    filterMethod() {
                        return true;
                    },
                    render: (h, params) => {
                        const text = params.row.isMath === '1' ? '计算项' : '非计算项';
                        return h('span', text);
                    },
                },
                {
                    title: '显示顺序',
                    key: 'showOrder',
                    align: 'center',
                },
                {
                    title: '启用状态',
                    key: 'isUse',
                    align: 'center',
                    minWidth: 100,
                    filters: [
                        {
                            label: '启用',
                            value: '1'
                        },
                        {
                            label: '不启用',
                            value: '0'
                        },
                    ],
                    filterMultiple: false,
                    filterMethod() {
                        return true;
                    },
                    render: (h, params) => {
                        const _this = this;
                        const boo = params.row.isUse === '1' ? true : false;
                        let text = params.row.isUse === '1' ? '开启' : '关闭';
                        const renderArr = [
                            h('i-switch', {
                                props: {
                                    value: boo,
                                },
                                on: {
                                    'on-change'(val) {
                                        params.row.isUse = val ? '1' : '0';
                                        _this.onclickChangeIsUse(params.row, params.index);
                                    },
                                },
                            }),
                            h('span', {
                                style: {
                                    marginLeft: '10px',
                                },
                            }, text),
                        ];
                        return h('div', renderArr);
                    },
                },
                {
                    title: '操作',
                    key: '',
                    align: 'left',
                    render: (h, params) => {
                        return h('span', {
                            style: {
                                color: '#44bcb7',
                                cursor: 'pointer',
                            },
                            on: {
                                'click': () => {
                                    this.$router.push({
                                        name: 'salary.editSalaryProject',
                                        query: {
                                            type: 'edit',
                                            id: params.row.id,
                                        },
                                    });
                                },
                            },
                        }, '编辑')
                    },
                },
            ],
            columnsData: [],
        };
    },
    created() {
        Promise.all([
            this.getDict('show'),
            this.getDict('pro'),
            this.getListPage(),
        ]);
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        /*
        * 搜索信息
        */
        onclickSearchInfos() {
            this.pageNo = 1;
            this.getListPage();
        },
        /*
        * 调整顺序
        */
        onclickAdjustSequence() {
            const _this = this;
            if (!this.columnsData.length) {
                this.$Message.error('当前无可操作项');
                return;
            }
            this.btninfo[0].text = this.btninfo[0].text === '保存修改' ? '调整顺序' : '保存修改';
            if (this.btninfo[0].text === '保存修改') {
                Vue.set(this.localColumns[4], 'render', (h, params) => {
                    const renderArr = [
                        h('InputNumber', {
                            props: {
                                value: Number(params.row.showOrder),
                                min: 0,
                            },
                            on: {
                                'on-change': (val) => {
                                    val = val < 0 ? 0 : val;
                                    params.row.showOrder = val;
                                    setTimeout(() => { _this.columnsData[params.row.index] = params.row; }, 0);
                                },
                                'on-blur': (val) => {
                                    params.row.showOrder = params.row.showOrder < 0 ? 0 : params.row.showOrder;
                                    setTimeout(() => { _this.columnsData[params.row.index] = params.row; }, 0);
                                },
                            },
                        }),
                    ];
                    return h('div', renderArr)});
            } else {
                // let onOff = true;
                // _this.columnsData.forEach(item => {
                //     if ((!Number(item.showOrder) && Number(item.showOrder) !== 0) && Number(item.showOrder) < 0) {
                //         onOff = false;
                //         this.$Message.error('请输入正确的数值');
                //         this.btninfo[0].text = '保存修改';
                //         return;
                //     }
                // });
                    const tempArr = [];
                    Vue.set(this.localColumns[4], 'render', (h, params) => { return h('span', params.row.showOrder); });
                    _this.columnsData.forEach(item => {
                        tempArr.push({
                            id: item.id,
                            sort: item.showOrder,
                        });
                    });
                    _this.onclickUpdateSort(tempArr);
                }
        },
        onFilterChange(val) {
            this[val.key] = val._filterChecked[0];
            this.pageNo = 1;
            this.getListPage();
        },
        /*
        * 添加项目
        */
        onclickAddSalaryProject() {
            this.$router.push({
                name: 'salary.editSalaryProject',
                query: {
                    type: 'add',
                },
            });
        },
        /*
        * 分页
        */
        onclickPageNoChange(val) {
            this.pageNo = val;
            this.getListPage();
        },
        onclickPageSizeChange(val) {
            this.pageSize = val;
            this.getListPage();
        },
        /*
        * 列表获取
        */
        getListPage() {
            const data = {
                type: 1,
                name: this.searchVal,
                pageNum: this.pageNo,
                pageSize: this.pageSize,
                showType: this.showType,
                projectType: this.projectType,
                isMath: this.isMath,
                isUse: this.isUse,
            };
            this.updateLoadingStatus({isLoading:true});
            salaryManageApi.salaryManageListPage(data).then(valid.call(this)).then(res => {
                const rdata = res.data.data;
                this.pageNo = rdata.pageNum;
                this.pageSize = rdata.pageSize;
                this.count = rdata.total;
                this.pageCount = rdata.pages;
                this.columnsData = rdata.list;
                this.columnsData.forEach((item, index) => item.index = index);
            }).catch(errors.call(this)).finally(() => { this.updateLoadingStatus({isLoading:false}) });
        },
        /*
        * 修改启用状态
        */
        onclickChangeIsUse(data, index) {
            salaryManageApi.salaryManageIsUse(data).then(valid.call(this)).then(res => {
                if (res.ok) {
                    this.columnsData[index].isUse = data.isUse;
                    this.$Message.success(res.data.message);
                } else {
                    const tempDate = this.columnsData.splice(index, 1);
                    tempDate[0].isUse = data.isUse === '0' ? '1' : '0';
                    this.columnsData.splice(index, 0, tempDate[0]);
                    // this.columnsData[index].isUse = this.columnsData[index].isUse === '0' ? '1' : '0';
                    // console.log(this.columnsData[index].isUse);
                    
                }
            }).catch(errors.call(this));
        },
        /*
        * 调整顺序
        */
        onclickUpdateSort(data) {
            this.updateLoadingStatus({isLoading:true});
            salaryManageApi.salaryManageUpdateSort(data).then(valid.call(this)).then(res => {
                if (res.ok) {
                    this.$Message.success(res.data.message);
                    this.getListPage();
                }
            }).catch(errors.call(this)).finally(() => { this.updateLoadingStatus({isLoading:false}) });
        },
        /*
        * 字典获取
        */
        getDict(type) {
            const data = type === 'pro' ? { type: 'sal_col_manage_project_type' } : { type: 'sal_col_manage_show_type' };
            sys.dictListData(data).then(valid.call(this)).then(res => {
                const tempArr = [];
                res.data.data.forEach(item => {
                    tempArr.push({
                        label: item.label,
                        value: item.value,
                    });
                });
                if (type === 'pro') {
                    this.localColumns[1].filters = tempArr;
                    this.proFilters = tempArr;
                }
                if (type === 'show') {
                    this.localColumns[2].filters = tempArr;
                    this.showFilters = tempArr;
                }
            }).catch(errors.call(this));
        },
    },
};
</script>

<style lang="less">
    .rule-setting-boss {
        .rule-setting-total {
            color: #222;
            font-size: 15px;
            margin-bottom: 12px;
            span {
                color: #44bcb7;
                font-size: 16px;
            }
        }
    }
    .ivu-table-filter-select-item-selected {
        text-align: center !important;
    }
    .ivu-table-filter-select-item {
        text-align: center !important;
    }
	.table-border-none {
		border-left: none;
		.ivu-table {
			&::after {
				content: none;
			}
		}
		.ivu-table-cell {
			color: #333;
		}
    }
    
    .rule-setting-modal {
        p {
            display: inline-block;
            width: 65px;
            text-align: left;
        }
        .ivu-input {
            resize: none !important;
        }
    }
</style>
