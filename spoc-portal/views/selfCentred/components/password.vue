<style lang="less">
.password-container{
    @red: #ed3f14;
    position: relative;
    .tips{
        line-height: 70px;color: #999;
    }
    .item{
        position: relative;padding-left: 100px;height: 50px;
        p.error{
            position: absolute;top: 31px;left: 100px;color: @red;
        }
    }
    .ivu-input.error{
        border-color: @red;
    }
    .item-title{
        position: absolute;left: 0;top: 0;width: 100px;line-height: 32px;
        font-size: 14px;color: #666;text-align: right;
    }
    .btn{
        padding-left: 100px;
    }
    .btn-item{
        width: 94px;height: 30px;padding: 0;font-size: 14px;margin-right: 40px;
    }
}
</style>
    
<template>
<div class="password-container">
    <p class="tips">*提示：密码为6-24个字符，最好由字母、数字和特殊字符构成，不区分大小写。</p>
    <div class="item">
        <span class="item-title">新密码：</span>
        <input v-model="password.psd" type="password" style="width: 230px" :class="[passwordError ? 'error' : '']"
            @blur="blurPwd('pwd')" @keydown="enterPwd('pwd')" class="ivu-input">
        <p class="error" v-if="passwordError">密码错误</p>
    </div>
    <div class="item">
        <span class="item-title">确认新密码：</span>
        <input v-model="password.psdAgain" type="password" style="width: 230px" :class="[passwordAginError ? 'error' : '']"
            @blur="blurPwd('psdAgain')" @keydown="enterPwd('psdAgain')" class="ivu-input">
        <p class="error" v-if="passwordAginError">{{ errorMessage }}</p>
    </div>
    <div class="btn">
        <Button class="btn-item" type="ghost" @click="cancal()">取消</Button>
        <Button class="btn-item" type="primary" @click="checked()">确定修改</Button>
    </div>
</div>
</template>

<script>

import { mapState } from 'vuex';
import valid, {errors, sys} from '../../../libs/request.js';
import util from '../../../../spoc-choiceschool-web/src/libs/js/util.js';
import nozzle from "../../../../spoc-choiceschool-web/src/libs/interface.js";

export default {
    data(){
        return {
            password: {
                psd: '',
                psdAgain: ''
            },
            passwordError: false,
            passwordAginError: false,
            errorMessage: '密码错误',
            success: false,
        };
    },
    computed: {
        ...mapState(['userInfo']),
    },
    methods: {
        blurPwd(str) {
            // 鼠标离开
            this.success = false;
            let errorCount = 0;
            // 6-24个字符
            if(str == 'pwd') {
                if(this.password.psd.length < 6 || this.password.psd.length > 24) {
                    this.passwordError = true;
                    return false;
                }else{
                    this.passwordError = false;
                }
            }else if(str == 'psdAgain') {
                if(this.password.psdAgain.length < 6 || this.password.psdAgain.length > 24) {
                    this.passwordAginError = true;
                    return false;
                }else{
                    this.passwordAginError = false;
                }
            }else{
                if(this.password.psd.length < 6 || this.password.psd.length > 24) {
                    this.passwordError = true;
                    errorCount++;
                }
                if(this.password.psdAgain.length < 6 || this.password.psdAgain.length > 24) {
                    this.passwordAginError = true;
                    errorCount++;
                }
                if(errorCount > 0) {
                    return false;
                }
            }
            // 验证两次密码是否相同
            if(this.password.psd != this.password.psdAgain) {
                this.passwordAginError = true;
                this.errorMessage = '两次密码不相同';
                return false;
            }
            this.passwordError = false;
            this.passwordAginError = false;
            this.success = true;
        },
        enterPwd(str) {
            // enter
            let x;
            if(window.event) {// IE8 以及更早版本
                x=event.keyCode;
            }
            else if(event.which) {// IE9/Firefox/Chrome/Opera/Safari
                x=event.which;
            }
            if(x == 13) {
                this.blurPwd(str);
            }
        },
        cancal() {
            // 取消
            this.$router.go(-1);
        },
        checked(){
            // 验证
            this.blurPwd();
            if(this.success) {
                this.submit();
            }
        },
        submit() {
            // 提交
            let _this = this;
            let data = {
                userId: this.userInfo.id,
                newPwd: this.password.psd
            }
            util.ajax.post(nozzle.basicData.updatePwd,data).then(function(res){
                util.checkAjaxJson(res).thenSuccess(function(json){
                    _this.$Message.success('密码修改成功！');
                    if(_this.$root.onLogout){
                        _this.$root.onLogout();
                    }
                    _this.$store.dispatch('portal/autoLogout');
                }).autoRun("login","error");
            }).catch(function(error) {
                util.checkAjaxError(error);
            });
        }
    },
}
</script>


