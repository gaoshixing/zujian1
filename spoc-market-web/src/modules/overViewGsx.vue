<style lang='less'>
    .over-view-c-gsx {
        margin-bottom: 60px;
        font-size: 16px;
        .view-aro {
            display: flex;
            margin-top: 20px;
            justify-content: space-between;
            flex-wrap: nowrap;
            padding: 20px 0;
            background-color: #f2f6fa;
            .view-item {
                width: 25%;
                list-style: none;
                text-align: center;
                color: #000;
                font-size: 20px;
                border-right: 1px solid #b8b8b8;
                .item-title {
                    font-size: 16px;
                    color: #b8b8b8;
                }
            }
            .view-item:last-of-type {
                border: none;
            }
        }
    }
</style>
<template>
    <div class="over-view-c-gsx">
        {{overTitle}}
        <ul class="view-aro">
            <li class="view-item" v-for="item in viewList"><p class="item-title">{{item.name}}</p>{{data[item.key]}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        overTitle: {
            type: String,
            default: '商品情况'
        },

        viewList: {
            type: Array,
            default: () => {
                return [
                    {name: '今日新增商品', key: 'num1'},
                    {name: '带审核商品', key: 'num2'},
                    {name: '今日新增拼团售卖', key: 'num3'},
                    {name: '待审核拼团', key: 'num4'},
                ]
            }
        },

        data: {
            type: Object,
            default: () => {
                return {
                    num1: 1,
                    num2: 4,
                    num3: 3,
                    num4: 2,
                }
            }
        }
    },

    data() {
        return {
            
        }
    }

}
</script>
