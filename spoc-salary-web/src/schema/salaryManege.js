import largeTableClass from "./largeTable";
import valid, { errors, sys, common, salaryManageApi, } from '../libs/request';

export default class SalaryManege extends largeTableClass {
    constructor(vm, data) {
        super(vm, data);
        this.name = 'SalaryManege';
        this.vm = vm;
        this.data = data;
    };
    /*
    * 获取表头显示项
    */
    getDoubleHeadList(data) {
        return new Promise((resolve, reject) => {
            salaryManageApi.getPerformanceHeadList(data).then(valid.call(this)).then(res => {
                if (res.ok) {
                    resolve(res.data.data);
                } else {
                    reject([]);
                }
            }).catch(errors.call(this));
        });
    };
    /*
    * 处理表头
    */
    dealHeaderData(data) {
        return this.getDoubleHeadList(data).then(data =>  {
            data.forEach((item, index) => {
                if (item.key === '员工信息') data.splice(index, 1); // 去除固定显示项
            });
            const tempColumn = [];
            let tempColumnChild = [];
            data.forEach(item => {
                item.value.forEach(items => {
                    tempColumnChild.push({
                        title: items.value,
                        align: 'center',
                        key: items.key,
                        minWidth: 120,
                    });
                });
                tempColumn.push({
                    title: item.key,
                    align: 'center',
                    children: tempColumnChild,
                });
                tempColumnChild = [];
            });
            this.columnsSM.splice(this.columnsSM.length - 1, 0, ...tempColumn);
            return this.columnsSM;
        });
    };
    /*
    * common column
    */
    columnsSM = [
        {
            title: '编号',
            align: 'center',
            fixed: 'left',
            key: 'userNo',
            minWidth: 120,
            render: (h, params) => {
                return h('span', {
                    style: {
                        color: '#44bcb7',
                    },
                }, params.row.userNo);
            },
        },
        {
            title: '员工姓名',
            align: 'center',
            fixed: 'left',
            key: 'userName',
            minWidth: 120,
        },
        {
            title: '员工信息',
            align: 'center',
            children: [
                {
                    title: '员工类型',
                    align: 'center',
                    key: 'userType',
                    minWidth: 120,
                    filterMethod() {
                        return true;
                    },
                    filters: [],
                    filterMultiple: false,
                },
                {
                    title: '员工状态',
                    align: 'center',
                    key: 'userStatus',
                    minWidth: 120,
                    filterMethod() {
                        return true;
                    },
                    filters: [],
                    filterMultiple: false,
                },
                {
                    title: '分公司',
                    align: 'center',
                    key: 'company',
                    minWidth: 120,
                    render: (h, params) => {
                        const text = params.row.company ? params.row.company.split(' ')[0] : '';
                        return h('span', text);
                    },
                },
                {
                    title: '部门',
                    align: 'center',
                    key: 'department',
                    minWidth: 120,
                    render: (h, params) => {
                        const text = params.row.department ? params.row.department.split(' ')[0] : '';
                        return h('span', text);
                    },
                },
                {
                    title: '职级',
                    align: 'center',
                    key: 'rank',
                    minWidth: 120,
                },
                {
                    title: '工作地点',
                    align: 'center',
                    key: 'workPlace',
                    minWidth: 120,
                },
                {
                    title: '身份证',
                    align: 'center',
                    key: 'idCard',
                    minWidth: 120,
                },
                {
                    title: '银行卡号',
                    align: 'center',
                    key: 'bankCardNo',
                    minWidth: 150,
                    // sortable: true,
                },
                {
                    title: '收款人',
                    align: 'center',
                    key: 'payee',
                    minWidth: 120,
                    // sortable: true,
                },
                // {
                //     title: '离职日期',
                //     align: 'center',
                //     key: 'departureDate',
                //     minWidth: 120,
                //     sortable: true,
                // },
                // {
                //     title: '户口性质',
                //     align: 'center',
                //     key: 'accountNature',
                //     minWidth: 120,
                //     filterMethod() {
                //         return true;
                //     },
                //     filters: [],
                //     filterMultiple: false,
                // },
                // {
                //     title: '参保城市',
                //     align: 'center',
                //     key: 'insureCity',
                //     minWidth: 120,
                // },
                // {
                //     title: '参保政策',
                //     align: 'center',
                //     key: 'insurePolicy',
                //     minWidth: 120,
                //     filterMethod() {
                //         return true;
                //     },
                //     filters: [],
                //     filterMultiple: false,
                //     render: (h, params) => {
                //         let text = '';
                //         params.column.filters && params.column.filters.forEach(item => {
                //             if (item.value === params.row.insurePolicy) text = item.label;
                //         })
                //         return h('span', text);
                //     },
                // },
            ]
        },
        {
            title: '操作',
            align: 'center',
            key: 'caozuo',
            minWidth: 80,
            // fixed: 'right',
            render: (h, params) => {
                const _this = this;
                return h('span', {
                    style: {
                        color: '#44bcb7',
                        cursor: 'pointer',
                    },
                    on: {
                        click() {
                            _this.vm.showEditModal(params.row, params.index);
                        },
                    },
                }, '编辑');
            },
        },
    ];
};