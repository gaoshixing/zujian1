import largeTableClass from "./largeTable";

export default class AttendanceClass extends largeTableClass {
    constructor(_this) {
        super(_this);
        this.name = 'AttendanceClass';
        this._this = _this;
    };
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
                title: '类型',
                align: 'center',
                key: 'jobStatus',
                minWidth: 120,
                filterMethod() {
                    return true;
                },
                filters: [],
                filterMultiple: false,
                render: (h, params) => {
                    const localThis = this;
                    let text = null;
                    localThis._this.largeTable.tableColumnList[2].filters.forEach(item => {
                        if (item.label === params.row.jobStatus) text = item.label;
                    });
                    return h('span', text);
                },
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
                render: (h, params) => {
                    const localThis = this;
                    let text = null;
                    localThis._this.largeTable.tableColumnList[3].filters.forEach(item => {
                        if (item.label === params.row.userStatus) text = item.label;
                    });
                    return h('span', text);
                },
            },
            {
                title: '分公司',
                align: 'center',
                key: 'company',
                minWidth: 120,
                render: (h, params) => {
                    return h('span', params.row.company ? params.row.company.split(' ')[0] : '');
                },
            },
            {
                title: '部门',
                align: 'center',
                key: 'office',
                minWidth: 120,
            },
            {
                title: '岗位',
                align: 'center',
                key: 'job',
                minWidth: 120,
            },
            {
                title: '入职日期',
                align: 'center',
                key: 'entryTime',
                minWidth: 120,
                sortable: true,
            },
            {
                title: '离职日期',
                align: 'center',
                key: 'departureDate',
                minWidth: 120,
                sortable: true,
                render: (h, params) => {
                    return h('span', params.row.departureDate ? params.row.departureDate : '');
                },
            },
            {
                title: '考勤月份',
                align: 'center',
                key: 'attendanceYearMonth',
                minWidth: 120,
            },
            {
                title: '应出勤天数',
                align: 'center',
                key: 'attendanceDate',
                minWidth: 120,
            },
            {
                title: '出勤天数',
                align: 'center',
                key: 'actualAttendanceDays',
                minWidth: 120,
                sortable: true,
            },
            {
                title: '旷工天数',
                align: 'center',
                key: 'completionDays',
                minWidth: 120,
                sortable: true,
            },
            {
                title: '缺勤天数',
                align: 'center',
                key: 'absenceDays',
                minWidth: 120,
                sortable: true,
            },
            {
                title: '迟到次数',
                align: 'center',
                key: 'lateTimes',
                minWidth: 120,
                sortable: true,
            },
            {
                title: '加班天数',
                align: 'center',
                key: 'overtimeDays',
                minWidth: 120,
                sortable: true,
            },
            {
                title: '未休假天数',
                align: 'center',
                key: 'notLeaveDays',
                minWidth: 120,
                sortable: true,
                render: (h, params) => {
                    return h('span', params.row.notLeaveDays ? params.row.notLeaveDays : '0');
                },
            },
            {
                title: '备注',
                align: 'center',
                key: 'remarks',
                minWidth: 120,
            },
            {
                title: '操作',
                align: 'center',
                key: 'caozuo',
                minWidth: 80,
                render: (h, params) => {
                    const localThis = this;
                    return h('span', {
                        style: {
                            color: '#44bcb7',
                            cursor: 'pointer',
                        },
                        on: {
                            click() {
                                localThis._this.showEditModal(params.row, params.index);
                            },
                        },
                    },'编辑');
                },
            },
        ];
};