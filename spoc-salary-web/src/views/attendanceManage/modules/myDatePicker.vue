<style lang="less">
@import '../../../../../../assets/less/config.less';
.data-picker-container{
    @out: 582px;
    @left: 372px;
    position: absolute;z-index: 99999;
    left: 0;right: 0;top: 0;bottom: 0;
    ul, li{
        list-style: none;
    }
    .clear() {
        zoom: 1;
        &::before, &::after{
            content: "";clear: both;height: 0;line-height: 0;display: block;
            font-size: 0;
        }
    }
    .data-picker-bg{
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0,.4);
        position: fixed;
        left: 0;
        top: 0;
    }
    .data-picker-content{
        position: absolute; top: 150px; left: 50%; transform: translateX(-50%); z-index: 2;
        margin-left: auto;margin-right: auto;
        width: @out;height: 340px;
        border-radius: 3px;
        background: #fff;
    }
    .data-picker-left{
        position: absolute;left: 0;top: 0;bottom: 0;
        width: @left;padding: 21px;padding-bottom: 0;
    }
    .data-picker-right{
        position: absolute;right: 0;top: 0;bottom: 0;padding-top: 8px;padding-left: 29px;padding-right: 28px;
        width: @out - @left;border-left: 1px solid #e0e0e0;
        background: #f7f7f7;
        .data{
            @h:58px;
            height: @h;line-height: @h;font-size: 14px;text-align: center;
        }
        .day{
            @w: 60px;
            width: @w;height: @w;line-height: @w;margin: 0 auto 14px;
            text-align: center;background-color: #eee;border-radius: 3px;
            font-size: 20px;color: @primary-color;
        }
        .title{
            @h: 32px;
            height: @h;line-height: @h;
            font-size: 14px;color: #999;
        }
        .ivu-select{
            margin-bottom: 20px;
        }
        .ivu-btn{
            @h: 35px;
            display: block;
            width: 100px;padding: 0;height: @h;line-height: @h;
            margin: 0 auto;
        }
    }
    .data-picker-top{
        @h: 32px;
        .clear();
        margin-bottom: 21px;
        .ivu-select{
            float: left;width: 100px;margin-right: 12px;
        }
        .back-today{
            float: right;height: @h;line-height: @h;font-size: 14px;
        }
    }
    .data-picker-bottom{
        .clear();
    }
    .data-picker-title, .data-picker-detail{
        @h: 32px;
        ul{
            .clear();
            height: @h;
            background: #f7f7f7;
        }
        li{
            float: left;width: 14.285714285714286%;height: @h;line-height: @h;
            text-align: center;color: #333;
            &.gray{
                color: #999;
            }
        }
    }
    .data-picker-detail{
        ul{
            background: #fff;
        }
        li{
            span{
                @h: 28px;
                display: block;width: @h;height: @h;line-height: @h;margin: 1px auto;
                border: 1px solid transparent;
            }
            &.chioce-day, &.today{
                span{
                    border-color: @primary-color;
                }
            }
        }
    }
}
.shang-ban {
    position: relative;
    span {
        color: #44bcb7;
    }
    &::after {
        content: '';
        display: block;
        position: absolute;
        left: 5px;
        top: -2px;
        width: 12px;
        height: 12px;
        background-image: url('../../../assets/img/ban.png');
        background-size: 100% 100%;
    }
}
</style>
    
<template>
<div class="data-picker-container" v-if="showBox">
    <div class="data-picker-bg" @click="hideBoxFun('modal')"></div>
    <div class="data-picker-content">
        <div class="data-picker-left">
            <div class="data-picker-top">
                <Select v-model="year" @on-change="changeYear">
                    <Option v-for="item in yearList" :value="item.value" :key="item.value">{{ item.value + '年' }}</Option>
                </Select>
                <Select v-model="month" @on-change="changeYear">
                    <Option v-for="item in monthList" :value="item.value" :key="item.value">{{ item.value + '月' }}</Option>
                </Select>
                <a v-if="!isToday" class="back-today" @click="goToday()">返回今天</a>
            </div>
            <div class="data-picker-bottom">
                <div class="data-picker-title">
                    <ul>
                        <li>一</li>
                        <li>二</li>
                        <li>三</li>
                        <li>四</li>
                        <li>五</li>
                        <li class="gray">六</li>
                        <li class="gray">日</li>
                    </ul>
                </div>
                <div class="data-picker-detail">
                    <ul>
                        <div
                            v-for="(item,index) in dayList"
                            :key="index">
                                <li
                                    v-if="item"
                                    @click="choiceDay(item)"
                                    :style="{ cursor: item.day > 0 ? 'pointer' : 'auto', }"
                                    :class="{ gray: item.week == 'Saturday' || item.week == 'Sunday', 
                                        'chioce-day' : item.day == day,
                                        'today' : item.day == today,
                                        'shang-ban': item.shangban }">
                                    <span>{{ item.day < 0 ? '' : item.day }}</span>
                                </li>
                                <li v-else></li>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
        <div class="data-picker-right">
            <div class="data">{{ year }}-{{ month }}-{{ day }}  {{ week | weekFilter }}</div>
            <div class="day">{{ day }}</div>
            <div class="title">设置工作状态：</div>
            <Select v-model="state">
                <Option value="3">上班</Option>
                <Option value="1">节假日</Option>
                <Option value="2">休息日</Option>
            </Select>
            <Button type="primary" class="edit" @click="hideBoxFun()">确认</Button>
        </div>
    </div>
</div>
</template>

<script>
import valid, { errors, sys, common, salPerpetualCalenderRest, } from '../../../libs/request';
export default {
    props: {
        yearProp: {},
        monthProp: {},
    },
    data(){
        return {
            index: 0, // 工作天数
            year: '',
            month: '',
            day: new Date().getDate(), //日
            week: new Date().getDay(), //星期
            item: null,
            state: '1', //工作状态
            totalDays: 35, // 日历共显示 35天
            yearList: [
                { value: new Date().getFullYear() + 1, },
                { value: new Date().getFullYear(), },
                { value: new Date().getFullYear() - 1, },
                { value: new Date().getFullYear() - 2, },
                {  value: new Date().getFullYear() - 3, },
            ],
            monthList: [
                { value: 1, },
                { value: 2, },
                { value: 3, },
                { value: 4, },
                { value: 5, },
                { value: 6, },
                { value: 7, },
                { value: 8, },
                { value: 9, },
                { value: 10, },
                { value: 11, },
                { value: 12, },
            ],
            dayList: [],
            weekList: [ 'Sunday', 'Mon', 'Tues', 'Wednesday', 'Thursday', 'Friday', 'Saturday', ],
            columns: [
                {
                    title: 'Name',
                    key: 'name'
                },
            ],
            today: new Date().getDate(),
            toYear: '',
            toMonth: '',
            isToday: false, 
            showBox: false,
        };
    },
    computed: {
        
    },
    watch: {
        yearProp(newVal, oldVal) {
            this.year = newVal;
            if (newVal && oldVal) this.getdays();
        },
        monthProp(newVal, oldVal) {
            this.month = newVal;
            if (newVal && oldVal) this.getdays();
        },
    },
    components: {

    },
    created() {

    },
    mounted(){
        this.toYear = new Date().getFullYear();
        this.toMonth = new Date().getMonth() + 1;
        this.year = this.yearProp;
        this.month = this.monthProp;
        this.getdays();
        if(this.day == new Date().getDay() && this.month == this.toMonth && this.year == this.toYear) this.isToday = true; else this.isToday = false;
    },
    methods: {
        changeYear() {
            let data = new Date(`${this.year}-${this.month}}`);
            this.getdays();
            if(this.day == this.today && this.month == this.toMonth && this.year == this.toYear) this.isToday = true; else this.isToday = false;
        },
        choiceDay(data) {
            this.item = data;
            this.day = data.day;
            this.week = new Date(data.date).getDay();
            if(this.day == this.today && this.month == this.toMonth && this.year == this.toYear) this.isToday = true; else this.isToday = false;
        },
        goToday() {
            if(this.year == this.toYear && this.month == this.toMonth) {
                this.day = this.today;
                this.isToday = true;
            }else{
                this.year = this.toYear;
                this.month = this.toMonth;
                this.day = new Date().getDate();
                this.isToday = true;
                this.getdays();
            }
        },
        showBoxFun() {
            this.showBox = true;
        },
        hideBoxFun(modal) {
            if (modal) {
                this.showBox = false;
                return;
            }
            this.updateCalendar();
        },
        /*
        * 获取天数
        */
        getdays() {
            const data = {
                year: this.year,
                month: this.month,
            };
            salPerpetualCalenderRest.getCalendarByYearAndMonth(data).then(valid.call(this)).then(res => {
                if (res.ok) {
                    this.dayList = res.data.data;
                    if (this.dayList.length === 0) { // 当前月份没有数据
                        this.$emit('getWorkDays', 0); // 获取当月的工作日数
                        return;
                    }
                    this.dayList.forEach(item => {
                        if (item.isWork === '3') this.index++; // isWork 3 上班 1节假日 2 休息日
                        item.date = item.day;
                        item.day = item.day.split('-').pop(); // 获取具体的天数
                        item.week = this.weekList[new Date(item.date).getDay()]; // 获得是星期几
                        if (new Date(item.date).getDay() == 6 || new Date(item.date).getDay() == 0) { // 周六日
                            if (item.isWork === '3') item.shangban = true;
                        }
                    });
                    this.$emit('getWorkDays', this.index); // 获取当月的工作日数
                    this.index = 0;
                    this.dealDayListArr();
                }
            }).catch(errors.call(this));
        },
        /*
        * 处理 dayList
        */
        dealDayListArr() {
            const emptyNums = new Date(this.dayList[0].date).getDay() - 1 < 0 ? 6 : new Date(this.dayList[0].date).getDay() - 1;
            const tempArrFront = [];
            const tempArrEnd = [];
            tempArrFront.length = emptyNums;
            tempArrEnd.length = this.totalDays - emptyNums - this.dayList.length;
            this.dayList.push(...tempArrEnd);
            this.dayList.unshift(...tempArrFront);
        },
        /*
        * 更新日历
        */
        updateCalendar() {
            if (!this.state) {
                this.$Message.error('请设置工作状态');
                return;
            }
            const data = {
                id: this.item.id,
                isWork: this.state,
            };
            salPerpetualCalenderRest.updateCalendar(data).then(valid.call(this)).then(res => {
                this.getdays();
                this.$Message.success(res.data.message)
            }).catch(errors.call(this)).finally(() => { this.state = null; });
        },
    },
    filters: {
        weekFilter: function(value) {
            if (!value) return "";
            let str = '';
            if(value == 'Mon' || value == '1') str = '星期一';
            else if(value == 'Tues' || value == '2') str = '星期二';
            else if(value == 'Wednesday' || value == '3') str = '星期三';
            else if(value == 'Thursday' || value == '4') str = '星期四';
            else if(value == 'Friday' || value == '5') str = '星期五';
            else if(value == 'Saturday' || value == '6') str = '星期六';
            else if(value == 'Sunday' || value == '0') str = '星期日';
            return str
        }
    }
}
</script>