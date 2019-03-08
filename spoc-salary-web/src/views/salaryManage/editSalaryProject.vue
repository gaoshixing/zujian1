<template>
    <div>
        <div class="edit-salary-project-boss" v-if="!isShowEquation">
            <Button type="primary" @click="onclickSave" class="edit-salary-pro-save" v-if="showSaveBtn">保存</Button>
            <ul class="edit-salart-pro-ul">
                <li>
                    <span>薪酬项目名称：</span>
                    <Input v-model.trim="editData.name" placeholder="请输入项目名称" style="width: 200px; height: 35px;"></Input>
                </li>
                <li>
                    <span>项目类型：</span>
                    <Select v-model="editData.projectType" placeholder="请选择项目类型" style="width:210px">
                        <Option v-for="item in proFilters" :value="item.value" :key="item.value" style="width:200px">{{ item.label }}</Option>
                    </Select>
                </li>
                <li>
                    <span>展示类型：</span>
                    <Select v-model="editData.showType" placeholder="请选择展示类型" style="width:210px">
                        <Option v-for="item in showFilters" :value="item.value" :key="item.value" style="width:200px">{{ item.label }}</Option>
                    </Select>
                </li>
                <li>
                    <span>显示顺序：</span>
                    <Input v-model="editData.showOrder" placeholder="请输入显示顺序" style="width: 200px; height: 35px;"></Input>
                </li>
                <li>
                    <span>启用状态：</span>
                    <p>
                        <i-switch v-model="isUseing" style="margin-right: 10px;"></i-switch>
                        {{ isUseing ? '开启' : '关闭' }}
                    </p>
                </li>
                <li>
                    <span>是否计算项：</span>
                    <p>
                        <RadioGroup v-model="isMath">
                            <Radio label="1"  style="font-size: 14px;">是</Radio>
                            <Radio label="0"  style="font-size: 14px;">否</Radio>
                        </RadioGroup>
                    </p>
                </li>
                <li v-if="editData.isMath === '0'">
                    <span>导入时是否必填：</span>
                    <p>
                        <RadioGroup v-model="editData.isModify">
                            <Radio label="1"  style="font-size: 14px;">是</Radio>
                            <Radio label="0"  style="font-size: 14px;">否</Radio>
                        </RadioGroup>
                    </p>
                </li>
                <li v-if="editData.isMath === '1'">
                    <span>计算公式：</span>
                    <p class="calc-formula">{{editData.expressTxt}}</p>
                </li>
            </ul>
            <Button type="primary" class="edit-calc-formula" @click="onclickEditCalcFormula" v-if="isMath === '1'">{{text}}</Button>
        </div>
        <edit-equation v-else :baseInfoObj="editData" @volidSucc='volidSucc'></edit-equation>
    </div>
</template>

<script>
import { mapMutations, } from 'vuex';
import valid, { errors, sys, common, salaryManageApi, } from '../../libs/request';
import editEquation from '../equation/editEquation'
export default {
    name: 'EditSalaryProject',
    data() {
        return {
            type: null,
            text: '编辑计算公式',
            isMath: -1,
            isShowEquation: false,
            showSaveBtn: true,
            editData: {
                colKey: "",
                createDate: new Date().format('yyyy-MM-dd hh:mm:ss'),
                expressContent: null,
                expressTxt: null,
                id: "",
                isInitShow: "1",
                isMath: "-1",
                isModify: "1",
                isUse: "1",
                name: '',
                projectType: "-1",
                remarks: null,
                ruleId: "1",
                showOrder: null,
                showType: "",
                type: "1",
                updateDate: new Date().format('yyyy-MM-dd hh:mm:ss'),
            },
            isUseing: true,
            proFilters: [],
            showFilters: [],
        };
    },

    components: {
        editEquation,
    },

    watch: {
        isUseing(newVal) {
            this.editData.isUse = newVal ? '1' : '0';
        },
        isMath(newVal) {
            this.editData.isMath = newVal;
            if (newVal === '1' && this.type === 'add') {
                this.showSaveBtn = false;
                this.text = '进入下一步，编辑公式';
            }
            if (newVal === '0' && this.type === 'add') {
                this.showSaveBtn = true;
            }
            if (newVal === '1' && this.type === 'edit') {
                this.editData.isModify = '0';
            }
        },
        isShowEquation(newVal) {
            if (!newVal) {
                if (this.isMath === '1' && this.type === 'add' && this.editData.expressContent) {
                    this.showSaveBtn = true;
                }
            }
        },
    },
    created() {
        this.type = this.$route.query.type;
        if (this.type === 'edit') this.salaryManageForm({id: this.$route.query.id});
        Promise.all([
            this.getDict('show'),
            this.getDict('pro'),
        ]);
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),

        onclickSave() {
            this.saveSalaryManage();
        },
        /*
        * 点击编辑公式
        */
        onclickEditCalcFormula() {
            if (!this.checkInfos()) return;
            if (this.text !== '编辑计算公式') {
                this.stepSave();
            } else {
                this.isShowEquation = true;
            }
            
        },
        /*
        * 获取详情
        */
        salaryManageForm(data) {
            this.updateLoadingStatus({isLoading:true});
            salaryManageApi.salaryManageForm(data).then(valid.call(this)).then(res => {
                if (res.ok) {
                    this.editData = res.data.data;
                    this.isUseing = this.editData.isUse === '1' ? true : false;
                    this.isMath = this.editData.isMath;
                }
            }).catch(errors.call(this)).finally(() => this.updateLoadingStatus({isLoading:false}));
        },
        stepSave() {
            this.updateLoadingStatus({isLoading:true})
            salaryManageApi.saveStep(this.editData).then(valid.call(this)).then(res => {
                if (res.ok) {
                    this.editData.id = res.data.data;
                    this.isShowEquation = true;
                }
                
            }).catch(errors.call(this)).finally(() => this.updateLoadingStatus({isLoading:false}));
        },
        /*
        * salaryManageSave 保存规则
        */
        saveSalaryManage() {
            if (!this.checkInfos()) return;
            this.updateLoadingStatus({isLoading:true});
            salaryManageApi.salaryManageSave(this.editData).then(valid.call(this)).then(res => {
                if (res.ok) {
                    this.$Message.success(res.data.message);
                    this.$router.go(-1);
                }
            }).catch(errors.call(this)).finally(() => this.updateLoadingStatus({isLoading:false}));
        },
        /*
        * 字典获取
        */
        getDict(type) {
            const data = type === 'pro' ? { type: 'sal_col_manage_project_type' } : { type: 'sal_col_manage_show_type' };
            sys.dictListData(data).then(valid.call(this)).then(res => {
                const tempArr = [];
                res.data.data.forEach(item => {
                    tempArr.push({
                        label: item.label,
                        value: item.value,
                    });
                });
                if (type === 'pro') {
                    this.proFilters = tempArr;
                }
                if (type === 'show') {
                    this.showFilters = tempArr;
                }
            }).catch(errors.call(this));
        },
        checkInfos() {
            const regexp = /^[\u4E00-\u9FA5A-Za-z].{1,200}$/;
            const invalidArr = [ '+', '-', '*', '/', '.', '@', '#', '=',  '>', '<', '(', ')', ]; // 项目不可以包含这些字符
            let onOff = true;
            invalidArr.forEach(code => {
                if (this.editData.name.includes(code)) {
                    this.$Message.error(`项目名称不可以包含 ${code}`);
                    onOff = false;
                }
            });
            if (!onOff) return false;
            if (this.editData.name.length < 2 || this.editData.name.length > 200) {
                this.$Message.error('项目名称长度应在2~200个字符之间');
                return false;
            }
            if (!regexp.test(this.editData.name)) {
                this.$Message.error('项目名称不能以数字开头');
                return false;
            }
            if (!this.editData.showType) {
                this.$Message.error('请选择展示类型');
                return false;
            }
            if (this.editData.showOrder != 0 && !this.editData.showOrder) {
                this.$Message.error('请输入显示顺序');
                return false;
            }
            return true;
        },
        // 验证通过
        volidSucc(val, val1, val2) {
            this.editData.expressTxt = val
            this.editData.expressContent = val1
            this.editData.preciseWay = val2
            this.isShowEquation = false
        }
    },
};
</script>

<style lang="less">
    .edit-salary-project-boss {
        position: relative;
        .edit-salary-pro-save {
            position: absolute;
            top: 15px;
            right: 30px;
            width: 100px;
            height: 35px;
        }
        .edit-salart-pro-ul {
            padding-top: 60px;
            margin-bottom: 20px;
            > li {
                color: #333;
                list-style: none;
                margin-bottom: 20px;
                position: relative;
                padding-left: 150px;
                > span {
                    display: inline-block;
                    color: #999;
                    font-size: 14px;
                    width: 130px;
                    height: 35px;
                    text-align: right;
                    line-height: 35px;
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
                .ivu-input {
                    height: 35px;
                }
                > p {
                    display: inline-block;
                    min-width: 200px;
                    max-width: 750px;
                    line-height: 35px;
                    word-break: break-word;
                    font-size: 14px;
                }
                .calc-formula {
                    line-height: 18px;
                }
            }
        }
        .edit-calc-formula {
            margin-left: 150px;
        }
    }
</style>
