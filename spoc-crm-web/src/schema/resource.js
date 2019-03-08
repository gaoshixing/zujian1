import Commons from './common';

export default class Resource extends Commons {
    constructor(_this) {
        super();
        this.name = Resource.name;
        Resource._this = _this;
        Resource.init();
    };
    static init () {
        /*
        * 获取分公司列表筛选项
        */
        Commons.getCompanyList().then(res => {
            this.resourceFrom.office.filters = res;
        }).catch(err => {
            this.resourceFrom.office.filters = err;
        });
        /*
        * 获取星级
        */
        Commons.getTagListById({parent: 8001}).then(res => {
            this.resourceFrom.star.filters = res;
        }).catch(err => {
            this.resourceFrom.star.filters = err;
        });
        /*
        * 获取来源
        */
       Commons.getTagListById({parent: 8007}).then(res => {
            this.resourceFrom.source.filters = res;
        }).catch(err => {
            this.resourceFrom.source.filters = err;
        });
        /*
        * 公共库
        */
       Commons.getSource({type: 'crm_customer_phase',}).then(res => {
            this.resourceFrom.phase.filters = res;
       }).catch(err => {
            this.resourceFrom.phase.filters = err;
       });
    };

    /*
    * 销售顾问个人统计明细
    */
    static detailSalesColumn() {
        const fullArr =Object.keys(this.resourceFrom);
        const tempArr = [ 'score', 'office', 'phase' ]; // 不进行展示的表头
        tempArr.forEach(item => {
            fullArr.forEach((items, index) => {
                if(items === item) {
                    fullArr.splice(index, 1);
                }
            });
        });
        const tempColumn = {};
        const tempCheck = [];
        fullArr.forEach(item => {
            tempColumn[item] = this.resourceFrom[item];
        });
        // this.checkList.forEach(item => {
        //     if (item.label !== 'score' && item.label !== 'office' && item.label !== 'phase') {
        //         tempCheck.push(item);
        //     }
        // });
        return {
            column: tempColumn,
            // checkList: tempCheck,
        };
    };
    /*
    * 资源表头
    */
    static resourceFrom = {
        'cusCode': {
            title: '编号',
            align: 'center',
            key: 'cusCode',
            fixed: 'left',
            minWidth: 120,
            render: (h, params) => {
                return h('span', {
                    style: {
                        color: '#44bcb7',
                        cursor: 'pointer',
                    },
                    on: {
                        click() {
                            Resource._this.$router.push({
                                name: 'crm.detail',
                                query: {
                                    id: params.row.id,
                                    from: 'myclient',
                                },
                            });
                        },
                    },
                }, params.row.cusCode);
            },
        },
        'name': {
            title: '姓名',
            align: 'center',
            key: 'name',
            minWidth: 120,
        },
        'country': {
            title: '国家',
            align: 'center',
            key: 'country',
            minWidth: 120,
        },
        'province': {
            title: '省份',
            align: 'center',
            key: 'province',
            minWidth: 120,
        },
        'city': {
            title: '城市',
            align: 'center',
            key: 'city',
            minWidth: 120,
        },
        'source': {
            title: '来源',
            align: 'center',
            key: 'source',
            minWidth: 120,
            filters: [
                { label: '百度类', value: '百度', },
                { label: '其他来源', value: '其他', },
            ],
            filterMultiple: false,
            filterMethod() {
                return true;
            },
        },
        'score': {
            title: '分值',
            align: 'center',
            key: 'score',
            minWidth: 120,
            sortable: true,
        },
        'star': {
            title: '星级',
            align: 'center',
            key: 'star',
            minWidth: 120,
            filters: [],
            filterMultiple: false,
            filterMethod() {
                return true;
            },
        },
        'owner': {
            title: '跟进人',
            align: 'center',
            key: 'owner',
            minWidth: 120,
        },
        'office': { // 字典获取 后替换
            title: '分公司',
            align: 'center',
            key: 'office',
            minWidth: 120,
            filters: [],
            filterMultiple: false,
            filterMethod() {
                return true;
            },
            render: (h, params) => {
                const textInfo = params.row.office ? params.row.office.split(' ')[0] : '';
                return h('span', textInfo);
            },
        },
        'createBy': {
            title: '创建人',
            align: 'center',
            key: 'createBy',
            minWidth: 120,
        },
        'createDate': {
            title: '创建时间',
            align: 'center',
            key: 'createDate',
            minWidth: 120,
            sortable: true,
            render: (h, params) => {
                const textInfo = new Date(params.row.updateDate).format('yyyy-MM-dd');
                return h('span', textInfo);
            },
        },
        'status': {
            title: '状态',
            align: 'center',
            key: 'status',
            minWidth: 120,
            filters: [
                { label: '未确认', value: '0', },
                { label: '已确认', value: '1', },
                { label: '已失效', value: '2', },
                { label: '已签约', value: '3', },
                // { label: '待分单', value: '待分单', },
                // { label: '待接单', value: '待接单', },
                // { label: '跟进中', value: '跟进中', },
                // { label: '已放弃', value: '已放弃', },
                // { label: '待签约', value: '待签约', },
                // { label: '已签约', value: '已签约', },
            ],
            filterMultiple: false,
            filterMethod() {
                return true;
            },
            render: (h, params) => {
                let textInfo = null;
                switch (params.row.status) {
                    case '0': textInfo = '未确认'; break;
                    case '1': textInfo = '已确认'; break;
                    case '2': textInfo = '已失效'; break;
                    case '3': textInfo = '已签约'; break;
                };
                return h('span', textInfo);
            },
        },
        'phase': {
            title: '公共库',
            align: 'center',
            key: 'phase',
            minWidth: 120,
            filters: [],
            filterMultiple: false,
            filterMethod() {
                return true;
            },
        },
        'sellDate': {
            title: '(待)签约时间',
            align: 'center',
            key: 'sellDate',
            minWidth:130,
            sortable: true,
            render: (h, params) => {
                const textInfo = new Date(params.row.updateDate).format('yyyy-MM-dd');
                return h('span', textInfo);
            },
        },
        'price': {
            title: '(待)签约金额',
            align: 'center',
            key: 'price',
            minWidth: 130,
            sortable: true,
        },
        'isChange': {
            title: '客户来源是否变更',
            align: 'center',
            key: 'isChange',
            minWidth: 150,
            filters: [
                { label: '是', value: '1', },
                { label: '否', value: '0', },
            ],
            filterMultiple: false,
            filterMethod() {
                return true;
            },
            render: (h, params) => {
                const textInfo = params.row.isChange === '0' ? '否' : '是';
                return h('span', textInfo);
            },
        },
        'updateDate': {
            title: '更新时间',
            align: 'center',
            key: 'updateDate',
            minWidth: 120,
            sortable: true,
            render: (h, params) => {
                const textInfo = new Date(params.row.updateDate).format('yyyy-MM-dd');
                return h('span', textInfo);
            },
        },
    };

    // static checkList = [
    //     // { label: 'name', name: '姓名', },
    //     // { label: 'country', name: '国家', },
    //     // { label: 'province', name: '省份', },
    //     // { label: 'city', name: '城市', },
    //     // { label: 'source', name: '来源', },
    //     // { label: 'score', name: '分值', },
    //     // { label: 'star', name: '星级', },
    //     // { label: 'owner', name: '跟进人', },
    //     // { label: 'office', name: '分公司', },
    //     // { label: 'createBy', name: '创建人', },
    //     // { label: 'createDate', name: '创建时间', },
    //     // { label: 'status', name: '状态', },
    //     // { label: 'phase', name: '公共库', },
    //     // { label: 'sellDate', name: '(待)签约时间', },
    //     // { label: 'price', name: '(待)签约金额', },
    //     // { label: 'isChange', name: '客户来源是否变更', },
    //     // { label: 'updateDate', name: '更新时间', },
    // ];

    // static updateData = {
    //     list: [
    //         { ischeck: '0', isSys: '1', key: 'name', name: '姓名', },
    //         { ischeck: '0', isSys: '1', key: 'country', name: '国家', },
    //         { ischeck: '0', isSys: '1', key: 'province', name: '省份', },
    //         { ischeck: '0', isSys: '1', key: 'city', name: '城市', },
    //         { ischeck: '0', isSys: '1', key: 'source', name: '来源', },
    //         { ischeck: '0', isSys: '1', key: 'score', name: '分值', },
    //         { ischeck: '0', isSys: '1', key: 'star', name: '星级', },
    //         { ischeck: '0', isSys: '1', key: 'owner', name: '跟进人', },
    //         { ischeck: '0', isSys: '1', key: 'office', name: '分公司', },
    //         { ischeck: '0', isSys: '1', key: 'createBy', name: '创建人', },
    //         { ischeck: '0', isSys: '1', key: 'createDate', name: '创建时间', },
    //         { ischeck: '0', isSys: '1', key: 'status', name: '状态', },
    //         { ischeck: '0', isSys: '1', key: 'phase', name: '公共库', },
    //         { ischeck: '0', isSys: '1', key: 'sellDate', name: '(待)签约时间', },
    //         { ischeck: '0', isSys: '1', key: 'price', name: '(待)签约金额', },
    //         { ischeck: '0', isSys: '1', key: 'isChange', name: '客户来源是否变更', },
    //         { ischeck: '0', isSys: '1', key: 'updateDate', name: '更新时间', },
    //     ],
    // };

    // static checked = ['cusCode', 'name', 'source', 'score', 'star', 'createDate', 'status', ];
};