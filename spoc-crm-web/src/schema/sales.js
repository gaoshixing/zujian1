import Commons from './common';
import Vue from 'vue';

export default class Sales extends Commons {
    constructor(_this) {
        super();
        this.name = Sales.name;
        Sales._this = _this;
        Sales.init();
    };

    static init () {
        /*
        * 获取分公司列表筛选项
        */
        Commons.getCompanyList().then(res => {
            this.salesForm.office.filters = res;
        }).catch(err => {
            this.salesForm.office.filters = err;
        });
    };
    static getOrderByType(type) {
        let tempData = {};
        Object.keys(this.salesForm).forEach((item, index) => {
            if (this.salesForm[item].sortable) {
                tempData[item] = index - 2;
            }
        });
        return tempData[type];
    };
    /*
    * checkBox list
    */
    static checkBoxList = [
        { label: 'office', name: '分公司', },
        { label: 'resScore', name: '资源总分值', },
        { label: 'resNum', name: '资源总量', },
        { label: 'targetRate', name: '目标完成率', },
        { label: 'resRateBD', name: '资源完成率(百度类)', },
        { label: 'resRateOther', name: '资源完成率(其它来源)', },
        { label: 'fallOutRate', name: '掉单率', },
        { label: 'resS', name: '资源量饱和度', },
        // { label: 'resScoreS', name: '资源分值饱和度', },
        { label: 'resNumBD', name: '资源总量（百度类）', },
        { label: 'resNumOther', name: '资源总量（其他来源）', },
        { label: 'expectAllocNum', name: '预计分单量', },
        { label: 'realityAllocNum', name: '实际分单量', },
        { label: 'expectAllocScore', name: '预计分单分值', },
        { label: 'realityAllocScore', name: '实际分单分值', },
        { label: 'fallOutNum', name: '掉单量', },
        { label: 'getNum', name: '抢单量', },
        { label: 'fallOutScore', name: '掉单分值', },
        { label: 'getScore', name: '抢单分值', },
        { label: 'saleTarget', name: '销售目标', },
        { label: 'signTarget', name: '签约业绩', },
        { label: 'signOrderBD', name: '签单量（百度类）', },
        { label: 'signPriceBD', name: '签单总金额（百度类）', },
        { label: 'signOrderOther', name: '签单量（其他来源）', },
        { label: 'signPriceOther', name: '签单总金额（其他来源）', },
        { label: 'unsignOrder', name: '待签量', },
        { label: 'unsignPrice', name: '待签总金额', },
    ];
    /*
    * checked update info
    */
     static updateData = {
         list: [
            { isSys: '1', ischeck: '0',  key: 'office', name: '分公司', },
            { isSys: '1', ischeck: '0',  key: 'resScore', name: '资源总分值', },
            { isSys: '1', ischeck: '0',  key: 'resNum', name: '资源总量', },
            { isSys: '1', ischeck: '0',  key: 'targetRate', name: '目标完成率', },
            { isSys: '1', ischeck: '0',  key: 'resRateBD', name: '资源完成率(百度类)', },
            { isSys: '1', ischeck: '0',  key: 'resRateOther', name: '资源完成率(其它来源)', },
            { isSys: '1', ischeck: '0',  key: 'fallOutRate', name: '掉单率', },
            { isSys: '1', ischeck: '0',  key: 'resS', name: '资源量饱和度', },
            { isSys: '1', ischeck: '0',  key: 'resScoreS', name: '资源分值饱和度', },
            { isSys: '1', ischeck: '0',  key: 'resNumBD', name: '资源总量（百度类）', },
            { isSys: '1', ischeck: '0',  key: 'resNumOther', name: '资源总量（其他来源）', },
            { isSys: '1', ischeck: '0',  key: 'expectAllocNum', name: '预计分单量', },
            { isSys: '1', ischeck: '0',  key: 'realityAllocNum', name: '实际分单量', },
            { isSys: '1', ischeck: '0',  key: 'expectAllocScore', name: '预计分单分值', },
            { isSys: '1', ischeck: '0',  key: 'realityAllocScore', name: '实际分单分值', },
            { isSys: '1', ischeck: '0',  key: 'fallOutNum', name: '掉单量', },
            { isSys: '1', ischeck: '0',  key: 'getNum', name: '抢单量', },
            { isSys: '1', ischeck: '0',  key: 'fallOutScore', name: '掉单分值', },
            { isSys: '1', ischeck: '0',  key: 'getScore', name: '抢单分值', },
            { isSys: '1', ischeck: '0',  key: 'saleTarget', name: '销售目标', },
            { isSys: '1', ischeck: '0',  key: 'signTarget', name: '签约业绩', },
            { isSys: '1', ischeck: '0',  key: 'signOrderBD', name: '签单量（百度类）', },
            { isSys: '1', ischeck: '0',  key: 'signPriceBD', name: '签单总金额（百度类）', },
            { isSys: '1', ischeck: '0',  key: 'signOrderOther', name: '签单量（其他来源）', },
            { isSys: '1', ischeck: '0',  key: 'signPriceOther', name: '签单总金额（其他来源）', },
            { isSys: '1', ischeck: '0',  key: 'unsignOrder', name: '待签量', },
            { isSys: '1', ischeck: '0',  key: 'unsignPrice', name: '待签总金额', },
        ],
     };
    /*
    * 销售表头
    */
    static salesForm = {
        'saleName': {
            title: '销售顾问',
            align: 'center',
            key: 'saleName',
            minWidth: 120,
            fixed: 'left',
            render: (h, params) => {
                return h('span', {
                    style: {
                        color: '#44bcb7',
                        cursor: 'pointer',
                    },
                    on: {
                        click() {
                            Sales._this.$router.push({
                                name: 'crm.salesStatistics',
                                query: {
                                    uid: params.row.userId,
                                },
                            });
                        },
                    },
                }, params.row.saleName);
            },
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
                const tempInfo = params.row.office ? params.row.office.split(' ')[0] : '';
                return h('span', tempInfo);
            },
        },
        'resScore': {
            title: '资源总分值',
            align: 'center',
            key: 'resScore',
            minWidth: 120,
            sortable: 'custom',
        },
        'resNum': {
            title: '资源总量',
            align: 'center',
            key: 'resNum',
            minWidth: 120,
            sortable: 'custom',
        },
        'targetRate': {
            title: '目标完成率',
            align: 'center',
            key: 'targetRate',
            minWidth: 120,
            sortable: 'custom',
            render: (h, params) => {
                return h('span', Sales.currency(params.row.targetRate) + '%');
            },
        },
        'resRateBD': {
            title: '资源完成率(百度类)',
            align: 'center',
            key: 'resRateBD',
            minWidth: 160,
            sortable: 'custom',
            render: (h, params) => {
                return h('span', Sales.currency(params.row.resRateBD) + '%');
            },
        },
        'resRateOther': {
            title: '资源完成率(其它来源)',
            align: 'center',
            key: 'resRateOther',
            minWidth: 170,
            sortable: 'custom',
            render: (h, params) => {
                return h('span', Sales.currency(params.row.resRateOther) + '%');
            },
        },
        'fallOutRate': {
            title: '掉单率',
            align: 'center',
            key: 'fallOutRate',
            minWidth: 120,
            sortable: 'custom',
            render: (h, params) => {
                return h('span', Sales.currency(params.row.fallOutRate) + '%');
            },
        },
        'resS': {
            title: '资源量饱和度',
            align: 'center',
            key: 'resS',
            minWidth: 130,
            sortable: 'custom',
            render: (h, params) => {
                const tempInfo = params.row.resS ? Sales.currency(params.row.resS) + '%' : '0%';
                return h('span', tempInfo);
            },
        },
        'resScoreS': {
            title: '资源分值饱和度',
            align: 'center',
            key: 'resScoreS',
            minWidth: 120,
            sortable: 'custom',
        },
        'resNumBD': {
            title: '资源总量(百度类)',
            align: 'center',
            key: 'resNumBD',
            minWidth: 160,
            sortable: 'custom',
        },
        'resNumOther': {
            title: '资源总量(其他来源)',
            align: 'center',
            key: 'resNumOther',
            minWidth: 170,
            sortable: 'custom',
        },
        'expectAllocNum': {
            title: '预计分单量',
            align: 'center',
            key: 'expectAllocNum',
            minWidth: 120,
            sortable: 'custom',
        },
        'realityAllocNum': {
            title: '实际分单量',
            align: 'center',
            key: 'realityAllocNum',
            minWidth: 120,
            sortable: 'custom',
        },
        'expectAllocScore': {
            title: '预计分单分值',
            align: 'center',
            key: 'expectAllocScore',
            minWidth: 130,
            sortable: 'custom',
        },
        'realityAllocScore': {
            title: '实际分单分值',
            align: 'center',
            key: 'realityAllocScore',
            minWidth: 130,
            sortable: 'custom',
        },
        'fallOutNum': {
            title: '掉单量',
            align: 'center',
            key: 'fallOutNum',
            minWidth: 120,
            sortable: 'custom',
        },
        'getNum': {
            title: '抢单量',
            align: 'center',
            key: 'getNum',
            minWidth: 120,
            sortable: 'custom',
        },
        'fallOutScore': {
            title: '掉单分值',
            align: 'center',
            key: 'fallOutScore',
            minWidth: 120,
            sortable: 'custom',
        },
        'getScore': {
            title: '抢单分值',
            align: 'center',
            key: 'getScore',
            minWidth: 120,
            sortable: 'custom',
        },
        'saleTarget': {
            title: '销售目标',
            align: 'center',
            key: 'saleTarget',
            minWidth: 120,
            sortable: 'custom',
        },
        'signTarget': {
            title: '签约业绩',
            align: 'center',
            key: 'signTarget',
            minWidth: 120,
            sortable: 'custom',
            render: (h, params) => {
                return h('span', Sales.currency(params.row.signTarget));
            },
        },
        'signOrderBD': {
            title: '签单量(百度类)',
            align: 'center',
            key: 'signOrderBD',
            minWidth: 140,
            sortable: 'custom',
        },
        'signPriceBD': {
            title: '签单总金额(百度类)',
            align: 'center',
            key: 'signPriceBD',
            minWidth: 160,
            sortable: 'custom',
            render: (h, params) => {
                return h('span', Sales.currency(params.row.signPriceBD));
            },
        },
        'signOrderOther': {
            title: '签单量(其他来源)',
            align: 'center',
            key: 'signOrderOther',
            minWidth: 160,
            sortable: 'custom',
        },
        'signPriceOther': {
            title: '签单总金额(其他来源)',
            align: 'center',
            key: 'signPriceOther',
            minWidth: 170,
            sortable: 'custom',
            render: (h, params) => {
                return h('span', Sales.currency(params.row.signPriceOther));
            },
        },
        'unsignOrder': {
            title: '待签量',
            align: 'center',
            key: 'unsignOrder',
            minWidth: 120,
            sortable: 'custom',
        },
        'unsignPrice': {
            title: '待签总金额',
            align: 'center',
            key: 'unsignPrice',
            minWidth: 120,
            sortable: 'custom',
            render: (h, params) => {
                return h('span', Sales.currency(params.row.unsignPrice));
            },
        },
    };
    /**
     * 金额格式化，当存在小数时，将显示两位小数
     *
     * @param {} v 金额 || 百分比数据
     *
     * @return {string}
     */
    static currency (v) {
        if (!v) return v;
        const result = String((v / 1).toFixed(2));
        // const result = String((v / 100).toFixed(2));
        const pos = result.indexOf('.00');
        if (pos !== -1) {
            return result.substr(0, pos);
        } else {
            return result;
        }
    };
};
