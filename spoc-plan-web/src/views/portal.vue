<style lang="less">
.plan_portal_container{
    height: 100%;
	display: flex;
	.content{
		position: relative;
		flex: 1;
		overflow-y: auto;
        padding: 0 15px 20px;
        &.msgpage{
            overflow-y: visible;
        	display: flex;
        	flex-direction: column;
        	flex: 1;
        }
        .plan_portal_content{
        	width: 100%;
        }
	}
}
</style>
<template>
    <div class="plan_portal_container">
		<leftgroups @status-change="statusChange" ref="leftgroup" :groups="groups" :curr-item="currItem" :read-map="readMap" @change="changeGroup" @update="loadGroups" @addgroup="showAddGroup"></leftgroups>
		<div class="content" :class="isMsg">
            <header-bar :group-info="currItem"></header-bar>
			<router-view class="plan_portal_content" v-if="show && pId" :pid="pId" :group-info="currItem" :inportal="true" :read-map="readMap" @fresh-unread="freshUnread" @on-other-msg="onOtherMsg" >
			</router-view>
            <div>
                <add-group ref="group" @fresh="doFresh"></add-group>
            </div>
		</div>
	</div>
</template>

<script>
import {mapMutations,mapState} from 'vuex';
import { MENUIDS, } from '@public/libs/config';
import valid,{errors,common,plServiceGroup,other} from '../libs/request.js';
import leftgroups from "../modules/leftgroups";
import headerBar from "../modules/headerBar";
import addGroup from '../modules/addGroup';
import vuexPublic from './vuexPublic.vue';
let regist = false;
let route ='plan.portal';

export default {
    mixins:[vuexPublic],
    data(){
        return {
            show:true,
            groups:[],
            readMap:{},
            currItem:{
                id:this.$route.params.gid
            },
            pId: null,
        };
    },
    computed:{
        ...mapState(['userInfo','appMenuList']),
        isMsg(){
            if(this.$route.name=='plan.portal.msg'){
                return {
                    msgpage:true
                }
            }
        }
    },
    components:{
        leftgroups,
        headerBar,
        addGroup
    },
    created(){
		if(!regist){
			this.registerModule();
			regist = true;
		}
        this.loadGroups();
        this.pId = MENUIDS.PLAN;
        this.$store.commit('updatePid',{pid:this.pId});
    },
    methods:{
        ...mapMutations(['updateLoadingStatus',]),
        loadGroups(){
            common.plList().then(valid.call(this)).then(res=>{
                if(res.ok){
                    this.groups=res.data.data;
                    this.$refs.leftgroup.initFirst();
                    this.getReadMap();
                }
            }).catch(errors.call(this));
        },
        changeGroup(item,reload){
            this.currItem = item;
            if(reload){
                this.updateLoadingStatus({isLoading:true});
                this.show=false;
                setTimeout(()=>{
                    this.show=true;
                },20);
                setTimeout(()=>{
                    this.updateLoadingStatus({isLoading:false});
                },200);
            }
        },
        showAddGroup(){
            this.$refs.group.show();
        },
        doFresh(){
            this.loadGroups();
        },
        statusChange(s){
            console.info(s);
            let status=s;
			this.$store.commit('plan/updateCloseStatus',{status});
        },
        getReadMap(){
            const uid = this.userInfo.id;
            const gids = this.groups.map(item=>item.id);
            if(gids.length<1){
                return
            }
            other.readStat(uid,gids).then(res=>{
                if(res.data.code===0){
                    this.readMap = res.data.data;
                } else {
                    throw new Error(res.data.msg);
                }
            }).catch(errors.call(this));
        },
        freshUnread(){
            this.getReadMap();
        },
        onOtherMsg(data){
            const gid = data.to;
            if(!this.readMap[gid]){
                this.readMap[gid]=0;
            }
            this.readMap[gid]++;
			let arr=[];
			arr=this.groups.filter((v, i, a) => {
				return gid!=v.id;
			})
			let arr1=this.groups.filter((v, i, a) => {return gid==v.id;})
			this.groups=arr1.concat(arr);
        }
    },
		watch: {
//			readMap: {
//				handler: function(nVal,oVal) {
//					if(Object.is(nVal, oVal)){ return false;}
//							console.log(Object.keys(oVal).length)
//					if(Object.keys(oVal).length){
//						let ids=[];
//						let arr=[];
//						for(var i in nVal){
//							console.log(nVal[i]+'--'+oVal[i])
//							if(nVal[i]!=oVal[i]&&nVal[i]!=0){
//								ids.push(i)
//							}
//						}
//					}
//				},
//				deep: true
//			}
		}
}
</script>

