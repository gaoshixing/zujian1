<style lang="less">
	.pactcard-list {
		&.ivu-card {
			box-shadow: 0 0 15px #888;
		}
		margin-bottom: 30px;
		width: 100%;
		position: relative;
		.green {
			color: #44bcb7;
			font-size: 18px;
		}
		.red {
			color: #ff0000;
			font-size: 18px;
		}
		.ivu-card-body {
			padding: 0;
		}
		.info {
			padding: 15px 0 0px;
			border-bottom: 1px #e0e0e0 solid;
			.info-box {
				display: flex;
				flex-wrap: nowrap;
				justify-content: space-around;
				align-items: center;
				width: 100%;
			}
			.info-lf {
				width: 144px;
				line-height: 25px;
				margin: 0 40px;
				text-align: center;
				font-size: 22px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				color: #44bcb7;
			}
			.info-gt {
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				flex: 1;
				.box {
					display: flex;
					flex-wrap: wrap;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;
					flex: 1;
					padding-left: 26px;
					p {
						width: 100%;
						text-align: left;
						line-height: 25px;
						&.blod {
							font-weight: bold;
						}
						&.fr {
							float: right;
						}
						&.jump {
							cursor: pointer;
							span {
								color: #44bcb7;
							}
						}
					}
				}
			}
			.btn {
				margin: 0;
				text-align: center;
				clear: both;
				padding: 20px 0;
				.ivu-btn {
					width: 90px;
					height: 32px;
					line-height: 1.4em;
					font-size: 12px;
					margin: 0 20px;
					border-radius: 3px;
				}
			}
		}
		.other {
			padding: 20px 0;
			/*height: 94px;*/
			border-bottom: 1px #e0e0e0 solid;
			.price {
				text-align: center;
				font-weight: bold;
			}
			.other-box {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				align-items: center;
			}
			.other-lf {
				width: 144px;
				text-align: center;
				font-size: 14px;
				font-weight: normal;
				margin: 0 40px;
			}
			.other-gt {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				align-items: center;
				flex: 1;
				.policy {
					flex: 1;
					padding-left: 26px;
					.ivu-table-wrapper {
						width: 80%;
						.ivu-table {
							width: 100%;
						}
					}
					.ivu-table-footer {
						line-height: 35px;
						height: 35px;
					}
					.table {
						width: 100%;
						td {
							height: 35px;
							font-size: 14px;
							font-weight: bold;
							text-align: center;
							line-height: 35px;
							&.gt {
								border: none;
							}
						}
					}
				}
				p {
					text-align: left;
					line-height: 22px;
					margin-bottom: 6px;
					&.blod {
						font-weight: bold;
					}
				}
			}
			.append {
				text-align: center;
				padding-left: 144px;
			}
			.oFooter {
				position: relative;
				.stamp {
					position: absolute;
					right: 14%;
					bottom: 0;
					.reason {
						width: 130px;
						text-align: center;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
						position: absolute;
						bottom: 0;
						left: -134px;
						.ivu-tooltip-inner {
							max-width: 250px;
							min-height: 34px;
							padding: 8px 12px;
							color: #fff;
							text-align: left;
							text-decoration: none;
							background-color: rgba(70, 76, 91, 0.9);
							border-radius: 4px;
							box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
							white-space: nowrap;
						}
						.ivu-tooltip-popper[x-placement^="top"] .ivu-tooltip-arrow {
							display: block;
						}
					}
				}
				.btn {
					margin: 0;
					text-align: center;
					clear: both;
					padding-top: 20px;
					.ivu-btn {
						width: 90px;
						height: 32px;
						line-height: 1.4em;
						font-size: 12px;
						margin: 0 20px;
						border-radius: 3px;
					}
				}
			}
		}
		.plan {
			width: 100%;
			padding: 15px 0;
			height: 86px;
			.plan-lf {
				padding: 0 40px;
				box-sizing: content-box;
				width: 144px;
				line-height: 54px;
				text-align: center;
				font-size: 14px;
				float: left;
				font-weight: normal;
			}
			.plan-box {
				float: left;
				height: 54px;
				font-size: 12px;
				.plan-cont {
					position: relative;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					.line {
						position: absolute;
						top: 22px;
						left: 30px;
						right: 30px;
						background: #999999;
						border-radius: 4px;
						overflow: hidden;
						.level {
							width: 0px;
							height: 0px;
							background: #44bcb7;
							border-bottom: 4px solid #44bcb7;
						}
					}
					.tenor {
						width: 48px;
						height: 48px;
						z-index: 99;
						line-height: 38px;
						float: left;
						border: 4px #999999 solid;
						&.action {
							border: 4px #44bcb7 solid;
						}
						.ivu-tooltip-rel {
							line-height: 40px;
						}
						border-radius: 50%;
						margin: 0 30px;
						background: #fff;
						text-align: center;
						cursor: pointer;
						position: relative;
						.urge {
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
							&.dis {
								color: #bbbec4;
								background-color: #eeeeee;
								border-color: #8C8C8C;
								cursor: not-allowed;
							}
						}
					}
				}
			}
		}
		.sw {
			font-size: 34px;
			position: absolute;
			line-height: 1.2em;
			padding: 0 12px;
			top: 0;
			right: 18px;
			color: #333333;
			cursor: pointer;
			.ivu-select-dropdown {
				ul {
					width: 124px;
					line-height: 32px;
					background: #fff;
					li {
						font-size: 14px;
						text-align: center;
						padding: 0;
						span {
							display: block;
							cursor: pointer;
							padding: 7px 16px;
						}
					}
				}
			}
		}
		.seal {
			width: 90px;
			height: 90px;
			padding: 4px;
			/*position: absolute;
			right: 18px;
			bottom: -8px;*/
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			.iconfont {
				font-size: 80px;
				color: #eaacb7;
				position: absolute;
				top: 11px;
				left: 5px;
				line-height: 1em;
				opacity: 0.9;
			}
			.text {
				transform: rotate(-19deg);
				font-size: 14px;
				color: #fff;
				text-align: center;
				z-index: 999;
			}
		}
		.archived {
			position: absolute;
			top: 66px;
			left: 166px;
			margin: -30px 0 0 -50px;
			opacity: 0.6;
		}
		.cooperation {
			width: 100%;
			padding: 15px 0;
			min-height: 86px;
			text-align: center;
			line-height: 24px;
			p {
				padding-left: 168px;
				text-align: left;
			}
			span {
				font-size: 18px;
				&.red {
					color: '#eaacb7';
				}
				&.green {
					color: '#44bcb7';
					font-size: 16px;
				}
			}
		}
	}
</style>

<template>
	<Card class="pactcard-list" v-if="listData">
		<div class="info">
			<div class="info-box">
				<h3 class="info-lf">
					{{listData.studentName}}
				</h3>
				<div class="info-gt">
					<div class="box">
						<p @click="goPreview" class="jump">合同名称：<span style="font-weight: bold;">{{listData.name}}</span></p>
						<p v-if="status=='wait'||status=='closed'">提交时间：{{listData.commitTime }}</p>
						<p v-if="status!='wait'&&status!='closed'">签约时间：{{listData.htSign.signTime }}</p>
						<p v-if="listData.status=='closed'">关闭时间：{{listData.closeTime}}</p>
						<p v-if="listData.status=='refund'">退款时间：{{listData.refundTime}}</p>
						<p v-if="listData.htSign.expectTime && status=='wait'">签约预约时间：{{listData.htSign.expectTime}}</p>
						<p>实际审批人：{{filterName(listData.accreditUserList)}}</p>
					</div>
					<div class="box">
						<p v-if="status=='wait'">合同编码：{{listData.code}}</p>
						<p v-else>合同编号：{{listData.no}}</p>
						<p class="blod fr">合同原价：<span class="green">{{price}}</span>&nbsp;万元&emsp;&emsp;签约金额：<span class="red">{{newPrice}}</span>&nbsp;万元</p>
						<p>授权审核人：{{filterName2(listData.accreditUserList)}}</p>
					</div>
				</div>
			</div>
			<div v-if="status!='collaborate'">
				<div class="btn" v-if="!listData.htContractItemList.length && status=='wait'">
					<Button type="primary" @click="appointment" v-text="listData.htSign.expectTime?'修改待签':'报待签'" v-if="listData.auditStatus!='reject'"></Button>
					<Button type="primary" @click="goEdit" v-if="listData.auditStatus=='reject'||listData.auditStatus=='agree'">编辑合同</Button>
					<Button type="primary" @click="promptly">立即签约</Button>
					<Button type="primary" @click="goConnect(listData.id, listData.studentId)" v-if="listData.receiptDetailStatus==1">交接后期</Button>
				</div>
				<div class="btn" v-if="!listData.htContractItemList.length && (listData.status=='signed' || listData.status=='accounted' || listData.status=='collected')">
					<Button type="primary" @click="accounting" v-if="(listData.receiptStatus==0||listData.rejectStatus==1)&&listData.status!='collected'">{{listData.rejectStatus=='1'?'重新报账':'立即报账'}}</Button>
					<Button type="primary" @click="goConnect(listData.id, listData.studentId)" v-if="listData.receiptDetailStatus==1">交接后期</Button>
				</div>
				<div class="btn" v-if="!listData.htContractItemList.length && listData.status=='closed'">
					<Button type="primary" @click="unClose" v-html="'取消关闭'"></Button>
					<Button type="primary" @click="goConnect(listData.id, listData.studentId)" v-if="listData.receiptDetailStatus==1">交接后期</Button>
				</div>
			</div>
		</div>
		<div class="other" v-if="listData.htContractItemList.length">
			<div class="price">
				<p class="blod pl5">折扣金额：<span class="red" v-text="listData.htSign.deratePrice?parseFloat((listData.htSign.deratePrice/1e4).toFixed(4)):0"></span>&nbsp;万元，赠送金额：<span class="red" v-text="listData.htSign.presentPrice?parseFloat((listData.htSign.presentPrice/1e4).toFixed(4)):0"></span>&nbsp;万元</p>
			</div>
			<div class="other-box">
				<h3 class="other-lf">
					补充协议：
					<span style="color: #44bcb7;display: block;cursor: pointer;" @click="journal('审核记录')">审核记录&emsp;</span>
				</h3>
				<div class="other-gt">
					<div class="policy">
						<Table border :columns="columns1" :data="listData.htContractItemList">
							<p></p>
							<table slot="footer" border="0" cellspacing="0" cellpadding="0" class="table">
								<tr>
									<td colspan="3" style="font-weight: normal;">总计</td>
									<td class="gt" v-text="listData.htSign.presentPrice?parseFloat((listData.htSign.presentPrice/1e4).toFixed(4))+'万元':0+'万元'">Data</td>
								</tr>
							</table>
						</Table>
						<p v-if="listData.protocolCustom">自定义条款：{{listData.protocolCustom}}</p>
					</div>
				</div>
			</div>
			<div v-if="status!='collaborate'" class="oFooter">
				<div class="btn" v-if="status=='wait'">
					<Button type="primary" @click="appointment" v-text="listData.htSign.expectTime?'修改待签':'报待签'" v-if="listData.auditStatus!='reject'"></Button>
					<Button type="primary" @click="goEdit" v-if="listData.auditStatus=='reject'||listData.auditStatus=='agree'" v-text="'编辑合同'"></Button>
					<Button type="primary" @click="promptly" v-if="(listData.auditStatus=='agree'||listData.auditStatus=='nocheck')">立即签约</Button>
					<Button type="primary" @click="goConnect(listData.id, listData.studentId)" v-if="listData.receiptDetailStatus==1">交接后期</Button>
				</div>
				<div class="btn" v-if="(listData.status=='signed' || listData.status=='accounted' || listData.status=='collected')">
					<Button type="primary" @click="accounting" v-text="listData.rejectStatus=='1'?'重新报账':'立即报账'" v-if="(listData.receiptStatus==0||listData.rejectStatus==1)&&listData.status!='collected'"></Button>
					<Button type="primary" @click="goConnect(listData.id, listData.studentId)" v-if="listData.receiptDetailStatus==1">交接后期</Button>
				</div>
				<div class="btn" v-if="listData.status=='closed'">
					<Button type="primary" @click="unClose" v-text="'取消关闭'"></Button>
					<Button type="primary" @click="goConnect(listData.id, listData.studentId)" v-if="listData.receiptDetailStatus==1">交接后期</Button>
				</div>
				<div class="stamp">
					<!--<Tooltip :content="_reason" class="reason" placement="top" v-if="show_reason">
						{{_reason}}
					</Tooltip>-->
					<div class="seal" v-if="listStatus=='wait'">
						<i class="iconfont icon-zhang" :style="{color:iconColor}"></i>
						<span class="text">{{iconText}}</span>
					</div>
					<div class="seal" v-if="listData.status=='refund'">
						<i class="iconfont icon-zhang" style="color:#999"></i>
						<span class="text">已退款</span>
					</div>
				</div>
			</div>
		</div>
		<div class="plan" v-if="status!='collaborate'">
			<h3 class="plan-lf">
				合同进度:
			</h3>
			<div class="plan-box">
				<div class="plan-cont">
					<div class="line">
						<p class="level" :style="{width:((long-1)*114)+'px'}"></p>
					</div>
					<Tooltip v-for="(item,index) in loading" :key="index" class="tenor" :class="{action:long>index}" :disabled="!item.time" placement="top" v-if="item.show">
						{{item.info}}
						<div slot="content" v-if="item.info=='审核'&& !!item.time">
							<p>审核人：{{item.who}}</p>
							<p>{{item.info}}时间：{{item.time}}</p>
						</div>
						<div slot="content" v-else-if="!!item.time">
							<p>{{item.info}}时间：{{item.time}}</p>
						</div>
						<span class="urge" :class="{dis:isUrge}" v-if="item.eve && !close && listData.status=='committed' && listData.auditStatus!='reject'" @click="urgeAudit" v-text="isUrge?min+'s':'催办'"></span>
					</Tooltip>
				</div>
			</div>
		</div>
		<div class="cooperation" v-else>
			<p v-for="item in listData.htPartnerList" v-if="listData.htPartnerList.length">
				合作人：<span class="green" v-text="item.partnerName"></span>，分成比例：<span class="red" v-text="parseFloat((Number(item.ratio)*1e2).toFixed(2))+'%'"></span>，分成金额<span class="red" v-text="parseFloat((Number(item.ratioAmount)/1e4).toFixed(4))">2</span>万元。
			</p>
			<span v-if="!listData.htPartnerList.length">
				暂无合作人
			</span>
		</div>
		<div class="sw">
			<Dropdown class="dropdown" placement="left-start">
				<Icon type="more"></Icon>
				<DropdownMenu slot="list">
					<DropdownItem><span @click="offPlan" v-if="status=='wait' && listData.auditStatus!='waiting'">关闭合同</span></DropdownItem>
					<DropdownItem><span @click="redact" v-if="status=='wait' && (listData.auditStatus=='reject ' || listData.auditStatus=='nocheck'||listData.auditStatus=='agree')">编辑合同</span></DropdownItem>
					<DropdownItem><span @click="make" v-if="listData.status=='signed'">修改签约</span></DropdownItem>
					<DropdownItem><span @click="account" v-if="listData.receiptStatus==1 && status=='signed'">修改报账</span></DropdownItem>
					<DropdownItem><span @click="file" v-if="status!='wait' && listData.status!='refund'" v-text="listData.isArchived!=1?'立即存档':'修改存档'">修改存档</span></DropdownItem>
					<DropdownItem><span @click="journal('合同日志')">合同日志</span></DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</div>
		<div class="archived" v-if="listData.isArchived==1">
			<img src="../assets/myPact/archived.png" />
		</div>
	</Card>
</template>

<script>
	import { mapMutations } from 'vuex';
	import valid, {
		errors,
		contract
	} from "../libs/request";
	export default {
		props: {
			list: {
				type: Object,
				default: () => {
					return {};
				}
			},
			isClose: {
				type: Boolean,
				default: () => {
					return false;
				}
			},
			status: {
				type: String,
				default: () => {
					return '';
				}
			},
		},
		data() {
			return {
				isUrge: false,
				min: 60,
				columns1: [{
						title: '促签项目',
						align: 'center',
						key: 'policyName'
					},
					//					{
					//						title: '权限级别',
					//						align: 'center',
					//						key: 'level'
					//					},
					{
						title: '优惠条款',
						align: 'center',
						key: 'name'
					},
					{
						title: '赠送金额',
						align: 'center',
						key: 'publicPrice',
						render: (h, params) => {
							return h('div', {}, params.row.type == 'gift' ? (parseFloat((Number(params.row.publicPrice) * Number(params.row.giftCount) / 1e4).toFixed(4)) + '万元') : 'N/A');
						}
					}
				],
			}
		},
		computed: {
			_reason() {
				if(this.listData.htOptStatusLog.reject) {
					let leng = this.listData.htOptStatusLog.reject.length;
					return this.listData.htOptStatusLog.reject[0].reason;
				}
			},
			show_reason() {
				if(this.listData.auditStatus == 'reject') {
					return true;
				} else {
					return false;
				}
			},
			iconColor() {
				//				if(this.listData.auditStatus==)
				switch(this.listData.auditStatus) {
					case 'agree':
						return '#44bcb7'
						break;
					case 'reject':
						return '#eaacb7'
						break;
					case 'waiting':
						return '#e6d096'
						break;
					case 'nocheck':
						return '#44bcb7'
						break;
					default:
						break;
				}
			},
			iconText() {
				//				if(this.listData.auditStatus==)
				switch(this.listData.auditStatus) {
					case 'agree':
						return '通过'
						break;
					case 'reject':
						return '驳回'
						break;
					case 'waiting':
						return '待审'
						break;
					case 'nocheck':
						return '免审'
						break;
					default:
						break;
				}
			},
			listStatus() {
				return this.status;
			},
			loading() {
				let arr = [{
						'key': 'commit',
						'info': '提交',
						eve: '',
						show: true,
					},
					{
						'key': 'sign',
						'info': '签约',
						eve: '',
						show: !this.close,
					},
					{
						'key': 'account',
						'info': '报账',
						eve: '',
						show: !this.close,
					},
					{
						'key': 'collecting bill',
						'info': '收款',
						eve: '',
						show: !this.close,
					},
				];
				if(this.listData.auditStatus != 'nocheck') {
					arr.splice(1, 0, {
						'key': 'agree',
						'info': '审核',
						eve: '催办',
						show: true,
						who: ''
					});
				}
				if(this.listStatus == "closed") {
					arr.push({
						'key': 'close',
						'info': '关闭',
						eve: '',
						show: true,
					});
				} else if(this.listData.status == "refund") {
					arr.push({
						'key': 'refund',
						'info': '退款',
						eve: '',
						show: !this.close,
					});
				} else {
					arr.push({
						'key': 'finish',
						'info': '完成',
						eve: '',
						show: !this.close,
					});
				}
				arr.forEach((v, k) => {
					if(!!this.listData.htOptStatusLog[v.key]) {
						v.time = this.listData.htOptStatusLog[v.key][0].optTime;
						if(v.key == 'check' || v.key == 'agree') {
							v.who = this.listData.htOptStatusLog[v.key][0].optUserName;
						}
					} else {
						v.time = '';
					}
				})
				return arr;
			},
			long() {
				let status = this.listData.status;
				let isArchived = this.listData.isArchived;
				if(this.listData.auditStatus == 'nocheck') {
					if(status.search(/committed/) > -1) return 1;
					if(status.search(/checked/) > -1) return 1;
					if(status.search(/signed/) > -1) return 2;
					if(status.search(/accounted/) > -1) return 3;
					if(status.search(/collected/) > -1) return 4;
					if(isArchived == 1) return 5;
					if(status.search(/closed/) > -1) return 6;
					if(status.search(/finished/) > -1) return 6;
					if(status.search(/refund/) > -1) return 6;
				} else {
					if(status.search(/committed/) > -1) return 1;
					if(status.search(/checked/) > -1) return 2;
					if(status.search(/signed/) > -1) return 3;
					if(status.search(/accounted/) > -1) return 4;
					if(status.search(/collected/) > -1) return 5;
					if(isArchived == 1) return 6;
					if(status.search(/closed/) > -1) return 7;
					if(status.search(/finished/) > -1) return 7;
					if(status.search(/refund/) > -1) return 7;
				}
			},
			close() {
				return this.isClose;
			},
			listData() {
				return this.list;
			},
			price() {
				return parseFloat((this.listData.price / 1e4).toFixed(4));
			},
			newPrice() {
				if(this.listData.htSign.signPrice) {
					return parseFloat((this.listData.htSign.signPrice / 1e4).toFixed(4));
				} else {
					return parseFloat((this.listData.price / 1e4).toFixed(4));
				}
			},
			deratePrice() {
				return parseFloat((this.listData.htSign.signPrice / 1e4).toFixed(4));
			}
		},
		methods: {
			...mapMutations(['updateLoadingStatus']),
			offPlan() {
				this.$emit('off', this.listData)
			},
			redact() {
				this.$emit('redact', this.listData)
			},
			make() {
				this.$emit('make', this.listData)
			},
			account() {
				this.$emit('account', this.listData)
			},
			file() {
				this.$emit('file', this.listData, this.listData.isArchived != 1 ? '立即存档' : '修改存档')
			},
			//			transfer(){
			//				this.$emit('transfer',this.listData)
			//			},
			journal(tit) {
				this.$emit('journal', this.listData, tit)
			},
			appointment() {
				this.$emit('appointment', this.listData)
			},
			goEdit() {
				this.$router.push({
					name: 'sign.contractGeneration',
					query: {
						id: this.list.tplId,
						mid: this.list.id
					}
				})
			},
			promptly() {
				this.$emit('promptly', this.listData)
			},
			urgeAudit() {
				if(!this.isUrge) {
					this.$emit('urgeAudit', this.listData)
					let _t = this;
					this.isUrge = true;

					function time() {
						_t.min--;
						window.setTimeout(function() {
							if(_t.min <= 0) {
								_t.min = 60;
								_t.isUrge = false;
							} else {
								time()
							}
						}, 1000)
					}
					time();
				}
			},
			accounting() {
				this.$emit('accounting', this.listData)
			},
			//交接后期
			goConnect(id, studentId) {
				this.updateLoadingStatus({
					isLoading: true
				})
				contract.handover({
						id: id
					})
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.updateLoadingStatus({
								isLoading: false,
								loadingBg: false
							})
							this.$router.push({
								name: 'sign.connectedit',
								query: {
									studentId: res.data.data.studentId,
									groupId: res.data.data.groupId,
									//phase:'sign'
								}
							})
						}

					})
					.catch(errors.call(this))
					.finally(() => {});
			},
			unClose() {
				this.$emit('unClose', this.listData)
			},
			goPreview() {
				this.$emit('goPreview', this.listData)
			},
			filterName(val){
				if(!val.length) return
				if(this.listData.auditStatus=='agree'||this.listData.auditStatus=='reject'){
					return val[0].name;
				}else{
					return '';
				}
				
			},
			filterName2(value){
				if(!value.length) return
				let nameStr = ''
				value.forEach((item, key) => {
					nameStr += item.name + ' '
				})
				return nameStr
			}
		},
	}
</script>