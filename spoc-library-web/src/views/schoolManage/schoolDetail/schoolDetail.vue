<style lang="less">
	.schoolDetail{
		.fl{
			float: left;
		}
		.fr{
			float: right;
		}
		.inline{
			display: inline-block;
		}
		.header{
			padding: 20px 20px 0px;
			overflow:hidden;
			.logo{
				.fl
			}
			.referral{
				.fl;
				width: 292px;
				box-sizing: border-box;
				padding-left: 30px;
				font-size:12px;
				.ref1{
					line-height: 36px;
					font-size: 20px;
					font-weight: 400;
				}
				.ref2{
					line-height: 16px;
				}
				.ref3{
					line-height: 54px;
					font-size: 14px;
				}
			}
			.tag{
				padding: 8px;
				button{
					margin-right: 20px;
					width: 93px;
					height: 30px;
				}
			}
		}
		.tabs{
			line-height: 29px;
			font-size: 14px;
			.ivu-tabs-bar{
				padding: 0 10px;
			}
		}
	}
</style>

<template>
	<div class="schoolDetail">
		<div class="header">
			<div class="logo">
				<img :src="imgLogo"/>
			</div>
			<div class="referral">
				<p class="ref1">普林斯顿大学</p>
				<p class="ref2">Princeton University</p>
				<p class="ref3"># 1  U.S.News美国综合大学排名</p>
			</div>
			<div class="tag">
				<Button type="primary">美国-北美</Button>
				<Button type="primary">私立学校</Button>
			</div>
		</div>
	    <Tabs size="small" class="tabs" :animated="false" v-model="tabsNum" :on-click="tabCut(tabsNum)">
	        <TabPane name="details" label="学校详情"></TabPane>
	        <TabPane name="replenish" label="U.S.News补充信息"></TabPane>
	    </Tabs>
	    <router-view></router-view>
	</div>
</template>

<script>
	import logo from '../../../assets/images/schoolManage/schoolDetail/logo.png';
	export default {
		data(){
			return {
				imgLogo:logo,
				tabsNum:'details'
			}
		},
		methods:{
			tabCut:function (val){
        		this.$router.push({name:'library.'+val, query: {'schoolId':this.$route.query.schoolId}})
			}
		}
	}
</script>

