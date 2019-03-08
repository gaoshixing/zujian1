import { http } from "./request";
const k = '/aplSafebox'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const aplSafebox = {
    //获取详情
    formData(params){
        return get('/formData',{params})
    },
    //编辑保存
    save(params){
        return post('/save',params)
    },

    delete(params){
        return post('/delete',params)
    },


    examList(params){
        return get('/examList',{params})
    },

    list(params){
        return get('/list',{params})
    },
    //查看密码
    viewPassword(params){
        return get('/viewPassword',{params})
    },
}