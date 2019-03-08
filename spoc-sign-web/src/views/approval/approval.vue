<style lang="less">
.approvalAll {
	font-size: 14px;
	.cancel {
		display: none;
	}

	.time {
		position: relative;	
		
	}

	.description {
		margin-top:14px; 

		p {
		font-weight: 600;
		line-height: 28px;
		}
	}

  	.isAgree {
		margin-top: 20px;
		button {
			span {
				color: #ffffff;
			}
			width: 90px;
			height: 35px;
			color: #ffffff;
			background-color: #d9697e;
			border: none;
			border-radius: 3px;
			&:first-child {
				margin-left: 33%;
				margin-right: 88px;
				background-color: #44bcb7;
			}
		}
	}
	.dateTime {
		font-size: 12px;
		span:first-child {
			color: #b8b8b8;
			margin-right: 15px;
		}
	}
	.order {
		font-size: 12px;
		position: relative;
		margin-top: 10px;
		margin-bottom: 40px; 
		.orderS  {
			color: #b8b8b8;
			display: inline-block;
			width: 63.3px;
			text-align: right;
			margin-right: 15px;
		}

		.orderList {
			cursor: pointer;
			margin-right: 10px;
			display: inline-block;
			padding: 4px 10px;
		}

		.active {
			background-color: #44bcb7;
			// transition: transform .1s ease-in;
			color: white;
		}

		// .activeTransform {
		// 	transform: rotate(180deg)
		// }
	}

	i,b {
			font-style: normal;
			color: #44bcb7;
			font-size: 16px;
        }
	b {
		color: red; 
		font-weight: normal;
	}

	.checkPass {  
		margin-top: 20px;
		p {	
		line-height:25px;
     	 color: red;
			span {
				color: #b8b8b8;
				float: right;
				margin-left: 20px
			}
		}
		
	}
	.page {
		// margin-top: 10px;
		text-align: center;
		margin-top: 20px;
	}
	.ivu-input {
        height: 26px;  
    }
    .ivu-input-icon {
        height: 26px;
        line-height: 26px;            
    }
}
</style>
<template>
    <div class="approvalAll">
		<!-- <approval-bar
		:activeIndex= "activeIndex"
		:stateList="stateList"
		@addActive="addActive"
		>
		</approval-bar> -->
		<Tabs @on-click="addActive" v-model="tabValue">
			<TabPane label="待审核" name="0"></TabPane>
			<TabPane label="审核通过" name="1"></TabPane>
			<TabPane label="已驳回" name="2"></TabPane>
		</Tabs>
		<div class="time">
			<div class="search">
				<v-select style="width: 396px;margin: 15px 0;" placeholder="请输入合同名称/合同编码/学生姓名/EC号" icon="search" v-model="compact" k='cnname' :datafunc="aa" @on-enter="textChange" @on-click="textChange" @selected="textChange">
				</v-select>
			</div>
        <div class="dateTime">
			<span>提交时间 ：</span>
         	<DatePicker type="date" @on-change="dataChangeBefore"  placeholder="开始时间" style="width: 118px;"></DatePicker>
          	<span style="background-color:#36a29e;display:inline-block;width:12px;height:2px;"></span>
          	<DatePicker type="date" @on-change="dataChangeAfter" placeholder="结束时间" style="width: 118px"></DatePicker>
        </div>
      	</div>
		<div class="order">
          	<span class="orderS">排序 ：</span>
			<!-- <Icon  :class="{active:index===num1, activeTransform: index===num1}" v-if="index>0" type="chevron-up"></Icon> -->
            <span class="orderList" :class="{active:index===num1}" v-for="(item, index) in orderList" @click="order(index)">{{item}} </span>
			<p style="position:absolute;right:80px;top:0;">共<i class="fontColorI"> {{signAmount}} </i>份{{stateList[activeIndex]}}合同，签约总金额<b> {{allPrice|filterMoney}} </b>万元</p>
			<div v-if="data2" v-for="all in data2">
				<module-approval
				:all="all"
				@formDialog="formDialog"
				:show="isShow">
					<div v-if="all.protocolCustom" class="description">
						<p >自定义条款内容：{{all.protocolCustom}}</p>
					</div>
					<div v-if="activeIndex==0">
						<div class="isAgree">
							<Button @click="dialogTrue(all.id)" type="primary">通过</Button>
							<Button @click="dialogFalse(all.id)" type="error">驳回</Button>
						</div>
					</div>
					<div class="checkPass" v-if="activeIndex>0">
						<p>审核时间：{{all.auditingTime|filterTime}}<span>授权审核人：<i>{{all.accreditUserList|filterName}}</i></span><span> 实际审批人：<i>{{all.factUser|filterName2}}</i></span></p>
						<p v-if="activeIndex==2">驳回理由：{{all.reason}}</p>
					</div>
				</module-approval>
    		</div>
      	</div>
		  	<div v-if="listParams.count>10" class="page">
				<Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange" :page-size="listParams.pageSize" :current="1" :total="listParams.count" @on-change="onPageChange" ></Page>
			</div>
     	<Modal
        v-model="modal1"
        width="728"
        :title="dialogTitle"
        @on-ok= "signPass(dialogTitle)"
        @on-cancel="">
        <div style="
        line-height:87px;
        font-size: 18px;
        font-weight: 600;
        text-align: center;" class="pass" v-if="dialogTitle == '通过'">
            确定通过审核 ？
        </div>
        <div id="reject" v-else>
            <span style="position:relative;top:20px;left:25px;color:#b8b8b8">驳回原因</span>
			<div style="margin-left:100px;">
				<Input v-model="rejectContent" type="textarea" :rows="4" placeholder="请填写驳回内容"></Input>	
			</div>
        </div>
    	</Modal>
   		<Modal v-model="modal2" width="798">
			<p slot="header">
				<span>审查记录</span>
			</p>
			<Table :columns="columns1" :data="data1"></Table>
			<div slot="footer">
			</div>
    	</Modal>
    </div>
</template>
<script>
import moduleApproval from "./moduleApproval.vue";
import approvalBar from "./approvalBar.vue";
import vSelect from "../../modules/vSelect";
import valid, { errors, SIGNAPPROVAL } from "../../libs/request";
export default {
 	data() {
		return {
			roderBy: '',
			compact: '',
			allPrice: '',
			amount: '',
			signAmount: '',
			protocolCustom: '',
			beforTime: '',
			afterTime:'',
			signId: '',
			rejectContent: '',
			dialogTitle: '',
			activeIndex: 0,
			num1: 0,
			num: 0,
			auditStatus: 'upgrade,waiting',
			tabValue: 0,
			isShow: true,
			modal1: false,
			modal2: false,
			data2: [],
			data1: [],
			stateList: ['待签约', '审核通过', '已驳回'],
			orderList: ["默认", "紧急程度", "重要程度"],
			listParams: {
				count: '',
				pageNo: 1,
				pageSize: 10,
			},
			columns1: [
				{
					title: "序号",
					type: "index",
					align: "center"
				},
				{
					title: "审核内容",
					key: 'content',
                },
				{
					title: "审核结果",
					key: "typeLabel",
					align: "center",
					render: (h, params) => {
                        return h('span', params.row.typeLabel == '审核' ? '通过' : params.row.typeLabel)
					} 
				},
				{
                    title: '不通过原因',
                    key: 'reason',
                    align: 'center'
                },
                {
                    title: '审核人',
                    key: 'optUserName',
                    align: 'center'
                },
                {
                    title: '审核时间',
                    key: 'optTime',
                    align: 'center'
                },
			],
			
		};
	},

	components: {
		moduleApproval,
		approvalBar,
		vSelect
	},

	mounted() {
		this.getSignApprovalList('first')
	},

	methods: {
		getSignApprovalList(type = {}) {
			let obj = {}
			if(type == 'first') {
				obj = {
					auditStatus: 'upgrade,waiting'
				}
			}else if((!this.afterTime || !this.beforTime) && !(!this.afterTime && !this.beforTime)) {
				this.$Message.info("请输入开始时间 或 结束时间")
				return
			}else {
				obj = {
					name: this.compact,
					auditStatus: this.auditStatus,
					startTime: this.beforTime,
					endTime: this.afterTime,
					orderBy:this.roderBy,
				}
			}
			obj = Object.assign(obj, {
				pageNo: this.listParams.pageNo,
				pageSize: this.listParams.pageSize,
			})
			SIGNAPPROVAL.signApprovalList(obj)
			.then(valid.call(this))
			.then(res => {
				if(res.ok) {
					let data = res.data.data
					this.data2 = data.list
					this.allPrice = data.attach.sumPrice
					this.protocolCustom = data.protocolCustom
					this.signAmount = data.attach.total
					this.listParams.count = data.attach.total
					if(type == 'first') {
						if(data.attach.total) {
							this.$Message.info({
								content: `您有${data.attach.total}份附加合同等待审核`,
								duration: 4
							});
						}
					}
				}
				
			})
			.catch(errors.call(this))
			.finally(() => {});
		},

		signPass(dialogTitle) {
			let obj = {}
			if(dialogTitle === "通过") {
				obj = {
					ctId:this.signId,
					status:"agree",
					}
			}else {
				this.signReject()
				return
			}

			SIGNAPPROVAL.signApprovalIsPass(obj)
			.then(valid.call(this))
			.then(res => {
				if(res.ok) {
					this.getSignApprovalList('first')
				}
			})
			.catch(errors.call(this))
			.finally(() => {});
		},

		signReject() {
			if(!this.rejectContent) {
				this.$Message.info('请填写驳回原因')
				return
			}

			let obj = {
				ctId: this.signId,
				status: "reject",
				reason: this.rejectContent
			}
			SIGNAPPROVAL.signApprovalIsPass(obj)
			.then(valid.call(this))
			.then(res => {
				if(res.ok) {
					this.rejectContent = ''
					this.getSignApprovalList('first')
				}
			})
			.catch(errors.call(this))
			.finally(() => {});
		},

		addActive(val) {
			this.tabValue = this.activeIndex = val;
			if(this.activeIndex > 0) {
				this.isShow = false
			}else {
				this.isShow = true
			}
			this.auditStatus = (val == 1) ? 'agree' : (val > 1 ? 'reject' : 'upgrade,waiting')
			this.roderBy =  (val != 0) ? 'ha.audit_time desc' : '',
			this.getSignApprovalList()
		},

		order(index) {
			this.num1 = index;
			this.roderBy = (index == 1 ) ? 'updateDate asc' : (index > 1 ?  'hs.sign_price desc' : '')
			this.getSignApprovalList()
		},

		formDialog(id) {
			this.getSignApprovalRecordsList(id)
			this.modal2 = true
		},

		getSignApprovalRecordsList(id) {
			SIGNAPPROVAL.signApprovalRecordsList({
				ctId: id,
				inCludeTypes: 'reject,check,agree'
			})
			.then(valid.call(this))
			.then(res => {
				this.data1 = res.data.data
			})
			.catch(errors.call(this))
			.finally(() => {});
		},

		dialogFalse(signId) {		
			this.signId = signId
			this.dialogTitle = '驳回'
			this.modal1 = true
		},

		dialogTrue(signId) {
			this.signId = signId
			this.dialogTitle = '通过'
			this.modal1 = true
		},

		ok() {
			this.rejectContent = ''
		},

		cancel() {
			this.rejectContent = ''      
		},

		dataChangeBefore(val) {
			this.beforTime = val
			this.datachange()
		},

		dataChangeAfter(val) {
			this.afterTime = val
			this.datachange()
		},

		datachange() {
			let re = /-/g
			let afterTime = this.afterTime.replace(re,'')
			let beforTime = this.beforTime.replace(re,'')
			if((afterTime == beforTime)&(this.afterTime=='')) {
				this.getSignApprovalList()
				return
			}
			if(afterTime - beforTime <= 0) {
				this.$Message.info("开始时间必须小于结束时间")
				return
			}
			this.getSignApprovalList()
		},

		textChange() {
			this.getSignApprovalList()
		},

		// 分页
		onPageSizeChange(pageSize) {
			this.listParams.pageSize = pageSize
			this.getSignApprovalList()
		},

		onPageChange(val) {
			this.listParams.pageNo = val;
			this.getSignApprovalList();
		},

		aa(val) {
			return new Promise((resole, reject) => {

			})
		}
	},

	filters: {	
		list: function (value) {
			if(!value.length) return ''
			let str = ''
			value.forEach(item => {
				str += item.name +  "," 
			})
			str = str.substr(0,str.length-1)
				return str
		},
		
		filterMoney: function(value) {
			if(!value) return '0'
			let val = value.toFixed(0)/10000
			return val
		},

		filterName: function(value) {
			if(!value.length) return
			let nameStr = ''
			value.forEach((item, key) => {
				nameStr += item.name + ' '
			})
			return nameStr
		},

		filterTime: (val) => {
			if(val) {
				return val.substr(0, 16)
			}
		},

		filterName2: (val) => {
			if(!val) return
			return val.name
		}
	}
};
</script>
