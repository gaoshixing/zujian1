import largeTableClass from "./largeTable";
import { waitUntil, } from '@public/libs/util';
import valid, { errors, sys, common, socialSecurityApi, } from '../libs/request';

export default class SocialSecurityClass extends largeTableClass {
    constructor(vm, data) {
        super(vm, data);
        this.name = 'SocialSecurityClass';
        this.vm = vm;
        this.data = data;
    };
    /*
    * 获取表头显示项
    */
    getDoubleHeadList(data) {
        return new Promise((resolve, reject) => {
            socialSecurityApi.getDoubleHeadList(data).then(valid.call(this)).then(res => {
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
            data.splice(0, 1); // 去除固定显示项
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
            this.columns.splice(this.columns.length - 1, 0, ...tempColumn);
            return this.columns;
        });
    };
};