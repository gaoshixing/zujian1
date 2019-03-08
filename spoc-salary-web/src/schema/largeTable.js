import valid, { errors, sys, common, socialSecurityApi, } from '../libs/request';
export default class largeTableClass {
    constructor(vm) {
        this.vm = vm;
    };
    /*
    * 字典获取
    */
    getDict(data) {
        return new Promise((resolve, reject) => {
            sys.dictListData(data).then(valid.call(this)).then(res => {
                if (res.ok) {
                    const tempArr = [];
                    res.data.data.forEach(item => {
                        tempArr.push({
                            label: item.label,
                            value: item.value,
                        });
                    });
                    resolve(tempArr);
                } else {
                    reject(tempArr);
                }
            }).catch(errors.call(this));
        });
    };
    /*
    * common column
    */
    columns = [
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
                    title: '类型',
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
                    title: '状态',
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
                },
                {
                    title: '岗位',
                    align: 'center',
                    key: 'job',
                    minWidth: 120,
                },
                {
                    title: '职级',
                    align: 'center',
                    key: 'rank',
                    minWidth: 120,
                },
                {
                    title: '人员性质',
                    align: 'center',
                    key: 'personnelNature',
                    minWidth: 120,
                    filterMethod() {
                        return true;
                    },
                    filters: [],
                    filterMultiple: false,
                },
                {
                    title: '入职日期',
                    align: 'center',
                    key: 'entryDate',
                    minWidth: 120,
                    sortable: true,
                },
                {
                    title: '转正日期',
                    align: 'center',
                    key: 'positiveDate',
                    minWidth: 120,
                    sortable: true,
                },
                {
                    title: '离职日期',
                    align: 'center',
                    key: 'departureDate',
                    minWidth: 120,
                    sortable: true,
                },
                {
                    title: '户口性质',
                    align: 'center',
                    key: 'accountNature',
                    minWidth: 120,
                    filterMethod() {
                        return true;
                    },
                    filters: [],
                    filterMultiple: false,
                },
                {
                    title: '参保城市',
                    align: 'center',
                    key: 'insureCity',
                    minWidth: 120,
                },
                {
                    title: '参保政策',
                    align: 'center',
                    key: 'insurePolicy',
                    minWidth: 120,
                    filterMethod() {
                        return true;
                    },
                    filters: [],
                    filterMultiple: false,
                    render: (h, params) => {
                        let text = '';
                        params.column.filters && params.column.filters.forEach(item => {
                            if (item.value === params.row.insurePolicy) text = item.label;
                        })
                        return h('span', text);
                    },
                },
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