<style lang="less">
.detail-content {
	
 	.content-list {
		margin-top: 30px;
		font-size: 14px;
		border-radius: 5px;
		box-shadow: 0px 0px 15px #888888;
		.detail-tite {
			padding-top: 15px;
			border-bottom: 1px solid #e0e0e0;
			overflow: hidden;

			i,b {
				font-style: normal;
				font-size: 18px;
				font-weight: 600;
				color: red;
			}

			b {
				color: #44bcb7;
			}

			& div {
				& p {
					line-height: 25px;
					& span {
						font-weight: 600;
					}
				}
			}

			.title-left {
				margin-top: 10px;
				float: left;
				width: 15%;
				color: #44bcb7;
				font-size: 22px;
				text-align: center;
			}

			.title-content {
				float: left;
				width: 84%;
				.signName {
					color: #44bcbc;
					cursor: pointer;
				}
				
				p {
					width: 50%;
					display: inline-block;
					float: left;
				}
				// .show {
				// 	width: 100%;
				// }
			}	
		}

		.detail-agree {
			overflow: hidden;
			padding: 20px 40px;
			box-sizing: border-box;

			.agree-left {
				float: left;
				width: 15%;
				line-height: 40px;
				p{
					margin-left: 50px;
				}
				p:first-child {
				margin-top: 59px;
				}
				p:last-child {
				color: #44bcb7;
				cursor: pointer;
				}
			}

			.agree-table {
				float: left;
				width: 85%;

				.table-title {
					font-weight: 600;
					text-align: center;
					margin-bottom: 10px;
				}

				.allPrice {
					border: 1px solid #e9eaec;
					border-top: none;

					i {
						display:inline-block;
						width: 66.5%;
						text-align:center;
						line-height: 35px;
						font-size: 14px;
						color: black;
					}

					span {
						display: inline-block;
						width: 33.45%;
						line-height: 35px;
						text-align: center;
						border-left: 1px solid #e9eaec;
					}
					// span:first-of-type,i {
					// 	border-right: 1px solid #e9eaec;
					// }
				}
			}
		}
	}
	.pressing {
		box-shadow: 0px 0px 15px #ff9d00;	
	}
}
</style>
<template>
    <div class="detail-content">
        <div :class="{'content-list':true, 'pressing': isPressing}">
            <div class='detail-tite' >
               	<div class="title-left"> 
                    <Tooltip placement="top">
               			<div slot="content">
							<p>{{all.reportedUser.name}}：{{all.reportedUser.companyName|filterContolled}}-{{all.reportedUser.jobName}}</p>
							<p>截止目前为止提交补充协议审批</p>
							<p>申请{{all.auditorSum}}次,其中成功签约{{all.successSum}}次</p>
                		</div>
						<p>{{all.reportedUser.name}}</p>
						<p>{{all.auditorSum}}/{{all.successSum}}</p>
                     </Tooltip> 
               	</div>
               	<div class="title-content">
                   <p>合同名称：<span @click="goDetail(all.id)" class="signName">{{all.name}}</span></p>
                   <p>合同编码：{{all.code}}</p>
                   <p>提交时间：{{all.commitTime}}</p>
                   <p>客户姓名：{{all.lastName}}{{all.firstName}}</p>
                   <p><span>合同原价</span>：<b>{{all.price|filterMoney}} </b>万元<span>&nbsp;&nbsp;     签约价格</span>：<i>{{all.htSign.signPrice|filterMoney}} </i>万元</p>
                   <p class="show" v-if="show">提交时长：<span>{{all.elapsedTime}}</span>&nbsp;&nbsp;&nbsp;<span style="color:#f6c749;font-weight:400" v-if="isPressing">(已催办)</span></p>
              	</div>
            </div>
            <div class="detail-agree">
                <div class="agree-left">
                    <p>补充协议：</p>
                    <p @click="formDialog(all.id)">审核记录</p>
                </div>
                <div class="agree-table">
                  	<p class="table-title">折扣金额：<b> {{all.htSign.deratePrice|filterMoney}} </b> 万元,赠送金额<i> {{all.htSign.presentPrice|filterMoney}}</i> 万元<!--,赠送成本：<b>{{all.htSign.presentPriceCost|filterMoney}}</b> 万元--></p>
                    <Table border :columns="columns1" :data="all.htContractItemList"></Table>
					<p class="allPrice" >
						<i>总计</i><span>{{all.presentPrice}}</span>
						<!-- <i>总计</i><span>{{all.sumPublicPrice}}</span> -->
						<!-- <span>{{all.sumCostPrice}}</span> -->
					</p>
           			<slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
	data() {
		return {};
	},

	props: {
		all: {
			type: Object,
			default: {}
   		},

		show: {
		type: Boolean,
		default: true
		},

		columns1: {
		tyle: Array,
		default: function() {
			return [
				{
					title: "促销项目",
					key: "policyName",
					align: "center",
				},
				// {
				// 	align: "center",
				// 	title: "权限级别",
				// 	key: "level"
				// },
				{
					title: "优惠条款",
					key: "name",
					align: "center"
				},
				{
					title: "赠送金额",
					key: "publicPrice",
					align: "center",
					render: (h, params) => {
						return h(
							"span", {
								
							},
							params.row.type == 'gift' ? (parseFloat((Number(params.row.publicPrice) * Number(params.row.giftCount)))) : 'N/A'
						)
					}
				},
				// {
				// 	title: "赠送成本",
				// 	key: "costPrice",
				// 	align: "center",
				// 	render: (h, params) => {
				// 		return h(
				// 			"span", {},
				// 			params.row.costPrice == '' ? 'N/A' : params.row.costPrice
				// 		)
				// 	}
				// }
			]}
			
		}
 	},

	computed: {
		isPressing() {
			// (this.all.remindCount || this.all.premindCount)
			if(this.all.premindCount !=0 && this.all.auditStatus == "waiting") {
				return true
			}
			return false
		}
	},

	methods: {
		formDialog(id) {
			this.$emit('formDialog', id)
    	},
		goDetail(id) {
			this.$router.push({
				name: "sign.pactPreview",
				query: {
					id: id
				}
			});
		}
	},

	filters: {
		filterContolled: function(value) {
			return value.substr(0,value.indexOf(' '))
		},

		filterMoney: function(value) {
			let val = value.toFixed(0)/10000
			return val
		}
	}

};
</script>


