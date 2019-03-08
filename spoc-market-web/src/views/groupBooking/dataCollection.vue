<style lang='less'>
    .dataCollection {
        border-top: 1px solid #e0e0e0; 
        .base {
            padding: 20px 0;
            .baseInfo {
                .baseTitle {
                    color: #ccc;
                    display: inline-block;
                    width: 130px;
                    text-align: right;
                    margin-right: 20px;
                    line-height: 33px;
                }
            }
        }
        .search {
            position: relative;
            .new-form {
                position: absolute;
                top: 0;
                right: 0;
            }
        }
        .cancleBorder {
           
        }
        .page {
            margin-top: 20px;
            margin-bottom: 140px;
            text-align: center;
        }
    }

</style>
<template>
    <div class="dataCollection">
        <div class="base">
            <p class="baseInfo"><span class="baseTitle">ID</span>{{base.id}}</p>
            <p class="baseInfo"><span class="baseTitle">拼团名称</span>{{base.name}}</p>
        </div>
        <btnlist
            title="订单列表"
            :btnList='btnList'
            >
        </btnlist>
        <div class="cancleBorder">
            <Table :columns="columns" :data="data.list" class="common-table" :loading="loading"></Table>
        </div>
        <div class="page">
            <Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange"  :current="data.pageNo" :total="data.count" @on-change="onPageChange" v-if="data.count>10"></Page>
        </div>
    </div>
</template>

<script>
import vSelect from '@public/modules/vSelect'
import btnlist from '@public/modules/btnlist'

export default {
    data() {
        return {
            base: {
                id: 'PT180302993',
                name: 'budas多看看祭敖包等级考试',
            },
            btnList: [
					{
						text: '导出到CRM',
						type: 'primary',
						event: this.exportCRM
					},
				],
            data: {
                count: 20,
                list: [
                    { objectValue: '你好', predictNum: '不要钱', },
                    { objectValue: '你好', predictNum: '不要钱', },
                    { objectValue: '你好', predictNum: '不要钱', },
                    { objectValue: '你好', predictNum: '不要钱', },
                    { objectValue: '你好', predictNum: '不要钱', },
                    { objectValue: '你好', predictNum: '不要钱', },
                    { objectValue: '你好', predictNum: '不要钱', },
                    { objectValue: '你好', predictNum: '不要钱', },
                    { objectValue: '你好', predictNum: '不要钱', },
                    { objectValue: '你好', predictNum: '不要钱', },
                    { objectValue: '你好', predictNum: '不要钱', },
                    { objectValue: '你好', predictNum: '不要钱', },
                    { objectValue: '你好', predictNum: '不要钱', },
                ]
            },
            columns: [
                {
                    title: "订单号",
                    key: "objectValue",
                    align: "center",
                },
                {
                    title: "提交时间",
                    key: "predictNum",
                    align: "center"
                },
                {
                    title: "姓名",
                    key: "predictNum",
                    align: "center"
                },
                {
                    title: "手机号",
                    key: "predictNum",
                    align: "center"
                },
                {
                    title: "选择校区",
                    key: "predictNum",
                    align: "center"
                },
            ]
        }
    },

    components: {
        vSelect,
        btnlist,
    },

    methods: {
        

        exportCRM() {

        },
        toggleSatus(val) {
            console.log(val)
        },
        onPageChange() {

        },

        onPageSizeChange() {

        },
    }
}
</script>