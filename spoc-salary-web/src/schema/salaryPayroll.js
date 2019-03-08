import largeTableClass from "./largeTable";
import valid, { errors, salSalaryInfo, salPerformanceInfo } from '../libs/request';

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
            let obj = salSalaryInfo;
            if(data.flag) obj = salPerformanceInfo;
            obj.getPerformanceHeadList(data).then(valid.call(this)).then(res => {
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
    // ---员工档案-工资单 start
    /*
    * common column
    */
    columnsSM = [
        {
            title: '月份',
            align: 'center',
            fixed: 'left',
            key: 'month',
            minWidth: 120,
        },
    ];
};