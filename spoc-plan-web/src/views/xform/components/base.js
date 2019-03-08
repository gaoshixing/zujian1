import { TYPES, VTYPE, DISTYPE } from './config';
import { isObject, isFunction, isArray, isEmpty, isRegex , isEmail, isPhone } from '../libs/util';

const ValidateMap = {
	[VTYPE.EMAIL]:isEmail,
	[VTYPE.PHONE]:isPhone,
	[VTYPE.ARRAY]:isArray,
	[VTYPE.OBJECT]:isObject,

};

const t = {
	change:'change',
	blur:'blur',
};


export default {
	props:{
		id:{
			type:[Number,String],
			required:true,
		},
		pid:{
			type:String,
			default:'',
		},
		groupId:{
			type:[Number,String],
			default:'',
		},
		title:{
			type:String,
		},
		description:{
			type:String,
		},
		cls:{
			type:[Object,Array,String],
		},
		name:{
			type:String,
			required:true,
		},
		value:{
			required:true,
		},
		type:{
			type:String  // 候选项展示方式
		},
		display:{
			type:Number  // 排版方式
		},
		paddingx:{ // padding-left , 左右排版下有效
			type:Number,
			default:0,
		},
		readonly:{
			type:Boolean,
			default:false,
		},
		placeholder:{
			type:String,
		},
		validate:{
			type:Array,
		},
		settings:{
			type:Object,
			default:()=>{
				return {
					scrollx:0,
					values:{}
				};
			}
		}
	},
	data(){
		return {
			currentValue:this.value,
			error:false,
		};
	},
	computed:{
		errorMsg(){
			if(this.error){
				return this.error.toString().replace('Error:','');
			}
		},
		displayCls(){
			
			const ret = {
				disblock:this.display==DISTYPE.BLOCK,
				disinline:this.display==DISTYPE.INLINE,
				required: Array.isArray(this.validate) && this.validate.find(item=>item.required)
			};
			if([1,2,3,4,5,6,7,8,9].includes((this.paddingx-100)/10)){
				ret[`p${this.paddingx}`]=true;
			}
			return ret;
		},
	},
	created () {
	},
	methods: {
		onBlur(){
			if(this.readonly){
				return;
			}
			if(this.valid(t.blur)){
				this.valid(t.change);
			}
		},
		typeValidate(value,item){
			if(item.required){
				if(isEmpty(value)){
					throw new Error(item.message);
				}
				return true;
			} else if (item.regex){
				const reg = new RegExp(item.regex);
				if(!reg.test(value)){
					throw new Error(item.message);
				}
				return true;
			} else {
				if(!item.type){ // 没有规则类型，不验证他了 （可能是脏数据）
					return true;
				}
				const validator = ValidateMap[item.type];
				if(validator){
					if(!validator(value)){
						throw new Error(item.message);
					}
					return true;
				} else {
					throw new Error('error validate type');
				}
			}
		},
		valid(t=''){
			const value = this.currentValue;
			if(Array.isArray(this.validate) && this.validate.length){
				try{
					this.validate.filter(item=>{
						if(t){
							const str = item.trigger?item.trigger.split(','):[];
							return str.indexOf(t)>-1;
						}
						return true;
					}).forEach(item=>{
						if(isFunction(item)){
							item.call(this,this.currentValue,this.validate);
						} else if(isObject(item)){
							this.typeValidate(value,item);
						} else {
							throw new Error('error validate rule');
						}
					});
					this.error=false;
					return true;
				}catch(e){
					this.error=e;
					return false;
				}
			}
			return true;   
		}
	},
	watch:{
		value:{
			deep:true,
			handler(v){
				this.currentValue=v;
			}
		},
		currentValue:{
			deep:true,
			handler(v){
				this.$emit('input',v);
				this.valid(t.change);
			}
		}
	}

};
