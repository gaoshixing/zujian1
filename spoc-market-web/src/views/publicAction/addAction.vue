<style lang='less'>
    .add-action-gsx {
        .add-aro, .item-name {
            margin: 0;
            padding: 0;
        }
        .add-aro {
            padding-left: 32px;
            .aro-item {
                color: #b8b8b8;
                padding-left: 130px;
                position: relative;
                line-height: 55px;
                height: 55px;
                list-style: none;
                .item-name {
                    position: absolute;
                    left: 0;
                    display: inline-block;
                    width: 100px;
                    text-align: right;
                    top: 1px;
                    i {
                        font-style: normal;
                        color: red;
                    }
                }
            }
        }
        .handle {
            text-align: center;
            margin-top: 60px;
        }
    }

</style>
<template>
    <div class="add-action-gsx">
        <ul class="add-aro">
            <li class="aro-item">
                <span class="item-name">
                    <i v-if="!$route.query.pubMeId">*</i> 选择一级菜单：
                </span>
                    <Select v-model="pubObj.pid" style="width:178px">
                        <Option v-for="item in menuList" :value="item.id" :disabled="$route.query.pubMeId==item.id" :key="item.value">{{ item.title }}</Option>
                    </Select>
            </li>
            <li class="aro-item">
                <span class="item-name">
                    <i>*</i> 菜单名：
                </span>
                    <Input v-model="pubObj.title" placeholder="" style="width: 178px" /> 
                    <Checkbox v-model="preinstall" style="margin-left:20px" @on-change="preinstallChange">本页为预设页面</Checkbox>
                    <Select v-if="preinstall" v-model="pubObj.url" style="width:178px">
                        <Option v-for="item in costomList" :value="item.url" :key="item.name">{{ item.name }}</Option>
                    </Select>
            </li>
            <li style="list-style:none">
                <ul v-if="!preinstall" > 
                    <li class="aro-item">
                    <span class="item-name">
                        <i>*</i> 配置操作：</span>
                        <Select v-model="pubObj.type" style="width:178px">
                            <Option v-for="item in configList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </li>
                    <li class="aro-item" v-if="pubObj.type == 'view'">
                        <span class="item-name">
                            <i>*</i> 目标URL：</span>
                            <Input v-model="pubObj.url"  style="width: 278px;padding-top:9px">
                                <Select v-model="select1" slot="prepend" style="width: 70px">
                                    <Option value="http">http://</Option>
                                    <Option value="https">https://</Option>
                                </Select>
                            </Input>
                    </li>
                </ul>
                
            </li>
            <li  style="list-style:none">
                <ul v-if="preinstall">
                    <li class="aro-item">
                        <span class="item-name">
                        <i>*</i> 配置操作：</span>
                        <Select v-model="typeP" style="width:178px" disabled>
                            <Option v-for="item in configList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </li>
                    <li class="aro-item">
                        <span class="item-name">
                        <i>*</i> 目标URL：</span>
                        <Input v-model="pubObj.url" disabled style="width: 278px;padding-top:9px"></Input>
                    </li>
                </ul>

            </li>
            
            <!-- <li class="aro-item" >
                <span class="item-name">
                    <i>*</i> 多选框：</span>
                    
            </li> -->
            <com
                v-if="pubObj.type == 'media_id'"
                :style="styleC"
                @fodderInfo='fodderInfo'
                :num1='num1'    
                :fodderId='fodderId'
                @numChanges="numChanges"
            ></com>
        </ul>
        <p class="handle">
            <Button type="primary" class="primary_btn_new1" @click="save">确认保存</Button>
        </p>
    </div>
</template>

<script>
import valid,{errors, sys, publicAction} from '../../libs/request';
import { mapState, mapGetters, mapMutations } from 'vuex';
import com from './com'
export default {
    data() {
        return {
            typeP: '',
            preinstall: false,
            costomList: [],
            select1: 'http',
            num1: 1,
            materialId: '',
            styleC: {
                marginLeft: '32px',
                marginTop: '13px'
            },
            fodderId: '',
            autoTypeAuto: '',
            value: '',
            publicInfo: '',
            pubObj: {
                title: '',
                url: '',
                pid: '',
                type: '',
            },
            configList: [],
            id: this.$route.query.pubMeId||'',
            menuList: [
            ],
            model1: ''
        }
    },

    components: {
        com,
    },

    created() {
        this.getBatchList()

    },

    mounted() {
        this.publicInfo = JSON.parse(sessionStorage.getItem('publicInfo'))
        this.getMenuList()
        this.listCostomData()
        if (this.id) this.getformDetail()
    },

    methods: {
		...mapMutations(["updateLoadingStatus"]),
        /**
         * 一级菜单
         */
        getMenuList() {
            let obj = {
                appId: this.publicInfo.id,
            }
            publicAction.getMenuList(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    res.data.data.unshift({
                        id: 0,
                        title: '新建为一级菜单,请选择本项',
                        value: '新建为一级菜单,请选择本项',
                    })
                    this.menuList = res.data.data
                }
            }).catch(errors.call(this));
        },

        preinstallChange(val) {
            this.pubObj.url = ''
            if (val) {
                this.pubObj.type = 'view'
            }
        },

        listCostomData() {
            let obj = {
                appId: this.publicInfo.id,
            }
            publicAction.listCostomData(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.costomList  = res.data.data
                }
            }).catch(errors.call(this));
        },

        getBatchList() {
            let obj = {
                types: 'wp_custom_menu_type'
            }
            sys.batchListData(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    let arr = []
                    res.data.data.wp_custom_menu_type.forEach(item => {
                        if (item.id != '12060') {
                            arr.push(item) 
                        }
                    })
                    this.configList = arr
                    this.typeP = 'view'
                }
            }).catch(errors.call(this));
        },

        numChanges(val) {
            this.num1 = val;
        },

        getformDetail() {
            let obj = {
                id: this.id
            }   
            publicAction.getForm(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.pubObj = res.data.data
                    if (this.pubObj.url) {
                        let index = this.pubObj.url.indexOf('://')
                        let isHttps = this.pubObj.url.indexOf('https')
                        if (index != -1) {
                            let length = this.pubObj.url.length
                            this.pubObj.url = this.pubObj.url.substr(index+3, length)
                        }
                        if (isHttps != -1) {
                            this.select1 = 'https'
                        }
                    } 
                    this.getFodderType(res.data.data)
                }
            }).catch(errors.call(this));
        },

        getFodderType(val) {
            this.fodderId = val.materialId
            switch(val.materialType) {
                case 'news': this.num1 = 1; break;
                case 'image': this.num1 = 2; break;
                case 'voice': this.num1 = 3; break;
                case 'video': this.num1 = 4; break;
                case 'text': this.num1 = 5; break;
            }
        },

        /**
         *   素材id
         */
        fodderInfo(value, type) {
            this.materialId = value.id
            this.autoTypeAuto = type
        },

        /**
         * 上传 素材库
         */
        massSend() {
            if (!this.materialId) {
                this.$Message.info('请选择素材')
                return
            }
            this.updateLoadingStatus({
                isLoading: true
            });
            let formData = new FormData();
            formData.append("appId", this.publicInfo.id);
            formData.append("materialType", this.autoTypeAuto);
            formData.append("materialId", this.materialId);
            formData.append("uploadType", 0);
            publicAction.upfileFodder(formData).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.saveInfo(res.data.data)
                }
            }).catch(errors.call(this)).finally(() => {
                this.updateLoadingStatus({isLoading:false});
            });
        },

        save() {
            if (this.preinstall) {
                if (!this.pubObj.url) {
                    this.$Message.error('请选择预设页面url')
                    return
                }
                let obj = {
                    appId: this.publicInfo.id,
                    title: this.pubObj.title,
                    pid: this.pubObj.pid,
                    type: 'view',
                    url: this.pubObj.url,
                }
                this.sendSave(obj)
                return
            }
            if (this.pubObj.pid===''||this.pubObj.title==''||this.pubObj.type=='') {
                this.$Message.info('请填写必填项')
                return
            }
            if (this.pubObj.type == 'view') {
               this.saveInfo()
               return
            }

            if (this.pubObj.type == 'media_id') {
               this.massSend()
               return
            }
        },

        saveInfo(meidaId='') {
            if (this.pubObj.url==''&&!meidaId) {
                this.$Message.info('请填写url')
                return 
            }
            let obj = {}
            if (this.id) {
                obj = this.pubObj
            } else {
                obj = {
                    appId: this.publicInfo.id,
                    title: this.pubObj.title,
                    pid: this.pubObj.pid,
                    type: this.pubObj.type,
                }
            }

            if (this.pubObj.type == 'media_id') { 
                obj = Object.assign(obj, {
                    mediaId: meidaId,
                    materialType: this.autoTypeAuto,
                    materialId: this.materialId,
                })
            } else {
                let index = this.pubObj.url.indexOf('://')
                if (index == -1) {
                    obj = Object.assign(obj, {
                        url: `${this.select1}://${this.pubObj.url}`,
                    })
                } else {
                    obj = Object.assign(obj, {
                        url: this.pubObj.url,
                    })
                }
            }
            this.sendSave(obj)
        },

        sendSave(obj) {
            publicAction.saveMenu(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.$Message.info(res.data.message)
                    this.$router.push({
                        name: 'publicAction.index',
                    })
                }
            }).catch(errors.call(this));
        }
        
    }
}
</script>

