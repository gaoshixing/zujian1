<style lang="less">
.payroll-container{
    position: relative;
    .count{
        position: relative;
        float: left;line-height: 32px;margin-left: 16px;margin-right: 20px;
        font-size: 14px;
        span{
            padding: 0 10px;
            font-size: 18px;color: #41b3ae;
        }
    }
    .ivu-table-cell{
        padding-left: 8px;padding-right: 8px;
    }
    #table-chose-to-show-boss{
        z-index: 100;
    }
}
</style>
    
<template>
<div class="payroll-container">
    <div class="brief-top" style="padding-bottom: 0;position: relative;z-index: 99;overflow: inherit;height:56px;">
        <Select v-model="selectDate" @on-change="changeDate" style="width:200px;margin-bottom:12px;">
            <Option v-for="item in dateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <div class="count">应发工资合计  <span>{{ totalPayment }}元</span>，实发工资合计   <span style="color: red;">{{ finalPayment }}元</span></div>
        <!-- <Button type="primary" class="edit">导出</Button> -->
    </div>
    <largeTable
        v-if="largeTable.tableColumnList.length && dataOk"
        :pId="pid"
        :showTags=false
        :exportExcel=true
        :multipleHead=true
        :hasCaoZuo=true
        :fixedHeader="[ 'month' ]"
        :checkBoxList="largeTable.checkBoxList"
        :tableColumnsChecked="largeTable.checkBoxList"
        :table2ColumnList="largeTable.tableColumnList"
        :tableData2="largeTable.tableData"
        style="margin-top: 20px; margin-left: 20px;"
        @exportExcel="exportExcel"
    ></largeTable>
</div>
</template>

<script>

import valid, { errors, salSalaryInfo } from '../../../libs/request.js';
import { waitUntil, } from '@public/libs/util';
import largeTable from '../../../modules/largeTablePayroll.vue';
import { mapState, mapMutations, } from 'vuex';
import SalaryManegeClass from '../../../schema/salaryPayroll.js';

export default {
    name: 'SalaryManage',
    props: {
        pid: {
            type: [Number, String],
            required: true,
        },
    },
    data(){
        return {
            selectDate: '',
            dateList: [],
            largeTable: {
                checkBoxList: [],
                tableChecked: [],
                tableColumnList: [],
                tableData: [],
            },
            dataOk: false,
            totalPayment: '',
            finalPayment: '',
        };
    },
    components: {
        largeTable,
    },
    mounted(){
        this.dealClassFunc();
        this.setYear();
        waitUntil(() => {
            return !!this.largeTable.tableColumnList.length;
        }, () => {
            this.dataOk = true;
        });
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        setYear() {
            let currentYear = new Date().getFullYear();
            this.selectDate = currentYear;
            let dateList = [
                {
                    value: currentYear,
                    label: currentYear + '年'
                },
                {
                    value: currentYear - 1,
                    label: currentYear - 1 + '年'
                },
                {
                    value: currentYear - 2,
                    label: currentYear - 2 + '年'
                }
            ]
            this.dateList = dateList;
            this.getLists();
        },
        getLists() {
            // 获取页面数据
            let params = {
                userId: this.$route.query.userId,
                year: this.selectDate
            }
            salSalaryInfo.getPayBill(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    let data = res.data.data;
                    this.largeTable.tableData = data.list;
                    this.finalPayment = data.finalPayment;
                    this.totalPayment = data.totalPayment;
				}
            }).catch(errors.call(this));
        },
        changeDate(item) {
            this.getLists();
        },
       /*
        * 列表表头获取
        */
        dealClassFunc() {
            waitUntil(() => {
                return !!this.$route.query.userId;
            }, () => {
                const newSalaryManegeClass = new SalaryManegeClass(this, { userId: this.$route.query.userId });
                newSalaryManegeClass.dealHeaderData({ userId: this.$route.query.userId }).then(res => {
                    setTimeout(() => this.largeTable.tableColumnList = res, 0);
                });
                newSalaryManegeClass.getDoubleHeadList({ userId: this.$route.query.userId }).then(res => {
                    this.tempColumnList = JSON.parse(JSON.stringify(res)); // 保存 表头 数据 结构
                    let tempArr = [];
                    res.forEach(item => {
                        item.value.forEach(items => tempArr.push(items));
                    });
                    this.largeTable.checkBoxList = this.largeTable.tableChecked = tempArr;
                });
            });
        },
        exportExcel(data) {
            const tempArr = [];
            data.resInfoColVOS.split(',').forEach(item => {
                this.largeTable.checkBoxList.forEach(items => {
                    if (item === items.key) tempArr.push(items)
                });
            });
            const datas = {
                cols: tempArr,
                // month: this.month < 10 ? '0' + this.month : this.month + '',
                userId: this.$route.query.userId,
                year: this.selectDate,
            }
            this.updateLoadingStatus({isLoading:true});
            salSalaryInfo.exportExcel(datas).then(valid.call(this)).then(res => {
                if (res.data) {
                    const blob = new Blob([res.data], {type: 'application/actet-stream;charset=utf-8'});
                    const contentDisposition = res.headers['content-disposition'];  //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
                    const patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
                    const result = patt.exec(contentDisposition);
                    if (!result) {
                        this.$Message.error('暂无数据');
                        return;
                    }
                    const filename = result[1];
                    const downloadElement = document.createElement('a');
                    const href = window.URL.createObjectURL(blob); //创建下载的链接
                    downloadElement.style.display = 'none';
                    downloadElement.href = href;
                    downloadElement.download =filename ; //下载后文件名
                    document.body.appendChild(downloadElement);
                    downloadElement.click(); //点击下载
                    document.body.removeChild(downloadElement); //下载完成移除元素
                    window.URL.revokeObjectURL(href);
                } else {
                    this.$Message.error(res.data.message);
                }
            }).catch(errors.call(this)).finally(() => {this.updateLoadingStatus({isLoading:false});});
        },
    }
}
</script>


