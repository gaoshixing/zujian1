import { httpSys, baseURLSys, baseURLSys1} from './request';

const post = (src, data) => {
	return httpSys.post(`/${src}`, data);
};

const get = (src, data) => {
	return httpSys.get(`/${src}`, data);
};

export const wpMarketCommon = {
	//获取分公司
	officeList(params) {
		return get('office/list', {params});
	},
	//返回上传图片地址
	getUploadFileUrl() {
		return baseURLSys + '/attachment/uploadFile'
	},
};