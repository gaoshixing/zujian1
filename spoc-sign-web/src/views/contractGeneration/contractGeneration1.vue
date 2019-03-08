<style lang="less">
	.sign_contract_generation {
		@color: #44bcb7;
		padding-bottom: 100px;
		position: relative;
		border-top: 1px solid #e0e0e0;
		padding-bottom: 300px; 
		.top {
			margin-top: 14px;
			padding-left: 24px;
			span {
				font-size: 16px;
				color: #333333;
				line-height: 2em;
			}
		}
		.tip {
			padding-left: 24px;
			span {
				color: #ff0000;
			}
			margin: 14px 0 14px;
		}
		.form-content {
			min-width: 1200px;
			.ivu-menu {
				z-index: auto;
			}
			.ivu-menu-submenu {
				border-top: 1px solid #e0e0e0;
			}
			.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
				color: #495060;
			}
			.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
				border-right: 0px solid transparent;
			}
			.sign_contract_generation .form-content .ivu-menu-light.ivu-menu-vertical .ivu-menu-item {
				border: none;
			}
			.ivu-menu-light.ivu-menu-vertical .ivu-menu-item {
				padding-left: 14px !important;
				border: none;
			}
			.ivu-menu-vertical .ivu-menu-item:hover {
				background: #FFFFFF;
			}
			.ivu-menu-vertical.ivu-menu-light:after {
				display: none;
			}
			.ivu-menu-vertical .ivu-menu-item:hover,
			{
				cursor: auto;
			}
			.showbtn {
				padding: 14px;
			}
			.frmTit {
				padding: 14px 0px 14px 16px;
				border-top: 1px solid #e0e0e0;
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
			.MenuTit {
				display: inline-block;
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
				.addParentBtn {
					padding-bottom: 14px;
					text-align: right;
					padding-right: 95px;
				}
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
						.icon-right {
							top: 1px;
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
				padding-top: 14px;
				margin-bottom: 24px;
				.ivu-form-item {
					margin-bottom: 14px;
				}
				.addStudent {
					width: 56px;
					height: 28px;
					line-height: 28px;
					display: inline-block;
					padding: 0 6px;
					text-align: center;
					border-radius: 4px;
					margin-left: 96px;
				}
			}
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
		.submit-btns {
			position: fixed;
			bottom: 10px;
			right: 20px;
			background: #e7ebf1;
			height: 60px;
			z-index: 999;
			padding: 0 52px;
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
					line-height: 58px;
					padding: 0 50px;
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
					.total {
						.ivu-form-item-label {
							font-size: 14px;
						}
						.ivu-form-item {
							margin-bottom: 0px;
						}
						p {
							text-align: right;
							line-height: 32px;
							font-size: 16px;
							.red {
								color: #FF0000;
							}
						}
					}
					.sale {
						.tags_box {
							/*width: 262px;*/
							min-height: 32px;
							padding: 0px 7px;
							font-size: 12px;
							border: 1px solid #dddee1;
							border-radius: 4px;
							cursor: pointer;
							background: #FFFFFF;
							.Row {
								.ivu-dropdown .ivu-select-dropdown {
									/*left: -0px !important;*/
									margin-right: 0px !important;
									height: 157px;
									overflow-y: auto;
									background: #FFFFFF;
									top: 32px !important;
								}
								.arrow {}
							}
						}
						.ivu-tag {
							background: #44bcb7;
							.ivu-tag-text,
							.ivu-icon-ios-close-empty {
								color: #FFFFFF;
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
				<div>
					<span>合同名称：</span>
					<span>{{info.name}}</span>
				</div>
			</div>
			<div class="tip">
				请您填写生产合同的必要信息，系统将为你生成合同。（带 <span>*</span> 号表示必填）
			</div>
			<div class="form-content">
				<Form :model="formData" ref="generation" :rules="rules" :label-width="124">
					<Menu active-name="" :open-names="['1','2','3','4']" width="auto">
						<Submenu name="1">
							<template slot="title">
								<div class="MenuTit">
									<div class="title">
										<div class="titName">客户信息</div>
										<div class="titTip">
											（带<span class="red">*</span>号表示必填）
										</div>
									</div>
								</div>
							</template>
							<MenuItem name="1-1">
							<div class="formBox">
								<Row type="flex">
									<Col span="10">
									<FormItem label="选择学员：">
										<div class="chooseStudent">
											<v-select style="width: 354px;" class="search" placeholder="输入学员编号/姓名/手机号搜索" v-model="searchValue" k='studentName' :datafunc="searchDropList" @on-enter="textChange" @on-click="textChange" @selected="textChange" o="phone" :otherStyle="{'text-align':'right'}">
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
										<FormItem label="客户姓名：">
											{{formData.studentName||'- -'}}
										</FormItem>
										</Col>
										<Col span="6">
										<FormItem label="客户性别：">
											{{formData.gender=='m'?'男':formData.gender=='f'?'女':'- -'}}
											<Button type="primary" class="addStudent" @click="editStudent"><Icon type="compose" size="14"></Icon>&nbsp;编辑</Button>
										</FormItem>
										</Col>
									</Row>
									<Row type="flex">
										<Col span="6">
										<FormItem label="客户英文名：">
											{{formData.studentEnName||'- -'}}
										</FormItem>
										</Col>
										<Col span="6">
										<FormItem label="客户出生日期：">
											{{formData.birthdate?formData.birthdate:'- -'}}
										</FormItem>
										</Col>
										<Col span="6">
										<!--<FormItem label="客户手机号：">
											{{formData.phone?formData.phone:'-_-！'}}
										</FormItem>-->
										</Col>
									</Row>
								</div>
							</div>
							</MenuItem>
						</Submenu>
						<Submenu name="2">
							<template slot="title">
								<div class="MenuTit">
									<div class="title">
										<div class="titName">监护人信息</div>
										<div class="titTip">
											（带<span class="red">*</span>号表示必填）
										</div>
									</div>
								</div>
							</template>
							<MenuItem name="2-1">
							<div class="formBox" v-for="(item, index) in formData.htParentList" :key="index">
								<div class="addParentBtn" :style="{'border-top':index==1?'1px solid #e0e0e0':'none','padding-top':index==1?'14px':'0'}" v-if="formData.htParentList.length==index+1">
									<Button type="primary" @click="changeParent(formData.htParentList.length>1)" v-if="index==0&&formData.htParentList.length==1"><Icon type="plus-round"></Icon>&emsp;监护人2信息</Button>
									<Button type="primary" @click="changeParent(formData.htParentList.length>1)" v-else>取消监护人2</Button>
								</div>
								<Row type="flex">
									<Col span="10">
									<FormItem :prop="'htParentList.'+index+'.name'" label="监护人全名：" :rules="[{required: true, message: '监护人全名不能为空', trigger: 'blur'},{pattern: /(^[\u4e00-\u9fa5]{1,7}$)|(^[A-Za-z_\.]{1,14}$)/,message: '最长不得超过7个汉字，或14个字节(字母和下划线)',trigger: 'blur'}]">
										<Input v-model="formData.htParentList[index].name"></Input>
									</FormItem>
									</Col>
									<Col span="10" push="2">
									<FormItem :prop="'htParentList.'+index+'.relation'" label="与学员的关系：" :rules="{required: true, message: '与学员的关系不能为空', trigger: 'change'}">
										<Select v-model="item.relation">
											<Option :value="item.value" v-for="(item, index) in dictData.ht_parent_relation" :key="index">{{item.label}}</Option>
										</Select>
									</FormItem>
									</Col>
								</Row>
								<Row type="flex">
									<Col span="10">
									<FormItem :prop="'htParentList.'+index+'.phone'" label="手机号：" :rules="{required: true, pattern: /^1[34578]\d{9}$/, message: '请输入手机号', trigger: 'blur'}">
										<Input v-model="item.phone"></Input>
									</FormItem>
									</Col>
									<Col span="10" push="2">
									<FormItem :prop="'htParentList.'+index+'.companyCellNumber'" label="单位电话：">
										<Input v-model="item.companyCellNumber"></Input>
									</FormItem>
									</Col>
								</Row>
								<Row type="flex">
									<Col span="10">
									<FormItem :prop="'htParentList.'+index+'.cellNumber'" label="家庭电话：">
										<Input v-model="item.cellNumber"></Input>
									</FormItem>
									</Col>
									<Col span="10" push="2">
									<FormItem :prop="'htParentList.'+index+'.email'" label="电子邮箱：">
										<Input v-model="item.email"></Input>
									</FormItem>
									</Col>
								</Row>
								<Row type="flex">
									<Col span="10">
									<FormItem :prop="'htParentList.'+index+'.address'" label="联系地址：">
										<Input v-model="item.address"></Input>
									</FormItem>
									</Col>
								</Row>
							</div>
							</MenuItem>
						</Submenu>
						<Submenu name="4">
							<template slot="title">
								<div class="MenuTit">
									<div class="title">
										<div class="titName">选择课程包</div>
										<div class="titTip">
											（带<span class="red">*</span>号表示必填）
										</div>
									</div>
								</div>
							</template>
							<MenuItem name="4-1">
							<div class="formBox">
								<div class="">
									<!--<div class="frmTit">
										<div class="title">
											<div class="titName">选择课程包</div>
										</div>
									</div>-->
									<v-btn v-for="(item,index) in htPolicyList" :key="'v_btn'+index" :data="item" :item-card-list="itemCardList" v-if="item.id==9||item.id==12" @on-click="showTab"></v-btn>
									<!--<div class="intro" v-if="itemCardList.length">
										您当前已选择 <span class="bgreen">{{itemCardList[0].policyData?itemCardList[0].policyData.list.length:0}}</span> 项课程包，课程原价 <span class="bred">{{package.originalPrice}}</span> 元，折扣金额 <span class="bred">{{package.discount}}</span> 元，签约金额 <span class="bred">{{package.money}}</span> 元
									</div>-->
									<v-item-card v-for="(item,index) in itemCardList" :key="'v_item_card'+item.index" :data="item" :info="info" :discountsList="htPolicyList.find(item=>item.id==11)" :apportion="discountsPaidUp-items.discountsPaidUp" @on-close="itemCardClose" @on-change="onPolicyCheapChange" :bagList="htPolicyList.filter(item=>item.id==10)" ref="disitem" @balance="balance">
									</v-item-card>
								</div>
							</div>
							</MenuItem>
						</Submenu>
						<Submenu name="3">
							<template slot="title">
								<div class="MenuTit">
									<div class="title">
										<div class="titName">付款信息</div>
										<div class="titTip">
											（带<span class="red">*</span>号表示必填）
										</div>
									</div>
								</div>
							</template>
							<MenuItem name="3-1">
							<div class="formBox">
								<Row type="flex">
									<Col span="10">
									<FormItem prop="deposit" label="定金(仅当月有效)：" :required="!!(formData.deposit||formData.depositType||formData.depositDate)" :rules="[{required: !!(formData.deposit||formData.depositType||formData.depositDate),message: '请填定金',trigger: 'blur'}]">
										<Input v-model="formData.deposit"><span slot="append">元</span></Input>
									</FormItem>
									</Col>
								</Row>
								<Row type="flex">
									<Col span="10">
									<FormItem prop="depositType" label="定金付款方式：" :required="!!(formData.deposit||formData.depositType||formData.depositDate)" :rules="[{required: !!(formData.deposit||formData.depositType||formData.depositDate),message: '请填定金付款方式',trigger: 'change'}]">
										<Select v-model="formData.depositType" clearable @on-clear="depositTypeClear"><!--//-->
											<!--<Option value="">无</Option>-->
											<Option :value="item.value" v-for="(item, index) in dictData.ht_receipt_detail_type" :key="index">{{item.label}}</Option>
										</Select>
									</FormItem>
									</Col>
									<Col span="10" push="2">
									<FormItem prop="depositDate" label="定金付款日期：" :required="!!(formData.deposit||formData.depositType||formData.depositDate)" :rules="[{required: !!(formData.deposit||formData.depositType||formData.depositDate),message: '请填定金付款日期',trigger: 'blur'}]">
										<DatePicker type="date" placeholder="" :value="formData.depositDate" transfer style="width: 100%" @on-change="swfTime('depositDate',$event)"></DatePicker>
									</FormItem>
									</Col>
								</Row>
								<Row type="flex">
									<Col span="10">
									<FormItem prop="remainType" label="余额付款方式：">
										<Select v-model="formData.remainType">
											<Option :value="item.value" v-for="(item, index) in dictData.ht_receipt_detail_type" :key="index">{{item.label}}</Option>
										</Select>
									</FormItem>
									</Col>
									<Col span="10" push="2">
									<FormItem prop="remainDate" label="余额付款日期：">
										<DatePicker type="date" placeholder="" :value="formData.remainDate" transfer style="width: 100%" @on-change="swfTime('remainDate',$event)"></DatePicker>
									</FormItem>
									</Col>
								</Row>
								<!--<Row type="flex">
									<Col span="22">
									<FormItem prop="discountRemarks" label="折扣/附加金额原因：">
										<Input v-model="formData.discountRemarks" type="textarea" :rows="2"></Input>
									</FormItem>
									</Col>
								</Row>
								<Row type="flex">
									<Col span="22">
									<FormItem prop="remarks" label="备注：">
										<Input v-model="formData.remarks" type="textarea" :rows="2"></Input>
									</FormItem>
									</Col>
								</Row>-->
							</div>
							</MenuItem>
						</Submenu>
					</Menu>

					<div class="submit-btns">
						<div class="balance">
							<div class="balance_tit">结算</div>
							<div class="balance_price">合同价格：<span class="red">￥{{number_format(contPrice,0,'.',',')}}</span></div>
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
										<!--<Row>
											<Col span="12">
											<FormItem label="优惠政策：">
												<p>1、课程包 （ EE1/EE2 ）使用了(1)次（ 9折 ）的（ 折扣 ）优惠； </p>
												<p>2、课程包 （ EE1/EE2/EE3 ）使用了（1）次（ 组合课程包 ）优惠； </p>
												<p>3、 课程包 （ EE1/EE2 ）使用了 （10）次（ 满100减50 ）的（ 满减 ）优惠； </p>
												<p>4、课程包（EE1/EE2/EE3）使用了（10）次（订单优惠：满100减50）的（满减）优惠； </p>
												<p>5、 课程包 （ @课程名称 ）使用了（@优惠次数）次 （ @优惠名称 ）的（ @优惠类型 ）优惠；</p>
											</FormItem>
											</Col>
											<Col span="12">
											<FormItem label="其他优惠：">
												<p>价值500元的拉杆箱;</p>
												<p>价值500元的拉杆箱;</p>
												<p>价值500元的拉杆箱;</p>
											</FormItem>
											</Col>
										</Row>-->
										<Row align="middle" type="flex">
											<Col span="12">
											<Row type="flex">
												<Col span="18">
												<FormItem label="选择优惠项目：" class="sale">
													<div class="tags_box" @click="itemsClick">
														<Row type="flex" class="Row" align="middle">
															<Col span="23">
															<Tag v-for="(item,index) in items.typeList" :key="index" closable @on-close="closeTag(items.policyIds,item.id,index,items)">{{item.name}}</Tag>
															</Col>
															<Col span="1">
															<Dropdown class="pulldown" trigger="custom" :visible="items.visible" placement="bottom-end" @on-click="policyChange(items.policyIds,items,$event)">
																<a href="javascript:void(0)" @click.stop="itemsClick" class="arrow">
																	<Icon type="arrow-down-b" v-show="!items.visible" color="#80848f" size="14"></Icon>
																	<Icon type="arrow-up-b" v-show="items.visible" color="#80848f" size="14"></Icon>
																</a>
																<DropdownMenu slot="list" v-if="htPolicyList.find(item=>item.id==11)">
																	<DropdownItem v-for="(item,index) in htPolicyList.find(item=>item.id==11).htItemList" :name="item.id" :key="item.id" :selected="items.policyIds.indexOf(item.id)!=-1&&item.type!='discount'" :disabled="(items.typeList.find(oitem=>oitem.type==item.type)&&item.type!='discount'&&items.policyIds.indexOf(item.id)==-1)||items.policyIds.length>=3">{{item.name}}</DropdownItem>
																</DropdownMenu>
															</Dropdown>

															</Col>
														</Row>
													</div>
												</FormItem>
												</Col>
												<Col span="6">
												<FormItem label="任意减免：" v-show="items.typeList.find(oitem=>oitem.type=='relief')">
													<Input v-model="items.exemptionPrice" style="width:130px;" @on-blur="concessions(items)"><span slot="append">元</span></Input>
												</FormItem>
												</Col>
											</Row>
											<!--<FormItem label="选择优惠项目：" class="saleSel">
												<Select v-model="preference" multiple @on-change="preferential">
													<Option v-for="item in htPolicyList.filter(item=>item.id==11).htItemList" :value="item.id" :key="item.id">{{item.name}}</Option>
												</Select>
											</FormItem>-->
											<FormItem label="折扣/附加金额原因：">
												<Input :value="(discountRemarks)+(discountRemarks&&items.typeList.length?'、':'')+(items.typeList.length?items.typeList.map(v=>v.name+'（整单）').join('、'):'')" readonly type="textarea" :rows="2"></Input>
											</FormItem>
											<FormItem label="备注：">
												<Input v-model="formData.remarks" type="textarea" :rows="2" :maxlength="255"></Input>
												<p style="text-align: right;">{{formData.remarks.length}}/255</p>
											</FormItem>
											</Col>
											<Col span="4" push="6">
											<div class="total">
												<FormItem label="合同款总计：">
													<p>{{number_format(totalPrice,0,'.',',')}}&nbsp;元</p>
												</FormItem>
												<FormItem label="优惠款总计：">
													<p>{{number_format(totalPrice-contPrice,0,'.',',')}}&nbsp;元</p>
												</FormItem>
												<FormItem label="合同应收款：">
													<p><span class="red">{{number_format(contPrice,0,'.',',')}}</span>&nbsp;元</p>
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
		<modelxq ref="xqmodel" :xqList="xqList" @XQOk="XQOk" :selected="xqId"></modelxq>
		<student-model ref="stuModel" @studOk="studOk"></student-model>
		<student-model ref="stuEditModel" @studOk="stuEditOk" :editList="formData"></student-model>
	</div>
</template>
<script>
	const othersId = -100;
	let t;
	let index = 0;
	import { mapMutations, mapGetters, mapState } from 'vuex';
	import vBtn from "./component/vBtn";
	import vItemCard from "./component/vItemCard";
	import modelxq from "./component/modelXQ";
	import studentModel from "./component/studentModel";
	import preview from '../../modules/preview.vue';
	import vSelect from '../../modules/vSelect.vue';
	import valid, {
		errors,
		htPolicy,
		contract,
		htContractTpl,
		ec,
		common
	} from '../../libs/request.js';
	import { sys as publicSys } from '@public/libs/request.js';
	import { getHtPolicyList } from '../../store/index.js';
	import { arrayRemove, extendKey, validIdCard, clone } from '../../libs/util.js';
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
				contPrice: 0,
				totalPrice: 0,
				discountsPaidUp: 0,
				items: {
					itemId: '',
					policyIds: [],
					exemptionPrice: 0,
					visible: false,
					typeList: [],
					realityPrice: '',
					discountsPaidUp: 0,
					costPrice: this.contPrice
				},
				preference: [],
				balanceVisible: false,
				xqList: [],
				xqId: '',
				dictData: {},
				htPolicyList: getHtPolicyList(),
				info: {
					htOptLogList: [],
					htPartnerList: [],
					htSign: {
						sellerOffice: {}
					},
					attachments: []
				},
				pdfInfo: {},
				ecInfo: {
					data: {},
				},
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
				discountRemarks: '',
				formData: {
					ecId: '',
					signType: 'new',
					studentName: '',
					studentEnName: '',
					phone: '',
					birthdate: '',
					gender: '',
					deposit: '',
					depositType: '',
					depositDate: '',
					remainType: '',
					remainDate: '',
					discountRemarks: '',
					remarks: '',
					isProtocol: '0',
					htContractItemList: [],
					htParentList: [{
						name: "",
						relation: "",
						phone: "",
						companyCellNumber: "",
						cellNumber: "",
						email: "",
						address: "",
						identity: "",
						sort: '1'
					}],
					htContractData: {
						settingJson: "",
						resultJson: ""
					},
					signPriceNew: this.contPrice,
					price: this.totalPrice
				},
				tmpData: {
					htSign: {},
					htAuditorList: [],
				},
				studentId: '',
				studendreaded: false,
				freeze: true,
				rules: {
					/*ecId: [
						{
							required: true,
							pattern: /^\d+$/,
							message: '请填写客户编号',
							trigger: 'blur'
						},
						{
							validator(rule, value, callback, source, options) {
								if(!value) {
									callback();
								}
								if(self.isSave) {
									callback();
									return;
								}
								self.tryGetEc(data => {
									if(data.data.status == "success") {
										let keys = ['birthdate', 'gender', 'htParentList', 'signType', 'studentEnName', 'studentName'];
										extendKey(keys, data.data.data, self.formData);
										callback();
									} else {
										callback();
									}
								})
							},
							trigger: 'blur'
						}
					],
					studentName: must,
					studentEnName: must,*/
					signType: [{
						required: true,
						message: '请填写签约类型',
						trigger: 'change'
					}, ],
					remainType: [{
						required: true,
						message: '请填余额付款方式',
						trigger: 'change'
					}, ],
					remainDate: [{
						required: true,
						message: '请填余额付款日期',
						trigger: 'blur'
					}, ],
					//					birthdate: [{
					//						required: true,
					//						message: '请填写出生日期',
					//						trigger: 'blur'
					//					}, ],
					//					gender: [{
					//						required: true,
					//						message: '请填写性别',
					//						trigger: 'change'
					//					}, ],
					deposit: [{
						pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
						message: '请填写数字',
						trigger: 'change'
					}, ],
				},
				itemCardList: [],
				isSave: false,
				searchValue: '',
				screenWidth: document.body.clientWidth,
				scorllTop: document.body.scrollTop
			}
		},
		computed: {
			...mapGetters('sign', ['roleId']),
			...mapState(['userInfo']),
			totalCheap() {
				if(Object.keys(this.tmpData.htSign).length > 0) {
					return this.tmpData.htSign.deratePrice + this.tmpData.htSign.presentPrice;
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
			package() {
				let obj = {
					originalPrice: 0,
					money: 0,
					discount: 0
				};
				if(this.itemCardList[0].policyData) {
					if(this.itemCardList[0].policyData.list) {
						this.itemCardList[0].policyData.list.forEach(item => {
							obj.originalPrice += Number(item.publicPrice);
							obj.money += Number(item.costPrice);
						})
					}
				}
				obj.discount = parseFloat((obj.originalPrice - obj.money).toFixed(2));
				return obj;
			}
		},
		components: {
			vBtn,
			vItemCard,
			modelxq,
			preview,
			vSelect,
			studentModel
		},
		created() {
			this.getXq();
			this.$nextTick(() => {
				if(!this.$route.query.pid && !this.$route.query.mid && !this.xqId) {
					this.$refs.xqmodel.modelShow()
				} else {
					this.initPage();
				}
			})
		},
		mounted() {
			this.$nextTick(() => {
				let wid = this.$el.children[0].clientWidth;
				this.$el.querySelector(".submit-btns").style.width = wid + 'px';
				this.$el.querySelector(".dropdown_menu").style.width = wid + 'px';
				let tags_boxWid = this.$el.querySelector(".balance .sale .tags_box").clientWidth;
				this.$el.querySelector(".balance .sale .tags_box .ivu-dropdown .ivu-select-dropdown").style.width = tags_boxWid + 'px';
				const that = this
				window.onresize = () => {
					return(() => {
						window.screenWidth = document.body.clientWidth
						that.screenWidth = window.screenWidth
					})()
				};
				if(window.addEventListener) //FF,火狐浏览器会识别该方法
					window.addEventListener('DOMMouseScroll', this.wheel, false);
				window.onmousewheel = document.onmousewheel = this.wheel; //W3C
			})
			if(this.$route.query.cusCode) { // 从跟单页跳到合同页，再跳过来，自动根据cusCode填充ec信息
				this.formData.ecId = this.$route.query.cusCode;
				this.$refs.generation.validateField('ecId'); // 触发根据id取得ec信息
			}
		},
		beforeDestroy() {
			this.stopPolling();
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
						document.querySelector('.sign_contract_generation').style.paddingBottom = "300px";
						dom.scrollTop = dom.scrollTop + 250;
						this.balanceVisible = true;
						console.log(dom.scrollTop,0)
						//						this.balanceShow();
					}
				} else { //向上滚动
					if(this.getScrollTop() + this.getWindowHeight() == this.getScrollHeight()) {
						document.querySelector('.sign_contract_generation').style.paddingBottom = "50px";
						if(this.balanceVisible){
							this.balanceVisible = false;
							setTimeout(()=>{
									dom.scrollTop = dom.scrollTop + 250;
							},50)
						}
						//						this.balanceShow();
					}
//						console.log(dom.scrollTop)
				}
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
			getXq() {
				contract.getXq({
					tplId: this.$route.query.id
				}).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.xqList = res.data.data;
					}
				}).catch(errors.call(this));
			},
			swfTime(k, v) {
				this.formData[k] = v ? (new Date(v)).format('yyyy-MM-dd 00:00:00') : '';
			},
			changeParent(val) {
				if(val) {
					this.formData.htParentList.splice(1, 1);
				} else {
					let obj = {
						name: "",
						relation: "",
						phone: "",
						companyCellNumber: "",
						cellNumber: "",
						email: "",
						address: "",
						identity: "",
						sort: '2'
					}
					this.formData.htParentList.splice(1, 0, obj);
				}
			},
			htContractItemList() {
				if(this.itemCardList && this.$refs.disitem && this.$refs.disitem.length) {
					const itemList = this.$refs.disitem.map(item => {
						return item.chooseData();
					});
					this.items.policyIds.forEach(v => {
						this.items.typeList.forEach(val => {
							if(v == val.id) {
								itemList.push({
									policyId: val.policyId,
									itemId: v,
									exemptionPrice: this.items.exemptionPrice || 0,
									name: val.name,
									policyType: val.policyType,
									policyName: val.policyName
								});
							}
						});
					});
					let arr = [];
					itemList.filter(item => item.itemId != '').forEach(v => {
						arr = arr.concat(v);
					})

					return arr;
				}
				let arr = [];
				this.items.policyIds.forEach(v => {
					this.items.typeList.forEach(val => {
						if(v == val.id) {
							arr.push({
								policyId: val.policyId,
								itemId: v,
								exemptionPrice: this.items.exemptionPrice || 0,
								name: val.name,
								policyType: val.policyType,
								policyName: val.policyName
							});
						}
					});
				});
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
							//								this.formData.gender = res.data.data.gender;
							this.xqId = res.data.data.htSign.xqId;
							this.getListData(cb);
						}
					}).catch(errors.call(this));
				} else {
					this.getListData(cb);
				}

				if(this.$route.query.id) {
					this.getHtContractTplInfo(this.$route.query.id);
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
				common.batchListData({
					types: 'ht_contract_sign_type,ht_parent_relation,ht_receipt_detail_type'
				}).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.dictData = res.data.data;
					}
				}).catch(errors.call(this));
			},
			getListData(cb) {
				this.updateLoadingStatus({
					isLoading: true
				});
				htPolicy.listData({
					officeId: this.xqId
				}).then(valid.call(this)).then(res => {
					if(res.ok && res.data.data) {
						if(!this.formData.htContractData.settingJson) {
							this.htPolicyList = res.data.data.map(item => {
								item.policyData = {
									list: [{
										itemId: '',
										jsonData: {},
										costPrice: '',
										publicPrice: '',
										policyIds: [],
										giftCount: '',
										exemptionPrice: 0,
										visible: false,
										parentItemId: '',
										parentItemSubId: '',
										derate: '',
										typeList: [],
										leaveNum: '',
										protocalText: ''
									}]
								};
								return item;
							});
							this.formData.htContractData.settingJson = String(JSON.stringify(this.htPolicyList)) || '';
							/*666*/
							//						this.htPolicyList.push({
							//							id: othersId,
							//							name: '其他',
							//							htItemList: [{
							//								productDesc: '自定义条款至少需要分总审批'
							//							}],
							//							policyData: {
							//								itemId: ''
							//							}
							//						})
						} else {
							this.htPolicyList = JSON.parse(this.formData.htContractData.settingJson);
						}
						cb && cb(this.htPolicyList);
					}
				}).catch(errors.call(this)).finally(() => {
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
					}
				}).catch(errors.call(this));
			},
			getPreviewData(pid, cb) {
				contract.formPreview({
					id: pid
				}).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.xqId = res.data.data.htSign.xqId;
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
						this.formData.gender = res.data.data.gender;
						this.xqId = res.data.data.htSign.xqId;
						cb && cb(res.data.data);
					}
				}).catch(errors.call(this));
			},
			onPolicyCheapChange(val) {
				//				this.$nextTick(() => {
				//					const data = this.getPostData();
				//					if(val) {
				//						data.protocolCustom = "1";
				//					}
				//					contract.calculteContract(data).then(valid.call(this)).then(res => {
				//						if(res.ok) {
				//							this.tmpData = res.data.data;
				//						}
				//					}).catch(errors.call(this));
				//				})
			},
			tryGetEc(cb) {
				if(this.formData.ecId) {
					contract.getEcId({
						ecId: this.formData.ecId
					}).then(valid.call(this)).then(res => {
						cb && cb(res);
						if(res.ok && res.data.data && res.data.data.code !== -1) {
							this.ecInfo.data = res.data.data;
						}
					}).catch(errors.call(this));
				}
			},
			goEdit(info) {
				this.$router.push({
					name: 'sign.contractGeneration',
					query: {
						eid: info.previewId,
						mid: this.$route.query.mid
					}
				})
				this.getPreviewData(info.previewId, data => {
					this.editView = data;
				});
				this.previewData = {};
				if(!this.$route.query.pid && !this.xqId) {
					this.$refs.xqmodel.modelShow()
				}
				this.$nextTick(() => {
					let wid = this.$el.children[0].clientWidth;
					this.$el.querySelector(".submit-btns").style.width = wid + 'px';
					this.$el.querySelector(".dropdown_menu").style.width = wid + 'px';
					let tags_boxWid = this.$el.querySelector(".balance .sale .tags_box").clientWidth;
					this.$el.querySelector(".balance .sale .tags_box .ivu-dropdown .ivu-select-dropdown").style.width = tags_boxWid + 'px';
				})
			},
			//添加附加协议
			showTab(data, show) {
				//				this.itemCardList = [];
				let d = clone(data);
				if(show || d.type == '1') {
					d.policyId = d.id;
					d.index = ++index;
					d.giftCount = 0;
					this.itemCardList.push(d);
					if(data.id == othersId) {
						this.onPolicyCheapChange(true);
					} else {
						this.onPolicyCheapChange();
					}
				} else {
					this.itemCardClose(d);
				}
				console.log(data.id)
				if(data.id == 12) {
					this.$nextTick(() => {
						let obj = this.$el.querySelector('.other');
						let dom = document.querySelector('.sign_container .s-content');
						if(obj){
							//获取某元素以浏览器左上角为原点的坐标
							var t = obj.offsetTop; //获取该元素对应父容器的上边距
							var l = obj.offsetLeft; //对应父容器的上边距
							//判断是否有父容器，如果存在则累加其边距
							while(obj = obj.offsetParent) { //等效 obj = obj.offsetParent;while (obj != undefined)
								t += obj.offsetTop; //叠加父容器的上边距
								l += obj.offsetLeft; //叠加父容器的左边距
							}
//							console.log(this.$el.querySelector('.other').offsetHeight)
							dom.scrollTop=t-(window.innerHeight-this.$el.querySelector('.other').offsetHeight)/2;
						}
					})
				}
			},
			itemCardClose(data) {
				let index = this.itemCardList.findIndex(value =>
					value.id == data.id
				)
				this.itemCardList.splice(index, 1);
				this.onPolicyCheapChange();
			},
			//预览合同
			preview() {
				this.isSave = true;
				this.formData.discountRemarks = (this.discountRemarks) + (this.discountRemarks && this.items.typeList.length ? '、' : '') + (this.items.typeList.length ? this.items.typeList.map(v => v.name + '（整单）').join('、') : '');
				const a = [...this.getAllSubPromise(), this.$refs.generation.validate()];
				Promise.all(a).then((ok) => {
					const o = ok.every(item => item);
					if(!o) {
						this.freeze = true;
						return this.$Message.error('请完善表单数据');
					}
					this.freeze = false;
					const data = this.getPostData();
					if(this.editView.previewId) {
						data.previewId = this.editView.previewId;
					}
					if(this.$route.query.mid) {
						data.id = this.$route.query.mid;
					}
					if(this.xqList.length === 1) {
						data.xqId = this.xqList[0].id;
					} else {
						data.xqId = this.xqId;
					}
					this.updateLoadingStatus({
						isLoading: true
					});
					contract.preview(data).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.freeze = false;
							this.previewData = res.data.data;
							this.$router.push({
								name: 'sign.contractGeneration',
								query: {
									id: this.info.id,
									pid: res.data.data.previewId,
									mid: this.$route.query.mid
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
						} else {
							this.freeze = true;
						}
					}).catch(errors.call(this)).finally(() => {
						this.isSave = false;
						this.updateLoadingStatus({
							isLoading: false
						});
					});
				}).catch(err => {
					this.$Message.error(String(err));
				})
			},
			//生成合同
			generate() {
				this.isSave = true;
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
						this.isSave = false;
						this.freeze = true;
						return this.$Message.error('请完善表单数据');
					}
					this.freeze = false;
					this.dogen();
				}).catch(err => {
					this.isSave = false;
					this.freeze = true;
					this.updateLoadingStatus({
						isLoading: false
					});
					this.$Message.error(String(err));
				})
			},
			createNow() {
				let data = {
					previewId: this.previewData.previewId
				};
				this.dogen(data);
			},
			XQOk(data, xqid) {
				this.xqId = xqid;
				this.initPage();
			},
			dogen(payload) {
				this.formData.discountRemarks = (this.discountRemarks) + (this.discountRemarks && this.items.typeList.length ? '、' : '') + (this.items.typeList.length ? this.items.typeList.map(v => v.name + '（整单）').join('、') : '');
				this.updateLoadingStatus({
					isLoading: true
				});
				const data = payload ? payload : this.getPostData();
				if(this.$route.query.mid) {
					data.id = this.$route.query.mid;
				}
				if(this.xqId) {
					data.xqId = this.xqId;
				} else if(this.xqList.length === 1) {
					data.xqId = this.xqList[0].id;
				} else {
					this.$refs.xqmodel.modelShow()
				}
				contract.save(data).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						this.$router.push({
							name: 'sign.myPact'
						});
					}
				}).catch(errors.call(this)).finally(() => {
					this.isSave = false;
					this.updateLoadingStatus({
						isLoading: false
					});
				});
			},
			getPostData() {
				const data = Object.assign({}, this.formData);
				data.tplId = this.info.id;
				data.name = this.info.name;
				data.exemptionPrice=this.items.exemptionPrice;
				data.birthdate = data.birthdate ? (new Date(data.birthdate)).format('yyyy-MM-dd 00:00:00') : '';
				if(this.studentId) {
					data.studentId = this.studentId;
				}
				if(this.itemCardList.length) {
					let iList = this.htContractItemList();
					const index = iList.findIndex(item => item.itemId === othersId);
					if(index > -1) {
						data.protocolCustom = iList[index].protocalText;
						iList.splice(index, 1);
					}
					data.htContractItemList = iList;
				} else {
					data.htContractItemList = [];
				}
				return data;
			},
			getAllSubPromise() {
				if(this.$refs.disitem && this.$refs.disitem.length && this.itemCardList[0].policyData) {
					return this.$refs.disitem.map(item => {
						return item.validForm();
					})
				}
				return [];
			},
			restoreEdit(data) {
				const keys = ['ecId', 'signType', 'studentName', 'studentEnName', 'gender', 'birthdate', 'remainType', 'deposit', 'depositType', 'depositDate', 'remainDate', 'discountRemarks', 'remarks', 'htParentList'];
				extendKey(keys, data, this.formData);
				if(this.formData.ecId) {
					this.$nextTick(() => {
						//						this.tryGetEc();
					});
				}

				let arr9 = [],
					arr11 = [],
					arr12 = [],
					arrayMain = [];

				arr9 = data.htContractItemList.filter(v => {
						return v.policyId == 9
					}),
					arr11 = data.htContractItemList.filter(v => {
						return v.policyId == 11
					}),
					arr12 = data.htContractItemList.filter(v => {
						return v.policyId == 12
					});
				this.itemCardList = [];
				arrayMain = [arr9, arr12, arr11];
				arrayMain.forEach((v, k) => {
					let it = {};
					let arr = [];
					if(k < 2) {
						v.forEach(item => {
							it = this.getCerPolicy(item.policyId);
							if(!it) {
								it = {};
							}
							let obj = extendKey(['jsonData', 'itemId', 'policyId', 'protocalText', 'policyIds', 'exemptionPrice', 'giftCount', 'costPrice', 'leaveNum', 'publicPrice', 'itemSubId', 'itemSubName', 'parentItemId', 'parentItemSubId', 'policyType', 'name', 'policyName'], item, {});
							obj.costPrice = String(obj.costPrice);
							obj.policyIds = obj.policyIds ? obj.policyIds : '';
							obj.policyIds = obj.policyIds.length ? obj.policyIds.split(',') : [];
							arr.push(obj);
						})
						if(it.policyData) {
							it.policyData.list = arr;
						} else {}
						it.index = ++index;
						it.giftCount = 0;
						if(it.policyData) {
							this.itemCardList.push(it);
						}
					} else {
						v.forEach(item => {
							this.items.policyIds.push(item.itemId)
							let discount = this.htPolicyList.find(item => item.id == 11).htItemList.find(v => v.id == item.itemId);
							if(discount) {
								this.items.typeList.push(discount);
							}
						})
					}
				})
				//				if(data.protocolCustom) {
				//					this.itemCardList.push({
				//						id: othersId,
				//						index: ++index,
				//						name: '其他',
				//						policyData: {
				//							itemId: othersId,
				//							protocalText: data.protocolCustom
				//						},
				//						htItemList: [{
				//							productDesc: '自定义条款至少需要分总审批'
				//						}],
				//					});
				//				}
				this.$nextTick(() => {
					this.$refs.disitem && this.$refs.disitem.forEach(item => {
						if(item.setData) {
							item.setData();
						}
					})
					this.onPolicyCheapChange();
				})
				this.getHtContractTplInfo(data.tplId);
			},
			getCerPolicy(policyId) {
				return this.htPolicyList.find(item => item.id == policyId);
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
				return new Promise((resolve, reject) => {
					contract.studentList({
						param: word
					}).then(valid.call(this)).then(res => {
						if(res.ok) {
							resolve(res.data.data);
						} else {
							reject(res);
						}
					}).catch(err => {
						errors.call(this);
						reject(err);
					});
				});
			},
			textChange(val) {
				let keys = ['birthdate', 'gender', 'phone', 'htParentList', 'signType', 'studentEnName', 'studentName', 'ecId'];
				extendKey(keys, val, this.formData);
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
			balance(discountRemarks, discountsPaidUp, totalPrice, contPrice) {
				this.discountRemarks = discountRemarks;
				this.formData.signPriceNew = contPrice;
				this.formData.price = totalPrice;
				this.contPrice = contPrice;
				this.discountsPaidUp = discountsPaidUp;
				this.items.realityPrice = discountsPaidUp;
				this.items.discountsPaidUp = discountsPaidUp;
				//				this.items.exemptionPrice = 0;
				//				this.items.policyIds = [];
				//				this.items.typeList = [];
				this.totalPrice = totalPrice;
				this.concessions(this.items);
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
			policyChange(obj, o, id) {
				let discount = this.htPolicyList.find(item => item.id == 11).htItemList.find(item => item.id == id);
				let index = obj.indexOf(id);
				let flag = o.typeList.find(item => item.type == discount.type);
				if(discount.type == 'discount') {
					if(obj.length < 3) {
						obj.push(id);
						o.typeList.push(discount)
					}
				} else {
					if(index == -1) {
						if(!flag) {
							if(obj.length < 3) {
								obj.push(id);
								o.typeList.push(discount)
							}
						}
					} else {
						obj.splice(index, 1);
						o.typeList.splice(index, 1);
					}
				}
				this.concessions(o);
			},
			concessions(o) {
				let privilege = o.typeList.sort((a, b) => {
					return a.levelSort - b.levelSort;
				})
				o.discountsPaidUp = o.realityPrice;
				privilege.forEach(v => {
					if(v.type == "fullreduction") {
						let num = parseInt(o.discountsPaidUp / v.fullReductionPrice);
						if(num > v.fullReductionLimit && v.fullReductionLimit > 0) {
							num = v.fullReductionLimit;
						}
						o.discountsPaidUp -= num * v.fullReductionDiscount;
					}
					if(v.type == "discount") {
						o.discountsPaidUp = o.discountsPaidUp * v.ratio;
					}
					if(v.type == "relief") {
						o.discountsPaidUp -= o.exemptionPrice;
					}
				})
				o.discountsPaidUp = String(o.discountsPaidUp);
				//				this.balance2(o);
			},
			closeTag(obj, id, ind, o) {
				let index = obj.indexOf(id)
				obj.splice(index, 1);
				o.typeList.splice(ind, 1);
				if(!o.typeList.find(oitem => oitem.type == 'relief')) {
					o.exemptionPrice = 0;
				}
				this.concessions(o);
			},
			//			balance2(o) {
			//				this.contPrice = o.costPrice;
			//			},
			balanceShow(val) {
				this.balanceVisible = !this.balanceVisible;
				setTimeout(() => {
					//					let tags_boxWid = this.$el.querySelector(".sale .tags_box").clientWidth;
					//					this.$el.querySelector(".sale .tags_box .ivu-dropdown .ivu-select-dropdown").style.width = tags_boxWid + 'px';
					//					this.$el.querySelector(".sale .tags_box .ivu-dropdown .ivu-select-dropdown").style.left = -tags_boxWid - 19 + 'px !important';
					//					this.$el.querySelector(".sale .tags_box .ivu-dropdown .ivu-select-dropdown").style.top = '32px !important';
				}, 1000)
			},
			itemsClick() {
				this.items.visible = !this.items.visible;
				let tags_boxWid = this.$el.querySelector(".balance .sale .tags_box").clientWidth;
				this.$nextTick(() => {
					this.$el.querySelector(".balance .sale .tags_box .ivu-dropdown .ivu-select-dropdown").style.width = tags_boxWid + 'px';
					this.$el.querySelector(".balance .sale .tags_box .ivu-dropdown .ivu-select-dropdown").style.left = -tags_boxWid - 19 + 'px !important';
					this.$el.querySelector(".balance .sale .tags_box .ivu-dropdown .ivu-select-dropdown").style.top = '32px !important';
				})
			},
			depositTypeClear(){
				this.$nextTick(()=>{
					setTimeout(()=>{
						this.$refs.generation.validateField('depositType');
					},0)
				})
			}
		},
		watch: {
			screenWidth(val) {
				this.screenWidth = val
				let wid = this.$el.children[0].clientWidth;
				this.$el.querySelector(".submit-btns").style.width = wid + 'px';
				this.$el.querySelector(".dropdown_menu").style.width = wid + 'px';
				let tags_boxWid = this.$el.querySelector(".balance .sale .tags_box").clientWidth;
				this.$el.querySelector(".balance .sale .tags_box .ivu-dropdown .ivu-select-dropdown").style.width = tags_boxWid + 'px';
			}
		}
	}
</script>