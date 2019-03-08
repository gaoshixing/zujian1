<style lang='less'>
.connectCheckDetail {
    li{
        list-style: none;
    }
    position: relative;
    padding-top: 20px;
    border-top: 1px solid #e0e0e0;
    .detailSelect{
        text-align: right;height: 63px;padding-top: 10px;
        button{
            @h: 30px;
            width: 85px;height: @h;line-height: inherit;padding: 0;margin-left: 15px;
            font-size: 14px;
        }
    }
}
.rejectModel{
    .textareaTitle{
        margin-bottom: 10px;
    }
}
</style>

<template>
<div class="connectCheckDetail">
    <div class="detailSelect" v-show="showButtons">
        <p>
            <Button @click="RouterGo" type="primary" v-show="showEditShow">{{ $t("portal.edit") }}</Button>
            <Button @click="openPass" type="primary">{{ $t("Pass") }}</Button>
            <Button @click="openReject" type="primary">{{ $t("portal.NotPass") }}</Button>
        </p>
    </div>
    <connect-detail :pId="this.pId"></connect-detail>
    <Modal class="passModal"
        v-model="pass"
        :title="$t('GroupTips')"
        @on-ok="updateHandOver(1)">
        <p>{{ $t("portal.passModal") }}</p>
    </Modal>
    <Modal class="rejectModel"
        v-model="reject"
        :title="$t('portal.rejectModelTitle')"
        @on-ok="updateHandOver(0)">
        <p class="textareaTitle">{{ $t("portal.reason") }}</p>
        <Input v-model="rejectValue" type="textarea" :rows="4" :placeholder="$t('chooseSchoolCase.rejectReason')"/>
    </Modal>
</div>
</template>

<script>

import { MENUIDS, } from '@public/libs/config';
import connectDetail from './connectDetail'
import valid, { errors, common, sys } from "../libs/request";

export default {
    props: {
        pId: {
            type: String
        }
    },
    data() {
        return  {
            pass: false,
            reject: false,
            showButtons: false,
            handOverId: '',
            rejectValue: '',
            showEditShow: true, // 是否显示编辑按钮
            phaseName: '',
        }
    },

    components: {
        connectDetail
    },

    mounted () {
        this.handOverId = this.$route.query.id;
        if(this.$route.query.edit == 'false' || this.$route.query.edit == false){
            this.showButtons = false;
        }else{
            this.showButtons = true;
        }
        let thispID = this.pId;
        if(thispID == '101') this.phaseName = 'choiceschool';
        else if(thispID == '201') this.phaseName = 'sign';
        else if(thispID == '401') this.phaseName = 'plan';
        else if(thispID == '701') this.phaseName = 'docu';
        else if(thispID == '801') this.phaseName = 'crm';
        else if(thispID == '901') this.phaseName = 'apply';
    },

    methods: {
        openPass() {
            this.pass = true;
        },

        openReject() {
            this.reject = true;
        },

        RouterGo() {
            this.$router.push({
                name: this.phaseName + '.connectedit',
                query: {
                    id: this.handOverId
                }
            })
        },

        updateHandOver(num) {
            // num：1-通过，0-驳回
            let params = {
                id: this.handOverId,
                status: num
            }
            if(num == 0 && this.rejectValue){
                params.reason = this.rejectValue;
            }
            common.updateHandOver(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.$router.push({
                        name: this.phaseName + '.connectCheck'
                    })
                }
            }).catch(errors.call(this));
        }
    },
}
</script>


