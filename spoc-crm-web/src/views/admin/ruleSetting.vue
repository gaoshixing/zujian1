<style lang='less'>
    .ruleSettingGSX {
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
    .CRMRULESGSX {
        .checkBox {
            margin-left: 30px;
        }
        .rule {
            color: #999999;
        }
        p {
            line-height: 40px;
        }
        p >span:first-child {
            color: #b8b8b8;
            display: inline-block;
            text-align: right;
            width: 130px;
        }
        .ruleTime {
            display: inline-block;
            min-width: 500px;
            line-height: 40px;
        }
    }
    .dealFallModel{
    	.ivu-modal-header,.ivu-modal-footer{
    		display: none;
    	}
    	.dealFall_col{
    		display: flex;
    		flex-direction: column;
    		justify-content: center;
    		align-items: center;
	    	.dealFall_cont{
	    		text-align: right;
	    		padding-top: 14px;
	    	}
	    	.dealFall_warn{
	    		font-size: 16px;
	    		text-align: center;
	    		padding-top: 14px;
	    	}
    	}
    	.btnList{
    		padding: 30px 0 14px;
    		display: flex;
    		justify-content:center;
    		align-items: flex-start;
    	}
    }

</style>
<template>
    <div class="ruleSettingGSX">
        
        <btnlist
            title="销售资源掉落规则设置"
            :btnList="btninfo"
            >
        </btnlist>
        <div class="cancleBorder">
            <!-- @on-filter-change="sortChange" -->
            <Table :columns="columns" :data="data.list"  ></Table>
        </div>
        <!-- <div class="page">
            <Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange"  :current="data.pageNo" :total="data.list.length" @on-change="onPageChange" v-if="data.list.length>10"></Page>
        </div> -->
        <!-- 弹出窗 -->
        <Modal
            v-model="modal1"
            width=728
            ref="duration"
            title="修改掉落规则"
            @on-ok="ok1"
            @on-cancel="cancel1">
            <div class="CRMRULESGSX">
                <p><span>职责：</span>{{singleRule.id}}</p>
                <p><span>最晚分单掉落时长：</span><InputNumber :max="99999" :min="1" v-model="singleRule.fdDuration" :precision='0' style="width:150px"></InputNumber>分钟</p>
                <p><span>最晚抢单掉落时长：</span><InputNumber :max="99999" :min="1" v-model="singleRule.qdDuration" :precision='0' style="width:150px"></InputNumber>分钟</p>
                <!-- <p><span>最晚接单时长：</span><Input v-model="singleRule.duration" style="width:150px"></Input>分钟</p> -->
                <p><span>状态：</span> 
                    <i-switch v-model="singleRule.status" style="margin-right:20px" @on-change="stateChange"></i-switch>{{switchText}}
                </p>
            </div>
        </Modal>
        <Modal
            v-model="modal2"
            ref="modalSet"
            width=728
            title="设置资源回收/失效规则"
            >
            <div class="CRMRULESGSX">
                <p class="rule">
                    当客户资源满足下述任意条件时,系统将强制回收客户资源销售公共库/TMK公共库：
                </p>
                    <div class="checkBox">   
                        <Checkbox v-model="ruleSetting[0].status">
                            <span class="ruleTime">当客户入库后，距离上次更新动态后，达到 <Input  v-model="ruleSetting[0].duration" style="width: 45px"></Input>天，从未发生更新动态时。</span>
                        </Checkbox>
                    </div>
                <p class="rule">
                    当客户资源满足下述任意条件时,将被判定为失效资源：
                </p>
                <div class="checkBox">
                    <Checkbox v-model="ruleSetting[1].status">
                        <span class="ruleTime">当客户入库后，距上次更新动态后，达到 <Input v-model="ruleSetting[1].duration" style="width: 45px"></Input>天，从未发生更新动态。</span>
                    </Checkbox>
                </div>
            </div>
	        <div slot="footer">
	            <Button @click="cancel">取消</Button>
	            <Button type="primary" @click="IMediate(0)">立即生效</Button>
	            <Button type="primary" @click="ok">明日生效</Button>
	        </div>
        </Modal>
        <Modal
            v-model="dealFallModel"
            ref="dealFallModel"
            width="728"
            :styles="{top: '120px'}"
            class="dealFallModel"
            >
	        <p slot="header" style="display: none;">
	        </p>
            <div>
            	<Row type="flex">
            		<Col span="16" push="4" class="dealFall_col">
		            	<p class="dealFall_cont" v-show="dealFallData.sale!=-1">如果立即生效，则将有&emsp;<span style="font-size: 16px;color: red;">{{dealFallData.sale}}</span>&emsp;条资源掉落至公共库</p>
		            	<p class="dealFall_cont" v-show="dealFallData.fail!=-1">将有&emsp;<span style="font-size: 16px;color: red;">{{dealFallData.fail}}</span>&emsp;条资源判定为失效资源</p>
		            	<div class="dealFall_warn">
		            		<Icon type="information-circled"></Icon>是否立即生效
		            	</div>
            		</Col>
            	</Row>
            </div>
	        <div class="btnList">
	            <Button type="primary" @click="affirmDealFall" style="margin-right: 20px;">确认立即生效</Button>
	            <Button @click="offDealFall">取消</Button>
	        </div>
        </Modal>
    </div>
    
</template>

<script> 
    import btnlist from '@public/modules/btnlist'
    import valid, { errors, common, sys, sysConfig, recordManage,crmCustomer} from "../../libs/request";
	import { mapMutations, mapState, mapGetters, } from "vuex";
    export default {
        data() {
            return {
            	dealFallModel:false,
                middList: [],
                switchText: '',
                switch1: true,
                lose: true,
                ruleList: [],
                singleRule: {},
                btninfo: [
                    {
						text: '其他规则设置',
						event: this.otherRule,
					},
                ],
                ruleSetting: [{}, {}],
                modal1: false,
                modal2: false,
                type: '',
                dropList: [],
                pageSize: 10,
                pageNo: 1,
                data: {
                    count: 20,
                    list: [],
                    pageNo: 1,
                },
                columns: [
                    {
                        title: "职级",
                        key: "id",
                        align: "center",
                        // filters: [
                        // ],
                        // filterMultiple: false,
                        // filterRemote :() => {
                        // }
                    },
                    {
						title: '最晚分单掉落时长',
						align: 'center',
						key: 'fdDuration',
						// width: 110
					},
					{
						title: '最晚抢单掉落时长',
						align: 'center',
						key: 'qdDuration',
						// width: 110
					},
                    {
                        title: "更新时间",
                        key: "updateTime",
                        align: "center",
                    },
                    {
                        title: "状态",
                        key: "status",
                        align: "center",
                        render: (h, params) => {
                            return h("div", {}, 
                                params.row.status == 'true' ? '启用' : '禁用'
                            )
                        }
                    },
                    {
                        title: "操作",
                        key: "dayTime",
                        align: "center",
                        render: (h, params) => {
                            return h("div", {
                            	style:{
                            		width:"116px",
                            		margin:"auto",
						            display: "flex",
						            "justify-content": "space-between",
						            "align-items": "center"
                            	}
                            }, [
                                h(
                                    "a",
                                    {
                                    on: {
                                        click: () => {
                                            this.changeD(params.row);
                                        }
                                    }
                                    },
                                    "修改"
                                ),
                                h(
                                    "a",
                                    {
                                    on: {
                                        click: () => {
                                        	this.$router.push({name:"crm.flow",query:{levelId:params.row.levelId,level:params.row.id}})
                                        }
                                    }
                                    },
                                    "参与流转设置"
                                ),
                            ])
                        }
                    },
                ],
                dealFallData:{},
                
            }
        },
		computed:{
        	...mapState(['userInfo']),
			...mapGetters('crm', ['isAdmin','isCeo', 'isWorker', 'isTMK', 'isTMKLeader', 'isMarket', 'isMarketLeader', 'isSaler', 'isSalerLeader', 'isBranchOfficeLeader', 'isHeaderOfficeLeader']),
		},
        components: {
            btnlist
        },

        created() {
            // this.getFilterList()
        },

        mounted() {
            // this.getFilterList(0)
            this.getDropList()
            this.getDropListNew()
        },
 
        methods: { 
            // 获取筛选项 
            // getFilterList(id) {
            //     let obj = {
            //         type: 'sys_user_competence_level',
            //         parentId: id
            //     }
            //     sys.getTypeList(obj).then(valid.call(this))
            //     .then(res => {
            //         if(res.ok) {
            //             if(id == 0) {
            //                 this.columns[0].filters = res.data.data
            //             }else {
            //                 this.dropList = res.data.data
            //                 this.getDropList()
            //             }
            //         }
            //     })
            //     .catch(errors.call(this))
            //     .finally(() => {});
            // },

            // 获取掉落列表
            getDropList() {
                let obj = {
                    type: this.type,
                }
                sysConfig.dropList(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.data.list = res.data.data 
                        this.getDropListNew()
                        // this.handleDate()
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
            // 获取掉落列表
            getDropListNew() {
                let obj = {
                    // type: this.type,
                }
                sysConfig.dropListNew(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                       this.handleId(res.data.data)
                        // this.handleDate()
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },

            handleId(val) {
                this.data.list.forEach(item => {
                    val.forEach(item1 => {
                        if (item.id == item1.value) {
                            item.levelId = item1.id
                        }
                    })
                })
            },
            // handleDate(val) {
            //     let arr
            //     if(!this.type) {
            //         arr = this.dropList.filter((item) => {
            //                 if(item.parentId != 0)  return item
            //             })
                   
            //     }else {
            //         arr = this.dropList.filter((item) => {
            //             if(item.value.indexOf(this.type) > -1 && item.parentId != 0)   return item
            //         })
            //     }
                
            //     arr.forEach((item, key) => {
            //         val.forEach((item1, key2) => {
            //             if(item1.id == item.value) {
            //                 arr[key].duration = item1.duration
            //                 arr[key].value = item1.id
            //                 arr[key].status = item1.status
            //                 arr[key].updateTime = item1.updateTime
            //             }
            //         })
            //     })
            //     if(arr.length > 10) {
            //         this.middList = arr.slice(0, 10)
            //     }else {
            //         this.middList = arr
            //     }
            //     console.log(this.middList, 99)
            //     this.data.list = arr 
            // },

            stateChange(val) {
                if(val) {
                    this.switchText = "启用"
                }else {
                    this.switchText = "禁用"
                }
            },

            // sortChange(val) {
            //     if(!val._filterChecked.length) {
            //         this.type = ''
            //     }else {
            //         this.type = val._filterChecked[0]
            //     }
                
            //     this.getDropList()
            // },

            ok1() {
                if (this.singleRule.qdDuration < 1 || this.singleRule.fdDuration < 1) {
                    this.$refs.duration.visible = true
                    this.modal1 = true
                    this.$Message.error('请输入大于0的时间')
                    return
                }
                sysConfig.editSingleSetting(this.singleRule).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.$Message.info(res.data.message)
                        this.getDropList()
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});

            },

            cancel1() {

            },
            
            ok() {
                let onOf = true
                for(let i = 0 ; i < this.ruleSetting.length; i++) {
                    if(String(this.ruleSetting[i].duration).includes('.') || this.ruleSetting[i].duration <= 0) {
                        this.$Message.info('请输入正整数')
                        this.modal2 = this.$refs.modalSet.visible = true
                        onOf = false
                        break
                        return
                    }
                }

                if(!onOf) return
                sysConfig.editGobalSetting(this.ruleSetting).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.$Message.info(res.data.message)
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },

            cancel() {
				this.modal2=false;
            },

            otherRule() {
                sysConfig.globalSetting({}).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        res.data.data.forEach((item, index) => {
                            if(item.status == 'true') {
                                item.status = true
                            }else {
                                item.status = false
                            }
                            if(item.duration) this.$set(this.ruleSetting, index, item)
                        })
                        
                        this.modal2 = true
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },

            changeD(obj) {
                this.singleRule= obj
                this.singleRule.fdDuration = this.singleRule.fdDuration/1
                this.singleRule.qdDuration = this.singleRule.qdDuration/1
                // this.singleRule.id = obj.id
                // this.singleRule.levelId = obj.levelId
                this.singleRule.status =  this.singleRule.status == 'true' ? true : false
                this.stateChange(this.singleRule.status)
                this.modal1 = true
            },

            // onPageSizeChange(val) {
            //     this.pageSize = val
            //     this.middList = this.data.list.slice(0, val)
            // },

            // onPageChange(val) {
            //     if(this.pageSize == 20) {
            //         this.middList = this.data.list
            //         return
            //     }
            //     this.middList = this.data.list.slice((val-1)*10, val*10)
            // },
            IMediate(type){
                let obj = {
                    type
                }
                crmCustomer.dealFallCustomer(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                    	if(type==0){
                    		this.dealFallData=res.data.data;
            				this.dealFallModel=true;
                    	}else{
                    		this.offDealFall();
                    		this.cancel();
                    	}
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
            affirmDealFall(){
            	this.IMediate(1);
            },
            offDealFall(){
            	this.dealFallModel=false;
        		this.dealFallData={};
            }
        }
    }
</script>


