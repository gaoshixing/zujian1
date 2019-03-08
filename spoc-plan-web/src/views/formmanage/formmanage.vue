<style lang="less">
.formmanage{
    .page{
        text-align: center;
        margin-top: 20px;
    }
}
</style>
<template>
    <div class="formmanage">
        <btnlist title="表单数据-列表" :btn-list="btnList"></btnlist>
        <Table :columns="ListCol" :data="ListData.list" @on-selection-change="onTableItemSelect"></Table>
        <div class="page">
            <Page show-elevator show-total :current="ListData.pageNo" :total="ListData.count" :page-size="pageConfig.pageSize" @on-change="onPageChange" v-if="ListData.pageCount>1" ></Page>
        </div>
    </div>
</template>
<script>
import btnlist from '@public/modules/btnlist';

export default {
    data(){
        return {
            ListCol:[
                {
                    type: 'selection',
                    width: 52,
                    align: 'center'
                },
                {
                    title: "表单名称",
                    key: "name",
                    width:160
                },
                {
                    title: "创建人",
                    key: "levelName"
                }, {
                    title: "更新时间",
                    key: "loginName",
                    width:180
                }, {
                    title: "表单类型",
                    key: "mobile",
                    width:120
                }, {
                    title: "状态",
                    key: "email"
                }, {
                    title: "操作",
                }
            ],
            ListData:{
                list:[],
            },
            pageConfig:{
                pageSize:10,
            },
            search:{
                page:1,
            },
            selected:[],
            btnList:[
                {
                    text:'创建表单',
                    event:this.createForm
                }
            ]
        }
    },
    components:{
        btnlist
    },
    methods:{
        onTableItemSelect(v){
            this.selected = v;
        },
        onPageChange(page){
            this.search.page = page || 1;
            this.getListData();
        },
        getListData(){

        },
        createForm(){
            console.info(this);
        }
    }
}
</script>


