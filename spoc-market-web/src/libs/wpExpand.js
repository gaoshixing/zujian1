import { http, baseURLSys1} from './request';

const post = (src, data) => {
	return http.post(`/wpSpreadDetail/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/wpSpreadDetail/${src}`, data);
};

export const wpExpand = {
	save(data) {
		return post('save', data)
    },
    listPage(data) {
        return post('listPage', data)
    },
    form(data) {
        return get('form', {
            params: data,
        });
    },
    objectForm(data) {
        return get('objectForm', {
            params: data,
        });
    },
    readSpreadlistPage(data) {
        return post('readSpreadlistPage', data);
    },
    listFormDataRel(data) {
        return get('listFormDataRel', {
            params: data,
        });
    },
    getOpenId(data) {
        return get('getOpenId', {
            params: data,
        });
    },
};