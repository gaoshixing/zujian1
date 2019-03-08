<style lang="less">
.social-security-container{
    position: relative;
    .count{
        position: relative;
        float: left;line-height: 32px;margin-left: 16px;margin-right: 20px;
        font-size: 14px;
        span{
            padding: 0 10px;
            font-size: 18px;color: #41b3ae;
        }
        &::after{
            content: "";height: 16px;
            position: absolute;top: 7px;right: -20px;
            border-right: 1px solid #e0e0e0;
        }
    }
    .ivu-table-cell{
        padding-left: 8px;padding-right: 8px;
    }
    .change-social-security{
        position: relative;padding-top: 20px;margin-left: 20px;height: 74px;
        background: rgb(245, 245, 245);
    }
    .social-security-btn{
        position: absolute;right: 20px;top: 20px;z-index: 3;
    }
    .export-exceil-button{
        @h: 32px;
        margin-right: 20px;
        padding: 0 15px;height: 32px;
    }
}
</style>
    
<template>
<div class="social-security-container">
    <div class="brief-top">
        <Select v-model="selectDate" @on-change="changeDate" style="width:200px;margin-bottom:12px;">
            <Option v-for="item in dateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <div class="count">社保缴费合计  <span>{{ socialSecurity }}元</span>，公积金缴费合计   <span style="color: red;">{{ publicReserveFunds }}元</span></div>
        <span class="new-date">更新时间：2018年5月30日  12:20</span>
    </div>
    <div class="change-social-security clearfix">
        <div class="social-security-btn">
            <Button type="primary" class="upload-btn edit" @click="editSocialSecurity">{{ editText }}</Button>
        </div>
        <Form ref="form2" :model="form" :label-width="100">
            <FormItem label="社保城市：" style="width: 30%">
                <cityarea ref="city" v-if="edit" :pro.sync="form.provinceId" :ci.sync="form.cityId" width="45%"/>
                <div v-else>{{ form.provinceName + ' ' + form.cityName }}</div>
            </FormItem>
            <FormItem label="社保基数：" style="width: 30%">
                <InputNumber v-model="form.socialBaseNum" v-if="edit" style="width:100px;"/>
                <div v-else>{{ form.socialBaseNum }}</div>
            </FormItem>
            <FormItem label="公积金基数：" style="width: 30%">
                <InputNumber v-model="form.fundBase" v-if="edit" style="width:100px;"/>
                <div v-else>{{ form.fundBase }}</div>
            </FormItem>
        </Form>
    </div>
    <largeTable
        v-if="largeTable.tableColumnList.length && dataOk"
        :pId="pid"
        :showTags=false
        :exportExcel=false
        :multipleHead=true
        :hasCaoZuo=true
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

import valid, { errors, salSocialSecurity, salSalaryInfo } from '../../../libs/request.js';
import { waitUntil, } from '@public/libs/util';
import largeTable from '../../../modules/largeTablePayroll.vue';
import { mapState, mapMutations, } from 'vuex';
import SalaryManegeClass from '../../../schema/salaryPayroll.js';
import cityarea from '@public/modules/cityarea';

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
            socialSecurity: null,
            publicReserveFunds: null,
            form: {
                provinceId: '', 
                cityId: '', 
                socialBaseNum: null,
                fundBase: '',
                cityName: '',
                provinceName: null,
            },
            edit: false,
            editText: '编辑'
        };
    },
    components: {
        largeTable, cityarea
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
            salSocialSecurity.getSalSocialSecurity(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    let data = res.data.data;
                    this.largeTable.tableData = data.list;
                    this.publicReserveFunds = data.publicReserveFunds;
                    this.socialSecurity = data.socialSecurity;
                    this.form.socialBaseNum = data.socialBaseNum;
                    this.form.fundBase = data.fundBase;
                    this.form.cityName = data.cityName;
                    this.form.cityId = data.cityId;
                    this.form.provinceId = data.provinceId;
                    this.form.provinceName = data.provinceName;
				}
            }).catch(errors.call(this));
        },
        editSocialSecurity() {
            // 社保城市、社保基数、公积金基数
            if(this.edit) {
                // 点击保存
                this.updateBaseNum();
            }else{
                // 点击编辑
                this.editText = '保存';
                this.edit = true;
            }
        },
        updateBaseNum() {
            let params = JSON.parse(JSON.stringify(this.form));
            params.userId = this.$route.query.userId;
            salSocialSecurity.updateBaseNum(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.edit = false;
                    this.editText = '编辑';
                    this.getLists();
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
                const newSalaryManegeClass = new SalaryManegeClass(this, { userId: this.$route.query.userId, flag: 'social', });
                newSalaryManegeClass.dealHeaderData({ userId: this.$route.query.userId, flag: 'social', }).then(res => {
                    setTimeout(() => this.largeTable.tableColumnList = res, 0);
                });
                newSalaryManegeClass.getDoubleHeadList({ userId: this.$route.query.userId, flag: 'social', }).then(res => {
                    this.tempColumnList = JSON.parse(JSON.stringify(res)); // 保存 表头 数据 结构
                    let tempArr = [];
                    res.forEach(item => {
                        item.value.forEach(items => tempArr.push(items));
                    });
                    this.largeTable.checkBoxList = this.largeTable.tableChecked = tempArr;
                });
            });
        },
        exportExcel() {
           /*  const tempArr = [];
            data.resInfoColVOS.split(',').forEach(item => {
                this.largeTable.checkBoxList.forEach(items => {
                    if (item === items.key) tempArr.push(items)
                });
            }); */
            const datas = {
                //cols: tempArr,
                // month: this.month < 10 ? '0' + this.month : this.month + '',
                userId: this.$route.query.userId,
                year: this.selectDate,
            }
            // this.updateLoadingStatus({isLoading:true});
            window.open(salSocialSecurity.exportExcelGet(datas))
            // salSocialSecurity.exportExcel(datas).then(valid.call(this)).then(res => {
            //     if (res.data && res.data.status != 'error') {
            //         const blob = new Blob([res.data], {type: 'application/actet-stream;charset=utf-8'});
            //         const contentDisposition = res.headers['content-disposition'];  //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
            //         const patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
            //         const result = patt.exec(contentDisposition);
            //         if (!result) {
            //             this.$Message.error('暂无数据');
            //             return;
            //         }
            //         const filename = result[1];
            //         const downloadElement = document.createElement('a');
            //         const href = window.URL.createObjectURL(blob); //创建下载的链接
            //         downloadElement.style.display = 'none';
            //         downloadElement.href = href;
            //         downloadElement.download =filename ; //下载后文件名
            //         document.body.appendChild(downloadElement);
            //         downloadElement.click(); //点击下载
            //         document.body.removeChild(downloadElement); //下载完成移除元素
            //         window.URL.revokeObjectURL(href);
            //     } /* else {
            //         this.$Message.error(res.data.message);
            //     } */
            // }).catch(errors.call(this)).finally(() => {this.updateLoadingStatus({isLoading:false});});
        },
    }
}
</script>


