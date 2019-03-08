import { TYPES , SELECTOPTION , DISTYPE , LAYTYPE } from '../../components/config';

import { defwidth , defdis } from '../settings/settings';

const options =
[
	{label:'A',value:1},
	{label:'B',value:2},
	{label:'C',value:3},
	{label:'D',value:4}
];

export default {
	lists(){
		return [
			{
				label:'基本字段',
				children:[
					{
						label:'单行输入框',
						model:{
							model:TYPES.INPUT,
							name:'',
							title:'单行输入框',
							description:'',
							value:'',
							display:DISTYPE.INLINE,
							lay:LAYTYPE.COMM,
							placeholder:'',
							readonly:false,
							width:defwidth,
							settings:{},
							validate:[],
						}
					},
					{
						label:'多行输入框',
						model:{
							model:TYPES.TEXTAREA,
							name:'',
							title:'多行输入框',
							description:'',
							value:'',
							display:DISTYPE.INLINE,
							lay:LAYTYPE.COMM,
							placeholder:'',
							readonly:false,
							width:defwidth,
							settings:{},
							validate:[],
						}
					},
					{
						label:'单选框',
						model:{
							model:TYPES.RADIO,
							name:'',
							title:'单选框',
							description:'',
							value:'',
							display:DISTYPE.INLINE,
							lay:LAYTYPE.COMM,
							placeholder:'',
							readonly:false,
							type:defdis,
							options,
							settings:{},
							validate:[]
						}
					},
					{
						label:'复选框',
						model:{
							model:TYPES.CHECKBOX,
							name:'',
							title:'复选框',
							description:'',
							value:[],
							display:DISTYPE.INLINE,
							lay:LAYTYPE.COMM,
							placeholder:'',
							readonly:false,
							type:defdis,
							options,
							settings:{},
							validate:[]
						}
					},
					{
						label:'下拉框',
						model:{
							model:TYPES.SELECT,
							name:'',
							title:'下拉框',
							description:'',
							icon:'android-arrow-dropdown',
							value:'',
							display:DISTYPE.INLINE,
							lay:LAYTYPE.COMM,
							placeholder:'',
							readonly:false,
							options,
							width:defwidth,
							settings:{},
							validate:[]
						}
					},
					{
						label:'时间选择框',
						model:{
							model:TYPES.DATETIME,
							name:'',
							title:'时间选择框',
							description:'',
							value:'',
							display:DISTYPE.INLINE,
							lay:LAYTYPE.COMM,
							placeholder:'',
							readonly:false,
							width:defwidth,
							dateformat:'yyyy-MM-dd',
							settings:{},
							validate:[]
						}
					},
//					{
//						label:'分割线',
//						model:{
//							model:TYPES.LINE,
//							name:'',
//							value:'',
//							title:'分割线',
//							settings:{},
//
//						}
//					},
				]
			},
//			{
//				label:'增强字段',
//				children:[
//					{
//						label:'图片',
//						model:{
//							model:TYPES.IMG,
//							name:'',
//							title:'图片',
//							description:'',
//							value:'',
//							display:DISTYPE.INLINE,
//							lay:LAYTYPE.COMM,
//							placeholder:'请选择图片',
//							readonly:false,
//							width:defwidth,
//							settings:{},
//							validate:[],
//						}
//					},
//					{
//						label:'附件',
//						model:{
//							model:TYPES.IMG,
//							name:'',
//							title:'附件',
//							description:'',
//							value:'',
//							display:DISTYPE.INLINE,
//							lay:LAYTYPE.COMM,
//							placeholder:'请选择文件',
//							readonly:false,
//							width:defwidth,
//							settings:{},
//							validate:[],
//						}
//					},
//					{
//						label:'子表单',
//						model:{
//							model:TYPES.FORM,
//							name:'inlineform',
//							title:'子表单',
//							description:'',
//							value:[],
//							display:DISTYPE.BLOCK,
//							lay:LAYTYPE.COMM,
//							placeholder:'请选择文件',
//							readonly:false,
//							width:defwidth,
//							settings:{
//								thead:[]
//							},
//							validate:[],
//						}
//					},
//				]
//			},
//			{
//				label:'部门成员字段',
//				children:[
//					{
//						label:'成员单选',
//						model:{
//							model:TYPES.PERSON,
//							name:'',
//							title:'成员单选',
//							description:'',
//							value:'',
//							display:DISTYPE.INLINE,
//							lay:LAYTYPE.COMM,
//							placeholder:'成员单选',
//							readonly:false,
//							width:defwidth,
//							settings:{},
//							validate:[],
//						}
//					},
//					{
//						label:'成员多选',
//						model:{
//							model:TYPES.PERSON,
//							name:'',
//							title:'成员多选',
//							description:'',
//							value:'',
//							display:DISTYPE.INLINE,
//							lay:LAYTYPE.COMM,
//							type:'multiple',
//							placeholder:'成员多选',
//							readonly:false,
//							width:defwidth,
//							settings:{},
//							validate:[],
//						}
//					},
//					{
//						label:'部门单选',
//						model:{
//							model:TYPES.OFFICE,
//							name:'',
//							title:'部门单选',
//							description:'',
//							value:'',
//							display:DISTYPE.INLINE,
//							lay:LAYTYPE.COMM,
//							placeholder:'部门单选',
//							readonly:false,
//							width:defwidth,
//							settings:{},
//							validate:[],
//						}
//					},
//					{
//						label:'部门多选',
//						model:{
//							model:TYPES.OFFICE,
//							name:'',
//							title:'部门多选',
//							description:'',
//							value:'',
//							display:DISTYPE.INLINE,
//							lay:LAYTYPE.COMM,
//							type:'multiple',
//							placeholder:'部门多选',
//							readonly:false,
//							width:defwidth,
//							settings:{},
//							validate:[],
//						}
//					},
//				]
//			}
            
		];
	}
};