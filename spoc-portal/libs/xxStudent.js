import { httpChooseSchool as http } from './request'
import qs from 'qs';

const k = '/xxStudent';
const post = (u,data,cfg)=>{
	return http.post(`${k}${u}`,data,cfg);
};

const get = (u,data)=>{
	return http.get(`${k}${u}`,data);
};

const encode = {transformRequest:[function (data, headers) {
    debugger;
    return qs.stringify(data);
}]}

export const xxStudent = {
    assign(data){
        return post('/assign',data,encode)
    }
}