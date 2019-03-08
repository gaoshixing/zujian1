import { httpCommon } from "./request";

const k = '/comTag'

const post = (u,data)=>{
    return httpCommon.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return httpCommon.get(`${k}${u}`,data);
};

export const comTag = {
    // GET /a/ws/common/comTag/buildTree 根据模块获取标签分组
    buildTree(data) {
		return get('/buildTree', {
			params: data,
		});
	},
};