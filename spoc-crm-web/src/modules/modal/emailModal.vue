<style lang="less">
.model-component{
    .ivu-btn{
        font-size: 14px;
    }
    .email-box{
        padding: 4px;font-size: 14px;
        li{
            position: relative;
            min-height: 55px;padding-left: 95px;
        }
        .title{
            position: absolute;left: 0;top: 0;
            width: 95px;line-height: 35px;text-align: right;color: #999;
        }
        .detail{
            position: relative;
        }
        .count{
            position: absolute;right: 0;top: 0;width: 20px;
            color: #999;font-size: 16px;line-height: 35px;
        }
        input{
            padding-right: 20px;font-size: 14px;
        }
    }
}
</style>
    
<template>
    <Modal v-model="emailModal" title="发送邮件" width='750' :loading="loading" class="model-component">
        <div class="email-box">
            <ul>
                <li>
                    <span class="title">收件人：</span>
                    <div class="detail">
                        <Input v-model="messageDirection"/>
                        <span class="count">{{ emailCount }}</span>
                    </div>
                </li>
                <li>
                    <span class="title">邮件主题：</span>
                    <div class="detail">
                        <Input v-model="emailTitle"/>
                    </div>
                </li>
                <li>
                    <span class="title">正文：</span>
                    <div class="detail">
                        <Input v-model="emailDetail" type="textarea"/>
                    </div>
                </li>
            </ul>
        </div>
        <div slot="footer">
            <Button @click="cancelEmail">取消</Button>
            <Button type="primary" @click="sendEmail">发送</Button>
        </div>
    </Modal>
</template>

<script>

import valid, {errors, crmNotification} from '../../libs/request.js';

export default {
    data(){
        return {
            lists: [],
            emailModal: !true,
            loading: true,
            messageDirection: '',
            emailCount: 0,
            emailTitle: '',
            emailDetail: '',
        };
    },
    methods: {
        cancelEmail() {
            // 取消发送 email
            this.emailModal = false;
        },
        showEmail(list) {
            // 打开email弹窗
            this.lists = list;
            let address = '';
            list.forEach(e => {
                address += (e.name + ',');
            });
            this.messageDirection = address;
            this.emailCount = list.length;
            this.emailModal = true;
        },
        sendEmail() {
            // email
            let idLists = [];
            this.lists.forEach(element => {
                idLists.push(element.cusId);
            });
            let data = {
                kind: 'crmgroupemail',
                customerIds: idLists.join(),
                content: this.emailDetail,
                title: this.emailTitle
            }
            crmNotification.save(data).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.$Message.success('邮件发送成功');
                    this.emailModal = false;
                    this.emailTitle = '';
                    this.emailDetail = '';
                    this.$emit('onRefresh');
                }
            }).catch(errors.call(this));
        },
    },
}
</script>


