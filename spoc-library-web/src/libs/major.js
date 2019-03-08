import {http,baseURL} from "./request.js";

const k ='/ssMajor';

const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};


export const major = {
    save(obj){
        return post('/save',obj);
    },
    list(params){
        return get('/list',{params});
    },
    listThink1(params){
        return get('/listThink',{params});
    },
    form(id){
        return get('/form',{params:{id}});
    },
    saveJob(obj){
        return post('/saveJob',obj);
    },
    saveCertificate(obj){
        return post('/saveCertificate',obj);
    },
    saveBranch(obj){
        return post('/saveBranch',obj);
    },
    deleteBatch(ids){
        return post('/deleteBatch',{ids:ids});
    },
    getByCertificateID(id){
        return get('/getByCertificateID',{params:{id}});
    },
    getByBranchID(id){
        return get('/getByBranchID',{params:{id}});
    },
    getByJobID(id){
        return get('/getByJobID',{params:{id}});
    },
    importFile(data){
        return post('/importFile',data);
    },
    findByJobName(name){
        return get('/findByJobName',{params:{name}});
    },
    findByCertificateName(name){
        return get('/findByCertificateName',{params:{name}});
    },
    findByBranchName(name){
        return get('/findByBranchName',{params:{name}});
    },
    // fetch 专业名称
    listThink(name){
      return get('/listThink',{params:{name}})
    },

};