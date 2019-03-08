<style lang="less">
.attendance-sheet-container{
    .brief-top{
        padding-bottom: 10px;
    }
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
            position: absolute;top: 9px;right: -20px;
            border-right: 1px solid #e0e0e0;
        }
        &.not-line{
            margin-left: 30px;
            &::after{
                display: none;
            }
        }
    }
}
</style>
    
<template>
<div class="attendance-sheet-container">
    <div class="brief-top">
        <Select v-model="selectDate" @on-change="changeDate" style="width:320px;margin-bottom:12px;">
            <Option v-for="item in dateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <div class="count">缺勤  <span>{{ countData.absenceDays }} 天</span>，迟到   <span style="color: red;">{{ countData.lateTimes }} 次</span>，加班  <span>{{ countData.overtimeDays }} 天</span></div>
        <div class="count not-line">截止目前，累计未调休天数    <span>{{ countData.notLeaveDays }} 天</span></div>
        <Button type="primary" class="edit upload-btn">导出</Button>
    </div>
    <Table border :columns="columns" :data="attendanceLists"></Table>
</div>
</template>

<script>

import { mapMutations } from 'vuex';
import valid, { errors, salAttendance } from '../../../libs/request.js';

export default {
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
            columns: [
                {
                    title: '考勤月份',
                    align: 'center',
                    key: 'attendanceMonth'
                },
                {
                    title: '应出勤天数',
                    align: 'center',
                    key: 'attendanceDays'
                },
                {
                    title: '出勤（天）',
                    align: 'center',
                    key: 'actualAttendanceDays'
                },
                {
                    title: '缺勤（天）',
                    align: 'center',
                    key: 'absenceDays'
                },
                {
                    title: '矿工（天）',
                    align: 'center',
                    key: 'zongshu'
                },
                {
                    title: '迟到（次）',
                    align: 'center',
                    key: 'lateTimes'
                },
                {
                    title: '加班（天）',
                    align: 'center',
                    key: 'overtimeDays'
                },
                {
                    title: '未休假（天）',
                    align: 'center',
                    key: 'notLeaveDays'
                },
            ],
            attendanceLists: [],
            countData: {
                absenceDays: 0,
                overtimeDays: 0,
                lateTimes: 0,
                notLeaveDays: 0,
            },
        };
    },
    mounted(){
        this.setYear();
    },
    methods: {
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
            let params = {
                userId: this.$route.query.userId,
                year: this.selectDate
            }
            salAttendance.listAttendance(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    let data = res.data.data;
                    this.attendanceLists = data.result;
                    this.countData.absenceDays = data.absenceDays;
                    this.countData.overtimeDays = data.overtimeDays;
                    this.countData.lateTimes = data.lateTimes;
                    this.countData.notLeaveDays = data.notLeaveDays;
				}
            }).catch(errors.call(this));
        },
        changeDate(item) {
            this.getLists();
        },
    },
}
</script>


