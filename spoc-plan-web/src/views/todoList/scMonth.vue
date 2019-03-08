<template>
    <div class="schedule-calendar-month"
         @animationend="removeAnimation">
        <sc-date v-for="(item, index) in days"
            :date="item.date"
            :type="item.type"
            :data="data"
            :index="index"
            :draggedIndex="draggedIndex"
            @highlight="highlight"
            :month="month"
            @ShowDialog='ShowDialog'
            :key="index"></sc-date>
        <Modal
        width=728
        v-model="modal1"
        title="添加任务"
        @on-ok="ok"
        @on-cancel="cancel">
        <p style="margin-bottom: 16px;font-size: 16px; font-weight: 600">添加任务模板</p>
            <div class="templateList">
                <span v-for="(item, index) in templateList" @click="addActive(item, index)" :class="{'active': num == index}" :key="index">{{item.label}}</span>
            </div>
        </Modal>
        <Modal
            width=728
            v-model="modal2"
            :title="addTaskTitle"
            @on-ok="ok1"
            @on-cancel="cancel1">
        </Modal>
    </div>
</template>
<script>
import { monthlyCalendar } from './utils'
import scDate from './scDate'
import valid, { errors, sys } from "../../libs/request"

export default {
    components: {
        scDate
    },
    props: {
        year: Number,
        month: Number,
        startWeek: Number,
        direction: String,
        data: Array
    },
    data() {
        return {
            viewTransition: 'sc-moveTo',
            draggedIndex: -1,
            modal1: false,
            modal2: false,
            templateList: [],
            addTaskTitle: '',
            num: 0,
        }
    },
    computed: {
        days() {
            return monthlyCalendar(this.year, this.month, this.startWeek)
        },
        animationClass() {
            return this.viewTransition + this.direction
        }
    },

    mounted() {
        this.getModalType()
        console.log(this.data)
    },
    methods: {
        removeAnimation() {
            this.$el.classList.remove(this.animationClass)
        },
        addAnimation() {
            this.$el.classList.add(this.animationClass)
        },
        highlight(index) {
            this.draggedIndex = index
        },

        getModalType() {
            let obj = {
                types:'pl_task_tpl_type',
            }
            sys.batchListData(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.templateList = res.data.data.pl_task_tpl_type
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        addActive(item, val) {
            this.addTaskTitle = item.label
            this.num = val
        },

        ShowDialog() {
            this.modal1 = true
        },

        ok() {
            this.$Message.info('Clicked ok');
            this.modal2 = true
        },

        cancel() {
            this.$Message.info('Clicked cancel');
        },

        ok1() {
            this.$Message.info('Clicked ok');
        },

        cancel1() {
            this.$Message.info('Clicked cancel');
        },
    },
    watch: {
        year(val, old) {
            val !== old && this.addAnimation()
        },
        month(val, old) {
            val !== old && this.addAnimation()
        },
    },
}
</script>
<style lang="less">
@import './variables.less';

.schedule-calendar- {
    &month {
        position: absolute;
        top: @sc-week-height;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-wrap: wrap; // transition: transform .3s ease-in-out;
    }
}

.sc-moveToLeft {
    animation: scMoveToLeft .3s both;
}

.sc-moveToRight {
    animation: scMoveToRight .3s both;
}

@keyframes scMoveToLeft {
    from {
        transform: translate3d(50%, 0, 0);
        visibility: visible;
    }

    to {
        transform: translate3d(0, 0, 0);
    }
}

@keyframes scMoveToRight {
    from {
        transform: translate3d(-50%, 0, 0);
        visibility: visible;
    }

    to {
        transform: translate3d(0, 0, 0);
    }
}
</style>
