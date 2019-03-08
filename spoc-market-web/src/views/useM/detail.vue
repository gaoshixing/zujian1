<style lang='less'>
    .user-m-detail-gsx {
        text-align: center;
        .base-infor {
            padding: 50px;
            img {
                width: 74px;
                height: 74px;
                border-radius: 50%;
            }
            .item {
                margin-top: 17px;
                span {
                    color: #b8b8b8;
                }
            }
        }
        .tag-and-remarks {
            border-top: 1px solid #e0e0e0;
            .aro {
                margin-top: 27px;
                span {
                    color: #b8b8b8;
                }
                .tag-item {
                    padding: 5px 12px;
                    margin-right: 10px;
                    background-color: #f2f2f2;
                    color: #b7b7b7;
                    border-radius: 3px;
                }
            }
        }
    }

</style>
<template>
    <div class="user-m-detail-gsx">
        <div class="base-infor">
            <img  alt="" :src="userInfo.avatarUrl">
            <p class="item"><span>昵称：</span>{{userInfo.name}}</p>
            <p class="item"><span>Open ID：</span>{{userInfo.openId}}</p>
            <p class="item"><span>性别：</span>{{userInfo.gender==2?'女': '男'}}</p>
        </div>
        <div class="tag-and-remarks">
            <p class="aro"><span>标签：</span>
                <span class="tag-item" v-for="item in userInfo.tagList">{{item.tagName}}</span>
            </p>
            <p class="aro"><span>备注：</span>{{userInfo.remarks}}</p>
        </div>
    </div>
</template>

<script>
import valid,{errors, sys, useM} from '../../libs/request';
export default {
    data() {
        return {
            openId: this.$route.query.userId,
            userInfo: {
                avatarUrl: '',
                name: '',
                openId: '',
                sex: '',
                tagList: [
                ],
                remarks: ''
            }
        }
    },

    mounted() {
        this.form()
    },

    methods: {
        form() {
            let obj = {
                openId: this.openId,
            }
            useM.form(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.userInfo = res.data.data
                }
            }).catch(errors.call(this));
        }
    }
}
</script>
