<template>
    <div class="schedule-calendar-detail-item"
         draggable
         @dragstart="onDrag">
        <!-- <Checkbox @on-change="finished(item)"></Checkbox> -->
        <span v-if="item.status=='finish'" style="color:gray" @click="goDetail('taskReview', item.id, item.groupId)" class="schedule-calendar-detail-text">{{item.text}}</span>
        <span v-else-if="item.status=='abort'" style="text-decoration:line-through; color:gray" @click="goDetail('taskReview', item.id, item.groupId)" class="schedule-calendar-detail-text">{{item.text}}</span>
        <span v-else  @click="goDetail('taskReview', item.id, item.groupId)"  style="color:#44bcbc" class="schedule-calendar-detail-text">{{item.text}}</span>
    </div>
</template>
<script>
export default {
    props: {
        item: Object,
        date: Date,
        type: String,
    },
    mounted() {
    },

    methods: {
        onDrag(e) {
            this.$emit('item-dragstart', e, this.item, this.date, this.type)
        },

        // finished(val) {
        //     console.log(val)
        // },

        goDetail(name, id, groupId) {
			let urlName = '';
                urlName = name;
			this.$router.push({
				name: 'plan.' + urlName,
				query: {
					parent: 'group',
					taskId: id
				},
				params: {
					gid: groupId
				}
			})
        }
    }
}
</script>
<style lang="less">
@import './variables.less';

.schedule-calendar-detail-item {
    padding: 0 5px;
    margin: 3px 6px 0;
    font-size: 12px;
    // color: #fff;
    line-height: 2em;
    border-radius: 2px;
    // background: @sc-primary-color;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    // transition: .2s ease-in-out;

    // &:hover {
    //     transform: translateY(-2px);
    //     box-shadow: 0 3px 8px rgba(0, 0, 0, .2), 0 -3px 8px rgba(0, 0, 0, .2)
    // }
}
</style>
