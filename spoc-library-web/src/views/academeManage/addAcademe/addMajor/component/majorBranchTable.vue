<style lang="less">
.majorBranchColumns{
    .btns{
        text-align: right;
        button:nth-of-type(1){
        color: #fff;
        background-color:#44bcb7;
        }
    }
    // .form_btns{
    //     background:red;
    //     display: flex;
    //     justify-content: space-between; 
    // }
    .ivu-table-wrapper{
        .ivu-table-header{
            th{
                background: #dddee1;
            }
        }
    }
}
</style>
<template>
  <div class="majorBranchColumns">
        <div class="btns">
            <Button @click="add">添加</Button>
            <Button @click="del">删除</Button>
        </div>
        <div>
            <Table :columns="majorBranchColumns" :data="majorBranchData.list"></Table>
        </div>
        <Modal v-model="modalMajor" title="添加专业分支" ok-text="保存" width="730" class="modal-major" @on-ok="addSubmit"  @on-cancel="majorObj={}">
            <div>
                <Form :data="majorObj" ref="majorObjForm"> 
                    <Row type="flex" justify="space-between">
                        <Col span="11">
                            <FormItem label="专业名称" prop="majorId">
                            <Select
                            	:disabled="$route.query.edit==1" 
                                v-model="majorObj.majorId"
                                filterable
                                remote
                                :label="majorObj.branchName"
                                :remote-method="remoteMethod"
                                :loading="loading" placeholder="从标准专业库中选择">
                                <Option v-for="(option, index) in majorBranchData.list" :value="option.id" :key="index" @click.native="getMajorName(option)">{{option.cnname}}</Option>
                            </Select>
                            </FormItem>  
                        </Col>
                        <Col  span="11">   
                            <FormItem label="排名" prop="rank">
                                <Input :disabled="$route.query.edit==1" v-model="majorObj.rank" placeholder="默认同标准专业库(中文)"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="space-between">
                        <Col span="11">
                            <FormItem label="该专业分支在当前学院的名称" prop="name">
                                <Input :disabled="$route.query.edit==1" v-model="majorObj.name" placeholder="中文名"></Input>
                            </FormItem>
                        </Col>
                        <Col span="11">   
                            <FormItem label="该专业分支在当前学院的名称" prop="enName">
                                <Input :disabled="$route.query.edit==1" v-model="majorObj.enName" placeholder="英文名"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem label="描述" prop="remarks">
                        <Input :disabled="$route.query.edit==1" v-model="majorObj.remarks" type="textarea"></Input>
                    </FormItem>
                     <!-- <div class="form_btns" style="display:flex; justify-content:space-around;"><Button>取消</Button> <Button type="primary">保存</Button></div> -->
                </Form>      
            </div>
        </Modal>
        <Modal v-model="modalMajor1" title="查看专业分支">
            <Form :data="majorObj" ref="majorObjFormCheck"> 
                <FormItem label="专业名称:" prop="majorId">
                <div>{{majorObj.branchName}}</div>
                </FormItem>  
                
                <FormItem label="排名:" prop="rank">
                    <div>{{majorObj.rank}}</div>
                </FormItem>
        
                
                <FormItem label="该专业分支在当前学院的名称:" prop="name">
                    <div>{{majorObj.name}}</div>
                </FormItem>
            
                <FormItem label="该专业分支在当前学院的名称:" prop="enName">
                    {{majorObj.enName}}
                </FormItem>
        
                <FormItem label="描述:" prop="remarks">
                    {{majorObj.remarks}}
                </FormItem>
            </Form>
        </Modal>
  </div>
</template>
<script>
import valid,{ errors,SchoolMajor } from "../../../../../libs/request";
export default {
    name:'majorBranchTable',
    props: {
        majorId:{
            required: true,
        }
    },
    data () {
        return {
            loading:false,
            modalMajor:false,
            modalMajor1:false,
            majorObj:{
                majorId:'',
                branchName:'',//该专业id所对应的名称
                rank:'',
                name:'',
                enName:'',
                remarks:'',
            },
            majorBranchColumns:[
                { 
                title: "序号",
                align: "center",
                key:   "order",
                render:(h,params)=>{
                    return h('div',{
                       
                    },[
                        h('Checkbox',{
                            on:{
                                'on-change':(val)=>{
                                    if(this.selectedArray.findIndex((n)=>n===params.index) != -1){
                                        this.selectedArray.splice(params.index,1)                                        
                                    }else{
                                        this.selectedArray.push(params.index)
                                    }
                                }  
                            } 
                        }),
                        h('span',params.index+1)
                    ])
                }
                },
                { 
                title: "分支名称",
                align: "center",
                key:   "branchName",
                },
                { 
                title: "排名",
                align: "center",
                key:   "rank",
                },
                { 
                title: "操作",
                align: "center",
                render:(h,params)=>{
                    return h('div',{
                        style:{
                        display:'flex',
                        justifyContent: 'center',
                        color: '#44bcb7',
                        position:'relative',
                        }
                    },[
                        // h('div',{

                        // }),
                        h('div',{
                            style:{
                            cursor:'pointer',
                            paddingLeft:'10px',
                            paddingRight:'10px',
                            },
                            on:{
                            click:()=>{
                                this.edit(params)
                            }
                            }
                        },'编辑'),
                        h('div',{
                            style:{
                            cursor:'pointer',
                            paddingLeft:'10px',
                            paddingRight:'10px',
                            },
                            on:{
                            click:()=>{
                                this.check(params)
                            }
                            }  
                        },'查看')
                    ])
                }
                },
            ],
            //table 数据源
            majorBranchData:{
                list:[  
                ],
            },
            //存选中的专业index以便用于删除
            selectedArray:[],
            //是否是编辑
            flag:false,
        }
    },
    methods: {
        //添加专业分支显示模态框
        add(){
            this.modalMajor = true;
        },

        //删除专业分支
        del(){
            if(this.selectedArray.length){
                this.selectedArray.forEach((v) => {
                    this.majorBranchData.list.splice(v,1)
                });
               this.selectedArray.length = 0; 
            }else{
                this.$Notice.warning({desc:'请先选择专业'})
            }
            
        },
        //确定增加专业分支
        addSubmit(){
            let itemObj = Object.assign(this.majorObj);
            //编辑情况
            if(this.flag){
                this.majorBranchData.list.splice(itemObj._index,1,itemObj)
                this.flag = false;
            }else{
                this.majorBranchData.list.push(itemObj);
            }

            this.majorObj ={};

            //emit出去
            let majorNameList=[];
            this.majorBranchData.list.forEach(v=>{
                let {majorId,branchName,rank,name,enName,remarks} = v;
                majorNameList.push({majorId,branchName,rank,name,enName,remarks});
            })
            this.$emit('input',majorNameList)
        },
        //编辑
        edit(params){
            this.majorObj =Object.assign({},params.row);
            this.flag = true;
            this.modalMajor = true;
        },
        //查看
        check(params){
            this.majorObj =Object.assign({},params.row);
            this.modalMajor1 = true;
        },

        //专业分支联想
        remoteMethod(query) {
            this.loading = true;
            SchoolMajor
                .majorBranch({majorId:this.majorId,name:query})
                .then(valid.call(this))
                .then(res => {
                if (res.ok) {
                    
                    this.majorBranchData.list = res.data.data;
                }
                })
                .catch(errors.call(this))
                .finally(() => {
                this.loading = false;
                });
        },
        getMajorName(item) { 
            // this.addAcadme2.name = item.cnname;
            // this.addAcadme2.enName = item.enname;
        },
    }
}
</script>
