<template>
    <div class="schedule-calendar" style="padding-top: 26px;">
        <p style="font-size: 16px;font-weight: 700;line-height: 44px;">日程表</p>
        <car-header
        :year='year'
        :month="month"
        @updateValue="updateView"
        @shareModal = 'shareModal'
        @timeType = 'timeType'
        @serveType = 'serveType'
        @teskType = 'teskType'
        @taskTagType = 'taskTagType'
        >
        </car-header>
        <car-body
        :year="year"
        :month="month"
        :startWeek="startWeek"
        :direction="direction"
        :data="originData">
        </car-body>
        <!-- <Modal
        v-model="modal1"
        title="Common Modal dialog box title"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        </Modal> -->
    </div>
</template>
<script>
import carHeader from './carHeader'
import { EventBus } from './utils'
import carBody from './carBody'
import valid, { errors, RILI } from "../../libs/request"


export default {
    name: 'schedule-calendar',
    components: {
        carHeader,
        carBody
    },
    
    data() {
        return {
            startMonth: '',
            startWeek: 0,
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            direction: 'Left',
            originData: [],
            dragItem: null,
            modal1: false,
            groupId: this.$route.params.gid,
            servicePhase: '0',
            type: 0,
            taskTag: '',
            taskType: '',
        }
    },

    mounted() {
        this.getOriginData()
    },

    computed: {
        
    },

    methods: {
        getOriginData() {
            let obj = {
                type: this.type,
                date: `${this.year}-${this.month + 1 < 10 ? '0' + (this.month/1 + 1) : this.month/1 + 1}`,
                groupId: this.groupId,
                servicePhase: this.servicePhase,	
                taskTag: this.taskTag,
                taskType: this.taskType,
            }
            RILI.originDate(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.originData = []
                    this.aa(res.data.data)
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        aa(val) {
            val.forEach((item, key) => {
                if(item) {
                    if(this.type == 0) {
                        item.list.forEach((item, key) => {
                            this.originData.push({
                                date: item.startTime,
                                text: item.name,
                                id: item.id,
                                status: item.status,
                                groupId: item.groupId,
                            })
                        })
                    }else {
                        item.list.forEach((item, key) => {
                            this.originData.push({
                                date: item.endTime,
                                text: item.name,
                                id: item.id,
                                status: item.status,                                
                                groupId: item.groupId,
                            })
                        })
                    }
                }
            })
            
        },

        go(val) {
            this.$router.push({
                name: val
            })
        },
        updateView({ year, month, direction }) {
            this.year = year
            this.month =  month
            this.direction = direction
            this.getOriginData()
        },
        cellDragenter(e, date, type, index) {
        },
        itemDragstart(e, item, date, type) {
            this.dragItem = item
        },
        itemDrop(e, date, type, index) {
            if (!this.dragItem) return
            this.keepData.find(item => item.id === this.dragItem.id).date = date
        },

        shareModal() {
            this.modal1 = true
        },

        timeType(val) {
            this.type = val
            this.getOriginData()
        },

        serveType(val) {
            this.servicePhase = val
            this.getOriginData()
        },

        taskTagType(val) {
            this.taskTag = val
            this.getOriginData()
        },

        teskType(val) {
            this.taskType = val
            this.getOriginData()
        },

        ok () {
            this.$Message.info('Clicked ok');
        },

        cancel () {
            this.$Message.info('Clicked cancel');
        }
    },
    created() {
        EventBus.$on('cell-dragenter', this.cellDragenter)
        EventBus.$on('item-dragstart', this.itemDragstart)
        EventBus.$on('item-drop', this.itemDrop)
    }
}
</script>
<style lang="less">
@import './variables.less';
.schedule- {
    &calendar {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 90%;
        color: @sc-base-color;
        font-size: @sc-base-font-size;
        // box-shadow: @sc-box-shadow;

        *,
        *::before,
        *::after {
            box-sizing: border-box
        }

        button {
            border: 0;
            outline: none;
            cursor: pointer;
            background: transparent;
        }
    }
}
</style>
