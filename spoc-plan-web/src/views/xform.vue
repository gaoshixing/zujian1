<style lang="less">
.plan_xform_container{
    height: 100%;
	display: flex;
	.content{
		flex: 1;
		overflow-y: auto;
        padding: 0;
        .xfrom-nav-title{
            padding: 0 15px;
        }
        .tab-col{
            margin: 0 15px 10px;
        }
	}
}
</style>
<template>
    <div class="plan_xform_container">
		<leftview @status-change="statusChange" ref="leftview"></leftview>
		<div class="content">
			<nav-title class="xfrom-nav-title"></nav-title>
            <Tabs @on-click="toggleSatus" class="tab-col" v-model="curnav">
                <TabPane label="表单设置" name="1"></TabPane>
                <TabPane label="表单设计" name="2"></TabPane>
            </Tabs>
			<router-view class="plan_xform_content">
			</router-view>
		</div>
	</div>
</template>
<script>
import leftview from "./xform/views/leftview";
import headerBar from "../modules/headerBar";
import navTitle from "@public/modules/navTitle";

export default {
    data(){
        return {
            curnav:'2'
        }
    },
    computed:{
    },
    components:{
        leftview,
        headerBar,
        navTitle
    },
    methods:{
        statusChange(s){

        },
        toggleSatus(v){
            if(v==1){
                this.$router.push({name:'portal.formEdit',query:{id:this.$route.params.fid}});
            }
        }
    }
}
</script>