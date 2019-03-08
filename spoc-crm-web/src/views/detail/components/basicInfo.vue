<style lang="less">
@greeny-blue: #44bcb7;
.crm-user-basic-info {
    margin: 20px 30px 20px 0;
	.h3title{
		position: relative;
	}
	.basic-form{
		margin: 20px 0;
		font-size: 14px;
		.ivu-form-item-label,.ivu-form-item-content{
			font-size: 14px;
		}
		.doview{
			cursor: pointer;
			color: @greeny-blue;
			font-size: 12px;
		}
		.tel-phone-r{
			margin: 0;
			height: 20px;
		}
		.ivu-form{
			flex-wrap: wrap;display:flex;
		}
		.ivu-form-item {
			&:not(.full){
				// float: left;
				width: 50%;
			}
			&.full{
				clear: both;
				width: 100%;
			}
		}
	}
	.phone-lists{
        margin-top: 8px;position: relative;
        &:first-child{
            margin-top: 0;
        }
        .select-country{
            position: absolute;left: 0;top: -1px;
            width: 100px;
            .ivu-select-dropdown{ 
                width: 220px !important;left: 0 !important; 
            } 
        }
        .inputBox{
            padding-left: 106px;padding-right: 30px;
        }
        .btn{
            @h: 20px;
            position: absolute;right: 0;top: 5px;
            width: @h;height: @h;line-height: @h;
            text-align: center;border-width: 1px;border-style: solid;
            color: #d8dde5;cursor: pointer;border-radius: 3px;
            &:hover{
                color: #333;
            }
        }
        .show-num{
            position: absolute;right: 31px;bottom: 1px;top: 1px;padding-right: 6px;padding-left: 6px;
            border-radius: 3px;cursor: pointer;
            color: #f00;background: #fff;
            &:hover{
                color: #de0202;
            }
		}
		.ivu-input.error{
			border-color: #f00;
		}
	}
	.img-item{
		width: 80px;
		height: 80px;
		background-color: #ddd;border: 1px solid #ddd;
		float: left;
		margin: 10px 10px 10px 0;
		img {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
<template>
	<div class="crm-user-basic-info">
		<h3 class="h3title" @click="tog">
			<span>基本信息</span>
			<Icon :type="show?'ios-arrow-up':'ios-arrow-down'"></Icon>
		</h3>
		<div class="basic-form" v-show="show">
			<template v-if="!edit">
				<i-form :label-width="100" class="clearfix">
					<FormItem label="编号:">
						<span>{{info.cusCode}}</span>
					</FormItem>
					<FormItem label="关键词:">
						<span>{{info.keyword}}</span>
					</FormItem>
					<FormItem label="客户姓名:">
						<span>{{info.name}}</span>
					</FormItem>
					<FormItem label="申请国家:">
						<span>{{info.applyCountry}}</span>
					</FormItem>
					<FormItem label="电话号码:" v-show="!(mapGetters||isWorker||$route.query.isCheck=='isCheck')">
						<div class="tel-phone-r" v-for="(item,index) in info.crmSafeBoxList" :key="'show-phone-' + item.id">
							<span>{{item.phone}}</span>
							<span v-if="phoneHasDot(item.phone)" class="doview" @click="dolook(item,index)">查看</span>
						</div>
					</FormItem>
					<FormItem label="微信:">
						<span>{{info.wechat}}</span>
					</FormItem>
					<FormItem label="地区:">
						<span>{{info.countryName}} {{info.provinceName}} {{info.cityName}}</span>
					</FormItem>
					<FormItem label="QQ:">
						<span>{{info.qq}}</span>
					</FormItem>
					<FormItem label="邮箱:">
						<span>{{info.email}}</span>
					</FormItem>
					<FormItem label="申请阶段:">
						<span>{{info.applyLabel}}</span>
					</FormItem>
					<FormItem label="是否加急:">
						<span>{{info.isHot=='1'?'是':'否'}}</span>
					</FormItem>
					<FormItem label="就读学校:">
						<span>{{info.school}}</span>
					</FormItem>
					<FormItem label="地址:" class="full">
						<span>{{info.address}}</span>
					</FormItem>
					<FormItem label="备注:" class="full">
						<span style="word-wrap:break-word;">{{info.remarks}}</span>
						<div class="clearfix">
							<div class="img-item" v-for="item in setimg" :key="item.id">
								<img :src="item.filePath" alt="" @click="open(item.filePath)">
							</div>
						</div>
					</FormItem>
				</i-form>
			</template>
			<template v-else>
				<i-form ref="uform" :label-width="100" class="clearfix">
					<FormItem label="编号:">
						<span>{{info.cusCode}}</span>
					</FormItem>
					<FormItem label="关键词:">
						<span>{{info.keyword}}</span>
					</FormItem>
					<FormItem label="客户姓名:">
						<Input v-model="info.name"/>
					</FormItem>
					<FormItem label="申请国家:">
						<Input v-model="info.applyCountry"/>
					</FormItem>
					<FormItem label="电话号码:" v-show="!(mapGetters||isWorker)">
						<span v-for="item in info.crmSafeBoxList" :key="'edit-phone-' + item.id" style="display:block;">{{item.phone}}</span>
						<div v-for="(item, index) in phoneLists" :key="'phone' + item" class="phone-lists" v-if="edit">
							<div class="select-country">
								<Select v-model="form.crmSafeBoxList[index].locId" filterable> 
									<Option v-for="(city, index) in cityList" :value="city.id ? city.id : 0"  
										:key="index + 'city' + city.id">{{ city.areaCodeShow + '&nbsp;&nbsp;&nbsp;' + city.name }}</Option> 
								</Select> 
							</div>
							<div class="inputBox">
								<input v-model="form.crmSafeBoxList[index].phone" type="text"
								@blur="checkPhoneFormat(form.crmSafeBoxList[index], index)" 
								@keydown="enterPhone(form.crmSafeBoxList[index], index)"
								class="ivu-input"
								:class="[form.crmSafeBoxList[index].error ? 'error' : 'success']">
							</div>
							<span @click="addOrDelPhone(item, index)" class="btn">
								<Icon type="plus" v-if="index == 0"/>
								<Icon type="minus" v-else/>
							</span>
						</div>
					</FormItem>
					<FormItem label="微信:">
						<Input v-model="info.wechat"/>
					</FormItem>
					<FormItem label="地区:">
						<cityarea :cou.sync="info.country" :pro.sync="info.province" :ci.sync="info.city"/>
					</FormItem>
					<FormItem label="QQ:">
						<Input v-model="info.qq"/>
					</FormItem>
					<FormItem label="邮箱:" prop="email">
						<Input v-model="info.email"/>
					</FormItem>
					<FormItem label="申请阶段:">
						<Select v-model="info.apply">
							<Option v-for="item in applyLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					<FormItem label="是否加急:">
						<span>{{info.isHot=='1'?'是':'否'}}</span>
					</FormItem>
					<FormItem label="地址:" class="full">
						<Input v-model="info.address"/>
					</FormItem>
					<FormItem label="备注:" class="full">
						<Input v-model="info.remarks" type="textarea" :autosize="{minRows: 3,maxRows: 4}"/>
						<div class="clearfix">
							<div class="img-item" v-for="item in setimg" :key="item.id">
								<img :src="item.filePath" alt="" @click="open(item.filePath)">
							</div>
						</div>
					</FormItem>
				</i-form>
			</template>
		</div>
	</div>
</template>
<script>
import valid, { errors, crmCustomerSale, crmCustomer, sys } from "../../../libs/request.js";
import cityarea from '../../../modules/cityarea';
import { deleteMenu } from '../../../../../spoc-core-web/src/libs/request.js';
import {mapMutations, mapGetters, mapState } from 'vuex';
export default {
	props:{
		info:{
			type:Object,
			required:true,
		},
		applyLists:{
			type:Array,
			required:true
		},
		editable:{
			type:Boolean,
			required:true,
		},
		flag:{
			type:[String,Number],
			default:0,
		},
		uid: {
			type:String,
			required:true
		}
	},
	data() {
		return {
			show: true,
			edit:false,
			phoneLists: 1, //默认1个电话输入框
			cityList: [],
			checkFlag: false,
			saveFlag: true, //能保存
			clickSave: false,//是否点击保存
			length: this.info.crmSafeBoxList.length,
			form: {
                crmSafeBoxList: [ 
                    { 
                        id: '',
                        phone: '',
                        sort: this.info.crmSafeBoxList.length + 1,
                        error: false,
						district: '',
						cusId: this.uid,
						locId: ''
                    } 
                ], 
			},
			setimg: [],
		};
	},
	computed:{
			...mapGetters('crm', ['roleId','mapGetters', 'isWorker']),
	},
	components:{
		cityarea
	},
	created() {
        this.getCountryCode();
        this.getPictureList();
    },
	methods: {
		...mapMutations(['updateLoadingStatus']),
		getPictureList() {
			sys.list({objectId: this.uid}).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.setimg = res.data.data.list;
                }
            }).catch(errors.call(this));
		},
		open(href) {
			window.open(href);
		},
		phoneHasDot(phone){
			return phone.indexOf('**')>-1;
		},
		tog() {
			this.show = !this.show;
		},
		goEdit(){
			// console.log(this.length)
			this.edit = true;
			this.phoneLists = 1;
		},
		goSave(){
			this.clickSave = true;
			if(this.checkFlag) {
				// 输入电话
				this.saveFlag = false;
			}
			if(this.saveFlag) {
				this.submit();
			}
		},
		submit() {
			this.updateLoadingStatus({isLoading: true});
			const data = this.info;
			data.flag = this.flag;
			let phoneSuccess = true; 
			let lists = [];
			this.form.crmSafeBoxList.forEach(e => {
				if(e.phone && e.district && !e.error) {
					// 正确输入的电话暂存
					lists.push(e);
				}
				if(e.error) {
					phoneSuccess = false;
				}
			});
			if(phoneSuccess) {
				if(lists.length > 0) {
					lists.forEach(e => {
						delete e.error;
					});
					data.crmSafeBoxList = lists;
				}
				
				crmCustomer.saveCustomer(data).then(valid.call(this)).then(res=>{
					if(res.ok){
						this.length = this.length + this.info.crmSafeBoxList.length;
						this.clickSave = false;
						this.edit = false;
						this.form.crmSafeBoxList = [
							{ 
								id: '',
								phone: '',
								sort: this.length + 1,
								error: false,
								district: '',
								cusId: this.uid,
								locId: ''
							} 
						]
						this.$emit('update-info',res.data);
					}
				}).catch(errors.call(this)).finally(()=>{
					this.updateLoadingStatus({isLoading:false});
				});
			}
		},
		dolook(item,index){
			const old = item.phone;
			crmCustomer.listPhoneData({cusId:this.info.id}).then(valid.call(this)).then(res=>{
				if(res.ok){
					item.phone = res.data.data[index].phone;
					setTimeout(()=>{
						item.phone = old;
					},10e3);
				}
			}).catch(errors.call(this));
		},
		// 电话新增函数 2018-7-17 曹见芳 start
		getCountryCode() {
            // 查询电话的国家区号
            crmCustomer.getCountryCode().then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.cityList = res.data.data;
                }
            }).catch(errors.call(this));
        },
        enterPhone(str, obj, index) {
            let x;
            if(window.event) {// IE8 以及更早版本
                x=event.keyCode;
            }
            else if(event.which) {// IE9/Firefox/Chrome/Opera/Safari
                x=event.which;
            }
            if(x == 13) {
                this.checkPhoneFormat(obj, index);
            }
		},
        checkPhoneFormat(obj, index) {
			this.checkFlag = true;
            // 检查电话号码输入合法性
            if(obj.phone != '') {
                // 不为空
                if(!(/^\d{1,}-?\d{1,}-?\d{1,}$/.test(obj.phone))){ //电话格式不对
                    obj.error = true;
                } else {
                    this.findPhonePlace(obj, index);
                }
            }else{
				this.checkFlag = false;
				obj.error = false;
				obj.district = '';
            }
        },
        getPhone(obj, index) {
            // 查询电话号码是否已经存在数据库
            let params = {
                phone: obj.phone
            }
            crmCustomer.isPhoneExits(params).then(valid.call(this)).then(res => {
				this.checkFlag = false;
				this.saveFlag = true;
                if(res.ok) {
                    obj.error = false;
                }else{
                    obj.error = true;
                }
            }).catch(errors.call(this));
        },
        checkPhoneRepeat() {
			// 检查页面电话重复
			let list = this.form.crmSafeBoxList;
            if(list.length > 1) {
                for(let i = 1; i < list.length;i++) {
					let obj = list[i - 1];
                    for(let j = i; j < list.length;j++) {
                        if(list[j].phone == obj.phone && list[j].phone) {
                            list[j].error = true;
                            this.$Message.error('电话号码重复录入');
                            break;
                        }
                    }
                }
            }else{
                list[0].error = false;
            }
        },
        findPhonePlace(obj, index, str) {
            // 查询电话归属地
            let params = {
                phone: obj.phone
            }
            crmCustomer.findPhonePlace(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let phoneTemp = res.data.data;
                    let list = this.form.crmSafeBoxList;
					list[index].district = phoneTemp.areaCode;
					list[index].locId = phoneTemp.country;
					// console.log(list[index])
                    // 判断页面电话重复
                    let errorFlag = false; //是否重复录入flag，默认false没有重复录入
                    if(list.length > 1) {
                        for(let i = 0; i < list.length;i++) {
                            if(index != i && list[i].phone == obj.phone){
                                // 不是当前项且电话重复
                                obj.error = true;
                                errorFlag = true;
                                this.$Message.error('电话号码重复录入');
                                break;
                            }else{
                                obj.error = false;
                            }
                        }
                        if(!errorFlag) {
                            this.getPhone(obj, index);
                        }
                    }else{
                        this.getPhone(obj, index);
                    }
                }else{
                    obj.error = true;
                }
            }).catch(errors.call(this));
		},
		addOrDelPhone(item, index) {
            if(!this.fromPond) {
                if(index == 0) {
					// 添加
					// console.log(this.length)
                    this.phoneLists = this.phoneLists + 1;
                    this.form.crmSafeBoxList.push({
                        id: '',
                        phone: '',
                        sort: this.length + this.phoneLists,
                        error: false,
                        district: '',
						cusId: this.uid,
						locId: ''
                    });
                }else{
					// 删除
                    this.phoneLists = this.phoneLists - 1;
					this.form.crmSafeBoxList.splice(index, 1);
					this.checkPhoneRepeat();
                }
            }
		},
		// end
	},
	watch: {
		saveFlag: function(val) {
			if(this.clickSave && val) {
				this.goSave();
			}
		}
	}
};
</script>


