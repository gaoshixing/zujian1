<style lang="less">
.customer-manage-modal{
    .modal-item{
        position: relative;min-height: 32px;padding-left: 119px;
        font-size: 14px;color: #333;
    }
    .title{
        position: absolute;left: 0;top: 0;width: 110px;line-height: 32px;
        text-align: right;color: #999;
    }
    .detail{
        line-height: 20px;padding: 6px 15px 6px 0;
    }
}
</style>
    
<template>
    <Modal
        v-model="modal" class="customer-manage-modal"
        title="查看来源信息"
        @on-ok="ok">
        <template v-if="type == 'qddl'">
            <div class="modal-item">
                <span class="title">代理名称：</span>
                <div class="detail">{{ params.qddl.name }}</div>
            </div>
            <div class="modal-item">
                <span class="title">代理类型：</span>
                <div class="detail">{{ params.qddl.typeName }}</div>
            </div>
            <div class="modal-item">
                <span class="title">分成比例：</span>
                <div class="detail">{{ params.qddl.profitRatio }}%</div>
            </div>
            <div class="modal-item">
                <span class="title">合同/协议：</span>
                <div class="detail" v-if="params.qddl.fileName">
                    <span class="blue">{{ params.qddl.fileName }}</span>
                    <a href="javascript:;" @click="download(params.qddl.url)">下载</a>
                </div>
            </div>
            <div class="modal-item">
                <span class="title">备注：</span>
                <div class="detail">{{ params.qddl.remarks }}</div>
            </div>
            <div class="modal-item">
                <span class="title">导入资源：</span>
                <div class="detail">{{ params.qddl.num }}条</div>
            </div>
            <div class="modal-item">
                <span class="title">入库：</span>
                <div class="detail">{{ params.qddl.directName }}</div>
            </div>
            <div class="modal-item">
                <span class="title">入库分公司：</span>
                <div class="detail">{{ params.qddl.billDirectName }}</div>
            </div>
            <div class="modal-item">
                <span class="title">导入人：</span>
                <div class="detail">{{ params.qddl.createByName }}</div>
            </div>
            <div class="modal-item">
                <span class="title">导入时间：</span>
                <div class="detail">{{ params.qddl.createDate }}</div>
            </div>
        </template>
        <template v-else>
            <div class="modal-item">
                <span class="title">活动名称：</span>
                <div class="detail">{{ params.schd.name }}</div>
            </div>
            <div class="modal-item" v-if="params.schd.type">
                <span class="title">活动类型：</span>
                <div class="detail">{{ params.schd.typeName }} - {{ params.schd.subTypeName }}</div>
            </div>
            <div class="modal-item" v-if="params.schd.beginDate">
                <span class="title">活动时间：</span>
                <div class="detail">{{ params.schd.beginDate }} - {{ params.schd.endDate }}</div>
            </div>
            <div class="modal-item" v-if="params.schd.country">
                <span class="title">活动地点：</span>
                <div class="detail">{{ params.schd.address }}</div>
            </div>
            <div class="modal-item">
                <span class="title">活动支出：</span>
                <div class="detail">{{ params.schd.cost }}</div>
            </div>
            <div class="modal-item">
                <span class="title">备注：</span>
                <div class="detail">{{ params.schd.remarks }}</div>
            </div>
            <div class="modal-item">
                <span class="title">导入资源：</span>
                <div class="detail">{{ params.schd.num }}条</div>
            </div>
            <div class="modal-item">
                <span class="title">入库：</span>
                <div class="detail">{{ params.schd.directName }}</div>
            </div>
            <div class="modal-item">
                <span class="title">入库分公司：</span>
                <div class="detail">{{ params.schd.billDirectName}}</div>
            </div>
            <div class="modal-item">
                <span class="title">导入人：</span>
                <div class="detail">{{ params.schd.createByName }}</div>
            </div>
            <div class="modal-item">
                <span class="title">导入时间：</span>
                <div class="detail">{{ params.schd.createDate }}</div>
            </div>
        </template>
    </Modal>
</template>

<script>

import valid, {errors, crmCustomerImport, sys} from '../../../libs/request.js';
import vSelect from '@public/modules/vSelect';

export default {
    data(){
        return {
            modal: false,
            type: '',
            params: {
                schd: {
                    // 另外三种
                },
                qddl: {
                    // 渠道代理
                },
            }
        };
    },
    methods: {
        getForm(formId) {
            // 编辑时，获取信息
            let params = {
                id: formId
            }
            crmCustomerImport.form(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let data = res.data.data;
                    this.type = data.sourceType;
                    if(this.type == 'qddl') {
                        // 渠道代理
                        this.params.qddl = data.channel;
                        if(data.channel.url) {
                            let arr = data.channel.url.split('/');
                            let child = arr[arr.length - 1].split('.');
                            this.params.qddl.fileName = child[0] + '.' + child[2];
                        }else{
                            this.params.qddl.fileName = '';
                        }
                        this.params.qddl.num = data.num;
                        this.params.qddl.directName = data.directName;
                        this.params.qddl.billDirectName = data.billDirectName ? data.billDirectName.split(' ')[0] : '';
                    }else{
                        // 市场活动
                        this.params.schd = data.activity;
                        this.params.schd.directName = data.directName;
                        this.params.schd.billDirectName = data.billDirectName ? data.billDirectName.split(' ')[0] : '';
                        this.params.schd.num = data.num;
                    }
                    this.modal = true;
                }
            }).catch(errors.call(this));
        },
        download(url) {
            // 下载
            let arr = url.split('/');
            // let realNameArr = arr[arr.length - 1].split('.');
            // let realName = realNameArr[0] + '.' + realNameArr[2];
            let realName = arr[arr.length - 1];
            let dirName = 'business';
            let newUrl = url.substring(0, url.lastIndexOf("/"));
            // console.log(newUrl);
            // console.log(realName);
            // console.log(dirName);
            window.open(sys.downloadPanNew(newUrl, dirName, realName));
        },
        showModal(formId) {
            this.getForm(formId);
        },
        ok() {
            this.modal = false;
        },
    }
}
</script>


