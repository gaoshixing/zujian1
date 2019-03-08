<style lang="less">
.model-component{
    .addressee{
        position: relative;padding: 0 6px 3px 100px;
        font-size: 14px;
        span{
            position: absolute;left: 0;width: 100px;line-height: 40px;padding-left: 39px;
            color: #999;
        }
        div{
            color: #333;line-height: 24px;padding: 8px 0;min-height: 40px;
        }
    }
    .message-detail{
        padding: 0 6px 4px 39px;
        font-size: 14px;
        span{
            line-height: 40px;color: #999;
        }
    }
}
</style>
<template>
    <Modal v-model="messageModal" title="短信助手" @on-ok="sendMessage" width='750'
        :loading="loading"
        @on-cancel="cancel" class="model-component">
        <div class="addressee">
            <span>收信人：</span>
            <div>{{ messageDirection }}</div>
        </div>
        <div class="message-detail">
            <span>请编辑短信内容</span>
            <Input v-model="message" type="textarea"/>
        </div>
    </Modal>
</template>

<script>

import valid, {errors, crmNotification} from '../../libs/request.js';

export default {
    data(){
        return {
            lists: [],
            messageModal: false,
            loading: true,
            messageDirection: '',
            message: '',
        };
    },
    methods: {
        setDirection(list) {
            let address = '';
            let email = '';
            list.forEach(e => {
                address += (e.name + ',');
            });
            this.messageDirection = address;
        },
        showMessage(list) {
            // 打开短信弹窗
            this.lists = list;
            this.setDirection(this.lists);
            this.messageModal = true;
        },
        sendMessage() {
            // 发送短信、email
            let idLists = [];
            this.lists.forEach(element => {
                idLists.push(element.cusId);
            });
            let data = {
                kind: 'crmgroupsms',
                customerIds: idLists.join(),
                content: this.message
            }
            crmNotification.save(data).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.$Message.success('短信发送成功');
                    this.messageModal = false;
                    this.message = '';
                    this.$emit('onRefresh');
                }
            }).catch(errors.call(this));
        },
        cancel() {

        },
    },
}
</script>


