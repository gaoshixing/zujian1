<template>
    <div class="schedule-calendar-week">
        <span v-for="wk in weeks"
              class="schedule-calendar-week-item">{{wk}}</span>
    </div>
</template>
<script>
export default {
    props: {
        startWeek: Number
    },
    data() {
        return {
            cn: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        }
    },
    computed: {
        weeks() {
            return this.startWeek === 0 ? this.cn : this.cn.concat(this.cn.shift())
        }
    }
}
</script>
<style lang="less">
@import './variables.less';

.schedule-calendar- {
    &week {
        display: flex;
        height: @sc-week-height;
        line-height: @sc-week-height;
        background-color: #e7e7e7;
    }
    &week-item {
        flex: 1;
        text-align: center;
    }
}
</style>
