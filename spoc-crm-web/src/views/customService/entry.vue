<style lang="less">
.entry-container{
    @caseBar: 260px;
    position: relative;display:flex;border-top: 1px solid #e0e0e0;
    .entey-detail{
        @h: 52px;
        flex: 1;padding-right: 20px;border-right: 2px solid #e0e0e0;padding-bottom: 80px;
        h2{
            height: @h;
            font-weight: normal;font-size: 14px;color: #333;
            .ivu-icon{
                cursor: pointer;
            }
        }
        .title{
            line-height: @h;
        }
        .icon-up{
            // transition: linear .2s all;
            transform:rotate(0);display: inline-block;
            &.active{
                transform:rotate(180deg);
            }
        }
        .urgent{
            float: right;margin-top: 26px;
            color: #f33;
            span{
                margin-right: 2px;
            }
        }
    }
    .entry-case-bar{
        width: @caseBar;padding-bottom: 80px;
    }
    .count{
        @h:32px;
        height: @h;line-height: @h;
        text-align: center;font-size: 14px;color: #333;
        span{
            font-size: 18px;color: #f66;
        }
    }
    .crm-btns{
        position: fixed;right: 20px;bottom: 0;z-index: 99999;left: 290px + 10px;
        height: 50px;padding-top: 8px;
        background: #e7ebf1;text-align: center;
        &.leftclosed{
            left: 60px + 10px;
        }
        button{
            width: 90px;height: 34px;margin: 0 20px;
            font-size: 14px;
        }
    }
    .entry-from{
        zoom: 1;flex-wrap: wrap;display:flex;
        &:after,&::before{
            content: '';display: table;clear: both;visibility: hidden;font-size: 0;height: 0;
        }
        .ivu-form-item{
            width: 50%;
        }
    }
    .phone-lists{
        margin-top: 8px;position: relative;
        &:first-child{
            margin-top: 0;
        }
        .select-country{
            position: absolute;left: 0;top: -1px;
            width: 100px;
            .ivu-select-dropdown{ 
                width: 220px !important;left: 0 !important; 
            } 
        }
        .inputBox{
            padding-left: 106px;padding-right: 30px;
        }
        .btn{
            @h: 20px;
            position: absolute;right: 0;top: 5px;
            width: @h;height: @h;line-height: @h;
            text-align: center;border-width: 1px;border-style: solid;
            color: #d8dde5;cursor: pointer;border-radius: 3px;
            &:hover{
                color: #333;
            }
        }
        .show-num{
            position: absolute;right: 31px;bottom: 1px;top: 1px;padding-right: 6px;padding-left: 6px;
            border-radius: 3px;cursor: pointer;
            color: #f00;background: #fff;
            &:hover{
                color: #de0202;
            }
        }
    }
    .ivu-input.error{
        border: 1px solid #ed3f14;
    }   
}
</style>

<template>
<div class="entry-container">
    <div class="entey-detail">
        <div class="count" v-if="newHandOver">今日已录入 <span v-text="count"></span> 条信息</div>
        <h2>
            <span class="title">基本信息</span>
            <Checkbox v-model="urgentFlag" :disabled="urgentDisabled" class="urgent">加急</Checkbox>
        </h2>
        <Form ref="form" :model="form" :rules="ruleValidate" :label-width="100" class="entry-from">
            <FormItem label="编号：" prop="cusCode">
                <Input v-model="form.cusCode" disabled/>
            </FormItem>
            <FormItem label="关键词：" prop="keyword">
                <Input :maxlength="100" v-model="form.keyword"/>
            </FormItem>
            <FormItem label="客户姓名：" prop="name">
                <Input :maxlength="100" v-model="form.name"/>
            </FormItem>
            <FormItem label="申请国家：" prop="applyCountry">
                <Input :maxlength="100" v-model="form.applyCountry"/>
            </FormItem>
            <FormItem label="电话号码：">
                <div v-for="(item, index) in phoneLists" :key="'phone' + item" class="phone-lists">
                    <div class="select-country">
                        <Select v-model="form.crmSafeBoxList[index].locId" filterable @on-change="changeCountry(form.crmSafeBoxList[index].locId, index)" :disabled="fromPond"> 
                            <Option v-for="(city, index) in cityList" :value="city.id ? city.id : 0"  
                                :key="index + 'city' + city.id">{{ city.areaCodeShow + '&nbsp;&nbsp;&nbsp;' + city.name }}</Option> 
                        </Select> 
                    </div>
                    <div class="inputBox">
                        <input v-model="form.crmSafeBoxList[index].phone" type="text" :disabled="fromPond"
                        @blur="checkPhone(form.crmSafeBoxList[index], index)" 
                        @keydown="enterPhone('phone',form.crmSafeBoxList[index], index)"
                        @focus="changePhone()"
                        class="ivu-input"
                        :class="[form.crmSafeBoxList[index].error ? 'error' : 'success']">
                    </div>
                    <span @click="addOrDelPhone(item, index)" class="btn" v-if="index >= phoneOldListsLength || index == 0">
                        <Icon type="plus" v-if="index == 0"/>
                        <Icon type="minus" v-else/>
                    </span>
                </div>
            </FormItem>
            <FormItem label="微信：" prop="wechat">
                <input :maxlength="100" v-model="form.wechat" type="text" class="ivu-input"
                @blur="checkWechat(form.wechat)" 
                @keydown="enterPhone('wechat',form.wechat)"
                @focus="changeWechat()"
                :class="[wechatError ? 'error' : 'success']">
            </FormItem>
            <FormItem label="地区：" prop="city">
                <cityarea ref="city" :cou.sync="form.country" :pro.sync="form.province" :ci.sync="form.city"/>
            </FormItem>
            <FormItem label="QQ：" prop="qq">
                <Input :maxlength="100" v-model="form.qq"/>
            </FormItem>
            <FormItem label="邮箱：" prop="email">
                <Input :maxlength="100" v-model="form.email"/>
            </FormItem>
            <FormItem label="就读学校：" prop="school">
                <Input :maxlength="100" v-model="form.school"/>
            </FormItem>
            <FormItem label="申请阶段：" prop="apply">
                <Select v-model="form.apply">
                    <Option v-for="item in applyLists" :value="item.value" :key="'apply' + item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
        </Form>
        <Form ref="form2" :model="form" :label-width="100">
            <FormItem label="地址：" prop="address">
                <Input :maxlength="1000" v-model="form.address"/>
            </FormItem>
            <FormItem label="备注：">
                <Input :maxlength="2000" v-model="form.remarks" type="textarea" :autosize="{minRows: 3,maxRows: 5}"/>
                <picture-modal v-if="showPictureModal" :setimg="setimg" ref="picture" @onChangPicture="changPicture"></picture-modal>
            </FormItem>
        </Form>
        <h2>
            <span class="title">聊天记录</span>
            <span @click="toggleRecord()" class="icon-up" :class="[messageShow ? '' : 'active']">
                <Icon type="chevron-up"></Icon>
            </span>
        </h2>
        <div class="chatRecord" v-show="messageShow">
            <Input v-model="form.message" type="textarea" :rows="row"/>
        </div>
    </div>
    <div class="entry-case-bar">
        <label-filter :actived="form.tags" @ok="checkLabel" @setSourTags="setSourTags" ref="filter" :changeFlag="!fromPond" :formSel="source" :disabledMap="disabledMap"></label-filter>
    </div>
    <div class="crm-btns" :class="[leftclosed ? 'leftclosed' : '']">
        <Button @click="cancelForm('form')" v-text="cancelText"></Button>
        <Button type="primary" @click="submitForm('form')" :disabled="!canSave">确定</Button>
    </div>
</div>
</template>

<script>
import {mapMutations,mapState} from 'vuex';
import valid, {errors, crmCustomer, crmCustomerImport, sys} from '../../libs/request.js';
import LabelFilter from '../../modules/userTags.vue';
import pictureModal from './components/picture.vue'
import cityarea from '../../modules/cityarea';

export default {
    data(){
        return {
            disabledMap: {
                '8030': false
            },
            cancelText: '重置',
            cusCode: '',
            marketId: '',
            row: 10,
            wechatError: false,//微信错误标识
            newHandOver: true, //true为新建表单，false为编辑表单
            canSave: false, //是否可以保存
            leftclosed: false, //left menu是否打开状态
            count: 0,
            urgentFlag: false,
            urgentDisabled: false,
            phoneLists: 1, //默认1个电话输入框
            phoneOldLists: [], //编辑表单时暂存之前的电话号码
            phoneOldListsLength: 1,
            applyLists: [],//申请阶段列表
            cityList: [],
            messageShow: true, // 默认显示聊天记录
            firstFindMessage: true, //第一次打开聊天记录下拉框
            cityload:0,
            firstCountryId: '7',
            focusFlag: false,
            oldWechat: '', //编辑状态暂存微信
            cityTree:{
                country:[],
                province:[],
                city:[],
            },
            cusCodeFlag: '',
            form: {
                isHot: 0, 
                cusCode: '', 
                keyword: '', 
                name: '', 
                province: '', 
                city: '', 
                country: '', 
                crmSafeBoxList: [ 
                    { 
                        id: '',
                        phone: '',
                        sort: 1,
                        error: false,
                        district: '',
                        encryption: false,
                        locId: ''
                    } 
                ], 
                qq: '', 
                wechat: '', 
                email: '', 
                applyCountry: '', 
                apply: '', 
                remarks: '', 
                message: '', 
                sourTags: '',//客户来源 
                tags: [], ///标签id 
                address: '',
                school: '',
            },
            save: {},
            ruleValidate: { //验证规则
                email: [
                    { required: false, trigger: 'blur' },
                    { type: 'string',pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message:'邮箱格式不对', trigger:'blur'},
                ],
                qq: [
                    { required: false, trigger: 'blur' },
                    { type: 'string',pattern:/^[0-9]*$/, message:'QQ格式不对', trigger:'blur'},
                ]
            },
            marketList: {},
            source:false,
            fromPond: false,
            phoneSuccess: false, //电话验证通过
            picIds: [],
            setimg: [],
            showPictureModal: false,
        };
    },
    components: {
        LabelFilter, pictureModal, cityarea
    },
    created() {
        this.init();
    },
    mounted(){
        this.cusCode = this.$route.query.cusid;
        this.marketId = this.$route.query.marketId;
        this.fromPond = this.$route.query.noEdit ? true : false;
        // console.log(this.fromPond)
        this.source = this.$route.query.source ? true : false;
        
        if(this.cusCode) {
            // 编辑页面
            this.cancelText = '取消';
            this.canSave = true;
            this.newHandOver = false;
            this.messageShow = false;//聊天记录收起
            this.getForm();
        }else{
            this.$nextTick(()=>{
                this.form.crmSafeBoxList = [ 
                    { 
                        id: '',
                        phone: '',
                        sort: 1,
                        error: false,
                        district: '',
                        encryption: false,
                        locId: ''
                    } 
                ]; 
            });
            this.showPictureModal = true;
        }
        if(this.marketId) {
            // 资源管理-录入
            this.getImportForm();
        }
        this.leftclosed = this.$store.state.crm.leftclosed;
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        init() {
            this.getApply();
            this.getTodayCusNum();
            this.getCountryCode();
            this.findByName();
        },
        changPicture(picIds) {
            // 上传图片
            this.picIds = picIds;
        },
        getImportForm() {
            // 资源管理-录入-获取信息
            let params = {
                id: this.marketId
            }
            crmCustomerImport.form(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let data = res.data.data;
                    this.marketList = {
                        sourceId: data.sourceId,
                        sourceType: data.sourceType,
                        importSourTag: data.importSourTag,
                        importId: data.id,
                        status: data.status
                    }
                }
            }).catch(errors.call(this));
        },
        getForm() {
            // 编辑状态获取页面信息
            let params = {
                id: this.cusCode
            }
            crmCustomer.form(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let stateData = res.data.data;
                    // 电话缓存
                    this.phoneOldListsLength = stateData.crmSafeBoxList.length > 0 ? stateData.crmSafeBoxList.length : 1;
                    if(stateData.crmSafeBoxList.length > 0) {
                        for(let i = 0; i < stateData.crmSafeBoxList.length; i++) {
                            let obj = stateData.crmSafeBoxList[i];
                            // console.log(obj.district)
                            // console.log(obj.locId === '0')
                            // console.log(this.areaCodeToId(obj.district).id)
                            this.phoneOldLists.push({
                                id: obj.id,
                                locId: obj.locId === '0' ? this.areaCodeToId(obj.district).id : obj.locId,
                                cusId: obj.cusId,
                                phone: obj.phone,
                                sort: obj.sort,
                                isModif: obj.isModif,
                                district: obj.district,
                            })
                        }
                    }
                    stateData.crmSafeBoxList = this.phoneOldLists;
                    // console.log(stateData.crmSafeBoxList)
                    // 微信缓存
                    if(stateData.wechat) {
                        this.oldWechat = stateData.wechat;
                    }
                    // 处理数据
                    let crmSafeBoxListTemp;
                    if(stateData.crmSafeBoxList.length > 0) {
                        crmSafeBoxListTemp = stateData.crmSafeBoxList;
                        crmSafeBoxListTemp.forEach(e => {
                            e.isModif = 0;
                            e.encryption = true;
                            e.edit = true;
                        });
                    }else{
                        crmSafeBoxListTemp = [ 
                            { 
                                id: '',
                                phone: '',
                                sort: 1,
                                error: false,
                                district: '',
                                encryption: false,
                                locId: ''
                            } 
                        ] 
                    }
                    this.form = stateData;
                    this.form.crmSafeBoxList = crmSafeBoxListTemp;
                    // 加急
                    if(stateData.isHot == 1) {
                        this.urgentFlag = true;
                        this.urgentDisabled = true;//禁用加急
                    }else if(stateData.isHot == 0) {
                        this.urgentFlag = false;
                    }
                    this.phoneLists = this.form.crmSafeBoxList.length;
                    this.$refs['filter'].changeActive(this.form.tags);
                    this.$refs['city'].setAds(this.form.country,this.form.province,this.form.city);
                }
            }).catch(errors.call(this));
            sys.list({objectId: this.cusCode}).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.setimg = res.data.data.list;
                    this.showPictureModal = true;
                }
            }).catch(errors.call(this));
        },
        statusChange(status){
            this.leftclosed = status;
        },
        addOrDelPhone(item, index) {
            if(!this.fromPond) {
                if(index == 0) {
                    // 添加
                    this.phoneLists = this.phoneLists + 1;
                    this.form.crmSafeBoxList.push({
                        id: '',
                        phone: '',
                        sort: this.phoneLists,
                        error: false,
                        district: '',
                        encryption: false,
                        locId: ''
                    });
                }else{
                    // 删除
                    this.phoneLists = this.phoneLists - 1;
                    this.form.crmSafeBoxList.splice(index, 1);
                    this.checkPhoneRepeat();
                }
            }
        },
        toggleRecord() {
            // 切换聊天记录显示隐藏
            this.messageShow = !this.messageShow;
            // 编辑状态，获取聊天记录
            if(this.cusCode && this.firstFindMessage) {
                this.firstFindMessage = false;
                let params = {
                    id: this.cusCode
                }
                crmCustomer.showMessage(params).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        this.form.message = res.data.data;
                    }
                }).catch(errors.call(this));
            }
        },
        checkLabel(item, sourTags) {
            // 选择标签
            this.form.tags = item;
            this.form.sourTags = sourTags;
        },
        submitForm(name) {
            // 保存
            if(this.canSave) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(this.form.sourTags == '') {
                            // 客户来源为空
                            this.$Message.error('客户来源标签不能为空');
                            return false;
                        }
                        if(this.urgentFlag) {
                            this.form.isHot = 1;
                        }else{
                            this.form.isHot = 0;
                        }
                        this.save = this.form;
                        if(this.save.crmSafeBoxList[0].district != '') {
                            this.save.crmSafeBoxList.forEach(item => {
                                delete item.error;
                                delete item.encryption;
                                delete item.edit;
                            });
                        }else{
                            this.save.crmSafeBoxList = [];
                        }
                        if(this.marketId) {
                            this.save.sourceId = this.marketList.sourceId;
                            this.save.sourceType = this.marketList.sourceType;
                            this.save.importId = this.marketList.importId;
                            this.save.status = this.marketList.status;
                        }
                        if(this.save.city == -1) this.save.city = null;
                        if(this.save.province == -1) this.save.province = null;
                        this.save.picIds = this.picIds;
                        let params = this.save;
                        
                        this.saveForm(params);
                    }
                })
            }
        },
        saveForm(params) {
            // console.log(params);
            this.updateLoadingStatus({isLoading: true});
            crmCustomer.save(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    // 保存完，编辑则返回，新增则清空录入下一条
                    if(this.cusCode) {
                        this.$router.go(-1);
                    }else{
                        this.formEmpty(1);
                        this.$Message.success('保存成功！');
                    }
                }
            }).catch(errors.call(this)).finally(()=>{
                this.updateLoadingStatus({isLoading:false});
            });
        },
        formEmpty(num) {
            // 清空当前页面，录入下一条信息
            this.picIds = [];
            this.$refs['picture'].listsEmpty();
            this.canSave = false;
            this.urgentFlag = false;
            this.urgentDisabled = false;
            this.messageShow = true;
            this.phoneLists = 1;
            this.oldWechat = ''; //编辑状态暂存微信
            this.save = {};
            this.form = {
                isHot: 0,
                cusCode: this.cusCodeFlag,
                keyword: '',
                name: '',
                province: '',
                city: '',
                country: '',
                crmSafeBoxList: [{
                    id: '',
                    phone: '',
                    sort: 1,
                    error: false,
                    district: '',
                    encryption: false,
                    locId: ''
                }],
                qq: '',
                wechat: '',
                email: '',
                applyCountry: '',
                apply: '',
                remarks: '',
                message: '',
                sourTags: '',//客户来源
                tags: [], ///标签id
                address: '',
                school: ''
            }
            if(num == 1) {
                // 保存成功
                this.count++;
            }
            this.$refs['filter'].empty();
            this.$refs['city'].setAds('','','');
        },
        cancelForm(name) {
            // 取消保存
            if(this.cusCode) {
                this.$router.go(-1);
            }else{
                this.formEmpty(2);
                this.$refs[name].resetFields();
            }
        },
        changePhone() {
            this.focusFlag = true;
        },
        checkPhone(obj, index) {
            // 编辑状态
            this.focusFlag = !true;
            if(obj.edit) {
                // 没有修改
                if(obj.phone == this.phoneOldLists[index].phone) {
                    return false;
                }else if(obj.phone == ''){
                    // 清空之后，失去光标恢复数据
                    obj.isModif = 0;
                    obj.error = false;
                    obj.encryption = true;
                    obj.phone = this.phoneOldLists[index].phone;
                    this.findPhonePlace(obj, index, '222');
                }else{
                    obj.isModif = 1;
                    obj.encryption = false;
                    this.checkPhoneFormat(obj, index);
                }
            }else{
                this.checkPhoneFormat(obj, index);
            }
        },
        checkPhoneFormat(obj, index) {
            // 检查电话号码输入合法性
            if(obj.phone != '') {
                // 不为空
                obj.phone = obj.phone.replace(/(^\s*)|(\s*$)/g, '').toString();   //去掉前后的空格
                // ====> start  处理无法识别的、莫名其妙的空格，反人类
                if(!(/^\d{1,}-?\d{1,}-?\d{1,}$/.test(obj.phone))){
                    console.log('这个空格很奇葩')
                    let _arr = [...obj.phone];
                    _arr.forEach((item, index) => {
                        if(item.charCodeAt(0).toString(16) == '202c') {
                            _arr.splice(index, 1);
                        }
                    });
                    obj.phone = _arr.join('');
                }
                // ====> end
                if(!(/^\d{1,}-?\d{1,}-?\d{1,}$/.test(obj.phone))){ //电话格式不对
                    obj.error = true;
                } else {
                    this.findPhonePlace(obj, index);
                }
            }else{
                if(index == 0) {
                    // 没有电话号码
                    this.form.crmSafeBoxList = [{
                        id: '',
                        phone: '',
                        sort: 1,
                        error: false,
                        district: '',
                        encryption: false,
                        locId: ''
                    }];
                    this.form.city = '';
                    this.form.province = '';
                    this.form.country = '';
                    this.$refs['city'].setAds(this.form.country,this.form.province,this.form.city);
                }else{
                    obj.error = false;
                    obj.district = '';
                }
            }
        },
        getPhone(obj, index) {
            // 查询电话号码是否已经存在数据库
            let params = {
                phone: obj.phone
            }
            crmCustomer.isPhoneExits(params).then(res => {
                if(res.data.status=='success') {
                    obj.error = false;
                }else{
                    // 电话已存在，与编号为：00008551 的客户号码重复(331259c2dd66477a989094d553098934)
                    let data = res.data.data;
                    if(data) {
                        this.$Message.error({
                            render: h => {
                                return h('span', [
                                    '电话已存在，与编号为：',
                                    h('a', {
                                        on: {
                                            click: () => {
                                                this.routerGoDetail(data.split(",")[1]);
                                            }
                                        }
                                    }, data.split(",")[0]),
                                    ' 的客户号码重复'
                                ])
                            },
                            duration: 10,
                            closable: true
                        });
                    }
                    
                    obj.error = true;
                }
            }).catch(errors.call(this));
        },
        checkPhoneRepeat() {
            // 检查页面电话重复
            let list = this.form.crmSafeBoxList;
            if(list.length > 1) {
                for(let i = 1; i < list.length;i++) {
                    let obj = list[i - 1];
                    for(let j = i; j < list.length;j++) {
                        if(list[j].phone == obj.phone && list[j].phone) {
                            list[j].error = true;
                            this.$Message.error('电话号码重复录入');
                            break;
                        }
                    }
                }
            }else{
                list[0].error = false;
            }
        },
        findPhonePlace(obj, index, str) {
            // 查询电话归属地
            let params = {
                phone: obj.phone
            }
            // console.log(this.form.crmSafeBoxList)
            crmCustomer.findPhonePlace(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let phoneTemp = res.data.data;
                    let list = this.form.crmSafeBoxList;
                    list[index].district = phoneTemp.areaCode;
                    list[index].locId = phoneTemp.country;
                    // list[index].phone = phoneTemp.phone;
                    // 判断页面电话重复
                    let errorFlag = false; //是否重复录入flag，默认false没有重复录入
                    if(list.length > 1) {
                        for(let i = 0; i < list.length;i++) {
                            if(index != i && list[i].phone == obj.phone){
                                // 不是当前项且电话重复
                                obj.error = true;
                                errorFlag = true;
                                this.$Message.error('电话号码重复录入');
                                break;
                            }else{
                                obj.error = false;
                            }
                        }
                        if(!errorFlag && str !='222') {
                            this.getPhone(obj, index);
                        }
                    }else if( str !='222'){
                        this.getPhone(obj, index);
                    }
                    if(index == 0 && !errorFlag) {
                        this.firstCountryId = phoneTemp.country;
                        this.form.country = phoneTemp.country;
                        this.form.province = phoneTemp.province;
                        this.form.city = phoneTemp.city == phoneTemp.province ? '' : phoneTemp.city;
                        this.$refs['city'].setAds(this.form.country,this.form.province,this.form.city);
                        // 省市置空
                        if(this.firstCountryId != '7') {
                            this.form.province = '';
                            this.form.city = '';
                        }
                    }
                }else{
                    obj.error = true;
                }
            }).catch(errors.call(this));
        },
        getApply() {
            // 申请阶段
            let params = {
                types: 'crm_customer_apply'
            }
            sys.batchListData(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.applyLists = res.data.data.crm_customer_apply;
                }
            }).catch(errors.call(this));
        },
        getTodayCusNum() {
            // 查询当天已录入客户数
            crmCustomer.getTodayCusNum().then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.count = res.data.data;
                }
            }).catch(errors.call(this));
        },
        getCountryCode() {
            // 查询电话的国家区号
            crmCustomer.getCountryCode().then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.cityList = res.data.data;
                }
            }).catch(errors.call(this));
        },
        setSourTags(id) {
            // 手动设置客户来源标签
            this.form.sourTags = id;
        },
        findByName() {
            // 查找国家
            let params = {
                name: '',
                level: 2
            }
            sys.areaFindByName(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.cityTree.country = res.data.data;
                }
            }).catch(errors.call(this));
        },
        changeCountry(item, index) { 
            // 电话归属地修改 item为国家对应的id
            let list = this.form.crmSafeBoxList;
            list[index].district = this.idToAreaCode(item).areaCode;
            // console.log(this.form.crmSafeBoxList)
            let num = this.form.crmSafeBoxList[0].locId; 
            if(num && this.firstCountryId != num) { 
                this.firstCountryId = this.form.crmSafeBoxList[0].locId; 
                this.form.country = num; 
                this.$refs['city'].setAds(this.form.country,'','');
            } 
        }, 
        areaCodeToId(num) {
            // 查找归属地对应国家的id
            for(let i in this.cityTree.country){
                const item = this.cityTree.country[i];
                if(item.areaCode == num){
                    return Object.assign({},item);
                }
            }
            return null;
        },
        idToAreaCode(num) {
            // 查找归属地对应国家的areaCode
            for(let i in this.cityTree.country){
                const item = this.cityTree.country[i];
                if(item.id == num){
                    return Object.assign({},item);
                }
            }
            return null;
        },
        enterPhone(str, obj, index) {
            let x;
            if(window.event) {// IE8 以及更早版本
                x=event.keyCode;
            }
            else if(event.which) {// IE9/Firefox/Chrome/Opera/Safari
                x=event.which;
            }
            if(x == 13) {
                if(str == 'phone') this.checkPhone(obj, index);
                else if(str == 'phone') this.checkWechat(obj);
            }
        },
        changeWechat() {
            this.focusFlag = true;
        },
        checkWechat(obj) {
            this.focusFlag = !true;
            if(this.oldWechat == '') {
                // 没有微信缓存
                this.checkWechatFormat(obj);
            }else{
                if(obj == this.oldWechat) {
                    // 没有修改
                    this.wechatError = false;
                    this.computedSave();
                }else{
                    this.checkWechatFormat(obj);
                }
            }
        },
        checkWechatFormat(obj) {
            if(obj != '') { // 不为空
                obj =  obj.replace(/(^\s*)|(\s*$)/g, "");   //去掉前后的空格
                this.form.wechat = obj;
                // if(!(/^[a-zA-Z\d_]{5,}$/.test(obj))){ //微信格式不对
                //     this.wechatError = true;
                //     this.computedSave();
                // } else {
                    // 微信查重
                    let params = {
                        wechat: obj
                    }
                    crmCustomer.isWechatExits(params).then(valid.call(this)).then(res => {
                        if(res.ok) {
                            this.wechatError = false;
                            this.computedSave();
                        }else{
                            this.wechatError = true;
                            this.computedSave();
                        }
                    }).catch(errors.call(this));
                // }
            }else{
                this.wechatError = false;
                this.computedSave();
            }
        },
        computedPhone(arr) {
            // 监听电话号码是否输入正确
            let count = -10000;
            if(arr.length > 0) {
                if(arr[0] && arr[0].locId) count = 0; // 第一个电话查询地址成功
                arr.forEach(e => {
                    if(e.error || e.locId == '' || e.phone == '') count++;
                });
            }
            if(count == 0) this.phoneSuccess = true; else this.phoneSuccess = false;
            this.computedSave(arr);// 判断是否能保存
        },
        computedFocus(boo) {
            // 监听鼠标
            this.computedSave();// 判断是否能保存
        },
        computedSave() {
            this.$refs['form'].validate((valid) => {
                if(valid) {
                    if(this.focusFlag) {
                        // 还在输入
                        this.canSave = false;
                        return false;
                    }
                    if(this.phoneSuccess) { // 有电话的情况
                        if(!this.wechatError) { // 微信正确
                            this.canSave = true;
                        }else{ //微信报错
                            if(this.form.wechat == '') this.canSave = true;//微信为空，可以保存
                            else this.canSave = false; //微信报错，且不为空，不可以保存
                        }
                    }else{ //电话错误标识
                        if(!this.wechatError) { //微信正确
                            if(this.form.wechat == '') {
                                this.canSave = false;
                                return false;
                            }
                            let arr = this.form.crmSafeBoxList;
                            // if(arr.length == 1 && arr[0].phone == '' && arr[0].district == '') { // 没有手机号码
                            if(arr.length == 1 && arr[0].phone == '') { // 没有手机号码
                                this.canSave = true;
                                return false;
                            }else{
                                this.canSave = false;
                            }
                        }else{
                            this.canSave = false;
                        }
                    }
                }else{
                    this.canSave = false;
                }
            })
        },
        routerGoDetail(cusId) {
            // 详情
            const {href} = this.$router.resolve({
                name: 'crm.detail',
                query: {
                    id: cusId,
                    from: 'usermanage',
                    noEdit:true
                }
            });
            // return href;
            window.open(href, '_blank');
        },
    },
    watch: {
        'form.crmSafeBoxList': {
            handler(val) {
                this.computedPhone(val);
            },
            deep: true
        },
        'focusFlag': function(val) {
            this.computedFocus(val);
        },
    }
}
</script>

