import { http } from "./request";

const k = '/crmLocation';

const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const crmLocation = {
	list(data) {
        return get('/list', {
            params: data,
        });
    },
    form(data) {
        return get('/form', {
            params: data,
        });
    },
    save(data) {
        return post('/save', data);
    },
    delete(data) {
        return post('/delete', data);
    },
};