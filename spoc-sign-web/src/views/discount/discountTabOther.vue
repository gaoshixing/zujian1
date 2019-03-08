<style lang='less'>
    .discount-tab-other-gsx {
        .other-title {
            margin-bottom: 15px;
        }
        margin-top: 20px;
        @green:#44bcb7;
        .policy_title{
            margin: 0px 0 30px;
            display: flex;
            flex-wrap: wrap;
            font-size: 14px;
            .p-item{
                position: relative;
                width: 170px;
                border: solid 1px #e6e6e6;
                border-radius: 4px;
                padding: 0 20px;
                margin: 0 20px 20px 0;
                height: 46px;
                line-height: 46px;
                cursor: pointer;
                position: relative;
                &.active{
                    background-color: @green;
                    color: #fff;
                    .iconfont{
                        color: #fff;
                    }
                }
                .iconfont{
                    right: 9px;
                    top: 0;
                    position: absolute;
                    color: #cccccc;
                    &:hover{
                        .dropdown{
                            display: block;
                        }
                    }
                    .dropdown{
                        display: none;
                        position: absolute;
                        z-index: 22;
                        top: 18px;
                        left: -70px;
                        padding: 10px 4px;
                        width: 120px;
                        box-sizing: border-box;
                        box-shadow: 0 0 18px 2px rgba(4, 0, 0, 0.2);
                        border-radius: 4px;
                        font-size: 14px;
                        background-color: #fff;
                        .litem{
                            height: 32px;
                            line-height: 32px;
                            cursor: pointer;
                            text-align: center;
                            color: #333;
                            &:hover{
                                color: @green;
                                background-color:rgb(233, 247, 247);
                            }
                        }
                    }
                }
            }
            .new_policy{
                padding-left: 10px;
                .plus{
                    color: @green;
                    border: dashed 1px @green;
                    padding:3px 8px;
                    border-radius: 5px;
                }
            }
        }
        .discount-type {
            margin-top: 50px;
            font-size: 18px;
        }
        .discount{
            .title{
                font-size: 18px;
                color: #333333;
                margin-bottom: 22px;
            }
            .subTitle{
                font-size: 14px;
                margin-bottom:21px;
            }
            .add{
                width: 90px;
                float: right;
            }
            .discount_items{
                margin-bottom: 39px;
            }
           .page {
				text-align: center;
				margin-top: 20px;
			} 
        }
        
    }
    .add-class {
        .ivu-input {
            resize: none;
        }
    }
    .replenish-class {
        font-size: 14px;
        .replenish-table {
            height: 245px;
            border: 1px solid red;
        }
        .replenish-title {
            color: #999;
            line-height: 40px;
        }
        // .replenish-explain {
        //     color: #999;
        //     font-size: 14px;
        //     .explain {
        //         margin-top: 20px;
        //     }
        // }
    }

    .v_sign_discount_add_item {
		@border: 1px solid #dddee1;
		@h: 36px;
		padding-right: 40px;
		.ivu-form-item.last {
			margin-bottom: 0;
		}
		.add-btn {
			float: right;
		}
		.table-div {
			padding-left: 50px;
			text-align: left;
			zoom: 1;
			&::before {
				content: "";
				clear: both;
				height: 0;
				font-size: 0;
				line-height: 0;
				display: table;
			}
		}
		.table-content {
			@selectHeight: 26px;
			margin-bottom: 30px;
			margin-top: 20px;
			border: @border;
			border-bottom: none;
			.ivu-select,
			.ivu-input-wrapper {
				width: 90%;
				height: @selectHeight;
			}
			.ivu-select-single .ivu-select-selection {
				height: @selectHeight;
			}
			.ivu-select-single .ivu-select-selection .ivu-select-placeholder,
			.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
				height: @selectHeight - 2px;
				line-height: @selectHeight - 2px;
			}
			.ivu-input {
				height: @selectHeight;
				text-align: right;
			}
		}
		.table-header {
			background: #f8f8f9;
			border-bottom: @border;
		}
		.table-header,
		.table-footer {
            max-height:200px;
            overflow-y: scroll;
			ul {
				overflow: hidden;
				zoom: 1;
			}
		}
		.table-li {
			height: @h;
			line-height: @h;
			list-style: none;
			float: left;
			padding-left:20px;
			&:nth-child(1) {
				width: 38%;
			}
			&:nth-child(2) {
				width: 30%;
			}
			&:nth-child(3) {
				width: 30%;
			}
			&:nth-child(4) {
				width: 30%;
			}
			&:nth-child(5) {
				width: 30%;
			}
		}
		.table-item {
			border-bottom: @border;
		}
		.ivu-form .ivu-form-item-label{
			color: #b8b8b8;
		}
	}
</style>
<template>
    <div class="discount-tab-other-gsx" v-if="htPolicyList.length">
        <p class='other-title' v-if='current==10'>产品</p>
        <div class="policy_title">
			<div v-for="(item,index) in htPolicyList" :key="index"	:class="{'p-item':1,active:item.id==activeItem.id}" @click="doSelect(index)">
				<span class="label" v-text="item.name"></span>	
				<i class="iconfont icon-xia">
					<div class="dropdown">
						<p class="litem" @click="modifyName(item)">修改</p>
					</div>
				</i>
			</div>
		</div>
        <p class='other-title' v-if='current==10'>优惠政策</p>
        <div class="policy_title" v-if='current==10'>
			<div v-for="(item,index) in htPolicyListSale" :key="index"	:class="{'p-item':1,active:item.id==activeItem.id}" @click="doSelect(index, 'isSale')">
				<span class="label" v-text="item.name"></span>	
				<i class="iconfont icon-xia">
					<div class="dropdown">
						<p class="litem" @click="modifyName(item)">修改</p>
					</div>
				</i>
			</div>
		</div>
        <div class="discount">
			<div class="title" v-text="activeItem.name"></div>
            <v-select v-if="current==21" style="width: 396px;margin: 15px 0 10px;" placeholder="输入合同名称/合同编码" icon="search" v-model="compact" k='cnname' :datafunc="datafunc" @on-enter="textChange" @on-click="textChange" @selected="textChange">
		    </v-select>
			<div class="subTitle">
				• 优惠/促签项目：
				<Button class="add" style="margin-left:16px" type="primary" @click="showAddItem">添加</Button>
				<Button class="add" type="primary" style="width:120px;" @click="showStandard">标准补充协议</Button>
			</div>
			<Table :columns="columns" v-if="!isSaleTable&&activeIndex==0&&current==10" @on-sort-change='sortableChange' :data="tableObj.list" style="margin-bottom:20px;"></Table>
			<Table :columns="columns2" v-if="!isSaleTable&&activeIndex==1&&current==10" :data="tableObj.list" style="margin-bottom:20px;"></Table>
			<Table :columns="columns3" v-if="!isSaleTable&&activeIndex==2&&current==10" :data="tableObj.list" style="margin-bottom:20px;"></Table>
			<Table :columns="columns5" v-if="activeIndex==0&&current==16" :data="tableObj.list" style="margin-bottom:20px;"></Table>
			<Table :columns="columns6" v-if="isSaleTable&&current==10" :data="tableObj.list" style="margin-bottom:20px;"></Table>
			<Table :columns="columns9" v-if="activeIndex==0&&current==21" :data="tableObj.list" style="margin-bottom:20px;"></Table>
			<Table :columns="columns10" v-if="activeIndex==1&&current==21" :data="tableObj.list" style="margin-bottom:20px;"></Table>
            <div class="page">
                <Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange"  :current="tableObj.pageNo" :total="tableObj.count" @on-change="onPageChange" v-if="tableObj.count>10"></Page>
            </div>
		</div>
        <!-- 添加新政策 -->
		<Modal :title="flagadd?'添加新政策':'编辑政策'" v-model="modalShow.showPolicy">
			<Form :data="policyObj">
				<FormItem label="优惠政策">
					<Row>
						<Col span="8">
							<Input v-model="policyObj.name"></Input>
						</Col>
					</Row>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button @click="modalShow.showPolicy=false">取消</Button>
                <Button type="primary" :disabled="!policyObj.name" @click="addPolicy">确定</Button>
			</div>
		</Modal>
        <!--  -->
        <Modal
            :title="addTitle"
            class-name='add-class'
            v-model="modalShow.add"
            width=698
            @on-visible-change ='visibleChange'
        >   
            <div v-show="!isSaleTable && activeIndex == 0 && current == 10">
                <Form  :label-width="100" :model="policyObj0" ref="formValidate0" :rules="ruleValidate0" >
                    <Row>
                        <Col span="12">
                            <FormItem label="项目名称：" prop="name">
                                <Input v-model="policyObj0.name"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="科目：" prop="Subject">
                                <Input v-model="policyObj0.Subject"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                   <!--  <Row>
                        <Col span="12">
                            <FormItem label="单价：" prop="costPrice">
                                <InputNumber :max="9999999" :min="0" v-model="policyObj0.costPrice"></InputNumber> 元/小时
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="课时：" prop="giftCount">
                                <InputNumber :max="9999999" :min="0" v-model="policyObj0.giftCount"></InputNumber> 小时
                            </FormItem>
                        </Col>
                    </Row> -->
                    <Row>
                        <Col span="24">
                            <FormItem label="项目描述：" prop="itemDesc">
                                <Input v-model="policyObj0.itemDesc" type="textarea"  :rows="4" placeholder="请填写项目描述" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem label="产品最低价：" prop="lowestPrice">
                                <Input v-model="policyObj0.lowestPrice"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="次数限制：" prop="isLimitCount">
                                <RadioGroup v-model="policyObj0.isLimitCount">
                                    <Radio label="是"></Radio>
                                    <Radio label="否"></Radio>
                                </RadioGroup>
                                <InputNumber v-if="policyObj0.isLimitCount == '是'" :max="9999999" :min="1" v-model="policyObj0.count"></InputNumber><span v-if="policyObj0.isLimitCount == '是'"> 次/月</span>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
			<div v-show="!isSaleTable && current == 10 && activeIndex == 1">
                <Form  :label-width="132" :model="policyObj1" ref="formValidate1" :rules="ruleValidate1">
                    <Row>
                        <Col span="24">
                            <FormItem label="申请类型：" prop="ApplyType">
                                <Select v-model="policyObj1.ApplyType">
                                    <Option v-for="item in applyTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select> 
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                            <FormItem label="项目名称：" prop="name">
                                <Input v-model="policyObj1.name"  placeholder="请输入项目名称" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem label="教学课程：" prop="TechCourse">
                            <InputNumber :max="9999999" :min="0" v-model="policyObj1.TechCourse"></InputNumber> 小时
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="学管课程：" prop="MangageCourse">
                                <InputNumber :max="9999999" :min="0" v-model="policyObj1.MangageCourse"></InputNumber> 元/小时
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem label="模考讲解：" prop="SimulateExplan">
                                <InputNumber :max="9999999" :min="0" v-model="policyObj1.SimulateExplan"></InputNumber> 次
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="寒/暑假课程：" prop="SummerCourse">
                                <InputNumber :max="9999999" :min="0" v-model="policyObj1.SummerCourse"></InputNumber> 次
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <FormItem label="服务期限：" prop="ServeLimit">
                                <InputNumber :max="9999999" :min="0" v-model="policyObj1.ServeLimit"></InputNumber>
                                <!-- <span style='border-top:1px solid #A7A7A7; width: 8px;display:inline-block;margin: 0 15px'></span> -->
                                <!-- <InputNumber :max="9999999" :min="0" v-model="policyObj1.ServeLimitEnd"></InputNumber> 个月 -->
                            </FormItem>
                        </Col>
                        <Col span="9">
                            <FormItem label=" " prop="ServeLimitEnd" :label-width=20>
                                <!-- <InputNumber :max="9999999" :min="0" v-model="policyObj1.ServeLimit"></InputNumber>
                                <span style='border-top:1px solid #A7A7A7; width: 8px;display:inline-block;margin: 0 15px'></span> -->
                                <InputNumber :max="9999999" :min="0" v-model="policyObj1.ServeLimitEnd"></InputNumber> 个月
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                            <FormItem label="标准化考试报名：" prop="SignUp">
                                <Input v-model="policyObj1.SignUp"  placeholder="标准化考试报名" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="20">
                            <FormItem label="上传协议模板："  prop="FileName">
                                <Upload action="" :show-upload-list="false" ref="upload" :before-upload="handleUpload" :format="['docx']" :max-size="100">
                                    <Button type="success">选择文件</Button>
                                    <span class="nn" v-if="!file.name"  v-text="policyObj1.FileName"></span>
                                    <span class="nn" v-else v-text="file.name"></span>
                                </Upload>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                            <FormItem label="其他服务：" prop="CheckAllGroup">
                                <Checkbox
                                    :value="checkAll"
                                    @click.prevent.native="handleCheckAll"
                                >全选</Checkbox>
                                <CheckboxGroup v-model="policyObj1.CheckAllGroup" @on-change="checkAllGroupChange">
                                    <Checkbox label="北美体验课"></Checkbox>
                                    <Checkbox label="学员专属档案"></Checkbox>
                                    <Checkbox label="家长会"></Checkbox>
                                </CheckboxGroup>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <!-- <Col span="12">
                            <FormItem label="计划包价格：" prop="BagPrice">
                                <InputNumber  :max="9999999" :min="0" v-model="policyObj1.BagPrice"></InputNumber> 元
                            </FormItem>
                        </Col> -->
                        <Col span="12">
                            <FormItem label="适用产品最低价：" prop="lowestPrice">
                                <Input v-model="policyObj1.lowestPrice"  placeholder="请输入适用产品最低价" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem label="次数限制：" prop="isLimitCount">
                                <RadioGroup v-model="policyObj1.isLimitCount">
                                    <Radio label="是"></Radio>
                                    <Radio label="否"></Radio>
                                </RadioGroup>
                                <InputNumber v-if="policyObj1.isLimitCount == '是'" :max="9999999" :min="1" v-model="policyObj1.count"></InputNumber><span v-if="policyObj1.isLimitCount == '是'"> 次/月</span>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
			<div v-show="!isSaleTable && current == 10 && activeIndex == 2">
                <Form  :label-width="100" :model="policyObj2" ref="formValidate2" :rules="ruleValidate2">
                    <Row>
                        <Col span="12">
                            <FormItem label="项目名称：" prop="name">
                                <Input v-model="policyObj2.name"></Input>
                            </FormItem>
                        </Col>
                        <!-- <Col span="12">
                            <FormItem label="课时：" prop="giftCount">
                            <InputNumber :max="9999999" :min="0" v-model="policyObj2.giftCount"></InputNumber> 小时
                            </FormItem>
                        </Col> -->
                    </Row>
                    <Row>
                        <Col span="7">
                            <FormItem label="课程类型：" prop="CourseType">
                                <Select v-model="policyObj2.CourseType" style="width:93px" @on-change="getSecondCommon">
                                    <Option v-for="item in courseTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select> 
                            </FormItem>
                        </Col>
                        <Col span="5">
                            <FormItem label=" " prop="CourseTypeItem" :label-width=20>
                                <Select v-model="policyObj2.CourseTypeItem" style="width:93px">
                                    <Option v-for="item in courseTypeSecondList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <!-- <Col span="12">
                            <FormItem label="价格：" prop="publicPrice">
                                <InputNumber :max="9999999" :min="0" v-model="policyObj2.publicPrice"></InputNumber> 元
                            </FormItem>
                        </Col> -->
                    </Row>
                    <Row>
                        <Col span="24">
                            <FormItem label="项目描述：" prop="itemDesc">
                                <Input v-model="policyObj2.itemDesc" type="textarea" :rows="4" placeholder="请输入" />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
            <!-- <div v-show="activeIndex == 3">
                <Form  :label-width="132" :model="policyObj3" ref="formValidate3" :rules="ruleValidate3" >
                    <Row>
                        <Col span="24">
                            <FormItem label="项目名称：" prop="name">
                                <Input v-model="policyObj3.name"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem label="服务费：" prop="ServePrice">
                            <InputNumber :max="9999999" :min="0" v-model="policyObj3.ServePrice"></InputNumber> 元/天
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="教学课程：" prop="TechCourse">
                                <InputNumber :max="9999999" :min="0" v-model="policyObj3.TechCourse"></InputNumber> 小时/天
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem label="练习课程：" prop="name">
                            <InputNumber :max="9999999" :min="0" v-model="value1"></InputNumber> 小时/天
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="学管课程：" prop="name">
                                <InputNumber :max="9999999" :min="0" v-model="value1"></InputNumber> 小时/天
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem label="作业时间：" prop="name">
                            <InputNumber :max="9999999" :min="0" v-model="value1"></InputNumber> 小时/天
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="总计：" prop="name">
                                <InputNumber :max="9999999" :min="0" v-model="value1"></InputNumber> 小时/天
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                            <FormItem label="描述：" prop="name1">
                                <Input v-model="value6" type="textarea" :rows="4" placeholder="请输入" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem label="适用产品最低价：" prop="name">
                                <Input v-model="value6" placeholder="请输入" />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="次数限制：" prop="name1">
                                <RadioGroup v-model="policyObj.disabledGroup">
                                    <Radio label="是"></Radio>
                                    <Radio label="否"></Radio>
                                </RadioGroup>
                                <InputNumber v-if="policyObj.disabledGroup == '是'" :max="9999999" :min="0" v-model="value1"></InputNumber><span v-if="policyObj.disabledGroup == '是'"> 次/月</span>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div> -->
            <Form v-show="activeIndex == 0 && current == 16" :label-width="110" :model="policyObj4" ref="formValidate4" :rules="ruleValidate4" >
                <Row>
                    <Col span="12">
                        <FormItem label="项目名称：" prop="name">
                            <Input v-model="policyObj4.name" placeholder="请输入项目名称" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="卡片金额：" prop="TechCourse">
                            <InputNumber :max="9999999" :min="0" v-model="policyObj4.TechCourse" placeholder="请输入教学课程" style="width:200px"></InputNumber>
                            <!-- <Input v-model="policyObj4.TechCourse"  placeholder="请输入教学课程" style="width:200px" />元  -->
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="20">
                        <FormItem label="上传协议模板："  prop="FileName">
                            <Upload action="" :show-upload-list="false" ref="upload" :before-upload="handleUpload" :format="['docx']" :max-size="100">
                                <Button type="success">选择文件</Button>
                                    <span class="nn" v-if="!file.name"  v-text="policyObj4.FileName"></span>
                                    <span class="nn" v-else v-text="file.name"></span>
                            </Upload>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="项目描述：" prop="itemDesc">
                            <Input v-model="policyObj4.itemDesc" type="textarea" :rows="4" placeholder="请输入项目描述" />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="适用产品描述：" prop="productDesc">
                            <Input v-model="policyObj4.productDesc" type="textarea" :rows="4" placeholder="请输入适用产品描述" />
                        </FormItem>
                    </Col>
                </Row>
			</Form>
            <Form  v-show="isSaleTable && current == 10" ref="formValidate5" :label-width="135" :model="policyObj5" :rules="ruleValidate5">
                <FormItem label="项目名称：" prop="name">
                    <Input v-model="policyObj5.name"></Input>
                </FormItem>
                <Row type="flex">
                    <Col span="12">
                        <FormItem label="选择优惠项目类型：" prop="type">
                            <Select v-model="policyObj5.type">
                                <Option v-for="item in dictData" :key="item.id" :value="item.value">{{item.label}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6" v-if="policyObj5.type=='discount'">
                        <FormItem :label-width="20" prop="ratio">
                            <Input placeholder="折扣比：" v-model="policyObj5.ratio">
                                <span style="lin-height:normal" slot="append">%</span>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="6" v-if="policyObj5.type=='gift'">
                        <FormItem :label-width="20" prop="giftCount">
                            <Input placeholder="赠送数量：" v-model="policyObj5.giftCount"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" v-if="['gift','increase'].indexOf(policyObj5.type)>=0">
                    <Col span="12">
                        <FormItem label="赠送金额：" prop="publicPrice">
                            <InputNumber style="width:198px" v-model="policyObj5.publicPrice"></InputNumber>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem label="项目描述：">
                    <Input v-model="policyObj5.itemDesc" type="textarea"></Input>
                </FormItem>
                <Row type="flex">
                    <Col span="12">
                        <FormItem label="适用产品最低价：" prop="lowestPrice">
                            <InputNumber style="width:198px" v-model="policyObj5.lowestPrice"></InputNumber>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <Row type="flex">
                            <Col span="16">
                                <FormItem label="是否限制名额(人/月)?">
                                    <RadioGroup v-model="policyObj5.isLimitCount">
                                        <Radio label="是"></Radio>
                                        <Radio label="否"></Radio>
                                    </RadioGroup>
                                </FormItem>	
                            </Col>
                            <Col span="8" v-if="policyObj5.isLimitCount=='是'">
                                <InputNumber  :max="9999999" :min="1"  placeholder="每人每月名额数" v-model="policyObj5.count/1">
                                </InputNumber>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <FormItem label="适用产品描述：">
                    <Input v-model="policyObj5.productDesc"></Input>
                </FormItem>
                <!-- <div v-if="activeItem.name == '赠送学校/专业'">
                    <Row type="flex">
                        <Col span="12">
                            <FormItem label="选择协议模板：" prop="protocalType">
                                <Select v-model="policyObj5.protocalType" @on-change="onTplChange">
                                    <Option v-for="(item,i) in currTpls" :key="item.name+item.id" :value="i">{{item.name}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem label="标准补充协议：" class="last">
                        <Input v-model="policyObj5.protocal" type="textarea"></Input>
                    </FormItem> 
                </div> -->
            </Form>
            <Form v-show="current == 21" :label-width="100" :model="policyObj6" ref="formValidate6" :rules="ruleValidate6" >
                <Row>
                    <Col span="12">
                        <FormItem label="项目名称：" prop="name">
                            <Input v-model="policyObj6.name"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12" v-if='activeIndex==0'>
                        <FormItem label="定价：" prop="publicPrice">
                            <InputNumber :max="9999999" :min="0" v-model="policyObj6.publicPrice"></InputNumber> 元
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                   <FormItem label="项目描述：">
                        <Input v-model="policyObj6.itemDesc" type="textarea"></Input>
                    </FormItem>
                </Row>
            </Form>
            <div class="v_sign_discount_add_item" v-show="!isSaleTable && (activeIndex == 0 || activeIndex == 1 || activeIndex == 2) && current == 10">
                <div class="table-div">
                    <div class="table-content">
                        <div class="table-header">
                            <ul>
                                <li class="table-li">分公司</li>
                                <li v-show="activeIndex == 0 || activeIndex == 2" class="table-li" style="text-align:right;padding-right:10px;">课时数</li>
                                <li v-show="activeIndex == 0" class="table-li" style="text-align:right;padding-right:10px;">单价（元）</li>
                                <li v-show="activeIndex == 1 || activeIndex == 2" class="table-li" style="text-align:right;padding-right:10px;">价格（元）</li>
                            </ul>
                        </div>
                        <div class="table-footer">
                            <div class="table-item" v-for="(item, index) in htItemSubList" :key="item.subId + index">
                                <ul>
                                    <li class="table-li">
                                        <span>{{ item.subName }}</span>
                                    </li>
                                    <li v-show="activeIndex == 0 || activeIndex == 2" class="table-li">
                                        <Input v-model="item.num" :number="true"/>
                                    </li>
                                    <li v-show="activeIndex == 0" class="table-li">
                                        <Input v-model="item.costPrice" :number="true"/>
                                    </li>
                                    <li v-show="activeIndex == 1 || activeIndex == 2" class="table-li">
                                        <Input v-model="item.publicPrice" :number="true"/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p v-if="!isSaleTable" style="text-align: right;color: red">   <Checkbox v-model="isJoin">该产品适用于自组单</Checkbox></p>
            <div slot="footer">
				<Button @click="cancelAdd">取消</Button>
                <Button type="primary"  @click="addOk">确定</Button>
			</div>
		</Modal>
        <Modal
            v-model="modalShow.replenishModal"
            width=718
            class-name='replenish-class'
        >
        <div slot="header" style='font-weight: bold'>
            {{replenishTitle}}

            <Poptip trigger="hover" title="补充协议修改说明" placement="bottom-start" width=572>
                <Icon type="ios-help" color="#FAAD14FF" size="20"/>
                <div slot="content" style='font-weight:400;color:#999;'>
                    <!-- <div style="font-size:14px;color:999;font-weight:400"> -->
                            标准补充协议的意义是？</br> 1、允许你修改表格中的表头内容；</br> 2、允许修改参数的位置。</br></br>
                        <!-- <p style='margin-top:20px'> -->
                            我该如何修改“参数”在表格中的位置？</br>
                            所谓的“参数”就是指标准补充协议中的“（$$）”。如果仔细看的话你会发现这中间所填写的文字内容对</br>
                            应上面的表单中的描述文字。例如："（$项目名称$）"就对应你填写在表中”项目名称“输入框中的容。</br>
                            系统会将你设置的内容填写在合同文本当中。所以如果想修改参数的位置，直接复制粘贴改"（$项目名</br>
                            称$）"在表格中的位置即可。</br>
                            注意：如果（$$）中的内容和表单描述不一致，系统将无法识别这个参数。
                        <!-- </p> -->
                    <!-- </div> -->
                </div>
            </Poptip>
        </div>
            <div v-if="activeIndex == 1 && current == 10 && !isSaleTable">
                <p>
                    <span class="replenish-title">选择协议模板：</span>
                    <Select v-model="templateType" style="width:300px" @on-change='templateTypeChange'>
                        <Option v-for="item in templateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </p>
                <p ><span class="replenish-title">选择标准协议：</span></p>
            </div>
            <!-- <div class="replenish-table">

            </div> -->
            <editor v-if="(activeIndex < 3 && current == 10 && !isSaleTable)||activeIndex == 0 && current == 16" v-model="protocal" @input='editorChange' heightStyle="200"></editor>
            <div v-else>
                <p style="font-size:14px;color:rgba(153,153,153,1);margin-bottom: 20px;">补充协议内容：</p>
				<Input type="textarea" :rows="5" v-model="protocal" style="width:630px;"></Input>
            </div>
             <div slot="footer">
				<Button @click="modalShow.replenishModal=false">取消</Button>
                <Button type="primary"  @click="replenishOk">确定</Button>
			</div>
        </Modal>
    </div>
</template>

<script>
import { extendKey } from '../../libs/util.js';
import {mapMutations,mapState} from 'vuex';
import valid, { errors, htPolicy, htRule, htItem, common, discountTabOther, sys } from '../../libs/request.js';
import editor from '../../modules/editor/editor.vue'
import vSelect from "../../modules/vSelect.vue";

export default {
    props: {
        current: {
            type: [String, Number],
            default: 10,
        }
    },

    watch: {
        current: {
            handler (val) {
                this.activeIndex = 0
                this.getDfl(val)
            },
            immediate: true
        }
    },
    
    data() {
        const CourseType = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请填写必填项目'));
            } else {
                if (this.policyObj2.CourseTypeItem !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.formValidate2.validateField('CourseTypeItem');
                }
                callback();
            }
        };
        const volidCourseTypeItem = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请填写必填项目'));
            } else {
                if (!this.policyObj2.name) return
                callback();
                // this.getSaveType()
            }
        };
        const ServeLimit = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请填写必填项目'));
            } else {
                if (this.policyObj1.ServeLimit !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.formValidate1.validateField('ServeLimitEnd');
                }
                callback();
            }
        };
        const ServeLimitEnd = (rule, value, callback) => {
            console.log(value, this.policyObj1.ServeLimit)
            if (value < this.policyObj1.ServeLimit) {
                callback(new Error('结束不能大于开始'));
            }
            if (!value) {
                callback(new Error('请填写必填项目'));
            }  else {
                // if (!this.policyObj2.name) return
                callback();
                // this.getSaveType()
            }
        };
        return {
            changArr0: ['Subject'],
            changArr1: [ 'Subject', 'ApplyType', 'SignUp', 'ServeLimit', 'FileName', 'attachmentId', 'BagPrice', 'ServeLimitEnd', 'CheckAllGroup', 'SummerCourse', 'SimulateExplan', 'MangageCourse', 'TechCourse',],
            changArr2: [ 'CourseType', 'CourseTypeItem'],
        // cost changArr3 = ['Subject'],
            changArr4: [ 'TechCourse', 'FileName', 'attachmentId'],
            compact: '',
            changArr5: [],
            value: '1',
            activeIndex: 0,
            protocalMy: '',
            protocalMb: '',
            templateType: 'mb',
            isJoin: false,
            fileSuccData: {},
            tempObj: [],
            htPolicyListSale: [],
            templateList: [
                {
                    value: 'mb',
                    label: '语培美本'
                },
                {
                    value: 'my',
                    label: '语培美研'
                },
            ],
            applyTypeList: [
                {
                    value: 1,
                    label: '美本'
                },
                {
                    value: 2,
                    label: '美研'
                },
            ],
            model1: '',
            isSaleTable: false,
            policyObj: {
                isLimitCount: '否',
            },
            policyObj0: {
                costPrice: 0,
                isLimitCount: '否',
                ServeLimitEnd: 0,
                ServeLimit: 0,
                giftCount: 0,
            },
            ruleValidate0: {
                name: [
                    { required: true, message: '请填写必填项', trigger: 'blur' }
                ],
                Subject: [
                    { required: true, message: '请填写必填项', trigger: 'blur' }
                ],
                /* costPrice: [
                    { required: true, message: '请填写必填项',  }
                ], */
            },
            policyObj1: {
                CheckAllGroup: ['北美体验课', '学员专属档案', '家长会'],
                ApplyType: 1,
                BagPrice: 0,
                isLimitCount: '否',
                TechCourse: 0,
                MangageCourse: 0,
                SimulateExplan: 0,
                SummerCourse: 0,
                ServeLimitEnd: 0,
                ServeLimit: 0,
            },
            ruleValidate1: {
                name: [
                    { required: true, message: '请填写必填项',trigger: 'blur'}
                ],
                ApplyType: [
                    { required: true, message: '请填写必填项',}
                ],
                TechCourse: [
                    { required: true, message: '请填写必填项', }
                ],
                MangageCourse: [
                    { required: true, message: '请填写必填项', }
                ],
                SimulateExplan: [
                    { required: true, message: '请填写必填项', }
                ],
                SummerCourse: [
                    { required: true, message: '请填写必填项', }
                ],
                ServeLimit: [
                    { validator: ServeLimit, message: '请填写必填项',  trigger: 'change'}
                ],
                ServeLimitEnd: [
                    { validator: ServeLimitEnd,  trigger: 'change' }
                ],
                SignUp: [
                    { required: true, message: '请填写必填项', trigger: 'blur' }
                ],
                /* BagPrice: [
                    { required: true, message: '请填写必填项', }
                ], */
                FileName: [
                    { required: true, message: '请填写必填项', }
                ],
            },
            policyObj2: {
                giftCount: 0,
                publicPrice: 0,
                isLimitCount: '否',
            },
            ruleValidate2: {
                name: [
                    { required: true, message: '请填写必填项',trigger: 'blur'}
                ],
                /* giftCount: [
                    { required: true, message: '请填写必填项', }
                ],
                publicPrice: [
                    { required: true, message: '请填写必填项', }
                ], */
                CourseType: [
                    { validator: CourseType, required: true, message: '请填写必填项',trigger: 'change' }
                ],
                CourseTypeItem: [
                    { validator: volidCourseTypeItem, message: '请填写必填项'}
                ]
            },
            policyObj3: {},
            ruleValidate3: {
                name: [
                    { required: true, message: '请填写必填项', trigger: 'blur' }
                ],
            },
            policyObj4: {
                TechCourse: 0,
            },
            ruleValidate4: {
                name: [
                    { required: true, message: '请填写必填项', trigger: 'blur' }
                ],
                TechCourse: [
                    { required: true, message: '请填写必填项',  }
                ],
                FileName: [
                    { required: true, message: '请填写必填项', }
                ], 
            },
            policyObj5: {
                TechCourse: 0,
                lowestPrice: 0,
                publicPrice: 0,
                giftCount: 0,
                isLimitCount: '否',
                count: 0,
            },
            ruleValidate5: {
                name: [
                    { required: true, message: '请填写必填项', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请填写必填项', }
                ],
                giftCount: [
                    { required: true, message: '请填写必填项', }
                ],
                ratio: [
                    { required: true, message: '请填写必填项', }
                ],
                FileName: [
                    { required: true, message: '请填写必填项', }
                ], 
            },
            policyObj6: {
                publicPrice: 0,
            },
            ruleValidate6: {
                name: [
                    { required: true, message: '请填写必填项', trigger: 'blur' }
                ],
                publicPrice: [
                    { required: true, message: '请填写必填项', }
                ],
            },
            addTitle: '',
            modalShow: {
                showPolicy: false,
                add: false,
                replenishModal: false,
            },
            maxSize:1024*100*1024,
            pageSize: 10,
            pageNo: 1,
            tableObj: {
                count: 1,
                list: [
                ],
            },
            protocalList: [],
            htPolicyList: [],
            activeItem: {},
            flagadd:true,
            replenishTitle: '',
            policyObj:{
				id:'',
				name:''
            },
            file: '',
            columns: [
                {
					title:'项目名称',
					key:'name',
					align:'center'
				},
				{
					title:'科目',
					key:'name',
                    align:'center',
                    render: (h, params) => {
                        return h('span', params.row.htItemSettings.map(item => {
                            if (item.key == 'Subject') {
                                return h('span', {}, item.value)
                            }
                        }))
                       
                    }
				},
				{
					title:'课程单价',
					key:'costPrice',
                    align:'center',
                    sortable: true,
				},
				{
					title:'描述',
					key:'itemDesc',
					align:'center'
				},
				{
					title:'使用状态',
					key:'name',
                    align:'center',
                    render: (h, params) => {
                        return h('span', {},
                            params.row.isUse == 1 ? '停用': '启用'
                        )
                    }
				},
				{
					title:'操作',
					key:'name',
                    align:'center',
                    render: (h, params) => {
                        return  h ('div', [
                            h('span', {
                                style: {
                                    marginRight: '15px',
                                    color: '#44bcbc',
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.editItem(params.row)
                                    }
                                }
                            }, '编辑'),
                            h('span', {
                                style: {
                                    marginRight: '15px',
                                    color: params.row.isUse == 0 ? 'red' : '#44bcbc',
                                    cursor: 'pointer',
                                },
                                on: {
                                    click: () => {
                                        this.uploadIsUse(params.row)
                                    }
                                }
                            }, params.row.isUse == 0 ? '停用': '启用')
                        ])
                    }
				},
            ],
            columns2: [
                {
					title:'项目名称',
					key:'name',
					align:'center'
				},
				{
					title:'申请类型',
					key:'name',
                    align:'center',
                    render: (h, params) => {
                        return h('span', params.row.htItemSettings.map(item => {
                            if (item.key == 'ApplyType') {
                                return h('span', {}, item.value == 1 ? '美本' : '美研')
                            }
                        }))
                    }
				},
				{
					title:'服务期限',
					key:'ServeLimit',
                    align:'center',
                    render: (h, params) => {
                        return h('span', params.row.htItemSettings.map(item => {
                            if (item.key == 'ServeLimit') {
                                return ('span', item.value+'至')
                            }
                            if (item.key == 'ServeLimitEnd') {
                                return ('span', item.value+'个月')
                            }
                        }))
                    }
				},
				{
					title:'价格',
					key:'costPrice',
                    align:'center',
                    render: (h, params) => {
                        return h('span', params.row.htItemSettings.map(item => {
                            if (item.key == 'BagPrice') {
                                return h('span', {}, item.value)
                            }
                        }))
                    }
				},
				// {
				// 	title:'描述',
				// 	key:'itemDesc',
				// 	align:'center'
				// },
				{
					title:'使用状态',
					key:'name',
                    align:'center',
                    render: (h, params) => {
                        return h('span', {},
                            params.row.isUse == 1 ? '停用': '启用'
                        )
                    }
				},
				{
					title:'操作',
					key:'name',
                    align:'center',
                    render: (h, params) => {
                        return  h ('div', [
                            h('span', {
                                style: {
                                    marginRight: '15px',
                                    color: '#44bcbc',
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        if (params.row.htItemSettings) {
                                            params.row.htItemSettings.forEach((item, index) => {
                                                if (item.key == 'CheckAllGroup' && item.key ) {
                                                    params.row.htItemSettings[index].value=params.row.htItemSettings[index].value.split?params.row.htItemSettings[index].value.split(','):params.row.htItemSettings[index].value
                                                }
                                            })
                                        }
                                        this.editItem(params.row)
                                    }
                                }
                            }, '编辑'),
                            h('span', {
                                style: {
                                    marginRight: '15px',
                                    color: params.row.isUse == 0 ? 'red' : '#44bcbc',
                                    cursor: 'pointer',
                                },
                                on: {
                                    click: () => {
                                        this.uploadIsUse(params.row)
                                    }
                                }
                            }, params.row.isUse == 0 ? '停用': '启用')
                        ])
                    }
				},
            ],
            columns3: [
                {
					title:'项目名称',   
					key:'name',
					align:'center'
				},
				{
					title:'课时（小时）',
					key:'giftCount',
                    align:'center',
                    sortable: true,
                    // render: (h, params) => {
                    //     return h('span', params.row.htItemSettings.map(item => {
                    //         if (item.key == 'Hour') {
                    //             return h('span', {}, item.value)
                    //         }
                    //     }))
                    // }
				},
				{
					title:'课程日期',
					key:'createDate',
					align:'center'
				},
				{
					title:'班课价格',
					key:'costPrice',
					align:'center'
				},
				{
					title:'描述',
					key:'itemDesc',
					align:'center'
				},
				{
					title:'使用状态',
					key:'name',
                    align:'center',
                    render: (h, params) => {
                        return h('span', {},
                            params.row.isUse == 1 ? '停用': '启用'
                        )
                    }
				},
				{
					title:'操作',
					key:'name',
                    align:'center',
                    render: (h, params) => {
                        return  h ('div', [
                            h('span', {
                                style: {
                                    marginRight: '15px',
                                    color: '#44bcbc',
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.editItem(params.row)
                                    }
                                }
                            }, '编辑'),
                            h('span', {
                                style: {
                                    marginRight: '15px',
                                    color: params.row.isUse == 0 ? 'red' : '#44bcbc',
                                    cursor: 'pointer',
                                },
                                on: {
                                    click: () => {
                                        this.uploadIsUse(params.row)
                                    }
                                }
                            }, params.row.isUse == 0 ? '停用': '启用')
                        ])
                    }
				},
            ],
            // columns4: [
             //     {
			 // 		title:'项目名称',   
			 // 		key:'name',
			 // 		align:'center'
			 // 	},
			 // 	{
			 // 		title:'服务费（元/天）',
			 // 		key:'name',
             //         align:'center',
			 // 	},
			 // 	{
			 // 		title:'描述',
			 // 		key:'itemDesc',
			 // 		align:'center'
			 // 	},
			 // 	{
			 // 		title:'使用状态',
			 // 		key:'name',
             //         align:'center',
             //         render: (h, params) => {
             //             return h('span', {},
             //                 params.row.isUse == 1 ? '停用': '启用'
             //             )
             //         }
			 // 	},
			 // 	{
			 // 		title:'操作',
			 // 		key:'name',
             //         align:'center',
             //         render: (h, params) => {
             //             return  h ('div', [
             //                 h('span', {
             //                     style: {
             //                         marginRight: '15px',
             //                         color: '#44bcbc',
             //                         cursor: 'pointer'
             //                     },
             //                     on: {
             //                         click: () => {
             //                             this.editItem(params.row)
             //                         }
             //                     }
             //                 }, '编辑'),
             //                 h('span', {
             //                     style: {
             //                         marginRight: '15px',
             //                         color: params.row.isUse == 0 ? 'red' : '#44bcbc',
             //                         cursor: 'pointer',
             //                     },
             //                     on: {
             //                         click: () => {
             //                             this.uploadIsUse(params.row)
             //                         }
             //                     }
             //                 }, params.row.isUse == 0 ? '停用': '启用')
             //             ])
             //         }
			 // 	},
             // ],
            columns5: [
                {
					title:'项目名称',   
					key:'name',
					align:'center'
				},
				{
					title:'卡片金额',
					key:'costPrice',
                    align:'center',
                    render: (h, params) => {
                        return h('span', params.row.htItemSettings.map(item => {
                            if (item.key == 'TechCourse') {
                                return h('span', {}, item.value)
                            }
                        }))
                    }
				},
				{
					title:'描述',
					key:'itemDesc',
					align:'center'
				},
				{
					title:'使用状态',
					key:'name',
                    align:'center',
                    render: (h, params) => {
                        return h('span', {},
                            params.row.isUse == 1 ? '停用': '启用'
                        )
                    }
				},
				{
					title:'操作',
					key:'name',
                    align:'center',
                    render: (h, params) => {
                        return  h ('div', [
                            h('span', {
                                style: {
                                    marginRight: '15px',
                                    color: '#44bcbc',
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.editItem(params.row)
                                    }
                                }
                            }, '编辑'),
                            h('span', {
                                style: {
                                    marginRight: '15px',
                                    color: params.row.isUse == 0 ? 'red' : '#44bcbc',
                                    cursor: 'pointer',
                                },
                                on: {
                                    click: () => {
                                        this.uploadIsUse(params.row)
                                    }
                                }
                            }, params.row.isUse == 0 ? '停用': '启用')
                        ])
                    }
				},
            ],
            columns6: [
                {
					title:'项目名称',   
					key:'name',
					align:'center'
                },
                {
					title:'描述',   
					key:'itemDesc',
					align:'center'
                },
                {
					title:'适用产品',   
					key:'productDesc',
					align:'center'
                },
                {
					title:'操作',
					key:'name',
                    align:'center',
                    render: (h, params) => {
                        return  h ('div', [
                            h('span', {
                                style: {
                                    marginRight: '15px',
                                    color: '#44bcbc',
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.editItem(params.row)
                                    }
                                }
                            }, '编辑'),
                            h('span', {
                                style: {
                                    marginRight: '15px',
                                    color: params.row.isUse == 0 ? 'red' : '#44bcbc',
                                    cursor: 'pointer',
                                },
                                on: {
                                    click: () => {
                                        this.uploadIsUse(params.row)
                                    }
                                }
                            }, params.row.isUse == 0 ? '停用': '启用')
                        ])
                    }
				},
            ],
            columns9: [
                {
					title:'项目名称',   
					key:'name',
					align:'center'
                },
                {
					title:'价格',   
					key:'publicPrice',
					align:'center'
                },
                {
					title:'描述',   
					key:'itemDesc',
					align:'center'
                },
                {
					title:'使用状态',   
					key:'name',
                    align:'center',
                    render: (h, params) => {
                        return h('span', {},
                            params.row.isUse == 1 ? '停用': '启用'
                        )
                    }
                },
                {
					title:'操作',
					key:'name',
                    align:'center',
                    render: (h, params) => {
                        return  h ('div', [
                            h('span', {
                                style: {
                                    marginRight: '15px',
                                    color: '#44bcbc',
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.editItem(params.row)
                                    }
                                }
                            }, '编辑'),
                            h('span', {
                                style: {
                                    marginRight: '15px',
                                    color: params.row.isUse == 0 ? 'red' : '#44bcbc',
                                    cursor: 'pointer',
                                },
                                on: {
                                    click: () => {
                                        this.uploadIsUse(params.row)
                                    }
                                }
                            }, params.row.isUse == 0 ? '停用': '启用')
                        ])
                    }
				},
            ],
            columns10: [
                {
					title:'项目名称',   
					key:'name',
					align:'center'
                },
                {
					title:'描述',   
					key:'itemDesc',
					align:'center'
                },
                {
					title:'使用状态',   
					key:'name',
                    align:'center',
                    render: (h, params) => {
                        return h('span', {},
                            params.row.isUse == 1 ? '停用': '启用'
                        )
                    }
                },
                {
					title:'操作',
					key:'name',
                    align:'center',
                    render: (h, params) => {
                        return  h ('div', [
                            h('span', {
                                style: {
                                    marginRight: '15px',
                                    color: '#44bcbc',
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.editItem(params.row)
                                    }
                                }
                            }, '编辑'),
                            h('span', {
                                style: {
                                    marginRight: '15px',
                                    color: params.row.isUse == 0 ? 'red' : '#44bcbc',
                                    cursor: 'pointer',
                                },
                                on: {
                                    click: () => {
                                        this.uploadIsUse(params.row)
                                    }
                                }
                            }, params.row.isUse == 0 ? '停用': '启用')
                        ])
                    }
				},
            ],
            protocal: '',
            checkAll: true,
            saveObj: {},
            courseTypeSecondList: [],
            courseTypeList: [],
            dictData: [],
            approverList: [],
            companyList: [],
            htItemSubList: [],
        }
    },

    components: {
        editor,
        vSelect,
    },

    mounted() {
        this.getCommon()
        this.loadCompany()
    },

    methods: {
        ...mapMutations(['updateLoadingStatus']),
        loadCompany() {
            let data = {
                types: 1
            }
            common.officeList(data).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let company = res.data.data.allCompany
                    company.forEach((item)=>{
                        item.publicPrice = 0
                        item.costPrice = 0
                        item.num = 0
                        item.subId = item.id
                        item.subName = item.name
                        delete item.id
                    })
                    this.companyList = company
                }
            }).catch(errors.call(this)).finally(() => {
            });
        },
        // 字典 课程类型
        getCommon() {
            let obj = {
                type: 'ht_contract_course_type'
            }
            sys.getByType(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.courseTypeList = res.data.data
                }
            }).catch(errors.call(this));
            common.batchListData({types:'ht_item_type,ht_item_level'}).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.dictData = res.data.data.ht_item_type.splice(0,2);
				}
			}).catch(errors.call(this));
			common.approverList().then(valid.call(this)).then(res=>{
				if(res.ok){
					this.approverList = res.data.data.roleList.filter(item=>{
						return item;
					});
				}
			}).catch(errors.call(this));
        },

        // 字典 课程类型二级
        getSecondCommon() {
            this.policyObj2.CourseTypeItem = ''
            if (!this.policyObj2.CourseType) return
            let obj = {
                type: this.policyObj2.CourseType
            }
            sys.getByType(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.courseTypeSecondList = res.data.data
                }
            }).catch(errors.call(this));
        },

        // 启用 停用 
        uploadIsUse(paramObj) {
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认'+(paramObj.isUse == '0' ? '停用' : '启用')+'该设置?</p>',
                onOk: () => {
                    let param = {
                        isUse: paramObj.isUse == 0 ? 1 : paramObj.isUse == 1? 0: '',
                        id: paramObj.id
                        }
                    discountTabOther.uploadIsUse(param).then(valid.call(this)).then(res=>{
                        if (res.ok) {
                            this.$Message.info(res.data.message)
                            this.updateLoadingStatus({isLoading:true});
                            this.getListData()
                        }
                    }).catch(errors.call(this));
                },
                onCancel: () => {
                    }
                });
        },

        getDfl(parentId, isUpdata=true, from="") {
			let param = {
				parentId
			}
			htPolicy.list(param).then(valid.call(this)).then(res=>{
				if (res.ok) {
                    this.tempObj = [...res.data.data]
                    if (this.current == 10) {
                        this.htPolicyListSale = res.data.data.splice(3, res.data.data.length)
                    }
                    if (from == 'upName') {
                        this.htPolicyList = res.data.data
                        if (this.isSaleTable) {
                            this.activeItem = this.htPolicyListSale[this.activeIndex]
                        } else {
                            this.activeItem = this.htPolicyList[this.activeIndex]
                        }
                    } 
                    if (!isUpdata) return
                    this.htPolicyList = res.data.data
                    this.activeItem = this.htPolicyList[0]
                    this.protocal = this.activeItem.protocal
                    this.updateLoadingStatus({isLoading:true});
                    this.getListData()
				}
			}).catch(errors.call(this));
		},
        // 切换选中状态
		doSelect(index, isSale=''){
            this.activeIndex = index;
            let temp = this.tempObj.concat([])
            if (isSale) {
                this.activeItem = temp[index+3];
                this.isSaleTable = true
            } else {
                this.isSaleTable = false
                this.activeItem = temp[index];
            }
            if (index == 1 && this.current == 10 &&  !this.isSaleTable && this.activeItem.protocal.length) {
                let jsonObj = JSON.parse(this.activeItem.protocal)
                this.protocalMy = jsonObj.my
                this.protocalMb = jsonObj.mb
                this.protocal = this.protocalMb
            } else {
                this.protocal = this.activeItem.protocal
            }
            this.updateLoadingStatus({isLoading:true});
            this.getListData()
        },
        
        modifyName(item){
			this.flagadd = false;
			this.modalShow.showPolicy = true;
			this.policyObj = extendKey(['id','name'],item,{});
        },

        getListData(sort='') {
            let param = {
                policyId: this.activeItem.id,
                pageSize: this.pageSize,
                pageNo: this.pageNo,
            }
            if (sort) {
                param = Object.assign(param, {
                    orderBy: 'costPrice',
                    orderType: sort,
                })
            }
            if (this.current == 21) {
                param = Object.assign(param, {
                    name: this.compact,
                })
            }
			discountTabOther.listPage(param).then(valid.call(this)).then(res=>{
				if (res.ok) {
                    this.tableObj = res.data.data
				}
			}).catch(errors.call(this)).finally(()=>{
                this.updateLoadingStatus({isLoading:false});
            });;
        },

        sortableChange(val) {
            this.getListData(val.order)
        },

        showAddItem() {
            this.htItemSubList = [].concat(this.companyList)
            this.updataFormParams()
            this.addTitle =  '添加' + this.activeItem.name
            this.modalShow.add = true
        },

        updataFormParams() {
            this.policyObj = {
                isLimitCount: '否',
            }
            this.policyObj0 = {
                costPrice: 0,
                isLimitCount: '否',
                ServeLimitEnd: 0,
                ServeLimit: 0,
                giftCount: 0,
            }
            this.policyObj1 = {
                CheckAllGroup: ['北美体验课', '学员专属档案', '家长会'],
                ApplyType: '1',
                BagPrice: 0,
                isLimitCount: '否',
                TechCourse: 0,
                MangageCourse: 0,
                SimulateExplan: 0,
                SummerCourse: 0,
                ServeLimit: 0,
                ServeLimitEnd: 0,
            }
            this.policyObj2 = {
                publicPrice: 0,
                giftCount: 0,
                isLimitCount: '否',
            }
            this.policyObj3 = {}
            this.policyObj4 = {
                TechCourse: 0,
            }
            this.policyObj5 = {
                TechCourse: 0,
                lowestPrice: 0,
                publicPrice: 0,
                giftCount: 0,
                isLimitCount: '否',
                count: 0,
            }
            this.policyObj6 = {
                publicPrice: 0
            }
        },

        editItem(val) {
            console.log(val)
            val.isLimitCount == '0' ? val.isLimitCount = '否' : val.isLimitCount = '是'
            val.isJoin == '0' ? this.isJoin = false : this.isJoin = true
            this.updataFormVoild()
            this.addTitle =  '编辑' + this.activeItem.name
            let tempArr = []
            let tempObj = val
            if (this.activeIndex == 2 && this.current == 10 && !this.isSaleTable) {
                this.handleParams(val)
            }
            if (this.current == 21) {
                tempArr = [] 
            } else if (this.isSaleTable) {
                tempArr = this.changArr5; 
            } else {
                switch(this.activeIndex) {
                    case 0: 
                        if (this.current == 16) {
                            tempArr = this.changArr4; break;
                        } else  {
                            tempArr = this.changArr0; break;
                        }
                    case 1: tempArr = this.changArr1; break;
                    case 2: tempArr = this.changArr2; break;
                    // case 3: this.hanldeDate3(val); break;
                }
            }

            tempArr.forEach(item => {
                if(val.htItemSettings && val.htItemSettings.length) {
                    val.htItemSettings.forEach(itemItem => {
                        if (itemItem.key == item) {
                            tempObj[itemItem.key] = itemItem.value/1||itemItem.value
                        }
                    })
                }
            })
            if (this.current == 21) {
                this.policyObj6 = tempObj
            } else if (this.isSaleTable) {
                this.policyObj5 = {...tempObj}
            } else {
                switch(this.activeIndex) {
                    case 0:
                        if (this.current == 16) {
                            this.policyObj4 = tempObj; break;
                        } else  {
                            this.policyObj0 = tempObj; break;
                        }
                    case 1: this.policyObj1 = tempObj; break;
                    case 2: this.policyObj2 = tempObj; break;
                    // case 3: this.hanldeDate3(val); break;
                }
            }
            if(!this.isSaleTable && (this.activeIndex == 0 || this.activeIndex == 1 || this.activeIndex == 2) && this.current == 10){
                this.htItemSubList = val.htItemSubList
            }
            this.modalShow.add = true
        },

        // 处理二级联动
        handleParams(val) {
            let courseFirst = val.htItemSettings.find(item => {
                return item.key == 'CourseType'
            })
            this.policyObj2.CourseType = courseFirst.value
            this.getSecondCommon()
        },

            // 重置
        updataFormVoild() {
            let temp = 'formValidate' + this.activeIndex
            if (this.activeIndex == 0 && this.current == 16) temp = 'formValidate4'
            if (this.isSaleTable) temp = 'formValidate5'
            if (this.current == 21)  temp = 'formValidate6'
            this.$refs[temp].resetFields()
        },

        addPolicy(){
            let	data = extendKey(['id','name'],this.policyObj,{});
			htPolicy.updateName(data).then(valid.call(this)).then(res=>{
				if(res.ok){
                    this.modalShow.showPolicy=false;
                    this.getDfl(this.current, false, 'upName')
					// this.getChildList(this.activeItem.id);
				}
			}).catch(errors.call(this));
		},

        showStandard() {
            this.replenishTitle = this.activeItem.name + '补充协议'
            this.modalShow.replenishModal = true
        },

        onPageSizeChange(val) {
            this.pageSize = val
            this.updateLoadingStatus({isLoading:true});
            this.getListData()
        },

        onPageChange(val) {
            this.pageNo = val
            this.updateLoadingStatus({isLoading:true});
            this.getListData()
        },

        handleUpload (file) {
            const ext = file.name.split('.').pop();
            const format = ['docx', 'txt']
            if(format.indexOf(ext)<0){
                this.$Message.error("需使用docx格式");
                return false;
            } else if (file.size>this.maxSize){
                this.$Message.error("文件大小不能超过100MB");
                return false;
            }
            if (this.activeIndex == 0 && this.current == 16) {
                this.$set(this.policyObj4, 'FileName', file.name)
            }
            if (this.activeIndex == 1 && this.current == 10) {
                this.$set(this.policyObj1, 'FileName', file.name)
            }
            this.file = file;
            return false;
        },

        doupload() {
            var data = new FormData();
            data.append('files',this.file);
            data.append('type', 'ht_item_tpl');
            data.append('dirName', 'business');
            data.append('isOverride', '1');
            data.append('menuId', '201');
            this.updateLoadingStatus({isLoading:true});
            common.uploadToPanNew(data).then(valid.call(this)).then(res => { if (res.ok) {
                this.$Message.info(res.data.message);
                this.fileSuccData = res.data.data
                this.saveForm('file')
            } }).catch(errors.call(this)).finally(()=>{
                this.updateLoadingStatus({isLoading:false});
            })
        },

        addCancel() {
        },

        addOk() {
            let temp = 'formValidate' + this.activeIndex
            if (this.activeIndex == 0 && this.current == 16) temp = 'formValidate4'
            if (this.isSaleTable) temp = 'formValidate5'
            if (this.current == 21)  temp = 'formValidate6'
            this.$refs[temp].validate((valid) => {
                if (valid) {
                    this.getSaveType()
                } else {
                    this.$Message.error('请填写必填项');
                }
            })
        },

        visibleChange(val) {
            if (!val) this.cancelAdd()
        },

        cancelAdd() {
            this.modalShow.add=false
            this.getListData()
            // this.updataFormVoild()
        },

        getSaveType() {
            let userDefinedKey = []
            if (this.current == 21) {
                this.saveObj = this.policyObj6; userDefinedKey = [];
            }else if (this.isSaleTable) {
                this.saveObj = this.policyObj5; userDefinedKey = this.changArr5;
            } else {
                switch(this.activeIndex) {
                    case 0: 
                        if (this.current == 16) {
                            this.saveObj = this.policyObj4; userDefinedKey = this.changArr4; break;
                        } else  {
                            this.saveObj = this.policyObj0; userDefinedKey = this.changArr0; break;
                        }
                    case 1: this.saveObj = this.policyObj1; userDefinedKey = this.changArr1; break;
                    case 2: this.saveObj = this.policyObj2; userDefinedKey = this.changArr2; break;
                    // case 3: this.saveObj = this.policyObj3; userDefinedKey = ['Hour', 'Subject']; break;
                }
            }
            
            this.saveObj.isLimitCount == '否' ? this.saveObj.isLimitCount = 0 : this.saveObj.isLimitCount = 1
            this.saveObj.htItemSettings = []

            Object.keys(this.saveObj).forEach(item => {
                if(userDefinedKey.includes(item)) {
                    this.saveObj.htItemSettings.push({
                        key: item,
                        value: item == 'CheckAllGroup'? this.saveObj.CheckAllGroup.join(','): this.saveObj[item]
                    })
                    delete this.saveObj[item]
                }
            })
            
            if (this.file.name) {
                this.doupload()
                return
            }
            this.saveForm()
        },

        // 编辑或保存优惠政策
        saveForm(source='') {
            this.modalShow.add = false
            let index = this.saveObj.htItemSettings.findIndex(item => {
                return item.key == 'attachmentId'
            })
            let index2 = this.saveObj.htItemSettings.findIndex(item => {
                return item.key == 'FileName'
            })
            
            if (source == 'file') {
                if (index == -1) {
                    this.saveObj.htItemSettings.push({
                        key: 'attachmentId',
                        value: this.fileSuccData.id
                    })
                } else {
                    this.saveObj.htItemSettings[index].value = this.fileSuccData.id
                }
                if (index2 == -1) {
                    this.saveObj.htItemSettings.push({
                        key: 'FileName',
                        value: this.fileSuccData.initFileName
                    })
                } else {
                    this.saveObj.htItemSettings[index2].value = this.fileSuccData.initFileName
                }
            }  

            let baseObj = {
               policyId: this.activeItem.id,
               isJoin: this.isJoin == false ? 0 : 1,
            }
            baseObj = Object.assign(this.saveObj, baseObj)

            /* let q1 = this.policyObj5.htItemSettings.filter(item=>{
                return item.key == 'type';
            });
            if(q1 && q1.length > 0){
                this.saveObj['type'] = q1[0].value
            }

            let q2 = this.policyObj5.htItemSettings.filter(item=>{
                return item.key == 'publicPrice';
            });
            if(q2 && q2.length > 0  && q2[0].value){
                this.saveObj['publicPrice'] = q2[0].value
            } */

            
            if(!this.isSaleTable && (this.activeIndex == 0 || this.activeIndex == 1 || this.activeIndex == 2) && this.current == 10){
                this.saveObj.htItemSubList = this.htItemSubList
            }
			discountTabOther.saveForm(this.saveObj).then(valid.call(this)).then(res=>{
				if (res.ok) {
                    this.$Message.info(res.data.message)
                    this.isJoin = false
                    this.updateLoadingStatus({isLoading:true});
                    this.getListData()
				}
            }).catch(errors.call(this)).finally(() => {
                this.updataFormVoild()
                this.updataFormParams()
            }).finally(() => {
                this.file = ''
            });
        },

        editorChange(val) {
            if (this.templateType == 'mb') {
                this.protocalMb = val
            } else {
                this.protocalMy = val
            }
        },

        templateTypeChange(val) {
            if (val == 'mb') {
                this.protocal = this.protocalMb 
            } else {
                this.protocal = this.protocalMy
            }
        },
        
        datafunc() {
            return new Promise((resole, reject) => {

            })
        },

        textChange() {
            this.getListData()
        },

        //保存
		replenishOk(){
			if (this.activeItem) {
				let data = {
					id: this.activeItem.id,
					name: this.activeItem.name,
					protocal: this.protocal
                }
                if (this.activeIndex == 1 && this.current == 10 && !this.isSaleTable) {
                    let jsonMb = this.protocalMb&&JSON.stringify(this.protocalMb)
                    let jsonMy = this.protocalMy&&JSON.stringify(this.protocalMy)
                    data.protocal = `{"mb": ${jsonMb}, "my": ${jsonMy}}`
                }
				htPolicy.save(data).then(valid.call(this)).then(res=>{
					if (res.ok) {
						this.modalShow.replenishModal = false;
                        this.$Message.success(res.data.message);
						this.getDfl(this.current, false)
					}
				}).catch(errors.call(this));
			}
		},

        handleCheckAll () {
            if (this.checkAll) {
                this.policyObj1.CheckAllGroup = []
            } else {
                this.policyObj1.CheckAllGroup = ['北美体验课', '学员专属档案', '家长会'];
            }
            this.checkAll = !this.checkAll
        },

        checkAllGroupChange (data) {
            if (data.length === 3) {
                this.checkAll = true;
            } else if (data.length > 0) {
                this.checkAll = false;
            } else {
                this.checkAll = false;
            }
        }
    }
}
</script>