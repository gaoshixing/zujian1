<style lang='less'>
    .no-pass-man-gsx {
        .reject-title {
            margin: 15px 0;
            font-size: 16px;
        }
        .reject-item {
            list-style: none;
            line-height: 33px;
            margin-bottom: 20px;
        }
        .aro {
            margin-left: 30px;
        }
        .reject-hist {
            .reject-name {
                display: inline-block;
                text-align: right;
                width: 100px;
                color: #b8b8b8;
            }
            .reject-reason {
                position: relative;
                padding-left: 100px;
                .reason {
                    display: inline-block;
                    width: 100px;
                    text-align: right;
                    position: absolute;
                    color: #b8b8b8;
                    left: 0;
                    top: 0;
                }
            }
        }
        .go-back {
            text-align: center;
            margin-top: 20px;
        }
    }

</style>
<template>
    <div class="no-pass-man-gsx">
        <div class="base-info">
            <base-infor
                :baseInfor="baseInfor"
                ></base-infor>
        </div>
        <div class="reject-hist">
            <p class="reject-title">不通过审核</p>
            <ul class="aro">
                <li v-for="item in rejectList" class="reject-item">
                    <span class="reject-name">审核人：</span>{{item.optUser}}</br>
                    <span class="reject-name">审核时间：</span>{{item.optTime}}</br>
                    <div class="reject-reason">
                        <span class="reason">不通过审核理由：</span>
                        {{item.reason}}
                    </div>
                </li>
            </ul>
        </div>
       
        <p class="go-back"> <Button type="primary" class="primary_btn_new1" @click="$router.go(-1)">　返回　</Button> </p>
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
            rejectList: [
                // {name: '刘思思', time: '22323', reason: "立候和hi好的撒谎活动四爱大使馆一大狗狗好滴撒过度撒个给打死过对手"},
                // {name: '刘思思', time: '22323', reason: "立候和hi好的撒谎活动四爱大使馆一大狗狗好滴撒过度撒个给打死过对手"},
                // {name: '刘思思', time: '22323', reason: "立候和hi好的撒谎活动四爱大使馆一大狗狗好滴撒过度撒个给打死过对手"},
                // {name: '刘思思', time: '22323', reason: "立候和hi好的撒谎活动四爱大使馆一大狗狗好滴撒过度撒个给打死过对手"},
                // {name: '刘思思', time: '22323', reason: "立候和hi好的撒谎活动四爱大使馆一大狗狗好滴撒过度撒个给打死过对手"}
            ],
            objectId: this.$route.query.objectId,
            baseInfor: {}
        }
    },

    components: {
        baseInfor
    },

    mounted() {
        this.getRejectList()
        this.form()
    },

    methods: {
        getRejectList() {
            let obj = {
                objectId: this.objectId,
                type: 'reject'
            }
            expandMan.rejectList(obj).then(valid.call(this)).then(res => {
                if(res.ok) {
                   this.rejectList = res.data.data
                }
            }).catch(errors.call(this));
        },

        form() {
           let obj = {
               openId: this.objectId,
            }
            expandMan.form(obj).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.baseInfor = res.data.data
                }
            }).catch(errors.call(this));
        },

    }
}
</script>


