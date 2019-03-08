<style lang="less">
.addZzdd{
    padding-left: 30px;
    padding-right: 20px;
    .chooseCourse{
        overflow: hidden;
    }
    .forChoose, .hasChoosed{
        float: left;
        width: 418px;
        border: 1px solid #e0e0e0;
        border-radius: 5px; 
        .title{
            line-height: 38px;
            border-bottom: 1px solid #e0e0e0;
            padding-left: 22px;
        }
        .courseList{
            height: 192px;
            overflow-y: scroll;
            padding: 10px 20px;
        }
        .courseList1{
            height: 244px;
            overflow-y: scroll;
            padding: 10px 20px;
        }
        .addButton{
            border-top: 1px solid #e0e0e0;
            line-height: 50px;
        }
    }
    .hasChoosed{
        margin-left:30px;
    }

    .addZzddTable{
        @border: 1px solid #dddee1;
		@h: 36px;
		padding-right: 14px;
		.table-div {
            text-align: left;
			zoom: 1;
			&::before {
				content: "";
				clear: both;
				height: 0;
				font-size: 0;
				line-height: 0;
				display: table;
			}
		}
		.table-content {
			@selectHeight: 26px;
			margin-bottom: 30px;
			margin-top: 20px;
			border: @border;
			border-bottom: none;
			.ivu-select,
			.ivu-input-wrapper {
				height: @selectHeight;
			}
			.ivu-select-single .ivu-select-selection {
				height: @selectHeight;
			}
			.ivu-select-single .ivu-select-selection .ivu-select-placeholder,
			.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
				height: @selectHeight - 2px;
				line-height: @selectHeight - 2px;
			}
			.ivu-input {
				height: @selectHeight;
				text-align: right;
			}
		}
		.table-header {
			background: #f8f8f9;
			border-bottom: @border;
		}
		.table-header,
		.table-footer {
			ul {
				overflow: hidden;
				zoom: 1;
			}
		}
		.table-li {
			height: @h;
			line-height: @h;
            list-style: none;
            margin: 0 10px;
			float: left;
			&:nth-child(1) {
				width: 20%;
			}
			&:nth-child(2) {
				width: 55px;
			}
			&:nth-child(3) {
				width: 10%;
			}
			&:nth-child(4) {
				width: 10%;
			}
			&:nth-child(5) {
				width: 100px;
			}
			&:nth-child(6) {
                margin-right: 0;
				width: 250px;
			}
		}
		.table-item {
			border-bottom: @border;
		}
    }
    .syxq{
        margin-top:20px;
        .ivu-select-selection{
            min-height: 60px;
        }
    }
    .ivu-checkbox-group-item {
        min-width: 175px;
    }
    .ivu-form .ivu-form-item-label{
        color: #b8b8b8;
    }
}
</style>
<template>
    <div class="addZzdd">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="112">
            <FormItem label="项目名称：" prop="name" style="display:inline-block;">
                <Input v-model="formValidate.name" placeholder="请输入项目名称" :maxlength="35" style="width:714px;"></Input><span style="margin-left:8px;color:red;">{{formValidate.name ? formValidate.name.length : 0}}/35</span>
            </FormItem>
            <FormItem label="适用产品描述：" prop="itemDesc">
                <Input v-model="formValidate.itemDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入" style="width:754px;"></Input>
            </FormItem>
           <!--  <FormItem label="优惠项目类型：" prop="city" style="display:inline-block;margin-left: 76px;">
                <Select v-model="formValidate.city" placeholder="请选择优惠项目类型"  style="width:270px;">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem> -->
        </Form>
        <div class="chooseCourse">
            <div class="forChoose">
                <div class="title">
                    选择课程({{courseForChoose.length}})
                </div>
                <div class="search">
                    <v-select style="width: 396px;margin: 10px;" 
                        :otherStyle="{}"
                        placeholder="搜索课程包名称" icon="search" 
                        v-model="compact" k='cnname' :datafunc="searchDropList" 
                        @on-enter="textChange" @on-click="textChange">
		            </v-select>
                </div>
                <div class="courseList">
                    <CheckboxGroup v-model="courseForChoose">
                        <Checkbox :label="item.id" v-for="item in courseForChooseList" :key="item.id">{{item.name}}</Checkbox>
                    </CheckboxGroup>
                </div>
                <div class="addButton" style="text-align: right;padding-right:30px;">
                    <Button @click="addChooseCourse">添加 > </Button>
                </div>
            </div>
            <div class="hasChoosed">
                <div class="title">
                    已选课程({{courseHasChoosed.length}})
                </div>
                <div class="courseList1">
                    <CheckboxGroup v-model="courseHasChoosed" vertical>
                        <Checkbox :label="item.id" v-for="item in courseHasChoosedList" :key="item.id">{{item.name}}</Checkbox>
                    </CheckboxGroup>
                </div>
                <div class="addButton" style="padding-left:30px;">
                    <Button @click="removeChooseCourse">  &lt; 移除</Button>
                </div>
            </div>
        </div>
        <div>
            <div class="syxq">
                <Form :label-width="112">
                    <FormItem label="适用校区：">
                        <Select v-model="model10" multiple style="width:696px;margin-right:6px;" @on-change="changeSchool">
                            <Option v-for="item in schoolList" :value="item.subId" :key="item.subId">{{ item.name }}</Option>
                        </Select>
                        <Checkbox  v-model="checkAllSyxq" @on-change="handleCheckAllSyxq">全选</Checkbox>
                    </FormItem>
                </Form>
            </div>
            <div class="addZzddTable">
                <div class="table-div">
                    <div class="table-content">
                        <div class="table-header">
                            <ul>
                                <li class="table-li">校区</li>
                                <li class="table-li" style="text-align: right;">课时数</li>
                                <li class="table-li" style="text-align: right;">定价(元)</li>
                                <li class="table-li" style="text-align: right;">优惠金额(元)</li>
                                <li class="table-li" style="text-align: right;">组合总价(元)</li>
                                <li class="table-li">有效日期</li>
                            </ul>
                        </div>
                        <div class="table-footer">
                            <div class="table-item" v-for="(item, index) in data1" :key="item.subId + index">
                                <ul>
                                    <li class="table-li">
                                        <span>{{ item.name }}</span>
                                    </li>
                                    <li class="table-li" style="text-align: right;">
                                        <span>{{ item.num }}</span>
                                    </li>
                                    <li class="table-li" style="text-align: right;">
                                        <span>{{ Number(item.groupPrice).toFixed(2)}}</span>
                                    </li>
                                    <li class="table-li" style="text-align: right;">
                                        <span v-text="Number(item.publicPrice) ? (Number(item.groupPrice) - Number(item.publicPrice)).toFixed(2) : 0"></span>
                                    </li>
                                    <li class="table-li">
                                        <Input v-model="item.publicPrice"/>
                                    </li>
                                    <li class="table-li">
                                        <DatePicker v-model="item.startTime" type="date" placeholder="请选择" style="width:105px;margin-right:3px"></DatePicker>
                                        ----
                                        <DatePicker v-model="item.endTime" type="date" placeholder="请选择" style="width:105px;margin-left:3px"></DatePicker>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
             <!--    <Table border :columns="columns1" :data="data1"></Table> -->
            </div>
        </div>
    </div>
</template>
<script>
import vSelect from "../../../modules/vSelect.vue";
import valid, { errors, common, htItem } from '../../../libs/request.js';
export default {
    props:{
        rules:{
            type:Array,
            required:true
        },
        courseForChooseList:{
            type:Array,
            required:true
        }
    },
    components:{
        vSelect
    },
    computed:{
        allSchoolIdList(){
            let arr = []
            this.schoolList.forEach(item => {
                arr.push(item.subId)
            })
            return arr
        },  
        courseForChooseObj(){
            let obj = {}
            this.courseForChooseList.forEach(item => {
                obj[item.id] = item
            });
            return obj
        },
        courseHasChoosedObj(){
            let arr = []
            this.courseHasChoosedList.forEach(item => {
                arr.push(item.id)
            })
            return arr
        },
        data1Ids(){
            let arr = []
            this.data1.forEach(item => {
                arr.push(item.subId)
            })
            return arr  
        }
    },
    mounted() {
    },
    data() {
        let _this = this
        return {
            checkAllSyxq: false,
            compact:'',
            courseForChoose: [],
            courseHasChoosed: [],
            courseHasChoosedList: [],
            columns1: [
                {
                    title: '校区',
                    key: 'name'
                },
                {
                    title: '课时数',
                    key: 'num',
                    width:75,
                },
                {
                    title: '定价(元)',
                    key: 'groupPrice'
                },
                {
                    title: '优惠金额(元)',
                    key: 'discountAmount'
                },
                {
                    title: '组合总价(元)',
                    key: 'publicPrice',
                    render(h,params){
						return h('Input',{
							props:{
                                number: true,
                                value: Number(params.row.publicPrice)? Number(params.row.publicPrice).toFixed(2):0,
							},
							on:{
								'on-change'(e){
                                    _this.$nextTick(() => {
										setTimeout(()=>{
											_this.changePublicPrice(params.row.subId,e.target.value)
										},2000)
									})
                                }
							}
						}, Number(params.row.publicPrice) ? Number(params.row.publicPrice).toFixed(2) : 0);
					},
                },
                {
                    title: '有效日期',
                    width:250,
                    render(h,params){
						return h('div',{
                            style:{
                                width: '240px'
                            },
						},[
                            h('DatePicker',{
                                props:{
                                    type: 'date',
                                    placeholder: "请选择日期"
                                },
                                style:{
                                    width: '150px',
                                    'margin-right': '3px'
                                },
                                on:{
                                    input(e){
                                        console.log(e)
                                        params.row.startTime = e;
                                        _this.data1[params.index].startTime = new Date(e).format('yyyy-MM-dd')
                                    }
                                }
                            },params.row.startTime ? params.row.startTime : ''),
                            '--',
                            h('DatePicker',{
                                props:{
                                    type: 'date',
                                    placeholder: "请选择日期"
                                },
                                style:{
                                    width: '150px',
                                    'margin-left': '3px'
                                },
                                on:{
                                    input(e){
                                        console.log(e)
                                        params.row.endTime = e;
                                        _this.data1[params.index].endTime = new Date(e).format('yyyy-MM-dd')
                                    }
                                }
                            },params.row.endTime? params.row.endTime: '')
                        ]);
					},
                }
            ],
            data1: [],
            hasSelectedSchoolId:[],
            schoolList: [],
            model10: [],
            formValidate: {
                name: '',
                itemDesc: '',
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请输入项目名称', trigger: 'blur' }
                ],
            }
            
        };
    },
    methods:{
        handleCheckAllSyxq(){
            if (this.checkAllSyxq) {
                this.model10 = [].concat(this.allSchoolIdList);
            } else {
                this.model10 = [];
            } 
        },
        changePublicPrice(subId, publicPrice){
            for(let i = 0; i < this.data1.length; i++){
				if(subId == this.data1[i].subId){
					this.data1[i].publicPrice = publicPrice
					this.data1[i].discountAmount = publicPrice ? this.data1[i].groupPrice - publicPrice : 0
				}
			}
        },
        getSchool(isEdit){
            let itemIds = []
            this.courseHasChoosedList.forEach(item=>{
                itemIds.push(item.id)
            })

            if(itemIds.length){
                htItem.listGroupSub({
                    itemIds: itemIds.join(',')
                }).then(valid.call(this)).then(res=>{
                    if(res.ok){
                        this.schoolList  = res.data.data
                        if(!isEdit){
                            this.model10 = []
                            this.checkAllSyxq  = false
                        } else {
                            if(this.schoolList.length == this.model10.length){
                                this.checkAllSyxq  = true
                            } else {
                                this.checkAllSyxq  = false
                            }
                        }
                    }
                }).catch(errors.call(this)).finally(()=>{
                    
                });
            } else {
                this.schoolList = []
            }
        },
        addChooseCourse(){
            this.courseForChoose.forEach(item => {
                if(this.courseHasChoosedObj.indexOf(item)<0){
                    this.courseHasChoosedList.push(this.courseForChooseObj[item])
                }
            });
            this.getSchool()
        },
        removeChooseCourse(){
            let  q = []
            this.courseHasChoosedList.forEach((item,index)=>{
                if(this.courseHasChoosed.indexOf(item.id) < 0){
                    q.push(item)
                }
            })
            this.courseHasChoosedList = q

            
            let q1 = []
            console.log(this.courseForChoose)
            console.log(this.courseHasChoosed)
            this.courseForChoose.forEach((item,index)=>{
                if(this.courseHasChoosed.indexOf(item) < 0){
                    q1.push(item)
                }
            })
            this.courseForChoose = q1
            this.courseHasChoosed = []

            this.getSchool()
        },
        searchDropList(word) {
            return new Promise((resolve, reject) => {});
        },
        changeSchool(selectS){
            let res = []
            selectS.forEach(item => {
                if(this.data1Ids.indexOf(item) >= 0){
                    let q = this.data1[this.data1Ids.indexOf(item)]
                    q.publicPrice = Number(q.publicPrice) ? Number(q.publicPrice).toFixed(2) : 0
                    res.push(q)
                } else {
                    let q = this.schoolList.filter((item1)=>{return item1.subId == item })[0]
                    q.publicPrice = Number(q.publicPrice) ? Number(q.publicPrice).toFixed(2) : 0
                    res.push(q)
                }
            });
            this.data1 = res
            if(this.data1.length == this.allSchoolIdList.length){
                this.checkAllSyxq = true
            } else {
                this.checkAllSyxq = false
            }
        },
        textChange: function(val) {
            this.$emit('doSearchCourse',val)
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        }
    }
}
</script>