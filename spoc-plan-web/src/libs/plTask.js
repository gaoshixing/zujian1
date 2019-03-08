import { http ,baseURL} from "./request";
const k = '/plTask'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const plTask = {
    listTitle(params){
        return get('/listTitle',{params});
    },
    // 当前用户在此服务组本周的任务列表
    listUserData(params){
        return get('/listUserData',{params});
    },
//  任务列表数量统计
	countData(params){
        return get('/countData',{params});
    },
//  阶段任务列表(按服务组编号搜索)
    listSection(params){
        return get('/listSection',{params});
    },
//  任务列表
    listData(params){
        return get('/listData',{params});
    },
//  保存任务管理
	save(params){
        return post('/save',params);
    },
//  保存任务顺序
	sortTask(params){
        return post('/sortTask',params);
    },
//  添加或修改任务管理
    form(params){
        return get('/form',{params});
    },
//	修改任务时间
	updateTime(params){
        return post('/updateTime',params);
    },
//  保存任务进度
	updateProgress(params){
        return post('/updateProgress',params);
    },
//  保存任务优先级
    updatePriority(params){
        return post('/updatePriority',params);
    },
//  保存任务标签
    updateTags(params){
        return post('/updateTags',params);
    },
//  保存任务执行人
    updateExecutorId(params){
        return post('/updateExecutorId',params);
    },
//  保存任务隐私性
    updateVisibility(params){
        return post('/updateVisibility',params);
    },
//  任务提醒列表
	list(params){
		return get('/remind/list',{params})
	},
//	保存任务提醒
	remindSave(params){
		return post('/remind/save',params)
	},
//	删除任务提醒
	remindDel(params){
		return post('/remind/delete',params)
	},
	//修改状态
	updateStatus(params){
        return post('/updateStatus',params);
    },
    delete(params){
        return post('/delete',params);
    },
    listPage(params){
		return get('/listPage',{params})
	},
	updateIsRed(params){
		return get('/updateIsRed',{params})
	},
//	任务详情列表
	detailList(params){
		return get('/detail/list',{params})
	},
	//删除评论
	detailDelete(params){
		return post('/detail/delete',params)
	},
	//删除评论
	detailSave(params){
		return post('/detail/save',params)
	},
	//导出
	export(params){
		if(params.ids){
			return `${baseURL}/${k}/export?groupId=${params.groupId}&ids=${params.ids}`;
		}else{
			return `${baseURL}/${k}/export?groupId=${params.groupId}`;
		}
	},
}