import { http } from "./request";
const k = '/aplShareUrl'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const aplShareUrl = {
    /* form(params){
        return get('/form',{params})
    }, */
    save(params){
        return post('/save',params)
    },
    verifyUrl(params){
        return post('/verifyUrl',params)
    },
    commit(params){
        return post('/commit',params)
    },
}