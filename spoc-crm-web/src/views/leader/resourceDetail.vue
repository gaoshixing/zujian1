<style lang='less'>
    .saleRankingGSX {
        border-top: 1px solid #e0e0e0;
        .timeFilter {
            line-height: 25px;
            height: 37px;
            span {
				// display: inline-block;
                padding: 5px 12px;
                // line-height: 1;
				cursor: pointer;
			}
			.active {
				background-color: #44bcb7;
				color: white;
			}
        }
        .allData {
            i {
                font-style: normal;
                font-size: 18px;
                color: #44bcb7;
            }
        }
        .page {
            text-align: center;
            margin-top: 20px;
        }
        .cancleBorder {
            .ivu-table-wrapper {
                border: none;
            }
            .ivu-table:after {
                content: '';
                width: 0px;
                
            }
            .ivu-table-column-center {
                background-color: #fff;
            }
        }

    }

</style>

<template>
    <div class="saleRankingGSX">
        <v-select 
            style="width: 396px;margin: 15px 0;"
            placeholder="输入顾问销售姓名"
            :datafunc="datafunc"
            icon="search" 
            v-model="compact"
            k='cnname'
            @on-enter="textChange" 
            @on-click="textChange" 
            @selected="textChange">
        </v-select>
        <p class="timeFilter">
			<case-bar-filter
                title="　　　　标签："
                colrT='#000'
                width=''
                mgt='0'
            >
			 </case-bar-filter>
		</p>
       
        <p class="timeFilter">
            <span style="padding:0">客户创建时间：</span>
			<span v-for="(item, index) in monthList" :key="index" :class="{active:index==num}" @click="addClass(index, item)" >{{item}}</span>
             <DatePicker v-model="startTimeV" @on-change="beforeChange" format="yyyy-MM" type="month" transfer :placeholder="placeholder" style="width: 130px"></DatePicker>
				——
		    <DatePicker v-model="endTimeV" @on-change="afterChange" format="yyyy-MM" type="month" transfer :placeholder="placeholder" style="width: 130px"></DatePicker>
		</p>
        <p class="timeFilter">
            <span style="padding:0">　待签约时间：</span>
			<span v-for="(item, index) in monthList" :key="index" :class="{active:index==num}" @click="addClass(index, item)" >{{item}}</span>
            <DatePicker v-model="startTimeV" @on-change="beforeChange" format="yyyy-MM" type="month" transfer :placeholder="placeholder" style="width: 130px"></DatePicker>
				——
		    <DatePicker v-model="endTimeV" @on-change="afterChange" format="yyyy-MM" type="month" transfer :placeholder="placeholder" style="width: 130px"></DatePicker>
		</p>
        <p class="allData">为您找打 <i>{{data.count}}</i> 条数据</p>
        <btnlist
            title="统计列表">
        </btnlist>
        <div class="cancleBorder">
            <Table :columns="columns" :data="data.list" @on-filter-change="sortChange"  @on-sort-change="onSortChange"></Table>
        </div>
        <div class="page">
            <Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange"  :current="data.pageNo" :total="data.count" @on-change="onPageChange" v-if="data.count>10"></Page>
        </div>
    </div>
</template>

<script>
    import vSelect from '@public/modules/vSelect'
    import btnlist from '@public/modules/btnlist'
    import caseBarFilter from '@public/modules/caseBarFilter'

    export default {
        data() {
            return {
                compact: '',
                startTimeV: '',
                endTimeV: '',
                placeholder: '请输入时间',
                monthList: [
                    "不限",
                    "当前月",
                    "最近3个月",
                    "最近6个月",
                    "今年"
                ],
                num: 0,
                data: {
                    list: [],
                    count: 0,
                },
                columns: [
                    {
                        title: "销售顾问",
                        key: "name",
                        align: "center",
                        render: (h, params) => {
                            return h('a',{
                                on: {
                                    click: () => {
                                       this.getTableForm(params.row.id)
                                    }
                                }
                            },
                            params.row.name)
                        }
                    },
                    {
                        title: "分公司",
                        key: "name",
                        align: "center",
                        filters: [
                            {name: '12',
                            value: '456'}
                        ],
                        filterMultiple: false,
                        filterRemote :() => {
                        }

                    },
                    {
                        title: "掉落率",
                        key: "createDate",
                        align: "left",
                        sortable: "custom",
                    },
                    {
                        title: "掉落数量",
                        key: "times",
                        sortable: "custom",                        
                        align: "center",
                    },
                    {
                        title: "掉落分值",
                        key: "totalNum",
                        sortable: "custom",
                        align: "center",
                    },
                    {
                        title: "抢单数量",
                        key: "effectiveRatio",
                        sortable: "custom",
                        align: "center",
                    },
                    {
                        title: "抢单分值",
                        key: "effectiveRatio",
                        sortable: "custom",
                        align: "center",
                    }
                ]
            }
        },
        
        components: {
            vSelect,
            btnlist,
            caseBarFilter
        },

        methods: {
            addClass(index, item) {
                this.num = index

            },

            beforeChange() {

            },

            afterChange() {

            },

            sortChange() {

                

            },
            
            onSortChange(val) {

            },
            
            onPageSizeChange(val) {
                this.pageSize = val
                this.getTreeList()
            },

            onPageChange(val) {
                this.pageNo = val
                this.getTreeList()
            },
            
            textChange() {

            },

            datafunc() {
                return new Promise((resole, reject) => {

                })
            }
        }
    }
</script>

