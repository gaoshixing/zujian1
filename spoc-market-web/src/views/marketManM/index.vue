<style lang='less'>
    .market-man-index-gsx {
        .cancleBorder {
        }
        .page {
            margin-top: 20px;
            margin-bottom: 140px;
            text-align: center;
        }
    }
    .market-man-use-m {
        .am-aro {
            padding-left: 140px;
            line-height: 33px;
            height: 33px;
            position: relative;
            .title {
                position: absolute;
                left: 0;
                top: 0;
                text-align: right;
                display: inline-block;
                width: 130px;
            }
            .openidSel{
            	width:178px;
            	.ivu-select-item{
            		display: flex;
            		justify-content: flex-start;
            		align-items: center;
            		img{
						display: inline-block;
						width: 30px;
						height: 30px;
            		}
					span {
						padding-left: 10px;
						font-size: 14px;
						color: rgb(38, 38, 38);
					}
            	}
            }
        }
    }
</style>
<template>
    <div class="market-man-index-gsx">
        <Tabs @on-click="toggleSatus" v-model="tabValue">
            <TabPane label='启用中' name="name1"></TabPane>
            <TabPane label='已停用' name="name2"></TabPane>
        </Tabs>
        <v-select 
            style="width: 294px;margin: 15px 0"
            placeholder="搜索姓名/手机号"
            :datafunc="datafunc"
            icon="search" 
            v-model.trim="compact"
            k='cnname'
            @on-enter="textChange" 
            @on-click="textChange" 
            @selected="textChange">
        </v-select>
        <btnlist
            title="用户列表"
            :btnList='btnList'
            >
        </btnlist>
        <div class="cancleBorder">
            <Table :columns="columns" :data="data.list" class="common-table" :loading="loading"></Table>
        </div>
        <div class="page">
            <Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange"  :current="data.pageNo" :total="data.count" @on-change="onPageChange" v-if="data.count>10"></Page>
        </div>
         <!-- 对话框 -->
        <Modal
            v-model="modal1"
            title="启用人员"
            width=728
            ok-text="确认启用"
            ref="preview"
            @on-ok="ok"
            @on-cancel="cancel">
            <div class="market-man-use-m">
                <p class="am-aro"><span class="title">姓名：</span>{{userInfoObj.name}}</p>
                <p class="am-aro"><span class="title">手机号：</span>{{userInfoObj.tel}}</p>
                <p class="am-aro"><span class="title">所属组织架构：</span>{{userInfoObj.org}}</p>
                <p class="am-aro">
                    <span class="title">微信openId及昵称：</span> 
                    <Select
                    	class="openidSel"
                        filterable
                        remote
                        v-model='selectV'
                        label-in-value
                        @on-change='selectChangePreview'
                        :remote-method="getMassTypeListOpenId"
                        :loading="loading1">
                        <Option v-for="(option, index) in options1" :value="option.openId" :label="option.name" :key="index" ><img :src="option.avatarUrl"/><span>{{option.name}}</span></Option>
                    </Select>
                </p>
            </div>
        </Modal>
    </div>
</template>

<script>
import vSelect from '@public/modules/vSelect'
import btnlist from '@public/modules/btnlist'
import valid,{errors, sys, marketManM,useM} from '../../libs/request';
import {mapGetters, mapState} from 'vuex'
import { waitUntil } from '../../libs/util.js';

export default {
    data() {
        return {
            selectV: '',
            loading: false,
            options1: [],
            userInfoObj: {},
            loading1: true,
            publicInfo: '',
            openId: '',
            marketLeader: '',
            compact: '',
            tabValue: 'name1',
            pageSize: 10,
            modal1: false,
            pageNo: 1,
            btnList: [
                {
                    text: '导出',
                    type: 'primary',
                    event: this.export
                },
            ],
            data: {
                count: 0,
                list: [
                ]
            },
            columns: [
                {
                    title: "姓名",
                    key: "name",
                    align: "center"
                },
                {
                    title: "手机号",
                    key: "tel",
                    align: "center"
                },
                {
                    title: "所属机构",
                    key: "org",
                    align: "center"
                },
                {
                    title: "微信号openid",
                    key: "openId",
                    align: "center"
                },
                {
                    title: "最近登录时间",
                    key: "loginTime",
                    align: "center"
                },
                {
                    title: "操作",
                    align: "left",
                    render: (h, params) => {
                        if (this.tabValue === 'name1') {
                            return h("div", {
                                style: {
                                    textAlign: 'left'
                                }
                            }, [
                                h(
                                    "a",
                                    {
                                        style: {
                                            marginRight: "10px",

                                        // display: params.row.status != 'finished' ? 'inline-block': 'none',
                                    },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    name: 'marketManM.marketDetail',
                                                    query: {
                                                        manId: params.row.openId,
                                                        userId: params.row.userId,
                                                    }
                                                })
                                            }
                                        }
                                    },
                                    "详细信息"
                                ),
                                h(
                                    "span",
                                    {
                                    style: {
                                            color: 'red',
                                            cursor: 'pointer',
                                            display: !this.marketLeader||params.row.forbidden?'none':'inline-block'
                                        },
                                        on: {
                                            click: () => {
                                                this.changeStatusStop(params.row)
                                            }
                                        }
                                    },
                                    '停用'
                                ),
                                
                            ])
                        } else if (this.tabValue === 'name2') {
                             return h("div", [
                                h(
                                    "a",
                                    {
                                        style: {
                                             marginRight: "10px",
                                        // display: params.row.status != 'finished' ? 'inline-block': 'none',
                                    },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    name: 'marketManM.marketDetail',
                                                    query: {
                                                        manId: params.row.openId,
                                                        userId: params.row.userId,
                                                    }
                                                })
                                            }
                                        }
                                    },
                                    "详细信息"
                                ),
                                h(
                                    "a",
                                    {
                                        style: {
                                            display: !this.marketLeader?'none':'inline-block',
                                           

                                        },
                                   
                                        on: {
                                            click: () => {
                                                this.changeStatus(params.row)
                                            }
                                        }
                                    },
                                    "启用"
                                ),
                               
                            ])
                        }
                    }
                },
            ]
        }
    },
    
    computed: {
		...mapState(['userInfo']),
    },

    components: {
        vSelect,
        btnlist
    },


    created() {
        this.publicInfo = JSON.parse(sessionStorage.getItem('publicInfo'))
        waitUntil(()=>{
            return  this.userInfo.id;
        }, (time) => {
            this.getInfor()
        }, (time) => {
				console.error(time, 88)
        	},);
    },

    methods: {
        getInfor() {
            if ((this.userInfo.roleMap[1001]+'').indexOf(',')!=-1) {
                let arr = this.userInfo.roleMap[1001].split(',')
                console.log(arr)
                if (arr.includes('1102')||arr.includes('1104')) this.marketLeader = true
                this.marketLeader = false
            } else {
                this.marketLeader = this.userInfo.roleMap[1001]==1102?true:this.userInfo.roleMap[1001]==1104?true:false;
            }
            this.getDataList()
        },

        getDataList(type) {
            console.log(this.marketLeader, 889)
            let obj = {
                type: type,
                appId: this.publicInfo.id,
                pageSize: this.pageSize,
                pageNo: this.pageNo,
                name: this.compact,
                status: this.tabValue == 'name1' ? 1 : 0
            }
            this.loading = true
            marketManM.getDataList(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.data = res.data.data
                }
            }).catch(errors.call(this)).finally( () => {
                this.loading = false
            });
        },

        selectChangePreview(val) {
            this.openId = val.value
        },

        changeStatus(item) {
            this.userInfoObj = item
            this.modal1=true
        },

        changeStatusStop(item) {
           let obj = {
               id: item.id,
               status: 0,
            }
            marketManM.changeStatus(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.$Message.info(res.data.message)
                    this.getDataList()
                }
            }).catch(errors.call(this));
        },

        getMassTypeListOpenId(val) {
           let obj = {
                appId: this.publicInfo.id,
                name: val,
				pageNo: -1,
            }
            useM.getDataList(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.options1 = res.data.data.list;
                }else{
                    this.options1 = []
                }
            }).catch(errors.call(this)).finally(() => {
				this.loading1 = false;
			});
        },

        ok() {
            if (!this.openId) {
                this.$refs.preview.visible = true
                this.modal1 = true
                this.$Message.info('微信openId及昵称')
                return
            }

            let obj = {
                appId: this.publicInfo.id,
                userId: this.userInfoObj.userId,
                status: 1,
                openId: this.openId,
                "isCreator":"1"
            }
            marketManM.updateStatus(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.$Message.info(res.data.message)
                    this.getDataList()
                }
            }).catch(errors.call(this));
        },

        cancel() {},

        toggleSatus(val) {
           this.getDataList()
        },
        textChange() {
            this.getDataList()
        },
        
        export() {
            let obj = {
                status: this.tabValue === 'name1' ? 1 : 0,
                appId: this.publicInfo.id,
                name: this.compact,
            }
            window.open(marketManM.exportData(obj))
        },
        
        onPageSizeChange(val) {
            this.pageSize = val
            this.getDataList()
        },

        onPageChange(val) {
            this.pageNo = val
            this.getDataList()
        },
        // cancel() {

        // },

        // ok() {

        // },
        datafunc() {
            return new Promise((resole, reject) => {})
        }
    }
}
</script>

