export const TYPES = {
	INPUT:1,
	TEXTAREA:2,
	RADIO:3,
	CHECKBOX:4,
	SELECT:5,
	DATE:6,
	DATETIME:7,
	BUTTON:8,
	LABEL:9,
	LINE:10,
	IMG:11,
	FILE:12,
	PERSON:13,
	OFFICE:14,
	SELECTION:15,
	FORM:16, // 子表单项
	FORMSET:17, // 子表单设置项
};

export const URL={
	DS:'/a/ws/common/comFormTable/listFormDataSource',
	MD:'/a/ws/common/comFormTable/listFormDataModule',
	DC:'/a/ws/sys/dict/describe'
};

export const SELECTYPE = {
	SEARCH_REMOTE:1 , // 使用远程搜索
	SEARCH_LOCAL:2,  // 使用本地搜索
	SEARCH_DISABLE:3, // 不使用搜索

	DATASOURCE_LOCAL:1, // 使用本地数据源
	DATASOURCE_REMOTE:2, // 使用远程数据源
	DATASOURCE_NONE:3, // 不使用数据源绑定
};

export const SELECTOPTION = {
	SEARCH_REMOTE: {
		label:'使用远程搜索', 
		value:SELECTYPE.SEARCH_REMOTE
	},
	SEARCH_LOCAL: {
		label:'使用本地搜索', 
		value:SELECTYPE.SEARCH_LOCAL        
	},
	SEARCH_DISABLE: {
		label:'不使用搜索', 
		value:SELECTYPE.SEARCH_DISABLE        
	},


	DATASOURCE_LOCAL: {
		label:'预定义数据',
		value:SELECTYPE.DATASOURCE_LOCAL        
	},
	DATASOURCE_REMOTE: {
		label:'来自接口',
		value:SELECTYPE.DATASOURCE_REMOTE        
	},
	DATASOURCE_NONE: {
		label:'无',
		value:SELECTYPE.DATASOURCE_NONE
	}


};

export const VTYPE = {
	EMAIL:'email',
	PHONE:'phone',
	ARRAY:'array',
	OBJECT:'object'
};

export const DISTYPE = {
	INLINE:1, // 左右排版
	BLOCK:2, // 上下排版
};

export const LAYTYPE = {
	COMM:0,
	HALF:1,
}

export const HASOPS = (t)=>{
	return [TYPES.CHECKBOX,TYPES.RADIO,TYPES.SELECT].includes(t);
};