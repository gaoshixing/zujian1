<style lang='less'>
    .formMeanSettingGSX {
        font-size: 14px;
        position: relative;
        .formSettingC {
            margin-top: 10px;
            .textAro {
                overflow: hidden;
                margin-top: 10px;
                .textArea {
                    margin-left: 90px;
                }
                .textSpan {
                    float: left;
                    width: 85px;
                    text-align: right;
                }
            }
           
            p {
                line-height: 57px;
                .nameC {
                    display: inline-block;
                    width: 85px;
                    text-align: right;
                    i {
                        color: red;
                    }
                }
                .editInfo {
                    color: #44bcb6;
                    font-style: normal;
                    margin: 0 10px;
                    cursor: pointer;
                }

            }
        }
        .filter {
            padding: 16px 0;
            position: relative;
            overflow: hidden;
            .myBorder1 {
                border: 1px solid #495060;
                padding: 2px 4px 0 4px;
                border-radius: 3px;
                width: 35px;
            }
            .myBorder2 {
                border: 1px solid #44bcb6;
                padding: 2px 4px 0 4px;
                border-radius: 3px;
                width: 35px;
            }
            
        }
        .table {
            width: 85%;
            float: left;
        }
        .tagList {
            width: 12%;
            padding-left: 1%; 
            float: left;
        }
        .full {
            width: 100%;
        }
    }
</style>

<template>
    <div class="formMeanSettingGSX">
        <Tabs @on-click="toggleSatus" v-model="tabValue">
			<TabPane label="表单设置" name="name1"></TabPane>
			<TabPane label="表单设计" name="name2"></TabPane>
			<TabPane v-if="isShowDataStatistics" label="数据管理" name="name3"></TabPane>
		</Tabs>
        <div class="formSettingC" v-if="tabValue=='name1'">
            <Form ref="formInline" :model="infor" :rules="ruleInfor" :label-width="85">
				<FormItem prop="name" label="表单名称：">
					<Input v-model="infor.name" placeholder="填写表单名称" style="width: 228px">
					</Input>
				</FormItem>
				<FormItem prop="groupId" label="表单类型：">
					<Select v-model="infor.groupId" style="width:228px" @on-change="useChange">
						<Option v-for="item in useList" :value="item.value" :key="item.id">{{ item.label }}</Option>
					</Select>
					<Select v-model="typeChild" multiple style="width:228px" v-if="isShowChild" @on-change="typeChildChange">
						<Option v-for="item in typeList" :value="item.value" :key="item.id">{{ item.label }}</Option>
					</Select>
				</FormItem>
				<FormItem prop="remarks" label="表单说明：">
					<Input v-model="infor.remarks" type="textarea" style="width:100%" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写备注"></Input>
				</FormItem>
			</Form>
            <!-- <p>
                <span class="nameC"><i>*</i> 表单名称：</span>
                <Input v-model="infor.name" placeholder="填写表单名称" style="width: 228px">
                </Input>
            </p>
            <p>
                <span class="nameC"><i>*</i> 表单类型：</span>
                <Select v-model="infor.groupId" style="width:228px" @on-change="useChange" >
                    <Option v-for="item in useList" :value="item.value" :key="item.id">{{ item.label }}</Option>
                </Select>
                <Select v-model="typeChild" multiple style="width:228px" v-if="isShowChild">
                    <Option v-for="item in typeList" :value="item.value" :key="item.id">{{ item.label }}</Option>
                </Select> -->
            <!-- <div v-if="infor.groupId == 'apply'">
                <p>
                    <span class="nameC"><i>*</i> 　　学校：</span>
                    <RadioGroup v-model="radioSchool" @on-change="schoolClick">
                        <Radio label="所有学校"></Radio>
                        <Radio label="部分学校"></Radio>
                    </RadioGroup>
                    <span v-if="checkS">您共选择了{{checkS}}所学校<i class="editInfo" @click="schoolClick">(修改)</i></span>
                </p>
                <p>
                    <span class="nameC"><i>*</i> 研究生院：</span>
                    <RadioGroup v-model="radioGraduate" @on-change="graduateClick">
                        <Radio label="所有学院"></Radio>
                        <Radio label="部分学院"></Radio>
                    </RadioGroup>
                    <span v-if="checkG">您共选择了{{checkG}}所研究生院<i class="editInfo" @click="graduateClick">(修改)</i></span>
                    
                </p>
                <p>
                    <span class="nameC"><i>*</i> 　　专业：</span>
                    <RadioGroup v-model="radioMajor" @on-change="MajorClick">
                        <Radio label="所有专业"></Radio>
                        <Radio label="部分专业"></Radio>
                    </RadioGroup>
                    <span v-if="checkM">您共选择了{{checkM}}所专业<i class="editInfo" @click="MajorClick">(修改)</i></span>
                    
                </p>
            </div> -->
            <!-- <div class="textAro">
                <span class="textSpan">表单说明：</span>
                <div class="textArea">
                    <Input v-model="infor.remarks" type="textarea" style="width:100%" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写备注"></Input>
                </div>
            </div> -->
            <Button type="primary"  @click="saveInfo" style="margin:30px 0 0 90px" size='large'>保存</Button>
        </div>
        <div v-if="tabValue=='name3'" style="over-flow:hidden">
            <div class="filter">
                <span  style="float:right" :class="[showCheckColumns ? 'myBorder1': 'myBorder2']" @click.stop="isShowCheckColumns">
                    <Icon type="funnel" size="26" :color="(showCheckColumns ?'':'#44bcb6')"></Icon>
                </span>
                <div style="float:right">
                    <Button type="primary" >删除</Button>&nbsp;
                    <!-- <Button type="primary" >修改</Button>&nbsp; -->
                    <Button type="primary" >上报</Button>&nbsp;
                    <Dropdown transfer @on-click="exportClick">
                        <Button type="primary" >导出</Button>&nbsp;
                        <DropdownMenu slot="list">
                            <DropdownItem name="exportCurr">导出当前</DropdownItem>
                            <DropdownItem name='exportAll'>导出所有</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    
                    <!--<Button type="primary" >导入</Button>&nbsp; -->
                    <!-- <Button type="primary" style="margin-right:20px">新建</Button>&nbsp; -->
                </div>
            </div>
            <div :class="{table: true, full: !showCheckColumns}" >
                <Table :columns="newColumns" :data="dataList" @on-row-click='rowClick' @on-select-all="selectAll" @on-select="selectCurr"></Table>
            </div>
            <div class="tagList" @click.stop="aa">
                <Checkbox-group v-if="showCheckColumns" v-model="tableColumnsChecked" @on-change="changeTableColumns" style="width:150px;">
                    <p  v-for="(item,index) in tableColumnsForCheck" :key="index">
                        <Checkbox :label="item.name">{{item.title}}</Checkbox>
                    </p>
                </Checkbox-group>
            </div>
        </div>
        <!-- <role-people
            :allPeople='allPeople'
            :selectPeople='selectPeople'
            @fresh="offrole"
            ref="rolepeople"
        > 
        </role-people> -->

    </div>
    
</template>

<script>
import valid, { errors, sys, common,  } from "../../libs/request"
// import rolePeople from './rolePeopleRadio';
export default {
    data() {
        const validateType = (rule, value, callback) => {
            if(value === '') {
                callback(new Error('表单类型不能为空'));
            } else if(this.typeChild.length==0) {
                callback(new Error('表单子类型不能为空'));
            } else {
                callback();
            }
        };
        return {
            typeChild: [],
            ids: '',
            allPeople: '',
            selectPeople: '',
            dataList: [],
            newColumns: [],
            checkM: 1,
            checkS: 2,
            group: '',
            checkG: 3,
            radioSchool: '所有学校',
            radioGraduate: '所有学院',
            radioMajor: '所有专业',
            showCheckColumns: false,
            tableColumnsChecked: [],
            tableColumnsForCheck: [
            ],
            columns: [],
            tabValue: 'name1',
            isShowChild: true,
            value: '',
            model1: '',
            model2: '',
            id: this.$route.query.id,
            value3: '',
            useList: [],
            typeList: [],
            infor: {
                groupId: '',
                tplType: '',
                name: '',
                remarks: ''
            },
            ruleInfor: {
                groupId: [{
                    required: true,
                    validator:validateType,
                    trigger: 'change'
                }],
                name: [{
                    required: true,
                    message: '表单名称不能为空',
                    trigger: 'blur'
                }]
            }
        }
    },
    components: {
        // rolePeople,
    },

    computed: {
        isShowDataStatistics() {
            return (this.group == 'com_form_tpl_kind_apply'||this.group =='com_form_tpl_kind_task') ? true : false
        }
    },

    mounted() {
        document.addEventListener("click", this.hiddenMore, false);
        this.getInfo()
    },

    methods:{
        aa() {

        },

        getInfo() {
            if(!this.id) {
                this.getByType()
                return
            }

            let obj = {
                id: this.id
            }
            common.getInfoFormMean(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.infor = res.data.data
                    this.typeChild = res.data.data.tplType.split(',')
                    this.group = res.data.data.groupId
                    this.getByType()
                    this.getTypeList(res.data.data.groupId, false)
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        getByType() {
            let obj = {
                type: 'com_form_tpl_kind'
            }
            sys.getByType(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                   this.useList = res.data.data
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        
        getTypeList(params, isAdd) {
            if(isAdd) {
                this.typeChild = ''
            }
            if(params == 'other') {
                this.isShowChild = false
                return
            }else {
                this.isShowChild = true
            }
            
            // let type
            // if(params == 'apply') {
            //     this.typeList = [
            //         {
            //             value: '1',
            //             id: '4566',
            //             label: '高中'
            //         },
            //         {
            //             value: '2',
            //             id: '4567',
            //             label: '本科'
            //         },
            //         {
            //             value: '3',
            //             id: '4568',
            //             label: '研究生'
            //         },
            //     ]
            //     return
            // }
            // switch(params) {
            //     case 'task': type = 'pl_task_tpl_type'; break;
            //     case 'handover': type = 'pl_handover_type'; break;  
            //     case 'apply': type = 'pl_apply_type'; break;  
            // }
            let obj = {
                type: params,
            }
            sys.getTypeList(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                   this.typeList = res.data.data
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        isShowCheckColumns() {
            this.showCheckColumns = !this.showCheckColumns
            return
        },

        hiddenMore() {
            this.showCheckColumns = false
        },

        toggleSatus(val) {
            if(val == 'name2') {
                if(!this.id) {
                    this.$Message.error('请填写必填项')
                    return
                }
                this.$router.push({
                    name: 'plan.xform',
                    params: {
                        fid: this.id
                    }
                })
            }
            if(val == 'name3') {
                let obj = {
                    id: this.id,
                    group:  this.group // 任务
                }
                common.dataManageList(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.handle(res.data.data)
                        this.tableColumnsForCheck = res.data.data.colums
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            }
        },

        handle(res) {
            this.columns = []
            this.columns = res.colums.map((item, key) => {
                let obj = {}
                obj.title = item.title
                obj.key = item.name
                obj.align = 'center'
                return obj
            })
            this.dataList = res.formData.map(item => {
                return item.data
            })
        },

        schoolClick(val) {
            this.allPeople = '所有学校信息'
            this.selectPeople = "已选学校信息"
            if(val == '所有学校') {
                this.checkS = ''
                return
            }
            this.chooseSchool()
        },

        graduateClick(val) {
            this.allPeople = '所有学院信息'
            this.selectPeople = "已选学院信息"
            if(val == '所有学院') {
                this.checkG = ''
                return
            }
            this.chooseSchool()
        },

        MajorClick(val) {
            this.allPeople = '所有专业信息'
            this.selectPeople = "已选专业信息"
            if(val == '所有专业') {
                this.checkM = ''
                return
            }
            this.chooseSchool()
        },

        offrole(val) {
            console.log(val)
        },

        chooseSchool() {
            this.$refs.rolepeople.show();
        },

        // chooseMajor() {
        //     this.$refs.rolepeople.show();
        // },

        useChange(val) {
            this.group = val
            this.getTypeList(val, true)
        },

        saveInfo() {
             this.$refs.formInline.validate((valid) => {
                    if (valid) {
						if(!this.infor.groupId || (!this.typeChild.length && this.isShowChild) || !this.infor.name) {
							this.$Message.error('请填写必填项')
							return
						}
						let obj = {
							name: this.infor.name,
							groupId: this.infor.groupId,
							tplType: this.typeChild.join(','),
							remarks: this.infor.remarks,
							id: this.id
						}
						this.save(obj)
                    } else {
                    }
                })
            // if(!this.infor.groupId || (!this.typeChild.length && this.isShowChild) || !this.infor.name) {
            //     this.$Message.error('请填写必填项')
            //     return
            // }
            // let obj = {
            //     name: this.infor.name,
            //     groupId: this.infor.groupId,
            //     tplType: this.typeChild.join(','),
            //     remarks: this.infor.remarks,
            //     id: this.id
            // }
            // this.save(obj)
        },

        changeTableColumns(val) {
            let arr = []
            arr = this.columns.reduce((prev, curr) => {
                val.forEach(item => {
                    if(item == curr.key) prev.push(curr)
                })
                return prev
            }, [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },])
            this.newColumns = arr
        },

        save(obj) {
            common.saveFormMean(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.id = res.data.message
                    this.$router.push({
                        name: 'plan.xform',
                        params: {
                            fid: this.id == 'undefind' ? res.data.message : this.id
                        }
                    })
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        typeChildChange(){
            this.$refs.formInline.validateField('groupId');
        },

        rowClick(index) {
            console.log(index)
        },

        selectAll(val) {
            this.ids = ''
            val.forEach(item => {
                this.ids += item.id + ','
            })
        },

        selectCurr(val) {
            this.ids = ''
            val.forEach(item => {
                this.ids += item.id + ','
            })
        },

        exportClick(val) {
            let obj = {
                id: this.id,
                group: this.group,
                ids: this.ids
            }
            if(val == 'exportCurr'&&!this.ids) {
                this.$Message.info('请选择数据')
                return
            }
            if(val == 'exportAll') {
                this.ids = ''
            }
            window.open(common.exportData(obj))
        }
    }
}
</script>

