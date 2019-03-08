import r from '../request';
import { uuid , clone } from '../libs/util';

const cache={};

const parseOptions = (data)=>{
	if(data && data.length){
		return data.map(item=>{
			if(item.label||item.value){ // format1
				item.uid=uuid();
			} else if (item.name && item.url){ // format2
				item.uid=uuid();
				item.label=item.name;
				item.value=item.url+'/describe';
			} else if(item.name && typeof item.remarks =='string' ) { // format3 , a/ws/common/comFormTable/listFormDataModule
				item.uid=uuid();
				item.label=item.name;
				item.value=item.remarks;
			} else {
				console.error('invaild option item');
			}
			return item;
		});
	}
	return [];
};


export default {
	options(api,ref,settings){
		if(!api){
			ref.options=[];
			return Promise.resolve(ref.options);
		}
		const prefix = settings.module?settings.module:'/spoc-plan';
		if(settings.dict){
			api='/a/ws/sys/dict/listData?type='+api;
			api=prefix+(api.charAt(0)=='/'?api:('/'+api));
		} else if(!/^.+\/.+$/.test(api)){
			ref.options=[];
			return Promise.resolve(ref.options);
		} else{
			if(api.substr(0,5)!=='/spoc'){
				api=prefix+(api.charAt(0)=='/'?api:('/'+api));
			}
		}
		let ops = cache[api];
		if(ops){
			if(settings.optionsOnly){ // 返回数据筛选项
				ops = ops.filter(item=>{
					return settings.optionsOnly.includes(item.value);
				});
			}
			if(settings.extra){
				ops = ops.concat(settings.extra);
			}
			ref.options = ops;
			return Promise.resolve(ref.options);
		}
		return new Promise((resolve,reject)=>{
			r.get[api]().then(res=>{
				if(res.data.status==='success'){
					let ops = parseOptions(res.data.data);
					cache[api]=clone(ops);
					if(settings.optionsOnly){
						ops = ops.filter(item=>{
							return settings.optionsOnly.includes(item.value);
						});
					}
					if(settings.extra){
						ops = ops.concat(settings.extra);
					}
					ref.options = ops;
				} else {
					ref.options=[];
				}
				resolve(ref.options);
			}).catch(e=>{
				ref.options=[];
				console.error(e);
				reject(e);
			});
		});
       
	},

	getInitData(api,id){
		return r.get[api]({params:{id}}).then(res=>{
			if(res.data.status==='success'){
				return res.data;
			}
			throw new Error(res.data.message);
		}).catch(console.error);
	},

	saveFormData(api,data){
		return r.post[api](data).then(res=>{
			if(res.data.status==='success'){
				return res.data;
			}
			throw new Error(res.data.message);
		}).catch(console.error);
	}
    

};