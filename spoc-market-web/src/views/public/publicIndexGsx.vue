<style lang='less'>
    .publice-index-gsx {
        .go-back {
            float: right;
            font-size: 14px;
        }
    }
</style>
<template>
    <div class="publice-index-gsx">
        <over-view-gsx
            :viewList='viewList'
            overTitle="推广员数据"
            ></over-view-gsx>
        <over-view-gsx
            overTitle="公众号数据"
            :viewList='viewList1'
            ></over-view-gsx>
    </div>
</template>

<script>
import overViewGsx from '../../modules/overViewGsx'
import valid,{errors, sys, publicNumM} from '../../libs/request';

export default {
    components: {
        overViewGsx,
    },

    data() {
        return {
            viewList: [
                {name: '今日报名推广员数', key: 'num1'},
                {name: '今日推广签单数', key: 'num2'},
                {name: '推广员总数', key: 'num3'},
                {name: '推广签单总数', key: 'num4'},
            ],
            viewList1: [
                {name: '今日新增用户', key: 'num1'},
                {name: '今日流失用户', key: 'num2'},
                {name: '今日图文消息阅读次数', key: 'num3'},
                {name: '今日图文消息阅读人数', key: 'num4'},
            ],
            data: {
                num1: 1,
                num2: 4,
                num3: 3,
                num4: 2,
            },
        }
    },

    mounted() {
        this.getDetail()
    },

    methods: {
        getDetail() {
            let obj = {
               id: JSON.parse(sessionStorage.getItem('publicInfo')).id
            }
            publicNumM.getDetail(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    // console.log(res.data.data)
                }
            }).catch(errors.call(this));
        },
    }

}
</script>
