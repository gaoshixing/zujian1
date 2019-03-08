<style lang="less">
.sign-contract-operation-info{
	.title{
		font-size: 18px;
		margin-top:	40px;
		margin-bottom: 19px;
	}
	.ivu-form .ivu-form-item-label{
		color: #999999;
	}
	.ivu-form-item{
		margin-bottom: 10px;
	}
	.item{
		width: 50%;
		float: left;
	}
	p{
		text-indent: 2em;
		line-height: 2;
	}
}
</style>
<template>
	<div class="sign-contract-operation-info">
		<div class="title">基本信息</div>
		<Form :label-width="100" label-position="right" style="overflow:hidden;">
			<div class="item">
				<FormItem label="合同编号：">
					20171207136136
					<!-- <router-link :to="{name:''}"></router-link>			 -->
				</FormItem>
			</div>
			<div class="item">
				<FormItem label="合同名称：">本科留学服务合同</FormItem>
			</div>
			<div class="item">
				<FormItem label="合同原价：">10万</FormItem>
			</div>
			<div class="item">
				<FormItem label="签约金额：">9万</FormItem>
			</div>
			<div class="item">
				<FormItem label="合同生成时间：">2017年12月7日  12：23：23</FormItem>
			</div>
			<div class="item">
				<FormItem label="生成人：">刘芳一（北京分公司-销售总监）</FormItem>
			</div>
			<div class="item">
				<FormItem label="有无附加内容：">有</FormItem>
			</div>
			<div class="item">
				<FormItem label="附加内容实际优惠金额：">1.2万</FormItem>
			</div>
			<div class="item">
				<FormItem label="合作者：">姜维</FormItem>
			</div>
			<div class="item">
				<FormItem label="分成比例：">10%</FormItem>
			</div>
		</Form>


		
		<div class="title">附加条款</div>
		<p>
			1.1  甲方享有主合同所提供服务的咨询服务费拾壹万圆整的9折优惠，甲方仅需支付人民币玖万玖千圆整。甲方应在协议签署后当日向乙方一次性全额支付。
		</p>
		<p>	
			1.2  乙方赠送给甲方6节（每节课壹小时时长）托福语言培训课程（远程或实地）。所赠送课程将在2018年1月结束之前一次集中兑现执行，不做分期分批次执行，逾期未兑现则本赠送条款失效。
		</p>
		<Form :label-width="100" label-position="right" style="overflow:hidden;margin-top:20px">
			<div class="item">
				<FormItem label="授权审核人：">Cindy</FormItem>
			</div>
			<div class="item">
				<FormItem label="实际审核人：">Cindy</FormItem>
			</div>
			<div class="item">
				<FormItem label="审核时间：">2017年12月7日  12：33：23</FormItem>
			</div>
			<div class="item">
				<FormItem label="审核结果：">通过</FormItem>
			</div>
			<div class="item">
				<FormItem label="签约时间：">2017年12月10日  12：33：23</FormItem>
			</div>
			<div class="item">
				<FormItem label="报账时间：">2017年12月12日  12：33：23</FormItem>
			</div>
			<div class="item">
				<FormItem label="收款时间：">2017年12月13日  12：33：23</FormItem>
			</div>
			<div class="item">
				<FormItem label="归档时间：">--</FormItem>
			</div>
				
		</Form>

		<div class="title">审核记录</div>
		<Table :columns="columns1" :data="data1"></Table>

		<div class="title">其他操作记录</div>
		<Table :columns="columns2" :data="data2"></Table>
		
	</div>
</template>
<script>
export default {
	name:'contractOperationInfo',
	data () {
		return {
			columns1:[
				{
					title:'序号',
					align:'center',
					key:'1'
				},
				{
					title:'审核内容',
					align:'center',
					key:'2'
				},
				{
					title:'审核结果',
					align:'center',
					key:'3'
				},
				{
					title:'原因',
					align:'center',
					key:'4'
				},
				{
					title:'审核人',
					align:'center',
					key:'5'
				},
				{
					title:'审核时间',
					align:'center',
					key:'6'
				},
			],
			data1:[
				{
					1:1,
					2:'赠送10课时',
					3:'通过',
					4:'--',
					5:'Cindy',
					6:'2017-12-9 14：24',
				}
			],
			columns2:[
				{
					title:'序号',
					align:'center',
					key:'1'
				},
				{
					title:'操作人',
					align:'center',
					key:'2'
				},
				{
					title:'操作',
					align:'center',
					key:'3'
				},
				{
					title:'时间',
					align:'center',
					key:'4'
				},
			],
			data2:[
				{
					1:'1',
					2:'刘方毅',
					3:'生成合同《本科留学服务合同》，合同编码136136lfytg',
					4:'2017-12-9 14：24',
				},
				{
					1:'1',
					2:'刘方毅',
					3:'生成合同《本科留学服务合同》，合同编码136136lfytg',
					4:'2017-12-9 14：24',
				}
			],
		}
	}
}
</script>
