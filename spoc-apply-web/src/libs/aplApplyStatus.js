import { http } from "./request";
const k = '/aplApplyStatus'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const aplApplyStatus = {
    //GET /a/ws/apply/aplApplyStatus/formData
    formData(params){
        return get('/formData',{params})
    },
    //POST /a/ws/apply/aplApplyStatus/save
    save(params){
        return post('/save',params)
    },
}