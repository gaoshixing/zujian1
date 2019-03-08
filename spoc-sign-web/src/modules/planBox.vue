<style lang="less">
.sign-plan-box{
	width: 960px;
	margin: auto;
    overflow: hidden;
    height: 120px;
    margin-top: 26px;
	.plan-cont{
		position: relative;
		display: flex;
		height: 100%;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		.line{
			height: 12px;
			position: absolute;
			top: 50%;
			margin-top: -6px;
			left: 30px;
			right: 30px;
			background: #999999;
			border-radius: 4px;
			overflow:hidden;
			.level{
				width: 0px;
				height: 12px;
				background: #44bcb7;
			}
		}
		.tenor{
			width: 60px;
			height: 60px;
			z-index: 99;
			float: left;
			border: 6px #999999 solid;
			.lei{
				line-height: 48px;
			}
			&.action{
				border: 6px #44bcb7 solid;
			}
			border-radius: 50%;
			margin: 0 30px;
			background: #fff;
			text-align: center;
			line-height: 42px;
			cursor: pointer;
			position: relative;
			.urge{
				display: block;
				position: absolute;
				right: -48px;
				bottom: -16px;
				color: #FFFFFF;
				background: #44bcb7;
				width: 48px;
				line-height: 22px;
				border-radius: 10px;
				font-size: 12px;
			}
		}
	}
}
</style>
<template>
    <div class="sign-plan-box" >
		<div class="plan-cont">
			<div class="line">
				<p class="level" :style="{width:((long-1)*_width)+'px'}"></p>
			</div>
			<Tooltip v-for="(item,index) in loading" :key="index" class="tenor" :class="{action:long>index}" :disabled="!item.time" placement="top" v-if="item.show">
				<span class="lei">{{item.info}}</span>
				<div slot="content"v-if="item.info=='审核'&& !!item.time">
		            <p>审核人：{{item.who}}</p>
		            <p>{{item.info}}时间：{{item.time}}</p>
		        </div>
				<div slot="content"v-else-if="!!item.time">
		            <p>{{item.info}}时间：{{item.time}}</p>
		        </div>
				<!--<span class="urge" v-if="item.eve && !close" @click="urgeAudit">催办</span>-->
			</Tooltip>
		</div>
    </div>
</template>
<script>
	export default{
		props:{
			info: {
				type: Object,
				required:true
			},
		},
		data(){
			return{
			}
		},
		computed:{
			listData(){
				return this.info;
			},
			loading(){
				let arr=[
					{'key':'commit','info':'提交',eve:'',show:true,},
					{'key':'sign','info':'签约',eve:'',show:!this.close,},
					{'key':'account','info':'报账',eve:'',show:!this.close,},
					{'key':'collecting bill','info':'收款',eve:'',show:!this.close,},
				];
				if(this.listData.auditStatus!='nocheck'){
					arr.splice(1,0,{'key':'check','info':'审核',eve:'催办',show:true});
				}
				if(this.listData.status=="closed"){
					arr.push({'key':'close','info':'关闭',eve:'',show:true,});
				}else if(this.listData.status=="refund"){
					arr.push({'key':'refund','info':'退款',eve:'',show:!this.close,});
				}else{
					arr.push({'key':'finish','info':'完成',eve:'',show:!this.close,});
				}
				arr.forEach((v,k)=>{
					if(this.listData.htOptStatusLog && this.listData.htOptStatusLog[v.key]){
						v.time=this.listData.htOptStatusLog[v.key][0].optTime;
						if(v.key=='check'){
							v.who=this.listData.htOptStatusLog[v.key][0].optUserName;
						}
					}else{
						v.time='';
					}
				})
				return arr;
			},
			_width(){
				return 900/(this.loading.length-1);
			},
			long(){
				let status = this.listData.status;
				let isArchived = this.listData.isArchived;
				console.log(this)
				if(this.listData.auditStatus=='nocheck'){
					 if(/committed/.test(status)) return 1;
					 if(/checked/.test(status)) return 1;
					 if(/signed/.test(status)) return 2;
					 if(/accounted/.test(status)) return 3;
					 if(/collected/.test(status)) return 4;
					 if(isArchived==1) return 5;
					 if(/closed/.test(status)) return 6;
					 if(/finished/.test(status)) return 6;
					 if(/refund/.test(status)) return 6;
				}else{
					 if(/committed/.test(status)) return 1;
					 if(/checked/.test(status)) return 2;
					 if(/signed/.test(status)) return 3;
					 if(/accounted/.test(status)) return 4;
					 if(/collected/.test(status)) return 5;
					 if(isArchived==1) return 6;
					 if(/closed/.test(status)) return 7;
					 if(/finished/.test(status)) return 7;
					 if(/refund/.test(status)) return 7;
				}
			},
		},
	}
</script>


