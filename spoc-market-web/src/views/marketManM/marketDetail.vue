<style lang='less'>
    .marketMan-detail-gsx {
        .detail-base {
            overflow: hidden;
            margin-bottom: 20px;
            .base-left {
                width: 100%;
                float: left;
                border: 1px solid #f0f2fa;
                border-radius: 5px;
            }
            .base-left {
                padding: 15px 0;
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
    <div class="marketMan-detail-gsx">
        <div class="detail-base">
            <div class="base-left">
                <base-infor
                    :baseList='baseList'
                    :baseInfor='baseInfor'
                ></base-infor>
            </div>
        </div>
        <btnlist
            title="推广情况"
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
import btnlist from '@public/modules/btnlist'
import baseInfor from '../../modules/baseInfor'
import valid, {
    errors,
    common,
    sys,
    expandMan
} from "../../libs/request";
export default {
    data() {
        return {
            loading: false,
            baseInfor: {
            },
            id: this.$route.query.manId,
            userId: this.$route.query.userId,
            pageSize: 10,
            pageNo: 1,
            baseList: [
                {name: '姓名', value: 'name'},
                {name: '所属机构', value: 'org'},
                {name: "手机号", value: 'tel'},
                {name: "邮箱", value: 'email'},
                {name: "最近登录时间", value: 'loginDate'},
            ],
            data: {
                count: '',
                list: [
                ]
            },
            columns: [
                {
                    title: "推广任务时间",
                    key: "createDate",
                    align: "center",
                },
                {
                    title: "编号",
                    key: "taskCode",
                    align: "center"
                },
                {
                    title: "任务名称",
                    key: "taskName",
                    align: "center"
                },
                {
                    title: "推广点击量",
                    key: "clickNum",
                    align: "center"
                },
                {
                    title: "成功推广数",
                    key: "successNum",
                    align: "center"
                },
            ],
        }
    },

    components: {
        btnlist,
        baseInfor,
    },

    mounted() {
        this.expandCaseList()
        this.form()
    },

    methods: {
        form() {
           let obj = {
               userId: this.userId,
            }
            expandMan.marketMform(obj).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.baseInfor = res.data.data
                }
            }).catch(errors.call(this));
        },

        expandCaseList() {
            let obj = {
               openId: this.id,
               pageSize: this.pageSize,
               pageNo: this.pageNo,
            }
            this.loading = true
            expandMan.expandCaseList(obj).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.data = res.data.data
                }
            }).catch(errors.call(this)).finally(() =>{
                this.loading = false
            });;
        },

        onPageSizeChange(val) {
            this.pageSize = val
            this.expandCaseList()
        },

        onPageChange(val) {
            this.pageNo = val
            this.expandCaseList()
        },
    }
}
</script>