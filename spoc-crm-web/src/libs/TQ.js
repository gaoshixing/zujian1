import Vue from 'vue';
import mapState from 'vuex'
import browserfly from './tqjsskd'

export class TQ {  
    constructor(obj) {
            this.params = obj
        // let initOptions = {
        //     debug: true, // default:false 是否开启调试模式
        //     strid: '', //用户名；与uin其中一个必填
        //     uin: '', // tq号 ；与strid其中一个必填
        //     admin_uin: '', // 管理员TQ号;必填
        //     appid: '', //开发者id；必填
        //     access_token: '', // 秘钥，需从服务器获取；必填
        //     server_url: http://ip:port //服务器地址；必填
        // };
    };

    init() {
        this.params = Object.assign(this.params, {
            debug: true
        })
        let demo = browserfly.noConflict();
        demo.init(this.params)
        return demo
        // //初始化参数 ,json对象
       
    };

    success(val) {
        val()
    };

    error(ret)  {  
        if(ret&& ret.errcode==10003){
            Vue.$Message.error()
        }
    }

}