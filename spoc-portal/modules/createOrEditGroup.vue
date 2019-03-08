<style lang="less" scoped>
    /* 模态框中嵌套标签选择样式 */
    .createOrEditGroup {
        line-height: 32px;
        .titleBar {
            font-size: 12px;
            // span:last-child {
            //     padding: 0;
            //     margin-right: 0;
            //     height: 25px;
            //     width:70px;
            // }
            span {
                padding: 5px 12px;
                cursor: pointer;
                margin-right: 10px;
            }
            /* span:first-child {
                cursor: auto;
                color: #b8b8b8;
                padding: 0;
                margin-right: 15px;
            } */
            .active {
                background-color: #44bcb6;
                color: white;
                display: inline-block;
                line-height: 24px;
                padding: 0 12px;
            }
        }
    }
    .dialogCGSX {
        .tagType {
            padding-bottom: 16px;
            border-bottom: 1px solid #e9eaec;
            .clear {
                float: right;
                cursor: pointer;
            }
        }
        .modalContent {
            height: 400px;
            padding-bottom: 30px;
            overflow: auto;
            .customerType {
                margin-top: 20px;
            }
            .customerType p{
                font-size: 16px;
                font-weight: bold; 
            }
            .customerType span {
                padding: 4px 25px;
                display: inline-block;
                border: 1px solid #ccc;
                margin: 8px 15px 8px 0;
                border-radius: 3px;
                cursor: pointer;
            }
            .customerType .active {
                background-color: #44bcbc;
                color: #fff;
                border: 1px solid transparent;
            }
        }
    }
</style>
<template>
	<div class="myModal">
		 <!-- 创建服务组模态框 -->
		 <span @click="toShowCreateGroup">{{spanContent}}</span>
         <Modal
            :mask-closable="false"
            v-model="showCreateGroup"
            :loading="showCreateGroupLoading"
            width=728
            :title="title"
            ok-text="保存"
            @on-ok="basicInfoSave"
            @on-cancel="cancel">
               <div>
                    <Form ref="basicStepForm" :rules="basicFormValidate"  :model="createGroup" :label-width="120">
                        <div style="overflow:hidden">
                            <div style="float:left;width:335px;">
                                <Form-item label="编号：" prop="ECNumber">
                                    <Input disabled v-model="createGroup.ECNumber" style="width:180px"></Input>
                                </Form-item>
                                <Form-item label="学生手机号：" prop="telNumber">
                                    <Input disabled v-model="createGroup.telNumber" style="width:180px"></Input>
                                </Form-item>
                            </div>
                            <div style="float:left;width:335px;">
                                <Form-item  label="学生姓名：" prop="username">
                                    <Input disabled v-model="createGroup.username" style="width:180px"></Input>
                                </Form-item>
                                <Form-item label="入学季：" prop="apply">
                                    <Input disabled v-model="createGroup.apply" style="width:180px"></Input>
                                </Form-item>
                            </div>
                        </div>
                        <div style="margin-bottom: 20px;">
                            <!-- <span style="float:left; line-height: 33px; width:115px; text-align:right;margin-left: -6px;margin-right: 13px;"></span> -->
                            <div class="createOrEditGroup">
                                <div class="titleBar">
                                    <p>
                                        <!-- <span v-if="isShow" :class="{active: isActive}">不限</span> -->
                                        <tag-module
                                            rightType='pl_service_group'
                                            @getTagName='getTagName'
                                            :hasSelected='hasSelected'
                                            title="添加标签："
                                            :style1='style1'
                                            :pid='pid'
                                            :modelName='modelName'
                                        ></tag-module>
                                        <span v-for="(item, index) in tagList" :key="index" class="active">{{item}}</span>
                                        <!-- <Button type="primary" @click="limitTagClick" :class="{active: isActive1}">选择标签</Button> -->
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Form-item label="服务组名称：" prop="name">
                            <Input v-model="createGroup.name" :placeholder="createGroup.username + '的服务组'" style="width:180px"></Input>
                        </Form-item>
                        <div style="clear:both;">
                            <Form-item label="服务日期：" prop="startDate"  style="float:left;">
                                <DatePicker type="date" placeholder="服务开始时间" v-model="createGroup.startDate" style="width: 180px"></DatePicker>
                            </Form-item>
                            <div style="float:left;margin-top: 16px;margin-left: 4px;width: 10px; height: 2px; background-color: #44bcb7;"></div>
                            <Form-item label="" prop="endDate"  style="float:left;margin-left:-116px;">
                                <DatePicker type="date" placeholder="服务结束时间" v-model="createGroup.endDate" style="width: 180px"></DatePicker>
                            </Form-item>
                        </div>
                        <div style="clear:both;"></div>
                        <Form-item label="服务阶段：" prop="phase">
                            <span style="line-height: 33px;">（不必要的服务阶段可以取消）</span>
                            <CheckboxGroup v-model="createGroup.phase" @on-change="changeCheckbox">
                                <Checkbox :label="value.value"  :disabled="(type == 'edit' && phaseEditMap[value.value] == 0) || (value.value == pid)"  v-for="(value, index) in checkboxGroupItem" :key="value.value" >{{value.label}}</Checkbox>
                            </CheckboxGroup>
                        </Form-item>
                        <Form-item label="设置：" prop="settings">
                            <Input v-model="createGroup.settings"  style="opacity:0;display:inline-block;"></Input>
                        </Form-item>
                        <div style="overflow:hidden;">
                            <div style="float:left;width:335px;">
                                <div style="margin-bottom: 20px;">
                                    <span style="float:left; line-height: 33px; width:150px; text-align:right;">总览：</span>
                                    <div style="height: 34px; line-height: 34px;">
                                        <i-switch v-model="createGroup.setting01"  @on-change="changeSetting"></i-switch>
                                    </div>
                                </div>
                                <div style="margin-bottom: 20px;">
                                    <span style="float:left; line-height: 33px; width:150px; text-align:right;">人员：</span>
                                    <div style="height: 34px; line-height: 34px;">
                                        <i-switch v-model="createGroup.setting02" @on-change="changeSetting"></i-switch>
                                    </div>
                                </div>
                                <div style="margin-bottom: 20px;">
                                    <span style="float:left; line-height: 33px; width:150px; text-align:right;">任务：</span>
                                    <div style="height: 34px; line-height: 34px;">
                                        <i-switch v-model="createGroup.setting03" @on-change="changeSetting"></i-switch>
                                    </div>
                                </div>
                                <div style="margin-bottom: 20px;">
                                    <span style="float:left; line-height: 33px; width:150px; text-align:right;">文件：</span>
                                    <div style="height: 34px; line-height: 34px;">
                                        <i-switch v-model="createGroup.setting04" @on-change="changeSetting"></i-switch>
                                    </div>
                                </div>
                            </div>
                            <div style="float:left;width:335px;">
                                <div style="margin-bottom: 20px;">
                                    <span style="float:left; line-height: 33px; width:150px; text-align:right;">甘特图：</span>
                                    <div style="height: 34px; line-height: 34px;">
                                        <i-switch v-model="createGroup.setting05" @on-change="changeSetting"></i-switch>
                                    </div>
                                </div>
                                <div style="margin-bottom: 20px;">
                                    <span style="float:left; line-height: 33px; width:150px; text-align:right;">日历：</span>
                                    <div style="height: 34px; line-height: 34px;">
                                        <i-switch v-model="createGroup.setting06" @on-change="changeSetting"></i-switch>
                                    </div>
                                </div>
                                <div style="margin-bottom: 20px;">
                                    <span style="float:left; line-height: 33px; width:150px; text-align:right;">账单：</span>
                                    <div style="height: 34px; line-height: 34px;">
                                        <i-switch v-model="createGroup.setting07" @on-change="changeSetting"></i-switch>
                                    </div>
                                </div>
                                <div style="margin-bottom: 20px;">
                                    <span style="float:left; line-height: 33px; width:150px; text-align:right;">记事本：</span>
                                    <div style="height: 34px; line-height: 34px;">
                                        <i-switch v-model="createGroup.setting08" @on-change="changeSetting"></i-switch>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
        </Modal>
        <!-- 选择标签模态框 -->
        <!-- <Modal
            v-model="isShowDialog"
            title="选择标签"
            width=568
            @on-ok="ok1"
            @on-cancel="cancel1">
            <div class="dialogCGSX">
                <p class="tagType">
                    <RadioGroup v-model="TagKind" @on-change='radioChange'>
                        <Radio label="limitTag">
                            <span>{{modelName}}</span>
                        </Radio>
                        <Radio label="allTag">
                            <span>全局标签</span>
                        </Radio>
                    </RadioGroup>
                    <span class="clear" @click="clearLimit">清空</span>
                </p>
                <div class="modalContent">
                    <div class="customerType" v-for="(item, INDEX) in tagListAll" :key="INDEX">
                        <div>
							<p style="display:inline">{{item.title}}</p>
							<Checkbox style="margin-left:5px;"  v-if="item.isMultiselect != 1" v-model="isSelectAll[item.id]" @on-change="selectAll(item.id)">全选</Checkbox>
						</div>
                        <span  @click="selectItem(itemChildren,item)" v-for="(itemChildren, index) in item.children" :key="index" :class="{'active':moreCheckList[item.id] && moreCheckList[item.id].indexOf(itemChildren.id)!=-1}">{{itemChildren.title}}</span>
                    </div>
                </div>
            </div>
        </Modal> -->
	</div>
</template>

<script>
    import valid, { errors, plServiceGroup, sys, common } from "../libs/request";
    import tagModule from '@public/modules/tagModule'
	export default {
        props:{
            pid: {
				type: String
			},
            title:{ //模态框标题
                type: String,
                default: ''
            },
            type: { //模态框当前模式: create||edit
                type:String
            },
            spanContent: { //打开模态框按钮的文字： 新建服务组||设置
                type: String
            },
            studentInfo_userId : { //创建服务组时带入的学生基本信息
                type: String
            },
            studentInfo_stuName : { //创建服务组时带入的学生基本信息
                type: String
            },
            studentInfo_cellNumber : { //创建服务组时带入的学生基本信息
                type: [String,Number]
            },
            studentInfo_ecID : { //创建服务组时带入的学生基本信息
                type: String
            },
            studentInfo_applyTime : { //创建服务组时带入的学生基本信息
                type: String
            },
            modelName: {
                type: String //模块名 规划 || 签约 。。。
            }
        },
		data() {
            //起止时间校验--开始时间
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择开始时间'));
                } else {
                    if (this.createGroup.endDate !== '') {
                        this.$refs.basicStepForm.validateField('endDate');
                    }
                    callback();
                }
            };
            //起止时间校验--结束时间
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择结束时间'));
                } else if (this.createGroup.startDate && this.createGroup.startDate.getTime() >new Date(value).getTime()) {
                    callback(new Error('结束时间不能早于开始时间'));
                } else {
                    callback();
                }
            };
			return {
                style1: {
                    color: '#495060',
                    width: '120px',
                    textAlign: 'right',
                    display: 'inline-block',
                    paddingRight: '12px'
                },
                hasSelected: [],
                isSelectAll:{}, //是否全选
                showCreateGroup:false, //是否显示创建服务组模态框
                showCreateGroupLoading:true,//校验加载过程中
                checkboxGroupItem:[],//创建服务组模态框。服务阶段选项列表
                createGroup: {
                    userId:'', //学生姓名
                    username:'', //学生姓名
                    telNumber:'', //学生手机号
                    ECNumber:'', //学生EC号
                    apply:'', //学生入学季
                    tags:'', //学生标签
                    name:'', //服务组名称
                    startDate:'', //服务开始时间
                    endDate:'',  //服务结束时间
                    phase:[],  //服务阶段
                    setting01:true,  //服务组设置项--总览
                    setting02:true,  //服务组设置项--人员
                    setting03:true,  //服务组设置项--任务
                    setting04:true,  //服务组设置项--文件
                    setting05:true,  //服务组设置项--甘特图
                    setting06:true,  //服务组设置项--日历
                    setting07:true,  //服务组设置项--账单
                    setting08:true,  //服务组设置项--记事本
                    settings: '非空字符串占位'//用于校验设置项必须至少有一个
                },

				/* 模态框内嵌标签选择相关参数 */
				isShow: true,
				isActive: true,
				isActive1: false,
				num: 0,
				isShowDialog: false,
				TagKind: "limitTag",
				menuId: this.pid,
				tagList: [], 
                tagListAll: [], 
                moreCheckList: {},  //已选中ID集合，组标签ID为KEY，选中ID为数组的Map {'111':[1,2,333],'222':[2,3,66]}
                tagArr: {}, 
                tagListAllCache1: [], //指定标签备选项缓存，避免切换tab时重复请求标签接口
                tagListAllCache2: [],  //全局标签备选项缓存，避免切换tab时重复请求标签接口
                phaseEditMap:{}, //用于比对编辑时服务阶段是否可修改
                /*校验*/
                basicFormValidate:{
                    username:[
                        { required: true, message: '必填项', trigger: 'blur' }
                    ],
                    name:[
                        { required: true, message: '必填项', trigger: 'change' }
                    ],
                    startDate:[
                        { required: true, validator: validatePass, trigger: 'change' }
                    ],
                    endDate:[
                        { validator: validatePassCheck, trigger: 'change' }
                    ],
                    phase:[
                        { required: true, type: 'array', min: 1, message: '至少选择一项', trigger: 'change' }
                    ]
                    ,
                    settings:[
                        { required: true, type: 'string', message: '至少选择一项', trigger: 'change' }
                    ]
                }
			}
        },
        components: {
            tagModule,
        },
        mounted () {
            console.log("this.pid = " + this.pid)
            
        },
		methods: {
            //全选
			// selectAll(parentId) {
			// 	this.tagListAllCache1.forEach((item)=>{
			// 		if(item.id == parentId) {
            //             this.forSelectAll(parentId, item)
			// 		}
			// 	})
			// 	this.tagListAllCache2.forEach((item)=>{
			// 		if(item.id == parentId) {
            //             this.forSelectAll(parentId, item)
			// 		}
			// 	})
            // },
            // forSelectAll(parentId, item) {
            //     let isCheckedAll = this.isSelectAll[parentId]
            //     let selected = this.moreCheckList[parentId]
            //     let tagArrSelected = this.tagArr[parentId]
            //     if(!selected) { //从来没有选中过该组的。则初始一下
            //         selected = []
            //     } 
            //     if(!tagArrSelected) { //从来没有选中过该组的。则初始一下
            //         tagArrSelected = []
            //     } 
            //     item.children.forEach((itemChild) =>{
            //         itemChild.checked = isCheckedAll
            //         let index = selected.indexOf(itemChild.id);
            //         if (index == -1 && isCheckedAll) {//全选
            //             selected.push(itemChild.id);
            //             tagArrSelected.push(itemChild.title);
            //         } 
            //         if (index != -1 && !isCheckedAll) { //取消全选
            //             selected.splice(index, 1);
            //             tagArrSelected.splice(index, 1);
            //         }
            //     })
            //     this.$set(this.moreCheckList,parentId, selected )
            //     this.$set(this.tagArr,parentId, tagArrSelected )
            // },
            //设置项校验必须至少有一个
            changeSetting() {
                if(this.createGroup.setting01||this.createGroup.setting02||this.createGroup.setting03||
                    this.createGroup.setting04||this.createGroup.setting05||this.createGroup.setting06||
                    this.createGroup.setting07||this.createGroup.setting08){
                    this.$set(this.createGroup,'settings','非空字符串占位')
                } else {
                    this.$set(this.createGroup,'settings','')
                }
            },
            //服务阶段过滤，有可能存在空字符串?脏数据？
            changeCheckbox(changeRes)  {
                this.createGroup.phase = changeRes.filter((xx)=>{ return xx.length >1})
            },
			toShowCreateGroup() {
                sessionStorage.setItem("moreCheckListForGroup",'{}'); //清除缓存
				sessionStorage.setItem("tagArrForGroup", '{}'); //清除缓存
                this.resetCreateGroup()
                this.showCreateGroup = true
                this.getGroupPhase()
            },
            basicInfoSave(){//保存基本信息
                let _this = this
                this.$refs.basicStepForm.validate((valid) => {
                    if(valid){
                        _this.saveCreateGroup()
                    } else {
                        _this.showCreateGroup =  true
                        _this.showCreateGroupLoading = false
                        setTimeout(() =>{
                            _this.showCreateGroupLoading = true
                        },0)
                    }
                })
            },
			 /*标签筛选相关方法开始*/
			// getBuildTree(id) {
			// 	let obj = {
			// 		menuId: id
			// 	};
			// 	common.buildTree(obj).then(valid.call(this)).then(res => {
            //         if (res.ok) {
            //             this.tagListAll = res.data.data.children;
            //             if(id != '' ){ //指定标签
            //                 this.tagListAllCache1 = res.data.data.children
            //                 res.data.data.children.forEach((item, index)=>{
            //                     this.isSelectAll[item.id] = false
            //                 })
            //             }
            //             if(id == ''){//全局标签
            //                 this.tagListAllCache2 = res.data.data.children
            //                 res.data.data.children.forEach((item, index)=>{
            //                     this.isSelectAll[item.id] = false
            //                 })
            //             }
            //         }
            //     })
            //     .catch(errors.call(this))
            //     .finally(() => {});
			// },

            // //用于编辑模式，先展示已选标签
            // getBuildTreeForEdit(menuId, hasSelected) {
			// 	let obj = {
			// 		menuId: menuId
			// 	};
			// 	common.buildTree(obj).then(valid.call(this)).then(res => {
            //         if (res.ok) {
            //             let result = res.data.data.children;
            //             result.forEach((item1, key1) => {
            //                 item1.children.forEach((item2, key2) => {
            //                     if(hasSelected.indexOf(item2.id) > -1){ //已选标签
            //                         if(this.moreCheckList[item1.id]) {
            //                             let myArray = this.moreCheckList[item1.id]
            //                             myArray.push(item2.id)
            //                             let myArray2 = this.tagArr[item1.id]
            //                             myArray2.push(item2.title)
            //                             this.$set(this.moreCheckList, item1.id, myArray)
            //                             this.$set(this.tagArr, item1.id, myArray2)
            //                         } else {
            //                             this.$set(this.moreCheckList, item1.id,[item2.id] );
            //                             this.$set(this.tagArr, item1.id,[item2.title] );
            //                         }
            //                         this.tagList.push(item2.title)
            //                     }
            //                 });
            //             });
            //             sessionStorage.setItem("moreCheckListForGroup", JSON.stringify(this.moreCheckList));
			// 	        sessionStorage.setItem("tagArrForGroup", JSON.stringify(this.tagArr));
            //         }
            //     })
			// 	.catch(errors.call(this))
			// 	.finally(() => {});
            // },
            // //切换标签类别，重新渲染标签备选项
			// radioChange(val) {
			// 	this.menuId = val == "allTag" ? "" : this.pid;
            //     if(this.menuId != ''){ //指定标签
            //         if(this.tagListAllCache1.length){
            //             this.tagListAll = this.tagListAllCache1
            //         } else {
            //             this.getBuildTree(this.pid)
            //         }
            //     } 
            //     if(this.menuId == ''){//全局标签
            //         if(this.tagListAllCache2.length) {
            //             this.tagListAll = this.tagListAllCache2
            //         } else {
            //             this.getBuildTree();
            //         } 
            //     }
			// },
            // //打开选择标签模态框
			// limitTagClick() {
            //     if(sessionStorage.getItem("moreCheckListForGroup") && sessionStorage.getItem("tagArrForGroup")){
            //         this.moreCheckList = JSON.parse(sessionStorage.getItem("moreCheckListForGroup"));
            //         this.tagArr = JSON.parse(sessionStorage.getItem("tagArrForGroup"));
            //     }
            //     this.TagKind = "limitTag"
			// 	this.isActive = false;
            //     this.isActive1 = this.isShowDialog = true;
            //     this.tagListAll = this.tagListAllCache1
            //     //this.getBuildTree();

            //     //如果选择后点击了取消，重新打开页面的时候需要重新渲染全选状态
			// 	for(let i = 0;i < this.tagListAllCache1.length; i ++){ 
            //         let isSelectAllResult = true
            //         let cache1 = this.tagListAllCache1[i]
            //         if(this.moreCheckList[cache1.id] && this.moreCheckList[cache1.id].length > 0 ){
            //             for(let j = 0; j < cache1.children.length; j ++){ 
            //                 let index1 = this.moreCheckList[cache1.id].indexOf(cache1.children[j].id)
            //                 if(index1 == -1) {
            //                     isSelectAllResult = false
            //                     break;
            //                 }
            //             }
            //             this.isSelectAll[cache1.id] = isSelectAllResult
            //         } else {
            //             this.isSelectAll[cache1.id] = false
            //         }
            //     }
			// 	for(let i = 0;i < this.tagListAllCache2.length; i ++){
			// 		let isSelectAllResult = true
            //         let cache2 = this.tagListAllCache2[i]
            //         if(this.moreCheckList[cache2.id] && this.moreCheckList[cache2.id].length > 0 ){
            //             for(let j = 0; j < cache2.children.length; j ++){ 
            //                 let index1 = this.moreCheckList[cache2.id].indexOf(cache2.children[j].id)
            //                 if(index1 == -1) {
            //                     isSelectAllResult = false
            //                     break;
            //                 }
            //             }
            //             this.isSelectAll[cache2.id] = isSelectAllResult
            //         } else {
            //             this.isSelectAll[cache2.id] = false
            //         }
			// 	}
			// },
            // //清空当前模态框已选标签
			// clearLimit() {
			// 	sessionStorage.setItem("moreCheckListForGroup", JSON.stringify(this.moreCheckList));
			// 	sessionStorage.setItem("tagArrForGroup", JSON.stringify(this.tagArr));
			// 	this.moreCheckList = {};
			// 	this.tagArr = {};
			// },
            // //点击选择或取消选择一个标签,接收两个参数，所点标签对象以及所点标签所在组对象
            // selectItem(item,itemParent) {
            //     item.checked = !item.checked;
                
            //     let selected = this.moreCheckList[itemParent.id]
            //     let tagArrSelected = this.tagArr[itemParent.id]
            //     if(!selected) { //从来没有选中过该组的。则初始一下
            //         selected = []
            //     } 
            //     if(!tagArrSelected) { //从来没有选中过该组的。则初始一下
            //         tagArrSelected = []
            //     } 

            //     if(itemParent.isMultiselect != 1){ //允许多选
            //         let index = selected.indexOf(item.id);
            //         if (index == -1) {
            //             selected.push(item.id);
            //             tagArrSelected.push(item.title);

            //             //判断多选显示
            //             for(let i = 0;i < this.tagListAllCache1.length; i ++){ 
            //                 if(itemParent.id == this.tagListAllCache1[i].id ){
            //                     let isSelectAllResult = true
            //                     let cache1 = this.tagListAllCache1[i]
            //                     for(let j = 0; j < cache1.children.length; j ++){ 
            //                         let index1 = selected.indexOf(cache1.children[j].id)
            //                         if(index1 == -1) {
            //                             isSelectAllResult = false
            //                             break;
            //                         }
            //                     }
            //                     this.isSelectAll[cache1.id] = isSelectAllResult
            //                     break;
            //                 }
            //             }
            //             for(let i = 0;i < this.tagListAllCache2.length; i ++){
            //                 if(itemParent.id == this.tagListAllCache2[i].id ){
            //                     let isSelectAllResult = true
            //                     let cache2 = this.tagListAllCache2[i]
            //                     for(let j = 0; j < cache2.children.length; j ++){ 
            //                         let index1 = selected.indexOf(cache2.children[j].id)
            //                         if(index1 == -1) {
            //                             isSelectAllResult = false
            //                             break;
            //                         }
            //                     }
            //                     this.isSelectAll[cache2.id] = isSelectAllResult
            //                     break;
            //                 }
            //             }
            //         } else {
            //             selected.splice(index, 1);
            //             tagArrSelected.splice(index, 1);
            //             this.isSelectAll[itemParent.id] = false
            //         }
            //     } else { //只能单选
            //         let index = selected.indexOf(item.id);
            //         if (index == -1) {
            //             selected = [item.id];
            //             tagArrSelected = [item.title];
            //         } else {
            //             selected = [];
            //             tagArrSelected = [];
            //         }
            //     }
            
                

            //     this.$set(this.moreCheckList,itemParent.id, selected )
            //     this.$set(this.tagArr,itemParent.id, tagArrSelected )
			// },
            // //选择标签模态框，确定按钮
			// ok1() {
			// 	this.tagList = [];
			// 	sessionStorage.setItem("moreCheckListForGroup", JSON.stringify(this.moreCheckList));
			// 	sessionStorage.setItem("tagArrForGroup", JSON.stringify(this.tagArr));
                
            //     if (JSON.stringify(this.moreCheckList) == '{}') { //如果没有选中一个标签。显示不限
            //         this.isShow = this.isActive = true;
            //         this.isActive1 = false;
            //     } else {
            //         this.isActive1 = this.isShow = false;
            //         for(let myKey in this.tagArr){
            //             this.tagArr[myKey].forEach((item, key) => {
            //                 this.tagList.push(item);
            //             });
            //         }
            //     }
            //     let tagsArray = [];
            //     for(let key in this.moreCheckList) {
            //         this.moreCheckList[key].forEach((item, index)=>{
            //             tagsArray.push(item)
            //         })
            //     }
            //     this.createGroup.tags = tagsArray.join(',')
            //     this.moreCheckList = {};
            //     this.tagArr = {};
			// },
            // //选择标签模态框，取消按钮
			// cancel1() {
			// 	this.isActive = true;
            //     this.isActive1 = false;
            //     this.moreCheckList = {};
            //     this.tagArr = {};
			// },
            // /*标签筛选相关方法end*/
            
            // new 
            getTagName(val, val2) {
                this.tagList = val
                this.createGroup.tags = val2
            },
			 //服务组保存方法
			saveCreateGroup() {
				let obj = {
					studentId: this.createGroup.userId,
					startDate: this.createGroup.startDate.format('yyyy-MM-dd hh:mm:ss'),
					endDate: this.createGroup.endDate.format('yyyy-MM-dd hh:mm:ss'),
					phase: this.createGroup.phase.join(','),
					settings: JSON.stringify({
						'setting01': this.createGroup.setting01,  
						'setting02': this.createGroup.setting02,  
						'setting03': this.createGroup.setting03,  
						'setting04': this.createGroup.setting04,  
						'setting05': this.createGroup.setting05,  
						'setting06': this.createGroup.setting06,  
						'setting07': this.createGroup.setting07,
						'setting08': this.createGroup.setting08  
					}),
					name: this.createGroup.name,
                    tags: this.createGroup.tags,
                    menuId:this.pid
                }
                if(this.type == 'create') { //新建服务组不需要传递服务组ID。
                    obj.type = 0  // 服务组类型，0：服务组；1：讨论组  
                }
                if(this.type == 'edit') { //编辑服务组需要传递服务组ID。
                    obj.id = this.$route.params.gid //'f131dda304c247efa241ffab065241ac'
                    obj.type = this.createGroup.type
                }
                common.comServiceGroupSave(obj).then(valid.call(this)).then(res => {
				//plServiceGroup.saveCreateGroup(obj).then(valid.call(this)).then(res => {
					if(res.ok) {
                        this.showCreateGroup =  false
                        if(this.type == 'create'){//新建服务组
                            this.$emit('afterCreateGroupReload')
                        } else { //编辑服务组
                            this.$emit('editGroupSuccess',{
                                'setting01': this.createGroup.setting01,  
                                'setting02': this.createGroup.setting02,  
                                'setting03': this.createGroup.setting03,  
                                'setting04': this.createGroup.setting04,  
                                'setting05': this.createGroup.setting05,  
                                'setting06': this.createGroup.setting06,  
                                'setting07': this.createGroup.setting07,
                                'setting08': this.createGroup.setting08  
                            })
                        }
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
            },
            //获取服务阶段数据
			getGroupPhase () {
                let phaseObj = {
                    type: 'pl_service_status_phase'
                }
                sys.listData(phaseObj).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        this.checkboxGroupItem = res.data.data
                        if(this.type == 'create') {
                            this.createGroup.userId = this.studentInfo_userId //学生ID
                            this.createGroup.username = this.studentInfo_stuName //学生姓名
                            this.createGroup.telNumber = this.studentInfo_cellNumber //学生手机号
                            this.createGroup.ECNumber = this.studentInfo_ecID //学生EC号
                            this.createGroup.apply = this.studentInfo_applyTime //学生入学季
                            this.createGroup.name = this.studentInfo_stuName + '的服务组'
                            this.createGroup.phase= [this.pid]
                        }
                        if(this.type=='edit'){ //如果是编辑服务组，在获取成功后再执行获取详情
                            this.moreCheckList = {}
                            this.tagList =  []
                            this.tagArr =  {}
                            this.getGroupInfo()
                        }
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
            },
            //获取服务组详情内容
            getGroupInfo () {
                let obj = {
                    id: this.$route.params.gid // 'f131dda304c247efa241ffab065241ac'
                }
                //获取服务组详情内容
                //plServiceGroup.getGroupInfo(obj).then(valid.call(this)).then(res => {
                common.plGetGroupInfo(obj).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        let result = res.data.data.groupInfo
                        this.createGroup.userId = result.studentId //学生ID
                        this.createGroup.username = result.stuName //学生姓名
                        this.createGroup.telNumber = result.stuPhone //学生手机号
                        this.createGroup.ECNumber = result.stuEcId //学生EC号
                        this.createGroup.apply = result.applyTime //学生入学季
                        this.createGroup.tags = result.tags //学生标签  
                        this.createGroup.name = result.name //服务组名称
                        this.createGroup.startDate = result.startDate //服务开始时间
                        this.createGroup.endDate = result.endDate //服务结束时间
                        this.createGroup.type = result.type //服务组类别

                        let phaseList = res.data.data.phaseList
                        let myPhaseEditMap = {}
                        phaseList.forEach((item, index)=>{
                            for(let key in item) {
                                myPhaseEditMap[key]  = item[key]
                            }
                        })
                        this.phaseEditMap = myPhaseEditMap
                        if(result.phase) {
                            this.createGroup.phase = result.phase.split(',')  //服务阶段
                        }
                        if(this.createGroup.phase.indexOf(this.pid) < 0) {
                            this.createGroup.phase.push(this.pid)
                        }
                        if(result.settings) {
                            let setting = JSON.parse(result.settings)
                            for(let key in setting){
                                this.createGroup[key] = setting[key]
                            }
                        }

                        //let tags = "1020101,1020104,4010103"
                        this.moreCheckList = {}
                        this.hasSelected = this.createGroup.tags.split(',')
                        // this.getBuildTreeForEdit(this.pid, hasSelected)
                        // this.getBuildTreeForEdit('', hasSelected)
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
            //重置窗口数据
            resetCreateGroup() {
                this.createGroup.userId = '' //学生ID
                this.createGroup.username = '' //学生姓名
                this.createGroup.telNumber = '' //学生手机号
                this.createGroup.ECNumber = '' //学生EC号
                this.createGroup.apply = '' //学生入学季
                this.createGroup.tags = '' //学生标签
                this.createGroup.name = '' //服务组名称
                this.createGroup.startDate = '' //服务开始时间
                this.createGroup.endDate = ''  //服务结束时间
                this.createGroup.phase = []  //服务阶段
                this.createGroup.setting01 = true  //服务组设置项--总览
                this.createGroup.setting02 = true  //服务组设置项--人员
                this.createGroup.setting03 = true  //服务组设置项--任务
                this.createGroup.setting04 = true  //服务组设置项--文件
                this.createGroup.setting05 = true  //服务组设置项--甘特图
                this.createGroup.setting06 = true  //服务组设置项--日历
                this.createGroup.setting07 = true  //服务组设置项--账单
                this.createGroup.setting08 = true  //服务组设置项--记事本
                this.createGroup.settings = '非空字符串占位'

                /* 模态框内嵌标签选择相关参数 */
                this.isShow =  true
                this.isActive =  true
                this.isActive1 =  false
                this.num =  0
                this.isShowDialog =  false
                this.TagKind =  "limitTag"
                this.menuId =  this.pid
                this.tagList =  []
                this.tagListAll =  []
                this.moreCheckList =  {}
                this.tagArr =  {}
            },
			cancel() {

			}
		}
	}
</script>