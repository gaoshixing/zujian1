
import { TYPES , SELECTYPE , SELECTOPTION , DISTYPE , HASOPS , URL , LAYTYPE  } from '../../components/config';

const t = {
	title:'标题',
	desc:'描述信息',
	ds:'数据源',
	hds:'候选项数据源',
	ser:'是否启用搜索',
	defv:'默认值',
	pv:'提示文本',
	api:'接口地址',
	name:'表单域',
	datas:'配置数据源',
	vali:'校验',
	wid:'宽度',
	dis:'候选项展示方式',
	disp:'排版方式',
	uds:'预定义数据',
	ro:'是否只读',
	mod:'模块',
	part:'字段',
	lay:'布局方式',
	formset:'子表单字段'
};

const v = {required:true,trigger:'blur',message:'此为必填项'};
const vars = {regex:/^[a-zA-Z]+\w{0,20}$/.source,trigger:'change',message:'需为字母开头,可包含数字、字母、下划线' };
const v_phone = {type:'phone',trigger:'blur',message:'请输入正确的手机号'};
const v_email = {type:'email',trigger:'blur',message:'请输入正确的邮箱'};
const v_max = {regex:/^.{1,8}$/.source,trigger:'blur',message:'请输入1-8位字符'};

const widoptions=[
	{
		label:'25%',
		value:'25%',
	},
	{
		label:'50%',
		value:'50%',
	},
	{
		label:'75%',
		value:'75%',
	},
	{
		label:'100%',
		value:'100%',
	},
];

const dispops = [
	{
		label:'左右排版',
		value:DISTYPE.INLINE
	},
	{
		label:'上下排版',
		value:DISTYPE.BLOCK
	},
];

const disoptions = [
	{
		label:'单独一行',
		value:'block'
	},
	{
		label:'行内展示',
		value:'inline'
	}
];

const laypops = [
	{
		label:'普通模式',
		value:LAYTYPE.COMM
	},
	{
		label:'1/2模式',
		value:LAYTYPE.HALF
	}
];

const lastv = (arr)=>{
	return arr.slice(0).pop().value;
};

export const defwidth = lastv(widoptions);
export const defdis = lastv(disoptions);

const valist=[
	{
		label:'必填',
		value:v
	},
	{
		label:'邮箱格式',
		value:v_email,
	},
	{
		label:'手机号格式',
		value:v_phone,
	},
	{
		label:'数字',
		value:{regex:/^\d+$/.source,trigger:'blur',message:'请输入数字'},
	}
];

const vaneed=[
	{
		label:'必填',
		value:v
	},
];

const ro = (item) => {
	return [
		{
			id:`${item.id}@readonly`,
			model:TYPES.RADIO,
			title:t.ro,
			name:'title',
			value:item.readonly,
			options:[
				{label:'是',value:true},
				{label:'否',value:false},
			],
			validate:[
				v
			]
		},
	];
};

const titles = (item) => {
	return [
		{
			id:`${item.id}@title`,
			model:TYPES.INPUT,
			title:t.title,
			name:'title',
			value:item.title,
			validate:[
				v
			]
		},
		{
			id:`${item.id}@description`,
			model:TYPES.TEXTAREA,
			title:t.desc,
			name:'description',
			value:item.description
		},
	]
}

const ntd = (item,find,settings)=>{
	return [
		...titles(item),
		...ds(item,find,settings),
		...dp(item),
        
	];
};

// 宽度选项
const w=(item)=>{
	return [
		{
			id:`${item.id}@width`,
			model:TYPES.RADIO,
			title:t.wid,
			name:'width',
			value:item.width,
			options:widoptions,
			validate:[
				v,
			]
		},
	];
};

// 排版方式
const dp = (item) =>{
	return [
		{
			id:`${item.id}@display`,
			model:TYPES.RADIO,
			title:t.disp,
			name:'display',
			value:item.display,
			options:dispops,
			validate:[
				v,
			]
		},
		...lay(item)
	];
};

// 布局方式
const lay = (item)=>{
	return [
		{
			id:`${item.id}@lay`,
			model:TYPES.RADIO,
			title:t.lay,
			name:'lay',
			value:item.lay,
			options:laypops,
			validate:[
				v,
			]
		}
	]
}

const dname = (item,find) => {
	if(!item.settings.category){
		return [];
	}
	return [
		{
			id:`${item.id}@name`,
			model:TYPES.SELECT,
			title:t.name,
			name:'name',
			icon:'android-arrow-dropdown',
			value:item.name,
			validate:[
				v,
				vars
			],
			options:[],
			settings:{
				datasource:SELECTYPE.DATASOURCE_REMOTE,
				api:`/${item.settings.module}/${item.settings.category}`,
				trigger:{
					$fallback:{
						api:''
					}
				}
			}
		},
		...(()=>{
			let dict = item.settings.dict;
			const nameInstance = find('name'); // ref to name above , 确定他上一步选择的是不是一个字典项
			if(nameInstance && nameInstance.ctx.item && Object.keys(nameInstance.ctx.item).length>0){
				dict = nameInstance.ctx.item.isDict;
			}
			if(dict){
				return [
					{
						id:`${item.id}@settings@api`,
						model:TYPES.SELECT,
						title:t.hds,
						icon:'android-arrow-dropdown',
						name:'settings_api',
						value:item.settings.api,
						options:[
						],
						validate:[
							v
						],
						settings:{
							datasource:SELECTYPE.DATASOURCE_REMOTE,
							api:URL.DC,
							extra:[],
							trigger:{
								$fallback:{
									datasource:SELECTYPE.DATASOURCE_REMOTE,
									dict:true
								}
							}
						}
					},
					...union(item)
				];
			}
			return [
			];
		})()
	];
};

const union = (item) => {
	// 只有单选项才有关联配置
	if([TYPES.SELECT,TYPES.RADIO].indexOf(item.model)>-1){
		return [
			{
				id:`${item.id}@settings@union`,
				model:TYPES.BUTTON,
				name:'选项关联设置',
				payload:{item,ev:'union'},
				cls:['union-btn']
			}
		];
	}
	return [];
};

// 数据源
const ds = (item,find,settings)=>{
	const isFirst = find(`#${item.id}`)===0;
	const fitem = find(`@0`);
	return [
		{
			id:`${item.id}@^module`,
			model:TYPES.SELECT,
			icon:'android-arrow-dropdown',
			title:t.mod,
			name:'settings_module',
			value:settings.module,
			options:[
			],
			readonly:!isFirst,
			validate:[
				v
			],
			settings:{
				datasource:SELECTYPE.DATASOURCE_REMOTE,
				api:URL.MD,
				// 切换模块时将 category 置为空，使 表单域不显示
				trigger:{
					$fallback:{
						category:'',
					}
				}
			}
		},
		...(()=>{
			if(settings.module){ // module 应必须存在，否则不让进行下一步
				return [
					{
						id:`${item.id}@settings@category`,
						model:TYPES.SELECT,
						title:t.ds,
						icon:'android-arrow-dropdown',
						name:'settings_category',
						value:item.settings.category,
						options:[
						],
						validate:[
							v
						],
						settings:{
							datasource:SELECTYPE.DATASOURCE_REMOTE,
							api:`/${item.settings.module}${URL.DS}`,
							extra:HASOPS(item.model)?[
								SELECTOPTION.DATASOURCE_LOCAL,
							]:[
								SELECTOPTION.DATASOURCE_NONE
							],
							optionsOnly:isFirst?null:[fitem.settings.category],
							trigger:{ // 切换数据源（category）时清除设置的表单的接口数据
								[SELECTYPE.DATASOURCE_LOCAL]:{
									datasource:SELECTYPE.DATASOURCE_LOCAL,
									api:'',
								},
								[SELECTYPE.DATASOURCE_NONE]:{
									datasource:SELECTYPE.DATASOURCE_NONE,
									api:'',
								},
								$fallback:{
									datasource:SELECTYPE.DATASOURCE_REMOTE,
									dict:false,
									api:'',
								}
							},
							values:{
								[SELECTYPE.DATASOURCE_LOCAL]:{
									name:`name${item.id}`,
								},
								[SELECTYPE.DATASOURCE_NONE]:{
									name:`name${item.id}`,
								}
							}
						}
					},
				];
			}
			return [];
		})(),
        
		...(()=>{
			if(!item.settings.module){
				return [];
			}
			if(item.settings.datasource==SELECTYPE.DATASOURCE_LOCAL){
				return [
					...dlocal(item),
					...union(item)
				];
			} else if (item.settings.datasource==SELECTYPE.DATASOURCE_REMOTE){
				return [
					...dname(item,find),
				];
			} else if(item.settings.datasource==SELECTYPE.DATASOURCE_NONE){
				return [];
			} else {
				return [];
			}
		})(),

	];
};



// 数据源 接口地址
const dapi = (item) => {
	return [
		{
			id:`${item.id}@settings@api`,
			model:TYPES.INPUT,
			title:t.api,
			name:'settings_api',
			value:item.settings.api,
			validate:[
				v
			]
		}
	];
};

// 默认值 ， 提示文本
const vv = (item) => {
	return [
		{
			id:`${item.id}@placeholder`,
			model:TYPES.INPUT,
			title:t.pv,
			name:'placeholder',
			value:item.placeholder
		},
		{
			id:`${item.id}@value`,
			model:TYPES.INPUT,
			title:t.defv,
			name:'value',
			value:item.value
		},
        
	];
};

// 校验规则
const va = (item) => {
	return [
		{
			id:`${item.id}@validate`,
			model:TYPES.CHECKBOX,
			title:t.vali,
			name:'validate',
			type:'block',
			value:item.validate,
			options:valist
		},
	];
};
// 校验规则 仅必填
const van = (item) => {
	return [
		{
			id:`${item.id}@validate`,
			model:TYPES.CHECKBOX,
			title:t.vali,
			name:'validate',
			type:'block',
			value:item.validate,
			options:vaneed
		},
	];   
};
// 候选项展示方式
const ty = (item) => {
	return [
		{
			id:`${item.id}@type`,
			model:TYPES.RADIO,
			title:t.dis,
			name:'type',
			value:item.type,
			options:disoptions,
			validate:[
				v,
			]
		},
	];
};

// 数据源 本地
const dlocal = (item) => {
	return [
		{
			id:`${item.id}@options`,
			model:TYPES.SELECTION,
			title:t.uds,
			name:'datasource_local',
			value:item.options,
		}
	];
};

// 子表单
const colset = (item) => {
	return [
		{
			id:`${item.id}@colset`,
			model:TYPES.FORMSET,
			title:t.formset,
			name:'colset',
			value:item.settings.thead,
		}
	];
}


export default {
	[TYPES.BUTTON](item){
		return [
			{
				id:`${item.id}@name`,
				model:TYPES.INPUT,
				title:'文字',
				name:'name',
				value:item.name,
				validate:[
					v,
					v_max,
				]
			},
		];
	},
	[TYPES.SELECT](item,find,settings){
		return [
			...ntd(item,find,settings),
			...w(item),
			...ro(item),
			...van(item),
            
		];
	},
	[TYPES.INPUT](item,find,settings){
		return [
			...ntd(item,find,settings),
			...w(item),
			...vv(item),
			...ro(item),
			...va(item)
		];
	},
	[TYPES.TEXTAREA](item,find,settings){
		return [
			...ntd(item,find,settings),
			...w(item),
			...vv(item),
			...ro(item),
			...va(item)
            
		];
        
	},
	[TYPES.RADIO](item,find,settings){
		return [
			...ntd(item,find,settings),
			...ty(item),
			...ro(item),
			...van(item),
            
		];
        
	},
	[TYPES.CHECKBOX](item,find,settings){
		return [
			...ntd(item,find,settings),
			...ty(item),
			...ro(item),
			...van(item),
		];
        
	},
	[TYPES.DATETIME](item,find,settings){
		return [
			...ntd(item,find,settings),
			...w(item),
			...ro(item),
			...van(item),
            
            
            
		];
	},
	[TYPES.FILE](item,find,settings){
		return [
			...ntd(item,find,settings),
			...ro(item),
			...van(item),
            
            
		];
	},
	[TYPES.IMG](item,find,settings){
		return [
			...ntd(item,find,settings),
			...ro(item),
			...van(item),
            
            
		];
	},
	[TYPES.PERSON](item,find,settings){
		return [
			...ntd(item,find,settings),
			...ro(item),
			...van(item),
            
            
		];
	},
	[TYPES.OFFICE](item,find,settings){
		return [
			...ntd(item,find,settings),
			...ro(item),
			...van(item),
            
            
		];
	},
	[TYPES.FORM](item,find,settings){
		return [
			...titles(item,find,settings),
			...dp(item),
			...colset(item),

            
            
		];
	},

    
};