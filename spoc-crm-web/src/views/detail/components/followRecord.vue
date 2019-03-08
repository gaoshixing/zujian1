<style lang="less">
@light-moss-green: #a4cb6d;
@greeny-blue: #44bcb7;
@white: #fff;
@pale-grey: #e7ebf1;
.crm-follow {
	margin: 20px 0;
	.months {
		margin: 20px 0;
		position: relative;
		&:after {
			content: " ";
			display: block;
			width: 9px;
			height: 9px;
			background-color: @light-moss-green;
			border-radius: 50%;
			position: absolute;
			left: 16px;
			bottom: 0;
		}
	}
	.c-month {
		margin-left: 20px;
		padding: 20px;
		border-left: 1px solid @light-moss-green;
		position: relative;
		.month-name {
			position: absolute;
			left: 15px;
			top: -8px;
			cursor: pointer;
			&:before {
				content: " ";
				display: block;
				width: 9px;
				height: 9px;
				background-color: @light-moss-green;
				border-radius: 50%;
				position: absolute;
				left: -20px;
				top: 3px;
			}
		}
		.st-count{
			position: absolute;
			left: 100px;
			top: -8px;
			cursor: pointer;
			color: @greeny-blue;
		}
	}
	.filter-div {
		.items-tips {
			float: left;
			margin-left: 140px;
			width: 200px;
			line-height: 30px;
			font-size: 14px;
			color: #666;
			margin-bottom: 30px;

		}
		.filter-select {
			float: right;
			padding-right: 20px;
			width: 240px;
		}
	}
	.gr {
		color: @greeny-blue;
		font-size: 18px;
	}
}
.crm-addrecord {
	&.inpage {
		margin: 20px;
		box-shadow: 0 0 9.8px 0.2px rgba(68, 188, 183, 0.2);
		background-color: @white;
		border: solid 1px @pale-grey;
		padding: 10px;
		.toright {
			text-align: right;
			padding-right: 10px;
			line-height: 30px;
		}
		.red {
			color: #f00;
			font-size: 16px;
		}
		.rightbtn {
			float: right;
		}
	}
	.formrow {
		margin: 10px 0;
	}
	textarea {
		resize: none;
	}
	.f-types {
		margin: 5px 0 0 0;
		.type-img,
		.type-file {
			float: left;
			color: @greeny-blue;
			width: 90px;
			height: 30px;
			line-height: 30px;
			& > .ivu-icon {
				font-size: 20px;
				position: relative;
				top: 2px;
				cursor: pointer;
			}
		}
		.abs-img {
		}
		.abs-file {
		}
	}
}
</style>
<template>
	<div class="crm-follow clearfix">
		<h3 class="h3title" @click="tog">
			<span>跟进记录</span>
			<Icon :type="show?'ios-arrow-up':'ios-arrow-down'"></Icon>
		</h3>
		<div class="months" v-show="show">
			<div class="crm-addrecord inpage">
				<Row class="formrow">
					<Col span="3" class="toright">
						<span class="red">*</span>
						<span>跟进类型：</span>
					</Col>
					<Col span="4">
						<Select v-model="addItem.type1">
							<Option :value="item.value" v-for="(item,index) in itemtypes" :key="'t'+index">{{item.label}}</Option>
						</Select>
					</Col>
					<Col v-if="!isday" span="3" class="toright">计划类型：</Col>
					<Col v-if="!isday" span="5">
						<Select v-model="addItem.type2" @on-change="onPlanTypeChange">
							<Option :value="item.title" v-for="(item,index) in plantypes" :key="'tra'+index">{{item.title}}</Option>
						</Select>
					</Col>
					<Col v-if="!isday" span="4" class="toright">下次回访时间：</Col>
					<Col v-if="!isday" span="5">
						<DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="addItem.date" ></DatePicker>
					</Col>
				</Row>
				<Row class="formrow">
					<Col span="3" class="toright">
						<span class="red">*</span>
						<span>内容：</span>
					</Col>
					<Col span="21">
						<Input v-model="addItem.data.text" type="textarea" :rows="4" placeholder="跟进记录详情"></Input>
						<div class="f-types clearfix">
							<div class="type-img">
								<Icon type="image" @click.native="showImgBox"></Icon>
								<span>图片 {{imgnum}}</span>
								<up-img ref="img1" v-show="!addItem.show && addItem.img.visible" @close="close" @on-change="onImgChange" class="abs-img"/>
								
							</div>
							<div class="type-file">
								<Icon type="ios-folder" @click.native="showFileBox"></Icon>
								<span>文件 {{filenum}}</span>
								<up-file ref="file1" :cus-id="uid" v-show="!addItem.show && addItem.file.visible" @close="close" @on-change="onFileChange" class="abs-file"/>
							</div>
							<Button class="rightbtn" type="success" @click="doSubmit">确定提交</Button>
						</div>
					</Col>
				</Row>
				
			</div>
			<div class="filter-div">
				<div class="clearfix">
					<div class="items-tips">
						为您找到 <span class="gr">{{monthData.count}}</span> 条动态
					</div>
					<div class="filter-select">
						<Select v-model="myfilter" @on-change="onFilterChange">
							<Option value="">全部动态</Option>
							<Option :value="item.value" v-for="(item,index) in traceTypes" :key="'fi'+index">{{item.label}}</Option>
						</Select>
					</div>
				</div>
			</div>
			<div class="c-month" v-for="mon in monthData.crmTraceTrees" :key="'m'+mon.timeStamp">
				<p class="month-name" @click="toggle(mon)">
					<span v-text="mon.time"></span>
                    <Icon :type="mon.hide!==true?'ios-arrow-up':'ios-arrow-down'"></Icon>
				</p>
				<div v-if="mon.hide!==true">
					<record-card v-for="item in mon.crmTraces" :data="item" :key="item.id" :editable="editable" @edit="onEdit" @play="onPlay"/>
				</div>
				<div v-else>
					<div class="st-count" @click="toggle(mon)">隐藏{{mon.count}}条动态</div>
				</div>
			</div>
		</div>
		<Modal class-name="vertical-center-modal crm-addrecord" v-model="editItem.show" :title="'修改'+editItem.typeLabel" width="728">
            <div>
            	<div v-if="editItem.type1=='callplan'" style="margin-bottom: 14px;">
            		下次回访时间：<DatePicker type="date" style="width: 200px" v-model="editItem.nextTime"></DatePicker>
            	</div>
				<Input v-model="editItem.content.content" type="textarea" :rows="4" placeholder="跟进记录详情"></Input>
				<div class="f-types clearfix">
					<div class="type-img">
						<Icon type="image" @click.native="showImgBox2"></Icon>
						<span>图片 {{imgnum2}}</span>
						<up-img ref="img2" :maxNum="9" :setimg="editItem.content.imgList" v-show="editItem.img.visible" @close="close" @on-change="onEditImgChange" class="abs-img"/>
					</div>
					<div class="type-file">
						<Icon type="ios-folder" @click.native="showFileBox2"></Icon>
						<span>文件 {{filenum2}}</span>
						<up-file ref="file2" :cus-id="uid" :setfile="editItem.content.fileList" v-show="editItem.file.visible" @close="close" @on-change="onEditFileChange" class="abs-file"/>
					</div>
				</div>
            </div>
            <div slot="footer">
                <Button @click="updateItemCancel">取消</Button>
                <Button type="primary" @click="updateItemOk">确定</Button>
            </div>
        </Modal>


	</div>
</template>
<script>
import recordCard from "./recordCard";
import upImg from "./upImg";
import upFile from "./upFile";
import { clone } from '@public/libs/util.js'
import { mapMutations, mapState, mapGetters, } from "vuex";
import valid, { errors, crmTrace } from "../../../libs/request.js";

export default {
	props:{
		uid:{
			type:String,
			required:true
		},
		traceTypes:{
			type:Array,
			required:true
		},
		info:{
			type:Object,
			required:true,
		},
		fixIndex:{
			type:Number,
			required:true,
		},
		typefilter:{
			required:true,
		},
		editable:{
			type:Boolean,
			default:true,
		},
		flag:{
			type:Number,
			default:0,
		}
	},
	data() {
		return {
			show: true,
			monthData:[],
			plantypes:[],
			itemtypes:[],
			imgList:[],
			fileList:[],
			addItem: {
				show: false,
				type1: "trace",
				type2: "",
				date: "",
				img: {
					visible: false
				},
				file: {
					visible: false
				},
				data: {
					text: ""
				}
			},
			editItem:{
				show:false,
				typeLabel:'',
				nextTime:'',
				img: {
					visible: false
				},
				file: {
					visible: false
				},
				content: {
					imgList:[],
					fileList:[],
					content: ''
				}
			},
			myfilter:this.typefilter
		};
	},
	computed:{
			...mapGetters('crm', ['isCeo', 'isWorker', 'isTMK', 'isTMKLeader', 'isMarket', 'isMarketLeader', 'isSaler', 'isSalerLeader', 'isBranchOfficeLeader', 'isHeaderOfficeLeader']),
			...mapState(['userInfo']),
		imgnum(){
			return `${this.imgList.length}/9`;
		},
		filenum(){
			return `${this.fileList.length}/3`;
		},
		imgnum2(){
			return `${this.editItem.content.imgList.length}/9`;
		},
		filenum2(){
			return `${this.editItem.content.fileList.length}/3`;
		},
		isday(){
			return ['review','trace'].includes(this.addItem.type1); // 日常跟进,领导点评
		},
		curMonth(){
			if(this.fixIndex>=0){
				return this.monthData.crmTraceTrees[this.fixIndex];
			}
		},
//		isAddRecord(){
//			if(this.userInfo.name==this.info.ownerName||this.userInfo.name==this.info.createName){
//				return true;
//			}
//			return false;
//		}
	},
	components: {
		recordCard,
		upFile,
		upImg
	},
	created(){
		this.loadData();
		this.getPlanType();
		this.getItemType();
		if(this.isSalerLeader||this.isBranchOfficeLeader||this.isHeaderOfficeLeader||this.isCeo){
			this.addItem.type1="review";
		}else{
			this.addItem.type1="trace";
		}
	},
	methods: {
		toggle(item) {
			item.hide = !item.hide;
			if(!item.crmTraces.length){
				this.getMonthData(item.timeStamp);
			}
		},
		tog() {
			this.show = !this.show;
		},
		updateItemCancel() {
			this.editItem.show = false;
		},
		updateItemOk() {
			this.editItem.show = false;
			const data = {
				id:this.editItem.id,
				cusId:this.uid,
				type:this.editItem.type1,
				phase:this.info.phase,
				content:this.editItem.content
			};
			if(this.editItem.type1=="callplan"){
				data.nextTime=new Date(this.editItem.nextTime).format('yyyy-MM-dd hh:mm:ss');
			}
			if(!data.content){
				return this.$Message.error("请填写内容");
			}
			crmTrace.save(data).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.loadData();
					this.editItem.content.imgList=[];
					this.editItem.content.fileList=[];
					this.$refs.img2.init();
					this.$refs.file2.init();
				}
			}).catch(errors.call(this));
		},
		showImgBox() {
			this.addItem.img.visible = true;
			this.addItem.file.visible = false;
		},
		showFileBox() {
			this.addItem.img.visible = false;
			this.addItem.file.visible = true;
		},
		showImgBox2() {
			this.editItem.img.visible = true;
			this.editItem.file.visible = false;
		},
		showFileBox2() {
			this.editItem.img.visible = false;
			this.editItem.file.visible = true;
		},
		close(){
			this.addItem.img.visible = false;
			this.addItem.file.visible = false;

			this.editItem.img.visible = false;
			this.editItem.file.visible = false;
		},
		loadData() {
			const data = {cusId:this.uid};
			if(this.typefilter){
				data.types=this.typefilter;
			}
			if(this.flag){
				data.flag = this.flag;
			}
			crmTrace
				.listMonthData(data)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						const r = res.data.data;
						let i = 0;
						const list = r.crmTraceTrees.map(item=>{
							item.hide = ++i>3 ;
							return item;
						});
						r.crmTraceTrees=list;
						this.monthData = r;
					}
				})
				.catch(errors.call(this));

		},
		getPlanType(){
			crmTrace.getCallPlanConfig().then(valid.call(this)).then(res=>{
				if(res.ok){
					this.plantypes = res.data.data;
				}
			}).catch(errors.call(this));
		},
		getItemType(){
			crmTrace.showDictType().then(valid.call(this)).then(res=>{
				if(res.ok){
					this.itemtypes = res.data.data;
				}
			}).catch(errors.call(this));
		},
		onPlanTypeChange(s){
			const item = this.plantypes.find(i=>i.title==s);
			if(item){
				this.addItem.data.text = item.content;
			}
		},
		onEdit(item){
			this.editItem.show = true;
			this.editItem.id=item.id;
			this.editItem.type1=item.type;
			this.editItem.typeLabel=item.typeLabel;
			this.editItem.nextTime=item.nextTime;
			console.log(item)
			this.editItem.content=clone(item.content);
			this.$nextTick(()=>{
				this.$refs.img2.init();
				this.$refs.file2.init();
			});
		},
		onPlay(url,t){
			this.$emit('play',url,t);
		},
		doSubmit(){
			const data = {
				cusId:this.uid,
				type:this.addItem.type1,
				phase:this.info.phase,
				content:{
					content:this.addItem.data.text,
					imgList:this.imgList,
					fileList:this.fileList,
				},
			};

			if(!this.isday){
				data.content.title = this.addItem.type2;
			}

			if(!data.content.content || !data.type){
				return this.$Message.error("请填写内容");
			}
			if(!this.isday && this.addItem.date){
				data.nextTime = (new Date(this.addItem.date)).format('yyyy-MM-dd hh:mm:ss')
			}
			crmTrace.save(data).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.resetForm();
					this.loadData();
					this.addItem.date='';
//					this.addItem.type1='';
					this.addItem.type2='';
				}
			}).catch(errors.call(this));
		},
		resetForm(){
			this.addItem.data.text='';
			this.$refs.img1.close();
			this.$refs.file1.close();
			this.fileList=[];
			this.imgList = [];
			this.$refs.img1.init();
			this.$refs.file1.init();
		},
		onImgChange(v){
			this.imgList = v;
		},
		onFileChange(v){
			this.fileList = v;
		},
		onEditImgChange(v){
			this.editItem.content.imgList = v;
		},
		onEditFileChange(v){
			this.editItem.content.fileList = v;
		},
		onFilterChange(v){
			this.myfilter = v;
			setTimeout(()=>{
				this.loadData();
			},0)
		},
		getMonthData(stamp){
			const types = this.typefilter;
			crmTrace.listData(stamp,this.uid,types).then(valid.call(this)).then(res=>{
				if(res.ok){
					const item = this.monthData.crmTraceTrees.find(it=>it.timeStamp==stamp);
					item.crmTraces = res.data.data;
				}
			}).catch(errors.call(this));
		},
		delImg(item) {
            // sys.list({id: item.id}).then(valid.call(this)).then(res => {
            //     if(res.ok) {
                    
            //     }
            // }).catch(errors.call(this));
        }
	},
	watch:{
		curMonth(v){
			this.$emit('scroll-month',v);
		},
		myfilter(v){
			this.$emit('update:typefilter',v);
		}
	}
};
</script>


