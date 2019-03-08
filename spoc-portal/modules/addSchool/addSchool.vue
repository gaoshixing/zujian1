<style lang="less">
	.addSchool{
		.ivu-form{
			width: 92%;
			.width292{
				width: 292px;
			}
			.width242{
				width: 242px;
			}
			.ivu-form-item{
				margin-bottom: 14px;
			}
			.ivu-form-item-label{
				color: #999899;
				font-size:14px;
			}
			.inline{
				display: inline-block;
			}
			.logoBox{
			    display: inline-block;
			    .schoolLogoBox{
			        width: 70px;
			        height: 70px;
			        background-color: #f7f7f7;
			        border: 1px solid #e0e1e2;
			        img{
			            width:70px;
			            height:70px;
			        }
			    }
			    label{
			        line-height:70px;
			    }
			    .uploadBox{
			        position: relative;
			        padding:5px 0px;
			        margin-left:20px;
			        .tips{
			            color:#999899;
			            font-size:12px;
			            margin-top:10px;
			        }
			        .error_tips{
			            top: 85%;
			        }
			    }
			}
			.ivu-radio-wrapper{
				margin-right: 0px;
				font-size:14px;
			}
			.radio{
				width: 292px;
				.ivu-radio{
					margin-right: 10px;
				}
			}
			.hasCollege,.cT{
				width: 870px;
				margin-bottom: 7px;
			}
			.tr{
				text-align: right;
			}
			.tc{
				text-align: center;
			}
			.tl{
				text-align: left;
			}
			.mr18{
				margin-left: 18px;
			}
			.width870{
				width: 870px;
			}
			.usnews{
				&.ivu-form-item{
					position: relative;
				}
				&.ivu-form-item:before{
					content: '';
					display: block;
					position: absolute;
					width: 26px;
					height: 24px;
					background: url(../../../assets/images/schoolManage/addSchool/us.svg);
					background-size:cover ;
					left: -25px;
					top: 10px;
				}
			}
		}
		.formBasic{
			padding-left: 15px;
			min-width: 885px;
		}
		.submit{
			width: 175px;
			height: 40px;
			display: block;
			margin: 0 auto;
		}
		.warn{
			width: 100%;
			overflow: hidden;
			img{
				width: 25px;
				vertical-align: middle;
				height: auto;
			}
		}
	}
</style>

<template>
	<div class="addSchool">
		<hint :stepList="stepHeadList" :num="showNum" @jump="showNumChange">
			<div slot="hintTit" class="warn" v-if="this.$route.query.edit==1">
				<p>带&emsp;<img :src="usImg"/>&emsp;标识的项，表示内容来自US.News，由系统自动填写，建议审核填写是否正确！</p>
			</div>
			<div slot="hintTit" v-else="this.$route.query.edit!=1">
				<p>请在<span>30分钟</span>尽可能完整、准确地填写这份信息</p>
			</div>
			<div slot="stepTips">
				你需要用<span>30分钟</span>完成以下<b style="font-weight: normal;" v-text="stepHeadList.length==5?'五':'六'"></b>个步骤!
			</div>
		</hint>
		<router-view @jump="showNumChange"></router-view>
	</div>
</template>

<script>
import hint from '@/component/spoc-library-web/src/modules/hint.vue';
import us from "@/component/spoc-library-web/src/assets/images/schoolManage/addSchool/us.svg"
export default {
  name:'addSchool',
  data(){
  	return {
		usImg:us,
  		showNum:this.$route.query.showNum || 1,
  		stepHeadList:[
			{label:'基本信息'},
			{label:'排名信息'},
			{label:'学术信息'},
			{label:'申请信息'},
			{label:'奖助学金'},
		],
  	}
  },
  computed:{
  	
  },
  components:{
  	hint
  },
  created(){
  	if(this.$route.query.schoolId){
  		this.stepHeadList = [
			{label:'基本信息'},
			{label:'排名信息'},
			{label:'学术信息'},
			{label:'申请信息'},
			{label:'奖助学金'},
			{label:'U.S.News参考信息'},
		]
  	}
  },
  methods:{
  	showNumChange:function(val,url,id,edit,ban,us){
		if(val==this.showNum){
          return;
        }
		if(!id){
			return this.$Message.warning("保存基本信息后才能添加其他信息");	
		}
        this.$router.push({name:url, query: {showNum:val,'edit':edit,schoolId:id,'ban':ban,usnews:us}})
  	}
  },
  watch:{
  	'$route.query.showNum'(val){
  		this.showNum = val || 1;
  	},
  	
  }
}
</script>

