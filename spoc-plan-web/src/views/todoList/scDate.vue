<template>
    <div class="schedule-calendar-date"
         :class="[type, { today: isToday, dragged: draggedIndex === index }]"
         @dragover.prevent=""
         @dragenter.prevent="dragenter"
         
         @mouseout="cancelAdd()"
         @drop="onDrop">
        <div class="schedule-calendar-date-hd">
            <div class="schedule-calendar-date-label">{{date.getDate()}}</div>
            <button v-if="isShowAdd" @click="ShowDialog" class="schedule-calendar-addTask">添加</button>
            <button type="button"
                    class="schedule-calendar-counter"
                    v-if="details.length > volume"
                    @click.stop.prevent="expandAll">共 {{details.length}} 项</button>
        </div>
        <div class="schedule-calendar-details"
             :class="{ expanded }"
             :style="detailsPost"
             ref="details">
            <div v-if="expanded"
                 class="schedule-calendar-details-hd">{{ dateString }}</div>
            <div class="schedule-calendar-details-bd">
                <sc-item v-if="details.length"
                v-for="(item, index) in displayDetails"
                :item="item"
                :date="date"
                :type="type"
                @item-dragstart="dragItem"
                :key="index"></sc-item>
            </div>
        </div>
    </div>
</template>
<script>
import { EventBus, isSameDay, format } from './utils'

import scItem from './scItem'
export default {
    components: {
        scItem
    },
    props: {
        date: Date,
        month: Number,
        type: String,
        data: Array,
        index: Number,
        draggedIndex: Number
    },
    data() {
        return {
            volume: 0,
            expanded: false,
            currentTime: '',
            num: 0,
            // templateList: ['沟通任务', '活动记录', '成绩单', '沟通任务', '活动记录', '成绩单', '沟通任务', '活动记录', '成绩单'],
            addTaskTitle: '',
            isShowAdd: false,
        }
    },
    computed: {
        isToday() {
            return isSameDay(new Date(), this.date)
        },
        details() {
            return this.data.length ? this.data.filter(item => isSameDay(item.date, this.date)) : []
        },
        displayDetails() {
            return this.expanded ? this.details : this.details.slice(0, this.volume)
        },
        dateString() {
            return format(this.date)
        },
        detailsPost() {
            let post = {}

            if (this.index >= 35) {
                post.bottom = 0
            } else {
                post.top = 0
            }

            if ((this.index + 1) % 7 === 0) {
                post.right = 0
            } else {
                post.left = 0
            }

            return post
        }
    },
    methods: {
        // addAdd(val) {
        //     this.currentTime = val.getMonth()
        //     this.isShowAdd = (this.currentTime == this.month) && (new Date().getTime() <= this.date.getTime() || new Date().getDate() == this.date.getDate())
        // },
        cancelAdd() {
            this.currentTime = ''
            this.isShowAdd = false
        },
        calcVolume() {
            this.volume = Math.floor(this.$refs.details.clientHeight / 27)
        },
        expandAll() {
            this.expanded = true
            document.addEventListener('click', this.reduceAll)
        },
        reduceAll(e) {
            if (!this.$refs.details.contains(e.target)) {
                this.expanded = false
                document.removeEventListener('click', this.reduceAll)
            }
        },
        dragenter(e) {
            if (this.$el.contains(e.target)) {
                this.$emit('highlight', this.index)

                if (this.$el === e.target) {
                    EventBus.$emit('cell-dragenter', e, this.date, this.type, this.index)
                }
            }
        },
        dragItem(e, item, date, type) {
            this.$emit('highlight', this.index)
            EventBus.$emit('item-dragstart', e, item, date, type)
        },
        onDrop(e) {
            this.$emit('highlight', -1)
            EventBus.$emit('item-drop', e, this.date, this.type, this.index)
        },

        addActive(item, val) {
            this.addTaskTitle = item
            this.num = val
        },

        ShowDialog() {
            this.$emit('ShowDialog')
        }
    },
    mounted() {
        this.calcVolume()
        window.addEventListener('resize', this.calcVolume)
    },
    destroyed() {
        window.removeEventListener('resize', this.calcVolume)
    }
}
</script>
<style lang="less">
@import './variables.less';
.templateList {
    span {
        width: 148px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        display: inline-block;
        border: 1px solid #e8e8e8;
        margin-right: 20px;
        border-radius: 4px;
        margin-bottom: 20px;
        cursor: pointer;
    }
    .active {
        color: #fff;
        background-color: #44bcbc;
    }
}
.schedule-calendar- {
    &date {
        position: relative;
        display: flex;
        flex-direction: column;
        width: ~"calc(100% / 7)";
        height: ~"calc(100% / 5)";
        padding: 4px;
        border-top: 1px solid @sc-border-color;
        border-left: 1px solid @sc-border-color;
        user-select: none;
        &:nth-child(7n+1) {
            border-left: none
        }
        &.prev,
        &.next {
            color: @sc-gray-light-color;
            background: @sc-gray-background;
        }

        &-label {
            width: @sc-data-label-size;
            height: @sc-data-label-size;
            line-height: @sc-data-label-size;
            text-align: center;
            border-radius: 50%;
        }
        &.today {
            .schedule-calendar-date-label {
                color: @sc-body-color;
                background: @sc-primary-color
            }
        }

        &.dragged {
            background: @sc-primary-light-color;
            .schedule-calendar-details {
                background: @sc-primary-light-color;
            }
        }
    }
    &date-hd {
        display: flex;
        justify-content: space-between;
        align-content: center;
        
    }
    &details {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-content: center;

        &.expanded {
            position: absolute;
            z-index: 2;
            width: @sc-details-width;
            min-width: 100%;
            padding: 0 6px 10px;
            background: @sc-body-color;
            box-shadow: @sc-box-shadow;
            .schedule-calendar-details-bd {
                overflow-y: auto;
                max-height: @sc-details-height - @sc-details-hd-height;
            }
        }
    }
    &details-hd {
        height: @sc-details-hd-height;
        line-height: @sc-details-hd-height;
        font-size: 13px;
        color: @sc-gray-color;
        text-align: center;
    }
    &counter {
        font-size: 13px;
        color: @sc-primary-color;
    }
    &addTask {
        position: absolute;
        left: 50%;
        top: 5%;
        transform: translate(-50%,0);
        color: #44bcbc;
    }
}
</style>
