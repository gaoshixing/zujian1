<style lang = 'less'> 
.connectListGsx {
    li{
        list-style: none;
    }
    /* border-top: 1px solid #e0e0e0; */
    padding-bottom: 80px;
    .connect{
        .more {
            overflow:hidden; 
            text-overflow:ellipsis;
            /* display:-webkit-box; 
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2; */
            cursor: pointer; 
            height: 26px;
            text-align: left;
        }
        .hideDiv {
            width: 100%;
            position:absolute;
            left: 0;
            top: 0;
            padding: 12px 0;
            box-sizing: border-box;
            visibility: hidden;
        }
        .centerContent {
            .ivu-tooltip-inner {
                white-space: normal;
            } 
        }
        .statusZhangBox{
            width: 14%;position: relative;
            .textZhang {
                font-size: 10px;
                display: inline-block;
                width: 45px;
                text-align: center;
                position: absolute;
                left: 50%;
                top: 50%;
                color: #fff;
                transform: translate(-50%, -50%) rotate(-21deg);
                &.saveZhang{
                    color: #000;transform: translate(-50%, -50%) rotate(0);
                }
            }
            .icon-zhang {
                font-size: 45px;position: absolute;left: 50%;top: 50%;
                transform: translate(-50%,-50%);
            }
            .agree {
                color: #a1dddb;
            }
            .reject {
                color: #eaacb7;
            }
            .waiting {
                color: #fbe8b5;
            }
        }
    }
    .connect,.connectTitle {
        display: flex;
        width: 100%;
        justify-content: space-between;
        border-bottom: 1px solid #e5e5e5;
        .left,.center,.right,.statusZhangBox {
            float: left;
            min-height: 60px;
        }
        .left {
            width: 13%;
            padding: 0 20px 6px;
            position: relative; 
            a{
                padding-top: 21px;display: inline-block;padding-bottom: 3px;line-height: 18px;
            }
            .stType {
                display: inline-block;margin-bottom: 3px;
                padding: 1px 16px;
                color: #fff;
                background-color: #d0d0d0;
                margin-right: 10px;
                border-radius: 3px;
            }
        }
        .center {
            width: 15%;
            padding: 21px 0;
            position: relative;text-align: center;word-wrap: break-word;word-break: normal;
            p {
                line-height: 1.1em;
            }
        }
        .right {
            width: 16%;
            text-align: center;
            line-height: 60px;
        }
    }
    .connectTitle{
        overflow: hidden;
        @h: 37px;
        li{
            float: left;min-height: auto !important;
            padding: 0;height: @h;line-height: @h;min-height: @h;
            font-size: 12px;color: #323232;text-align: center;width: 14%;font-weight: bold;
            &:nth-child(1){
                width: 13%;padding-left: 21px;text-align: left;
            }
        }
        padding-top: 9px;
        ul{
            width: 100%;
        }
        .center{
            padding: 0;
        }
        .right {
            line-height: @h;
        }
    }
    .connect-type{
        width: 14%;padding: 21px 20px;text-align: center;line-height: 18px;
    }
    .page-box{
        padding-top: 20px;padding: 18px;text-align: center;
    }
    .btn-lists-div{
        @h:40px;
        @radius: 1px;
        position: relative;
        height: @h;line-height: @h;padding-left: 21px;margin-top: 22px;
        border: 1px solid #e0e0e0;border-radius: @radius;
        font-size: 14px;color: #666;
        background: #fafafa;
        &:before{
            @border-width: -1px;
            content: "";
            position: absolute;left: @border-width;top: @border-width;bottom: @border-width;
            width: 5px;
            border-top-left-radius: @radius;
            border-bottom-left-radius: @radius;
            background: #44bcb7;
        }
    }
    .ivu-table-tip{
        border-bottom: 1px solid #e5e5e5;
    }
    .count{
        position: relative;top: 10px;
        i{
            font-style: inherit;font-size: 18px;color: red;
        }
    }
}
</style>
<template>

<div class="connectListGsx">
    <Tabs @on-click="addActive" v-model="tabValue">
        <TabPane :label="$t('RecentUpdates')" name="0"></TabPane>
        <TabPane :label="$t('portal.tbd')" name="1"></TabPane>
        <TabPane :label="$t('Completed')" name="2"></TabPane>
    </Tabs>

    <v-select 
        style="width: 396px;margin: 15px 0;"
        :placeholder="$t('portal.studentName')"
        :datafunc="datafunc"
        icon="search" 
        v-model="compact"
        k='cnname'
        @on-enter="textChange" 
        @on-click="textChange" 
        @selected="textChange">
    </v-select>
    <case-bar-filter @tagListChange="tagListChange" :title="$t('portal.caseBar')" :from="2"></case-bar-filter>
    <p class="count">{{planType}} <i>{{planNum}}</i></p>
    <div class="btn-lists-div">{{ $t("portal.connectList") }}
        <Button style=" margin: 3px;float:right" type="primary" class="bt2" @click="exportData" v-if="isExport">
            导出前后期交接情况
        </Button>
    </div>
    <div class="connectTitle">
        <ul>
            <li>{{ $t("Student") }}</li>
            <li>{{ $t("portal.connectType") }}</li>
            <li>{{ $t("portal.connectObj") }}</li>
            <li>{{ $t("Commen.state") }}</li>
            <li>{{ $t("portal.connectApprover") }}</li>
            <li class="center">{{ $t("portal.connectReason") }}</li>
            <li class="right">{{ $t("XxChoiceLog.type") }}</li>
        </ul>
        <form class="formexport" :action="exportUrl" method="post" target="_blank">
			<!-- <input type="hidden" name="startTime" v-model="startTime" />
			<input type="hidden" name="endTime" v-model="endTime" />
			<input type="hidden" name="companyIds" v-model="companyIds" />
			<input type="hidden" name="tags" v-model="tags" />
			<input type="hidden" name="ids" v-model="signId" />
			<input type="hidden" name="timePrecision" value="month" /> -->
		</form>
    </div>

    <template v-if="studentList.length > 0">
        <div class="connect" v-for="item in studentList" :key="item.handOverId">
            <div class="left">
                <a @click="RouterGoChild(item.stuId)">{{item.stuName}}</a><br/>
                <template v-if="item.tags">
                    <span class="stType"
                        v-for="(tag, index) in item.tags"
                        :key="index"
                        v-html="tag">
                    </span>
                </template>
            </div>
            <div class="connect-type">{{ item.type }}</div>
            <div class="connect-type">{{ item.handOverName }}</div>
            <div class="statusZhangBox">
                <div>
                    <i :class="{'iconfont':true,
                        'icon-zhang':true,
                        'agree': item.auditStatus == 'pass',
                        'reject':item.auditStatus == 'reject',
                        'waiting':item.auditStatus == 'commit'}"  v-if="item.auditStatus != 'save'">
                    </i>
                    <span class="textZhang" :class="[item.auditStatus == 'save' ? 'saveZhang' : '']">
                        {{item.auditStatus | auditStatus}}
                    </span>
                </div>
            </div>
            <div class="connect-type">{{ item.auditor }}</div>
            <div class="center">
                <div class="aro" v-if='item.reason && item.reason.length'>
                    <div class="hideDiv" >
                        <p >{{item.reason}}</p>
                    </div>
                    <div>
                        <p class="centerContent" v-if="item.reason.length > 26">
                            <Tooltip placement="top">
                                <p class="more">{{item.reason.substring(0,22)}}...</p >
                                <div slot="content">
                                    <p>{{item.reason}}</p>
                                </div>
                            </Tooltip>
                        </p>
                        <p v-else class="centerContent">{{item.reason}}</p>
                    </div>
                </div>
            </div>
            <div class="right">
                <a @click="RouterGo(item.handOverId)">{{ $t("portal.showHandOver") }}</a>
                <a @click="showLog(item.groupId)" style="margin-left:8px;">{{ $t("portal.handOverLog") }}</a>
            </div>
        </div>
    </template>

    <template v-else>
        <div class="ivu-table-tip">
            <table cellspacing="0" cellpadding="0" border="0">
                <tbody>
                    <tr><td><span>{{ $t("portal.noData") }}</span></td></tr>
                </tbody>
            </table>
        </div>
    </template>
    <div class="page-box" v-show="pageCount > 1">
        <div style="margin: auto;display: inline-block;">
            <Page :current="pageNo"
                :total="planNum"
                show-elevator show-total show-sizer
                :page-size="pageSize"
                @on-change="pageChange"
                @on-page-size-change="sizeChange">
            </Page>
        </div>
    </div>
    <Modal
        v-model="logModal" width='750'
        :title="$t('portal.showHandOverLog')">
        <Table :columns="logColumns" :data="logLists"></Table>
    </Modal>
</div>

</template>

<script>
//import caseBar from '../../modules/caseBar'
import vSelect from '@public/modules/vSelect'
import CaseBarFilter from '@public/modules/caseBarFilter';
import valid, { errors, common, sys } from "../libs/request";

export default {
	props:{
		mod:{
			type:String,
			required:true
		},
		menuId:{
			type:String,
			required:true
        },
        isExport: {
            type: Boolean,
            default: false,
        }
	},
    data() {
        return {
            exportUrl: '',
            tabValue: 0,
            tagList: [],
            compact: '',
            planType: this.$t('RecentUpdates'), //'最近更新',
            planNum: 0,
            pageNo: 1,
            pageCount: 0,
            pageSize: 10,
            studentList: [],
            logModal: false,
            logColumns: [
                {
                    title: this.$t('XxChoiceLog.id'),//'序号',
                    key: 'name',
                    width: 60,
                    align: 'center',
                    render: (h, params) => {
                        return h('span', params.row._index + 1)
                    }
                },
                {
                    title: this.$t('portal.connectCreateBy'),//'交接人',
                    key: 'createBy',
                    align: 'center',
                },
                {
                    title: this.$t('portal.connectType'),//'交接类型',
                    key: 'handOverType',
                    align: 'center',
                },
                {
                    title: this.$t('portal.connectObj'),//'交接对象',
                    key: 'handOverName',
                    align: 'center',
                },
                {
                    title: this.$t('portal.connectTime'),//'交接时间',
                    key: 'crtTime',
                    width: 160,
                    align: 'center',
                },
            ],
            logLists: []
        }
    },
    components: {
//      caseBar,
        vSelect,
        CaseBarFilter,
    },
    mounted() {
        this.addActive()
    },

    methods: {
        windowOpen(obj) {
            // 新窗口打开
            const {href} = this.$router.resolve(obj);
            window.open(href, '_blank');
        },
        addActive() {
            if(this.tabValue == 0) {
                this.planType = this.$t('RecentUpdates')//'最近更新'
            }else if(this.tabValue == 1) {
                this.planType = this.$t('portal.tbd')//'待完成'
            }else if(this.tabValue == 2) {
                this.planType = this.$t('Completed')//'已完成'
            }
            this.getLists();
        },

        exportData() {
            let form = this.$el.querySelector('.formexport');
            this.exportUrl = '/spoc-contract/a/ws/contract/htContract/expectHandoverOutcome'
            this.$nextTick(()=>{
                form.submit();
            });
        },

        textChange() {
            this.getLists();
        },

        pageChange(page) {
            this.pageNo = page;
            this.getLists();
        },

        sizeChange(size) {
            this.pageSize = size;
            this.getLists();
        },

        RouterGo(id) {
            // handOverId
            let obj = {
                name: this.mod+'.connectPreview',
                query: {
                    id: id,
                    phase:this.mod,
                    menuId:this.menuId
                }
            }
            this.windowOpen(obj)
        },

        datafunc() {
            return (resole, reject) => {

            }
        },

        tagListChange(ids) {
            // 选择标签集
            let arr = [];
            ids.forEach((item, index) => {
                let cump = [];
                item.childTags.forEach((child, index) => {
                    cump.push(child.id);
                });
                arr.push(cump);
            });
            this.tagList = arr;
            this.getLists();
        },
        
        getLists() {
            // 获取数据
            let params = {
                status: this.tabValue,
                pageSize: this.pageSize,
                pageNo: this.pageNo,
                tags: this.tagList,
                menuId: this.menuId
            }
            if(this.compact) {
                params.name = this.compact;
            }
            common.handoverList(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let listData = res.data.data;
                    this.studentList = listData.list;
                    this.pageCount = listData.pageCount;
                    this.planNum = listData.count;
                }
            }).catch(errors.call(this));
        },
        RouterGoChild(id) {
            let obj = {
                name: this.mod+'.addStudent',
                query: {
                    studentId: id,
                    menuId:this.menuId
                }
            }
            this.windowOpen(obj)
        },
        showLog(id) {
            // 打开查看日志弹窗
            let data = {
                groupId: id
            }
            common.findAuditLog(data).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.logLists = res.data.data;
                    this.logModal = true;
                }
            }).catch(errors.call(this));
        },
    },

    filters: {
        auditStatus(value) {
            if(value == 'commit') return window.WebSiteApp.$t('portal.toBeAudited');//'待审核'
            else if(value == 'pass') return window.WebSiteApp.$t('Pass');//'通过'
            else if(value == 'reject') return window.WebSiteApp.$t('portal.NotPass');//'驳回'
            else if(value == 'save') return window.WebSiteApp.$t('portal.save');//'已保存'
        }
    }
}
</script>


