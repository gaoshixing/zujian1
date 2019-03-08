import valid, { sys, errors, common, } from '@public/libs/request';

export default class Common {
    constructor() {
        this.name = Common.name;
    };
    /*
    * 获取分公司列表
    */
    static getCompanyList() {
        return new Promise((resolve, reject) => {
            sys.controlledList().then(valid.call(this)).then(res => {
                if (res.ok) {
                    const tempArr = res.data.data.map(item => ({label: item.companyName, value: item.id}));
                    resolve(tempArr);
                } else {
                    reject([]);
                }
            }).catch(errors.call(this));
        });
    };
    /*
    * 标签 8001 8005
    */
    static getTagListById(data) {
        return new Promise((resolve, reject) => {
            common.listData(data).then(valid.call(this)).then(res => {
                if (res.ok) {
                    const tempArr = res.data.data.map(item => ({label: item.name, value: item.id}));
                    resolve(tempArr);
                } else {
                    reject([]);
                }
            }).catch(errors.call(this));
        });
    };
    /*
    * 公共库
    */
    static getSource(data) {
        return new Promise((resolve, reject) => {
            sys.getByType(data).then(valid.call(this)).then(res => {
                if (res.ok) {
                    const rdata = res.data.data.map(item => ({label: item.label, value: item.id, filterKey: item.value, }));
                    resolve(rdata);
                } else {
                    reject([]);
                }
            }).catch(errors.call(this));
        });
    };
};