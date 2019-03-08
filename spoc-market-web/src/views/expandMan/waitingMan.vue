<style lang='less'>
    .waiting-man-gsx {
        .base-info {
            padding: 15px 0;
        }
        .use-current-man {
            margin: 57px 0 24px;
            font-size: 14px;
            text-align: center;
        }
        .handle {
            text-align: center;
        }
    }

</style>
<template>
    <div class="waiting-man-gsx">
        <div class="base-info">
            <base-infor
                :baseInfor="baseInfor"
                :baseList="baseList"
            ></base-infor>
            <!-- <ul>
                <li v-for="item in baseList">
                    <span>
                        <i class="info-name">{{item.name}}</i>
                        {{baseInfor[item.value]}}
                    </span>
                </li>
            </ul> -->
            <p class="use-current-man"><Checkbox v-model="isUse"> 立即启用改推广员</Checkbox></p>
            <p class="handle">
                <Button class="def_btn_new1" @click="$router.go(-1)">　返回　</Button>
                <Button type="primary" class="primary_btn_new1" @click="reject">不通过审核</Button>
                <Button type="primary" class="primary_btn_new1" @click="resolve">通过审核</Button>
            </p>
        </div>
         <!-- 对话框 -->
        <Modal
            v-model="modal1"
            title="不通过审核"
            width=728
            @on-ok="ok"
            ref="recj"
            @on-cancel="cancel">
            <div class="no-pase-modal-gsx">
                <Input v-model="rejectCont" type="textarea" :rows="4" placeholder="请标明不通过理由, 本内容将展示给报名者" />
                <!-- <Checkbox v-model="isSendM" style="margin-top:20px"> 将此理由展示给报名者</Checkbox> -->
            </div>
        </Modal>
    </div>
</template>

<script>
import baseInfor from '../../modules/baseInfor'
import valid, {
    errors,
    common,
    sys,
    expandMan
} from "../../libs/request";
export default {
    data() {
        return  {
            status: '',
            rejectCont: '',
            isSendM: true,
            modal1: false,
            isUse: true,
            id: this.$route.query.formId,
            baseInfor: {
            },
            baseList: [
                {name: "姓名", value: 'name'},
                {name: '微信openID', value: 'openId'},
                {name: "手机号", value: 'phone'},
                {name: "客户编号", value: 'studentId'},
                {name: "报名时间", value: 'registrationTime'},
            ],
        }
    },

    components: {
        baseInfor
    },

    mounted() {
        this.publicInfo = JSON.parse(sessionStorage.getItem('publicInfo'))
        this.form()
    },

    methods: {
        isPass(params={}) {
           let obj = {
                openId: this.id,
                status: this.status,
                appId: this.publicInfo.id
            }
            obj = Object.assign(obj, params)
            expandMan.update(obj).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.$Message.info(res.data.message)
                    this.$router.go(-1)
                }
            }).catch(errors.call(this));
        },

        form() {
           let obj = {
               openId: this.id,
            }
            expandMan.form(obj).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.baseInfor = res.data.data
                }
            }).catch(errors.call(this));
        },

        ok() {
            if (!this.rejectCont) {
                this.$refs.recj.visible= true
                this.modal1 = true
                this.$Message.error('请填写不通过理由')
                return
            }
            let obj = {
                reason: this.rejectCont,
            }
            this.isPass(obj)
        },

        cancel() {

        },

        reject() {
            this.status = 'reject'
            this.modal1 = true
        },

        resolve() {
            this.status = 'pass'
            let params = {
                isUse: this.isUse == true ? 1 : 0,
            }
            this.isPass(params)
        }
    }
}
</script>
