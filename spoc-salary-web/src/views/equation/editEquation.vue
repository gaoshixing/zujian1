<style lang='less'>
    .equation-GSX-aro {
        border-top: 1px solid #e0e0e0;
        padding-top: 20px;
        .equation-base-left {
            height: 90vh;
            .base-title {
                font-size: 16px;
                line-height: 24px;
                margin-bottom: 35px;
                font-weight: bold;
            }
            width: 215px;
            display: inline-block;
            border-right: 1px solid #e0e0e0;
        }
        .ivu-collapse {
            border: none;
        }
        .ivu-collapse > .ivu-collapse-item > .ivu-collapse-header {
            background-color: #fff;
            padding-left: 0;
            color: #5c5c5c;
            font-size: 14px;
            height: 44px;
            line-height: 44px;
            .ivu-icon-arrow-right-b {
                color: #d9d9d9;
            }
        }
        .ivu-collapse > .ivu-collapse-item {
            border-top: none;
        }
        .ivu-collapse-content {
            padding-left: 0px; 
        }
        .ivu-collapse-content > .ivu-collapse-content-box {
            padding: 0;
            padding-left: 0px;
        }
        .base-item {
            line-height: 32px;
            padding-left: 16px;
            cursor: pointer;
            font-size: 13px;
        }
        .base-item:hover {
            background-color: #ebf8f6;
            color: #44bcb7;
            border-right: solid 4px #44bcb7;
            box-sizing: border-box;
        }
        .equation-content-right {
            font-size: 14px;
            display: inline-block;
            vertical-align: top;
            padding-left: 30px;
            width: 820px;
        }
        .equation-name {
            line-height: 50px;
            .title {
                color: #b8b8b8;
                margin-right: 10px;
            }
        }
        .equation-control {
            padding: 20px 120px 13px;
            background-color: #f1f1f1;
            margin-top: 3px;
            overflow: hidden;
            .control-left , .control-middle , .control-right {
                display: inline-block;
                justify-content: space-between;
                float: left;    
                flex-wrap: wrap;
                margin-right: 50px;
                display: flex;
                width: 182px;
                .control-num {
                    cursor: pointer;
                    width: 38px;
                    display: inline-block;
                    text-align: center;
                    height: 28px;
                    margin-bottom: 7px;
                    line-height: 28px;
                    border: 1px solid #e0e0e0;
                }
                .control-num:nth-child(13) {
                    width: 84px;
                }
            }
            .control-middle {
                width: 90px;
            }
            .control-right {
                width: 128px;
            }
        }
    }
    .advanced-list-modal {
        .ivu-modal-footer {
            display: none;
        }
        .advanced-list-ul {
            max-height: 400px;
            overflow: hidden;
            overflow-y: scroll;
            p {
                position: relative;
                padding-left: 20px;
                &::before {
                    content: '';
                    display: block;
                    width: 9px;
                    height: 8px;
                    background-image: url('../../assets/img/dsj.png');
                    background-size: 100% 100%;
                    position: absolute;
                    left: 7px;
                    top: 4px;
                }
            }
            li {
                list-style: none;
                height: 32px;
                line-height: 32px;
                width: 200px;
                margin-left: 32px;
                cursor: pointer;
                &:hover {
                    background-color: #ebf8f6;
                    color: #44bcb7;
                    border-right: solid 4px #44bcb7;
                    box-sizing: border-box;
                }
            }
        }
    }
</style>
<template>
    <div class="equation-GSX-aro">
        <div class="equation-base-left" >
            <p class="base-title">数据集</p>
            <Collapse v-model="value1">
                <Panel :name="base.title" v-for="(base, index) in baseList" :key="index">
                    {{base.title}}({{base.children.length}})
                    <p slot="content" class="base-item" v-for="(baseItem, index) in base.children" :key="index"  @dblclick="baseItemdb($event, baseItem)">
                        {{baseItem.name}}
                    </p>
                </Panel>
            </Collapse>
        </div>
        <div class="equation-content-right">
            <p class="equation-name">
                <span class="title">公式名称：</span> {{baseInfoObj.name}}
                <span class="title" style="margin-left:25px">精确方式：</span>
                <Select v-model="model1" style="width:238px">
                    <Option v-for="item in preciseList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Button type="primary"  style="float:right;margin-top:10px;padding:7px 30px" @click="okEquation">确认</Button>
            </p>
            <Input v-model="value6" type="textarea" id="input-textarea" :rows="18" style="padding:5px 0; resize: none;" placeholder="请输入薪酬计算公式" />
            <div class="equation-control">
                <div class="control-left">
                    <span class="control-num" @click="controlClick(item)" v-for="(item, index) in baseNum" :key="index">{{item.name}}</span>
                </div>
                <div class="control-middle">
                    <span class="control-num" @click="controlClick(item)" v-for="(item, index) in symbolList" :key="index">{{item.name}}</span>
                </div>
                <div class="control-right">
                    <span class="control-num" @click="controlClick(item)" style="width:58px" v-for="(item, index) in statusList" :key="index">{{item.name}}</span>
                </div>
            </div>
        </div>
        <Modal
            title="数据集"
            v-model="showAdvanced"
            width=500
            class="advanced-list-modal">
            <ul class="advanced-list-ul">
                <p>高级</p>
                <li v-for="(item, index) in advancedList" :key="index" @dblclick="dblclickAdvancedItem(item)">{{item.name}}</li>
            </ul>
        </Modal>
    </div>
</template>

<script>
    import valid, { errors,
        sys, 
        common,
        attendanceManageApi,
        salPerpetualCalenderRest,
        equation,
        salUserBasicInfo } from '../../libs/request';

    export default {
        props: {
            baseInfoObj: {
                type: Object,
                default: {}
            }
        },

        data() {
            return  {
                textarea: null,
                advancedList: [],
                advancedListName: [],
                showAdvanced: false,
                baseNum: [
                    {name: 1},
                    {name: 2},
                    {name: 3},
                    {name: '+'},
                    {name: 4},
                    {name: 5},
                    {name: 6},
                    {name: '-', type: 'fh'},
                    {name: 7},
                    {name: 8},
                    {name: 9},
                    {name: '*', type: 'fh'},
                    {name: 0},
                    {name: '.', type: 'fh'},
                    {name: '/', type: 'fh'},
                ],
                symbolList: [
                    {name: '=', type: 'fh'},
                    {name: '<>', type: 'zw'},
                    {name: '<', type: 'zw'},
                    {name: '>', type: 'zw'},
                    {name: '<=',type: 'zw'},
                    {name: '>=', type: 'zw'},
                    {name: '(', type: 'zw' },
                    {name: ')', type: 'zw'},
                ],
                statusList: [
                    {name: '如果', type: 'zw'},
                    {name: '那么', type: 'zw'},
                    {name: '再虑', type: 'zw'},
                    {name: '其余', type: 'zw'},
                    {name: '并且', type: 'zw'},
                    {name: '或者', type: 'zw'},
                    {name: '同时', type: 'zw'},
                    {name: '高级', type: 'zw'},
                ],
                value6: '',
                preciseList: [],
                model1: '',
                baseStr: '',
                value1: '',
                baseList: [],
                baseObj: {},
            }
        },

        mounted() {
            if (this.baseInfoObj.expressTxt) this.value6 = this.baseInfoObj.expressTxt
            if (this.baseInfoObj.preciseWay) this.model1 = this.baseInfoObj.preciseWay
            this.getLeftMean()
            this.getSys()
            this.textarea = document.getElementById('input-textarea').getElementsByTagName('textarea')[0];
            this.getSeniorFun();
        },

        methods: {
            getLeftMean() {
                equation.getColAll({type:1}).then(valid.call(this)).then(res => {
                    if (res.ok) {
                        const rdata = res.data.data;
                        for (let i = 0; i < rdata.length - 1; i++) { // 排序后保证全字符匹配
                            for (let j = 0; j < rdata.length - 1 - i; j++) {
                                if (rdata[j + 1].name.length > rdata[j].name.length) {
                                    const tempVal = rdata[j];
                                    rdata[j] = rdata[j + 1];
                                    rdata[j + 1] = tempVal;
                                }
                            }
                        }
                        this.baseObj = rdata
                        this.handleDate(rdata)
                    }
                }).catch(errors.call(this));
            },

            handleDate(val) {
                Object.values(val).forEach(item => {
                    let onOff = false
                    let index =  this.baseList.length
                    this.baseList.forEach((baseItem, key) => {
                        if (baseItem.title == item.showTypeName) {
                            index = key
                            onOff = true
                        }
                    })
                    if (!this.baseList[index]) this.baseList[index] = {}
                    if (!onOff) this.$set(this.baseList[index], 'title', item.showTypeName)
                    if (!this.baseList[index].children) this.baseList[index].children = []
                    this.baseList[index].children.push(item)
                })
                this.baseList.splice(0, 0)
            },

            getSys() {
                let obj = {
                    types: 'sal_col_manage_precise_way'
                }
                sys.batchListData(obj).then(valid.call(this)).then(res=>{
                    if (res.ok) {
                        this.preciseList = res.data.data.sal_col_manage_precise_way
                    }
                }).catch(errors.call(this));
                
            },

            baseItemdb(ev,item) {
                this.getCursorPostion(item, 0);
            },
            dblclickAdvancedItem(item) {
                this.showAdvanced = false;
                this.getCursorPostion(item, 1);
            },
            okEquation() {
                let index = 0;
                let str = this.value6;
                // str = str.replace(/([0-9|.]+)|\+|\-|\*|\/|=/g, function(word){
                //     return word+'@'
                // });
                Object.values(this.baseObj).forEach(item => {
                    str = str.split(item.name).join(item.colKey);
                });
                this.advancedList.forEach(item => {
                    str = str.split(item.preName).join(item.colKey);
                });
                let str1 = str
                this.statusList.forEach(item => {
                    //str1 = str1.replace(item.name, '');
                    str1 = str1.split(item.name).join('');
                });
                console.log(str1)
                if (str1.match(/[\u4e00-\u9fa5]/) && str1.match(/[\u4e00-\u9fa5]/).length) {
                    this.$Message.error('非法字符')
                    return
                }

                this.verifySave(str)
                
            },

            verifySave(str) {

                if (!this.model1) {
                    this.$Message.error("请选择精确类型")
                    return
                }

                if (!this.dealAdvancedValues(this.regExpVal(this.value6))) return; // 高级数据集的输入验证

                let finalStr = str;
                let finalValue6 = this.value6;

                finalStr = finalStr.replace(/\(/g, '#');
                finalStr = finalStr.replace(/\)/g, '#');
                finalStr = finalStr.replace(/\,/g, '!');
                /* finalValue6 = finalValue6.replace(/\(/g, '#');
                finalValue6 = finalValue6.replace(/\)/g, '#');
                finalValue6 = finalValue6.replace(/\,/g, '!'); */

                let obj = {
                    expressContent: finalStr,
                    expressTxt: finalValue6,
                    preciseWay: this.model1,
                }
                equation.verifySave(obj).then(valid.call(this)).then(res => {
                    if (res.ok) {
                        res.data.message && this.$Message.success(res.data.message);
                        this.$emit('volidSucc', finalStr, finalValue6, this.model1)
                    }
                }).catch(errors.call(this));
            },
            
            controlClick(item) {
                this.getCursorPostion(item, 0);
            },
            /*
            * 获取光标位置
            */
            getCursorPostion(item, len) {
                let index = this.textarea.selectionStart;
                const tempArr = this.value6.split('');
                if (item.name === '高级') {
                    this.showAdvanced = true;
                    return;
                } else {
                    tempArr.splice(index, 0, item.name);
                }
                this.value6 = tempArr.join('');
                index += String(item.name).length;
                this.textarea.focus();
                setTimeout(() => {this.textarea.selectionStart = this.textarea.selectionEnd = index - len;});
            },
            /*
            * getSeniorFun
            */
            getSeniorFun() {
                equation.getSeniorFun({type:1}).then(valid.call(this)).then(res => {
                    if (res.ok) {
                        this.advancedList = res.data.data;
                        this.advancedList.forEach(item => {
                            item.preName = item.name;
                            this.advancedListName.push(item.name);
                            item.name += '()';
                        });
                    }
                }).catch(errors.call(this)).finally(errors.call(this));
            },
            /*
            * 正则 验证 括号内用户输入的值
            */
            regExpVal(str) {
                let tempObj = {};
                const tempArrObj = [];
                this.advancedListName.forEach(item => {
                    const tempArr = str.split(item + '('); // 长度 上月 最大值
                    if (tempArr.length > 1) {
                        tempArr.forEach((val, index) => {
                            if (index >= 1) {
                                tempObj[item] = val.split(')')[0]
                                tempArrObj.push(tempObj);
                                tempObj = {};
                            }
                        });
                    }
                });
                return tempArrObj;
            },
            /*
            * 判断处理高级数据集的准确性
            * @params val Array[Object]
            */
            dealAdvancedValues(val) {
                let onOff = true;
                val.forEach((item,index) => {
                    const key = Object.keys(item)[0];
                    if (key === '长度') {
                        if (item[key] !== '身份证号') {
                            this.$Message.error(`高级数据集的${key}只能输入身份证号`);
                            onOff = false;
                        }
                    }
                    if (key === '上月') {
                        if (!item[key] && item[key] !== '0' || isNaN(item[key]) || item[key].split(',').length > 1) {
                            this.$Message.error(`高级数据集的${key}应输入单个数字`);
                            onOff = false;
                        }
                    }
                    if (key === '最大值') {
                        if (item[key].split(',').length <= 1) {
                            this.$Message.error(`高级数据集的${key}至少应输入两个数字,并用 ，进行分隔`);
                            onOff = false;
                        }
                    }
                });
                return onOff;
            },
        },
    }
</script>

