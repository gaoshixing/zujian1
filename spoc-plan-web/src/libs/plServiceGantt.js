import { http } from "./request";
const k = '/plServiceGantt'
const k1 = '/plHandover'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

const getM = (u,data)=>{
    return http.get(`${k1}${u}`,data);
};

export const plServiceGantt = {
//	//主合同列表
//	list(params){
//		return post('/list',params)
//	},
	//获取各类型选项列表
	list(params){
		return get('/list',{params})
	},
//	获取某个服务组的任务列表
	taskList(params){
		return get('/taskList',{params})
	},
//	获取某个服务组的历史快照版本列表
	getSnapshotList(params){
		return get('/getSnapshotList',{params})
	},
//	获取某个服务组的某个历史快照详情
	getSnapshotInfo(params){
		return get('/getSnapshotInfo',{params})
	},
//	用户手动保存甘特图快照
	saveSnapshot(params){
		return get('/saveSnapshot',{params})
	},
}