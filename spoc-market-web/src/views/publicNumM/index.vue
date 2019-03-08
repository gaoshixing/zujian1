<style lang='less'>
    .public-m-gsx {
        padding-left: 65px;
        color: #b8b8b8;
        .num-type {
            font-size: 14px;
            line-height: 54px;
         }
        .add-font {
            font-size: 40px;
            vertical-align: middle;
            margin-right: 5px;
            margin-left: 14px;
        }
        .add-font-logo {
            color: #d8a272;
        }
        .add-serve {
            font-size: 18px;
            display: inline-block;
            width: 270px;
            height: 76px;
            margin-bottom: 30px;
            margin-right: 50px; 
            cursor: pointer;
            line-height: 74px;
            border: 1px solid #e6e6e6;
            border-radius: 10px;
            .logo {
                width: 40px;
                height: 40px;
                vertical-align: middle;
                margin-left: 14px;
                margin-right: 5px;
            }
        }
        .add-serve:hover {
            border: 1px solid #44bcbc;
        }
        
    }
</style>
<template>
    <div class="public-m-gsx">
        <Button type="primary" class="primary_btn_new1" style="float:right" @click="publicM" >管理公众号</Button>
        <div v-if="coreList.length">
            <p class="num-type">核心公众号</p>
            <span class="add-serve"  v-for="(item, index) in coreList" :key="index" @click="updateMenu(item)">
                <img class="logo" :src="item.headfaceUrl" alt="" v-if="item.headfaceUrl">
                <i v-else class="icon-tengmen add-font add-font-logo iconfont"></i>
                <span style="color: #696969">{{item.publicName}}</span>
            </span>
        </div>
        <div>
            <p class="num-type">机构服务号</p>
            <span class="add-serve"  v-for="(item, index) in serveList" :key="index" @click="updateMenu(item)">
                <img class="logo" :src="item.headfaceUrl" alt="" v-if="item.headfaceUrl">
                <i v-else class="icon-tengmen add-font add-font-logo iconfont"></i>
                <span style="color: #696969">{{item.publicName}}</span>
            </span>
            <span class="add-serve" @click="addServeN()" v-if="marketLeader">
                <i class="icon-tianjia3 add-font  iconfont"></i>添加服务号
            </span>
        </div>
        <p class="num-type">机构订阅号</p>
            <span  class="add-serve" v-for="(item, index) in topList" :key="index" @click="updateMenu(item)">
                <img class="logo" :src="item.headfaceUrl" alt="" v-if="item.headfaceUrl">
                <i v-else class="icon-tengmen add-font add-font-logo iconfont"></i>
                <span style="color: #696969">{{item.publicName}}</span>                
            </span>
            <span class="add-serve" @click="addTopN()" v-if="marketLeader">
                <i class="icon-tianjia3 add-font iconfont"></i>添加订阅号
            </span>
    </div>
</template>

<script>
import valid,{errors, sys, publicNumM,} from '../../libs/request';
import { MENUIDS, } from '@public/libs/config';
import {mapState, mapGetters} from 'vuex'

export default {
    data() {
        return {
            topList: [],
            serveList: [],
            publicId: '',
            isHasCore: false,
            coreList: [],
        }
    },
    
    computed: {
        ...mapGetters('market', ['marketLeader'])
    },

    mounted() {
        this.getDataList('service') // 服务
        this.getDataList('subscribe') // 订阅
    },

    methods: {
        getDataList(type) {
            let obj = {
                type: type,
                isShow: 1
            }
            publicNumM.getDataList(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    let dataList = res.data.data
                        this.handle(dataList, type)
                }
            }).catch(errors.call(this));
        },

        handle(val, type) {
            if (!this.isHasCore) {
                this.isHasCore = val.some(item => {
                    return item.isCore == 1
                })
                if (this.isHasCore) {
                    this.coreList = val.filter((item, index) => {
                        if (item.isCore == 1) {
                            val.splice(index, 1)
                        }
                        return item.isCore == 1
                    })
                }
            }
            if (type == 'service')  this.serveList = val
            if (type == 'subscribe')  this.topList = val
        },

        publicM() {
            const {href} = this.$router.resolve({
                name: 'market.publicM',
            })
            window.open(href, '_blank');
        },

        addServeN() {
            this.$router.push({
                name: 'publicNumM.addPublicNT',
                query: {
                    isHasCore: this.isHasCore
                }
            })
        },

        addTopN() {
            this.$router.push({
                name: 'publicNumM.addPublicN',
                query: {
                    isHasCore: this.isHasCore
                }
            })
        },

        updateMenu(item) {
            let obj2 = {
                appId: item.id
            }
            publicNumM.sendM(obj2).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.goMenu(item)
                }
            }).catch(errors.call(this));
			
        },

        goMenu(item) {
            let id = 1023
            sys.listGrantMenu({ id, }).then(valid.call(this)).then(res=>{
                sessionStorage.setItem('publicInfo', JSON.stringify({id:item.id,publicName:item.publicName}))
                let menus = res.data.data
                menus = menus.map(item1 => {
				if (item1.name == '不能改自动换菜单名字') {
					item1.name = item.publicName
				}
				return item1
            })
                this.$store.commit('market/updateMenu',{menu:menus, isPush:true,name:item.publicName});
            }).catch(errors.call(this));
        }
    }
}
</script>

