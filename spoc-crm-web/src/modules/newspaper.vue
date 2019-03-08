<style lang="less">
.newspaper-container{
    position: relative;border-top: 1px solid #e0e0e0;padding-top: 12px;
    .search-data{
        position: relative;padding-left: 95px;zoom: 1;width: 860px;min-height: 32px;
        &:after,&::before{
            content: '';display: table;clear: both;visibility: hidden;font-size: 0;height: 0;
        }
        .title{
            width: 80px;position: absolute;left: 0;top: 0;line-height: 30px;
            color: #b8b8b8;text-align: right;
        }
        li{
            float: left;padding: 5px 12px;cursor: pointer;margin:3px;line-height: 1;
            &.active{
                background: #44bcb6;color: #fff;
            }
        }
    }
    .seo-timePicker {
        float: left;
        @h: 28px;
        .ivu-input-icon{
            height: @h;line-height: @h;
        }
        .ivu-input-icon-normal + .ivu-input{
            height: @h;
        }
    }
    .seo-count{
        position: relative;top: 6px;
        font-size: 14px;color: #222;
        span{
            font-size: 18px;color: #44bcb7;
        }
    }
    .btn-lists-div{
        @h:40px;
        @radius: 1px;
        position: relative;
        height: @h;line-height: @h;padding-left: 21px;margin-top: 22px;
        border: 1px solid #e0e0e0;border-radius: @radius;
        font-size: 14px;color: #666;
        background: #fafafa;
        &:before{
            @border-width: -1px;
            content: "";
            position: absolute;left: @border-width;top: @border-width;bottom: @border-width;
            width: 5px;
            border-top-left-radius: @radius;
            border-bottom-left-radius: @radius;
            background: #44bcb7;
        }
    }
    .page-box{
        padding-top: 20px;padding: 18px;text-align: center;
    }
    // 表格
    .ivu-table-wrapper {
        border: none;
    }
    .ivu-table {
        th{
            background: #fff;
        }
    }
    .ivu-table:after {
        display: none;
    }
}
.seo-modal{
    font-size: 14px;
    .open-tips{
        position: absolute; left: -80px; top: 0px; font-size: 18px; color: #c7ced9; cursor: pointer;
    }
    .error{
        .ivu-input{
            border-color: #f00;
        }
    }
}
</style>
    
<template>
<div class="newspaper-container">
    <div class="search-data">
        <span class="title">选择日期：</span>
        <ul>
            <li v-for="item in datalists" :key="item.id" 
                @click="choiceData(item)"
                :class="{ active:dataChecked === item.id }">{{ item.data }}
            </li>
        </ul>
        <div class="seo-timePicker">
            <DatePicker type="date"
                placeholder="选择日期" 
                style="width: 120px"
                :value="choiceDay"
                @on-change="dateChange">
            </DatePicker>
        </div>
    </div>
    <div class="seo-count">当前总消费总计 <span v-html="count.cost"></span> 万元，留电量总计 <span v-html="count.phoneNum"></span> 个，平均留电率 <span v-html="count.phoneRate + '%'"></span>，平均留电成本 <span v-html="count.phoneCost"></span> 元。</div>
    <div class="btn-lists-div">
        <span>数据列表</span>
    </div>

    <Table :columns="columns" :data="list" v-if="edit"></Table>
    <Table :columns="columnsNews" :data="list" v-else></Table>
    
    <Modal class="seo-modal" v-model="seoModal" title="编辑时段综合数据" width="728" v-if="edit">
        <Form ref="seoForm" :model="seoForm" :label-width="125">
            <FormItem label="日期：">
                <Input v-model="seoForm.sdate" disabled style="width: 210px"/>
            </FormItem>
            <FormItem label="时段：">
                <Input v-model="seoForm.sinterval" disabled style="width: 210px"/>
            </FormItem>
            <FormItem label="总消费：">
                <Input v-model="seoForm.cost" :class="[seoFormError.cost ? 'error' : 'success']" @on-change="changeCost" style="width: 210px"/>
                <span>元</span>
            </FormItem>
            <FormItem label="综合对话量：">
                <Input v-model="seoForm.dialogNum" :class="[seoFormError.dialogNum ? 'error' : 'success']" @on-change="changeDialogNum" style="width: 210px"/>
            </FormItem>
            <FormItem label="留电量：">
                <div class="open-tips">
                    <Tooltip placement="top-start">
                        <span><Icon type="help-circled"></Icon></span>
                        <div slot="content">
                            <p>留电量指当前日期-时段内，</p>
                            <p>客服录入+商务通导入系统的资源量。</p>
                        </div>
                    </Tooltip>
                </div>
                <Input v-model="seoForm.phoneNum" disabled style="width: 210px"/>
            </FormItem>
            <FormItem label="留电率：">
                <Input v-model="seoForm.phoneRatePercent" disabled style="width: 210px"/>
            </FormItem>
            <FormItem label="留电成本：">
                <Input v-model="seoForm.phoneCost" disabled style="width: 210px"/>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button @click="closeModal">取消</Button>
            <Button type="primary" @click="editSuccess">确定</Button>
        </div>
    </Modal>
</div>
</template>

<script>

import valid, {errors, crmStatistics} from '../libs/request.js';

export default {
    props: {
        edit: {
            type: Boolean,
            required: true
        }
    },
    data(){
        return {
            datalists: [
                { id: '101', data: '今天', ms: 0 },
                { id: '102', data: '昨天', ms: -1 },
                { id: '103', data: '前天', ms: -2 },
            ],
            dataChecked: '101',
            choiceDay: '',
            count: {},
            list: [],
            params: {},
            seoModal: false,
            params: {},
            seoForm: {},
            seoFormError: {
                cost: false,
                dialogNum: false
            },
            columns: [
                {
                    title: '日期',
                    align: 'center',
                    key: 'sdate',
                },
                {
                    title: '星期',
                    align: 'center',
                    key: 'week',
                },
                {
                    title: '时段',
                    align: 'center',
                    key: 'sinterval',
                },
                {
                    title: '总消费（元）',
                    align: 'center',
                    key: 'cost',
                },
                {
                    title: '综合对话量',
                    align: 'center',
                    key: 'dialogNum',
                },
                {
                    title: '留电量',
                    align: 'center',
                    key: 'phoneNum',
                },
                {
                    title: '留电率',
                    align: 'center',
                    key: 'phoneRate',
                    render: (h, params) => {
                        return h('span', params.row.phoneRate + '%')
                    }
                },
                {
                    title: '留电成本（元）',
                    align: 'center',
                    key: 'phoneCost',
                },
                {
                    title: '操作',
                    align: 'center',
                    render: (h, params) => {
                        console.log(params.row.sdate)
                        let day = new Date();
                        let month = day.getMonth()+1 > 9 ? day.getMonth()+1 : '0' + (day.getMonth()+1);
                        let dayDetail = day.getDate() > 9 ? day.getDate() : '0' + day.getDate();
                        let newDay = day.getFullYear() + '-' + month + '-' + dayDetail;
                        let time = day.getHours();
                        // 判断时间段是不是已经过去
                        let arr = ['08:00-10:00','10:00-12:00','12:00-14:00','14:00-16:00','16:00-18:00'];
                        let newArr = [];
                        if(time >= 10 && time < 12) {
                            newArr = ['08:00-10:00'];
                        }else if(time >= 12 && time < 14) {
                            newArr = ['08:00-10:00','10:00-12:00'];
                        }else if(time >= 14 && time < 16) {
                            newArr = ['08:00-10:00','10:00-12:00','12:00-14:00'];
                        }else if(time >= 16 && time < 18) {
                            newArr = ['08:00-10:00','10:00-12:00','12:00-14:00','14:00-16:00'];
                        }else if(time >= 18) {
                            newArr = ['08:00-10:00','10:00-12:00','12:00-14:00','14:00-16:00','16:00-18:00'];
                        }
                        if(params.row.sdate == newDay && newArr.indexOf(params.row.sinterval) != -1) {
                            return h('a', {
                                on: {
                                    click: () => {
                                        this.openModal(params.row);
                                    }
                                }
                            }, '编辑')
                        }
                    }
                },
            ],
            columnsNews: [
                {
                    title: '日期',
                    align: 'center',
                    key: 'sdate',
                },
                {
                    title: '星期',
                    align: 'center',
                    key: 'week',
                },
                {
                    title: '时段',
                    align: 'center',
                    key: 'sinterval',
                },
                {
                    title: '总消费（元）',
                    align: 'center',
                    key: 'cost',
                },
                {
                    title: '综合对话量',
                    align: 'center',
                    key: 'dialogNum',
                },
                {
                    title: '留电量',
                    align: 'center',
                    key: 'phoneNum',
                },
                {
                    title: '留电率',
                    align: 'center',
                    key: 'phoneRate',
                    render: (h, params) => {
                        return h('span', params.row.phoneRate + '%')
                    }
                },
                {
                    title: '留电成本（元）',
                    align: 'center',
                    key: 'phoneCost',
                },
            ],
        };
    },
    mounted(){
        this.choiceData({id: '101', data: '今天', ms: 0});
    },
    methods: {
        getLists() {
            // 获取数据
            crmStatistics.seoReportHour(this.params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.count = res.data.data;
                }
            }).catch(errors.call(this));
            crmStatistics.seoReportHourList(this.params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.list = res.data.data;
                }
            }).catch(errors.call(this));
        },
        choiceData(item) {
            // 选择日期
            this.dataChecked = item.id;
            let day = new Date();
            day.setDate(day.getDate() + item.ms);
            let newDay = day.getFullYear() + '-' + (day.getMonth()+1) + '-' + day.getDate();
            this.params.day = newDay;
            this.choiceDay = '';
            this.getLists();
        },
        dateChange(data) {
            // console.log(this.choiceDay)
            if(data == '') {
                this.choiceData(this.datalists[0]);
                return false;
            }
            this.dataChecked = '';
            this.params.day = data;
            this.getLists();
        },
        editSuccess() {
            // 编辑确定
            let item = this.seoForm;
            let data = {
                id: item.id,
                sdate: item.sdate,
                week: item.week,
                sinterval: item.sinterval,
                cost: item.cost,
                dialogNum: item.dialogNum,
                phoneNum: item.phoneNum,
                phoneRate: item.phoneRate,
                phoneCost: item.phoneCost,
                sort: item.sort,
            }
            if(!this.seoFormError.cost) {
                crmStatistics.saveSeoReportHour(data).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        this.seoModal = false;
                        this.getLists();
                    }
                }).catch(errors.call(this));
            }
        },
        openModal(item) {
            // 打开弹窗
            this.seoForm = item;
            this.seoForm = {
                id: item.id ? item.id : '',
                sdate: item.sdate,
                week: item.week,
                sinterval: item.sinterval,
                cost: item.cost,
                dialogNum: item.dialogNum,
                phoneNum: item.phoneNum,
                phoneRatePercent: item.phoneRate + '%',
                phoneRate: item.phoneRate,
                phoneCost: item.phoneCost,
                sort: item.sort,
            },
            this.seoModal = true;
        },
        changeCost(event) {
            // 编辑总消费
            let success = true;
            this.seoFormError.cost = false;
            if(!(/^[0-9]+(.[0-9]{1,2})?$/.test(this.seoForm.cost))) {
                success = false;
                this.seoFormError.cost = true;
            }
            if(success) {
                if(this.seoForm.phoneNum == 0) {
                    this.seoForm.phoneCost = 0;
                }else{
                    this.seoForm.phoneCost = this.seoForm.cost / this.seoForm.phoneNum;
                }
            }
        },
        changeDialogNum(event) {
            // 编辑综合对话量
            let success = true;
            this.seoFormError.dialogNum = false;
            if(!(/^\d+$/.test(this.seoForm.dialogNum))) {
                success = false;
                this.seoFormError.dialogNum = true;
            }
            if(success) {
                this.seoForm.phoneRate = parseInt(this.seoForm.phoneNum / this.seoForm.dialogNum * 10000) / 100;
                this.seoForm.phoneRatePercent = this.seoForm.phoneRate + '%';
            }
        },
        closeModal() {
            // 关闭弹窗
            this.seoModal = false;
        }
    },
}
</script>


