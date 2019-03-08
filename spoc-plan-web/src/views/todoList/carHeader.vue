<template>
    <header class="schedule-calendar-hd">
        <button type="button"
                class="schedule-calendar-arrow double-arrow"
                @click="prevYear">&lt;&lt;</button>
        <button type="button"
                class="schedule-calendar-arrow"
                @click="prevMonth">&lt;</button>
        <span class="schedule-calendar-display">{{year}} 年 {{month + 1}} 月</span>
        <button type="button"
                class="schedule-calendar-arrow"
                @click="nextMonth">&gt;</button>
        <button type="button"
                class="schedule-calendar-arrow double-arrow"
                @click="nextYear">&gt;&gt;</button>
        <Select v-model="timeV" style="width:15%" @on-change='timeType'>
            <Option v-for="item in timeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="serveStatusV" style="width:15%" @on-change='serveType' >
            <Option value="0" >全部类型</Option>
            <Option v-for="item in serveStatusList" :value="item.value" :key="item.id">{{ item.label }}</Option>
        </Select>
        <Select v-model="taskTagV" multiple  style="width:15%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis" @on-change='taskTagType' >
            <Option v-for="item in taskTagList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        <Select v-model="taskTypeV" style="width:15%" @on-change='teskType' >
            <Option value="0" >全部类型</Option>
            <Option v-for="item in taskTypeList" :value="item.value" :key="item.id">{{ item.label }}</Option>
        </Select>
        <div class="right">
            <!-- 二维码 <img src="" alt=""> -->
            <!-- <span class="icon-fenxiang iconfont share" @click="shareModal"></span> -->
        </div>
    </header>
</template>
<script>
import { calcPrevMonth, calcNextMonth } from './utils'
import valid, {
		errors,
		plFile,
		sys,
		common,
		plServiceGantt
	} from "../../libs/request.js";
export default {
    data() {
        return {
            model1: 'New York',
            timeV: '0',
            timeList: [
                {
                    value: '0',
                    label: '按开始时间列任务'
                },
                {
                    value: '1',
                    label: '按结束时间列任务'
                }
            ],
            serveStatusV: '0',
            serveStatusList: [],
            taskTagV: [],
            taskTagList: [],
            taskTypeV: '0',
            taskTypeList: []
        }
    },
    
    props: {
        year: Number,
        month: Number
    },
    computed: {
    },

    beforeCreate() {
        let params = {
			parent:'4001'
		}
		common.listData(params).then(valid.call(this)).then(res => {
			if(res.ok) {
                this.taskTagList = res.data.data
                this.taskTagV = res.data.data.map(item => item.id)
			}
		}).catch(errors.call(this));
        let params1 = {
			type:'1'
		}
        plServiceGantt.list(params1).then(valid.call(this)).then(res => {
			if(res.ok) {
                this.taskTypeList = res.data.data
			}
		}).catch(errors.call(this));
		let params2 = {
			groupId: this.$route.params.gid
		}
		common.listPhaseData(params2).then(valid.call(this)).then(res => {
			if(res.ok) {
				this.serveStatusList = res.data.data
			}
		}).catch(errors.call(this));
    },

    methods: {
        updateValue({ direction, year, month = this.month }) {
            this.$emit('updateValue', { year, month, direction })
        },
        prevYear() {
            this.updateValue({
                direction: 'Right',
                year: this.year - 1
            })
        },
        nextYear() {
            this.updateValue({
                direction: 'Left',
                year: this.year + 1
            })
        },
        prevMonth() {
            const { year, month } = calcPrevMonth(this.year, this.month)
            this.updateValue({
                direction: 'Right',
                year,
                month
            })
        },
        nextMonth() {
            const { year, month } = calcNextMonth(this.year, this.month)
            this.updateValue({
                direction: 'Left',
                year,
                month
            })
        },

        shareModal() {
            this.$emit('shareModal')
        },

        timeType(val) {
            this.$emit('timeType', val)
        },

        serveType(val) {
            this.$emit('serveType', val)
        },

        taskTagType(val) {
            val = val.join(',')
            this.$emit('taskTagType', val)
        },

        teskType(val) {
            this.$emit('teskType', val)
        },

    }
}
</script>
<style lang="less">
@import './variables.less';
.schedule-calendar-hd {
    .ivu-select-selection > div:first-of-type {
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
} 
.schedule-calendar- {
    &hd {
        height: @sc-header-height;
        padding: 0 0 @sc-header-padding 0;
        font-size: @sc-header-fs;
        line-height: @sc-header-height - @sc-header-padding * 2;
        user-select: none;
        .right {
            padding-top: 4px;
            float: right
        }
        .share {
            font-size: 30px;
        }
    }
    &arrow {
        font-family: consolas;
        font-size: inherit;
        font-weight: 400;
        padding: 0 10px;
        // height: 100%;
        border-radius: 2px;
        transition: .2s ease-in-out;
        &:hover {
        }
        &:active {
           
        }
        &.double-arrow {
            letter-spacing: -3px
        }
    }
    &display {
        // padding: 0 1em;
        height: 100%;
    }
}
</style>
