<style lang='less'>
    .over-view-gsx {
    }
</style>
<template>
    <div class="over-view-gsx">
        <over-view-gsx
            :viewList="viewList"
            :data='data'
            ></over-view-gsx>
    </div>
</template>

<script>
import overViewGsx from '../modules/overViewGsx'
import valid, {
    errors,
    common,
    sys,
    overView
} from "../libs/request";
export default {
    components: {
        overViewGsx,
    },

    data() {
        return {
            viewList: [
                {name: '今日新增商品', key: 'todayGoodsNum'},
                {name: '带审核商品', key: 'unAuditGoodsNum'},
                {name: '今日新增拼团售卖', key: 'todayPackNum'},
                {name: '待审核拼团', key: 'unAuditPackNum'},
            ],
            data: {
            },
        }
    },

    mounted() {
        this.getData()
    },

    methods: {
        getData() {
            let obj = {
                // codeOrName: this.compact,
            }
            overView.getDate(obj).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.data = res.data.data
                }
            }).catch(errors.call(this));
        }
    }

}
</script>
