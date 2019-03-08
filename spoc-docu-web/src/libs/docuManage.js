import { http, } from './request';

const DOCUSRC = `/docEssay/`;

const post = (src, data) => {
	return http.post(`${DOCUSRC}${src}`, data);
};

const get = (src, data) => {
	return http.get(`${DOCUSRC}${src}`, data);
};

export const docuManage = {
	/*
	* 文书管理
	*/
	listPage(data) {
		return post('listPage', data);
	},
	/*
	* 设为范文
	*/
	modelEssay(data) {
		return post('modelEssay', data);
	},
	/*
	* 删除文书管理
	*/
	delete(data) {
		return post('delete', data);
	},
	/*
	* form
	*/
	form(data) {
		return get('form', {
			params: data,
		});
	},
	progress(data) {
		return post('progress', data);
	},
	save(data) {
		return post('save', data);
	},
	share(data) {
		return post('share', data);
	},
	/*
	* 文书审批
	*/

	listPageAudit(data) {
		return post('listPageAudit', data);
	},
	/*
	* 审核文书
	*/
	audit(data) {
		return post('audit', data);
	},
	/*
	* 批量审核
	*/
	batchAudit(data) {
		return post('batchAudit', data);
	},
	listLog(data) {
		return get('listLog', {
			params: data,
		});
	},
	/*
	* 我的文书
	*/

	listPageCurrentUser(data) {
		return post('listPageCurrentUser', data);
	},
	listShare(data) {
		return get('listShare', {
			params: data,
		});
	},

	//推荐信
	listTypeDocessay(params) {
		return get('listTypeDocessay', {params})
	},

	//备注
	remark(data) {
		return post('remark', data)
	}
};