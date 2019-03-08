<style lang="less">
	.sign_contract_generation {
		@color: #44bcb7;
		padding-bottom: 100px;
		border-top: 1px solid #e0e0e0;
		.top {
			padding-top: 10px;
			.colLT {
				span {
					font-size: 14px;
					color: #333333;
					line-height: 2;
					b {
						font-weight: normal;
						color: #FF0000;
					}
				}
			}
			.btnCOL {
				text-align: right;
				button {
					width: 130px;
					height: 32px;
				}
			}
		}
		.tip {
			span {
				color: #ff0000;
			}
			margin: 40px 0;
		}
		.form-content {
			min-width: 1200px;
			.cooperator {
				display: flex;
			}
			.item-list {
				display: flex;
				flex-wrap: wrap;
				.item {
					margin: 20px 10px 0 0;
					padding: 0 8px;
					background-color: @color;
					color: #fff;
					span {
						margin-right: 8px;
						&:nth-last-of-type(1) {
							margin: 0;
							cursor: pointer;
						}
					}
				}
			}
			.MenuTit {
				/*display: inline-block;*/
				margin-top: 40px;
				.titName {
					display: inline-block;
					font-size: 16px;
					font-weight: bold;
				}
				.titTip {
					display: inline-block;
					font-size: 14px;
					color: #999999;
					.red {
						color: #FF0000;
					}
				}
			}
			.formBox {
				margin-top: 20px;
				.addParentBtn {
					padding-bottom: 14px;
					text-align: right;
					padding-right: 95px;
				}
				.chooseStudent {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					.search {
						height: 32px;
						line-height: 32px;
						.select-able {
							.main-input {
								border-radius: 4px 0px 0px 4px;
							}
						}
					}
					.addStudent {
						width: 47px;
						height: 32px;
						line-height: 32px;
						display: inline-block;
						padding: 0;
						text-align: center;
						border-radius: 0px 4px 4px 0px;
					}
				}
				.clientInfo {
					background: #f5f5f5;
					padding: 14px 0;
					margin-bottom: 24px;
					.ivu-form-item {
						margin-bottom: 0px;
					}
					.addStudent {
						width: 56px;
						height: 28px;
						line-height: 28px;
						display: inline-block;
						padding: 0 6px;
						text-align: center;
						border-radius: 4px;
						/*margin-left: 96px;*/
					}
				}
			}
		}
		.big-create-wrap {
			text-align: center;
			.big-create {
				padding: 12px 24px;
				font-size: 14px;
			}
		}
		.protocol_content {
			.ivu-input-wrapper {
				width: 120px;
			}
		}
		.empty {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 50px;
			p {
				color: #CCCCCC;
				font-size: 14px;
				text-align: center;
				padding-top: 14px;
			}
		}
		.submit-btns {
			position: fixed;
			bottom: 10px;
			right: 20px;
			background: #e7ebf1;
			height: 60px;
			z-index: 999;
			padding: 0 24px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.balance {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.ivu-dropdown .ivu-select-dropdown {
					top: inherit !important;
					bottom: -5px !important;
					background: #e7ebf1;
				}
				.balance_tit {
					font-size: 16px;
					font-weight: 600;
				}
				.balance_price {
					margin: 0 30px;
					.red {
						color: #ff3333;
						font-size: 18px;
					}
				}
				.ivu-dropdown {
					.ivu-select-dropdown {
						margin-right: 15px !important;
					}
				}
				.dropdown_tit {
					font-size: 16px;
					font-weight: 600;
					line-height: 50px;
					padding: 0 22px;
					border-bottom: 1px #e0e0e0 solid;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.dropdown_titLf {}
					.dropdown_close {
						cursor: pointer;
					}
				}
				.dropdown_menu {
					padding: 16px;
					.infoName {
						.ivu-form-item-label,
						.ivu-form-item-content {
							font-size: 14px;
						}
						.ivu-form-item-content {
							line-height: 34px;
						}
					}
					p {
						line-height: 20px;
					}
					.saleSel {
						.ivu-tag {
							background: #44bcb7;
							.ivu-tag-text,
							.ivu-icon-ios-close-empty {
								color: #FFFFFF;
							}
						}
					}
					.info {
						.ivu-form-item {
							margin-bottom: 14px;
						}
						.ivu-tag {
							margin: 4px 8px 4px 0;
							line-height: 12px;
							padding: 6px 12px;
							border: 1px #ccc solid;
							background: #F5F5F5;
							height: 24px;
						}
					}
					.total {
						.ivu-form-item-label {
							font-size: 14px;
						}
						.ivu-form-item {
							margin-bottom: 0px;
						}
						p {
							text-align: right;
							line-height: 34px;
							font-size: 16px;
							.money {
								font-size: 18px;
							}
							.red {
								color: #FF0000;
							}
						}
					}
				}
			}
			.btns {
				display: flex;
				justify-content: space-between;
				align-items: center;
				button {
					padding: 5px 28px;
					font-size: 14px;
				}
			}
		}
		.intro {
			margin: 20px 0;
			font-weight: bold;
			.bgreen {
				color: @color;
				font-size: 14px;
			}
			.bred {
				color: #f00;
				font-size: 14px;
			}
		}
	}
</style>
<template>
	<div class="sign_contract_generation">
		<div v-show="!$route.query.pid">
			<div class="top">
				<Row>
					<Col span="12" class="colLT">
					<div>
						<span>合同名称：</span>
						<span>{{info.name}}</span>
					</div>
					<div>
						<span>合同价格：</span>
						<span>￥&nbsp;<b>{{info.price}}</b>&nbsp;元</span>
					</div>
					</Col>
					<Col span="8">
					<div v-if="info.tags">
						<Tag v-for="(item,index) in info.tags.split('-')" :key="index">{{item}}</Tag>
					</div>
					</Col>
					<Col span="4">
					<div class="btnCOL">
						<Button type="primary" v-show="formData.isSelfGroup!=1&&info.parentType=='abroad'" @click="upgrade">升级为自组单</Button>
					</div>
					</Col>
				</Row>
			</div>
			<div class="form-content">
				<Form :model="formData" ref="generation" :rules="rules" :label-width="124">
					<div class="MenuTit">
						<div class="title">
							<div class="titName">客户信息</div>
							<div class="titTip">
								（带<span class="red">*</span>号表示必填）
							</div>
						</div>
					</div>
					<div class="formBox">
						<Row type="flex">
							<Col span="10">
							<FormItem label="选择学员：">
								<div class="chooseStudent">
									<v-select style="width: 354px;" class="search" icon="search" placeholder="输入学员编号/手机号搜索" v-model="searchValue" k='studentName' :datafunc="searchDropList" @on-enter="textChange" @on-click="textChange" @selected="textChange" o="phone" :otherStyle="{'text-align':'right'}">
									</v-select>
									<Button type="ghost" class="addStudent" @click="addStudent">新增</Button>
								</div>
							</FormItem>
							</Col>
							<Col span="10" push="2">
							<FormItem prop="signType" label="签约类型：">
								<RadioGroup v-model="formData.signType">
									<Radio :label="item.value" v-for="(item, index) in dictData.ht_contract_sign_type" :key="index">{{item.label}}</Radio>
								</RadioGroup>
							</FormItem>
							</Col>
						</Row>
						<div class="clientInfo">
							<Row type="flex">
								<Col span="6">
								<FormItem label="客户编号：">
									{{formData.ecId||'- -'}}
								</FormItem>
								</Col>
								<Col span="6">
								<FormItem label="客户来源：">
									{{formData.source?ecChannels.find(v=>formData.source==v.id).name:'- -'}}
								</FormItem>
								</Col>
								<Col span="6">
								<FormItem label="申请类别：">
									{{formData.apply?applyTypes.find(v=>formData.apply==v.value).label:'- -'}}
									<Button type="primary" class="addStudent" @click="editStudent" style="float: right;margin-top: 2px;"><Icon type="compose" size="14"></Icon>&nbsp;编辑</Button>
								</FormItem>
								</Col>
							</Row>
							<Row type="flex">
								<Col span="6">
								<FormItem label="学生姓名：">
									{{formData.lastName+formData.firstName||'- -'}}
								</FormItem>
								</Col>
								<Col span="6">
								<FormItem label="联系电话：">
									{{formData.phone||'- -'}}
								</FormItem>
								</Col>
								<Col span="6">
								<FormItem label="入学年份：">
									{{formData.year||'- -'}}
								</FormItem>
								</Col>
							</Row>
							<Row type="flex">
								<Col span="6">
								<FormItem label="身份证号：">
									{{formData.studentIdentity||'- -'}}
								</FormItem>
								</Col>
								<Col span="6">
								<FormItem label="联系地址：">
									{{formData.address||'- -'}}
								</FormItem>
								</Col>
								<Col span="6">
								<FormItem label="监护人/代理人姓名：">
									{{formData.agentName||'- -'}}
								</FormItem>
								</Col>
							</Row>
							<Row type="flex">
								<Col span="6">
								<FormItem label="家长身份证号：">
									{{formData.agentIdentity||'- -'}}
								</FormItem>
								</Col>
								<Col span="6">
								<FormItem label="家长邮箱：">
									{{formData.email||'- -'}}
								</FormItem>
								</Col>
								<!--<Col span="6">
								<FormItem label="客户手机号：">
									{{formData.phone?formData.phone:'-_-！'}}
								</FormItem>
								</Col>-->
							</Row>
						</div>
					</div>
					<div class="showbtn" v-if="formData.isSelfGroup==1">
						<div class="MenuTit" style="margin-bottom: 24px;">
							<div class="title">
								<div class="titName">补充协议</div>
								<div class="titTip">
									（请您选择补充协议项目并按标准填写相关内容。）
								</div>
							</div>
						</div>
						<v-btn v-for="(item,index) in htCourseList" :key="'v_btn'+index" :data="item" :item-card-list="itemCourseList" @on-click="showCourseTab"></v-btn>
						<subjoincard v-for="(item,index) in itemCourseList" :actualPrice="contPrice" :sharePrice="deratePriceNew" :protocolExemptionPrice="formData.protocolExemptionPrice" :infoPrice="infoPrice" :key="'v_item_card'+item.index" :data="item" :info="info" @on-close="itemCourseClose" @on-change="" @balance="balance" ref="course">
						</subjoincard>
					</div>
					<div class="showbtn" v-if="formData.isSelfGroup!=1&&info.parentType=='trainning'">
						<div class="MenuTit" style="margin-bottom: 24px;">
							<div class="title">
								<div class="titName">课程选择</div>
								<div class="titTip">
									（请您选择补充协议项目并按标准填写相关内容。）
								</div>
							</div>
						</div>

						<v-btn v-for="(item,index) in htDealList" :key="'v_btn'+index" :data="item" :item-card-list="itemSubList" @on-click="showSubTab"></v-btn>
						<subjoincard v-for="(item,index) in itemSubList" :key="'v_item_card'+item.index" :data="item" :actualPrice="contPrice" :sharePrice="deratePriceNew" :protocolExemptionPrice="formData.protocolExemptionPrice" :infoPrice="infoPrice" :info="info" @on-close="itemSubClose" @on-change="" @balance="balance" ref="subjoin">
						</subjoincard>
					</div>
					<div v-if="formData.isProtocol==1" class="showbtn">
						<!--<div class="tip">-->
						<div class="MenuTit" style="margin-bottom: 24px;">
							<div class="title">
								<div class="titName">优惠政策</div>
								<div class="titTip">
									（请您选择补充协议项目并按标准填写相关内容。）
								</div>
							</div>
						</div>
						<!--</div>-->

						<v-btn v-for="(item,index) in htPolicyList" :key="'v_btn'+index" :data="item" :item-card-list="itemCardList" @on-click="showTab" v-if="htPolicyList.length"></v-btn>
						<!--<div class="intro" v-if="itemCardList.length">
							您当前已选择 <span class="bgreen">{{itemCardList.length}}</span> 条优惠项目,已优惠 <span class="bred">{{totalCheap}}</span> 元，审批人 <span class="bgreen">{{reviewer}}</span>
						</div>-->
						<div class="empty" v-else>
							<img src="../../assets/images/empty.png" />
							<!--<p>该产品大类下没有设置优惠政策，<br />请联系管理员解决</p>-->
						</div>
						<v-item-card v-for="(item,index) in itemCardList" :key="'v_item_card'+item.index" :data="item" :info="info" :totalPrice="totalPrice" :contPrice="contPrice" @on-close="itemCardClose" @on-change="onPolicyCheapChange" @sale="sale" ref="disitem">
						</v-item-card>
					</div>
					<div class="submit-btns">
						<div class="balance">
							<div class="balance_tit">结算</div>
							<div class="balance_price">合同价格：<span class="red">￥{{number_format(formData.signPriceNew,0,'.',',')}}</span></div>
							<Dropdown trigger="custom" :visible="balanceVisible" placement="top-start">
								<a href="javascript:void(0)" @click="balanceShow">
									详细
									<Icon type="arrow-up-a"></Icon>
								</a>
								<DropdownMenu slot="list">
									<div class="dropdown_tit">
										<div class="dropdown_titLf">结算</div>
										<span class="dropdown_close" @click="balanceVisible=!balanceVisible">
						            		<Icon type="chevron-down"></Icon>
						            	</span>
									</div>
									<div class="dropdown_menu" style="padding-bottom: 0;">
										<Row align="top" type="flex" style="padding-bottom: 28px;">
											<Col span="12" class="info infoName">
											<FormItem label="合同名称：" :label-width="110">{{info.name}}</FormItem>

											<Row align="top" type="flex" style="padding-bottom: 0px;">
												<Col span="7">
												<FormItem label="主合同定价：" :label-width="110">{{number_format(info.price,2,'.',',')}}&nbsp;元</FormItem>
												</Col>
												<Col span="7">
												<FormItem label="主合同实收：" :label-width="110">{{number_format(info.price-((info.price/contPrice*deratePriceNew)||0)-formData.contractExemptionPrice,2,'.',',')}}&nbsp;元</FormItem>
												</Col>
												<Col span="7">
												<FormItem label="任意减免：" :label-width="110" v-if="info.parentType!='trainning'">
													<Input v-model="formData.contractExemptionPrice" style="width:130px;" @on-blur="concessions()"><span slot="append">元</span></Input>
												</FormItem>
												</Col>
											</Row>
											<Row align="top" type="flex" style="padding-bottom: 0px;">
												<Col span="7">
												<FormItem label="补充协议定价：" :label-width="110">{{number_format((totalPrice||info.price)-info.price,2,'.',',')}}&nbsp;元</FormItem>
												</Col>
												<Col span="7">
												<FormItem label="补充协议实收：" :label-width="110">{{number_format((signPrice||info.price)-info.price,2,'.',',')}}&nbsp;元</FormItem>
												</Col>
												<Col span="7">
												<FormItem label="任意减免：" :label-width="110" v-if="formData.isSelfGroup==1||info.parentType=='trainning'">
													<Input v-model="formData.protocolExemptionPrice" style="width:130px;" @on-blur="concessions()"><span slot="append">元</span></Input>
												</FormItem>
												</Col>
											</Row>
											<FormItem label="增值金额：" :label-width="110">{{number_format(formData.increasePriceNew,2,'.',',')}}&nbsp;元</p>
											</FormItem>
											<FormItem label="合同标签：" :label-width="110">
												<div v-if="info.tags">
													<Tag v-for="(item,index) in info.tags.split('-')" :key="index">{{item}}</Tag>
												</div>
											</FormItem>
											<Row type="flex">
											</Row>
											</Col>
											<Col span="6" push="4">
											<div class="total">
												<FormItem label="" :label-width="1" v-if="formData.isSelfGroup==1">
													<p v-if="this.formData.signPriceNew>350000" style="text-align: left;padding-left: 26px;">
														<Checkbox v-model="formData.isElite" :true-value="1" :false-value="0">升级为菁英（IvyElite）序列</Checkbox>
													</p>
													<p v-else style="text-align: left;font-size: 14px;">还差<span class="red">{{number_format(350000-formData.signPriceNew,0,'.',',')}}</span>&nbsp;元，可升级为“菁英（IvyElite）序列”</p>
												</FormItem>
												<FormItem label="合同款总计：">
													<p style="width:140px"><span class="money">{{number_format(formData.price,2,'.',',')}}</span>&nbsp;元</p>
												</FormItem>
												<FormItem label="优惠款总计：">
													<p style="width:140px"><span class="money">{{number_format(formData.deratePriceNew,2,'.',',')}}</span>&nbsp;元</p>
												</FormItem>
												<FormItem label="合同应收款：">
													<p style="width:140px"><span class="money red">{{number_format(formData.signPriceNew,2,'.',',')}}</span>&nbsp;元</p>
												</FormItem>
											</div>
											</Col>
										</Row>
										<Row>
											<Col span="24">
											<div class="btns" style="padding-right: 36px;justify-content: flex-end;height: 50px;">
												<Button type="primary" @click="preview">预览</Button>
												<Button type="primary" @click="generate" style="margin-left: 36px">生成合同</Button>
												<!-- <Button type="primary" @click="generate" style="margin-left: 36px" :disabled="freeze">生成合同</Button> -->
											</div>
											</Col>
										</Row>
									</div>
								</DropdownMenu>
							</Dropdown>
						</div>
						<div class="btns">
							<Button type="primary" @click="preview">预览</Button>
							<Button type="primary" @click="generate" style="margin-left: 36px">生成合同</Button>
							<!-- <Button type="primary" @click="generate" style="margin-left: 36px" :disabled="freeze">生成合同</Button> -->
						</div>
					</div>
				</Form>
			</div>
		</div>
		<template v-if="$route.query.pid">
			<preview :info="previewData" :preview="true" :pdfinfo="pdfInfo" @go-edit="goEdit">
			</preview>
			<div class="big-create-wrap">
				<Button type="primary" class="big-create" @click="createNow">立即生成</Button>
			</div>
		</template>
		<student-model ref="stuModel" @studOk="studOk" :applyTypes="applyTypes" :ecChannels="ecChannels" :ecInfo="ecInfo"></student-model>
		<student-model ref="stuEditModel" @studOk="stuEditOk" :editList="formData" :applyTypes="applyTypes" :ecInfo="ecInfo" :ecChannels="ecChannels"></student-model>
	</div>
</template>
<script>
	const othersId = -100;
	let t;
	let index = 0;
	import { mapMutations, mapGetters, mapState } from 'vuex';
	import vBtn from "./component/vBtn";
	import vItemCard from "./component/vItemCard";
	import preview from '../../modules/preview.vue';
	import valid, {
		errors,
		htPolicy,
		contract,
		htContractTpl,
		ec,
		updateIsContract,
		common
	} from '../../libs/request.js';
	import { sys as publicSys } from '@public/libs/request.js';
	import { getHtPolicyList } from '../../store/index.js';
	import { arrayRemove, extendKey, validIdCard, clone } from '../../libs/util.js';
	import studentModel from "./component/studentModel";
	import vSelect from '../../modules/vSelect.vue';
	import subjoinCard from './component/subjoinCard.vue';
	export default {
		name: "ContractGeneration",
		data() {
			const must = [{
				required: true,
				message: '该项为必填',
				trigger: 'blur'
			}, ]
			let self = this;
			return {
				typeMap: ['abroad', 'trainning', 'single_product', 'other'],
				searchValue: '',
				dictData: {},
				htPolicyList: getHtPolicyList(),
				htDealList: [],
				htCourseList: [],
				itemSubList: [],
				itemCourseList: [],
				info: {
					htOptLogList: [],
					htPartnerList: [],
					htSign: {
						sellerOffice: {}
					},
					attachments: []
				},
				pdfInfo: {},
				ecChannels: [],
				ecInfo: {
					data: {},
				},
				applyTypes: [],
				userMapList: [],
				userMapListLoading: false,

				previewData: {
					previewId: this.$route.query.pid,
					htSign: {},
					attachments: []
				},
				editView: {
					eid: ''
				},
				formData: {
					ecId: '',
					source: '',
					lastName: '',
					firstName: '',
					apply: '',
					studentIdentity: '',
					agentName: '',
					agentIdentity: '',
					phone: '',
					address: '',
					year: '',
					email: '',
					signType: 'new',
					isProtocol: '1',
					htContractData: {
						settingJson: "",
						resultJson: ""
					},
					isSelfGroup: 0,
					contractExemptionPrice: 0,
					protocolExemptionPrice: 0,
					signPriceNew: 0,
					price: 0,
					tplId: '',
					deratePriceNew: 0,
					presentPriceNew: 0,
					presentPriceCostNew: 0,
					increasePriceNew: 0,
					isElite: false,
				},
				tmpData: {
					htSign: {},
					htAuditorList: [],
				},
				studentId: '',
				studendreaded: false,
				freeze: false,
				rules: {},
				itemCardList: [],
				screenWidth: document.body.clientWidth,
				contPrice: 0,
				balanceVisible: false,
				totalPrice: 0,
				actualPrice: 0,
				signPrice: 0,
				deratePriceNew: 0,
				infoPrice: 0,
				ratio: 100,
			}
		},
		computed: {
			...mapGetters('sign', ['roleId']),
			...mapState(['userInfo']),
			totalCheap() {
				if(Object.keys(this.tmpData.htSign).length > 0) {
					return(this.tmpData.htSign.deratePrice + this.tmpData.htSign.presentPrice).toFixed(0);
				}
				return 0;
			},
			reviewer() {
				let arr = [];
				this.tmpData.htAuditorList.forEach(item => {
					arr.push(item.auditorName);
				})
				return arr.join(',');
			},
		},
		components: {
			vBtn,
			vItemCard,
			preview,
			vSelect,
			studentModel,
			subjoincard: subjoinCard
		},
		created() {
			//			if(this.$route.query.mid) {
			//				let params = {
			//					id: this.$route.query.mid
			//				};
			//				contract.form(params).then(valid.call(this)).then(res => {
			//					if(res.ok) {
			//						this.formData.isSelfGroup = res.data.data.isSelfGroup;
			//					}
			//				}).catch(errors.call(this));
			//			}
			this.initPage();
			common.batchListData({
				types: 'ht_contract_sign_type,ht_parent_relation,ht_receipt_detail_type'
			}).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.dictData = res.data.data;
				}
			}).catch(errors.call(this));
		},
		mounted() {
			this.$nextTick(() => {
				let wid = this.$el.children[0].clientWidth;
				this.$el.querySelector(".submit-btns").style.width = wid + 'px';
				this.$el.querySelector(".dropdown_menu").style.width = wid + 'px';
				const that = this
				window.onresize = () => {
					return(() => {
						window.screenWidth = document.body.clientWidth
						that.screenWidth = window.screenWidth
					})()
				};
				if(window.addEventListener) //FF,火狐浏览器会识别该方法
					window.addEventListener('DOMMouseScroll', this.wheel, false);
				window.onwheel = document.onwheel = this.wheel; //W3C
			})
			if(this.$route.query.cusCode) { // 从跟单页跳到合同页，再跳过来，自动根据cusCode填充ec信息
				this.formData.ecId = this.$route.query.cusCode;
				this.$refs.generation.validateField('ecId'); // 触发根据id取得ec信息
			}
		},
		beforeDestroy() {
			this.stopPolling();
			if(window.removeEventListener) //FF,火狐浏览器会识别该方法
				window.removeEventListener('DOMMouseScroll', this.wheel, false);
			window.onwheel = document.onwheel = function() {}; //W3C
		},
		methods: {
			...mapMutations(['updateLoadingStatus']),
			//统一处理滚轮滚动事件
			wheel(event) {
				var delta = 0;
				if(!event) event = window.event;
				if(event.wheelDelta) { //IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
					delta = event.wheelDelta / 120;
					if(window.opera) delta = -delta; //因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
				} else if(event.detail) { //FF浏览器使用的是detail,其值为“正负3”
					delta = -event.detail / 3;
				}
				if(delta)
					this.handle(delta);
			},
			//上下滚动时的具体处理函数
			handle(delta) {
				let dom = document.querySelector('.sign_container .s-content');
				if(delta < 0) { //向下滚动
					if(this.getScrollTop() + this.getWindowHeight() == this.getScrollHeight()) {　　　　
						document.querySelector('.sign_contract_generation').style.paddingBottom = "400px";
						dom.scrollTop = dom.scrollTop + 250;
						this.balanceVisible = true;
					}
				} else { //向上滚动
					if(this.getScrollTop() + this.getWindowHeight() == this.getScrollHeight()) {
						document.querySelector('.sign_contract_generation').style.paddingBottom = "50px";
						if(this.balanceVisible) {
							this.balanceVisible = false;
							setTimeout(() => {
								dom.scrollTop = dom.scrollTop + 250;
							}, 50)
						}
					}
				}
			},
			getApplyTypes() {
				publicSys.dictListData({
					type: 'xx_student_apply'
				}).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.applyTypes = res.data.data;
					}
				}).catch(errors.call(this));
			},
			getStudentId(phone, callback) { // 通过手机号获取studentId,若取到studentId则加入到最终的表单中
				let apply = this.formData.apply;
				if(!phone) {
					this.$Message.error('请输入手机号')
					return false;
				}
				if(!apply) {
					this.$Message.error('请选择申请阶段')
					return false;
				}
				return contract.checkPhone(phone, apply).then(valid.call(this)).then(res => {
					if(res.ok) {
						const r = res.data.data;
						if(r && r.studentId) {
							this.studentId = r.studentId;
							this.$Modal.confirm({
								title: '绑定学生',
								content: `${r.groupName?('已存在【'+r.groupName+'】服务组'):'已存在此学生'},是否绑定？`,
								onOk: () => {
									callback();
									this.freeze = false;
									this.studendreaded = true;
								},
								onCancel: () => {
									callback([new Error("已取消操作")]);
									this.freeze = true;
									this.studendreaded = false;
								}
							});
						} else {
							callback();
						}
					}
				}).catch(errors.call(this));
			},
			htContractItemList() {
				let itemList = []
				if(this.itemCardList && this.$refs.disitem && this.$refs.disitem.length) {
					let arr = this.$refs.disitem.map(item => {
						return item.chooseData();
					});
					itemList = itemList.concat(arr);
				}
				if(this.itemSubList && this.$refs.subjoin && this.$refs.subjoin.length) {
					let arr = this.$refs.subjoin.map(item => {
						return item.chooseData();
					})
					itemList = itemList.concat(arr);
				}
				if(this.itemCourseList && this.$refs.course && this.$refs.course.length) {
					let arr = this.$refs.course.map(item => {
						return item.chooseData();
					})
					itemList = itemList.concat(arr);
				}
				let arr = [];
				itemList.filter(item => item.itemId != '').forEach(v => {
					arr = arr.concat(v);
				})
				return arr;
			},
			tpls() {
				let arr = [];
				if(this.itemCardList && this.$refs.disitem && this.$refs.disitem.length) {
					const itemList = this.$refs.disitem.map(item => {
						return item.policy.tpl;
					})
					arr = itemList.filter(item => item.itemId != '');
				}
				arr = arr.map((item, i) => {
					return `1.${i+1} ${item}`
				});
				return arr.join('\r\n');
			},
			remoteMethod(name) {
				if(name) {
					this.userMapListLoading = true;
					common.listAllUserMap({
						name
					}).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.userMapList = res.data.data;
						}
					}).catch(errors.call(this)).finally(() => {
						this.userMapListLoading = false;
					});
				}
			},
			initPage() {
				this.getEcChannels();
				this.getApplyTypes();
				let cb = () => {
					if(this.$route.query.eid) { // 预览返回编辑
						this.getPreviewData(this.$route.query.eid, data => {
							this.editView = data;
							this.restoreEdit(data);
						});
					}

					if(this.$route.query.mid) { // 创建完成后的编辑
						this.getInfo(this.$route.query.mid, data => {
							this.editView = data;
							this.restoreEdit(data);
						});
					}
				}
				if(this.$route.query.mid) { // 创建完成后的编辑
					const params = {
						id: this.$route.query.mid
					};
					contract.form(params).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.formData.htContractData = res.data.data.htContractData;
							this.formData.isSelfGroup = res.data.data.isSelfGroup;
							htContractTpl.form({
								id: this.$route.query.id
							}).then(valid.call(this)).then(res => {
								if(res.ok) {
									this.info = res.data.data;
									this.balance();
								}
							}).catch(errors.call(this)).finally(() => {
								this.getListData(cb);
							});
						}
					}).catch(errors.call(this));
				} else {
					htContractTpl.form({
						id: this.$route.query.id
					}).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.info = res.data.data;
							this.balance();
						}
					}).catch(errors.call(this)).finally(() => {
						this.getListData(cb);
					});
				}
				if(this.$route.query.pid) { // preview
					this.getPreviewData(this.$route.query.pid, data => {
						this.previewData = data;
						const ht = this.previewData.attachments.find(item => item.type == 'ht_contract_preview');
						if(ht) {
							if(ht.status == '1') {
								this.pdfInfo = ht;
							} else {
								this.startPolling(ht.id);
							}
						}
					});
				}
			},
			getListData(cb) {
				this.updateLoadingStatus({
					isLoading: true
				});
				console.log(this.info.parentType)
				let params = {}
				if(this.info.parentType == 'trainning') {
					params = {
						parentType: 'trainning',
						goodsType: 'discount'
					}
				} else if(this.info.parentType == 'abroad') {
					params = {
						parentType: 'abroad',
						goodsType: 'discount'
					}
				} else if(this.info.parentType == 'singleProduct') {
					params = {
						parentType: 'singleProduct',
						goodsType: 'discount'
					}
				} else {
					params = {
						parentType: 'other',
						goodsType: 'discount'
					}
				}
				htPolicy.listData(params).then(valid.call(this)).then(res => {
					if(res.ok && res.data.data.length) {
						this.htPolicyList = res.data.data.map(item => {
							item.policyData = {
								itemId: '',
								jsonData: {},
								protocalText: '',
								ratio: "",
							};
							return item;
						});
						this.htPolicyList.push({
							id: othersId,
							name: '其他',
							htItemList: [{
								productDesc: '自定义条款至少需要分总审批'
							}],
							policyData: {
								itemId: ''
							}
						})
					}
				}).catch(errors.call(this)).finally(() => {
					if(this.formData.htContractData.settingJson && JSON.parse(this.formData.htContractData.settingJson).htPolicyList && JSON.parse(this.formData.htContractData.settingJson).htPolicyList.length) {
						this.htPolicyList = JSON.parse(this.formData.htContractData.settingJson).htPolicyList;
					} else {
						this.formData.htContractData.settingJson = String(JSON.stringify({
							htPolicyList: this.htPolicyList,
							htDealList: this.htDealList,
							htCourseList: this.htCourseList
						})) || '';
					}
					if(this.formData.isSelfGroup == 1) {
						this.getCourseList(cb);
					} else {
						this.getDealList(cb);
					}
				});
			},
			getDealList(cb) {
				this.updateLoadingStatus({
					isLoading: true
				});
				htPolicy.listData({
					parentType: 'trainning',
					goodsType: 'goods'
				}).then(valid.call(this)).then(res => {
					if(res.ok && res.data.data.length) {
						this.htDealList = res.data.data.map(item => {
							item.policyData = {
								list: [{
									itemId: '',
									jsonData: {},
									costPrice: '',
									publicPrice: '',
									giftCount: '',
									protocalText: '',
									ratio: '100',
									ratioPrice: '',
									share: '0'
								}]
							};
							return item;
						});
					}
				}).catch(errors.call(this)).finally(() => {
					if(this.formData.htContractData.settingJson && JSON.parse(this.formData.htContractData.settingJson).htDealList && JSON.parse(this.formData.htContractData.settingJson).htDealList.length) {
						this.htDealList = JSON.parse(this.formData.htContractData.settingJson).htDealList;
					} else {
						this.formData.htContractData.settingJson = String(JSON.stringify({
							htPolicyList: this.htPolicyList,
							htDealList: this.htDealList,
							htCourseList: this.htCourseList
						})) || '';
					}
					cb && cb(this.htPolicyList);
					this.updateLoadingStatus({
						isLoading: false
					});
				});
			},
			getCourseList(cb) {
				this.updateLoadingStatus({
					isLoading: true
				});
				htPolicy.listDataSelfGroup().then(valid.call(this)).then(res => {
					if(res.ok && res.data.data.length) {
						this.htCourseList = res.data.data.map(item => {
							item.policyData = {
								list: [{
									itemId: '',
									jsonData: {},
									costPrice: '',
									publicPrice: '',
									giftCount: '',
									protocalText: '',
									ratio: '100',
									ratioPrice: '',
									share: '0'
								}]
							};
							return item;
						});
					}
				}).catch(errors.call(this)).finally(() => {
					if(this.formData.htContractData.settingJson && JSON.parse(this.formData.htContractData.settingJson).htCourseList && JSON.parse(this.formData.htContractData.settingJson).htCourseList.length) {
						this.htCourseList = JSON.parse(this.formData.htContractData.settingJson).htCourseList;
					} else {
						this.formData.htContractData.settingJson = String(JSON.stringify({
							htPolicyList: this.htPolicyList,
							htDealList: this.htDealList,
							htCourseList: this.htCourseList
						})) || '';
					}
					cb && cb(this.htPolicyList);
					this.updateLoadingStatus({
						isLoading: false
					});
				});
			},
			getHtContractTplInfo(id) {
				htContractTpl.form({
					id
				}).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.info = res.data.data;
						this.formData.signPriceNew = (this.actualPrice || this.contPrice || this.info.price) - ((Number(this.formData.contractExemptionPrice) + Number(this.formData.protocolExemptionPrice)) || 0) + (this.formData.increasePriceNew || 0);
						this.formData.price = this.totalPrice;
						this.balance();
					}
				}).catch(errors.call(this));
			},
			getEcChannels() {
				ec.newChannels().then(valid.call(this)).then(res => {
					if(res.ok) {
						this.ecChannels = res.data.data;
					}
				}).catch(errors.call(this));
			},
			getPreviewData(pid, cb) {
				contract.formPreview({
					id: pid
				}).then(valid.call(this)).then(res => {
					if(res.ok) {
						cb(res.data.data);
					}
				}).catch(errors.call(this));
			},
			getInfo(id, cb) {
				const params = {
					id
				};
				contract.form(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.formData.apply = res.data.data.apply;
						cb && cb(res.data.data);
					}
				}).catch(errors.call(this));
			},
			onPolicyCheapChange(val) {
				this.$nextTick(() => {
					let added = 0,
						give = 0,
						givepub = 0;
					const data = this.getPostData();
					data.htContractItemList.forEach(item => {
						if(this.getCerPolicy(item.policyId)) {
							let it = this.getCerPolicy(item.policyId);
							let obj = it.htItemList.find(v => v.id == item.itemId)
							if(obj && obj.type == 'increase') {
								added += Number(item.jsonData && JSON.parse(item.jsonData).money);
							}
							if(obj && obj.type == 'gift') {
								give += Number(obj.costPrice);
								givepub += Number(obj.publicPrice);
							}
						}
					});
					this.formData.increasePriceNew = added;
					this.formData.presentPriceNew = give;
					this.formData.presentPriceCostNew = givepub;
					this.formData.signPriceNew = (this.actualPrice || this.contPrice) - ((Number(this.formData.contractExemptionPrice) + Number(this.formData.protocolExemptionPrice)) || 0) + (this.formData.increasePriceNew || 0);
					//					if(val) {
					//						data.protocolCustom = "1";
					//					}
					//					//					if(!data.htContractItemList.length && !val) {
					//					//						this.tmpData = {
					//					//							htSign: {},
					//					//							htAuditorList: []
					//					//						};
					//					//						return;
					//					//					}
					//					contract.calculteContract(data).then(valid.call(this)).then(res => {
					//						if(res.ok) {
					//							this.tmpData = res.data.data;
					//							if(res.data.data.htContractItemList.length) {
					//								this.$refs.disitem[0].rank = res.data.data.htContractItemList[0].level;
					//								this.$refs.disitem[0].approver = this.reviewer;
					//								this.$refs.disitem[0].tplObj = res.data.data.htContractItemList[0];
					//							}
					//						}
					//					}).catch(errors.call(this));
				})
			},
			tryGetEc(cb) {
				if(this.formData.ecId) {
					ec.getHtContractByCode(this.formData.ecId).then(valid.call(this)).then(res => {
						cb && cb(res.data.data);
						if(res.ok && res.data.data && res.data.data.code !== -1) {
							this.ecInfo.data = res.data.data;
							if(this.ecInfo.data.mobile) {
								this.formData.phone = this.ecInfo.data.mobile;
							}
							if(this.ecInfo.data.channelId.toString()) {
								this.formData.source = this.ecInfo.data.channelId.toString();
							}
							this.$nextTick(() => {
								//this.$refs.generation.validateField('phone');
								this.$refs.generation.validateField('source');
							});
						}
					}).catch(errors.call(this));
				}
			},
			goEdit(info) {
				this.$router.push({
					name: 'sign.contractGeneration',
					query: {
						eid: info.previewId
					}
				})
				this.getPreviewData(info.previewId, data => {
					this.editView = data;
				});
				this.previewData = {};
			},
			//添加补充协议
			showTab(data, show) {
				let d = clone(data);
				if(show || d.type == '1') {
					d.policyId = d.id;
					d.index = ++index;
					d.giftCount = 0;
					this.itemCardList.unshift(d);
					if(data.id == othersId) {
						this.onPolicyCheapChange(true);
					} else {
						this.onPolicyCheapChange();
					}
				} else {
					this.itemCardClose(d);
				}
			},
			itemCardClose(data) {
				let index = this.itemCardList.findIndex(value =>
					value.id == data.id
				)
				this.itemCardList.splice(index, 1);
				this.onPolicyCheapChange();
			},
			//添加补充协议
			showSubTab(data, show) {
				let d = clone(data);
				if(show || d.type == '1') {
					d.policyId = d.id;
					d.index = ++index;
					d.giftCount = 0;
					this.itemSubList.unshift(d);
					//					if(data.id == othersId) {
					//						this.onPolicyCheapChange(true);
					//					} else {
					//						this.onPolicyCheapChange();
					//					}
				} else {
					this.itemSubClose(d);
				}
			},
			itemSubClose(data) {
				let index = this.itemSubList.findIndex(value =>
					value.id == data.id
				)
				this.itemSubList.splice(index, 1);
				//				this.onPolicyCheapChange();
			},
			//添加补充协议
			showCourseTab(data, show) {
				let d = clone(data);
				if(show || d.type == '1') {
					d.policyId = d.id;
					d.index = ++index;
					d.giftCount = 0;
					this.itemCourseList.unshift(d);
					//					if(data.id == othersId) {
					//						this.onPolicyCheapChange(true);
					//					} else {
					//						this.onPolicyCheapChange();
					//					}
				} else {
					this.itemCourseClose(d);
				}
			},
			itemCourseClose(data) {
				let index = this.itemCourseList.findIndex(value =>
					value.id == data.id
				)
				this.itemCourseList.splice(index, 1);
				//				this.onPolicyCheapChange();
			},
			//预览合同
			preview() {
				const a = [...this.getAllSubPromise(), this.$refs.generation.validate()];
				Promise.all(a).then((ok) => {
					const o = ok.every(item => item);
					if(!o) {
						return this.$Message.error('请完善表单数据');
					}
					const data = this.getPostData();
					if(this.editView.previewId) {
						data.previewId = this.editView.previewId;
					}
					if(this.$route.query.mid) {
						data.id = this.$route.query.mid;
					}
					this.updateLoadingStatus({
						isLoading: true
					});
					contract.preview(data).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.previewData = res.data.data;
							this.$router.push({
								name: 'sign.contractGeneration',
								query: {
									id: this.info.id,
									pid: res.data.data.previewId
								}
							});
							const ht = this.previewData.attachments.find(item => item.type == 'ht_contract_preview');
							if(ht) {
								if(ht.status == '1') {
									this.pdfInfo = ht;
								} else {
									this.startPolling(ht.id);
								}
							}
						}
					}).catch(errors.call(this)).finally(() => {
						this.updateLoadingStatus({
							isLoading: false
						});
					});
				}).catch(err => {
					this.$Message.error(err.toString());
				})

			},

			//生成合同
			generate() {
				this.updateLoadingStatus({
					isLoading: true
				});
				const a = [...this.getAllSubPromise(), this.$refs.generation.validate()];
				Promise.all(a).then((ok) => {
					const o = ok.every(item => item);
					if(!o) {
						this.updateLoadingStatus({
							isLoading: false
						});
						return this.$Message.error('请完善表单数据');
					}
					this.dogen();
				}).catch(err => {
					this.updateLoadingStatus({
						isLoading: false
					});
					this.$Message.error(err.toString());
				})
			},
			createNow() {
				let data = {
					previewId: this.previewData.previewId
				};
				this.dogen(data);
			},

			dogen(payload) {
				this.updateLoadingStatus({
					isLoading: true
				});
				const data = payload ? payload : this.getPostData();
				if(this.$route.query.mid) {
					data.id = this.$route.query.mid;
				}
				contract.save(data).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						updateIsContract({
							cusCode: this.formData.ecId
						}).then(valid.call(this)).then(res => {
							if(res.ok) {
								//								this.$Message.success(res.data.message);
								this.$router.push({
									name: 'sign.myPact'
								});
							}
						}).catch(errors.call(this)).finally(() => {
							this.updateLoadingStatus({
								isLoading: false
							});
						});
					}
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
			},

			getPostData() {
				const data = Object.assign({}, this.formData);
				if(data.year == '') {
					delete data.year;
				}
				data.tplId = this.info.id;
				data.name = this.info.name;
				const ecInfo = this.ecChannels.find(item => data.source == item.id);
				if(ecInfo) {
					data.sourceName = ecInfo.name;
				}
				if(this.studentId) {
					data.studentId = this.studentId;
				}
				if(this.formData.isProtocol == '1') {
					let iList = this.htContractItemList();
					const index = iList.findIndex(item => item.itemId === othersId);
					if(index > -1) {
						data.protocolCustom = iList[index].protocalText;
						iList.splice(index, 1);
					}
					//WSL table去重复 开始
					let q = []
					iList.forEach(item => {
						if(q.indexOf(item.protocalText) < 0) {
							q.push(item.protocalText)
						} else {
							item.protocalText = '  '
						}
					});
					//WSL table去重复 结束
					data.htContractItemList = iList;
				} else {
					data.htContractItemList = [];
				}
				return data;
			},
			getAllSubPromise() {
				if(this.$refs.disitem && this.$refs.disitem.length) {
					return this.$refs.disitem.map(item => {
						return item.validForm();
					})
				}
				return [];
			},
			restoreEdit(data) {
				const keys = ['ecId', 'source', 'lastName', 'firstName', 'studentIdentity', 'agentName', 'agentIdentity', 'phone', 'address', 'year', 'email', 'isProtocol', 'htContractData', 'contractExemptionPrice', 'protocolExemptionPrice', 'isSelfGroup', 'signType', 'tplId', 'signPriceNew', 'price', 'deratePriceNew', 'presentPriceNew', 'presentPriceCostNew', 'increasePriceNew'];
				extendKey(keys, data, this.formData);
				this.totalPrice = data.price;
				if(this.formData.ecId) {
					this.$nextTick(() => {
						//						this.tryGetEc();
					});
				}
				data.htContractItemList.forEach(item => {
					if(this.getCerPolicy(item.policyId)) {
						let it = this.getCerPolicy(item.policyId);
						it.policyData = extendKey(['jsonData', 'itemId', 'policyId', 'ratio'], item, {});
						it.index = ++index;
						it.giftCount = 0;
						this.itemCardList.push(it);
					} else if(this.getSubPolicy(item.policyId)) {
						//						let it = this.getSubPolicy(item.policyId);
						let it;
						this.htDealList.forEach(v => {
							if(v.id == item.policyId) {
								it = v;
							}
						});
						it.index = ++index;
						it.giftCount = 0;
						if(this.itemSubList.find(v => v.id == item.policyId)) {
							//							this.itemSubList.find(v => v.id == item.policyId).policyData.list=this.itemSubList.find(v => v.id == item.policyId).policyData.list.concat(it.policyData.list);
							this.itemSubList.forEach(v => {
								if(v.id == item.policyId) {
									v.policyData.list.push(item);
								}
							})
						} else {
							this.itemSubList.push(it);
							it.policyData.list = [];
							this.itemSubList.forEach(v => {
								if(v.id == item.policyId) {
									v.policyData.list.push(item);
								}
							})
						}
					} else if(this.getCoursePolicy(item.policyId)) {
						//						let it = this.getCoursePolicy(item.policyId);
						let it = [];
						this.htCourseList.forEach(v => {
							if(v.id == item.policyId) {
								it = v;
							}
						});
						it.index = ++index;
						it.giftCount = 0;
						if(this.itemCourseList.find(v => v.id == item.policyId)) {
							this.itemCourseList.forEach(v => {
								if(v.id == item.policyId) {
									console.log(v.policyData.list, 545)
									v.policyData.list.push(item);
									console.log(v.policyData.list, 1111)
								}
							})
						} else {
							this.itemCourseList.push(it);
							it.policyData.list = [];
							this.itemCourseList.forEach(v => {
								if(v.id == item.policyId) {
									v.policyData.list.push(item);
									console.log(v.policyData.list, 2222, v.id)
								}
							})
						}
					} else {
						console.warn("not found")
					}
				})
				if(data.protocolCustom) {
					this.itemCardList.push({
						id: othersId,
						index: ++index,
						name: '其他',
						policyData: {
							itemId: othersId,
							protocalText: data.protocolCustom
						},
						htItemList: [{
							productDesc: '自定义条款至少需要分总审批'
						}],
					});
				}
				this.$nextTick(() => {
					this.$refs.disitem && this.$refs.disitem.forEach(item => {
						item.setData();
					})
					this.onPolicyCheapChange();
				})
				this.getHtContractTplInfo(data.tplId);
			},
			getCerPolicy(policyId) {
				return this.htPolicyList.find(item => item.id == policyId);
			},
			getSubPolicy(policyId) {
				return this.htDealList.find(item => item.id == policyId);
			},
			getCoursePolicy(policyId) {
				return this.htCourseList.find(item => item.id == policyId);
			},
			startPolling(id) {
				t = setInterval(() => {
					common.convertForm(id).then(valid.call(this)).then(res => {
						if(res.ok && res.data.data) {
							this.pdfInfo = res.data.data;
							if(res.data.data.status == '1') {
								this.stopPolling();
							}
						}
					}).catch(errors.call(this));
				}, 5000)
			},
			stopPolling() {
				clearInterval(t)
			},
			searchDropList(word) {
				return new Promise((resolve, reject) => {});
			},
			textChange(val) {
				let keys = ['ecId', 'source', 'lastName', 'firstName', 'apply', 'studentIdentity', 'agentName', 'agentIdentity', 'phone', 'address', 'email', 'year', 'signType'];
				contract.getHtContractByEcIdAndPhone({
					param: val
				}).then(valid.call(this)).then(res => {
					if(res.data.statusCode != -1) {
						extendKey(keys, res.data.data, this.formData);
						this.formData.signType = this.formData.signType || 'new';
						this.formData.ecId = res.data.data.cusCode;
						this.formData.phone = res.data.data.mobile;
						this.formData.source = res.data.data.channelId;
					} else {
						ec.getHtContractByCode(val).then(valid.call(this)).then(res => {
							if(res.ok) {
								extendKey(keys, res.data.data, this.formData);
								this.formData.signType = this.formData.signType || 'new';
								this.formData.ecId = res.data.data.cusCode;
								this.formData.phone = res.data.data.mobile;
								this.formData.source = res.data.data.channelId;
							}
						}).catch(errors.call(this));
					}
				}).catch(errors.call(this));
			},
			studOk(obj) {
				/*/*/
				this.$refs.generation.resetFields();
				this.formData = Object.assign({}, this.formData, obj);
			},
			stuEditOk(obj) {
				this.formData = Object.assign({}, this.formData, obj);
			},
			addStudent() {
				this.$refs.stuModel.modelShow();
			},
			editStudent() {
				this.$refs.stuEditModel.modelShow();
			},
			upgrade() {
				this.formData.isSelfGroup = 1;
				this.getCourseList();
			},
			number_format(number, decimals, dec_point, thousands_sep) {
				/*
				 * 参数说明：
				 * number：要格式化的数字
				 * decimals：保留几位小数
				 * dec_point：小数点符号
				 * thousands_sep：千分位符号
				 * */
				number = (number + '').replace(/[^0-9+-Ee.]/g, '');
				var n = !isFinite(+number) ? 0 : +number,
					prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
					sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
					dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
					s = '',
					toFixedFix = function(n, prec) {
						var k = Math.pow(10, prec);
						return '' + Math.ceil(n * k) / k;
					};

				s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
				var re = /(-?\d+)(\d{3})/;
				while(re.test(s[0])) {
					s[0] = s[0].replace(re, "$1" + sep + "$2");
				}

				if((s[1] || '').length < prec) {
					s[1] = s[1] || '';
					s[1] += new Array(prec - s[1].length + 1).join('0');
				}
				return s.join(dec);
			},
			balanceShow(val) {
				this.balanceVisible = !this.balanceVisible;
			},
			//滚动条在Y轴上的滚动距离

			getScrollTop() {　　
				let dom = document.querySelector('.sign_container .s-content');
				var scrollTop = 0,
					bodyScrollTop = 0,
					documentScrollTop = 0;　　
				if(document.body) {　　　　
					bodyScrollTop = dom.scrollTop;　　
				}　　
				if(document.documentElement) {　　　　
					documentScrollTop = dom.scrollTop;　　
				}　　
				scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;　　
				return scrollTop;
			},

			//文档的总高度

			getScrollHeight() {　　
				let dom = document.querySelector('.sign_container .s-content');
				var scrollHeight = 0,
					bodyScrollHeight = 0,
					documentScrollHeight = 0;　　
				if(document.body) {　　　　
					bodyScrollHeight = dom.scrollHeight;　　
				}　　
				if(document.documentElement) {　　　　
					documentScrollHeight = dom.scrollHeight;　　
				}　　
				scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;　　
				return scrollHeight;
			},

			//浏览器视口的高度

			getWindowHeight() {　　
				let dom = document.querySelector('.sign_container .s-content');
				var windowHeight = 0;　　
				if(document.compatMode == "CSS1Compat") {　　　　
					windowHeight = dom.clientHeight;　　
				} else {　　　　
					windowHeight = dom.clientHeight;　　
				}　　
				return windowHeight;
			},
			balance() {
				let totalPrice = 0,
					contPrice = 0,
					signPrice = 0;
				if(this.formData.isSelfGroup == 1) {
					this.itemCourseList.forEach(v => {
						v.policyData.list.forEach(item => {
							contPrice += Number(item.ratioPrice);
							totalPrice += Number(item.publicPrice);
							signPrice += Number(item.costPrice);
						})
					})
				} else {
					this.itemSubList.forEach(v => {
						v.policyData.list.forEach(item => {
							contPrice += Number(item.ratioPrice);
							totalPrice += Number(item.publicPrice);
							signPrice += Number(item.costPrice);
						})
					})
				}
				this.totalPrice = Number(totalPrice) + Number(this.info.price);
				this.contPrice = Number(contPrice) + Number(this.info.price);
				this.signPrice = Number(signPrice) + Number(this.info.price);
				this.infoPrice = contPrice;
				this.formData.deratePriceNew = (this.totalPrice - (this.actualPrice || this.contPrice)) + (Number(this.formData.contractExemptionPrice) + Number(this.formData.protocolExemptionPrice));
				this.deratePriceNew = (this.contPrice - (this.actualPrice || this.contPrice)).toFixed(2);
				this.formData.signPriceNew = (this.actualPrice || this.contPrice || this.info.price) - (Number(this.formData.contractExemptionPrice) + Number(this.formData.protocolExemptionPrice)) + (this.formData.increasePriceNew || 0);
				this.formData.price = this.totalPrice;
			},
			sale(ratio, actualPrice) {
				this.actualPrice = actualPrice;
				this.ratio = ratio;
				this.infoPrice = Number(this.contPrice) - Number(this.info.price);
				this.formData.deratePriceNew = (this.totalPrice - (actualPrice || this.contPrice)) + (Number(this.formData.contractExemptionPrice) + Number(this.formData.protocolExemptionPrice));
				this.deratePriceNew = (this.contPrice - (actualPrice || this.contPrice)).toFixed(2);
				this.formData.signPriceNew = (this.actualPrice || this.contPrice || this.info.price) - (Number(this.formData.contractExemptionPrice) + Number(this.formData.protocolExemptionPrice)) + (this.formData.increasePriceNew || 0);
			},
			concessions() {
				//				this.formData.signPriceNew = (this.actualPrice||this.contPrice||this.info.price) - (this.formData.exemptionPrice || 0)+(this.formData.increasePriceNew||0);
				this.balance();
			}
		},
		watch: {
			screenWidth(val) {
				this.screenWidth = val
				let wid = this.$el.children[0].clientWidth;
				this.$el.querySelector(".submit-btns").style.width = wid + 'px';
				this.$el.querySelector(".dropdown_menu").style.width = wid + 'px';
			}
		}
	}
</script>