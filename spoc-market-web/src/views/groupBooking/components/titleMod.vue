<style lang='less'>
    .news_infor_Gsx {
        margin-bottom: 35px;
        .news_title {
            margin-bottom: 20px;
            font-size: 18px; 
        }
        .infor_aro_new {
            .infor_title {
                line-height: 30px;
                color: #ccc;
                display: inline-block;
                width: 100px;
                text-align: right;
                left: 0;
                top: 0;
                position: absolute;
            }
            .ml {
                margin-left: 25px;
            }
            li {
                line-height: 30px;
                position: relative;
                height: 30px;
                padding-left: 120px;
                list-style: none;
                overflow: hidden;
            }
        }
    }
</style>
<template>
    <div>
        <div class="news_infor_Gsx" v-for="item in dataList">
            <p class="news_title">{{item.title}}</p>
            <ul class="infor_aro_new">
                <li v-for="(item1, index) in item.list" :key="index"><span class="infor_title">{{item1.name}}</span><p style="line-height:20px;margin-top:5px">{{data[item1.key]}}</p></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        dataList: {
            type: Array,
            default: () => {
                return [{
                    title: '驳回信息',
                    list: [
                        { name: '审核驳回时间', key: 'rejectDate'},
                        { name: '驳回理由', key: 'rejectReasons'},
                    ]
                }]
            }
        },

        data: {
            type: Object,
            default: () => {
                return {
                }
            }
        }
    }
}
</script>

